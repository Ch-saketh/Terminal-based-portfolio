import { ExperienceItem } from '../types/content';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-handshake-ai',
    role: 'AI Technical Trainer & Code Evaluator (Contract)',
    company: 'Handshake AI',
    location: 'Remote',
    type: 'Contract',
    period: {
      start: '2025',
      end: 'Present',
      isCurrent: true
    },
    summary:
      'Evaluate AI-generated code snippets and system designs across Python, Java, and SQL for logical correctness, performance, and security edge cases.',
    impactMetrics: [
      'Authored complex technical test prompts and benchmark suites to evaluate LLM reasoning capabilities and code output reliability',
      'Assessed multi-language implementations for algorithmic efficiency, memory safety, and vulnerability vectors',
      'Provided structured evaluation feedback directly improving LLM coding performance across backend domains'
    ],
    keyAchievements: [
      'Designed rigorous evaluation test cases covering complex data structures, concurrency, and SQL optimization',
      'Benchmarked reasoning pathways of frontier language models across real-world software engineering tasks',
      'Established high standards for automated code evaluation rubrics across Python and Java architectures'
    ],
    technologies: [
      'Python',
      'Java',
      'SQL',
      'System Design',
      'LLM Benchmarking',
      'Security Analysis'
    ]
  },
  {
    id: 'exp-nexlevr',
    role: 'Software Engineering Intern',
    company: 'NexLevr',
    location: 'Remote',
    type: 'Internship',
    period: {
      start: '2024',
      end: 'Present',
      isCurrent: true
    },
    summary:
      'Maintain backend stability for the NexLevr platform while developing new features to enhance user engagement and platform scalability.',
    impactMetrics: [
      'Contributed to full-stack web development and REST API integration across core platform services',
      'Maintained backend service uptime and optimized database query handling for smooth user experiences',
      'Built responsive UI features and connected real-time data flows across the web application'
    ],
    keyAchievements: [
      'Developed and shipped production REST API endpoints with robust input validation and error handling',
      'Collaborated closely with engineering team to debug edge cases and accelerate sprint deliverables',
      'Enhanced platform responsiveness and user onboarding flows through modular frontend components'
    ],
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'REST APIs',
      'PostgreSQL',
      'JavaScript',
      'Git'
    ]
  }
];
