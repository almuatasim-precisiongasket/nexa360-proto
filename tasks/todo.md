# SVG illustration implementation tasks

Plan: [plan.md](plan.md). Implementation is in progress on v3.

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
- [ ] All six objects use consistent grounding, perspective and colour treatment.
- [ ] Each artwork transform has one owner; replace its earlier motion deliberately.
- [ ] Title and Explore buttons still open the correct details with visible focus.

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
- [ ] Each boundary has a subtle continuous edge with correct adjacent colours.
- [ ] The trace follows a bounded scroll interval and settles without hiding content.
- [ ] Mobile and reduced-motion layouts show complete, stable boundaries.

Verification: lint, typecheck, build; scroll across light/dark boundaries and use
navigation anchors after viewport resizing has settled.

Dependencies: Task 3.
Likely files: `components/SectionHandoff.tsx`, `components/experience.css`.
Scope: small, 2 files.

## Checkpoint: Main page flow

- [ ] Review tuition, services and transitions together for consistent pacing.
- [ ] Verify the existing book-to-content journey and navigation still work.
- [ ] Compare browser scroll performance with the baseline and investigate regressions.

## Task 5: Placeholder illustrations

Bring the existing products and events artwork into the same visual family with
one restrained entrance. Preserve their truthful awaiting-content status.

Acceptance criteria:
- [ ] Pages and calendar have consistent depth and legible silhouettes.
- [ ] Decorative artwork adds no product claims, dates or implied availability.
- [ ] Both sections remain readable on phones and with reduced motion.

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
- [ ] All tasks and motion-contract conditions are satisfied without document overflow.
- [ ] Navigation, service dialogs, enquiry formats and book controls still work.
- [ ] Validation results and any untested physical-device cases are recorded.

Verification: final lint, typecheck and production build; browser checks at
320/390/768/1024/1440px; reduced-motion review where supported; console and
performance inspection; physical phone check when available.

Dependencies: Task 5.
Likely files: `docs/implementation-notes.md`, `README.md`, scoped correction files
only if review finds issues.
Scope: small review task; split any substantial correction into its own slice.

## Checkpoint: Complete

- [ ] Final review evidence is saved and the working changes are reviewable.
- [ ] Completed implementation slices are saved on v3.
- [ ] Publication is handled separately from the local visual refinement.
