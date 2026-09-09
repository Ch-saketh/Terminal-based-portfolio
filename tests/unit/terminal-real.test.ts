import { describe, it, expect, beforeEach } from 'vitest';
import { commandRegistry } from '../../src/core/cli/registry';
import { registerAllCommands } from '../../src/core/commands';
import { parseCommand, tokenizeCommandLine } from '../../src/core/cli/parser';
import { getAutocompleteSuggestions } from '../../src/core/cli/autocomplete';
import { findCommandSuggestion } from '../../src/core/cli/suggestions';
import { vfsInstance } from '../../src/core/vfs/vfs';
import { useTerminalStore } from '../../src/state/useTerminalStore';
import { useFileSystemStore } from '../../src/state/useFileSystemStore';

describe('Phase 3 — Professional Real Terminal Engine & POSIX Specification', () => {
  beforeEach(() => {
    registerAllCommands();
    useTerminalStore.getState().clearLines();
    useFileSystemStore.getState().resetCwd();
  });

  describe('1. Extensible Command Registration', () => {
    it('registers and retrieves standard and custom commands', () => {
      expect(commandRegistry.hasCommand('help')).toBe(true);
      expect(commandRegistry.hasCommand('whoami')).toBe(true);
      expect(commandRegistry.hasCommand('projects')).toBe(true);

      // Extensible custom command registration
      const customCmd = {
        name: 'custom-metric',
        description: 'Test extensible registration',
        usage: 'custom-metric',
        category: 'system' as const,
        execute: () => ({ type: 'success' as const, text: 'Metric OK' })
      };

      commandRegistry.register(customCmd);
      expect(commandRegistry.hasCommand('custom-metric')).toBe(true);
      expect(commandRegistry.getCommand('custom-metric')?.name).toBe('custom-metric');

      // Unregister
      const unregistered = commandRegistry.unregister('custom-metric');
      expect(unregistered).toBe(true);
      expect(commandRegistry.hasCommand('custom-metric')).toBe(false);
    });

    it('resolves aliases accurately', () => {
      expect(commandRegistry.getCommand('ll')?.name).toBe('ls');
      expect(commandRegistry.getCommand('dir')?.name).toBe('ls');
      expect(commandRegistry.getCommand('cls')?.name).toBe('clear');
      expect(commandRegistry.getCommand('cv')?.name).toBe('resume');
      expect(commandRegistry.getCommand('gh')?.name).toBe('github');
      expect(commandRegistry.getCommand('work')?.name).toBe('projects');
      expect(commandRegistry.getCommand('stack')?.name).toBe('skills');
      expect(commandRegistry.getCommand('career')?.name).toBe('experience');
    });
  });

  describe('2. Argument Parsing & Tokenization', () => {
    it('tokenizes quoted strings, escape sequences, and flags', () => {
      const tokens = tokenizeCommandLine('projects --tag="AI / ML" --featured "special name"');
      expect(tokens).toEqual(['projects', '--tag=AI / ML', '--featured', 'special name']);
    });

    it('parses short and long flags, and positional arguments', () => {
      const parsed = parseCommand('ls -la /projects --sort=name');
      expect(parsed).not.toBeNull();
      expect(parsed?.name).toBe('ls');
      expect(parsed?.flags.l).toBe(true);
      expect(parsed?.flags.a).toBe(true);
      expect(parsed?.flags.sort).toBe('name');
      expect(parsed?.args).toEqual(['/projects']);
    });
  });

  describe('3. Filesystem Navigation & Layout Specification', () => {
    it('verifies the exact root filesystem structure required by specification', () => {
      const rootList = vfsInstance.listDirectory('/', '/');
      expect(rootList.success).toBe(true);
      const names = rootList.nodes?.map((n) => n.name) || [];

      // / ├── about, projects, skills, experience, achievements, contact
      expect(names).toContain('about');
      expect(names).toContain('projects');
      expect(names).toContain('skills');
      expect(names).toContain('experience');
      expect(names).toContain('achievements');
      expect(names).toContain('contact');
    });

    it('supports navigation workflow: cd projects -> ls -> cd weavly -> ls -> cat README.md', () => {
      // 1. cd projects from root
      const cdProjects = vfsInstance.changeDirectory('projects', '/');
      expect(cdProjects.success).toBe(true);
      expect(cdProjects.newCwd).toBe('/projects');

      // 2. ls inside /projects contains pagematch, cineportal, weavly
      const lsProjects = vfsInstance.listDirectory('/projects', '/projects');
      expect(lsProjects.success).toBe(true);
      const projectNames = lsProjects.nodes?.map((n) => n.name) || [];
      expect(projectNames).toContain('pagematch');
      expect(projectNames).toContain('cineportal');
      expect(projectNames).toContain('weavly');

      // 3. cd weavly
      const cdWeavly = vfsInstance.changeDirectory('weavly', '/projects');
      expect(cdWeavly.success).toBe(true);
      expect(cdWeavly.newCwd).toBe('/projects/weavly');

      // 4. ls inside /projects/weavly contains README.md
      const lsWeavly = vfsInstance.listDirectory('.', '/projects/weavly');
      expect(lsWeavly.success).toBe(true);
      const weavlyFiles = lsWeavly.nodes?.map((n) => n.name) || [];
      expect(weavlyFiles).toContain('README.md');

      // 5. cat README.md
      const catReadme = vfsInstance.readFile('README.md', '/projects/weavly');
      expect(catReadme.success).toBe(true);
      expect(catReadme.content).toContain('Weavly');
      expect(catReadme.content).toContain('WHAT IT IS');
    });

    it('enforces POSIX errors for invalid cd and cat targets', () => {
      const cdInvalid = vfsInstance.changeDirectory('nonexistent_dir', '/');
      expect(cdInvalid.success).toBe(false);
      expect(cdInvalid.error).toContain('no such file or directory');

      const catDirectory = vfsInstance.readFile('projects', '/');
      expect(catDirectory.success).toBe(false);
      expect(catDirectory.error).toContain('Is a directory');

      const catMissing = vfsInstance.readFile('missing.txt', '/');
      expect(catMissing.success).toBe(false);
      expect(catMissing.error).toContain('No such file or directory');
    });
  });

  describe('4. Autocomplete Engine', () => {
    it('autocompletes command names', () => {
      const res = getAutocompleteSuggestions('who', '/');
      expect(res).not.toBeNull();
      expect(res?.suggestion).toBe('whoami ');
    });

    it('autocompletes directories with trailing slash', () => {
      const res = getAutocompleteSuggestions('cd pro', '/');
      expect(res).not.toBeNull();
      expect(res?.matches).toContain('projects/');
    });

    it('autocompletes when input has a trailing space (cd ) without stripping command', () => {
      const res = getAutocompleteSuggestions('cd ', '/');
      expect(res).not.toBeNull();
      expect(res?.matches).toContain('projects/');
      expect(res?.matches).toContain('about/');
    });

    it('autocompletes project subdirectories inside /projects', () => {
      const res = getAutocompleteSuggestions('cd we', '/projects');
      expect(res).not.toBeNull();
      expect(res?.matches).toContain('weavly/');
    });
  });

  describe('5. Intelligent Command Suggestions on Typos', () => {
    it('suggests closest match for mistyped commands', () => {
      expect(findCommandSuggestion('projcts')).toBe('projects');
      expect(findCommandSuggestion('whami')).toBe('whoami');
      expect(findCommandSuggestion('skils')).toBe('skills');
      expect(findCommandSuggestion('clearr')).toBe('clear');
    });
  });

  describe('6. Execution of All 16 Mandatory Commands', () => {
    const store = useTerminalStore.getState();

    const mandatoryCommands = [
      'help',
      'whoami',
      'ls',
      'pwd',
      'cd /projects',
      'cat weavly/README.md',
      'about',
      'projects',
      'skills',
      'experience',
      'achievements',
      'contact',
      'history',
      'clear'
    ];

    it.each(mandatoryCommands)('executes "%s" without throwing exceptions', async (cmd) => {
      await store.executeCommand(cmd);
      // History should record the command
      expect(useTerminalStore.getState().history).toContain(cmd);
    });
  });
});
