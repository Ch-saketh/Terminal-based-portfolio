/**
 * @file Monitor.tsx
 * SVG monitor bezel + screen with code content.
 * Interactive — clicking executes a terminal command.
 */

import React from 'react';
import { MonitorContent, CodeLine } from '../../../types/scene.types';

const CODE_COLORS: Record<CodeLine['color'], string> = {
  green:  '#00cc66',
  cyan:   '#00cccc',
  blue:   '#66aaff',
  purple: '#cc88ff',
  dim:    '#446644',
};

interface MonitorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  screenContent: MonitorContent;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Monitor = React.memo<MonitorProps>(
  ({ x, y, width: w, height: h, screenContent, onClick, ariaLabel }) => {
    const bezelPad = 5;
    const screenW = w - bezelPad * 2;
    const screenH = h - bezelPad * 2 - 16; // leave room for stand
    const standW = 14;
    const standH = 18;
    const baseW = 44;
    const baseH = 5;
    const lineH = 10;
    const codePad = 6;

    return (
      <g
        transform={`translate(${x}, ${y})`}
        role={onClick ? 'button' : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      >
        {/* Glow beneath monitor */}
        <rect
          x={bezelPad - 4}
          y={bezelPad - 4}
          width={w - bezelPad * 2 + 8}
          height={screenH + 8}
          rx={6}
          fill="rgba(0,200,80,0.04)"
          style={{ filter: 'blur(6px)' }}
        />

        {/* Bezel */}
        <rect
          x={0}
          y={0}
          width={w}
          height={h - 22}
          rx={4}
          fill="#080e0a"
          stroke="rgba(0,200,80,0.22)"
          strokeWidth={1.5}
        />

        {/* Screen */}
        <rect
          x={bezelPad}
          y={bezelPad}
          width={screenW}
          height={screenH}
          rx={2}
          fill="#020804"
        />

        {/* Code lines */}
        {screenContent.lines?.map((line, i) => (
          <text
            key={i}
            x={bezelPad + codePad}
            y={bezelPad + codePad + i * lineH + 7}
            fontSize={7}
            fontFamily="'JetBrains Mono', monospace"
            fill={CODE_COLORS[line.color]}
            style={{ userSelect: 'none' }}
          >
            {line.indent ? '\u00A0'.repeat(line.indent * 2) : ''}{line.text}
          </text>
        ))}

        {/* Monitor stand */}
        <rect
          x={w / 2 - standW / 2}
          y={h - 22}
          width={standW}
          height={standH}
          fill="rgba(0,200,80,0.1)"
          stroke="rgba(0,200,80,0.15)"
          strokeWidth={0.5}
        />

        {/* Monitor base */}
        <rect
          x={w / 2 - baseW / 2}
          y={h - 5}
          width={baseW}
          height={baseH}
          rx={2}
          fill="rgba(0,200,80,0.08)"
          stroke="rgba(0,200,80,0.15)"
          strokeWidth={0.5}
        />

        {/* Hover highlight */}
        {onClick && (
          <rect
            x={0}
            y={0}
            width={w}
            height={h - 22}
            rx={4}
            fill="transparent"
            stroke="rgba(0,255,100,0)"
            strokeWidth={1.5}
            className="monitor-hover-ring"
          />
        )}
      </g>
    );
  }
);

Monitor.displayName = 'Monitor';
