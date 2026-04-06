'use client';

import { useEffect, useRef, useState } from 'react';

interface UseAOSVisibilityOptions {
  threshold?: number;
  offset?: number;
}

export function useAOSVisibility(options: UseAOSVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { threshold = 0.3, offset = 100 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Small delay for AOS animation to start first
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

  return {
    ref: elementRef,
    isVisible,
    shouldRender,
  };
}
