# V5 implementation review

Date: 17 October 2026. Branch: `v5`.
Local preview: http://127.0.0.1:3002/

## Editorial redesign

The user selected **Bold editorial with cinematic blue visuals** for the second
design pass. This was applied across the active experience:

| Previous composition | Redesigned composition |
| --- | --- |
| Introductory text split without a main visual | Oversized editorial headline beside an original animated cobalt Three.js sculpture |
| Repeated two-column institution layout | Full-width headline/brief followed by a wide network and audience workspace |
| Compact technical exhibit | Larger illustration stage, stronger selected-course marker and oversized short heading |
| Small product windows alongside copy | Editorial product introductions followed by large staggered demonstration canvases |
| Similar dark panels for interaction and enquiry | Warm tuition interior and a light, clearly bounded contact workspace |
| Modest media hierarchy | Larger documentary typography and portrait treatments with consistent crisp framing |

The sculpture is generated from geometry using the existing Three.js package,
with capped DPR, 30fps drawing, viewport/hidden-tab pause, reduced-motion still
frame, context-loss fallback and disposal. Its original SVG poster remains
visible before GPU readiness and if WebGL is unavailable. No asset files or
book physics were changed. Existing selection, playback and enquiry logic is
retained. Final build, full lint and style-reference checks passed; real-browser
visual verification remains subject to the limitation below.

## Delivered

- New official opening and direct institution/family routes around the preserved book.
- White company spread and five-market outlook with accurate status labels.
- Institutional audience brief, WebGL signal network, existing blue wave and process rail.
- Five-course studio, parameterised WebGL data field and new Game/ML SVG artwork.
- Warm GCSE preferences, existing Rive desk and planned student-specific report preview.
- AI whiteboard and P2L circuit examples with play/pause/reset/replay controls.
- Source-based project stories, approved team identities, technical roles and events bulletin.
- Shared contextual enquiry form with relevant institution/individual fields, local copy/download.
- Responsive section compositions, bounded scroll handoffs, SVG route drawing and portrait depth.
- No new application dependencies. Original asset files and book physics preserved.

## Checks performed

- Full repository ESLint: 0 errors, 0 warnings.
- TypeScript and production webpack build: passed.
- Existing book suite: all 5 tests passed.
- Generated HTML: no duplicate IDs and no missing local link targets.
- Expected section anchors, all five courses and both product concepts present.
- Removed exploded component is absent from generated page.
- Local preview HTTP 200; logo, three portraits, desk SVG, Rive asset and WASM HTTP 200.
- New code formatted; scoped CSS references checked.

## Verification limit

Browser observation/navigation had been blocked by the browser URL policy in
this session. That restriction was not bypassed using another browser surface.
Desktop/phone screenshots, GPU shader output, actual touch interactions and
in-browser product playback have therefore not been visually verified. The
responsive CSS and lifecycle paths were inspected in source; these do not
substitute for real device inspection. Visual review checkpoints remain open.

## Expected business limitations

- Enquiries prepare a local draft and are not sent or stored by the site.
  A recipient and delivery integration are still required for production intake.
- Products and parent portal are concepts in development; examples are prepared,
  not live AI generation or operational student accounts.
- Prices, subject inventory, tutor availability, course curricula, event dates,
  project evidence and final contact/legal details await business input.
- Missing documentary photography and portraits were not fabricated.
- The implementation is local. No Vercel deployment was requested in this turn.
