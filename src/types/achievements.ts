export type AchievementCategory = 'discovery' | 'system' | 'projects' | 'mastery' | 'secrets';

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  hint: string;
  category: AchievementCategory;
  isSecret: boolean;
  unlocked: boolean;
  unlockedAt?: string | null;
  xp: number;
  iconName: string;
}

export interface AchievementStats {
  total: number;
  unlockedCount: number;
  percent: number;
  totalXp: number;
  earnedXp: number;
  rank: string;
}
