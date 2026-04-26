import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const services = [
  { slug: 'ac-cleaning', image: '/images/services/ac-cleaning.jpg' },
  { slug: 'sofa-cleaning', image: '/images/services/sofa-cleaning.jpg' },
  { slug: 'carpet-cleaning', image: '/images/services/carpet-cleaning.jpg' },
  { slug: 'pest-control', image: '/images/services/pest-control.jpg' },
  { slug: 'water-tank', image: '/images/services/water-tank.jpg' },
  { slug: 'disinfection', image: '/images/services/disinfection.jpg' },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#002D54]">
        <div className="absolute inset-0 bg-[url('/images/hero-cleaning.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
              {locale === 'ar' ? 'ما نقدمه' : 'What We Offer'}
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

      {/* Services Grid */}
      <section className="py-20 lg:py-32 bg-[#F4F7F9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(`list.${service.slug}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002D54]/80 to-transparent" />
                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="text-xl font-bold text-white">
                      {t(`list.${service.slug}.title`)}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[#5A6A7A] text-sm leading-relaxed mb-4">
                    {t(`list.${service.slug}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-[#6CC0E1] font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>{t('learnMore')}</span>
                    {isRTL ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-[#002D54] to-[#001A33] rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              {locale === 'ar' ? 'هل تحتاج خدماتنا؟' : 'Need Our Services?'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك'
                : 'Contact us today for a free consultation and a customized quote for your needs'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105"
            >
              {locale === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
              {isRTL ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
