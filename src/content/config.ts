export const systemConfig = {
  osName: 'SAKETH.OS',
  osVersion: '2.4.0-LTS',
  kernelVersion: 'POSIX-x86_64-WebAssembly',
  hostname: 'saketh-workstation',
  username: 'saketh',
  defaultPromptChar: '$',
  defaultTheme: 'emerald' as const,
  buildDate: '2026-09-08',
  asciiArt: `
  ┌─────────────────────────────────────────────────────────────┐
  │  SAKETH.OS [v2.4.0-LTS] — Interactive Developer Workstation │
  │  Type "help" or click any navigation tab to explore.       │
  └─────────────────────────────────────────────────────────────┘`,
  bootMessages: [
    'POSIX filesystem mounted at /home/saketh [OK]',
    'Ready for commands. Type "help", "about", or "projects".'
  ]
};
