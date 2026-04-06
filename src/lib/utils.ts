import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS classes using clsx and tailwind-merge.
 *
 * This utility function:
 * - Conditionally joins class names with clsx
 * - Merges conflicting Tailwind classes with tailwind-merge
 * - Provides optimal class deduplication for Tailwind CSS
 *
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
