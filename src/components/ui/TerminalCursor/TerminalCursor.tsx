import React from 'react';
import styles from './TerminalCursor.module.css';

export type CursorShape = 'block' | 'line' | 'underline';

interface TerminalCursorProps {
  shape?: CursorShape;
  character?: string;
  isBlinking?: boolean;
  className?: string;
}

export const TerminalCursor: React.FC<TerminalCursorProps> = ({
  shape = 'block',
  character,
  isBlinking = true,
  className = ''
}) => {
  return (
    <span
      className={`${styles.cursor} ${styles[shape]} ${isBlinking ? styles.blinking : ''} ${className}`}
      aria-hidden="true"
    >
      {character || (shape === 'block' ? '\u00A0' : '')}
    </span>
  );
};
