/** Absolute base URL of the site, no trailing slash. */
export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') ??
  'https://portfolio-seven-mocha-0pceicsr0w.vercel.app';

/** Hostname only, e.g. "tu-dominio.com" — used for display text in OG images. */
export const siteHostname = new URL(baseUrl).hostname;
