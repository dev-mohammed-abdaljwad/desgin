import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { StatsCard } from '../components/ui/StatsCard';
import {
  GraduationCap,
  BookOpen,
  Video,
  Users,
  Award,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Star,
  Clock,
  Target,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';

export function EducationalPlatform() {
  const { t } = useLanguage();

  const forStudents = [
    {
      icon: Video,
      title: t('Watch Lessons', 'شاهد الدروس'),
      description: t(
        'Access high-quality video lessons from expert teachers anytime, anywhere.',
        'احصل على دروس فيديو عالية الجودة من معلمين خبراء في أي وقت وفي أي مكان.'
      ),
      gradient: 'from-primary to-accent',
    },
    {
      icon: BookOpen,
      title: t('Organized Subjects', 'مواد منظمة'),
      description: t(
        'Content organized by grade, subject, and difficulty level for easy learning.',
        'محتوى منظم حسب الصف والموضوع ومستوى الصعوبة للتعلم السهل.'
      ),
      gradient: 'from-accent to-secondary',
    },
    {
      icon: Target,
      title: t('Track Progress', 'تتبع التقدم'),
      description: t(
        'Monitor your learning progress with detailed analytics and reports.',
        'راقب تقدمك في التعلم باستخدام التحليلات والتقارير التفصيلية.'
      ),
      gradient: 'from-secondary to-gold',
    },
    {
      icon: Award,
      title: t('Get Certified', 'احصل على شهادة'),
      description: t(
        'Earn certificates upon course completion to showcase your achievements.',
        'احصل على شهادات عند إكمال الدورة لعرض إنجازاتك.'
      ),
      gradient: 'from-gold to-primary',
    },
  ];

  const forTeachers = [
    {
      icon: Video,
      title: t('Record in Studio', 'سجل في الاستوديو'),
      description: t(
        'Use our professional studio to record high-quality educational content.',
        'استخدم استوديونا الاحترافي لتسجيل محتوى تعليمي عالي الجودة.'
      ),
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Users,
      title: t('Reach Students', 'اوصل للطلاب'),
      description: t(
        'Connect with thousands of students eager to learn from you.',
        'تواصل مع آلاف الطلاب المتحمسين للتعلم منك.'
      ),
      gradient: 'from-accent to-gold',
    },
    {
      icon: TrendingUp,
      title: t('Earn Revenue', 'اكسب دخلاً'),
      description: t(
        'Generate income from your courses with our transparent revenue sharing.',
        'حقق دخلاً من دوراتك مع نموذج مشاركة الإيرادات الشفاف لدينا.'
      ),
      gradient: 'from-secondary to-primary',
    },
    {
      icon: Zap,
      title: t('Easy Management', 'إدارة سهلة'),
      description: t(
        'Intuitive dashboard to manage your courses, students, and analytics.',
        'لوحة تحكم بديهية لإدارة دوراتك وطلابك والتحليلات.'
      ),
      gradient: 'from-gold to-accent',
    },
  ];

  const studentPlans = [
    {
      title: t('Monthly', 'شهري'),
      price: '99',
      period: t('month', 'شهر'),
      description: t('Full access to all courses', 'وصول كامل لجميع الدورات'),
      features: [
        t('Unlimited course access', 'وصول غير محدود للدورات'),
        t('HD video quality', 'جودة فيديو عالية الدقة'),
        t('Downloadable resources', 'موارد قابلة للتحميل'),
        t('Progress tracking', 'تتبع التقدم'),
        t('Mobile app access', 'الوصول عبر تطبيق الموبايل'),
      ],
      highlighted: false,
      ctaText: t('Subscribe Now', 'اشترك الآن'),
    },
    {
      title: t('Quarterly', 'ربع سنوي'),
      price: '249',
      period: t('3 months', '3 أشهر'),
      description: t('Save 16% with quarterly plan', 'وفر 16٪ مع الخطة ربع السنوية'),
      features: [
        t('All Monthly features', 'جميع مميزات الخطة الشهرية'),
        t('Priority support', 'دعم ذو أولوية'),
        t('Live Q&A sessions', 'جلسات أسئلة وأجوبة مباشرة'),
        t('Exclusive webinars', 'ندوات حصرية'),
        t('Study groups access', 'الوصول إلى مجموعات الدراسة'),
        t('Certificate included', 'شهادة متضمنة'),
      ],
      highlighted: true,
      ctaText: t('Subscribe Now', 'اشترك الآن'),
    },
    {
      title: t('Yearly', 'سنوي'),
      price: '799',
      period: t('year', 'سنة'),
      description: t('Best value - Save 33%', 'أفضل قيمة - وفر 33٪'),
      features: [
        t('All Quarterly features', 'جميع مميزات الخطة ربع السنوية'),
        t('Personal learning coach', 'مدرب تعلم شخصي'),
        t('Offline downloads', 'تحميلات دون اتصال'),
        t('Early access to new courses', 'وصول مبكر للدورات الجديدة'),
        t('Premium certificates', 'شهادات مميزة'),
        t('Family plan (3 accounts)', 'خطة عائلية (3 حسابات)'),
      ],
      highlighted: false,
      ctaText: t('Subscribe Now', 'اشترك الآن'),
    },
  ];

  const stats = [
    {
      icon: Users,
      value: '10000',
      suffix: '+',
      label: t('Active Students', 'طالب نشط'),
    },
    {
      icon: GraduationCap,
      value: '200',
      suffix: '+',
      label: t('Expert Teachers', 'معلم خبير'),
    },
    {
      icon: BookOpen,
      value: '500',
      suffix: '+',
      label: t('Courses Available', 'دورة متاحة'),
    },
    {
      icon: Star,
      value: '4.8',
      suffix: '/5',
      label: t('Average Rating', 'متوسط التقييم'),
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: t('Quality Content', 'محتوى عالي الجودة'),
      description: t(
        'All courses are reviewed and approved by our quality assurance team.',
        'جميع الدورات مراجعة ومعتمدة من فريق ضمان الجودة لدينا.'
      ),
    },
    {
      icon: Clock,
      title: t('Learn at Your Pace', 'تعلم بالسرعة التي تناسبك'),
      description: t(
        'Study anytime, anywhere with lifetime access to purchased courses.',
        'ادرس في أي وقت وفي أي مكان مع وصول مدى الحياة للدورات المشتراة.'
      ),
    },
    {
      icon: CheckCircle,
      title: t('Certification', 'شهادات معتمدة'),
      description: t(
        'Receive recognized certificates to boost your academic credentials.',
        'احصل على شهادات معترف بها لتعزيز مؤهلاتك الأكاديمية.'
      ),
    },
  ];

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gold/10 border border-gold/20 rounded-full">
                <GraduationCap className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold">{t('Learn & Teach', 'تعلم وعلّم')}</span>
              </div>

              <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6 leading-tight">
                {t('Educational ', '')}
                <span className="bg-gradient-to-r from-gold via-primary to-accent bg-clip-text text-transparent">
                  {t('Platform', 'منصة تعليمية')}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t(
                  'Connect students with quality education and empower teachers to share their knowledge with the world.',
                  'اربط الطلاب بتعليم عالي الجودة ومكّن المعلمين من مشاركة معرفتهم مع العالم.'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-gold to-primary text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-gold/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  {t('Start Learning', 'ابدأ التعلم')}
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold text-lg hover:border-gold/50 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  {t('Become a Teacher', 'كن معلماً')}
                </Link>
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
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80"
                  alt="Educational Platform"
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-[#1A1333]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('For Students', 'للطلاب')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Everything you need to succeed in your studies',
                'كل ما تحتاجه للنجاح في دراستك'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forStudents.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Pricing Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Student Subscription Plans', 'خطط اشتراك الطلاب')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Choose the plan that fits your learning goals and budget',
                'اختر الخطة التي تناسب أهداف التعلم والميزانية الخاصة بك'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...plan} onCTAClick={() => window.location.href = '/contact'} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Teachers Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-secondary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl">
                {t('For Teachers', 'للمعلمين')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {t(
                'Share your knowledge and build your teaching career',
                'شارك معرفتك وابن مسيرتك التعليمية'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forTeachers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...item} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gold/50 transition-all transform hover:scale-105"
            >
              {t('Apply as Teacher', 'تقدم كمعلم')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Why Choose Our Platform', 'لماذا تختار منصتنا')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...benefit} gradient="from-gold to-primary" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-primary/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-6">
              {t('Start Your Learning Journey', 'ابدأ رحلة التعلم')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t(
                'Join thousands of students and teachers in our educational community',
                'انضم إلى آلاف الطلاب والمعلمين في مجتمعنا التعليمي'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-gold to-primary text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-gold/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t('Get Started', 'ابدأ الآن')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
