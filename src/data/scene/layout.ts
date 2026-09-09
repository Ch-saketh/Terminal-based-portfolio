/**
 * @file layout.ts
 * The authoritative scene descriptor for the SAKETH.OS developer workstation.
 *
 * ARCHITECTURE NOTE:
 * All scene element positioning, content, and interactivity is declared HERE
 * as pure data. No element positions or labels are hardcoded inside React
 * components. This enables easy layout adjustments without touching component code.
 *
 * Coordinate space: 1200 × 720 (matches SVG viewBox).
 */

import { SceneDescriptor } from '../../types/scene.types';

export const SCENE_VIEWBOX = '0 0 1200 720';
export const SCENE_W = 1200;
export const SCENE_H = 720;

/** Desk surface Y coordinate — all desk objects anchor to this */
export const DESK_Y = 480;

export const sceneDescriptor: SceneDescriptor = {
  viewBox: SCENE_VIEWBOX,

  elements: [
    // ── Background ─────────────────────────────────────────────────────────

    {
      id: 'city',
      type: 'city-background',
      rect: { x: 0, y: 80, width: 1200, height: 400 },
      config: {
        count: 22,
        totalWidth: 1200,
        totalHeight: 400,
        minHeightRatio: 0.35,
        maxHeightRatio: 0.95,
        minWidthRatio: 0.60,
        maxWidthRatio: 0.92,
        windowCols: 3,
        windowRows: 5,
        litProbability: 0.28,
        gap: 4,
        seed: 42,          // fixed seed — always same city layout
      },
    },

    // ── Window / wall frame (centre) ───────────────────────────────────────

    {
      id: 'window-frame',
      type: 'window-frame',
      rect: { x: 380, y: 60, width: 420, height: 360 },
      lines: ['DISCIPLINE', 'CREATIVITY', 'CONSISTENCY', 'FREEDOM'],
      ariaLabel: 'Wall panel showing core values',
    },

    // ── Text overlays ──────────────────────────────────────────────────────

    {
      id: 'overlay-build',
      type: 'text-overlay',
      rect: { x: 30, y: 180, width: 140, height: 100 },
      lines: ['BUILD', 'LEARN', 'SOLVE', 'REPEAT_'],
      align: 'left',
    },
    {
      id: 'overlay-quote',
      type: 'text-overlay',
      rect: { x: 1040, y: 60, width: 140, height: 120 },
      lines: ['Hard work', 'beats talent', 'when talent', "doesn't work", 'hard.'],
      align: 'right',
    },

    // ── Shelf (top-left) ───────────────────────────────────────────────────

    {
      id: 'shelf',
      type: 'shelf',
      rect: { x: 20, y: 100, width: 120, height: 60 },
      bookCount: 3,
    },

    // ── Desk surface ───────────────────────────────────────────────────────

    {
      id: 'desk-surface',
      type: 'desk-surface',
      rect: { x: 0, y: DESK_Y, width: 1200, height: 6 },
    },

    // ── Desk lamp ──────────────────────────────────────────────────────────

    {
      id: 'lamp',
      type: 'desk-lamp',
      rect: { x: 150, y: 340, width: 60, height: 140 },
      glowColor: 'rgba(200,180,80,0.12)',
      ariaLabel: 'Desk lamp',
    },

    // ── Book stack (left desk) ─────────────────────────────────────────────

    {
      id: 'books',
      type: 'book-stack',
      rect: { x: 40, y: 380, width: 100, height: 100 },
      onClick: 'skills cs',
      ariaLabel: 'CS books — click to view skills',
      books: [
        { title: 'SYSTEM DESIGN', color: '#006633' },
        { title: 'MACHINE LEARNING', color: '#005566' },
        { title: 'CLEAN CODE', color: '#334400' },
        { title: 'BUILD THINGS', color: '#334444' },
      ],
    },

    // ── Small desk plant ──────────────────────────────────────────────────

    {
      id: 'plant-desk',
      type: 'plant',
      rect: { x: 228, y: 410, width: 40, height: 70 },
      size: 'sm',
      ariaLabel: 'Small desk plant',
    },

    // ── Monitor LEFT ──────────────────────────────────────────────────────

    {
      id: 'monitor-left',
      type: 'monitor',
      rect: { x: 265, y: 300, width: 240, height: 180 },
      onClick: 'projects',
      ariaLabel: 'Left monitor — click to view projects',
      screenContent: {
        type: 'code-stream',
        lines: [
          { text: 'import { RecEngine } from', color: 'purple' },
          { text: "  '@saketh/weavly-core'", color: 'green' },
          { text: '', color: 'dim' },
          { text: 'const train = async () => {', color: 'cyan' },
          { text: '  const model = new RecEngine()', color: 'dim' },
          { text: '  await model.fit(dataset)', color: 'green' },
          { text: '  return model.evaluate()', color: 'cyan' },
          { text: '// ✓ loss: 0.021  acc: 94.2%', color: 'green' },
          { text: '▌', color: 'cyan' },
        ],
      },
    },

    // ── Developer silhouette (centre) ─────────────────────────────────────

    {
      id: 'developer',
      type: 'developer-silhouette',
      rect: { x: 480, y: 280, width: 240, height: 200 },
      ariaLabel: 'Developer at workstation',
    },

    // ── Monitor RIGHT ─────────────────────────────────────────────────────

    {
      id: 'monitor-right',
      type: 'monitor',
      rect: { x: 695, y: 300, width: 240, height: 180 },
      onClick: 'projects weavly',
      ariaLabel: 'Right monitor — click to view Weavly',
      screenContent: {
        type: 'code-stream',
        lines: [
          { text: 'fn recommend(', color: 'cyan' },
          { text: '  user: &UserProfile,', color: 'dim' },
          { text: ') -> Vec<ScoredItem> {', color: 'cyan' },
          { text: '  let emb = user.embedding();', color: 'green' },
          { text: '  cosine_sim(&emb, &items)', color: 'blue' },
          { text: '    .top_k(20)', color: 'dim' },
          { text: '    .filter(|i| i.score > 0.7)', color: 'dim' },
          { text: '// top-k: 20  p95: 12ms', color: 'green' },
          { text: '▌', color: 'dim' },
        ],
      },
    },

    // ── Mug with </> ─────────────────────────────────────────────────────

    {
      id: 'mug',
      type: 'mug',
      rect: { x: 630, y: 440, width: 36, height: 40 },
      text: '</>',
      ariaLabel: 'Coffee mug',
    },

    // ── Laptop / small monitor (right) ───────────────────────────────────

    {
      id: 'laptop',
      type: 'laptop',
      rect: { x: 935, y: 370, width: 130, height: 110 },
      onClick: 'about',
      ariaLabel: 'Laptop — click to learn about Saketh',
      lines: ['"A', 'BETTER', 'VERSION', 'EVERYDAY."'],
    },

    // ── Right side plant ─────────────────────────────────────────────────

    {
      id: 'plant-right',
      type: 'plant',
      rect: { x: 1110, y: 360, width: 70, height: 120 },
      size: 'lg',
      ariaLabel: 'Large plant',
    },
  ],
};
