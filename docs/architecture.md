# Portfolio Architecture

Architectural overview focusing on directory structure, component hierarchy, and key patterns.

**Related**: [AGENTS.md](../AGENTS.md) | [design_guidelines.md](./design_guidelines.md) | [landing_page_sections.md](./landing_page_sections.md)

## Architecture Style

**Static Site Generation (SSG)** with client hydration:
- Next.js App Router pre-generates all routes at build time
- React hydrates interactive components
- MDX processed during build
- API routes for runtime operations (Telegram)

## Directory Structure

```shell
portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # i18n routes
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # Blog list
│   │   │   │   └── [slug]/page.tsx   # Blog post
│   │   │   └── layout.tsx
│   │   ├── api/telegram/route.ts     # Contact form API
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── sections/                 # Page sections (About, Skills, etc.)
│   │   ├── layout/                   # Layout components (Header, Footer, Nav)
│   │   ├── ui/                       # Reusable UI (TerminalPrompt, etc.)
│   │   │   └── backgrounds/          # Background system
│   │   └── blog/                     # Blog components (PostCard, TOC, etc.)
│   ├── hooks/                        # Custom hooks (useTypingAnimation, etc.)
│   ├── lib/                          # Utilities
│   │   └── blog/                     # Blog utilities (posts.ts, mdx.ts)
│   ├── i18n/                         # Internationalization config
│   └── contexts/                     # React contexts
├── content/blog/                     # MDX blog content
│   └── [post-id]/
│       ├── metadata.json
│       ├── en.mdx
│       └── es.mdx
└── docs/                             # Documentation
```

## Component Hierarchy

```shell
app/layout.tsx (Root)
└── app/[locale]/layout.tsx (i18n Provider + AdaptiveBackground)
    └── app/[locale]/page.tsx (Landing)
        ├── Header (Navigation + LanguageSelector)
        ├── Sections (About, Skills, Experience, Blog, Contact)
        └── Footer
```

## Component Organization Patterns

**sections/** - Orchestration components
- Manage section-level state
- Compose UI components
- Handle animations

**layout/** - Structural scaffolding
- Page structure
- Responsive behavior
- Global navigation

**ui/** - Reusable presentational
- Terminal UI components
- Minimal business logic
- Prop-driven customization

**blog/** - Blog domain-specific
- MDX integration
- Reading experience
- Blog navigation/filters

## State Management

**Local State** - `useState` for component UI state (animations, toggles)

**Context** - Cross-cutting concerns (`MobileMenuContext`)

**Custom Hooks** - Reusable stateful logic:
- `useTypingAnimation` - Character-by-character typing
- `useTerminalCursor` - Cursor blinking
- `useBackgroundType` - Route-based background detection
- `useLanguageSwitch` - i18n switching

**Server State** - Async server components for blog posts/metadata

## Routing

```shell
/[locale]                 → Landing page
/[locale]/blog            → Blog list
/[locale]/blog/[slug]     → Blog post
/api/telegram             → Contact form API
```

**Static Generation**: All routes pre-generated via `generateStaticParams()`

**i18n Middleware**: Auto-redirects `/` → `/en` or `/es` based on `Accept-Language`

## Key Architectural Patterns

### Typing Animation System

**State Machine**: `IDLE → TYPING → COMPLETE`

**Components**:
- `useTypingAnimation` - Variable speed typing (50 + random(30) ms/char)
- `useTerminalCursor` - Blinking cursor (530ms interval)
- `TerminalPrompt` - Visual rendering

**Section Animation Sequence**: `IDLE → CAT_COMMAND → CAT_OUTPUT → SECOND_COMMAND → SECOND_OUTPUT → COMPLETE`

### Blog System

**Content Structure**:

```shell
content/blog/[post-id]/
├── metadata.json          # id must match folder name
├── en.mdx
└── es.mdx
```

**Dual-identifier routing**:
- `metadata.id` → Physical folder
- `metadata.slug[locale]` → Public URL (can differ per language)

**Build Flow**: Scan → Parse metadata → Generate params → Process MDX (rehype/remark/syntax highlighting) → Static HTML

### i18n System

**Structure**:

```shell
i18n/messages/
├── en.json               # { "Section": { "key": "value" } }
└── es.json
```

**Usage**: `const t = useTranslations('Section'); t('key')`

**Blog i18n**: Separate MDX files per locale, different slugs allowed

## Build & Deployment

**Build**: `npm run build`
1. TypeScript compilation
2. Next.js + Turbopack compilation
3. Static page generation (all locales + blog posts)
4. MDX processing + syntax highlighting
5. Asset optimization (fonts, CSS, images)

**Output**: `.next/` directory with static files + API routes

**Deployment**: Static hosting (Cloudflare Pages, Vercel, Netlify, S3+CloudFront)

**Environment**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
