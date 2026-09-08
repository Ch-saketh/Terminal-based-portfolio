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
    return `${hrs} hours, ${mins % 60} mins`;
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
            {systemConfig.osName} v{systemConfig.osVersion}
          </span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Host:</span>
          <span className={styles.neofetchVal}>Developer Workstation (POSIX Architecture)</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Kernel:</span>
          <span className={styles.neofetchVal}>{systemConfig.kernelVersion}</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Uptime:</span>
          <span className={styles.neofetchVal}>{formatUptime(metrics.uptimeSeconds)}</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Shell:</span>
          <span className={styles.neofetchVal}>zsh 5.9 (x86_64-apple-darwin22.0)</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Theme:</span>
          <span className={styles.neofetchVal}>{theme} (matrix phosphor)</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>CPU Load:</span>
          <span className={styles.neofetchVal}>{metrics.cpu}% (8 Cores Virtualized)</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Memory:</span>
          <span className={styles.neofetchVal}>{metrics.memoryMb}MB / 16384MB</span>
        </div>

        <div className={styles.neofetchRow}>
          <span className={styles.neofetchKey}>Contact:</span>
          <span className={styles.neofetchVal}>{profileData.email}</span>
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
