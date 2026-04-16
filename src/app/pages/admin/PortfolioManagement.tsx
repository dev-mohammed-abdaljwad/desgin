import { useLanguage } from '../../context/LanguageContext';
import { Plus, Eye, Edit, Trash2, Upload } from 'lucide-react';

export function PortfolioManagement() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'TechCorp Branding',
      titleAr: 'هوية تيك كورب',
      category: 'Branding',
      client: 'TechCorp Inc.',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      views: 1245,
    },
    {
      id: 2,
      title: 'Restaurant Social Campaign',
      titleAr: 'حملة مطعم الواحة',
      category: 'Social Media',
      client: 'Oasis Restaurant',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
      views: 892,
    },
    {
      id: 3,
      title: 'Fashion Brand Video',
      titleAr: 'فيديو ماركة الأزياء',
      category: 'Video Production',
      client: 'Elegance Fashion',
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea00f46e?w=400',
      views: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
            {t('Portfolio Management', 'إدارة الأعمال')}
          </h1>
          <p className="text-muted-foreground">
            {t('Showcase your best work and case studies', 'عرض أفضل أعمالك ودراسات الحالة')}
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {t('Add Project', 'إضافة مشروع')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
          <h3 className="text-sm text-muted-foreground mb-2">{t('Total Projects', 'إجمالي المشاريع')}</h3>
          <p className="font-[var(--font-display)] font-bold text-3xl">24</p>
        </div>
        <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
          <h3 className="text-sm text-muted-foreground mb-2">{t('Published', 'منشور')}</h3>
          <p className="font-[var(--font-display)] font-bold text-3xl">18</p>
        </div>
        <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
          <h3 className="text-sm text-muted-foreground mb-2">{t('Total Views', 'إجمالي المشاهدات')}</h3>
          <p className="font-[var(--font-display)] font-bold text-3xl">12.5K</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white text-background rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    {t('View', 'عرض')}
                  </button>
                  <button className="px-3 py-2 bg-primary text-white rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 bg-destructive text-white rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{project.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{project.titleAr}</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ml-2 ${
                  project.status === 'published' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {project.status === 'published' ? t('Published', 'منشور') : t('Draft', 'مسودة')}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded-lg">
                  {project.category}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  {project.views}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                {t('Client:', 'العميل:')} {project.client}
              </p>
            </div>
          </div>
        ))}

        {/* Upload New Card */}
        <div className="bg-card/30 backdrop-blur-xl border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold mb-2">{t('Upload New Project', 'رفع مشروع جديد')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('Add your latest work to portfolio', 'أضف أحدث أعمالك')}
          </p>
        </div>
      </div>
    </div>
  );
}
