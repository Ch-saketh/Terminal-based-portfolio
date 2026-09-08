import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  label?: string;
  variant?: 'solid' | 'dashed' | 'glow';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, variant = 'solid', className = '' }) => {
  if (label) {
    return (
      <div
        className={`${styles.dividerWithLabel} ${styles[variant]} ${className}`}
        role="separator"
      >
        <div className={styles.line} />
        <span className={styles.label}>{label}</span>
        <div className={styles.line} />
      </div>
    );
  }

  return <hr className={`${styles.divider} ${styles[variant]} ${className}`} role="separator" />;
};
