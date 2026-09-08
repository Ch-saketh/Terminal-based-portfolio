import { commandRegistry } from '../cli/registry';
import { systemCommands } from './system';
import { navigationCommands } from './navigation';
import { portfolioCommands } from './portfolio';
import { gitCommands } from './git';
import { easterEggCommands } from './easterEggs';

export function registerAllCommands(): void {
  const all = [
    ...systemCommands,
    ...navigationCommands,
    ...portfolioCommands,
    ...gitCommands,
    ...easterEggCommands
  ];

  all.forEach((c) => commandRegistry.register(c));
}
