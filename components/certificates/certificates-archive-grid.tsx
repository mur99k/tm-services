'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type CertificateArchiveItem = {
  src: string;
  title: string;
  description: string;
};

type Props = {
  items: CertificateArchiveItem[];
  viewFullLabel: string;
};

export function CertificatesArchiveGrid({ items, viewFullLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CertificateArchiveItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => {
              setActive(item);
              setOpen(true);
            }}
            className="group flex flex-col rounded-2xl border border-solid border-transparent bg-white p-4 text-start shadow-sm transition hover:shadow-md [border-image:linear-gradient(90deg,rgba(109,192,226,0.35)_95%,rgb(255_255_255)_100%)_1]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F4F7F9] ring-1 ring-black/5">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <h3 className="mt-4 line-clamp-2 text-start text-base font-bold leading-snug text-[#002D54]">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-start text-sm leading-relaxed text-[#5A6A7A]">
              {item.description}
            </p>
            <span className="mt-3 text-start text-xs font-semibold text-[#6CC0E1]">{viewFullLabel}</span>
          </button>
        ))}
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
          className="max-h-[92vh] max-w-[min(96vw,56rem)] gap-4 overflow-y-auto border-[#E2E8F0] p-4 sm:p-6"
        >
          {active ? (
            <>
              <DialogHeader className="text-start">
                <DialogTitle className="text-balance text-xl text-[#002D54]">{active.title}</DialogTitle>
                <DialogDescription className="text-pretty text-base leading-relaxed text-[#5A6A7A]">
                  {active.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center rounded-xl bg-[#F4F7F9]/80 p-2 sm:p-4">
                <Image
                  src={active.src}
                  alt={active.title}
                  width={1200}
                  height={1600}
                  className="h-auto max-h-[min(78vh,1200px)] w-full max-w-full object-contain"
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
