import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { BlogCard } from '../components/ui/BlogCard';
import { StatsCard } from '../components/ui/StatsCard';
import { useServices, useFeaturedProjects, usePosts, usePageBySlug } from '../../hooks/usePublicApi';
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
} from 'lucide-react';

export function Home() {
  const { t, dir, language } = useLanguage();
  
  // Fetch data from APIs
  const { data: fetchedServices, loading: servicesLoading } = useServices(1, 100);
  const { data: projects, loading: projectsLoading } = useFeaturedProjects();
  const { data: posts, loading: postsLoading } = usePosts(1, 10);
  const { data: homepage, loading: homeLoading } = usePageBySlug('homepage');

  const services = [
    {
      icon: Megaphone,
      title: t('Branding & Marketing', 'العلامة التجارية والتسويق'),
      description: t(
        'Build a powerful brand identity and reach your target audience with strategic marketing campaigns.',
        'بناء هوية تجارية قوية والوصول إلى جمهورك المستهدف من خلال حملات تسويقية استراتيجية.'
      ),
      link: '/services#marketing',
      gradient: 'from-primary to-accent',
    },
    {
      icon: Share2,
      title: t('Social Media Management', 'إدارة وسائل التواصل الاجتماعي'),
      description: t(
        'Engage your audience with compelling content and data-driven social media strategies.',
        'تفاعل مع جمهورك من خلال محتوى مقنع واستراتيجيات وسائل التواصل الاجتماعي القائمة على البيانات.'
      ),
      link: '/services#marketing',
      gradient: 'from-accent to-secondary',
    },
    {
      icon: Palette,
      title: t('Graphic Design', 'التصميم الجرافيكي'),
      description: t(
        'Creative visual designs that capture attention and communicate your message effectively.',
        'تصاميم بصرية إبداعية تجذب الانتباه وتوصل رسالتك بفعالية.'
      ),
      link: '/services#media',
      gradient: 'from-secondary to-gold',
    },
    {
      icon: Video,
      title: t('Video Production', 'إنتاج الفيديو'),
      description: t(
        'Professional video content from concept to final edit, including commercials and social media content.',
        'محتوى فيديو احترافي من الفكرة إلى المونتاج النهائي، بما في ذلك الإعلانات ومحتوى وسائل التواصل.'
      ),
      link: '/services#media',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Mic,
      title: t('Podcast Production', 'إنتاج البودكاست'),
      description: t(
        'Full-service podcast studio with professional equipment, recording, editing, and distribution.',
        'استوديو بودكاست متكامل مع معدات احترافية وتسجيل ومونتاج ونشر.'
      ),
      link: '/podcast-studio',
      gradient: 'from-accent to-primary',
    },
    {
      icon: GraduationCap,
      title: t('Educational Platform', 'المنصة التعليمية'),
      description: t(
        'Online learning platform connecting students with quality educational content from expert teachers.',
        'منصة تعليمية إلكترونية تربط الطلاب بمحتوى تعليمي عالي الجودة من معلمين خبراء.'
      ),
      link: '/educational-platform',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: Camera,
      title: t('Photography', 'التصوير الفوتوغرافي'),
      description: t(
        'Professional photography services for products, events, and corporate needs.',
        'خدمات تصوير احترافي للمنتجات والفعاليات والاحتياجات المؤسسية.'
      ),
      link: '/services#media',
      gradient: 'from-gold to-primary',
    },
    {
      icon: TrendingUp,
      title: t('Ads Campaigns', 'الحملات الإعلانية'),
      description: t(
        'Data-driven advertising campaigns across digital platforms to maximize ROI.',
        'حملات إعلانية قائمة على البيانات عبر المنصات الرقمية لزيادة عائد الاستثمار.'
      ),
      link: '/services#marketing',
      gradient: 'from-accent to-gold',
    },
  ];

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

  const whyChooseUs = [
    {
      icon: Target,
      title: t('All-in-One Solution', 'حل شامل متكامل'),
      description: t(
        'From marketing to education, we provide everything you need under one roof.',
        'من التسويق إلى التعليم، نوفر كل ما تحتاجه تحت سقف واحد.'
      ),
    },
    {
      icon: Shield,
      title: t('Professional Team', 'فريق محترف'),
      description: t(
        'Expert team of designers, marketers, and educators dedicated to your success.',
        'فريق خبراء من المصممين والمسوقين والمعلمين مكرسون لنجاحك.'
      ),
    },
    {
      icon: Zap,
      title: t('Fast Delivery', 'تسليم سريع'),
      description: t(
        'Quick turnaround times without compromising on quality.',
        'أوقات تسليم سريعة دون المساس بالجودة.'
      ),
    },
  ];

  const testimonials = [
    {
      name: t('Ahmed Al-Rashid', 'أحمد الراشد'),
      role: t('CEO', 'المدير التنفيذي'),
      company: t('Tech Startup', 'شركة تقنية ناشئة'),
      content: t(
        'MediaPro transformed our brand presence completely. Their marketing strategies delivered results beyond our expectations.',
        'ميديا برو حولت حضور علامتنا التجارية بشكل كامل. استراتيجياتهم التسويقية حققت نتائج فاقت توقعاتنا.'
      ),
      rating: 5,
    },
    {
      name: t('Sara Mohammed', 'سارة محمد'),
      role: t('Teacher', 'معلمة'),
      company: t('High School', 'مدرسة ثانوية'),
      content: t(
        'The educational platform helped me reach hundreds of students. The studio quality is exceptional for recording lessons.',
        'المنصة التعليمية ساعدتني في الوصول إلى مئات الطلاب. جودة الاستوديو استثنائية لتسجيل الدروس.'
      ),
      rating: 5,
    },
    {
      name: t('Khaled Ibrahim', 'خالد إبراهيم'),
      role: t('Podcast Host', 'مقدم بودكاست'),
      company: t('Tech Talk Podcast', 'بودكاست حديث تقني'),
      content: t(
        'Their podcast studio is top-notch! Professional equipment and excellent post-production support.',
        'استوديو البودكاست لديهم من الدرجة الأولى! معدات احترافية ودعم ممتاز لما بعد الإنتاج.'
      ),
      rating: 5,
    },
  ];

  const portfolioItems = [
    {
      title: t('Brand Identity Design', 'تصميم هوية العلامة التجارية'),
      category: t('Branding', 'العلامة التجارية'),
      description: t(
        'Complete brand identity package for a luxury retail brand.',
        'حزمة هوية تجارية كاملة لعلامة تجارية فاخرة للبيع بالتجزئة.'
      ),
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
      tags: [t('Logo', 'شعار'), t('Branding', 'هوية'), t('Print', 'طباعة')],
    },
    {
      title: t('Social Media Campaign', 'حملة وسائل التواصل الاجتماعي'),
      category: t('Marketing', 'التسويق'),
      description: t(
        'Multi-platform campaign that generated 500% increase in engagement.',
        'حملة متعددة المنصات حققت زيادة 500٪ في التفاعل.'
      ),
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: [t('Social Media', 'سوشيال ميديا'), t('Content', 'محتوى'), t('Ads', 'إعلانات')],
    },
    {
      title: t('Corporate Video', 'فيديو مؤسسي'),
      category: t('Video Production', 'إنتاج الفيديو'),
      description: t(
        'High-quality corporate video showcasing company values and culture.',
        'فيديو مؤسسي عالي الجودة يعرض قيم وثقافة الشركة.'
      ),
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      tags: [t('Video', 'فيديو'), t('Corporate', 'مؤسسي'), t('Storytelling', 'سرد قصصي')],
    },
  ];

  const blogPosts = [
    {
      title: t('10 Marketing Trends for 2026', '10 اتجاهات تسويقية لعام 2026'),
      excerpt: t(
        'Stay ahead of the curve with these emerging marketing trends that will shape the industry.',
        'ابق في الطليعة مع هذه الاتجاهات التسويقية الناشئة التي ستشكل الصناعة.'
      ),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: t('Marketing', 'التسويق'),
      date: t('Apr 10, 2026', '10 أبريل 2026'),
      readTime: t('5 min read', '5 دقائق'),
      slug: 'marketing-trends-2026',
    },
    {
      title: t('How to Start Your Own Podcast', 'كيف تبدأ البودكاست الخاص بك'),
      excerpt: t(
        'Complete guide to launching a successful podcast, from equipment to distribution.',
        'دليل كامل لإطلاق بودكاست ناجح، من المعدات إلى التوزيع.'
      ),
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
      category: t('Podcast', 'بودكاست'),
      date: t('Apr 8, 2026', '8 أبريل 2026'),
      readTime: t('7 min read', '7 دقائق'),
      slug: 'start-podcast-guide',
    },
    {
      title: t('Online Learning: The Future of Education', 'التعلم الإلكتروني: مستقبل التعليم'),
      excerpt: t(
        'Discover how online platforms are revolutionizing education for students and teachers.',
        'اكتشف كيف تُحدث المنصات الإلكترونية ثورة في التعليم للطلاب والمعلمين.'
      ),
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      category: t('Education', 'التعليم'),
      date: t('Apr 5, 2026', '5 أبريل 2026'),
      readTime: t('6 min read', '6 دقائق'),
      slug: 'online-learning-future',
    },
  ];

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
