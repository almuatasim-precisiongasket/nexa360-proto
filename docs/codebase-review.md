# Codebase review — 16 October 2026

## Architecture

The deployed application is one Next.js App Router page. `app/page.tsx` composes
the header, intro, book, information sections, footer and interaction effects.
`dist/` is the earlier standalone application, retained as a reference. It is not
the source of the Vercel Next.js deployment.

| Area                                                       | Responsibility                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| `app/`                                                     | Route composition, metadata, local fonts, global tokens and CSS imports  |
| `BookStory` + `lib/story.ts`                               | Scroll/chapter/keyboard/swipe input and pure book state                  |
| `BookCanvas`                                               | Font/asset readiness, rendering lifecycle, camera, lighting and fallback |
| `lib/book-scene.ts`                                        | Scene construction, page settling, pop-out placement and disposal        |
| `lib/book-geometry.ts`                                     | Spine-attached paper and cover geometry                                  |
| `lib/book-props.ts` + `lib/book-textures.ts`               | Original props, approved robot geometry and cached page materials        |
| `BrandIntro`                                               | Intro eligibility, bounded readiness wait, replay and focus restoration  |
| `Information` + tuition/team components                    | Approved editorial content and section composition                       |
| `Pathways` + `Inquiry` + `TuitionEnquiry`                  | Detail dialogs, interest/format selection and local enquiry drafts       |
| `SiteEffects`, `TextReveal`, `SectionHandoff`              | Scoped GSAP motion and pointer decoration                                |
| `AmbientField`, `AceternityEffects`, `ui/background-beams` | Paused-offscreen backgrounds and decorative effects                      |
| `PathArt`, `HoldingArt`, `Logo`                            | SVG artwork and the supplied logo                                        |
| `site.css` + `book-mobile.css`                             | Main styling and the final phone-specific book overrides                 |

## Improvements made

1. **Committed scene ownership.** Three.js scene/environment creation moved out
   of `useMemo` rendering into an effect. React can discard a render or replay
   effects in Strict Mode; each committed setup now owns a matching cleanup.
   The renderer-owned scene is retrieved with R3F's non-reactive `get()` API.
   The loader-cached logo texture remains borrowed and is not disposed here.
2. **Typed event contracts.** `lib/site-events.ts` defines the six browser events
   and their payloads. Publishers cannot accidentally send a tuition format as
   a pathway ID, omit a required payload or provide a payload to a signal.
   Subscribers return their cleanup function. Runtime checks remain at the
   enquiry selection boundary.
3. **Shared content types.** Pathway IDs, enquiry interests and tuition formats
   have explicit types. The lesson-format select uses the same list as its
   validator. Components no longer import domain types from another component.
4. **Shared mobile query.** The book timeline and renderer import one query from
   `lib/media.ts`, avoiding divergent JavaScript breakpoint copies. The CSS
   media queries intentionally mirror it and must stay aligned when changed.
5. **Intro lifecycle.** Home-entry eligibility and reduced-motion preference are
   derived from browser subscriptions. Removed two pre-existing lint failures
   caused by synchronous state updates in effects. Modal cleanup restores each
   element's previous inert state, includes the skip link and restores focus.
6. **WebGL failure cleanup.** Ambient shader/program/buffer setup failures now
   release partial resources immediately. Resize skips failed/lost contexts;
   context restoration recreates the resources and resumes only when visible.
7. **Draft accuracy and cleanup.** Editing form values or changing the selected
   pathway invalidates a prepared draft. Downloads attach their temporary link
   to the document and clean up object URLs/timers when the form unmounts.
8. **Less unused code.** Removed the unused MagicGrid component and obsolete
   BackgroundBeams export, together with their dead CSS. The active Aceternity
   BackgroundBeams implementation in `components/ui/` is retained.
9. **CSS boundary.** Moved the final phone-book rules verbatim to
   `book-mobile.css`. Its import follows `site.css`, preserving cascade order.
10. **Cheaper navigation updates.** Header section elements and section-group
    mapping are captured outside the per-scroll update path.

## Review boundaries

Reviewed the active app/component/library source, configuration, styling, asset
references, existing tests and implementation notes. The legacy application was
reviewed as an archived implementation reference, not upgraded or redeployed.
Dependencies were not upgraded. The book's page geometry, pop-outs, animation
timing and business content were not redesigned.

No automated tests were added or run, following the standing instruction.
Lint, TypeScript, production build and browser review results are recorded in
`implementation-notes.md`. Physical-phone behavior and field performance still
require device evidence. The main stylesheet retains historical responsive
overrides; replacing its cascade wholesale would need a separate visual pass.
