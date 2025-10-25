import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ru: {
    home: 'Главная',
    features: 'Возможности',
    pricing: 'Тарифы',
    faq: 'FAQ',
    contacts: 'Контакты',
    settings: 'Настройки',
    login: 'Войти',
    logout: 'Выйти',
    hero_title: 'Автоматизация бизнеса через Telegram боты',
    hero_subtitle: 'YAPPERTAR AI — платформа для создания интеллектуальных чат-ботов, которые автоматизируют ваши бизнес-процессы и повышают эффективность команды',
    get_started: 'Попробовать бесплатно',
    watch_demo: 'Демо',
    features_title: 'Возможности платформы',
    features_subtitle: 'Полный набор инструментов для создания и управления чат-ботами',
    feature1_title: 'Интеллектуальные диалоги',
    feature1_desc: 'Боты понимают контекст и дают точные ответы благодаря ИИ',
    feature2_title: 'Интеграция с системами',
    feature2_desc: 'Подключение к CRM, базам данных и внешним API',
    feature3_title: 'Аналитика в реальном времени',
    feature3_desc: 'Отслеживайте метрики и поведение пользователей',
    pricing_title: 'Тарифные планы',
    pricing_subtitle: 'Выберите план, который подходит именно вам',
    starter: 'Стартер',
    starter_desc: 'Для небольших проектов',
    professional: 'Профессиональный',
    professional_desc: 'Для растущего бизнеса',
    enterprise: 'Корпоративный',
    enterprise_desc: 'Для крупных компаний',
    month: '/мес',
    choose_plan: 'Выбрать план',
    current_plan: 'Текущий план',
    faq_title: 'Часто задаваемые вопросы',
    faq_subtitle: 'Ответы на популярные вопросы о нашем сервисе',
    contacts_title: 'Свяжитесь с нами',
    contacts_subtitle: 'Готовы начать? Напишите нам для консультации',
    email: 'Email',
    telegram: 'Telegram',
    request_demo: 'Заказать демонстрацию',
    settings_title: 'Настройки',
    theme: 'Тема',
    light_theme: 'Светлая',
    dark_theme: 'Тёмная',
    language_label: 'Язык',
    russian: 'Русский',
    english: 'English',
    save_settings: 'Сохранить',
    password: 'Пароль',
  },
  en: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    contacts: 'Contacts',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    hero_title: 'Business Automation via Telegram Bots',
    hero_subtitle: 'YAPPERTAR AI is a platform for creating intelligent chatbots that automate your business processes and increase team efficiency',
    get_started: 'Try for Free',
    watch_demo: 'Demo',
    features_title: 'Platform Features',
    features_subtitle: 'Complete toolkit for creating and managing chatbots',
    feature1_title: 'Intelligent Conversations',
    feature1_desc: 'Bots understand context and provide accurate answers with AI',
    feature2_title: 'System Integration',
    feature2_desc: 'Connect to CRM, databases and external APIs',
    feature3_title: 'Real-time Analytics',
    feature3_desc: 'Track metrics and user behavior',
    pricing_title: 'Pricing Plans',
    pricing_subtitle: 'Choose the plan that fits you best',
    starter: 'Starter',
    starter_desc: 'For small projects',
    professional: 'Professional',
    professional_desc: 'For growing business',
    enterprise: 'Enterprise',
    enterprise_desc: 'For large companies',
    month: '/mo',
    choose_plan: 'Choose Plan',
    current_plan: 'Current Plan',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Answers to popular questions about our service',
    contacts_title: 'Contact Us',
    contacts_subtitle: 'Ready to start? Write to us for consultation',
    email: 'Email',
    telegram: 'Telegram',
    request_demo: 'Request Demo',
    settings_title: 'Settings',
    theme: 'Theme',
    light_theme: 'Light',
    dark_theme: 'Dark',
    language_label: 'Language',
    russian: 'Русский',
    english: 'English',
    save_settings: 'Save',
    password: 'Password',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}