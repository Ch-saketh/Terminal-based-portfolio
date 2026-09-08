import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../core/audio/soundEngine';
import styles from './BiosBootScreen.module.css';

interface BiosBootScreenProps {
  onBootComplete: () => void;
}

export const BiosBootScreen: React.FC<BiosBootScreenProps> = ({ onBootComplete }) => {
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = [
    'Initializing SAKETH.OS Kernel Architecture...',
    'Checking POSIX virtual memory subsystem [OK]',
    'Loading developer profile & bio schemas [OK]',
    'Mounting /home/saketh/projects & /skills [OK]',
    'Connecting WebAudio procedural sound synthesizer [OK]',
    'Starting interactive terminal shell (zsh) [OK]',
    'SAKETH.OS Ready.'
  ];

  useEffect(() => {
    soundEngine.playBootChord();

    const interval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < bootMessages.length - 1) {
          soundEngine.playKeyClick();
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onBootComplete();
          }, 250);
          return prev;
        }
      });
    }, 140);

    return () => clearInterval(interval);
  }, [onBootComplete, bootMessages.length]);

  const handleSkip = () => {
    onBootComplete();
  };

  return (
    <div className={styles.biosOverlay} onClick={handleSkip} role="dialog" aria-label="System Boot Sequence">
      <div className={styles.biosContainer}>
        <div className={styles.biosHeader}>
          <span>SAKETH.OS BIOS v2.4.0 (x86_64-WebAssembly)</span>
          <span className={styles.skipHint}>[ Click or press any key to skip ]</span>
        </div>

        <div className={styles.logList}>
          {bootMessages.slice(0, bootStep + 1).map((msg, i) => {
            const isOk = msg.includes('[OK]');
            const isReady = msg.includes('Ready');
            return (
              <div key={i} className={styles.logLine}>
                <span className={styles.checkPrefix}>
                  {isOk ? '[  OK  ]' : isReady ? '[ READY ]' : '[ START ]'}
                </span>
                <span className={styles.msgText}>{msg}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.cursorRow}>
          <span className={styles.promptChar}>&gt;</span>
          <span className={styles.blinkingCursor} />
        </div>
      </div>
    </div>
  );
};
