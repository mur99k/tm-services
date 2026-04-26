import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';

const services = [
  { slug: 'ac-cleaning', image: '/images/services/ac-cleaning.jpg' },
  { slug: 'sofa-cleaning', image: '/images/services/sofa-cleaning.jpg' },
  { slug: 'carpet-cleaning', image: '/images/services/carpet-cleaning.jpg' },
  { slug: 'pest-control', image: '/images/services/pest-control.jpg' },
  { slug: 'water-tank', image: '/images/services/water-tank.jpg' },
  { slug: 'disinfection', image: '/images/services/disinfection.jpg' },
];

const validSlugs = services.map((s) => s.slug);

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations('services');
  const tDetails = await getTranslations('serviceDetails');
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const service = services.find((s) => s.slug === slug)!;
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  const steps = [
    t(`list.${slug}.steps.1`),
    t(`list.${slug}.steps.2`),
    t(`list.${slug}.steps.3`),
    t(`list.${slug}.steps.4`),
    t(`list.${slug}.steps.5`),
  ];

  const features = isRTL
    ? [
        'فريق عمل محترف ومدرب',
        'أحدث المعدات والتقنيات',
        'مواد آمنة وصديقة للبيئة',
        'أسعار تنافسية',
        'ضمان جودة الخدمة',
        'خدمة عملاء متميزة',
      ]
    : [
        'Professional and trained team',
        'Latest equipment and technologies',
        'Safe and eco-friendly materials',
        'Competitive pricing',
        'Quality service guarantee',
        'Excellent customer service',
      ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={t(`list.${slug}.title`)}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002D54]/95 via-[#002D54]/85 to-[#002D54]/70" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {locale === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">
                {locale === 'ar' ? 'الخدمات' : 'Services'}
              </Link>
              <span>/</span>
              <span className="text-[#6CC0E1]">{t(`list.${slug}.title`)}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {t(`list.${slug}.title`)}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
              {t(`list.${slug}.description`)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105"
              >
                {tDetails('getQuote')}
                <ArrowIcon className="w-5 h-5" />
              </Link>
              <a
                href="tel:+966126501721"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">+966 12 6501721</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Process Steps */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#002D54] mb-8">
                  {tDetails('process')}
                </h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-[#6CC0E1] rounded-xl flex items-center justify-center shrink-0 text-[#001A33] font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 bg-[#F4F7F9] rounded-xl p-5">
                        <p className="text-[#1A1A1A] font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#002D54] mb-8">
                  {tDetails('features')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-[#F4F7F9] rounded-xl p-4"
                    >
                      <div className="w-8 h-8 bg-[#6CC0E1]/20 rounded-lg flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#6CC0E1]" />
                      </div>
                      <span className="text-[#1A1A1A] font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-[#002D54] rounded-2xl p-8 mb-8 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">
                  {locale === 'ar' ? 'احصل على عرض سعر الآن' : 'Get a Quote Now'}
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  {locale === 'ar'
                    ? 'تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص'
                    : 'Contact us for a free consultation and customized quote'}
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl text-center hover:bg-[#5AB0D1] transition-colors"
                >
                  {tDetails('getQuote')}
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white/60 text-sm mb-2">
                    {locale === 'ar' ? 'أو اتصل بنا مباشرة' : 'Or call us directly'}
                  </p>
                  <a
                    href="tel:+966126501721"
                    className="text-[#6CC0E1] font-bold text-xl hover:text-[#5AB0D1] transition-colors"
                    dir="ltr"
                  >
                    +966 12 6501721
                  </a>
                </div>
              </div>

              {/* Other Services */}
              <div>
                <h3 className="text-lg font-bold text-[#002D54] mb-4">
                  {tDetails('otherServices')}
                </h3>
                <div className="space-y-3">
                  {otherServices.map((otherService) => (
                    <Link
                      key={otherService.slug}
                      href={`/services/${otherService.slug}`}
                      className="flex items-center gap-4 bg-[#F4F7F9] rounded-xl p-4 hover:bg-[#6CC0E1]/10 transition-colors group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={otherService.image}
                          alt={t(`list.${otherService.slug}.title`)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#002D54] group-hover:text-[#6CC0E1] transition-colors">
                          {t(`list.${otherService.slug}.title`)}
                        </h4>
                      </div>
                      <ArrowIcon className="w-5 h-5 text-[#5A6A7A] group-hover:text-[#6CC0E1] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
