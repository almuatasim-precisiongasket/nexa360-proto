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

## V2: paper, depth and deliberate movement

Book materials use a deterministic 64px grain texture, selective cover metalness
and roughness masks for the printed title/border, striped paper edges and a thin
cover wall following the page vertex normals. The interior remains rough paper.
The cover wall uses a separate untextured material; it does not require UVs.
Quintic turn easing produces a softer start/finish and a restrained curl.

The existing demand-rendered R3F canvas handles pointer light/camera response.
Desktop pointer motion eases toward a bounded target and invalidates only until
settled. Offscreen/hidden scenes stop requesting frames. Shadow maps are capped
at 512px for smaller canvases and 1024px otherwise; no post-processing or extra
WebGL canvas was added. Tablet composition now gives the book a larger area next
to the live HTML copy rather than a shallow strip below it.

SectionHandoff draws a paper edge between the existing section colors, with a
scroll-linked SVG light trace and a restrained glow (1.4s scrub smoothing). It
adds no pinning or input interception. Reduced motion shows static decoration.

TuitionScene uses three SVG layers: architecture/diagram background, desk/laptop
middle layer, and open book/learning notes in front. Fine-pointer devices reveal
layers over 1.6s with 0.16s staggering and respond with at most 12px parallax,
eased over 1.2s. Touch and reduced motion show the full static composition.
Entrance and parallax transforms are on separate wrapper elements. Text and
links remain fixed; enquiry preselection and native FAQ disclosures are retained.

References:

- https://threejs.org/docs/pages/MeshStandardMaterial.html
- https://r3f.docs.pmnd.rs/advanced/scaling-performance

## Expanded book framing

The book canvas now uses more of the desktop and tablet narrative area. Resting
views in wide canvases use an 8% closer camera; opening, page and closing turns
smoothly add distance and raise the camera target to accommodate upright leaves.
Tablet canvas height increases from 65% to 70%; desktop framing stays within the
right edge and reserves space for the chapter controls. The production build
passed and the academic resting spread was visually reviewed in the current
browser window. Preview: output/v2-book-expanded.jpg.

## Page mechanics refinement

The sheet surface now integrates equal-length strips across its width. The
spine remains fixed while the outer edge trails the hinge and each corner gets a
small differential twist. Hard covers use a rigid surface with the same turning
hinge. Paper curl relaxes as the sheet lands; it does not use radial stretching.

A critically damped progress response (frequency 18) adds short inertial settling
after input. The closed-form update caps frame delta, snaps direct jumps greater
than 1.2 chapters, and stops requesting frames below a position/velocity threshold.
The existing scroll timeline remains the input; no physics engine was added.

Pop-up objects are children of the book, so their bases follow the page plane.
They rotate up from the paper instead of squashing vertically. A soft gutter
strip reinforces the spine depth. Existing page-turn shadows remain active.
The production build and TypeScript passed; a partial turn was visually reviewed.
No automated tests were run, following the refinement prompt's instruction.

## Pop-out correction — 16 October 2026

Restored the pop-outs' previous world-space placement and upright orientation.
The last page-motion change parented them to the tilted book and folded their
whole geometry, which changed the approved objects' appearance. The established
vertical reveal is restored; the page curl and damped settling remain in place.

## Illustrated services — 16 October 2026

Service artwork is now original layered SVG, sharing the book's paper, blue and
brass materials. The existing fine-pointer GSAP tilt moves only the illustration;
card text remains steady. The previous CSS transform transition was removed from
these SVGs so it does not compete with GSAP. Coarse-pointer and reduced-motion
views retain static artwork. Products and Events artwork is static and decorative.
