import { SKIP_ANIMATIONS_EVENT } from '@/hooks/useAOSVisibility';

/**
 * Scrolls to a section identified by a CSS selector (e.g., '#about').
 * Forces all sections to render their full content first so layout is stable
 * before computing the scroll target — prevents drift caused by lazy renders.
 *
 * @param href - CSS selector for the target element
 * @param offset - Pixels to offset from the top (default: 80)
 */
export function scrollToSection(href: string, offset: number = 80): void {
  const element = document.querySelector(href);

  if (!element) {
    console.warn(`Navigation target not found: ${href}`);
    return;
  }

  window.dispatchEvent(new Event(SKIP_ANIMATIONS_EVENT));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      try {
        const top =
          element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      } catch (error) {
        console.error(`Error scrolling to ${href}:`, error);
      }
    });
  });
}
