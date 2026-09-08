import React from 'react';
import { profileData } from '../../../content/profile';
import { useTerminalStore } from '../../../state/useTerminalStore';
import styles from './Renderers.module.css';

export const WhoamiRenderer: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  return (
    <div className={styles.whoamiContainer} role="region" aria-label="Whoami Profile Output">
      {/* 1. Profile Identity Header */}
      <div className={styles.profileHeader}>
        <div className={styles.nameGroup}>
          <h2>
            {profileData.name}
            <span className={styles.handleBadge}>@{profileData.handle}</span>
          </h2>
          <div className={styles.headline}>{profileData.headline}</div>
        </div>
        <div className={styles.statusPill}>{profileData.status}</div>
      </div>

      {/* 2. Core Role Output Archetypes matching prompt specification */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px 12px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderLeft: '2px solid var(--color-primary-green, #00ff88)',
          borderRadius: '0 4px 4px 0',
          fontFamily: 'inherit',
          fontSize: '13px',
          color: 'var(--color-primary-cyan, #00f2fe)'
        }}
      >
        {profileData.roles.map((role) => (
          <div key={role} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--color-primary-green, #00ff88)' }}>&gt;</span>
            <span style={{ color: '#e6edf3', fontWeight: 500 }}>{role}</span>
          </div>
        ))}
      </div>

      {/* 3. Executive Bio Summary */}
      <div className={styles.bioBlock}>
        {profileData.bio.map((para, i) => (
          <p key={i} style={{ margin: 0 }}>
            {para}
          </p>
        ))}
      </div>

      {/* 4. Production Metric Badges */}
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

      {/* 5. Terminal Discoverable Quick Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08))'
        }}
      >
        <span style={{ fontSize: '11px', color: '#768390' }}>Inspect Detailed Profile:</span>
        <button
          onClick={() => executeCommand('cat about.md')}
          style={{
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            color: '#00f2fe',
            fontFamily: 'inherit',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          &gt; cat about.md
        </button>
        <button
          onClick={() => executeCommand('cat profile.json')}
          style={{
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            color: '#00ff88',
            fontFamily: 'inherit',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          &gt; cat profile.json
        </button>
        <button
          onClick={() => executeCommand('projects')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#adbac7',
            fontFamily: 'inherit',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          &gt; projects
        </button>
      </div>
    </div>
  );
};
