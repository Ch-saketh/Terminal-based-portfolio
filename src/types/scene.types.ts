/**
 * @file scene.types.ts
 * Type definitions for the developer scene rendering system.
 * Pure types — no React, no runtime imports.
 */

// ── Geometry ─────────────────────────────────────────────────────────────────

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

// ── City Generator ────────────────────────────────────────────────────────────

export interface CityBuilding {
  x: number;
  y: number;
  width: number;
  height: number;
  windows: CityWindow[];
}

export interface CityWindow {
  x: number;
  y: number;
  width: number;
  height: number;
  lit: boolean;
}

export interface CityConfig {
  count: number;
  totalWidth: number;
  totalHeight: number;
  minHeightRatio: number;
  maxHeightRatio: number;
  minWidthRatio: number;
  maxWidthRatio: number;
  windowCols: number;
  windowRows: number;
  litProbability: number;
  gap: number;
  seed: number;
}

// ── Monitor Screen Content ────────────────────────────────────────────────────

export type MonitorContentType = 'code-stream' | 'text-panel' | 'blank';

export interface CodeLine {
  text: string;
  color: 'green' | 'cyan' | 'blue' | 'purple' | 'dim';
  indent?: number;
}

export interface MonitorContent {
  type: MonitorContentType;
  lines?: CodeLine[];
  text?: string[];
}

// ── Scene Element Descriptors ─────────────────────────────────────────────────

export type SceneElementType =
  | 'city-background'
  | 'window-frame'
  | 'text-overlay'
  | 'monitor'
  | 'developer-silhouette'
  | 'desk-lamp'
  | 'book-stack'
  | 'plant'
  | 'mug'
  | 'laptop'
  | 'shelf'
  | 'desk-surface';

export interface SceneElementBase {
  id: string;
  type: SceneElementType;
  rect: Rect;
  onClick?: string;
  ariaLabel?: string;
  zIndex?: number;
}

export interface CityBackgroundElement extends SceneElementBase {
  type: 'city-background';
  config: CityConfig;
}

export interface WindowFrameElement extends SceneElementBase {
  type: 'window-frame';
  lines: string[];
}

export interface TextOverlayElement extends SceneElementBase {
  type: 'text-overlay';
  lines: string[];
  align: 'left' | 'right' | 'center';
}

export interface MonitorElement extends SceneElementBase {
  type: 'monitor';
  screenContent: MonitorContent;
}

export interface DeveloperElement extends SceneElementBase {
  type: 'developer-silhouette';
}

export interface DeskLampElement extends SceneElementBase {
  type: 'desk-lamp';
  glowColor: string;
}

export interface BookStackElement extends SceneElementBase {
  type: 'book-stack';
  books: { title: string; color: string }[];
}

export interface PlantElement extends SceneElementBase {
  type: 'plant';
  size: 'sm' | 'md' | 'lg';
}

export interface MugElement extends SceneElementBase {
  type: 'mug';
  text: string;
}

export interface LaptopElement extends SceneElementBase {
  type: 'laptop';
  lines: string[];
}

export interface ShelfElement extends SceneElementBase {
  type: 'shelf';
  bookCount: number;
}

export interface DeskSurfaceElement extends SceneElementBase {
  type: 'desk-surface';
}

export type SceneElement =
  | CityBackgroundElement
  | WindowFrameElement
  | TextOverlayElement
  | MonitorElement
  | DeveloperElement
  | DeskLampElement
  | BookStackElement
  | PlantElement
  | MugElement
  | LaptopElement
  | ShelfElement
  | DeskSurfaceElement;

export interface SceneDescriptor {
  viewBox: string;
  elements: SceneElement[];
}
