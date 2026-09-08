export interface ProjectItem {
  id: string;
  name: string;
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
  what: string;
  why: string;
  how: string;
  problem: string;
  solution: string;
  highlights: string[];
  architecture: {
    overview: string;
    keyDecisions: string[];
    diagramAscii?: string;
  };
  features: string[];
  challenges: {
    challenge: string;
    resolution: string;
  }[];
  learnings: string[];
  metrics: string[];
  technologies: string[];
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
  images?: {
    caption: string;
    url: string;
  }[];
  featured: boolean;
  status: 'production' | 'active' | 'archived';
  stars?: number;
}

export type SkillClassification = 'Primary' | 'Working Knowledge' | 'Exploring';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  classification: SkillClassification;
  asciiMeter: string;
  experienceYears?: number;
  whatUsedFor: string;
  associatedProjects: {
    name: string;
    slug: string;
  }[];
  engineeringConcepts: string[];
  relatedTech: string[];
  keyCapabilities: string[];
}

export interface SkillCategory {
  category: string;
  slug: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
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

export interface EducationItem {
  degree: string;
  institution: string;
  timeline: string;
  location: string;
  focus: string[];
  gpa?: string;
}

export interface DeveloperProfile {
  name: string;
  handle: string;
  roles: string[];
  headline: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  gpgKeyFingerprint: string;
  bio: string[];
  education: EducationItem[];
  engineeringInterests: string[];
  developmentPhilosophy: {
    title: string;
    description: string;
  }[];
  currentFocus: string[];
  longTermGoals: string[];
  profileJson: {
    role: string;
    focus: string[];
    interests: string[];
    currently_learning: string[];
    core_competencies: string[];
    philosophy: string[];
    education: {
      degree: string;
      school: string;
      year: string;
    };
  };
  stats: {
    yearsExperience: number;
    productionDeployments: string;
    openSourceContributions: string;
    systemUptime: string;
  };
}
