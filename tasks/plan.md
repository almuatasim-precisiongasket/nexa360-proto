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
