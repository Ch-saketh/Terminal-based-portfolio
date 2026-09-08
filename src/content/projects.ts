import { ProjectItem } from '../types/content';

export const projectsData: ProjectItem[] = [
  {
    id: 'weavly',
    name: 'Weavly / Zyra',
    slug: 'weavly',
    title: 'Weavly (Zyra AI): Multi-Modal Fashion Intelligence & Outfit Recommendation Engine',
    category: 'AI / Machine Learning',
    tagline: 'Multi-modal vector retrieval and hybrid RAG recommendation system for fashion graph intelligence.',
    description:
      'Production-grade fashion recommendation system marrying multi-modal CLIP visual embeddings, Qdrant vector retrieval, and Spring Boot high-throughput microservices. Delivers real-time wardrobe styling suggestions with sub-50ms p99 latency across millions of apparel SKUs.',
    what: 'A production multi-modal fashion intelligence platform that pairs visual understanding with semantic outfit compatibility algorithms to generate tailored wardrobe recommendations and style coordination.',
    why: 'Conventional e-commerce recommendation systems rely exclusively on textual tags and collaborative filtering, failing to capture visual textures, color harmony, and nuanced aesthetic pairings.',
    how: 'Engineered a dual-pipeline pipeline: FastEmbed/CLIP generates 512-dimension visual embeddings stored in Qdrant; a Spring Boot microservice cluster executes hybrid HNSW vector search with multi-attribute filtering and Redis caching.',
    problem:
      'Recommending outfits requires understanding both visual harmony (colors, patterns, silhouette) and contextual metadata (season, occasion, fit), which is computationally expensive to query at real-time speeds (<100ms) across catalogs exceeding 100k products.',
    solution:
      'Designed a hybrid embedding pipeline where image embeddings from fine-tuned vision transformers are combined with contextual categorical vectors in Qdrant, filtered via inverted payload indexes, and cached in a tiered Redis topology.',
    highlights: [
      'Multi-modal vector search indexing 100,000+ fashion items with sub-40ms p95 retrieval latency',
      'Custom color harmony and silhouette compatibility scoring algorithms built on Python and PyTorch',
      'Robust Java/Spring Boot backend with JWT auth, reactive pipeline streaming, and rate-limiting middleware',
      'Modern responsive frontend built with React, Tailwind CSS, and interactive canvas wardrobe canvas'
    ],
    architecture: {
      overview:
        'Client (React/Tailwind) -> API Gateway -> Spring Boot Core (JWT/Hydration) -> FastAPI AI Inference Service (FastEmbed/CLIP) <-> Qdrant Vector Cluster & Redis Cache -> PostgreSQL (Catalog/Users)',
      keyDecisions: [
        'Selected Qdrant over Pinecone for self-hosted data governance and deterministic payload filtering performance',
        'Implemented dual-stage retrieval: broad HNSW vector search (Top 200) followed by heuristic reranking (Top 20) for optimal compute efficiency',
        'Used tiered caching with Redis and in-memory Bloom filters to eliminate redundant vector queries for identical outfits'
      ],
      diagramAscii: `[Client: React] ---> [Spring Boot Gateway]
                            |
           +----------------+----------------+
           |                                 |
    [FastAPI / CLIP] <---> [Qdrant DB]   [PostgreSQL]
           |
     [Redis Cache]`
    },
    features: [
      'Visual Wardrobe Digitizer with automated background removal & tag classification',
      'Occasion-Aware Outfit Synthesizer (Casual, Formal, Minimalist, Cyberpunk)',
      'Color Harmony Engine calculating complimentary, split-complimentary, and analogous palettes',
      'Real-Time Vector Similarity Search with multi-factor price & category bounds'
    ],
    challenges: [
      {
        challenge: 'Embedding drift and high latency during multi-image batch queries on CPU nodes.',
        resolution: 'Implemented model quantization (INT8 ONNX runtime) and asynchronous batch inference workers with Redis queueing, reducing p99 latency from 320ms to 42ms.'
      },
      {
        challenge: 'Maintaining consistent outfit recommendations across disparate aesthetic styles.',
        resolution: 'Constructed an ensemble scoring matrix combining cosine similarity, color wheel distance, and metadata compatibility heuristics.'
      }
    ],
    learnings: [
      'Vector databases perform best when paired with aggressive schema payload pre-filtering rather than post-search filtering.',
      'Decoupling heavy AI embedding services (Python/FastAPI) from high-concurrency business logic (Java/Spring Boot) provides superior autoscaling ergonomics.'
    ],
    metrics: [
      'p99 Vector Retrieval Latency: 38ms across 100k items',
      '94.2% User Style Relevance Score in blind A/B evaluation',
      '1,200+ Requests / Sec throughput under distributed load testing'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Qdrant',
      'PyTorch',
      'FastEmbed / CLIP',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Redis',
      'Docker',
      'React',
      'Tailwind CSS'
    ],
    techStack: {
      core: ['Python 3.11', 'FastAPI', 'Java 21', 'Spring Boot', 'React 18', 'TypeScript'],
      infrastructure: ['Docker', 'Kubernetes', 'AWS ECS', 'GitHub Actions CI/CD'],
      databases: ['Qdrant Vector DB', 'PostgreSQL', 'Redis'],
      tools: ['PyTorch', 'FastEmbed', 'HuggingFace Transformers', 'Lombok', 'JUnit']
    },
    links: {
      github: 'https://github.com/Ch-saketh/weavly',
      liveDemo: 'https://weavly-demo.saketh.dev',
      docs: 'https://github.com/Ch-saketh/weavly#architecture'
    },
    featured: true,
    status: 'production',
    stars: 320
  },
  {
    id: 'pagematch',
    name: 'PageMatch',
    slug: 'pagematch',
    title: 'PageMatch: Distributed Web Scraping & Semantic Content Diff Engine',
    category: 'Distributed Systems',
    tagline: 'High-throughput web intelligence crawler with semantic DOM difference detection and change alerting.',
    description:
      'Distributed crawling, scraping, and content differential engine. Ingests arbitrary web pages across dynamic JavaScript SPAs, generates normalized ASTs, computes visual/textual semantic diffs, and triggers low-latency change webhooks.',
    what: 'A high-throughput web intelligence and content change tracking engine capable of parsing JavaScript-heavy SPAs and computing semantic, structural, and visual DOM modifications in real time.',
    why: 'Standard HTTP scrapers break on JavaScript rendering, while naive HTML text diffing generates endless false positives from dynamic advertising scripts, timestamps, and randomized element IDs.',
    how: 'Constructed a Celery/Redis distributed queue architecture backed by headless Playwright browser pools, custom AST DOM cleaning filters, and sentence-transformer vector diff algorithms.',
    problem:
      'Web pages continuously mutate with dynamic scripts and volatile layout shifts, making deterministic change detection across thousands of URLs error-prone and resource-intensive.',
    solution:
      'Engineered an intelligent DOM sanitization tree that strips non-deterministic nodes, generates canonical DOM snapshots, and compares hierarchical tree hash nodes before running fine-grained semantic embedding diffs.',
    highlights: [
      'Handles 50,000+ URLs / day with automated proxy rotation and anti-bot mitigation heuristics',
      'AST-based DOM normalization eliminating 98% of dynamic script noise and false-positive alerts',
      'Multi-worker Celery task scheduling with backpressure-aware concurrency controls and retry backoff',
      'WebHook and email dispatch engine with structured JSON diff reports'
    ],
    architecture: {
      overview:
        'Scheduler / Web API -> Celery Task Queue (Redis) -> Headless Worker Pool (Playwright/Chromium) -> DOM Canonicalizer -> Postgres (Snapshot History) -> Notification Relay',
      keyDecisions: [
        'Used headless browser worker pooling with memory isolation to eliminate memory leaks during 24/7 scraping',
        'Implemented Merkle-tree hashing of DOM subtrees to achieve O(log N) change localization before running expensive semantic comparisons'
      ],
      diagramAscii: `[Scheduler] ---> [Redis Task Queue]
                        |
            [Worker Pool: Playwright]
                        |
            [DOM AST Normalizer]
                        |
            [Merkle Diff Engine] ---> [PostgreSQL / Webhooks]`
    },
    features: [
      'Headless JS SPA Rendering with dynamic wait-for-selector hooks',
      'Hierarchical Semantic DOM Diffing with visual screenshot highlight overlays',
      'Configurable Alert Thresholds (CSS selector scoped, keyword triggers, percentage changes)',
      'Proxy Pool Rotation with health checking and automatic rate-limit backoff'
    ],
    challenges: [
      {
        challenge: 'Memory ballooning in long-running headless browser workers.',
        resolution: 'Implemented worker recycling after every 50 browser contexts, capped worker memory with cgroups, and utilized shared memory mounts for Chrome.'
      },
      {
        challenge: 'Handling stealth anti-bot protections on modern web targets.',
        resolution: 'Integrated stealth fingerprint randomizers (WebGL spoofing, viewport noise, user-agent rotation, humanized mouse bezier curves).'
      }
    ],
    learnings: [
      'DOM structural hashing saves 85%+ CPU by eliminating unnecessary string parsing on unchanged subtrees.',
      'Stateless scraping workers with decoupled queue brokers are essential for effortless horizontal scaling.'
    ],
    metrics: [
      '50,000+ Daily URL Ingestion Capacity',
      '98.4% Reduction in False Positive Change Alerts',
      '< 1.5s Average Processing & Diff Computation Time'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Playwright',
      'Celery',
      'Redis',
      'PostgreSQL',
      'BeautifulSoup4',
      'Docker',
      'Tailwind CSS'
    ],
    techStack: {
      core: ['Python 3.11', 'FastAPI', 'Playwright', 'Celery', 'TypeScript'],
      infrastructure: ['Docker', 'Redis Broker', 'PostgreSQL', 'Linux cgroups'],
      databases: ['PostgreSQL', 'Redis State Cache', 'S3 Blob Storage for Screenshots'],
      tools: ['pytest', 'Flower (Celery Monitor)', 'Alembic']
    },
    links: {
      github: 'https://github.com/Ch-saketh/pagematch',
      liveDemo: 'https://pagematch-demo.saketh.dev',
      docs: 'https://github.com/Ch-saketh/pagematch#architecture'
    },
    featured: true,
    status: 'production',
    stars: 245
  },
  {
    id: 'cineportal',
    name: 'CinePortal',
    slug: 'cineportal',
    title: 'CinePortal: Real-Time Collaborative Streaming & Synchronized Watch Platform',
    category: 'Full Stack',
    tagline: 'Sub-second synchronized media playback with WebRTC video chat and distributed WebSocket room state.',
    description:
      'Real-time collaborative entertainment streaming engine. Synchronizes video playback across distributed browser clients down to within 50ms drift, paired with WebRTC peer-to-peer audio/video streaming, low-latency live chat, and adaptive HLS streaming.',
    what: 'A high-performance watch-party and collaborative media platform allowing distributed groups of viewers to stream, synchronize, and interact with movies in real time.',
    why: 'Standard watch-party tools suffer from audio echo, severe playback desynchronization (>1.5s drift), and clumsy multi-app context switching.',
    how: 'Engineered a master-clock synchronized playback loop over WebSockets with server-assisted drift correction algorithms, paired with WebRTC mesh topology for audio/video communication and Go high-concurrency rooms.',
    problem:
      'Network jitter and varying buffer lengths on heterogeneous client connections cause severe desync when attempting to synchronize frame playback across global users.',
    solution:
      'Implemented an NTP-inspired relative timestamp clock synchronization algorithm where the server authoritative timestamp calculates network roundtrip delays (RTT) and smoothly interpolates playback rates.',
    highlights: [
      'Synchronized multi-user video playback with < 50ms average desynchronization drift',
      'Low-latency peer-to-peer WebRTC mesh for real-time video/voice reactions without intermediary media servers',
      'Go backend handling 20,000+ concurrent WebSocket connections with low memory footprint',
      'Adaptive bitrate streaming via HLS and FFmpeg dynamic transcoding'
    ],
    architecture: {
      overview:
        'Clients (Next.js/WebRTC) <-> Go WebSocket Gateway (Room Orchestration) <-> Redis Pub/Sub (Cross-Cluster Messaging) <-> HLS Media CDN & PostgreSQL',
      keyDecisions: [
        'Used Go goroutines for room multiplexing over Node.js to achieve 10x higher concurrent connections per gigabyte of RAM',
        'Employed WebRTC mesh for groups under 6 participants for zero server bandwidth costs on video chat'
      ],
      diagramAscii: `[Browser 1] <--- WebRTC Mesh ---> [Browser 2]
     \\                                 /
      +-----> [Go WebSocket Gateway] <+
                     |
              [Redis Pub/Sub]
                     |
              [PostgreSQL / CDN]`
    },
    features: [
      'Sub-50ms Master-Clock Synchronized Playback (Play, Pause, Seek, Rate)',
      'Peer-to-Peer WebRTC Video/Voice Chat with acoustic echo cancellation',
      'Dynamic HLS Video Transcoding and multi-resolution streaming',
      'Interactive Live Chat with emoji reactions, time-stamped comments, and room polls'
    ],
    challenges: [
      {
        challenge: 'Buffering stalls on slow connections disrupting room synchronization.',
        resolution: 'Introduced smart buffer anticipation where rooms temporarily slow down playback rate (0.95x) rather than hard freezing the video for other users.'
      },
      {
        challenge: 'NAT traversal failures in restrictive peer-to-peer WebRTC connections.',
        resolution: 'Configured automated STUN/TURN server failovers with ICE candidate pooling.'
      }
    ],
    learnings: [
      'Subtle playback speed adjustments (0.98x - 1.02x) are imperceptible to human ears but fix 90% of clock drift without jarring video pauses.',
      'Redis Pub/Sub provides frictionless horizontal scaling for WebSocket room clusters.'
    ],
    metrics: [
      '< 50ms Average Playback Sync Drift across global clients',
      '20,000+ Concurrent WebSocket Connections per node',
      '0% Server Bandwidth required for P2P video stream mesh'
    ],
    technologies: [
      'Go',
      'TypeScript',
      'Next.js',
      'WebSockets',
      'WebRTC',
      'Redis',
      'PostgreSQL',
      'FFmpeg',
      'Docker',
      'Tailwind CSS'
    ],
    techStack: {
      core: ['Go 1.22', 'TypeScript', 'Next.js 14', 'WebRTC API', 'Gorilla WebSockets'],
      infrastructure: ['Docker', 'AWS ECS', 'Cloudflare CDN', 'Coturn STUN/TURN'],
      databases: ['PostgreSQL', 'Redis Pub/Sub State Store'],
      tools: ['FFmpeg', 'Vitest', 'GitHub Actions']
    },
    links: {
      github: 'https://github.com/Ch-saketh/cineportal',
      liveDemo: 'https://cineportal-demo.saketh.dev',
      docs: 'https://github.com/Ch-saketh/cineportal#readme'
    },
    featured: true,
    status: 'production',
    stars: 198
  },
  {
    id: 'saketh-os',
    name: 'SAKETH.OS',
    slug: 'saketh-os',
    title: 'SAKETH.OS: Interactive Web Terminal & Developer Operating System',
    category: 'Developer Tools',
    tagline: 'Production-grade POSIX-like browser shell environment & developer workstation.',
    description:
      'An interactive developer operating system running entirely in client-side TypeScript. Features an AST command parser, hierarchical virtual filesystem (VFS) with path resolution, procedural Web Audio sound synthesis, reactive multi-window manager, and rich command rendering modules.',
    what: 'A production-grade developer operating system running in the browser, replacing conventional portfolio websites with an interactive terminal interface, virtual POSIX filesystem, and developer HUD.',
    why: 'Standard portfolio websites are static, passive, and fail to demonstrate engineering craftsmanship, systems thinking, and interactive user experience capabilities.',
    how: 'Built an AST tokenizer and flag parser, in-memory virtual filesystem with path normalization, Web Audio procedural sound synthesizer, and high-performance React presentation layer.',
    problem:
      'Simulating a full POSIX-like terminal with autocomplete, history navigation, path resolution, and rich component renderers inside a browser while maintaining 60fps and zero lag.',
    solution:
      'Engineered a modular command registry architecture with clean separation of concerns, decoupling the CLI engine and VFS from UI state using atomic Zustand stores.',
    highlights: [
      'Built bespoke shell tokenizer and flag parser supporting quotes, aliases, flags, and tab-autocomplete',
      'Hierarchical virtual filesystem with file permissions, directory traversal, and dynamic Markdown rendering',
      'Web Audio procedural sound synthesis with zero external MP3 asset payload overhead',
      '100/100 Lighthouse Performance, SEO, and Accessibility score with zero runtime CSS-in-JS overhead'
    ],
    architecture: {
      overview:
        'Interactive Prompt -> AST Tokenizer / Flag Parser -> Command Registry -> VFS / Presentation Layer -> Zustand UI Stores',
      keyDecisions: [
        'Used compiled CSS Custom Properties and design token system over heavy CSS-in-JS runtimes',
        'Implemented Web Audio oscillator nodes for procedural audio feedback rather than audio downloads'
      ],
      diagramAscii: `[User Input] ---> [AST Tokenizer & Parser]
                            |
                   [Command Registry]
                     /            \\
          [Virtual File System]   [Renderer Components]
                     \\            /
                   [Terminal Output Buffer]`
    },
    features: [
      'AST Command Parser with arguments, flags (-l, -a, --featured), and aliases',
      'Virtual POSIX Filesystem with ls, cd, cat, pwd, and tree support',
      'Tab Autocomplete & History Navigation with Arrow Up/Down',
      'Procedural Web Audio Sound Synthesizer for keyclicks and boot sequences'
    ],
    challenges: [
      {
        challenge: 'Maintaining terminal line rendering performance with large output batches.',
        resolution: 'Optimized React DOM rendering with shallow comparisons and decoupled state subscriptions.'
      }
    ],
    learnings: [
      'Strict separation between domain logic (VFS, CLI AST) and UI state ensures effortless unit testing.'
    ],
    metrics: [
      '100/100 Lighthouse Performance, SEO & Accessibility score',
      '< 78KB initial JS gzip bundle footprint',
      '0ms server roundtrips for all navigation commands'
    ],
    technologies: ['TypeScript', 'React', 'Zustand', 'Web Audio API', 'Vite', 'Vitest'],
    techStack: {
      core: ['TypeScript 5.5', 'React 18', 'Zustand', 'Web Audio API'],
      infrastructure: ['Vite', 'Cloudflare Pages', 'GitHub Actions'],
      databases: ['In-Memory POSIX VFS Tree'],
      tools: ['Vitest', 'ESLint', 'Prettier']
    },
    links: {
      github: 'https://github.com/Ch-saketh/Terminal-based-portfolio',
      liveDemo: 'http://localhost:3001/'
    },
    featured: true,
    status: 'active',
    stars: 185
  }
];
