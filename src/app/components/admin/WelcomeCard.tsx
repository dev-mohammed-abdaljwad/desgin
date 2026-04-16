import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function WelcomeCard() {
  const { t } = useLanguage();
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6 relative overflow-hidden p-8 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-[var(--font-display)] font-bold text-2xl text-white mb-1">
                  {t('Welcome to MediaPro Admin', 'مرحباً في إدارة ميديا برو')}
                </h2>
                <p className="text-white/80">
                  {t('Your unified content management system', 'نظام إدارة المحتوى الموحد')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <p className="text-3xl font-bold text-white mb-1">9</p>
              <p className="text-sm text-white/80">{t('Management Modules', 'وحدات الإدارة')}</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <p className="text-3xl font-bold text-white mb-1">2</p>
              <p className="text-sm text-white/80">{t('Languages Supported', 'اللغات المدعومة')}</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <p className="text-3xl font-bold text-white mb-1">100%</p>
              <p className="text-sm text-white/80">{t('Unified Design', 'تصميم موحد')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/90 text-sm">
              {t(
                'Manage services, bookings, content, and more from one powerful dashboard.',
                'إدارة الخدمات، الحجوزات، المحتوى والمزيد من لوحة تحكم واحدة قوية.'
              )}
            </p>
            <button
              onClick={() => setShow(false)}
              className="ml-4 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {t('Get Started', 'ابدأ الآن')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
