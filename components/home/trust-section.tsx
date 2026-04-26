'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Check, Shield, Clock, Award, Users, Leaf } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const trustIcons = [Users, Shield, Leaf, Award, Clock, Check];

export function TrustSection() {
  const t = useTranslations('trust');
  const locale = useLocale();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const points = [
    t('points.1'),
    t('points.2'),
    t('points.3'),
    t('points.4'),
    t('points.5'),
    t('points.6'),
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/trust-team.jpg"
                alt="TM Services Professional Team"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -end-6 bg-[#002D54] text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#6CC0E1] rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-[#001A33]" />
                </div>
                <div>
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-white/70 text-sm">
                    {locale === 'ar' ? 'سنوات من الخبرة' : 'Years Experience'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002D54] mb-6 text-balance">
              {t('title')}
            </h2>
            <p className="text-[#5A6A7A] text-lg leading-relaxed mb-10">
              {t('subtitle')}
            </p>

            {/* Trust Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((point, index) => {
                const Icon = trustIcons[index];
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-[#F4F7F9] hover:bg-[#6CC0E1]/10 transition-all duration-300 ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-[#6CC0E1]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#6CC0E1]" />
                    </div>
                    <p className="text-[#1A1A1A] font-medium text-sm leading-relaxed pt-2">
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
