export const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  // TODO: Re-enable when blog is ready
  // { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
] as const;

export type NavItemKey = typeof NAV_ITEMS[number]['key'];
