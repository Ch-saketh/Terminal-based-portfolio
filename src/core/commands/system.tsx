import { CommandDefinition } from '../../types/terminal';
import { HelpRenderer } from '../../components/terminal/renderers/HelpRenderer';
import { HistoryRenderer } from '../../components/terminal/renderers/HistoryRenderer';
import { useSystemStore } from '../../state/useSystemStore';

export const systemCommands: CommandDefinition[] = [
  {
    name: 'help',
    aliases: ['man', '?', 'commands'],
    description: 'Display available operating system commands and navigation syntax',
    usage: 'help',
    category: 'system',
    execute: () => ({
      type: 'custom',
      component: <HelpRenderer />
    })
  },
  {
    name: 'terminal',
    aliases: ['term', 'cli', 'console', 'shell', 'open-terminal'],
    description: 'Open the full interactive terminal command shell',
    usage: 'terminal',
    category: 'system',
    execute: (ctx) => {
      ctx.setActiveView?.('terminal');
      return {
        type: 'success',
        text: 'Interactive Terminal session active. Type any command (about, projects, skills, help). Type "home" or "exit" to return.'
      };
    }
  },
  {
    name: 'home',
    aliases: ['exit', 'gui', 'workstation'],
    description: 'Return to the developer workstation home view',
    usage: 'home',
    category: 'system',
    execute: (ctx) => {
      ctx.setActiveView?.('home');
      return {
        type: 'info',
        text: 'Returned to developer workstation.'
      };
    }
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear terminal viewport buffer',
    usage: 'clear',
    category: 'system',
    execute: (ctx) => {
      ctx.clearTerminal();
      return { type: 'system' };
    }
  },
  {
    name: 'theme',
    description: 'Switch workstation color theme (emerald, cyan, amber, purple)',
    usage: 'theme [emerald | cyan | amber | purple]',
    category: 'system',
    options: [
      { flag: 'emerald', description: 'Matrix Phosphor Green theme' },
      { flag: 'cyan', description: 'Cyberpunk Cyan theme' },
      { flag: 'amber', description: 'Vintage Amber CRT theme' },
      { flag: 'purple', description: 'Monokai Synthwave theme' }
    ],
    execute: (ctx) => {
      const requested = ctx.args[0]?.toLowerCase();
      if (!requested) {
        return {
          type: 'info',
          text: 'Available themes:\n  - emerald (Matrix Phosphor Green)\n  - cyan    (Cyber Cyberpunk Cyan)\n  - amber   (Vintage CRT Amber)\n  - purple  (Monokai Synthwave)\n\nUsage: theme <name>'
        };
      }

      if (['emerald', 'cyan', 'amber', 'purple'].includes(requested)) {
        ctx.setTheme(requested as any);
        return {
          type: 'success',
          text: `Color theme set to: ${requested.toUpperCase()}`
        };
      }

      return {
        type: 'error',
        text: `Unknown theme '${requested}'. Choose from: emerald, cyan, amber, purple`
      };
    },
    autocomplete: () => ['emerald', 'cyan', 'amber', 'purple']
  },
  {
    name: 'history',
    aliases: ['hist'],
    description: 'Display command execution history for the current session',
    usage: 'history',
    category: 'system',
    execute: (ctx) => ({
      type: 'custom',
      component: <HistoryRenderer history={ctx.history} />
    })
  },
  {
    name: 'sound',
    aliases: ['audio', 'mute'],
    description: 'Toggle procedural mechanical keypress & system audio synthesis',
    usage: 'sound [on | off | toggle]',
    category: 'system',
    execute: (ctx) => {
      ctx.toggleSound();
      const enabled = useSystemStore.getState().soundEnabled;
      return {
        type: 'info',
        text: `Sound synthesis: ${enabled ? 'ENABLED [ON]' : 'MUTED [OFF]'}`
      };
    }
  },
  {
    name: 'crt',
    aliases: ['scanlines'],
    description: 'Toggle CRT phosphor scanline shader and screen curvature overlay',
    usage: 'crt [toggle]',
    category: 'system',
    execute: (ctx) => {
      ctx.toggleCrt();
      const enabled = useSystemStore.getState().crtEnabled;
      return {
        type: 'info',
        text: `CRT Scanline Shader: ${enabled ? 'ENABLED [ON]' : 'DISABLED [OFF]'}`
      };
    }
  },
  {
    name: 'monitor',
    aliases: ['top', 'htop', 'telemetry'],
    description: 'Open live system resource monitor & telemetry window',
    usage: 'monitor',
    category: 'system',
    execute: (ctx) => {
      ctx.openWindow('systemMonitor');
      return {
        type: 'info',
        text: 'Spawning System Telemetry & Resource Monitor window...'
      };
    }
  },
  {
    name: 'design-system',
    aliases: ['showcase', 'ds', 'components'],
    description: 'Open SAKETH.OS Design System & UI Primitive Showcase',
    usage: 'design-system',
    category: 'system',
    execute: () => {
      useSystemStore.getState().toggleShowcase(true);
      return {
        type: 'success',
        text: 'Launching Design System Component Showcase overlay...'
      };
    }
  },
  {
    name: 'uptime',
    description: 'Show how long system has been running',
    usage: 'uptime',
    category: 'system',
    execute: () => {
      const secs = useSystemStore.getState().metrics.uptimeSeconds;
      const mins = Math.floor(secs / 60);
      return {
        type: 'text',
        text: `up ${mins} minutes, 1 user, load average: 0.14, 0.18, 0.12`
      };
    }
  },
  {
    name: 'date',
    description: 'Display current system date and UTC time',
    usage: 'date',
    category: 'system',
    execute: () => ({
      type: 'text',
      text: new Date().toUTCString()
    })
  },
  {
    name: 'echo',
    description: 'Print text arguments to terminal output',
    usage: 'echo <text>',
    category: 'system',
    execute: (ctx) => ({
      type: 'text',
      text: ctx.args.join(' ')
    })
  },
  {
    name: 'hi',
    aliases: ['hello', 'hey', 'greetings'],
    description: 'Say hello to Saketh and view quick-start developer guide',
    usage: 'hi',
    category: 'system',
    execute: () => ({
      type: 'info',
      text: `👋 Hello and welcome to SAKETH.OS!\n\n` +
        `I'm Saketh Chokkapu — Lead Systems Architect & Full-Stack Engineer.\n\n` +
        `Quick navigation commands to get started:\n` +
        `  • 'whoami'    — Developer identity & philosophy\n` +
        `  • 'projects'  — Flagship engineering projects (Weavly, CinePortal, PageMatch)\n` +
        `  • 'skills'    — Interactive technical stack telemetry matrix\n` +
        `  • 'git log'   — Career journey & milestone commits\n` +
        `  • 'help'      — Full command manual and CLI options`
    })
  }
];
