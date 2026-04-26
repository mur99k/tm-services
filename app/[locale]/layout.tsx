import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Cairo, Geist } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RemoveNextJsPortal } from '@/components/dev/remove-nextjs-portal';
import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TM Services | خدمات التنظيف والصيانة',
  description: 'شركة متخصصة في خدمات التنظيف والصيانة - Professional Cleaning & Maintenance Services in Saudi Arabia',
  keywords: ['cleaning', 'maintenance', 'Saudi Arabia', 'تنظيف', 'صيانة', 'السعودية', 'جدة'],
  icons: {
    icon: '/images/logo-tm-dark.svg',
    apple: '/images/logo-tm-dark.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="bg-background">
      <body className={`${cairo.variable} ${geist.variable} font-sans antialiased`}>
        <RemoveNextJsPortal />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
