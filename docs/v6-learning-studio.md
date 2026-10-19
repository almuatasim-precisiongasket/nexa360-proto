# V6 — parent-first learning studio preview

Branch v6; production v5 unchanged pending user review.

## Implementation
- Original geometry in lib/learning-studio.ts: architectural island, desk, chair,
  task lamp, books, equation paper, learning tablet and parent-feedback display.
- Four camera/target compositions with smooth transition windows and held views.
  One equation moves from desktop paper to the practice area, then accompanies
  the illustrative parent report. No external scene/model dependencies.
- LearningStudio owns absolute progress and sample choices. ScrollTrigger links
  the desktop sequence to its own reading range; explicit controls remain usable.
- Mobile and reduced-motion layouts use direct steps without a long scroll range.
- StudioRenderer lazily initialises near the viewport, caps DPR, renders on demand,
  pauses offscreen/hidden, and disposes geometry, materials, textures and shadows.
  The preserved desk illustration remains as a fallback if GPU initialisation,
  rendering or chunk loading fails. Explanatory content and sample remain HTML.
- Practice has first-operation choices, second-step answers, hints and reset.
  The parent note reflects actual local choices rather than invented records.
- Gateway copy now addresses the family first. The original opening book, intro,
  brand assets, portraits and approved course descriptions remain intact.

## Scope checkpoint
This preview completes the tuition sequence first. Extending the dimensional
language to the skills workbench and replacing remaining chapter bands follows
the user's preview review. No production publication is authorised by this
checkpoint. Browser review and actual GPU appearance must be recorded separately
from successful compilation; neither proves the other.


## Final implementation checks
The renderer registers its redraw callback through a parent-owned interface;
it does not mutate incoming props. TypeScript and targeted lint passed after
that repair. The complete production rebuild and full lint passed (zero errors and
zero warnings). Generated-page checks found the studio and no duplicate IDs or
missing anchor targets. Browser use is stopped at the user's explicit request.

The remaining skills workbench and chapter-transition redesign are deliberately
held at the agreed tuition-preview checkpoint, pending the user's visual review.
