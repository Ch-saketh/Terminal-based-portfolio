import { create } from 'zustand';
import { soundEngine } from '../core/audio/soundEngine';

export type SystemTheme = 'emerald' | 'cyan' | 'amber' | 'purple';
export type ActiveView = 'home' | 'terminal' | 'showcase';

interface SystemState {
  theme: SystemTheme;
  activeView: ActiveView;
  soundEnabled: boolean;
  crtEnabled: boolean;
  matrixRainActive: boolean;
  showcaseActive: boolean;
  bootSequenceFinished: boolean;
  metrics: {
    cpu: number;
    memoryMb: number;
    networkKbps: number;
    uptimeSeconds: number;
  };
  setTheme: (theme: SystemTheme) => void;
  setActiveView: (view: ActiveView) => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  setMatrixRain: (active: boolean) => void;
  toggleShowcase: (active?: boolean) => void;
  completeBoot: () => void;
  updateMetrics: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  theme: 'emerald',
  activeView: 'home',
  soundEnabled: true,
  crtEnabled: true,
  matrixRainActive: false,
  showcaseActive: false,
  bootSequenceFinished: false,
  metrics: {
    cpu: 14,
    memoryMb: 384,
    networkKbps: 42,
    uptimeSeconds: 1420
  },
  setTheme: (theme: SystemTheme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  setActiveView: (activeView: ActiveView) => {
    set({ activeView });
  },
  toggleSound: () => {
    const next = !get().soundEnabled;
    soundEngine.setMuted(!next);
    set({ soundEnabled: next });
  },
  toggleCrt: () => {
    set({ crtEnabled: !get().crtEnabled });
  },
  setMatrixRain: (active: boolean) => {
    set({ matrixRainActive: active });
  },
  toggleShowcase: (active?: boolean) => {
    set({ showcaseActive: active !== undefined ? active : !get().showcaseActive });
  },
  completeBoot: () => {
    set({ bootSequenceFinished: true });
  },
  updateMetrics: () => {
    const prev = get().metrics;
    set({
      metrics: {
        cpu: Math.min(95, Math.max(8, Math.round(prev.cpu + (Math.random() * 8 - 4)))),
        memoryMb: Math.min(
          800,
          Math.max(300, Math.round(prev.memoryMb + (Math.random() * 12 - 6)))
        ),
        networkKbps: Math.min(
          250,
          Math.max(10, Math.round(prev.networkKbps + (Math.random() * 20 - 10)))
        ),
        uptimeSeconds: prev.uptimeSeconds + 1
      }
    });
  }
}));
