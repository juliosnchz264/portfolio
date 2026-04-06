'use client';

import { extractTOC, TOCItem } from '@/lib/blog/mdx';
import TerminalPrompt from '@/components/ui/TerminalPrompt';
import { cn } from '@/lib/utils';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface TableOfContentsProps {
  content: string;
  locale: 'en' | 'es';
}

export default function TableOfContents({ content, locale }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract TOC from content
  useEffect(() => {
    const items = extractTOC(content);
    setToc(items);
  }, [content]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -50% 0%',
        threshold: 0.1
      }
    );

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  // Don't render if no TOC items
  if (toc.length === 0) return null;

  // Handle click to scroll to heading
  const scrollToHeading = (id: string) => {
    // Detect current viewport to select the correct layout
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    // Select the correct layout based on viewport
    const layoutSelector = isMobile
      ? '.block.lg\\:hidden' // Mobile layout
      : '.lg\\:grid'; // Desktop layout

    // Search for the heading within the visible layout
    let element = document.querySelector(`${layoutSelector} #${CSS.escape(id)}`) as HTMLElement | null;

    // Fallback: try getElementById if contextual selector fails
    if (!element) {
      console.warn(
        `Heading "${id}" not found in ${isMobile ? 'mobile' : 'desktop'} layout, trying fallback`
      );
      element = document.getElementById(id);
    }

    if (!element) {
      console.warn(`Heading with id "${id}" not found in the DOM`);
      return;
    }

    // Calculate offset to account for navigation header
    const headerOffset = 100; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="toc-container lg:sticky lg:top-24 h-fit">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="traffic-lights">
            <div className="traffic-light close"></div>
            <div className="traffic-light minimize"></div>
            <div className="traffic-light maximize"></div>
          </div>
          <div className="window-title">table_of_contents.sh</div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content">
          <div className="p-4 font-mono text-white">
            {/* Tree Command */}
            <div className="mb-6">
              <TerminalPrompt 
                command='tree -I "*.md" --dirs-first' 
                path="~/blog" 
                className="text-sm"
              />
            </div>

            {/* Tree Output */}
            <div className="tree-output ml-2">
              <AnimatePresence>
                {toc.map((item, index) => {
                  const isActive = activeId === item.id;
                  const isLevel2 = item.level === 2;
                  const isLevel3 = item.level === 3;

                  return (
                    <motion.div
                      key={item.id}
                      className={cn(
                        'toc-item flex items-center text-sm leading-relaxed',
                        isLevel3 && 'ml-4'
                      )}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Tree Structure */}
                      <span className="tree-symbol text-text-muted mr-2">{isLevel2 ? '├──' : '│   └──'}</span>

                      {/* Clickable Link */}
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={cn(
                          'toc-link relative cursor-pointer text-left transition-colors duration-200',
                          'hover:text-gopher-blue',
                          isActive 
                            ? 'text-gopher-blue font-medium' 
                            : 'text-text-secondary'
                        )}
                        aria-label={`Go to ${item.text}`}
                      >
                        {item.text}

                        {/* Underline for active/hover */}
                        <motion.div
                          className={cn(
                            'bg-gopher-blue absolute bottom-0 left-0 h-px',
                            isActive ? 'opacity-100' : 'opacity-0'
                          )}
                          layoutId="activeUnderline"
                          initial={false}
                          animate={{
                            width: isActive ? '100%' : '0%',
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-border-subtle mt-4 border-t pt-2">
              <div className="text-text-muted font-mono text-xs">
                {toc.length} {locale === 'es' ? 'secciones' : 'sections'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
