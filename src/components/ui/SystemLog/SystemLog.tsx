import React from 'react';
import styles from './SystemLog.module.css';

export type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';

export interface LogEntry {
  id?: string;
  timestamp: string;
  level?: LogLevel;
  subsystem?: string;
  message: string;
}

interface SystemLogProps {
  entries: LogEntry[];
  maxHeight?: string;
  className?: string;
}

export const SystemLog: React.FC<SystemLogProps> = ({
  entries,
  maxHeight = '300px',
  className = ''
}) => {
  return (
    <div className={`${styles.logContainer} ${className}`} style={{ maxHeight }}>
      {entries.map((entry, index) => {
        const level = entry.level || 'info';
        return (
          <div key={entry.id || index} className={`${styles.logRow} ${styles[level]}`}>
            <span className={styles.timestamp}>[{entry.timestamp}]</span>
            {entry.subsystem && <span className={styles.subsystem}>{entry.subsystem}:</span>}
            <span className={styles.levelTag}>[{level.toUpperCase()}]</span>
            <span className={styles.message}>{entry.message}</span>
          </div>
        );
      })}
    </div>
  );
};
