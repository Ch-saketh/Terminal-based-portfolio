import React from 'react';
import styles from './StatusIndicator.module.css';

export type StatusType = 'online' | 'busy' | 'idle' | 'error' | 'warning';

interface StatusIndicatorProps {
  status?: StatusType;
  label?: string;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status = 'online',
  label,
  pulse = true,
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`${styles.statusWrapper} ${styles[size]} ${className}`}>
      <span
        className={`${styles.dot} ${styles[status]} ${pulse ? styles.pulsing : ''}`}
        aria-hidden="true"
      />
      {label && <span className={styles.label}>{label}</span>}
      <span className="sr-only">Status: {status}</span>
    </div>
  );
};
