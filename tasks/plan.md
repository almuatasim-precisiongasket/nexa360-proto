# NEXA360 v4 — Rive experience plan

> Current direction: the v5 content and visual hierarchy plan appended below
> supersedes the v4 content assumptions. Earlier work remains as history. The
> exploded Learning System view has been removed at the user's request.

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

---

# NEXA360 v5 — A connected education company, clearly expressed

Replanned: 17 October 2026. Implemented locally on v5; browser visual review
remains open. See `docs/v5-ui-review.md` for checks and business limitations.
This revision supersedes the previous v5 proposal in place. Earlier v4 records
above are historical; the removed exploded view must not be restored.
Execution checklist: the v5 section of `tasks/todo.md`.

## 1. The decision

Build one premium public page that introduces NEXA360 as an international
education company, makes institutional programmes the primary offer, and gives
families a distinct GCSE experience. Show the two developing products through
clear, interactive concept demonstrations. The site should feel like one brand
with recognisable chapters, rather than a sequence of similar blue sections.

Primary content source:
`C:/Users/HP/.codex/attachments/bc97f353-63e6-421e-b24a-44e9c45359f0/Pasted text.txt`.
Existing team source: `docs/team-source.md`, approved slide 7 only.
User preference evidence: the existing slow blue wave feels premium; sections
currently blend together; existing assets are to be preserved, with new assets
added where missing. Book mechanics stay intact. UI is the priority for v5.

### What changes from the earlier plan

- Establish institutional prominence at the opening and in the first major
  service section; stop leading the whole company as an AI tuition centre.
- Replace broad style descriptions with an explicit storyboard, compositions,
  asset briefs, interactions, motion values and acceptance criteria.
- Give technical courses a light studio containing a dark demonstration stage.
  Two neighbouring navy/near-black service sections were too similar.
- Put GCSE selection and parent reporting in one warm, contained tuition chapter.
- Turn Products into two focused demonstrations of the supplied concepts.
- Limit full-length sections to the main commercial stories. About, global
  reach, team, events and contact are more compact where content is limited.
- Deliver UI in complete visual slices. Real enquiry delivery, registration and
  secure portals are later operational work, with their requirements retained.

## 2. Business hierarchy and visitor routes

| Priority | Visitor needs to understand | Primary next step |
| --- | --- | --- |
| 1 — Institutions | Custom technical programmes for schools, universities, businesses and CSR organisations | Request an institutional consultation |
| 2 — Students and parents | GCSE in Barking Riverside or online, with tutor and group choices | Request a free tuition consultation |
| 3 — Technical learners | Five practical programmes and their intended outcomes | Enquire about a programme |
| 4 — Product collaborators | Interactive AI tuition and P2L are being developed | Discuss a product partnership |

The opening has two clear routes: **For institutions** and **For students &
parents**. Institutional is the stronger action. A family reaches GCSE directly;
they do not have to work through all technical content first. People interested
in technical learning can use the service index and course entries.

Keep the approved header: About / Our Services / Our Products / Our Projects /
Events / Contact Us. The service destination starts with a small three-link
index: Institutional programmes / Technical courses / GCSE tuition. Keep the
white header and supplied blue NEXA logo. Show the current chapter in navigation.
Use a simple menu on phones with the same labels and destinations.

One public page remains the delivery format. Course details expand in their
own section. Private parent, tutor and admin applications are future routes.
Preserve useful old hashes with unique alias anchors: `#pathways` for Services,
`#tuition` for GCSE, `#products` for Products, `#initiatives` for Projects,
`#team` for People. Map `#learning-tools` to the replacement product experience
and update new links to the canonical destination. Check deep links against the
sticky header and intro so content is immediately reachable.

## 3. Page storyboard

### 00 — Opening: the brand, the purpose and two routes

**Headline:** Education Without Boundaries. Skills for the Future.
**Support:** Academic tuition, practical technology programmes and educational
innovation for learners and institutions.

Retain the book as the signature scene. Put this positioning and route controls
in normal HTML around the existing scene, visible before book interaction.
Do not make visitors finish the book to find the services. The loader can keep
the approved Unfair Advantage brand language; it should not carry the company's
only explanation. Preserve the book title and existing mechanics. Any chapter
copy alignment is a separate content-only task after the services are settled.

Composition: deep navy, large intentional headline, restrained supporting copy,
existing book and a quiet route bar. Keep the existing skip and chapter controls.
Do not extend the introduction or add another pinned narrative. On a phone, the
business headline and route controls must fit naturally above/around the scene.

### 01 — About and international outlook: a short white editorial spread

**Headline:** Connected by education. Built for what comes next.

Use an asymmetric headline/copy spread with a small UK registration note and a
compact five-market list. This should be a concise introduction, not several
screens of mission, vision and six value cards. Summarise purpose in two short
paragraphs; expose mission/values in a restrained inline disclosure if useful.

The market display is a flat world outline with five labels, plus a matching
text list. UK: operating tuition centre in Barking Riverside. Saudi Arabia,
India, United States and Kuwait: planned online expansion. India's CSR project
is shown in Projects, not represented as an existing local office.

Visual signature: white space, large editorial type, fine geographic linework,
navy body copy and a single cobalt signal. No rotating globe or flag carousel.
People can be reached from a small 'Meet our people' link to the later gallery.

### 02 — Institutions: the main commercial chapter

**Headline:** Bring technical education to your institution.
**Action:** Request an institutional consultation.

Deep navy and the preferred moving blue wave establish the main brand moment.
Use a wide 7/5-column composition: headline and compact promise on one side;
a programme brief on the other. The brief has four visible audience choices:
Schools / Universities & colleges / Businesses / CSR & community. Changing one
updates three items: who the programme serves, what can be tailored, and the
relevant programme examples. Keep a stable panel height and a visible action.

The illustration is a restrained 'learning network': one central learning
programme connected to four audience endpoints. It responds to audience choice
with one active path. Keep it clearly illustrative, without invented institution
names, testimonials, participant counts or corporate logos.

Below, show the source's five-step process as a compact horizontal rail:
Consultation → Proposal → Customisation → Delivery → Review. On phones use a
vertical list. It is a real explanation of the service, not a pinned timeline.
The consultation CTA carries audience and programme context into the form.

### 03 — Technical courses: a practical technology studio

**Headline:** Don't just learn technology. Build with it.

Change both surface and composition: a cool pale-blue studio with a large dark
illustration stage and an ordered course index. Desktop layout is approximately
5 columns of labelled index and 7 columns of stage/detail. Every course name is
visible; the selected row has an underline/edge marker. Avoid five identical
marketing cards and a horizontal carousel hiding the available programmes.

Each selection shows a concise explanation, intended outcome, audience subject
to level, instructor where approved, and **Enquire about this programme**.
'Programme details' expands the available curriculum information locally.
Do not fill the panel with repeated missing-data labels. Keep one availability
note and track missing facts internally. The stage can use CSS sticky within
its own section on desktop, but never captures scrolling or requires a scroll
quota before a visitor can continue.

| Programme | Illustration brief | Source-grounded content |
| --- | --- | --- |
| Cybersecurity | Existing security artwork; connected network with one protected route | Security principles, threats and practices; Mr Saleh leads; activities pending |
| AI & Agentic AI | Existing AI artwork extended by a simple input → agent → output example | Guided agentic application is the intended project; Mr Saleh leads |
| Robotics | Existing robot artwork with restrained signal/movement | Work towards two guided projects; kits in relevant package; specifics pending |
| Game programming | New small isometric game scene with a player and goal | Intended playable game; planned collaboration with OFGA |
| Machine learning | New editable-looking scatter plot with a classification boundary | Concepts and applications; project/instructor pending |

The game is an illustration, not a claim of a supplied working course project.
The ML plot is a sample explanation, not a live trained model. A single user
selection triggers a short visual demonstration and settles. On phones, use
five labelled expandable rows with the selected illustration inline and a
visible detail cue. Never require hover, dragging or horizontal swiping.

### 04 — GCSE: warm, personal and easy to choose

**Headline:** GCSE tuition that fits your child.
**Location line:** Barking Riverside, London · Online tuition.
**Action:** Request a free tuition consultation.

Use a warm paper interior inside a navy frame, tactile desk artwork and a quieter
serif headline. This contrasts with the technical studio through warmth,
contained framing, family-oriented copy and a selection/summary composition.
Gold can appear as a small inherited book detail, not a second dominant accent.

Desktop: preserved learning desk on one side, a short preference panel on the
other. Start with delivery: Barking Riverside or Online. Then choose tutor
category and format where applicable to that delivery. International / UK-based /
Premium tutors and 1:1 / proposed 1:5 / proposed 1:20 remain preferences for an
enquiry, not guaranteed available packages. Do not imply every combination is
offered at the centre. If availability mapping is not yet supplied, label it as
a preference to discuss and confirm during consultation.

Show a persistent plain-language summary of selections. Avoid an estimated price,
checkout, exam-board inventory or multi-step wizard built from unconfirmed data.
An optional subject requirement can be free text until the actual list arrives.
GCSE is the approved qualification; old A Level, IGCSE and entrance-exam inventory
must not carry forward automatically from placeholder content.

Parent progress belongs here, beneath the main selection panel: one clean sample
session report with topics, understanding, homework and next steps. Label the
portal as planned. Show the benefit of individual reporting even for group
sessions. Reuse ParentPreview where suitable, replacing invented attainment
claims with clearly labelled sample learning records.

### 05 — Products: a focused product theatre

**Headline:** Two products. New ways to learn and teach.

Use an ink/navy outer theatre with two substantial, contrasting showcases. Both
are marked **In development**. Show the mechanism rather than a grid of generic
AI features. Product identity remains visible when motion is paused.

**Interactive AI Tuition Platform** — a light whiteboard surface framed by a
navy conversational panel. Show one deterministic sample lesson: ask a question,
explain one step on the board, check understanding, show where human oversight
fits in the concept. Use a replay control and short transcript. Do not imply an
actual connected AI backend, a live supervising teacher or a delivered safety
system. Human oversight is a design principle and planned capability.

**Prompt to Learn (P2L)** — a vector production canvas: short educational prompt,
small storyboard strip and a vector explanation preview. Example: 'Explain how
a simple electric circuit works.' Animate a labelled sample circuit with a
controlled current-flow trace. Let the user play/pause/replay the prepared
example. It demonstrates intended workflow, not actual prompt generation,
output fidelity, rendering speed or commercial availability.

Two panels may stack as full-width editorial rows rather than small cards. The
AI panel feels conversational; P2L feels like a precise creative tool. A compact
product partnership action preselects the product in Contact. Parent reporting
is not a third product. Existing flashcards/study plan widgets are removed from
the public product narrative unless later confirmed as part of either product.

### 06 — Projects: documented work in the real world

**Headline:** Education in action.

Return to a warm documentary layout: a larger India CSR story and a smaller
Crescent College entry. The India entry states the approximate three-month
programme and Dr Peer Mohammed's support. Crescent College uses the supplied
participation fact only. Real photographs receive the strongest visual space
when supplied; until then use an honest location/duration typographic panel.
Avoid stock students presented as project participants, fake metrics, maps
claiming campuses, or fabricated outcomes. Expand detail only when it exists.

### 07 — People and collaboration: a compact portrait gallery

**Headline:** The people bringing it together.

Use a muted blue-grey gallery, preserved supplied portraits and stable names.
Keep the approved five identities and roles from the team slide. Do not attach
the new unnamed founder biography to a person without confirmation. Technical
leaders can appear as factual text entries where named and approved; add their
portraits when supplied. Do not invent portraits or names to fill the grid.

Keep the existing gentle fine-pointer card depth, but reduce decorative chrome
so the portraits and roles lead. Make the founder prominent without stretching
the gallery across several screens. Technical leadership and external
collaborators are distinguished by role labels and factual descriptions.
OFGA, Tutelr and the individual Amazon-employed partners need their relationship
wording reconciled before the collaborator area is finalised. No employer logo
wall should imply corporate sponsorship.

### 08 — Events: a compact cobalt bulletin

**Headline:** Keep learning with the experts.

One cobalt band with an editorial event list. Until dates are supplied, show
planned formats/topics and 'Ask about upcoming events'. Do not render empty
calendar grids, countdowns, pretend registration or a monthly schedule as a
confirmed promise. When real events arrive, use a consistent row with title,
speaker, date, time zone, delivery and registration destination. Reuse completed
confirmed event data in Projects rather than duplicating full case studies here.

### 09 — Contact: the right conversation

**Headline:** What would you like to make possible?

A navy wave closes the page. The form sits on a stable solid surface. Start
with Institution / Individual; product/event/general actions enter the relevant
category inside the appropriate branch. Reveal relevant fields and group them
into contact, learning/programme requirements and message. Do not present a
single intimidating list of every field in the source document.

Institution: organisation, contact, country, organisation type, programme,
participants/level, delivery, proposed dates and requirements.
Individual: contact, country, educational level, subject/course, tutor preference
if relevant, group preference, schedule, delivery and requirements.
Product/general enquiries show a shorter branch rather than asking student data.

All section actions preselect context; choices stay visible and editable. A
summary confirms what the person is asking about. Repeat that consultation is
free; introductory sessions are up to one hour for applicable programmes,
subject to availability and scheduling. Never call a locally prepared draft a
sent request. Backend delivery can be connected once the receiver is supplied;
the UI must clearly state its actual submission behaviour in the meantime.

## 4. One design system, different chapter compositions

These are NEXA chapter treatments, not several competing global themes.
The installed style skills provide references; user preferences and existing
brand decisions take priority over generic skill rules.

| Chapter | Surface | Composition | Recognisable signature |
| --- | --- | --- | --- |
| Opening | #07101F navy | Book and short routing copy | Existing dimensional book |
| About | #F9FBFF white | Editorial spread and market index | Geographic linework |
| Institutions | #07101F navy | Wide audience brief + process rail | Slow blue ribbon field |
| Technical | #EDF3F8 cool studio | Five-row index + dark demo stage | Practical outcome illustrations |
| GCSE | #F4F0E7 warm paper | Contained desk + preference panel | Tactile learning desk and session report |
| Products | #0B1524 ink | Two large interface showcases | Whiteboard and vector timeline |
| Projects | #F7F4EE paper | Documentary feature + short companion story | Real evidence and project captions |
| People | #DFE8F0 blue-grey | Compact asymmetrical portrait gallery | Supplied portraits and clear roles |
| Events | #175CDB cobalt | Compact bulletin | Date rows when confirmed |
| Contact | #07101F navy | Stable form beside contextual copy | Returning blue wave |

Colours are starting tokens to check in rendered compositions, not a mandate to
recolour every child component. Shared axes, a consistent cobalt action signal,
repeated spacing and stable button shapes tie the chapters together.

### Type, spacing and visual density

- Keep Instrument Serif and DM Sans. Improve roles before adding another font.
  Instrument Serif gives the opening/About/GCSE editorial moments; DM Sans
  leads institutions, technical controls and product interfaces.
- Display headlines: roughly 64–88px desktop and 38–46px phone. Section headings:
  48–64px desktop and 32–40px phone. Body: 17–18px with 1.55–1.65 line height.
  Labels: 11–12px, sparingly spaced. These are starting ranges, responsive to
  the actual copy rather than forced sizes that create awkward wrapping.
- Keep paragraphs near 55–68 characters. Cap most section introductions at
  one short paragraph and reveal detail where the user asks for it.
- Reuse the 1440px maximum content width and a common alignment grid. Major
  section padding begins around 112–144px desktop, 64–80px phone; compact
  sections use less. Group gaps must clearly exceed gaps inside groups.
- Calm, crisp surfaces: tight internal corners, modest panel radii, restrained
  shadows and thin rules only where they explain structure. Avoid repeated
  pill badges, floating labels, identical rounded cards and glow on every item.
- Boundaries have deliberate clean cuts, a short ruled chapter marker or one
  paper edge. Do not put an animated wave divider between every section.

## 5. Asset plan: preserve first, add where missing

| Existing item | V5 use | Action |
| --- | --- | --- |
| Supplied blue logo and book assets | White header, existing opening | Preserve originals and book interaction |
| `AmbientField.tsx` | Institutions and Contact brand atmosphere | Preserve the approved ribbon character; tune only placement/opacity if needed |
| `PathArt.tsx` security, AI and robotics art | Technical studio | Reuse existing art and scope additional motion outside original assets |
| `LearningDesk.tsx`, `RiveLearningDesk.tsx`, `learning-desk.riv` | GCSE | Keep their existing asset files; adapt the surrounding layout |
| `ParentPreview.tsx` | Planned tuition reporting concept | Reuse structure with labelled sample session content |
| Supplied team portraits | People gallery | Preserve files and factual names/roles |
| `Liquid.tsx` | Candidate for one optional decorative detail | Evaluate browser support first; not essential to the design |

New assets, in priority order:
1. Game programming illustration: compact playable-world visual, matching
   existing line/stroke and material quality. Decorative demonstration only.
2. Machine learning illustration: sample data, decision boundary and one
   controlled selection response. Original SVG/HTML, no new 3D runtime.
3. P2L vector circuit example: reusable SVG scene and storyboard thumbnails.
4. Institutional learning network: restrained connections and audience nodes.
5. Five-market outline: small factual diagram with status labels.
6. Project photography and missing leader portraits: supplied originals when
   available. Design useful layouts now without impersonating documentary proof.

Use existing SVG plus GSAP/Motion for these assets. Existing Rive remains useful
in GCSE. Add Rive or Spline scenes only when a specific authored asset offers a
clear visual improvement; installing a runtime does not create that asset.
The first v5 slice needs no new animation package. Canvas UI Liquid is optional,
with static fallback; the preferred AmbientField remains the main WebGL effect.

## 6. Motion score

### Expanded motion direction — user priority, 17 October 2026

The user explicitly wants more WebGL, animation variety and visible effects.
V5 must include authored visual moments beyond the existing wave and entrance
fades. Build them with each section, then tune the complete page together.
Premium technical motion is the dominant direction: directional light, flowing
data, material depth and explanatory movement, with the user's slower pacing.

| Placement | Effect and purpose | Implementation direction |
| --- | --- | --- |
| Institutions | Audience-responsive learning network: signals travel along the selected route, connecting the programme to its audience | Canvas/WebGL points and lines behind stable HTML labels; brief selection response followed by slow ambient movement |
| Technical studio | A WebGL data/light field changes with the selected subject: protected routes for Cyber, directed flow for AI, sensor traces for Robotics, a world grid for Game, clustered points for ML | One reused shader stage with parameter changes; existing SVG artwork remains the foreground and source of recognisable subject detail |
| About/global | Connections draw between the five labelled markets as the diagram enters view | SVG path drawing with GSAP; market status text stays stationary |
| GCSE | Existing Rive desk interaction, controlled foreground/background depth and smooth movement of the preference indicator | Preserve Rive assets; Motion for selection feedback; fine-pointer parallax limited to decorative artwork |
| AI product | A whiteboard explanation draws in sync with the prepared conversation; a soft scan/light pass marks the current step | GSAP SVG timeline and Motion state transitions; user-started sample, pause/replay |
| P2L | Storyboard frames resolve into vector geometry, then the circuit's current trace animates | SVG/GSAP drawing and masks, with a small perspective change on the demonstration frame; no separated/exploded layers |
| Two major chapter boundaries | A short directional light or mask reveal creates a designed handoff | Scroll-linked GSAP reveal in a bounded decorative strip; natural scrolling and fully visible text throughout |
| People/projects | Restrained portrait depth and image-mask reveal on supplied photography | Fine-pointer transform on portraits; one-time media reveal, static touch composition |

Institution network and technical stage are two new visual briefs in addition
to the approved wave. Prototype their rendering sequentially, giving each an
immediate SVG/static representation. Keep GPU surfaces local to their section,
dispose when removed, and pause when offscreen or hidden. Reuse rendering
resources within a stage rather than opening a canvas for every course/card.
Start with capped resolution/DPR, omit costly full-screen postprocessing, and
reduce density on phones while preserving the visual idea and tap response.

For the first technical prototype, compare a shader-enhanced stage with the
plain existing artwork at the same layout. The enhancement must visibly improve
depth or explain the subject; tune until it does. The phone version should
retain a lighter version of the effect where the device handles it well.

One optional optical experiment can use a small liquid/refraction edge around
the product artwork. Keep it outside text and controls. The installed Liquid
component's browser support must be assessed before choosing it; a portable
shader alternative or static optical border is acceptable. This experiment
does not block the two core new WebGL moments above.

Motion variety comes from different behaviours: ambient flow, selection-driven
responses, scroll-linked reveals, Rive interaction, vector explanations and
pointer depth. Avoid applying every technique to every section. Keep content
legible during effects, retain the book's own system and keep exploded views
removed. New motion is part of each implementation slice, not a later add-on.

Motion communicates hierarchy, selection and demonstration. Visible content
must be present without waiting for a long entrance. The user likes slow
atmosphere, not sluggish buttons or forced scrolling.

| Moment | Proposed treatment | Initial values |
| --- | --- | --- |
| Blue atmosphere | Existing ribbon field; no new fast pulse | Keep current slow time coefficients; pause offscreen/hidden |
| Section heading | One masked reveal with 12–20px travel | 0.85–1.1s, restrained ease-out, 60–90ms line stagger |
| Supporting content | Short opacity/vertical entrance | 0.65–0.85s; entire group settles within 1.3s |
| Audience/course selection | Indicator moves, content crossfades, stage changes | Immediate control feedback; 0.45–0.6s content, no blank exit wait |
| Outcome illustration | One meaningful line/signal/object action | 1.8–2.6s demonstration, then settle |
| GCSE preferences | Selected state and summary update | 0.18–0.24s feedback; 0.35–0.5s summary transition |
| Product preview | User-started sample explanation | 6–10s total across readable stages; pause/replay available |
| Portrait depth | Fine-pointer, restrained existing effect | Maximum approximately 2–3 degrees; static on phones |
| CTA | Border/background response, optional arrow shift | 0.18–0.24s; arrow travel at most 3px |

GSAP owns section entrances and SVG drawing. Motion owns controls and local
panel changes. Never animate the same property on the same element with both.
Use transforms and opacity for entrances. Keep form fields/body copy stable.
No new exploded diagrams, perpetual floating cards, section scroll capture or
long pinned sequences. On phones, all new sections follow ordinary document
scroll; selected art stays inline. The existing book remains its own system.

### Finish passes — user priority, 17 October 2026

Build these passes into the existing section tasks. A high-end finish requires
consistent detail at rest, during interaction and between chapters. Preserve
the approved NEXA identity when a style skill suggests a competing font, pill
navigation, exaggerated card radius or a different palette.

| Pass | Concrete NEXA treatment | Review criterion |
| --- | --- | --- |
| 1. Art direction sheet | Establish one reference composition for navy wave, cool studio, warm tuition and product theatre, using actual NEXA content and assets | Compare four settled frames before propagating the visual language |
| 2. Typography composition | Tune headline line breaks, serif/sans contrast, optical alignment, paragraph measure and label density | Headlines look composed at desktop and phone sizes; no isolated last words or competing heading weights |
| 3. Material and lighting | Quiet paper texture for GCSE, crisp instrument-like surfaces for Technical, restrained optical highlights for Products; use a common upper-left lighting direction | Shadows, edge highlights and artwork lighting agree; texture is visible as material without obscuring text |
| 4. Frame and depth hierarchy | One precise nested frame around key demos, concentric corner radii, subtle contact shadows; limited overlap only in decorative media | The demonstration feels dimensional while text and actions stay on a stable plane |
| 5. Interaction finish | Consistent hover/press responses, retargetable selection indicators, play/pause icon transitions and contextual enquiry summaries | Repeated and reversed actions remain smooth; no blank panel, delayed click feedback or jumping layout |
| 6. Chapter handoffs | Match a line, light direction or graphic edge across the two selected animated boundaries; elsewhere use deliberate clean cuts and spacing | A slow scroll reveals a coherent sequence with quiet pauses and distinct chapters |
| 7. Media direction | Consistent portrait crop, edge treatment, captions and illustration scale; preserve original assets, add missing art in their visual language | Real portraits look intentional together; original illustration detail remains legible at phone size |
| 8. Intentional phone composition | Recompose the studio, product timeline and tuition preferences for vertical use; preserve a lighter live effect and meaningful tap response where practical | Phone feels designed in its own right, with useful artwork, visible controls and natural scroll |
| 9. Loading and state continuity | Reserve media dimensions, start from a composed poster/settled frame, blend into the ready scene; style genuine loading/error/empty states using the same system | No unstyled flash, sudden empty canvas, moving layout or visual dead end when an asset is late |
| 10. Editorial reduction | Remove redundant badges, repeated explanations, decorative lines and competing effects after the page is assembled | Each view has an obvious focal point and primary action; signature moments have breathing room |

Visual review deliverables: four representative settled section frames, short
captures of audience/course switching and both product demonstrations, and a
phone view of each main chapter. Compare motion at normal scrolling speed as
well as at rest. State unavailable browser/device checks honestly. These
captures support design refinement; they are not a reason to expand the public
site with extra galleries, onboarding or implementation controls.

## 7. Content editing and publication rules

The full source document is an internal requirements source, not the final page
length. Use concise public copy, local details and internal pending fields.

- Five courses exactly: Cybersecurity; AI & Agentic AI; Robotics; Game
  Programming; Machine Learning. Institutions and families are audiences, not
  extra course entries. GCSE is a separate service with its own preferences.
- Two developing products exactly. Use 'in development' close to names and
  label concept examples. Progress/LMS features remain potential until agreed.
- Keep country status explicit: operating UK centre versus target online
  expansion. Do not claim permanent presence in five countries.
- Use intended project outcomes without inventing schedules, project specs,
  available seats, costs, tutor identities or exam-board coverage.
- Proposed 1:5 and 1:20 formats and premium tutor availability remain conditional.
- Preserve approved team facts; resolve the unnamed new founder bio before use.
- Record Mr Saleh's credentials, NASA internship documentation and employer
  context as pending publication review. Prefer specific confirmed credentials
  over 'world-renowned'. Do not put an unsupported 'world's first' claim on P2L.
- Personal Amazon-employed partners are not an Amazon corporate partnership.
  OFGA is named in the new source; reconcile Tutelr before changing its existing
  approved relationship. Never use employers' logos as automatic endorsements.
- Projects carry only known facts; missing evidence stays internal. Events do
  not acquire invented dates or registrations to make the design look complete.
- Parent reporting is required future software; a preview cannot claim that
  accounts, reports or notifications already operate.

Maintain a source-to-section content map with status and pending fields. This
is a compact editorial safeguard, not an additional public compliance section.

## 8. Implementation architecture

This planning pass changes documents only. Before implementing Next.js changes,
read relevant local guides under `node_modules/next/dist/docs/` per AGENTS.md.

Use the current Next.js, Tailwind, scoped CSS, GSAP, Motion and Rive stack.
Add focused modules under `components/v5/` and a business content module under
`lib/`; compose them in `Information.tsx` incrementally. Do not rewrite the book
or turn this into a whole-site framework migration. Reuse the current shared
logo/buttons, enquiry event/state and illustration code where their contracts fit.

Keep existing book-facing content records stable while introducing separate
business/service records. `PathwayId` currently serves book/illustration
purposes; replacing it wholesale to add Game/ML risks unrelated book regressions.
Audit consumers before changing that type. Keep section motion selectors scoped,
clean up timelines on unmount and refresh layout-dependent triggers after local
detail panels resize. Preserve anchor positions when switching course details.

Enquiry context includes audience, programme/product, country, delivery, tutor
category and format only when relevant. Preserve existing entries while changing
categories. One form is the shared destination; do not create parallel forms in
every section. Submission UI states reflect what the connected system actually
does. No production deployment is part of this plan revision.

## 9. Delivery order and visual review gates

1. Map all 15 source sections to the public experience or later operations;
   inventory assets and unconfirmed content. Establish scoped chapter tokens.
2. Build the Institutional section as a complete visual slice, with audience
   switching and contextual contact entry.
3. Build the technical studio shell and one existing-art course; complete Game
   and ML illustrations, then all five course records and detail states.
4. Build the warm GCSE selector and sample individual progress report. Review
   Institutions → Technical → GCSE consecutively on desktop and phone.
5. Build AI and P2L showcases as separate complete, labelled sample experiences.
6. Update compact About/global, Projects, People and Events content/layouts.
7. Finish the shared contact UI; align opening copy, header and old hash links.
8. Review the whole page, remove competing legacy content/effects, perform
   targeted interaction checks, typecheck, lint and production build.

The first visual gate is after Institution + one technical course: confirm
navy-wave → light-studio contrast and primary-action clarity. The second is
three consecutive completed service chapters. The third is Products with GCSE
immediately above, checking that product concepts do not resemble live tuition.
These are reviewable milestones, not repeated permission prompts during work
already authorised. Planning approval precedes implementation.

### Definition of a successful v5 UI

- From the first view, a visitor identifies the company, its two main audiences
  and a direct route; book completion is not required.
- In a screenshot without its heading, Institutions, Technical, GCSE and
  Products can be told apart through composition and artwork as well as colour.
- All five courses are discoverable without swiping; a course enquiry carries
  its selection. GCSE choices are clear preferences with a visible summary.
- Both product workflows can be explained by their displayed input/output;
  status labels make their development stage clear.
- The wave feels as calm as the approved reference. Major text is never hidden
  behind animation, and no new section takes control of phone scrolling.
- Existing logo, book, artwork files and supplied portraits are preserved.
- No invented proof, unavailable checkout or misleading sent/registered state.
- The real page holds together at 390px and 1440px, with a narrow 320px check:
  no overflow, clipped controls, oversized empty stages or unreadable labels.

Focus verification on visual quality and the actual user paths. Preserve normal
working keyboard/focus and static motion fallbacks as part of implementation;
a separate broad accessibility/SEO/infrastructure audit is outside this UI pass.

## 10. ROI and scope control

| Work | Visual benefit | Relative effort | Decision |
| --- | --- | --- | --- |
| Composition, typography and surface hierarchy | Very high | Medium | First |
| Preferred wave in key brand moments | High | Low with existing asset | First |
| Interactive technical studio with reused art | High | Medium | Core |
| GCSE preference summary and individual report preview | High | Medium | Core |
| Two specific product demonstrations | High | Medium/high | Core, one at a time |
| Real portraits/project photography | High | Low once supplied | Use as available |
| Flat market diagram | Moderate | Low | Supporting |
| New full-screen liquid scene or 3D globe | Uncertain | High | Defer |
| Another book physics overhaul/exploded scroll sequence | Poor fit with current direction | High | Excluded |
| Installing more overlapping UI libraries | Low without a concrete design need | Ongoing | Stop adding for now |

## 11. Requirements retained for later operational work

The source's full business requirements remain accounted for, even while UI is
prioritised. These systems need explicit implementation scope after the page:

- Real enquiry receiver, storage/delivery, truthful success/failure/retry.
- Confirmed event registration, registrant records and confirmation messages.
- Tutor/parent/admin accounts; assigned students/sessions; parent-child linking.
- Individual report per student per session, including every student in groups;
  topics/objectives/participation/understanding/progress/strengths/improvement/
  homework/recommendation, with parent history and optional notifications.
- Admin tutor/session management, missing reports, permissions and audit records.
- Regional programme and pricing data once supplied; safeguarding/privacy and
  access controls before any children's records are stored or launched.

Required business inputs: enquiry recipient/contact details; exact legal entity
and registration; subject list and tutor/delivery availability; programme levels,
duration/curricula; named leader bios/portraits; collaborator agreements; project
photos/details; event dates and registration destination. These inputs do not
block the visual build of known content. Do not invent them to close a task.
