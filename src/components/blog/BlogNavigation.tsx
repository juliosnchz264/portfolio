'use client';

import LanguageSelector from '@/components/LanguageSelector';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogNavigationProps {
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogNavigation({ locale, showBackLink = true }: BlogNavigationProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto grid grid-cols-3 w-11/12 xl:w-full max-w-5xl items-center py-4">
        {/* Left side - Back Link */}
        {showBackLink && (
          <div className="justify-self-start">
            <Link
              href={`/${locale}`}
              className="flex items-center text-sm text-gray-400 transition-colors hover:text-gopher-blue"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>
        )}

        {/* Center - Blog Title */}
        <div className="justify-self-center">
          <Link
            href={`/${locale}/blog`}
            className="font-mono text-lg font-light text-white transition-colors hover:text-gopher-blue"
          >
            juliosn/blog
          </Link>
        </div>

        {/* Right side - Language Switcher */}
        <div className="justify-self-end">
          <LanguageSelector className="text-sm" />
        </div>
      </div>
    </nav>
  );
}
