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
  ██████╗  █████╗ ██╗  ██╗███████╗████████╗██╗  ██╗    ██████╗ ███████╗
  ██╔════╝ ██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝██║  ██║   ██╔═══██╗██╔════╝
  ███████╗ ███████║█████╔╝ █████╗     ██║   ███████║   ██║   ██║███████╗
  ╚════██║ ██╔══██║██╔═██╗ ██╔══╝     ██║   ██╔══██║   ██║   ██║╚════██║
  ███████║ ██║  ██║██║  ██╗███████╗   ██║   ██║  ██║██╗╚██████╔╝███████║
  ╚══════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝
`,
  bootMessages: [
    'Initializing SAKETH.OS Kernel v2.4.0-LTS...',
    'Loading virtual memory & POSIX filesystem [OK]',
    'Mounting /home/saketh/projects, /skills, /experience [OK]',
    'Initializing WebAudio procedural sound synthesizer [OK]',
    'Spawning interactive shell daemon (zsh) [OK]',
    'Type "help" or click suggestion chips to explore.'
  ]
};
