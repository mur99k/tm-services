import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * يخفي مؤشر التطوير الافتراضي. أيقونة أدوات Next تُعطّل أيضاً عبر
   * `scripts/ensure-next-devtools-config.mjs` قبل `next dev` (ملف `.next/cache/next-devtools-config.json`).
   * عنصر `<nextjs-portal>` من الحزمة نفسها وليس من المشروع — لا يُحقن في `next start` (الإنتاج).
   */
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
