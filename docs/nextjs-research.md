# NEXA360 Next.js migration research

Researched 15 October 2026. This document records the research stage requested before implementation. Sources are first-party documentation and source repositories; community skills are identified separately. No application dependencies, skills, or MCP servers were installed during this research.

## Recommended implementation

Build the requested Next.js version in this workspace using **App Router + TypeScript + GSAP + React Three Fiber**. Use a small number of React Bits effects as editable source. Keep the supplied logo, approved academic logo treatment, robotic-arm composition, factual tuition content, and inquiry-draft behavior as explicit migration requirements.

Use the latest stable, patched Next.js release at implementation time and lock the resolved dependencies. The official documentation currently labels its stable version 16.4.1 and requires Node.js 20.9 or newer. This machine has Node.js 24.11.0 and npm 11.6.1. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)

| Layer | Recommendation | Purpose in NEXA360 |
| --- | --- | --- |
| Page and content | Next.js App Router, TypeScript | Render useful page content immediately, organize components, provide metadata and predictable assets. |
| Motion | `gsap`, `@gsap/react`, ScrollTrigger; SplitText/ScrollToPlugin where useful | One reversible book timeline, chapter navigation, masked text, SVG rules and controlled pointer details. |
| 3D | `three`, `@react-three/fiber` v9, selected compatible Drei helpers | Curved paper, readable materials, coherent lighting, approved props and crisp trophy plaque. |
| Reusable effects | Selected React Bits TypeScript source | Informational headings, restrained pointer light and magnetic inner artwork. |
| Styles | CSS Modules plus shared design tokens; use a consistent React Bits CSS variant | Keep the existing navy/blue identity while replacing accumulated override layers with clear component styles. |

Next.js pages/layouts are Server Components by default; interactivity belongs in smaller Client Component boundaries. Keep the informational copy, links and fallback illustrations server rendered. Dynamically load the heavy 3D canvas from a Client Component with an immediately available fallback. `ssr: false` belongs in a Client Component. [Server/client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components), [lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)

Fiber v9 pairs with React 19. Fiber v10 is currently alpha, so use the stable v9 line and verify peer dependencies when selecting Drei. Prefer explicit renderer invalidation during animation and let the scene return to idle when the book settles. [R3F introduction](https://r3f.docs.pmnd.rs/getting-started/introduction), [scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## Findings from the existing source

The current `dist/` directory is both the source and runnable static site. There is no package manifest, build system, framework or Git repository in the supplied folder.

- `index.html` contains the story stage, seven chapter buttons, informational sections, pathway dialog and inquiry form.
- `book.js` builds its own WebGL shaders, matrix operations, tessellated page meshes, canvas textures and procedural chapter props. It exposes `window.NexaBook.setProgress()` and `getPhase()`.
- `app.js` calculates scroll progress and updates the renderer, live chapter copy, manual navigation, dialogs and inquiry drafts.
- `intro.js` handles session storage, intro skip/replay, timers and focus.
- `polish.js` adds informational scroll effects, mobile navigation and field feedback.
- `motion.js` adds contextual pointer, hover light and tilt effects.
- Four CSS files layer the base layout and later refinements. Several successive rules override earlier ones.

The logo is loaded by `book.js`; the approved robotic arm is a set of explicit mesh transforms in the robotics branch. These are the source references to port, rather than substituting generic illustrations. The README's early student-image description is stale relative to its later logo change and the actual renderer.

The current book render function schedules frames continuously and adds time-based floating/light motion. The new brief asks for calm reading states. The Next.js version should remove perpetual motion during reading and render only while progress, pointer interaction or a deliberate reveal is changing.

## Agent skills found

| Skill source | Status | Recommendation |
| --- | --- | --- |
| [GreenSock official GSAP skills](https://github.com/greensock/gsap-skills) | Official; MIT skill content | Use `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, and `gsap-performance`. These cover sequencing, scoped React lifecycle and scroll cleanup. |
| [Vercel React best practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | Official; skill name is `vercel-react-best-practices` | Use for bundle boundaries, frequent-update refs and rendering performance. |
| [Next.js bundled agent guidance](https://nextjs.org/docs/app/guides/ai-agents) | Official, version matched | Read `node_modules/next/dist/docs/` after installation. Current Next.js can generate managed project instructions. `next-dev-loop` is an optional workflow skill. |
| [EnzeD R3F skills](https://github.com/EnzeD/r3f-skills) | Community; MIT; not an official pmndrs package | Optional focused guidance for geometry, textures, lighting, animation and shaders. Cross-check examples against installed versions and official R3F/Three docs. |
| Already available engineering skills | Local session catalogue | Frontend UI engineering, incremental implementation, performance optimization and browser testing can guide the build without downloading more generic packs. |

The old `vercel-labs/next-skills` repository explicitly says `next-best-practices` is no longer shipped as a skill. Its reference knowledge moved to bundled Next.js documentation; current workflow skills moved into `vercel/next.js`. Avoid installing an old copy just because a catalogue still lists it. [Official migration notice](https://github.com/vercel-labs/next-skills)

Proposed commands for the implementation stage, not commands already executed:

```powershell
npx skills add https://github.com/greensock/gsap-skills --agent codex
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --agent codex
```

Review the selected skill contents and retain their reference files when installing. Prefer project-scoped installation and only the skills relevant to this site. Agent Skills are instructions; MCP servers are tools; npm dependencies run the website. Installing one does not install the others.

## React Bits effects worth using

React Bits provides source in JavaScript/TypeScript and CSS/Tailwind variants. Its official registry supports component-by-component installation; there is no reason to import an entire effects collection. [Official README](https://github.com/DavidHDev/react-bits)

| Effect | Proposed placement | Adaptation |
| --- | --- | --- |
| [Split Text](https://reactbits.dev/text-animations/split-text) | Informational section headings | Short word/line reveal; preserve semantic headings and screen-reader text. Story headings instead follow the master book timeline. |
| [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal) | Selected editorial statements | Disable blur by default for readability; use scoped cleanup and reduced-motion handling. |
| [Magnet](https://reactbits.dev/animations/magnet) | Inner arrow/artwork of primary CTAs | Limit displacement to a few pixels; keep the clickable target stationary; fine-pointer devices only. |
| [Spotlight Card](https://reactbits.dev/components/spotlight-card) | Initiative visual or a selected pathway surface | Reuse the subtle pointer-light technique within an editorial composition. Avoid turning every section into matching cards. |

Source inspection found an integration issue worth fixing before reuse: the current ScrollReveal component cleanup calls `ScrollTrigger.getAll().forEach(trigger => trigger.kill())`. That can destroy the book's unrelated ScrollTrigger when the component unmounts or React replays an effect. Adapt it to a scoped `useGSAP`/context cleanup. Its default rotation and blur should also be reduced for this brief. [Actual ScrollReveal source](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx)

The supplied SplitText component has its own `once: true` trigger, which suits informational entrance reveals but does not implement reversible chapter choreography. Reuse the technique with the story's shared timeline where needed. [Actual SplitText source](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/SplitText/SplitText.tsx)

GSAP is free for commercial use under its own standard license; it is not simply MIT software. The GSAP skills repository is separately MIT licensed. React Bits uses MIT + Commons Clause: its published terms allow use within a commercial website, require notices to be retained, and restrict redistribution of the components themselves. The paid React Bits Pro collection is separate and unnecessary for the proposed effects. [GSAP README](https://github.com/greensock/GSAP), [React Bits license](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)

## Timeline and 3D design

The following is a project design recommendation based on the brief and inspected source:

1. Store chapter content in typed data shared by live HTML, controls, fallback illustrations and page-text generation.
2. Let one ScrollTrigger-controlled timeline own normalized story progress. Assign labels for chapter entry, reveal, reading and transition. Begin with the brief's 15/20/45/20 timing proportions and tune against devices.
3. Previous/next, chapter buttons and optional horizontal drag navigate to the corresponding scroll position. They do not independently tween a second book playhead.
4. GSAP writes transient progress into refs; R3F reads those values and updates geometry/materials without setting React state every frame. React state changes only for meaningful chapter/UI changes.
5. Port the approved page deformation math and robotics proportions into Three.js geometry/groups. Use distinct front/back textures, correct UVs, deliberate depth separation and a stable reading camera.
6. Use one HTML logo asset and retain the approved cropped logo UV treatment. Generate trophy lettering from explicit text/texture source so NEXA360 is legible.
7. Apply responsive timeline variants using `gsap.matchMedia()`. Reduced motion provides direct chapter changes and static readable illustrations. Native vertical scrolling remains available.

ScrollTrigger supplies pinning and scrubbed timelines. `useGSAP` scopes React animation setup and cleanup; delayed event handlers need context-safe animation creation and explicit listener cleanup. Responsive contexts can revert their animations when conditions change. [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [GSAP React integration](https://github.com/greensock/react), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)

Do not add Lenis, ScrollSmoother or Motion for React unless a measured requirement justifies them. GSAP owns the narrative; R3F renders its state. Independent animation engines must not write the same transform or opacity.

## Free MCP shortlist

The detailed comparison and setup examples are in [mcp-research.md](mcp-research.md).

Start with **Next.js DevTools MCP** for framework diagnostics and **Chrome DevTools MCP** for visual/browser performance inspection. Add **shadcn MCP** to retrieve official public React Bits registry components. Context7 is useful but hosted and quota limited; Playwright is an optional cross-browser alternative/addition when that coverage is needed. All are development tools, not runtime website dependencies. [Next DevTools](https://github.com/vercel/next-devtools-mcp), [Chrome DevTools](https://github.com/ChromeDevTools/chrome-devtools-mcp), [React Bits MCP setup](https://reactbits.dev/get-started/mcp)

The Context7 plugin was found in the app directory and offered as an optional integration. It has not been confirmed installed or connected. Research continued through official web documentation. A Context7 CLI lookup did not complete in this environment and was stopped; it did not produce documentation or establish a working connection.

## Implementation sequence and acceptance

1. Preserve the supplied static site as a visual/source reference. Add the Next.js app and copy the approved assets into `public/assets/`.
2. Build the server-rendered informational site, navigation, accessible pathway dialogs and truthful inquiry drafts.
3. Port the book with approved logo/arm first; verify framing and page orientation before adding richer lighting and other props.
4. Integrate one master GSAP timeline, direct chapter controls, skip behavior and reverse transitions.
5. Apply the selected heading/hover effects with scoped lifecycle and reduced-motion alternatives.
6. Run build/type/lint checks and real browser checks on desktop, tablet, narrow mobile and short viewports. Verify all chapters, reverse/jump transitions, keyboard/touch, intro replay, fallback, context loss, overflow and draft download/copy.
7. Measure browser performance and actual LCP/INP/CLS where possible. Report results and remaining limits; the brief's performance targets are acceptance goals, not measured achievements.

Use an HTTP Next.js development server for the migrated app. A Next.js app is not launched by opening `index.html` with a `file:` URL. The prior static-file launch history does not establish that browser tooling can access the future development server; verify the selected tools after configuration.

Research is complete. Implementation, dependency compatibility and visual acceptance remain to be verified during the build.
