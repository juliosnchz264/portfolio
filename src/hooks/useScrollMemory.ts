'use client';

import { useEffect } from 'react';

import { SKIP_ANIMATIONS_EVENT } from './useAOSVisibility';

const STORAGE_KEY = 'portfolio:scroll-y';

export function useScrollMemory() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = sessionStorage.getItem(STORAGE_KEY);
    const savedY = saved !== null ? parseInt(saved, 10) : NaN;

    if (!Number.isNaN(savedY) && savedY > 0) {
      window.dispatchEvent(new Event(SKIP_ANIMATIONS_EVENT));

      const restore = () => window.scrollTo({ top: savedY, behavior: 'auto' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restore();
          window.setTimeout(restore, 120);
          window.setTimeout(restore, 400);
        });
      });
    }

    let frame = 0;
    const save = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.pageYOffset));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        save();
      });
    };
    const onUnload = () => save();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onUnload);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
