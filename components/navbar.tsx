'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TmLogoMark } from '@/components/brand/tm-logo-mark';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: 'ar' | 'en') => {
    router.replace(pathname, { locale: newLocale });
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/clients', label: t('clients') },
    { href: '/certificates', label: t('certificates') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <TmLogoMark
              variant={isScrolled ? 'dark' : 'light'}
              priority
              className="h-8 w-[min(200px,52vw)] sm:h-10 sm:max-w-[220px]"
            />
            <div className="hidden min-w-0 sm:block">
              <p
                className={cn(
                  'text-xs transition-colors',
                  isScrolled ? 'text-[#5A6A7A]' : 'text-white/80'
                )}
              >
                {locale === 'ar' ? 'التنظيف والصيانة' : 'Cleaning & Maintenance'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#6CC0E1] relative py-2',
                  pathname === link.href
                    ? 'text-[#6CC0E1]'
                    : isScrolled
                    ? 'text-[#1A1A1A]'
                    : 'text-white',
                  pathname === link.href && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#6CC0E1]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isScrolled
                    ? 'text-[#002D54] hover:bg-[#F4F7F9]'
                    : 'text-white hover:bg-white/10'
                )}
              >
                <Globe className="w-4 h-4" />
                <span>{locale === 'ar' ? 'العربية' : 'English'}</span>
                <ChevronDown className={cn(
                  'w-4 h-4 transition-transform',
                  langDropdownOpen && 'rotate-180'
                )} />
              </button>
              {langDropdownOpen && (
                <div className="absolute top-full mt-2 end-0 bg-white rounded-lg shadow-xl border border-[#E2E8F0] overflow-hidden min-w-[140px]">
                  <button
                    onClick={() => switchLocale('ar')}
                    className={cn(
                      'w-full px-4 py-3 text-start text-sm hover:bg-[#F4F7F9] transition-colors flex items-center gap-2',
                      locale === 'ar' ? 'text-[#6CC0E1] bg-[#F4F7F9]' : 'text-[#1A1A1A]'
                    )}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      'w-full px-4 py-3 text-start text-sm hover:bg-[#F4F7F9] transition-colors flex items-center gap-2',
                      locale === 'en' ? 'text-[#6CC0E1] bg-[#F4F7F9]' : 'text-[#1A1A1A]'
                    )}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#6CC0E1] text-[#001A33] font-semibold text-sm rounded-lg hover:bg-[#5AB0D1] transition-colors"
            >
              {locale === 'ar' ? 'احصل على عرض' : 'Get Quote'}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-[#002D54]' : 'text-white'
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[#6CC0E1] text-[#001A33]'
                    : 'text-[#1A1A1A] hover:bg-[#F4F7F9]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 px-4 py-3 bg-[#002D54] text-white text-center font-semibold rounded-lg"
            >
              {locale === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
