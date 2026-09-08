import React, { useState } from 'react';
import { HomeView } from '../components/home/HomeView';
import { BiosBootScreen } from '../components/boot/BiosBootScreen';
import { MatrixRain } from '../components/shared/MatrixRain';
import { DesignSystemShowcase } from '../components/showcase/DesignSystemShowcase';
import { useSystemStore } from '../state/useSystemStore';

export const AppShell: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
    // Check if user already booted during this session
    return Boolean(sessionStorage.getItem('saketh_os_booted'));
  });

  const matrixRainActive = useSystemStore((s) => s.matrixRainActive);
  const crtEnabled = useSystemStore((s) => s.crtEnabled);
  const showcaseActive = useSystemStore((s) => s.showcaseActive);
  const toggleShowcase = useSystemStore((s) => s.toggleShowcase);

  const handleBootComplete = () => {
    sessionStorage.setItem('saketh_os_booted', 'true');
    setBootCompleted(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-primary, #0a0e17)'
      }}
    >
      {/* 1. Fast BIOS Boot Screen */}
      {!bootCompleted && <BiosBootScreen onBootComplete={handleBootComplete} />}

      {/* 2. Main SAKETH.OS Experience */}
      {bootCompleted && (
        <>
          {showcaseActive ? (
            <DesignSystemShowcase onClose={() => toggleShowcase(false)} />
          ) : (
            <HomeView />
          )}
        </>
      )}

      {/* 3. Digital Matrix Rain Easter Egg */}
      {matrixRainActive && <MatrixRain />}

      {/* 4. CRT Scanline & Phosphor Filter */}
      {crtEnabled && <div className="crt-overlay" />}
    </div>
  );
};
