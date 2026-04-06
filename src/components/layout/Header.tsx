'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

import DynamicProfilePicture from '../ui/DynamicProfilePicture';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const t = useTranslations('personal_info');

  return (
    <motion.header
      className={cn('py-4', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Desktop Grid Layout */}
      <div className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto] items-center gap-8 px-6 md:grid relative z-10">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="mb-4 text-3xl font-light text-white lg:text-5xl">{t('full_name')}</h1>
          <p className="text-secondary mb-2 text-xl font-light lg:text-2xl">{t('title')}</p>
        </motion.div>

        {/* Dynamic Profile Picture - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <DynamicProfilePicture
            normalImageSrc="/images/profile/normal.webp"
            asciiImageSrc="/images/profile/ascii.webp"
            alt="Professional profile photo of Julio Sánchez Aniceto, Junior Web Developer"
            size="lg"
            priority
          />
        </motion.div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="flex flex-col items-center gap-6 px-6 md:hidden relative z-10">
        {/* Dynamic Profile Picture - Top on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <DynamicProfilePicture
            normalImageSrc="/images/profile/normal.webp"
            asciiImageSrc="/images/profile/ascii.webp"
            alt="Professional profile photo of Julio Sánchez Aniceto, Junior Web Developer"
            size="md"
            priority
          />
        </motion.div>

        {/* Text Content - Bottom on Mobile */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="mb-4 text-3xl font-light text-white sm:text-4xl">{t('full_name')}</h1>
          <p className="text-secondary mb-2 text-xl font-light sm:text-2xl">{t('title')}</p>
        </motion.div>
      </div>
    </motion.header>
  );
}
