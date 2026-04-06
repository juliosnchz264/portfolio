'use client';

import SectionTitle from '@/components/ui/SectionTitle';
import TerminalWindow from '@/components/TerminalWindow';
import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';
import { ANIMATION_DELAYS } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('sections.contact');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), ANIMATION_DELAYS.MEDIUM);
  }, []);

  return (
    <section ref={ref} id="contact" className="px-4 py-10" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>{t('title')}</SectionTitle>

        {shouldRender && (
          <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="300" data-aos-once="true">
            <TerminalWindow
              title="get_in_touch.sh"
              command={t('terminal_command').replace('juliosn@portfolio:~$ ', '')}
              onTypingComplete={handleTypingComplete}
              className="mx-auto max-w-6xl"
            >
              {showContent && (
              <div
                className="p-8"
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-once="true"
              >
              {/* Header */}
              <div className="mb-6">
                <h3 className="mb-1 text-2xl font-semibold text-white">{t('header.title')}</h3>
                <p className="text-lg text-secondary">{t('header.subtitle')}</p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-white/10"></div>

              {/* Split Layout - Form and Social */}
              <div className="gap-8 lg:grid lg:grid-cols-2">
                {/* Left Side - Contact Form */}
                <ContactForm />

                {/* Right Side - Social Links */}
                <SocialMedia />
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
