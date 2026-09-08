import { describe, it, expect, beforeEach } from 'vitest';
import { CommandHistoryManager } from '../../src/core/cli/history';

describe('CommandHistoryManager', () => {
  let historyManager: CommandHistoryManager;

  beforeEach(() => {
    historyManager = new CommandHistoryManager(10);
  });

  it('pushes new commands and avoids immediate duplicates', () => {
    historyManager.push('whoami');
    historyManager.push('whoami');
    expect(historyManager.getHistory()).toEqual(['whoami']);

    historyManager.push('projects');
    expect(historyManager.getHistory()).toEqual(['whoami', 'projects']);
  });

  it('navigates up and down through history', () => {
    historyManager.push('cmd1');
    historyManager.push('cmd2');
    historyManager.push('cmd3');

    // Arrow Up
    expect(historyManager.navigateUp('')).toBe('cmd3');
    expect(historyManager.navigateUp('')).toBe('cmd2');
    expect(historyManager.navigateUp('')).toBe('cmd1');
    expect(historyManager.navigateUp('')).toBe('cmd1'); // Boundary test

    // Arrow Down
    expect(historyManager.navigateDown('')).toBe('cmd2');
    expect(historyManager.navigateDown('')).toBe('cmd3');
    expect(historyManager.navigateDown('')).toBe(''); // Past newest
  });

  it('enforces ring buffer capacity limits', () => {
    const smallMgr = new CommandHistoryManager(3);
    smallMgr.push('c1');
    smallMgr.push('c2');
    smallMgr.push('c3');
    smallMgr.push('c4');

    expect(smallMgr.getHistory()).toEqual(['c2', 'c3', 'c4']);
  });
});
