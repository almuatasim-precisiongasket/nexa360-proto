# V4 Rive delivery

> Active planning direction: v5 business content and visual hierarchy, appended
> below. V4 items are preserved as history/follow-ups. The exploded system was
> removed at the user's request and must not be reintroduced by old tasks.

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

---

# V5 — Distinct education experiences (replanned 17 October 2026)

Status: public UI implemented locally; browser visual checkpoints remain open.
See `docs/v5-ui-review.md`. This replaces the earlier v5 checklist
for the same work. Earlier v4 tasks are historical; do not revive exploded views.
Plan: `tasks/plan.md`, v5 section. UI work is prioritised. Operational systems
remain listed at the end and do not gate visual implementation.

## V5.1 — Content and asset map

Description: account for all 15 supplied source sections and identify reuse,
public copy, pending evidence and future operations before rendering new content.

- [x] Five technical courses, GCSE, institutions and two developing products are mapped.
- [x] Existing assets and book-facing records are protected; missing art is identified.
- [x] Pending facts and old placeholder claims have explicit editorial decisions.

Verification: compare with the complete source and `docs/team-source.md`.
Dependencies: none. Scope: Small, 2–3 files.
Likely files: `docs/v5-content-map.md`, `lib/business-content.ts`, `tasks/plan.md`.

## V5.2 — Shared chapter tokens

Description: establish typography roles, shared alignment, chapter surfaces and
stable action styles within the existing brand and Tailwind/CSS stack.

- [x] Navy, cool studio, warm GCSE and product ink treatments have shared tokens.
- [x] Instrument Serif/DM Sans roles and responsive spacing are explicit.
- [x] Styles are scoped so the existing book and legacy sections are unaffected.

Verification: inspect a minimal rendered shell at 390px/1440px; typecheck.
Dependencies: V5.1. Scope: Small, 2–3 files.
Likely files: scoped v5 style module, shared chapter shell, existing token bridge.

## V5.3 — Institutional programme slice

Description: build the navy-wave section with four audiences, a learning network,
a programme brief, five-step process and consultation context.

- [x] Each audience updates specific content with no empty panel wait.
- [x] Existing wave remains calm; the new audience-responsive signal network adds a distinct visual moment behind stable labels/actions.
- [x] Consultation action carries audience/programme into the existing enquiry flow.

Verification: select all four audiences, follow the action, inspect phone stacking.
Dependencies: V5.2. Scope: Medium, 3–5 files.
Likely files: institutional component/styles, network artwork, content and composition.

## V5.4 — Technical studio with existing artwork

Description: build the five-entry course index and dark illustration stage using
one complete existing-art course first, then populate the approved records.

- [x] All five programme names are visible; detail opens locally without scroll capture.
- [x] Selected course has clear content, intended outcome/status and contextual enquiry.
- [x] On phones, artwork/detail appears inline with the selected labelled row.

Verification: switch courses rapidly, expand/close detail and inspect anchor stability.
Dependencies: V5.2/V5.3. Scope: Medium, 3–5 files.
Likely files: course studio, detail presentation, scoped styles, business records,
`components/Information.tsx` composition.

## Checkpoint A — Main business and technical contrast

- [ ] Institutional prominence is obvious and the first technical course feels distinct.
- [ ] Navy wave transitions into a light studio through a deliberate clean boundary.
- [ ] Desktop and phone screenshots show settled content with visible actions.

## V5.5 — Complete missing technical artwork

Description: add Game and ML illustrations in the existing visual language and
scope one-shot motion for the technical stage.

- [x] Game visual depicts a small world/player/goal without an unbuilt course claim.
- [x] ML visual demonstrates sample data and a boundary without claiming a live model.
- [x] Existing security/AI/robotics assets remain intact; one reused WebGL stage adds subject-specific data/light behaviour, with lighter phone rendering and a static fallback.

Verification: select every course, inspect static and animated output on desktop/phone.
Dependencies: V5.4. Scope: Medium, 2–4 files.
Likely files: new Game/ML artwork and scoped stage motion adapters/styles.

## V5.6 — Warm GCSE preferences

Description: rebuild the GCSE chapter around existing desk artwork, delivery,
tutor and group preferences, a persistent summary and consultation action.

- [x] Barking Riverside and Online are explicit, with no unsupported availability matrix.
- [x] International/UK/Premium and 1:1/proposed 1:5/proposed 1:20 are enquiry preferences.
- [x] Summary and enquiry preserve choices without invented pricing/subject inventories.

Verification: exercise each preference and CTA at desktop/phone; typecheck.
Dependencies: V5.2/V5.1. Scope: Medium, 3–5 files.
Likely files: `ProgrammeFinder.tsx`, `TuitionJourney.tsx`, `TuitionLead.tsx`,
scoped tuition styles and enquiry context module.

## V5.7 — Parent reporting within GCSE

Description: place one labelled sample session report below GCSE, demonstrating
individual feedback and the planned portal benefit.

- [x] Report shows topics, understanding, homework and next steps in a coherent view.
- [x] Individual reporting for students in groups is explained concisely.
- [x] Planned status and sample records are clear; no live portal/attainment claim.

Verification: inspect report at narrow widths and compare with source report fields.
Dependencies: V5.6. Scope: Small, 2–3 files.
Likely files: `ParentPreview.tsx`, GCSE composition and related scoped styles.

## Checkpoint B — Three consecutive service chapters

- [ ] Institutions, Technical and GCSE have different compositions, artwork and surfaces.
- [ ] Five course entries remain discoverable and GCSE choices remain understandable.
- [ ] New sections scroll naturally on phones; existing book files remain unchanged.

## V5.8 — Interactive AI product showcase

Description: implement a clearly labelled prepared lesson concept with audio-style
conversation, whiteboard steps and a human-oversight explanation.

- [x] Product is marked In development and the example is marked Sample workflow.
- [x] User can start/replay a deterministic explanation with readable transcript/stages.
- [x] Presentation does not imply a connected AI service or live supervising teacher.

Verification: play/replay, switch away/back and inspect phone layout and settled state.
Dependencies: V5.2. Scope: Medium, 3–4 files.
Likely files: AI showcase, sample lesson data/SVG, product styles and gallery shell.

## V5.9 — P2L vector showcase

Description: create a prepared circuit explanation with prompt, storyboard and
vector preview, using the source's product concept.

- [x] Prompt, preview and output story are understandable without autoplay.
- [x] Play/pause/replay works; example is explicitly prepared and product in development.
- [x] No unsupported first/cost/speed claims or actual generation implication.

Verification: pause/restart across stages, inspect vector scale and compare with AI panel.
Dependencies: V5.8. Scope: Medium, 3–4 files.
Likely files: P2L showcase, circuit scene/sample data, scoped product styles, gallery.

## Checkpoint C — Products have their own identity

- [ ] AI tuition and P2L have distinct interface mechanisms and accurate status.
- [ ] Product theatre differs clearly from warm GCSE and its planned parent portal.
- [ ] No generic flashcard/study-plan preview remains as an unsupported third product.
- [ ] Whiteboard/vector demonstrations have authored drawing and light/mask transitions; effects are built with the showcases.

## V5.10 — Compact About and five-market outlook

Description: create the white editorial company introduction and a small factual
market diagram/list, with a link to People.

- [x] International education and institutional focus appear in concise public copy.
- [x] Existing UK centre is separated from the four target online expansion markets.
- [x] Diagram has no invented offices, global counts or unsupported delivery coverage.

Verification: source comparison and phone text/diagram wrapping.
Dependencies: V5.1/V5.2. Scope: Medium, 2–4 files.
Likely files: About component, market artwork, business records and scoped styles.

## V5.11 — Documentary projects

Description: replace generic projects with the supplied India CSR and Crescent
College facts in an asymmetric documentary layout.

- [x] India programme duration/support and Crescent participation match the source.
- [x] Limited evidence yields a useful typographic layout with no fabricated outcomes.
- [x] Supplied photographs can be added later without rebuilding the story structure.

Verification: source audit and 390px/1440px layouts.
Dependencies: V5.1/V5.2. Scope: Small, 2–3 files.
Likely files: project component, project records and scoped styles.

## V5.12 — People and collaboration gallery

Description: refine the preserved portrait gallery and separate operating,
technical and collaboration roles using approved factual content.

- [x] Approved five names/roles/portraits remain accurate and visible on phones.
- [x] Unnamed founder bio and missing partner identities are not invented or assigned.
- [x] OFGA/Tutelr and personal employer relationships have explicit publication decisions.

Verification: compare sources; inspect portrait crops, role hierarchy and pointer depth.
Dependencies: V5.1/V5.2; pending content only blocks its own factual entries.
Scope: Medium, 3–4 files.
Likely files: `Team.tsx`, people/collaborator records, scoped styles, source note.

## V5.13 — Events bulletin

Description: implement a compact cobalt list that handles planned events and
can accept confirmed date/speaker/registration records later.

- [x] Planned topics/formats are useful without fake dates or a countdown.
- [x] Current action asks about upcoming events rather than confirming registration.
- [x] Confirmed records have slots for date, time zone, speaker and delivery format.

Verification: inspect no-dates state and a development-only confirmed-event fixture.
Dependencies: V5.1/V5.2. Scope: Small, 2–3 files.
Likely files: events component, event records and scoped styles.

## V5.14 — Shared contact UI

Description: finish conditional Institution/Individual intake with shorter
product/general paths, preselection and an editable request summary.

- [x] Relevant source fields appear in coherent groups and other fields stay out of view.
- [x] All section actions reach the correct form context without clearing entered contact data.
- [x] Submit/draft/loading/error wording reflects actual connected functionality.

Verification: institution, GCSE, course, product and event journeys; preserve input
across category changes and inspect phone submission/error layout.
Dependencies: V5.3/V5.6/V5.8/V5.9/V5.13.
Scope: Medium, 3–5 files.
Likely files: `Inquiry.tsx`, enquiry context/schema, scoped form styles and content.
Real delivery is a later integration requiring the recipient; no fake success.

## V5.15 — Opening and navigation alignment

Description: add official positioning and two immediate visitor routes around
the existing book; finish header destinations and legacy anchors.

- [x] Institution/family routes are visible before completing the book.
- [x] Approved white header/blue logo and book mechanics/assets remain intact.
- [x] Source-aligned surrounding copy and old hashes lead to useful content.

Verification: home entry, direct hashes, intro skip/replay, navigation and phone book
controls. Review book-facing data consumers before any content-only adjustment.
Dependencies: V5.3–V5.14. Scope: Medium, 3–5 files.
Likely files: `Header.tsx`, opening composition, `Information.tsx`, `BrandIntro.tsx`,
content-only book record edits if required. Split further if more files are needed.

## Finish passes distributed across V5.2–V5.15

- [ ] Four representative chapter compositions establish a coherent art direction.
- [ ] Typography wrapping, optical alignment and text measure receive a dedicated pass.
- [ ] Material texture, lighting, nested demo frames and portrait crops agree across sections.
- [ ] Reversed/repeated interactions, loading posters and state transitions remain composed.
- [ ] Two selected chapter handoffs receive authored visual continuity.
- [ ] Phone layouts preserve the design intent and lighter effects with natural scrolling.
- [ ] Final editorial reduction removes redundant copy, chrome and competing motion.

These are finish criteria within existing tasks, not a separate redesign after
implementation. See the detailed Finish passes table in `tasks/plan.md`.

## V5.16 — Whole-page visual and interaction review

Description: remove competing legacy content/effects and tune the complete
journey against the storyboard and motion score.

- [ ] Major chapters pass the screenshot distinction test; the wave, two additional WebGL moments, SVG/Rive demonstrations and bounded scroll reveals form a coherent motion system.
- [ ] No duplicate IDs, stale service links, hidden actions, clipped controls or new scroll capture.
- [ ] Source accuracy, existing-asset preservation and unresolved business inputs are documented.

Verification: 390px/1440px review plus 320px narrow check; all selection/enquiry and
product preview paths; typecheck, targeted lint, production build. State any real
browser/device verification unavailable instead of calling it complete.
Dependencies: V5.1–V5.15. Scope: Small targeted corrections, split if necessary.
Likely files: only files implicated by review; `docs/v5-ui-review.md`.

## Later operational systems — requirements retained

These are distinct delivery scopes after the public UI, not completed by concept
previews or silently removed from the supplied business requirements.

- [ ] Real enquiry receiver, storage/delivery, retry and sent confirmation.
- [ ] Event registration, registrant records and confirmation delivery.
- [ ] Tutor/parent/admin accounts, student links, tutor/session assignments.
- [ ] Every student's individual session report, including every group participant.
- [ ] Parent history, homework/recommendations and supported notifications.
- [ ] Admin missing reports, permissions, audit records and children's-data launch controls.
- [ ] Confirmed regional programme/pricing records and final legal/contact details.
