import React, { useEffect, useRef } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useWindowStore } from '../../state/useWindowStore';
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

  return (
    <div className={styles.terminalWrapper}>
      {/* Terminal Title Bar with macOS/POSIX buttons */}
      <div className={styles.terminalHeader}>
        <div className={styles.trafficLights}>
          <button
            className={`${styles.trafficDot} ${styles.dotClose}`}
            onClick={() => closeWindow('terminal')}
            title="Close Terminal"
          />
          <button
            className={`${styles.trafficDot} ${styles.dotMin}`}
            onClick={() => minimizeWindow('terminal')}
            title="Minimize"
          />
          <button
            className={`${styles.trafficDot} ${styles.dotMax}`}
            onClick={() => maximizeWindow('terminal')}
            title="Maximize / Restore"
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
    </div>
  );
};
