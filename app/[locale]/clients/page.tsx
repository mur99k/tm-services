import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Building2, Briefcase, Users, Award } from 'lucide-react';
import { clientLogos } from '@/data/client-logos';

const stats = [
  { icon: Building2, value: '500+', labelAr: 'شركة ومؤسسة', labelEn: 'Companies & Institutions' },
  { icon: Briefcase, value: '2000+', labelAr: 'مشروع منجز', labelEn: 'Projects Completed' },
  { icon: Users, value: '15+', labelAr: 'سنة من الخبرة', labelEn: 'Years of Experience' },
  { icon: Award, value: '100%', labelAr: 'رضا العملاء', labelEn: 'Customer Satisfaction' },
];

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('clients');
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#002D54]">
        <div className="absolute inset-0 bg-[url('/images/hero-cleaning.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
              {locale === 'ar' ? 'شركاء النجاح' : 'Success Partners'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {t('title')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#6CC0E1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#6CC0E1]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#002D54] mb-2">{stat.value}</p>
                <p className="text-[#5A6A7A] text-sm">{isRTL ? stat.labelAr : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-20 lg:py-32 bg-[#F4F7F9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002D54] mb-6 text-balance">
              {locale === 'ar' ? 'نفتخر بثقة عملائنا' : 'Proud of Our Clients\' Trust'}
            </h2>
            <p className="text-[#5A6A7A] text-lg leading-relaxed">
              {locale === 'ar'
                ? 'نخدم مجموعة متنوعة من القطاعات بما في ذلك الحكومية والخاصة والصناعية'
                : 'We serve a diverse range of sectors including government, private, and industrial'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clientLogos.map((client) => (
              <div
                key={client.slug}
                className="group rounded-2xl border border-[#E8EEF2]/90 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#6CC0E1]/25 hover:shadow-xl"
              >
                <div className="relative mx-auto mb-4 aspect-[5/3] w-full max-w-[200px] overflow-hidden rounded-xl bg-transparent sm:max-w-none">
                  <Image
                    src={client.src}
                    alt={isRTL ? client.nameAr : client.name}
                    fill
                    className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  />
                </div>
                <h3 className="mb-1 line-clamp-2 text-center text-sm font-bold text-[#002D54]">
                  {isRTL ? client.nameAr : client.name}
                </h3>
                <p className="line-clamp-2 text-center text-xs leading-snug text-[#5A6A7A]">
                  {isRTL ? client.sector.ar : client.sector.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-[#002D54] to-[#001A33] rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              {locale === 'ar' ? 'انضم إلى قائمة عملائنا المميزين' : 'Join Our Distinguished Client List'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'تواصل معنا اليوم واكتشف كيف يمكننا مساعدتك في الحفاظ على نظافة وصحة منشأتك'
                : 'Contact us today and discover how we can help maintain the cleanliness and health of your facility'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              {isRTL ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
