## Commands

- `npm run dev` — Next.js 16 dev server (Turbopack is the default).
- `npm run build` / `npm run start` — production build and serve.
- `npm run lint` — ESLint flat config. `next build` does **not** lint, so run this separately.
- No test suite exists. Verify changes with `npm run lint && npm run build`; use `npm run dev` for UI checks.
- Requires Node.js >= 20.9 (Next.js 16). Use `npm ci` for reproducible installs.

## Architecture

- Single-page App Router app. `app/page.tsx` is a client component that toggles between `SimplePortfolio` (default) and `Terminal` via `ModeToggle`.
- All content is static TypeScript in `data/`; `lib/dataFetcher.ts` is the access layer. There are no API routes, server actions, CMS, or runtime data fetches.
- Edit portfolio content in `data/projects.ts`, `data/experience.ts`, `data/awards.ts`, and `data/devInfo.ts`.

## Terminal quirks

- Commands live in `lib/commandHandler.ts`; `executeCommand()` returns structured results (`text`, `markdown`, `clear`, `exit`). Add commands to the `commands` registry and keep `help` and completion metadata in sync.
- `components/Terminal.tsx` renders entries with React and ReactMarkdown; do not reintroduce `dangerouslySetInnerHTML`.
- Completion and fuzzy matching live in `lib/terminal/completion.ts` and `lib/terminal/fuzzy.ts`; command history is persisted to localStorage under `portfolio.terminal.history.v1` by `lib/terminal/storage.ts`.
- `cat <slug|name>` matches a project slug or name (case-insensitive, exact/prefix/includes); `ls` lists slugs.
- Terminal output is Markdown. `cat`, `about`, `experience`, `awards`, `contact`, and `open` return Markdown; `help`, `ls`, `history`, `neofetch`, `date`, `pwd`, and `echo` return preformatted text.
- Terminal shortcuts: Tab/Shift+Tab completion cycling, ↑/↓ history, Ctrl+L or Ctrl+Shift+L clear, Ctrl+C cancel, Ctrl+U clear line, Ctrl+W delete word. Ctrl+L is browser-reserved in some browsers, so keep the clear button and Ctrl+Shift+L fallback.

## Gotchas

- Remote images must be allowlisted in `images.remotePatterns` in `next.config.ts` (currently `builtin.com` and `raw.githubusercontent.com`). A new image host will fail at runtime until added there.
- Styling uses Tailwind utilities with Catppuccin Mocha hex values plus CSS variables in `app/globals.css`; CSS modules live in `styles/`.
- `README.md` is stale create-next-app boilerplate (it mentions Geist; `app/layout.tsx` actually uses Inter). Trust `package.json` and the code over the README.
