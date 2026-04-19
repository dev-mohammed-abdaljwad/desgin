import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { FAQ } from '../components/ui/FAQ';
import type { LucideIcon } from 'lucide-react';
import {
  Mic,
  Headphones,
  Radio,
  Video,
  Users,
  Clock,
  CheckCircle,
  Camera,
  Zap,
  Shield,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { useStudioAll } from '../../hooks/usePublicApi';
import type { StudioData, StudioFeature, StudioWhyUs } from '../../types/api';

// Icon mapping utility
const iconMap: Record<string, LucideIcon> = {
  Mic,
  Camera,
  Headphones,
  Users,
  Video,
  Radio,
  Zap,
  Shield,
  Award,
  Clock,
  CheckCircle,
};

const getIcon = (iconName: string): LucideIcon => iconMap[iconName] || Mic;

export function PodcastStudio() {
  const { t, language } = useLanguage();
  const { data: studioData } = useStudioAll();

  // Map API features to component format
  const features = ((studioData as StudioData)?.features || []).map((f: StudioFeature) => ({
    icon: getIcon(f.icon),
    title: language === 'en' ? f.title_en : f.title_ar,
    description: language === 'en' ? f.description_en : f.description_ar,
    gradient: f.gradient,
  }));

  // Map API packages to component format with bilingual features
  const packages = ((studioData as StudioData)?.packages || []).map((pkg) => ({
    title: pkg.title,
    price: pkg.price,
    period: pkg.period,
    description: pkg.description,
    features: pkg.features.map((f) => language === 'en' ? f.en : f.ar),
    highlighted: pkg.highlighted,
    ctaText: pkg.ctaText,
  }));

  // Map API why_us to component format with icon resolution
  const whyUs = ((studioData as StudioData)?.why_us || [])
    .reduce((acc: StudioWhyUs[], item, index) => {
      // Remove duplicates by keeping unique IDs
      if (index < 3) acc.push(item);
      return acc;
    }, [])
    .map((item: StudioWhyUs) => ({
      icon: getIcon(item.icon),
      title: language === 'en' ? item.title_en : item.title_ar,
      description: language === 'en' ? item.description_en : item.description_ar,
    }));

  // Map API FAQ items with bilingual support
  const faqItems = ((studioData as StudioData)?.faq || []).map((item) => ({
    question: language === 'en' ? item.question_en : item.question_ar,
    answer: language === 'en' ? item.answer_en : item.answer_ar,
  }));

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent/10 border border-accent/20 rounded-full">
                <Mic className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{t('Professional Studio', 'استوديو احترافي')}</span>
              </div>

              <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6 leading-tight">
                {t('Podcast ', '')}
                <span className="bg-gradient-to-r from-accent via-secondary to-gold bg-clip-text text-transparent">
                  {t('Studio', 'استوديو بودكاست')}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t(
                  'Professional podcast recording studio with state-of-the-art equipment, expert team, and full production services.',
                  'استوديو تسجيل بودكاست احترافي مع أحدث المعدات وفريق خبراء وخدمات إنتاج كاملة.'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-accent/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {t('Book Studio', 'احجز الاستوديو')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#pricing"
                  className="px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold text-lg hover:border-accent/50 transition-all flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  {t('View Packages', 'عرض الباقات')}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80"
                  alt="Podcast Studio"
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-3xl"></div>

                {/* Floating Stats */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-8 right-8 p-4 bg-card/80 backdrop-blur-xl border border-border rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-bold text-2xl">100+</p>
                      <p className="text-sm text-muted-foreground">{t('Podcasts', 'بودكاست')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-[#1A1333]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Studio Features', 'مميزات الاستوديو')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Everything you need to create professional podcasts',
                'كل ما تحتاجه لإنشاء بودكاست احترافي'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 lg:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Studio Packages', 'باقات الاستوديو')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Flexible booking options to fit your podcast production needs',
                'خيارات حجز مرنة لتناسب احتياجات إنتاج البودكاست الخاص بك'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...pkg} onCTAClick={() => window.location.href = '/contact'} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Why Choose Our Studio', 'لماذا تختار استوديونا')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...item} gradient="from-accent to-secondary" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-4">
              {t('Frequently Asked Questions', 'الأسئلة الشائعة')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FAQ items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-6">
              {t('Ready to Record?', 'مستعد للتسجيل؟')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t(
                'Book your studio session today and start creating amazing podcast content',
                'احجز جلسة الاستوديو الخاصة بك اليوم وابدأ في إنشاء محتوى بودكاست مذهل'
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-accent/50 transition-all transform hover:scale-105"
            >
              {t('Book Your Session', 'احجز جلستك')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
