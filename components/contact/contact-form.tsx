'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const tServices = useTranslations('services.list');
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { value: 'ac-cleaning', label: tServices('ac-cleaning.title') },
    { value: 'sofa-cleaning', label: tServices('sofa-cleaning.title') },
    { value: 'carpet-cleaning', label: tServices('carpet-cleaning.title') },
    { value: 'pest-control', label: tServices('pest-control.title') },
    { value: 'water-tank', label: tServices('water-tank.title') },
    { value: 'disinfection', label: tServices('disinfection.title') },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#F4F7F9] rounded-2xl p-10 text-center">
        <div className="w-20 h-20 bg-[#6CC0E1]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#6CC0E1]" />
        </div>
        <h3 className="text-2xl font-bold text-[#002D54] mb-4">
          {isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
        </h3>
        <p className="text-[#5A6A7A] mb-6">
          {isRTL
            ? 'شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.'
            : 'Thank you for contacting us. Our team will get back to you as soon as possible.'}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-[#002D54] text-white font-semibold rounded-xl hover:bg-[#001A33] transition-colors"
        >
          {isRTL ? 'إرسال رسالة أخرى' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F4F7F9] rounded-2xl p-8">
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#002D54] mb-2">
            {t('name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC0E1] focus:border-transparent transition-all text-[#1A1A1A]"
            placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
          />
        </div>

        {/* Email & Phone Row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#002D54] mb-2">
              {t('email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC0E1] focus:border-transparent transition-all text-[#1A1A1A]"
              placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#002D54] mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              dir="ltr"
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC0E1] focus:border-transparent transition-all text-[#1A1A1A]"
              placeholder="+966 5X XXX XXXX"
            />
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-[#002D54] mb-2">
            {t('service')}
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC0E1] focus:border-transparent transition-all text-[#1A1A1A] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235A6A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: isRTL ? '16px center' : 'calc(100% - 16px) center',
              backgroundSize: '20px',
            }}
          >
            <option value="">{t('selectService')}</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#002D54] mb-2">
            {t('message')} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC0E1] focus:border-transparent transition-all text-[#1A1A1A] resize-none"
            placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#002D54] text-white font-bold rounded-xl hover:bg-[#001A33] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{isRTL ? 'جاري الإرسال...' : 'Sending...'}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{t('submit')}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
