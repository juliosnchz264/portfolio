/**
 * DynamicProfilePicture - A dynamic profile picture component that cycles through
 * normal photo, ASCII art, diagonal split, and vertical split states with monitor-style transitions.
 */
'use client';

import React, { useRef, useState } from 'react';

import { Pause } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import styles from './DynamicProfilePicture.module.css';
import { useDynamicProfilePicture } from './hooks/useDynamicProfilePicture';

/**
 * DynamicProfilePicture - A dynamic profile picture component that cycles through
 * normal photo, ASCII art, diagonal split, and vertical split states with monitor-style transitions.
 */

export interface DynamicProfilePictureProps {
  /** Source URL for the normal photo image */
  normalImageSrc: string;
  /** Source URL for the ASCII art image */
  asciiImageSrc: string;
  /** Alt text for accessibility */
  alt: string;
  /** Size variant for the component */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Pause the animation cycle */
  isPaused?: boolean;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
}

/**
 * DynamicProfilePicture component with cycling animation states
 *
 * Features:
 * - Cycles through normal, ASCII, diagonal split, and vertical split states
 * - Monitor-style glitch transitions
 * - Respects reduced motion preferences
 * - Click to pause/resume animation
 * - Preloads images for smooth transitions
 * - Accessible focus states
 */
export function DynamicProfilePicture({
  normalImageSrc,
  asciiImageSrc,
  alt,
  size = 'md',
  className = '',
  isPaused = false,
  priority = false,
}: DynamicProfilePictureProps) {
  const [imageErrors, setImageErrors] = useState({
    normal: false,
    ascii: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentState, isImagesLoaded, isTransitioning, isPausedInternal, pauseAnimation, resumeAnimation } =
    useDynamicProfilePicture({
      isPaused,
      normalImageSrc,
      asciiImageSrc,
    });

  const handleImageError = (imageType: 'normal' | 'ascii') => {
    setImageErrors(prev => ({
      ...prev,
      [imageType]: true,
    }));
  };

  const handleClick = () => {
    if (isPausedInternal) {
      resumeAnimation();
      // Remove focus when resuming to avoid focus outline
      containerRef.current?.blur();
    } else {
      pauseAnimation();
    }
  };

  // If images failed to load, show error state
  if (imageErrors.normal && imageErrors.ascii) {
    return (
      <div
        className={cn(styles['dpp-container'], styles[`dpp-size-${size}`], styles['dpp-error'], className)}
        role="img"
        aria-label={alt}
      >
        Image unavailable
      </div>
    );
  }

  // Show loading state while images are being preloaded
  if (!isImagesLoaded) {
    return (
      <div
        className={cn(styles['dpp-container'], styles[`dpp-size-${size}`], styles['dpp-loading'], className)}
        role="img"
        aria-label="Loading profile picture"
      />
    );
  }

  const containerClasses = [
    styles['dpp-container'],
    styles[`dpp-size-${size}`],
    styles[`dpp-state-${currentState}`],
    isTransitioning ? styles['dpp-transitioning'] : '',
    isPausedInternal ? styles['dpp-paused'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="relative inline-block">
      <div
        ref={containerRef}
        className={containerClasses}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${alt}. Click to ${isPausedInternal ? 'resume' : 'pause'} animation`}
        title={`${isPausedInternal ? 'Resume' : 'Pause'} animation`}
      >
        {/* Normal photo layer */}
        {!imageErrors.normal && (
          <Image
            src={normalImageSrc}
            alt={alt}
            fill
            className={cn(styles['dpp-image-layer'], styles['dpp-image-normal'])}
            style={{ objectFit: 'cover' }}
            priority={priority}
            onError={() => handleImageError('normal')}
            sizes={`
              (max-width: 768px) ${size === 'sm' ? '112px' : size === 'md' ? '168px' : '202px'},
              ${size === 'sm' ? '112px' : size === 'md' ? '168px' : '224px'}
            `}
          />
        )}

        {/* ASCII art layer */}
        {!imageErrors.ascii && (
          <Image
            src={asciiImageSrc}
            alt={`${alt} (ASCII art version)`}
            fill
            className={cn(styles['dpp-image-layer'], styles['dpp-image-ascii'])}
            style={{ objectFit: 'cover' }}
            priority={priority}
            onError={() => handleImageError('ascii')}
            sizes={`
              (max-width: 768px) ${size === 'sm' ? '112px' : size === 'md' ? '168px' : '202px'},
              ${size === 'sm' ? '112px' : size === 'md' ? '168px' : '224px'}
            `}
          />
        )}

        {/* Transition overlay effect */}
        {isTransitioning && <div className={styles['dpp-transition-overlay']} aria-hidden="true" />}
      </div>

      {/* Pause indicator */}
      {isPausedInternal && (
        <div
          className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center"
          aria-hidden="true"
        >
          <Pause size={16} className="text-gopher-blue opacity-70 drop-shadow-sm" />
        </div>
      )}
    </div>
  );
}

export default DynamicProfilePicture;
