# NEXA360 — Motion direction

19 October 2026 · branch v5

## The idea

**A book opens into a choice. A choice becomes a learning journey.**

Motion follows that story: a branching line, clear typography, layered learning
artwork, a connected institutional network, then a quiet invitation to talk.
The book remains the opening experience. Navy, ivory and restrained gold/cobalt
signals continue the established palette.

## The score

| Chapter | Visual direction | Implemented timing |
| --- | --- | --- |
| Book | Preserve its reading pace and existing camera/page behaviour | Existing book timeline |
| Into the learning routes | A central line branches into two paths; nodes illuminate as the visitor scrolls | Scroll scrub 1.15; path stagger 0.14s |
| Main chapter headings | Utility label starts, masked lines rise, supporting copy follows | Label 0.65s; lines 1.15s, stagger 0.12s; support starts at 0.38s |
| GCSE and skills routes | Card surface resolves; desk and robot drift in opposite depth planes | Surface 1.15s; desk ±12px, robot ±14px, desktop only |
| GCSE tuition | Headline and explanation first; study desk and preferences enter as their own viewport shots | 1.15s surface entrances; preference delay 0.2s |
| Parent preview | Headline introduces the purpose; dashboard settles into place; chart draws when visible | Surface 1.15s; chart 0.65s |
| Skills studio | Heading gives direction; exhibit and course index resolve; selections retain their own feedback | Surface 1.15s; index delay 0.14s |
| Organisations | Network connections draw; programme steps arrive along a scroll-linked rail | Trace 1.9s; steps 0.85s, stagger 0.12s; rail scrub 1.2 |
| Questions | Static reading structure with an editorial heading entrance | Chapter headline score; existing 0.15s answer change |
| Consultation | Label, invitation and explanation lead into the form | Form entrance 1.15s, delay 0.25s |
| Primary consultation actions | Arrow follows the pointer slightly while the clickable area stays stable | 0.45s easing; maximum 5px horizontal / 3px vertical |
| Footer | A modest final depth handoff | Desktop travel 26px; scrub 1.1 |

The timings are local to each viewport entrance. They do not impose a single
long autoplay sequence or make visitors wait before using controls.

## Ownership and pacing

- `MotionDirector.tsx` owns the new chapter typography, surface entrances, SVG
  drawing, artwork depth, process rail and primary arrow response.
- GSAP SplitText uses responsive line masks and automatic re-splitting. Returning
  the timeline from `onSplit` lets it revert/rebuild the animation with the text.
  See the [official SplitText guide](https://gsap.com/docs/v3/Plugins/SplitText/).
- Motion continues to own course selections, parent-preview navigation, questions
  and prepared product playback. The director skips volatile/dynamically replaced
  content; it does not bind listeners to panels that will be replaced.
- The existing WebGL wave and data fields, Rive desk and book supply living
  artwork. No extra canvas or external scene is added. Desktop scroll coordination uses Lenis 1.3.27.
- The window remains the single scrolling surface, preserving the existing book,
  touch behaviour and navigation. Service chapters add no pinning or scroll trap.
- Legacy reveal selectors skip director-owned groups. Hover-controlled route
  cards receive opacity/clip reveals rather than a second transform owner.
- Controls stay available throughout entrances. Repeated interactions retain
  their short existing feedback rather than replaying cinematic entrances.

## Phone and motion preferences

Phone headings use 0.85s line reveals without rotation. Surfaces use a 12px
entrance, with no desktop parallax, footer travel or magnetic pointers. There is
no new pinning. Reduced-motion mode leaves chapter content and the signal in
their settled state. Media changes and unmount restore original text/styles and
remove listeners, observers and ScrollTriggers.

## Verification boundary

Production compilation, TypeScript, lint and generated-page checks are recorded
in the implementation review. Browser access was blocked earlier in this session;
actual desktop/phone motion, serif masking, GPU output and touch timing still
need visual inspection. Source-level checks do not substitute for that review.

## Desktop scroll refinement

The cinematic-gsap-lenis-motion-system and cinematic-scroll-storytelling skills
inform the integration. Lenis uses the window as its root, runs on GSAP's ticker
and updates ScrollTrigger. Fine-pointer desktops above 900px use lerp 0.085 and
wheel multiplier 0.9. Phones, coarse pointers and reduced-motion users retain
native scrolling. No extra service chapter pinning is introduced.

A shared scroll coordinator owns anchor navigation, chapter buttons, skip-story
and parent-panel positioning. New navigation cancels the previous request;
wheel input interrupts desktop navigation. Nested scrolling and form controls
retain native behavior. Media changes and unmount remove the driver, ticker,
listeners and Lenis instance. Existing book physics and assets are preserved.

Reference: https://github.com/darkroomengineering/lenis/blob/main/README.md

## Learning story and chapter ribbon — V5.23

Lenis-inspired visual continuity meets the explanatory storytelling described in
Technoverge reference notes. The reference's exact GPU choreography was not
independently observed. This is an original adaptation for NEXA360.

- Three ribbon chapter bands separate skills, organisations and consultation.
  SVG stroke progression and modest text travel follow scroll (scrub 1).
- Tuition includes a three-beat learning story: understand the starting point,
  work through an illustrative equation, then explore parent feedback. A CSS
  sticky stage follows the desktop reading sequence without additional pinning.
- SVG paper/pencil/signal layers change composition over 1.1s, with a quiet
  orbit and fine-pointer depth. Content controls remain immediately available.
- The worked example is interactive. All sample records are explicitly labelled.
- Phones use the same step controls and readable stacked explanations, without
  sticky staging or automatic scene changes. Reduced motion removes travel.
- A desktop chapter rail provides direct section navigation after the book.
- Existing blue waves gain capped, eased scroll-energy response; offscreen and
  hidden-tab rendering still pauses. No new WebGL contexts or assets replace
  the original artwork. Course illustration changes now settle in 350ms.
- The paper clips via overflow:clip, preserving the scene's viewport sticky root.

Book physics, book assets, branding, consultation data and original illustrations
remain intact. Existing course demos provide the technical learning interactions.
