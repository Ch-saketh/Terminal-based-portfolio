import React from 'react';
import { History } from 'lucide-react';
import styles from './Hud.module.css';

export const RecentActivityPanel: React.FC = () => {
  const activities = [
    { time: '18:22', text: 'Portfolio initialized' },
    { time: '17:45', text: 'Updated Weavly project architecture' },
    { time: '16:30', text: 'Practiced DSA (Concurrency & Graphs)' },
    { time: '14:12', text: 'Read research paper on eBPF telemetry' },
    { time: '10:01', text: 'Pushed code commit to GitHub' }
  ];

  return (
    <div className={styles.panelBox}>
      <div className={styles.panelHeader}>
        <History size={13} color="var(--accent-secondary)" />
        <span>RECENT ACTIVITY</span>
      </div>

      <div className={styles.activityList}>
        {activities.map((act, i) => (
          <div key={i} className={styles.activityRow}>
            <span className={styles.activityTime}>&gt; [{act.time}]</span>
            <span className={styles.activityText}>{act.text}</span>
          </div>
        ))}
      </div>

      <div className={styles.activityPrompt}>
        <span className={styles.accentPrompt}>&gt; Keep going...</span>
      </div>
    </div>
  );
};
