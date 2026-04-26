'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/hooks/use-in-view';

const certificates = ['iso9001', 'iso14001', 'iso45001', 'saso'] as const;

const certificateHomeImages: Record<(typeof certificates)[number], string> = {
  iso9001: '/images/certificates/home-section-iso9001.jpg',
  iso14001: '/images/certificates/home-section-iso14001.jpg',
  iso45001: '/images/certificates/home-section-iso45001.jpg',
  saso: '/images/certificates/home-section-saso.jpg',
};

export function CertificatesSection() {
  const t = useTranslations('certificates');
  const locale = useLocale();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#6CC0E1]">
            {locale === 'ar' ? 'الجودة والاعتماد' : 'Quality & Accreditation'}
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold text-[#002D54] md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg leading-relaxed text-[#5A6A7A]">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, index) => (
            <div
              key={cert}
              className={`group rounded-2xl bg-[#F4F7F9] p-8 text-center transition-all duration-500 hover:bg-[#002D54] ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mx-auto mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-white ring-1 ring-[#6CC0E1]/25 transition-shadow group-hover:ring-[#6CC0E1]/40">
                <Image
                  src={certificateHomeImages[cert]}
                  alt={t(`list.${cert}.title`)}
                  fill
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="80px"
                />
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#002D54] transition-colors group-hover:text-white">
                {t(`list.${cert}.title`)}
              </h3>

              <p className="text-sm text-[#5A6A7A] transition-colors group-hover:text-white/70">
                {t(`list.${cert}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
