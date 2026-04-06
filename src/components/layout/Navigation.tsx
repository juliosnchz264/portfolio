'use client';

import LanguageSelector from '@/components/LanguageSelector';
import { NAV_ITEMS } from '@/constants/navigation';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { scrollToSection } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const t = useTranslations('navigation');
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();
  const activeSection = useActiveSection(NAV_ITEMS.map(item => item.href));

  return (
    <motion.nav
      className={cn('sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-sm', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 w-full items-center">
          {/* Desktop Navigation */}
          <div className="hidden w-full md:flex">
            {/* Spacer for left side */}
            <div className="flex-1"></div>

            {/* Center navigation */}
            <div className="flex gap-6 lg:gap-8" role="menubar" aria-label="Portfolio sections">
              {NAV_ITEMS.map(item => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href, 80)}
                  className={cn(
                    'nav-link px-2 py-1 text-sm font-medium transition-colors duration-200',
                    activeSection === item.href
                      ? 'text-gopher-blue font-semibold'
                      : 'text-secondary hover:text-gopher-blue'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  aria-label={`Navigate to ${t(item.key)} section`}
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>

            {/* Right side - Language selector */}
            <div className="flex flex-1 justify-end">
              <LanguageSelector variant="desktop" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex w-full justify-center md:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-secondary hover:text-gopher-blue transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="font-mono text-sm">{isMobileMenuOpen ? '[close]' : '[menu]'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
