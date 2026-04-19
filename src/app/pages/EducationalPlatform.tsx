import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PricingCard } from '../components/ui/PricingCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { StatsCard } from '../components/ui/StatsCard';
import type { LucideIcon } from 'lucide-react';
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
import { useEducationalStudentFeatures, useEducationalTeacherFeatures, useEducationalHighlightedPlans, useEducationalStats, useEducationalBenefits } from '../../hooks/usePublicApi';
import type { EducationalFeature, EducationalPlan, EducationalStat, EducationalBenefit } from '../../types/api';

// Icon mapping utility
const iconMap: Record<string, LucideIcon> = {
  Video,
  BookOpen,
  Target,
  Award,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Mic: Video,
  Camera: Video,
};

const getIcon = (iconName: string): LucideIcon => iconMap[iconName] || Video;

export function EducationalPlatform() {
  const { t, language } = useLanguage();
  const { data: studentFeaturesData } = useEducationalStudentFeatures();
  const { data: teacherFeaturesData } = useEducationalTeacherFeatures();
  const { data: plansData } = useEducationalHighlightedPlans();
  const { data: statsData } = useEducationalStats(1, 10);
  const { data: benefitsData } = useEducationalBenefits(1, 10);

  // Transform API student features to component format
  const forStudents = (studentFeaturesData || []).map((feature: EducationalFeature, index: number) => ({
    icon: getIcon(feature.icon),
    title: language === 'en' ? feature.title_en : feature.title_ar,
    description: language === 'en' ? feature.description_en : feature.description_ar,
    gradient: feature.gradient,
  }));

  // Transform API teacher features to component format
  const forTeachers = (teacherFeaturesData || []).map((feature: EducationalFeature, index: number) => ({
    icon: getIcon(feature.icon),
    title: language === 'en' ? feature.title_en : feature.title_ar,
    description: language === 'en' ? feature.description_en : feature.description_ar,
    gradient: feature.gradient,
  }));

  // Transform API plans to component format
  const studentPlans = (plansData || []).map((plan: EducationalPlan, index: number) => ({
    title: language === 'en' ? plan.title_en : plan.title_ar,
    price: plan.price,
    period: language === 'en' ? plan.period_en : plan.period_ar,
    description: language === 'en' ? plan.description_en : plan.description_ar,
    features: plan.features.map((f: any) => language === 'en' ? f.en : f.ar),
    highlighted: plan.is_highlighted,
    ctaText: language === 'en' ? plan.cta_text_en : plan.cta_text_ar,
  }));

  // Transform API stats to component format
  const stats = (statsData || []).map((stat: EducationalStat, index: number) => ({
    icon: getIcon(stat.icon),
    value: stat.value,
    suffix: stat.suffix,
    label: language === 'en' ? stat.label_en : stat.label_ar,
  }));

  // Transform API benefits to component format
  const benefits = (benefitsData || []).map((benefit: EducationalBenefit, index: number) => ({
    icon: getIcon(benefit.icon),
    title: language === 'en' ? benefit.title_en : benefit.title_ar,
    description: language === 'en' ? benefit.description_en : benefit.description_ar,
  }));

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

              <h1 className="font-[var(--font-display)] text-5xl lg:text-7xl mb-6 leading-tight">
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
              <StatsCard key={`stat-${stat.label}-${stat.value}`} {...stat} />
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
              <h2 className="font-[var(--font-display)] text-3xl lg:text-4xl">
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
                key={`student-${item.title}`}
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
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl mb-4">
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
                key={`plan-${plan.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...plan} onCTAClick={() => globalThis.location.href = '/contact'} />
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
              <h2 className="font-[var(--font-display)] text-3xl lg:text-4xl">
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
                key={`teacher-${item.title}`}
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
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl mb-4">
              {t('Why Choose Our Platform', 'لماذا تختار منصتنا')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={`benefit-${benefit.title}`}
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
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl mb-6">
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
