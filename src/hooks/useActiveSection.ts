'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to track which section is currently visible in the viewport
 * Uses IntersectionObserver for efficient visibility tracking
 *
 * @param sectionIds - Array of section element IDs to observe (e.g., ['#about', '#skills'])
 * @returns The ID of the currently active (visible) section
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers = sectionIds
      .map(id => {
        const element = document.querySelector(id);
        if (!element) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.5 }
        );

        observer.observe(element);
        return observer;
      })
      .filter((obs): obs is IntersectionObserver => obs !== null);

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
