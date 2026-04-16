import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="font-[var(--font-display)] font-bold text-[12rem] lg:text-[16rem] leading-none bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Message */}
          <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-5xl mb-4">
            {t('Page Not Found', 'الصفحة غير موجودة')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t(
              "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
              'عذراً! الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.'
            )}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t('Back to Home', 'العودة للرئيسية')}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {t('Contact Us', 'تواصل معنا')}
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              {t('Or try one of these pages:', 'أو جرب إحدى هذه الصفحات:')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/services"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {t('Services', 'الخدمات')}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/podcast-studio"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {t('Podcast Studio', 'استوديو البودكاست')}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/educational-platform"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {t('Education', 'التعليم')}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/portfolio"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {t('Portfolio', 'الأعمال')}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/blog"
                className="text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {t('Blog', 'المدونة')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}