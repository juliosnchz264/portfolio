import { PostMetadata } from './posts';

export function generatePostUrl(metadata: PostMetadata, locale: 'en' | 'es'): string {
  return `/${locale}/blog/${metadata.slug[locale]}`;
}

export function formatReadingTime(minutes: number, locale: 'en' | 'es'): string {
  const roundedMinutes = Math.max(1, Math.round(minutes));

  if (locale === 'es') {
    return roundedMinutes === 1 ? '1 minuto' : `${roundedMinutes} minutos`;
  }

  return roundedMinutes === 1 ? '1 min' : `${roundedMinutes} mins`;
}

export function formatDate(dateString: string, locale: 'en' | 'es'): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (locale === 'es') {
    return date.toLocaleDateString('es-ES', options);
  }

  return date.toLocaleDateString('en-US', options);
}

export function formatDateShort(dateString: string, locale: 'en' | 'es'): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
  };
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', options);
}

export function getPostPreview(content: string, maxLength: number = 150): string {
  // Remove MDX/markdown syntax and get plain text
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to plain text
    .replace(/[#*`_~]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) + '...' : truncated + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD') // Decompose characters: á → a + ́
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^\w\s-]/g, '') // Remove special characters (¿, ¡, etc)
    .replace(/\s+/g, '-') // Spaces → hyphens
    .replace(/-+/g, '-') // Multiple hyphens → single hyphen
    .replace(/^-+|-+$/g, ''); // Clean edges
}

export function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export function filterPostsByTag(posts: PostMetadata[], tag: string): PostMetadata[] {
  return posts.filter(post => post.tags.includes(tag));
}

export function searchPosts(posts: PostMetadata[], query: string, locale: 'en' | 'es'): PostMetadata[] {
  if (!query.trim()) return posts;

  const searchTerm = query.toLowerCase();

  return posts.filter(post => {
    const title = post.title[locale]?.toLowerCase() || '';
    const description = post.description[locale]?.toLowerCase() || '';
    const tags = post.tags.join(' ').toLowerCase();

    return title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
  });
}
