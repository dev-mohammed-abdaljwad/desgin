import { useLanguage } from '../../context/LanguageContext';
import { Plus, Tag, Calendar, Percent, Edit, Trash2 } from 'lucide-react';

export function OffersManagement() {
  const { t } = useLanguage();

  const offers = [
    {
      id: 1,
      title: 'Spring Marketing Campaign',
      titleAr: 'حملة التسويق الربيعية',
      discount: '25%',
      code: 'SPRING25',
      startDate: '2026-03-01',
      endDate: '2026-05-31',
      linkedServices: ['Brand Identity', 'Social Media'],
      status: 'active',
      redemptions: 45,
    },
    {
      id: 2,
      title: 'Podcast Launch Offer',
      titleAr: 'عرض إطلاق البودكاست',
      discount: '30%',
      code: 'PODCAST30',
      startDate: '2026-04-01',
      endDate: '2026-06-30',
      linkedServices: ['Podcast Recording'],
      status: 'active',
      redemptions: 23,
    },
    {
      id: 3,
      title: 'Educational Platform Early Bird',
      titleAr: 'العرض المبكر للمنصة التعليمية',
      discount: '50%',
      code: 'EDU50',
      startDate: '2026-02-01',
      endDate: '2026-04-15',
      linkedServices: ['Educational Platform'],
      status: 'expired',
      redemptions: 67,
    },
  ];

  const stats = [
    { title: t('Active Offers', 'العروض النشطة'), value: 5, color: 'from-primary to-accent' },
    { title: t('Total Redemptions', 'إجمالي الاستخدامات'), value: 135, color: 'from-accent to-secondary' },
    { title: t('Avg Discount', 'متوسط الخصم'), value: '28%', color: 'from-secondary to-gold' },
    { title: t('Revenue Impact', 'تأثير الإيرادات'), value: '$12.5K', color: 'from-gold to-primary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
            {t('Offers Management', 'إدارة العروض')}
          </h1>
          <p className="text-muted-foreground">
            {t('Create and manage promotional offers', 'إنشاء وإدارة العروض الترويجية')}
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {t('Create Offer', 'إنشاء عرض')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
            <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <Tag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">{stat.title}</h3>
            <p className="font-[var(--font-display)] font-bold text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
          >
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Offer Info */}
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-gold flex items-center justify-center flex-shrink-0">
                    <Percent className="w-8 h-8 text-white" />
                    <span className="absolute text-2xl font-bold text-white">{offer.discount}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{offer.titleAr}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-mono font-bold">
                        {offer.code}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        offer.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {offer.status === 'active' ? t('Active', 'نشط') : t('Expired', 'منتهي')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-3">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Start Date', 'تاريخ البداية')}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{offer.startDate}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('End Date', 'تاريخ الانتهاء')}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{offer.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services & Stats */}
              <div className="lg:col-span-3">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t('Linked Services', 'الخدمات المرتبطة')}</p>
                    <div className="flex flex-wrap gap-2">
                      {offer.linkedServices.map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-accent/20 text-accent rounded-lg text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Redemptions', 'الاستخدامات')}</p>
                    <p className="text-2xl font-bold">{offer.redemptions}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-2 flex flex-col justify-between items-end">
                <div className="flex gap-2">
                  <button className="p-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
