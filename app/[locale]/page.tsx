import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { TrustSection } from '@/components/home/trust-section';
import { ClientsSection } from '@/components/home/clients-section';
import { CertificatesSection } from '@/components/home/certificates-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <ClientsSection />
      <CertificatesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
