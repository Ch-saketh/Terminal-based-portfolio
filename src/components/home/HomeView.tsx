import React, { useState, useEffect, useRef } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { HeroTerminalView } from '../terminal/HeroTerminalView';
import { Terminal } from '../terminal/Terminal';
import { WorkstationScene } from '../workstation/WorkstationScene';
import { SystemMetricsPanel } from '../hud/SystemMetricsPanel';
import { RecentActivityPanel } from '../hud/RecentActivityPanel';
import { QuickAccessPanel } from '../hud/QuickAccessPanel';
import { NowPlayingPanel } from '../hud/NowPlayingPanel';
import { getAutocompleteSuggestions } from '../../core/cli/autocomplete';
import { soundEngine } from '../../core/audio/soundEngine';
import styles from './HomeView.module.css';

export const HomeView: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const input = useTerminalStore((s) => s.input);
  const setInput = useTerminalStore((s) => s.setInput);
  const navigateHistory = useTerminalStore((s) => s.navigateHistory);

  const [activeTab, setActiveTab] = useState('home');
  const [dateTimeString, setDateTimeString] = useState('');
  const [rightViewMode, setRightViewMode] = useState<'terminal' | 'scene'>('terminal');

  const inputRef = useRef<HTMLInputElement>(null);

  // Live formatted clock matching reference (e.g. Tue, 09 Sep 2025 18:24)
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const dayNum = String(now.getDate()).padStart(2, '0');
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setDateTimeString(`${dayName}, ${dayNum} ${monthName} ${year}  ${hours}:${minutes}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    { id: 'home', num: '01', label: 'home', cmd: 'home' },
    { id: 'about', num: '02', label: 'about', cmd: 'about' },
    { id: 'projects', num: '03', label: 'projects', cmd: 'projects' },
    { id: 'skills', num: '04', label: 'skills', cmd: 'skills' },
    { id: 'experience', num: '05', label: 'experience', cmd: 'experience' },
    { id: 'contact', num: '06', label: 'contact', cmd: 'contact' }
  ];

  const handleTabClick = (tab: typeof navTabs[0]) => {
    setActiveTab(tab.id);
    setRightViewMode('terminal');
    if (tab.id === 'home') {
      executeCommand('whoami', { clearBefore: true, noEcho: true });
    } else {
      executeCommand(tab.cmd, { clearBefore: true, noEcho: true });
    }
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setRightViewMode('terminal');
    if (cmd === 'clear') {
      useTerminalStore.getState().clearLines();
      setInput('');
      return;
    }

    if (cmd === 'home' || cmd === 'exit' || cmd === 'gui') {
      setActiveTab('home');
      executeCommand('whoami', { clearBefore: true, noEcho: true });
      setInput('');
      return;
    }

    const baseCmd = cmd.toLowerCase().split(' ')[0];
    if (['about', 'projects', 'skills', 'experience', 'contact', 'help', 'whoami'].includes(baseCmd)) {
      setActiveTab(baseCmd);
      executeCommand(cmd, { clearBefore: true, noEcho: true });
    } else {
      executeCommand(cmd);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundEngine.playKeyClick();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const res = getAutocompleteSuggestions(input, '/home/saketh');
      if (res && res.matches.length > 0) {
        setInput(res.suggestion);
      }
    }
  };

  return (
    <div className={styles.homeViewport}>
      {/* 1. Master OS Header Bar */}
      <header className={styles.osHeader}>
        <div className={styles.osHeaderLeft}>
          <div className={styles.trafficLights} aria-hidden="true">
            <span className={styles.trafficDotRed} />
            <span className={styles.trafficDotYellow} />
            <span className={styles.trafficDotGreen} />
          </div>
          <span className={styles.promptLocation}>saketh@portfolio:~</span>
        </div>

        <nav className={styles.navTabsContainer} aria-label="Navigation Tabs">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navTabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <span className={styles.tabBrace}>[</span>
              <span className={styles.tabNum}>{tab.num} </span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabBrace}>]</span>
            </button>
          ))}
        </nav>

        <div className={styles.clockStatusBlock}>
          <span className={styles.timeDisplay}>{dateTimeString}</span>
        </div>
      </header>

      {/* 2. Main Hero Split Workspace */}
      <main className={styles.mainWorkspaceGrid}>
        {/* Left Column: Top Info Card + Terminal Whoami & Commands */}
        <div className={styles.leftColumn}>
          {/* System Info Box & Quote Card */}
          <div className={styles.systemHeaderCard}>
            <div className={styles.sysMetaLeft}>
              <div className={styles.sysMetaRow}>
                <span className={styles.sysKey}>OS</span>
                <span className={styles.sysVal}>Saketh.OS v1.0.0</span>
              </div>
              <div className={styles.sysMetaRow}>
                <span className={styles.sysKey}>USER</span>
                <span className={styles.sysVal}>saketh</span>
              </div>
              <div className={styles.sysMetaRow}>
                <span className={styles.sysKey}>HOST</span>
                <span className={styles.sysVal}>portfolio.dev</span>
              </div>
              <div className={styles.sysMetaRow}>
                <span className={styles.sysKey}>LOCATION</span>
                <span className={styles.sysVal}>Hyderabad, India</span>
              </div>
              <div className={styles.sysMetaRow}>
                <span className={styles.sysKey}>STATUS</span>
                <span className={styles.sysValOnline}>
                  <span className={styles.onlineDotSmall} /> Online
                </span>
              </div>
            </div>

            <div className={styles.sysQuoteRight}>
              <div className={styles.quoteText}>&ldquo;Ideas don&apos;t work unless you do.&rdquo;</div>
              <div className={styles.quoteAuthor}>— Saketh</div>
            </div>
          </div>

          <HeroTerminalView
            onCommandRun={(cmd) => {
              setRightViewMode('terminal');
              if (cmd === 'clear') {
                useTerminalStore.getState().clearLines();
                return;
              }
              setActiveTab(cmd);
              executeCommand(cmd, { clearBefore: true, noEcho: true });
            }}
          />
        </div>

        {/* Right Column: Real Interactive Terminal (projects all touched commands) */}
        <div className={styles.rightColumn}>
          {rightViewMode === 'terminal' ? (
            <Terminal
              embedded
              showSceneToggle
              onToggleScene={() => setRightViewMode('scene')}
            />
          ) : (
            <div className={styles.sceneWrapper}>
              <div className={styles.sceneFloatingBar}>
                <button
                  className={styles.sceneSwitchBtn}
                  onClick={() => setRightViewMode('terminal')}
                  title="Switch to Real Terminal"
                >
                  &gt;_ Switch to Real Terminal
                </button>
              </div>
              <WorkstationScene />
            </div>
          )}
        </div>
      </main>

      {/* 3. Bottom HUD Matrix Panels */}
      <section className={styles.hudMatrixGrid} aria-label="HUD Panels">
        <SystemMetricsPanel />
        <RecentActivityPanel />
        <QuickAccessPanel />
        <NowPlayingPanel />
      </section>

      {/* 4. Bottom Command Prompt Shell */}
      <footer className={styles.terminalFooterBar} onClick={() => inputRef.current?.focus()}>
        <div className={styles.footerPromptLeft}>
          <div className={styles.promptPrefix}>
            <span className={styles.footerPromptUser}>saketh@portfolio</span>
            <span className={styles.footerColon}>:</span>
            <span className={styles.footerPath}>~</span>
            <span className={styles.footerPromptChar}>$</span>
          </div>

          <form onSubmit={handlePromptSubmit} className={styles.promptForm}>
            <input
              ref={inputRef}
              type="text"
              className={styles.promptInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              placeholder="Type a command (e.g. 'help', 'about', 'projects', 'skills')..."
            />
          </form>
        </div>

        <div className={styles.footerRightMeta}>
          Made with <span className={styles.heartIcon}>&lt;3</span> and a lot of coffee. &nbsp;|&nbsp; Hyderabad, India
        </div>
      </footer>
    </div>
  );
};
