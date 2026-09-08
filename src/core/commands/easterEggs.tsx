import { CommandDefinition } from '../../types/terminal';
import { NeofetchRenderer } from '../../components/terminal/renderers/NeofetchRenderer';
import { useSystemStore } from '../../state/useSystemStore';
import { useAchievementStore } from '../../state/useAchievementStore';
import { triggerConfetti } from '../../utils/confetti';

export const easterEggCommands: CommandDefinition[] = [
  {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo', 'specs'],
    description: 'Display system hardware specs, kernel telemetry, and theme info',
    usage: 'neofetch',
    category: 'easter-egg',
    execute: () => {
      useAchievementStore.getState().unlockAchievement('explorer');
      return {
        type: 'custom',
        component: <NeofetchRenderer />
      };
    }
  },
  {
    name: 'matrix',
    description: 'Toggle digital rain canvas animation',
    usage: 'matrix',
    category: 'easter-egg',
    execute: () => {
      const active = useSystemStore.getState().matrixRainActive;
      useSystemStore.getState().setMatrixRain(!active);
      useAchievementStore.getState().unlockAchievement('matrix_rain');
      return {
        type: 'success',
        text: !active
          ? 'Entering Matrix digital phosphor stream... (Press ESC or run "matrix" again to exit)'
          : 'Exited Matrix simulation.'
      };
    }
  },
  {
    name: 'sudo',
    description: 'Execute command as root / superuser (Try: sudo make-me-hireable)',
    usage: 'sudo <command>',
    category: 'easter-egg',
    permissions: 'root',
    execute: (ctx) => {
      const subCommand = ctx.args.join(' ').toLowerCase();

      if (subCommand === 'make-me-hireable' || subCommand === 'hire') {
        useAchievementStore.getState().unlockAchievement('root_access');
        return {
          type: 'custom',
          component: (
            <div
              style={{
                background: 'rgba(0, 255, 136, 0.05)',
                border: '1px solid var(--color-primary-green, #00ff88)',
                boxShadow: '0 0 16px rgba(0, 255, 136, 0.15)',
                borderRadius: '5px',
                padding: '16px',
                fontFamily: 'var(--font-mono, monospace)',
                color: '#e6edf3',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 255, 136, 0.2)', paddingBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-green, #00ff88)' }}>
                  [EXECUTIVE BRIEFING: VERIFIED CANDIDATE PROFILE]
                </div>
                <div style={{ fontSize: '11px', background: 'rgba(0, 255, 136, 0.15)', color: '#00ff88', padding: '2px 6px', borderRadius: '3px' }}>
                  PRIVILEGE: ROOT
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '12px' }}>
                <div><strong>Candidate:</strong> Saketh Chokkapu</div>
                <div><strong>Role:</strong> Lead Systems Architect / Full-Stack</div>
                <div><strong>Primary Stack:</strong> Java/Spring, Python/FastAPI, Go, React, Qdrant</div>
                <div><strong>Location:</strong> Open to Remote &amp; Worldwide</div>
              </div>

              <div style={{ fontSize: '12px', color: '#adbac7', lineHeight: '1.5' }}>
                <strong>Key Production Highlights:</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px' }}>
                  <li>Scaled event streaming pipelines to 1.8B+ daily transactions with 99.995% delivery reliability.</li>
                  <li>Architected multi-modal fashion recommendation engine (Weavly) with sub-50ms vector search across 100k+ items.</li>
                  <li>1st Place Winner at Quantum Valley AI Innovation Hackathon (36-hour vision reasoning agent).</li>
                  <li>Deep mastery across high-concurrency runtimes, distributed caching, vector databases, and resilient APIs.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
                <a
                  href="mailto:chokkapusaketh@gmail.com"
                  style={{
                    background: 'var(--color-primary-green, #00ff88)',
                    color: '#0a0e17',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Contact: chokkapusaketh@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid var(--color-primary-cyan, #00f2fe)',
                    color: 'var(--color-primary-cyan, #00f2fe)',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          )
        };
      }

      return {
        type: 'warning',
        text: `[sudo] user saketh verified. Try 'sudo make-me-hireable' for executive candidate summary.`
      };
    }
  },
  {
    name: 'hack',
    description: 'Execute automated AST security scan & vulnerability audit',
    usage: 'hack',
    category: 'easter-egg',
    execute: () => {
      useAchievementStore.getState().unlockAchievement('system_auditor');
      return {
        type: 'info',
        text: `[SYS.SECURITY_AUDIT: SAKETH.OS]\n` +
          `[OK] Scanning port 80/443 (TLS 1.3 / Strict-Transport-Security) ... SECURE\n` +
          `[OK] Scanning port 6333 (Qdrant Vector Engine) ................. RESTRICTED\n` +
          `[OK] Scanning port 5432 (PostgreSQL Connection Pool) .......... ISOLATED\n` +
          `[OK] Memory safety audit ...................................... ZERO VULNERABILITIES\n` +
          `Result: System hardened. Zero-day vulnerability audit PASSED.`
      };
    }
  },
  {
    name: 'konami',
    description: 'Trigger retro gamer cheat sequence',
    usage: 'konami',
    category: 'easter-egg',
    execute: () => {
      useAchievementStore.getState().unlockAchievement('konami_code');
      triggerConfetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      return {
        type: 'success',
        text: `🎮 30 LIVES GRANTED! Konami code executed. Unlocked secret achievement [KONAMI_CODE]!`
      };
    }
  },
  {
    name: 'debug',
    description: 'Print runtime diagnostics and store memory allocation',
    usage: 'debug',
    category: 'system',
    execute: () => {
      const stats = useAchievementStore.getState().getStats();
      return {
        type: 'info',
        text: `[DEBUG TELEMETRY]\n` +
          `- OS Version: SAKETH.OS 2.4.0\n` +
          `- Runtime: React 18 Concurrent / WebAssembly\n` +
          `- Achievements: ${stats.unlockedCount}/${stats.total} (${stats.percent}%) [${stats.rank}]\n` +
          `- XP Accumulated: ${stats.earnedXp} / ${stats.totalXp} XP\n` +
          `- Audio Synthesis: Web Audio API Oscillator Nodes (Active)\n` +
          `- VFS Nodes: In-Memory POSIX Tree (Nominal)`
      };
    }
  },
  {
    name: 'fortune',
    aliases: ['quote'],
    description: 'Print random engineering philosophy or wisdom',
    usage: 'fortune',
    category: 'easter-egg',
    execute: () => {
      useAchievementStore.getState().unlockAchievement('philosopher');
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
      triggerConfetti({
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
