# NEXA360 — The Book of Becoming

A cinematic education website built with Next.js, TypeScript, GSAP and React Three Fiber. The approved academic logo and articulated robotic arm are retained from the supplied site.

## Run locally

Use Node.js 22.13 or newer (Node 24 LTS recommended).

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:3000. This Next.js application runs through its development server; opening an HTML file does not launch it.

## Production

```powershell
npm run build
npm run start
```

Both servers bind to the local computer by default. Deploy with a Node.js host that supports Next.js.

## Source map

- `app/`: route, metadata, locally served fonts and global design tokens.
- `components/BookStory.tsx`: one GSAP timeline shared by scroll, chapter selection, keyboard and drag controls.
- `components/BookCanvas.tsx`: deferred React Three Fiber canvas, demand rendering, font readiness and renderer fallback.
- `lib/book-geometry.ts`: curved paper attached to the spine.
- `lib/book-scene.ts`, `lib/book-props.ts`, `lib/book-textures.ts`: book construction, approved arm, chapter props, page textures and explicit trophy lettering.
- `lib/content.ts`: approved chapter and pathway copy.
- `lib/media.ts`, `lib/site-events.ts`: shared responsive settings and typed browser event contracts.
- `components/Information.tsx`: editorial sections, tuition details, collaboration and footer.
- `components/Pathways.tsx`, `components/Inquiry.tsx`: native details dialog and inquiry drafts.
- `components/BrandIntro.tsx`: home-entry intro, book readiness, bounded fallback, Skip/Escape and replay.
- `components/book-mobile.css`: phone and landscape book layout, imported after the main stylesheet to preserve its overrides.
- `components/TextReveal.tsx`, `components/SiteEffects.tsx`: scoped heading reveals and fine-pointer interaction details.
- `public/assets/nexa-logo.png`: unmodified supplied logo.
- `dist/`: original static website, retained as a reference.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

Tests exercise reversible story state, stable reading positions, paper geometry and UV orientation. Browser review notes and practical limits are in `docs/implementation-notes.md`. Real browser review is still needed for additional browsers and physical touch devices.

## Inquiry behavior

The form prepares a draft that visitors can review, copy or download. It has no message delivery backend and never reports a message as sent. Form data is not stored by this application. AI and robotics are clearly identified as future educational visions.

## Research and licensing

- `docs/nextjs-research.md`: stack, skill and motion decisions.
- `docs/mcp-research.md`: free MCP comparison and optional setup examples.
- `docs/legacy-static-site.md`: original static-site notes.
- `THIRD_PARTY_NOTICES.md`: React Bits adaptation, GSAP and font notices.

Context7 was used for current documentation. Other researched MCP servers are optional development tools and are not required to run the website.

## Maintenance

See [the codebase review](docs/codebase-review.md) for module responsibilities,
resource ownership, event contracts, review findings and remaining limitations.
`dist/` is an archived reference; edit the Next.js source for the deployed site.
