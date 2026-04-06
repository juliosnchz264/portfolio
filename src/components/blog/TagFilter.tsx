'use client';

import { PostMetadata } from '@/lib/blog/posts';
import { searchPosts } from '@/lib/blog/utils';
import { cn } from '@/lib/utils';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { AnimatePresence, motion } from 'framer-motion';

interface TagFilterProps {
  posts: PostMetadata[];
  locale: 'en' | 'es';
  onFilteredPosts: (posts: PostMetadata[]) => void;
  allTags: string[];
}

export default function TagFilter({ posts, locale, onFilteredPosts, allTags }: TagFilterProps) {
  const t = useTranslations('sections.blog.filter');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Apply filters whenever search or tags change
  useEffect(() => {
    let result = posts;

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchPosts(result, searchQuery, locale);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(post => selectedTags.every(tag => post.tags.includes(tag)));
    }

    setFilteredPosts(result);
    onFilteredPosts(result);
  }, [posts, searchQuery, selectedTags, locale, onFilteredPosts]);

  // Handle tag toggle
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="blog-controls border-border-subtle mb-8 border-b pb-6">
      {/* Search Input */}
      <div className="search-container mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input bg-bg-secondary border-border-subtle text-text-primary placeholder:text-text-muted focus:border-gopher-blue focus:ring-gopher-blue/20 w-full rounded-md border px-4 py-3 font-mono text-sm focus:ring-1 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-text-muted font-mono text-xs">
              {filteredPosts.length}/{posts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="tag-filters">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-text-muted font-mono text-sm">
            {t('filter_by')}
          </span>

          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'tag-filter rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200',
                selectedTags.includes(tag)
                  ? 'bg-gopher-blue border-gopher-blue text-bg-primary'
                  : 'border-border-subtle text-text-secondary hover:border-gopher-blue hover:text-gopher-blue bg-transparent'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted font-mono">
                  {t('showing')} {filteredPosts.length} {t('of')} {posts.length} {t('posts')}
                </span>
                {selectedTags.length > 0 && (
                  <span className="text-gopher-blue font-mono">
                    • {selectedTags.length} {t('active_tags')}
                  </span>
                )}
              </div>

              <button
                onClick={clearFilters}
                className="clear-filters text-text-muted hover:text-gopher-blue font-mono text-sm underline transition-colors"
              >
                {t('clear_filters')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
