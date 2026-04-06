'use client';

import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'mb-8 text-center text-4xl font-light text-white md:text-5xl',
        className
      )}
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="true"
    >
      {children}
    </h2>
  );
}
