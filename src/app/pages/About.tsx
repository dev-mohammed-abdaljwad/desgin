import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { StatsCard } from '../components/ui/StatsCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Star,
  Rocket,
} from 'lucide-react';
import { usePageBySlug, useFeaturedProjects, useProducts } from '../../hooks/usePublicApi';
import { useValues } from '../../hooks/useValues';

export function About() {
  const { t, language } = useLanguage();
  const { data: aboutPage, loading: pageLoading } = usePageBySlug('about-us');
  const { data: visionPage, loading: visionLoading } = usePageBySlug('vision');
  const { data: missionPage, loading: missionLoading } = usePageBySlug('mission');
  const { data: projects, loading: projectsLoading } = useFeaturedProjects();
  const { data: products, loading: productsLoading } = useProducts(1, 100);
  const { data: valuesData, loading: valuesLoading } = useValues();

  // Map icon names to icon components
  const iconMap: Record<string, any> = {
    Target,
    Heart,
    Rocket,
    Shield,
    Users,
    Award,
    TrendingUp,
    Zap,
    Eye,
    Star,
  };

  // Use API values or fallback to defaults
  const values = valuesData && valuesData.length > 0
    ? valuesData.map(value => ({
        icon: iconMap[value.icon_name] || Target,
        title: language === 'ar' ? value.title_ar : value.title_en,
        description: language === 'ar' ? value.description_ar : value.description_en,
        gradient: value.gradient,
        id: value.id,
      }))
    : [
        {
          icon: Target,
          title: t('Excellence', 'التميز'),
          description: t(
            'We strive for excellence in every project, delivering quality that exceeds expectations.',
            'نسعى للتميز في كل مشروع، ونقدم جودة تفوق التوقعات.'
          ),
          gradient: 'from-primary to-accent',
          id: 1,
        },
        {
          icon: Heart,
          title: t('Passion', 'الشغف'),
          description: t(
            'We are passionate about what we do, bringing creativity and dedication to every task.',
            'نحن شغوفون بما نقوم به، ونجلب الإبداع والتفاني لكل مهمة.'
          ),
          gradient: 'from-accent to-secondary',
          id: 2,
        },
        {
          icon: Rocket,
          title: t('Innovation', 'الابتكار'),
          description: t(
            'We embrace innovation and constantly seek new ways to deliver better solutions.',
            'نحتضن الابتكار ونبحث باستمرار عن طرق جديدة لتقديم حلول أفضل.'
          ),
          gradient: 'from-secondary to-gold',
          id: 3,
        },
        {
          icon: Shield,
          title: t('Trust', 'الثقة'),
          description: t(
            'We build lasting relationships based on trust, transparency, and reliability.',
            'نبني علاقات دائمة على أساس الثقة والشفافية والموثوقية.'
          ),
          gradient: 'from-gold to-primary',
          id: 4,
        },
      ];

  const stats = [
    {
      icon: Users,
      value: ((projects?.length || 0) * 50).toString(),
      suffix: '+',
      label: t('Happy Clients', 'عميل سعيد'),
    },
    {
      icon: Award,
      value: (projects?.length || 0).toString(),
      suffix: '+',
      label: t('Projects Completed', 'مشروع منجز'),
    },
    {
      icon: Star,
      value: (products?.length || 0).toString(),
      suffix: '+',
      label: t('Products Available', 'منتج متاح'),
    },
  ];

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('About ', 'عن ')}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t('2 A PRODUCTION', ' 2 A PRODUCTION ')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(
                'We are a full-service creative agency and educational platform helping businesses, creators, and educators achieve their goals',
                'نحن وكالة إبداعية شاملة ومنصة تعليمية نساعد الشركات والمبدعين والمعلمين على تحقيق أهدافهم'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-[#1A1333]">
        <div className="max-w-7xl mx-auto px-6">
          {pageLoading || productsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-6">
                {t('Our Story', 'قصتنا')}
              </h2>
              {pageLoading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {language === 'ar' && aboutPage?.content_ar
                      ? aboutPage.content_ar
                      : aboutPage?.content_en}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={aboutPage?.featured_image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'}
                alt={language === 'ar' ? aboutPage?.title_ar || 'Our Team' : aboutPage?.title_en || 'Our Team'}
                className="w-full h-96 object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 bg-card/50 backdrop-blur-xl border border-border rounded-3xl"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-[var(--font-display)] font-bold text-2xl mb-4">{t('Our Vision', 'رؤيتنا')}</h3>
              {visionLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {visionPage
                    ? language === 'ar' && visionPage.content_ar
                      ? visionPage.content_ar
                      : visionPage.content_en
                    : t(
                        'To be the leading creative agency and educational platform in the region, empowering businesses and individuals to achieve their full potential through innovation and excellence.',
                        'أن نكون الوكالة الإبداعية والمنصة التعليمية الرائدة في المنطقة، ونمكّن الشركات والأفراد من تحقيق إمكاناتهم الكاملة من خلال الابتكار .'
                      )}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 lg:p-12 bg-card/50 backdrop-blur-xl border border-border rounded-3xl"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-secondary to-gold flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-[var(--font-display)] font-bold text-2xl mb-4">{t('Our Mission', 'مهمتنا')}</h3>
              {missionLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {missionPage
                    ? language === 'ar' && missionPage.content_ar
                      ? missionPage.content_ar
                      : missionPage.content_en
                    : t(
                        'To deliver exceptional creative services and quality education that drive growth, inspire creativity, and create lasting impact for our clients, students, and teachers.',
                        'تقديم خدمات إبداعية استثنائية وتعليم عالي الجودة يدفع النمو، ويلهم الإبداع، ويخلق تأثيراً دائماً لعملائنا وطلابنا ومعلمينا.'
                      )}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Our Values', 'قيمنا')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'The principles that guide everything we do',
                'المبادئ التي توجه كل ما نقوم به'
              )}
            </p>
          </motion.div>

          {valuesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="h-64 bg-muted rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.id || `value-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard {...value} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

 
      {/* Featured Projects Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
              {t('Meet Our Team', 'تعرف على فريقنا')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'Passionate professionals dedicated to your success',
                'محترفون شغوفون مكرسون لنجاحك'
              )}
            </p>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-full aspect-square bg-muted rounded-2xl animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects && projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={project.images?.[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}
                      alt={language === 'ar' ? project.title_ar : project.title_en}
                      className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="font-[var(--font-display)] font-semibold text-lg mb-1 line-clamp-2">
                    {language === 'ar' ? project.title_ar : project.title_en}
                  </h3>
                  <p className="text-muted-foreground text-sm">{project.client_name}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
