import { describe, it, expect, beforeEach } from 'vitest';
import { findCommandSuggestion } from '../../src/core/cli/suggestions';
import { commandRegistry } from '../../src/core/cli/registry';
import { registerAllCommands } from '../../src/core/commands';

describe('Invalid Commands & Levenshtein Suggestions', () => {
  beforeEach(() => {
    registerAllCommands();
  });

  it('returns undefined for nonexistent commands', () => {
    const cmd = commandRegistry.getCommand('nonexistentxyz');
    expect(cmd).toBeUndefined();
  });

  it('suggests "help" when user types "hlp"', () => {
    const suggestion = findCommandSuggestion('hlp');
    expect(suggestion).toBe('help');
  });

  it('suggests "projects" when user types "projcts"', () => {
    const suggestion = findCommandSuggestion('projcts');
    expect(suggestion).toBe('projects');
  });

  it('suggests "skills" when user types "skils"', () => {
    const suggestion = findCommandSuggestion('skils');
    expect(suggestion).toBe('skills');
  });

  it('returns null for completely unrelated gibberish', () => {
    const suggestion = findCommandSuggestion('zzzzzxxxxqqqq');
    expect(suggestion).toBeNull();
  });
});
