import React, { useState, useEffect } from 'react';
import { useSystemStore, SystemTheme } from '../../state/useSystemStore';
import { useWindowStore } from '../../state/useWindowStore';
import { systemConfig } from '../../content/config';
import { Volume2, VolumeX, Tv, Monitor, Palette, Activity } from 'lucide-react';
import styles from './Desktop.module.css';

export const TopBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const theme = useSystemStore((s) => s.theme);
  const setTheme = useSystemStore((s) => s.setTheme);
  const soundEnabled = useSystemStore((s) => s.soundEnabled);
  const toggleSound = useSystemStore((s) => s.toggleSound);
  const crtEnabled = useSystemStore((s) => s.crtEnabled);
  const toggleCrt = useSystemStore((s) => s.toggleCrt);
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cycleTheme = () => {
    const themes: SystemTheme[] = ['emerald', 'cyan', 'amber', 'purple'];
    const currentIdx = themes.indexOf(theme);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <div className={styles.brandLogo}>
          <div className={styles.brandDot} />
          <span>{systemConfig.osName}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
            v{systemConfig.osVersion}
          </span>
        </div>

        {activeWindowId && (
          <div className={styles.activeAppBadge}>
            <Activity size={12} />
            <span>{activeWindowId}</span>
          </div>
        )}
      </div>

      <div className={styles.topBarRight}>
        {/* Telemetry Monitor Launcher */}
        <button
          className={styles.topBarActionBtn}
          onClick={() => openWindow('systemMonitor')}
          title="Open System Monitor"
        >
          <Monitor size={14} />
          <span>Telemetry</span>
        </button>

        {/* Theme Cycler */}
        <button
          className={styles.topBarActionBtn}
          onClick={cycleTheme}
          title={`Active Theme: ${theme}. Click to switch theme.`}
        >
          <Palette size={14} />
          <span style={{ textTransform: 'capitalize' }}>{theme}</span>
        </button>

        {/* CRT Scanline Toggle */}
        <button
          className={`${styles.topBarActionBtn} ${crtEnabled ? styles.active : ''}`}
          onClick={toggleCrt}
          title={`CRT Overlay: ${crtEnabled ? 'ON' : 'OFF'}`}
        >
          <Tv size={14} />
          <span>CRT</span>
        </button>

        {/* Sound Feedback Toggle */}
        <button
          className={`${styles.topBarActionBtn} ${soundEnabled ? styles.active : ''}`}
          onClick={toggleSound}
          title={`Sound Synthesizer: ${soundEnabled ? 'ON' : 'MUTED'}`}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        <div className={styles.dockSeparator} />

        {/* System Clock */}
        <div className={styles.clockDisplay}>
          <span>{timeStr || '00:00:00'}</span>
        </div>
      </div>
    </header>
  );
};
