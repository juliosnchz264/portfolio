/**
 * Standard animation delay timings used throughout the application
 * All values in milliseconds
 */
export const ANIMATION_DELAYS = {
  /** Initial delay before starting animation sequence (300ms) */
  INITIAL: 300,
  /** Short delay between animation steps (300ms) */
  SHORT: 300,
  /** Medium delay for standard transitions (400ms) */
  MEDIUM: 400,
  /** Long delay for emphasis or waiting (700ms) */
  LONG: 700,
  /** Delay before revealing content after typing (400ms) */
  CONTENT_REVEAL: 400,
  /** Delay for displaying command output (2000ms) */
  CONTENT_DISPLAY: 2000,
  /** Stagger delay for sequential item animations (150ms between items) */
  STAGGER_DELAY: 150,
} as const;

/**
 * Typing animation configuration
 * Values in milliseconds
 */
export const TYPING_CONFIG = {
  /** Base speed per character (30ms) */
  DEFAULT_SPEED: 30,
  /** Random variation range to simulate natural typing (0-15ms) */
  SPEED_VARIATION: 15,
  /** Cursor blinking interval (530ms per blink cycle) */
  CURSOR_BLINK_INTERVAL: 530,
} as const;

/**
 * Helper function to create a Promise that resolves after a delay
 * @param ms - Milliseconds to wait
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
