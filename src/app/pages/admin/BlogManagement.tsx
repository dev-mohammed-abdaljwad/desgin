import { useLanguage } from '../../context/LanguageContext';
import { Plus, FileText, Video, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

export function BlogManagement() {
  const { t } = useLanguage();
  const [contentType, setContentType] = useState('all');

  const content = [
    {
      id: 1,
      type: 'article',
      title: 'Digital Marketing Trends 2026',
      titleAr: 'اتجاهات التسويق الرقمي 2026',
      category: 'Marketing',
      author: 'Admin',
      date: '2026-04-10',
      status: 'published',
      views: 2435,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    },
    {
      id: 2,
      type: 'video',
      title: 'How to Start a Podcast',
      titleAr: 'كيف تبدأ بودكاست',
      category: 'Podcast',
      author: 'Admin',
      date: '2026-04-08',
      status: 'published',
      views: 1823,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
    },
    {
      id: 3,
      type: 'article',
      title: 'Brand Strategy Guide',
      titleAr: 'دليل استراتيجية العلامة التجارية',
      category: 'Branding',
      author: 'Admin',
      date: '2026-04-05',
      status: 'draft',
      views: 0,
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    },
  ];

  const stats = [
    { title: t('Total Content', 'إجمالي المحتوى'), value: 48, icon: FileText, color: 'from-primary to-accent' },
    { title: t('Articles', 'المقالات'), value: 32, icon: FileText, color: 'from-accent to-secondary' },
    { title: t('Videos', 'الفيديوهات'), value: 16, icon: Video, color: 'from-secondary to-gold' },
    { title: t('Total Views', 'المشاهدات'), value: '125K', icon: Eye, color: 'from-gold to-primary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
            {t('Blog & Reels', 'المدونة والفيديوهات')}
          </h1>
          <p className="text-muted-foreground">
            {t('Create and manage your content library', 'إنشاء وإدارة مكتبة المحتوى')}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-card/50 border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all flex items-center gap-2">
            <Video className="w-5 h-5" />
            {t('Add Video', 'إضافة فيديو')}
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t('New Article', 'مقال جديد')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
              <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm text-muted-foreground mb-2">{stat.title}</h3>
              <p className="font-[var(--font-display)] font-bold text-3xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="p-4 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <div className="flex gap-2">
          {['all', 'article', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                contentType === type
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              {type === 'all' ? t('All', 'الكل') : type === 'article' ? t('Articles', 'المقالات') : t('Videos', 'الفيديوهات')}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => {
          const isVideo = item.type === 'video';
          return (
            <div
              key={item.id}
              className="group bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    isVideo ? 'bg-secondary/90 text-white' : 'bg-primary/90 text-white'
                  }`}>
                    {isVideo ? t('Video', 'فيديو') : t('Article', 'مقال')}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.titleAr}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ml-2 ${
                    item.status === 'published' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {item.status === 'published' ? t('Published', 'منشور') : t('Draft', 'مسودة')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded-lg">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {item.views}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    {t('Edit', 'تعديل')}
                  </button>
                  <button className="px-3 py-2 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
