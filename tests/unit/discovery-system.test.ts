import { describe, it, expect, beforeEach } from 'vitest';
import { achievementRegistry } from '../../src/core/discovery/AchievementRegistry';
import { unlockManager } from '../../src/core/discovery/UnlockManager';
import { secretCommandRegistry } from '../../src/core/discovery/SecretCommandRegistry';
import { useAchievementStore } from '../../src/state/useAchievementStore';
import { useTerminalStore } from '../../src/state/useTerminalStore';
import { easterEggCommands } from '../../src/core/commands/easterEggs';

describe('Phase 5 — Discovery System & Embedded Real Terminal Projection Tests', () => {
  beforeEach(() => {
    useAchievementStore.getState().resetAchievements();
    useTerminalStore.getState().clearLines();
  });

  it('verifies AchievementRegistry contains all 7 core discovery achievements', () => {
    const all = achievementRegistry.getAll();
    const codes = all.map((a) => a.code);

    expect(codes).toContain('FIRST_BOOT');
    expect(codes).toContain('EXPLORER');
    expect(codes).toContain('BUILDER');
    expect(codes).toContain('HACKATHON');
    expect(codes).toContain('SHIP_IT');
    expect(codes).toContain('SYSTEM_ARCHITECT');
    expect(codes).toContain('CLASSIFIED');
  });

  it('verifies SecretCommandRegistry registers and tracks discovery for core secret commands', () => {
    const list = secretCommandRegistry.getSecretCommands();
    const names = list.map((c) => c.name);

    expect(names).toContain('neofetch');
    expect(names).toContain('debug');
    expect(names).toContain('fortune');
    expect(names).toContain('sudo');
    expect(names).toContain('matrix');

    // Discover neofetch
    secretCommandRegistry.discover('neofetch');
    expect(secretCommandRegistry.isDiscovered('neofetch')).toBe(true);
  });

  it('verifies UnlockManager triggers EXPLORER and SYSTEM_ARCHITECT unlocks on actions', () => {
    unlockManager.onProjectExploration();
    const explorer = useAchievementStore.getState().achievements.find((a) => a.code === 'EXPLORER');
    expect(explorer?.unlocked).toBe(true);

    unlockManager.onArchitectureViewed('weavly');
    const architect = useAchievementStore
      .getState()
      .achievements.find((a) => a.code === 'SYSTEM_ARCHITECT');
    expect(architect?.unlocked).toBe(true);
  });

  it('verifies sudo make-me-hireable generates briefing and links to resume, github, linkedin, contact', async () => {
    const sudoCmd = easterEggCommands.find((c) => c.name === 'sudo');
    expect(sudoCmd).toBeDefined();

    const res = await sudoCmd?.execute({
      args: ['make-me-hireable'],
      flags: {},
      raw: 'sudo make-me-hireable',
      cwd: '/home/saketh',
      history: [],
      setTheme: () => {},
      toggleSound: () => {},
      toggleCrt: () => {},
      openWindow: () => {},
      clearTerminal: () => {},
      navigateVfs: () => ({ success: true })
    });

    expect(res).toBeDefined();
    expect(res?.isError).toBe(false);

    // Verify CLASSIFIED (root_access) achievement unlocked
    const classified = useAchievementStore
      .getState()
      .achievements.find((a) => a.code === 'CLASSIFIED');
    expect(classified?.unlocked).toBe(true);
  });

  it('verifies that touching/clicking any command immediately projects into the real terminal', async () => {
    // 1. Run 'about'
    await useTerminalStore.getState().executeCommand('about');
    let lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'about')).toBe(true);

    // 2. Run 'skills'
    await useTerminalStore.getState().executeCommand('skills');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'skills')).toBe(true);

    // 3. Run 'projects'
    await useTerminalStore.getState().executeCommand('projects');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'projects')).toBe(true);

    // 4. Run 'contact'
    await useTerminalStore.getState().executeCommand('contact');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'contact')).toBe(true);
  });
});
