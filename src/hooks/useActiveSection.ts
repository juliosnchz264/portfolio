'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to track which section is currently active based on scroll position.
 * Active section = the last one whose top has crossed the viewport top + offset line.
 *
 * @param sectionIds - Array of section element IDs to observe (e.g., ['#about', '#skills'])
 * @param offset - Pixels from viewport top to use as the activation line (default: 120)
 * @returns The ID of the currently active section
 */
export function useActiveSection(sectionIds: string[], offset: number = 120): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      const line = window.pageYOffset + offset;
      let current = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.pageYOffset;
        if (top <= line) current = id;
      }

      setActiveSection(prev => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        compute();
      });
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
