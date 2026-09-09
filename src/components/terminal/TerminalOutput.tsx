import React from 'react';
import { TerminalOutputLine } from '../../types/terminal';
import { TerminalPrompt } from './TerminalPrompt';
import { useTerminalStore } from '../../state/useTerminalStore';
import styles from './Terminal.module.css';

interface TerminalOutputProps {
  lines: TerminalOutputLine[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  const isExecuting = useTerminalStore((s) => s.isExecuting);

  return (
    <div className={styles.outputStreamContainer} aria-live="polite">
      {lines.map((line) => {
        if (line.type === 'banner') {
          return (
            <div key={line.id} className={styles.bannerRow}>
              <pre className={styles.bannerAscii}>{line.content}</pre>
            </div>
          );
        }

        if (line.type === 'command') {
          return (
            <div key={line.id} className={styles.commandEchoRow}>
              <TerminalPrompt cwd={line.cwd || '/home/saketh'} />
              <span className={styles.echoedText}>{line.content}</span>
            </div>
          );
        }

        if (line.type === 'error') {
          return (
            <div key={line.id} className={styles.errorRow}>
              <span className={styles.errorPrefix}>[ERROR]</span>
              <span>{line.content}</span>
            </div>
          );
        }

        if (line.type === 'success') {
          return (
            <div key={line.id} className={styles.successRow}>
              <span className={styles.successPrefix}>[SUCCESS]</span>
              <span>{line.content}</span>
            </div>
          );
        }

        if (line.type === 'info') {
          return (
            <div key={line.id} className={styles.infoRow}>
              <pre className={styles.rawTextOutput}>{line.content}</pre>
            </div>
          );
        }

        if (line.type === 'system') {
          return (
            <div key={line.id} className={styles.systemRow}>
              <span className={styles.systemTag}>SYSTEM:</span>
              <span>{line.content}</span>
            </div>
          );
        }

        if (line.type === 'custom' && line.component) {
          return <div key={line.id}>{line.component}</div>;
        }

        // Standard text output
        return (
          <div key={line.id} className={styles.standardRow}>
            <pre className={styles.rawTextOutput}>{line.content}</pre>
          </div>
        );
      })}

      {isExecuting && (
        <div className={styles.executingRow} aria-live="assertive">
          <span className={styles.spinnerIcon}>◐</span>
          <span className={styles.executingText}>Executing kernel command...</span>
        </div>
      )}
    </div>
  );
};

