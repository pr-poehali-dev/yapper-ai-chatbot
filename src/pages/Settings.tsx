import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/ui/icon";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              {t('settings_title')}
            </h1>
          </div>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Settings" size={24} className="text-primary" />
                {t('settings_title')}
              </CardTitle>
              <CardDescription>
                {language === 'ru' ? 'Настройте внешний вид и язык интерфейса' : 'Customize appearance and interface language'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="Palette" size={20} className="text-primary" />
                  {t('theme')}
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      theme === 'light'
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center">
                        <Icon name="Sun" size={24} className="text-orange-600" />
                      </div>
                      <span className="font-medium">{t('light_theme')}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Icon name="Moon" size={24} className="text-white" />
                      </div>
                      <span className="font-medium">{t('dark_theme')}</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="Globe" size={20} className="text-primary" />
                  {t('language_label')}
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLanguage('ru')}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      language === 'ru'
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-4xl">🇷🇺</div>
                      <span className="font-medium">{t('russian')}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      language === 'en'
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-4xl">🇬🇧</div>
                      <span className="font-medium">{t('english')}</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-primary via-purple-500 to-secondary hover:scale-105 transition-all">
                  <Icon name="Check" size={20} className="mr-2" />
                  {t('save_settings')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
