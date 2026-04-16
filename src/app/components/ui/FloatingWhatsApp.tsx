import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/966501234567', '_blank');
  };

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 p-4 bg-popover/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl max-w-xs"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">{t('Chat with us', 'تحدث معنا')}</h4>
                  <p className="text-xs text-muted-foreground">{t('Online now', 'متاح الآن')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                'Need help? Chat with us on WhatsApp for instant support!',
                'تحتاج مساعدة؟ تواصل معنا عبر الواتساب للحصول على دعم فوري!'
              )}
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#25D366]/50 transition-all"
            >
              {t('Start Chat', 'ابدأ المحادثة')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/50 transition-all transform hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
