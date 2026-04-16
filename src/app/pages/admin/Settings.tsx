import { useLanguage } from '../../context/LanguageContext';
import { Settings as SettingsIcon, Globe, Palette, Bell, Shield, Database } from 'lucide-react';

export function Settings() {
  const { t } = useLanguage();

  const settingsSections = [
    {
      icon: Globe,
      title: t('Language & Localization', 'اللغة والترجمة'),
      description: t('Manage bilingual content and RTL support', 'إدارة المحتوى ثنائي اللغة ودعم RTL'),
      color: 'from-primary to-accent',
    },
    {
      icon: Palette,
      title: t('Design System', 'نظام التصميم'),
      description: t('Customize colors, typography, and theme', 'تخصيص الألوان والخطوط والثيم'),
      color: 'from-accent to-secondary',
    },
    {
      icon: Bell,
      title: t('Notifications', 'الإشعارات'),
      description: t('Configure email and system notifications', 'إعدادات البريد والإشعارات'),
      color: 'from-secondary to-gold',
    },
    {
      icon: Shield,
      title: t('Security', 'الأمان'),
      description: t('Manage admin access and permissions', 'إدارة الوصول والصلاحيات'),
      color: 'from-gold to-primary',
    },
    {
      icon: Database,
      title: t('Data & Backup', 'البيانات والنسخ الاحتياطي'),
      description: t('Export data and backup settings', 'تصدير البيانات والنسخ الاحتياطية'),
      color: 'from-primary to-secondary',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
          {t('Settings', 'الإعدادات')}
        </h1>
        <p className="text-muted-foreground">
          {t('Configure your admin dashboard preferences', 'إعدادات لوحة التحكم')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          );
        })}
      </div>

      {/* System Info */}
      <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <h3 className="font-semibold text-lg mb-4">{t('System Information', 'معلومات النظام')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">{t('Platform Version', 'إصدار المنصة')}</p>
            <p className="font-semibold">v1.0.0</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">{t('Last Updated', 'آخر تحديث')}</p>
            <p className="font-semibold">April 15, 2026</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">{t('Design System', 'نظام التصميم')}</p>
            <p className="font-semibold">Modern Editorial Luxury</p>
          </div>
          <div className="p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">{t('Languages', 'اللغات')}</p>
            <p className="font-semibold">English, العربية</p>
          </div>
        </div>
      </div>
    </div>
  );
}
