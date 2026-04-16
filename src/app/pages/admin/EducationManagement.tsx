import { useLanguage } from '../../context/LanguageContext';
import { GraduationCap, Users, DollarSign, TrendingUp, Edit, Eye } from 'lucide-react';

export function EducationManagement() {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: 'Student Platform Access',
      nameAr: 'منصة الطلاب',
      tier: 'Basic',
      price: '$9.99/mo',
      features: ['Access to video library', 'Interactive quizzes', 'Progress tracking'],
      subscribers: 234,
      status: 'active',
    },
    {
      id: 2,
      name: 'Student Premium',
      nameAr: 'طالب بريميوم',
      tier: 'Premium',
      price: '$19.99/mo',
      features: ['All Basic features', 'Live sessions', '1-on-1 tutoring', 'Certificate'],
      subscribers: 89,
      status: 'active',
    },
    {
      id: 3,
      name: 'Teacher Studio Access',
      nameAr: 'منصة المعلمين',
      tier: 'Professional',
      price: '$29.99/mo',
      features: ['Content creation tools', 'Analytics dashboard', 'Student management', 'Revenue sharing'],
      subscribers: 45,
      status: 'active',
    },
  ];

  const stats = [
    {
      title: t('Total Subscribers', 'إجمالي المشتركين'),
      value: '368',
      change: '+12%',
      icon: Users,
      color: 'from-primary to-accent',
    },
    {
      title: t('Active Products', 'المنتجات النشطة'),
      value: '3',
      change: '+1',
      icon: GraduationCap,
      color: 'from-accent to-secondary',
    },
    {
      title: t('Monthly Revenue', 'الإيرادات الشهرية'),
      value: '$4.8K',
      change: '+23%',
      icon: DollarSign,
      color: 'from-secondary to-gold',
    },
    {
      title: t('Growth Rate', 'معدل النمو'),
      value: '18%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-gold to-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
          {t('Educational Products', 'المنتجات التعليمية')}
        </h1>
        <p className="text-muted-foreground">
          {t('Manage educational platform subscription tiers', 'إدارة مستويات الاشتراك في المنصة التعليمية')}
        </p>
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
              <div className="flex items-baseline gap-2">
                <p className="font-[var(--font-display)] font-bold text-3xl">{stat.value}</p>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg text-sm font-medium">
                  {t('Active', 'نشط')}
                </span>
              </div>
              
              <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.nameAr}</p>
              
              <div className="flex items-baseline gap-2">
                <span className="font-[var(--font-display)] font-bold text-3xl">{product.price}</span>
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-xs font-medium">
                  {product.tier}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6 space-y-2">
              <p className="text-xs text-muted-foreground mb-3">{t('Features', 'المميزات')}</p>
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Subscribers */}
            <div className="mb-6 p-4 bg-muted/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('Subscribers', 'المشتركون')}</span>
                </div>
                <span className="font-bold text-xl">{product.subscribers}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                {t('Edit', 'تعديل')}
              </button>
              <button className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <h3 className="font-semibold text-lg mb-4">{t('Platform Features', 'مميزات المنصة')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            t('Video content library', 'مكتبة المحتوى المرئي'),
            t('Interactive assessments', 'التقييمات التفاعلية'),
            t('Progress tracking', 'تتبع التقدم'),
            t('Live sessions', 'الجلسات المباشرة'),
            t('Teacher tools', 'أدوات المعلم'),
            t('Analytics & reports', 'التحليلات والتقارير'),
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
