## Commands

- `npm run dev` — Next.js 16 dev server (Turbopack is the default).
- `npm run build` / `npm run start` — production build and serve.
- `npm run lint` — ESLint flat config. `next build` does **not** lint, so run this separately.
- No test suite exists. Verify changes with `npm run lint && npm run build`; use `npm run dev` for UI checks.
- Requires Node.js >= 20.9 (Next.js 16). Use `npm ci` for reproducible installs.

## Architecture

- Single-page App Router app. `app/page.tsx` is a client component that toggles between `SimplePortfolio` (default) and `Terminal` via `ToggleButton`.
- All content is static TypeScript in `data/`; `lib/dataFetcher.ts` is the access layer. There are no API routes, server actions, CMS, or runtime data fetches.
- Edit portfolio content in `data/projects.ts`, `data/experience.ts`, and `data/devInfo.ts`.

## Terminal quirks

- Commands live in `lib/commandHandler.ts`; `handleCommand()` returns an HTML string.
- `components/Terminal.tsx` renders output with `dangerouslySetInnerHTML`. Wrap output with `colorize()` and escape user-controlled text before returning it.
- `cat <slug>` matches the project `slug` (case-insensitive), not its `name`; `ls` lists slugs.
- `colorize()` only recognizes `red`, `green`, `blue`, `yellow`, and `lavender`; unknown colors render unstyled.
- Terminal output is not Markdown. `SimplePortfolio` renders project content with `react-markdown` and Tailwind Typography, but terminal `cat`/`experience` show raw text/markup.

## Gotchas

- Remote images must be allowlisted in `images.remotePatterns` in `next.config.ts` (currently `builtin.com` and `raw.githubusercontent.com`). A new image host will fail at runtime until added there.
- Styling uses Tailwind utilities with Catppuccin Mocha hex values plus CSS variables in `app/globals.css`; CSS modules live in `styles/`.
- `README.md` is stale create-next-app boilerplate (it mentions Geist; `app/layout.tsx` actually uses Inter). Trust `package.json` and the code over the README.
