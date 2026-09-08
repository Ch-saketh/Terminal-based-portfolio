import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AboutRenderer } from '../../src/components/terminal/renderers/AboutRenderer';
import { WhoamiRenderer } from '../../src/components/terminal/renderers/WhoamiRenderer';
import { portfolioCommands } from '../../src/core/commands/portfolio';
import { CommandExecutionContext } from '../../src/types/terminal';
import { vfsInstance } from '../../src/core/vfs/vfs';

describe('Phase 5 — About System & Commands', () => {
  const dummyContext: CommandExecutionContext = {
    command: 'about',
    rawInput: 'about',
    args: [],
    flags: {},
    cwd: '/home/saketh',
    navigateVfs: () => ({ success: true }),
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  };

  it('executes whoami command and returns WhoamiRenderer component', () => {
    const whoamiDef = portfolioCommands.find((c) => c.name === 'whoami');
    expect(whoamiDef).toBeDefined();
    const result = whoamiDef?.execute(dummyContext);
    expect(result?.type).toBe('custom');
    expect(result?.component).toBeDefined();
  });

  it('renders WhoamiRenderer with identity, roles, and action shortcuts', () => {
    render(<WhoamiRenderer />);

    expect(screen.getByText(/Saketh Chokkapu/i)).toBeDefined();
    expect(screen.getByText('developer')).toBeDefined();
    expect(screen.getByText('problem_solver')).toBeDefined();
    expect(screen.getByText('ai_enthusiast')).toBeDefined();
    expect(screen.getByText('lifelong_learner')).toBeDefined();
    expect(screen.getByText(/> cat about.md/i)).toBeDefined();
    expect(screen.getByText(/> cat profile.json/i)).toBeDefined();
  });

  it('executes about command and returns AboutRenderer component', () => {
    const aboutDef = portfolioCommands.find((c) => c.name === 'about');
    expect(aboutDef).toBeDefined();
    const result = aboutDef?.execute(dummyContext);
    expect(result?.type).toBe('custom');
    expect(result?.component).toBeDefined();
  });

  it('renders AboutRenderer with markdown sections (education, philosophy, interests, focus, goals)', () => {
    render(<AboutRenderer initialTab="md" />);

    expect(screen.getByText(/Education/i)).toBeDefined();
    expect(screen.getByText(/Engineering Interests/i)).toBeDefined();
    expect(screen.getByText(/Development Philosophy/i)).toBeDefined();
    expect(screen.getByText(/Current Focus/i)).toBeDefined();
    expect(screen.getByText(/Long-Term Goals/i)).toBeDefined();
  });

  it('switches between format tabs in AboutRenderer', () => {
    render(<AboutRenderer initialTab="md" />);

    const jsonTabBtn = screen.getByText(/\[ 02 profile.json \]/i);
    expect(jsonTabBtn).toBeDefined();

    fireEvent.click(jsonTabBtn);
    expect(screen.getByText(/profile.json \(JSON 4-space formatted\)/i)).toBeDefined();
    expect(screen.getByText(/COPY JSON/i)).toBeDefined();
  });

  it('verifies that cat about.md and cat profile.json read valid VFS files', () => {
    const aboutFileRes = vfsInstance.readFile('about.md', '/home/saketh');
    expect(aboutFileRes.success).toBe(true);
    expect(aboutFileRes.content).toContain('Saketh Chokkapu — Engineering Profile');
    expect(aboutFileRes.content).toContain('Education');
    expect(aboutFileRes.content).toContain('Development Philosophy');

    const profileJsonRes = vfsInstance.readFile('profile.json', '/home/saketh');
    expect(profileJsonRes.success).toBe(true);
    expect(profileJsonRes.content).toBeDefined();
    const parsed = JSON.parse(profileJsonRes.content || '{}');
    expect(parsed.role).toBeDefined();
    expect(Array.isArray(parsed.focus)).toBe(true);
    expect(Array.isArray(parsed.interests)).toBe(true);
  });
});
