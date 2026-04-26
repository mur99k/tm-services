'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { TmLogoMark } from '@/components/brand/tm-logo-mark';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    { href: '/services/ac-cleaning', label: t('services.list.ac-cleaning.title') },
    { href: '/services/sofa-cleaning', label: t('services.list.sofa-cleaning.title') },
    { href: '/services/carpet-cleaning', label: t('services.list.carpet-cleaning.title') },
    { href: '/services/pest-control', label: t('services.list.pest-control.title') },
    { href: '/services/water-tank', label: t('services.list.water-tank.title') },
    { href: '/services/disinfection', label: t('services.list.disinfection.title') },
  ];

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/clients', label: t('nav.clients') },
    { href: '/certificates', label: t('nav.certificates') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#001A33] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex flex-col gap-2">
              <TmLogoMark variant="light" className="h-9 max-w-[220px] sm:h-10" />
              <p className="text-xs text-white/70">
                {locale === 'ar' ? 'التنظيف والصيانة' : 'Cleaning & Maintenance'}
              </p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#6CC0E1] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#6CC0E1] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">{t('footer.ourServices')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-[#6CC0E1] transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6CC0E1] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm whitespace-pre-line">
                  {t('contact.info.addressValue')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#6CC0E1] shrink-0" />
                <a
                  href="tel:+966126501721"
                  className="text-white/70 hover:text-[#6CC0E1] transition-colors text-sm"
                  dir="ltr"
                >
                  +966 12 6501721
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#6CC0E1] shrink-0" />
                <a
                  href="mailto:info@mtservices.com.sa"
                  className="text-white/70 hover:text-[#6CC0E1] transition-colors text-sm"
                >
                  info@mtservices.com.sa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} TM Services. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-[#6CC0E1] transition-colors">
                {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-[#6CC0E1] transition-colors">
                {locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
