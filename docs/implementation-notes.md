# Next.js implementation notes

## What changed

The working application now lives in `app/`, `components/`, `lib/` and `public/`.
The supplied static site in `dist/` remains a source/visual reference. The original
README is preserved in `docs/legacy-static-site.md`.

- Next.js 16.4.1 / React 19.3.1 / TypeScript, with locally served DM Sans and
  Instrument Serif fonts.
- GSAP 3.15.0 plus its React integration owns the pinned narrative, navigation
  scroll positions and scoped editorial reveals.
- React Three Fiber 9.8.2 and Three.js 0.185.1 render the curved, double-sided
  book. Three.js is pinned to a compatible renderer release. R3F's internal
  Three.Clock usage may still emit an upstream deprecation warning.
- The approved robotics positions/dimensions/rotations and academic logo crop
  were ported from the supplied renderer.
- Page textures and props are generated when needed. Demand rendering stops
  scheduling frames once the scene settles. Reading states have no perpetual
  bobbing, light sweep or pulsing.
- A native HTML illustrated view appears while the 3D module/fonts/assets load,
  when WebGL fails, and for reduced motion. A visitor can also select it directly.
- The information, tuition commitments, Tutelr collaboration and future-vision
  labels remain available in prerendered HTML. Inquiry drafts require JavaScript;
  the form stays disabled before hydration so it cannot accidentally submit
  personal information in a URL.

The word reveal adapts React Bits' technique. Its global trigger cleanup was
replaced by component-scoped cleanup. Pointer light and magnetic arrow details
use small, project-specific implementations. See `THIRD_PARTY_NOTICES.md`.

Further React Bits adaptations add BlurText-style word reveals to the tuition
and collaboration headings, AnimatedContent-style pathway row entrances with
staggered details, and TiltedCard-style pointer rotation on decorative pathway
illustrations. They reuse GSAP without adding a second animation runtime. The
tilt is restricted to fine mouse pointers and motion-enabled visitors; all new
reveals are bypassed for reduced motion and leave server-rendered text intact.

The pathway presentation now includes persistent illustrated chapter previews
on mobile/tablet, explicit exploration cues, and a navy desktop hover state.
The initiative artwork adds a one-time 8×8 pixel reveal and scroll-linked orbital
movement. These decorative additions use the same scoped GSAP context and do
not add a continuous rendering loop.

ClickSpark-style cyan bursts respond to primary action/chapter clicks, including
keyboard activation. At most four short bursts can coexist; listeners and tweens
clean up on unmount and when reduced motion is selected. Forms and dialogs are
excluded. BorderGlow-style lighting frames the header contact link and
collaboration panel. ShinyText sweeps once over the closing “open book” message,
with readable reduced-motion and forced-color fallbacks.

## State ownership

`BookStory` owns a single GSAP playhead. Scroll, chapter buttons, keyboard arrows
and horizontal drag all navigate through that same scroll range. A stable ref
passes transient progress and the renderer invalidation callback to the canvas;
React state changes only when a chapter or UI state changes.

`storyFrame()` is deterministic in both directions. `deformPage()` retains the
spine-attached paper formula and correct static left-page UV orientation. Each
turn uses separate front and back textures.

CSS smooth scrolling is disabled globally because it conflicted with GSAP's
ScrollToPlugin. Explicit user actions such as Skip Story use native smooth
scrolling unless reduced motion is requested. The book tween uses a fixed
`fromTo` range so a resize cannot change its starting progress.

The book uses 16 viewport heights of scrolling on desktop and 14 on smaller
screens. A 1.25-second scrub softens wheel/trackpad input;
chapter controls move over 1.9 seconds and text enters over 1.4 seconds. This
gives each spread a longer reading pause and a more deliberate page turn.

The full motion pass adds Motion 14.2.0 (Framer Motion's current package) for
interface transitions and original ambient WebGL ribbons in the initiatives,
collaboration and contact sections. See `motion-design.md` for timing ownership,
reduced-motion behavior and rendering limits.

## Validation recorded during implementation

- Production build completed and prerendered `/` successfully.
- Five Node tests passed: chapter reading positions, forward/reverse state,
  opening/closing bounds, finite geometry/spine attachment, page normals/UVs.
- TypeScript compilation and ESLint checks passed before the final UI refinements;
  final verification is recorded in the handoff below.
- Real Chromium in-app browser review covered desktop 1440×900, mobile 390×844
  and narrow/short mobile 320×640. No horizontal overflow was observed.
- Visually reviewed academic logo, competitive ambition, cybersecurity, AI,
  approved robotics and recognition scenes. Initial trophy lettering was too
  small; it was replaced with a correctly proportioned canvas plaque texture.
- Direct forward/reverse jumps, keyboard chapter movement, illustrated view and
  restoring 3D, mobile menu/Escape, Skip Story focus, pathway dialog and inquiry
  preselection were exercised.
- A synthetic inquiry using Test Learner / test@example.com prepared a truthful
  draft. Copy succeeded and a text draft downloaded. Nothing was sent to a
  message delivery service.

## Limits and maintenance

Cross-browser Safari/Firefox and physical-touch device testing have not been
performed. Reduced-motion media handling and WebGL context-loss behavior are
implemented; forced OS/media emulation and an actual context-loss event were
not exercised through the available browser tools. The user-selectable
illustrated view exercises the shared HTML fallback and chapter controls.

Core Web Vitals targets have not been certified. Development preview timing is
not a production field measurement; no LCP/INP/CLS success claim is made.

The production dependency audit reported zero vulnerabilities. The full audit
reported five high findings through the development-only Next.js ESLint plugin's
fast-glob → micromatch → braces chain. The registry's latest braces was 3.0.3,
which the advisory includes; an upstream-compatible patch was not available.
The suggested forced downgrade of eslint-config-next was not applied because
it would substitute an older major framework lint configuration. Recheck the
development audit when upstream publishes a patch.

Context7 was connected and used for current framework, GSAP React and R3F docs.
The other MCP servers in `mcp-research.md` remain optional recommendations;
they were not added to global configuration.

## Magic UI refinement — 15 October 2026

Adapted the free Interactive Hover Button for the main academic enquiry link,
Animated Grid Pattern for the team backdrop, and Scroll Progress for a reading
line under the navigation. Official sources and the MIT license are recorded in
THIRD_PARTY_NOTICES.md. No additional dependencies were installed.

The grid replaces the team's previous Background Beams layer, uses deterministic
cells and pauses offscreen/hidden. The enquiry keeps its Academic tuition event,
anchor navigation and focus target. All changes remain on the existing page.
The optimized production build completed successfully; the preview was restarted
on 127.0.0.1:3000 and the rendered tuition area was visually reviewed.

## Website refinement — 15 October 2026

Added direct Tuition navigation, distinct London/online cards, larger tuition
copy and consistent interface headings. Added an accessible tuition FAQ using
native details/summary and existing approved information, including an explicit
explanation that the contact form creates a local draft. Removed the duplicate
team entrance tween from SiteEffects; Team.tsx retains its scoped animation.

The optimized production build completed successfully. The preview was restarted
at 127.0.0.1:3000. The tuition cards were visually reviewed at the current narrow
browser viewport and a screenshot was saved in output/website-refinement.jpg.

## V2 visual refinement — 15 October 2026

The book now uses cloth grain, selective cover foil, warm layered page edges,
a cover wall following its geometry, softer lighting and quieter turn easing.
Pointer-responsive light/camera movement uses the existing demand-rendered canvas.
The tablet book composition now reserves a larger area alongside the live text.

Seven section handoffs add curved paper edges and scroll-linked light traces.
Tuition's London and online illustrations now use three separate SVG depth
layers with scoped desktop parallax; the existing enquiry selection is retained.
Wider tablets show both lesson formats side by side. No new dependencies added.

Production compilation and TypeScript completed successfully for the book stage
and the integrated implementation. Visual review used the current browser window
at approximately 870 CSS pixels wide; cover and academic-spread screenshots are
saved in output/v2-book-cover.jpg and output/v2-book-spread.jpg. The screenshots
are local review artifacts and are excluded by .gitignore. No automated tests
were added or run, as requested. Physical-device and cross-browser performance
have not been measured; no field performance claim is made.

## Header navigation — 16 October 2026

The primary header now presents About, Our Services, Our Products, Our Projects,
Events and Contact Us. Services points to Pathways, Projects to Initiatives, and
Contact Us is the right-hand contact action. Products and Events have compact
on-page destinations awaiting content, as requested. No products, dates or
availability have been invented. The contact action also closes the mobile menu.

## Asset and services refinement — 16 October 2026

Replaced the six pathway line drawings with original dimensional SVG artwork in
blue enamel, cream paper and brass. The services now use two-column illustrated
cards, becoming a single column below 760px, with larger body text and artwork.
Existing detail dialogs, enquiry selection and scoped GSAP art tilt are retained.
No additional animation system or dependency was introduced.

Products and Events now have matching decorative paper and calendar artwork.
Their content remains explicitly awaiting information; no catalogue, dates or
availability were invented. Footer links match the primary navigation, and the
header groups tuition under Services, team under About, and collaboration under
Projects when indicating the current section. The restored WebGL book pop-outs
and page physics were not edited in this pass.

The optimized production build and TypeScript completed successfully. No
automated tests were added or run.

The updated Services, Products and Events were visually reviewed in the existing
browser viewport. Screenshots are saved in output/v2-assets-services.jpg and
output/v2-assets-products.jpg. The updated tab reported no console errors during
this review. Preview is running at 127.0.0.1:3000.


## Mobile book reader — 16 October 2026

Phones up to 600px, touch devices up to 900px and short landscape viewports up to
900px now use a manual book reader. GSAP animates the existing scene progress
between chapters over 1.6 seconds without a pinned scroll timeline. Vertical page
scrolling remains native; horizontal book gestures and the arrow/chapter buttons
change chapters. Reduced motion uses the existing static illustrated view.

Mobile layout uses document flow, readable copy, 44px or larger navigation targets,
a horizontally scrollable chapter strip that follows the selected chapter, and a
full-width book canvas. Landscape phones place the book beside the copy. Camera
framing accounts for a narrow canvas aspect ratio. Mobile rendering caps DPR at
1.25; the existing reduced geometry/shadow maps and demand rendering remain.
The approved page geometry and upright pop-out objects have not been changed.

Production compilation and TypeScript passed. The 390px and 320px layouts were
reviewed in the browser, and the Next button advanced from cover to academic
without moving the document scroll position. No automated tests were added or
run. Physical-device touch performance has not been measured.

## Intro loading reliability — 16 October 2026

Removed the sessionStorage once-per-tab suppression and the independent 2.8s
intro dismissal. Home-page loads now render the introduction in initial HTML,
then wait for the book-ready signal with a 1.6s minimum presentation and 600ms
fade. A 6.5s upper bound opens the illustrated book if WebGL is still pending.
Skip/Escape remain available; deep section links and reduced-motion visits bypass
the automatic intro. Replay checks both ready 3D and illustrated book states.
A noscript style keeps the page available when JavaScript is disabled.

The production build and TypeScript passed. Two consecutive home reloads showed
the intro, and the ready book dismissed it and released page scrolling. No browser
console errors were observed. No automated tests were added or run.

## Mobile scroll and swipe correction — 16 October 2026

Restored a ScrollTrigger timeline on phones, replacing the manual-only mobile
reader. Native vertical scrolling, chapter buttons and horizontal swipes now all
navigate the same scroll progress. The phone timeline spans nine stage heights,
uses a 0.65s scrub and settles to reading positions after scrolling stops. Reduced
motion retains manual static chapters. The mobile stage fits the small viewport
with controls visible; short screens omit the repeated description but retain the
chapter note and action. Landscape uses the same scroll-based reader.

Swipe handlers run in capture phase, track one pointer and ignore a child's lost
pointer-capture event. Horizontal gestures use a 32px release threshold, while
vertical gestures remain native scrolling. Decorative canvas content no longer
receives pointer hits, and canvas wrappers allow pan-y and pinch zoom.

At 390x844, native scrolling advanced cover to Ambition, a horizontal drag advanced
to Cyber, and the Next control advanced to AI. Browser pointer input is not a
physical phone touch check. No automated tests were added or run.

## Codebase reliability and maintenance review — 16 October 2026

Reviewed the current App Router page, client components, book geometry/props/
textures, editorial content, styling, configuration, asset references and existing
test source. Archived dist/ remains a reference. The architecture and detailed
findings are recorded in docs/codebase-review.md.

Centralized typed browser events, pathway/interest/tuition types and the shared
mobile media query. Moved book scene/environment ownership into a committed R3F
effect with paired disposal. Fixed the intro's two baseline lint errors without
suppressions, preserved pre-existing inert states and included the skip link in
modal isolation. Ambient WebGL setup now releases partial allocations and handles
context restoration. Enquiry edits invalidate stale drafts; temporary download
links and object URLs have explicit cleanup. Cached stable header section lookups.
Removed unused MagicGrid/legacy beam code and CSS, and extracted the final mobile
book rules verbatim into components/book-mobile.css with preserved import order.

Validation: npm run lint and npm run typecheck passed. The optimized production
build, including TypeScript and static prerendering, passed. In the local browser,
3D loaded, switched to illustration and recreated a ready scene. The online
lesson link selected Academic tuition + Online tuition. A synthetic local draft
was prepared; editing the message restored the draft panel's hidden attribute.
Reloading cleared review form values. No browser console errors were observed in
the final review. No automated tests were added or run, as instructed. WebGL loss
and restoration were reviewed in source, not forced on a physical device.
