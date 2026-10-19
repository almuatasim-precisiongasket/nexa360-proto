# V5 implementation review

Date: 17 October 2026. Branch: `v5`.
Local preview: http://127.0.0.1:3002/

## Choreographed motion direction (19 October)

The supplied creative-technology reference is translated into a single motion
score, recorded in `v5-motion-direction.md`. New chapter motion covers a drawn
book-to-offer signal, responsive SplitText line reveals, independently triggered
surface shots, desk/robot depth, network tracing, a process rail, restrained
primary arrow response and a final footer handoff. The parent chart now draws
when visible rather than during the offscreen book opening.

The book and asset files remain unchanged. Interactive state retains its Motion
ownership. Legacy generic reveals skip the new authored groups; volatile/dynamic
content is excluded from static listener registration. Existing native scrolling
and pin ownership are retained; no library, canvas or service-section pin is added.
Phone and reduced-motion variants simplify the score. Browser visual inspection
remains unavailable under the existing session restriction.

Revision checks: TypeScript, production webpack compilation and full lint pass
(zero errors/warnings). The generated page retains the book first and readable
headings, with seven chapter scenes, nine surface shots, two depth layers, one
branching signal, one network trace and one process rail. There are no duplicate
IDs or missing local link targets. Actual motion/device timing is not visually
verified. No tests were added or run for this revision.

## Whole-site discovery refinement (18 October)

- Gateway has five direct subject shortcuts which select the corresponding
  course studio content; the fallback anchor still reaches the course section.
- A distinct organisational programme entry is visible without changing the
  audience finder. Desktop learning-card actions share a common lower edge.
- A category-based questions browser addresses tuition, skills and institutions
  before consultation, with relevant detail links and contextual enquiry actions.
- Consultation keeps contact details and requirements visible while optional
  learning preferences use native progressive disclosure. Prefilled choices remain
  in the draft and visible summary. Neutral surfaces replace the form's pale-blue
  emphasis.
- Initial hash destinations settle after fonts and the book's pinned layout are
  refreshed. User input cancels this initial repositioning; Back/Forward hash
  restoration does not add another history entry. Real-browser behaviour remains
  unverified under the session's browser restriction.

The book-first opening, original media, parent dashboard, blue wave and existing
programme truthfulness remain intact. No new dependency or service was added.

Revision checks: production compilation/TypeScript pass; full lint reports zero
errors/warnings. Scoped CSS references resolve. Generated HTML has the opening
book, questions, course shortcuts and parent portal, with no duplicate IDs or
missing local link targets. The refreshed preview returns HTTP 200 with the new
content. Browser/device appearance and actual interactive timing remain
unverified. No new tests were added or run.

## Parent portal preview redesign (18 October)

The previous small session-report card is replaced by a full-width, isolated
dashboard component. Navy framing and ivory/neutral surfaces follow the user's
colour direction. Four views cover Overview, Lesson reports, Homework and
Attendance. Sample reports include objectives, understanding, strengths, tutor
feedback and a recommended next step. Attendance rows open their own report;
homework completion updates the Overview count; Reset restores the sample.

The confidence chart illustrates three prepared tutor observations, not grades
or predicted outcomes. All learner/session/task data is clearly labelled sample
data. Interactions remain local; no accounts, child records, persistence or
operational portal are claimed. On narrow screens all four navigation choices
are visible in a two-column grid. Existing assets, book and tuition preferences
are unchanged. Browser/device visual inspection remains unavailable as noted
below.

Revision checks: production compilation and TypeScript pass; full lint has zero
errors/warnings. Generated HTML includes the four tabs, parent-portal anchor and
sample-data disclosure, with no duplicate IDs or missing local targets. Scoped
CSS references resolve. Refreshed local page returns HTTP 200 with the new
dashboard. No new tests were added or run.

## Latest correction: book-first opening and deeper blue (18 October)

User-directed order: original 3D book first, then service gateway and the learning
sections. The optional duplicate book is removed. Header/footer home links return
to the opening book; Skip story lands at the service gateway. Book physics and
assets remain unchanged. The skills route now uses deep navy; the skills chapter
uses a neutral surface instead of pale blue. The animated canvas now declares
straight-alpha compositing to match its fragment shader, preventing transparent
pixels from brightening the whole card into cyan.

## Service clarity and navigation revision (18 October)

The user found the previous page confusing. This revision supersedes the earlier
opening/order below; it keeps the blue motion language while putting services first.

| Problem | Current implementation |
| --- | --- |
| First visit does not explain what NEXA360 offers | Two illustrated routes: GCSE tuition and technology skills, with audience, delivery and subject context |
| School learning blends into technology training | Warm paper GCSE chapter; pale blue five-course studio; separate dark organisational chapter |
| Navigation uses broad company labels | GCSE Tuition, Skills Courses, For Organisations, About, persistent Book Consultation |
| Finding a starting point requires browsing the whole page | Three-way audience finder with a direct recommended destination |
| Consultation calls to action lose context | GCSE preferences/course/institution selection prefill the relevant request; switching service clears incompatible preferences |
| Motion feels decorative | Five small interactive subject samples, selectable report views, audience briefs and responsive selection feedback |
| Too many equal-weight chapters compete | Services and consultation first; company information grouped into four tabs; product concepts and the preserved book open on demand |
| Intro depends on book readiness | Public entry renders immediately; original book runtime only mounts after opening it |

The interactive examples are illustrative website samples, not live AI or a
claim about final curriculum. Existing assets and book physics are unchanged.
The source-driven parent portal and products remain labelled as planned/in
development. Narrow phone layouts use compact stacked service routes with readable
copy rather than squeezing the two cards into tiny columns.

Global entrance effects exclude the dynamically replaced company/product panels;
those use local Motion feedback. This avoids triggers attached to removed panels.
The booking destination remains a requested business input: draft preparation is
still explicitly local and no appointment or sent confirmation is fabricated.

Current checks: TypeScript and the production webpack build passed; full ESLint
has zero errors/warnings. Generated HTML has no duplicate IDs, missing local link
targets or missing expected service anchors; CSS module references resolve. The
refreshed local preview returns HTTP 200 with the new gateway, course sample and
consultation markup. Logo and desk artwork requests succeeded. No new tests were
added or run for this revision. Real visual/touch review remains open below.

## Earlier editorial redesign

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

### Motion and WebGL refinement

Skills applied: `review-animations` and its standards, `webgl-components`, the
previously loaded design/UI guidance and animation construction guidance.

| Before | After | Why |
| --- | --- | --- |
| Direct sculpture pointer rotation | Frame-rate-independent damping in `Sculpture.tsx:47` | Preserve momentum and avoid abrupt changes |
| Direct-light-only metallic surface | Original generated studio reflections, with disposed PMREM target | Give the cobalt material coherent highlight and depth without external assets |
| Shader mode transition passed through unrelated subjects | Five smoothly blended field weights in `VisualField.tsx:130` | Transition directly between the chosen subjects |
| Reduced-motion canvas did not repaint after a selection | Explicit invalidation and settled weights | Keep the still image consistent with the selected subject |
| Static foreground course artwork | Critically damped, fine-pointer depth and one exhibit sweep | Make artwork responsive without moving the explanatory text |
| 500–550ms audience UI transitions | 250ms control/content feedback | Keep repeated choices responsive while explanatory artwork remains slower |
| Thin, barely visible section lines | Two SVG optical seams with scroll-linked drawing | Make chapter changes deliberate without new canvas contexts or scroll capture |
| Whole-group heading fade | Nested masked headline reveal | Give rare editorial entrances a clear hierarchy |
| Decorative P2L storyboard labels | Selectable prepared-example stages in `Products.tsx:234` | Let visitors inspect the mechanism without waiting for the entire replay |

Code-level verdict: **Approve** within the inspected scope. Marketing artwork
and rare heading entrances intentionally exceed 300ms; control feedback stays
short. The existing static/reduced-motion paths, visibility pause and GPU
cleanup remain in place. Full lint, TypeScript and production build pass.
Visual/GPU output and actual device timing are not approved without the browser
inspection described under Verification limit.

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

## V5.22 — Lenis coordination

Applied both installed cinematic motion skills. Added Lenis 1.3.27 on fine-pointer
desktops only, synchronized to GSAP's existing ticker and ScrollTrigger. Shared
scroll ownership now covers section links, chapter controls, skip-story and
parent-panel positioning. User input can interrupt navigation; phones retain
native scrolling. Existing book physics, palette and assets are unchanged.

TypeScript and lint passed (zero errors/warnings). Production compilation passed.
Actual visual pacing, wheel behavior and phone interaction have not been browser
verified because browser access was previously blocked in this session.

## V5.23 — connected learning scenes

Added three scroll-drawn ribbon chapter bands, a three-step tuition story with
original layered SVG, a selectable worked mathematics example, and desktop chapter
navigation. The story previews how learning and parent feedback connect without
claiming live student records. Phones use stacked copy and explicit step controls;
reduced-motion users see settled artwork. The existing blue waves now respond
subtly to scroll speed and course art changes settle faster (350ms).

TypeScript, production compilation and lint passed. Generated-page checks found
three learning beats, three ribbon transitions, no duplicate IDs and no missing
anchor targets. The book remains first. Actual browser rendering, scroll timing,
GPU output and phone gestures remain visually unverified in this session.
