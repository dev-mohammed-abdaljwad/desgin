import { useParams, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { useService } from '../../hooks/usePublicApi';
import type { Service } from '../../types/api';
import {
  ArrowLeft,
  Check,
  Star,
  Share2,
  MessageCircle,
  Clock,
  Tag,
  Package,
} from 'lucide-react';

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { data: service, loading, error } = useService(Number(id));

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('Loading...', 'جاري التحميل...')}</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t('Service not found', 'الخدمة غير موجودة')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('The service you are looking for does not exist.', 'الخدمة التي تبحث عنها غير موجودة.')}
          </p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('Back to Services', 'العودة إلى الخدمات')}
          </button>
        </div>
      </div>
    );
  }

  const svc = service as Service;
  const title = language === 'en' ? svc.title.en : svc.title.ar;
  const description = language === 'en' ? svc.description.en : svc.description.ar;

  const benefits = [
    t('Professional Implementation', 'تنفيذ احترافي'),
    t('Customized Solutions', 'حلول مخصصة'),
    t('24/7 Support', 'دعم على مدار الساعة'),
    t('Quality Assurance', 'ضمان الجودة'),
    t('Timely Delivery', 'التسليم في الوقت المحدد'),
    t('Expert Team', 'فريق خبير'),
  ];

  return (
    <div className="pt-20 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('Back to Services', 'العودة إلى الخدمات')}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative mb-20">
        <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={svc.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/50 to-transparent"></div>
              </div>

              {/* Icon Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 left-6 w-20 h-20 bg-card rounded-2xl border-4 border-background shadow-lg flex items-center justify-center"
              >
                <img
                  src={svc.icon}
                  alt={title}
                  className="w-12 h-12"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-8"
            >
              {/* Price Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {t('Starting at', 'يبدأ من')} {svc.price}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-[var(--font-display)] font-bold text-5xl mb-4 leading-tight">
                {title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {t('Get Quote', 'احصل على عرض')}
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <button
                  onClick={() => navigator.share({ title, text: description, url: window.location.href })}
                  className="px-8 py-4 bg-muted/50 backdrop-blur-xl border border-border text-foreground rounded-xl font-semibold text-lg hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  {t('Share', 'مشاركة')}
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{t('Quick Turnaround', 'تسليم سريع')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-muted-foreground">{t('Top Rated', 'مصنف أعلى')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#1A1333] to-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl mb-4">
              {t('Why Choose This Service?', 'لماذا تختار هذه الخدمة؟')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('Get the best results with our comprehensive approach', 'احصل على أفضل النتائج مع نهجنا الشامل')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl mb-4">
              {t('Other Services', 'خدمات أخرى')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('Explore our complete service portfolio', 'استكشف محفظة خدماتنا الكاملة')}
            </p>
          </motion.div>

          <div className="grid gap-6">
            <a
              href="/services"
              className="group p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {t('Browse All Services', 'استعرض جميع الخدمات')}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('See our complete service offerings', 'انظر إلى كل عروض الخدمات لدينا')}
                </p>
              </div>
              <Package className="w-6 h-6 text-primary transform group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-3xl mx-6 mb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-6">
              {t('Ready to Get Started?', 'مستعد للبدء؟')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('Let us help you achieve your goals with this service', 'دعنا نساعدك على تحقيق أهدافك بهذه الخدمة')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105"
            >
              {t('Contact Us Now', 'تواصل معنا الآن')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
