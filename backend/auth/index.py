import json
import os
import psycopg2
import hashlib
import hmac
import base64
import time
import urllib.parse
import urllib.request
from typing import Dict, Any, Optional
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Authentication API - registration, login, OAuth (Google, Yandex, VK), JWT token generation
    Args: event with httpMethod, body, queryStringParameters, headers
          context with request_id
    Returns: HTTP response with authentication token or OAuth redirect
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path_params = event.get('pathParams', {}) or event.get('params', {})
    path = path_params.get('path', '').strip('/')
    
    if method == 'GET' and path.startswith('oauth/'):
        return handle_oauth_redirect(event, path)
    
    if method == 'GET' and path == 'callback':
        return handle_oauth_callback(event)
    
    if method == 'POST':
        return handle_auth(event)
    
    return error_response('Method not allowed', 405)


def handle_auth(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    email = body_data.get('email', '').lower().strip()
    password = body_data.get('password', '')
    captcha_token = body_data.get('captchaToken', '')
    
    if not email or not password:
        return error_response('Email and password required', 400)
    
    if not verify_recaptcha(captcha_token):
        return error_response('Captcha verification failed', 400)
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    if action == 'register':
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            cur.close()
            conn.close()
            return error_response('Email already registered', 400)
        
        password_hash = hash_password(password)
        cur.execute(
            "INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id",
            (email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        
    else:
        cur.execute("SELECT id, password_hash FROM users WHERE email = %s", (email,))
        row = cur.fetchone()
        
        if not row or not verify_password(password, row[1]):
            cur.close()
            conn.close()
            return error_response('Invalid credentials', 401)
        
        user_id = row[0]
    
    token = generate_jwt(user_id, email)
    save_session(conn, user_id, token, event)
    
    cur.execute("UPDATE users SET last_login = %s WHERE id = %s", (datetime.utcnow(), user_id))
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'token': token, 'userId': user_id}),
        'isBase64Encoded': False
    }


def handle_oauth_redirect(event: Dict[str, Any], path: str) -> Dict[str, Any]:
    provider = path.replace('oauth/', '')
    
    redirect_uri = get_redirect_uri()
    
    if provider == 'google':
        client_id = os.environ.get('GOOGLE_CLIENT_ID', '')
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=openid email profile&state=google"
    
    elif provider == 'yandex':
        client_id = os.environ.get('YANDEX_CLIENT_ID', '')
        auth_url = f"https://oauth.yandex.ru/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&state=yandex"
    
    elif provider == 'vk':
        client_id = os.environ.get('VK_CLIENT_ID', '')
        auth_url = f"https://oauth.vk.com/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=email&state=vk"
    
    else:
        return error_response('Unknown provider', 400)
    
    return {
        'statusCode': 302,
        'headers': {
            'Location': auth_url,
            'Access-Control-Allow-Origin': '*'
        },
        'body': '',
        'isBase64Encoded': False
    }


def handle_oauth_callback(event: Dict[str, Any]) -> Dict[str, Any]:
    params = event.get('queryStringParameters', {})
    code = params.get('code', '')
    state = params.get('state', '')
    
    if not code or not state:
        return error_response('Invalid OAuth callback', 400)
    
    user_data = exchange_code_for_user(state, code)
    
    if not user_data:
        return error_response('OAuth authentication failed', 400)
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute(
        "SELECT id FROM users WHERE oauth_provider = %s AND oauth_id = %s",
        (state, user_data['id'])
    )
    row = cur.fetchone()
    
    if row:
        user_id = row[0]
    else:
        cur.execute(
            "INSERT INTO users (email, oauth_provider, oauth_id, full_name, avatar_url) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (user_data['email'], state, user_data['id'], user_data.get('name', ''), user_data.get('avatar', ''))
        )
        user_id = cur.fetchone()[0]
        conn.commit()
    
    token = generate_jwt(user_id, user_data['email'])
    save_session(conn, user_id, token, event)
    
    cur.execute("UPDATE users SET last_login = %s WHERE id = %s", (datetime.utcnow(), user_id))
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        },
        'body': f'<script>window.opener.postMessage({{token: "{token}", userId: {user_id}}}, "*"); window.close();</script>',
        'isBase64Encoded': False
    }


def exchange_code_for_user(provider: str, code: str) -> Optional[Dict[str, Any]]:
    redirect_uri = get_redirect_uri()
    
    if provider == 'google':
        token_url = 'https://oauth2.googleapis.com/token'
        data = urllib.parse.urlencode({
            'code': code,
            'client_id': os.environ.get('GOOGLE_CLIENT_ID', ''),
            'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET', ''),
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }).encode()
        
        req = urllib.request.Request(token_url, data=data, method='POST')
        response = urllib.request.urlopen(req).read()
        tokens = json.loads(response)
        
        user_req = urllib.request.Request(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            headers={'Authorization': f"Bearer {tokens['access_token']}"}
        )
        user_data = json.loads(urllib.request.urlopen(user_req).read())
        
        return {
            'id': user_data['id'],
            'email': user_data['email'],
            'name': user_data.get('name', ''),
            'avatar': user_data.get('picture', '')
        }
    
    return None


def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, password_hash: str) -> bool:
    return hash_password(password) == password_hash


def generate_jwt(user_id: int, email: str) -> str:
    secret = os.environ.get('JWT_SECRET', 'default_secret')
    header = base64.urlsafe_b64encode(json.dumps({'alg': 'HS256', 'typ': 'JWT'}).encode()).decode().rstrip('=')
    
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': int(time.time()) + 86400 * 30
    }
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    
    message = f"{header}.{payload_b64}"
    signature = base64.urlsafe_b64encode(
        hmac.new(secret.encode(), message.encode(), hashlib.sha256).digest()
    ).decode().rstrip('=')
    
    return f"{message}.{signature}"


def verify_recaptcha(token: str) -> bool:
    if not token:
        return False
    
    secret = os.environ.get('RECAPTCHA_SECRET_KEY', '')
    if not secret:
        return True
    
    data = urllib.parse.urlencode({'secret': secret, 'response': token}).encode()
    req = urllib.request.Request('https://www.google.com/recaptcha/api/siteverify', data=data)
    response = json.loads(urllib.request.urlopen(req).read())
    
    return response.get('success', False) and response.get('score', 0) > 0.5


def save_session(conn, user_id: int, token: str, event: Dict[str, Any]):
    cur = conn.cursor()
    expires = datetime.utcnow() + timedelta(days=30)
    headers = event.get('headers', {})
    user_agent = headers.get('User-Agent', '')
    
    cur.execute(
        "INSERT INTO sessions (user_id, token, expires_at, user_agent) VALUES (%s, %s, %s, %s)",
        (user_id, token, expires, user_agent)
    )
    conn.commit()
    cur.close()


def get_redirect_uri() -> str:
    return urllib.parse.quote('https://your-domain.com/api/auth/callback', safe='')


def error_response(message: str, status: int) -> Dict[str, Any]:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': message}),
        'isBase64Encoded': False
    }