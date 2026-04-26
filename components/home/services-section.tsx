'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const services = [
  { slug: 'ac-cleaning', image: '/images/services/ac-cleaning.jpg' },
  { slug: 'sofa-cleaning', image: '/images/services/sofa-cleaning.jpg' },
  { slug: 'carpet-cleaning', image: '/images/services/carpet-cleaning.jpg' },
  { slug: 'pest-control', image: '/images/services/pest-control.jpg' },
  { slug: 'water-tank', image: '/images/services/water-tank.jpg' },
  { slug: 'disinfection', image: '/images/services/disinfection.jpg' },
];

export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#F4F7F9]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
            {locale === 'ar' ? 'ما نقدمه' : 'What We Offer'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002D54] mb-6 text-balance">
            {t('title')}
          </h2>
          <p className="text-[#5A6A7A] text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(`list.${service.slug}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D54]/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#002D54] mb-3 group-hover:text-[#6CC0E1] transition-colors">
                  {t(`list.${service.slug}.title`)}
                </h3>
                <p className="text-[#5A6A7A] text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(`list.${service.slug}.description`)}
                </p>
                <div className="flex items-center gap-2 text-[#6CC0E1] font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>{t('learnMore')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#002D54] text-white font-semibold rounded-xl hover:bg-[#001A33] transition-all hover:scale-105 active:scale-95"
          >
            {t('viewAll')}
            <ArrowIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
