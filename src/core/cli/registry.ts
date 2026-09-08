import { CommandDefinition } from '../../types/terminal';

class CommandRegistry {
  private commands: Map<string, CommandDefinition> = new Map();
  private aliasMap: Map<string, string> = new Map();

  /**
   * Register a new command definition.
   */
  public register(command: CommandDefinition): void {
    const primaryName = command.name.toLowerCase();
    this.commands.set(primaryName, command);

    if (command.aliases) {
      command.aliases.forEach((alias) => {
        this.aliasMap.set(alias.toLowerCase(), primaryName);
      });
    }
  }

  /**
   * Retrieve a command by name or alias.
   */
  public getCommand(nameOrAlias: string): CommandDefinition | undefined {
    const key = nameOrAlias.toLowerCase();
    if (this.commands.has(key)) {
      return this.commands.get(key);
    }
    const resolvedPrimary = this.aliasMap.get(key);
    if (resolvedPrimary) {
      return this.commands.get(resolvedPrimary);
    }
    return undefined;
  }

  /**
   * Returns all unique registered commands.
   */
  public getAllCommands(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  /**
   * Returns commands filtered by category.
   */
  public getByCategory(category: CommandDefinition['category']): CommandDefinition[] {
    return this.getAllCommands().filter((cmd) => cmd.category === category);
  }
}

export const commandRegistry = new CommandRegistry();
