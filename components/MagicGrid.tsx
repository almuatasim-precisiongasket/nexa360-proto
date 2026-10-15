"use client";

import { useId, useRef } from "react";
import { useVisibleAnimation } from "./AceternityEffects";

// Magic UI Animated Grid Pattern adaptation: deterministic cells, slow pulses,
// and no ongoing React renders or animation work while the section is hidden.
const cells = [
  [2, 2],
  [8, 1],
  [15, 3],
  [23, 2],
  [28, 5],
  [5, 7],
  [12, 6],
  [20, 8],
  [26, 10],
  [3, 13],
  [17, 12],
  [24, 15],
  [8, 17],
  [14, 20],
  [28, 19],
  [4, 22],
  [22, 23],
  [11, 24],
];

export function MagicGrid() {
  const id = useId();
  const root = useRef<SVGSVGElement>(null);
  useVisibleAnimation(root);
  return (
    <svg
      ref={root}
      className="magic-team-grid"
      viewBox="0 0 1440 1200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M.5 48V.5H48" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity=".13" />
      {cells.map(([x, y], index) => (
        <rect
          key={`${x}-${y}`}
          className="magic-grid-cell"
          x={x * 48 + 1}
          y={y * 48 + 1}
          width="47"
          height="47"
          fill="currentColor"
          style={{ animationDelay: `${index * -1.7}s` }}
        />
      ))}
    </svg>
  );
}
