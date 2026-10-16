# NEXA360 v4 — Rive experience plan

Status: proposed. No Rive runtime, CLI or artwork installed in this planning pass.
Tasks: [todo.md](todo.md). Completed v3 work is preserved in
[the archived plan](../docs/v3-svg-illustration-plan.md) and
[checklist](../docs/v3-svg-illustration-tasks.md).

## Objective

Add an original interactive tuition illustration, then consider an explanatory
diagram inside the learning companion. Use the existing navy ink, blue enamel,
warm paper and restrained gold vocabulary. The existing Three.js book remains
the opening visual; Motion/GSAP continue handling page layout and text.

The v4 learning tools and parent dashboard are concept previews. Their status
must remain clear: animation does not provide an AI backend or learner accounts.

## Recommended placements

| Priority | Placement | Proposed experience | Value / effort |
| --- | --- | --- | --- |
| 1 | Tuition introduction's approach note | A paper learning desk responds to GCSE/IGCSE, A Level and entrance-exam selection | High visual value / medium-to-high art effort |
| 2 | Tutor preview's diffusion example | A concentration diagram responds to an HTML control and illustrates particle movement | High teaching value / medium-to-high effort |
| 3 | Learning companion identity detail | A small bookmark responds once when moving between Understand, Remember and Plan | Modest value / low effort after shared art exists |

The parent dashboard's information remains readable HTML. Account functionality
and clearer information have higher value there than decorative Rive work.
The first delivery is placement 1; later placements depend on its review.

## Asset creation route

Current official Rive docs describe a Windows-compatible CLI and Rive Markup
Language (RML). They provide a route to author editable scenes as text, compile
runtime assets and render local previews. We can version original artwork beside
the application code.

First prove a small script-free scene on this Windows machine and in the chosen
React runtime. Use RML for original shapes and transitions, and the Editor for
visual refinement if useful. Keep source in `art/rive/`, runtime files in
`public/assets/rive/`, and render captures in ignored `output/`. Read generated
Rive project instructions before following them.

Local CLI builds can run signed out. Official docs distinguish script-bearing
web assets, which require publishing/signing. Keep the pilot script-free and
confirm actual export behavior before release. Free exports currently include a
Rive splash screen; a paid authoring plan removes it. This plan does not purchase
a subscription or publish assets to an account.

## First asset: the learning desk

An open paper book, enamel-blue desk, gold pencil and fine drafting marks form a
compact composition within the current tuition approach note. Use a subtle
vector ground shadow and simple shapes instead of textures or audio.

Three distinguishable states:

- GCSE/IGCSE: a practice sheet and a simple learning diagram.
- A Level: reference pages and a more developed diagram.
- Entrance preparation: stepping paper shapes, notebook and pencil.

Qualification selection updates HTML immediately, then the illustration moves
to the corresponding state. Rapid selection targets the latest choice instead
of queuing transitions. All qualification labels and availability wording remain
in HTML; artwork does not imply confirmed subject or exam-board coverage.

Proposed pacing: first entrance 1.8–2.2 seconds; state changes 1.0–1.4 seconds;
then a resting frame. No perpetual idle loop. Native buttons provide the same
selection on phones. Fine-pointer hover is optional decoration.

## Architecture

- One local client composition owns selected qualification and passes it to the
  existing finder and illustration. Avoid another global decorative event.
- Use current data-binding/view-model APIs. Rive's React repository marks the
  older state-machine-input hook deprecated; verify the installed version.
- Evaluate the renderer against this exact scene and the existing Three.js page.
  Select it from compatibility and measured cost, rather than assuming WebGL is
  automatically faster.
- Rive owns its artboard. Motion/GSAP own the outer wrapper and page transitions.
  Each animated transform has one owner.
- The decorative canvas is hidden from assistive technology. All actions,
  teaching explanations and feedback remain native HTML.
- Proposed `.riv` target: <=250 KB. Measure runtime/WASM downloads separately;
  this is a target, not a demonstrated performance claim.

## Loading and lifecycle

Reserve dimensions and show an SVG poster in server output. Load the runtime and
asset when the section approaches the viewport; the intro and enquiry controls
never wait for Rive. Crossfade after a valid first frame.

Reduced motion shows a complete static state reflecting the selected programme.
Asset, WASM, renderer and network failures preserve the poster and HTML controls.
Stop rendering offscreen, in a hidden tab and after decorative animation settles.
Clean up on unmount. Start with one Rive instance, and evaluate any second scene
before increasing the number of active canvases.

## Sequence

1. Prove CLI-to-browser compilation and data binding with a tiny custom asset.
2. Author and visually review three learning-desk states and static posters.
3. Add a lazy runtime wrapper with loading, failure and reduced-motion handling.
4. Connect qualification selection and verify the complete tuition/enquiry flow.
5. Review quality, payload and phone behavior before the optional diffusion scene.
6. Document measurements, authoring/export workflow, licensing and practical limits.

The learning-desk pilot is implemented locally on v4. Tasks and remaining
device/publication checks are in `todo.md`; measurements and authoring steps are
in `docs/v4-rive-learning-desk.md`. The diffusion scene remains optional.

## Acceptance

- Artwork fits at 320/390/768/1024/1440px without crowding text or actions.
- Mouse, keyboard and touch selection match; normal scrolling is uninterrupted.
- Enquiry selections and a visitor's existing message remain intact.
- Reduced motion and unavailable resources show complete static content.
- Re-entry, tab backgrounding and remounts leave no duplicate canvases, listeners
  or continuing decorative render loop.
- Compare initial downloads, asset size and frame timings with v4. Investigate
  layout shifts or suspected regressions rather than assuming Rive is cheaper.
- Review actual iPhone/Safari and Android/Chrome when available; explicitly record
  unavailable devices. Viewport emulation does not establish physical behavior.

## Official sources

- [Rive CLI](https://rive.app/docs/cli/overview)
- [Windows setup and publication rules](https://rive.app/docs/cli/getting-started)
- [RML and compile/inspect/render checks](https://rive.app/docs/runtimes/advanced-topic/rml)
- [React runtime](https://rive.app/docs/runtimes/react/react)
- [Data binding and hook deprecation](https://github.com/rive-app/rive-react/blob/main/_autodocs/api-reference/useStateMachineInput.md)
- [Pricing and splash-screen exports](https://rive.app/pricing)

---

# NEXA360 v4.1 — Cinematic scroll and exploded motion plan

## Objective

Give the site a more expensive, authored sense of motion while preserving its
reading pace, mobile usability and existing assets. The signature moment is an
exploded view of the connected learning system in Our Products: Tutor,
Flashcards, Study Plan and progress signals separate into layered planes, then
assemble into the interactive studio. The Three.js book and its physics remain
untouched.

No new animation library is required. GSAP/ScrollTrigger remains responsible
for scroll choreography, Three.js owns the book, Motion owns interactive UI
state, and Rive owns its existing learning-desk artboard. A transform must have
one owner so the systems do not fight each other.

## Experience hierarchy

| Priority | Placement | Motion treatment | Purpose |
| --- | --- | --- | --- |
| 1 | Our Products / Learning Tools | Tutor, Flashcards, Study Plan, progress signals and interface chrome separate into an exploded learning system, then assemble into the usable studio | Creates one memorable signature sequence that explains the product |
| 2 | Major section handoffs | Paper edge, light trace and surface wipe respond to scroll direction and section colour | Makes the long page feel continuous |
| 3 | Pathways | Existing SVG layers separate by a few pixels in depth, then assemble as each pathway enters | Connects the service list to the book's physical language |
| 4 | Learning tool interactions | Tool changes use shared-axis depth rather than fades alone | Makes the assembled system feel coherent during use |
| 5 | Parent view / team / projects | Rows, portraits and editorial elements assemble once with restrained local parallax | Adds finish without another spectacle |
| 6 | Contact | A final paper-fold reveal opens the enquiry surface and settles completely | Gives the page a deliberate ending |

## Signature learning-system exploded view

Use the existing Our Products introduction and studio entrance. As the section
approaches, a self-contained product diagram separates into five meaningful
planes: Tutor, Flashcards, Study Plan, learner progress and the NEXA interface
frame. A short scrubbed sequence reveals how they connect, then the planes
assemble into the existing interactive Learning Tools studio.

- Build the diagram from semantic HTML and original inline SVG details using
  the current navy, cobalt, warm paper and restrained gold palette.
- Use CSS 3D transforms for depth and GSAP for one scroll-linked timeline. The
  final transform values are exact zeros so the live interface becomes the
  stable resting state.
- Keep labels readable throughout: every plane has a short product label and a
  visible connector line. The sequence explains a connected system instead of
  acting as abstract decoration.
- Use a shallow perspective with 40–90px of desktop depth, modest rotation and
  a slow light sweep. No debris, particles or fast spins.
- Do not add a second WebGL canvas. The Three.js book, Rive desk and all current
  book controls remain unchanged.
- On mobile, use a vertical two-dimensional separation with shorter travel and
  natural page scrolling. Do not pin the section on touch layouts.
- Reduced motion renders the complete assembled diagram and interactive studio
  with no scrub or depth transition.

## Section choreography

### Page handoffs

Upgrade `SectionHandoff` into three reusable visual modes: light paper, dark
paper and blueprint. Each keeps the existing section colour contract, draws its
trace once, and adds at most one slow foreground/background differential. The
handoff occupies existing space and never changes document height while moving.

### Pathways

Add explicit layer markers to the existing pathway SVGs. On entry, layers begin
with 10–24px of apparent depth and 1–2 degrees of rotation, then assemble over
1.4–1.8 seconds. Fine-pointer movement may shift the foreground by at most 6px.
The pathway link, text and focus treatment remain stable HTML.

### Learning tools and parent view

After the exploded diagram settles, replace the current tool-panel fade with a
shared-axis transition: outgoing content recedes slightly, the next surface
advances, and persistent chrome does not move. Parent dashboard rows animate
once when visible; changing tabs remains immediate enough to feel useful and
never replays the whole entrance.

### Team, projects and contact

Keep the existing team tilt. Improve only the entrance by separating portrait,
index and identity layers before they settle. Extend the project orbit/pixel
motion with a slow scroll-linked depth shift. End with a paper-fold contact
reveal that stops before the form receives focus, so typing is completely
stable.

## Motion direction

- Timing: entrances 1.2–1.8 seconds; UI state changes 0.55–0.9 seconds;
  section handoffs scrubbed over roughly 40% of a viewport.
- Easing: `power3.out` for arrival, `power3.inOut` for navigation and product
  assembly, linear only for direct scroll mapping.
- Distance: content 12–32px; decorative depth up to 48px; no large off-screen
  fly-ins after the introduction.
- Frequency: one signature moment, one entrance per section, and one response
  per user action. Avoid perpetual decorative loops.
- Typography stays readable throughout. Do not blur body copy or animate every
  word outside existing headline reveals.

## Architecture decisions

1. Add a scoped `LearningSystemExploded` composition beside the current studio;
   it owns its diagram layers and hands off to the stable interactive surface.
2. Add scoped motion components/hooks for pathways and product sections;
   reduce global selector work in `SiteEffects` as new behavior is introduced.
3. Keep `frameloop="demand"`, pause Rive offscreen and retain the current
   visibility/reduced-motion cleanup paths.
4. Use CSS custom properties for handoff and DOM depth values so responsive and
   reduced-motion variants stay declarative.
5. Add no new dependencies or external visual assets in this pass.

## Delivery sequence

1. Instrument the existing experience and record a baseline before changing
   motion.
2. Build and review the exploded learning-system sequence in isolation on
   desktop and mobile while leaving the book unchanged.
3. Upgrade section handoffs and pathway assembly as one narrative slice.
4. Upgrade learning-tool, parent-dashboard and team entrances.
5. Add project depth and the final contact fold.
6. Perform a whole-page motion, accessibility and performance pass; remove any
   effect that competes with comprehension or repeats too often.

## Acceptance criteria

- The exploded learning system resolves to the exact stable studio layout with
  no jump, clipping, overlap or duplicate interactive controls.
- Natural scroll, book swipe/tap controls and all form interactions work at
  320, 390, 768, 1024 and 1440px widths.
- Reduced motion removes scrubbing, parallax, exploded separation and animated
  UI transitions while preserving complete content.
- The current book remains visually and behaviorally unchanged; no additional
  WebGL context or animation dependency is introduced.
- All new ScrollTriggers, observers, pointer listeners and timelines clean up
  on unmount.
- Motion does not create layout shifts. Target animation-related CLS is 0 and
  investigate any measured total CLS above 0.05.
- Aim for 60fps on a normal desktop and at least 30fps on a representative
  mid-range phone during the heaviest sequence. Treat frames over 33ms or long
  tasks over 50ms as issues to investigate.
- Keyboard focus never lands on moving content, and focused controls do not
  shift while being used.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Exploded layers and live controls overlap | High | Use a dedicated presentation wrapper, reserve the final studio dimensions and make only the assembled state interactive |
| Too much scroll choreography slows the page | High | Add no new long pin; limit later sections to one entrance and local interaction |
| Mobile depth effect feels cramped | High | Switch to a short vertical separation, remove perspective and keep natural touch scrolling |
| GSAP refresh drift after dynamic Rive/UI heights | Medium | Keep existing ResizeObserver refresh points and refresh only after measured layout changes |
| Motion obscures claims or controls | Medium | Keep all meaning in stable HTML and restrict depth effects to wrappers/decorative layers |
| Visual repetition cheapens the experience | Medium | Use the exploded sequence once; vary later motion by content purpose rather than applying one preset everywhere |

## Open design decision after the first prototype

Review two learning-system treatments using the same implementation: a
restrained editorial separation and a more pronounced technical assembly.
Choose the stronger version from the rendered result and performance evidence
before the effect is propagated elsewhere.
