import { GitCommitMilestone } from '../types/content';

export const gitMilestonesData: GitCommitMilestone[] = [
  {
    hash: 'a81f2c7',
    parentHash: '91be72a',
    date: '2025-01-28',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(weavly): build recommendation system (Weavly) & LUXZERA platform',
    shortMessage: 'Built recommendation system (Weavly)',
    event: 'Weavly / Zyra AI Launch',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '*   ',
    whatHappened:
      'Developed intelligent recommendation systems including LUXZERA and Weavly. Engineered transaction-safe API endpoints in Java and Spring Boot, tuning relational queries with Hibernate to cut latency from 150ms to 60ms.',
    whatWasLearned:
      'Decoupled layered architecture and explicit JOIN FETCH queries are critical for high-concurrency relational performance.',
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'MySQL', 'React.js', 'REST APIs', 'Qdrant'],
    metrics: [
      'Query latency slashed from 150ms to 60ms (60% improvement)',
      'Transaction-safe checkout and live user preference states',
      'Two-engineer collaborative feature delivery'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects luxzera' },
      { label: 'GitHub Repository', url: 'https://github.com/Ch-saketh/LUXZERA' }
    ],
    diffPreview: `+ const client = new QdrantClient({ url: 'http://localhost:6333' });
+ await client.createCollection("wardrobe_embeddings", { vectors: { size: 512, distance: "Cosine" } });
+ // Hibernate Join Fetch Tuning to eliminate N+1 queries
+ @Query("SELECT o FROM Outfit o JOIN FETCH o.items WHERE o.userDimensions = :dims")
+ List<Outfit> findOutfitsByDimensions(@Param("dims") UserDimensions dims);`
  },
  {
    hash: '91be72a',
    parentHash: '7f3a1b2',
    date: '2025-01-20',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'award(hackathon): Quantum Valley Hackathon (1st Place / 2nd Prize) - BB84 QKD System',
    shortMessage: 'Quantum Valley Hackathon (1st Place)',
    event: 'Quantum Valley AI Hackathon',
    category: 'hackathon',
    branch: 'hackathons',
    branchColor: '#ffbd2e',
    graphConnector: '| * ',
    whatHappened:
      'Served as Lead Frontend Developer for Team Ekalavya (Problem Statement AQVH911); built the real-time encryption interface for a Quantum-Secure E-Auction System simulating BB84 Quantum Key Distribution and real-time QBER monitoring.',
    whatWasLearned:
      'Simulating quantum polarization bases and eavesdropping detection in software provides a compelling visual demonstration of quantum cryptographic security.',
    technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'WebSockets', 'MongoDB', 'Tailwind CSS'],
    metrics: [
      'Awarded Prize for Problem Statement AQVH911',
      'Real-time QBER eavesdropping detection on active channels'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects quantum-e-auction' },
      { label: 'View Award Details', url: '#', isCli: true, cliCmd: 'achievements' }
    ],
    diffPreview: `+ // BB84 Quantum Key Distribution Simulation
+ const photonBases = generateRandomBases(bitsLength);
+ const qber = calculateQuantumBitErrorRate(aliceBases, bobBases);
+ if (qber > 0.11) abortKeyNegotiation("Eavesdropping detected");`
  },
  {
    hash: '4cd881e',
    parentHash: '7f3a1b2',
    date: '2024-11-20',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(cineportal): build CinePortal (Real-Time Watch Party) & synchronization mesh',
    shortMessage: 'Built CinePortal (Real-Time Watch Party)',
    event: 'CinePortal Engineering Release',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '* | ',
    whatHappened:
      'Built a distributed real-time synchronized video playback platform with WebRTC peer-to-peer mesh and sub-50ms NTP clock drift compensation.',
    whatWasLearned:
      'Predictive timestamp extrapolation and WebRTC ICE health monitors ensure jitter-free collaborative playback.',
    technologies: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'WebRTC', 'Redis'],
    metrics: [
      '<40ms average playback drift across test rooms',
      'Sub-50ms synchronization across international networks'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects cineportal' }
    ],
    diffPreview: `+ // Sub-50ms Playback Drift Compensation
+ const driftMs = remoteTimestamp - localVideo.currentTime * 1000;
+ if (Math.abs(driftMs) > 40) localVideo.playbackRate = driftMs > 0 ? 1.03 : 0.97;`
  },
  {
    hash: '7f3a1b2',
    parentHash: '5e8c4d9',
    date: '2025-01-05',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'exp(handshake): join Handshake AI as AI Technical Trainer & Code Evaluator',
    shortMessage: 'Joined Handshake AI',
    event: 'Handshake AI Contract Role',
    category: 'career',
    branch: 'career',
    branchColor: '#00f2fe',
    graphConnector: '| | *',
    whatHappened:
      'Evaluated AI-generated code snippets and system designs across Python, Java, and SQL for logical correctness, performance, and security edge cases. Authored complex technical test prompts and benchmark suites to evaluate LLM reasoning capabilities.',
    whatWasLearned:
      'Rigorous evaluation requires deep understanding of edge cases, time complexity boundaries, and subtle vulnerabilities in generated code.',
    technologies: ['Python', 'Java', 'SQL', 'LLM Benchmarking', 'System Design'],
    metrics: [
      'Multi-language code evaluations across Python, Java, and SQL',
      'Comprehensive benchmark suites authored for frontier model reasoning'
    ],
    links: [
      { label: 'View Experience', url: '#', isCli: true, cliCmd: 'experience' }
    ],
    diffPreview: `+ // LLM Reasoning Benchmark Rubric
+ def evaluate_solution(ast_tree, runtime_profile):
+     assert no_concurrency_race_conditions(ast_tree)
+     assert optimal_query_plan_adherence(runtime_profile)`
  },
  {
    hash: '5e8c4d9',
    parentHash: '3d2a7f1',
    date: '2024-11-15',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'award(hackathon): 2nd Prize - National AI Hackathon',
    shortMessage: 'National AI Hackathon (2nd Prize)',
    event: 'National AI Hackathon',
    category: 'hackathon',
    branch: 'hackathons',
    branchColor: '#ffbd2e',
    graphConnector: '| * |',
    whatHappened:
      'Deployed interface layout components and state management routines for an automated evaluation system, debugging data tracking anomalies under high request volumes.',
    whatWasLearned:
      'High request volumes require aggressive memoization, defensive state handling, and structured request deduplication.',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'REST APIs'],
    metrics: [
      'Awarded 2nd Prize in National Competition',
      'Zero UI state desync during high volume live judge evaluations'
    ],
    links: [
      { label: 'View Award Details', url: '#', isCli: true, cliCmd: 'achievements' }
    ],
    diffPreview: `+ // Resilient State Handler for Evaluation Ingestion
+ const dispatchWithDeduplication = (eventBatch) => {
+     const deduplicated = filterInFlightEvents(eventBatch);
+     commitState(deduplicated);
+ };`
  },
  {
    hash: '3d2a7f1',
    parentHash: '1c9f8e2',
    date: '2024-06-10',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'feat(recommendation): build hybrid book recommendation engine deployed to Hugging Face',
    shortMessage: 'Hybrid ML Recommender Published',
    event: 'Hybrid Book Recommender Launch',
    category: 'project',
    branch: 'main',
    branchColor: 'var(--color-primary-green, #00ff88)',
    graphConnector: '* | |',
    whatHappened:
      'Built an end-to-end data pipeline as Team Head, processing over 3 million data rows from the Amazon Book Reviews dataset alongside structured content arrays. Engineered a hybrid retrieval flow combining TF-IDF textual features with a collaborative LightFM model using a sparse interaction matrix. Achieved precision@5 of 0.1688, deployed publicly on Hugging Face.',
    whatWasLearned:
      'Sparse matrices prevent RAM spikes when dealing with millions of interactions, and hybrid models solve the cold-start problem reliably.',
    technologies: ['Python', 'LightFM', 'TF-IDF', 'Scikit-learn', 'Hugging Face', 'Pandas'],
    metrics: [
      '3,000,000+ review rows processed in data pipeline',
      'Precision@5 of 0.1688 achieved with WARP loss optimization',
      'Public model inference deployed on Hugging Face'
    ],
    links: [
      { label: 'View Project Deep Dive', url: '#', isCli: true, cliCmd: 'projects book-recommendation' }
    ],
    diffPreview: `+ // Hybrid LightFM Model Fitting with WARP Loss
+ model = LightFM(loss='warp', no_components=64)
+ model.fit(train_interactions, item_features=tfidf_features, epochs=30)
+ p_at_5 = precision_at_k(model, test_interactions, k=5).mean()`
  },
  {
    hash: '1c9f8e2',
    parentHash: '',
    date: '2024-03-01',
    author: 'Saketh Chokkapu <chokkapusaketh@gmail.com>',
    message: 'exp(nexlevr): join NexLevr as Software Engineering Intern',
    shortMessage: 'Joined NexLevr',
    event: 'NexLevr Internship',
    category: 'career',
    branch: 'career',
    branchColor: '#00f2fe',
    graphConnector: '  *  ',
    whatHappened:
      'Maintained backend stability for the NexLevr platform while developing new features to enhance user engagement. Contributed to full-stack web development and REST API integration across core platform services.',
    whatWasLearned:
      'Production backend stability requires thorough API validation, defensive database query execution, and proactive error logging.',
    technologies: ['Node.js', 'Express.js', 'React.js', 'PostgreSQL', 'REST APIs', 'Git'],
    metrics: [
      'Maintained platform backend stability across production sprints',
      'Delivered user-facing features and API integrations'
    ],
    links: [
      { label: 'View Experience', url: '#', isCli: true, cliCmd: 'experience' }
    ],
    diffPreview: `+ // NexLevr Core Service Endpoint
+ router.post('/api/features', authenticateToken, async (req, res) => {
+     const result = await featureService.processEngagement(req.body);
+     res.json({ success: true, data: result });
+ });`
  }
];
