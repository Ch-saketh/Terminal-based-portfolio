import React from 'react';
import styles from './CommandButton.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isTerminalChip?: boolean;
}

export const CommandButton: React.FC<CommandButtonProps> = ({
  children,
  variant = 'outline',
  size = 'md',
  isLoading = false,
  disabled = false,
  prefixIcon,
  suffixIcon,
  isTerminalChip = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        isTerminalChip ? styles.chip : ''
      } ${isLoading ? styles.loading : ''} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        prefixIcon && <span className={styles.icon}>{prefixIcon}</span>
      )}
      <span className={styles.label}>{children}</span>
      {!isLoading && suffixIcon && <span className={styles.icon}>{suffixIcon}</span>}
    </button>
  );
};
