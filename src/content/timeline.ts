import { GitCommitMilestone } from '../types/content';

export const gitMilestonesData: GitCommitMilestone[] = [
  {
    hash: 'a81f2c7',
    parentHash: '91be72a',
    date: '2024-08-15',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(weavly): build multi-modal fashion intelligence & outfit recommendation system',
    shortMessage: 'Built recommendation system (Weavly)',
    event: 'Weavly / Zyra AI Launch',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '*   ',
    whatHappened:
      'Engineered a production-ready fashion recommendation engine combining multi-modal CLIP visual embeddings, Qdrant vector retrieval, and Spring Boot high-throughput microservices. Scaled vector search to 100k+ SKUs with sub-50ms latency.',
    whatWasLearned:
      'Vector databases perform optimally with payload pre-filtering; decoupling AI inference microservices from business APIs is critical for independent scaling.',
    technologies: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'Qdrant', 'CLIP', 'Redis', 'PostgreSQL', 'Docker'],
    metrics: [
      '38ms p99 vector retrieval latency',
      '1,200+ RPS sustained throughput',
      '94.2% style relevance score in A/B testing'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects weavly' },
      { label: 'GitHub Repository', url: 'https://github.com/Ch-saketh/weavly' },
      { label: 'Live Demo', url: 'https://weavly-demo.saketh.dev' }
    ],
    diffPreview: `+ // Multi-Modal FastEmbed Vector Projection
+ CollectionConfig config = new CollectionConfig(512, Distance.COSINE);
+ qdrantClient.createCollection("wardrobe_embeddings", config);
+ List<ScoredPoint> matches = qdrantClient.search("wardrobe_embeddings", queryVector, filterPayload);`
  },
  {
    hash: '91be72a',
    parentHash: '4cd881e',
    date: '2024-05-22',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'award(hackathon): 1st Place - Quantum Valley AI Innovation Hackathon',
    shortMessage: 'Quantum Valley Hackathon (1st Place)',
    event: 'Quantum Valley AI Hackathon',
    category: 'hackathon',
    branch: 'hackathons',
    branchColor: '#ffbd2e',
    graphConnector: '| * ',
    whatHappened:
      'Won 1st Place out of 120+ engineering teams at Quantum Valley Hackathon. Designed and demonstrated an autonomous multimodal agent capable of real-time computer vision reasoning, structured tool execution, and zero-shot catalog pairing in under 36 hours.',
    whatWasLearned:
      'Rapid prototype validation requires tight feedback loops, robust fallback error handling, and high-clarity API interfaces between team members.',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'OpenAI Vision API', 'WebSockets', 'React'],
    metrics: [
      'Ranked #1 of 120+ participant teams',
      'Engineered full end-to-end MVP in 36 consecutive hours'
    ],
    links: [
      { label: 'View Award Details', url: '#', isCli: true, cliCmd: 'achievements' }
    ],
    diffPreview: `+ // Autonomous Vision Reasoning Pipeline
+ async def analyze_apparel_stream(frame: bytes) -> RecommendationPayload:
+     features = await vision_encoder.extract_features(frame)
+     return await ensemble_scorer.rank_styles(features)`
  },
  {
    hash: '4cd881e',
    parentHash: 'e7d23a1',
    date: '2024-03-10',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(cineportal): engineer real-time synchronized streaming & WebRTC watch platform',
    shortMessage: 'Built CinePortal (Real-Time Watch Party)',
    event: 'CinePortal Collaborative Media Launch',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-cyan, #00f2fe)',
    graphConnector: '* | ',
    whatHappened:
      'Architected a synchronized media platform allowing distributed groups to stream video with <50ms playback drift. Engineered an NTP-inspired clock synchronization algorithm over Go WebSockets paired with peer-to-peer WebRTC audio/video communication.',
    whatWasLearned:
      'Subtle playback rate adjustments (0.98x - 1.02x) correct clock drift seamlessly without jarring video pauses.',
    technologies: ['Go', 'TypeScript', 'Next.js', 'WebSockets', 'WebRTC', 'Redis Pub/Sub', 'FFmpeg', 'Docker'],
    metrics: [
      '< 50ms average playback drift across global nodes',
      '20,000+ concurrent WebSocket connections per cluster node'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects cineportal' },
      { label: 'GitHub Repository', url: 'https://github.com/Ch-saketh/cineportal' }
    ],
    diffPreview: `+ // Master NTP Drift Correction Protocol
+ func (r *Room) SyncPlayback(clientTime int64, serverTime int64) {
+     drift := serverTime - clientTime
+     if math.Abs(float64(drift)) > 50 {
+         r.BroadcastRateAdjustment(calculateRate(drift))
+     }
+ }`
  },
  {
    hash: 'e7d23a1',
    parentHash: 'b14c99d',
    date: '2023-11-18',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(pagematch): build distributed AST-based web scraping & semantic diff engine',
    shortMessage: 'Built PageMatch (Semantic Web Scraper)',
    event: 'PageMatch Web Intelligence Engine',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '*   ',
    whatHappened:
      'Built a distributed web scraping and semantic content difference engine capable of rendering JavaScript SPAs via Playwright, stripping non-deterministic DOM noise using AST Merkle trees, and alerting on real semantic updates.',
    whatWasLearned:
      'DOM structural hashing saves 85%+ CPU by eliminating unnecessary string parsing on unchanged subtrees.',
    technologies: ['Python', 'FastAPI', 'Playwright', 'Celery', 'Redis', 'PostgreSQL', 'Docker'],
    metrics: [
      '50,000+ daily URL ingestion capacity',
      '98.4% reduction in false-positive change alerts'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects pagematch' },
      { label: 'GitHub Repository', url: 'https://github.com/Ch-saketh/pagematch' }
    ],
    diffPreview: `+ // Merkle DOM Subtree Hash Comparator
+ def compute_dom_diff(prev_tree: MerkleNode, curr_tree: MerkleNode) -> List[DiffItem]:
+     if prev_tree.hash == curr_tree.hash:
+         return [] # Zero change in subtree
+     return traverse_and_extract_semantic_mutations(prev_tree, curr_tree)`
  },
  {
    hash: 'b14c99d',
    parentHash: 'f3a802c',
    date: '2023-08-04',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(saketh-os): architect interactive developer operating system & CLI engine',
    shortMessage: 'Architected SAKETH.OS Terminal Shell',
    event: 'SAKETH.OS Initial Architecture Release',
    category: 'architecture',
    branch: 'main',
    branchColor: 'var(--color-primary-cyan, #00f2fe)',
    graphConnector: '*   ',
    whatHappened:
      'Engineered an interactive browser developer operating system in TypeScript. Built an AST tokenizer, virtual POSIX filesystem with path normalization, Web Audio procedural sound synthesizer, and zero-runtime CSS token architecture.',
    whatWasLearned:
      'Decoupling domain state (VFS, AST parser, command registry) from React view layers enables complete determinism and comprehensive testability.',
    technologies: ['TypeScript', 'React', 'Zustand', 'Web Audio API', 'Vite', 'Vitest'],
    metrics: [
      '100/100 Lighthouse Performance & Accessibility',
      '< 78KB gzipped bundle footprint',
      '0ms server roundtrips for all CLI navigation'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects saketh-os' },
      { label: 'GitHub Repository', url: 'https://github.com/Ch-saketh/Terminal-based-portfolio' }
    ],
    diffPreview: `+ // AST CLI Parser & VFS In-Memory Tree
+ export class CommandTokenizer {
+     tokenize(input: string): CommandAST { ... }
+ }`
  },
  {
    hash: 'f3a802c',
    parentHash: '2d91ae4',
    date: '2023-05-15',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'milestone(edu): graduate B.Tech in Computer Science & Engineering',
    shortMessage: 'B.Tech CSE Graduation (Honors)',
    event: 'University Graduation',
    category: 'education',
    branch: 'releases',
    branchColor: '#c084fc',
    graphConnector: '*   ',
    whatHappened:
      'Graduated with Bachelor of Technology in Computer Science & Engineering. Rigorous focus on Distributed Systems, Compilers, Machine Learning, Operating Systems Internals, and Database Engineering.',
    whatWasLearned:
      'Foundational first-principles computer science fundamentals—data structures, memory models, network layers, and concurrency—remain constant through every shifting technology wave.',
    technologies: ['Computer Science', 'Distributed Systems', 'Algorithms', 'Operating Systems', 'Compilers'],
    metrics: [
      'Top tier academic standing',
      'Authored final year capstone on distributed telemetry collection'
    ],
    links: [
      { label: 'Inspect Education Profile', url: '#', isCli: true, cliCmd: 'about' }
    ],
    diffPreview: `+ // B.Tech Computer Science & Engineering Completed
+ Degree: Bachelor of Technology
+ Major: Computer Science & Engineering
+ University: Jawaharlal Nehru Technological University`
  },
  {
    hash: '2d91ae4',
    parentHash: undefined,
    date: '2021-08-01',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'init(genesis): initialize software engineering career & open-source journey',
    shortMessage: 'Initial Commit (Engineering Genesis)',
    event: 'Journey Genesis',
    category: 'career',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '*   ',
    whatHappened:
      'Began deep dive into software systems, open-source development, and building real-world software products. Shipped first high-impact full-stack web applications and cloud deployments.',
    whatWasLearned:
      'Engineering craft is built through deliberate practice, building real products that solve genuine problems, and learning from production failures.',
    technologies: ['JavaScript', 'Python', 'Git', 'Linux', 'SQL'],
    metrics: [
      '350+ Open Source commits shipped',
      'Over 1,200 production releases executed'
    ],
    links: [
      { label: 'Inspect Full Profile', url: '#', isCli: true, cliCmd: 'whoami' }
    ],
    diffPreview: `+ // Genesis Commit
+ console.log("Hello, World! SAKETH.OS Initialized.");`
  }
];
