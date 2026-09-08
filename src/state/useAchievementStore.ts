import { create } from 'zustand';
import { Achievement, AchievementStats } from '../types/achievements';
import { initialAchievements } from '../core/achievements/achievementsData';
import { soundEngine } from '../core/audio/soundEngine';

const STORAGE_KEY = 'saketh_os_achievements_v1';

function getLocalStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

function loadStoredAchievements(): Achievement[] {
  const storage = getLocalStorage();
  if (!storage) return initialAchievements;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return initialAchievements;
    const stored = JSON.parse(raw) as Record<string, { unlocked: boolean; unlockedAt: string }>;
    return initialAchievements.map((item) => {
      const match = stored[item.id] || stored[item.code.toLowerCase()];
      if (match && match.unlocked) {
        return {
          ...item,
          unlocked: true,
          unlockedAt: match.unlockedAt || '2026-09-08'
        };
      }
      return item;
    });
  } catch {
    return initialAchievements;
  }
}

function saveAchievements(achievements: Achievement[]) {
  const storage = getLocalStorage();
  if (!storage) return;
  try {
    const map: Record<string, { unlocked: boolean; unlockedAt?: string | null }> = {};
    achievements.forEach((a) => {
      map[a.id] = { unlocked: a.unlocked, unlockedAt: a.unlockedAt };
    });
    storage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore localStorage write failures in private/isolated modes
  }
}

interface AchievementState {
  achievements: Achievement[];
  recentUnlock: Achievement | null;
  unlockAchievement: (idOrCode: string) => boolean;
  clearRecentUnlock: () => void;
  getStats: () => AchievementStats;
  resetAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: loadStoredAchievements(),
  recentUnlock: null,

  unlockAchievement: (idOrCode: string) => {
    const current = get().achievements;
    const target = current.find(
      (a) => a.id.toLowerCase() === idOrCode.toLowerCase() || a.code.toLowerCase() === idOrCode.toLowerCase()
    );

    if (!target || target.unlocked) {
      return false; // Already unlocked or not found
    }

    const today = new Date().toISOString().split('T')[0];
    const updated = current.map((a) =>
      a.id === target.id ? { ...a, unlocked: true, unlockedAt: today } : a
    );

    saveAchievements(updated);
    soundEngine.playSuccess();

    set({
      achievements: updated,
      recentUnlock: { ...target, unlocked: true, unlockedAt: today }
    });

    return true;
  },

  clearRecentUnlock: () => set({ recentUnlock: null }),

  getStats: () => {
    const all = get().achievements;
    const total = all.length;
    const unlockedCount = all.filter((a) => a.unlocked).length;
    const percent = Math.round((unlockedCount / total) * 100);

    const totalXp = all.reduce((sum, a) => sum + a.xp, 0);
    const earnedXp = all.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

    let rank = 'Junior Explorer';
    if (percent >= 85) rank = 'OS Superuser (Level 4)';
    else if (percent >= 60) rank = 'Principal Systems Architect (Level 3)';
    else if (percent >= 30) rank = 'Terminal Operator (Level 2)';
    else if (percent >= 10) rank = 'Terminal Explorer (Level 1)';

    return {
      total,
      unlockedCount,
      percent,
      totalXp,
      earnedXp,
      rank
    };
  },

  resetAchievements: () => {
    const storage = getLocalStorage();
    if (storage) {
      try {
        storage.removeItem(STORAGE_KEY);
      } catch {
        // Safe ignore
      }
    }
    set({ achievements: initialAchievements, recentUnlock: null });
  }
}));
