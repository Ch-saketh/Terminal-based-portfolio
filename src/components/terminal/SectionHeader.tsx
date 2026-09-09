import React from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  path?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  path,
  action
}) => {
  return (
    <header className={styles.sectionHeaderContainer}>
      <div className={styles.metaRow}>
        <span className={styles.sectionBadge}>[{badge}]</span>
        {path && <span className={styles.sectionPath}>{path}</span>}
      </div>

      <div className={styles.titleRow}>
        <div className={styles.titleGroup}>
          <div className={styles.accentBar} />
          <h1 className={styles.sectionTitle}>{title}</h1>
        </div>
        {action && <div className={styles.headerAction}>{action}</div>}
      </div>

      <p className={styles.sectionSubtitle}>{subtitle}</p>
    </header>
  );
};
