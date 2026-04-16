import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('Phone', 'الهاتف'),
      details: ['+966 50 123 4567', '+966 11 234 5678'],
      gradient: 'from-primary to-accent',
    },
    {
      icon: Mail,
      title: t('Email', 'البريد الإلكتروني'),
      details: ['info@mediapro.com', 'support@mediapro.com'],
      gradient: 'from-accent to-secondary',
    },
    {
      icon: MapPin,
      title: t('Address', 'العنوان'),
      details: [
        t('Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية'),
        t('King Fahd Road, Al Olaya District', 'طريق الملك فهد، حي العليا')
      ],
      gradient: 'from-secondary to-gold',
    },
    {
      icon: Clock,
      title: t('Working Hours', 'ساعات العمل'),
      details: [
        t('Sun - Thu: 9AM - 6PM', 'الأحد - الخميس: 9 صباحاً - 6 مساءً'),
        t('Fri - Sat: Closed', 'الجمعة - السبت: مغلق')
      ],
      gradient: 'from-gold to-primary',
    },
  ];

  const services = [
    t('Branding & Marketing', 'العلامة التجارية والتسويق'),
    t('Social Media Management', 'إدارة وسائل التواصل الاجتماعي'),
    t('Graphic Design', 'التصميم الجرافيكي'),
    t('Video Production', 'إنتاج الفيديو'),
    t('Podcast Recording', 'تسجيل البودكاست'),
    t('Educational Platform - Student', 'المنصة التعليمية - طالب'),
    t('Educational Platform - Teacher', 'المنصة التعليمية - معلم'),
    t('Other', 'أخرى'),
  ];

  return (
    <div className="pt-20 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#1A1333] to-[#2D1B4E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl mb-6">
              {t('Get in ', 'تواصل ')}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t('Touch', 'معنا')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(
                "Have a project in mind? We'd love to hear from you. Let's create something amazing together.",
                'لديك مشروع في ذهنك؟ نحن نحب أن نسمع منك. لنبتكر شيئاً مذهلاً معاً.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-20 bg-gradient-to-b from-background to-[#1A1333]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all"
                >
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-[var(--font-display)] font-bold text-3xl lg:text-4xl mb-4">
                {t('Send us a Message', 'أرسل لنا رسالة')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t(
                  'Fill out the form below and we\'ll get back to you within 24 hours.',
                  'املأ النموذج أدناه وسنعود إليك خلال 24 ساعة.'
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">
                    {t('Full Name', 'الاسم الكامل')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder={t('John Doe', 'محمد أحمد')}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('Email', 'البريد الإلكتروني')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('Phone Number', 'رقم الهاتف')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="+966 50 123 4567"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('Service Interested In', 'الخدمة المهتم بها')} <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="">{t('Select a service', 'اختر خدمة')}</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('Message', 'الرسالة')} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder={t('Tell us about your project...', 'أخبرنا عن مشروعك...')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {t('Send Message', 'إرسال الرسالة')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Quick Contact */}
              <div className="mt-8 p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('Prefer WhatsApp?', 'تفضل الواتساب؟')}</h3>
                    <p className="text-sm text-muted-foreground">{t('Chat with us instantly', 'تحدث معنا فوراً')}</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-center rounded-xl font-semibold hover:shadow-lg hover:shadow-[#25D366]/50 transition-all"
                >
                  {t('Open WhatsApp', 'فتح الواتساب')}
                </a>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full min-h-[600px] rounded-3xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9823029467047!2d46.67233631500292!3d24.713552784128973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03591cd5ac2d%3A0x1d6b50c4f5b7e4c!2sKing%20Fahd%20Road%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}