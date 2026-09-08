import { commandRegistry } from './registry';

/**
 * Calculates Levenshtein Distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Finds the closest matching registered command name if distance <= threshold.
 */
export function findCommandSuggestion(mistyped: string, maxDistance = 2): string | null {
  const clean = mistyped.toLowerCase();
  const allCommands = commandRegistry.getAllCommands();

  const candidates = new Set<string>();
  allCommands.forEach((cmd) => {
    candidates.add(cmd.name);
    cmd.aliases?.forEach((alias) => candidates.add(alias));
  });

  let bestMatch: string | null = null;
  let lowestDist = Infinity;

  candidates.forEach((candidate) => {
    const dist = levenshteinDistance(clean, candidate);
    if (dist < lowestDist && dist <= maxDistance) {
      lowestDist = dist;
      bestMatch = candidate;
    }
  });

  return bestMatch;
}
