/**
 * Scrolls to a section identified by a CSS selector (e.g., '#about')
 * @param href - CSS selector for the target element
 * @param offset - Pixels to offset from the top (default: 80)
 */
export function scrollToSection(href: string, offset: number = 80): void {
  const element = document.querySelector(href);

  if (!element) {
    console.warn(`Navigation target not found: ${href}`);
    return;
  }

  try {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(`Error scrolling to ${href}:`, error);
  }
}
