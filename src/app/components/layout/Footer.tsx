import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t, dir } = useLanguage();

  const footerLinks = {
    services: [
      { label: t('Marketing Services', 'خدمات التسويق'), path: '/services#marketing' },
      { label: t('Media Production', 'الإنتاج الإعلامي'), path: '/services#media' },
      { label: t('Podcast Studio', 'استوديو البودكاست'), path: '/podcast-studio' },
      { label: t('Education Platform', 'المنصة التعليمية'), path: '/educational-platform' },
    ],
    company: [
      { label: t('About Us', 'من نحن'), path: '/about' },
      { label: t('Portfolio', 'أعمالنا'), path: '/portfolio' },
      { label: t('Blog', 'المدونة'), path: '/blog' },
      { label: t('Contact', 'تواصل معنا'), path: '/contact' },
    ],
    legal: [
      { label: t('Privacy Policy', 'سياسة الخصوصية'), path: '/privacy' },
      { label: t('Terms of Service', 'شروط الخدمة'), path: '/terms' },
      { label: t('Refund Policy', 'سياسة الاسترجاع'), path: '/refund' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-[#0A0515] border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="font-[var(--font-display)] font-bold text-white text-xl">M</span>
              </div>
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <span className="font-[var(--font-display)] font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('MediaPro', 'ميديا برو')}
                </span>
                <p className="text-xs text-muted-foreground">{t('Agency & Education', 'دعاية وتعليم')}</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t(
                'Your all-in-one solution for advertising, media production, podcast recording, and online education.',
                'حلك الشامل للدعاية والإعلان والإنتاج الإعلامي وتسجيل البودكاست والتعليم الإلكتروني.'
              )}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-gradient-to-br hover:from-primary hover:to-accent flex items-center justify-center transition-all transform hover:scale-110 group"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-[var(--font-display)] font-semibold mb-4">{t('Services', 'الخدمات')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-[var(--font-display)] font-semibold mb-4">{t('Company', 'الشركة')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[var(--font-display)] font-semibold mb-4">{t('Contact', 'تواصل معنا')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground">+966 50 123 4567</p>
                  <p className="text-sm">+966 11 234 5678</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground">info@mediapro.com</p>
                  <p className="text-sm">support@mediapro.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  {t('Riyadh, Saudi Arabia', 'الرياض، المملكة العربية السعودية')}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t(
                '© 2026 MediaPro. All rights reserved.',
                '© 2026 ميديا برو. جميع الحقوق محفوظة.'
              )}
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
