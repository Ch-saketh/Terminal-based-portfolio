import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GitTimeline } from '../../src/components/experience/GitTimeline';
import { gitCommands } from '../../src/core/commands/git';
import { portfolioCommands } from '../../src/core/commands/portfolio';
import { CommandExecutionContext } from '../../src/types/terminal';
import { vfsInstance } from '../../src/core/vfs/vfs';

describe('Phase 8 — Experience & Git History System', () => {
  const dummyContext = (args: string[] = [], flags: Record<string, any> = {}): CommandExecutionContext => ({
    command: 'git',
    rawInput: `git ${args.join(' ')}`,
    args,
    flags,
    cwd: '/home/saketh',
    navigateVfs: () => ({ success: true }),
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  });

  it('executes git log --oneline and returns concise commit history', () => {
    const gitDef = gitCommands.find((c) => c.name === 'git');
    expect(gitDef).toBeDefined();

    const res = gitDef?.execute(dummyContext(['log'], { oneline: true }));
    expect(res?.type).toBe('text');
    expect(res?.text).toContain('a81f2c7');
    expect(res?.text).toContain('Built recommendation system (Weavly)');
    expect(res?.text).toContain('91be72a');
    expect(res?.text).toContain('Quantum Valley Hackathon (1st Place)');
    expect(res?.text).toContain('4cd881e');
    expect(res?.text).toContain('Built CinePortal (Real-Time Watch Party)');
  });

  it('executes git log --graph and returns ASCII branch graph', () => {
    const gitDef = gitCommands.find((c) => c.name === 'git');
    expect(gitDef).toBeDefined();

    const res = gitDef?.execute(dummyContext(['log'], { graph: true }));
    expect(res?.type).toBe('text');
    expect(res?.text).toContain('*   a81f2c7');
    expect(res?.text).toContain('| * 91be72a');
  });

  it('executes git show <commit> and returns deep commit milestone inspector', () => {
    const gitDef = gitCommands.find((c) => c.name === 'git');
    expect(gitDef).toBeDefined();

    const res = gitDef?.execute(dummyContext(['show', 'a81f2c7']));
    expect(res?.type).toBe('custom');
    expect(res?.component).toBeDefined();
  });

  it('executes git status and git branch', () => {
    const gitDef = gitCommands.find((c) => c.name === 'git');
    expect(gitDef).toBeDefined();

    const statusRes = gitDef?.execute(dummyContext(['status']));
    expect(statusRes?.type).toBe('text');
    expect(statusRes?.text).toContain('On branch main');
    expect(statusRes?.text).toContain('working tree clean');

    const branchRes = gitDef?.execute(dummyContext(['branch']));
    expect(branchRes?.type).toBe('text');
    expect(branchRes?.text).toContain('main');
    expect(branchRes?.text).toContain('feature/ai-agents');
  });

  it('renders GitTimeline with Git Graph Matrix and view toggles', () => {
    render(<GitTimeline initialView="graph" />);

    expect(screen.getByText(/\[SYS.GIT_JOURNEY\]/i)).toBeDefined();
    expect(screen.getByText('a81f2c7')).toBeDefined();
    expect(screen.getByText('91be72a')).toBeDefined();
    expect(screen.getByText('4cd881e')).toBeDefined();

    // Toggle to Visual Timeline view
    const visualTimelineBtn = screen.getByRole('button', { name: /\[ 02 Visual Timeline \]/i });
    fireEvent.click(visualTimelineBtn);
    expect(screen.getByText(/Weavly \/ Zyra AI Launch/i)).toBeDefined();
    expect(screen.getByText(/Quantum Valley AI Hackathon/i)).toBeDefined();
  });

  it('opens commit details modal with what happened, what was learned, and simulated diff', () => {
    render(<GitTimeline initialSelectedHash="a81f2c7" />);

    expect(screen.getByText(/Weavly \/ Zyra AI Launch/i)).toBeDefined();
    expect(screen.getByText(/\[01. WHAT HAPPENED\]/i)).toBeDefined();
    expect(screen.getByText(/\[02. WHAT WAS LEARNED\]/i)).toBeDefined();
    expect(screen.getByText(/\[03. TECHNOLOGIES & STACK\]/i)).toBeDefined();
    expect(screen.getByText(/\[04. SIMULATED GIT DIFF\]/i)).toBeDefined();
    expect(screen.getByText(/createCollection\("wardrobe_embeddings"/i)).toBeDefined();
  });

  it('verifies VFS experience directory files', () => {
    const gitLogRes = vfsInstance.readFile('/home/saketh/experience/git-log.md', '/home/saketh');
    expect(gitLogRes.success).toBe(true);
    expect(gitLogRes.content).toContain('SAKETH.OS Career Git History & Milestones');
    expect(gitLogRes.content).toContain('commit a81f2c7');

    const milestonesJsonRes = vfsInstance.readFile('/home/saketh/experience/milestones.json', '/home/saketh');
    expect(milestonesJsonRes.success).toBe(true);
    const parsed = JSON.parse(milestonesJsonRes.content || '[]');
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThanOrEqual(6);
  });
});
