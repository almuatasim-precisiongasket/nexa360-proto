# SVG illustration implementation tasks

Plan: [v3-svg-illustration-plan.md](v3-svg-illustration-plan.md). Implementation is complete locally on v3. Review limits
are recorded in `docs/svg-illustration-review.md`.

## Task 1: London tuition scene

Improve the existing London desk illustration with consistent paper/enamel
materials, a clear three-layer composition and a complete entrance behaviour.
Introduce only the shared frame/timing pieces this scene needs.

Acceptance criteria:
- [x] Workbook, pencil and architectural backdrop read clearly at 320px and desktop.
- [x] A bounded entrance and at most two drawn details work on touch and desktop;
      fine-pointer parallax resets cleanly, and reduced motion shows final art.
- [x] The London enquiry link remains visible, keyboard accessible and functional.

Verification: lint, typecheck, production build; browser review at 320, 390 and
1440px; reduced-motion and multiple-instance checks where supported.

Dependencies: none.
Likely files: `components/TuitionScene.tsx`, `components/experience.css`,
`lib/illustration-motion.ts`, optional `components/illustrations/IllustrationFrame.tsx`.
Scope: medium, 3–4 files.

## Task 2: Online tuition scene

Refine the laptop and notebook composition using the rules established by Task 1.
Use a simple lesson diagram, not fictional performance results or a fake tutor.

Acceptance criteria:
- [x] Online and London scenes share perspective, material treatment and timing.
- [x] The diagram draws once and remains clear without animation or hover.
- [x] Both tuition enquiry links select Academic tuition and the correct format.

Verification: lint, typecheck, build; inspect the pair at phone/tablet/desktop
widths, activate each enquiry, and inspect the form selections.

Dependencies: Task 1.
Likely files: `components/TuitionScene.tsx`, `components/experience.css`,
shared frame/timing files as needed.
Scope: medium, up to 4 files.

## Checkpoint: Tuition pair

- [x] Review screenshots, readable copy, stable layout and completed animation.
- [x] Confirm viewport scrolling and enquiry formats; reduced-motion handling reviewed in source.
- [x] No blocking runtime or layout regression observed before extending the style.

Tuition checks: lint, TypeScript and production build passed. Reviewed at 1440px
and 320px; both enquiry format selections verified. Drawing offsets settled to
zero and no console errors were observed. Physical touch and system-level
reduced-motion testing remain outside the available browser controls.

## Task 3: Service illustration consistency

Refine the six existing service objects to match the tuition pair. Keep the Cult
folded-paper cards and approved service descriptions, including future-vision notes.

Acceptance criteria:
- [x] All six objects use consistent grounding, perspective and colour treatment.
- [x] Each artwork transform has one owner; replace its earlier motion deliberately.
- [x] Title and Explore buttons still open the correct details with visible focus.

Service checks: lint, TypeScript and production build passed. Reviewed desktop
and 390px bounds for all six objects. Enter opened Academic details, Escape
closed the dialog, and focus returned to its Explore button. SVG IDs were unique
across the page, and no console errors were observed.

Verification: lint, typecheck, build; review all six cards, keyboard open/close,
mobile layout and focus restoration. Inspect pointer cleanup after leaving a card.

Dependencies: tuition checkpoint.
Likely files: `components/PathArt.tsx`, `components/SiteEffects.tsx`,
`components/experience.css`, shared illustration motion if needed.
Scope: medium, 3–4 files.

## Task 4: Paper handoffs

Polish the existing section edge and ink trace to connect the illustration style
across the page while retaining ordinary document scrolling.

Acceptance criteria:
- [x] Each boundary has a subtle continuous edge with correct adjacent colours.
- [x] The trace follows a bounded scroll interval and settles without hiding content.
- [x] Mobile and reduced-motion layouts retain complete, stable boundary geometry.

Transition checks: lint, TypeScript and production build passed. The existing
boundary geometry and surface inputs are retained; the second hairline and
fading ink gradient are decorative. Integrated browser review follows Task 5.

Verification: lint, typecheck, build; scroll across light/dark boundaries and use
navigation anchors after viewport resizing has settled.

Dependencies: Task 3.
Likely files: `components/SectionHandoff.tsx`, `components/experience.css`.
Scope: small, 2 files.

## Checkpoint: Main page flow

- [x] Review tuition, services and transitions together for consistent pacing.
- [x] Verify the existing book-to-content journey and navigation after layout settles.
- [x] Complete qualitative scroll review; no quantitative frame-rate comparison was performed.

The final transition review caught an inherited ambient-section stacking rule
that made decorative edges occupy document flow. The scoped override restores
absolute positioning for all seven edges and removes the unintended empty band.

## Task 5: Placeholder illustrations

Bring the existing products and events artwork into the same visual family with
one restrained entrance. Preserve their truthful awaiting-content status.

Acceptance criteria:
- [x] Pages and calendar have consistent depth and legible silhouettes.
- [x] Decorative artwork adds no product claims, dates or implied availability.
- [x] Both sections fit phone bounds; reduced-motion final-state handling is implemented.

Placeholder checks: final production build and lint passed. Desktop screenshots
reviewed; all art fits the 320px viewport. Product/event status copy is unchanged,
the calendar has no highlighted date, and entrances settle at their original
SVG opacity values. Reduced-motion behaviour was reviewed in source; a system
preference toggle was not available through the browser controls.

Verification: lint, typecheck, build; inspect placeholder copy and enquiry links
at 320, 768 and 1440px. Confirm illustrations stop after entry.

Dependencies: main-page checkpoint.
Likely files: `components/HoldingArt.tsx`, `components/experience.css`,
shared motion helper if needed.
Scope: small–medium, 2–3 files.

## Task 6: Final review and handoff

Review the completed illustration pass across the page and document practical
limits. Record source/module responsibilities and final screenshots.

Acceptance criteria:
- [x] Planned artwork and motion conditions are implemented; sampled widths have no overflow.
- [x] Navigation after layout settles, service dialogs, enquiry formats and book controls work.
- [x] Validation results and untested physical-device cases are recorded.

Verification: final lint, typecheck and production build; browser checks at
320/390/768/1024/1440px; reduced-motion review where supported; console and
performance inspection; physical phone check when available.

Dependencies: Task 5.
Likely files: `docs/implementation-notes.md`, `README.md`, scoped correction files
only if review finds issues.
Scope: small review task; split any substantial correction into its own slice.

## Checkpoint: Complete

- [x] Final review evidence is saved and the working changes are reviewable.
- [x] Completed implementation slices are saved on v3.
- [x] Publication is handled separately from the local visual refinement.
