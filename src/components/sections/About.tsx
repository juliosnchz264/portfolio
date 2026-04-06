'use client';

import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import TerminalWindow from '@/components/TerminalWindow';
import { ANIMATION_DELAYS } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Highlight {
  icon: string;
  text: string;
}

const iconMap: Record<string, string> = {
  star: '★',
  diamond: '◆',
  arrow: '▶',
};

const iconColorMap: Record<string, string> = {
  star: 'text-warning-yellow',
  diamond: 'text-keyword-purple',
  arrow: 'text-ts-blue',
};

export default function About() {
  const t = useTranslations('sections.about');
  const personalInfo = useTranslations('personal_info');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), ANIMATION_DELAYS.MEDIUM);
  }, []);

  const badges = t.raw('badges') as string[];
  const highlights = t.raw('highlights') as Highlight[];

  return (
    <section ref={ref} id="about" className="min-h-screen px-4 py-10" aria-labelledby="about-heading">
      <div className="mx-auto max-w-4xl">
        <SectionTitle>{t('title')}</SectionTitle>

        {shouldRender && (
          <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="300" data-aos-once="true">
            <TerminalWindow
              title="about_me.sh"
              command={t('terminal_command').replace('juliosn@portfolio:~$ ', '')}
              onTypingComplete={handleTypingComplete}
              className="mx-auto max-w-4xl"
            >
              {showContent && (
              <div className="p-8">
              {/* Header con nombre y título */}
              <div className="mb-6">
                <h3 className="mb-1 text-2xl font-semibold text-white">{personalInfo('full_name')}</h3>
                <p className="text-secondary text-lg">{personalInfo('title')}</p>
              </div>

              {/* Badges row */}
              <div className="mb-6 flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.15 }}
                  >
                    <Badge variant="gopher">{badge}</Badge>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-white/10"></div>

              {/* Intro paragraph */}
              <p className="text-secondary mb-6 leading-relaxed">{t('intro')}</p>

              {/* Highlights */}
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`mt-1 text-lg ${iconColorMap[highlight.icon]}`}>
                      {iconMap[highlight.icon]}
                    </span>
                    <p className="text-secondary flex-1 leading-relaxed">{highlight.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
              )}
            </TerminalWindow>
          </div>
        )}
      </div>
    </section>
  );
}
