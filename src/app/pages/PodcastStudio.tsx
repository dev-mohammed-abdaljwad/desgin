import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { FAQ } from '../components/ui/FAQ';
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

export function PodcastStudio() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Mic,
      title: t('Professional Equipment', 'معدات احترافية'),
      description: t(
        'State-of-the-art microphones, mixers, and recording equipment.',
        'ميكروفونات ومكسرات ومعدات تسجيل على أحدث طراز.'
      ),
      gradient: 'from-primary to-accent',
    },
    {
      icon: Camera,
      title: t('Multi-Camera Setup', 'إعداد متعدد الكاميرات'),
      description: t(
        'Professional video recording with multiple camera angles.',
        'تسجيل فيديو احترافي بزوايا كاميرا متعددة.'
      ),
      gradient: 'from-accent to-secondary',
    },
    {
      icon: Headphones,
      title: t('Soundproof Rooms', 'غرف عازلة للصوت'),
      description: t(
        'Acoustically treated rooms for crystal-clear audio quality.',
        'غرف معالجة صوتياً لجودة صوت نقية.'
      ),
      gradient: 'from-secondary to-gold',
    },
    {
      icon: Users,
      title: t('Expert Team', 'فريق خبراء'),
      description: t(
        'Professional sound engineers and producers to assist you.',
        'مهندسو صوت ومنتجون محترفون لمساعدتك.'
      ),
      gradient: 'from-gold to-primary',
    },
    {
      icon: Video,
      title: t('Video Editing', 'مونتاج الفيديو'),
      description: t(
        'Professional video editing and post-production services.',
        'خدمات مونتاج فيديو وما بعد الإنتاج الاحترافية.'
      ),
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Radio,
      title: t('Distribution Support', 'دعم التوزيع'),
      description: t(
        'Help publishing your podcast to all major platforms.',
        'المساعدة في نشر بودكاستك على جميع المنصات الرئيسية.'
      ),
      gradient: 'from-accent to-gold',
    },
  ];

  const packages = [
    {
      title: t('Hourly', 'بالساعة'),
      price: '500',
      period: t('hour', 'ساعة'),
      description: t('Perfect for short recordings', 'مثالي للتسجيلات القصيرة'),
      features: [
        t('1 hour studio time', 'ساعة واحدة في الاستوديو'),
        t('Professional microphones', 'ميكروفونات احترافية'),
        t('Sound engineer included', 'مهندس صوت متضمن'),
        t('Basic audio editing', 'تحرير صوت أساسي'),
        t('Complimentary refreshments', 'مرطبات مجانية'),
      ],
      highlighted: false,
      ctaText: t('Book Now', 'احجز الآن'),
    },
    {
      title: t('Half Day', 'نصف يوم'),
      price: '1,800',
      period: t('4 hours', '4 ساعات'),
      description: t('Great for episode recording', 'رائع لتسجيل الحلقات'),
      features: [
        t('4 hours studio time', '4 ساعات في الاستوديو'),
        t('Multi-camera video setup', 'إعداد فيديو متعدد الكاميرات'),
        t('Dedicated sound engineer', 'مهندس صوت مخصص'),
        t('Advanced audio editing', 'تحرير صوت متقدم'),
        t('Video editing (1 hour)', 'مونتاج فيديو (ساعة واحدة)'),
        t('Catering available', 'خدمة الطعام متاحة'),
      ],
      highlighted: true,
      ctaText: t('Book Now', 'احجز الآن'),
    },
    {
      title: t('Full Day', 'يوم كامل'),
      price: '3,200',
      period: t('8 hours', '8 ساعات'),
      description: t('Best value for multiple episodes', 'أفضل قيمة لحلقات متعددة'),
      features: [
        t('8 hours studio time', '8 ساعات في الاستوديو'),
        t('Premium equipment access', 'الوصول إلى المعدات المتميزة'),
        t('Full production team', 'فريق إنتاج كامل'),
        t('Professional editing & mastering', 'تحرير وماسترينج احترافي'),
        t('Video editing (3 hours)', 'مونتاج فيديو (3 ساعات)'),
        t('Distribution assistance', 'المساعدة في التوزيع'),
        t('Lunch & refreshments', 'غداء ومرطبات'),
      ],
      highlighted: false,
      ctaText: t('Book Now', 'احجز الآن'),
    },
  ];

  const whyUs = [
    {
      icon: Zap,
      title: t('Quick Turnaround', 'تسليم سريع'),
      description: t(
        'Get your edited podcast ready within 48 hours.',
        'احصل على بودكاستك المحرر جاهزاً خلال 48 ساعة.'
      ),
    },
    {
      icon: Shield,
      title: t('Professional Quality', 'جودة احترافية'),
      description: t(
        'Studio-grade equipment and expert production team.',
        'معدات من مستوى الاستوديو وفريق إنتاج خبير.'
      ),
    },
    {
      icon: Award,
      title: t('Proven Track Record', 'سجل حافل'),
      description: t(
        'Worked with 100+ podcasters and creators.',
        'عملنا مع أكثر من 100 مقدم بودكاست ومبدع.'
      ),
    },
  ];

  const faqItems = [
    {
      question: t('What equipment is available in the studio?', 'ما هي المعدات المتاحة في الاستوديو؟'),
      answer: t(
        'Our studio features professional-grade microphones (Shure SM7B, Rode Procaster), digital mixer, multi-track recording software, soundproof booth, multi-camera video setup, and professional lighting.',
        'يحتوي استوديونا على ميكروفونات احترافية (Shure SM7B, Rode Procaster)، مكسر رقمي، برنامج تسجيل متعدد المسارات، كابينة عازلة للصوت، إعداد فيديو متعدد الكاميرات، وإضاءة احترافية.'
      ),
    },
    {
      question: t('Do I need to bring anything?', 'هل أحتاج لإحضار أي شيء؟'),
      answer: t(
        'Just bring yourself and your content! We provide all equipment, including headphones. However, you are welcome to bring your own laptop or notes.',
        'فقط أحضر نفسك ومحتواك! نوفر جميع المعدات، بما في ذلك سماعات الرأس. ومع ذلك، يمكنك إحضار الكمبيوتر المحمول أو الملاحظات الخاصة بك.'
      ),
    },
    {
      question: t('Can I record with guests remotely?', 'هل يمكنني التسجيل مع ضيوف عن بعد؟'),
      answer: t(
        'Yes! We have setup for remote guest recording with high-quality audio and video connections. Perfect for interviewing guests who cannot be physically present.',
        'نعم! لدينا إعداد لتسجيل الضيوف عن بعد مع اتصالات صوت وفيديو عالية الجودة. مثالي لمقابلة الضيوف الذين لا يمكنهم الحضور شخصياً.'
      ),
    },
    {
      question: t('What is included in the editing service?', 'ما الذي يتضمنه خدمة التحرير؟'),
      answer: t(
        'Our editing service includes noise reduction, audio enhancement, removing pauses and filler words, adding intro/outro music, and basic mastering. Video editing includes multi-camera switching, color correction, and graphics.',
        'تشمل خدمة التحرير لدينا تقليل الضوضاء، تحسين الصوت، إزالة التوقفات والكلمات الحشو، إضافة موسيقى المقدمة/الخاتمة، والماسترينج الأساسي. يتضمن مونتاج الفيديو التبديل بين الكاميرات المتعددة، تصحيح الألوان، والرسومات.'
      ),
    },
    {
      question: t('How do I book the studio?', 'كيف أحجز الاستوديو؟'),
      answer: t(
        'You can book directly through our website, call us, or send a WhatsApp message. We recommend booking at least 3-5 days in advance to secure your preferred time slot.',
        'يمكنك الحجز مباشرة من خلال موقعنا، الاتصال بنا، أو إرسال رسالة واتساب. نوصي بالحجز قبل 3-5 أيام على الأقل لضمان الوقت المفضل لديك.'
      ),
    },
  ];

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
