# Cult UI + Motion Primitives — v3

## Design

The book's paper palette carries into the six service cards using Cult UI's
folded-card geometry, masked border and SVG fold. The clipping is confined to
decorative surfaces so focus outlines and actual content are not clipped. The
existing service illustrations sit on larger, faintly gridded paper panels.
Fine-pointer hover and keyboard focus move the fold slowly; touch users see a
static fold and can use the same visible Explore button.

Section headings now use a focused adaptation of Motion Primitives TextEffect.
Word segments share a 1.5-second ease with a 95ms stagger and sequential line
delays. Each heading reveals once per mount. Server HTML retains visible text;
client effects prepare the offscreen animation. Reduced-motion CSS and the
media-query hook restore visible, unblurred text. Existing heading labels and
typographic styles remain in use. Motion owns the word transforms; the previous
GSAP word animation was removed. GSAP still owns the site's other transitions.

No new runtime dependencies were required. Components use the existing Motion,
Tailwind and class-merging helpers. Official sources and MIT notices are in
THIRD_PARTY_NOTICES.md; the Cult registry URL is recorded in components.json.

## Verification

- Lint, TypeScript and the production build passed.
- Desktop review at 1440px confirmed six folded cards, readable text, heading
  completion, focus outlines and service dialog open/close behaviour.
- Mobile review at 390px confirmed card text wrapping and the Explore action.
- The academic dialog's enquiry action selected Academic tuition in the existing
  form and focused the name field.
- At 320px the card width was about 268px and the document width was 305px,
  fitting within the viewport. Heading words were fully visible after reveal.
- No browser console errors observed. Physical touch devices, system-level
  reduced-motion emulation and screen-reader software were not tested.

The existing viewport-resize/scroll refresh can interrupt an anchor journey
while the book's pinned timeline is being recalculated. The services anchor
settled correctly after the viewport had stabilized. Book code was not changed
as part of this visual refinement.
