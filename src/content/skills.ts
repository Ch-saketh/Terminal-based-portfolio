import { SkillCategory } from '../types/content';

export const skillsData: SkillCategory[] = [
  {
    category: 'Systems & Backend Engineering',
    iconName: 'Server',
    description:
      'High-throughput concurrency, asynchronous runtimes, distributed protocols, and API design.',
    skills: [
      {
        name: 'Go (Golang)',
        level: 'Expert',
        years: 5,
        tags: ['Goroutines', 'Channels', 'gRPC', 'Standard Lib']
      },
      {
        name: 'Rust',
        level: 'Advanced',
        years: 4,
        tags: ['Tokio', 'Memory Safety', 'Async', 'FFI']
      },
      {
        name: 'TypeScript / Node.js',
        level: 'Expert',
        years: 6,
        tags: ['V8 Internals', 'Async/Await', 'Generics']
      },
      {
        name: 'Python',
        level: 'Advanced',
        years: 5,
        tags: ['FastAPI', 'Data Pipelines', 'Asyncio']
      },
      {
        name: 'Java / Kotlin',
        level: 'Proficient',
        years: 3,
        tags: ['Spring Boot', 'Kafka Streams']
      }
    ]
  },
  {
    category: 'Distributed Systems & Cloud Architecture',
    iconName: 'Cloud',
    description:
      'Cloud native infrastructure, container orchestration, networking, and high availability.',
    skills: [
      {
        name: 'Kubernetes & Docker',
        level: 'Expert',
        years: 5,
        tags: ['CRDs', 'Operators', 'Helm', 'Containerd']
      },
      {
        name: 'GCP & AWS',
        level: 'Expert',
        years: 5,
        tags: ['GKE/EKS', 'VPC Peering', 'IAM', 'Cloud Run']
      },
      {
        name: 'Terraform & IaC',
        level: 'Advanced',
        years: 4,
        tags: ['Modular HCL', 'State Locks', 'Terragrunt']
      },
      {
        name: 'Service Mesh & Ingress',
        level: 'Advanced',
        years: 4,
        tags: ['Istio', 'Envoy', 'Nginx', 'eBPF']
      },
      {
        name: 'CI/CD Pipelines',
        level: 'Expert',
        years: 6,
        tags: ['GitHub Actions', 'ArgoCD', 'GitOps']
      }
    ]
  },
  {
    category: 'Data Storage & Event Streaming',
    iconName: 'Database',
    description:
      'Columnar data warehouses, distributed caches, transactional databases, and message brokers.',
    skills: [
      {
        name: 'PostgreSQL & MySQL',
        level: 'Expert',
        years: 6,
        tags: ['Query Optimization', 'Partitioning', 'WAL']
      },
      {
        name: 'Apache Kafka & RabbitMQ',
        level: 'Expert',
        years: 4,
        tags: ['Kafka Streams', 'Partitions', 'CDC']
      },
      {
        name: 'Redis & Memcached',
        level: 'Expert',
        years: 5,
        tags: ['Clustering', 'Lua Scripts', 'Pipelines']
      },
      {
        name: 'ClickHouse & BigQuery',
        level: 'Advanced',
        years: 3,
        tags: ['Columnar Storage', 'Vectorized Analytics']
      },
      {
        name: 'Elasticsearch & Vector DBs',
        level: 'Advanced',
        years: 4,
        tags: ['HNSW', 'Inverted Index', 'Embeddings']
      }
    ]
  },
  {
    category: 'Frontend & Developer Experience',
    iconName: 'Layout',
    description:
      'Modern reactive component architectures, state machines, web performance, and terminal UIs.',
    skills: [
      {
        name: 'React 18 / 19',
        level: 'Expert',
        years: 6,
        tags: ['Hooks', 'Concurrent Mode', 'Server Components']
      },
      {
        name: 'CSS Architecture & Tokens',
        level: 'Expert',
        years: 6,
        tags: ['CSS Variables', 'Animation', 'Responsive']
      },
      {
        name: 'Vite & Build Tooling',
        level: 'Expert',
        years: 4,
        tags: ['Rollup Plugins', 'ESM', 'HMR']
      },
      {
        name: 'Web Audio API',
        level: 'Advanced',
        years: 3,
        tags: ['Oscillators', 'BiquadFilter', 'Synthesis']
      },
      {
        name: 'Testing & Quality',
        level: 'Expert',
        years: 6,
        tags: ['Vitest', 'Playwright', 'RTL', 'Coverage']
      }
    ]
  }
];
