import { create } from 'zustand';
import { TerminalOutputLine, CommandContext } from '../types/terminal';
import { parseCommand } from '../core/cli/parser';
import { commandRegistry } from '../core/cli/registry';
import { findCommandSuggestion } from '../core/cli/suggestions';
import { useFileSystemStore } from './useFileSystemStore';
import { useSystemStore } from './useSystemStore';
import { useWindowStore } from './useWindowStore';
import { soundEngine } from '../core/audio/soundEngine';
import { systemConfig } from '../content/config';

interface TerminalState {
  lines: TerminalOutputLine[];
  history: string[];
  historyIndex: number;
  input: string;
  isExecuting: boolean;
  setInput: (input: string) => void;
  setHistoryIndex: (index: number) => void;
  navigateHistory: (direction: 'up' | 'down') => void;
  appendLine: (line: Omit<TerminalOutputLine, 'id'>) => void;
  clearLines: () => void;
  executeCommand: (rawInput: string) => Promise<void>;
  initializeBootSequence: () => void;
}

let lineCounter = 0;
function createLineId() {
  return `line-${Date.now()}-${++lineCounter}`;
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  lines: [],
  history: [],
  historyIndex: -1,
  input: '',
  isExecuting: false,

  setInput: (input: string) => set({ input }),
  setHistoryIndex: (historyIndex: number) => set({ historyIndex }),

  navigateHistory: (direction: 'up' | 'down') => {
    const { history, historyIndex, input } = get();
    if (history.length === 0) return;

    if (direction === 'up') {
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      set({
        historyIndex: nextIndex,
        input: history[nextIndex] ?? input
      });
    } else {
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        set({ historyIndex: -1, input: '' });
      } else {
        set({ historyIndex: nextIndex, input: history[nextIndex] });
      }
    }
  },

  appendLine: (line) => {
    set((state) => {
      const newLine = { ...line, id: createLineId(), timestamp: Date.now() };
      const nextLines = [...state.lines, newLine];
      const capped = nextLines.length > 120 ? nextLines.slice(nextLines.length - 120) : nextLines;
      return { lines: capped };
    });
  },

  clearLines: () => {
    set({ lines: [] });
  },

  executeCommand: async (rawInput: string) => {
    const trimmed = rawInput.trim();
    const cwd = useFileSystemStore.getState().cwd;
    const startTime = performance.now();

    // Echo the user input line with prompt
    get().appendLine({
      type: 'command',
      content: rawInput,
      commandText: rawInput,
      cwd
    });

    if (!trimmed) {
      set({ input: '', historyIndex: -1 });
      return;
    }

    // Add to history (avoid duplicates of immediately preceding command)
    set((state) => {
      const last = state.history[state.history.length - 1];
      const newHistory = last === trimmed ? state.history : [...state.history, trimmed];
      return {
        history: newHistory,
        historyIndex: -1,
        input: '',
        isExecuting: true
      };
    });

    soundEngine.playExecuteSound();

    const parsed = parseCommand(trimmed);
    if (!parsed) {
      set({ isExecuting: false });
      return;
    }

    const commandDef = commandRegistry.getCommand(parsed.name);

    if (!commandDef) {
      soundEngine.playErrorSound();
      const suggestion = findCommandSuggestion(parsed.name);
      let errorMsg = `zsh: command not found: ${parsed.name}.`;
      if (suggestion) {
        errorMsg += ` Did you mean '${suggestion}'? Type 'help' to see all available commands.`;
      } else {
        errorMsg += ` Type 'help' or click the dock to view available commands.`;
      }

      get().appendLine({
        type: 'error',
        content: errorMsg
      });
      set({ isExecuting: false });
      return;
    }

    // Prepare execution context
    const context: CommandContext = {
      args: parsed.args,
      flags: parsed.flags,
      raw: rawInput,
      cwd,
      history: get().history,
      setTheme: (theme) => useSystemStore.getState().setTheme(theme),
      toggleSound: () => useSystemStore.getState().toggleSound(),
      toggleCrt: () => useSystemStore.getState().toggleCrt(),
      openWindow: (id) => useWindowStore.getState().openWindow(id),
      clearTerminal: () => get().clearLines(),
      navigateVfs: (path) => useFileSystemStore.getState().changeDirectory(path)
    };

    try {
      const result = await commandDef.execute(context);
      const duration = Math.round(performance.now() - startTime);

      if (result.type !== 'system' || result.text || result.component) {
        get().appendLine({
          type: result.type,
          content: result.text,
          component: result.component,
          executionDurationMs: duration
        });
      }
    } catch (err: any) {
      soundEngine.playErrorSound();
      get().appendLine({
        type: 'error',
        content: `Execution error in '${parsed.name}': ${err?.message || 'Unknown kernel exception'}`
      });
    } finally {
      set({ isExecuting: false });
    }
  },

  initializeBootSequence: () => {
    const { lines } = get();
    if (lines.length > 0) return; // Prevent double boot

    soundEngine.playBootChord();

    // Add ASCII Banner
    get().appendLine({
      type: 'banner',
      content: systemConfig.asciiArt
    });

    // Add Boot Messages
    systemConfig.bootMessages.forEach((msg) => {
      get().appendLine({
        type: 'system',
        content: msg
      });
    });

    useSystemStore.getState().completeBoot();
  }
}));
