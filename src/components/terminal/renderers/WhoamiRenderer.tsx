import React from 'react';
import { profileData } from '../../../content/profile';
import styles from './Renderers.module.css';

export const WhoamiRenderer: React.FC = () => {
  return (
    <div className={styles.whoamiContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.nameGroup}>
          <h2>
            {profileData.name}
            <span className={styles.handleBadge}>@{profileData.handle}</span>
          </h2>
          <div className={styles.headline}>{profileData.headline}</div>
        </div>
        <div className={styles.statusPill}>
          {profileData.status}
        </div>
      </div>

      <div className={styles.bioBlock}>
        {profileData.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statVal}>{profileData.stats.yearsExperience}+ Years</span>
          <span className={styles.statLabel}>Industry Experience</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statVal}>{profileData.stats.productionDeployments}</span>
          <span className={styles.statLabel}>Production Deploys</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statVal}>{profileData.stats.openSourceContributions}</span>
          <span className={styles.statLabel}>OSS Contributions</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statVal}>{profileData.stats.systemUptime}</span>
          <span className={styles.statLabel}>Telemetry Reliability</span>
        </div>
      </div>
    </div>
  );
};
