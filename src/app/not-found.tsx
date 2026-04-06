'use client';

import { ERROR_404_ASCII, NOT_FOUND_ASCII } from '@/constants/ascii';
import { fontClassName } from '@/lib/fonts';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './globals.css';

// Local translations for standalone 404 page
const translations = {
  en: {
    description: "The page you're looking for doesn't exist or has been moved.",
    go_home: "Go back home",
    go_blog: "Browse blog posts"
  },
  es: {
    description: "La página que buscas no existe o ha sido movida.",
    go_home: "Volver al inicio",
    go_blog: "Ver entradas del blog"
  }
} as const;

type Locale = keyof typeof translations;

// Detect locale from URL with browser language fallback
function detectLocale(pathname: string): Locale {
  // First try URL detection
  if (pathname.startsWith('/es/') || pathname.startsWith('/es')) {
    return 'es';
  }
  if (pathname.startsWith('/en/') || pathname.startsWith('/en')) {
    return 'en';
  }
  
  // Fallback to browser preferred languages
  if (typeof navigator !== 'undefined' && navigator.languages) {
    const preferredLanguage = navigator.languages[0];
    if (preferredLanguage?.startsWith('es')) {
      return 'es';
    }
  }
  
  // Default fallback
  return 'en';
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const t = translations[locale];

  return (
    <html lang="en">
      <head />
      <body className={`bg-black text-white ${fontClassName} antialiased`}>
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="text-center w-11/12 mx-auto md:w-full px-6 max-w-4xl">
              {/* Terminal Window using existing component styles */}
              <div className="terminal-window max-w-3xl mx-auto">
                {/* Terminal Title Bar */}
                <div className="terminal-header">
                  <div className="traffic-lights">
                    <div className="traffic-light close"></div>
                    <div className="traffic-light minimize"></div>
                    <div className="traffic-light maximize"></div>
                  </div>
                  <div className="window-title">user@portfolio: ~/error</div>
                </div>

                {/* Terminal Content */}
                <div className="terminal-content text-left">
                  {/* Error Message */}
                  <div className="mb-6 text-red-400">
                    <span className="text-gray-400">bash:</span> {pathname || '/path'}: No such file or
                    directory
                  </div>

                  {/* 404 ASCII Art */}
                  <div className="text-center">
                    <pre className="text-gopher-blue font-mono leading-tight whitespace-pre select-none transform-gpu transition-transform duration-300 ease-out md:scale-[0.75] lg:scale-[0.9] xl:scale-100">
                      {ERROR_404_ASCII}
                    </pre>
                  </div>

                  {/* NOT FOUND ASCII Art */}
                  <div className="mb-8 flex justify-center">
                    <pre className="text-white font-mono leading-tight whitespace-pre select-none scale-[0.3] transform-gpu transition-transform duration-300 ease-out sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.7]">
                      {NOT_FOUND_ASCII}
                    </pre>
                  </div>

                  {/* Description */}
                  <div className="mb-6 text-gray-300 text-center">
                    <span className="text-gray-500"># </span>
                    {t.description}
                  </div>

                  {/* Available Options */}
                  <div className="mb-4 text-gray-400">
                    <span className="text-gray-500"># Available options:</span>
                  </div>

                  {/* Command Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={`/${locale}`}
                      className="border border-gopher-blue text-gopher-blue hover:bg-gopher-blue hover:text-black px-6 py-3 font-medium transition-all duration-200 hover:scale-105 transform text-center"
                    >
                      {t.go_home}
                    </Link>

                    <Link
                      href={`/${locale}/blog`}
                      className="border border-gopher-blue text-gopher-blue hover:bg-gopher-blue hover:text-black px-6 py-3 font-medium transition-all duration-200 hover:scale-105 transform text-center"
                    >
                      {t.go_blog}
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </body>
    </html>
  );
}
