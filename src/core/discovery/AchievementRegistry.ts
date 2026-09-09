import { Achievement } from '../../types/achievements';
import { initialAchievements } from '../achievements/achievementsData';

export class AchievementRegistry {
  private static instance: AchievementRegistry;
  private achievements: Map<string, Achievement> = new Map();

  constructor() {
    this.loadDefaults();
  }

  public static getInstance(): AchievementRegistry {
    if (!AchievementRegistry.instance) {
      AchievementRegistry.instance = new AchievementRegistry();
    }
    return AchievementRegistry.instance;
  }

  private loadDefaults(): void {
    initialAchievements.forEach((a) => {
      this.achievements.set(a.id, a);
      this.achievements.set(a.code, a);
    });
  }

  public register(achievement: Achievement): void {
    this.achievements.set(achievement.id, achievement);
    this.achievements.set(achievement.code, achievement);
  }

  public get(idOrCode: string): Achievement | undefined {
    return this.achievements.get(idOrCode) || this.achievements.get(idOrCode.toUpperCase()) || this.achievements.get(idOrCode.toLowerCase());
  }

  public getByCode(code: string): Achievement | undefined {
    return this.achievements.get(code.toUpperCase());
  }

  public getAll(): Achievement[] {
    // Return unique achievements by ID
    const unique = new Map<string, Achievement>();
    this.achievements.forEach((a) => unique.set(a.id, a));
    return Array.from(unique.values());
  }

  public getByCategory(category: string): Achievement[] {
    return this.getAll().filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  public getSecretAchievements(): Achievement[] {
    return this.getAll().filter((a) => a.isSecret);
  }
}

export const achievementRegistry = AchievementRegistry.getInstance();
