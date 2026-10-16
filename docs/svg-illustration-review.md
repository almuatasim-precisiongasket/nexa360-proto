# SVG illustration refinement — v3

## Delivered

- London desk/workbook and online laptop/notebook scenes share SVG paper, enamel,
  gold and radial ground materials. Each has two short decorative drawn details.
- A scoped GSAP hook controls one-time entrances on all pointer types. Desktop
  fine-pointer movement uses separate depth wrappers, with at most 6px travel
  before scene scaling. Transient motion resets on leave, blur, hidden tabs and
  leaving the viewport. Started entrances finish when the scene leaves view.
- The six service objects share these materials, registration marks and grounding.
  Their earlier global rotation/tilt listener was removed; motion ownership is
  local to ServiceIllustration. The folded cards and approved content remain.
- Seven section handoffs have a fading ink trace and a second fine paper edge.
  A discovered ambient-section selector was overriding their absolute positioning;
  the scoped override restores decorative positioning and removes the empty band.
- Products and Events use the same SVG materials and bounded entrances. The
  calendar has no highlighted date. Awaiting-content copy remains unchanged.
- Reduced motion uses the final composition, without entrance, drawing or depth
  animation. Server-rendered SVG is complete and visible before client animation.

No runtime dependencies were added. New materials and scene drawings are local
vector artwork. The custom Three.js book mechanics and controls were not changed.

## Ownership

- `components/illustrations/Materials.tsx`: gradients with caller-supplied useId.
- `lib/illustration-motion.ts`: scoped GSAP contexts, media conditions and cleanup.
- `components/TuitionScene.tsx`: original scene geometry and layer wrappers.
- `components/illustrations/ServiceIllustration.tsx`: service motion wrapper.
- `components/PathArt.tsx`: shared static object geometry, also used by illustrated
  book fallback; it does not own pointer listeners.
- `components/HoldingArt.tsx`: placeholder geometry and one-time entrance.
- `components/SectionHandoff.tsx`: scroll-linked paper edge and ink trace.
- `components/experience.css`: artwork sizing, materials and final-state fallbacks.

## Checks and evidence

- Lint, TypeScript and production builds passed for the implemented slices. The
  final build passed after the ambient stacking correction.
- Desktop review at 1440px confirmed the tuition pair, service cards, Products,
  Events and adjacent paper transitions.
- At 320px the document width was 305px, tuition scenes about 219px, service
  illustration frames about 232px and placeholder art about 268px. All fitted.
- At 390, 768 and 1024px, document widths were respectively 375, 753 and 1009px;
  sampled illustration bounds fitted. At the restored 870px viewport the document
  width was 855px. No lasting horizontal document overflow was observed.
- Both tuition enquiry links selected Academic tuition and their correct lesson
  format. No personal form data was entered or submitted.
- Enter opened service details, Escape dismissed them, and focus returned to the
  Explore button. Six service illustrations were present with unique SVG IDs.
- The mobile-width book's Next control advanced Cover to Academic. Native scroll
  advanced the book further to Cyber. Its source controls were not modified.
- All four drawing offsets settled to zero. Placeholder artwork settled at its
  original opacity values, including the faint blueprint layer.
- Generated HTML contained ten SVG entrance groups with no hidden inline styles
  and four complete drawing paths with zero dash offset.
- No browser console errors were observed. No permanent animation loops or new
  WebGL contexts are introduced by this illustration pass.

Saved review images (ignored build/review artifacts):

- `output/svg-tuition-desktop.jpg`
- `output/svg-services-desktop.jpg`
- `output/svg-events-transition.jpg`

## Practical limits

Browser checks used resized desktop Chromium. A physical phone, Safari,
screen-reader software and system-level reduced-motion toggling were not
available for this review. Reduced-motion media conditions and CSS final states
were reviewed in source. Pointer/observer cleanup was inspected in source;
retained-listener profiling was not performed.

Scroll review was qualitative. No before/after frame-rate, battery or GPU trace
benchmark is claimed. The scenes use bounded timelines, simple gradients and
small vector detail, with no persistent decorative drawing loop.

The existing book resize/scroll-refresh can interrupt an anchor journey started
immediately after changing viewport size. Navigation worked after the layout
settled. This book/navigation timing issue predates this illustration pass and
was not changed here.

Changes are saved locally on v3. They have not been pushed or deployed.
