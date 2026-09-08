import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AchievementSystem } from '../../src/components/achievements/AchievementSystem';
import { useAchievementStore } from '../../src/state/useAchievementStore';
import { easterEggCommands } from '../../src/core/commands/easterEggs';
import { CommandExecutionContext } from '../../src/types/terminal';

describe('Phase 9 — Gamification Engine & Secret Commands', () => {
  const dummyContext = (args: string[] = []): CommandExecutionContext => ({
    command: 'sudo',
    rawInput: `sudo ${args.join(' ')}`,
    args,
    flags: {},
    cwd: '/home/saketh',
    navigateVfs: () => ({ success: true }),
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  });

  beforeEach(() => {
    useAchievementStore.getState().resetAchievements();
  });

  it('calculates progress, XP, and rank accurately in useAchievementStore', () => {
    const store = useAchievementStore.getState();
    const initialStats = store.getStats();

    expect(initialStats.total).toBe(12);
    expect(initialStats.unlockedCount).toBe(1); // FIRST_BOOT is unlocked by default

    // Unlock builder and hackathon
    store.unlockAchievement('builder');
    store.unlockAchievement('hackathon');

    const updatedStats = useAchievementStore.getState().getStats();
    expect(updatedStats.unlockedCount).toBe(3);
    expect(updatedStats.percent).toBe(25);
    expect(updatedStats.earnedXp).toBe(300);
  });

  it('executes sudo make-me-hireable and unlocks root_access achievement', () => {
    const sudoDef = easterEggCommands.find((c) => c.name === 'sudo');
    expect(sudoDef).toBeDefined();

    const res = sudoDef?.execute(dummyContext(['make-me-hireable']));
    expect(res?.type).toBe('custom');
    expect(res?.component).toBeDefined();

    const rootAccessAchievement = useAchievementStore
      .getState()
      .achievements.find((a) => a.id === 'root_access');
    expect(rootAccessAchievement?.unlocked).toBe(true);
  });

  it('executes neofetch and unlocks explorer achievement', () => {
    const neofetchDef = easterEggCommands.find((c) => c.name === 'neofetch');
    expect(neofetchDef).toBeDefined();

    const res = neofetchDef?.execute(dummyContext());
    expect(res?.type).toBe('custom');

    const explorerAchievement = useAchievementStore
      .getState()
      .achievements.find((a) => a.id === 'explorer');
    expect(explorerAchievement?.unlocked).toBe(true);
  });

  it('executes hack and unlocks system_auditor achievement', () => {
    const hackDef = easterEggCommands.find((c) => c.name === 'hack');
    expect(hackDef).toBeDefined();

    const res = hackDef?.execute(dummyContext());
    expect(res?.type).toBe('info');
    expect(res?.text).toContain('Zero-day vulnerability audit PASSED');

    const auditorAchievement = useAchievementStore
      .getState()
      .achievements.find((a) => a.id === 'system_auditor');
    expect(auditorAchievement?.unlocked).toBe(true);
  });

  it('executes konami command and unlocks konami_code achievement', () => {
    const konamiDef = easterEggCommands.find((c) => c.name === 'konami');
    expect(konamiDef).toBeDefined();

    const res = konamiDef?.execute(dummyContext());
    expect(res?.type).toBe('success');
    expect(res?.text).toContain('30 LIVES GRANTED');

    const konamiAchievement = useAchievementStore
      .getState()
      .achievements.find((a) => a.id === 'konami_code');
    expect(konamiAchievement?.unlocked).toBe(true);
  });

  it('renders AchievementSystem with filter tabs and achievement cards', () => {
    render(<AchievementSystem />);

    expect(screen.getByText(/\[SYS.ACHIEVEMENT_REGISTRY\]/i)).toBeDefined();
    expect(screen.getByText(/RANK:/i)).toBeDefined();
    expect(screen.getByText('First Boot Initialized')).toBeDefined();

    // Toggle filter to secrets
    const secretsTab = screen.getByRole('button', { name: /Secrets/i });
    fireEvent.click(secretsTab);

    // Verify presence of secret cards
    expect(screen.getAllByText(/CLASSIFIED/i).length).toBeGreaterThan(0);
  });
});
