'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  FileBadge2,
  Factory,
  Ship,
  Anchor,
  Flame,
  Droplets,
  Eye,
  Download,
  Filter,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type FilterId = 'all' | 'iso' | 'partners' | 'projects';

type CertificateItem = {
  id: string;
  title: { ar: string; en: string };
  category: Exclude<FilterId, 'all'>;
  description: { ar: string; en: string };
  imageSrc: string;
  badge: { ar: string; en: string };
  year: string;
  icon: ComponentType<{ className?: string }>;
};

type Props = {
  locale: string;
};

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'iso9001',
    title: { ar: 'ISO 9001:2015', en: 'ISO 9001:2015' },
    category: 'iso',
    description: {
      ar: 'شهادة إدارة جودة متوافقة مع متطلبات التميز التشغيلي الحديثة.',
      en: 'Quality management certification aligned with modern operational excellence requirements.',
    },
    imageSrc: '/images/certificates/certificates-017.png',
    badge: { ar: 'معايير ISO', en: 'ISO Standards' },
    year: '2026',
    icon: ShieldCheck,
  },
  {
    id: 'iso14001',
    title: { ar: 'ISO 14001:2015', en: 'ISO 14001:2015' },
    category: 'iso',
    description: {
      ar: 'التزام بإدارة بيئية فعّالة تركز على تقليل المخلفات والامتثال.',
      en: 'Environmental management commitment focused on waste reduction and compliance.',
    },
    imageSrc: '/images/certificates/certificates-015.png',
    badge: { ar: 'معايير ISO', en: 'ISO Standards' },
    year: '2026',
    icon: LeafIcon,
  },
  {
    id: 'iso45001',
    title: { ar: 'ISO 45001:2018', en: 'ISO 45001:2018' },
    category: 'iso',
    description: {
      ar: 'إطار متكامل للصحة والسلامة المهنية لحماية الفرق في مواقع العمل النشطة.',
      en: 'Occupational health and safety framework protecting teams across active worksites.',
    },
    imageSrc: '/images/certificates/certificates-016.png',
    badge: { ar: 'معايير ISO', en: 'ISO Standards' },
    year: '2026',
    icon: ShieldCheck,
  },
  {
    id: 'saso',
    title: { ar: 'مطابقة SASO', en: 'SASO Conformity' },
    category: 'iso',
    description: {
      ar: 'شهادة مطابقة للمواصفات السعودية لضمان الامتثال المحلي والجودة.',
      en: 'Saudi standards conformity certification for local regulatory and quality compliance.',
    },
    imageSrc: '/images/certificates/certificates-014.png',
    badge: { ar: 'معايير ISO', en: 'ISO Standards' },
    year: '2023',
    icon: FileBadge2,
  },
  {
    id: 'jotun',
    title: { ar: 'اعتماد مطبق — جوتن', en: 'Jotun Applicator Approval' },
    category: 'partners',
    description: {
      ar: 'اعتماد كمطبق لطلاءات الحماية والطلاءات المنتفخة وفق معايير المصنع.',
      en: 'Recognized applicator for protective and intumescent coatings per manufacturer standards.',
    },
    imageSrc: '/images/certificates/certificates-004.png',
    badge: { ar: 'الشركاء الاستراتيجيون', en: 'Strategic Partners' },
    year: '2015',
    icon: Droplets,
  },
  {
    id: 'hempel',
    title: { ar: 'مقاول مؤهل — هيمبل', en: 'Hempel Qualified Contractor' },
    category: 'partners',
    description: {
      ar: 'مقاول مؤهل لتوريد وتطبيق أنظمة دهانات هيمبل البحرية.',
      en: 'Qualified supply and apply contractor for Hempel marine paint systems.',
    },
    imageSrc: '/images/certificates/certificates-006.png',
    badge: { ar: 'الشركاء الاستراتيجيون', en: 'Strategic Partners' },
    year: '2021',
    icon: Anchor,
  },
  {
    id: 'fosroc',
    title: { ar: 'مطبق معتمد — فوسروك', en: 'Fosroc Approved Applicator' },
    category: 'partners',
    description: {
      ar: 'اعتماد لتطبيق أنظمة الأرضيات الصناعية وإصلاح الخرسانة ومواد السد.',
      en: 'Approved for industrial flooring, concrete repair, and sealant application systems.',
    },
    imageSrc: '/images/certificates/certificates-009.png',
    badge: { ar: 'الشركاء الاستراتيجيون', en: 'Strategic Partners' },
    year: '2016',
    icon: Factory,
  },
  {
    id: 'interchar',
    title: { ar: 'مطبق مؤهل — إنترشار', en: 'Interchar Fireproofing Applicator' },
    category: 'partners',
    description: {
      ar: 'اعتماد كمطبق مؤهل لأنظمة إنترشار للحماية من الحريق مع مسؤولية تنفيذ كاملة.',
      en: 'Qualified applicator for Interchar fireproofing systems with full execution responsibility.',
    },
    imageSrc: '/images/certificates/certificates-007.png',
    badge: { ar: 'الشركاء الاستراتيجيون', en: 'Strategic Partners' },
    year: '2014',
    icon: Flame,
  },
  {
    id: 'rsgt',
    title: { ar: 'خطاب خبرة — RSGT', en: 'RSGT Experience Letter' },
    category: 'projects',
    description: {
      ar: 'تنفيذ أعمال صيانة ودهانات لـ 6 رافعات ومعدات تشغيلية في محطة بوابة البحر الأحمر بجدة.',
      en: 'Executed maintenance and coating for 6 cranes and terminal equipment at RSGT, Jeddah.',
    },
    imageSrc: '/images/certificates/certificates-002.png',
    badge: { ar: 'خطابات المشاريع', en: 'Project Letters' },
    year: '2015',
    icon: Ship,
  },
  {
    id: 'petromin',
    title: { ar: 'خطاب شكر — بترومين', en: 'Petromin Appreciation Letter' },
    category: 'projects',
    description: {
      ar: 'تنفيذ ناجح لأعمال السفع وإعادة طبقات الحماية لخزانات بترومين.',
      en: 'Successful sandblasting and protective coating works for PetroMin storage tanks.',
    },
    imageSrc: '/images/certificates/certificates-003.png',
    badge: { ar: 'خطابات المشاريع', en: 'Project Letters' },
    year: '2017',
    icon: Building2,
  },
  {
    id: 'zamil',
    title: { ar: 'إفادة إنجاز — الزامل', en: 'Zamil Offshore Statement' },
    category: 'projects',
    description: {
      ar: 'تنفيذ أعمال سفع وغسيل ودهان لهياكل بحرية في حوض جدة.',
      en: 'Delivered ship hull blasting, washing, and painting works at Jeddah Shipyard.',
    },
    imageSrc: '/images/certificates/certificates-010.png',
    badge: { ar: 'خطابات المشاريع', en: 'Project Letters' },
    year: '2018',
    icon: Ship,
  },
  {
    id: 'gulf-jubail',
    title: {
      ar: 'إنجاز رافعات ليبهير — الجبيل',
      en: 'GSCCO Liebherr Cranes - Jubail',
    },
    category: 'projects',
    description: {
      ar: 'خطاب إنجاز لأعمال دهانات رافعات ليبهير في ميناء الجبيل التجاري (2024).',
      en: 'Completion letter for Liebherr crane coating package at Jubail Commercial Port (2024).',
    },
    imageSrc: '/images/certificates/certificates-012.png',
    badge: { ar: 'خطابات المشاريع', en: 'Project Letters' },
    year: '2024',
    icon: Anchor,
  },
];

const FILTERS: { id: FilterId; labelEn: string; labelAr: string }[] = [
  { id: 'all', labelEn: 'All', labelAr: 'الكل' },
  { id: 'iso', labelEn: 'ISO Standards', labelAr: 'معايير ISO' },
  { id: 'partners', labelEn: 'Strategic Partners', labelAr: 'الشركاء الاستراتيجيون' },
  { id: 'projects', labelEn: 'Project Letters', labelAr: 'خطابات المشاريع' },
];

export function CertificationsShowcase({ locale }: Props) {
  const isRTL = locale === 'ar';
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [active, setActive] = useState<CertificateItem | null>(null);
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  async function handleDownloadPdf(item: CertificateItem) {
    try {
      setIsDownloading(true);
      const { jsPDF } = await import('jspdf/dist/jspdf.es.min.js');
      const response = await fetch(item.imageSrc);
      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, 'PNG', 24, 24, pageWidth - 48, pageHeight - 48, undefined, 'FAST');
      pdf.save(`${item.id}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <section className="relative overflow-hidden border-t border-[#E8EEF2] bg-white py-20 lg:py-28">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CFE4EF] bg-[#F4F7F9] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#6CC0E1]">
            <Filter className="h-3.5 w-3.5" />
            {isRTL ? 'الاعتمادات والشهادات' : 'Certifications & Accreditations'}
          </span>
          <h2 className="text-balance text-3xl font-bold text-[#002D54] md:text-4xl lg:text-5xl">
            {isRTL ? 'اعتمادات موثقة تعكس خبرة تنفيذية حقيقية' : 'Verified credentials backed by real field delivery'}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#5A6A7A] md:text-lg">
            {isRTL
              ? 'نستعرض شهادات ISO واعتمادات الشركاء وخطابات المشاريع في بطاقة واحدة واضحة وسهلة التصفية.'
              : 'Browse ISO standards, strategic partner approvals, and project reference letters through a clean filterable gallery.'}
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((filter) => {
            const activeClass =
              activeFilter === filter.id
                ? 'border-[#6CC0E1]/60 bg-[#EAF6FB] text-[#002D54] shadow-[0_0_18px_rgba(108,192,225,0.25)]'
                : 'border-[#D9E5EC] bg-white text-[#5A6A7A] hover:border-[#6CC0E1]/50 hover:text-[#002D54] hover:shadow-[0_0_16px_rgba(108,192,225,0.18)]';
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${activeClass}`}
              >
                {isRTL ? filter.labelAr : filter.labelEn}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              onClick={() => {
                setActive(item);
                setOpen(true);
              }}
              className="group rounded-2xl border border-[#E2ECF2] bg-white p-4 text-start transition-all duration-300 hover:border-[#6CC0E1]/60 hover:shadow-[0_0_22px_rgba(108,192,225,0.22)]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#CFE4EF] bg-[#F4F7F9] px-2.5 py-1 text-xs font-semibold text-[#386D84]">
                  <item.icon className="h-3.5 w-3.5" />
                  {isRTL ? item.badge.ar : item.badge.en}
                </span>
                <span className="text-xs font-semibold text-[#5A6A7A]">{item.year}</span>
              </div>

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#E2ECF2] bg-[#F4F7F9]">
                <Image
                  src={item.imageSrc}
                  alt={isRTL ? item.title.ar : item.title.en}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold leading-tight text-[#002D54]">
                {isRTL ? item.title.ar : item.title.en}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5A6A7A]">
                {isRTL ? item.description.ar : item.description.en}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#6CC0E1]">
                <Eye className="h-4 w-4" />
                {isRTL ? 'عرض الوثيقة' : 'View Document'}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-10 rounded-2xl border border-[#E2ECF2] bg-[#F4F7F9] p-6"
        >
          <h3 className="text-xl font-bold text-[#002D54]">
            {isRTL ? 'بصمة تشغيلية في موانئ المملكة' : 'Operational footprint in major KSA ports'}
          </h3>
          <p className="mt-3 text-[#5A6A7A]">
            {isRTL
              ? 'نخدم بشكل مباشر مشاريع في ميناء جدة الإسلامي وميناء الجبيل التجاري مع سجل تنفيذ موثق في الرافعات والمعدات البحرية.'
              : 'Serving major KSA Ports: Jeddah Islamic Port & Jubail Commercial Port, with documented crane and marine unit delivery records.'}
          </p>
        </motion.div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setActive(null);
        }}
      >
        <DialogContent
          showCloseButton
          className="max-h-[92vh] max-w-[min(96vw,64rem)] gap-4 overflow-y-auto border-[#E2ECF2] bg-white p-4 text-[#002D54] sm:p-6"
        >
          {active ? (
            <>
              <DialogHeader className="text-start">
                <DialogTitle className="text-xl text-[#002D54]">
                  {isRTL ? active.title.ar : active.title.en}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-[#5A6A7A]">
                  {isRTL ? active.description.ar : active.description.en}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl border border-[#E2ECF2] bg-[#F4F7F9] p-2 sm:p-4">
                <Image
                  src={active.imageSrc}
                  alt={isRTL ? active.title.ar : active.title.en}
                  width={1800}
                  height={2400}
                  className="h-auto max-h-[75vh] w-full rounded-lg object-contain"
                  priority
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => void handleDownloadPdf(active)}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#6CC0E1]/50 bg-[#6CC0E1]/10 px-4 py-2 text-sm font-semibold text-[#0D4E6E] transition hover:bg-[#6CC0E1]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {isDownloading
                    ? isRTL
                      ? 'جارٍ التحضير...'
                      : 'Preparing...'
                    : isRTL
                      ? 'تنزيل PDF'
                      : 'Download PDF'}
                </button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M19.5 4.5c-6.5.5-11.5 3.5-14 9.5-.7 1.8-1 3.5-1 5.5 2-.2 3.8-.6 5.5-1.3 5.9-2.4 8.9-7.4 9.5-13.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M6.5 17.5c2.8-2.8 6-5 10.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
