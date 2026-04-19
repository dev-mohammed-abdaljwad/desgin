import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { BlogCard } from '../components/ui/BlogCard';
import { Search, Filter } from 'lucide-react';
import { useFeaturedPosts, usePostsByType, useSearchPosts } from '../../hooks/usePublicApi';
import type { Post } from '../../types/api';

export function Blog() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fetch blog posts from API using type-specific endpoint
  const { data: postsList } = usePostsByType('blog', 100);
  const { data: featuredPostsList } = useFeaturedPosts();
  
  // Search posts from API only when search query has content
  const { data: searchResultsList } = useSearchPosts(searchQuery, 100);

  // Static categories for filtering
  const categories = [
    { id: 'all', label: t('All', 'الكل') },
    { id: 'marketing', label: t('Marketing', 'التسويق') },
    { id: 'podcast', label: t('Podcast', 'بودكاست') },
    { id: 'education', label: t('Education', 'التعليم') },
    { id: 'design', label: t('Design', 'التصميم') },
    { id: 'business', label: t('Business', 'أعمال') },
  ];

  // Use search results only if query is not empty, otherwise use all blog posts
  const sourcePostsList = searchQuery.trim() ? searchResultsList : postsList;

  // Map API posts to BlogCard format
  const posts = ((sourcePostsList as Post[]) || []).map((post: Post) => ({
    title: language === 'en' ? post.title.en : post.title.ar,
    excerpt: language === 'en' ? post.excerpt.en : post.excerpt.ar,
    image: post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: post.category ? (language === 'en' ? post.category.name.en : post.category.name.ar) : 'Blog',
    categoryId: post.category?.slug || 'all',
    date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : new Date(post.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    readTime: t('5 min read', '5 دقائق'),
    slug: post.slug,
  }));

  // Map featured posts
  const featuredPosts = ((featuredPostsList as Post[]) || []).map((post: Post) => ({
    title: language === 'en' ? post.title.en : post.title.ar,
    excerpt: language === 'en' ? post.excerpt.en : post.excerpt.ar,
    image: post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: post.category ? (language === 'en' ? post.category.name.en : post.category.name.ar) : 'Blog',
    categoryId: post.category?.slug || 'all',
    date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : new Date(post.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    readTime: t('5 min read', '5 دقائق'),
    slug: post.slug,
  }));

  // Filter posts by category (search is already handled by API)
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.categoryId === activeCategory;
    return matchesCategory;
  });

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('Blog & ', 'المدونة و')}
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                {t('Insights', 'رؤى')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {t(
                'Tips, trends, and expert insights on marketing, education, and creative content',
                'نصائح واتجاهات ورؤى الخبراء حول التسويق والتعليم والمحتوى الإبداعي'
              )}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('Search articles...', 'ابحث عن المقالات...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card/50 backdrop-blur-xl border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1A1333] to-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-4">
                {t('Editor\'s Picks', 'اختيارات المحرر')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t(
                  'Our most curated and trending articles',
                  'مقالاتنا المختارة والأكثر رواجاً'
                )}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="relative py-8 bg-gradient-to-b from-background to-[#1A1333] sticky top-20 z-40 border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'bg-muted/50 text-foreground/80 hover:bg-muted'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
              {t('All Articles', 'جميع المقالات')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.1 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {t('No articles found matching your search.', 'لم يتم العثور على مقالات مطابقة لبحثك.')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
