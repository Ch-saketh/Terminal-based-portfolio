/**
 * @file WorkstationScene.tsx
 * High-Fidelity SAKETH.OS Developer Workstation Scene.
 *
 * Recreates the master reference visual target as a pure, procedural,
 * resolution-independent SVG digital reconstruction with:
 * - Central Architecture Blueprint Board ("RECOMMENDATION SYSTEM ARCHITECTURE")
 * - Sticky notes ("EXECUTE IN SILENCE" & "TODAY'S FOCUS" checklist)
 * - Night window with city skyline, starry sky, and dotted crescent moon
 * - Wall motivational quote ("Hard work beats talent...")
 * - Warm desk lamp casting amber spotlight cone onto books
 * - Stack of technical books (System Design, Machine Learning, Clean Code, Build Things)
 * - Coffee mug with illuminated </> logo and steam
 * - Ultra-wide curved monitor with dual-pane syntax-highlighted code
 * - Secondary laptop on stand with "A BETTER VERSION EVERYDAY."
 * - Seated developer in ergonomic task chair with curly hair & monitor rim-lighting
 */

import React from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { DeveloperReconstructionCanvas } from './DeveloperReconstructionCanvas';
import styles from './WorkstationScene.module.css';

export const WorkstationScene: React.FC = () => {
  const history = useTerminalStore((s) => s.history);
  const isExecuting = useTerminalStore((s) => s.isExecuting);

  // Determine active reactive content for monitor based on last executed command
  const lastCmd = (history[history.length - 1] || '').trim().toLowerCase();
  let monitorMode: 'default' | 'projects' | 'skills' | 'experience' = 'default';
  if (lastCmd.startsWith('project')) {
    monitorMode = 'projects';
  } else if (lastCmd.startsWith('skill')) {
    monitorMode = 'skills';
  } else if (lastCmd.startsWith('exp') || lastCmd.startsWith('git')) {
    monitorMode = 'experience';
  }

  return (
    <div className={styles.sceneContainer} aria-label="Developer Workstation Scene">
      <svg
        viewBox="0 0 1200 700"
        className={styles.workstationSvg}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Developer at workstation digital reconstruction"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="wallSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#04070c" />
            <stop offset="60%" stopColor="#070e16" />
            <stop offset="100%" stopColor="#09131d" />
          </linearGradient>

          <linearGradient id="boardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#061510" />
            <stop offset="100%" stopColor="#030c08" />
          </linearGradient>

          <linearGradient id="lampConeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 195, 60, 0.35)" />
            <stop offset="40%" stopColor="rgba(255, 185, 40, 0.16)" />
            <stop offset="80%" stopColor="rgba(255, 180, 40, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 180, 40, 0.0)" />
          </linearGradient>

          <linearGradient id="monitorScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#03090e" />
            <stop offset="100%" stopColor="#02060a" />
          </linearGradient>

          <linearGradient id="deskEdgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0, 255, 136, 0.1)" />
            <stop offset="30%" stopColor="rgba(0, 255, 136, 0.5)" />
            <stop offset="70%" stopColor="rgba(0, 242, 254, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0.1)" />
          </linearGradient>

          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f1519" />
            <stop offset="50%" stopColor="#090d11" />
            <stop offset="100%" stopColor="#05070a" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrowhead marker for architecture board */}
          <marker
            id="archArrow"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#00ff88" opacity="0.8" />
          </marker>
        </defs>

        {/* ── 1. WALL BACKDROP ── */}
        <rect x="0" y="0" width="1200" height="700" fill="url(#wallSkyGrad)" />

        {/* Subtle dot matrix grid across wall */}
        <g opacity="0.08">
          {Array.from({ length: 24 }).map((_, r) =>
            Array.from({ length: 40 }).map((__, c) => (
              <circle key={`${r}-${c}`} cx={c * 30 + 15} cy={r * 25 + 10} r="0.8" fill="#00ff88" />
            ))
          )}
        </g>

        {/* ── 2. NIGHT WINDOW & CITY SKYLINE (RIGHT SIDE) ── */}
        <g id="night-window">
          {/* Window Frame Outer */}
          <rect x="870" y="20" width="310" height="460" fill="#020509" stroke="#16222f" strokeWidth="3" rx="2" />
          {/* Inner sky glow */}
          <rect x="875" y="25" width="300" height="450" fill="url(#wallSkyGrad)" />

          {/* Stars & Binary Constellations */}
          <g opacity="0.6">
            <circle cx="895" cy="50" r="0.9" fill="#ffffff" />
            <circle cx="940" cy="75" r="1.1" fill="#00f2fe" />
            <circle cx="1020" cy="45" r="0.8" fill="#ffffff" />
            <circle cx="1080" cy="65" r="1.2" fill="#00ff88" />
            <circle cx="1140" cy="40" r="0.7" fill="#ffffff" />
            <circle cx="910" cy="120" r="0.9" fill="#ffffff" />
            <circle cx="1000" cy="110" r="0.8" fill="#00f2fe" />
            <circle cx="1120" cy="95" r="1.0" fill="#ffffff" />
            <text x="965" y="60" fill="#00f2fe" fontSize="7" fontFamily="monospace" opacity="0.4">01</text>
            <text x="1050" y="80" fill="#00ff88" fontSize="7" fontFamily="monospace" opacity="0.4">10</text>
            <text x="1100" y="125" fill="#00f2fe" fontSize="6" fontFamily="monospace" opacity="0.3">1</text>
          </g>

          {/* Crescent Moon (Dotted Stippled Matrix) */}
          <g transform="translate(1040, 75)" opacity="0.85">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#00f2fe" strokeWidth="1" strokeDasharray="2 3" />
            <path
              d="M 20 2 A 18 18 0 0 1 20 38 A 15 15 0 0 0 20 2 Z"
              fill="#00f2fe"
              opacity="0.3"
            />
            {/* Moon stippling */}
            <circle cx="26" cy="12" r="1.2" fill="#ffffff" />
            <circle cx="28" cy="18" r="1.5" fill="#ffffff" />
            <circle cx="29" cy="24" r="1.3" fill="#ffffff" />
            <circle cx="25" cy="30" r="1.0" fill="#ffffff" />
          </g>

          {/* Skyscraper Silhouettes */}
          <g id="skyscrapers">
            {/* Tower 1 */}
            <rect x="885" y="160" width="45" height="315" fill="#081018" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={`w1-${i}`}
                x="893"
                y={180 + i * 22}
                width="28"
                height="6"
                className={i % 3 === 0 ? styles.cityLightSlow : i % 2 === 0 ? styles.cityLightMed : styles.cityLightFast}
                fill={i % 3 === 0 ? 'rgba(0, 242, 254, 0.45)' : i % 2 === 0 ? 'rgba(0, 255, 136, 0.35)' : 'rgba(255, 255, 255, 0.25)'}
                rx="0.5"
              />
            ))}

            {/* Tower 2 (Center tall) */}
            <rect x="940" y="90" width="55" height="385" fill="#050a10" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="0.8" />
            {/* Spire antenna */}
            <line x1="967" y1="40" x2="967" y2="90" stroke="rgba(0, 255, 136, 0.5)" strokeWidth="1.2" />
            <circle cx="967" cy="40" r="2" fill="#ff5f56" className={styles.antennaBeacon} />
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={`w2-${i}`}>
                <rect
                  x="948"
                  y={110 + i * 20}
                  width="16"
                  height="5"
                  className={i % 2 === 0 ? styles.cityLightMed : styles.cityLightFast}
                  fill={i % 4 === 0 ? 'rgba(0, 255, 136, 0.45)' : 'rgba(0, 242, 254, 0.25)'}
                />
                <rect
                  x="970"
                  y={110 + i * 20}
                  width="16"
                  height="5"
                  className={i % 3 === 0 ? styles.cityLightSlow : styles.cityLightMed}
                  fill={i % 3 === 0 ? 'rgba(255, 195, 60, 0.4)' : 'rgba(0, 255, 136, 0.3)'}
                />
              </g>
            ))}

            {/* Tower 3 */}
            <rect x="1005" y="140" width="50" height="335" fill="#081018" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" />
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={`w3-${i}`}
                x="1013"
                y={160 + i * 20}
                width="34"
                height="5"
                className={i % 2 === 0 ? styles.cityLightFast : styles.cityLightSlow}
                fill={i % 3 === 1 ? 'rgba(0, 242, 254, 0.4)' : 'rgba(0, 255, 136, 0.2)'}
              />
            ))}

            {/* Tower 4 (Right) */}
            <rect x="1065" y="190" width="60" height="285" fill="#050c14" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="0.8" />
            {Array.from({ length: 11 }).map((_, i) => (
              <g key={`w4-${i}`}>
                <rect
                  x="1073"
                  y={210 + i * 22}
                  width="18"
                  height="6"
                  className={styles.cityLightMed}
                  fill={i % 2 === 0 ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 242, 254, 0.2)'}
                />
                <rect
                  x="1098"
                  y={210 + i * 22}
                  width="18"
                  height="6"
                  className={styles.cityLightSlow}
                  fill={i % 3 === 0 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 255, 136, 0.25)'}
                />
              </g>
            ))}

            {/* Tower 5 (Far Right) */}
            <rect x="1135" y="230" width="40" height="245" fill="#04090f" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="0.8" />
          </g>

          {/* Window Slender Mullions (Panes) */}
          <line x1="875" y1="180" x2="1175" y2="180" stroke="#16222f" strokeWidth="2" opacity="0.8" />
          <line x1="875" y1="320" x2="1175" y2="320" stroke="#16222f" strokeWidth="2" opacity="0.8" />
          <line x1="975" y1="25" x2="975" y2="475" stroke="#16222f" strokeWidth="2" opacity="0.8" />
          <line x1="1075" y1="25" x2="1075" y2="475" stroke="#16222f" strokeWidth="2" opacity="0.8" />
        </g>

        {/* ── 3. TOP WALL SHELF & PLANT (LEFT) ── */}
        <g id="wall-shelf">
          {/* Shelf wood bar */}
          <rect x="300" y="165" width="85" height="5" fill="#131c26" stroke="#00ff88" strokeWidth="0.6" opacity="0.7" />
          {/* Small potted succulent on shelf */}
          <path d="M 330 165 L 348 165 L 345 152 L 333 152 Z" fill="#0d1815" stroke="#00ff88" strokeWidth="0.8" />
          <ellipse cx="339" cy="147" rx="9" ry="6" fill="#00ff88" opacity="0.4" />
          <ellipse cx="334" cy="144" rx="7" ry="5" fill="#00ff88" opacity="0.6" />
          <ellipse cx="344" cy="144" rx="7" ry="5" fill="#00ff88" opacity="0.6" />
          <circle cx="339" cy="140" r="4" fill="#00ff88" opacity="0.8" />
        </g>

        {/* ── 4. RECOMMENDATION SYSTEM ARCHITECTURE BLUEPRINT BOARD ── */}
        <g id="architecture-board" transform="translate(390, 45)">
          {/* Board Backdrop */}
          <rect
            x="0"
            y="0"
            width="345"
            height="210"
            fill="url(#boardGrad)"
            stroke="#00ff88"
            strokeWidth="1.2"
            rx="3"
            filter="url(#subtleGlow)"
          />
          {/* Inner border line */}
          <rect x="4" y="4" width="337" height="202" fill="none" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="0.6" />

          {/* Board Title */}
          <text
            x="172"
            y="24"
            textAnchor="middle"
            fill="#00ff88"
            fontSize="9"
            fontWeight="bold"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
            filter="url(#subtleGlow)"
          >
            RECOMMENDATION SYSTEM ARCHITECTURE
          </text>
          <line x1="25" y1="30" x2="320" y2="30" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.6" />

          {/* Box 1: User History (Top Left) */}
          <rect x="80" y="45" width="70" height="30" fill="#091b15" stroke="#00ff88" strokeWidth="0.8" rx="2" />
          <text x="115" y="63" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="'JetBrains Mono', monospace">User History</text>

          {/* Box 2: Feature Store (Top Right) */}
          <rect x="195" y="45" width="75" height="30" fill="#091b15" stroke="#00ff88" strokeWidth="0.8" rx="2" />
          <text x="232" y="63" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="'JetBrains Mono', monospace">Feature Store</text>

          {/* Box 3: User (Middle Far Left) */}
          <rect x="15" y="105" width="45" height="28" fill="#071510" stroke="#00f2fe" strokeWidth="0.8" rx="2" />
          <text x="37" y="122" textAnchor="middle" fill="#00f2fe" fontSize="8" fontFamily="'JetBrains Mono', monospace">User</text>

          {/* Box 4: API Gateway (Middle Center-Left) */}
          <rect x="80" y="102" width="70" height="34" fill="#091e17" stroke="#00ff88" strokeWidth="1" rx="2" />
          <text x="115" y="122" textAnchor="middle" fill="#00ff88" fontSize="8" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">API Gateway</text>

          {/* Box 5: Candidate Generation (Middle Center-Right) */}
          <rect x="180" y="102" width="105" height="34" fill="#091e17" stroke="#00ff88" strokeWidth="1" rx="2" />
          <text x="232" y="117" textAnchor="middle" fill="#00ff88" fontSize="8" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">Candidate</text>
          <text x="232" y="128" textAnchor="middle" fill="#00ff88" fontSize="8" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">Generation</text>

          {/* Box 6: Item Metadata (Bottom Left) */}
          <rect x="80" y="160" width="70" height="30" fill="#091b15" stroke="#00ff88" strokeWidth="0.8" rx="2" />
          <text x="115" y="178" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="'JetBrains Mono', monospace">Item Metadata</text>

          {/* Box 7: Ranking Service (Bottom Right) */}
          <rect x="195" y="160" width="75" height="30" fill="#091b15" stroke="#00ff88" strokeWidth="0.8" rx="2" />
          <text x="232" y="178" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="'JetBrains Mono', monospace">Ranking Service</text>

          {/* Connector Arrows */}
          {/* User -> API Gateway */}
          <line x1="60" y1="119" x2="78" y2="119" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
          {/* API Gateway -> Candidate Generation */}
          <line x1="150" y1="119" x2="178" y2="119" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
          {/* User History -> API Gateway */}
          <line x1="115" y1="75" x2="115" y2="100" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
          {/* Feature Store -> Candidate Generation */}
          <line x1="232" y1="75" x2="232" y2="100" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
          {/* Item Metadata -> Ranking Service */}
          <line x1="150" y1="175" x2="192" y2="175" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
          {/* Candidate Gen -> Ranking Service */}
          <line x1="232" y1="136" x2="232" y2="158" stroke="#00ff88" strokeWidth="1.2" markerEnd="url(#archArrow)" />
        </g>

        {/* ── 5. LEFT STICKY NOTE: "EXECUTE IN SILENCE..." ── */}
        <g id="sticky-execute" transform="translate(305, 235)">
          {/* Shadow */}
          <rect x="2" y="2" width="78" height="78" fill="rgba(0,0,0,0.5)" rx="2" />
          {/* Note body */}
          <rect x="0" y="0" width="78" height="78" fill="#061610" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="0.8" rx="2" />
          {/* Tape strip */}
          <rect x="26" y="-5" width="26" height="8" fill="rgba(255, 195, 60, 0.4)" rx="1" />
          <text x="39" y="18" textAnchor="middle" fill="#00ff88" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.04em">EXECUTE</text>
          <text x="39" y="32" textAnchor="middle" fill="#00ff88" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.04em">IN SILENCE</text>
          <text x="39" y="48" textAnchor="middle" fill="#adbac7" fontSize="7" fontFamily="'JetBrains Mono', monospace">LET SUCCESS</text>
          <text x="39" y="62" textAnchor="middle" fill="#adbac7" fontSize="7" fontFamily="'JetBrains Mono', monospace">BE THE NOISE.</text>
        </g>

        {/* ── 6. RIGHT STICKY NOTE: "TODAY'S FOCUS" ── */}
        <g id="sticky-focus" transform="translate(745, 55)">
          {/* Note Card */}
          <rect x="0" y="0" width="115" height="175" fill="#051510" stroke="rgba(0, 255, 136, 0.35)" strokeWidth="0.8" rx="3" />
          <text x="57" y="22" textAnchor="middle" fill="#00ff88" fontSize="9" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">TODAY&apos;S FOCUS</text>
          <line x1="14" y1="28" x2="101" y2="28" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.6" />

          {/* Checklist items */}
          <g transform="translate(14, 46)" fontSize="7.5" fontFamily="'JetBrains Mono', monospace">
            <text x="0" y="0" fill="#00ff88">✓</text>
            <text x="14" y="0" fill="#c9d1d9">System Design</text>

            <text x="0" y="18" fill="#00ff88">✓</text>
            <text x="14" y="18" fill="#c9d1d9">Build Weavly</text>

            <text x="0" y="36" fill="#00ff88">✓</text>
            <text x="14" y="36" fill="#c9d1d9">Model Training</text>

            <text x="0" y="54" fill="#00ff88">✓</text>
            <text x="14" y="54" fill="#c9d1d9">Infrastructure (AWS)</text>

            <text x="0" y="72" fill="#00ff88">✓</text>
            <text x="14" y="72" fill="#c9d1d9">DSA Practice</text>

            <text x="0" y="90" fill="#00ff88">✓</text>
            <text x="14" y="90" fill="#c9d1d9">Create Content</text>
          </g>

          {/* Footer quote */}
          <text x="57" y="152" textAnchor="middle" fill="#ffd166" fontSize="7.5" fontStyle="italic" fontFamily="'JetBrains Mono', monospace">
            Don&apos;t stop
          </text>
          <text x="57" y="163" textAnchor="middle" fill="#ffd166" fontSize="7.5" fontStyle="italic" fontFamily="'JetBrains Mono', monospace">
            until you&apos;re proud.
          </text>
        </g>

        {/* ── 7. WALL MOTIVATION QUOTE (TOP RIGHT) ── */}
        <g id="wall-quote" transform="translate(1040, 50)" opacity="0.75">
          <text x="0" y="0" fill="#adbac7" fontSize="8" fontFamily="'JetBrains Mono', monospace">Hard work</text>
          <text x="0" y="14" fill="#adbac7" fontSize="8" fontFamily="'JetBrains Mono', monospace">beats talent</text>
          <text x="0" y="28" fill="#adbac7" fontSize="8" fontFamily="'JetBrains Mono', monospace">when talent</text>
          <text x="0" y="42" fill="#adbac7" fontSize="8" fontFamily="'JetBrains Mono', monospace">doesn&apos;t work</text>
          <text x="0" y="56" fill="#adbac7" fontSize="8" fontFamily="'JetBrains Mono', monospace">hard.</text>
        </g>

        {/* ── 8. DESK SURFACE & SOLID WORKTOP ── */}
        <g id="desk-surface">
          {/* Desk slab */}
          <rect x="250" y="475" width="950" height="225" fill="#05080c" stroke="#16222f" strokeWidth="1" />
          {/* Glowing front highlight edge */}
          <line x1="250" y1="475" x2="1200" y2="475" stroke="url(#deskEdgeGrad)" strokeWidth="1.5" />
          <line x1="250" y1="477" x2="1200" y2="477" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="0.8" />
        </g>

        {/* ── 9. WARM DESK LAMP & AMBER LIGHT CONE (LEFT) ── */}
        <g id="desk-lamp">
          {/* Amber Spotlight Beam Cone */}
          <polygon points="432,258 240,475 490,475" fill="url(#lampConeGrad)" className={styles.deskLampGlow} pointerEvents="none" />

          {/* Lamp Weighted Round Base */}
          <ellipse cx="400" cy="465" rx="16" ry="5" fill="#0e171c" stroke="#253545" strokeWidth="1.2" />
          {/* Stem & Articulated Joints */}
          <path
            d="M 400 465 Q 405 350 395 300 Q 390 260 425 252"
            fill="none"
            stroke="#1c2b38"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="395" cy="300" r="3.5" fill="#2d4052" />
          <circle cx="425" cy="252" r="3.5" fill="#2d4052" />
          {/* Lamp Conical Metal Shade */}
          <path
            d="M 420 248 L 442 254 L 434 266 L 416 260 Z"
            fill="#0b131a"
            stroke="#253545"
            strokeWidth="1.2"
          />
          {/* Luminous Warm Bulb Bulb */}
          <ellipse cx="426" cy="261" rx="7" ry="3.5" fill="#ffd166" filter="url(#subtleGlow)" />
        </g>

        {/* ── 10. BOOK STACK UNDER LAMP (LEFT) ── */}
        <g id="book-stack" transform="translate(285, 395)">
          {/* Book 1 (Top): SYSTEM DESIGN */}
          <g transform="translate(10, 0)">
            <rect x="0" y="0" width="125" height="19" fill="#0e3820" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="0.8" rx="1.5" />
            <rect x="0" y="0" width="5" height="19" fill="rgba(0, 255, 136, 0.6)" rx="1" />
            <text x="14" y="13" fill="#00ff88" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em">SYSTEM DESIGN</text>
          </g>

          {/* Book 2: MACHINE LEARNING */}
          <g transform="translate(5, 20)">
            <rect x="0" y="0" width="132" height="20" fill="#07303e" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="0.8" rx="1.5" />
            <rect x="0" y="0" width="5" height="20" fill="rgba(0, 242, 254, 0.6)" rx="1" />
            <text x="14" y="14" fill="#00f2fe" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em">MACHINE LEARNING</text>
          </g>

          {/* Book 3: CLEAN CODE */}
          <g transform="translate(8, 41)">
            <rect x="0" y="0" width="128" height="19" fill="#092823" stroke="rgba(0, 255, 136, 0.35)" strokeWidth="0.8" rx="1.5" />
            <rect x="0" y="0" width="5" height="19" fill="rgba(0, 255, 136, 0.5)" rx="1" />
            <text x="14" y="13" fill="#34d399" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em">CLEAN CODE</text>
          </g>

          {/* Book 4 (Bottom): BUILD THINGS */}
          <g transform="translate(0, 61)">
            <rect x="0" y="0" width="138" height="22" fill="#131c19" stroke="rgba(200, 220, 210, 0.35)" strokeWidth="0.8" rx="1.5" />
            <rect x="0" y="0" width="6" height="22" fill="rgba(200, 220, 210, 0.6)" rx="1" />
            <text x="14" y="15" fill="#e6edf3" fontSize="7.5" fontWeight="bold" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em">BUILD THINGS</text>
          </g>
        </g>

        {/* ── 11. COFFEE MUG WITH </> EMBLEM ── */}
        <g id="coffee-mug" transform="translate(435, 435)">
          {/* Ceramic Mug Body */}
          <rect x="0" y="0" width="40" height="38" fill="#080f14" stroke="#00f2fe" strokeWidth="1.2" rx="3" />
          {/* Handle */}
          <path d="M 40 8 Q 54 18 40 30" fill="none" stroke="#00f2fe" strokeWidth="1.5" strokeLinecap="round" />
          {/* Glowing </> Logo on Mug */}
          <text
            x="20"
            y="23"
            textAnchor="middle"
            fill="#00f2fe"
            fontSize="11"
            fontWeight="bold"
            fontFamily="'JetBrains Mono', monospace"
            filter="url(#subtleGlow)"
          >
            &lt;/&gt;
          </text>
          {/* Rising Steam Wisps */}
          <path d="M 14 -4 Q 18 -10 14 -16" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1" strokeLinecap="round" className={styles.coffeeSteam} />
          <path d="M 26 -5 Q 22 -11 26 -17" fill="none" stroke="rgba(0, 255, 136, 0.35)" strokeWidth="1" strokeLinecap="round" className={styles.coffeeSteam} />
        </g>

        {/* ── 12. CENTRAL ULTRA-WIDE CURVED MONITOR ── */}
        <g id="center-monitor" transform="translate(440, 268)">
          {/* Glow backdrop behind monitor */}
          <rect x="-10" y="-10" width="410" height="205" fill="rgba(0, 242, 254, 0.08)" rx="8" filter="url(#neonGlow)" />

          {/* Sturdy Monitor Stand */}
          <rect x="180" y="180" width="30" height="40" fill="#0d1822" stroke="#1d2d3d" strokeWidth="1" />
          <ellipse cx="195" cy="218" rx="45" ry="6" fill="#081017" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />

          {/* Curved Bezel Frame */}
          <rect
            x="0"
            y="0"
            width="390"
            height="185"
            fill="#03080e"
            stroke="#00f2fe"
            strokeWidth="1.8"
            rx="5"
            filter="url(#subtleGlow)"
          />

          {/* Screen Glass */}
          <rect x="4" y="4" width="382" height="177" fill="url(#monitorScreenGrad)" rx="3" />

          {/* Screen Content: Dual-Pane Code Editor */}
          {monitorMode === 'projects' ? (
            <>
              {/* Left Pane (LUXZERA & Weavly Vector Pipeline) */}
              <g transform="translate(10, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">01</text>
                  <text x="0" y="13">02</text>
                  <text x="0" y="26">03</text>
                  <text x="0" y="39">04</text>
                  <text x="0" y="52">05</text>
                  <text x="0" y="65">06</text>
                  <text x="0" y="78">07</text>
                  <text x="0" y="91">08</text>
                  <text x="0" y="104">09</text>
                  <text x="0" y="117">10</text>
                  <text x="0" y="130">11</text>
                  <text x="0" y="143">12</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#a78bfa">import</tspan> <tspan fill="#e6edf3">&#123; WeavlyMesh &#125;</tspan> <tspan fill="#a78bfa">from</tspan> <tspan fill="#00ff88">&apos;@luxzera/core&apos;</tspan>;</text>
                  <text x="0" y="13"><tspan fill="#a78bfa">import</tspan> <tspan fill="#e6edf3">&#123; QdrantClient &#125;</tspan> <tspan fill="#a78bfa">from</tspan> <tspan fill="#00ff88">&apos;@qdrant/js&apos;</tspan>;</text>
                  <text x="0" y="26"><tspan fill="#64748b">// LUXZERA Fashion Rec Engine v2</tspan></text>
                  <text x="0" y="39"><tspan fill="#00f2fe">const</tspan> <tspan fill="#f59e0b">cluster</tspan> = <tspan fill="#a78bfa">new</tspan> <tspan fill="#f59e0b">WeavlyMesh</tspan>(&#123;</text>
                  <text x="0" y="52"><tspan fill="#c9d1d9">  collection: </tspan><tspan fill="#00ff88">&apos;catalog_v2&apos;</tspan>,</text>
                  <text x="0" y="65"><tspan fill="#c9d1d9">  vector_dim: </tspan><tspan fill="#f59e0b">1536</tspan>,</text>
                  <text x="0" y="78"><tspan fill="#c9d1d9">  metric: </tspan><tspan fill="#00ff88">&apos;Cosine&apos;</tspan></text>
                  <text x="0" y="91">&#125;);</text>
                  <text x="0" y="104"><tspan fill="#a78bfa">await</tspan> cluster.<tspan fill="#38bdf8">indexBatch</tspan>(payloads);</text>
                  <text x="0" y="117"><tspan fill="#00ff88">console</tspan>.<tspan fill="#38bdf8">log</tspan>(<tspan fill="#00ff88">&apos;✓ 10k vectors indexed&apos;</tspan>);</text>
                  <text x="0" y="130"><tspan fill="#34d399">// cluster: 3 nodes | replicas: 2</tspan></text>
                  <text x="0" y="143"><tspan fill="#00ff88" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>

              {/* Vertical Pane Divider */}
              <line x1="195" y1="12" x2="195" y2="175" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.8" />

              {/* Right Pane (Rust Vector Ranking) */}
              <g transform="translate(205, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">13</text>
                  <text x="0" y="13">14</text>
                  <text x="0" y="26">15</text>
                  <text x="0" y="39">16</text>
                  <text x="0" y="52">17</text>
                  <text x="0" y="65">18</text>
                  <text x="0" y="78">19</text>
                  <text x="0" y="91">20</text>
                  <text x="0" y="104">21</text>
                  <text x="0" y="117">22</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#a78bfa">pub fn</tspan> <tspan fill="#f59e0b">rerank_candidates</tspan>(</text>
                  <text x="0" y="13">  user: &amp;<tspan fill="#f59e0b">UserProfile</tspan>,</text>
                  <text x="0" y="26">  items: &amp;[<tspan fill="#f59e0b">ProductItem</tspan>],</text>
                  <text x="0" y="39">) -&gt; <tspan fill="#f59e0b">Vec</tspan>&lt;<tspan fill="#f59e0b">ScoredProduct</tspan>&gt; &#123;</text>
                  <text x="0" y="52"><tspan fill="#00f2fe">  let</tspan> ranked = items.<tspan fill="#38bdf8">par_iter</tspan>()</text>
                  <text x="0" y="65">    .<tspan fill="#38bdf8">map</tspan>(|p| <tspan fill="#38bdf8">cosine_score</tspan>(user, p))</text>
                  <text x="0" y="78">    .<tspan fill="#38bdf8">filter</tspan>(|s| s.score &gt; <tspan fill="#f59e0b">0.85</tspan>)</text>
                  <text x="0" y="91">    .<tspan fill="#38bdf8">collect</tspan>();</text>
                  <text x="0" y="104"><tspan fill="#34d399">// latency: 8.2ms | precision: 96%</tspan></text>
                  <text x="0" y="117"><tspan fill="#00f2fe" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>
            </>
          ) : monitorMode === 'skills' ? (
            <>
              {/* Left Pane (Technical Stack Core) */}
              <g transform="translate(10, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">01</text>
                  <text x="0" y="13">02</text>
                  <text x="0" y="26">03</text>
                  <text x="0" y="39">04</text>
                  <text x="0" y="52">05</text>
                  <text x="0" y="65">06</text>
                  <text x="0" y="78">07</text>
                  <text x="0" y="91">08</text>
                  <text x="0" y="104">09</text>
                  <text x="0" y="117">10</text>
                  <text x="0" y="130">11</text>
                  <text x="0" y="143">12</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#64748b">// SAKETH.OS Technical Stack Spec</tspan></text>
                  <text x="0" y="13"><tspan fill="#00f2fe">const</tspan> <tspan fill="#f59e0b">SYSTEM_CORE</tspan> = &#123;</text>
                  <text x="0" y="26"><tspan fill="#c9d1d9">  languages: </tspan>[<tspan fill="#00ff88">&apos;TS&apos;</tspan>, <tspan fill="#00ff88">&apos;Rust&apos;</tspan>, <tspan fill="#00ff88">&apos;Java&apos;</tspan>, <tspan fill="#00ff88">&apos;Python&apos;</tspan>],</text>
                  <text x="0" y="39"><tspan fill="#c9d1d9">  frontend: </tspan>[<tspan fill="#00ff88">&apos;React 18&apos;</tspan>, <tspan fill="#00ff88">&apos;Next.js 14&apos;</tspan>, <tspan fill="#00ff88">&apos;Vite&apos;</tspan>],</text>
                  <text x="0" y="52"><tspan fill="#c9d1d9">  backend: </tspan>[<tspan fill="#00ff88">&apos;Spring Boot&apos;</tspan>, <tspan fill="#00ff88">&apos;FastAPI&apos;</tspan>, <tspan fill="#00ff88">&apos;Node&apos;</tspan>],</text>
                  <text x="0" y="65"><tspan fill="#c9d1d9">  databases: </tspan>[<tspan fill="#00ff88">&apos;Qdrant&apos;</tspan>, <tspan fill="#00ff88">&apos;PostgreSQL&apos;</tspan>, <tspan fill="#00ff88">&apos;Redis&apos;</tspan>],</text>
                  <text x="0" y="78"><tspan fill="#c9d1d9">  cloud: </tspan>[<tspan fill="#00ff88">&apos;AWS ECS&apos;</tspan>, <tspan fill="#00ff88">&apos;Docker&apos;</tspan>, <tspan fill="#00ff88">&apos;GCP&apos;</tspan>],</text>
                  <text x="0" y="91"><tspan fill="#c9d1d9">  status: </tspan><tspan fill="#00ff88">&apos;ALL_MODULES_ONLINE&apos;</tspan></text>
                  <text x="0" y="104">&#125;;</text>
                  <text x="0" y="117"><tspan fill="#a78bfa">export default</tspan> SYSTEM_CORE;</text>
                  <text x="0" y="130"><tspan fill="#34d399">// system health: 99.99% uptime</tspan></text>
                  <text x="0" y="143"><tspan fill="#00ff88" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>

              {/* Vertical Pane Divider */}
              <line x1="195" y1="12" x2="195" y2="175" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.8" />

              {/* Right Pane (Runtime Benchmark Report) */}
              <g transform="translate(205, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">13</text>
                  <text x="0" y="13">14</text>
                  <text x="0" y="26">15</text>
                  <text x="0" y="39">16</text>
                  <text x="0" y="52">17</text>
                  <text x="0" y="65">18</text>
                  <text x="0" y="78">19</text>
                  <text x="0" y="91">20</text>
                  <text x="0" y="104">21</text>
                  <text x="0" y="117">22</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#38bdf8">[RUNTIME BENCHMARK REPORT]</tspan></text>
                  <text x="0" y="13"><tspan fill="#64748b">qps_load:         </tspan><tspan fill="#00ff88">18,400 req/s</tspan></text>
                  <text x="0" y="26"><tspan fill="#64748b">avg_latency:      </tspan><tspan fill="#00f2fe">9.4 ms</tspan></text>
                  <text x="0" y="39"><tspan fill="#64748b">p99_latency:      </tspan><tspan fill="#f59e0b">14.2 ms</tspan></text>
                  <text x="0" y="52"><tspan fill="#64748b">memory_usage:     </tspan><tspan fill="#34d399">128.4 MB</tspan></text>
                  <text x="0" y="65"><tspan fill="#64748b">vector_cache_hit: </tspan><tspan fill="#00ff88">99.2%</tspan></text>
                  <text x="0" y="78"><tspan fill="#64748b">thread_pool:      </tspan><tspan fill="#e6edf3">16 workers</tspan></text>
                  <text x="0" y="91"><tspan fill="#64748b">gc_pause_time:    </tspan><tspan fill="#00ff88">&lt; 0.8 ms</tspan></text>
                  <text x="0" y="104"><tspan fill="#34d399">// active connections: 1,420</tspan></text>
                  <text x="0" y="117"><tspan fill="#00f2fe" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>
            </>
          ) : monitorMode === 'experience' ? (
            <>
              {/* Left Pane (Production Deployment Milestones) */}
              <g transform="translate(10, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">01</text>
                  <text x="0" y="13">02</text>
                  <text x="0" y="26">03</text>
                  <text x="0" y="39">04</text>
                  <text x="0" y="52">05</text>
                  <text x="0" y="65">06</text>
                  <text x="0" y="78">07</text>
                  <text x="0" y="91">08</text>
                  <text x="0" y="104">09</text>
                  <text x="0" y="117">10</text>
                  <text x="0" y="130">11</text>
                  <text x="0" y="143">12</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#64748b">// CAREER &amp; DEPLOYMENT MILESTONES</tspan></text>
                  <text x="0" y="13"><tspan fill="#00f2fe">const</tspan> <tspan fill="#f59e0b">JOURNEY</tspan> = [</text>
                  <text x="0" y="26">  &#123; <tspan fill="#38bdf8">role</tspan>: <tspan fill="#00ff88">&apos;Full Stack &amp; AI Engineer&apos;</tspan> &#125;,</text>
                  <text x="0" y="39">  &#123; <tspan fill="#38bdf8">lead</tspan>: <tspan fill="#00ff88">&apos;LUXZERA - E-Comm Intelligence&apos;</tspan> &#125;,</text>
                  <text x="0" y="52">  &#123; <tspan fill="#38bdf8">arch</tspan>: <tspan fill="#00ff88">&apos;Weavly - Distributed AI Mesh&apos;</tspan> &#125;,</text>
                  <text x="0" y="65">  &#123; <tspan fill="#38bdf8">ship</tspan>: <tspan fill="#00ff88">&apos;SAKETH.OS Workstation&apos;</tspan> &#125;,</text>
                  <text x="0" y="78">  &#123; <tspan fill="#38bdf8">perf</tspan>: <tspan fill="#00ff88">&apos;Sub-15ms vector retrieval&apos;</tspan> &#125;</text>
                  <text x="0" y="91">];</text>
                  <text x="0" y="104"><tspan fill="#00ff88">console</tspan>.<tspan fill="#38bdf8">table</tspan>(JOURNEY);</text>
                  <text x="0" y="117"><tspan fill="#64748b">// total verified commits: 840+</tspan></text>
                  <text x="0" y="130"><tspan fill="#34d399">// zero-downtime rolling cluster</tspan></text>
                  <text x="0" y="143"><tspan fill="#00ff88" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>

              {/* Vertical Pane Divider */}
              <line x1="195" y1="12" x2="195" y2="175" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.8" />

              {/* Right Pane (Git CI/CD Pipeline) */}
              <g transform="translate(205, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">13</text>
                  <text x="0" y="13">14</text>
                  <text x="0" y="26">15</text>
                  <text x="0" y="39">16</text>
                  <text x="0" y="52">17</text>
                  <text x="0" y="65">18</text>
                  <text x="0" y="78">19</text>
                  <text x="0" y="91">20</text>
                  <text x="0" y="104">21</text>
                  <text x="0" y="117">22</text>
                </g>
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#38bdf8">[GIT CI/CD PIPELINE: MAIN]</tspan></text>
                  <text x="0" y="13"><tspan fill="#00ff88">✓ Typecheck: </tspan><tspan fill="#c9d1d9">PASS (0 errors)</tspan></text>
                  <text x="0" y="26"><tspan fill="#00ff88">✓ Unit Tests: </tspan><tspan fill="#c9d1d9">15/15 PASS (77)</tspan></text>
                  <text x="0" y="39"><tspan fill="#00ff88">✓ Vite Build: </tspan><tspan fill="#c9d1d9">48ms [clean]</tspan></text>
                  <text x="0" y="52"><tspan fill="#00ff88">✓ Docker SHA: </tspan><tspan fill="#00f2fe">4e9c702a8f</tspan></text>
                  <text x="0" y="65"><tspan fill="#00ff88">✓ ECS Shift:  </tspan><tspan fill="#00ff88">100% traffic</tspan></text>
                  <text x="0" y="78"><tspan fill="#64748b">env: </tspan><tspan fill="#34d399">production [ap-south-1]</tspan></text>
                  <text x="0" y="91"><tspan fill="#64748b">health: </tspan><tspan fill="#00ff88">200 OK (0.2ms)</tspan></text>
                  <text x="0" y="104"><tspan fill="#34d399">// deployed: 14m ago by Saketh</tspan></text>
                  <text x="0" y="117"><tspan fill="#00f2fe" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>
            </>
          ) : (
            <>
              {/* Left Pane (Code) */}
              <g transform="translate(10, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                {/* Line numbers column */}
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">01</text>
                  <text x="0" y="13">02</text>
                  <text x="0" y="26">03</text>
                  <text x="0" y="39">04</text>
                  <text x="0" y="52">05</text>
                  <text x="0" y="65">06</text>
                  <text x="0" y="78">07</text>
                  <text x="0" y="91">08</text>
                  <text x="0" y="104">09</text>
                  <text x="0" y="117">10</text>
                  <text x="0" y="130">11</text>
                  <text x="0" y="143">12</text>
                </g>

                {/* Code Lines Left Pane */}
                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#a78bfa">import</tspan> <tspan fill="#e6edf3">&#123; RecEngine &#125;</tspan> <tspan fill="#a78bfa">from</tspan> <tspan fill="#00ff88">&apos;@saketh/weavly&apos;</tspan>;</text>
                  <text x="0" y="13"><tspan fill="#a78bfa">import</tspan> <tspan fill="#e6edf3">&#123; QdrantClient &#125;</tspan> <tspan fill="#a78bfa">from</tspan> <tspan fill="#00ff88">&apos;@qdrant/js-client&apos;</tspan>;</text>
                  <text x="0" y="26"><tspan fill="#64748b">// Initialize vector pipeline</tspan></text>
                  <text x="0" y="39"><tspan fill="#00f2fe">const</tspan> <tspan fill="#f59e0b">trainModel</tspan> = <tspan fill="#a78bfa">async</tspan> () =&gt; &#123;</text>
                  <text x="0" y="52"><tspan fill="#00f2fe">  const</tspan> client = <tspan fill="#a78bfa">new</tspan> <tspan fill="#f59e0b">QdrantClient</tspan>();</text>
                  <text x="0" y="65"><tspan fill="#00f2fe">  const</tspan> model = <tspan fill="#a78bfa">new</tspan> <tspan fill="#f59e0b">RecEngine</tspan>();</text>
                  <text x="0" y="78"><tspan fill="#a78bfa">  await</tspan> model.<tspan fill="#38bdf8">fit</tspan>(dataset);</text>
                  <text x="0" y="91"><tspan fill="#00ff88">  console</tspan>.<tspan fill="#38bdf8">log</tspan>(<tspan fill="#00ff88">&apos;Pipeline convergence: optimal&apos;</tspan>);</text>
                  <text x="0" y="104"><tspan fill="#a78bfa">  return</tspan> model.<tspan fill="#38bdf8">evaluate</tspan>();</text>
                  <text x="0" y="117">&#125;;</text>
                  <text x="0" y="130"><tspan fill="#34d399">// ✓ loss: 0.021  acc: 94.2%  p99: 14ms</tspan></text>
                  <text x="0" y="143"><tspan fill="#00ff88" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>

              {/* Vertical Pane Divider */}
              <line x1="195" y1="12" x2="195" y2="175" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.8" />

              {/* Right Pane (Rust Vector Scoring Code) */}
              <g transform="translate(205, 16)" fontSize="7" fontFamily="'JetBrains Mono', monospace">
                <g fill="#2d4253" opacity="0.7">
                  <text x="0" y="0">13</text>
                  <text x="0" y="13">14</text>
                  <text x="0" y="26">15</text>
                  <text x="0" y="39">16</text>
                  <text x="0" y="52">17</text>
                  <text x="0" y="65">18</text>
                  <text x="0" y="78">19</text>
                  <text x="0" y="91">20</text>
                  <text x="0" y="104">21</text>
                  <text x="0" y="117">22</text>
                </g>

                <g transform="translate(18, 0)">
                  <text x="0" y="0"><tspan fill="#a78bfa">pub fn</tspan> <tspan fill="#f59e0b">recommend</tspan>(</text>
                  <text x="0" y="13">  user: &amp;<tspan fill="#f59e0b">UserProfile</tspan>,</text>
                  <text x="0" y="26">) -&gt; <tspan fill="#f59e0b">Vec</tspan>&lt;<tspan fill="#f59e0b">ScoredItem</tspan>&gt; &#123;</text>
                  <text x="0" y="39"><tspan fill="#00f2fe">  let</tspan> emb = user.<tspan fill="#38bdf8">embedding</tspan>();</text>
                  <text x="0" y="52">  <tspan fill="#38bdf8">cosine_sim</tspan>(&amp;emb, &amp;items)</text>
                  <text x="0" y="65">    .<tspan fill="#38bdf8">top_k</tspan>(<tspan fill="#f59e0b">20</tspan>)</text>
                  <text x="0" y="78">    .<tspan fill="#38bdf8">filter</tspan>(|i| i.score &gt; <tspan fill="#f59e0b">0.7</tspan>)</text>
                  <text x="0" y="91">&#125;</text>
                  <text x="0" y="104"><tspan fill="#34d399">// latency p95: 12ms | qps: 4.8k</tspan></text>
                  <text x="0" y="117"><tspan fill="#00f2fe" className={styles.screenCursor}>&#9608;</tspan></text>
                </g>
              </g>
            </>
          )}
        </g>

        {/* ── 13. SECONDARY LAPTOP ON STAND (RIGHT) ── */}
        <g id="laptop-stand" transform="translate(850, 345)">
          {/* Laptop Aluminum Stand */}
          <path d="M 45 125 L 85 85 L 115 85 L 140 125 Z" fill="#0d1822" stroke="#1d2d3d" strokeWidth="1" />

          {/* Laptop Open Screen */}
          <rect
            x="15"
            y="0"
            width="135"
            height="90"
            fill="#04090f"
            stroke="rgba(0, 255, 136, 0.4)"
            strokeWidth="1.2"
            rx="3"
            filter="url(#subtleGlow)"
          />
          {/* Laptop Screen Bezel */}
          <rect x="20" y="5" width="125" height="80" fill="#02060a" rx="2" />

          {/* Screen Quote Text */}
          <g transform="translate(26, 22)" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            <text x="0" y="0" fill="#00ff88" fontSize="8">&ldquo;A</text>
            <text x="0" y="12" fill="#00ff88" fontSize="8">BETTER</text>
            <text x="0" y="24" fill="#00ff88" fontSize="8">VERSION</text>
            <text x="0" y="36" fill="#00ff88" fontSize="8">EVERYDAY.&rdquo;</text>
          </g>

          {/* Code Lines on Laptop Screen */}
          <g transform="translate(26, 68)" fontSize="6" fontFamily="monospace" fill="#38bdf8" opacity="0.7">
            {isExecuting ? (
              <>
                <text x="0" y="0" fill="#ffd166">&gt; exec: task_worker_0</text>
                <text x="0" y="9" fill="#00ff88">&gt; status: surge_active</text>
              </>
            ) : (
              <>
                <text x="0" y="0">&gt; npm run deploy --prod</text>
                <text x="0" y="9" fill="#00ff88">&gt; build verified [ok]</text>
              </>
            )}
          </g>

          {/* Laptop Keyboard Base (Angled) */}
          <path
            d="M 10 92 L 155 92 L 170 125 L -5 125 Z"
            fill="#0c1620"
            stroke="#1d2d3d"
            strokeWidth="1"
          />
          {/* Trackpad */}
          <rect x="62" y="105" width="40" height="15" fill="#070e14" stroke="#1c2c3c" strokeWidth="0.6" rx="1" />
        </g>

        {/* ── 14. POTTED MONSTERA PLANT (DESK RIGHT) ── */}
        <g id="desk-plant" transform="translate(995, 340)">
          {/* Terracotta / Slate Pot */}
          <path d="M 30 135 L 75 135 L 68 85 L 37 85 Z" fill="#091410" stroke="#00ff88" strokeWidth="1" />
          {/* Plant Stems & Monstera Leaves */}
          <path d="M 52 85 Q 40 40 15 15" fill="none" stroke="#00ff88" strokeWidth="1.5" />
          <ellipse cx="15" cy="15" rx="20" ry="12" fill="#09281a" stroke="#00ff88" strokeWidth="0.8" transform="rotate(-30 15 15)" />

          <path d="M 52 85 Q 70 30 95 10" fill="none" stroke="#00ff88" strokeWidth="1.5" />
          <ellipse cx="95" cy="10" rx="22" ry="14" fill="#09281a" stroke="#00ff88" strokeWidth="0.8" transform="rotate(35 95 10)" />

          <path d="M 52 85 Q 55 20 60 -10" fill="none" stroke="#00ff88" strokeWidth="1.5" />
          <ellipse cx="60" cy="-10" rx="24" ry="15" fill="#0b3321" stroke="#00ff88" strokeWidth="0.8" transform="rotate(5 60 -10)" />

          {/* Leaf ribbing */}
          <line x1="52" y1="85" x2="10" y2="45" stroke="#00ff88" strokeWidth="1" />
          <ellipse cx="10" cy="45" rx="16" ry="10" fill="#061c12" stroke="#00ff88" strokeWidth="0.6" transform="rotate(-40 10 45)" />
        </g>

        {/* ── 15. MECHANICAL KEYBOARD ON DESK ── */}
        <g id="keyboard" transform="translate(535, 460)">
          <rect x="0" y="0" width="195" height="18" fill="#080f14" stroke="#00f2fe" strokeWidth="1" rx="2" />
          {/* Key rows backlighting */}
          {Array.from({ length: 18 }).map((_, i) => (
            <rect
              key={`k-${i}`}
              x={6 + i * 10.2}
              y="3"
              width="8"
              height="11"
              fill="#0d1b24"
              stroke={i % 4 === 0 ? '#00f2fe' : '#00ff88'}
              strokeWidth="0.4"
              rx="1"
            />
          ))}
        </g>

        {/* ── 16. THE DEVELOPER IN ERGONOMIC TASK CHAIR (FOREGROUND) ── */}
        <g id="developer-and-chair" transform="translate(510, 245)">
          {/* Ergonomic Chair: High Back Mesh & Headrest */}
          {/* Headrest */}
          <rect x="88" y="2" width="64" height="24" rx="12" fill="#050a0e" stroke="#162836" strokeWidth="1.5" />
          <line x1="120" y1="26" x2="120" y2="42" stroke="#162836" strokeWidth="5" strokeLinecap="round" />

          {/* Chair Upper Frame Wings */}
          <path
            d="M 60 48 Q 120 38 180 48 Q 192 105 188 175 Q 120 182 52 175 Q 48 105 60 48 Z"
            fill="#04080c"
            stroke="#1b3042"
            strokeWidth="2"
          />

          {/* Chair Mesh Horizontal Ribbing */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`chair-rib-${i}`}
              x1="62"
              y1={65 + i * 12}
              x2="178"
              y2={65 + i * 12}
              stroke="rgba(0, 242, 254, 0.15)"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
          ))}

          {/* Left and Right Armrests */}
          <rect x="22" y="130" width="16" height="60" rx="5" fill="#080f14" stroke="#1a2d3c" strokeWidth="1.2" />
          <rect x="202" y="130" width="16" height="60" rx="5" fill="#080f14" stroke="#1a2d3c" strokeWidth="1.2" />

          {/* Developer Head (Textured Curly Hair Silhouette) */}
          <g id="developer-head">
            {/* Base head silhouette */}
            <ellipse cx="120" cy="55" rx="34" ry="38" fill="#070c10" />

            {/* Curly hair contours with cyan/green monitor rim highlights */}
            <circle cx="100" cy="32" r="10" fill="#05090d" stroke="rgba(0, 255, 136, 0.5)" strokeWidth="0.8" />
            <circle cx="114" cy="24" r="11" fill="#05090d" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="0.8" />
            <circle cx="128" cy="25" r="11" fill="#05090d" stroke="rgba(0, 255, 136, 0.6)" strokeWidth="0.8" />
            <circle cx="140" cy="34" r="10" fill="#05090d" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="0.8" />
            <circle cx="92" cy="46" r="10" fill="#05090d" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="0.8" />
            <circle cx="148" cy="46" r="10" fill="#05090d" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="0.8" />
            <circle cx="95" cy="62" r="9" fill="#05090d" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
            <circle cx="145" cy="62" r="9" fill="#05090d" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.8" />

            {/* Binary Stippling on Hair Highlights */}
            <text x="108" y="28" fill="#00ff88" fontSize="5" fontFamily="monospace" opacity="0.6">0</text>
            <text x="120" y="22" fill="#00f2fe" fontSize="5" fontFamily="monospace" opacity="0.7">1</text>
            <text x="132" y="28" fill="#00ff88" fontSize="5" fontFamily="monospace" opacity="0.6">0</text>
          </g>

          {/* Developer Torso / Dark Hoodie Back */}
          <path
            d="M 68 95 Q 120 85 172 95 Q 198 125 210 205 Q 120 220 30 205 Q 42 125 68 95 Z"
            fill="url(#hoodieGrad)"
            stroke="rgba(0, 242, 254, 0.25)"
            strokeWidth="1.2"
          />

          {/* Hoodie Cowl / Fold Lines */}
          <path
            d="M 94 92 Q 120 112 146 92"
            fill="none"
            stroke="rgba(0, 255, 136, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 100 102 Q 120 118 140 102"
            fill="none"
            stroke="rgba(0, 242, 254, 0.3)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Specular Edge Lines along Shoulders & Arms */}
          <path
            d="M 68 95 Q 42 125 32 195"
            fill="none"
            stroke="rgba(0, 255, 136, 0.45)"
            strokeWidth="1.2"
          />
          <path
            d="M 172 95 Q 198 125 208 195"
            fill="none"
            stroke="rgba(0, 242, 254, 0.45)"
            strokeWidth="1.2"
          />

          {/* Binary Glyph Stipples on Shoulder Contours */}
          <g opacity="0.55" fontSize="5" fontFamily="monospace">
            <text x="50" y="125" fill="#00ff88">01</text>
            <text x="40" y="145" fill="#00f2fe">10</text>
            <text x="36" y="165" fill="#00ff88">01</text>
            <text x="185" y="125" fill="#00f2fe">10</text>
            <text x="195" y="145" fill="#00ff88">01</text>
            <text x="200" y="165" fill="#00f2fe">10</text>
          </g>

          {/* Forearms extending forward to desk */}
          <rect x="30" y="190" width="38" height="25" rx="8" fill="#080e14" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" transform="rotate(-15 30 190)" />
          <rect x="172" y="190" width="38" height="25" rx="8" fill="#080e14" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.8" transform="rotate(15 172 190)" />
        </g>
      </svg>
      {/* Dynamic Pointillist Binary Character Field & Developer Reconstruction Canvas */}
      <DeveloperReconstructionCanvas />
    </div>
  );
};

