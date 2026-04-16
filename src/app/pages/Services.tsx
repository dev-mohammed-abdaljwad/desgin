import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ServiceCard } from '../components/ui/ServiceCard';
import { FAQ } from '../components/ui/FAQ';
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

export function Services() {
  const { t } = useLanguage();

  const marketingServices = [
    {
      icon: Megaphone,
      title: t('Branding & Identity', 'العلامة التجارية والهوية'),
      description: t(
        'Create a memorable brand identity that resonates with your target audience.',
        'أنشئ هوية تجارية لا تُنسى تتناسب مع جمهورك المستهدف.'
      ),
      gradient: 'from-primary to-accent',
    },
    {
      icon: Target,
      title: t('Digital Marketing Strategy', 'استراتيجية التسويق الرقمي'),
      description: t(
        'Data-driven marketing strategies tailored to your business goals.',
        'استراتيجيات تسويقية قائمة على البيانات ومصممة خصيصاً لأهداف عملك.'
      ),
      gradient: 'from-accent to-secondary',
    },
    {
      icon: TrendingUp,
      title: t('SEO & SEM', 'تحسين محركات البحث والتسويق عبر محركات البحث'),
      description: t(
        'Improve your online visibility and drive qualified traffic to your website.',
        'حسّن ظهورك على الإنترنت واجذب زوار مؤهلين إلى موقعك.'
      ),
      gradient: 'from-secondary to-gold',
    },
    {
      icon: Share2,
      title: t('Social Media Management', 'إدارة وسائل التواصل الاجتماعي'),
      description: t(
        'Engage your audience with compelling content across all social platforms.',
        'تفاعل مع جمهورك بمحتوى مقنع عبر جميع منصات التواصل الاجتماعي.'
      ),
      gradient: 'from-primary to-secondary',
    },
  ];

  const mediaServices = [
    {
      icon: Palette,
      title: t('Graphic Design', 'التصميم الجرافيكي'),
      description: t(
        'Eye-catching designs for print and digital media that communicate your message.',
        'تصاميم جذابة للطباعة والوسائط الرقمية توصل رسالتك.'
      ),
      gradient: 'from-accent to-primary',
    },
    {
      icon: Video,
      title: t('Video Production', 'إنتاج الفيديو'),
      description: t(
        'Professional video production from concept to final edit.',
        'إنتاج فيديو احترافي من الفكرة إلى المونتاج النهائي.'
      ),
      gradient: 'from-secondary to-accent',
    },
    {
      icon: Camera,
      title: t('Photography', 'التصوير الفوتوغرافي'),
      description: t(
        'High-quality product, event, and corporate photography services.',
        'خدمات تصوير احترافية للمنتجات والفعاليات والشركات.'
      ),
      gradient: 'from-gold to-primary',
    },
    {
      icon: Wand2,
      title: t('Motion Graphics', 'الرسوم المتحركة'),
      description: t(
        'Engaging animated content that brings your ideas to life.',
        'محتوى متحرك جذاب يحيي أفكارك.'
      ),
      gradient: 'from-primary to-gold',
    },
  ];

  const podcastServices = [
    {
      icon: Mic,
      title: t('Studio Recording', 'التسجيل في الاستوديو'),
      description: t(
        'Professional podcast studio with state-of-the-art equipment.',
        'استوديو بودكاست احترافي مع أحدث المعدات.'
      ),
      gradient: 'from-accent to-secondary',
      link: '/podcast-studio',
    },
    {
      icon: Headphones,
      title: t('Audio Editing', 'تحرير الصوت'),
      description: t(
        'Expert audio editing and mastering for crystal-clear sound.',
        'تحرير صوت وماسترينج احترافي لصوت نقي.'
      ),
      gradient: 'from-secondary to-primary',
      link: '/podcast-studio',
    },
    {
      icon: Radio,
      title: t('Podcast Distribution', 'توزيع البودكاست'),
      description: t(
        'Get your podcast on all major platforms with our distribution service.',
        'انشر بودكاستك على جميع المنصات الرئيسية مع خدمة التوزيع لدينا.'
      ),
      gradient: 'from-primary to-accent',
      link: '/podcast-studio',
    },
    {
      icon: Film,
      title: t('Video Podcast', 'بودكاست فيديو'),
      description: t(
        'Multi-camera video podcast recording and production.',
        'تسجيل وإنتاج بودكاست فيديو بكاميرات متعددة.'
      ),
      gradient: 'from-gold to-accent',
      link: '/podcast-studio',
    },
  ];

  const educationServices = [
    {
      icon: GraduationCap,
      title: t('For Students', 'للطلاب'),
      description: t(
        'Access high-quality educational content from expert teachers.',
        'احصل على محتوى تعليمي عالي الجودة من معلمين خبراء.'
      ),
      gradient: 'from-primary to-secondary',
      link: '/educational-platform',
    },
    {
      icon: BookOpen,
      title: t('For Teachers', 'للمعلمين'),
      description: t(
        'Record and upload your lessons, reach thousands of students.',
        'سجّل ونشر دروسك، واصل آلاف الطلاب.'
      ),
      gradient: 'from-accent to-gold',
      link: '/educational-platform',
    },
    {
      icon: Users,
      title: t('Course Management', 'إدارة الدورات'),
      description: t(
        'Complete learning management system for organizing courses.',
        'نظام إدارة تعلم كامل لتنظيم الدورات.'
      ),
      gradient: 'from-secondary to-primary',
      link: '/educational-platform',
    },
    {
      icon: Award,
      title: t('Certification', 'الشهادات'),
      description: t(
        'Issue certificates to students upon course completion.',
        'إصدار شهادات للطلاب عند إكمال الدورة.'
      ),
      gradient: 'from-gold to-accent',
      link: '/educational-platform',
    },
  ];

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
