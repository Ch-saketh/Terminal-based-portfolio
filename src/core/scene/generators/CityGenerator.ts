/**
 * @file CityGenerator.ts
 * Procedural city skyline generator using a seeded PRNG.
 * Pure function — no side effects, deterministic output for the same seed.
 */

import { CityBuilding, CityConfig, CityWindow } from '../../../types/scene.types';

// ── Seeded PRNG (mulberry32) ──────────────────────────────────────────────────

function mulberry32(seed: number) {
  let s = seed;
  return {
    next(): number {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    range(min: number, max: number): number {
      return min + this.next() * (max - min);
    },
    bool(probability: number): boolean {
      return this.next() < probability;
    },
  };
}

// ── Window Generator ─────────────────────────────────────────────────────────

function generateWindows(
  rng: ReturnType<typeof mulberry32>,
  building: { x: number; y: number; width: number; height: number },
  cols: number,
  rows: number,
  litProbability: number
): CityWindow[] {
  const windows: CityWindow[] = [];
  const padX = building.width * 0.15;
  const padY = building.height * 0.12;
  const innerW = building.width - padX * 2;
  const innerH = building.height - padY * 2;
  const cellW = innerW / cols;
  const cellH = innerH / rows;
  const winW = cellW * 0.55;
  const winH = cellH * 0.5;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      windows.push({
        x: building.x + padX + col * cellW + (cellW - winW) / 2,
        y: building.y + padY + row * cellH + (cellH - winH) / 2,
        width: winW,
        height: winH,
        lit: rng.bool(litProbability),
      });
    }
  }

  return windows;
}

// ── Main Generator ────────────────────────────────────────────────────────────

/**
 * Generate a procedural city skyline.
 * Given the same config (especially the same seed), output is always identical.
 *
 * @param config - City configuration parameters
 * @returns Array of CityBuilding objects ready for SVG rendering
 */
export function generateCity(config: CityConfig): CityBuilding[] {
  const rng = mulberry32(config.seed);
  const buildings: CityBuilding[] = [];
  const slotWidth = config.totalWidth / config.count;

  for (let i = 0; i < config.count; i++) {
    const bWidth = rng.range(
      slotWidth * config.minWidthRatio,
      slotWidth * config.maxWidthRatio
    );
    const bHeight = rng.range(
      config.totalHeight * config.minHeightRatio,
      config.totalHeight * config.maxHeightRatio
    );
    const bX = i * slotWidth + (slotWidth - bWidth) / 2 + config.gap / 2;
    const bY = config.totalHeight - bHeight;

    const building: CityBuilding = {
      x: bX,
      y: bY,
      width: bWidth - config.gap,
      height: bHeight,
      windows: generateWindows(
        rng,
        { x: bX, y: bY, width: bWidth - config.gap, height: bHeight },
        config.windowCols,
        config.windowRows,
        config.litProbability
      ),
    };

    buildings.push(building);
  }

  return buildings;
}
