'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TerminalSpinnerProps {
  className?: string;
}

const spinnerChars = ['-', '\\', '|', '/'];

export default function TerminalSpinner({ className = '' }: TerminalSpinnerProps) {
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChar(prev => (prev + 1) % spinnerChars.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <span className={cn('text-terminal-green font-mono', className)}>{spinnerChars[currentChar]}</span>;
}
