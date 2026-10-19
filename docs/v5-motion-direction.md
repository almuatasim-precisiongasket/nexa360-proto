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
  artwork. No extra canvas, external scene or application dependency is added.
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
