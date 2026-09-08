import { ParsedCommand } from '../../types/terminal';

/**
 * Tokenizes a command line string respecting single/double quotes and escaped spaces.
 */
export function tokenizeCommandLine(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const tokens: string[] = [];
  let currentToken = '';
  let insideQuotes: string | null = null;
  let isEscaped = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (isEscaped) {
      currentToken += char;
      isEscaped = false;
      continue;
    }

    if (char === '\\') {
      isEscaped = true;
      continue;
    }

    if (char === '"' || char === "'") {
      if (insideQuotes === char) {
        insideQuotes = null; // Close quote
      } else if (insideQuotes === null) {
        insideQuotes = char; // Open quote
      } else {
        currentToken += char; // Nested different quote
      }
      continue;
    }

    if (/\s/.test(char) && insideQuotes === null) {
      if (currentToken.length > 0) {
        tokens.push(currentToken);
        currentToken = '';
      }
    } else {
      currentToken += char;
    }
  }

  if (currentToken.length > 0) {
    tokens.push(currentToken);
  }

  return tokens;
}

/**
 * Parses raw tokens into a structured Command object (name, args, flags).
 */
export function parseCommand(rawInput: string): ParsedCommand | null {
  const tokens = tokenizeCommandLine(rawInput);
  if (tokens.length === 0) return null;

  const commandName = tokens[0].toLowerCase();
  const rawArgs = tokens.slice(1);
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < rawArgs.length; i++) {
    const token = rawArgs[i];

    if (token.startsWith('--')) {
      // Long flag: --tag=ai or --all
      const clean = token.slice(2);
      if (clean.includes('=')) {
        const [key, val] = clean.split('=', 2);
        flags[key] = val;
      } else {
        // Check if next token is a value or another flag
        const nextToken = rawArgs[i + 1];
        if (nextToken && !nextToken.startsWith('-')) {
          flags[clean] = nextToken;
          i++; // Consume next token
        } else {
          flags[clean] = true;
        }
      }
    } else if (token.startsWith('-') && token.length > 1 && !/^\d/.test(token.slice(1))) {
      // Short flags: -la or -v
      const chars = token.slice(1);
      if (chars.length === 1) {
        const nextToken = rawArgs[i + 1];
        if (nextToken && !nextToken.startsWith('-')) {
          flags[chars] = nextToken;
          i++;
        } else {
          flags[chars] = true;
        }
      } else {
        // Combined short flags: -la => flags.l = true, flags.a = true
        for (const c of chars) {
          flags[c] = true;
        }
      }
    } else {
      args.push(token);
    }
  }

  return {
    raw: rawInput,
    name: commandName,
    args,
    flags
  };
}
