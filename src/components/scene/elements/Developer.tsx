/**
 * @file Developer.tsx
 * SVG developer silhouette — back-view figure at a desk.
 * Pure geometric SVG paths — no raster assets.
 *
 * Coordinate origin: top-left of the bounding rect passed in.
 * All paths are relative to (x, y).
 */

import React from 'react';

interface DeveloperProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: string;
  glowColor?: string;
}

const DEFAULT_FILL = '#0e1a12';
const DEFAULT_GLOW = 'rgba(0,200,80,0.06)';

export const Developer = React.memo<DeveloperProps>(
  ({ x, y, width: w, height: h, fillColor = DEFAULT_FILL, glowColor = DEFAULT_GLOW }) => {
    // Proportions — all values relative to w/h
    const headW = w * 0.28;
    const headH = h * 0.28;
    const headY = 0;

    const shoulderW = w * 0.82;
    const shoulderH = h * 0.42;
    const shoulderX = w * 0.5 - shoulderW / 2;
    const shoulderY = headH * 0.78;

    const armW = w * 0.22;
    const armH = h * 0.36;

    return (
      <g transform={`translate(${x}, ${y})`} aria-label="Developer silhouette">
        {/* Ambient glow behind figure */}
        <ellipse
          cx={w * 0.5}
          cy={h * 0.6}
          rx={w * 0.55}
          ry={h * 0.35}
          fill={glowColor}
          style={{ filter: 'blur(12px)' }}
        />

        {/* Chair back */}
        <rect
          x={w * 0.28}
          y={h * 0.62}
          width={w * 0.44}
          height={h * 0.38}
          rx={4}
          fill={fillColor}
          opacity={0.7}
        />

        {/* Left arm */}
        <rect
          x={shoulderX - armW * 0.6}
          y={shoulderY + shoulderH * 0.2}
          width={armW}
          height={armH}
          rx={armW * 0.45}
          fill={fillColor}
          transform={`rotate(-10 ${shoulderX} ${shoulderY + shoulderH * 0.5})`}
        />

        {/* Right arm */}
        <rect
          x={shoulderX + shoulderW - armW * 0.4}
          y={shoulderY + shoulderH * 0.2}
          width={armW}
          height={armH}
          rx={armW * 0.45}
          fill={fillColor}
          transform={`rotate(10 ${shoulderX + shoulderW} ${shoulderY + shoulderH * 0.5})`}
        />

        {/* Hoodie / torso — wide rounded top */}
        <rect
          x={shoulderX}
          y={shoulderY}
          width={shoulderW}
          height={shoulderH}
          rx={shoulderW * 0.42}
          fill={fillColor}
        />

        {/* Head */}
        <ellipse
          cx={w * 0.5}
          cy={headY + headH * 0.55}
          rx={headW * 0.5}
          ry={headH * 0.58}
          fill={fillColor}
        />

        {/* Hair / top of head — slightly lighter */}
        <ellipse
          cx={w * 0.5}
          cy={headY + headH * 0.18}
          rx={headW * 0.46}
          ry={headH * 0.26}
          fill={fillColor}
          opacity={0.85}
        />

        {/* Subtle outline glow */}
        <ellipse
          cx={w * 0.5}
          cy={headY + headH * 0.55}
          rx={headW * 0.5}
          ry={headH * 0.58}
          fill="none"
          stroke="rgba(0,200,80,0.08)"
          strokeWidth={1}
        />
        <rect
          x={shoulderX}
          y={shoulderY}
          width={shoulderW}
          height={shoulderH}
          rx={shoulderW * 0.42}
          fill="none"
          stroke="rgba(0,200,80,0.06)"
          strokeWidth={1}
        />
      </g>
    );
  }
);

Developer.displayName = 'Developer';
