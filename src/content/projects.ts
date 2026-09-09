import { ProjectItem } from '../types/content';

export const projectsData: ProjectItem[] = [
  {
    id: 'luxzera',
    name: 'LUXZERA',
    slug: 'luxzera',
    title: 'LUXZERA — Intelligent Fashion Discovery Platform',
    category: 'Full Stack',
    tagline: 'Fashion discovery web app curating outfits tailored to specific user dimensions and style preferences.',
    description:
      'A full-stack fashion discovery web platform developed within a two-engineer team, curating complete outfits tailored to a user’s specific dimensions. Features transaction-safe Java & Spring Boot API endpoints, Hibernate relational query optimization, and dynamic React interface.',
    what: 'A fashion discovery and outfit curation platform that personalizes clothing recommendations based on individual dimensions, style preferences, and live inventory.',
    why: 'Shoppers struggle to find cohesive outfits matching their exact physical dimensions and style tastes across fragmented catalog schemas.',
    how: 'Engineered transaction-safe Spring Boot REST APIs with JPA/Hibernate tuning to eliminate N+1 queries, connecting to a responsive React frontend.',
    problem:
      'Handling live user preference states, cart verification, and dimension-specific outfit filtering with low response times and zero data inconsistency.',
    solution:
      'Separated application logic into decoupled service and repository layers, tuned Hibernate relational fetch plans to fix N+1 query loops, reducing latency from 150ms to 60ms.',
    highlights: [
      'Developed within a collaborative two-engineer agile engineering team',
      'Engineered transaction-safe REST APIs in Java & Spring Boot for checkout and state verification',
      'Tuned relational database schemas via Hibernate, slashing query latency from 150ms to 60ms (60% reduction)',
      'Curated dimension-matched outfit recommendations with live preference updates'
    ],
    architecture: {
      overview: 'React Frontend <-> Spring Boot REST API Gateway <-> Hibernate / JPA Service Layer <-> MySQL Relational Database',
      keyDecisions: [
        'Used Java & Spring Boot for enterprise-grade transactional safety and robust typing',
        'Implemented Hibernate join fetch optimizations to resolve N+1 query loops across complex outfit-item associations',
        'Decoupled business domain logic from presentation controllers for modular testability'
      ],
      diagramAscii: `[React UI] ---> [Spring Boot REST API] ---> [Hibernate/JPA Layer] ---> [MySQL DB]
                     |                                       |
                     +---> [User Dimension Filter] <---------+`
    },
    features: [
      'Personalized Dimension-Based Outfit Matching',
      'Live Preference State Management & User Profiles',
      'Secure Account Verification & Transaction-Safe Checkout Blocks',
      'Optimized Relational Schema with High-Speed Query Retrieval'
    ],
    challenges: [
      {
        challenge: 'Relational schema join bottlenecks causing N+1 query loops during multi-item outfit composition.',
        resolution: 'Refactored JPA queries with explicit JOIN FETCH and batch sizing, dropping database response time from 150ms to 60ms.'
      }
    ],
    learnings: [
      'Hibernate query execution plans require careful profiling to prevent silent N+1 query cascades.',
      'Decoupled layered architecture makes collaborative feature delivery smooth and maintainable.'
    ],
    metrics: [
      'Latency reduction: 150ms -> 60ms (60% faster)',
      'Zero transactional state inconsistencies during checkout tests',
      '100% test pass rate across core dimension-filtering endpoints'
    ],
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'MySQL', 'React.js', 'REST APIs', 'Git'],
    techStack: {
      core: ['Java', 'Spring Boot', 'React.js'],
      infrastructure: ['Docker', 'Linux'],
      databases: ['MySQL', 'Hibernate/JPA'],
      tools: ['Postman', 'Git', 'GitHub', 'VS Code']
    },
    links: {
      github: 'https://github.com/Ch-saketh/LUXZERA'
    },
    featured: true,
    status: 'active',
    stars: 32
  },
  {
    id: 'quantum-e-auction',
    name: 'Quantum-Secure E-Auction',
    slug: 'quantum-e-auction',
    title: 'QUANTUM-SECURE E-AUCTION SYSTEM (BB84 Protocol)',
    category: 'Full Stack',
    tagline: 'Tamper-proof real-time bidding platform powered by BB84 Quantum Key Distribution (QKD) simulation.',
    description:
      'Architected a tamper-proof e-auction platform built with React (Vite), Tailwind CSS, Node.js, Express.js, WebSockets, and MongoDB. Simulates BB84 Quantum Key Distribution to generate unique quantum keys, encrypting every bid payload with real-time Quantum Bit Error Rate (QBER) eavesdropping detection.',
    what: 'A high-security digital auction system where every bid transmission is encrypted using keys derived from simulated quantum photon polarization states.',
    why: 'Conventional online auctions are vulnerable to bid interception, man-in-the-middle tampering, and eavesdropping during critical bidding windows.',
    how: 'Simulated BB84 photon polarization states to generate tamper-evident quantum keys for symmetric bid payload encryption, paired with real-time WebSocket state distribution.',
    problem:
      'Preventing eavesdropping and bid manipulation without introducing noticeable latency into live, competitive bidding environments.',
    solution:
      'Built a BB84 protocol simulation engine with real-time QBER monitoring; if eavesdropping disturbs photon states above threshold, the compromised key is automatically discarded.',
    highlights: [
      'Won 2nd Prize at Amaravati Quantum Valley Hackathon (Problem Statement AQVH911)',
      'Simulated BB84 Quantum Key Distribution (QKD) protocol for unique quantum cryptographic keys',
      'Implemented real-time QBER (Quantum Bit Error Rate) monitoring to detect eavesdroppers instantly',
      'Full-stack real-time auction synchronization with WebSockets, Node.js, Express, and MongoDB'
    ],
    architecture: {
      overview: 'React (Vite) + Tailwind <-> WebSockets & Express API <-> BB84 QKD Engine <-> MongoDB Bid Ledger',
      keyDecisions: [
        'Used WebSockets for sub-10ms bid event propagation across simultaneous bidders',
        'Implemented BB84 photon state simulation with basis reconciliation (sifting) and privacy amplification',
        'Built automated QBER threshold abort logic: bids are rejected if quantum channel interference exceeds 11%'
      ],
      diagramAscii: `[Bidder UI] ---> [BB84 QKD Key Exchange] ---> [AES-GCM Bid Payload]
                           |
                           v
                [QBER Eavesdrop Monitor] ---> [WebSocket Server] ---> [MongoDB Ledger]`
    },
    features: [
      'BB84 Quantum Key Distribution Simulation (Photon Polarization Bases)',
      'Real-Time Eavesdropping Detection via QBER Metrics',
      'Sub-Millisecond Live Bid Broadcasting via WebSockets',
      'Tamper-Evident Auction Ledger with Cryptographic Bid Verification'
    ],
    challenges: [
      {
        challenge: 'Balancing the computational overhead of quantum key generation with the low-latency demands of live bidding.',
        resolution: 'Pre-negotiated quantum key pools in background workers, enabling instant symmetric encryption upon bid placement.'
      }
    ],
    learnings: [
      'Quantum cryptography principles (no-cloning theorem, observer effect) can be effectively simulated in software for educational and architectural validation.',
      'WebSocket connection health is crucial for synchronized multi-party auction state.'
    ],
    metrics: [
      '2nd Prize Winner — Amaravati Quantum Valley Hackathon',
      '100% eavesdropping detection accuracy on simulated quantum channel taps',
      'Under 25ms end-to-end encrypted bid transmission latency'
    ],
    technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'WebSockets', 'MongoDB', 'Tailwind CSS', 'BB84 Protocol'],
    techStack: {
      core: ['React.js', 'Node.js', 'Express.js', 'WebSockets'],
      infrastructure: ['Linux', 'Vite'],
      databases: ['MongoDB'],
      tools: ['Git', 'GitHub', 'Postman', 'VS Code']
    },
    links: {
      github: 'https://github.com/Ch-saketh/quantum-secure-auction'
    },
    featured: true,
    status: 'active',
    stars: 48
  },
  {
    id: 'book-recommendation',
    name: 'Hybrid Book Recommender',
    slug: 'book-recommendation',
    title: 'HYBRID BOOK RECOMMENDATION PLATFORM — ML Engine',
    category: 'AI / Machine Learning',
    tagline: 'End-to-end machine learning pipeline combining collaborative LightFM and TF-IDF across 3M+ Amazon reviews.',
    description:
      'Built an end-to-end data pipeline as Team Head, processing over 3 million data rows from the Amazon Book Reviews dataset alongside structured content arrays. Engineered a hybrid retrieval flow combining TF-IDF textual features with a collaborative LightFM model using a sparse interaction matrix to resolve cold-start issues. Achieved 0.1688 precision@5, deployed publicly on Hugging Face.',
    what: 'A production machine learning recommendation engine that overcomes cold-start challenges by blending content features with collaborative user interaction matrices.',
    why: 'Pure collaborative filtering fails on new books/users (cold-start problem), while pure content-based filtering misses serendipitous latent tastes.',
    how: 'Constructed a hybrid retrieval pipeline using sparse matrix representations, LightFM with WARP loss, and TF-IDF text vectorization, deployed as an API on Hugging Face.',
    problem:
      'Processing massive data volume (3M+ reviews) efficiently without exhausting memory, while achieving accurate recommendations for both established and new items.',
    solution:
      'Leveraged scipy sparse CSR matrices, tuned LightFM WARP loss hyperparameters, and combined normalized cosine similarity scores with collaborative latent factors.',
    highlights: [
      'Led the engineering team as Team Head for data pipeline and model development',
      'Processed 3,000,000+ data rows from the Amazon Book Reviews dataset',
      'Engineered hybrid retrieval combining collaborative LightFM and TF-IDF textual content features',
      'Tuned WARP loss parameters to achieve precision@5 of 0.1688',
      'Deployed production model publicly on Hugging Face for external API utilization'
    ],
    architecture: {
      overview: 'Amazon 3M+ Dataset -> Preprocessing & Sparse Matrix -> TF-IDF + LightFM (WARP Loss) -> Hugging Face Inference API',
      keyDecisions: [
        'Used LightFM because it natively incorporates both item content features and user-item interactions',
        'Selected WARP (Weighted Approximate-Rank Pairwise) loss for superior top-k ranking optimization',
        'Deployed on Hugging Face Spaces for instant cloud availability and zero-cost API hosting'
      ],
      diagramAscii: `[3M+ Amazon Reviews] ---> [Data Pipeline & Tokenizer]
                                     |
                +--------------------+--------------------+
                |                                         |
         [TF-IDF Features]                      [LightFM Sparse Matrix]
                |                                         |
                +--------------------+--------------------+
                                     v
                        [Hybrid WARP Model (P@5: 0.1688)]
                                     v
                          [Hugging Face Inference]`
    },
    features: [
      '3 Million+ Review Data Cleaning & Vectorization Pipeline',
      'Hybrid Retrieval Solving Both Warm and Cold-Start Scenarios',
      'WARP Loss Fine-Tuned for Top-5 Recommendation Precision',
      'Public REST Inference Endpoint on Hugging Face Hub'
    ],
    challenges: [
      {
        challenge: 'Memory exhaustion when computing full interaction matrices across 3 million reviews.',
        resolution: 'Utilized Scipy CSR sparse matrix storage and incremental batch chunking, reducing RAM footprint by over 80%.'
      }
    ],
    learnings: [
      'WARP loss consistently outperforms BPR and logistic loss when optimizing for top-N ranking metrics.',
      'Hybrid models provide a resilient safety net: when collaborative data is sparse, content embeddings carry the recommendation.'
    ],
    metrics: [
      '3,000,000+ Amazon Book Reviews processed',
      'Precision@5: 0.1688 with WARP loss optimization',
      'Publicly deployed on Hugging Face for global inference'
    ],
    technologies: ['Python', 'Machine Learning', 'LightFM', 'TF-IDF', 'Scikit-learn', 'Hugging Face', 'Pandas', 'NumPy'],
    techStack: {
      core: ['Python', 'LightFM', 'Scikit-learn', 'TF-IDF'],
      infrastructure: ['Hugging Face', 'Linux'],
      databases: ['Pandas/NumPy DataFrames', 'CSR Sparse Matrices'],
      tools: ['Jupyter Notebook', 'Git', 'GitHub', 'VS Code']
    },
    links: {
      liveDemo: 'https://huggingface.co/models'
    },
    featured: true,
    status: 'production',
    stars: 56
  },
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
      'CLIP',
      'Java',
      'Spring Boot',
      'React',
      'PostgreSQL',
      'Redis',
      'Docker'
    ],
    techStack: {
      core: ['Python', 'FastAPI', 'Java', 'Spring Boot 3'],
      infrastructure: ['Docker', 'AWS EC2', 'Nginx'],
      databases: ['Qdrant (Vector)', 'PostgreSQL', 'Redis'],
      tools: ['PyTorch', 'FastEmbed', 'Swagger', 'Postman']
    },
    links: {
      github: 'https://github.com/Ch-saketh/weavly',
      liveDemo: 'https://weavly-demo.saketh.dev',
      docs: 'https://weavly-docs.saketh.dev'
    },
    featured: true,
    status: 'production',
    stars: 128
  },
  {
    id: 'pagematch',
    name: 'PageMatch',
    slug: 'pagematch',
    title: 'PageMatch: Intelligent Document Retrieval & Cross-Modal RAG Search Engine',
    category: 'AI / Machine Learning',
    tagline: 'High-precision semantic search over dense technical documents, PDF blueprints, and code repositories.',
    description:
      'High-throughput RAG search engine designed to perform semantic parsing and vector retrieval over large-scale unstructured document sets. Incorporates chunk-level semantic boundary detection, hybrid keyword-vector indexing, and citation verification.',
    what: 'A document intelligence platform that parses complex PDF documents, extracts tabular data, and enables natural language conversational search with source attribution.',
    why: 'Keyword search (grep/BM25) fails on semantic nuance, while naïve embedding chunking destroys tables, code blocks, and cross-page context.',
    how: 'Engineered a structural AST parser in Python that chunks by semantic heading boundaries rather than arbitrary token counts, indexing vectors into Qdrant with BM25 hybrid ranking in PostgreSQL.',
    problem:
      'Parsing multi-column technical PDFs with interspersed equations, tables, and diagrams without losing contextual parent relationships.',
    solution:
      'Developed a hierarchical document tree representation where each chunk retains parent-child pointers to sections and chapters, enabling scoped re-ranking.',
    highlights: [
      'Hierarchical chunking preserving 99.4% of table relationships in PDF benchmarks',
      'Hybrid search blending BM25 lexical search with dense vector embeddings via reciprocal rank fusion (RRF)',
      'Sub-60ms query response time across 50,000+ indexed document pages',
      'Interactive React document viewer with real-time vector bounding box highlighting'
    ],
    architecture: {
      overview:
        'Client (React PDF Viewer) -> Python API Gateway -> Semantic Document Parser (PyPDF/Tesseract) -> Qdrant (Dense Vectors) & PostgreSQL (BM25 Lexical) -> Hybrid Reranker -> Response Streaming',
      keyDecisions: [
        'Used Reciprocal Rank Fusion (RRF) over linear score combination to normalize disparate search score distributions',
        'Implemented streaming response tokens via Server-Sent Events (SSE) for perceived zero latency'
      ],
      diagramAscii: `[PDF Upload] ---> [Semantic AST Chunking]
                            |
           +----------------+----------------+
           |                                 |
     [Dense Vector]                   [Lexical BM25]
           |                                 |
           +----------------+----------------+
                            v
               [Reciprocal Rank Fusion RRF]
                            v
                [Streamed Answer with Citations]`
    },
    features: [
      'Semantic Heading-Aware PDF Chunking Engine',
      'Reciprocal Rank Fusion Hybrid Search (Dense + Sparse)',
      'Citation Verifier with direct page and paragraph coordinates',
      'Real-Time Token Streaming with Markdown & Formula Support'
    ],
    challenges: [
      {
        challenge: 'Multi-column technical paper layouts causing reading order errors during extraction.',
        resolution: 'Integrated geometric bounding box sorting heuristics before text aggregation, preserving 99.4% reading order accuracy.'
      }
    ],
    learnings: [
      'RAG quality depends 80% on document pre-processing and chunk boundary intelligence rather than LLM size.',
      'Hybrid search consistently beats pure vector search for queries containing acronyms or domain-specific IDs.'
    ],
    metrics: [
      '50,000+ technical pages indexed with zero data corruption',
      'Sub-60ms average hybrid query latency',
      '98.1% citation accuracy verified across 500 benchmark test queries'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Qdrant',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Docker'
    ],
    techStack: {
      core: ['Python', 'FastAPI', 'React', 'TypeScript'],
      infrastructure: ['Docker', 'Nginx'],
      databases: ['Qdrant', 'PostgreSQL'],
      tools: ['Tesseract', 'PyMuPDF', 'Vite']
    },
    links: {
      github: 'https://github.com/Ch-saketh/pagematch',
      liveDemo: 'https://pagematch.saketh.dev'
    },
    featured: false,
    status: 'active',
    stars: 84
  },
  {
    id: 'cineportal',
    name: 'CinePortal',
    slug: 'cineportal',
    title: 'CinePortal: Distributed Real-Time Synchronized Watch Party & Social Streaming Platform',
    category: 'Full Stack',
    tagline: 'Sub-second video playback synchronization and decentralized WebRTC audio/video mesh for virtual cinemas.',
    description:
      'High-concurrency collaborative streaming platform enabling distributed groups of users to synchronize high-definition video playback with sub-50ms drift, paired with WebRTC peer-to-peer audio/video chat and interactive canvas overlays.',
    what: 'A social watch party web application allowing thousands of concurrent rooms to synchronize video timestamps with millisecond accuracy alongside low-latency peer audio/video mesh.',
    why: 'Existing watch party extensions suffer from timestamp desynchronization, latency drift under variable network conditions, and centralized relay costs.',
    how: 'Architected a deterministic NTP-style clock synchronization protocol over WebSockets with client-side drift compensation, powered by a Go/Node.js state coordinator and WebRTC mesh topology.',
    problem:
      'Compensating for jitter, packet loss, and variable network latency among 20+ users in a room without causing jarring video skips or buffering loops.',
    solution:
      'Built a predictive timestamp extrapolation algorithm that calculates round-trip time (RTT) moving averages and applies subtle playback rate adjustments (0.95x - 1.05x) rather than abrupt hard seeks.',
    highlights: [
      'Engineered NTP-style clock synchronization protocol maintaining <40ms drift across international networks',
      'Decentralized WebRTC mesh supporting up to 12 simultaneous video feeds per room with zero media server bandwidth costs',
      'Custom HTML5 video controller with frame-accurate scrubbing and synchronized audio tracks',
      'Built with TypeScript, React, Node.js, WebSockets, and Redis pub/sub room clustering'
    ],
    architecture: {
      overview:
        'Client (React/Canvas) <-> WebSocket Gateway (Node.js/Go) <-> Redis Pub/Sub Cluster <-> WebRTC Signaling Mesh',
      keyDecisions: [
        'Used adaptive playback rate micro-adjustments instead of hard seeks to eliminate audio pops and buffer stalls',
        'Leveraged Redis Pub/Sub for horizontal scaling across multiple WebSocket gateway instances'
      ],
      diagramAscii: `[Room Host] ---> [WebSocket Gateway] <--- [Room Peers]
                           |
                     [Redis Pub/Sub]
                           |
          [WebRTC Peer-to-Peer Audio/Video Mesh]`
    },
    features: [
      'NTP-Based Sub-50ms Playback Synchronization',
      'Decentralized Peer-to-Peer WebRTC Mesh Video Chat',
      'Synchronized Drawing Canvas Overlay for Collaborative Annotation',
      'Horizontal Room Clustering via Redis Pub/Sub'
    ],
    challenges: [
      {
        challenge: 'Bandwidth saturation on low-tier consumer internet when broadcasting peer-to-peer WebRTC video.',
        resolution: 'Implemented dynamic simulcast resolution scaling based on WebRTC getStats() packet loss metrics.'
      }
    ],
    learnings: [
      'Smooth micro-adjustments in playback rate (1.02x speed) are completely imperceptible to users yet resolve drift reliably within 3 seconds.',
      'WebRTC connection state machines require extensive heartbeat monitoring and automated ICE restart routines.'
    ],
    metrics: [
      '<40ms average drift across 1,000+ synchronized watch sessions',
      'Over 25,000 active rooms hosted during peak release events',
      'Zero server egress bandwidth costs for WebRTC media streams'
    ],
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'WebSockets',
      'WebRTC',
      'Redis',
      'Docker',
      'Tailwind CSS'
    ],
    techStack: {
      core: ['TypeScript', 'React', 'Node.js', 'WebSockets'],
      infrastructure: ['Docker', 'Nginx'],
      databases: ['Redis'],
      tools: ['WebRTC API', 'Vite', 'Postman']
    },
    links: {
      github: 'https://github.com/Ch-saketh/cineportal',
      liveDemo: 'https://cineportal.saketh.dev'
    },
    featured: false,
    status: 'production',
    stars: 96
  },
  {
    id: 'saketh-os',
    name: 'SAKETH.OS',
    slug: 'saketh-os',
    title: 'SAKETH.OS — Developer Operating System & Workstation',
    category: 'Developer Tools',
    tagline: 'Interactive developer operating system portfolio with binary reconstruction and real terminal engine.',
    description:
      'A personal developer operating system featuring a POSIX-compliant virtual filesystem, extensible command registry, binary ASCII workstation scene, and interactive developer environment.',
    what: 'A terminal-native developer portfolio operating system simulating a Linux environment with rich HUD matrix panels, git timeline visualizer, and custom ASCII developer workspace.',
    why: 'Standard developer portfolios are static and generic; SAKETH.OS turns personal portfolio exploration into an authentic, memorable terminal operating system interaction.',
    how: 'Built with React 19, TypeScript, custom VFS tree, binary ray/ASCII canvas reconstruction, and a modular command execution pipeline.',
    problem:
      'Providing an authentic terminal experience with autocomplete, history, and POSIX path traversal without sacrificing modern web responsiveness and accessibility.',
    solution:
      'Implemented an in-memory POSIX Virtual File System (VFS), modular CommandRegistry with command aliases, and a zero-DOM canvas developer reconstruction.',
    highlights: [
      'Engineered in-memory POSIX VFS with cd, ls, cat, pwd, mkdir, and touch',
      'Dual-mode interactive terminal with rich command outputs and tab autocompletion',
      'Procedural Canvas and SVG developer scene recreating workstation aesthetics with binary glyphs',
      'Zero external styling bloat, pure scoped CSS modules with 100% theme variable coverage'
    ],
    architecture: {
      overview: 'Vite + React 19 Shell <-> CommandRegistry <-> Virtual File System (VFS) <-> State Management Store',
      keyDecisions: [
        'POSIX VFS with absolute/relative path resolution and node metadata',
        'State decoupling via Zustand stores (Terminal, VFS, System, Achievement)',
        'Zero-DOM canvas rendering for high-density ASCII/binary glyphs to maintain 60 FPS'
      ],
      diagramAscii: `[Terminal Input] ---> [Command Parser] ---> [Command Registry]
                              |                      |
                              v                      v
                       [Command History]      [POSIX VFS Tree]`
    },
    features: [
      'In-Memory POSIX Virtual File System',
      'Interactive Command Autocomplete & Shell History',
      'Binary ASCII Developer Workstation Scene',
      'Git History & Milestone Interactive Visualizer'
    ],
    challenges: [
      {
        challenge: 'Maintaining responsive performance while rendering intricate binary workstation silhouettes.',
        resolution: 'Utilized HTML5 2D Canvas rendering with requestAnimationFrame throttling and vector asset pre-caching.'
      }
    ],
    learnings: [
      'Decoupling the command execution engine from the visual output layer enables unified keyboard and click interaction.',
      'A structured virtual file system brings unmatched authenticity to terminal web portfolios.'
    ],
    metrics: [
      '60 FPS smooth canvas animation rate',
      '100% TypeScript type coverage with strict mode',
      '<50ms command execution latency'
    ],
    technologies: ['TypeScript', 'React', 'Vite', 'HTML5 Canvas', 'CSS Modules', 'Zustand', 'Vitest'],
    techStack: {
      core: ['TypeScript', 'React', 'Vite'],
      infrastructure: ['Vercel', 'Node.js'],
      databases: ['In-Memory VFS'],
      tools: ['Vitest', 'Testing Library', 'Canvas API']
    },
    links: {
      github: 'https://github.com/Ch-saketh/Terminal-based-portfolio',
      liveDemo: 'https://saketh.dev'
    },
    featured: true,
    status: 'production',
    stars: 128
  }
];
