import { commandRegistry } from './registry';
import { registerAllCommands } from '../commands';
import { vfsInstance } from '../vfs/vfs';
import { tokenizeCommandLine } from './parser';

export interface AutocompleteResult {
  suggestion: string; // Best full replacement or completed string
  matches: string[]; // All matched candidates
  prefix: string; // The token prefix being matched
  isPartial: boolean; // Whether multiple candidates share a common prefix
}

export function getAutocompleteSuggestions(input: string, cwd: string): AutocompleteResult | null {
  if (commandRegistry.getAllCommands().length === 0) {
    registerAllCommands();
  }

  const isTrailingSpace = input.endsWith(' ');
  const tokens = tokenizeCommandLine(input);

  if (tokens.length === 0 && !isTrailingSpace) {
    return null;
  }

  // Case 1: Autocompleting the command name (1st token)
  if (tokens.length <= 1 && !isTrailingSpace) {
    const currentToken = tokens[0] || '';
    const commands = commandRegistry.getAllCommands();
    const candidateNames = new Set<string>();

    commands.forEach((cmd) => {
      candidateNames.add(cmd.name);
      cmd.aliases?.forEach((a) => candidateNames.add(a));
    });

    const matches = Array.from(candidateNames)
      .filter((name) => name.startsWith(currentToken.toLowerCase()))
      .sort();

    if (matches.length === 0) return null;

    return {
      suggestion: matches.length === 1 ? `${matches[0]} ` : findCommonPrefix(matches),
      matches,
      prefix: currentToken,
      isPartial: matches.length > 1
    };
  }

  // Case 2: Autocompleting flags or file arguments for an existing command
  const commandName = tokens[0].toLowerCase();
  const cmd = commandRegistry.getCommand(commandName);
  const currentToken = isTrailingSpace ? '' : tokens[tokens.length - 1];

  // If typing a flag (--...)
  if (currentToken.startsWith('-') && cmd?.options) {
    const flagOptions = cmd.options.map((o) => o.flag);
    const matches = flagOptions.filter((f) => f.startsWith(currentToken));
    if (matches.length > 0) {
      return {
        suggestion: matches.length === 1 ? `${matches[0]} ` : findCommonPrefix(matches),
        matches,
        prefix: currentToken,
        isPartial: matches.length > 1
      };
    }
  }

  // Custom command autocompletion if defined
  if (cmd?.autocomplete) {
    const customMatches = cmd.autocomplete(tokens.slice(1), cwd);
    const filtered = customMatches.filter((m) => m.toLowerCase().startsWith(currentToken.toLowerCase()));
    if (filtered.length > 0) {
      return {
        suggestion: filtered.length === 1 ? `${filtered[0]} ` : findCommonPrefix(filtered),
        matches: filtered,
        prefix: currentToken,
        isPartial: filtered.length > 1
      };
    }
  }

  // File system path autocompletion for navigation or cat/cd/open commands
  if (['cat', 'cd', 'ls', 'open', 'tree'].includes(commandName) || isPathLike(currentToken)) {
    const targetPath = currentToken || '.';
    let dirPathToSearch = cwd;
    let filePrefix = '';

    if (targetPath.includes('/')) {
      const lastSlashIdx = targetPath.lastIndexOf('/');
      const parentDirPart = targetPath.slice(0, lastSlashIdx) || '/';
      filePrefix = targetPath.slice(lastSlashIdx + 1);
      dirPathToSearch = vfsInstance.normalizePath(parentDirPart, cwd);
    } else {
      filePrefix = targetPath;
      if (targetPath === '.') filePrefix = '';
    }

    const listRes = vfsInstance.listDirectory(dirPathToSearch, '/');
    if (listRes.success && listRes.nodes) {
      const matches = listRes.nodes
        .filter((n) => n.name.toLowerCase().startsWith(filePrefix.toLowerCase()))
        .map((n) => {
          const suffix = n.type === 'directory' ? '/' : '';
          if (targetPath.includes('/')) {
            const lastSlashIdx = targetPath.lastIndexOf('/');
            return `${targetPath.slice(0, lastSlashIdx + 1)}${n.name}${suffix}`;
          }
          return `${n.name}${suffix}`;
        });

      if (matches.length > 0) {
        return {
          suggestion: matches.length === 1 ? matches[0] : findCommonPrefix(matches),
          matches,
          prefix: currentToken,
          isPartial: matches.length > 1
        };
      }
    }
  }

  return null;
}

function isPathLike(str: string): boolean {
  return (
    str.startsWith('/') || str.startsWith('~') || str.startsWith('./') || str.startsWith('../')
  );
}

function findCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
