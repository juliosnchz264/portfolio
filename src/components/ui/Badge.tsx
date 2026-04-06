'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant: 'gopher' | 'tech' | 'highlight';
  className?: string;
}

const variantStyles: Record<BadgeProps['variant'], string> = {
  gopher: 'bg-gopher-blue/15 text-gopher-blue',
  tech: 'border border-gray-700 bg-gray-800 text-gray-300',
  highlight: 'border-l-4 border-gopher-blue bg-gray-800/50 text-gray-300',
};

export default function Badge({ children, variant, className }: BadgeProps) {
  const baseStyles = 'rounded px-3 py-1 text-sm font-medium';

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
}
