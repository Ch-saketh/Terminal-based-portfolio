/**
 * @file CityBackground.tsx
 * Procedurally generated city skyline — rendered as SVG paths.
 * Receives pre-generated building data from CityGenerator; renders it.
 * No generation logic here — pure presentation.
 */

import React, { useMemo } from 'react';
import { generateCity } from '../../../core/scene/generators/CityGenerator';
import { CityConfig } from '../../../types/scene.types';

interface CityBackgroundProps {
  x: number;
  y: number;
  width: number;
  height: number;
  config: CityConfig;
  /** Override building fill color */
  buildingColor?: string;
  buildingBorderColor?: string;
  litWindowColor?: string;
  dimWindowColor?: string;
}

const DEFAULT_BUILDING_COLOR = '#0c1520';
const DEFAULT_BORDER_COLOR = 'rgba(0,180,80,0.07)';
const DEFAULT_LIT_WINDOW = 'rgba(0,220,100,0.22)';
const DEFAULT_DIM_WINDOW = 'rgba(0,80,40,0.06)';

export const CityBackground = React.memo<CityBackgroundProps>(
  ({
    x,
    y,
    width,
    height,
    config,
    buildingColor = DEFAULT_BUILDING_COLOR,
    buildingBorderColor = DEFAULT_BORDER_COLOR,
    litWindowColor = DEFAULT_LIT_WINDOW,
    dimWindowColor = DEFAULT_DIM_WINDOW,
  }) => {
    const buildings = useMemo(() => generateCity(config), [config]);

    return (
      <g transform={`translate(${x}, ${y})`} aria-hidden="true">
        {/* Sky gradient backdrop */}
        <rect x={0} y={0} width={width} height={height} fill="url(#skyGradient)" />

        {buildings.map((b, i) => (
          <g key={i}>
            {/* Building silhouette */}
            <rect
              x={b.x}
              y={b.y}
              width={b.width}
              height={b.height}
              fill={buildingColor}
              stroke={buildingBorderColor}
              strokeWidth={0.5}
            />

            {/* Windows */}
            {b.windows.map((w, j) => (
              <rect
                key={j}
                x={w.x}
                y={w.y}
                width={w.width}
                height={w.height}
                fill={w.lit ? litWindowColor : dimWindowColor}
                rx={0.5}
              />
            ))}
          </g>
        ))}
      </g>
    );
  }
);

CityBackground.displayName = 'CityBackground';
