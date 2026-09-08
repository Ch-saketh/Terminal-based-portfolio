import { describe, it, expect } from 'vitest';
import { tokenizeCommandLine, parseCommand } from '../../src/core/cli/parser';

describe('CLI Parser & Tokenizer', () => {
  it('should tokenize simple space-separated strings', () => {
    const tokens = tokenizeCommandLine('whoami');
    expect(tokens).toEqual(['whoami']);
  });

  it('should handle positional arguments', () => {
    const tokens = tokenizeCommandLine('cat /home/saketh/README.md');
    expect(tokens).toEqual(['cat', '/home/saketh/README.md']);
  });

  it('should preserve double and single quoted strings with spaces', () => {
    const tokens = tokenizeCommandLine('echo "hello world" \'second arg\'');
    expect(tokens).toEqual(['echo', 'hello world', 'second arg']);
  });

  it('should parse long flags with values', () => {
    const parsed = parseCommand('projects --tag=rust --featured');
    expect(parsed).not.toBeNull();
    expect(parsed?.name).toBe('projects');
    expect(parsed?.flags.tag).toBe('rust');
    expect(parsed?.flags.featured).toBe(true);
  });

  it('should parse combined short flags', () => {
    const parsed = parseCommand('ls -la');
    expect(parsed).not.toBeNull();
    expect(parsed?.name).toBe('ls');
    expect(parsed?.flags.l).toBe(true);
    expect(parsed?.flags.a).toBe(true);
  });
});
