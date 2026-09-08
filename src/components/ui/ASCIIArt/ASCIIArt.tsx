import React from 'react';
import styles from './ASCIIArt.module.css';

interface ASCIIArtProps {
  art: string;
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  withGlow?: boolean;
  className?: string;
}

export const ASCIIArt: React.FC<ASCIIArtProps> = ({
  art,
  color = 'primary',
  withGlow = true,
  className = ''
}) => {
  return (
    <pre
      className={`${styles.asciiWrapper} ${styles[color]} ${withGlow ? styles.glow : ''} ${className}`}
      aria-hidden="true"
    >
      {art}
    </pre>
  );
};
