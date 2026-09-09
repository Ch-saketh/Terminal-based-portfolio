import React from 'react';
import { TerminalCursor } from '../ui';
import styles from './HeroTerminalView.module.css';

interface HeroCommandOption {
  cmd: string;
  description: string;
  isHighlighted?: boolean;
}

interface HeroTerminalViewProps {
  /** Called when a quick command or terminal button is clicked */
  onCommandRun?: (cmd: string) => void;
}

const commandNavOptions: HeroCommandOption[] = [
  { cmd: 'help', description: 'Show available commands', isHighlighted: true },
  { cmd: 'about', description: 'Learn more about me' },
  { cmd: 'projects', description: 'Explore my work' },
  { cmd: 'skills', description: 'View my tech stack' },
  { cmd: 'experience', description: 'See my journey' },
  { cmd: 'contact', description: "Let's connect" },
  { cmd: 'clear', description: 'Clear terminal' }
];

export const HeroTerminalView: React.FC<HeroTerminalViewProps> = ({ onCommandRun }) => {
  return (
    <div className={styles.heroContainer}>
      {/* Terminal prompt whoami */}
      <div className={styles.promptLine}>
        <span className={styles.promptUser}>saketh@portfolio</span>
        <span className={styles.promptColon}>:</span>
        <span className={styles.promptTilde}>~</span>
        <span className={styles.promptDollar}>$</span>
        <span className={styles.promptCommand}>whoami</span>
      </div>

      <div className={styles.heroHeader}>
        <div className={styles.imPrefix}>I&apos;m</div>
        <h1 className={styles.developerName}>
          Saketh Chokkapu
          <TerminalCursor shape="block" />
        </h1>
      </div>

      <div className={styles.rolePointsList}>
        <div className={styles.rolePoint}>&gt; Developer</div>
        <div className={styles.rolePoint}>&gt; Problem Solver</div>
        <div className={styles.rolePoint}>&gt; AI Enthusiast</div>
        <div className={styles.rolePoint}>&gt; Lifelong Learner</div>
      </div>

      <p className={styles.heroBioText}>
        I build scalable web applications, explore AI, and turn ideas into real-world solutions.
      </p>

      {/* Interactive Command Navigation List */}
      <div className={styles.commandsListContainer} role="navigation" aria-label="Quick Commands">
        {commandNavOptions.map((opt) => (
          <button
            key={opt.cmd}
            className={`${styles.commandItemBtn} ${opt.isHighlighted ? styles.highlightedCard : ''}`}
            onClick={() => {
              onCommandRun?.(opt.cmd);
            }}
          >
            <div className={styles.cmdCol}>
              <span className={styles.cmdArrow}>&gt;</span>
              <span className={styles.cmdName}>{opt.cmd}</span>
            </div>
            <div className={styles.cmdDesc}>{opt.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
