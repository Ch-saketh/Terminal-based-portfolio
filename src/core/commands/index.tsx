import { commandRegistry } from '../cli/registry';
import { systemCommands } from './system';
import { navigationCommands } from './navigation';
import { portfolioCommands } from './portfolio';
import { easterEggCommands } from './easterEggs';

export function registerAllCommands(): void {
  const all = [
    ...systemCommands,
    ...navigationCommands,
    ...portfolioCommands,
    ...easterEggCommands
  ];

  all.forEach((c) => commandRegistry.register(c));
}
