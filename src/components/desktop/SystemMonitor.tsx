import React, { useEffect } from 'react';
import { useSystemStore } from '../../state/useSystemStore';
import { useWindowStore } from '../../state/useWindowStore';
import { systemConfig } from '../../content/config';
import { Cpu, HardDrive, Wifi, X } from 'lucide-react';
import styles from './Desktop.module.css';

export const SystemMonitor: React.FC = () => {
  const metrics = useSystemStore((s) => s.metrics);
  const updateMetrics = useSystemStore((s) => s.updateMetrics);
  const closeWindow = useWindowStore((s) => s.closeWindow);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  const processes = [
    { pid: 1, name: 'saketh-kernel', cpu: '0.8%', mem: '42MB', user: 'root' },
    { pid: 104, name: 'zsh-interactive', cpu: '1.2%', mem: '68MB', user: 'saketh' },
    { pid: 312, name: 'vfs-indexer', cpu: '0.4%', mem: '34MB', user: 'saketh' },
    { pid: 540, name: 'webaudio-synth', cpu: '0.9%', mem: '28MB', user: 'saketh' },
    { pid: 820, name: 'crt-raster-gl', cpu: '2.1%', mem: '110MB', user: 'saketh' }
  ];

  return (
    <div className={styles.monitorContainer}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '8px'
        }}
      >
        <div
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--accent-secondary)' }}
        >
          {systemConfig.osName} Telemetry & Resource Monitor
        </div>
        <button
          onClick={() => closeWindow('systemMonitor')}
          style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
          title="Close Monitor"
        >
          <X size={16} />
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px'
        }}
      >
        {/* CPU Metric */}
        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span
              className={styles.metricName}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Cpu size={14} /> CPU Utilization
            </span>
            <span className={styles.metricVal}>{metrics.cpu}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${metrics.cpu}%` }} />
          </div>
        </div>

        {/* Memory Metric */}
        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span
              className={styles.metricName}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <HardDrive size={14} /> Memory (RAM)
            </span>
            <span className={styles.metricVal}>{metrics.memoryMb} MB / 16 GB</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${(metrics.memoryMb / 1024) * 100}%`,
                background: 'var(--accent-secondary)'
              }}
            />
          </div>
        </div>

        {/* Network Metric */}
        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span
              className={styles.metricName}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Wifi size={14} /> Net I/O Speed
            </span>
            <span className={styles.metricVal}>{metrics.networkKbps} KB/s</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${(metrics.networkKbps / 250) * 100}%`,
                background: 'var(--accent-tertiary)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Process Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}
        >
          ACTIVE KERNEL DAEMONS & THREADS
        </div>
        <div
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '8px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 80px 80px 70px',
              fontSize: '11px',
              color: 'var(--text-dim)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '4px'
            }}
          >
            <span>PID</span>
            <span>COMMAND</span>
            <span>CPU %</span>
            <span>MEM</span>
            <span>USER</span>
          </div>
          {processes.map((proc) => (
            <div
              key={proc.pid}
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 80px 80px 70px',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                padding: '4px 0'
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>{proc.pid}</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{proc.name}</span>
              <span>{proc.cpu}</span>
              <span>{proc.mem}</span>
              <span style={{ color: 'var(--text-dim)' }}>{proc.user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
