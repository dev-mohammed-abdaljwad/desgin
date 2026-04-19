import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { Sparkles, Tag, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { usePricings } from '../../hooks/usePublicApi';
import type { Pricing } from '../../types/api';

export function Offers() {
  const { t, language } = useLanguage();

  // Fetch pricing packages from API
  const { data: pricingsList } = usePricings(1, 100);

  // Map API pricing packages to card format with bilingual support
  const offers = ((pricingsList as Pricing[]) || []).map((pricing: Pricing) => ({
    title: pricing.title,
    price: pricing.price,
    period: pricing.period,
    description: pricing.description,
    features: pricing.features.map((feature) => 
      language === 'en' ? feature.en : feature.ar
    ),
    highlighted: pricing.highlighted,
    ctaText: pricing.ctaText,
  }));

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary/10 border border-secondary/20 rounded-full">
              <Tag className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">{t('Limited Time Offers', 'عروض محدودة')}</span>
            </div>

            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('Special ', 'عروض ')}
              <span className="bg-gradient-to-r from-secondary via-gold to-primary bg-clip-text text-transparent">
                {t('Offers', 'خاصة')}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {t(
                'Exclusive deals and packages designed to help you get started with our services',
                'صفقات وحزم حصرية مصممة لمساعدتك على البدء مع خدماتنا'
              )}
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full">
                <TrendingDown className="w-4 h-4 text-secondary" />
                <span className="text-sm">{t('Save up to 40%', 'وفر حتى 40٪')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm">{t('Limited availability', 'توفر محدود')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm">{t('Exclusive benefits', 'مزايا حصرية')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-[#1A1333]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...offer} onCTAClick={() => window.location.href = '/contact'} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-gold/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-gold" />
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-6">
              {t('Don\'t Miss Out!', 'لا تفوت الفرصة!')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t(
                'These special offers won\'t last forever. Contact us today to claim your deal.',
                'هذه العروض الخاصة لن تدوم إلى الأبد. تواصل معنا اليوم للحصول على صفقتك.'
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-gold text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-secondary/50 transition-all transform hover:scale-105"
            >
              {t('Contact Us Now', 'تواصل معنا الآن')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
