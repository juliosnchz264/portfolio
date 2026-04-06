'use client';

import { useRouter } from '@/i18n/navigation';

import { useCallback } from 'react';

import { usePathname as useNextPathname, useParams } from 'next/navigation';

type Language = 'en' | 'es';

export function useLanguageSwitch() {
  const router = useRouter();
  const nextPathname = useNextPathname(); // Next.js pathname (includes locale)
  const params = useParams();

  const currentLanguage = (params?.locale as Language) || 'en';

  const switchLanguage = useCallback(
    (newLanguage: Language) => {
      // Remove current locale from pathname if it exists
      let cleanPathname = nextPathname || '/';
      if (cleanPathname.startsWith(`/${currentLanguage}`)) {
        cleanPathname = cleanPathname.slice(`/${currentLanguage}`.length) || '/';
      }

      // Navigate to the clean pathname with new locale
      router.push(cleanPathname, { locale: newLanguage });
    },
    [router, nextPathname, currentLanguage]
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    switchLanguage(newLanguage);
  }, [currentLanguage, switchLanguage]);

  return {
    currentLanguage,
    switchLanguage,
    toggleLanguage,
  };
}
