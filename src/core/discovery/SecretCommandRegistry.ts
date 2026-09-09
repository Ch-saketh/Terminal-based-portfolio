import { CommandDefinition } from '../../types/terminal';

export class SecretCommandRegistry {
  private static instance: SecretCommandRegistry;
  private secrets: Map<string, CommandDefinition> = new Map();
  private discovered: Set<string> = new Set();

  constructor() {
    this.loadDiscoveredState();
  }

  public static getInstance(): SecretCommandRegistry {
    if (!SecretCommandRegistry.instance) {
      SecretCommandRegistry.instance = new SecretCommandRegistry();
    }
    return SecretCommandRegistry.instance;
  }

  private loadDiscoveredState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem('saketh_os_discovered_secrets');
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            list.forEach((s) => this.discovered.add(s));
          }
        }
      } catch {
        // Fallback gracefully without tracking
      }
    }
  }

  private saveDiscoveredState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(
          'saketh_os_discovered_secrets',
          JSON.stringify(Array.from(this.discovered))
        );
      } catch {
        // Safe persistence fallback
      }
    }
  }

  public registerSecret(cmd: CommandDefinition): void {
    this.secrets.set(cmd.name.toLowerCase(), cmd);
    if (cmd.aliases) {
      cmd.aliases.forEach((alias) => this.secrets.set(alias.toLowerCase(), cmd));
    }
  }

  public getSecret(name: string): CommandDefinition | undefined {
    return this.secrets.get(name.toLowerCase());
  }

  public getAllSecrets(): CommandDefinition[] {
    const unique = new Map<string, CommandDefinition>();
    this.secrets.forEach((c) => unique.set(c.name, c));
    return Array.from(unique.values());
  }

  public getSecretCommands(): CommandDefinition[] {
    return this.getAllSecrets();
  }

  public isSecret(name: string): boolean {
    return this.secrets.has(name.toLowerCase());
  }

  public markDiscovered(name: string): void {
    const norm = name.toLowerCase();
    this.discovered.add(norm);
    this.saveDiscoveredState();
  }

  public discover(name: string): void {
    this.markDiscovered(name);
  }

  public isDiscovered(name: string): boolean {
    return this.discovered.has(name.toLowerCase());
  }

  public getDiscoveredCount(): number {
    return this.discovered.size;
  }
}

export const secretCommandRegistry = SecretCommandRegistry.getInstance();
