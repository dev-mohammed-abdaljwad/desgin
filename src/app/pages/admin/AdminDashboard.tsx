import { useLanguage } from '../../context/LanguageContext';
import { StatsCard } from '../../components/admin/StatsCard';
import { WelcomeCard } from '../../components/admin/WelcomeCard';
import { 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Tag,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function AdminDashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('Total Services', 'إجمالي الخدمات'),
      value: '24',
      change: '+3',
      changeType: 'positive' as const,
      icon: Briefcase,
      gradient: 'from-primary to-accent',
    },
    {
      title: t('Active Bookings', 'الحجوزات النشطة'),
      value: '18',
      change: '+5',
      changeType: 'positive' as const,
      icon: Calendar,
      gradient: 'from-accent to-secondary',
    },
    {
      title: t('New Leads', 'عملاء محتملون جدد'),
      value: '47',
      change: '+12',
      changeType: 'positive' as const,
      icon: MessageSquare,
      gradient: 'from-secondary to-gold',
    },
    {
      title: t('Published Content', 'المحتوى المنشور'),
      value: '156',
      change: '+8',
      changeType: 'positive' as const,
      icon: FileText,
      gradient: 'from-gold to-primary',
    },
  ];

  const leadsData = [
    { month: 'Jan', leads: 30, bookings: 12 },
    { month: 'Feb', leads: 45, bookings: 18 },
    { month: 'Mar', leads: 38, bookings: 15 },
    { month: 'Apr', leads: 52, bookings: 22 },
    { month: 'May', leads: 61, bookings: 28 },
    { month: 'Jun', leads: 75, bookings: 35 },
  ];

  const serviceDistribution = [
    { name: t('Marketing', 'التسويق'), value: 35, color: '#6366F1' },
    { name: t('Production', 'الإنتاج'), value: 25, color: '#F97316' },
    { name: t('Podcast', 'البودكاست'), value: 20, color: '#06B6D4' },
    { name: t('Education', 'التعليم'), value: 20, color: '#F59E0B' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      title: t('New podcast booking', 'حجز بودكاست جديد'),
      description: t('Studio A - Premium Package', 'استوديو أ - الباقة المميزة'),
      time: '5 minutes ago',
      icon: Calendar,
      color: 'from-primary to-accent',
    },
    {
      id: 2,
      type: 'lead',
      title: t('New contact inquiry', 'استفسار تواصل جديد'),
      description: t('Branding service request', 'طل�� خدمة العلامة التجارية'),
      time: '1 hour ago',
      icon: MessageSquare,
      color: 'from-accent to-secondary',
    },
    {
      id: 3,
      type: 'content',
      title: t('Blog post published', 'مقال جديد منشور'),
      description: t('Digital Marketing Trends 2026', 'اتجاهات التسويق الرقمي 2026'),
      time: '3 hours ago',
      icon: FileText,
      color: 'from-secondary to-gold',
    },
    {
      id: 4,
      type: 'offer',
      title: t('New offer created', 'عرض جديد تم إنشاؤه'),
      description: t('Spring Campaign - 25% Off', 'حملة الربيع - خصم 25%'),
      time: '5 hours ago',
      icon: Tag,
      color: 'from-gold to-primary',
    },
  ];

  const quickActions = [
    {
      title: t('Add Service', 'إضافة خدمة'),
      icon: Plus,
      link: '/admin/services',
      gradient: 'from-primary to-accent',
    },
    {
      title: t('Create Post', 'إنشاء مقال'),
      icon: FileText,
      link: '/admin/blog',
      gradient: 'from-accent to-secondary',
    },
    {
      title: t('View Bookings', 'عرض الحجوزات'),
      icon: Calendar,
      link: '/admin/bookings',
      gradient: 'from-secondary to-gold',
    },
    {
      title: t('Manage Leads', 'إدارة العملاء'),
      icon: Users,
      link: '/admin/leads',
      gradient: 'from-gold to-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <WelcomeCard />

      {/* Header */}
      <div>
        <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
          {t('Dashboard Overview', 'نظرة عامة على لوحة التحكم')}
        </h1>
        <p className="text-muted-foreground">
          {t('Welcome back! Here\'s what\'s happening with your platform.', 'مرحباً بعودتك! إليك ما يحدث في منصتك.')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads & Bookings Trend */}
        <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-[var(--font-display)] font-bold text-xl mb-1">
                {t('Leads & Bookings', 'العملاء والحجوزات')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('Last 6 months performance', 'أداء آخر 6 أشهر')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-500">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+23%</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1333', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#F8F9FA'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#6366F1" 
                strokeWidth={3}
                dot={{ fill: '#6366F1', r: 5 }}
                name={t('Leads', 'العملاء')}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#F97316" 
                strokeWidth={3}
                dot={{ fill: '#F97316', r: 5 }}
                name={t('Bookings', 'الحجوزات')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
          <div className="mb-6">
            <h3 className="font-[var(--font-display)] font-bold text-xl mb-1">
              {t('Service Distribution', 'توزيع الخدمات')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('Breakdown by category', 'التقسيم حسب الفئة')}
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1333', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#F8F9FA'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {serviceDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
            <h3 className="font-[var(--font-display)] font-bold text-xl mb-4">
              {t('Quick Actions', 'إجراءات سريعة')}
            </h3>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="group flex items-center gap-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium flex-1">{action.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
            <h3 className="font-[var(--font-display)] font-bold text-xl mb-4">
              {t('Recent Activity', 'النشاط الأخير')}
            </h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-4 p-4 bg-muted/20 hover:bg-muted/30 rounded-xl transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}