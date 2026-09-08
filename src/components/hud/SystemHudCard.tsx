import React from 'react';
import { profileData } from '../../content/profile';
import { systemConfig } from '../../content/config';
import styles from './Hud.module.css';

export const SystemHudCard: React.FC = () => {
  return (
    <div className={styles.hudCard}>
      <div className={styles.hudTable}>
        <div className={styles.hudRow}>
          <span className={styles.hudKey}>OS</span>
          <span className={styles.hudVal}>{systemConfig.osName} v{systemConfig.osVersion}</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudKey}>USER</span>
          <span className={styles.hudVal}>{profileData.handle}</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudKey}>HOST</span>
          <span className={styles.hudVal}>portfolio.dev</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudKey}>LOCATION</span>
          <span className={styles.hudVal}>Hyderabad, India</span>
        </div>
        <div className={styles.hudRow}>
          <span className={styles.hudKey}>STATUS</span>
          <span className={styles.statusOnline}>
            <span className={styles.onlineDot} /> Online
          </span>
        </div>
      </div>

      <div className={styles.quoteBox}>
        <span className={styles.quoteText}>&ldquo;Ideas don&apos;t work unless you do.&rdquo;</span>
        <span className={styles.quoteAuthor}>&mdash; Saketh</span>
      </div>
    </div>
  );
};
