import { useLanguage } from '../../context/LanguageContext';
import { Search, Bell, User, Globe } from 'lucide-react';
import { useState } from 'react';

export function AdminTopbar() {
  const { t, language, setLanguage } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: t('New booking request received', 'طلب حجز جديد'), time: '5m ago' },
    { id: 2, message: t('New contact form submission', 'استمارة تواصل جديدة'), time: '1h ago' },
    { id: 3, message: t('Portfolio project published', 'تم نشر مشروع جديد'), time: '3h ago' },
  ];

  return (
    <div className="h-20 bg-card/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('Search anything...', 'ابحث عن أي شيء...')}
            className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="p-3 hover:bg-muted/50 rounded-xl transition-colors flex items-center gap-2"
        >
          <Globe className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 hover:bg-muted/50 rounded-xl transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">{t('Notifications', 'الإشعارات')}</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <p className="text-sm mb-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted/20 text-center">
                <button className="text-sm text-primary hover:underline">
                  {t('View All', 'عرض الكل')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium">{t('Admin User', 'المسؤول')}</p>
            <p className="text-xs text-muted-foreground">admin@mediapro.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
