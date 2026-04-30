'use client';

import { useEffect, useRef, useState } from 'react';

interface UseAOSVisibilityOptions {
  threshold?: number;
  offset?: number;
}

export const SKIP_ANIMATIONS_EVENT = 'skip-section-animations';

export function useAOSVisibility(options: UseAOSVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [eagerReveal, setEagerReveal] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { threshold = 0.3, offset = 100 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShouldRender(true), 100);
        }
      },
      {
        threshold,
        rootMargin: `0px 0px -${offset}px 0px`,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, offset]);

  useEffect(() => {
    const handler = () => {
      setIsVisible(true);
      setShouldRender(true);
      setEagerReveal(true);
    };
    window.addEventListener(SKIP_ANIMATIONS_EVENT, handler);
    return () => window.removeEventListener(SKIP_ANIMATIONS_EVENT, handler);
  }, []);

  return {
    ref: elementRef,
    isVisible,
    shouldRender,
    eagerReveal,
  };
}
