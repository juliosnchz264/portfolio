'use client';

import PostCard from '@/components/blog/PostCard';
import TagFilter from '@/components/blog/TagFilter';
import { PostMetadata } from '@/lib/blog/posts';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

interface BlogControlsProps {
  posts: PostMetadata[];
  allTags: string[];
  locale: 'en' | 'es';
}

export default function BlogControls({ posts, allTags, locale }: BlogControlsProps) {
  const t = useTranslations('sections.blog.filter');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilteredPosts = useCallback((newPosts: PostMetadata[]) => {
    setFilteredPosts(newPosts);
  }, []);

  return (
    <>
      {/* Filter Controls */}
      <TagFilter posts={posts} allTags={allTags} locale={locale} onFilteredPosts={handleFilteredPosts} />

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.length > 0 &&
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} locale={locale} index={index} />
          ))
        }
        {filteredPosts.length === 0 && (
          <div className="no-posts py-12 text-center">
            <div className="text-text-muted mb-4 font-mono text-lg">
              {t('no_posts_found')}
            </div>
            <div className="text-text-muted text-sm">
              {t('no_posts_subtitle')}
            </div>
          </div>
        )}
      </div>
    </>
  );
}