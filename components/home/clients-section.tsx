'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/hooks/use-in-view';
import { clientLogos } from '@/data/client-logos';

export function ClientsSection() {
  const t = useTranslations('clients');
  const locale = useLocale();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#F4F7F9]">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#6CC0E1]">
            {locale === 'ar' ? 'شركاء النجاح' : 'Success Partners'}
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold text-[#002D54] md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg leading-relaxed text-[#5A6A7A]">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {clientLogos.map((client, index) => (
            <div
              key={client.slug}
              className={`group flex flex-col rounded-xl border border-[#E8EEF2]/90 bg-white p-4 shadow-sm transition-all duration-500 hover:border-[#6CC0E1]/25 hover:shadow-md ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${Math.min(index, 10) * 40}ms` }}
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg bg-transparent">
                <Image
                  src={client.src}
                  alt={locale === 'ar' ? client.nameAr : client.name}
                  fill
                  className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <p className="mt-3 line-clamp-2 text-center text-xs font-medium leading-snug text-[#5A6A7A]">
                {locale === 'ar' ? client.nameAr : client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
