import { describe, it, expect, beforeEach } from 'vitest';
import { getAutocompleteSuggestions } from '../../src/core/cli/autocomplete';
import { registerAllCommands } from '../../src/core/commands';

describe('Autocomplete Engine', () => {
  beforeEach(() => {
    registerAllCommands();
  });

  it('should autocomplete unique command prefixes', () => {
    const res = getAutocompleteSuggestions('who', '/home/saketh');
    expect(res).not.toBeNull();
    expect(res?.matches).toContain('whoami');
  });

  it('should autocomplete project files when using cat', () => {
    const res = getAutocompleteSuggestions('cat /home/saketh/REA', '/home/saketh');
    expect(res).not.toBeNull();
    expect(res?.matches.some((m) => m.includes('README.md'))).toBe(true);
  });
});
