import React, { useEffect, useRef } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useWindowStore } from '../../state/useWindowStore';
import { useFileSystemStore } from '../../state/useFileSystemStore';
import { getAutocompleteSuggestions } from '../../core/cli/autocomplete';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { registerAllCommands } from '../../core/commands';
import styles from './Terminal.module.css';

export const Terminal: React.FC = () => {
  const lines = useTerminalStore((s) => s.lines);
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const initializeBootSequence = useTerminalStore((s) => s.initializeBootSequence);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize commands and boot sequence once
  useEffect(() => {
    registerAllCommands();
    initializeBootSequence();

    // Deep link router check (e.g. #/projects or ?cmd=whoami)
    const handleRouteParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cmdParam = urlParams.get('cmd');
      const hash = window.location.hash.replace(/^#\/?/, '');

      const target = cmdParam || hash;
      if (target) {
        setTimeout(() => {
          executeCommand(target);
        }, 400);
      }
    };

    handleRouteParam();
  }, [initializeBootSequence, executeCommand]);

  // Keep scroll locked to bottom when new output renders
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleMobileTab = () => {
    const input = useTerminalStore.getState().input;
    const cwd = useFileSystemStore.getState().cwd;
    const res = getAutocompleteSuggestions(input, cwd);
    if (res && res.matches.length > 0) {
      useTerminalStore.getState().setInput(res.suggestion);
    }
  };

  return (
    <div className={styles.terminalWrapper} role="region" aria-label="Interactive Terminal Command Shell">
      {/* Terminal Title Bar with macOS/POSIX buttons */}
      <div className={styles.terminalHeader}>
        <div className={styles.trafficLights}>
          <button
            className={`${styles.trafficDot} ${styles.dotClose}`}
            onClick={() => closeWindow('terminal')}
            title="Close Terminal"
            aria-label="Close terminal window"
          />
          <button
            className={`${styles.trafficDot} ${styles.dotMin}`}
            onClick={() => minimizeWindow('terminal')}
            title="Minimize"
            aria-label="Minimize terminal window"
          />
          <button
            className={`${styles.trafficDot} ${styles.dotMax}`}
            onClick={() => maximizeWindow('terminal')}
            title="Maximize / Restore"
            aria-label="Maximize terminal window"
          />
        </div>

        <div className={styles.terminalTitle}>saketh@workstation: ~ (zsh)</div>

        <div className={styles.terminalMeta}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <span>ONLINE</span>
          </div>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Terminal Canvas Stream */}
      <div ref={scrollRef} className={styles.terminalBody}>
        <TerminalOutput lines={lines} />
        <TerminalInput />
      </div>

      {/* Mobile Touch Navigation Keypad Bar */}
      <div className={styles.mobileKeypadRow} aria-label="Terminal touch navigation shortcut keys">
        <button className={styles.mobileKeyBtn} onClick={handleMobileTab} title="Autocomplete current input">
          TAB
        </button>
        <button
          className={styles.mobileKeyBtn}
          onClick={() => useTerminalStore.getState().navigateHistory('up')}
          title="Previous command in history"
        >
          ↑
        </button>
        <button
          className={styles.mobileKeyBtn}
          onClick={() => useTerminalStore.getState().navigateHistory('down')}
          title="Next command in history"
        >
          ↓
        </button>
        <button className={styles.mobileKeyBtn} onClick={() => executeCommand('help')}>
          help
        </button>
        <button className={styles.mobileKeyBtn} onClick={() => executeCommand('whoami')}>
          whoami
        </button>
        <button className={styles.mobileKeyBtn} onClick={() => executeCommand('projects')}>
          projects
        </button>
        <button className={styles.mobileKeyBtn} onClick={() => executeCommand('skills')}>
          skills
        </button>
        <button className={styles.mobileKeyBtn} onClick={() => executeCommand('git log --oneline')}>
          git log
        </button>
        <button
          className={styles.mobileKeyBtn}
          onClick={() => useTerminalStore.getState().clearLines()}
          title="Clear screen"
        >
          clear
        </button>
      </div>
    </div>
  );
};
