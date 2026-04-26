import Image from 'next/image';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Shield, Leaf, Heart, Award, CheckCircle2 } from 'lucide-react';
import { CertificatesArchiveGrid } from '@/components/certificates/certificates-archive-grid';

/** معرض الوثائق: 001–013 (014–017 تُعرض في بطاقات الـ ISO أعلاه). */
const ARCHIVE_IMAGE_PATHS = [
  '/images/certificates/certificates-001.png',
  '/images/certificates/certificates-002.png',
  '/images/certificates/certificates-003.png',
  '/images/certificates/certificates-004.png',
  '/images/certificates/certificates-005.png',
  '/images/certificates/certificates-006.png',
  '/images/certificates/certificates-007.png',
  '/images/certificates/certificates-008.png',
  '/images/certificates/certificates-009.png',
  '/images/certificates/certificates-010.png',
  '/images/certificates/certificates-011.png',
  '/images/certificates/certificates-012.png',
  '/images/certificates/certificates-013.png',
] as const;

const certificates = [
  {
    id: 'iso9001',
    icon: Shield,
    imageSrc: '/images/certificates/certificates-017.png',
    year: '2023',
    features: {
      ar: ['نظام إدارة الجودة المعتمد', 'تحسين مستمر للعمليات', 'رضا العملاء'],
      en: ['Certified Quality Management System', 'Continuous Process Improvement', 'Customer Satisfaction'],
    },
  },
  {
    id: 'iso14001',
    icon: Leaf,
    imageSrc: '/images/certificates/certificates-015.png',
    year: '2023',
    features: {
      ar: ['نظام الإدارة البيئية', 'ممارسات صديقة للبيئة', 'إدارة النفايات'],
      en: ['Environmental Management System', 'Eco-Friendly Practices', 'Waste Management'],
    },
  },
  {
    id: 'iso45001',
    icon: Heart,
    imageSrc: '/images/certificates/certificates-016.png',
    year: '2023',
    features: {
      ar: ['سلامة بيئة العمل', 'صحة العاملين', 'إدارة المخاطر'],
      en: ['Workplace Safety', 'Worker Health', 'Risk Management'],
    },
  },
  {
    id: 'saso',
    icon: Award,
    imageSrc: '/images/certificates/certificates-014.png',
    year: '2019',
    features: {
      ar: ['المواصفات السعودية', 'معايير الجودة المحلية', 'الامتثال التنظيمي'],
      en: ['Saudi Standards', 'Local Quality Standards', 'Regulatory Compliance'],
    },
  },
];

const additionalCertifications = {
  ar: [
    'شهادة تصنيف المقاولين من وزارة الشؤون البلدية',
    'عضوية الغرفة التجارية الصناعية بجدة',
    'شهادة السلامة المهنية من وزارة العمل',
    'اعتماد من الهيئة العامة للأرصاد وحماية البيئة',
    'شهادة مكافحة الحشرات من وزارة الزراعة',
  ],
  en: [
    'Contractor Classification Certificate from Ministry of Municipal Affairs',
    'Jeddah Chamber of Commerce and Industry Membership',
    'Occupational Safety Certificate from Ministry of Labor',
    'Accreditation from General Authority of Meteorology and Environmental Protection',
    'Pest Control Certificate from Ministry of Agriculture',
  ],
};

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('certificates');
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  const galleryMeta = (
    messages.certificates as {
      gallery?: { title: string; description: string }[];
    }
  ).gallery;

  const archiveItems = ARCHIVE_IMAGE_PATHS.map((src, i) => ({
    src,
    title: galleryMeta?.[i]?.title ?? `Certificate ${i + 1}`,
    description: galleryMeta?.[i]?.description ?? '',
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#002D54]">
        <div className="absolute inset-0 bg-[url('/images/hero-cleaning.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
              {locale === 'ar' ? 'الجودة والاعتماد' : 'Quality & Accreditation'}
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

      {/* Main Certificates */}
      <section className="py-20 lg:py-32 bg-[#F4F7F9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002D54] mb-6 text-balance">
              {locale === 'ar' ? 'الشهادات الدولية' : 'International Certifications'}
            </h2>
            <p className="text-[#5A6A7A] text-lg leading-relaxed">
              {locale === 'ar'
                ? 'حاصلون على أهم الشهادات العالمية التي تضمن أعلى معايير الجودة والسلامة'
                : 'We hold the most important international certificates ensuring the highest quality and safety standards'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-[#E8EEF2]/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#6CC0E1]/25 hover:shadow-xl sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={
                      'imageSrc' in cert && cert.imageSrc
                        ? 'relative mx-auto aspect-[3/4] w-full max-w-[240px] shrink-0 self-center rounded-xl border border-[#6CC0E1]/20 bg-[#F4F7F9] shadow-inner sm:mx-0 sm:w-44 sm:max-w-none sm:self-start md:w-48'
                        : 'relative mx-auto flex h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-2xl bg-[#6CC0E1]/10 sm:mx-0 sm:self-start'
                    }
                  >
                    {'imageSrc' in cert && cert.imageSrc ? (
                      <Image
                        src={cert.imageSrc}
                        alt={t(`list.${cert.id}.title`)}
                        fill
                        className="object-contain p-2.5 sm:p-3"
                        sizes="(max-width: 640px) 240px, (max-width: 768px) 176px, 192px"
                      />
                    ) : (
                      <cert.icon className="h-10 w-10 text-[#6CC0E1]" />
                    )}
                  </div>
                  <div
                    className="min-w-0 flex-1 sm:pt-0.5"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <div className="mb-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
                      <h3 className="text-start text-balance text-lg font-bold tracking-tight text-[#002D54] sm:text-xl">
                        {t(`list.${cert.id}.title`)}
                      </h3>
                      <span className="shrink-0 rounded-full bg-[#6CC0E1]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6CC0E1]">
                        {cert.year}
                      </span>
                    </div>
                    <p className="mb-4 text-start text-pretty text-sm leading-relaxed text-[#5A6A7A] sm:text-[0.9375rem]">
                      {t(`list.${cert.id}.description`)}
                    </p>
                    <ul className="space-y-2 text-start">
                      {(isRTL ? cert.features.ar : cert.features.en).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm leading-snug text-[#5A6A7A]"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6CC0E1]" />
                          <span className="min-w-0 flex-1 text-start">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E8EEF2] bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold text-[#002D54] md:text-4xl">
              {t('gallerySectionTitle')}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5A6A7A]">
              {t('gallerySectionSubtitle')}
            </p>
          </div>
          <CertificatesArchiveGrid
            items={archiveItems}
            viewFullLabel={t('viewFullCertificate')}
          />
        </div>
      </section>

      {/* Additional Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#6CC0E1] font-semibold text-sm uppercase tracking-wider mb-4 block">
                {locale === 'ar' ? 'اعتمادات إضافية' : 'Additional Accreditations'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002D54] mb-6 text-balance">
                {locale === 'ar'
                  ? 'اعتمادات محلية ورخص رسمية'
                  : 'Local Accreditations & Official Licenses'}
              </h2>
              <p className="text-[#5A6A7A] text-lg leading-relaxed mb-8">
                {locale === 'ar'
                  ? 'بالإضافة إلى الشهادات الدولية، نحمل جميع التراخيص والاعتمادات المحلية اللازمة للعمل في المملكة العربية السعودية'
                  : 'In addition to international certificates, we hold all necessary local licenses and accreditations to operate in Saudi Arabia'}
              </p>
              <ul className="space-y-4">
                {(isRTL ? additionalCertifications.ar : additionalCertifications.en).map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#6CC0E1]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#6CC0E1]" />
                    </div>
                    <span className="text-[#1A1A1A] font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#002D54] rounded-2xl p-10 text-center">
              <div className="w-24 h-24 bg-[#6CC0E1] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-[#001A33]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {locale === 'ar' ? 'شركة معتمدة' : 'Certified Company'}
              </h3>
              <p className="text-white/70 mb-6">
                {locale === 'ar'
                  ? 'جميع شهاداتنا واعتماداتنا محدثة وسارية المفعول'
                  : 'All our certificates and accreditations are up-to-date and valid'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-[#6CC0E1]">4+</p>
                  <p className="text-white/60 text-sm">
                    {locale === 'ar' ? 'شهادات ISO' : 'ISO Certificates'}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-[#6CC0E1]">13+</p>
                  <p className="text-white/60 text-sm">
                    {locale === 'ar' ? 'شهادات عملاء وشركاء' : 'Client & partner letters'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F4F7F9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-[#002D54] to-[#001A33] rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              {locale === 'ar' ? 'جودة موثوقة وخدمة معتمدة' : 'Reliable Quality & Certified Service'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'تواصل معنا اليوم للحصول على خدمات تنظيف وصيانة معتمدة ومطابقة لأعلى المعايير'
                : 'Contact us today for certified cleaning and maintenance services that meet the highest standards'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6CC0E1] text-[#001A33] font-bold rounded-xl hover:bg-[#5AB0D1] transition-all hover:scale-105"
            >
              {locale === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
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
