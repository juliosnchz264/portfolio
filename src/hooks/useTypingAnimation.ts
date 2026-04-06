'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TYPING_CONFIG } from '@/constants/animations';

interface UseTypingAnimationOptions {
  command?: string;
  onTypingComplete?: () => void;
  typingSpeed?: number;
  startDelay?: number;
  autoStart?: boolean;
}

export function useTypingAnimation({
  command = '',
  onTypingComplete,
  typingSpeed = TYPING_CONFIG.DEFAULT_SPEED,
  startDelay = 300,
  autoStart = true,
}: UseTypingAnimationOptions = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  /**
   * Typing function that can be used automatically or manually
   * @param text - Text to type
   * @param setter - Optional setter to update external state
   * @returns Promise that resolves when typing completes
   */
  const typeText = useCallback(
    (text: string, setter?: (value: string) => void): Promise<void> => {
      return new Promise(resolve => {
        const targetSetter = setter || setDisplayedText;
        targetSetter('');
        setIsTyping(true);

        const chars = text.split('');
        const startTime = performance.now();
        const actualTypingSpeed = typingSpeed + Math.random() * TYPING_CONFIG.SPEED_VARIATION;

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const currentIndex = Math.floor(elapsed / actualTypingSpeed);

          if (currentIndex >= chars.length) {
            targetSetter(text);
            setIsTyping(false);
            onTypingComplete?.();
            resolve();
            return;
          }

          targetSetter(text.slice(0, currentIndex + 1));
          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      });
    },
    [typingSpeed, onTypingComplete]
  );

  // Only auto-start if autoStart=true and command is provided
  // Use ref pattern to avoid typeText recreation causing effect re-runs
  const typeTextRef = useRef(typeText);
  typeTextRef.current = typeText;

  useEffect(() => {
    if (!command || !autoStart) return;

    const startTimer = setTimeout(() => {
      typeTextRef.current(command);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [command, autoStart, startDelay]);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, TYPING_CONFIG.CURSOR_BLINK_INTERVAL);

    return () => clearInterval(cursorInterval);
  }, []);

  return {
    displayedText,
    isTyping,
    showCursor,
    typeText,
  };
}
