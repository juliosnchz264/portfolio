'use client';

import { MobileMenuProvider, useMobileMenu } from '@/contexts/MobileMenuContext';
import { cn } from '@/lib/utils';

import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Footer from './Footer';
import Header from './Header';
import MobileMenuOverlay from './MobileMenuOverlay';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

function LayoutContent({ children, className = '' }: LayoutProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
      easing: 'ease-out',
    });
  }, []);

  return (
    <div className={cn('min-h-screen text-white', className)}>
      <Navigation />

      <main className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </main>

      {/* Mobile menu overlay - completely outside the sticky nav */}
      <MobileMenuOverlay isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <MobileMenuProvider>
      <LayoutContent className={className}>{children}</LayoutContent>
    </MobileMenuProvider>
  );
}
