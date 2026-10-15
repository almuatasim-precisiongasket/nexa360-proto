# NEXA360 motion direction

Movement follows an editorial rhythm: arrive, settle, read, then transition.
Large reveals use long ease-out curves. A deliberate scroll range gives each
book spread reading space. Hover and focus feedback stays responsive.

Aceternity UI references inform four further local adaptations: moving SVG
borders around tuition choices (12s), background beams behind the team heading
(18s), tracing rails following scroll through About/Tuition (1.4s smoothing),
and pointer-directed conic edge lighting on team cards. Repeating SVG animations
pause offscreen and when the document is hidden; reduced motion disables them.

Tuition commitments use an Aceternity-style bento composition with a shared
Motion hover highlight. Pathway highlights also share layout transitions;
these use the `domMax` feature bundle needed for layout projection. Decorative
initiative layers move in opposite directions in response to a fine mouse
pointer, with 1.2–1.4s easing and no perpetual animation loop. Content and
interactive hit areas remain stationary. Touch retains the full static layout.

## Ownership

| Layer                             | Runtime                            | Treatment                                                              |
| --------------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| Book narrative                    | GSAP + R3F/Three.js                | 16 viewport heights desktop, 14 smaller screens; 1.25s scrub smoothing |
| Chapter controls                  | GSAP ScrollTo                      | 1.9s, power3.inOut                                                     |
| Section links                     | GSAP ScrollTo                      | 1.8s, power3.inOut; interruptible; focus moves to destination          |
| Headings                          | GSAP                               | 1.5–1.8s, 85–120ms word staggering                                     |
| Pathways and editorial content    | GSAP                               | 1.3–1.6s, staggered details                                            |
| Active navigation marker          | Motion (Framer Motion), LazyMotion | Shared layout marker, 1s                                               |
| Pathway dialog                    | Motion + native dialog             | 1.35s entrance, 0.65s exit; native keyboard/focus semantics            |
| Inquiry result                    | Motion                             | 1.3s reveal; truthful local draft behavior retained                    |
| Hover lighting, colors and arrows | CSS + GSAP                         | 0.8–1s, stable interactive hit areas                                   |
| Shiny text                        | GSAP                               | Single 4.5s sweep                                                      |
| Ambient ribbons                   | WebGL shader                       | Slow layered curves; eased pointer response and slight scroll drift    |

GSAP and Motion never own the same animated property on the same element.
Motion uses the current `motion` package and `motion/react-m` with LazyMotion.
The ambient shader is original, separate from the React Bits adaptations.

## Resource and accessibility behavior

Ambient canvases initialize only when their sections first enter the viewport.
They render at at most 30fps with a capped backing resolution, stop offscreen
and when the tab is hidden, and release shaders/buffers on unmount. Shader or
context failures leave the existing CSS atmosphere available. No ambient canvas
intercepts a pointer event or covers the section content.

Reduced motion removes ambient WebGL and bypasses entrance movement, shine,
sparks and animated interface transitions. Text stays in live HTML. The book's
illustrated view and direct chapter navigation remain available.

## Magic UI refinement

Free Magic UI patterns are adapted to the site's palette and timing. The main
academic enquiry link uses an expanding blue dot and two visual label layers
(only one accessible label) over 0.95–1.15s; keyboard focus gets the same feedback.
The team background now uses Animated Grid Pattern instead of Background Beams:
18 deterministic cells pulse over 14s, with animations paused offscreen and when
hidden. Reduced motion shows a static grid. Team data and portraits are unchanged.
The 2px navigation progress line uses a Motion value updated by the header's
existing rAF-throttled scroll listener, measured from About to the page end.
The book retains its separate chapter navigation. No extra runtime packages.

## Team beams and typography — 15 October 2026

Installed the official Aceternity Background Beams via the user-requested shadcn
CLI command. Added components.json with the Aceternity registry and existing
project aliases. The installed component is tailored to the site's CSS and
Motion runtime without adding Tailwind or resetting global styles. It replaces
the Magic UI grid in Team. Motion gradients use deterministic 24–34s cycles,
unique SVG IDs, offscreen/hidden stopping and a static reduced-motion state.

Team heading and names now use the locally served DM Sans font at medium weight.
Roles use 11–12px sentence case, with improved line height and spacing. Existing
approved identities, images and monograms are retained.

## Website clarity pass — 15 October 2026

Added Tuition to the main navigation and capped mobile menu height with scrolling
for shorter viewports. London and online lesson cards now have distinct color
identities, larger copy, consistent DM Sans titles and stable enquiry hit areas.
Tuition commitment titles also use DM Sans to match the interface typography.

Added four native disclosure questions within Tuition, covering existing format,
qualification and progress details and the truthful local enquiry-draft workflow.
The disclosures share a native name group, support keyboard interaction, and fade
answers in over 0.85s (static under reduced motion). Their toggle refreshes
ScrollTrigger measurements after the layout changes.

Removed SiteEffects' duplicate entrance tween for the team cards. Team.tsx owns
their entrance, avoiding two GSAP tweens controlling the same transform/opacity.
