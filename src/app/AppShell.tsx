import React from 'react';
import { TopBar } from '../components/desktop/TopBar';
import { Dock } from '../components/desktop/Dock';
import { QuickCommandBar } from '../components/shared/QuickCommandBar';
import { Terminal } from '../components/terminal/Terminal';
import { SystemMonitor } from '../components/desktop/SystemMonitor';
import { Window } from '../components/desktop/Window';
import { MatrixRain } from '../components/shared/MatrixRain';
import { DesignSystemShowcase } from '../components/showcase/DesignSystemShowcase';
import { useWindowStore } from '../state/useWindowStore';
import { useSystemStore } from '../state/useSystemStore';

export const AppShell: React.FC = () => {
  const windows = useWindowStore((s) => s.windows);
  const matrixRainActive = useSystemStore((s) => s.matrixRainActive);
  const crtEnabled = useSystemStore((s) => s.crtEnabled);
  const showcaseActive = useSystemStore((s) => s.showcaseActive);
  const toggleShowcase = useSystemStore((s) => s.toggleShowcase);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Operating System Bar */}
      <TopBar />

      {/* Design System Showcase Route/Overlay */}
      {showcaseActive ? (
        <DesignSystemShowcase onClose={() => toggleShowcase(false)} />
      ) : (
        <>
          {/* Matrix Digital Rain Easter Egg */}
          {matrixRainActive && <MatrixRain />}

          {/* Desktop Workspace & Floating Windows */}
          <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* Terminal Window */}
            {windows.terminal && (
              <Window window={windows.terminal}>
                <Terminal />
              </Window>
            )}

            {/* System Monitor Window */}
            {windows.systemMonitor && (
              <Window window={windows.systemMonitor}>
                <SystemMonitor />
              </Window>
            )}
          </main>

          {/* Quick Mobile Command Chips */}
          <QuickCommandBar />

          {/* Bottom Application Dock */}
          <Dock />
        </>
      )}

      {/* CRT Scanline & Curved Phosphor Overlay */}
      {crtEnabled && <div className="crt-overlay" />}
    </div>
  );
};
