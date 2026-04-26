'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Users, Briefcase, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: '500+', label: t('stats.clients') },
    { icon: Briefcase, value: '2000+', label: t('stats.projects') },
    { icon: Award, value: '15+', label: t('stats.experience') },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cleaning.jpg"
          alt="TM Services Cleaning Team"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002D54]/95 via-[#002D54]/85 to-[#002D54]/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#6CC0E1]/20 backdrop-blur-sm rounded-full mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="w-2 h-2 bg-[#6CC0E1] rounded-full animate-pulse" />
            <span className="text-[#6CC0E1] text-sm font-medium">
              {locale === 'ar' ? 'شركة معتمدة في المملكة العربية السعودية' : 'Certified Company in Saudi Arabia'}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105 active:scale-95"
            >
              {t('cta')}
              <ArrowIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              {locale === 'ar' ? 'استعرض خدماتنا' : 'Explore Services'}
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-6 md:gap-12 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center md:text-start">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <stat.icon className="w-6 h-6 text-[#6CC0E1] hidden md:block" />
                  <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs">
          {locale === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
