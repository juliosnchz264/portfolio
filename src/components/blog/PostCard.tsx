import { PostMetadata } from '@/lib/blog/posts';
import { formatDate, formatReadingTime, generatePostUrl } from '@/lib/blog/utils';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface PostCardProps {
  post: PostMetadata;
  locale: 'en' | 'es';
  index?: number;
}

export default function PostCard({ post, locale, index = 0 }: PostCardProps) {
  const t = useTranslations('sections.blog.post_card');
  const postUrl = generatePostUrl(post, locale);
  const readingTimeText = formatReadingTime(post.readingTime[locale], locale);

  return (
    <motion.article
      className="post-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ x: 4 }}
    >
      <div className="post-card-content border-border-subtle border-b py-8 transition-all duration-200">
        {/* Post Date */}
        <time dateTime={post.publishedAt} className="post-date text-text-muted mb-2 block font-mono text-sm">
          {formatDate(post.publishedAt, locale)}
        </time>

        {/* Post Title */}
        <h2 className="post-title mb-4 text-2xl leading-tight font-light">
          <Link
            href={postUrl}
            className="text-text-primary hover:text-gopher-blue group-hover:text-gopher-blue transition-colors"
          >
            {post.title[locale]}
          </Link>
        </h2>

        {/* Post Excerpt */}
        <p className="post-excerpt text-text-secondary mb-4 leading-relaxed">{post.description[locale]}</p>

        {/* Post Meta */}
        <div className="post-meta flex items-center justify-between">
          {/* Reading Time */}
          <span className="reading-time text-text-muted font-mono text-sm">{readingTimeText}</span>

          {/* Tags */}
          <div className="post-tags flex gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag text-gopher-blue-muted font-mono text-sm">
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="tag text-text-muted font-mono text-sm">+{post.tags.length - 3}</span>
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="featured-badge mt-3">
            <span className="text-warning-yellow inline-flex items-center gap-1 font-mono text-xs">
              <span className="text-warning-yellow">★</span>
              {t('featured')}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
