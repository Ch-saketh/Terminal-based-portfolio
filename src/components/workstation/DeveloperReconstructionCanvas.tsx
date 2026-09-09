/**
 * @file DeveloperReconstructionCanvas.tsx
 * Dynamic Pointillist Binary Character Field & Developer Reconstruction Engine.
 *
 * Reconstructs the seated developer silhouette and ambient workstation particles
 * from terminal glyphs ('0', '1', '·', ':', '+', '#', 'x') with:
 * - Variable point density following developer silhouette & chair contours
 * - Variable brightness (neon green & cyan specular rim, dark graphite core)
 * - Micro-drift and organic breathing motion
 * - Interactive cursor repulsion & proximity illumination
 * - Reactive terminal command surge (bursts of activity on command execution)
 * - Ambient dust mote particles in desk lamp & monitor light field
 * - Full lifecycle safety (cleans up rAF, listeners, observers)
 * - prefers-reduced-motion support
 */

import React, { useEffect, useRef } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import styles from './WorkstationScene.module.css';

interface GlyphPoint {
  /** Equilibrium anchor in 1200x700 coordinate space */
  baseX: number;
  baseY: number;
  /** Current rendered position */
  x: number;
  y: number;
  /** Velocity for spring physics */
  vx: number;
  vy: number;
  /** Binary / terminal character */
  char: string;
  /** Base opacity */
  baseAlpha: number;
  currentAlpha: number;
  /** Color tier: 'rim-cyan' | 'rim-green' | 'core-green' | 'core-dark' | 'amber-accent' */
  colorTier: 'rim-cyan' | 'rim-green' | 'core-green' | 'core-dark' | 'amber-accent';
  /** Font size in canvas px */
  size: number;
  /** Phase offset for breathing flutter */
  phase: number;
}

interface MoteParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
  color: string;
  size: number;
  maxLife: number;
  life: number;
}

// Coordinate space matching SVG viewBox: 1200 x 700
const CANVAS_W = 1200;
const CANVAS_H = 700;

export const DeveloperReconstructionCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isExecuting = useTerminalStore((s) => s.isExecuting);
  const history = useTerminalStore((s) => s.history);

  // Reference to track surge multiplier
  const surgeRef = useRef(1.0);

  // Trigger temporary activity surge when a command is executed
  useEffect(() => {
    surgeRef.current = 2.4;
  }, [isExecuting, history.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;
    // Skip canvas context in headless/jsdom unit test environments
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    if (isJsdom) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. GENERATE DEVELOPER POINTILLIST NODES ──
    const points: GlyphPoint[] = [];
    const binaryGlyphs = ['0', '1'];
    const detailGlyphs = ['·', ':', '+', 'x', '1', '0'];

    // (A) Hair & Head Silhouette (Centers around x: 630, y: 300)
    const headCenterX = 630;
    const headCenterY = 300;

    // Outer curly hair contour (Rim points)
    for (let angle = 0; angle < Math.PI * 2; angle += 0.14) {
      const r = 32 + Math.sin(angle * 7) * 4 + (Math.random() - 0.5) * 3;
      const bx = headCenterX + Math.cos(angle) * (r * 0.95);
      const by = headCenterY + Math.sin(angle) * (r * 1.05);
      const isTopRim = angle > Math.PI * 0.8 || angle < Math.PI * 0.2;
      points.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        char: binaryGlyphs[Math.floor(Math.random() * binaryGlyphs.length)],
        baseAlpha: isTopRim ? 0.85 : 0.65,
        currentAlpha: isTopRim ? 0.85 : 0.65,
        colorTier: isTopRim ? 'rim-cyan' : 'rim-green',
        size: 7.5,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Inner hair density nodes
    for (let r = 8; r <= 28; r += 6) {
      const step = (Math.PI * 2) / (r * 0.8);
      for (let angle = 0; angle < Math.PI * 2; angle += step) {
        const bx = headCenterX + Math.cos(angle) * (r * 0.9) + (Math.random() - 0.5) * 3;
        const by = headCenterY + Math.sin(angle) * (r * 1.0) + (Math.random() - 0.5) * 3;
        points.push({
          baseX: bx,
          baseY: by,
          x: bx,
          y: by,
          vx: 0,
          vy: 0,
          char: detailGlyphs[Math.floor(Math.random() * detailGlyphs.length)],
          baseAlpha: 0.35 + Math.random() * 0.25,
          currentAlpha: 0.45,
          colorTier: 'core-dark',
          size: 6.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // (B) Hoodie Shoulders, Back, and Arms
    // Left shoulder rim: x 540 to 630, y 340 to 450
    for (let t = 0; t <= 1; t += 0.04) {
      const bx = 630 - t * 85 + (Math.sin(t * Math.PI) * 5);
      const by = 340 + t * 95;
      points.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        char: binaryGlyphs[Math.floor(Math.random() * binaryGlyphs.length)],
        baseAlpha: 0.8,
        currentAlpha: 0.8,
        colorTier: 'rim-green',
        size: 7.5,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Right shoulder rim: x 630 to 720, y 340 to 450
    for (let t = 0; t <= 1; t += 0.04) {
      const bx = 630 + t * 85 - (Math.sin(t * Math.PI) * 5);
      const by = 340 + t * 95;
      points.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        char: binaryGlyphs[Math.floor(Math.random() * binaryGlyphs.length)],
        baseAlpha: 0.85,
        currentAlpha: 0.85,
        colorTier: 'rim-cyan',
        size: 7.5,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Hoodie Cowl Neck & Folds
    for (let t = -0.8; t <= 0.8; t += 0.12) {
      const bx = 630 + t * 45;
      const by = 345 + Math.abs(t) * 15;
      points.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        char: ':',
        baseAlpha: 0.6,
        currentAlpha: 0.6,
        colorTier: 'core-green',
        size: 7,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Hoodie Core Field (Grid of textured matrix characters)
    for (let py = 355; py <= 470; py += 12) {
      const progress = (py - 355) / (470 - 355);
      const halfWidth = 40 + progress * 55;
      for (let px = 630 - halfWidth + 8; px <= 630 + halfWidth - 8; px += 11) {
        const distFromCenter = Math.abs(px - 630) / halfWidth;
        const isCore = distFromCenter < 0.6;
        points.push({
          baseX: px + (Math.random() - 0.5) * 3,
          baseY: py + (Math.random() - 0.5) * 3,
          x: px,
          y: py,
          vx: 0,
          vy: 0,
          char: detailGlyphs[Math.floor(Math.random() * detailGlyphs.length)],
          baseAlpha: isCore ? 0.3 : 0.5,
          currentAlpha: isCore ? 0.3 : 0.5,
          colorTier: isCore ? 'core-dark' : 'core-green',
          size: 6.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // (C) Ergonomic Chair Mesh Ribs (Subtle geometric background framing)
    for (let ry = 310; ry <= 430; ry += 16) {
      for (let rx = 560; rx <= 700; rx += 14) {
        // Only on the outer edges of chair backrest
        const isEdge = rx < 575 || rx > 685;
        if (isEdge) {
          points.push({
            baseX: rx,
            baseY: ry,
            x: rx,
            y: ry,
            vx: 0,
            vy: 0,
            char: '·',
            baseAlpha: 0.3,
            currentAlpha: 0.3,
            colorTier: 'core-dark',
            size: 6,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    // ── 2. AMBIENT DUST MOTE PARTICLES ──
    const motes: MoteParticle[] = [];
    for (let i = 0; i < 36; i++) {
      motes.push({
        x: 280 + Math.random() * 800,
        y: 150 + Math.random() * 350,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        char: ['·', '.', '0', '1', '+'][Math.floor(Math.random() * 5)],
        alpha: 0.15 + Math.random() * 0.3,
        color: Math.random() > 0.4 ? 'rgba(0, 255, 136,' : 'rgba(0, 242, 254,',
        size: 5 + Math.random() * 3,
        maxLife: 200 + Math.random() * 200,
        life: Math.random() * 200
      });
    }

    // ── 3. MOUSE INTERACTION TRACKING ──
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // ── 4. RESIZE / PIXEL RATIO SCALING ──
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = CANVAS_W * dpr;
      canvas.height = CANVAS_H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // ── 5. MAIN ANIMATION RENDER LOOP ──
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;

      // Exponential decay of command activity surge toward calm idle state
      if (surgeRef.current > 1.0) {
        surgeRef.current = Math.max(1.0, surgeRef.current - 0.025);
      }
      const surge = surgeRef.current;

      // Clear previous frame
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // (A) Render Floating Ambient Motes
      if (!prefersReducedMotion) {
        ctx.font = '6px "JetBrains Mono", monospace';
        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          m.x += m.vx * surge;
          m.y += m.vy * surge;
          m.life++;

          if (m.y < 100 || m.life > m.maxLife) {
            m.y = 480;
            m.x = 280 + Math.random() * 800;
            m.life = 0;
          }

          const currentAlpha = m.alpha * (0.8 + Math.sin(time + i) * 0.2) * (surge > 1 ? 1.4 : 1);
          ctx.fillStyle = `${m.color} ${currentAlpha})`;
          ctx.fillText(m.char, m.x, m.y);
        }
      }

      // (B) Render Developer Pointillist Nodes
      const mouseRadius = 85;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (!prefersReducedMotion) {
          // Micro-drift organic flutter
          const flutterX = Math.sin(time * 0.8 + pt.phase) * (0.6 * surge);
          const flutterY = Math.cos(time * 0.9 + pt.phase) * (0.6 * surge);

          const targetX = pt.baseX + flutterX;
          const targetY = pt.baseY + flutterY;

          // Mouse proximity repulsion physics
          const dx = pt.x - mouseX;
          const dy = pt.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRadius) * 14;
            pt.vx += (dx / dist) * force * 0.4;
            pt.vy += (dy / dist) * force * 0.4;
            // Proximity brightness boost
            pt.currentAlpha = Math.min(1.0, pt.baseAlpha + 0.4);
          } else {
            // Spring back toward target
            pt.vx += (targetX - pt.x) * 0.08;
            pt.vy += (targetY - pt.y) * 0.08;
            pt.currentAlpha += (pt.baseAlpha - pt.currentAlpha) * 0.05;
          }

          // Friction damping
          pt.vx *= 0.78;
          pt.vy *= 0.78;
          pt.x += pt.vx;
          pt.y += pt.vy;
        }

        // Color selection based on tier & proximity
        let fillStyle = 'rgba(0, 255, 136, 0.7)';
        const alpha = Math.min(1.0, pt.currentAlpha * (0.85 + Math.sin(time + pt.phase) * 0.15) * (surge > 1 ? 1.35 : 1));

        switch (pt.colorTier) {
          case 'rim-cyan':
            fillStyle = `rgba(0, 242, 254, ${alpha})`;
            break;
          case 'rim-green':
            fillStyle = `rgba(0, 255, 136, ${alpha})`;
            break;
          case 'core-green':
            fillStyle = `rgba(52, 211, 153, ${alpha * 0.85})`;
            break;
          case 'core-dark':
            fillStyle = `rgba(30, 80, 60, ${alpha * 0.75})`;
            break;
          case 'amber-accent':
            fillStyle = `rgba(255, 195, 60, ${alpha})`;
            break;
        }

        ctx.font = `${pt.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = fillStyle;
        ctx.fillText(pt.char, pt.x, pt.y);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    // ── 6. CLEANUP TO PREVENT MEMORY LEAKS ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.dynamicCanvasOverlay}
      aria-hidden="true"
    />
  );
};
