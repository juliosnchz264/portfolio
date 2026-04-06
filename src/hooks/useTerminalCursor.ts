'use client';

import { useMemo } from 'react';

import type { TargetAndTransition, Transition } from 'framer-motion';

interface TerminalCursorConfig {
  /**
   * For continuous blinking cursor (like in footer or final prompt)
   */
  blinking: TargetAndTransition;

  /**
   * For cursor during typing (controlled with showCursor state)
   */
  typing: {
    transition: Transition;
  };
}

/**
 * Hook to unify terminal cursor animations
 * Based on the steady rhythm of TerminalFooter (1.06s)
 */
export function useTerminalCursor(): TerminalCursorConfig {
  return useMemo(
    () => ({
      blinking: {
        opacity: [1, 0, 1],
        transition: {
          duration: 1.06,
          repeat: Infinity,
          ease: 'linear',
        },
      },
      typing: {
        transition: {
          duration: 0.15, // Slightly slower than 0.1 for consistency
        },
      },
    }),
    []
  );
}
