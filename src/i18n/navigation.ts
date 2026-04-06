import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Light wrappers around Next.js navigation APIs that consider routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
