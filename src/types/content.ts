export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category:
    | 'Distributed Systems'
    | 'AI / Machine Learning'
    | 'Cloud Architecture'
    | 'Developer Tools'
    | 'Full Stack';
  tagline: string;
  description: string;
  highlights: string[];
  architecture: {
    overview: string;
    keyDecisions: string[];
  };
  metrics: string[];
  techStack: {
    core: string[];
    infrastructure: string[];
    databases: string[];
    tools: string[];
  };
  links: {
    github?: string;
    liveDemo?: string;
    docs?: string;
  };
  featured: boolean;
  status: 'production' | 'active' | 'archived';
  stars?: number;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    years: number;
    tags: string[];
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source';
  period: {
    start: string;
    end: string;
    isCurrent?: boolean;
  };
  summary: string;
  impactMetrics: string[];
  keyAchievements: string[];
  technologies: string[];
}

export interface DeveloperProfile {
  name: string;
  handle: string;
  headline: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  gpgKeyFingerprint: string;
  bio: string[];
  stats: {
    yearsExperience: number;
    productionDeployments: string;
    openSourceContributions: string;
    systemUptime: string;
  };
}
