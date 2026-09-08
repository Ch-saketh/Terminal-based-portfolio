import { CommandDefinition } from '../../types/terminal';
import { NeofetchRenderer } from '../../components/terminal/renderers/NeofetchRenderer';
import { useSystemStore } from '../../state/useSystemStore';
import confetti from 'canvas-confetti';

export const easterEggCommands: CommandDefinition[] = [
  {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo'],
    description: 'Display system hardware specs, kernel telemetry, and theme info',
    usage: 'neofetch',
    category: 'easter-egg',
    execute: () => ({
      type: 'custom',
      component: <NeofetchRenderer />
    })
  },
  {
    name: 'matrix',
    description: 'Toggle digital rain canvas animation',
    usage: 'matrix',
    category: 'easter-egg',
    execute: () => {
      const active = useSystemStore.getState().matrixRainActive;
      useSystemStore.getState().setMatrixRain(!active);
      return {
        type: 'success',
        text: !active
          ? 'Entering Matrix digital simulation... (Run "matrix" again to exit)'
          : 'Exited Matrix simulation.'
      };
    }
  },
  {
    name: 'sudo',
    description: 'Execute command as root / superuser',
    usage: 'sudo <command>',
    category: 'easter-egg',
    permissions: 'root',
    execute: () => ({
      type: 'error',
      text: 'saketh is not in the sudoers file. This incident will be reported to /var/log/security.audit.'
    })
  },
  {
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
  },
  {
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
  }
];
