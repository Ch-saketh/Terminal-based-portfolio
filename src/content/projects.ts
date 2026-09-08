import { ProjectItem } from '../types/content';

export const projectsData: ProjectItem[] = [
  {
    id: 'k8s-mesh-router',
    slug: 'k8s-mesh-router',
    title: 'Aether: High-Throughput Service Mesh Ingress & Telemetry Engine',
    category: 'Distributed Systems',
    tagline: 'Sub-millisecond dynamic routing proxy with eBPF-powered distributed tracing.',
    description:
      'A purpose-built edge gateway and microservices routing engine engineered in Go and Rust. Features zero-copy packet inspection, automated mTLS rotation, circuit-breaking heuristics, and Prometheus/OpenTelemetry exporter integration capable of sustaining 250k+ req/sec per node.',
    highlights: [
      'Engineered custom eBPF probes for kernel-level socket telemetry without latency degradation',
      'Implemented token-bucket and sliding-window rate limiters with Redis cluster synchronization',
      'Zero-downtime hot config reload using atomic pointer swapping in Go'
    ],
    architecture: {
      overview:
        'Hybrid control/data plane architecture. Data plane implemented in optimized Rust with async Tokio workers; control plane implemented in Go communicating over gRPC streams.',
      keyDecisions: [
        'Used eBPF over iptables for microservice routing to avoid O(N) chain traversal latency at 1,000+ pods',
        'Implemented Raft consensus for decentralized configuration consistency across global clusters'
      ]
    },
    metrics: [
      '< 1.2ms p99 latency at 200,000 RPS',
      '40% memory reduction compared to standard Envoy configurations',
      '99.999% availability in multi-region chaos testing'
    ],
    techStack: {
      core: ['Rust', 'Go', 'eBPF', 'Tokio', 'gRPC'],
      infrastructure: ['Kubernetes', 'Docker', 'Linux', 'Terraform'],
      databases: ['Redis Cluster', 'Prometheus', 'ClickHouse'],
      tools: ['Grafana', 'OpenTelemetry', 'Chaos Mesh']
    },
    links: {
      github: 'https://github.com/Ch-saketh/aether-mesh',
      docs: 'https://github.com/Ch-saketh/aether-mesh#readme'
    },
    featured: true,
    status: 'production',
    stars: 342
  },
  {
    id: 'event-stream-nexus',
    slug: 'nexus-stream',
    title: 'Nexus: Distributed Event Ingestion & CDC Pipeline',
    category: 'Cloud Architecture',
    tagline:
      'Real-time transactional event streaming pipeline handling billions of daily mutations.',
    description:
      'Change Data Capture (CDC) and event orchestration platform designed to synchronize PostgreSQL and MySQL transactional state to BigQuery, ClickHouse, and Elasticsearch with strict exactly-once delivery guarantees.',
    highlights: [
      'Constructed custom WAL (Write-Ahead-Log) parsing daemon for PostgreSQL logical replication',
      'Dynamic schema evolution detection with automatic Protobuf/Avro registry schema migrations',
      'Backpressure-aware ingestion queues preventing memory runaway during traffic surges'
    ],
    architecture: {
      overview:
        'Partitioned Kafka consumers writing to vectorized Arrow batches before bulk flushing to columnar storage.',
      keyDecisions: [
        'Decoupled buffer storage using memory-mapped files (mmap) for zero data loss during process crashes',
        'Used RocksDB for embedded state storage to track partition offset acknowledgments'
      ]
    },
    metrics: [
      'Ingests 1.8 billion events / 24 hours',
      'Sub-second replication lag from Postgres WAL to ClickHouse',
      'Zero message loss during failover simulations'
    ],
    techStack: {
      core: ['Java', 'Kotlin', 'Rust', 'Kafka Streams', 'Apache Arrow'],
      infrastructure: ['GCP', 'AWS MSK', 'Kubernetes', 'Keda'],
      databases: ['PostgreSQL', 'ClickHouse', 'BigQuery', 'RocksDB'],
      tools: ['Debezium', 'Protobuf', 'Jaeger']
    },
    links: {
      github: 'https://github.com/Ch-saketh/nexus-cdc',
      liveDemo: 'https://nexus-demo.saketh.dev'
    },
    featured: true,
    status: 'production',
    stars: 218
  },
  {
    id: 'saketh-os',
    slug: 'saketh-os',
    title: 'SAKETH.OS: Interactive Web Terminal & Operating System',
    category: 'Developer Tools',
    tagline: 'Production-grade POSIX-like browser shell environment & developer workstation.',
    description:
      'An interactive developer environment running entirely in client-side TypeScript. Features an AST command parser, in-memory virtual filesystem (VFS) with path resolution, procedural Web Audio sound synthesis, reactive multi-window manager, and rich command rendering modules.',
    highlights: [
      'Built bespoke shell tokenizer and flag parser supporting quotes, aliases, pipes, and tab-autocomplete',
      'Implemented hierarchical virtual filesystem with file permissions, symlinks, and directory traversal',
      'Zero runtime CSS-in-JS overhead via compiled CSS Custom Properties and design token system'
    ],
    architecture: {
      overview:
        'Layered kernel and presentation separation. Core CLI engine and VFS are 100% decoupled from React UI via Zustand micro-stores.',
      keyDecisions: [
        'Used Web Audio API procedural synthesis for keyclick feedback instead of heavy audio downloads',
        'Engineered virtualized terminal line stream maintaining 60fps rendering during large output batches'
      ]
    },
    metrics: [
      '100/100 Lighthouse Performance, SEO & Accessibility score',
      '< 75KB initial bundle footprint',
      '0ms server roundtrips for CLI navigation'
    ],
    techStack: {
      core: ['TypeScript', 'React', 'Zustand', 'Web Audio API'],
      infrastructure: ['Vite', 'Cloudflare Pages', 'GitHub Actions'],
      databases: ['In-Memory VFS Tree'],
      tools: ['Vitest', 'Playwright', 'ESLint', 'PostCSS']
    },
    links: {
      github: 'https://github.com/Ch-saketh/terminal-based-portfolio',
      liveDemo: 'https://saketh.dev'
    },
    featured: true,
    status: 'active',
    stars: 185
  },
  {
    id: 'neural-code-index',
    slug: 'neural-code-index',
    title: 'VectrCode: Semantic Codebase Intelligence & AST Search',
    category: 'AI / Machine Learning',
    tagline:
      'Tree-sitter AST parser coupled with local vector embeddings for deep codebase search.',
    description:
      'Developer indexing tool that parses large codebases into syntactic semantic AST blocks, embeds code snippets using quantized local models, and enables natural-language semantic query exploration via terminal or IDE extensions.',
    highlights: [
      'Constructed multi-language AST chunking pipeline supporting TypeScript, Go, Python, and Rust',
      'Integrated HNSW vector indexing with sub-10ms similarity searches across 500k+ functions',
      'Lightweight local CLI binary with memory consumption capped under 150MB'
    ],
    architecture: {
      overview:
        'Tree-sitter parser feeds symbol table into local ONNX runtime embeddings generator, stored in a memory-mapped vector index.',
      keyDecisions: [
        'Used Tree-sitter AST node boundaries rather than line-length chunking for semantic integrity',
        'Implemented quantised INT8 vector representations to cut RAM consumption by 75%'
      ]
    },
    metrics: [
      'Indexes a 100k LOC repository in under 4 seconds',
      '89% top-3 retrieval accuracy on complex architectural queries'
    ],
    techStack: {
      core: ['Rust', 'Tree-sitter', 'ONNX Runtime', 'Python'],
      infrastructure: ['WebAssembly', 'Native Binary'],
      databases: ['HNSW Vector Index', 'SQLite'],
      tools: ['Tonic gRPC', 'Clap CLI']
    },
    links: {
      github: 'https://github.com/Ch-saketh/vectrcode'
    },
    featured: false,
    status: 'active',
    stars: 94
  }
];
