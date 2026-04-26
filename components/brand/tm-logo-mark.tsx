import Image from 'next/image';
import { cn } from '@/lib/utils';

/** `light`: شعار أبيض للخلفيات الداكنة. `dark`: أزرق داكن للخلفيات الفاتحة. */
export function TmLogoMark({
  variant,
  className,
  priority,
}: {
  variant: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}) {
  const src = variant === 'light' ? '/images/logo-tm-light.svg' : '/images/logo-tm-dark.svg';

  return (
    <Image
      src={src}
      alt="TM Services"
      width={303}
      height={92}
      priority={priority}
      className={cn('h-8 w-auto max-h-11 shrink-0 object-contain object-start', className)}
    />
  );
}
