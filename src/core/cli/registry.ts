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
   * Register an array of command definitions.
   */
  public registerMany(commands: CommandDefinition[]): void {
    commands.forEach((cmd) => this.register(cmd));
  }

  /**
   * Unregister a command by its primary name or alias.
   */
  public unregister(nameOrAlias: string): boolean {
    const key = nameOrAlias.toLowerCase();
    const primary = this.aliasMap.get(key) || key;
    const cmd = this.commands.get(primary);

    if (!cmd) return false;

    // Remove aliases
    if (cmd.aliases) {
      cmd.aliases.forEach((alias) => {
        this.aliasMap.delete(alias.toLowerCase());
      });
    }

    this.commands.delete(primary);
    return true;
  }

  /**
   * Checks if a command or alias is registered.
   */
  public hasCommand(nameOrAlias: string): boolean {
    const key = nameOrAlias.toLowerCase();
    return this.commands.has(key) || this.aliasMap.has(key);
  }

  /**
   * Reset all registered commands.
   */
  public clear(): void {
    this.commands.clear();
    this.aliasMap.clear();
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

