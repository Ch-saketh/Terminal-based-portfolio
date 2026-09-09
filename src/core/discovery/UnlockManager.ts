import { achievementRegistry } from './AchievementRegistry';
import { useAchievementStore } from '../../state/useAchievementStore';

export class UnlockManager {
  private static instance: UnlockManager;
  private viewedProjects: Set<string> = new Set();
  private viewedArchitectures: Set<string> = new Set();
  private viewedMetrics: Set<string> = new Set();

  public static getInstance(): UnlockManager {
    if (!UnlockManager.instance) {
      UnlockManager.instance = new UnlockManager();
    }
    return UnlockManager.instance;
  }

  /**
   * Unlock an achievement by id or code.
   * Persisted locally in localStorage via useAchievementStore.
   */
  public unlock(idOrCode: string): boolean {
    const ach = achievementRegistry.get(idOrCode);
    if (!ach) {
      // Direct pass-through to store in case of custom codes
      return useAchievementStore.getState().unlockAchievement(idOrCode);
    }
    return useAchievementStore.getState().unlockAchievement(ach.id);
  }

  public isUnlocked(idOrCode: string): boolean {
    const ach = achievementRegistry.get(idOrCode);
    const storeAchievements = useAchievementStore.getState().achievements;
    if (!ach) {
      return storeAchievements.some((a) => (a.id === idOrCode || a.code === idOrCode) && a.unlocked);
    }
    return storeAchievements.some((a) => a.id === ach.id && a.unlocked);
  }

  /**
   * Trigger on first OS boot.
   */
  public onBoot(): void {
    this.unlock('FIRST_BOOT');
  }

  /**
   * Trigger when user explores projects or filesystem.
   */
  public onProjectExploration(): void {
    this.unlock('EXPLORER');
  }

  /**
   * Trigger when user inspects a project.
   */
  public onProjectViewed(slug: string): void {
    this.viewedProjects.add(slug);
    this.unlock('EXPLORER');
    if (this.viewedProjects.size >= 1) {
      this.unlock('BUILDER');
    }
  }

  /**
   * Trigger when user views project architecture.
   */
  public onArchitectureViewed(slug: string): void {
    this.viewedArchitectures.add(slug);
    this.unlock('SYSTEM_ARCHITECT');
  }

  /**
   * Trigger when user inspects project metrics or production scale.
   */
  public onMetricsViewed(slug: string): void {
    this.viewedMetrics.add(slug);
    this.unlock('SHIP_IT');
  }

  /**
   * Evaluates CLI command executions for secret conditions.
   */
  public onCommandExecuted(
    command: string,
    args: string[] = [],
    _flags: Record<string, any> = {},
    cwd: string = '/'
  ): void {
    const cmd = command.toLowerCase().trim();
    const joinedArgs = args.join(' ').toLowerCase().trim();

    // 1. Projects exploration
    if (cmd === 'projects' || (cmd === 'cd' && (joinedArgs.includes('project') || cwd.includes('/projects')))) {
      this.onProjectExploration();
    }

    // 2. Architecture inspection
    if (
      (cmd === 'cat' && (joinedArgs.includes('architecture') || joinedArgs.includes('system-design'))) ||
      (cmd === 'cd' && joinedArgs.includes('architecture'))
    ) {
      this.unlock('SYSTEM_ARCHITECT');
    }

    // 3. Metrics inspection
    if (cmd === 'cat' && joinedArgs.includes('metrics.json')) {
      this.unlock('SHIP_IT');
    }

    // 4. Hackathon inspection
    if (cmd === 'achievements' || (cmd === 'cat' && joinedArgs.includes('quantum-e-auction'))) {
      this.unlock('HACKATHON');
    }

    // 5. Secret sudo make-me-hireable
    if (cmd === 'sudo' && (joinedArgs === 'make-me-hireable' || joinedArgs === 'hire')) {
      this.unlock('CLASSIFIED');
    }

    // 6. Neofetch -> Explorer
    if (cmd === 'neofetch' || cmd === 'sysinfo') {
      this.unlock('EXPLORER');
    }

    // 7. Matrix -> Matrix Rain
    if (cmd === 'matrix') {
      this.unlock('MATRIX_RAIN');
    }

    // 8. Fortune -> Philosopher
    if (cmd === 'fortune' || cmd === 'quote') {
      this.unlock('PHILOSOPHER');
    }

    // 9. Hack -> System Auditor
    if (cmd === 'hack') {
      this.unlock('SYSTEM_AUDITOR');
    }
  }

  /**
   * Current discovery progression summary.
   */
  public getProgress(): { unlocked: number; total: number; percent: number } {
    const stats = useAchievementStore.getState().getStats();
    return {
      unlocked: stats.unlockedCount,
      total: stats.total,
      percent: stats.percent
    };
  }
}

export const unlockManager = UnlockManager.getInstance();
