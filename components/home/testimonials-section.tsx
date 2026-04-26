'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/hooks/use-in-view';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = {
  ar: [
    {
      name: 'محمد الأحمدي',
      company: 'شركة التطوير العقاري',
      role: 'مدير المرافق',
      content: 'خدمة ممتازة واحترافية عالية. فريق العمل ملتزم ودقيق في المواعيد. أنصح بشدة بالتعامل معهم.',
      rating: 5,
    },
    {
      name: 'سارة العتيبي',
      company: 'مجموعة المستشفيات السعودية',
      role: 'مديرة الخدمات',
      content: 'نتعامل مع TM Services منذ أكثر من 5 سنوات. جودة التنظيف والتعقيم استثنائية.',
      rating: 5,
    },
    {
      name: 'عبدالله الغامدي',
      company: 'فندق القمة',
      role: 'المدير العام',
      content: 'شريك موثوق في الحفاظ على نظافة منشأتنا. سرعة الاستجابة وجودة الخدمة لا مثيل لها.',
      rating: 5,
    },
  ],
  en: [
    {
      name: 'Mohammed Al-Ahmadi',
      company: 'Real Estate Development Co.',
      role: 'Facilities Manager',
      content: 'Excellent service with high professionalism. The team is committed and punctual. I highly recommend working with them.',
      rating: 5,
    },
    {
      name: 'Sara Al-Otaibi',
      company: 'Saudi Hospitals Group',
      role: 'Services Director',
      content: 'We have been working with TM Services for over 5 years. The quality of cleaning and sterilization is exceptional.',
      rating: 5,
    },
    {
      name: 'Abdullah Al-Ghamdi',
      company: 'Summit Hotel',
      role: 'General Manager',
      content: 'A trusted partner in maintaining our facility cleanliness. Response speed and service quality are unmatched.',
      rating: 5,
    },
  ],
};

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonials = locale === 'ar' ? testimonials.ar : testimonials.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentTestimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#002D54]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
            {locale === 'ar' ? 'آراء العملاء' : 'Client Reviews'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            {t('title')}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Testimonial Slider */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-8 start-0 w-16 h-16 text-[#6CC0E1]/20" />

            {/* Testimonial Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#6CC0E1] text-[#6CC0E1]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-xl md:text-2xl leading-relaxed mb-8">
                &ldquo;{currentTestimonials[currentIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#6CC0E1] rounded-full flex items-center justify-center">
                  <span className="text-[#001A33] font-bold text-xl">
                    {currentTestimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {currentTestimonials[currentIndex].name}
                  </p>
                  <p className="text-white/60 text-sm">
                    {currentTestimonials[currentIndex].role}, {currentTestimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6CC0E1] transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {currentTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-[#6CC0E1] w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6CC0E1] transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
