import React from 'react';
import { useSystemStore } from '../../state/useSystemStore';
import { useTerminalStore } from '../../state/useTerminalStore';
import { Activity } from 'lucide-react';
import styles from './Hud.module.css';

export const SystemMetricsPanel: React.FC = () => {
  const metrics = useSystemStore((s) => s.metrics);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const renderSparkBar = (percentage: number, colorVar = 'var(--accent-primary)') => {
    const totalBars = 16;
    const filledBars = Math.round((percentage / 100) * totalBars);
    const emptyBars = totalBars - filledBars;

    return (
      <span className={styles.barVisual} style={{ color: colorVar }}>
        [{'|'.repeat(filledBars)}
        <span style={{ color: 'var(--border-medium)' }}>{':'.repeat(emptyBars)}</span>]
      </span>
    );
  };

  return (
    <div
      className={styles.panelBox}
      onClick={() => executeCommand('debug')}
      title="Click to run system diagnostics ('debug') in terminal"
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.panelHeader}>
        <Activity size={13} color="var(--accent-primary)" />
        <span>SYSTEM METRICS</span>
      </div>

      <div className={styles.metricsList}>
        <div className={styles.metricRow}>
          <span className={styles.metricLabel}>CPU</span>
          {renderSparkBar(metrics.cpu, 'var(--accent-primary)')}
          <span className={styles.metricPercent}>{metrics.cpu}%</span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricLabel}>MEMORY</span>
          {renderSparkBar(Math.round((metrics.memoryMb / 1024) * 100), 'var(--accent-secondary)')}
          <span className={styles.metricPercent}>{Math.round((metrics.memoryMb / 1024) * 100)}%</span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricLabel}>IDEAS</span>
          {renderSparkBar(87, 'var(--accent-tertiary)')}
          <span className={styles.metricPercent}>87%</span>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricLabel}>MOTIVATION</span>
          {renderSparkBar(100, '#34d399')}
          <span className={styles.metricPercent}>100%</span>
        </div>
      </div>

      <div className={styles.panelFooterStatus}>
        <span className={styles.pulseDot} />
        <span>All systems running optimally...</span>
      </div>
    </div>
  );
};
