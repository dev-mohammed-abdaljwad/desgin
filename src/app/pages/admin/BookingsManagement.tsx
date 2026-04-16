import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { Calendar, Clock, User, DollarSign, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  studio: string;
  package: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export function BookingsManagement() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('all');

  const bookings: Booking[] = [
    {
      id: 'BK001',
      clientName: 'Ahmed Mohammed',
      email: 'ahmed@example.com',
      phone: '+966 50 123 4567',
      studio: 'Studio A',
      package: 'Premium Package',
      date: '2026-04-20',
      time: '10:00 AM',
      duration: '4 hours',
      price: '$500',
      status: 'confirmed',
    },
    {
      id: 'BK002',
      clientName: 'Sarah Ali',
      email: 'sarah@example.com',
      phone: '+966 55 234 5678',
      studio: 'Studio B',
      package: 'Standard Package',
      date: '2026-04-22',
      time: '2:00 PM',
      duration: '2 hours',
      price: '$300',
      status: 'pending',
    },
    {
      id: 'BK003',
      clientName: 'Khalid Hassan',
      email: 'khalid@example.com',
      phone: '+966 56 345 6789',
      studio: 'Studio A',
      package: 'Premium Package',
      date: '2026-04-18',
      time: '9:00 AM',
      duration: '6 hours',
      price: '$650',
      status: 'completed',
    },
    {
      id: 'BK004',
      clientName: 'Fatima Ibrahim',
      email: 'fatima@example.com',
      phone: '+966 54 456 7890',
      studio: 'Studio C',
      package: 'Basic Package',
      date: '2026-04-25',
      time: '11:00 AM',
      duration: '1 hour',
      price: '$150',
      status: 'pending',
    },
  ];

  const statusConfig = {
    pending: {
      label: t('Pending', 'قيد الانتظار'),
      color: 'bg-gold/20 text-gold',
      icon: AlertCircle,
    },
    confirmed: {
      label: t('Confirmed', 'مؤكد'),
      color: 'bg-accent/20 text-accent',
      icon: CheckCircle,
    },
    completed: {
      label: t('Completed', 'مكتمل'),
      color: 'bg-green-500/20 text-green-500',
      icon: CheckCircle,
    },
    cancelled: {
      label: t('Cancelled', 'ملغي'),
      color: 'bg-destructive/20 text-destructive',
      icon: XCircle,
    },
  };

  const stats = [
    {
      title: t('Total Bookings', 'إجمالي الحجوزات'),
      value: bookings.length,
      icon: Calendar,
      color: 'from-primary to-accent',
    },
    {
      title: t('Confirmed', 'مؤكد'),
      value: bookings.filter(b => b.status === 'confirmed').length,
      icon: CheckCircle,
      color: 'from-accent to-secondary',
    },
    {
      title: t('Pending', 'قيد الانتظار'),
      value: bookings.filter(b => b.status === 'pending').length,
      icon: AlertCircle,
      color: 'from-secondary to-gold',
    },
    {
      title: t('Revenue', 'الإيرادات'),
      value: '$1,600',
      icon: DollarSign,
      color: 'from-gold to-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
          {t('Podcast Bookings', 'حجوزات البودكاست')}
        </h1>
        <p className="text-muted-foreground">
          {t('Manage studio bookings and reservations', 'إدارة حجوزات الاستوديو')}
        </p>
      </div>

      {/* Stats Cards */}
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
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === status
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              {status === 'all' ? t('All', 'الكل') : statusConfig[status as keyof typeof statusConfig].label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => {
          const StatusIcon = statusConfig[booking.status].icon;
          
          return (
            <div
              key={booking.id}
              className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
            >
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Booking Info */}
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.clientName}</h3>
                        <span className="text-xs text-muted-foreground">#{booking.id}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {booking.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {booking.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio & Package */}
                <div className="lg:col-span-3 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Studio', 'الاستوديو')}</p>
                    <p className="font-semibold">{booking.studio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Package', 'الباقة')}</p>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-sm font-medium inline-block">
                      {booking.package}
                    </span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">{booking.price}</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="lg:col-span-2 flex flex-col items-end justify-between">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${statusConfig[booking.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig[booking.status].label}
                  </div>
                  
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                        {t('Confirm', 'تأكيد')}
                      </button>
                      <button className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/30 transition-colors">
                        {t('Cancel', 'إلغاء')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
