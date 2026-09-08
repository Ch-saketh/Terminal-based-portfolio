import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectExplorer } from '../../src/components/projects/ProjectExplorer';
import { ProjectDetail } from '../../src/components/projects/ProjectDetail';
import { projectsData } from '../../src/content/projects';
import { vfsInstance } from '../../src/core/vfs/vfs';
import { portfolioCommands } from '../../src/core/commands/portfolio';
import { CommandExecutionContext } from '../../src/types/terminal';

describe('Phase 6 — Project Exploration System', () => {
  const dummyContext = (args: string[] = [], flags: Record<string, any> = {}): CommandExecutionContext => ({
    command: 'projects',
    rawInput: `projects ${args.join(' ')}`,
    args,
    flags,
    cwd: '/home/saketh',
    navigateVfs: () => ({ success: true }),
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  });

  it('verifies POSIX filesystem directory layout for projects', () => {
    // 1. ls projects
    const lsProjects = vfsInstance.listDirectory('projects', '/home/saketh');
    expect(lsProjects.success).toBe(true);
    const dirNames = lsProjects.nodes?.map((n) => n.name) || [];
    expect(dirNames).toContain('weavly');
    expect(dirNames).toContain('pagematch');
    expect(dirNames).toContain('cineportal');
    expect(dirNames).toContain('saketh-os');

    // 2. cd projects/weavly and ls
    const weavlyDir = vfsInstance.listDirectory('/home/saketh/projects/weavly', '/home/saketh');
    expect(weavlyDir.success).toBe(true);
    const weavlyFiles = weavlyDir.nodes?.map((n) => n.name) || [];
    expect(weavlyFiles).toContain('README.md');
    expect(weavlyFiles).toContain('stack.json');
    expect(weavlyFiles).toContain('metrics.json');
    expect(weavlyFiles).toContain('architecture');
    expect(weavlyFiles).toContain('features');

    // 3. cat README.md
    const readmeRes = vfsInstance.readFile('/home/saketh/projects/weavly/README.md', '/home/saketh');
    expect(readmeRes.success).toBe(true);
    expect(readmeRes.content).toContain('Weavly (Zyra AI)');
    expect(readmeRes.content).toContain('WHAT IT IS');
    expect(readmeRes.content).toContain('WHY IT WAS BUILT');
    expect(readmeRes.content).toContain('HOW IT WORKS');
  });

  it('renders ProjectExplorer with search, category filtering, and project list', () => {
    render(<ProjectExplorer />);

    expect(screen.getByPlaceholderText(/Search projects/i)).toBeDefined();
    expect(screen.getAllByText('AI / Machine Learning').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Distributed Systems').length).toBeGreaterThan(0);

    // Verify Weavly is present
    expect(screen.getByText('weavly/')).toBeDefined();
    expect(screen.getByText('pagematch/')).toBeDefined();
    expect(screen.getByText('cineportal/')).toBeDefined();

    // Search filter interaction
    const searchInput = screen.getByPlaceholderText(/Search projects/i);
    fireEvent.change(searchInput, { target: { value: 'Zyra' } });
    expect(screen.getByText('weavly/')).toBeDefined();
  });

  it('renders ProjectDetail with engineering breakdown (WHAT, WHY, HOW, Problem, Solution, Challenges, Architecture)', () => {
    const weavly = projectsData.find((p) => p.slug === 'weavly')!;
    render(<ProjectDetail project={weavly} />);

    expect(screen.getByText(/Weavly \(Zyra AI\)/i)).toBeDefined();
    expect(screen.getByText(/What It Is/i)).toBeDefined();
    expect(screen.getByText(/Why It Was Built/i)).toBeDefined();
    expect(screen.getByText(/How It Works/i)).toBeDefined();
    expect(screen.getByText(/THE ENGINEERING PROBLEM/i)).toBeDefined();
    expect(screen.getByText(/THE ARCHITECTED SOLUTION/i)).toBeDefined();
    expect(screen.getByText(/Technical Hurdles & Resolutions/i)).toBeDefined();

    // Tab switching to architecture.sys
    const archTabBtn = screen.getByText(/\[ 02 architecture.sys \]/i);
    fireEvent.click(archTabBtn);
    expect(screen.getByText(/System Design & Component Flow/i)).toBeDefined();
    expect(screen.getByText(/Key Architectural Trade-Offs & Decisions/i)).toBeDefined();
  });

  it('executes projects command with flags and slug args', () => {
    const projectsDef = portfolioCommands.find((c) => c.name === 'projects');
    expect(projectsDef).toBeDefined();

    // projects weavly
    const singleResult = projectsDef?.execute(dummyContext(['weavly']));
    expect(singleResult?.type).toBe('custom');
    expect(singleResult?.component).toBeDefined();

    // projects --featured
    const featuredResult = projectsDef?.execute(dummyContext([], { featured: true }));
    expect(featuredResult?.type).toBe('custom');
    expect(featuredResult?.component).toBeDefined();
  });
});
