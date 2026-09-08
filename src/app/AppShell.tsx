import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HomeView } from '../components/home/HomeView';
import { BiosBootScreen } from '../components/boot/BiosBootScreen';

const MatrixRain = lazy(() =>
  import('../components/shared/MatrixRain').then((m) => ({ default: m.MatrixRain }))
);
const DesignSystemShowcase = lazy(() =>
  import('../components/showcase/DesignSystemShowcase').then((m) => ({
    default: m.DesignSystemShowcase
  }))
);
import { useSystemStore } from '../state/useSystemStore';
import { useAchievementStore } from '../state/useAchievementStore';
import { triggerConfetti } from '../utils/confetti';
import { Trophy, X } from 'lucide-react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const AppShell: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem('saketh_os_booted'));
  });

  const matrixRainActive = useSystemStore((s) => s.matrixRainActive);
  const setMatrixRain = useSystemStore((s) => s.setMatrixRain);
  const crtEnabled = useSystemStore((s) => s.crtEnabled);
  const showcaseActive = useSystemStore((s) => s.showcaseActive);
  const toggleShowcase = useSystemStore((s) => s.toggleShowcase);

  const recentUnlock = useAchievementStore((s) => s.recentUnlock);
  const clearRecentUnlock = useAchievementStore((s) => s.clearRecentUnlock);
  const unlockAchievement = useAchievementStore((s) => s.unlockAchievement);

  // 1. Global Konami Code Listener
  useEffect(() => {
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC dismisses Matrix Rain
      if (e.key === 'Escape' && matrixRainActive) {
        setMatrixRain(false);
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_SEQUENCE[konamiIndex].length === 1
        ? KONAMI_SEQUENCE[konamiIndex].toLowerCase()
        : KONAMI_SEQUENCE[konamiIndex];

      if (key === expected) {
        konamiIndex++;
        if (konamiIndex === KONAMI_SEQUENCE.length) {
          konamiIndex = 0;
          unlockAchievement('konami_code');
          triggerConfetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matrixRainActive, setMatrixRain, unlockAchievement]);

  // 2. Auto-clear recent unlock notification after 5 seconds
  useEffect(() => {
    if (!recentUnlock) return;
    const timer = setTimeout(() => {
      clearRecentUnlock();
    }, 5000);
    return () => clearTimeout(timer);
  }, [recentUnlock, clearRecentUnlock]);

  const handleBootComplete = () => {
    sessionStorage.setItem('saketh_os_booted', 'true');
    setBootCompleted(true);
    unlockAchievement('first_boot');
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
            <Suspense fallback={null}>
              <DesignSystemShowcase onClose={() => toggleShowcase(false)} />
            </Suspense>
          ) : (
            <HomeView />
          )}
        </>
      )}

      {/* 3. Floating Achievement Unlock Toast */}
      {recentUnlock && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#06090e',
            border: '1px solid var(--color-primary-green, #00ff88)',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.25)',
            borderRadius: '6px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            color: '#e6edf3',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: 'rgba(0, 255, 136, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Trophy size={18} color="var(--color-primary-green, #00ff88)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '10px', color: 'var(--color-primary-green, #00ff88)', fontWeight: 700, letterSpacing: '0.05em' }}>
              ACHIEVEMENT UNLOCKED [+ {recentUnlock.xp} XP]
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
              {recentUnlock.title}
            </div>
            <div style={{ fontSize: '11px', color: '#768390' }}>
              [{recentUnlock.code}] {recentUnlock.description}
            </div>
          </div>

          <button
            onClick={clearRecentUnlock}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#768390',
              cursor: 'pointer',
              padding: '4px',
              marginLeft: '8px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 4. Digital Matrix Rain Easter Egg */}
      {matrixRainActive && (
        <div
          onClick={() => setMatrixRain(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9000, cursor: 'pointer' }}
          title="Click or press ESC to exit Matrix"
        >
          <Suspense fallback={null}>
            <MatrixRain />
          </Suspense>
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: '#06090e',
              border: '1px solid var(--color-primary-green, #00ff88)',
              color: 'var(--color-primary-green, #00ff88)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '4px',
              zIndex: 9001
            }}
          >
            [ CLICK OR PRESS ESC TO EXIT MATRIX ]
          </div>
        </div>
      )}

      {/* 5. CRT Scanline & Phosphor Filter */}
      {crtEnabled && <div className="crt-overlay" />}
    </div>
  );
};
