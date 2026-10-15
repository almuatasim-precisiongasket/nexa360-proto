# Free MCP research for NEXA360

Researched 15 October 2026. Research only: no packages installed and no MCP configuration changed. These are development tools; they do not become website dependencies or produce the 3D book themselves.

## Recommendation

Use **Next.js DevTools MCP + Chrome DevTools MCP** as the smallest runtime set. Next DevTools diagnoses the running Next.js application; Chrome DevTools measures browser rendering, network activity and animation performance. Add **shadcn MCP with the public React Bits registry** when retrieving reusable effects. Context7 is optional for cross-library documentation. Add Playwright only when cross-browser automation is needed; loading two browser-control servers at once adds overlapping capabilities.

## Candidates

| Server | What it contributes | Free model, license and requirements |
| --- | --- | --- |
| [Next.js DevTools MCP](https://github.com/vercel/next-devtools-mcp) | Discovers Next.js development servers; proxies errors, routes and logs. Current releases expose `nextjs_index`, `nextjs_call`, `nextjs_docs`, `browser_eval`. The latter two point to bundled docs and agent-browser CLI; they do not themselves fetch docs or operate a browser. | Local, MIT; no API subscription required. Node 20.19+ or newer LTS, npm/pnpm, running Next.js 16+ for runtime calls. |
| [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Screenshots, console/network debugging, browser actions, performance traces and insights. Best fit for diagnosing heavy GSAP / WebGL frames. | Local, [Apache-2.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/LICENSE); no API key required for local operation. Node LTS, npm and current Chrome. Chrome and Chrome for Testing officially supported. |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Browser interaction through accessibility snapshots; screenshots and automation across Chrome, Edge, Firefox and WebKit. Useful for keyboard flows, responsive layouts and cross-browser behavior. | Local, Apache-2.0; no hosted account/API key for local browser use. Node 18+, MCP client and browser installation. `--isolated` avoids saving the profile. File URLs are blocked by default; use the localhost Next dev server. |
| [Context7](https://github.com/upstash/context7) | Version-oriented documentation lookup for Next.js, GSAP and other indexed libraries; `resolve-library-id` and `query-docs`. Verify important behavior against the library's own official docs. | MIT MCP adapter, but its backend/parser/crawler are private hosted services. Running the adapter locally does not remove hosted limits. The [Free plan](https://context7.com/plans) includes public repositories and 1,000 API calls/month. Key recommended; remote endpoint also supports OAuth. Current `ctx7 setup` requires Node 22.13+. |
| [shadcn MCP](https://ui.shadcn.com/docs/mcp) + [React Bits](https://reactbits.dev/get-started/mcp) | Searches, lists and installs registry components. Officially supported route for React Bits effects, including TypeScript variants; the [creator confirms shadcn MCP support](https://github.com/DavidHDev/react-bits/discussions/664). | Local [MIT shadcn tooling](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md), public registry over the internet. Free React Bits components require no paid Pro license. Valid project `components.json`, Node/npm, and each chosen component's dependencies are needed. |

React Bits components have [MIT + Commons Clause terms](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md): they may be used in commercial websites, with notices retained, but the components themselves cannot be sold, sublicensed or redistributed as a component product. This differs from plain MIT. The [React Bits Pro MCP](https://pro.reactbits.dev/docs/mcp) uses separate registries and a license key; it is not the free option. Third-party packages named `reactbits-mcp-server` should not be represented as the official React Bits server.

## Privacy and practical limits

- **Next DevTools:** [README](https://github.com/vercel/next-devtools-mcp#privacy--telemetry) documents anonymous usage telemetry enabled by default. Set `NEXT_TELEMETRY_DISABLED=1` to opt out. Runtime tools expose project diagnostics to the connected coding agent.
- **Chrome DevTools:** [README](https://github.com/ChromeDevTools/chrome-devtools-mcp#usage-statistics) says usage statistics are enabled by default. Use `--no-usage-statistics`; use `--no-performance-crux` to stop trace URLs being sent to Google's CrUX API. Browser content is visible to the MCP client. Use a separate development browser profile.
- **Playwright:** default profiles can persist logged-in state. Its README documents `--isolated` and workspace file restrictions. This research did not establish a comprehensive telemetry guarantee; do not claim zero telemetry merely because it runs locally.
- **Context7:** its [privacy explanation](https://context7.com/plans) says documentation queries and library names go to its servers. Keep queries generic; do not include private code or credentials. Free is quota limited, and therefore differs from the local tools above.
- **shadcn/React Bits:** registry lookups need network access; installation copies source and adds dependencies. Review each component and dependency before adding it. No blanket zero-telemetry assertion was verified.

## Setup examples for later

These are proposed commands/configuration, not actions already performed. Official READMEs commonly show `@latest`; record the resolved version after setup for reproducibility.

Official [Next DevTools Codex setup](https://github.com/vercel/next-devtools-mcp#client-specific-setup):

```powershell
codex mcp add next-devtools -- npx next-devtools-mcp@latest
```

Official [Chrome DevTools Codex setup](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/client-configurations.md), with its documented telemetry opt-outs added:

```powershell
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest --no-usage-statistics --no-performance-crux
```

The Chrome guide has a Windows configuration fallback using `cmd /c npx`, `SystemRoot`, `PROGRAMFILES`, and a 20-second startup timeout. Use it only if ordinary startup fails.

Official [Playwright Codex example](https://github.com/microsoft/playwright-mcp#codex):

```powershell
codex mcp add playwright npx "@playwright/mcp@latest"
```

Official [shadcn Codex configuration](https://ui.shadcn.com/docs/mcp#codex):

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

React Bits registry entry in the project's existing `components.json` (merge into the complete valid file):

```json
{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

The [official React Bits README](https://github.com/DavidHDev/react-bits#installation) gives this TypeScript + Tailwind component example:

```powershell
npx shadcn@latest add @react-bits/BlurText-TS-TW
```

Context7's [manual setup](https://github.com/upstash/context7#installation) uses `https://mcp.context7.com/mcp` with `Authorization: Bearer YOUR_API_KEY`. Its setup command is `npx ctx7 setup`, which starts authentication and configuration; it has intentionally not been run.

For this project, select a small number of React Bits effects and coordinate them under the main GSAP timeline. MCP tools help source code and inspect results; book geometry, page turns, scroll orchestration, reduced-motion behavior and mobile fallbacks still require implementation and browser verification.
