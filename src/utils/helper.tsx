import React from 'react';

export const SVGGroup = ({ id, transform, children }: { id: string; transform: string; children: React.ReactNode }) => (
  <g id={id} transform={transform} style={{ fill: 'transparent', stroke: 'grey', strokeWidth: 2 }}>
    {children}
  </g>
);

export const SVGCircle = ({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) => (
  <circle id={id} cx={cx} cy={cy} r={r} style={{ fill: 'transparent', stroke: 'grey', strokeWidth: 2 }} />
);

export const SVGTriangle = ({ id, points }: { id: string; points: string }) => (
  <polygon id={id} points={points} style={{ fill: 'transparent', stroke: 'grey', strokeWidth: 2 }} />
);

export const SVGLine = ({ id, x1, y1, x2, y2 }: { id: string; x1: number; y1: number; x2: number; y2: number }) => (
  <line id={id} x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'grey', strokeWidth: 2 }} />
);
