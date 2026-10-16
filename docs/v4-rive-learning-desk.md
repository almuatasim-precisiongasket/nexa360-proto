# V4 learning desk

## Delivered

One original, script-free Rive illustration in the tuition introduction, with
GCSE/IGCSE, A Level and entrance-exam compositions. Its native HTML buttons and
the programme finder share local selection state. Existing enquiry transfer is
preserved. The book remains the Three.js scene; this vector artwork uses Canvas2D.

The initial page contains a complete SVG poster with a reserved 420:320 aspect
ratio. The runtime module mounts within 300px of the artwork. It crossfades over
the poster after its first frame. Resource failure preserves the poster; reduced
motion uses only the selected static artwork. Canvas pointer listeners are
disabled, so it does not intercept scrolling or require canvas interaction.

Entrance lasts two seconds, programme transitions 1.2 seconds. The render budget
uses advanced animation time, rather than a wall-clock timeout. Rendering pauses
after settling, offscreen and in a hidden document; selection resumes it for the
latest state. The instance, resize/intersection observers and document listener
are cleaned up on unmount. Device pixel ratio is capped at 1.5.

## Authoring and rebuild

Edit `scripts/author-learning-desk.mjs`: it owns the original geometry, palettes,
state machine and matching SVG posters. Generated `scene.rml` is also retained
for inspection. Manual RML edits will be replaced by the generator.

Use the official Rive CLI 1.6.0. This session downloaded the Windows executable
from Rive's release service and verified the manifest SHA256. Tools and rendered
proofs stay in ignored `output/`; no global installation is needed.

```powershell
$env:RIVE_CLI = (Resolve-Path './output/rive-tools/versions/1.6.0/rive.exe').Path
npm run art:learning-desk
& $env:RIVE_CLI art/rive/learning-desk --screenshot=output/desk.png --data=programme=1 --advance=150
```

If using another checkout, install the official CLI and set `RIVE_CLI` to its
executable, or make `rive` available on PATH. The asset task generates sources,
verifies/inspects/compiles, then copies the `.riv` and the installed runtime's
matching WASM. Ordinary website builds use the committed assets and need no CLI.
Keep the runtime WASM synchronized when updating the runtime dependency.

## Measurements

| Resource                           | Bytes on disk | Local gzip estimate |
| ---------------------------------- | ------------: | ------------------: |
| Original learning desk `.riv`      |         7,738 |               3,161 |
| Shared Canvas runtime WASM         |     1,992,302 |             830,498 |
| React runtime wrapper distribution |        21,951 |               5,935 |
| Each SVG poster                    |   4,908–5,035 |        Not measured |

These are file/gzip measurements, not browser transfer sizes or total bundled
JavaScript cost. Canvas runtime JavaScript is additional. This is a meaningful
engine cost for a small illustration; lazy loading keeps it away from the book
entry. No measured performance claim against the previous SVG implementation
is made. Avoid another Rive scene until the pilot is reviewed on real devices.

## Checks and limits

- CLI verify: zero errors/warnings; inspect: no problems, one artboard, four
  animations, two state-machine layers; all three rendered states reviewed.
- TypeScript, ESLint and production build pass.
- Browser: canvas reaches a valid frame, pauses at rest, and resumes on selection;
  repeated/keyboard changes update the matching HTML finder immediately.
- Layout checks at 320, 390, 768, 1024 and 1440px show no document horizontal
  overflow. Phone buttons measure 44px high. One desk canvas is present.
- Enquiry flow carries Entrance exams, Maths, a target-school note and Online
  tuition to Academic tuition in the existing form.
- Temporarily unavailable `.riv`: expected fetch error; correct A Level poster,
  buttons and finder remain usable. Restored the asset and verified a valid frame.
- Reduced-motion, hidden-tab and cleanup branches were reviewed in source;
  those modes were not independently automated in this browser session.
- No physical iPhone/Safari or Android/Chrome was available. Browser viewport
  checks do not establish physical touch performance.
- One initial deep-link load produced an existing GSAP scope/ScrollTrigger
  refresh error before the desk loaded. Subsequent loads and the Rive flow worked;
  this pilot does not claim to resolve that broader startup issue.

Screenshots are saved locally under ignored `output/v4-rive-desktop.png` and
`output/v4-rive-mobile.png`. The optional diffusion diagram is deferred.

## Runtime and authoring terms

Runtime package metadata identifies MIT licensing; its official notice is
included with the self-hosted WASM. The artwork is original, uses no downloaded
community asset, and contains no scripts, external fonts, images or audio.

Script-free compilation and browser playback succeeded without an account or
cloud upload. That establishes technical viability, not a blanket commercial
export entitlement. Before production publication, confirm the current CLI and
authoring plan terms, including branding/export requirements. No paid plan,
account connection, publishing or script signing was performed.

References: [CLI setup](https://rive.app/docs/cli/getting-started),
[RML](https://rive.app/docs/runtimes/advanced-topic/rml),
[React runtime](https://rive.app/docs/runtimes/react/react),
[pricing](https://rive.app/pricing),
[runtime MIT notice](https://github.com/rive-app/rive-wasm/blob/master/LICENSE).
