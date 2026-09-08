import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillStackSystem } from '../../src/components/skills/SkillStackSystem';
import { portfolioCommands } from '../../src/core/commands/portfolio';
import { CommandExecutionContext } from '../../src/types/terminal';
import { vfsInstance } from '../../src/core/vfs/vfs';

describe('Phase 7 — Engineering Stack System & Diagnostics', () => {
  const dummyContext = (args: string[] = [], flags: Record<string, any> = {}): CommandExecutionContext => ({
    command: 'skills',
    rawInput: `skills ${args.join(' ')}`,
    args,
    flags,
    cwd: '/home/saketh',
    navigateVfs: () => ({ success: true }),
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  });

  it('renders SkillStackSystem with all 9 categories and legend', () => {
    render(<SkillStackSystem />);

    expect(screen.getByText(/\[SYS.STACK_DIAGNOSTICS\]/i)).toBeDefined();
    expect(screen.getByText(/Primary \(Production Core\)/i)).toBeDefined();
    expect(screen.getAllByText(/Working Knowledge/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Exploring/i).length).toBeGreaterThan(0);

    // Verify presence of core technologies
    expect(screen.getByText('Spring Boot')).toBeDefined();
    expect(screen.getByText('Qdrant Vector Database')).toBeDefined();
    expect(screen.getByText('PostgreSQL')).toBeDefined();
  });

  it('filters by category tab when clicked', () => {
    render(<SkillStackSystem />);

    const backendTab = screen.getAllByRole('button', { name: 'Backend' })[0];
    expect(backendTab).toBeDefined();

    fireEvent.click(backendTab);
    expect(screen.getByText('Spring Boot')).toBeDefined();
    expect(screen.getByText('FastAPI')).toBeDefined();
  });

  it('searches stack by technology name or architecture keyword', () => {
    render(<SkillStackSystem />);

    const searchInput = screen.getByPlaceholderText(/Search stack/i);
    fireEvent.change(searchInput, { target: { value: 'qdrant' } });

    expect(screen.getByText('Qdrant Vector Database')).toBeDefined();
  });

  it('opens deep technology inspector on click and displays projects, concepts, and capabilities', () => {
    render(<SkillStackSystem initialInspectSkillId="spring-boot" />);

    expect(screen.getByText(/\[01. WHAT I'VE USED IT FOR\]/i)).toBeDefined();
    expect(screen.getByText(/\[02. ASSOCIATED PRODUCTION PROJECTS\]/i)).toBeDefined();
    expect(screen.getByText(/Weavly \/ Zyra/i)).toBeDefined();
    expect(screen.getByText(/\[03. ENGINEERING CONCEPTS & ARCHITECTURE\]/i)).toBeDefined();
    expect(screen.getByText('Inversion of Control (IoC)')).toBeDefined();
  });

  it('executes skills and inspect commands from CLI engine', () => {
    const skillsDef = portfolioCommands.find((c) => c.name === 'skills');
    expect(skillsDef).toBeDefined();

    const skillsResult = skillsDef?.execute(dummyContext(['backend']));
    expect(skillsResult?.type).toBe('custom');
    expect(skillsResult?.component).toBeDefined();

    const inspectDef = portfolioCommands.find((c) => c.name === 'inspect');
    expect(inspectDef).toBeDefined();

    const inspectResult = inspectDef?.execute({
      ...dummyContext(['qdrant']),
      command: 'inspect'
    });
    expect(inspectResult?.type).toBe('custom');
    expect(inspectResult?.component).toBeDefined();
  });

  it('verifies VFS skills directory files and stack-matrix.md', () => {
    const stackMatrixRes = vfsInstance.readFile('/home/saketh/skills/stack-matrix.md', '/home/saketh');
    expect(stackMatrixRes.success).toBe(true);
    expect(stackMatrixRes.content).toContain('SAKETH.OS Engineering Stack & Skill Diagnostic Matrix');
    expect(stackMatrixRes.content).toContain('BACKEND');
    expect(stackMatrixRes.content).toContain('AI / ML');

    const backendJsonRes = vfsInstance.readFile('/home/saketh/skills/backend.json', '/home/saketh');
    expect(backendJsonRes.success).toBe(true);
    const parsed = JSON.parse(backendJsonRes.content || '{}');
    expect(parsed.category).toBe('Backend');
    expect(Array.isArray(parsed.skills)).toBe(true);
  });
});
