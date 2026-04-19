import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { BlogCard } from '../components/ui/BlogCard';
import { StatsCard } from '../components/ui/StatsCard';
import { useServices, useFeaturedProjects, useFeaturedPosts, usePageBySlug, useFeaturedTestimonials, useWhyChooseUs } from '../../hooks/usePublicApi';
import type { LucideIcon } from 'lucide-react';
import {
  Megaphone,
  Video,
  Mic,
  GraduationCap,
  Palette,
  Share2,
  Camera,
  TrendingUp,
  Users,
  Award,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Shield,
  DollarSign,
  Headphones,
  RefreshCw,
} from 'lucide-react';
import type { Service, Project, Post, Testimonial, WhyChooseUs } from '../../types/api';

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

// Icon names mapping for Why Choose Us items
const iconNameMap: Record<string, LucideIcon> = {
  Target: Target,
  Shield: Shield,
  Zap: Zap,
  DollarSign: DollarSign,
  Headphones: Headphones,
  RefreshCw: RefreshCw,
};

// ============= Utility Functions =============
function getIconForCategory(category: string): LucideIcon {
  return categoryIconMap[category] || Megaphone;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes} min read`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function Home() {
  const { t, dir, language } = useLanguage();
  
  // Fetch data from APIs
  const { data: fetchedServices } = useServices(1, 100);
  const { data: projects } = useFeaturedProjects();
  const { data: posts } = useFeaturedPosts();
  const { data: testimonialsList } = useFeaturedTestimonials(6);
  const { data: whyChooseUsList } = useWhyChooseUs(1, 10);
  const { data: homepage } = usePageBySlug('homepage');

  // Map API services to ServiceCard props
  const services = ((fetchedServices as Service[]) || []).map((service: Service) => ({
    icon: getIconForCategory(service.category),
    title: language === 'en' ? service.title.en : service.title.ar,
    description: language === 'en' ? service.description.en : service.description.ar,
    link: `/services/${service.id}`,
    gradient: categoryIconMap[service.category] ? 'from-primary to-accent' : 'from-secondary to-gold',
  }));

  // Map API projects to PortfolioCard props
  const portfolioItems = ((projects as Project[]) || []).map((project: Project) => ({
    title: language === 'en' ? project.title.en : project.title.ar,
    category: project.category,
    description: language === 'en' ? project.description.en : project.description.ar,
    image: project.images?.[0] || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
    tags: [],
    link: project.website_url,
  }));

  // Map API posts to BlogCard props
  const blogPosts = ((posts as Post[]) || []).map((post: Post) => ({
    title: language === 'en' ? post.title.en : post.title.ar,
    excerpt: language === 'en' ? post.excerpt.en : post.excerpt.ar,
    image: post.featured_image || post.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: language === 'en' ? 'Blog' : 'مدونة',
    date: formatDate(post.published_at),
    readTime: calculateReadTime(language === 'en' ? post.content.en : post.content.ar),
    slug: post.slug,
  }));

  const stats = [
    {
      icon: Users,
      value: '500',
      suffix: '+',
      label: t('Happy Clients', 'عميل سعيد'),
    },
    {
      icon: Award,
      value: '1000',
      suffix: '+',
      label: t('Projects Completed', 'مشروع منجز'),
    },
    {
      icon: Star,
      value: '15',
      suffix: '+',
      label: t('Years Experience', 'سنة خبرة'),
    },
    {
      icon: Sparkles,
      value: '50',
      suffix: '+',
      label: t('Team Members', 'عضو فريق'),
    },
  ];

  // Map API why-choose-us items to component props
  const whyChooseUs = ((whyChooseUsList as WhyChooseUs[]) || [])
    .sort((a, b) => a.order - b.order)
    .map((item: WhyChooseUs) => ({
      icon: iconNameMap[item.icon] || Target,
      title: language === 'en' ? item.title.en : item.title.ar,
      description: language === 'en' ? item.description.en : item.description.ar,
    }));

  const testimonials = ((testimonialsList as Testimonial[]) || []).map((testimonial: Testimonial) => ({
    name: language === 'en' ? testimonial.name.en : testimonial.name.ar,
    role: language === 'en' ? testimonial.role.en : testimonial.role.ar,
    company: language === 'en' ? (testimonial.company?.en ?? '') : (testimonial.company?.ar ?? ''),
    content: language === 'en' ? testimonial.content.en : testimonial.content.ar,
    rating: testimonial.rating,
    image: testimonial.avatar,
  }));

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary/10 border border-primary/20 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('Your Growth Partner', 'شريك نموك')}
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6 leading-tight">
                {t('Grow Your Brand,', 'نمِّ علامتك،')}
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {t('Educate,', 'علّم،')}
                </span>
                <br />
                {t('& Create', 'وأبدع')}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t(
                  'All-in-one solution for advertising, media production, podcast recording, and online education.',
                  'حل شامل للدعاية والإعلان والإنتاج الإعلامي وتسجيل البودكاست والتعليم الإلكتروني.'
                )}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {t('Get Quote', 'احصل على عرض')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/podcast-studio"
                  className="px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold text-lg hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                >
                  <Mic className="w-5 h-5" />
                  {t('Book Studio', 'احجز استوديو')}
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 right-0 p-6 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl"
                >
                  <Video className="w-8 h-8 text-primary mb-2" />
                  <p className="font-semibold">{t('Video Production', 'إنتاج الفيديو')}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 left-0 p-6 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl"
                >
                  <GraduationCap className="w-8 h-8 text-accent mb-2" />
                  <p className="font-semibold">{t('Education', 'التعليم')}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="absolute top-40 left-20 p-6 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl"
                >
                  <Mic className="w-8 h-8 text-secondary mb-2" />
                  <p className="font-semibold">{t('Podcast', 'بودكاست')}</p>
                </motion.div>

                {/* Central Glow */}
                <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          </div>
        </motion.div>
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

      {/* Core Services Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Our Services', 'خدماتنا')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Comprehensive solutions for all your creative and educational needs',
                'حلول شاملة لجميع احتياجاتك الإبداعية والتعليمية'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
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

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              {t('View All Services', 'عرض جميع الخدمات')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Why Choose Us', 'لماذا تختارنا')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'We provide everything you need to succeed in one place',
                'نوفر كل ما تحتاجه للنجاح في مكان واحد'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <ServiceCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Our Work', 'أعمالنا')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Explore our successful projects and campaigns',
                'اكتشف مشاريعنا وحملاتنا الناجحة'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PortfolioCard {...item} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all"
            >
              {t('View Portfolio', 'عرض الأعمال')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Client Success Stories', 'قصص نجاح العملاء')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Hear from our satisfied clients across different industries',
                'استمع من عملائنا الراضين عبر مختلف الصناعات'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Latest Insights', 'أحدث الأفكار')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Tips, trends, and insights from our experts',
                'نصائح واتجاهات ورؤى من خبرائنا'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all"
            >
              {t('Read More Articles', 'اقرأ المزيد من المقالات')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-6xl mb-6">
              {t('Ready to Get Started?', 'مستعد للبدء؟')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t(
                'Join hundreds of successful businesses, educators, and creators who trust MediaPro.',
                'انضم إلى مئات الأعمال والمعلمين والمبدعين الناجحين الذين يثقون في ميديا برو.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t('Contact Us Today', 'تواصل معنا اليوم')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/offers"
                className="px-8 py-4 bg-background/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold text-lg hover:border-primary/50 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {t('View Special Offers', 'عرض العروض الخاصة')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
