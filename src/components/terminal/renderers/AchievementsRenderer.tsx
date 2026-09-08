import React from 'react';
import { Trophy, Award, Star, Flame } from 'lucide-react';
import styles from './Renderers.module.css';

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  icon: 'trophy' | 'award' | 'star' | 'flame';
  highlight?: boolean;
}

const achievementsData: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Top 1% Global Open Source Contributor',
    category: 'Open Source',
    year: '2025',
    description:
      'Recognized for high-impact contributions to cloud-native eBPF and distributed systems tooling.',
    icon: 'trophy',
    highlight: true
  },
  {
    id: 'ach-2',
    title: 'Distributed System Scale Excellence Award',
    category: 'Engineering Architecture',
    year: '2024',
    description:
      'Architected event pipeline sustaining 1.8B+ daily transactions with zero data loss.',
    icon: 'award',
    highlight: true
  },
  {
    id: 'ach-3',
    title: 'Hackathon Grand Winner — Cloud Native Track',
    category: 'Innovation',
    year: '2023',
    description: 'Constructed real-time distributed microservice mesh telemetry proxy in 36 hours.',
    icon: 'flame'
  },
  {
    id: 'ach-4',
    title: 'Author of 5+ Production RFCs',
    category: 'Systems Design',
    year: '2022',
    description:
      'Established organization-wide idempotency, event consistency, and disaster recovery standards.',
    icon: 'star'
  }
];

export const AchievementsRenderer: React.FC = () => {
  const getIcon = (type: AchievementItem['icon']) => {
    switch (type) {
      case 'trophy':
        return <Trophy size={16} color="var(--accent-warning)" />;
      case 'award':
        return <Award size={16} color="var(--accent-primary)" />;
      case 'flame':
        return <Flame size={16} color="var(--accent-error)" />;
      default:
        return <Star size={16} color="var(--accent-secondary)" />;
    }
  };

  return (
    <div className={styles.experienceContainer}>
      <div className={styles.helpHeader}>
        <span className={styles.highlightText}>ENGINEERING HONORS</span> & Key Achievements
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {achievementsData.map((ach) => (
          <div key={ach.id} className={styles.expCard}>
            <div className={styles.expCardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {getIcon(ach.icon)}
                <span className={styles.expRole}>{ach.title}</span>
              </div>
              <div className={styles.expMeta}>
                <span className={styles.badgeTag}>{ach.category}</span>
                <span>{ach.year}</span>
              </div>
            </div>
            <div className={styles.expSummary}>{ach.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
