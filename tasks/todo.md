# V4 Rive delivery

Plan: [plan.md](plan.md).
Evidence and limits: [implementation notes](../docs/v4-rive-learning-desk.md).

## Completed first delivery

- [x] Verify the official Windows CLI download and keep tools project-local.
- [x] Compile, inspect and render a script-free data-binding proof.
- [x] Author original GCSE, A Level and entrance-exam desk compositions.
- [x] Preserve editable RML, the generator and three matching SVG posters.
- [x] Verify the final asset with zero errors/warnings and inspect problems.
- [x] Load the compiled asset in the actual browser Canvas2D runtime.
- [x] Connect native programme controls to current view-model data binding.
- [x] Share selection with the finder and preserve enquiry transfer.
- [x] Reserve layout and lazy load the runtime near the illustration.
- [x] Retain the correct poster until a valid frame and on asset failure.
- [x] Implement static reduced motion and hidden/offscreen lifecycle handling.
- [x] Verify animation settles, selection restarts it and rapid/keyboard changes work.
- [x] Check layouts at 320/390/768/1024/1440px; phone controls are at least 44px.
- [x] Check the programme-to-enquiry flow and an unavailable-resource fallback.
- [x] Self-host matching WASM, include its official MIT notice and record payload.
- [x] Add a reproducible source-to-asset command and save review screenshots.
- [x] Pass lint, TypeScript and production build.

## Practical follow-up

- [ ] Check actual iPhone/Safari and Android/Chrome; devices unavailable here.
- [ ] Independently exercise reduced motion, tab backgrounding and remounts;
      these branches were reviewed in source but not automated in this session.
- [ ] Profile browser transfer/frame cost against the SVG baseline on real devices.
- [ ] Confirm current authoring/export terms before production publication.
- [ ] Investigate the intermittent existing GSAP startup/refresh error recorded
      in the implementation notes if it recurs.

The optional diffusion teaching diagram is deferred pending the pilot review.
No production publication is part of this delivery.

---

# V4.1 cinematic motion delivery

The existing Rive follow-ups above remain open and are not removed by this
extension. Detailed design intent: [plan.md](plan.md).

## Task 1: Record the motion baseline

**Description:** Capture the current scroll map, active animation owners and
production performance before changing choreography.

**Acceptance criteria:**
- [ ] Record Rive, Motion and GSAP lifecycle behavior at desktop and mobile widths.
- [ ] Record current CLS, long tasks and representative frame timing around Our Products.
- [ ] Identify every transform wrapper that later tasks may own.

**Verification:**
- [ ] Manual check: complete the page once with mouse, keyboard and phone viewport.
- [ ] Save measurements and screenshots in ignored `output/` with notes in `docs/`.

**Dependencies:** None

**Files likely touched:** `docs/v4-motion-review.md`

**Estimated scope:** Small

## Task 2: Prototype the exploded learning system

**Description:** Add one reversible, scroll-driven separation of Tutor,
Flashcards, Study Plan, progress and interface planes that assembles into the
existing Learning Tools studio. Leave the Three.js book unchanged.

**Acceptance criteria:**
- [ ] Layers separate and assemble without jumps, clipping or transform drift.
- [ ] The assembled studio has one stable set of interactive controls.
- [ ] Mobile and reduced-motion variants preserve natural scroll and complete content.

**Verification:**
- [ ] Production build and lint succeed.
- [ ] Manual check: scrub forward/backward through Our Products at 390 and 1440px.
- [ ] Compare restrained and pronounced strength captures before choosing one.

**Dependencies:** Task 1

**Files likely touched:** `components/tuition/LearningSystemExploded.tsx`,
`components/tuition/LearningExperience.tsx`,
`components/tuition/tuition-experience.module.css`

**Estimated scope:** Medium

## Checkpoint: Signature motion

- [ ] Review the exploded sequence before applying the motion language elsewhere.
- [ ] Confirm the Three.js book is unchanged and the product controls remain usable.

## Task 3: Upgrade handoffs and pathway assembly

**Description:** Extend the existing paper seam into reusable light, dark and
blueprint handoffs, then assemble existing pathway SVG layers on entry.

**Acceptance criteria:**
- [ ] Major surface changes feel continuous without changing layout height.
- [ ] Each pathway assembles once and retains stable link/focus behavior.
- [ ] Mobile uses shorter distances and no pointer parallax.

**Verification:**
- [ ] Manual check at 320, 768 and 1440px with forward and reverse scrolling.
- [ ] Keyboard check: every pathway remains operable and visibly focused.

**Dependencies:** Task 2 checkpoint

**Files likely touched:** `components/SectionHandoff.tsx`, `components/PathArt.tsx`,
`components/Pathways.tsx`, `components/site.css`

**Estimated scope:** Medium

## Task 4: Refine product and dashboard motion

**Description:** Connect the assembled product diagram to shared-axis tool
transitions, then add a one-time dashboard-row reveal.

**Acceptance criteria:**
- [ ] Persistent studio chrome remains still while selected content transitions.
- [ ] Tool changes and dashboard tabs respond immediately and keep focus stable.
- [ ] Rive lifecycle and section height refresh behavior remain correct.

**Verification:**
- [ ] Manual check all tool and parent tabs by mouse, keyboard and touch viewport.
- [ ] Confirm rapid tool switching settles on the latest selection.
- [ ] Production build and lint succeed.

**Dependencies:** Task 3

**Files likely touched:** `components/tuition/LearningPreview.tsx`,
`components/tuition/ParentPreview.tsx`,
`components/tuition/tuition-experience.module.css`

**Estimated scope:** Medium

## Checkpoint: Content motion

- [ ] Read every animated section at normal scrolling speed without waiting for copy.
- [ ] Confirm interactive controls do not move while focused or being typed into.

## Task 5: Finish team, projects and contact

**Description:** Refine the existing team-card entrance, add measured depth to
the project artwork and reveal the contact area with one final paper fold.

**Acceptance criteria:**
- [ ] Team hover behavior remains unchanged after the entrance settles.
- [ ] Project motion stops offscreen and contact form fields remain stationary.
- [ ] No new loop competes with the existing ambient field.

**Verification:**
- [ ] Manual forward/reverse scroll check at desktop and mobile widths.
- [ ] Keyboard check through the complete contact form.

**Dependencies:** Task 4 checkpoint

**Files likely touched:** `components/Team.tsx`, `components/SiteEffects.tsx`,
`components/Information.tsx`, `components/site.css`

**Estimated scope:** Medium

## Task 6: Whole-page performance and accessibility pass

**Description:** Measure the combined experience, tune or remove expensive
effects, and verify cleanup and reduced-motion behavior before publishing.

**Acceptance criteria:**
- [ ] No animation-related layout shift and no duplicate triggers/listeners after remount.
- [ ] Reduced motion presents complete static content across the page.
- [ ] Heaviest motion meets the targets recorded in the plan or deviations are documented.

**Verification:**
- [ ] Lint, typecheck and production build succeed.
- [ ] Browser console has no runtime errors through a complete journey.
- [ ] Check 320, 390, 768, 1024 and 1440px plus available physical phones.

**Dependencies:** Task 5

**Files likely touched:** Motion files from Tasks 2–5 and `docs/v4-motion-review.md`

**Estimated scope:** Medium

## Checkpoint: Ready for review

- [ ] Compare the final journey with the Task 1 baseline.
- [ ] Remove any effect that repeats too often, delays reading or misses the frame budget.
- [ ] Obtain visual approval before committing, pushing or deploying the motion release.
