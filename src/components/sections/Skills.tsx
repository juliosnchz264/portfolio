'use client';

import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import TerminalFooter from '@/components/TerminalFooter';
import TerminalWindow from '@/components/TerminalWindow';
import { ANIMATION_DELAYS } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { cn } from '@/lib/utils';
import { BookOpen, Terminal } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsCategories {
  conceptual: SkillCategory;
  technical: SkillCategory;
}

export default function Skills() {
  const t = useTranslations('sections.skills');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), ANIMATION_DELAYS.MEDIUM);
  }, []);

  const categories: SkillsCategories = t.raw('categories') as SkillsCategories;
  const highlightedSkills: string[] = t.raw('highlighted_skills') as string[];

  const isHighlighted = useCallback(
    (skill: string): boolean => highlightedSkills.includes(skill),
    [highlightedSkills]
  );

  const sortSkillsByHighlight = useCallback(
    (skills: string[]): string[] => {
      return [...skills].sort((a, b) => {
        const aHighlighted = highlightedSkills.includes(a);
        const bHighlighted = highlightedSkills.includes(b);

        // Both highlighted or both not highlighted - maintain original order
        if (aHighlighted === bHighlighted) {
          return 0;
        }

        // Highlighted skills come first
        return aHighlighted ? -1 : 1;
      });
    },
    [highlightedSkills]
  );

  const sortedCategories = useMemo(() => {
    const result: Record<string, SkillCategory> = {};
    Object.entries(categories).forEach(([key, category]) => {
      result[key] = {
        ...category,
        skills: sortSkillsByHighlight(category.skills),
      };
    });
    return result as unknown as SkillsCategories;
  }, [categories, sortSkillsByHighlight]);

  const getCategoryIcon = (categoryKey: string): React.ReactNode => {
    const iconProps = { size: 20, className: 'inline-block' };

    const icons: Record<string, React.ReactNode> = {
      conceptual: <BookOpen {...iconProps} />,
      technical: <Terminal {...iconProps} />,
    };
    return icons[categoryKey] || null;
  };

  const getCategoryColor = (categoryKey: string): string => {
    const colors: Record<string, string> = {
      conceptual: 'text-keyword-purple',
      technical: 'text-gopher-blue',
    };
    return colors[categoryKey] || 'text-secondary';
  };

  return (
    <section ref={ref} id="skills" className="min-h-screen px-4 py-10" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-4xl">
        <SectionTitle>{t('title')}</SectionTitle>

        {/* Terminal Window with conditional rendering */}
        {shouldRender && (
          <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="300" data-aos-once="true">
            <TerminalWindow
              title="skills_inventory.json"
              command={t('terminal_command').replace('juliosn@portfolio:~$ ', '')}
              onTypingComplete={handleTypingComplete}
              className="mx-auto max-w-4xl"
            >
              {showContent && (
                <div
                  className="space-y-8 p-8"
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-once="true"
                >
                  {/* Header Info */}
                  <div className="pb-4">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <span className="text-gopher-blue font-semibold">{t('labels.overview')}</span>
                      <span className="text-secondary rounded bg-gray-800 px-2 py-1 text-xs">
                        {t('expertise_level')}
                      </span>
                    </div>
                    <div className="text-secondary text-sm">
                      <div>
                        {t('labels.specialization')}: {t('labels.backend_development')}
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-white/10"></div>

                  {/* Skills Categories */}
                  <div className="space-y-6">
                    {Object.entries(sortedCategories).map(([categoryKey, category], index) => (
                      <div
                        key={categoryKey}
                        className="border-gopher-blue border-l-2 pl-4 md:pl-6"
                        data-aos="fade-right"
                        data-aos-duration="500"
                        data-aos-delay={index * ANIMATION_DELAYS.STAGGER_DELAY}
                        data-aos-once="true"
                      >
                        <div className="mb-4">
                          <h3 className={cn('text-lg font-semibold md:text-xl mb-2', getCategoryColor(categoryKey))}>
                            {getCategoryIcon(categoryKey)} {category.name}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          {category.skills.map((skill: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant={isHighlighted(skill) ? 'highlight' : 'tech'}
                              className="cursor-default transition-all duration-200 hover:scale-105"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <TerminalFooter path="~/skills" />
                </div>
              )}
            </TerminalWindow>
          </div>
        )}
      </div>
    </section>
  );
}
