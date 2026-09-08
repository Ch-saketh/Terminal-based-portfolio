import React from 'react';
import { profileData } from '../../../content/profile';
import { systemConfig } from '../../../content/config';
import { useSystemStore } from '../../../state/useSystemStore';
import styles from './Renderers.module.css';

export const NeofetchRenderer: React.FC = () => {
  const metrics = useSystemStore((s) => s.metrics);
  const theme = useSystemStore((s) => s.theme);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m (99.99% Reliability)`;
  };

  const asciiLogo = `
   .---.
  /     \\
 ( () () )
  \\  _  /
   \`---\`
 SAKETH.OS
`;

  return (
    <div className={styles.neofetchContainer}>
      <div className={styles.neofetchLogo}>{asciiLogo}</div>

      <div className={styles.neofetchInfo}>
        <div className={styles.neofetchHeader}>saketh@{systemConfig.hostname}</div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>OS:</span>
          <span className={styles.neofetchVal}>
            {systemConfig.osName} v{systemConfig.osVersion} (x86_64 WebAssembly)
          </span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Developer:</span>
          <span className={styles.neofetchVal}>{profileData.name} ({profileData.handle})</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Stack:</span>
          <span className={styles.neofetchVal}>Spring Boot, Python/FastAPI, Go, React, Qdrant, PostgreSQL</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Projects:</span>
          <span className={styles.neofetchVal}>Weavly / Zyra, PageMatch, CinePortal, SAKETH.OS</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Uptime:</span>
          <span className={styles.neofetchVal}>{formatUptime(metrics.uptimeSeconds)}</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Current Focus:</span>
          <span className={styles.neofetchVal}>{profileData.currentFocus.slice(0, 2).join(' & ')}</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Kernel:</span>
          <span className={styles.neofetchVal}>{systemConfig.kernelVersion}</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Theme:</span>
          <span className={styles.neofetchVal}>{theme} (terminal phosphor)</span>
        </div>

        <div className={styles.colorBlocks}>
          <div className={styles.colorBlock} style={{ background: '#0a0d12' }} />
          <div className={styles.colorBlock} style={{ background: '#10b981' }} />
          <div className={styles.colorBlock} style={{ background: '#06b6d4' }} />
          <div className={styles.colorBlock} style={{ background: '#8b5cf6' }} />
          <div className={styles.colorBlock} style={{ background: '#f59e0b' }} />
          <div className={styles.colorBlock} style={{ background: '#ef4444' }} />
          <div className={styles.colorBlock} style={{ background: '#f1f5f9' }} />
        </div>
      </div>
    </div>
  );
};
