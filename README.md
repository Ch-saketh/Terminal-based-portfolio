# SAKETH.OS — Developer Operating System & Terminal Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646cff.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Vitest-77%20Passed-success.svg)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-0%20Warnings-green.svg)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

An interactive, production-grade web-based developer workstation and terminal operating system for **Saketh Chokkapu** (Lead Systems Architect & Full-Stack Engineer).

---

## 🖥️ System Architecture

SAKETH.OS cleanly decouples core POSIX OS & CLI kernel logic from React UI presentation layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│  ┌──────────────────────────────┐  ┌────────────────────────────────┐  │
│  │     Interactive Terminal     │  │      Desktop Shell / GUI       │  │
│  │ (Virtual Stream / Prompt /   │  │ (TopBar / Dock / Window Mgr /  │  │
│  │  Custom React Command Views) │  │  Live System Monitor / Drawer) │  │
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
│  │  ➔ Command Registry Dispatcher ➔ Dynamic Result Renderer         │  │
│  └──────────────────┬───────────────────────────────────────────────┘  │
├─────────────────────┼──────────────────────────────────────────────────┤
│                     ▼                                                  │
│                     VIRTUAL FILE SYSTEM (VFS)                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  POSIX Tree (/, /home/saketh, /projects, /skills, /experience)    │  │
│  │  Path Resolver (., .., ~, relative, absolute) & Permissions       │  │
│  └──────────────────┬───────────────────────────────────────────────┘  │
├─────────────────────┼──────────────────────────────────────────────────┤
│                     ▼                                                  │
│                   CONTENT & DATA DOMAIN (Single Source of Truth)       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Profile / Projects / Skills / Git Milestones / Achievements     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
terminal-based-portfolio/
├── public/                     # Static assets (robots.txt, sitemap.xml, favicon.svg)
├── src/
│   ├── app/                    # Main application bootstrap & Desktop AppShell
│   ├── components/             # Modular React UI components
│   │   ├── about/              # Interactive Profile & Developer philosophy
│   │   ├── achievements/       # Achievement registry & Gamification system
│   │   ├── desktop/            # TopBar, Dock, WindowManager, System drawer
│   │   ├── easter-eggs/        # Matrix rain canvas, terminal particle effects
│   │   ├── experience/         # Git timeline matrix & visual career roadmap
│   │   ├── homepage/           # BIOS boot sequence, Hero workstation
│   │   ├── projects/           # Project Explorer & deep technical detail views
│   │   ├── shared/             # ErrorBoundary, QuickCommandBar, Modals
│   │   ├── skills/             # Engineering stack diagnostic matrix & Inspector
│   │   └── terminal/           # Terminal emulator, Prompt, Autocomplete, Renderers
│   ├── content/                # Structured domain data (projects, skills, milestones)
│   ├── core/                   # Kernel CLI parser, VFS tree, Web Audio synthesizer
│   ├── state/                  # Zustand stores (terminal, vfs, system, window, achievements)
│   ├── styles/                 # Pure CSS design token system (colors, typography, a11y)
│   └── types/                  # Strict TypeScript definitions
├── tests/                      # Automated Vitest unit, component & integration tests
├── vercel.json                 # Vercel deployment config (SPA rewrites, security headers)
├── eslint.config.js            # ESLint 9 configuration
├── tsconfig.json               # Strict TypeScript compiler options
└── vite.config.ts              # Vite 5 bundle configuration
```

---

## ⚡ Quick Start & Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/Ch-saketh/Terminal-based-portfolio.git
cd Terminal-based-portfolio

# Install dependencies
npm install
```

### Development Server
```bash
# Start local development server with Vite HMR
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the displayed port) in your browser.

---

## 🧪 Testing & Quality Gates

The test suite covers CLI token parsing, virtual POSIX filesystem operations, command execution flows, keyboard accessibility, and component fault boundaries.

```bash
# Run all Vitest suites
npm test

# Run ESLint validation (enforces 0 warnings)
npm run lint

# Run TypeScript typecheck & production build
npm run build
```

---

## 🚀 Production Deployment (Vercel)

### Automatic Deployment via Git
1. Connect this repository to your [Vercel Dashboard](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build` (`tsc -b && vite build`).
4. Output Directory: `dist`.
5. Deploy.

The included [`vercel.json`](file:///Users/saketh/Desktop/Projects/portfolio-designs/terminal-basaed-portfolio/vercel.json) automatically enforces:
- Single-page application route rewrites (`/(.*) -> /index.html`)
- Strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`)
- Immutable caching for hashed assets in `/assets/*`

---

## 🔑 Environment Variables

Create a `.env` file in the root directory if customizing environment configurations:

```env
# Application metadata
VITE_APP_TITLE="SAKETH.OS — Developer Workstation"
VITE_APP_VERSION="2.4.0"
VITE_SITE_URL="https://saketh-chokkapu-portfolio.vercel.app"
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

## 🤝 Contribution & Code Conventions

1. **Strict TypeScript**: No `any` types; all domain structures must adhere to definitions in `src/types/`.
2. **Vanilla CSS Design Tokens**: Do not use ad-hoc styles; reuse tokens defined in `src/styles/tokens/`.
3. **Pure Function Kernel**: Keep CLI tokenizer, VFS operations, and command handlers free of React component couplings.
4. **All Tests Passing**: Every pull request must pass `npm test`, `npm run lint` (`--max-warnings=0`), and `npm run build`.

---

## 📄 License

MIT © Saketh Chokkapu
