import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { BlogCard } from '../components/ui/BlogCard';
import { Search, Filter } from 'lucide-react';

export function Blog() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('All', 'الكل') },
    { id: 'marketing', label: t('Marketing', 'التسويق') },
    { id: 'podcast', label: t('Podcast', 'بودكاست') },
    { id: 'education', label: t('Education', 'التعليم') },
    { id: 'design', label: t('Design', 'التصميم') },
    { id: 'business', label: t('Business', 'أعمال') },
  ];

  const posts = [
    {
      title: t('10 Marketing Trends Dominating 2026', '10 اتجاهات تسويقية تهيمن على 2026'),
      excerpt: t(
        'Discover the latest marketing trends that are reshaping the industry and how to leverage them for your business.',
        'اكتشف أحدث الاتجاهات التسويقية التي تعيد تشكيل الصناعة وكيفية الاستفادة منها لعملك.'
      ),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: t('Marketing', 'التسويق'),
      categoryId: 'marketing',
      date: t('Apr 10, 2026', '10 أبريل 2026'),
      readTime: t('5 min read', '5 دقائق'),
      slug: 'marketing-trends-2026',
    },
    {
      title: t('The Complete Guide to Starting Your Own Podcast', 'الدليل الكامل لبدء البودكاست الخاص بك'),
      excerpt: t(
        'Everything you need to know about launching a successful podcast, from equipment to distribution strategies.',
        'كل ما تحتاج معرفته حول إطلاق بودكاست ناجح، من المعدات إلى استراتيجيات التوزيع.'
      ),
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
      category: t('Podcast', 'بودكاست'),
      categoryId: 'podcast',
      date: t('Apr 8, 2026', '8 أبريل 2026'),
      readTime: t('7 min read', '7 دقائق'),
      slug: 'start-podcast-guide',
    },
    {
      title: t('How Online Learning is Transforming Education', 'كيف يحول التعلم الإلكتروني التعليم'),
      excerpt: t(
        'Explore how online learning platforms are revolutionizing education for both students and teachers worldwide.',
        'استكشف كيف تُحدث منصات التعلم الإلكتروني ثورة في التعليم للطلاب والمعلمين في جميع أنحاء العالم.'
      ),
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      category: t('Education', 'التعليم'),
      categoryId: 'education',
      date: t('Apr 5, 2026', '5 أبريل 2026'),
      readTime: t('6 min read', '6 دقائق'),
      slug: 'online-learning-future',
    },
    {
      title: t('The Psychology of Color in Brand Design', 'سيكولوجية الألوان في تصميم العلامة التجارية'),
      excerpt: t(
        'Learn how color psychology influences consumer behavior and how to choose the right colors for your brand.',
        'تعلم كيف تؤثر سيكولوجية الألوان على سلوك المستهلك وكيفية اختيار الألوان المناسبة لعلامتك التجارية.'
      ),
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
      category: t('Design', 'التصميم'),
      categoryId: 'design',
      date: t('Apr 3, 2026', '3 أبريل 2026'),
      readTime: t('4 min read', '4 دقائق'),
      slug: 'color-psychology-branding',
    },
    {
      title: t('Social Media Algorithm Changes: What You Need to Know', 'تغييرات خوارزمية السوشيال ميديا: ما تحتاج معرفته'),
      excerpt: t(
        'Stay updated on the latest social media algorithm changes and how to adapt your content strategy accordingly.',
        'ابق على اطلاع بأحدث تغييرات خوارزمية وسائل التواصل الاجتماعي وكيفية تكييف استراتيجية المحتوى وفقاً لذلك.'
      ),
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
      category: t('Marketing', 'التسويق'),
      categoryId: 'marketing',
      date: t('Apr 1, 2026', '1 أبريل 2026'),
      readTime: t('5 min read', '5 دقائق'),
      slug: 'social-media-algorithms-2026',
    },
    {
      title: t('Building a Personal Brand Through Podcasting', 'بناء علامة تجارية شخصية من خلال البودكاست'),
      excerpt: t(
        'Discover how podcasting can help you establish yourself as an expert and build a loyal audience.',
        'اكتشف كيف يمكن أن يساعدك البودكاست في تأسيس نفسك كخبير وبناء جمهور مخلص.'
      ),
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
      category: t('Podcast', 'بودكاست'),
      categoryId: 'podcast',
      date: t('Mar 28, 2026', '28 مارس 2026'),
      readTime: t('6 min read', '6 دقائق'),
      slug: 'personal-brand-podcasting',
    },
    {
      title: t('5 Ways to Monetize Your Educational Content', '5 طرق لتحقيق الدخل من محتواك التعليمي'),
      excerpt: t(
        'Learn practical strategies for teachers to generate income from their educational content online.',
        'تعلم استراتيجيات عملية للمعلمين لتحقيق دخل من محتواهم التعليمي عبر الإنترنت.'
      ),
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      category: t('Education', 'التعليم'),
      categoryId: 'education',
      date: t('Mar 25, 2026', '25 مارس 2026'),
      readTime: t('7 min read', '7 دقائق'),
      slug: 'monetize-educational-content',
    },
    {
      title: t('Video Marketing: The Ultimate Business Growth Tool', 'التسويق بالفيديو: أداة النمو النهائية للأعمال'),
      excerpt: t(
        'Why video marketing is essential for business growth and how to create compelling video content.',
        'لماذا يعد التسويق بالفيديو ضرورياً لنمو الأعمال وكيفية إنشاء محتوى فيديو مقنع.'
      ),
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      category: t('Business', 'أعمال'),
      categoryId: 'business',
      date: t('Mar 22, 2026', '22 مارس 2026'),
      readTime: t('5 min read', '5 دقائق'),
      slug: 'video-marketing-business-growth',
    },
    {
      title: t('Minimalist Design Trends in 2026', 'اتجاهات التصميم البسيط في 2026'),
      excerpt: t(
        'Explore the rise of minimalism in modern design and how to apply these principles to your projects.',
        'استكشف صعود البساطة في التصميم الحديث وكيفية تطبيق هذه المبادئ على مشاريعك.'
      ),
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
      category: t('Design', 'التصميم'),
      categoryId: 'design',
      date: t('Mar 20, 2026', '20 مارس 2026'),
      readTime: t('4 min read', '4 دقائق'),
      slug: 'minimalist-design-trends-2026',
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.categoryId === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
