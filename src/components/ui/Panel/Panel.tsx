import React from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  children: React.ReactNode;
  variant?: 'default' | 'card' | 'elevated' | 'glass';
  isGlowing?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  variant = 'default',
  isGlowing = false,
  className = '',
  style
}) => {
  return (
    <section
      className={`${styles.panel} ${styles[variant]} ${isGlowing ? styles.glowing : ''} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

interface PanelHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  subtitle,
  action,
  icon,
  className = ''
}) => {
  return (
    <header className={`${styles.panelHeader} ${className}`}>
      <div className={styles.headerLeft}>
        {icon && <span className={styles.headerIcon}>{icon}</span>}
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className={styles.headerRight}>{action}</div>}
    </header>
  );
};
