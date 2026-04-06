'use client';

import { FOOTER_ASCII_ART } from '@/constants/ascii';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn('relative z-10 bg-primary mt-4 border-t border-zinc-800 py-8', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          {/* Built by ASCII Art */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="text-muted mb-2 font-mono text-xs">Built by:</div>
            <div className="ascii-container flex justify-center">
              <pre className="ascii-art text-gopher-blue origin-center scale-[0.6] transform-gpu font-mono leading-tight whitespace-pre transition-transform duration-300 ease-out md:scale-[0.75] lg:scale-[0.9] xl:scale-100">
                {FOOTER_ASCII_ART}
              </pre>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-muted text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            © {currentYear} Julio Sánchez Aniceto
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
