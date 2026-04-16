import { Link, useLocation } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Mic2, 
  FolderKanban, 
  FileText, 
  Tag, 
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminSidebar() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isRTL = language === 'ar';

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t('Dashboard', 'لوحة التحكم'),
      path: '/admin',
    },
    {
      icon: Briefcase,
      label: t('Services', 'الخدمات'),
      path: '/admin/services',
    },
    {
      icon: Mic2,
      label: t('Podcast Bookings', 'حجوزات البودكاست'),
      path: '/admin/bookings',
    },
    {
      icon: FolderKanban,
      label: t('Portfolio', 'الأعمال'),
      path: '/admin/portfolio',
    },
    {
      icon: FileText,
      label: t('Blog & Reels', 'المدونة والفيديوهات'),
      path: '/admin/blog',
    },
    {
      icon: Tag,
      label: t('Offers', 'العروض'),
      path: '/admin/offers',
    },
    {
      icon: GraduationCap,
      label: t('Educational Products', 'المنتجات التعليمية'),
      path: '/admin/education',
    },
    {
      icon: MessageSquare,
      label: t('Leads & Contacts', 'العملاء المحتملون'),
      path: '/admin/leads',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? '80px' : '280px' }}
      className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-screen bg-sidebar border-${isRTL ? 'l' : 'r'} border-sidebar-border z-50 flex flex-col`}
    >
      {/* Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-[var(--font-display)] font-bold text-lg">M</span>
              </div>
              <div>
                <h2 className="font-[var(--font-display)] font-bold text-sidebar-foreground">MediaPro</h2>
                <p className="text-xs text-muted-foreground">{t('Admin', 'الإدارة')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          {isRTL ? (
            collapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          ) : (
            collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                ${active 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-all"
        >
          <Settings className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium truncate"
              >
                {t('Settings', 'الإعدادات')}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        
        <button
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium truncate"
              >
                {t('Exit Admin', 'خروج من الإدارة')}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
