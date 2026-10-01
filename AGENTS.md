<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Todo lo que sigue se escribió a mano: `next dev` hace upsert del bloque de arriba y conserva el resto del archivo.

## Project state

`open-daycare` is still the raw `create-next-app` scaffold (Next 16.3.7, React 19.2, Tailwind 4, TypeScript). `app/page.tsx` is the CNA demo, not product code — don't assume any product screen, route, or data layer exists yet. No backend, no DB, no test framework.

## Design source of truth

- `references/pantallas/*.dc.html` — 16 Spanish screen mockups (feed, login, ninos, perfil-nino, avisos, resumen-dia, crear-publicacion, detalle-publicacion, agregar-nino, activar-cuenta, vincular-padre, familia-*, foto, mi-cuenta, index). They are the spec for routes, layout and UI copy. Open one in the browser (Playwright, `file://`) to see it rendered; they load only the local `./support.js`.
- The mockups use **Fredoka + Nunito** and a warm palette (`#f6ecdf` background, `#3f362e` text). That contradicts the default Geist + zinc + `prefers-color-scheme: dark` setup in `app/globals.css` — decide deliberately per screen instead of mixing the two by accident.
- `references/screenshots/*.png` — PNG renders of several mockups, for a quick look without a browser.
- `references/pantallas/support.js` is a **generated vendored runtime** ("GENERATED ... do not edit"). Never edit, reformat, or "fix" it.
- Write specs, UI copy and route names in **Spanish** to match the references and the `Aprobado` state in the spec workflow.

## Commands

```
npm run dev            # Turbopack dev server, port 3000
npm run build          # production build
npm run lint           # `eslint` with NO path -> lints the whole repo
npx tsc --noEmit       # typecheck (there is no `typecheck` script)
npx eslint app         # lint only your code
```

- There is **no test runner and no test script**. Don't add one unasked.
- `npm run lint` is **not green and can't be made green**: the generated `references/pantallas/support.js` ships 2 errors (`react-dom.render` deprecated, `@next/next/no-assign-module-variable`) plus 8 warnings. Check your own work with `npx eslint app` (clean today) and ignore that baseline.
- Faster than a full build to verify a change: `next dev` writes `.next/dev/lock` (a second `next dev` prints the running URL and PID instead of starting a duplicate) and forwards browser console errors into its own terminal. The running dev server also exposes the Next.js MCP at `/_next/mcp` with `get_compilation_issues` / `compile_route`. The upstream `next-dev-loop` skill is **not** installed here.

## Framework quirks worth knowing

- Bundled version-matched docs: `node_modules/next/dist/docs/`. Most useful: `01-app/02-guides/ai-agents.md` and `01-app/02-guides/upgrading/version-16.md`.
- **Route types are generated**: `app/layout.tsx` uses the global `LayoutProps<"/">` helper declared in `.next/types/routes.d.ts` and `.next/dev/types/routes.d.ts` (both in tsconfig `include`). Use `PageProps<'/ruta'>` / `LayoutProps<'/ruta'>` instead of hand-written prop types. If `.next` is deleted, `npx tsc --noEmit` fails until `next dev` or `next build` regenerates them.
- In this version `params` and `searchParams` are **Promises** and must be awaited.
- Tailwind v4 is CSS-first: there is no `tailwind.config.js`, tokens live in `app/globals.css` under `@theme`, and v3 patterns (`@tailwind base/components/utilities`, config `extend`) do not apply.
- Path alias `@/*` maps to the **repo root** (`./*`), not `./src/*` — so `@/app/components/X`, not `@/components/X`.
- `next.config.ts` is empty: no rewrites, no image config, no env loading. `.env*` is gitignored and no env file exists.

## Specs come first

- Skills `spec` and `spec-impl` in `.agents/skills/`, installed from `klerith/fernando-skills` and pinned by `skills-lock.json`. Read the relevant `SKILL.md` before touching a feature — the rules below only summarize it.
- Specs live in `specs/NN-kebab-slug.md`; `specs/` **does not exist yet**. Numbering is sequential, zero-padded, starting at `01-`. Match the language and state wording of existing specs.
- `/spec` writes no code and stops right after saving the file. `/spec-impl` refuses to run unless the spec's state means "Approved" (`Approved`, `Aprobado`, …) — the human flips that flag, never the agent.
- `/spec-impl` works on branch `spec-NN-slug` (default branch is `master`), implements **one plan step at a time** and pauses for diff review, and **never commits**. Committing is the user's call.
- Out-of-scope requests go to a follow-up spec, not into the code on the current branch.

## Spec verification

- Agent `spec-verifier` in `.opencode/agent/spec-verifier.md` (`mode: all`): verifies, fixes, and ticks the `## Acceptance criteria` checkboxes of a spec in `specs/`. It marks `[x]` only with evidence (command green, DOM snapshot, screenshot visually compared) — never by deduction — corrects failures with the minimal in-scope change, and never commits.
- Command `/verify-spec <NN|ruta>` in `.opencode/command/verify-spec.md` runs that agent against a spec (e.g. `/verify-spec 01`). Ask for the spec if the argument is empty.
- Its verification methods: static inspection (Read/Grep), `npx tsc --noEmit` and `npx eslint app`, Next.js good-practice checks via Context7 (preferring bundled `node_modules/next/dist/docs/`), and Playwright MCP visual comparison against `references/screenshots/*.png` / `references/pantallas/*.dc.html` rendered via `file://`.

## Playwright / MCP

- Every Playwright artifact (screenshots, traces, console logs, snapshots) must land in `.playwright-mcp/` — it is gitignored. (`home.png` at the repo root is a tracked leftover; don't add more like it.)
- Context7 is for framework/library docs, but for Next.js itself prefer the bundled `node_modules/next/dist/docs/` over the network.
