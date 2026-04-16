import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, dir } = useLanguage();

  const navLinks = [
    { path: '/', label: t('Home', 'الرئيسية') },
    { path: '/services', label: t('Services', 'الخدمات'), dropdown: true },
    { path: '/podcast-studio', label: t('Podcast Studio', 'استوديو البودكاست') },
    { path: '/educational-platform', label: t('Education', 'التعليم') },
    { path: '/offers', label: t('Offers', 'العروض') },
    { path: '/portfolio', label: t('Portfolio', 'الأعمال') },
    { path: '/blog', label: t('Blog', 'المدونة') },
    { path: '/about', label: t('About', 'من نحن') },
    { path: '/contact', label: t('Contact', 'تواصل') },
  ];

  const serviceLinks = [
    { path: '/services#marketing', label: t('Marketing', 'التسويق') },
    { path: '/services#media', label: t('Media Production', 'الإنتاج الإعلامي') },
    { path: '/podcast-studio', label: t('Podcast Studio', 'استوديو البودكاست') },
    { path: '/educational-platform', label: t('Education Platform', 'المنصة التعليمية') },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="font-[var(--font-display)] font-bold text-white text-xl">M</span>
              </div>
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <span className="font-[var(--font-display)] font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('MediaPro', 'ميديا برو')}
                </span>
                <p className="text-xs text-muted-foreground">{t('Agency & Education', 'دعاية وتعليم')}</p>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.slice(0, -2).map((link) => (
                link.dropdown ? (
                  <div key={link.path} className="relative group">
                    <button
                      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-popover/95 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-2xl"
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {serviceLinks.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-xl transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors relative group ${
                      location.pathname === link.path
                        ? 'text-foreground'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"></span>
                    )}
                  </Link>
                )
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'AR' : 'EN'}
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
                >
                  {t('Get Started', 'ابدأ الآن')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-[var(--font-display)] font-bold text-white text-lg">M</span>
            </div>
            <span className="font-[var(--font-display)] font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('MediaPro', 'ميديا برو')}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border bg-background"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground'
                        : 'text-foreground/80 hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 mt-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium text-center"
                >
                  {t('Get Started', 'ابدأ الآن')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
