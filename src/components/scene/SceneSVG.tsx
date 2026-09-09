/**
 * @file SceneSVG.tsx
 * SVG layer of the developer workstation scene.
 *
 * ARCHITECTURE:
 * - Reads the scene descriptor (pure data) and renders the appropriate
 *   SVG element component for each entry.
 * - No element positions, colours, or labels are hardcoded here.
 * - Handles interactivity: onClick commands are routed through the terminal store.
 * - Memoized: only re-renders when the descriptor or command executor changes.
 */

import React, { useCallback } from 'react';
import { SceneElement, SceneDescriptor } from '../../types/scene.types';
import { useTerminalStore } from '../../state/useTerminalStore';
import { CityBackground } from './elements/CityBackground';
import { Developer } from './elements/Developer';
import { Monitor } from './elements/Monitor';

// ── SVG Defs (gradients, filters) ────────────────────────────────────────────

const SceneDefs: React.FC = () => (
  <defs>
    <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stopColor="#060810" />
      <stop offset="50%" stopColor="#080d14" />
      <stop offset="100%" stopColor="#0c1620" />
    </linearGradient>
    <linearGradient id="deskGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stopColor="rgba(0,180,80,0.04)" />
      <stop offset="25%"  stopColor="rgba(0,180,80,0.10)" />
      <stop offset="50%"  stopColor="rgba(0,180,80,0.16)" />
      <stop offset="75%"  stopColor="rgba(0,180,80,0.10)" />
      <stop offset="100%" stopColor="rgba(0,180,80,0.04)" />
    </linearGradient>
    <filter id="lampGlow">
      <feGaussianBlur stdDeviation="8" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="subtleGlow">
      <feGaussianBlur stdDeviation="3" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// ── Individual element fallback renderers (for types without dedicated components) ──

interface ElemProps { el: SceneElement; onCommand?: (cmd: string) => void }

const WindowFrameEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'window-frame') return null;
  const { x, y, width: w, height: h } = el.rect;
  return (
    <g aria-label={el.ariaLabel}>
      <rect x={x} y={y} width={w} height={h} fill="none"
        stroke="rgba(0,200,80,0.1)" strokeWidth={1.5} rx={2} />
      {/* Curtains */}
      <rect x={x} y={y} width={w * 0.14} height={h}
        fill="rgba(0,50,20,0.18)" rx={1} />
      <rect x={x + w * 0.86} y={y} width={w * 0.14} height={h}
        fill="rgba(0,50,20,0.18)" rx={1} />
      {/* Text lines */}
      {el.lines.map((line, i) => (
        <text key={i} x={x + w * 0.5} y={y + h * 0.28 + i * 20}
          textAnchor="middle" fontSize={11} fontWeight="700"
          fontFamily="'JetBrains Mono', monospace"
          fill="rgba(0,220,100,0.7)" letterSpacing="0.1em">
          {line}
        </text>
      ))}
      <text x={x + w * 0.5} y={y + h * 0.28 + el.lines.length * 20 + 8}
        textAnchor="middle" fontSize={14} fill="rgba(0,220,100,0.3)"
        fontFamily="'JetBrains Mono', monospace">—</text>
    </g>
  );
};

const TextOverlayEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'text-overlay') return null;
  const { x, y, height: h } = el.rect;
  const anchor = el.align === 'right' ? 'end' : el.align === 'center' ? 'middle' : 'start';
  const tx = el.align === 'right' ? x + el.rect.width : el.align === 'center' ? x + el.rect.width / 2 : x;
  const lineH = h / (el.lines.length + 1);
  return (
    <g aria-hidden="true">
      {el.lines.map((line, i) => (
        <text key={i} x={tx} y={y + lineH * (i + 1)}
          textAnchor={anchor} fontSize={11} fontWeight="700"
          fontFamily="'JetBrains Mono', monospace"
          fill="rgba(0,210,90,0.6)" letterSpacing="0.08em">
          {line}
        </text>
      ))}
    </g>
  );
};

const DeskSurfaceEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'desk-surface') return null;
  const { x, y, width: w, height: h } = el.rect;
  return <rect x={x} y={y} width={w} height={h} fill="url(#deskGradient)" />;
};

const DeskLampEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'desk-lamp') return null;
  const { x, y, width: w, height: h } = el.rect;
  return (
    <g aria-hidden="true">
      {/* Warm glow */}
      <ellipse cx={x + w * 0.5} cy={y + h * 0.7} rx={w * 2.2} ry={h * 0.9}
        fill="rgba(200,180,80,0.06)" style={{ filter: 'blur(14px)' }} />
      {/* Base */}
      <rect x={x} y={y + h - 4} width={w} height={4} rx={2}
        fill="rgba(0,180,80,0.18)" stroke="rgba(0,200,80,0.2)" strokeWidth={0.5} />
      {/* Arm 1 */}
      <line x1={x + w * 0.5} y1={y + h - 4} x2={x + w * 0.55} y2={y + h * 0.58}
        stroke="rgba(0,180,80,0.22)" strokeWidth={2} strokeLinecap="round" />
      {/* Arm 2 */}
      <line x1={x + w * 0.55} y1={y + h * 0.58} x2={x + w * 0.2} y2={y + h * 0.28}
        stroke="rgba(0,180,80,0.22)" strokeWidth={2} strokeLinecap="round" />
      {/* Lamp head */}
      <ellipse cx={x + w * 0.2} cy={y + h * 0.22} rx={w * 0.4} ry={h * 0.09}
        fill="rgba(200,180,80,0.18)" stroke="rgba(200,180,80,0.3)" strokeWidth={0.8} />
    </g>
  );
};

const BookStackEl: React.FC<ElemProps> = ({ el, onCommand }) => {
  if (el.type !== 'book-stack') return null;
  const { x, y, width: w, height: h } = el.rect;
  const bookH = h / el.books.length;
  const handleClick = el.onClick && onCommand ? () => onCommand(el.onClick!) : undefined;
  return (
    <g role={handleClick ? 'button' : undefined} aria-label={el.ariaLabel}
      onClick={handleClick} style={handleClick ? { cursor: 'pointer' } : undefined}
      tabIndex={handleClick ? 0 : undefined}
      onKeyDown={handleClick ? (e) => e.key === 'Enter' && handleClick() : undefined}>
      {el.books.map((book, i) => (
        <g key={i}>
          <rect x={x} y={y + i * bookH} width={w} height={bookH - 2}
            fill={book.color} stroke="rgba(0,200,80,0.15)" strokeWidth={0.5} rx={1} />
          <rect x={x} y={y + i * bookH} width={3} height={bookH - 2}
            fill="rgba(0,255,100,0.3)" rx={0.5} />
          <text x={x + 8} y={y + i * bookH + bookH * 0.6}
            fontSize={6.5} fontWeight="700" fontFamily="'JetBrains Mono', monospace"
            fill="rgba(0,220,100,0.7)" letterSpacing="0.04em">
            {book.title}
          </text>
        </g>
      ))}
    </g>
  );
};

const PlantEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'plant') return null;
  const { x, y, width: w, height: h } = el.rect;
  const scale = el.size === 'lg' ? 1.4 : el.size === 'sm' ? 0.7 : 1;
  const pw = w * scale; const ph = h * scale;
  const cx = x + w / 2; const potH = ph * 0.22;
  const stemTop = y + ph * 0.55;

  return (
    <g aria-hidden="true">
      {/* Pot */}
      <path d={`M${cx - pw * 0.2} ${y + ph - potH} L${cx + pw * 0.2} ${y + ph - potH} L${cx + pw * 0.18} ${y + ph} L${cx - pw * 0.18} ${y + ph} Z`}
        fill="rgba(0,100,40,0.12)" stroke="rgba(0,200,80,0.18)" strokeWidth={0.8} />
      {/* Stem */}
      <line x1={cx} y1={y + ph - potH} x2={cx} y2={stemTop}
        stroke="rgba(0,180,70,0.25)" strokeWidth={1.5} />
      {/* Leaves */}
      <ellipse cx={cx - pw * 0.22} cy={stemTop + ph * 0.05} rx={pw * 0.22} ry={ph * 0.1}
        fill="rgba(0,160,60,0.2)" stroke="rgba(0,200,80,0.15)" strokeWidth={0.5}
        transform={`rotate(-35 ${cx - pw * 0.22} ${stemTop + ph * 0.05})`} />
      <ellipse cx={cx + pw * 0.22} cy={stemTop} rx={pw * 0.2} ry={ph * 0.09}
        fill="rgba(0,160,60,0.2)" stroke="rgba(0,200,80,0.15)" strokeWidth={0.5}
        transform={`rotate(30 ${cx + pw * 0.22} ${stemTop})`} />
      <ellipse cx={cx - pw * 0.14} cy={stemTop - ph * 0.12} rx={pw * 0.16} ry={ph * 0.08}
        fill="rgba(0,140,60,0.18)" stroke="rgba(0,200,80,0.12)" strokeWidth={0.5}
        transform={`rotate(-55 ${cx - pw * 0.14} ${stemTop - ph * 0.12})`} />
      {el.size === 'lg' && (
        <ellipse cx={cx + pw * 0.16} cy={stemTop - ph * 0.1} rx={pw * 0.14} ry={ph * 0.07}
          fill="rgba(0,140,60,0.16)" stroke="rgba(0,200,80,0.1)" strokeWidth={0.5}
          transform={`rotate(50 ${cx + pw * 0.16} ${stemTop - ph * 0.1})`} />
      )}
    </g>
  );
};

const MugEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'mug') return null;
  const { x, y, width: w, height: h } = el.rect;
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx={2}
        fill="#0c1510" stroke="rgba(0,200,80,0.25)" strokeWidth={1} />
      <path d={`M${x + w} ${y + h * 0.22} Q${x + w + w * 0.5} ${y + h * 0.5} ${x + w} ${y + h * 0.72}`}
        fill="none" stroke="rgba(0,200,80,0.2)" strokeWidth={1.2} />
      <text x={x + w * 0.5} y={y + h * 0.62} textAnchor="middle"
        fontSize={8} fontWeight="700" fontFamily="'JetBrains Mono', monospace"
        fill="rgba(0,220,100,0.7)">{el.text}</text>
      {/* Steam */}
      <text x={x + w * 0.3} y={y - 4} fontSize={7} fill="rgba(0,200,80,0.18)"
        fontFamily="monospace" style={{ animation: 'steamRise 2.5s ease-in-out infinite' }}>~</text>
      <text x={x + w * 0.65} y={y - 8} fontSize={7} fill="rgba(0,200,80,0.14)"
        fontFamily="monospace" style={{ animationDelay: '0.8s', animation: 'steamRise 2.5s ease-in-out infinite' }}>~</text>
    </g>
  );
};

const LaptopEl: React.FC<ElemProps> = ({ el, onCommand }) => {
  if (el.type !== 'laptop') return null;
  const { x, y, width: w, height: h } = el.rect;
  const screenH = h * 0.72;
  const handleClick = el.onClick && onCommand ? () => onCommand(el.onClick!) : undefined;
  return (
    <g role={handleClick ? 'button' : undefined} aria-label={el.ariaLabel}
      onClick={handleClick} style={handleClick ? { cursor: 'pointer' } : undefined}
      tabIndex={handleClick ? 0 : undefined}
      onKeyDown={handleClick ? (e) => e.key === 'Enter' && handleClick() : undefined}>
      <rect x={x} y={y} width={w} height={screenH} rx={3}
        fill="#060d08" stroke="rgba(0,200,80,0.18)" strokeWidth={1.5} />
      {el.lines.map((line, i) => (
        <text key={i} x={x + w * 0.12} y={y + screenH * 0.22 + i * 14}
          fontSize={9} fontWeight="700" fontFamily="'JetBrains Mono', monospace"
          fill="rgba(0,210,90,0.72)" letterSpacing="0.06em">{line}</text>
      ))}
      <rect x={x + w * 0.05} y={y + screenH} width={w * 0.9} height={3}
        fill="rgba(0,160,60,0.1)" stroke="rgba(0,200,80,0.12)" strokeWidth={0.5} />
      <rect x={x - w * 0.04} y={y + screenH + 3} width={w * 1.08} height={h - screenH - 3}
        rx={2} fill="rgba(0,100,40,0.08)" stroke="rgba(0,200,80,0.1)" strokeWidth={0.5} />
    </g>
  );
};

const ShelfEl: React.FC<ElemProps> = ({ el }) => {
  if (el.type !== 'shelf') return null;
  const { x, y, width: w } = el.rect;
  const bookW = 16; const bookH = 36;
  return (
    <g aria-hidden="true">
      <rect x={x} y={y + bookH} width={w} height={4} rx={1}
        fill="rgba(0,180,80,0.1)" stroke="rgba(0,200,80,0.16)" strokeWidth={0.5} />
      {Array.from({ length: el.bookCount }, (_, i) => (
        <rect key={i} x={x + 8 + i * (bookW + 3)} y={y + bookH - 36 + (i % 2) * 4}
          width={bookW} height={bookH - (i % 2) * 4} rx={1}
          fill={i % 2 === 0 ? '#061308' : '#041010'}
          stroke="rgba(0,200,80,0.12)" strokeWidth={0.5} />
      ))}
    </g>
  );
};

// ── Element router ────────────────────────────────────────────────────────────

const renderElement = (el: SceneElement, onCommand: (cmd: string) => void) => {
  const props = { el, onCommand };
  switch (el.type) {
    case 'city-background':
      return <CityBackground key={el.id} x={el.rect.x} y={el.rect.y}
        width={el.rect.width} height={el.rect.height} config={el.config} />;
    case 'window-frame':   return <WindowFrameEl  key={el.id} {...props} />;
    case 'text-overlay':   return <TextOverlayEl  key={el.id} {...props} />;
    case 'desk-surface':   return <DeskSurfaceEl  key={el.id} {...props} />;
    case 'desk-lamp':      return <DeskLampEl     key={el.id} {...props} />;
    case 'book-stack':     return <BookStackEl    key={el.id} {...props} />;
    case 'plant':          return <PlantEl        key={el.id} {...props} />;
    case 'mug':            return <MugEl          key={el.id} {...props} />;
    case 'laptop':         return <LaptopEl       key={el.id} {...props} />;
    case 'shelf':          return <ShelfEl        key={el.id} {...props} />;
    case 'developer-silhouette':
      return <Developer key={el.id} x={el.rect.x} y={el.rect.y}
        width={el.rect.width} height={el.rect.height} />;
    case 'monitor':
      return <Monitor key={el.id} x={el.rect.x} y={el.rect.y}
        width={el.rect.width} height={el.rect.height}
        screenContent={el.screenContent} ariaLabel={el.ariaLabel}
        onClick={el.onClick ? () => onCommand(el.onClick!) : undefined} />;
    default:
      return null;
  }
};

// ── Main SceneSVG ─────────────────────────────────────────────────────────────

interface SceneSVGProps {
  descriptor: SceneDescriptor;
  className?: string;
}

export const SceneSVG = React.memo<SceneSVGProps>(({ descriptor, className }) => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const handleCommand = useCallback(
    (cmd: string) => { executeCommand(cmd); },
    [executeCommand]
  );

  return (
    <svg
      viewBox={descriptor.viewBox}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Developer workstation scene"
      role="img"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <SceneDefs />
      {descriptor.elements.map((el) => renderElement(el, handleCommand))}
    </svg>
  );
});

SceneSVG.displayName = 'SceneSVG';
