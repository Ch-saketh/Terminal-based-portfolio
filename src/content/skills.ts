import { SkillCategory } from '../types/content';

export const skillsData: SkillCategory[] = [
  {
    category: 'Backend',
    slug: 'backend',
    iconName: 'Server',
    description: 'High-throughput backend architectures, microservices, REST APIs, and database persistence layers.',
    skills: [
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Building decoupled REST API endpoints, user authentication, checkout data blocks, and transaction-safe services.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['Inversion of Control (IoC)', 'Dependency Injection', 'Spring MVC', 'Application Context', 'Actuator'],
        relatedTech: ['Java', 'Spring Security', 'Hibernate', 'JPA', 'MySQL'],
        keyCapabilities: ['REST Controller Design', 'Service Layer Abstraction', 'Exception Middleware', 'Configuration Profiles']
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'High-performance asynchronous Python microservices for AI vector search, embeddings, and RAG pipelines.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['ASGI Concurrency', 'Pydantic Schemas', 'Async/Await Event Loops', 'Dependency Injection'],
        relatedTech: ['Python', 'Uvicorn', 'Qdrant', 'PyTorch'],
        keyCapabilities: ['Asynchronous Endpoints', 'OpenAPI Schema Generation', 'Streaming Responses', 'Background Tasks']
      },
      {
        id: 'node-express',
        name: 'Node.js & Express.js',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Developing backend microservices, real-time bidding APIs, WebSocket servers, and full-stack services.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Event-Driven Architecture', 'Middleware Chains', 'Non-blocking I/O', 'JSON Payload Validation'],
        relatedTech: ['JavaScript', 'TypeScript', 'WebSockets', 'MongoDB', 'PostgreSQL'],
        keyCapabilities: ['API Routing', 'Socket Server Management', 'Authentication Middleware', 'Error Handling']
      },
      {
        id: 'hibernate-jpa',
        name: 'Hibernate & JPA',
        category: 'Backend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'Object-relational mapping, tuning relational schemas, and eliminating N+1 query loops to cut latency by 60%.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['Entity Lifecycle', 'FetchType Lazy/Eager', 'JPQL Queries', 'Caching Layers', 'Transaction Boundaries'],
        relatedTech: ['Java', 'Spring Boot', 'MySQL', 'PostgreSQL'],
        keyCapabilities: ['Join Fetch Optimization', 'Batch Fetching', 'Entity Relationships', 'Schema Generation']
      },
      {
        id: 'spring-security',
        name: 'Spring Security',
        category: 'Backend',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Configuring secure authentication filters, password hashing, and role-based endpoint authorization.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['Filter Chains', 'Authentication Providers', 'CSRF Protection', 'JWT Validation'],
        relatedTech: ['Java', 'Spring Boot', 'REST APIs'],
        keyCapabilities: ['Security Filter Configuration', 'Bearer Token Handling', 'Route Guards', 'Session Policies']
      },
      {
        id: 'flask',
        name: 'Flask',
        category: 'Backend',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Lightweight Python microservices, model serving endpoints, and prototype API backends.',
        associatedProjects: [
          { name: 'Hybrid Book Recommender', slug: 'book-recommendation' }
        ],
        engineeringConcepts: ['WSGI Standard', 'Route Decorators', 'Blueprint Modularization', 'JSON Serialization'],
        relatedTech: ['Python', 'Scikit-learn', 'LightFM'],
        keyCapabilities: ['Microservice Architecture', 'Rapid Prototyping', 'REST Endpoints', 'ML Model Serving']
      }
    ]
  },
  {
    category: 'AI / ML',
    slug: 'ai-ml',
    iconName: 'Cpu',
    description: 'Machine learning algorithms, vector databases, recommendation engines, and LLM evaluation suites.',
    skills: [
      {
        id: 'qdrant',
        name: 'Qdrant Vector Database',
        category: 'AI / ML',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Indexing multi-modal visual embeddings and powering sub-50ms HNSW vector similarity search over 100k+ items.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['HNSW Indexing', 'Cosine Similarity', 'Payload Filtering', 'Quantization (Scalar/Product)', 'Collection Sharding'],
        relatedTech: ['FastAPI', 'Python', 'FastEmbed', 'CLIP'],
        keyCapabilities: ['Multi-Tenant Collections', 'Filtered Vector Search', 'Snapshot Backups', 'gRPC & REST Clients']
      },
      {
        id: 'python-ml',
        name: 'Python (ML & Data)',
        category: 'AI / ML',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Machine learning pipelines, LightFM recommendation engines, TF-IDF vectorization, and LLM code evaluation.',
        associatedProjects: [
          { name: 'Hybrid Book Recommender', slug: 'book-recommendation' },
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Sparse Matrix Computation', 'WARP Loss Tuning', 'TF-IDF Vectorization', 'Model Evaluation'],
        relatedTech: ['LightFM', 'Scikit-learn', 'Hugging Face', 'Pandas', 'NumPy'],
        keyCapabilities: ['Data Pipelines', 'Recommendation Systems', 'LLM Benchmarking', 'API Deployment']
      },
      {
        id: 'pytorch',
        name: 'PyTorch & CLIP',
        category: 'AI / ML',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Vision transformer inference, multi-modal feature extraction, and cosine similarity ranking.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Tensors & Autograd', 'Vision Transformers', 'Multi-Modal Embeddings', 'Model Quantization'],
        relatedTech: ['Python', 'FastAPI', 'Qdrant'],
        keyCapabilities: ['Feature Extraction', 'Model Optimization', 'Batch Inference', 'ONNX Export']
      },
      {
        id: 'huggingface',
        name: 'Hugging Face Hub',
        category: 'AI / ML',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 1,
        whatUsedFor: 'Publishing machine learning models and hosting public inference endpoints for Hybrid Book Recommender.',
        associatedProjects: [
          { name: 'Hybrid Book Recommender', slug: 'book-recommendation' }
        ],
        engineeringConcepts: ['Model Card Documentation', 'Inference APIs', 'Spaces Deployment', 'Dataset Management'],
        relatedTech: ['Python', 'LightFM', 'Scikit-learn'],
        keyCapabilities: ['Model Publishing', 'Public Inference API', 'Community Sharing', 'Cloud Hosting']
      }
    ]
  },
  {
    category: 'Frontend',
    slug: 'frontend',
    iconName: 'Layout',
    description: 'Component-driven interactive web applications, real-time client systems, and terminal user interfaces.',
    skills: [
      {
        id: 'react',
        name: 'React.js',
        category: 'Frontend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Building responsive user interfaces, real-time quantum auction interfaces, and interactive terminal operating systems.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' },
          { name: 'LUXZERA', slug: 'luxzera' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Component Composition', 'Hooks & State', 'Virtual DOM', 'Reconciliation', 'Responsive Design'],
        relatedTech: ['JavaScript', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebSockets'],
        keyCapabilities: ['Custom Hooks', 'Real-Time State Binding', 'Modular Architecture', 'Performance Optimization']
      },
      {
        id: 'websockets',
        name: 'WebSockets & WebRTC',
        category: 'Frontend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'Bidirectional low-latency communication for real-time quantum-encrypted bid broadcasts and watch parties.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Full-Duplex Communication', 'Connection Handshakes', 'Heartbeat Keepalive', 'Broadcast Rooms'],
        relatedTech: ['Node.js', 'Express.js', 'React.js'],
        keyCapabilities: ['Sub-10ms State Broadcast', 'Room Management', 'Automatic Reconnection', 'Payload Framing']
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Frontend',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Utility-first styling, dark mode themes, responsive grid compositions, and design systems.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' },
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['Design Tokens', 'JIT Compiler', 'CSS Grid/Flexbox', 'Responsive Breakpoints'],
        relatedTech: ['React.js', 'Vite', 'CSS Modules'],
        keyCapabilities: ['Custom Config', 'Color Themes', 'Responsive Utilities', 'Clean UI Layouts']
      }
    ]
  },
  {
    category: 'Databases',
    slug: 'databases',
    iconName: 'Database',
    description: 'Relational data stores, NoSQL document stores, and distributed caches.',
    skills: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Relational modeling, complex queries, full-text search, and backend persistence at NexLevr and Weavly.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'PageMatch', slug: 'pagematch' }
        ],
        engineeringConcepts: ['MVCC Concurrency', 'B-Tree & GIN Indexes', 'Foreign Key Constraints', 'Connection Pooling'],
        relatedTech: ['SQL', 'Node.js', 'Spring Boot', 'Docker'],
        keyCapabilities: ['Relational Queries', 'Indexing Strategies', 'ACID Compliance', 'Database Optimization']
      },
      {
        id: 'mysql',
        name: 'MySQL',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Relational data modeling, foreign key constraints, and transactional consistency for LUXZERA.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['InnoDB Engine', 'B-Tree Indexes', 'Transaction Isolation', 'Query Optimization'],
        relatedTech: ['Java', 'Spring Boot', 'Hibernate', 'SQL'],
        keyCapabilities: ['Schema Design', 'Data Integrity', 'Explain Plans', 'Backup & Restore']
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'NoSQL document storage, auction item catalogs, and real-time bid logging in Quantum E-Auction.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' }
        ],
        engineeringConcepts: ['Document Schemas', 'BSON Serialization', 'Aggregation Pipelines', 'Replica Sets'],
        relatedTech: ['Node.js', 'Express.js', 'JavaScript'],
        keyCapabilities: ['Flexible Schemas', 'High-Speed Writes', 'Compound Indexes', 'Query Projections']
      },
      {
        id: 'redis',
        name: 'Redis',
        category: 'Databases',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 2,
        whatUsedFor: 'In-memory caching of search queries, distributed session management, and pub/sub messaging.',
        associatedProjects: [
          { name: 'Weavly / Zyra', slug: 'weavly' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['In-Memory Key-Value', 'Cache Eviction (LRU)', 'Pub/Sub Architecture', 'Atomic Operations'],
        relatedTech: ['Node.js', 'Spring Boot', 'FastAPI'],
        keyCapabilities: ['High-Throughput Caching', 'Session Store', 'Pub/Sub Messaging', 'TTL Management']
      }
    ]
  },
  {
    category: 'Languages',
    slug: 'languages',
    iconName: 'Code',
    description: 'Core programming languages from Saketh’s technical CV for backend systems, ML, and web apps.',
    skills: [
      {
        id: 'java',
        name: 'Java',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Enterprise backends, transaction-safe Spring Boot APIs, and Hibernate relational query tuning.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' },
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['OOP Design Patterns', 'Multithreading', 'JVM Optimization', 'Exception Handling', 'Memory Safety'],
        relatedTech: ['Spring Boot', 'Spring Security', 'Hibernate', 'JPA', 'MySQL'],
        keyCapabilities: ['RESTful Web Services', 'Transaction Management', 'Relational Mapping', 'Backend Architecture']
      },
      {
        id: 'python-lang',
        name: 'Python',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Machine learning pipelines, LightFM recommendation engines, TF-IDF vectorization, and LLM code evaluation.',
        associatedProjects: [
          { name: 'Hybrid Book Recommender', slug: 'book-recommendation' },
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Sparse Matrix Computation', 'Asyncio', 'Data Cleaning', 'WARP Loss Tuning', 'Model Evaluation'],
        relatedTech: ['LightFM', 'Scikit-learn', 'Flask', 'Hugging Face', 'Pandas'],
        keyCapabilities: ['Data Pipelines', 'Recommendation Systems', 'LLM Benchmarking', 'API Integration']
      },
      {
        id: 'sql-lang',
        name: 'SQL',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Relational database schema design, index tuning, join optimization, and resolving N+1 query loops.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' }
        ],
        engineeringConcepts: ['Relational Normalization', 'Index Structures', 'ACID Transactions', 'Query Execution Plans', 'Aggregation'],
        relatedTech: ['MySQL', 'PostgreSQL', 'Hibernate', 'JPA'],
        keyCapabilities: ['Complex Joins', 'Schema Migrations', 'Performance Tuning', 'Constraint Integrity']
      },
      {
        id: 'javascript-lang',
        name: 'JavaScript / TypeScript',
        category: 'Languages',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Full-stack development across React frontends, Node.js/Express APIs, and WebSocket servers.',
        associatedProjects: [
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' },
          { name: 'LUXZERA', slug: 'luxzera' },
          { name: 'CinePortal', slug: 'cineportal' }
        ],
        engineeringConcepts: ['Asynchronous Event Loop', 'DOM Manipulation', 'Component Lifecycle', 'State Management', 'ES6+'],
        relatedTech: ['React.js', 'Node.js', 'Express.js', 'WebSockets', 'Vite'],
        keyCapabilities: ['Interactive UIs', 'Real-Time Streaming', 'REST Client Integration', 'Modular Code']
      },
      {
        id: 'golang',
        name: 'Go (Golang)',
        category: 'Languages',
        classification: 'Exploring',
        asciiMeter: '████████',
        experienceYears: 1,
        whatUsedFor: 'High-throughput microservices, goroutine concurrency, and low-latency networking utilities.',
        associatedProjects: [],
        engineeringConcepts: ['Goroutines & Channels', 'Memory Allocation', 'Interface Composition', 'Standard Library Networking'],
        relatedTech: ['gRPC', 'Docker', 'Linux'],
        keyCapabilities: ['Concurrent Programming', 'Fast Compilation', 'CLI Tooling', 'Network Services']
      }
    ]
  },
  {
    category: 'Tools & DevOps',
    slug: 'tools',
    iconName: 'Wrench',
    description: 'Containerization, version control, cloud platforms, and engineering toolchains.',
    skills: [
      {
        id: 'docker',
        name: 'Docker',
        category: 'Tools & DevOps',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Containerizing backend microservices, database services, and reproducible development runtimes.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' },
          { name: 'Weavly / Zyra', slug: 'weavly' }
        ],
        engineeringConcepts: ['Container Isolation', 'Image Layering', 'Multi-Stage Dockerfiles', 'Docker Compose'],
        relatedTech: ['Linux', 'Git', 'Node.js', 'Java'],
        keyCapabilities: ['Containerization', 'Environment Parity', 'Compose Networking', 'Volume Mounts']
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        category: 'Tools & DevOps',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'Version control, branch management, pull request reviews, and collaborative team workflows.',
        associatedProjects: [
          { name: 'LUXZERA', slug: 'luxzera' },
          { name: 'Quantum-Secure E-Auction', slug: 'quantum-e-auction' }
        ],
        engineeringConcepts: ['Branching Strategies', 'Merge Conflict Resolution', 'Rebasing', 'Semantic Commit Messages'],
        relatedTech: ['GitHub Actions', 'VS Code', 'Linux'],
        keyCapabilities: ['Version Control', 'Pull Requests', 'Repo Management', 'Git CLI Mastery']
      },
      {
        id: 'linux',
        name: 'Linux (Fedora)',
        category: 'Tools & DevOps',
        classification: 'Working Knowledge',
        asciiMeter: '████████████',
        experienceYears: 2,
        whatUsedFor: 'Primary development operating system, shell scripting, package management (DNF), and process debugging.',
        associatedProjects: [],
        engineeringConcepts: ['POSIX CLI', 'File Permissions', 'Process Lifecycle', 'Systemd Services', 'Bash Scripting'],
        relatedTech: ['Docker', 'Git', 'Bash', 'VS Code'],
        keyCapabilities: ['Terminal Navigation', 'Package Management', 'Process Monitoring', 'Environment Config']
      },
      {
        id: 'tools-dev',
        name: 'Postman & VS Code',
        category: 'Tools & DevOps',
        classification: 'Primary',
        asciiMeter: '████████████████',
        experienceYears: 3,
        whatUsedFor: 'API contract testing, mock servers, automated test collections, and code authoring environment.',
        associatedProjects: [],
        engineeringConcepts: ['HTTP Testing', 'Environment Variables', 'Automated Collections', 'IDE Optimization'],
        relatedTech: ['REST APIs', 'Git', 'Node.js'],
        keyCapabilities: ['Endpoint Verification', 'Payload Inspection', 'Environment Switching', 'Debugging']
      }
    ]
  }
];
