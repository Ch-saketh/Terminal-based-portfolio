import React from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { TerminalCursor } from '../ui';
import styles from './HeroTerminalView.module.css';

interface HeroCommandOption {
  cmd: string;
  description: string;
  isDefault?: boolean;
}

const commandNavOptions: HeroCommandOption[] = [
  { cmd: 'help', description: 'Show available commands', isDefault: true },
  { cmd: 'about', description: 'Learn more about me' },
  { cmd: 'projects', description: 'Explore my work' },
  { cmd: 'skills', description: 'View my tech stack' },
  { cmd: 'experience', description: 'See my journey' },
  { cmd: 'contact', description: "Let's connect" },
  { cmd: 'clear', description: 'Clear terminal' }
];

export const HeroTerminalView: React.FC = () => {
  const lines = useTerminalStore((s) => s.lines);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  // If there are executed output lines beyond boot, show stream
  const hasExecutedCustomCommand = lines.some(
    (l) => l.type === 'custom' || l.type === 'error' || l.type === 'success' || (l.type === 'command' && l.content !== 'whoami')
  );

  return (
    <div className={styles.heroContainer}>
      {/* If user executed commands, render output stream */}
      {hasExecutedCustomCommand ? (
        <div className={styles.outputView}>
          <TerminalOutput lines={lines} />
          <TerminalInput />
        </div>
      ) : (
        /* Default Hero Introduction Layout matching reference */
        <div className={styles.heroIntroContent}>
          <div className={styles.whoamiPromptRow}>
            <span className={styles.promptUser}>saketh@portfolio</span>
            <span className={styles.promptColon}>:</span>
            <span className={styles.promptPath}>~</span>
            <span className={styles.promptChar}>$</span>
            <span className={styles.whoamiCmd}>whoami</span>
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
          <div className={styles.commandsListContainer}>
            {commandNavOptions.map((opt) => (
              <button
                key={opt.cmd}
                className={`${styles.commandItemBtn} ${opt.isDefault ? styles.defaultHighlight : ''}`}
                onClick={() => executeCommand(opt.cmd)}
              >
                <div className={styles.cmdCol}>
                  <span className={styles.cmdArrow}>&gt;</span>
                  <span className={styles.cmdName}>{opt.cmd}</span>
                </div>
                <div className={styles.cmdDesc}>{opt.description}</div>
              </button>
            ))}
          </div>

          {/* Bottom inline input prompt */}
          <div className={styles.bottomInputWrap}>
            <TerminalInput />
          </div>
        </div>
      )}
    </div>
  );
};
