import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ServiceCard } from '../components/ui/ServiceCard';
import { FAQ } from '../components/ui/FAQ';
import { useServicesByCategory } from '../../hooks/usePublicApi';
import type { Service } from '../../types/api';
import type { LucideIcon } from 'lucide-react';
import {
  Megaphone,
  Target,
  TrendingUp,
  Share2,
  Palette,
  Video,
  Camera,
  Wand2,
  Mic,
  Headphones,
  Radio,
  Film,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Link as LinkIcon,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';

// ============= Icon Mapping =============
const categoryIconMap: Record<string, LucideIcon> = {
  marketing: Megaphone,
  'social-media': Share2,
  design: Palette,
  'video-production': Video,
  podcast: Mic,
  education: GraduationCap,
  photography: Camera,
  ads: TrendingUp,
};

function getIconForCategory(category: string): LucideIcon {
  return categoryIconMap[category] || Megaphone;
}

export function Services() {
  const { t, language } = useLanguage();
  
  // Fetch services by category from API
  const { data: marketingData, loading: marketingLoading } = useServicesByCategory('marketing');
  const { data: mediaData, loading: mediaLoading } = useServicesByCategory('media');
  const { data: podcastData, loading: podcastLoading } = useServicesByCategory('podcast');
  const { data: educationData, loading: educationLoading } = useServicesByCategory('education');

  // Map API services to ServiceCard props
  const mapAPIServices = (services: Service[]) => 
    (services || []).map((service: Service) => ({
      icon: getIconForCategory(service.category),
      title: language === 'en' ? service.title.en : service.title.ar,
      description: language === 'en' ? service.description.en : service.description.ar,
      link: `/services/${service.id}`,
      gradient: 'from-primary to-accent',
    }));

  const marketingServices = mapAPIServices((marketingData as Service[]) || []);
  const mediaServices = mapAPIServices((mediaData as Service[]) || []);
  const podcastServices = mapAPIServices((podcastData as Service[]) || []);
  const educationServices = mapAPIServices((educationData as Service[]) || []);

  const faqItems = [
    {
      question: t('What services do you offer?', 'ما هي الخدمات التي تقدمونها؟'),
      answer: t(
        'We offer a comprehensive range of services including digital marketing, branding, graphic design, video production, podcast recording, and an online educational platform for students and teachers.',
        'نقدم مجموعة شاملة من الخدمات تشمل التسويق الرقمي، العلامات التجارية، التصميم الجرافيكي، إنتاج الفيديو، تسجيل البودكاست، ومنصة تعليمية إلكترونية للطلاب والمعلمين.'
      ),
    },
    {
      question: t('How long does a typical project take?', 'كم من الوقت يستغرق المشروع النموذجي؟'),
      answer: t(
        'Project timelines vary depending on scope and complexity. Simple designs can be completed in 3-5 days, while comprehensive marketing campaigns may take 2-4 weeks. We provide detailed timelines during our initial consultation.',
        'تختلف مدة المشاريع حسب النطاق والتعقيد. يمكن إكمال التصاميم البسيطة في 3-5 أيام، بينما قد تستغرق الحملات التسويقية الشاملة 2-4 أسابيع. نقدم جداول زمنية تفصيلية خلال استشارتنا الأولية.'
      ),
    },
    {
      question: t('Do you offer package deals?', 'هل تقدمون عروض حزم؟'),
      answer: t(
        'Yes! We offer various package deals that combine multiple services at discounted rates. Check our Offers page for current promotions and bundles.',
        'نعم! نقدم عروض حزم متنوعة تجمع خدمات متعددة بأسعار مخفضة. تحقق من صفحة العروض للعروض الترويجية والحزم الحالية.'
      ),
    },
    {
      question: t('Can I book your podcast studio by the hour?', 'هل يمكنني حجز استوديو البودكاست بالساعة؟'),
      answer: t(
        'Absolutely! Our podcast studio is available for hourly bookings. We also offer half-day and full-day packages with discounted rates. All bookings include a professional sound engineer.',
        'بالتأكيد! استوديو البودكاست متاح للحجز بالساعة. نقدم أيضاً حزم نصف يوم ويوم كامل بأسعار مخفضة. جميع الحجوزات تشمل مهندس صوت محترف.'
      ),
    },
    {
      question: t('How does the educational platform work?', 'كيف تعمل المنصة التعليمية؟'),
      answer: t(
        'Teachers can record lessons in our studio or upload their own content. Students subscribe to access courses. We handle all technical aspects including hosting, payment processing, and content delivery.',
        'يمكن للمعلمين تسجيل الدروس في استوديونا أو تحميل محتواهم الخاص. يشترك الطلاب للوصول إلى الدورات. نتعامل مع جميع الجوانب التقنية بما في ذلك الاستضافة ومعالجة الدفع وتوصيل المحتوى.'
      ),
    },
  ];

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('Our ', 'خدماتنا ')}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t('Services', '')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(
                'Comprehensive creative and educational solutions designed to help your business and ideas grow',
                'حلول إبداعية وتعليمية شاملة مصممة لمساعدة عملك وأفكارك على النمو'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marketing Services */}
      <section id="marketing" className="relative py-20 lg:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('Marketing Services', 'خدمات التسويق')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Strategic marketing solutions to grow your brand and reach your audience',
                'حلول تسويقية استراتيجية لتنمية علامتك التجارية والوصول إلى جمهورك'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Services */}
      <section id="media" className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-gold flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('Media Production Services', 'خدمات الإنتاج الإعلامي')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Creative visual content that tells your story and engages your audience',
                'محتوى بصري إبداعي يحكي قصتك ويجذب جمهورك'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Services */}
      <section id="podcast" className="relative py-20 lg:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('Podcast Services', 'خدمات البودكاست')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Professional podcast production from recording to distribution',
                'إنتاج بودكاست احترافي من التسجيل إلى التوزيع'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {podcastServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/podcast-studio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              {t('Explore Podcast Studio', 'استكشف استوديو البودكاست')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Education Services */}
      <section id="education" className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('Education Services', 'الخدمات التعليمية')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Comprehensive online learning platform for students and educators',
                'منصة تعلم إلكترونية شاملة للطلاب والمعلمين'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {educationServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/educational-platform"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              {t('Explore Education Platform', 'استكشف المنصة التعليمية')}
              <ArrowRight className="w-5 h-5" />
            </Link>
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
            <p className="text-lg text-muted-foreground">
              {t('Find answers to common questions about our services', 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا')}
            </p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-6">
              {t('Ready to Start Your Project?', 'مستعد لبدء مشروعك؟')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t(
                'Get in touch with us today and let us bring your ideas to life',
                'تواصل معنا اليوم ودعنا نحيي أفكارك'
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              {t('Contact Us', 'تواصل معنا')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
