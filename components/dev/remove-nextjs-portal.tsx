'use client';

import { useEffect } from 'react';

export function RemoveNextJsPortal() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const removePortals = () => {
      document.querySelectorAll('nextjs-portal').forEach((node) => node.remove());
    };

    removePortals();

    const observer = new MutationObserver(() => {
      removePortals();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
