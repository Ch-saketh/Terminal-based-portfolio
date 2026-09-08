import React from 'react';

export type OutputType =
  'text' | 'error' | 'success' | 'info' | 'warning' | 'custom' | 'system' | 'banner' | 'command';

export type CommandCategory = 'portfolio' | 'navigation' | 'system' | 'easter-egg';
export type CommandPermission = 'user' | 'root' | 'guest';

export interface TerminalOutputLine {
  id: string;
  type: OutputType;
  content?: string;
  component?: React.ReactNode;
  timestamp?: number;
  commandText?: string;
  cwd?: string;
  executionDurationMs?: number;
}

export interface ParsedCommand {
  raw: string;
  name: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

export interface CommandContext {
  args: string[];
  flags: Record<string, string | boolean>;
  raw: string;
  cwd: string;
  history: string[];
  setTheme: (theme: 'emerald' | 'cyan' | 'amber' | 'purple') => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  openWindow: (id: string) => void;
  clearTerminal: () => void;
  navigateVfs: (path: string) => { success: boolean; error?: string };
}

export interface CommandResult {
  type: OutputType;
  text?: string;
  component?: React.ReactNode;
}

export interface CommandOption {
  flag: string;
  alias?: string;
  description: string;
}

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
  category: CommandCategory;
  permissions?: CommandPermission;
  options?: CommandOption[];
  execute: (context: CommandContext) => CommandResult | Promise<CommandResult>;
  autocomplete?: (currentArgs: string[], cwd: string) => string[];
}
