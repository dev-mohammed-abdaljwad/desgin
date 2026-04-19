import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { Filter } from 'lucide-react';
import { useProjects } from '../../hooks/usePublicApi';
import type { Project } from '../../types/api';

export function Portfolio() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const { data: projectsData } = useProjects(1, 100);

  const filters = [
    { id: 'all', label: t('All Projects', 'جميع المشاريع') },
    { id: 'branding', label: t('Branding', 'العلامة التجارية') },
    { id: 'social', label: t('Social Media', 'السوشيال ميديا') },
    { id: 'video', label: t('Video Production', 'إنتاج الفيديو') },
    { id: 'podcast', label: t('Podcast', 'بودكاست') },
    { id: 'education', label: t('Education', 'التعليم') },
  ];

  // Transform API projects to component format
  const projects = ((projectsData as Project[]) || []).map((project: Project) => ({
    title: language === 'en' ? project.title_en : project.title_ar,
    category: project.category,
    categoryLabel: filters.find(f => f.id === project.category)?.label || project.category,
    description: language === 'en' ? project.description_en : project.description_ar,
    image: project.thumbnail,
    tags: project.tags
      .filter((tag) => tag.lang === language)
      .map((tag) => tag.label),
  }));

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
