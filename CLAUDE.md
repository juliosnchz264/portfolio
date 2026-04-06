# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Dev server with Turbopack HMR on localhost:3000
pnpm build      # Production build (Turbopack)
pnpm lint       # ESLint
pnpm start      # Serve production build
```

> Package manager is **pnpm** (not npm). Always use `pnpm` to avoid lockfile conflicts.

## Tech Stack

- **Next.js 15** App Router + **React 19** + **TypeScript** strict mode
- **Tailwind CSS 4** (PostCSS only, no tailwind.config.ts needed)
- **next-intl 4**: route-based i18n (`/en`, `/es`)
- **Framer Motion 12** + **AOS**: animations
- **next-mdx-remote** + **Shiki 3**: MDX blog with syntax highlighting
- **clsx** + **tailwind-merge** via `cn()` from `src/lib/utils.ts`

## Architecture

### Routing

```
/[locale]              → src/app/[locale]/page.tsx        (landing, SSG)
/[locale]/blog         → src/app/[locale]/blog/page.tsx   (blog list, SSG)
/[locale]/blog/[slug]  → src/app/[locale]/blog/[slug]/    (post, SSG)
/api/telegram          → src/app/api/telegram/route.ts    (contact form, runtime)
```

Middleware (`src/middleware.ts`) auto-redirects `/` → `/en` or `/es` via `Accept-Language`.

### Component Layout

```
app/[locale]/layout.tsx       ← next-intl provider + AdaptiveBackground
  └── app/[locale]/page.tsx   ← composes all sections
        ├── Header            ← fixed nav + LanguageSelector
        ├── sections/About, Skills, Experience, Contact
        ├── blog/BlogSection
        └── TerminalFooter
```

- **`sections/`** — orchestrate state, animations, i18n
- **`ui/`** — pure presentational; prop-driven, no business logic
- **`layout/`** — structural scaffolding, responsive behavior
- **`blog/`** — MDX, TOC, tag filtering

### Blog System (Dual-Identifier Routing)

Content lives in `content/blog/[post-id]/`:

```
content/blog/zero-to-portfolio/
├── metadata.json    ← "id" MUST match the folder name exactly
├── en.mdx
└── es.mdx
```

`metadata.id` → resolves to the physical folder.
`metadata.slug.en` / `metadata.slug.es` → public URL (can differ per language and per locale).

Example: folder `zero-to-portfolio/`, English URL `/en/blog/from-zero-to-portfolio`, Spanish URL `/es/blog/de-cero-a-portfolio`.

Blog utilities: `src/lib/blog/posts.ts` (`getAllPosts`, `getPostBySlug`, `getPostsByTag`, etc.)

### i18n

Messages in `src/i18n/messages/{en,es}.json`. Usage:

```ts
const t = useTranslations('SectionName');
t('key');
t.raw('key'); // for structured objects (arrays, nested)
```

### Section Animation Pattern

Every landing section follows the same state machine:

```
IDLE → CAT_COMMAND → CAT_OUTPUT → SECOND_COMMAND → SECOND_OUTPUT → COMPLETE
```

Uses `useAOSVisibility` (gates animation until element is in viewport) + `useTypingAnimation` (character-by-character, 50 + rand(30) ms/char). All timing constants live in `src/constants/animations.ts`.

Use the **ref pattern** to avoid `runAnimation` as a `useEffect` dependency:

```ts
const runAnimationRef = useRef(runAnimation);
runAnimationRef.current = runAnimation;
useEffect(() => { if (shouldRender) runAnimationRef.current(); }, [shouldRender]);
```

### Contact API

`src/app/api/telegram/route.ts` sends messages via `fetch` to the Telegram Bot API (no external library).
Required env vars in `.env`:

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

The bot must receive a `/start` message from the target user before it can send to that chat. Get the correct `chat_id` from `https://api.telegram.org/bot<TOKEN>/getUpdates` after sending `/start`.

## Code Conventions

- **className**: always `clsx(...)` or `cn(...)`, never template strings
- **Type assertions** (`as`): avoid — use type guards instead (see `AGENTS.md` antipatterns)
- **Imports**: React/Next → third-party → relative (`@/*` aliases for `src/`)
- **Constants**: `UPPER_SNAKE_CASE` in `src/constants/`; never inline magic values
- **New sections**: follow the AnimationState enum + ref pattern from `About.tsx`
- **New blog posts**: create folder → `metadata.json` (id = folder name) → `en.mdx` + `es.mdx` → rebuild

## Design Constraints

- Background: `#000000`, primary accent: `#00ADD8` (gopher-blue), terminal highlight: `#39D353` (terminal-green)
- Fonts: `Geist` (sans) + `Geist_Mono` (monospace) via CSS variables `--font-geist-sans` / `--font-geist-mono`
- All sections follow: section title → terminal prompt typing → content reveal
- Always support `prefers-reduced-motion`
- ASCII art characters (`█`, `╗`, `║`, etc.) render as **double-width** in some fonts — adjusting visual alignment may require 2 spaces per 1 visual column offset

## Key Documentation

- `AGENTS.md` — full code standards, antipatterns, and patterns with code examples
- `docs/design_guidelines.md` — colors, typography, component visual specs
- `docs/architecture.md` — component hierarchy, state management, build flow
- `docs/landing_page_sections.md` — per-section content specifications
