import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/contact/contact-form';
import { MapSection } from '@/components/contact/map-section';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const isRTL = locale === 'ar';

  const contactInfo = [
    {
      icon: MapPin,
      title: t('info.address'),
      value: t('info.addressValue'),
      link: 'https://maps.google.com/?q=21.5433,39.1728',
    },
    {
      icon: Phone,
      title: t('info.phone'),
      value: '+966 12 6501721',
      link: 'tel:+966126501721',
    },
    {
      icon: Mail,
      title: t('info.email'),
      value: 'info@mtservices.com.sa',
      link: 'mailto:info@mtservices.com.sa',
    },
    {
      icon: Clock,
      title: t('info.hours'),
      value: t('info.hoursValue'),
      link: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#002D54]">
        <div className="absolute inset-0 bg-[url('/images/hero-cleaning.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
              {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-[#F4F7F9] rounded-2xl p-6 hover:bg-[#6CC0E1]/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[#6CC0E1]/20 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-7 h-7 text-[#6CC0E1]" />
                </div>
                <h3 className="text-sm font-semibold text-[#5A6A7A] mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#002D54] font-medium text-lg hover:text-[#6CC0E1] transition-colors whitespace-pre-line"
                    dir={info.icon === Phone ? 'ltr' : undefined}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-[#002D54] font-medium whitespace-pre-line">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection locale={locale} />

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Info */}
            <div>
              <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
                {locale === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002D54] mb-6 text-balance">
                {locale === 'ar' ? 'هل لديك استفسار؟' : 'Have a Question?'}
              </h2>
              <p className="text-[#5A6A7A] text-lg leading-relaxed mb-8">
                {locale === 'ar'
                  ? 'املأ النموذج وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن. نحن هنا لمساعدتك في جميع احتياجات التنظيف والصيانة.'
                  : 'Fill out the form and our team will get back to you as soon as possible. We are here to help with all your cleaning and maintenance needs.'}
              </p>

              {/* Quick Contact */}
              <div className="bg-[#F4F7F9] rounded-2xl p-8">
                <h3 className="text-lg font-bold text-[#002D54] mb-6">
                  {locale === 'ar' ? 'أو تواصل معنا مباشرة' : 'Or Contact Us Directly'}
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+966126501721"
                    className="flex items-center gap-4 text-[#1A1A1A] hover:text-[#6CC0E1] transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#6CC0E1]/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#6CC0E1]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#5A6A7A]">{t('info.phone')}</p>
                      <p className="font-semibold" dir="ltr">+966 12 6501721</p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@mtservices.com.sa"
                    className="flex items-center gap-4 text-[#1A1A1A] hover:text-[#6CC0E1] transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#6CC0E1]/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#6CC0E1]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#5A6A7A]">{t('info.email')}</p>
                      <p className="font-semibold">info@mtservices.com.sa</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
