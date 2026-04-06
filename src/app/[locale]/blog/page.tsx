import BlogControls from '@/components/blog/BlogControls';
import BlogLayout from '@/components/blog/BlogLayout';
import { getPublishedPosts, getAllTags } from '@/lib/blog/posts';
import { isValidLocale } from '@/lib/blog/utils';



import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogIndex({ params }: BlogIndexProps) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    redirect('/en/blog');
  }

  // Get translations
  const t = await getTranslations({ locale });

  // Get published posts and tags
  const posts = await getPublishedPosts();
  const allTags = await getAllTags();

  return (
    <BlogLayout locale={locale}>
      <div className="blog-index mx-auto max-w-4xl px-6 py-12">
        {/* Blog Header */}
        <header className="blog-header mb-12">
          <h1 className="blog-title mb-4 font-mono text-4xl font-light text-white md:text-5xl">
            <span className="text-gopher-blue">$</span> {t('sections.blog.page.title')}
          </h1>
          <p className="blog-description text-text-secondary max-w-2xl text-lg leading-relaxed">
            {t('sections.blog.page.description')}
          </p>
        </header>

        {/* Blog Controls - Client Component */}
        <BlogControls posts={posts} allTags={allTags} locale={locale} />
      </div>
    </BlogLayout>
  );
}

// Generate static params for locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

// Generate metadata for blog index
export async function generateMetadata({ params }: BlogIndexProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = t('sections.blog.page.title');
  const description = t('sections.blog.page.description');

  return {
    title: `${title} | juliosn`,
    description,
    keywords: ['web development', 'programming', 'php', 'javascript', 'laravel', 'cybersecurity', 'blog'],
    authors: [{ name: 'Julio Sánchez Aniceto', url: 'https://juliosn.dev' }],
    creator: 'Julio Sánchez Aniceto',
    openGraph: {
      type: 'website',
      siteName: 'juliosn Blog',
      url: `https://juliosn.dev/${locale}/blog`,
      title,
      description,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@juliosnchz264',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: '/en/blog',
        es: '/es/blog',
      },
    },
  };
}