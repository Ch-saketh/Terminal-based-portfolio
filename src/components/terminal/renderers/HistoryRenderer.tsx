import React from 'react';
import styles from './Renderers.module.css';

interface HistoryRendererProps {
  history: string[];
}

export const HistoryRenderer: React.FC<HistoryRendererProps> = ({ history }) => {
  if (history.length === 0) {
    return <div className={styles.descText}>(No previous command history recorded)</div>;
  }

  return (
    <div style={{ margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
      <div className={styles.helpHeader} style={{ marginBottom: 6 }}>
        <span className={styles.highlightText}>SESSION COMMAND BUFFER</span> ({history.length}{' '}
        executions)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {history.map((cmd, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: 'var(--text-dim)', width: '36px', textAlign: 'right' }}>
              {idx + 1}
            </span>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
