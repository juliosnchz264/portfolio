'use client';

import { useTerminalCursor } from '@/hooks/useTerminalCursor';

import { motion } from 'framer-motion';

interface TerminalPromptProps {
  command?: string;
  showCursor?: boolean;
  cursorState?: 'typing' | 'blinking';
  path?: string;
  className?: string;
  commandClassName?: string;
}

export default function TerminalPrompt({
  command,
  showCursor = false,
  cursorState = 'blinking',
  path = '~',
  className = '',
  commandClassName = '',
}: TerminalPromptProps) {
  const cursor = useTerminalCursor();

  return (
    <div className={className}>
      <div className="terminal-line">
        <span className="terminal-prompt">
          <span className="text-terminal-green">juliosn</span>
          <span className="text-white">@</span>
          <span className="text-gopher-blue">portfolio</span>
          <span className="text-white">:</span>
          <span className="text-white">{path}</span>
          <span className="text-white">$</span>
        </span>
      </div>
      {command && (
        <div className="terminal-line terminal-continuation">
          <span className="terminal-chevron">
            <span className="text-terminal-green">❯</span>
          </span>
          <span className={`terminal-command ${commandClassName}`}>
            {command}
            {showCursor && (
              <motion.span
                className="terminal-cursor"
                animate={cursorState === 'blinking' ? cursor.blinking : { opacity: 1 }}
                transition={cursorState === 'typing' ? cursor.typing.transition : undefined}
              >
                █
              </motion.span>
            )}
          </span>
        </div>
      )}
      {!command && showCursor && (
        <div className="terminal-line terminal-continuation">
          <span className="terminal-chevron">
            <span className="text-terminal-green">❯</span>
          </span>
          <span className="terminal-cursor-only">
            <motion.span className="terminal-cursor" animate={cursor.blinking}>
              █
            </motion.span>
          </span>
        </div>
      )}
    </div>
  );
}
