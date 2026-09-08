import React from 'react';
import { commandRegistry } from '../../../core/cli/registry';
import { useTerminalStore } from '../../../state/useTerminalStore';
import styles from './Renderers.module.css';

export const HelpRenderer: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const allCommands = commandRegistry.getAllCommands();

  const categories = [
    { key: 'portfolio', label: 'PORTFOLIO & PROFILE COMMANDS' },
    { key: 'navigation', label: 'FILESYSTEM & VIRTUAL POSIX' },
    { key: 'system', label: 'SYSTEM, THEMES & CONFIGURATION' },
    { key: 'easter-egg', label: 'EASTER EGGS & UTILITIES' }
  ] as const;

  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpHeader}>
        <span className={styles.highlightText}>SAKETH.OS</span> Command Manual & Execution Reference
      </div>
      <p className={styles.helpSub}>
        Click any command chip to execute it immediately, or type it into the terminal prompt.
      </p>

      {categories.map(({ key, label }) => {
        const cmds = allCommands.filter((c) => c.category === key);
        if (cmds.length === 0) return null;

        return (
          <div key={key} className={styles.categorySection}>
            <div className={styles.categoryTitle}>{label}</div>
            <div className={styles.commandGrid}>
              {cmds.map((cmd) => (
                <div key={cmd.name} className={styles.commandRow}>
                  <div className={styles.commandTriggerCol}>
                    <button
                      className={styles.commandChip}
                      onClick={() => executeCommand(cmd.name)}
                      title={`Run ${cmd.name}`}
                    >
                      <span className={styles.chipName}>{cmd.name}</span>
                      {cmd.aliases && cmd.aliases.length > 0 && (
                        <span className={styles.chipAlias}>({cmd.aliases.join(', ')})</span>
                      )}
                    </button>
                  </div>
                  <div className={styles.commandDescCol}>
                    <span className={styles.descText}>{cmd.description}</span>
                    <span className={styles.usageText}>$ {cmd.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className={styles.helpFooter}>
        <span>
          Tip: Press <strong>[Tab]</strong> for smart path/flag autocomplete &bull; Press{' '}
          <strong>[Up/Down]</strong> to traverse command history &bull; <strong>Ctrl+L</strong> to
          clear.
        </span>
      </div>
    </div>
  );
};
