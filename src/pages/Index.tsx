import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Bot" size={28} className="text-primary" />
            <span className="text-xl font-bold text-foreground">YAPPERTAR AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:text-primary transition-colors">
              Возможности
            </button>
            <button onClick={() => scrollToSection('api')} className="text-sm font-medium hover:text-primary transition-colors">
              API документация
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:text-primary transition-colors">
              Вопросы и ответы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>
          <a href="#contacts">
            <Button onClick={() => scrollToSection('contacts')}>Начать</Button>
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Автоматизация бизнеса через Telegram боты
                </h1>
                <p className="text-xl text-muted-foreground">
                  YAPPERTAR AI — платформа для создания интеллектуальных чат-ботов, которые автоматизируют ваши бизнес-процессы и повышают эффективность команды
                </p>
                <div className="flex gap-4">
                  <a href="https://t.me/FantomProject_support_bot" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="text-base animate-scale-in hover:scale-105 transition-transform">
                      <Icon name="Rocket" size={20} className="mr-2" />
                      Попробовать бесплатно
                    </Button>
                  </a>
                  <a href="mailto:fantomproject@internet.ru">
                    <Button size="lg" variant="outline" className="text-base animate-scale-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
                      <Icon name="Play" size={20} className="mr-2" />
                      Демо
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-2xl animate-pulse-glow" />
                <img 
                  src="https://cdn.poehali.dev/projects/1f059fb6-ca3c-44c0-97b6-9f7d4654ae03/files/f0ab6295-5e28-4fff-8000-a04d0c082a59.jpg" 
                  alt="YAPPERTAR AI Platform"
                  className="rounded-lg shadow-2xl relative z-10 animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Возможности платформы</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Полный набор инструментов для создания и управления чат-ботами
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Автоматизация процессов</CardTitle>
                  <CardDescription>
                    Настройте автоматические ответы, обработку заявок и маршрутизацию обращений без единой строки кода
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Brain" size={24} className="text-primary" />
                  </div>
                  <CardTitle>ИИ-ассистент</CardTitle>
                  <CardDescription>
                    Встроенный искусственный интеллект понимает контекст диалога и отвечает на сложные вопросы клиентов
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Аналитика</CardTitle>
                  <CardDescription>
                    Отслеживайте эффективность ботов, анализируйте диалоги и оптимизируйте бизнес-процессы
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Workflow" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Интеграции</CardTitle>
                  <CardDescription>
                    Подключайте CRM, платёжные системы, базы данных и другие сервисы через API
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Безопасность</CardTitle>
                  <CardDescription>
                    Шифрование данных, защита от DDoS-атак и соответствие стандартам GDPR
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Мультиканальность</CardTitle>
                  <CardDescription>
                    Управляйте несколькими ботами из единого интерфейса, масштабируйте на всю компанию
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="api" className="py-20 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">API документация</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Простая интеграция за несколько минут
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Code" size={20} />
                    REST API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`POST /api/v1/bot/message
{
  "bot_id": "your-bot-id",
  "message": "Привет!",
  "user_id": "telegram-user-id"
}`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Отправка сообщений через REST API с автоматической обработкой
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Webhook" size={20} />
                    Webhooks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "event": "message.received",
  "data": {
    "from": "user-123",
    "text": "Хочу заказать"
  }
}`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Получайте события в реальном времени на ваш сервер
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Database" size={20} />
                    База знаний
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`POST /api/v1/knowledge/add
{
  "content": "FAQ содержание",
  "category": "поддержка"
}`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Загружайте базу знаний для обучения ИИ-ассистента
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" size={20} />
                    SDK
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`npm install yappertar-sdk

const bot = new Yappertar({
  apiKey: 'your-key'
});`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Готовые библиотеки для Node.js, Python, PHP
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                <Icon name="Book" size={20} className="mr-2" />
                Полная документация
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Вопросы и ответы</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ответы на часто задаваемые вопросы
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Как быстро можно запустить первого бота?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Создание базового бота занимает 5-10 минут. Вы можете использовать готовые шаблоны для типовых сценариев или настроить бота под свои задачи с помощью визуального конструктора.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Нужны ли навыки программирования?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Нет, базовые сценарии настраиваются без кода через визуальный интерфейс. Для сложных интеграций доступен API и возможность написания кастомных функций на Python или JavaScript.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Какие интеграции поддерживаются?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Платформа поддерживает интеграцию с популярными CRM (Битрикс24, amoCRM), платёжными системами (ЮKassa, Stripe), Google Sheets, базами данных и любыми сервисами с REST API.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Как работает ИИ-ассистент?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    ИИ обучается на вашей базе знаний и автоматически отвечает на вопросы пользователей. Вы можете загрузить FAQ, документацию или другие материалы, и бот будет использовать их для генерации ответов.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Есть ли ограничения по количеству пользователей?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    В базовом тарифе — до 1000 активных пользователей в месяц. Для корпоративных клиентов предусмотрены индивидуальные тарифы без ограничений с выделенной инфраструктурой.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Как защищены данные пользователей?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Все данные шифруются по стандарту AES-256. Мы соответствуем требованиям GDPR, храним данные в ЕС и России. Доступна функция автоматического удаления персональных данных по запросу.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
                <p className="text-xl text-muted-foreground">
                  Готовы начать? Напишите нам для консультации
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">Email</CardTitle>
                    <CardDescription className="text-base">
                      <a href="mailto:fantomproject@internet.ru" className="hover:text-primary transition-colors">
                        fantomproject@internet.ru
                      </a>
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">Telegram</CardTitle>
                    <CardDescription className="text-base">
                      <a href="https://t.me/FantomProject_support_bot" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        @FantomProject_support_bot
                      </a>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <a href="mailto:fantomproject@internet.ru">
                  <Button size="lg" className="text-base hover:scale-105 transition-transform animate-pulse-glow">
                    <Icon name="Send" size={20} className="mr-2" />
                    Заказать демонстрацию
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Icon name="Bot" size={24} className="text-primary animate-float" />
              <span className="font-bold">YAPPERTAR AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 YAPPERTAR AI. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="mailto:fantomproject@internet.ru" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Icon name="Mail" size={20} />
              </a>
              <a href="https://t.me/FantomProject_support_bot" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}