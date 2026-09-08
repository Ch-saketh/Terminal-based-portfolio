import { ExperienceItem } from '../types/content';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-principal-lead',
    role: 'Lead Systems Architect & Full-Stack Engineer',
    company: 'Nexus Distributed Tech',
    location: 'Remote / Global',
    type: 'Full-time',
    period: {
      start: '2023',
      end: 'Present',
      isCurrent: true
    },
    summary:
      'Led the architectural overhaul of mission-critical event streaming pipelines and microservice edge routing infrastructure.',
    impactMetrics: [
      'Scaled event ingestion from 200M to 1.8B daily events with 99.995% delivery reliability',
      'Reduced p99 edge API latency from 45ms to 3.8ms across 12 global regions',
      'Architected automated disaster recovery and chaos engineering drills cutting MTTR by 65%'
    ],
    keyAchievements: [
      'Mentored a team of 9 senior engineers across Go, Rust, and TypeScript tracks',
      'Designed and deployed internal developer portal and CLI toolchain accelerating onboarding time by 3x',
      'Championed zero-trust security architecture with mutual TLS and automated certificate rotation'
    ],
    technologies: [
      'Go',
      'Rust',
      'Kubernetes',
      'Kafka',
      'PostgreSQL',
      'Redis',
      'Terraform',
      'Prometheus'
    ]
  },
  {
    id: 'exp-senior-backend',
    role: 'Senior Backend Engineer',
    company: 'HyperScale Cloud Platform',
    location: 'Bangalore, IN',
    type: 'Full-time',
    period: {
      start: '2021',
      end: '2023',
      isCurrent: false
    },
    summary:
      'Core contributor to multi-tenant cloud storage orchestration and asynchronous worker scheduling subsystem.',
    impactMetrics: [
      'Engineered distributed lock manager and worker pool processing 50,000+ jobs/min',
      'Optimized database connection pooling and slow queries, saving $120,000 in monthly AWS infrastructure cost'
    ],
    keyAchievements: [
      'Spearheaded migration from monolithic Ruby on Rails to event-driven Go microservices',
      'Authored RFCs for idempotent API patterns and database partitioning schemas',
      'Implemented automated regression testing pipeline with 92% code coverage threshold'
    ],
    technologies: ['Go', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Redis', 'gRPC']
  },
  {
    id: 'exp-software-engineer',
    role: 'Software Engineer',
    company: 'Velocity Systems',
    location: 'Bangalore, IN',
    type: 'Full-time',
    period: {
      start: '2019',
      end: '2021',
      isCurrent: false
    },
    summary:
      'Developed high-concurrency client-facing APIs and real-time dashboard analytics interfaces.',
    impactMetrics: [
      'Shipped real-time collaborative workspace used by 150,000+ active enterprise users',
      'Reduced web client bundle size by 54% through code-splitting and asset optimization'
    ],
    keyAchievements: [
      'Constructed modular frontend component system adopted by 4 cross-functional product teams',
      'Integrated WebSocket state synchronization engine with optimistic client-side updates'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'Docker', 'PostgreSQL', 'Jest']
  }
];
