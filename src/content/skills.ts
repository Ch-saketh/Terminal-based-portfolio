import { SkillCategory } from '../types/content';

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    slug: 'languages',
    iconName: 'Code',
    description: 'Core programming languages for systems, backend services, AI models, and web applications.',
    skills: [
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Building type-safe client-side operating systems, high-concurrency Node.js microservices, and React application architectures.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Generic Constraints', 'Discriminated Unions', 'AST Generation', 'Conditional Types', 'Type Narrowing'],
        relatedTech: ['Node.js', 'React', 'JavaScript', 'Vite'],
        keyCapabilities: ['Strict Compiler Modes', 'Utility Types', 'Interface Contracts', 'ESM / CJS Interop']
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Developing AI inference microservices, vector embedding pipelines, asynchronous web scrapers, and data pipelines.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Asyncio Event Loops', 'Pydantic Data Models', 'Memory Profiling', 'Multiprocessing Pools', 'Vector Computation'],
        relatedTech: ['FastAPI', 'PyTorch', 'Qdrant', 'Celery', 'Playwright'],
        keyCapabilities: ['Asynchronous Runtimes', 'FastEmbed Integration', 'Type Annotations (mypy)', 'REST API Design']
      },
      {
        id: 'java',
        name: 'Java',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Enterprise-grade microservices, transactional backend workflows, Spring Boot APIs, and robust auth filters.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['JVM Memory Model', 'Garbage Collection Tuning', 'Multi-threaded Concurrency', 'Reflection', 'Dependency Injection'],
        relatedTech: ['Spring Boot', 'Spring Security', 'Maven', 'Lombok', 'JUnit'],
        keyCapabilities: ['Spring Boot 3', 'JWT Authentication Filter', 'JPA / Hibernate', 'High-Throughput Concurrency']
      },
      {
        id: 'golang',
        name: 'Go (Golang)',
        category: 'Languages',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'High-concurrency WebSocket connection hubs, room state synchronization, and low-latency network proxies.',
        associatedProjects: [
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Goroutines & Channels', 'Mutex Synchronization', 'Non-blocking I/O', 'Memory Allocation', 'Go Standard Library'],
        relatedTech: ['Gorilla WebSockets', 'gRPC', 'Docker'],
        keyCapabilities: ['Concurrent Connection Multiplexing', 'Sub-millisecond Routing', 'Zero-allocation Buffering']
      },
      {
        id: 'rust',
        name: 'Rust',
        category: 'Languages',
        classification: 'Exploring',
        asciiMeter: '████████',
        experienceYears: 1,
        whatUsedFor: 'Exploring systems programming, memory-safe data structures, async runtimes, and WebAssembly compilation.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' }
        ],
        engineeringConcepts: ['Borrow Checker & Lifetimes', 'Tokio Async Runtime', 'Zero-Cost Abstractions', 'Trait Bounds', 'Pattern Matching'],
        relatedTech: ['Tokio', 'Wasm-pack', 'Cargo'],
        keyCapabilities: ['Memory Safety without GC', 'Fearless Concurrency', 'WebAssembly Runtimes']
      },
      {
        id: 'sql',
        name: 'SQL',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Designing relational schemas, complex analytical queries, indexing strategies, and database migrations.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['ACID Transactions', 'B-Tree & GIN Indexing', 'EXPLAIN ANALYZE', 'Window Functions', 'Partitioning'],
        relatedTech: ['PostgreSQL', 'MySQL', 'Prisma', 'Hibernate'],
        keyCapabilities: ['Query Optimization', 'Schema Normalization', 'Deadlock Avoidance', 'JSONB Querying']
      }
    ]
  },
  {
    category: 'Backend',
    slug: 'backend',
    iconName: 'Server',
    description: 'Server frameworks, distributed communication protocols, microservices, and asynchronous task workers.',
    skills: [
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Architecting core services, JWT auth filters, catalog hydration pipelines, and RESTful service orchestration.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Inversion of Control (IoC)', 'Aspect-Oriented Programming (AOP)', 'Filter Chains', 'Connection Pooling', 'Transactional Boundaries'],
        relatedTech: ['Java', 'Spring Security', 'PostgreSQL', 'Redis', 'JPA'],
        keyCapabilities: ['JWT Auth Architecture', 'Exception Interceptors', 'High-Concurrency Servlets', 'Actuator Health Metrics']
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Building low-latency AI inference microservices, vector generation endpoints, and crawler scheduling APIs.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Asynchronous Request Handling', 'Pydantic Validation', 'Dependency Injection', 'OpenAPI Schema Generation', 'Background Tasks'],
        relatedTech: ['Python', 'Uvicorn', 'Qdrant', 'PyTorch', 'Celery'],
        keyCapabilities: ['Sub-20ms Request Overhead', 'Async Vector Pipelines', 'Batch Processing Handlers']
      },
      {
        id: 'nodejs',
        name: 'Node.js & Express',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Developing real-time API services, WebSocket gateways, and custom build-tool servers.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Event Loop & Libuv', 'Stream Buffering', 'Middleware Pipeline Pattern', 'Cluster Module'],
        relatedTech: ['TypeScript', 'Express', 'Socket.io', 'WS'],
        keyCapabilities: ['Non-blocking I/O', 'Streaming Response Endpoints', 'JSON Middleware']
      },
      {
        id: 'rest-apis',
        name: 'REST APIs & WebSockets',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Designing resilient client-server protocols, stateless API contracts, and bidirectional real-time sockets.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'CinePortal', slug: 'cineportal' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Statelessness', 'Idempotency', 'HTTP/1.1 vs HTTP/2', 'WebSocket Handshake', 'Heartbeat Pings & Reconnects'],
        relatedTech: ['Spring Boot', 'FastAPI', 'Gorilla WebSockets', 'Axios'],
        keyCapabilities: ['API Versioning', 'Rate-Limiting Headers', 'Structured Error Payloads', 'Binary Frame Streaming']
      },
      {
        id: 'celery',
        name: 'Celery & Task Queues',
        category: 'Backend',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Orchestrating distributed web scraping jobs, asynchronous batch embedding jobs, and cron scheduling.',
        associatedProjects: [
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Task Serialization', 'Prefetch Multipliers', 'Dead Letter Queues', 'Worker Acknowledgments', 'Exponential Backoff'],
        relatedTech: ['Redis Broker', 'Python', 'Flower', 'PostgreSQL'],
        keyCapabilities: ['Distributed Worker Concurrency', 'Task Retries', 'Result Backend Hydration']
      }
    ]
  },
  {
    category: 'Frontend',
    slug: 'frontend',
    iconName: 'Layout',
    description: 'Modern component architectures, state machines, design systems, and responsive terminal UX.',
    skills: [
      {
        id: 'react',
        name: 'React 18 / 19',
        category: 'Frontend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Engineering interactive terminal operating systems, high-density HUD dashboards, and reactive web applications.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Reconciliation & Virtual DOM', 'Custom Hook Extraction', 'Fiber Tree Architecture', 'State Colocation', 'Memoization'],
        relatedTech: ['TypeScript', 'Zustand', 'Vite', 'Tailwind CSS'],
        keyCapabilities: ['Atomic Zustand Store Binding', 'Zero-Lag 60fps Terminal Buffer', 'Dynamic Command Renderers']
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        category: 'Frontend',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 3,
        whatUsedFor: 'Server-side rendered streaming apps, SEO-optimized web dashboards, and API route proxies.',
        associatedProjects: [
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Server Side Rendering (SSR)', 'Static Site Generation (SSG)', 'App Router', 'Hydration Boundaries', 'Route Handlers'],
        relatedTech: ['React', 'TypeScript', 'Tailwind CSS'],
        keyCapabilities: ['Dynamic Route Generation', 'Server Actions', 'Optimized Font & Asset Pipeline']
      },
      {
        id: 'css-architecture',
        name: 'Vanilla CSS & Design Tokens',
        category: 'Frontend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Building zero-runtime CSS token architectures, terminal glow effects, scanlines, and fluid responsive layouts.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['CSS Custom Properties', 'BEM Naming', 'CSS Grid & Flexbox Matrix', 'Hardware Acceleration (GPU)', 'Prefers-Reduced-Motion'],
        relatedTech: ['CSS Modules', 'PostCSS', 'Design Tokens'],
        keyCapabilities: ['Dark-Theme Token Foundations', 'Scanline CRT Overlays', 'Responsive Breakpoint Matrices']
      },
      {
        id: 'web-audio',
        name: 'Web Audio API',
        category: 'Frontend',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Procedural audio synthesis for keyboard clicks, boot chords, and system alerts without audio file downloads.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' }
        ],
        engineeringConcepts: ['AudioContext Graphs', 'Oscillator Nodes', 'Gain Envelopes (ADSR)', 'Biquad Filters', 'Frequency Modulation'],
        relatedTech: ['Web Audio API', 'TypeScript'],
        keyCapabilities: ['Procedural Keyclick Chords', 'Boot Sequence Audio Arpeggios', 'Zero Network Asset Overhead']
      }
    ]
  },
  {
    category: 'AI / ML',
    slug: 'ai',
    iconName: 'Cpu',
    description: 'Vector embeddings, semantic search, hybrid RAG, multi-modal model integration, and vector databases.',
    skills: [
      {
        id: 'qdrant',
        name: 'Qdrant Vector Database',
        category: 'AI / ML',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'High-dimensional vector storage, HNSW semantic search, and payload filtering for 100k+ multi-modal fashion embeddings.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['HNSW Graph Indexing', 'Cosine & Dot-Product Metrics', 'Payload Pre-filtering', 'Vector Quantization', 'Collection Sharding'],
        relatedTech: ['FastAPI', 'FastEmbed', 'Python', 'Docker'],
        keyCapabilities: ['Sub-40ms Vector Retrieval', 'Multi-attribute Payload Filtering', 'Inverted Index Optimization']
      },
      {
        id: 'clip-embeddings',
        name: 'Multi-Modal Embeddings (CLIP)',
        category: 'AI / ML',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'Generating joint image-text latent vectors to understand aesthetic style, color harmony, and outfit pairing.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Contrastive Learning', 'Vision Transformer (ViT) Backbones', '512-D Latent Space Projection', 'Zero-Shot Classification'],
        relatedTech: ['PyTorch', 'FastEmbed', 'Qdrant', 'HuggingFace'],
        keyCapabilities: ['Image-to-Image Similarity', 'Text-to-Image Querying', 'Style Aesthetic Clustering']
      },
      {
        id: 'hybrid-rag',
        name: 'Hybrid RAG & Semantic Retrieval',
        category: 'AI / ML',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'Combining sparse keyword filtering with dense vector similarity search to eliminate hallucination in recommendations.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Dense + Sparse Fusion', 'Reciprocal Rank Fusion (RRF)', 'Re-ranking Cross-Encoders', 'Context Window Injection'],
        relatedTech: ['Qdrant', 'FastAPI', 'LangChain', 'OpenAI / Gemini APIs'],
        keyCapabilities: ['Precision Re-ranking', 'Context-Aware Outfits', 'Metadata-Grounded Filtering']
      },
      {
        id: 'pytorch',
        name: 'PyTorch',
        category: 'AI / ML',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Model fine-tuning, tensor operations, matrix distance calculations, and embedding inference pipelines.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Autograd', 'Tensor Operations', 'CUDA Acceleration', 'TorchScript / ONNX Export', 'Batch Inference'],
        relatedTech: ['Python', 'FastEmbed', 'HuggingFace'],
        keyCapabilities: ['Quantized Inference (INT8)', 'Color Space Tensor Computations', 'Cosine Matrix Multiplications']
      }
    ]
  },
  {
    category: 'Databases',
    slug: 'databases',
    iconName: 'Database',
    description: 'Relational, vector, in-memory, and columnar database storage systems.',
    skills: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Primary ACID transactional store for users, project metadata, catalog items, and scraping history.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['MVCC (Multi-Version Concurrency Control)', 'GIN & B-Tree Indexes', 'Foreign Key Constraints', 'Connection Pooling (HikariCP/PgBouncer)'],
        relatedTech: ['SQL', 'Hibernate', 'Prisma', 'Spring Boot'],
        keyCapabilities: ['JSONB Document Queries', 'Transaction Isolation Levels', 'Migration Versioning']
      },
      {
        id: 'redis',
        name: 'Redis',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Tiered response caching, Celery task broker, rate-limiting counters, and WebSocket room Pub/Sub.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Single-Threaded Event Loop', 'In-Memory Key-Value Eviction (LRU)', 'Pub/Sub Messaging', 'Redis Data Structures (Hashes, Sets, Sorted Sets)'],
        relatedTech: ['Celery', 'Spring Data Redis', 'Go Redis', 'Node Redis'],
        keyCapabilities: ['Atomic Counter Invalidation', 'Sub-millisecond Cache Lookups', 'Distributed Lock Primitives']
      },
      {
        id: 'clickhouse',
        name: 'ClickHouse & Columnar Storage',
        category: 'Databases',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Exploring high-throughput time-series metrics logging, telemetry analytics, and vectorized analytical querying.',
        associatedProjects: [
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Columnar Compression', 'Vectorized Query Execution', 'MergeTree Engine', 'Partition Pruning'],
        relatedTech: ['PostgreSQL', 'Grafana', 'Prometheus'],
        keyCapabilities: ['High-Velocity Event Ingestion', 'Real-Time Aggregations across Millions of Rows']
      }
    ]
  },
  {
    category: 'Cloud',
    slug: 'cloud',
    iconName: 'Cloud',
    description: 'Cloud provider services, managed container runtimes, object storage, and global CDNs.',
    skills: [
      {
        id: 'aws',
        name: 'AWS (Amazon Web Services)',
        category: 'Cloud',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Deploying containerized microservices (ECS/Fargate), S3 asset storage, RDS PostgreSQL, and CloudFront distribution.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['VPC Subnetting & Security Groups', 'IAM Role Policies', 'Auto Scaling Groups', 'TLS Termination at ALB'],
        relatedTech: ['Docker', 'PostgreSQL', 'CloudFront', 'S3'],
        keyCapabilities: ['Fargate Container Orchestration', 'Presigned S3 Upload URLs', 'Zero-Downtime Blue/Green Deploys']
      },
      {
        id: 'cloudflare',
        name: 'Cloudflare & Edge Infrastructure',
        category: 'Cloud',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Edge deployment, DNS management, DDoS mitigation, SSL/TLS termination, and Cloudflare Pages hosting.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Edge Caching & Purging', 'Anycast Routing', 'DNSSEC', 'Origin Shielding', 'WAF Rules'],
        relatedTech: ['Vite', 'Cloudflare Pages', 'SSL/TLS'],
        keyCapabilities: ['Global Low-Latency Asset Delivery', 'Edge Security Rules', 'Instant Cache Purging']
      }
    ]
  },
  {
    category: 'DevOps',
    slug: 'devops',
    iconName: 'Settings',
    description: 'Containerization, continuous integration/continuous deployment, and POSIX Linux system administration.',
    skills: [
      {
        id: 'docker',
        name: 'Docker & Containerization',
        category: 'DevOps',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Packaging multi-service applications into reproducible, isolated, multi-stage container images.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Multi-Stage Builds', 'Linux Namespaces & Cgroups', 'Layer Caching Optimization', 'Volume Mounts', 'Docker Compose Networking'],
        relatedTech: ['Kubernetes', 'Linux', 'Spring Boot', 'Python'],
        keyCapabilities: ['Minimal Alpine/Distroless Images', 'Isolated Multi-Service Local Stacks', 'Fast CI Build Times']
      },
      {
        id: 'github-actions',
        name: 'CI/CD & GitHub Actions',
        category: 'DevOps',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Automating linting, unit/component testing, Docker image generation, and automated production deployments.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Workflow Matrix Builds', 'Secret Management', 'Artifact Caching', 'Branch Protection Triggers', 'Semantic Release'],
        relatedTech: ['Docker', 'Vitest', 'ESLint', 'Git'],
        keyCapabilities: ['Automated PR Quality Gates', 'Parallelized Test Runners', 'Automated Semantic Versioning']
      },
      {
        id: 'linux-posix',
        name: 'Linux & POSIX Shell Scripting',
        category: 'DevOps',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 5,
        whatUsedFor: 'System management, process inspection (htop/lsof/netstat), automation scripting in Bash/Zsh, and POSIX VFS architecture.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['File Descriptors & Pipes', 'Signal Handling (SIGTERM/SIGINT)', 'Standard I/O Streams', 'Cron Schedules', 'Permissions (rwx)'],
        relatedTech: ['Zsh', 'Bash', 'Systemd', 'cgroups'],
        keyCapabilities: ['POSIX Filesystem Standards', 'Server Diagnostics & Log Grepping', 'Automated Maintenance Scripts']
      }
    ]
  },
  {
    category: 'Tools',
    slug: 'tools',
    iconName: 'Tool',
    description: 'Developer tooling, headless browsers, test suites, bundlers, and diagnostics.',
    skills: [
      {
        id: 'playwright',
        name: 'Playwright & Browser Automation',
        category: 'Tools',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Headless browser crawling, stealth DOM extraction, dynamic SPA screenshotting, and E2E verification.',
        associatedProjects: [
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['CDP (Chrome DevTools Protocol)', 'Context & Page Isolation', 'Selector Engines', 'Stealth Fingerprint Evasion'],
        relatedTech: ['Python', 'FastAPI', 'Chromium'],
        keyCapabilities: ['Headless Chromium Management', 'Stealth Script Execution', 'High-Speed Page Scraping']
      },
      {
        id: 'vitest',
        name: 'Vitest & Testing Library',
        category: 'Tools',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Unit and component test suites, terminal engine verification, CLI parser assertions, and mock isolation.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Test Isolation', 'Mocking & Spying', 'Snapshot Testing', 'Coverage Threshold Enforcement'],
        relatedTech: ['TypeScript', 'Vite', 'React Testing Library'],
        keyCapabilities: ['Sub-second Test Execution', 'DOM Component Assertions', 'CI Integration']
      },
      {
        id: 'git',
        name: 'Git & Version Control',
        category: 'Tools',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 5,
        whatUsedFor: 'Atomic commits, trunk-based development, semantic branch management, and open-source collaboration.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['DAG Object Model', 'Interactive Rebasing', 'Merge Conflict Resolution', 'Git Hooks', 'Cherry-picking'],
        relatedTech: ['GitHub', 'GitHub Actions'],
        keyCapabilities: ['Clean Commit Histories', 'Release Tagging', 'Collaborative PR Workflows']
      }
    ]
  },
  {
    category: 'Core CS',
    slug: 'cs',
    iconName: 'BookOpen',
    description: 'Fundamental computer science concepts, distributed systems theory, algorithm design, and system architecture.',
    skills: [
      {
        id: 'system-design',
        name: 'System Design & Distributed Architecture',
        category: 'Core CS',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Designing high-scale distributed systems, choosing optimal database topologies, event-driven pipelines, and caching layers.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['CAP Theorem & PACELC', 'Consistent Hashing', 'Load Balancing Topologies', 'Rate Limiting Algorithms', 'Idempotency Keys'],
        relatedTech: ['Redis', 'PostgreSQL', 'Kafka', 'Qdrant', 'Spring Boot'],
        keyCapabilities: ['Microservices Decomposition', 'Low-Latency Caching Topologies', 'Disaster Recovery & Chaos Resilience']
      },
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        category: 'Core CS',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Writing high-efficiency AST traversal algorithms, vector cosine computations, trie-based autocomplete, and Merkle diffing.',
        associatedProjects: [
          { name: 'SAKETH.OS', slug: 'saketh-os' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['Time & Space Complexity (Big-O)', 'Trees & Graph Traversals (BFS/DFS)', 'Tries & Prefix Trees', 'Dynamic Programming', 'Sliding Window & Two Pointers'],
        relatedTech: ['TypeScript', 'Python', 'Java', 'LeetCode'],
        keyCapabilities: ['AST Parsing & Autocomplete', 'Graph Pathfinding', 'Optimized In-Memory Indexing']
      },
      {
        id: 'networking',
        name: 'Networking & Protocols',
        category: 'Core CS',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 4,
        whatUsedFor: 'Building low-latency WebSocket clusters, WebRTC peer-to-peer mesh synchronization, and HTTP/2 stream management.',
        associatedProjects: [
          { name: 'CinePortal', slug: 'cineportal' },
          { name: 'SAKETH.OS', slug: 'saketh-os' }
        ],
        engineeringConcepts: ['OSI Model & TCP/IP Stack', 'TCP 3-Way Handshake & Congestion Control', 'HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)', 'WebSockets & Frame Protocol', 'WebRTC & STUN/TURN ICE Candidates'],
        relatedTech: ['Go', 'WebSockets', 'WebRTC', 'Nginx'],
        keyCapabilities: ['Clock Drift Compensation Algorithms', 'P2P Audio/Video Mesh', 'WebSocket Multiplexing']
      }
    ]
  }
];
