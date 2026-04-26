'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

export function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#F4F7F9]">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`bg-gradient-to-br from-[#002D54] to-[#001A33] rounded-3xl p-10 md:p-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute -top-20 -end-20 w-80 h-80 bg-[#6CC0E1]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -start-20 w-80 h-80 bg-[#6CC0E1]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105 active:scale-95"
              >
                {t('button')}
                <ArrowIcon className="w-5 h-5" />
              </Link>
              <a
                href="tel:+966126501721"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">+966 12 6501721</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
