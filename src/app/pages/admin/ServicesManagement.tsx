import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  price: string;
  status: 'active' | 'inactive';
  featured: boolean;
}

export function ServicesManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services: Service[] = [
    {
      id: '1',
      title: 'Brand Identity Design',
      titleAr: 'تصميم الهوية التجارية',
      category: 'Branding',
      price: '$2,500',
      status: 'active',
      featured: true,
    },
    {
      id: '2',
      title: 'Social Media Management',
      titleAr: 'إدارة وسائل التواصل الاجتماعي',
      category: 'Marketing',
      price: '$1,200/mo',
      status: 'active',
      featured: true,
    },
    {
      id: '3',
      title: 'Video Production',
      titleAr: 'إنتاج الفيديو',
      category: 'Production',
      price: '$3,500',
      status: 'active',
      featured: false,
    },
    {
      id: '4',
      title: 'Podcast Recording',
      titleAr: 'تسجيل البودكاست',
      category: 'Podcast',
      price: '$500/session',
      status: 'active',
      featured: true,
    },
    {
      id: '5',
      title: 'Content Writing',
      titleAr: 'كتابة المحتوى',
      category: 'Marketing',
      price: '$800',
      status: 'inactive',
      featured: false,
    },
  ];

  const categories = ['all', 'Branding', 'Marketing', 'Production', 'Podcast'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
            {t('Services Management', 'إدارة الخدمات')}
          </h1>
          <p className="text-muted-foreground">
            {t('Manage all your services and offerings', 'إدارة جميع خدماتك وعروضك')}
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {t('Add Service', 'إضافة خدمة')}
        </button>
      </div>

      {/* Filters & Search */}
      <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search services...', 'البحث عن الخدمات...')}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? t('All Categories', 'جميع الفئات') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {t('Service', 'الخدمة')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {t('Category', 'الفئة')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {t('Price', 'السعر')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {t('Status', 'الحالة')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {t('Featured', 'مميز')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  {t('Actions', 'الإجراءات')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{service.title}</p>
                      <p className="text-sm text-muted-foreground">{service.titleAr}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {service.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      service.status === 'active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {service.status === 'active' ? t('Active', 'نشط') : t('Inactive', 'غير نشط')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {service.featured ? (
                      <Eye className="w-5 h-5 text-gold" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-muted/20 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t('Showing 1-5 of 5 services', 'عرض 1-5 من 5 خدمات')}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm font-medium transition-colors">
              {t('Previous', 'السابق')}
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm font-medium transition-colors">
              {t('Next', 'التالي')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
