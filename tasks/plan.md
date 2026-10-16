# NEXA360 — SVG illustration and motion refinement

Status: implemented and reviewed locally on v3. Validation and practical limits
are recorded in `docs/svg-illustration-review.md`.
Tasks and acceptance criteria: [todo.md](todo.md).

## Objective

Give the existing page a coherent set of custom illustrations that explain the
learning options and extend the book's paper-and-blue visual identity. Prioritize
the tuition section, then the service illustrations and the transitions between
sections. Use the installed SVG, Motion, GSAP and Tailwind setup.

## Current foundation

- `TuitionScene.tsx` already draws separate London and online scenes with three
  depth layers. Its entrance and pointer animation currently run only for fine
  pointers, so phone visitors receive static art.
- `PathArt.tsx` supplies the six service illustrations. `SiteEffects.tsx` owns
  their current pointer tilt; Cult folded-card surfaces surround them.
- `SectionHandoff.tsx` supplies the existing curved paper edge and scroll trace.
- `HoldingArt.tsx` supplies product and event placeholder illustrations.
- Motion Primitives heading reveals are already integrated and should keep
  ownership of heading transforms.

## Art direction

Use navy ink, NEXA blue enamel, warm ivory paper, pale blue glass and restrained
gold accents. Match the existing book and folded service cards.

Every scene uses the same composition rules:

1. Background: faint drafting lines or an architectural outline.
2. Middle: one clearly recognizable object with consistent perspective.
3. Foreground: one or two relevant details, such as a pencil or open notebook.
4. Ground: a restrained vector shadow; use large blur filters sparingly.

Artwork is decorative where nearby text already conveys the meaning. It should
support the section's purpose and leave its heading, copy and enquiry action easy
to read. Use original vector geometry and the approved brand assets and content.
London imagery is a stylized learning space, not a representation of the actual
Barking premises. Product and event artwork must continue to read as placeholders.

## Proposed illustrations

| Area | Visual concept | Intended interaction | Priority |
| --- | --- | --- | --- |
| Barking tuition | Open workbook on a desk, pencil, architectural backdrop | Scene assembles on entry; two drawn notebook marks; small pointer depth | 1 |
| Online tuition | Laptop lesson diagram with a notebook and pencil | Screen and notebook enter together; diagram draws once; same depth response | 1 |
| Services | Refine the six existing objects with matching perspective, grounding and detail | One entrance per card; restrained artwork response inside the folded surface | 2 |
| Section boundaries | Existing paper edge with a thin ink trace | Slow trace follows a short scroll interval without pinning the section | 3 |
| Products / Events | Existing stacked pages and blank calendar motif | One soft entrance; static resting composition | 4 |

Retain the two separate tuition cards and their existing format-specific enquiry
links. This plan does not add a duplicate format selector.

## Motion contract

These are starting values for visual review, not measured performance promises.

| Behaviour | Proposed treatment |
| --- | --- |
| Scene entrance | Once per mount; 1.6–2 seconds with roughly 120ms between layers |
| Line drawing | 1.8–2.4 seconds; at most two short details per scene |
| Desktop pointer depth | Fine pointers only; about 3–6px of travel; 0.9–1.2 second easing |
| Phone / tablet touch | Small one-time entrance; complete artwork and actions available without hover |
| Reduced motion | Immediate final composition, no drawing, parallax or continuous loops |
| Offscreen / hidden tab | No ongoing decorative animation; reset transient pointer offsets |

Use a shared easing and duration definition. Keep all scene entrances bounded;
avoid perpetual floating or pulsing. After entry, each illustration should settle.

## Ownership and structure

- SVG components own paths, viewBoxes, gradients and decorative grouping.
- GSAP owns illustration entrance, line drawing and pointer-depth wrappers.
- Motion continues to own heading reveals and existing UI state transitions.
- Each animated property has one owner. Separate the entrance wrapper from the
  pointer-depth wrapper, as the current tuition scenes already do.
- Keep GSAP selectors scoped to each illustration. Clean up observers, listeners
  and tweens on unmount and when media conditions change.
- Use `useId()` for SVG gradients, masks and clipping paths; two copies must not
  share document IDs.
- Define final SVG geometry in server-rendered markup. Client animation enhances
  it; text and enquiry controls remain usable before animation is ready.
- Share a small frame and timing constants where they remove real duplication.
  Avoid a general animation engine or a global pointer listener per illustration.

Book page mechanics, scroll controls and camera changes are outside this plan.
No new animation runtime, external asset service or paid subscription is required.

## Implementation order and checkpoints

1. Finish the London tuition scene and its motion, including touch behaviour.
2. Apply the same visual rules to the online scene and verify both enquiry links.
3. Review the tuition pair before extending its visual vocabulary.
4. Refine service objects and transfer their artwork motion ownership deliberately.
5. Polish the existing paper handoffs and the lower-priority placeholder artwork.
6. Review the whole page at desktop, tablet and phone sizes.

Each slice should remain independently reviewable and leave the page working.
Implementation review should happen before committing each completed slice.
Production publishing is a separate action after the completed work is reviewed.

## Acceptance and verification

- At 320, 390, 768, 1024 and 1440px, illustrations fit their containers and do not
  cover copy, controls or touch targets.
- Scroll entry works on coarse pointers; pointer movement is limited to fine
  pointers. Native vertical scrolling remains uninterrupted.
- Reduced motion shows the complete final scene. Re-entering a section does not
  repeatedly hide its content.
- Each tuition enquiry selects Academic tuition and its correct lesson format.
- Service details and enquiries still work, including keyboard activation and
  focus restoration.
- No new console errors, retained event listeners after unmount, or duplicate SVG
  IDs. Check multiple scene instances together.
- Run lint, TypeScript and a production build for implementation changes. Browser
  inspection is the primary check for this artwork; add logic tests only if new
  non-trivial state or calculations require them.
- Check Chromium and a physical mobile browser when available. Record any device
  limitations and do not equate a resized desktop viewport with physical touch.
- Save before/after screenshots and compare scroll performance with the existing
  page. Measure any suspected regression instead of assuming SVG is always cheap.

## Risks

| Risk | Mitigation |
| --- | --- |
| Motion and GSAP overwrite the same transform | Assign ownership and use separate wrapper layers |
| New drawing effects compete with text | Animate only short decorative details; keep text outside drawings |
| Large filters or intricate paths become expensive | Prefer vector shapes, bounded detail and simple shadows |
| Scene layouts shift during loading | Reserve aspect ratio and dimensions in CSS |
| Pointer-only behaviour excludes phones | Separate viewport entrance from pointer parallax media conditions |
| Artwork suggests unverified services or premises | Use approved content and visibly illustrative, generic scenes |
| A broad refactor destabilizes the book | Keep changes in illustration components and their scoped styles |

## Decisions for review

Recommended first delivery: the London and online tuition illustration pair.
It provides a complete, useful visual improvement before spreading the style
through the rest of the page. No unanswered content question blocks this plan.
