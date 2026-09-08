import React from 'react';
import { systemConfig } from '../../content/config';
import styles from './Terminal.module.css';

interface TerminalPromptProps {
  cwd: string;
  isRoot?: boolean;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({ cwd, isRoot = false }) => {
  // Format /home/saketh to ~
  let displayPath = cwd;
  if (displayPath.startsWith('/home/saketh')) {
    displayPath = `~${displayPath.slice('/home/saketh'.length)}`;
  }

  return (
    <div className={styles.promptContainer}>
      <span className={styles.promptUser}>{systemConfig.username}</span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptHost}>os</span>
      <span className={styles.promptColon}>:</span>
      <span className={styles.promptPath}>{displayPath || '/'}</span>
      <span className={styles.promptChar}>{isRoot ? '#' : systemConfig.defaultPromptChar}</span>
    </div>
  );
};
