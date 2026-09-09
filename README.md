# SAKETH.OS — Developer Operating System & Terminal Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646cff.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Vitest-114%20Passed-success.svg)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-0%20Warnings-green.svg)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

An interactive, production-grade web-based developer workstation and terminal operating system. Features a POSIX-compliant virtual file system, executable CLI shell, responsive dual-zone workspace layout, interactive project explorer, and real developer scene visual reconstruction.

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/Ch-saketh/Terminal-based-portfolio.git

# Enter the project directory
cd Terminal-based-portfolio

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port displayed in terminal) to view the workstation live.

### 3. Build & Test
```bash
# Run the automated test suite (114 tests)
npm test

# Run ESLint validation (enforces 0 warnings)
npm run lint

# Compile TypeScript and create production bundle in /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🤖 Instant Personalization: The "One-Shot" AI Setup Prompt

Want to rebrand and customize this portfolio with **your own name, bio, projects, and skills** in one step? 

Copy and paste the prompt below directly into your AI coding assistant (**Antigravity**, **Cursor**, **ChatGPT**, or **Claude**):

```text
You are an expert full-stack TypeScript engineer. I want to personalize this SAKETH.OS terminal portfolio for myself.

Please update the single-source-of-truth data files located in `src/content/` to replace Saketh's information with my own details:

================ MY DETAILS ================
• Full Name: [YOUR FULL NAME]
• Handle / Username: [YOUR USERNAME, e.g. alexdev]
• Professional Title: [YOUR TITLE, e.g. Full-Stack & AI Engineer]
• City / Country: [YOUR CITY, e.g. San Francisco, USA]
• Email: [YOUR EMAIL]
• GitHub URL: [YOUR GITHUB PROFILE URL]
• LinkedIn URL: [YOUR LINKEDIN PROFILE URL]
• Personal Tagline / Quote: "[YOUR FAVORITE QUOTE]"
• Short Bio: "[2-3 SENTENCES ABOUT WHAT YOU BUILD]"

• Education:
  - Degree: [DEGREE NAME, e.g. B.S. in Computer Science]
  - Institution: [UNIVERSITY / COLLEGE]
  - Timeline & Location: [e.g. 2021 - 2025 • City, Country]
  - Focus Areas: [e.g. Distributed Systems, Algorithms, Machine Learning]

• Core Skills & Tech Stack:
  - Primary / Production Core: [e.g. TypeScript, React, Node.js, Python, PostgreSQL, Docker]
  - Working Knowledge: [e.g. Go, Kubernetes, GraphQL, Redis, AWS]
  - Exploring: [e.g. Rust, LLM Fine-Tuning, WebGPU]

• Featured Projects (at least 2-3):
  1. Name: [PROJECT NAME] | Slug: [SLUG, e.g. my-app]
     - Category: [e.g. Full Stack / AI]
     - Tagline: [1 sentence description]
     - Tech Stack: [List of technologies]
     - Architecture & Problem: [Brief summary of problem and solution]
     - GitHub: [URL] | Live Demo: [URL]
  2. Name: [PROJECT 2 NAME] | Slug: [SLUG 2]
     - Category: [Category]
     - Tagline: [1 sentence description]
     - Tech Stack: [List of technologies]
     - GitHub: [URL] | Live Demo: [URL]

• Career & Experience Milestones (2-4 milestones):
  - [YEAR/DATE]: [ROLE/EVENT, e.g. Software Engineer at Tech Corp]
  - [YEAR/DATE]: [HACKATHON / PROJECT / EDUCATION MILESTONE]
============================================

INSTRUCTIONS:
1. Update `src/content/profile.ts` with my name, handle, quote, bio, links, and education.
2. Update `src/content/projects.ts` with my projects and repository details.
3. Update `src/content/skills.ts` with my categorized skills.
4. Update `src/content/timeline.ts` with my career git milestones.
5. Update `src/content/config.ts` system titles, banners, and default username prompt.
6. Verify all TypeScript types remain valid and run `npm test && npm run lint && npm run build` to guarantee zero errors.
```

---

## 🛠️ Manual Configuration Guide

All portfolio data is strictly centralized in `src/content/`. You do not need to hunt through UI components to change content:

| File | What to Customize |
| :--- | :--- |
| [`src/content/profile.ts`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/src/content/profile.ts) | Your name, bio, education, philosophy, and social links (GitHub, LinkedIn, Email). |
| [`src/content/projects.ts`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/src/content/projects.ts) | Featured projects, architecture briefs, tech chips, live demos, and GitHub links. |
| [`src/content/skills.ts`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/src/content/skills.ts) | 9 skill categories, proficiency levels (`Primary`, `Working`, `Exploring`), and associated projects. |
| [`src/content/timeline.ts`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/src/content/timeline.ts) | Git commit timeline, hackathon wins, career journey, and milestones. |
| [`src/content/config.ts`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/src/content/config.ts) | Operating system name, kernel version, hostname, prompt prefixes, and boot banner text. |

---

## 🖥️ System Architecture

SAKETH.OS cleanly decouples POSIX OS & CLI kernel logic from React presentation layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│  ┌──────────────────────────────┐  ┌────────────────────────────────┐  │
│  │     Interactive Terminal     │  │      Desktop Shell / GUI       │  │
│  │ (Virtual Stream / Prompt /   │  │ (TopBar / Left Identity / HUD  │  │
│  │  Clean Section Header Views) │  │  Metrics / Quick Access Dock)  │  │
│  └──────────────┬───────────────┘  └───────────────┬────────────────┘  │
├─────────────────┼──────────────────────────────────┼───────────────────┤
│                 ▼                                  ▼                   │
│                        STATE & EVENT BUS                               │
│  ┌──────────────────────┐ ┌──────────────────┐ ┌────────────────────┐  │
│  │  useTerminalStore    │ │ useWindowStore   │ │   useSystemStore   │  │
│  │ (Buffer, History)    │ │ (Z-index, Bounds)│ │ (Theme, FX, Audio) │  │
│  └──────────┬───────────┘ └────────┬─────────┘ └─────────┬──────────┘  │
├─────────────┼──────────────────────┼─────────────────────┼─────────────┤
│             ▼                      ▼                     ▼             │
│                      CORE KERNEL & CLI ENGINE                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Lexer & Tokenizer ➔ AST / Flag Parser ➔ Middleware Pipeline      │  │
│  │  ➔ Command Registry Dispatcher ➔ Dynamic Section Viewport        │  │
│  └──────────────────┬───────────────────────────────────────────────┘  │
├─────────────────────┼──────────────────────────────────────────────────┤
│                     ▼                                                  │
│                     VIRTUAL FILE SYSTEM (VFS)                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  POSIX Tree (/, /home, /projects, /skills, /experience)          │  │
│  │  Path Resolver (., .., ~, relative, absolute) & Permissions       │  │
│  └──────────────────┬───────────────────────────────────────────────┘  │
├─────────────────────┼──────────────────────────────────────────────────┤
│                     ▼                                                  │
│                   CONTENT & DATA DOMAIN (Single Source of Truth)       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  src/content/ (profile.ts, projects.ts, skills.ts, timeline.ts)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
Terminal-based-portfolio/
├── public/                     # Static assets (robots.txt, sitemap.xml, resume.pdf)
├── src/
│   ├── components/             # Modular React UI components
│   │   ├── about/              # Interactive Profile & Developer philosophy
│   │   ├── experience/         # Git timeline matrix & visual career roadmap
│   │   ├── home/               # Dual-zone split workspace & HUD matrix panels
│   │   ├── hud/                # SystemMetrics, RecentActivity, QuickAccess, NowPlaying
│   │   ├── projects/           # Project Explorer & deep technical detail views
│   │   ├── skills/             # Engineering stack diagnostic matrix & Inspector
│   │   ├── terminal/           # Terminal emulator, SectionHeader, Input, Autocomplete
│   │   └── workstation/        # Canvas binary reconstruction & developer scene engine
│   ├── content/                # Single Source of Truth (profile, projects, skills, timeline)
│   ├── core/                   # Kernel CLI parser, VFS tree, Web Audio synthesizer
│   ├── state/                  # Zustand stores (terminal, vfs, system, window, achievements)
│   ├── styles/                 # Pure CSS design token system (colors, typography, a11y)
│   └── types/                  # Strict TypeScript definitions
├── tests/                      # Automated Vitest unit, component & integration tests (114 tests)
├── vercel.json                 # Vercel deployment config (SPA rewrites, security headers)
├── eslint.config.js            # ESLint 9 configuration
├── tsconfig.json               # Strict TypeScript compiler options
└── vite.config.ts              # Vite 5 bundle configuration
```

---

## 💻 Primary Terminal Commands

| Command | Usage | Description |
| :--- | :--- | :--- |
| `help` | `help [cmd]` | Display available commands & system manual |
| `whoami` | `whoami` | Developer identity & core competencies |
| `about` | `about` | Detailed profile, philosophy & education |
| `projects` | `projects [slug]` | Browse production projects & architecture deep dives |
| `skills` | `skills [category]` | Diagnostic telemetry stack matrix (`backend`, `ai`, `databases`) |
| `inspect` | `inspect <tech>` | Deep tech inspection (`inspect spring-boot`, `inspect qdrant`) |
| `git log` | `git log [--oneline]` | Git career history, milestones & commit inspections |
| `achievements` | `achievements` | System achievements, discoverable secrets & rank |
| `sudo` | `sudo make-me-hireable` | Executive candidate briefing & verified credentials |
| `neofetch` | `neofetch` | Hardware specs, kernel telemetry & active theme swatches |
| `matrix` | `matrix` | Fullscreen phosphor rain animation |
| `clear` | `clear` | Clear terminal output stream |

---

## 🚀 Production Deployment (Vercel)

### Automatic Deployment via Git
1. Connect this repository to your [Vercel Dashboard](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build` (`tsc -b && vite build`).
4. Output Directory: `dist`.
5. Deploy!

The included [`vercel.json`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/vercel.json) automatically configures:
- Single-page application route rewrites (`/(.*) -> /index.html`)
- Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`)
- Immutable caching for static assets in `/assets/*`

---

## 📄 License

MIT © [Saketh Chokkapu](https://github.com/Ch-saketh)
