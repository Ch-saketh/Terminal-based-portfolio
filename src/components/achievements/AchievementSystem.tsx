import React, { useState, useMemo } from 'react';
import { useAchievementStore } from '../../state/useAchievementStore';
import { useTerminalStore } from '../../state/useTerminalStore';
import {
  CheckCircle2,
  HelpCircle,
  Trophy,
  Zap,
  Lock,
  Layers,
  Award,
  Terminal,
  Cpu,
  Monitor,
  Gamepad2,
  BookOpen,
  Command,
  Power,
  ShieldAlert
} from 'lucide-react';
import styles from './AchievementSystem.module.css';

export const AchievementSystem: React.FC = () => {
  const achievements = useAchievementStore((s) => s.achievements);
  const getStats = useAchievementStore((s) => s.getStats);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'secrets'>('all');

  const stats = getStats();

  const filteredList = useMemo(() => {
    return achievements.filter((a) => {
      if (filter === 'unlocked') return a.unlocked;
      if (filter === 'locked') return !a.unlocked;
      if (filter === 'secrets') return a.isSecret;
      return true;
    });
  }, [achievements, filter]);

  const getIcon = (name: string, unlocked: boolean) => {
    const size = 15;
    const color = unlocked ? 'var(--color-primary-green, #00ff88)' : '#535d68';
    switch (name) {
      case 'Power':
        return <Power size={size} color={color} />;
      case 'Layers':
        return <Layers size={size} color={color} />;
      case 'Award':
        return <Award size={size} color={color} />;
      case 'Zap':
        return <Zap size={size} color={color} />;
      case 'ShieldAlert':
        return <ShieldAlert size={size} color={color} />;
      case 'Cpu':
        return <Cpu size={size} color={color} />;
      case 'Terminal':
        return <Terminal size={size} color={color} />;
      case 'Gamepad2':
        return <Gamepad2 size={size} color={color} />;
      case 'Lock':
        return <Lock size={size} color={color} />;
      case 'Monitor':
        return <Monitor size={size} color={color} />;
      case 'BookOpen':
        return <BookOpen size={size} color={color} />;
      case 'Command':
        return <Command size={size} color={color} />;
      default:
        return <Trophy size={size} color={color} />;
    }
  };

  return (
    <div className={styles.achievementContainer} role="region" aria-label="System Achievements & Gamification Engine">
      {/* 1. Header Bar */}
      <div className={styles.topBar}>
        <div className={styles.headerTitle}>
          <span className={styles.systemBadge}>[SYS.ACHIEVEMENT_REGISTRY]</span>
          <span>saketh@portfolio:~/achievements</span>
        </div>

        <div className={styles.rankBadge}>
          RANK: {stats.rank}
        </div>
      </div>

      {/* 2. Progress Overview */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>
            <strong>Progress:</strong> {stats.unlockedCount} / {stats.total} Unlocked ({stats.percent}%)
          </span>
          <span style={{ color: 'var(--color-primary-cyan, #00f2fe)' }}>
            {stats.earnedXp} / {stats.totalXp} XP
          </span>
        </div>

        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} style={{ width: `${stats.percent}%` }} />
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className={styles.filterTabsRow}>
        <span style={{ fontSize: '11px', color: '#768390' }}>Filter:</span>
        <button
          className={`${styles.tabBtn} ${filter === 'all' ? styles.activeTab : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({achievements.length})
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'unlocked' ? styles.activeTab : ''}`}
          onClick={() => setFilter('unlocked')}
        >
          Unlocked [✓] ({stats.unlockedCount})
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'locked' ? styles.activeTab : ''}`}
          onClick={() => setFilter('locked')}
        >
          Locked [?] ({stats.total - stats.unlockedCount})
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'secrets' ? styles.activeTab : ''}`}
          onClick={() => setFilter('secrets')}
        >
          Secrets ({achievements.filter((a) => a.isSecret).length})
        </button>
      </div>

      {/* 4. Achievement Grid */}
      <div className={styles.achievementGrid}>
        {filteredList.map((a) => {
          const isSecretLocked = a.isSecret && !a.unlocked;

          return (
            <div
              key={a.id}
              className={`${styles.achievementCard} ${a.unlocked ? styles.unlockedCard : styles.lockedCard}`}
            >
              <div className={styles.cardTopRow}>
                <div className={`${styles.codeBadge} ${a.unlocked ? styles.codeUnlocked : styles.codeLocked}`}>
                  {a.unlocked ? (
                    <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  ) : (
                    <HelpCircle size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  )}
                  [{a.unlocked ? '✓ ' : '? '}{isSecretLocked ? 'CLASSIFIED' : a.code}]
                </div>

                <div className={styles.xpBadge}>+{a.xp} XP</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getIcon(a.iconName, a.unlocked)}
                <span className={a.unlocked ? styles.cardTitle : styles.cardTitleLocked}>
                  {isSecretLocked ? 'CLASSIFIED SYSTEM SUBSYSTEM' : a.title}
                </span>
              </div>

              <p className={styles.cardDesc}>
                {isSecretLocked
                  ? 'Hidden easter egg functionality. Explore terminal subsystems or execute secret commands to unlock.'
                  : a.description}
              </p>

              {!a.unlocked && (
                <div className={styles.cardHint}>
                  <strong>Hint:</strong> {a.hint}
                </div>
              )}

              <div className={styles.cardFooter}>
                <span>Category: {a.category}</span>
                <span>{a.unlocked ? `Unlocked: ${a.unlockedAt || 'Active'}` : 'Status: Locked'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. CLI Action Quick Chips */}
      <div className={styles.cliActionRow}>
        <span className={styles.cliLabel}>Secret Commands:</span>
        <button className={styles.cliChip} onClick={() => executeCommand('sudo make-me-hireable')}>
          &gt; sudo make-me-hireable
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('neofetch')}>
          &gt; neofetch
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('matrix')}>
          &gt; matrix
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('hack')}>
          &gt; hack
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('konami')}>
          &gt; konami
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('fortune')}>
          &gt; fortune
        </button>
      </div>
    </div>
  );
};
