# NEXA360 — The Book of Becoming

Cinematic educational website with London tuition and online learning.

## Run locally

    cd dist
    python -m http.server 8000

Open http://localhost:8000. No installation or build step is required.

## Source

- `dist/index.html`: semantic page structure and business content.
- `dist/style.css`: responsive layouts, masked reveals, blueprint animation and section motion.
- `dist/book.js`: custom WebGL renderer, double-sided curved page meshes, reading/transition cameras, text-only left pages, right-side GCSE student illustration, gold trophy and engraved plaque.
- `dist/app.js`: native scroll timeline, keyboard/drag controls, pathway dialogs and inquiry drafts.
- `dist/assets/student.webp`: original AI-generated illustrative student, used on the right-hand GCSE page.

The scroll timeline has seven states: cover, GCSE learning, competitive-exam ambition, cybersecurity, AI vision, robotics vision and recognition. Transitions take part of each interval; the remaining interval gives the chapter time to settle. The book closes before the informational sections. Essential narrative text remains live HTML.

AI/robotics are educational visions and the recognition trophy is symbolic. The inquiry form prepares a draft rather than sending messages.

## Validation

JavaScript syntax, HTML anchors/assets, seven-chapter navigation, keyboard/drag controls, pathway dialogs, inquiry drafts, WebGL-unavailable fallback, double-sided page UV/winding, finite geometry and trophy framing were checked. Interaction logic and render math were exercised at desktop and mobile dimensions. Browser visual QA was unavailable in the build environment; pixel-level appearance and device performance still need browser review.

## Generated asset

Student asset generated with the built-in image-generation tool and optimized as a transparent WebP.
Prompt: One fictional male student, about 17, medium brown skin, short dark curly hair, navy overshirt over a white T-shirt, dark blue trousers, white sneakers, carrying a blue notebook. Full-body relaxed pose, subtly turned toward the viewer, editorial studio lighting with a cool rim light, transparent background, no text or logos. The figure persists through learning, cybersecurity, AI, robotics and symbolic achievement.

## Page composition

Every left page contains only a large topic title and short explanatory text. Right pages carry the pop-out visuals. The robotics arm geometry and its right-page blueprint are preserved unchanged.

## Finishing details

Subtle paper grain, running heads and footer rules, binding bands, a soft shadow under turning pages, damped cursor tilt, per-chapter reading progress, focus states and short-viewport spacing refinements. The robotics geometry remains unchanged.

## Informational-site motion and layout

`dist/polish.css` and `dist/polish.js` refine the informational sections while preserving the book runtime and book markup. Native requestAnimationFrame scroll timelines provide word-level heading reveals, staggered pathway rows, layered initiative parallax, an education-to-opportunity line and active navigation. Layout measurements are batched before style writes, and reduced motion renders static text and visuals.

The mobile navigation supports focus, Escape dismissal and link selection. Footer navigation, delivery labels, inquiry field feedback and character counting complete the site. The existing draft-only inquiry behavior is preserved.

Navigation, scroll-effect state, desktop/mobile behavior, reduced-motion handling and form feedback were checked with a DOM harness. Browser visual QA remains unavailable in this environment.

## Logo introduction

`dist/intro.js` and `dist/intro.css` provide a short logo intro before the homepage. The supplied NEXA360 logo is preserved as `dist/assets/nexa-logo.png` and displayed in white using a CSS filter against the navy background.

The intro runs once per tab, honors reduced motion, supports Skip and Escape, preserves keyboard focus, and can be replayed from the footer. Deep links bypass the automatic intro. Its readiness timing and maximum timeout prevent an indefinite loader; page content is restored when the intro closes.

Auto-dismissal, reduced motion, skip/Escape, repeat visits, deep links, replay, focus restoration and delayed-loading behavior were verified with a DOM/timer harness. Browser visual QA remains unavailable.

## Contextual cursor and interaction details

`dist/motion.js` and `dist/motion.css` add a small desktop pointer with a softly following ring. Pathway rows show “Explore”; the book canvas shows “Drag”; links and buttons use an arrow state. Form fields, native dialogs, the logo intro, keyboard navigation, touch and reduced motion retain the native pointer. The cursor stops scheduling animation frames when settled and restores the native pointer on blur, hidden tabs or render failure.

Outside the book, the initiative visual responds with restrained perspective tilt and a pointer light, pathway graphics have a small magnetic response, initiative details reveal in sequence, and key CTAs have a brief hover light sweep. No scrolling is intercepted and no new animation framework is required. The book runtime, geometry and story markup remain unchanged.

The interaction harness verified context labels, contrast state, button press feedback, input/modal/intro fallback, touch and reduced-motion behavior, keyboard handling, idle frame scheduling, hover reset, reveal state and render-error recovery. Browser visual QA remains unavailable.

## GCSE-page logo placement

The right-hand GCSE page now shows the supplied NEXA360 logo instead of the student cutout. The renderer samples the original logo using cropped UVs and a navy ink mask, preserving its proportions and removing the white rectangle during rendering. The original PNG is unmodified. The non-WebGL fallback uses the same logo. Other chapter pop-outs, including the robotics arm, are preserved.


AI and tutoring refinement: replaced the AI cube with a processor and three connected neural layers. Pathways 04 and 05 now use distinct neural-network and robotic-arm SVG illustrations. Added supplied IGCSE/GCSE tutoring information, delivery formats, teacher details and parent feedback arrangements. AI and robotics remain labelled future visions. Robotics book geometry is unchanged. Node interaction and renderer-math checks passed at desktop/mobile dimensions; browser visual QA is unavailable in this managed environment.
