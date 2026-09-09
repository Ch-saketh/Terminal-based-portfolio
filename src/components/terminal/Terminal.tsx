import React, { useEffect, useRef } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useWindowStore } from '../../state/useWindowStore';
import { useSystemStore } from '../../state/useSystemStore';
import { useFileSystemStore } from '../../state/useFileSystemStore';
import { getAutocompleteSuggestions } from '../../core/cli/autocomplete';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { registerAllCommands } from '../../core/commands';
import styles from './Terminal.module.css';

export interface TerminalProps {
  embedded?: boolean;
  showSceneToggle?: boolean;
  onToggleScene?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  embedded = false,
  showSceneToggle = false,
  onToggleScene
}) => {
  const lines = useTerminalStore((s) => s.lines);
  const isExecuting = useTerminalStore((s) => s.isExecuting);
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const initializeBootSequence = useTerminalStore((s) => s.initializeBootSequence);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const setActiveView = useSystemStore((s) => s.setActiveView);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize commands and boot sequence once
  useEffect(() => {
    registerAllCommands();
    initializeBootSequence();

    // Deep link router check (e.g. #/projects/weavly, #/projects, ?project=weavly, ?cmd=whoami)
    const handleRouteParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cmdParam = urlParams.get('cmd');
      const projectParam = urlParams.get('project');
      const hash = window.location.hash.replace(/^#\/?/, '').trim();

      let targetCmd = cmdParam;

      if (!targetCmd && projectParam) {
        targetCmd = `projects ${projectParam}`;
      } else if (!targetCmd && hash) {
        if (hash === 'projects' || hash === 'projects/') {
          targetCmd = 'projects';
        } else if (hash.startsWith('projects/') || hash.startsWith('project/')) {
          const slug = hash.split('/')[1];
          if (slug) {
            targetCmd = `projects ${slug}`;
          } else {
            targetCmd = 'projects';
          }
        } else {
          targetCmd = hash;
        }
      }

      if (targetCmd) {
        setTimeout(() => {
          executeCommand(targetCmd);
        }, 400);
      }
    };

    handleRouteParam();
    window.addEventListener('hashchange', handleRouteParam);
    return () => window.removeEventListener('hashchange', handleRouteParam);
  }, [initializeBootSequence, executeCommand]);

  // Intelligent terminal scroll: keep SectionHeaders in view for rich components, scroll to bottom for standard text CLI streams
  useEffect(() => {
    if (scrollRef.current) {
      const lastLine = lines[lines.length - 1];
      if (lastLine && lastLine.type === 'custom') {
        scrollRef.current.scrollTop = 0;
      } else {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
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
            onClick={() => {
              setActiveView('home');
              closeWindow('terminal');
            }}
            title="Return to Workstation (home)"
            aria-label="Close terminal and return to workstation"
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
          {embedded ? (
            <>
              <button
                className={styles.headerClearBtn}
                onClick={() => useTerminalStore.getState().clearLines()}
                title="Clear terminal output"
              >
                [ ⌫ Clear ]
              </button>
              {showSceneToggle && (
                <button
                  className={styles.headerSceneToggleBtn}
                  onClick={onToggleScene}
                  title="Toggle Workstation Artwork Scene"
                >
                  [ 🎨 Workstation Art ]
                </button>
              )}
            </>
          ) : (
            <button
              className={styles.headerHomeBtn}
              onClick={() => setActiveView('home')}
              title="Return to Workstation (or type 'home')"
            >
              [ 🏠 Return to Workstation ]
            </button>
          )}
          {isExecuting ? (
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} style={{ background: '#ffd166' }} />
              <span className={styles.executingBadge}>EXECUTING</span>
            </div>
          ) : (
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span>ONLINE</span>
            </div>
          )}
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
