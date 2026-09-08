import { describe, it, expect, beforeEach } from 'vitest';
import { commandRegistry } from '../../src/core/cli/registry';
import { registerAllCommands } from '../../src/core/commands';

describe('Command Registry & Aliases', () => {
  beforeEach(() => {
    registerAllCommands();
  });

  it('resolves primary command by exact name', () => {
    const cmd = commandRegistry.getCommand('whoami');
    expect(cmd).toBeDefined();
    expect(cmd?.name).toBe('whoami');
  });

  it('resolves primary command by registered alias', () => {
    const alias1 = commandRegistry.getCommand('bio');
    expect(alias1).toBeDefined();
    expect(alias1?.name).toBe('whoami');

    const alias2 = commandRegistry.getCommand('cls');
    expect(alias2).toBeDefined();
    expect(alias2?.name).toBe('clear');

    const alias3 = commandRegistry.getCommand('ll');
    expect(alias3).toBeDefined();
    expect(alias3?.name).toBe('ls');

    const alias4 = commandRegistry.getCommand('awards');
    expect(alias4).toBeDefined();
    expect(alias4?.name).toBe('achievements');
  });

  it('handles case-insensitivity on lookup', () => {
    const cmdUpper = commandRegistry.getCommand('PROJECTS');
    expect(cmdUpper).toBeDefined();
    expect(cmdUpper?.name).toBe('projects');

    const cmdMixed = commandRegistry.getCommand('WhOaMi');
    expect(cmdMixed).toBeDefined();
    expect(cmdMixed?.name).toBe('whoami');
  });
});
