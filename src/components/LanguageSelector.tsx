'use client';

import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export default function LanguageSelector({ className = '', variant = 'desktop' }: LanguageSelectorProps) {
  const { currentLanguage, toggleLanguage } = useLanguageSwitch();

  const languages = [
    { code: 'en' as const, label: 'en' },
    { code: 'es' as const, label: 'es' },
  ];

  if (variant === 'mobile') {
    return (
      <motion.button
        onClick={toggleLanguage}
        className={cn('-m-2 w-full rounded p-2 pt-4 text-left font-mono text-sm transition-colors duration-200 hover:bg-zinc-900/50', className)}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-gopher-blue mb-2">$ echo $LANG</div>
        <div className="flex items-center space-x-2 pl-2">
          {languages.map((lang, index) => (
            <span key={lang.code} className="flex items-center">
              {index > 0 && <span className="text-muted mx-2">|</span>}
              <span
                className={cn(
                  'transition-colors duration-200',
                  currentLanguage === lang.code ? 'text-gopher-blue font-medium' : 'text-muted'
                )}
              >
                {lang.label}
              </span>
            </span>
          ))}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className={cn('-mx-2 -my-1 flex items-center space-x-1 rounded px-2 py-1 font-mono text-sm transition-colors duration-200 hover:bg-zinc-900/50', className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={`Current language: ${currentLanguage}. Click to switch to ${currentLanguage === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className="text-muted">LANG:</span>
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          {index > 0 && <span className="text-muted mx-1">|</span>}
          <span
            className={cn(
              'transition-colors duration-200',
              currentLanguage === lang.code ? 'text-gopher-blue font-medium' : 'text-muted'
            )}
          >
            {lang.label}
          </span>
        </span>
      ))}
    </motion.button>
  );
}
