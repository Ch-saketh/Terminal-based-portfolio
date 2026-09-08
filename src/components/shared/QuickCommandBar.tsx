import React from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useWindowStore } from '../../state/useWindowStore';
import styles from '../desktop/Desktop.module.css';

export const QuickCommandBar: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const openWindow = useWindowStore((s) => s.openWindow);

  const chips = [
    { label: 'help', cmd: 'help' },
    { label: 'whoami', cmd: 'whoami' },
    { label: 'projects', cmd: 'projects' },
    { label: 'skills', cmd: 'skills' },
    { label: 'experience', cmd: 'experience' },
    { label: 'contact', cmd: 'contact' },
    { label: 'neofetch', cmd: 'neofetch' },
    { label: 'clear', cmd: 'clear' }
  ];

  const handleClick = (cmd: string) => {
    openWindow('terminal');
    executeCommand(cmd);
  };

  return (
    <div className={styles.quickBarContainer} aria-label="Quick Command Suggestions">
      {chips.map((c) => (
        <button key={c.cmd} className={styles.quickChip} onClick={() => handleClick(c.cmd)}>
          {c.label}
        </button>
      ))}
    </div>
  );
};
