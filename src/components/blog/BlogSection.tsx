'use client';

import TerminalWindow from '@/components/TerminalWindow';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { formatDateShort, formatReadingTime } from '@/lib/blog/utils';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface RecentPost {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
}

interface BlogSectionProps {
  recentPosts?: RecentPost[];
  locale: 'en' | 'es';
}

export default function BlogSection({ recentPosts = [], locale }: BlogSectionProps) {
  const t = useTranslations('sections.blog');
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  return (
    <section ref={ref} id="blog" className="px-4 py-10" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-4xl">
        <h2
          id="blog-heading"
          className="mb-8 text-center text-4xl font-light text-white md:text-5xl"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {shouldRender && (
          <TerminalWindow
            title="recent_posts.sh"
            className="mx-auto max-w-4xl"
          >
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <h3 className="mb-1 text-2xl font-semibold text-white">{t('description.title')}</h3>
                <p className="text-lg text-secondary">{t('description.content')}</p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-white/10"></div>

              {/* Posts List */}
              <div className="space-y-3">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="flex items-center gap-3 text-sm transition-colors hover:text-gopher-blue"
                      >
                        <span className="text-white group-hover:text-gopher-blue">{post.title}</span>
                        <span className="text-gopher-blue">|</span>
                        <span className="text-secondary">{formatDateShort(post.date, locale)}</span>
                        <span className="text-gopher-blue">|</span>
                        <span className="text-secondary">
                          {formatReadingTime(post.readingTime, locale)}
                        </span>
                      </Link>
                    </motion.article>
                  ))
                ) : (
                  <p className="text-sm text-secondary">{t('no_posts')}</p>
                )}
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-white/10"></div>

              {/* View All Link */}
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-gopher-blue transition-colors hover:text-gopher-blue-hover"
              >
                → {t('description.link_text')}
              </Link>
            </div>
          </TerminalWindow>
        )}
      </div>
    </section>
  );
}