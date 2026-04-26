import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TM Services | خدمات التنظيف والصيانة',
  description: 'شركة متخصصة في خدمات التنظيف والصيانة - Professional Cleaning & Maintenance Services in Saudi Arabia',
  icons: {
    icon: '/images/logo-tm-dark.svg',
    apple: '/images/logo-tm-dark.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
