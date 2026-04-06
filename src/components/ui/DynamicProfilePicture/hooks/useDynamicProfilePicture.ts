import { useCallback, useEffect, useRef, useState } from 'react';

export type ProfileState = 'normal' | 'ascii' | 'split-diagonal' | 'split-vertical' | 'transition';

interface UseDynamicProfilePictureProps {
  isPaused?: boolean;
  normalImageSrc: string;
  asciiImageSrc: string;
}

interface UseDynamicProfilePictureReturn {
  currentState: ProfileState;
  isImagesLoaded: boolean;
  isTransitioning: boolean;
  isPausedInternal: boolean;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
}

const TIMINGS = {
  normal: 1500, // 1.5 seconds
  ascii: 1500, // 1,5 seconds
  'split-diagonal': 2500, // 2.5 seconds
  'split-vertical': 2500, // 2.5 seconds
  transition: 150, // Quick flicker transition
};

const STATE_SEQUENCE = ['normal', 'ascii', 'split-diagonal'] as const;

export function useDynamicProfilePicture({
  isPaused = false,
  normalImageSrc,
  asciiImageSrc,
}: UseDynamicProfilePictureProps): UseDynamicProfilePictureReturn {
  const [currentState, setCurrentState] = useState<ProfileState>('normal');
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [internalPause, setInternalPause] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSequenceIndex = useRef(0);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Preload images
  useEffect(() => {
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all([loadImage(normalImageSrc), loadImage(asciiImageSrc)])
      .then(() => setIsImagesLoaded(true))
      .catch(error => {
        console.warn('Failed to preload profile images:', error);
        setIsImagesLoaded(true); // Continue anyway
      });
  }, [normalImageSrc, asciiImageSrc]);

  const scheduleNextState = useCallback(() => {
    if (isPaused || internalPause || prefersReducedMotion) return;

    const currentStateValue = STATE_SEQUENCE[currentSequenceIndex.current] as keyof typeof TIMINGS;
    const timing = TIMINGS[currentStateValue];

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);

      // After transition effect, move to next state
      setTimeout(() => {
        currentSequenceIndex.current = (currentSequenceIndex.current + 1) % STATE_SEQUENCE.length;
        setCurrentState(STATE_SEQUENCE[currentSequenceIndex.current]);
        setIsTransitioning(false);

        // Schedule next transition
        scheduleNextState();
      }, TIMINGS.transition);
    }, timing);
  }, [isPaused, internalPause, prefersReducedMotion]);

  // Main animation loop
  useEffect(() => {
    if (!isImagesLoaded || prefersReducedMotion) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start the animation cycle
    scheduleNextState();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isImagesLoaded, scheduleNextState, prefersReducedMotion]);

  // Pause/Resume controls
  const pauseAnimation = useCallback(() => {
    setInternalPause(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const resumeAnimation = useCallback(() => {
    setInternalPause(false);
    if (isImagesLoaded && !prefersReducedMotion) {
      scheduleNextState();
    }
  }, [isImagesLoaded, prefersReducedMotion, scheduleNextState]);

  // If reduced motion is preferred, always show normal state
  const effectiveState = prefersReducedMotion ? 'normal' : currentState;

  return {
    currentState: effectiveState,
    isImagesLoaded,
    isTransitioning: isTransitioning && !prefersReducedMotion,
    isPausedInternal: internalPause,
    pauseAnimation,
    resumeAnimation,
  };
}
