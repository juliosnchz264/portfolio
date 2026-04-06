'use client';

import TerminalPrompt from '@/components/ui/TerminalPrompt';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

interface TerminalFooterProps {
  path?: string;
  className?: string;
}

export default function TerminalFooter({ path = '~', className = '' }: TerminalFooterProps) {
  return (
    <motion.div
      className={cn('terminal-footer', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <TerminalPrompt showCursor={true} cursorState="blinking" path={path} />
    </motion.div>
  );
}
