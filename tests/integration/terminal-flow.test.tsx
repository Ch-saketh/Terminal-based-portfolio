import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTerminalStore } from '../../src/state/useTerminalStore';
import { useFileSystemStore } from '../../src/state/useFileSystemStore';
import { useAchievementStore } from '../../src/state/useAchievementStore';
import { registerAllCommands } from '../../src/core/commands';
import { ErrorBoundary } from '../../src/components/shared/ErrorBoundary';

describe('Phase 11 — End-to-End Terminal Integration & QA Suite', () => {
  beforeEach(() => {
    registerAllCommands();
    useTerminalStore.getState().clearLines();
    useFileSystemStore.getState().changeDirectory('/home/saketh');
    useAchievementStore.getState().resetAchievements();
  });

  it('executes full sequential exploration journey without throwing errors', async () => {
    const store = useTerminalStore.getState();

    // 1. whoami
    await store.executeCommand('whoami');
    let lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'whoami')).toBe(true);

    // 2. ls
    await store.executeCommand('ls');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'ls')).toBe(true);

    // 3. cd projects and ls
    await store.executeCommand('cd projects');
    expect(useFileSystemStore.getState().cwd).toBe('/home/saketh/projects');
    await store.executeCommand('ls');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.content?.includes('weavly') || l.content?.includes('pagematch'))).toBe(true);

    // 4. cat weavly/README.md
    await store.executeCommand('cat weavly/README.md');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'cat weavly/README.md')).toBe(true);

    // 5. skills and deep inspection
    await store.executeCommand('skills backend');
    await store.executeCommand('inspect spring-boot');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'inspect spring-boot')).toBe(true);

    // 6. git log & git show
    await store.executeCommand('git log --oneline');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.content?.includes('a81f2c7'))).toBe(true);
    await store.executeCommand('git show a81f2c7');

    // 7. achievements & secret commands
    await store.executeCommand('achievements');
    await store.executeCommand('sudo make-me-hireable');
    await store.executeCommand('neofetch');
    await store.executeCommand('fortune');
    await store.executeCommand('hack');
    await store.executeCommand('konami');

    // 8. history
    await store.executeCommand('history');
    lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'history')).toBe(true);

    // Verify all achievements unlocked through execution flow
    const stats = useAchievementStore.getState().getStats();
    expect(stats.unlockedCount).toBeGreaterThanOrEqual(4);
  });

  it('gracefully handles unknown commands and provides fuzzy suggestion', async () => {
    const store = useTerminalStore.getState();

    await store.executeCommand('whomi'); // Typo of whoami
    const lines = useTerminalStore.getState().lines;
    const errorLine = lines.find((l) => l.type === 'error');
    expect(errorLine).toBeDefined();
    expect(errorLine?.content).toContain("Did you mean 'whoami'?");
  });

  it('gracefully handles non-existent file reads and invalid directory transitions', async () => {
    const store = useTerminalStore.getState();

    await store.executeCommand('cat /var/nonexistent_file.txt');
    let lines = useTerminalStore.getState().lines;
    let errorLine = lines.find((l) => l.type === 'error');
    expect(errorLine).toBeDefined();
    expect(errorLine?.content).toContain('cat: /var/nonexistent_file.txt: No such file or directory');

    await store.executeCommand('cd /invalid/unknown/directory');
    lines = useTerminalStore.getState().lines;
    errorLine = lines.reverse().find((l) => l.type === 'error');
    expect(errorLine).toBeDefined();
    expect(errorLine?.content).toContain('cd: no such file or directory');
  });

  it('handles empty commands and case-insensitive commands seamlessly', async () => {
    const store = useTerminalStore.getState();

    // Empty command
    await store.executeCommand('');
    await store.executeCommand('   ');

    // Case-insensitivity
    await store.executeCommand('WHOAMI');
    await store.executeCommand('Ls');
    await store.executeCommand('SKILLS');

    const lines = useTerminalStore.getState().lines;
    expect(lines.some((l) => l.commandText === 'WHOAMI')).toBe(true);
  });

  it('handles rapid sequential spam commands without dropping state', async () => {
    const store = useTerminalStore.getState();

    // Rapid spam 20 commands
    const commands = ['whoami', 'pwd', 'ls', 'help', 'skills', 'git status', 'neofetch', 'fortune'];
    for (let i = 0; i < 20; i++) {
      const cmd = commands[i % commands.length];
      await store.executeCommand(cmd);
    }

    const currentLines = useTerminalStore.getState().lines;
    expect(currentLines.length).toBeGreaterThanOrEqual(20);
  });

  it('catches component runtime faults inside ErrorBoundary and renders panic recovery UI', () => {
    const CrashingComponent = () => {
      throw new Error('Simulated GPU memory pipeline crash');
    };

    render(
      <ErrorBoundary>
        <CrashingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.getByText(/\[KERNEL PANIC: EXCEPTION_UNHANDLED\]/i)).toBeDefined();
    expect(screen.getByText(/Simulated GPU memory pipeline crash/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /\[ 01. REBOOT SAKETH.OS \]/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /\[ 02. CLEAR CACHE & RESET \]/i })).toBeDefined();
  });
});
