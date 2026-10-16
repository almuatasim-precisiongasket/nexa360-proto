# Tailwind foundation — v3

Tailwind 4.3.3 and its PostCSS integration are installed with exact versions.
The existing reset remains authoritative; Preflight is deliberately omitted.
Legacy imports use string imports so Tailwind inlines them before CSS optimization.
The layer order allows explicit utilities to override existing styles while
preserving the order of all legacy rules. No animation or book geometry changed.

The team background beams use utilities for positioning, sizing, clipping and
opacity, with their custom mask retained in CSS. `cn()` supports conditional
classes and utility overrides through the existing shadcn alias. Brand colour
and font utilities map to the existing variables. README documents migration
conventions and registry component assumptions.

## Verification

- Lint and TypeScript passed.
- Production build passed with no CSS warnings after fixing import syntax.
- At the original 870px browser width, sampled computed styles for the body,
  header, section label, story stage, book visual, team grid and inquiry matched
  the pre-migration values, including dimensions, spacing, colours and fonts.
- Desktop 1440px team review confirmed beam layout, clipping and opacity.
- At 390px, the book rendered, Next advanced from cover to Academic, scrolling
  advanced to Ambition, and the navigation opened and closed.
- Checks at 320px, 768px and 1024px found no lasting document overflow. An
  immediate 320px resize reading briefly showed overflow before GSAP refreshed;
  the settled document width was 305px inside the 320px viewport.
- No browser console errors observed. Existing Three.js clock deprecation and
  GPU shader precision warnings remain. Physical phone testing was not performed.
- npm audit reported zero production vulnerabilities and five development
  findings through the existing Next ESLint / fast-glob / micromatch / braces
  chain. These versions were already in the prior lockfile; no forced downgrade
  of the Next ESLint configuration was applied.

This is the first migration slice. Remaining sections still use their original
CSS and can be converted incrementally as they are redesigned.
