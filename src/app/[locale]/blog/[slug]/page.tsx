import BlogLayout from '@/components/blog/BlogLayout';
import { MDXComponents } from '@/components/blog/MDXComponents';
import TableOfContents from '@/components/blog/TableOfContents';
import { MDXRemote, mdxOptions } from '@/lib/blog/mdx';
import { getAllPosts, getPostBySlug } from '@/lib/blog/posts';
import { formatDate, isValidLocale } from '@/lib/blog/utils';
import { formatReadingTime } from '@/lib/blog/utils';

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

interface BlogPostProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { locale, slug } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Get post data
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const readingTimeText = formatReadingTime(metadata.readingTime[locale], locale);
  
  // Get translations
  const t = await getTranslations({ locale });

  return (
    <BlogLayout locale={locale}>
      <article className="blog-post mx-auto max-w-6xl px-6 py-12">
        {/* Mobile-first Layout */}
        <div className="block lg:hidden">
          {/* Post Header - Mobile */}
          <header className="post-header mb-8">
            {/* Breadcrumb */}
            <nav className="post-breadcrumb mb-6" aria-label="Breadcrumb">
              <a
                href={`/${locale}/blog`}
                className="text-text-muted hover:text-gopher-blue font-mono text-sm transition-colors"
              >
                {t('sections.blog.post.back_to_blog')}
              </a>
            </nav>

            {/* Post Title */}
            <h1 className="post-headline mb-6 text-3xl leading-tight font-light text-white md:text-4xl">
              {metadata.title[locale]}
            </h1>

            {/* Post Metadata */}
            <div className="post-metadata text-text-muted flex flex-wrap items-center gap-4 font-mono text-sm">
              <time dateTime={metadata.publishedAt}>{formatDate(metadata.publishedAt, locale)}</time>

              <span className="metadata-separator">•</span>

              <span>{readingTimeText}</span>

              {metadata.updatedAt && metadata.updatedAt !== metadata.publishedAt && (
                <>
                  <span className="metadata-separator">•</span>
                  <span>
                    {t('sections.blog.post.updated')} {formatDate(metadata.updatedAt, locale)}
                  </span>
                </>
              )}

              {/* Tags */}
              {metadata.tags.length > 0 && (
                <>
                  <span className="metadata-separator">•</span>
                  <div className="post-tag-list flex gap-2">
                    {metadata.tags.map(tag => (
                      <span key={tag} className="post-tag text-gopher-blue-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Table of Contents - First on Mobile */}
          <aside className="mb-8">
            <TableOfContents content={content} locale={locale} />
          </aside>

          {/* Post Content - Mobile */}
          <div className="post-content prose prose-lg max-w-none">
            <Suspense
              fallback={
                <div className="animate-pulse">
                  <div className="bg-bg-secondary mb-4 h-4 w-3/4 rounded"></div>
                  <div className="bg-bg-secondary mb-4 h-4 w-1/2 rounded"></div>
                  <div className="bg-bg-secondary mb-4 h-4 w-5/6 rounded"></div>
                </div>
              }
            >
              <MDXRemote source={content} options={mdxOptions} components={MDXComponents} />
            </Suspense>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Header */}
            <header className="post-header mb-12">
              {/* Breadcrumb */}
              <nav className="post-breadcrumb mb-6" aria-label="Breadcrumb">
                <a
                  href={`/${locale}/blog`}
                  className="text-text-muted hover:text-gopher-blue font-mono text-sm transition-colors"
                >
                  {t('sections.blog.post.back_to_blog')}
                </a>
              </nav>

              {/* Post Title */}
              <h1 className="post-headline mb-6 text-3xl leading-tight font-light text-white md:text-4xl">
                {metadata.title[locale]}
              </h1>

              {/* Post Metadata */}
              <div className="post-metadata text-text-muted flex flex-wrap items-center gap-4 font-mono text-sm">
                <time dateTime={metadata.publishedAt}>{formatDate(metadata.publishedAt, locale)}</time>

                <span className="metadata-separator">•</span>

                <span>{readingTimeText}</span>

                {metadata.updatedAt && metadata.updatedAt !== metadata.publishedAt && (
                  <>
                    <span className="metadata-separator">•</span>
                    <span>
                      {t('sections.blog.post.updated')} {formatDate(metadata.updatedAt, locale)}
                    </span>
                  </>
                )}

                {/* Tags */}
                {metadata.tags.length > 0 && (
                  <>
                    <span className="metadata-separator">•</span>
                    <div className="post-tag-list flex gap-2">
                      {metadata.tags.map(tag => (
                        <span key={tag} className="post-tag text-gopher-blue-muted">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Post Content */}
            <div className="post-content prose prose-lg max-w-none">
              <Suspense
                fallback={
                  <div className="animate-pulse">
                    <div className="bg-bg-secondary mb-4 h-4 w-3/4 rounded"></div>
                    <div className="bg-bg-secondary mb-4 h-4 w-1/2 rounded"></div>
                    <div className="bg-bg-secondary mb-4 h-4 w-5/6 rounded"></div>
                  </div>
                }
              >
                <MDXRemote source={content} options={mdxOptions} components={MDXComponents} />
              </Suspense>
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="lg:col-span-2">
            <TableOfContents content={content} locale={locale} />
          </aside>
        </div>

        {/* Post Footer */}
        <footer className="post-footer border-border-subtle mt-16 border-t pt-8">
          <div className="text-text-muted text-center font-mono text-sm">
            <p>
              {t('sections.blog.post.footer.enjoyed')}
              <span className="text-gopher-blue">
                {t('sections.blog.post.footer.share_knowledge')}
              </span>
            </p>
          </div>
        </footer>
      </article>
    </BlogLayout>
  );
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  const params: { locale: string; slug: string }[] = [];

  posts.forEach(post => {
    // Generate params for both locales
    params.push({ locale: 'en', slug: post.slug.en }, { locale: 'es', slug: post.slug.es });
  });

  return params;
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const { metadata } = post;

  return {
    title: `${metadata.title[locale]} | juliosn Blog`,
    description: metadata.description[locale],
    openGraph: {
      title: metadata.title[locale],
      description: metadata.description[locale],
      type: 'article',
      publishedTime: metadata.publishedAt,
      modifiedTime: metadata.updatedAt,
      authors: ['Julio Sánchez Aniceto'],
      tags: metadata.tags,
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title[locale],
      description: metadata.description[locale],
    },
    alternates: {
      languages: {
        en: `/en/blog/${metadata.slug.en}`,
        es: `/es/blog/${metadata.slug.es}`,
      },
    },
  };
}
