import { create } from 'zustand';

export interface WindowInstance {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowState {
  windows: Record<string, WindowInstance>;
  activeWindowId: string | null;
  maxZIndex: number;
  openWindow: (id: string, initialConfig?: Partial<WindowInstance>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowBounds: (id: string, bounds: { position?: { x: number; y: number }; size?: { width: number; height: number } }) => void;
}

const defaultWindows: Record<string, WindowInstance> = {
  terminal: {
    id: 'terminal',
    title: 'saketh@workstation: ~ (zsh)',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 40, y: 50 },
    size: { width: 920, height: 600 }
  },
  systemMonitor: {
    id: 'systemMonitor',
    title: 'System Telemetry & Resource Monitor',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 120, y: 90 },
    size: { width: 620, height: 440 }
  }
};

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: defaultWindows,
  activeWindowId: 'terminal',
  maxZIndex: 12,

  openWindow: (id: string, initialConfig?: Partial<WindowInstance>) => {
    const prev = get().windows;
    const newZ = get().maxZIndex + 1;

    set({
      windows: {
        ...prev,
        [id]: {
          ...(prev[id] || {
            id,
            title: id.toUpperCase(),
            isMaximized: false,
            position: { x: 80, y: 80 },
            size: { width: 700, height: 500 }
          }),
          ...initialConfig,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ
        }
      },
      activeWindowId: id,
      maxZIndex: newZ
    });
  },

  closeWindow: (id: string) => {
    const prev = get().windows;
    if (!prev[id]) return;
    set({
      windows: {
        ...prev,
        [id]: { ...prev[id], isOpen: false }
      },
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId
    });
  },

  minimizeWindow: (id: string) => {
    const prev = get().windows;
    if (!prev[id]) return;
    set({
      windows: {
        ...prev,
        [id]: { ...prev[id], isMinimized: true }
      },
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId
    });
  },

  maximizeWindow: (id: string) => {
    const prev = get().windows;
    if (!prev[id]) return;
    set({
      windows: {
        ...prev,
        [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
      }
    });
  },

  focusWindow: (id: string) => {
    const prev = get().windows;
    if (!prev[id]) return;
    const newZ = get().maxZIndex + 1;
    set({
      windows: {
        ...prev,
        [id]: { ...prev[id], zIndex: newZ, isMinimized: false }
      },
      activeWindowId: id,
      maxZIndex: newZ
    });
  },

  updateWindowBounds: (id: string, bounds) => {
    const prev = get().windows;
    if (!prev[id]) return;
    set({
      windows: {
        ...prev,
        [id]: {
          ...prev[id],
          position: bounds.position || prev[id].position,
          size: bounds.size || prev[id].size
        }
      }
    });
  }
}));
