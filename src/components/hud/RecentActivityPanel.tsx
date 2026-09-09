import React from 'react';
import { History } from 'lucide-react';
import { useTerminalStore } from '../../state/useTerminalStore';
import styles from './Hud.module.css';

export const RecentActivityPanel: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const activities = [
    { time: '18:22', text: 'Portfolio initialized', cmd: 'help' },
    { time: '17:45', text: 'Updated Weavly project architecture', cmd: 'projects weavly' },
    { time: '16:30', text: 'Practiced DSA (Concurrency & Graphs)', cmd: 'skills' },
    { time: '14:12', text: 'Read research paper on eBPF telemetry', cmd: 'about' },
    { time: '10:01', text: 'Pushed code commit to GitHub', cmd: 'git log --oneline' }
  ];

  return (
    <div className={styles.panelBox}>
      <div className={styles.panelHeader}>
        <History size={13} color="var(--accent-secondary)" />
        <span>RECENT ACTIVITY</span>
      </div>

      <div className={styles.activityList}>
        {activities.map((act, i) => (
          <div
            key={i}
            className={styles.activityRowClickable}
            onClick={() => executeCommand(act.cmd)}
            title={`Run '${act.cmd}' in terminal`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                executeCommand(act.cmd);
              }
            }}
          >
            <span className={styles.activityTime}>&gt; [{act.time}]</span>
            <span className={styles.activityText}>{act.text}</span>
          </div>
        ))}
      </div>

      <div
        className={styles.activityPrompt}
        onClick={() => executeCommand('history')}
        title="View command history"
        style={{ cursor: 'pointer' }}
      >
        <span className={styles.accentPrompt}>&gt; Keep going...</span>
      </div>
    </div>
  );
};
