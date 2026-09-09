import { describe, it, expect, beforeEach } from 'vitest';
import { vfsInstance } from '../../src/core/vfs/vfs';
import { commandRegistry } from '../../src/core/cli/registry';
import { registerAllCommands } from '../../src/core/commands';
import { projectsData } from '../../src/content/projects';
import { CommandExecutionContext } from '../../src/types/terminal';

describe('Phase 4 — Project Explorer & Interactive Repository', () => {
  let mockCwd = '/';
  const mockNavigate = (path: string) => {
    const res = vfsInstance.changeDirectory(path, mockCwd);
    if (res.success && res.newCwd) {
      mockCwd = res.newCwd;
    }
    return res;
  };

  const createCtx = (command: string, args: string[] = [], flags: Record<string, any> = {}): CommandExecutionContext => ({
    command,
    rawInput: `${command} ${args.join(' ')}`,
    args,
    flags,
    cwd: mockCwd,
    navigateVfs: mockNavigate,
    clearBuffer: () => {},
    theme: 'dark-default',
    setTheme: () => {}
  });

  beforeEach(() => {
    mockCwd = '/';
    registerAllCommands();
  });

  it('verifies that projects command navigates VFS to /projects and returns interactive presentation', () => {
    const projectsCmd = commandRegistry.getCommand('projects');
    expect(projectsCmd).toBeDefined();

    const ctx = createCtx('projects');
    const result = projectsCmd?.execute(ctx);

    expect(result?.type).toBe('custom');
    expect(mockCwd).toBe('/projects');
  });

  it('supports the required navigation workflow: cd projects -> ls -> cd weavly -> ls -> cat README.md', () => {
    // 1. cd projects
    const cdCmd = commandRegistry.getCommand('cd');
    expect(cdCmd).toBeDefined();
    const cdRes1 = cdCmd?.execute(createCtx('cd', ['projects']));
    expect(cdRes1?.type).toBe('system');
    expect(mockCwd).toBe('/projects');

    // 2. ls inside /projects
    const lsCmd = commandRegistry.getCommand('ls');
    expect(lsCmd).toBeDefined();
    const lsProjectsRes = lsCmd?.execute(createCtx('ls'));
    expect(lsProjectsRes?.type).toBe('text');
    expect(lsProjectsRes?.text).toContain('pagematch');
    expect(lsProjectsRes?.text).toContain('cineportal');
    expect(lsProjectsRes?.text).toContain('weavly');

    // 3. cd weavly
    const cdRes2 = cdCmd?.execute(createCtx('cd', ['weavly']));
    expect(cdRes2?.type).toBe('system');
    expect(mockCwd).toBe('/projects/weavly');

    // 4. ls inside /projects/weavly shows exact expected files
    const lsWeavlyRes = lsCmd?.execute(createCtx('ls'));
    expect(lsWeavlyRes?.type).toBe('text');
    const files = lsWeavlyRes?.text?.split('\n') || [];
    expect(files).toContain('README.md');
    expect(files).toContain('architecture/');
    expect(files).toContain('features/');
    expect(files).toContain('stack.json');
    expect(files).toContain('metrics.json');

    // 5. cat README.md returns presentation component
    const catCmd = commandRegistry.getCommand('cat');
    expect(catCmd).toBeDefined();
    const catReadmeRes = catCmd?.execute(createCtx('cat', ['README.md']));
    expect(catReadmeRes?.type).toBe('custom');
    expect(catReadmeRes?.component).toBeDefined();
  });

  it('supports smart cd resolution for projects from root', () => {
    const cdCmd = commandRegistry.getCommand('cd');
    mockCwd = '/';

    // Directly cd weavly from root / without typing cd projects/weavly
    const cdRes = cdCmd?.execute(createCtx('cd', ['weavly']));
    expect(cdRes?.type).toBe('system');
    expect(mockCwd).toBe('/projects/weavly');
  });

  it('verifies cat README.md markdown content contains all 10 required architectural sections', () => {
    const readmeRes = vfsInstance.readFile('README.md', '/projects/weavly');
    expect(readmeRes.success).toBe(true);
    const content = readmeRes.content || '';

    // 1. problem
    expect(content).toContain('PROBLEM');
    // 2. solution
    expect(content).toContain('SOLUTION');
    // 3. architecture
    expect(content).toContain('ARCHITECTURE');
    // 4. engineering decisions
    expect(content).toContain('Architectural Decisions');
    // 5. technologies
    expect(content).toContain('TECH STACK');
    // 6. features
    expect(content).toContain('CORE FEATURES');
    // 7. challenges
    expect(content).toContain('CHALLENGES');
    // 8. results
    expect(content).toContain('PRODUCTION METRICS');
    // 9. learnings
    expect(content).toContain('KEY LEARNINGS');
    // 10. links
    expect(content).toContain('GitHub:');
    expect(content).toContain('Live Demo:');
  });

  it('verifies actual project data in data layer has zero duplicate entries', () => {
    const slugs = projectsData.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);

    // Ensure required flagship projects exist
    expect(slugs).toContain('pagematch');
    expect(slugs).toContain('cineportal');
    expect(slugs).toContain('weavly');
  });

  it('supports cat with --raw flag to output plain markdown', () => {
    mockCwd = '/projects/weavly';
    const catCmd = commandRegistry.getCommand('cat');
    const rawRes = catCmd?.execute(createCtx('cat', ['README.md'], { raw: true }));

    expect(rawRes?.type).toBe('text');
    expect(rawRes?.text).toContain('# Weavly (Zyra AI)');
  });
});
