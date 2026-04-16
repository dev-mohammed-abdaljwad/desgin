import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { MessageSquare, Mail, Phone, Calendar, Tag, Filter, Download } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high';
}

export function LeadsManagement() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const leads: Lead[] = [
    {
      id: 'LD001',
      name: 'Mohammed Abdullah',
      email: 'mohammed@company.com',
      phone: '+966 50 111 2222',
      service: 'Brand Identity Design',
      message: 'Looking for complete branding solution for new startup',
      date: '2026-04-15',
      status: 'new',
      priority: 'high',
    },
    {
      id: 'LD002',
      name: 'Layla Ahmed',
      email: 'layla@business.com',
      phone: '+966 55 333 4444',
      service: 'Social Media Management',
      message: 'Need ongoing social media management for restaurant chain',
      date: '2026-04-14',
      status: 'contacted',
      priority: 'high',
    },
    {
      id: 'LD003',
      name: 'Omar Hassan',
      email: 'omar@tech.com',
      phone: '+966 56 555 6666',
      service: 'Video Production',
      message: 'Interested in promotional video production',
      date: '2026-04-13',
      status: 'qualified',
      priority: 'medium',
    },
    {
      id: 'LD004',
      name: 'Nora Salem',
      email: 'nora@edu.com',
      phone: '+966 54 777 8888',
      service: 'Educational Platform - Teacher',
      message: 'Want to know more about educational platform features',
      date: '2026-04-12',
      status: 'converted',
      priority: 'low',
    },
    {
      id: 'LD005',
      name: 'Faisal Khalid',
      email: 'faisal@podcast.com',
      phone: '+966 50 999 0000',
      service: 'Podcast Recording',
      message: 'Looking for regular podcast recording slots',
      date: '2026-04-11',
      status: 'new',
      priority: 'medium',
    },
  ];

  const statusConfig = {
    new: { label: t('New', 'جديد'), color: 'bg-primary/20 text-primary' },
    contacted: { label: t('Contacted', 'تم التواصل'), color: 'bg-accent/20 text-accent' },
    qualified: { label: t('Qualified', 'مؤهل'), color: 'bg-secondary/20 text-secondary' },
    converted: { label: t('Converted', 'تم التحويل'), color: 'bg-green-500/20 text-green-500' },
    lost: { label: t('Lost', 'مفقود'), color: 'bg-muted text-muted-foreground' },
  };

  const priorityConfig = {
    high: { label: t('High', 'عالي'), color: 'bg-destructive/20 text-destructive' },
    medium: { label: t('Medium', 'متوسط'), color: 'bg-gold/20 text-gold' },
    low: { label: t('Low', 'منخفض'), color: 'bg-muted text-muted-foreground' },
  };

  const stats = [
    { title: t('Total Leads', 'إجمالي العملاء'), value: leads.length, color: 'from-primary to-accent' },
    { title: t('New', 'جديد'), value: leads.filter(l => l.status === 'new').length, color: 'from-accent to-secondary' },
    { title: t('Qualified', 'مؤهل'), value: leads.filter(l => l.status === 'qualified').length, color: 'from-secondary to-gold' },
    { title: t('Converted', 'تم التحويل'), value: leads.filter(l => l.status === 'converted').length, color: 'from-gold to-primary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-2">
            {t('Leads & Contacts', 'العملاء المحتملون')}
          </h1>
          <p className="text-muted-foreground">
            {t('Manage inquiries and potential clients', 'إدارة الاستفسارات والعملاء المحتملين')}
          </p>
        </div>
        <button className="px-6 py-3 bg-card/50 border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('Export', 'تصدير')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
            <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">{stat.title}</h3>
            <p className="font-[var(--font-display)] font-bold text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-2">{t('Status', 'الحالة')}</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="all">{t('All Status', 'جميع الحالات')}</option>
              {Object.entries(statusConfig).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-2">{t('Priority', 'الأولوية')}</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="all">{t('All Priorities', 'جميع الأولويات')}</option>
              {Object.entries(priorityConfig).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
          >
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Lead Info */}
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <span className="text-xs text-muted-foreground">#{lead.id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Message */}
              <div className="lg:col-span-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Service', 'الخدمة')}</p>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-sm font-medium inline-block">
                      {lead.service}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('Message', 'الرسالة')}</p>
                    <p className="text-sm">{lead.message}</p>
                  </div>
                </div>
              </div>

              {/* Status & Priority */}
              <div className="lg:col-span-3">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t('Date', 'التاريخ')}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {lead.date}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t('Status', 'الحالة')}</p>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium inline-block ${statusConfig[lead.status].color}`}>
                      {statusConfig[lead.status].label}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t('Priority', 'الأولوية')}</p>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium inline-block ${priorityConfig[lead.priority].color}`}>
                      {priorityConfig[lead.priority].label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-border flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                {t('Contact', 'تواصل')}
              </button>
              <button className="px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm font-medium transition-colors">
                {t('Mark as Qualified', 'تحديد كمؤهل')}
              </button>
              <button className="px-4 py-2 bg-green-500/20 text-green-500 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors">
                {t('Convert', 'تحويل')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
