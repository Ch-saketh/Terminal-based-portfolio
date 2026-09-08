# SAKETH.OS — Developer Operating System & Terminal Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646cff.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Vitest-100%25_Passed-success.svg)](https://vitest.dev/)

An interactive, production-grade web-based developer workstation and terminal-driven portfolio experience for **Saketh Chokkapu**.

---

## 🖥️ System Architecture

SAKETH.OS decouples core POSIX OS & CLI business logic from React UI presentation using clean architecture:

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
│  │  POSIX-like Tree (/, /home/saketh, /projects, /skills, /bin)      │  │
│  │  Path Resolver (., .., ~, relative, absolute) & Symlink Support  │  │
│  └──────────────────┬───────────────────────────────────────────────┘  │
├─────────────────────┼──────────────────────────────────────────────────┤
│                     ▼                                                  │
│                   CONTENT & DATA DOMAIN (Single Source of Truth)       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Profile / Projects / Skills / Experience / Config Registry       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
saketh-os/
├── public/                 # Static assets, fonts, icons, resume PDF
├── src/
│   ├── app/                # Application bootstrap & OS AppShell
│   ├── core/               # Framework-agnostic kernel (CLI parser, VFS, WebAudio)
│   ├── state/              # Zustand domain state stores
│   ├── content/            # Typed portfolio single-source-of-truth data
│   ├── components/         # Modular React UI primitives, renderers, desktop shell
│   ├── hooks/              # Custom terminal & system hooks
│   ├── styles/             # Modular CSS design tokens, reset, CRT effects
│   ├── types/              # Strict TypeScript definitions
│   └── vite-env.d.ts
├── tests/                  # Automated Vitest unit & integration test suites
├── eslint.config.js        # ESLint 9 Flat Config
├── .prettierrc             # Prettier code formatting rules
├── tsconfig.json           # Strict TypeScript configuration
└── vite.config.ts          # Vite build & alias configuration
```

---

## ⚡ Quick Start & Development Setup

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

### Available Scripts
```bash
# Start local development server (with HMR)
npm run dev

# Run full TypeScript compiler and build production bundle
npm run build

# Preview production build locally
npm run preview

# Run automated Vitest test suite
npm test

# Run ESLint static analysis
npm run lint

# Format codebase with Prettier
npm run format
```

---

## 📐 Coding Conventions

1. **Strict Types**: Always write explicit interfaces in `src/types/`. Avoid `any`.
2. **Design Tokens**: Never use arbitrary inline styles or hardcoded hex colors. Use CSS variables defined in `src/styles/tokens/`.
3. **Pure Core Logic**: Keep `src/core/` (parser, VFS, registry) 100% free of React DOM dependencies for high testability.
4. **Separation of Concerns**: Use Zustand micro-stores for cross-cutting state and isolated component props for presentation.
