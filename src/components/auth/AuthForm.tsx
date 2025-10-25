import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthFormProps {
  onClose?: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (!captchaToken) {
      alert('Пожалуйста, подтвердите что вы не робот');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/060a8682-5edb-4e05-86b8-fef922596260', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          action: isLogin ? 'login' : 'register',
          captchaToken
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        alert(isLogin ? 'Вход выполнен успешно!' : 'Регистрация завершена!');
        onClose?.();
      } else {
        alert(data.error || 'Ошибка авторизации');
      }
    } catch (error) {
      alert('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'yandex' | 'vk') => {
    window.open(`https://functions.poehali.dev/060a8682-5edb-4e05-86b8-fef922596260/oauth/${provider}`, 'oauth', 'width=600,height=700');
    
    window.addEventListener('message', (event) => {
      if (event.data.token) {
        localStorage.setItem('authToken', event.data.token);
        alert('Вход выполнен успешно!');
        onClose?.();
      }
    });
  };

  const loadRecaptcha = () => {
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', { action: 'submit' })
          .then((token: string) => {
            setCaptchaToken(token);
          });
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {isLogin ? 'Вход в систему' : 'Регистрация'}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          )}

          <div className="text-sm text-muted-foreground text-center">
            Защищено Google reCAPTCHA
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
            onClick={loadRecaptcha}
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Или продолжить с
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('google')}
            className="w-full"
          >
            <Icon name="Chrome" size={20} />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('yandex')}
            className="w-full"
          >
            <span className="font-bold text-red-600">Я</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('vk')}
            className="w-full"
          >
            <span className="font-bold text-blue-600">VK</span>
          </Button>
        </div>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}