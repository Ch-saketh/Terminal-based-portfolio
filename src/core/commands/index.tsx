import { commandRegistry } from '../cli/registry';
import { CommandDefinition } from '../../types/terminal';
import { vfsInstance } from '../vfs/vfs';
import { profileData } from '../../content/profile';
import { HelpRenderer } from '../../components/terminal/renderers/HelpRenderer';
import { WhoamiRenderer } from '../../components/terminal/renderers/WhoamiRenderer';
import { ProjectsRenderer } from '../../components/terminal/renderers/ProjectsRenderer';
import { SkillsRenderer } from '../../components/terminal/renderers/SkillsRenderer';
import { ExperienceRenderer } from '../../components/terminal/renderers/ExperienceRenderer';
import { NeofetchRenderer } from '../../components/terminal/renderers/NeofetchRenderer';
import { ContactRenderer } from '../../components/terminal/renderers/ContactRenderer';
import { useSystemStore } from '../../state/useSystemStore';
import confetti from 'canvas-confetti';

export function registerAllCommands() {
  // 1. HELP COMMAND
  const helpCmd: CommandDefinition = {
    name: 'help',
    aliases: ['man', '?', 'commands'],
    description: 'Display available operating system commands and navigation syntax',
    usage: 'help',
    category: 'system',
    execute: () => ({
      type: 'custom',
      component: <HelpRenderer />
    })
  };

  // 2. CLEAR COMMAND
  const clearCmd: CommandDefinition = {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear terminal viewport buffer',
    usage: 'clear',
    category: 'system',
    execute: (ctx) => {
      ctx.clearTerminal();
      return { type: 'system' };
    }
  };

  // 3. WHOAMI COMMAND
  const whoamiCmd: CommandDefinition = {
    name: 'whoami',
    aliases: ['bio', 'about', 'profile'],
    description: 'Display developer profile, background, and summary statistics',
    usage: 'whoami',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <WhoamiRenderer />
    })
  };

  // 4. PROJECTS COMMAND
  const projectsCmd: CommandDefinition = {
    name: 'projects',
    aliases: ['work', 'showcase'],
    description: 'Explore engineering projects, architecture decisions, and metrics',
    usage: 'projects [--featured] [--tag=ai|rust|go] [slug]',
    category: 'portfolio',
    options: [
      { flag: '--featured', description: 'Show only featured flagship projects' },
      { flag: '--tag', description: 'Filter projects by tech stack (e.g. --tag=rust)' }
    ],
    execute: (ctx) => {
      const slugArg = ctx.args[0];
      const featured = !!ctx.flags.featured;
      const tag = typeof ctx.flags.tag === 'string' ? ctx.flags.tag : undefined;

      return {
        type: 'custom',
        component: (
          <ProjectsRenderer
            filterSlug={slugArg}
            featuredOnly={featured}
            tagFilter={tag}
          />
        )
      };
    }
  };

  // 5. SKILLS COMMAND
  const skillsCmd: CommandDefinition = {
    name: 'skills',
    aliases: ['stack', 'tech', 'competencies'],
    description: 'Display categorized technical competencies, tools, and experience levels',
    usage: 'skills',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <SkillsRenderer />
    })
  };

  // 6. EXPERIENCE COMMAND
  const experienceCmd: CommandDefinition = {
    name: 'experience',
    aliases: ['career', 'jobs', 'history'],
    description: 'View career history, achievements, and impact metrics',
    usage: 'experience',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <ExperienceRenderer />
    })
  };

  // 7. CONTACT COMMAND
  const contactCmd: CommandDefinition = {
    name: 'contact',
    aliases: ['email', 'reach', 'message'],
    description: 'Open communication channels and interactive message relay',
    usage: 'contact',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <ContactRenderer />
    })
  };

  // 8. NEOFETCH COMMAND
  const neofetchCmd: CommandDefinition = {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo'],
    description: 'Display system hardware specs, kernel telemetry, and theme info',
    usage: 'neofetch',
    category: 'system',
    execute: () => ({
      type: 'custom',
      component: <NeofetchRenderer />
    })
  };

  // 9. RESUME COMMAND
  const resumeCmd: CommandDefinition = {
    name: 'resume',
    aliases: ['cv'],
    description: 'Download or open official software engineer resume (PDF)',
    usage: 'resume',
    category: 'portfolio',
    execute: () => {
      window.open('/saketh-resume.pdf', '_blank');
      return {
        type: 'success',
        text: 'Opening resume payload [/saketh-resume.pdf] in background tab...'
      };
    }
  };

  // 10. GITHUB COMMAND
  const githubCmd: CommandDefinition = {
    name: 'github',
    aliases: ['gh'],
    description: 'Open GitHub profile or display repository stats',
    usage: 'github',
    category: 'portfolio',
    execute: () => {
      window.open(profileData.github, '_blank');
      return {
        type: 'info',
        text: `Navigating to ${profileData.github}`
      };
    }
  };

  // 11. LINKEDIN COMMAND
  const linkedinCmd: CommandDefinition = {
    name: 'linkedin',
    description: 'Open LinkedIn profile',
    usage: 'linkedin',
    category: 'portfolio',
    execute: () => {
      window.open(profileData.linkedin, '_blank');
      return {
        type: 'info',
        text: `Navigating to ${profileData.linkedin}`
      };
    }
  };

  // 12. PWD COMMAND
  const pwdCmd: CommandDefinition = {
    name: 'pwd',
    description: 'Print current working directory',
    usage: 'pwd',
    category: 'navigation',
    execute: (ctx) => ({
      type: 'text',
      text: ctx.cwd
    })
  };

  // 13. LS COMMAND
  const lsCmd: CommandDefinition = {
    name: 'ls',
    aliases: ['ll', 'dir'],
    description: 'List directory contents in virtual POSIX filesystem',
    usage: 'ls [-la] [path]',
    category: 'navigation',
    execute: (ctx) => {
      const targetPath = ctx.args[0] || '.';
      const isDetailed = ctx.flags.l || ctx.flags.la || ctx.flags.al || false;
      const showAll = ctx.flags.a || ctx.flags.la || ctx.flags.al || false;

      const res = vfsInstance.listDirectory(targetPath, ctx.cwd);
      if (!res.success || !res.nodes) {
        return { type: 'error', text: res.error || 'Failed to list directory.' };
      }

      let nodes = res.nodes;
      if (!showAll) {
        nodes = nodes.filter((n) => !n.name.startsWith('.'));
      }

      if (nodes.length === 0) {
        return { type: 'text', text: '(empty directory)' };
      }

      if (isDetailed) {
        const lines = nodes.map((n) => {
          const perm = n.permissions || (n.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
          const size = (n as any).sizeBytes ? `${(n as any).sizeBytes}B`.padStart(6) : '  4.0K';
          const name = n.type === 'directory' ? `\x1b[34m${n.name}/\x1b[0m` : n.name;
          return `${perm}  saketh  staff  ${size}  Sep 08 19:42  ${name}`;
        });
        return { type: 'text', text: lines.join('\n') };
      }

      const formatted = nodes
        .map((n) => (n.type === 'directory' ? `${n.name}/` : n.name))
        .join('    ');

      return { type: 'text', text: formatted };
    }
  };

  // 14. CD COMMAND
  const cdCmd: CommandDefinition = {
    name: 'cd',
    description: 'Change current working directory in virtual filesystem',
    usage: 'cd <path>',
    category: 'navigation',
    execute: (ctx) => {
      const target = ctx.args[0] || '~';
      const res = ctx.navigateVfs(target);
      if (!res.success) {
        return { type: 'error', text: res.error };
      }
      return { type: 'system' };
    }
  };

  // 15. CAT COMMAND
  const catCmd: CommandDefinition = {
    name: 'cat',
    description: 'Concatenate and print file contents to terminal buffer',
    usage: 'cat <file-path>',
    category: 'navigation',
    execute: (ctx) => {
      if (ctx.args.length === 0) {
        return { type: 'error', text: 'cat: missing file operand. Usage: cat <path>' };
      }
      const target = ctx.args[0];
      const res = vfsInstance.readFile(target, ctx.cwd);
      if (!res.success || res.content === undefined) {
        return { type: 'error', text: res.error || 'Failed to read file.' };
      }
      return { type: 'text', text: res.content };
    }
  };

  // 16. TREE COMMAND
  const treeCmd: CommandDefinition = {
    name: 'tree',
    description: 'Render visual directory hierarchy tree',
    usage: 'tree [path]',
    category: 'navigation',
    execute: (ctx) => {
      const target = ctx.args[0] || '.';
      const output = vfsInstance.generateTree(target, ctx.cwd);
      if (!output) {
        return { type: 'error', text: `tree: '${target}': No such directory` };
      }
      return { type: 'text', text: output };
    }
  };

  // 17. THEME COMMAND
  const themeCmd: CommandDefinition = {
    name: 'theme',
    description: 'Switch workstation color theme (emerald, cyan, amber, purple)',
    usage: 'theme [emerald | cyan | amber | purple]',
    category: 'system',
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
    }
  };

  // 18. SOUND COMMAND
  const soundCmd: CommandDefinition = {
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
  };

  // 19. CRT COMMAND
  const crtCmd: CommandDefinition = {
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
  };

  // 20. MONITOR COMMAND
  const monitorCmd: CommandDefinition = {
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
  };

  // 21. MATRIX COMMAND (EASTER EGG)
  const matrixCmd: CommandDefinition = {
    name: 'matrix',
    description: 'Toggle digital rain canvas animation',
    usage: 'matrix',
    category: 'easter-egg',
    execute: () => {
      const active = useSystemStore.getState().matrixRainActive;
      useSystemStore.getState().setMatrixRain(!active);
      return {
        type: 'success',
        text: !active ? 'Entering Matrix digital simulation... (Run "matrix" again to exit)' : 'Exited Matrix simulation.'
      };
    }
  };

  // 22. SUDO COMMAND (EASTER EGG)
  const sudoCmd: CommandDefinition = {
    name: 'sudo',
    description: 'Execute command as root / superuser',
    usage: 'sudo <command>',
    category: 'easter-egg',
    execute: () => ({
      type: 'error',
      text: 'saketh is not in the sudoers file. This incident will be reported to /var/log/security.audit.'
    })
  };

  // 23. FORTUNE COMMAND (EASTER EGG)
  const fortuneCmd: CommandDefinition = {
    name: 'fortune',
    aliases: ['quote'],
    description: 'Print random engineering philosophy or wisdom',
    usage: 'fortune',
    category: 'easter-egg',
    execute: () => {
      const quotes = [
        '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
        '"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
        '"Premature optimization is the root of all evil." — Donald Knuth',
        '"Make it work, make it right, make it fast." — Kent Beck',
        '"The function of good software is to make the complex appear simple." — Grady Booch',
        '"Distributed systems are all about managing trade-offs between consistency, availability, and latency."'
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      return {
        type: 'info',
        text: randomQuote
      };
    }
  };

  // 24. CELEBRATE / CONFETTI COMMAND (EASTER EGG)
  const celebrateCmd: CommandDefinition = {
    name: 'celebrate',
    description: 'Launch developer celebration particle emitter',
    usage: 'celebrate',
    category: 'easter-egg',
    execute: () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      return {
        type: 'success',
        text: '🎉 Particle emitter triggered!'
      };
    }
  };

  // 25. UPTIME COMMAND
  const uptimeCmd: CommandDefinition = {
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
  };

  // 26. DATE COMMAND
  const dateCmd: CommandDefinition = {
    name: 'date',
    description: 'Display current system date and UTC time',
    usage: 'date',
    category: 'system',
    execute: () => ({
      type: 'text',
      text: new Date().toUTCString()
    })
  };

  // 27. ECHO COMMAND
  const echoCmd: CommandDefinition = {
    name: 'echo',
    description: 'Print text arguments to terminal output',
    usage: 'echo <text>',
    category: 'system',
    execute: (ctx) => ({
      type: 'text',
      text: ctx.args.join(' ')
    })
  };

  // Register all commands
  const all = [
    helpCmd,
    clearCmd,
    whoamiCmd,
    projectsCmd,
    skillsCmd,
    experienceCmd,
    contactCmd,
    neofetchCmd,
    resumeCmd,
    githubCmd,
    linkedinCmd,
    pwdCmd,
    lsCmd,
    cdCmd,
    catCmd,
    treeCmd,
    themeCmd,
    soundCmd,
    crtCmd,
    monitorCmd,
    matrixCmd,
    sudoCmd,
    fortuneCmd,
    celebrateCmd,
    uptimeCmd,
    dateCmd,
    echoCmd
  ];

  all.forEach((c) => commandRegistry.register(c));
}
