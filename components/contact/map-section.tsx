'use client';

import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { TmLogoMark } from '@/components/brand/tm-logo-mark';

interface MapSectionProps {
  locale: string;
}

export function MapSection({ locale }: MapSectionProps) {
  const isRTL = locale === 'ar';

  return (
    <section className="relative">
      {/* Map Container */}
      <div className="h-[500px] lg:h-[600px] w-full relative">
        {/* Embedded Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.5983850792427!2d39.1706!3d21.5433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMyJzM2LjAiTiAzOcKwMTAnMjIuMCJF!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[30%]"
        />

        {/* Floating Contact Card */}
        <div className="absolute top-8 start-8 md:top-12 md:start-12 max-w-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/50">
            {/* Logo */}
            <div className="mb-6 flex flex-col gap-2">
              <TmLogoMark variant="dark" className="h-9 max-w-[220px]" />
              <p className="text-xs text-[#5A6A7A]">
                {isRTL ? 'التنظيف والصيانة' : 'Cleaning & Maintenance'}
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 bg-[#6CC0E1]/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#6CC0E1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#002D54] mb-1">
                  {isRTL ? 'العنوان' : 'Address'}
                </p>
                <p className="text-sm text-[#5A6A7A] leading-relaxed">
                  {isRTL
                    ? 'طريق الأمير سلطان، النهضة، جدة\nمركز H&R، مكتب رقم 16\nص.ب: 23615'
                    : 'Prince Sultan Rd., An Nahdah, Jeddah\nH&R Centre, Office #16\nP.O. Box: 23615'}
                </p>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://maps.google.com/?q=21.5433,39.1728"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#002D54] text-white font-semibold rounded-xl hover:bg-[#001A33] transition-colors"
            >
              <Navigation className="w-5 h-5" />
              <span>{isRTL ? 'احصل على الاتجاهات' : 'Get Directions'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Custom Map Marker Indicator */}
        <div className="absolute bottom-8 end-8 md:bottom-12 md:end-12">
          <div className="bg-[#6CC0E1] text-[#001A33] px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-[#002D54] rounded-full animate-pulse" />
            <span>{isRTL ? 'موقعنا' : 'Our Location'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
