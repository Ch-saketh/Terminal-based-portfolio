import React, { useState, useEffect } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useSystemStore } from '../../state/useSystemStore';
import { SystemHudCard } from '../hud/SystemHudCard';
import { HeroTerminalView } from '../terminal/HeroTerminalView';
import { WorkstationScene } from '../workstation/WorkstationScene';
import { SystemMetricsPanel } from '../hud/SystemMetricsPanel';
import { RecentActivityPanel } from '../hud/RecentActivityPanel';
import { QuickAccessPanel } from '../hud/QuickAccessPanel';
import { NowPlayingPanel } from '../hud/NowPlayingPanel';
import styles from './HomeView.module.css';

export const HomeView: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const clearLines = useTerminalStore((s) => s.clearLines);
  const lines = useTerminalStore((s) => s.lines);
  const toggleShowcase = useSystemStore((s) => s.toggleShowcase);

  const [activeTab, setActiveTab] = useState('home');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      setTimeString(`${day}, ${date} ${month} ${year}   ${time}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    { id: 'home', num: '01', label: 'home', cmd: 'whoami' },
    { id: 'about', num: '02', label: 'about', cmd: 'about' },
    { id: 'projects', num: '03', label: 'projects', cmd: 'projects' },
    { id: 'skills', num: '04', label: 'skills', cmd: 'skills' },
    { id: 'experience', num: '05', label: 'experience', cmd: 'experience' },
    { id: 'contact', num: '06', label: 'contact', cmd: 'contact' }
  ];

  const handleTabClick = (tab: typeof navTabs[0]) => {
    setActiveTab(tab.id);
    if (tab.id === 'home') {
      clearLines();
    } else {
      executeCommand(tab.cmd);
    }
  };

  return (
    <div className={styles.homeViewport}>
      {/* 1. Master OS Header Bar */}
      <header className={styles.osHeader}>
        <div className={styles.osHeaderLeft}>
          <div className={styles.trafficDots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.promptLocation}>saketh@portfolio:~</span>
        </div>

        <nav className={styles.navTabsContainer} aria-label="Terminal Tabs">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navTabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <span className={styles.tabBrace}>[</span>
              <span className={styles.tabNum}>{tab.num}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabBrace}>]</span>
            </button>
          ))}
          <button
            className={styles.navTabBtn}
            onClick={() => toggleShowcase(true)}
            title="Design System Showcase"
          >
            <span className={styles.tabBrace}>[</span>
            <span className={styles.tabNum}>07</span>
            <span className={styles.tabLabel}>design-system</span>
            <span className={styles.tabBrace}>]</span>
          </button>
        </nav>

        <div className={styles.osHeaderRight}>
          <span className={styles.timeDisplay}>{timeString}</span>
        </div>
      </header>

      {/* 2. Main Hero Workspace Split */}
      <main className={styles.mainWorkspaceGrid}>
        {/* Left Column: System HUD Metadata & Terminal Hero */}
        <div className={styles.leftColumn}>
          <SystemHudCard />
          <HeroTerminalView />
        </div>

        {/* Right Column: Workstation Visual Environment */}
        <div className={styles.rightColumn}>
          <WorkstationScene />
        </div>
      </main>

      {/* 3. Bottom HUD Matrix (4 Cards) */}
      <section className={styles.bottomHudMatrix} aria-label="System Dashboards">
        <SystemMetricsPanel />
        <RecentActivityPanel />
        <QuickAccessPanel />
        <NowPlayingPanel />
      </section>

      {/* 4. Bottom Terminal Prompt Footer */}
      <footer className={styles.terminalFooterBar}>
        <div className={styles.footerPrompt}>
          <span className={styles.footerPromptUser}>saketh@portfolio</span>
          <span className={styles.footerColon}>:</span>
          <span className={styles.footerPath}>~</span>
          <span className={styles.footerPromptChar}>$</span>
          <span className={styles.footerText}>
            {lines.length > 0 ? lines[lines.length - 1]?.content || '' : 'Ready for execution'}
          </span>
          <span className={styles.footerCursor} />
        </div>

        <div className={styles.footerMeta}>
          <span>Made with &lt;3 and a lot of coffee. &bull; Hyderabad, India</span>
        </div>
      </footer>
    </div>
  );
};
