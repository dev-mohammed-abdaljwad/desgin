import { Link, useLocation } from 'react-router';
import { Home, Briefcase, Mic, GraduationCap, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function MobileNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('Home', 'الرئيسية') },
    { path: '/services', icon: Briefcase, label: t('Services', 'الخدمات') },
    { path: '/podcast-studio', icon: Mic, label: t('Podcast', 'بودكاست') },
    { path: '/educational-platform', icon: GraduationCap, label: t('Learn', 'تعلم') },
    { path: '/contact', icon: Phone, label: t('Contact', 'تواصل') },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
