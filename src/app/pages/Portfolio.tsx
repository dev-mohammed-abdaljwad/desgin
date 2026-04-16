import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { Filter } from 'lucide-react';

export function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('All Projects', 'جميع المشاريع') },
    { id: 'branding', label: t('Branding', 'العلامة التجارية') },
    { id: 'social', label: t('Social Media', 'السوشيال ميديا') },
    { id: 'video', label: t('Video Production', 'إنتاج الفيديو') },
    { id: 'podcast', label: t('Podcast', 'بودكاست') },
    { id: 'education', label: t('Education', 'التعليم') },
  ];

  const projects = [
    {
      title: t('Luxury Fashion Brand Identity', 'هوية علامة أزياء فاخرة'),
      category: 'branding',
      categoryLabel: t('Branding', 'العلامة التجارية'),
      description: t(
        'Complete brand identity design for a premium fashion retail brand including logo, guidelines, and packaging.',
        'تصميم هوية تجارية كاملة لعلامة أزياء فاخرة بما في ذلك الشعار والإرشادات والتعبئة.'
      ),
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
      tags: [t('Logo Design', 'تصميم الشعار'), t('Brand Guidelines', 'إرشادات العلامة'), t('Packaging', 'التعبئة')],
    },
    {
      title: t('Restaurant Social Media Campaign', 'حملة سوشيال ميديا لمطعم'),
      category: 'social',
      categoryLabel: t('Social Media', 'السوشيال ميديا'),
      description: t(
        '3-month social media campaign that increased engagement by 400% and drove 200+ new customers.',
        'حملة سوشيال ميديا لمدة 3 أشهر زادت التفاعل بنسبة 400٪ وجذبت أكثر من 200 عميل جديد.'
      ),
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: [t('Content Creation', 'إنشاء المحتوى'), t('Ads Campaign', 'حملة إعلانية'), t('Analytics', 'تحليلات')],
    },
    {
      title: t('Tech Startup Corporate Video', 'فيديو مؤسسي لشركة ناشئة'),
      category: 'video',
      categoryLabel: t('Video Production', 'إنتاج الفيديو'),
      description: t(
        'High-impact corporate video showcasing company culture, values, and innovative products.',
        'فيديو مؤسسي عالي التأثير يعرض ثقافة الشركة والقيم والمنتجات المبتكرة.'
      ),
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      tags: [t('Corporate Video', 'فيديو مؤسسي'), t('Storytelling', 'سرد قصصي'), t('Production', 'إنتاج')],
    },
    {
      title: t('Business Podcast Series', 'سلسلة بودكاست أعمال'),
      category: 'podcast',
      categoryLabel: t('Podcast', 'بودكاست'),
      description: t(
        'Full production of 20-episode podcast series covering entrepreneurship and business growth.',
        'إنتاج كامل لسلسلة بودكاست من 20 حلقة تغطي ريادة الأعمال ونمو الأعمال.'
      ),
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
      tags: [t('Recording', 'تسجيل'), t('Editing', 'تحرير'), t('Distribution', 'توزيع')],
    },
    {
      title: t('Online Math Course Platform', 'منصة دورة رياضيات إلكترونية'),
      category: 'education',
      categoryLabel: t('Education', 'التعليم'),
      description: t(
        'Comprehensive online math course with 50+ lessons, reaching 5,000+ students in first month.',
        'دورة رياضيات إلكترونية شاملة مع أكثر من 50 درساً، وصلت إلى أكثر من 5,000 طالب في الشهر الأول.'
      ),
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80',
      tags: [t('Course Design', 'تصميم الدورة'), t('Video Lessons', 'دروس فيديو'), t('LMS', 'نظام إدارة التعلم')],
    },
    {
      title: t('Real Estate Marketing Package', 'حزمة تسويق عقاري'),
      category: 'branding',
      categoryLabel: t('Branding', 'العلامة التجارية'),
      description: t(
        'Complete marketing package for luxury real estate development including branding, website, and campaigns.',
        'حزمة تسويقية كاملة لتطوير عقاري فاخر بما في ذلك العلامة التجارية والموقع والحملات.'
      ),
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      tags: [t('Branding', 'العلامة التجارية'), t('Website', 'موقع'), t('Marketing', 'تسويق')],
    },
    {
      title: t('Fitness Influencer Content', 'محتوى مؤثر رياضي'),
      category: 'social',
      categoryLabel: t('Social Media', 'السوشيال ميديا'),
      description: t(
        'Monthly content creation and management for fitness influencer with 100K+ followers.',
        'إنشاء وإدارة محتوى شهري لمؤثر رياضي بأكثر من 100 ألف متابع.'
      ),
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      tags: [t('Influencer', 'مؤثر'), t('Content', 'محتوى'), t('Growth', 'نمو')],
    },
    {
      title: t('Product Launch Video Campaign', 'حملة فيديو إطلاق منتج'),
      category: 'video',
      categoryLabel: t('Video Production', 'إنتاج الفيديو'),
      description: t(
        'Multi-platform video campaign for new product launch, generating 2M+ views across platforms.',
        'حملة فيديو متعددة المنصات لإطلاق منتج جديد، حققت أكثر من 2 مليون مشاهدة عبر المنصات.'
      ),
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      tags: [t('Product Launch', 'إطلاق منتج'), t('Ads', 'إعلانات'), t('Viral Marketing', 'تسويق فيروسي')],
    },
    {
      title: t('Educational Science Series', 'سلسلة علوم تعليمية'),
      category: 'education',
      categoryLabel: t('Education', 'التعليم'),
      description: t(
        'Engaging science education series for high school students with interactive experiments.',
        'سلسلة تعليم علوم جذابة لطلاب المرحلة الثانوية مع تجارب تفاعلية.'
      ),
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      tags: [t('Science', 'علوم'), t('Education', 'تعليم'), t('Interactive', 'تفاعلي')],
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('Our ', 'أعمالنا ')}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t('Portfolio', '')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(
                'Explore our successful projects and see how we help businesses grow',
                'استكشف مشاريعنا الناجحة وشاهد كيف نساعد الأعمال على النمو'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-8 bg-gradient-to-b from-background to-[#1A1333] sticky top-20 z-40 border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'bg-muted/50 text-foreground/80 hover:bg-muted'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PortfolioCard
                  {...project}
                  category={project.categoryLabel}
                />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {t('No projects found in this category.', 'لم يتم العثور على مشاريع في هذه الفئة.')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
