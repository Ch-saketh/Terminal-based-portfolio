import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Terminal } from '../../src/components/terminal/Terminal';
import { useTerminalStore } from '../../src/state/useTerminalStore';

describe('Phase 10 — Production Polish & Ergonomics', () => {
  it('caps terminal output lines buffer to max 120 lines to prevent DOM bloat', () => {
    const store = useTerminalStore.getState();
    store.clearLines();

    // Append 150 lines
    for (let i = 0; i < 150; i++) {
      store.appendLine({
        type: 'standard',
        content: `Log output entry #${i}`
      });
    }

    const currentLines = useTerminalStore.getState().lines;
    expect(currentLines.length).toBeLessThanOrEqual(120);
    expect(currentLines.length).toBe(120);
    expect(currentLines[currentLines.length - 1].content).toBe('Log output entry #149');
  });

  it('renders Terminal with accessible ARIA region and mobile keypad bar', () => {
    render(<Terminal />);

    expect(screen.getByRole('region', { name: /Interactive Terminal Command Shell/i })).toBeDefined();

    // Verify presence of mobile quick-action buttons
    expect(screen.getByRole('button', { name: /TAB/i })).toBeDefined();
    expect(screen.getByRole('button', { name: 'help' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'whoami' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'projects' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'skills' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'git log' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'clear' })).toBeDefined();
  });

  it('triggers commands via mobile keypad buttons', async () => {
    render(<Terminal />);

    const helpBtn = screen.getByRole('button', { name: 'help' });
    await act(async () => {
      fireEvent.click(helpBtn);
    });

    const lines = useTerminalStore.getState().lines;
    const hasHelp = lines.some((l) => l.content === 'help' || l.commandText === 'help');
    expect(hasHelp).toBe(true);
  });
});
