import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { Sparkles, Tag, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function Offers() {
  const { t } = useLanguage();

  const offers = [
    {
      title: t('Social Media Starter', 'باقة السوشيال ميديا المبتدئة'),
      price: '1,499',
      period: t('month', 'شهر'),
      description: t('Perfect for small businesses', 'مثالية للشركات الصغيرة'),
      features: [
        t('15 social media posts/month', '15 منشور شهرياً'),
        t('Basic graphic design', 'تصميم جرافيكي أساسي'),
        t('Content calendar', 'تقويم محتوى'),
        t('Monthly analytics report', 'تقرير تحليلي شهري'),
        t('2 platforms management', 'إدارة منصتين'),
      ],
      highlighted: false,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
    {
      title: t('Podcast Launch Package', 'باقة إطلاق البودكاست'),
      price: '4,999',
      period: t('one-time', 'دفعة واحدة'),
      description: t('Everything to start your podcast', 'كل ما تحتاجه لبدء بودكاستك'),
      features: [
        t('3 full-day studio sessions', '3 جلسات يوم كامل'),
        t('Professional editing (6 episodes)', 'تحرير احترافي (6 حلقات)'),
        t('Podcast cover design', 'تصميم غلاف البودكاست'),
        t('Distribution to all platforms', 'توزيع على جميع المنصات'),
        t('Social media promotion package', 'باقة ترويج على السوشيال ميديا'),
        t('1 month free hosting', 'شهر استضافة مجاناً'),
      ],
      highlighted: true,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
    {
      title: t('Student Annual Plan', 'خطة الطالب السنوية'),
      price: '599',
      period: t('year', 'سنة'),
      description: t('Save 40% on education platform', 'وفر 40٪ على المنصة التعليمية'),
      features: [
        t('All courses unlimited access', 'وصول غير محدود لجميع الدورات'),
        t('HD & offline downloads', 'تحميلات HD ودون اتصال'),
        t('Personal learning coach', 'مدرب تعلم شخصي'),
        t('Premium certificates', 'شهادات مميزة'),
        t('Live Q&A sessions', 'جلسات أسئلة وأجوبة مباشرة'),
        t('Early access to new content', 'وصول مبكر للمحتوى الجديد'),
      ],
      highlighted: false,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
    {
      title: t('Teacher Launch Offer', 'عرض إطلاق المعلم'),
      price: '0',
      period: t('first 3 months', 'أول 3 أشهر'),
      description: t('Free for first 50 teachers', 'مجاناً لأول 50 معلماً'),
      features: [
        t('Free studio recording (4 hours)', 'تسجيل مجاني في الاستوديو (4 ساعات)'),
        t('Professional video editing', 'مونتاج فيديو احترافي'),
        t('Course setup assistance', 'المساعدة في إعداد الدورة'),
        t('0% platform fee (3 months)', '0٪ عمولة منصة (3 أشهر)'),
        t('Marketing support', 'دعم تسويقي'),
        t('Priority listing', 'قائمة ذات أولوية'),
      ],
      highlighted: true,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
    {
      title: t('Brand Package', 'باقة العلامة التجارية'),
      price: '7,999',
      period: t('one-time', 'دفعة واحدة'),
      description: t('Complete branding solution', 'حل كامل للعلامة التجارية'),
      features: [
        t('Logo design (3 concepts)', 'تصميم شعار (3 مفاهيم)'),
        t('Brand guidelines document', 'دليل إرشادات العلامة التجارية'),
        t('Business card & stationery', 'بطاقة عمل وقرطاسية'),
        t('Social media templates (20)', 'قوالب سوشيال ميديا (20)'),
        t('Website design (5 pages)', 'تصميم موقع (5 صفحات)'),
        t('6 months support', '6 أشهر دعم'),
      ],
      highlighted: false,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
    {
      title: t('Video Production Bundle', 'حزمة إنتاج الفيديو'),
      price: '9,999',
      period: t('package', 'باقة'),
      description: t('5 professional videos', '5 فيديوهات احترافية'),
      features: [
        t('5 professional videos (up to 2 min each)', '5 فيديوهات احترافية (حتى 2 دقيقة لكل منها)'),
        t('Full production crew', 'طاقم إنتاج كامل'),
        t('Professional editing & effects', 'تحرير وتأثيرات احترافية'),
        t('Background music & voiceover', 'موسيقى خلفية وتعليق صوتي'),
        t('Social media optimization', 'تحسين للسوشيال ميديا'),
        t('2 revision rounds per video', 'جولتان مراجعة لكل فيديو'),
      ],
      highlighted: false,
      ctaText: t('Claim Offer', 'احصل على العرض'),
    },
  ];

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
