import { CommandDefinition, CommandContext } from '../../types/terminal';
import { NeofetchRenderer } from '../../components/terminal/renderers/NeofetchRenderer';
import { useSystemStore } from '../../state/useSystemStore';
import { useAchievementStore } from '../../state/useAchievementStore';
import { unlockManager } from '../discovery/UnlockManager';
import { secretCommandRegistry } from '../discovery/SecretCommandRegistry';
import { triggerConfetti } from '../../utils/confetti';
import { profileData } from '../../content/profile';
import { ShieldCheck, FileText, Github, Linkedin, Mail, CheckCircle2 } from 'lucide-react';

export const easterEggCommands: CommandDefinition[] = [
  {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo', 'specs'],
    description: 'Display system hardware specs, kernel telemetry, and theme info',
    usage: 'neofetch',
    category: 'easter-egg',
    execute: () => {
      unlockManager.unlock('EXPLORER');
      secretCommandRegistry.markDiscovered('neofetch');
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
      unlockManager.unlock('MATRIX_RAIN');
      secretCommandRegistry.markDiscovered('matrix');
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
    execute: (context: CommandContext) => {
      const subCommand = (context.args || []).join(' ').toLowerCase();

      if (subCommand === 'make-me-hireable' || subCommand === 'hire') {
        unlockManager.unlock('CLASSIFIED');
        useAchievementStore.getState().unlockAchievement('root_access');
        secretCommandRegistry.markDiscovered('sudo make-me-hireable');
        secretCommandRegistry.markDiscovered('sudo');

        return {
          type: 'custom',
          isError: false,
          component: (
            <div
              style={{
                background: 'rgba(0, 255, 136, 0.04)',
                border: '1px solid var(--color-primary-green, #00ff88)',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.15)',
                borderRadius: '6px',
                padding: '18px',
                fontFamily: 'var(--font-mono, monospace)',
                color: '#e6edf3',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxWidth: '780px'
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0, 255, 136, 0.25)',
                  paddingBottom: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--color-primary-green, #00ff88)" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-green, #00ff88)', letterSpacing: '0.05em' }}>
                    [CLASSIFIED: EXECUTIVE CANDIDATE EVALUATION MATRIX]
                  </span>
                </div>
                <div style={{ fontSize: '11px', background: 'rgba(0, 255, 136, 0.15)', color: '#00ff88', padding: '2px 8px', borderRadius: '3px', fontWeight: 600 }}>
                  ROOT PRIVILEGES ELEVATED
                </div>
              </div>

              {/* Candidate Overview Table */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  fontSize: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div><strong>Candidate:</strong> {profileData.name}</div>
                <div><strong>Current Focus:</strong> {profileData.headline}</div>
                <div><strong>Location:</strong> {profileData.location}</div>
                <div><strong>Core Stacks:</strong> Java, Python, Go, TypeScript</div>
              </div>

              {/* Verified Technical Competencies */}
              <div style={{ fontSize: '12px', color: '#adbac7', lineHeight: '1.6' }}>
                <div style={{ color: '#00f2fe', fontWeight: 600, marginBottom: '6px', fontSize: '11px', letterSpacing: '0.05em' }}>
                  ASSESSED PRODUCTION ARCHITECTURE STRENGTHS:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={13} color="#00ff88" />
                    <span><strong>High-Throughput Distributed Systems:</strong> 1.8B+ daily event processing pipeline with 99.995% reliability.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={13} color="#00ff88" />
                    <span><strong>Vector Retrieval &amp; AI:</strong> FastEmbed/CLIP + Qdrant hybrid RAG architecture with sub-50ms vector query latency.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={13} color="#00ff88" />
                    <span><strong>Relational Query Optimization:</strong> Hibernate fetch plan tuning, resolving N+1 cascades (150ms -&gt; 60ms, 60% speedup).</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={13} color="#00ff88" />
                    <span><strong>Hackathon Proven:</strong> 2nd Prize Amaravati Quantum Valley Hackathon (BB84 QKD) &amp; 2nd Prize National AI Hackathon.</span>
                  </div>
                </div>
              </div>

              {/* 4 Required Action Links: resume, github, linkedin, contact */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* 1. Resume */}
                <a
                  href="/saketh-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--color-primary-green, #00ff88)',
                    color: '#060a10',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <FileText size={13} />
                  <span>RESUME (PDF)</span>
                </a>

                {/* 2. GitHub */}
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#e6edf3',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Github size={13} />
                  <span>GITHUB REPOSITORIES</span>
                </a>

                {/* 3. LinkedIn */}
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid var(--color-primary-cyan, #00f2fe)',
                    color: 'var(--color-primary-cyan, #00f2fe)',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Linkedin size={13} />
                  <span>LINKEDIN PROFILE</span>
                </a>

                {/* 4. Contact */}
                <a
                  href={`mailto:${profileData.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 189, 46, 0.1)',
                    border: '1px solid #ffbd2e',
                    color: '#ffbd2e',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={13} />
                  <span>CONTACT EMAIL</span>
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
      unlockManager.unlock('SYSTEM_AUDITOR');
      secretCommandRegistry.markDiscovered('hack');
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
      unlockManager.unlock('KONAMI_CODE');
      secretCommandRegistry.markDiscovered('konami');
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
      secretCommandRegistry.markDiscovered('debug');
      const stats = useAchievementStore.getState().getStats();
      const secretsCount = secretCommandRegistry.getDiscoveredCount();
      return {
        type: 'info',
        text: `[DEBUG TELEMETRY]\n` +
          `- OS Version: SAKETH.OS 2.4.0\n` +
          `- Runtime: React 19 Concurrent / WebAssembly\n` +
          `- Achievements: ${stats.unlockedCount}/${stats.total} (${stats.percent}%) [${stats.rank}]\n` +
          `- Secret Commands Discovered: ${secretsCount}\n` +
          `- XP Accumulated: ${stats.earnedXp} / ${stats.totalXp} XP\n` +
          `- Audio Synthesis: Web Audio API Oscillator Nodes (Active)\n` +
          `- VFS Nodes: In-Memory POSIX Tree (Nominal)\n` +
          `- Telemetry: Client-Side Isolated (Zero External Tracking)`
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
      unlockManager.unlock('PHILOSOPHER');
      secretCommandRegistry.markDiscovered('fortune');
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

// Register all secrets into SecretCommandRegistry on load
easterEggCommands.forEach((cmd) => secretCommandRegistry.registerSecret(cmd));
