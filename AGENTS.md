# DieGopherLT Portfolio - Technical Guidelines

A terminal-inspired portfolio website built with Next.js 15 and modern web technologies. This project combines Unix aesthetic principles with professional portfolio presentation, featuring a multilingual blog system and interactive terminal-style UI components.

This document provides complete technical guidelines for development. For project overview and user documentation, see [README.md](./README.md). For design specifications, see [docs/design_guidelines.md](./docs/design_guidelines.md).

## Quick Reference

### Essential Commands

- **Build**: `npm run build` - Compiles Next.js app with Turbopack for production
- **Dev**: `npm run dev` - Starts development server with Turbopack hot reload
- **Lint**: `npm run lint` - Runs ESLint on TypeScript and JSX files
- **Start**: `npm start` - Runs production server (after build)

### Project Structure

```shell
portfolio/
├── src/                           # Source code (Next.js App Router)
│   ├── app/
│   │   ├── [locale]/             # i18n routes (landing, blog)
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx      # Blog listing
│   │   │   │   └── [slug]/page.tsx # Blog post detail
│   │   │   └── layout.tsx         # Locale layout wrapper
│   │   ├── api/telegram/          # Contact form webhook
│   │   ├── layout.tsx             # Root layout
│   │   └── not-found.tsx          # 404 page
│   ├── components/
│   │   ├── sections/              # Landing sections (About, Skills, Experience, Contact)
│   │   ├── layout/                # Structural layout (Header, Footer, Navigation)
│   │   ├── ui/                    # Reusable UI (TerminalPrompt, ContactForm, etc.)
│   │   └── blog/                  # Blog components (PostCard, TOC, MDXComponents)
│   ├── hooks/                     # Custom React hooks (useTypingAnimation, etc.)
│   ├── lib/
│   │   ├── blog/                  # Blog utilities (posts.ts, mdx.ts)
│   │   └── utils.ts               # General utilities
│   ├── constants/                 # Constants (animations.ts, ascii.ts, navigation.ts)
│   ├── contexts/                  # React contexts (MobileMenuContext)
│   └── i18n/                      # i18n config and messages
├── content/blog/                  # Blog post content
│   └── [post-id]/                 # Folder matches metadata.id
│       ├── metadata.json          # Post metadata
│       ├── en.mdx                 # English post
│       └── es.mdx                 # Spanish post
├── public/                        # Static assets
├── docs/                          # Project documentation
├── package.json                   # Dependencies & scripts
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
└── tailwind.config.ts             # Tailwind CSS configuration
```

### Documentation

- **Project Overview**: [README.md](./README.md)
- **Design Guidelines**: [docs/design_guidelines.md](./docs/design_guidelines.md)
- **Landing Page Sections**: [docs/landing_page_sections.md](./docs/landing_page_sections.md)
- **Architecture Details**: [docs/architecture.md](./docs/architecture.md)

## Technology Stack

### Core Framework

- **Next.js 15.5.0**: App Router with Turbopack, static generation
- **React 19.1.0**: Functional components with hooks
- **TypeScript 5**: Strict type checking

### Styling & Animation

- **Tailwind CSS 4**: Utility-first styling with custom theme
- **Framer Motion 12**: Declarative animations (typing effects, transitions)
- **AOS 2.3.4**: Scroll animations
- **CLSX**: Clean conditionaal styles, prefer over template strings

### Internationalization

- **next-intl 4.3.5**: Route-based i18n with locale switching
- **Supported Locales**: English (en), Spanish (es)

### Content & Blog

- **MDX**: `next-mdx-remote` for blog content
- **gray-matter**: Frontmatter parsing
- **Shiki 3**: Syntax highlighting
- **rehype/remark plugins**: Autolink headings, slugs, GFM

### UI Components

- **lucide-react**: Icon system
- **react-hook-form**: Form handling
- **clsx + tailwind-merge**: Conditional class management

### Backend Integration

- **Telegram Bot API**: Contact form notifications

## Code Standards

### Naming Conventions

- **Components**: PascalCase matching file names (`TerminalPrompt.tsx`, `BlogSection.tsx`, `About.tsx`)
- **Hooks**: use + PascalCase (`useTypingAnimation.ts`, `useTerminalCursor.ts`, `useAOSVisibility.ts`)
- **Interfaces/Types**: PascalCase with context suffix
  - Props: `HeaderProps`, `ContactFormProps`, `TerminalPromptProps`
  - Options: `UseTypingAnimationOptions`, `UseAOSVisibilityOptions`
  - Data: `PostMetadata`, `BlogPost`, `ContactFormData`
- **Functions/Variables**: camelCase (`getAllPosts()`, `displayedText`, `runAnimation()`)
- **Constants**: UPPER_SNAKE_CASE (`ANIMATION_DELAYS`, `TYPING_CONFIG`, `NAV_ITEMS`)
- **Enums**: PascalCase type, UPPER_SNAKE_CASE values (`AnimationState.IDLE`, `AnimationState.CAT_COMMAND`)
- **Files**: Match component/hook names exactly

### TypeScript Guidelines

- Always define explicit prop interfaces
- Use type-only imports: `import type { Metadata } from 'next'`
- Properly type async functions: `Promise<PostMetadata[]>`

### Type Safety Best Practices

**Prefer Type Guards over Type Assertions**:

```typescript
// ✗ Bad: Type assertion bypasses compile-time checking
const categories = t.raw('categories') as SkillsCategories;

// ✓ Good: Type guard provides runtime validation
function isSkillsCategories(value: unknown): value is SkillsCategories {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return ['conceptual', 'backend', 'frontend', 'tooling'].every(
    key => key in obj && typeof obj[key] === 'object'
  );
}

const rawCategories = t.raw('categories');
const categories = isSkillsCategories(rawCategories)
  ? rawCategories
  : getDefaultCategories();
```

**Runtime Validation for External Data**:

- Use Zod schemas for JSON parsing (metadata.json, API responses)
- Validate required fields before processing
- Provide helpful error messages for debugging

### Error Handling Patterns

**Async Operations**: Always use try-catch with specific error handling

```typescript
// ✗ Bad: No error handling
await navigator.clipboard.writeText(text);

// ✓ Good: Try-catch with fallback
try {
  await navigator.clipboard.writeText(text);
} catch (error) {
  console.error('Clipboard write failed:', error);
  // Fallback to older API
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
```

**JSON Parsing**: Validate structure after parsing

```typescript
// ✗ Bad: Parse without validation
const metadata: PostMetadata = JSON.parse(content);

// ✓ Good: Validate required fields
const metadata = JSON.parse(content);
if (!metadata.id || !metadata.slug || !metadata.title) {
  console.error(`Invalid metadata: missing required fields`);
  continue;
}
```

### Performance Patterns

**Deduplicate SSG Fetches**: Use React cache() API

```typescript
// ✗ Bad: Same data fetched multiple times during build
export default async function Page({ params }) {
  const data = await fetchData(params); // Fetch 1
}
export async function generateMetadata({ params }) {
  const data = await fetchData(params); // Fetch 2 (duplicate!)
}

// ✓ Good: Cache fetches during build
import { cache } from 'react';
const getCachedData = cache(async (params) => await fetchData(params));
```

**Animations**: Use requestAnimationFrame, not recursive setTimeout

```typescript
// ✗ Bad: Recursive setTimeout, inconsistent timing
const typeCharacter = () => {
  // ... update text
  setTimeout(typeCharacter, 50);
};

// ✓ Good: requestAnimationFrame with performance.now()
const animate = (timestamp: number) => {
  if (timestamp - lastTimestamp >= typingSpeed) {
    // ... update text
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
```

**Search/Filters**: Debounce user input

```typescript
// ✗ Bad: Filter on every keystroke
<input onChange={(e) => filterPosts(e.target.value)} />

// ✓ Good: Debounce search queries
const debouncedSearch = useDebounce(searchQuery, 300);
const filtered = useMemo(() => filterPosts(debouncedSearch), [debouncedSearch]);
```

### Configuration Management

**Single Source of Truth**: Extract constants for reusable values

```typescript
// ✗ Bad: Magic numbers scattered across files
setTimeout(() => {}, 300);
setTimeout(() => {}, 500);

// ✓ Good: Centralized in src/constants/animations.ts
export const ANIMATION_DELAYS = {
  PROMPT_START: 300,
  CONTENT_REVEAL: 500,
} as const;

setTimeout(() => {}, ANIMATION_DELAYS.PROMPT_START);
```

**Plugin Configuration**: Define once, use everywhere

```typescript
// ✗ Bad: MDX plugins defined but empty arrays passed
export const mdxOptions = { remarkPlugins: [remarkGfm] };
<MDXRemote options={{ mdxOptions: { remarkPlugins: [] } }} /> // Ignored!

// ✓ Good: Import and use defined config
import { mdxOptions } from '@/lib/mdx';
<MDXRemote options={mdxOptions} />
```

### Code Style Principles

**Clean Code** (user preferences):

- Guard clauses over nested conditionals
- Extract complex conditions to variables
- Configuration objects for 3+ parameters
- Comments for technical decisions only

**Functional Programming**:

- Immutability (create copies, don't mutate)
- Functional array methods (map, filter, reduce)
- Async/await over callback hell

**React**:

- Minimize useEffect/useCallback/useMemo dependencies
- Single-responsibility components
- **className construction**: ALWAYS use clsx, NEVER template strings

```typescript
// ✗ Bad: Template strings are error-prone and hard to read
className={`base ${isActive ? 'active' : ''} ${hasError ? 'error' : ''}`}

// ✓ Good: clsx is clear and maintainable
className={clsx('base', isActive && 'active', hasError && 'error')}
```

### HTML/CSS

- **Semantic HTML**: Use `<main>`, `<section>`, `<article>` over generic `<div>`
- **Mobile-first**: Media queries with `min-width`
- **Flexbox**: For single-axis layouts
- **Z-index**: Backgrounds `fixed inset-0`, UI needs `relative z-10+`

### Additional Code Patterns

**Import Organization**: Consistent structure with blank line separation

```typescript
'use client';  // directive at top
import React/Next modules
import lib/component imports from @ aliases
import { useTranslations } from 'next-intl';
```

**Component Structure**: Standard pattern across all components

1. Props interface definition
2. `export default function ComponentName`
3. `useTranslations()` hook for i18n
4. Custom hooks (useAOSVisibility, useTypingAnimation, etc.)
5. State management (useState, useCallback, useMemo)
6. useEffect for side effects
7. JSX return with semantic HTML and aria attributes

**Ref Pattern for useEffect Dependencies**: Avoids circular dependencies

```typescript
// Pattern: src/components/sections/About.tsx:65-74
const runAnimationRef = useRef(runAnimation);
runAnimationRef.current = runAnimation;

useEffect(() => {
  if (shouldRender) {
    runAnimationRef.current();
  }
}, [shouldRender]); // runAnimation excluded to prevent infinite loops
```

**Animation State Machine**: Enum-driven progressive reveal

```typescript
// Pattern: src/components/sections/About.tsx:18-63
enum AnimationState {
  IDLE = 0,
  CAT_COMMAND = 1,
  CAT_OUTPUT = 2,
  SECOND_COMMAND = 3,
  SECOND_OUTPUT = 4,
  COMPLETE = 5
}
```

**CSS Class Management**: Use `cn()` utility (clsx + tailwind-merge)

```typescript
// src/lib/utils.ts exports cn() function
import { cn } from '@/lib/utils';
className={cn('base', isActive && 'active', hasError && 'error')}
```

**Intersection Observer Wrapper**: Gate animations until visible

```typescript
// src/hooks/useAOSVisibility.ts
const { ref, isVisible, shouldRender } = useAOSVisibility();
// Prevents off-screen animation processing
```

## Recently Resolved

These antipatterns have been addressed and improvements are complete:

### ✅ Hardcoded Hex Color in TerminalPrompt (RESOLVED)

**What was done**: Replaced hardcoded `#58c5a4` color with `text-terminal-green` class in TerminalPrompt component (all 3 instances).

**Date Resolved**: 2025-12-25

**Related Improvements**:
- Added STAGGER_DELAY constant to animations
- Defined color semantics in new docs/color_semantics.md
- All sections now follow consistent color usage patterns

---

## Antipatterns to Address

This section documents code quality issues and technical debt identified in the codebase. These are opportunities for gradual improvement.

### Type Assertions Without Runtime Validation

**Issue**: Components use type assertions (`as`) on i18n data without validating structure, bypassing TypeScript's compile-time checking.

**Locations**:

- `src/components/sections/Skills.tsx:34,35,37` - Raw i18n casting
- `src/components/sections/Experience.tsx:32` - Jobs array casting
- `src/components/ui/SocialMedia.tsx:23` - Social links casting

**Recommended Action**: Implement type guard functions in `src/lib/validation/i18n.ts` to validate i18n data before use.

**Priority**: High - Runtime crashes possible if i18n structure changes

### Duplicated Animation State Enums

**Issue**: Three sections independently define nearly identical AnimationState enums.

**Occurrences**: 3 instances

- `src/components/sections/About.tsx:18-25`
- `src/components/sections/Contact.tsx:13-25`
- `src/components/blog/BlogSection.tsx:23-30`

**Recommended Action**: Extract to `src/constants/animationStates.ts` for consistency.

**Priority**: Medium - Technical debt, improves maintainability

### Missing Ref Pattern in BlogSection

**Issue**: BlogSection uses `runAnimation` directly in useEffect dependency array while About and Contact use the ref pattern.

**Location**: `src/components/blog/BlogSection.tsx:91-95`

**Recommended Action**: Apply the same ref pattern documented in About.tsx (lines 65-67).

**Priority**: Medium - Prevents future bugs from dependency cycles

### Inline Animation/Transition Duplicates

**Issue**: Multiple components define identical Framer Motion transitions inline.

**Recommended Action**: Create `src/lib/framer-motion.ts` with reusable animation presets.

**Priority**: Medium - Reduces maintenance burden

### Array Index Keys in Maps

**Issue**: Experience component uses array index as React key.

**Location**: `src/components/sections/Experience.tsx:75`

**Recommended Action**: Add stable `id` field to Job interface, use job ID as key.

**Priority**: Medium - Prevents rendering bugs

### Inconsistent Error Handling

**Issue**: Different error handling approaches across components.

**Recommended Action**: Create `src/lib/logger.ts` with standardized error utilities.

**Priority**: Low-Medium - Improves debuggability

## Project Architecture

**For detailed architecture**, see [docs/architecture.md](./docs/architecture.md)

### Key Directories

- `src/app/[locale]/` - i18n routes (landing, blog)
- `src/components/sections/` - Page sections (About, Skills, Experience, Contact)
- `src/components/layout/` - Structural components (Header, Footer, Navigation)
- `src/components/ui/` - Reusable UI (TerminalPrompt, backgrounds, etc.)
- `src/components/blog/` - Blog components (PostCard, TOC, MDXComponents)
- `src/hooks/` - Custom hooks
- `src/lib/blog/` - Blog utilities (posts.ts, mdx.ts)
- `src/i18n/` - i18n config and messages
- `content/blog/[post-id]/` - MDX content (metadata.json, en.mdx, es.mdx)

### Routing

- `/[locale]` → Landing page
- `/[locale]/blog` → Blog list
- `/[locale]/blog/[slug]` → Blog post
- `/api/telegram` → Contact form API

**i18n**: Middleware auto-redirects `/` to `/en` or `/es`

### Internationalization

**Config**: `src/i18n/config.ts` - Locales: `['en', 'es']`, default: `'en'`

**Messages**: `i18n/messages/{en,es}.json`

**Usage**: `const t = useTranslations('Section'); t('key')`

### Blog System

**Structure**: `content/blog/[post-id]/{metadata.json, en.mdx, es.mdx}`

**CRITICAL Dual-Identifier Routing**:

- `metadata.id` → Must match physical folder name
- `metadata.slug[locale]` → Public URL (can differ per language)

**Example**:

- Folder: `content/blog/zero-to-portfolio/`
- English URL: `/en/blog/from-zero-to-portfolio`
- Spanish URL: `/es/blog/de-cero-a-portfolio`

The `id` MUST match the folder name. Slugs can be completely different per language.

**Metadata Fields**: `id`, `slug{en,es}`, `title{en,es}`, `description{en,es}`, `publishedAt`, `updatedAt`, `tags[]`, `featured`, `readingTime{en,es}`

**Utilities** (`src/lib/blog/posts.ts`):

- `getAllPosts()` - All posts sorted by date
- `getPostBySlug(slug, locale)` - Load specific post
- `getRecentPosts(limit)` - N recent posts
- `getPostsByTag(tag)` - Filter by tag
- `getAllTags()` - All unique tags
- `formatDate(dateString, locale)` - Locale-aware formatting

## Common Patterns

### Terminal Typing Animation

**Usage** (`src/hooks/useTypingAnimation.ts`):

```typescript
const { displayedText, isTyping, typeText } = useTypingAnimation({
  command: 'cat about.txt',
  onTypingComplete: () => console.log('Done'),
  typingSpeed: 50,
  startDelay: 300,
  autoStart: true
});
```

**Features**: Variable speed (50 + random 30ms), 530ms cursor blink, typing/blinking states

### Terminal Prompt Component

**Usage** (`src/components/ui/TerminalPrompt.tsx`):

```typescript
<TerminalPrompt
  command="cat about.txt"
  showCursor={true}
  cursorState="typing"
  path="~/projects"
/>
```

**Output**: `diegopher@portfolio:~/projects$ ❯ cat about.txt█`

### Section Animation Sequence

**States**:

```typescript
enum AnimationState {
  IDLE, CAT_COMMAND, CAT_OUTPUT, SECOND_COMMAND, SECOND_OUTPUT, COMPLETE
}
```

**Flow**: Title fade → Prompt typing → Scroll lock → Content reveal

### Form Handling

**TUI-styled forms with react-hook-form**:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email', { required: true })} className="terminal-input" />
</form>
```

## Development Workflows

**New Components**:

1. Create in appropriate directory (sections/, ui/, layout/)
2. Define TypeScript props interface
3. Functional component pattern
4. Export as default

**New Blog Posts**:

1. Create `content/blog/[post-id]/`
2. Add `metadata.json` (ensure `id` matches folder)
3. Create `en.mdx` and `es.mdx`
4. Rebuild to regenerate static routes

**i18n Updates**:

1. Add keys to `i18n/messages/{en,es}.json`
2. Use `useTranslations()` hook
3. Test both locales

**Style Updates**:

1. Reference design guidelines
2. Tailwind mobile-first
3. Test with `prefers-reduced-motion`

## Build & Development

### Build System

**Primary Build Tool**: Next.js 15.5.0 with Turbopack

**Build Commands**:
- `npm run build` - Compiles Next.js app with Turbopack for production
- Outputs to `.next/` directory
- Includes static optimization and image optimization (avif, webp)

**Configuration**: `next.config.ts`
- Image optimization with custom device sizes (640, 750, 828, 1080, 1200px)
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384px
- next-intl plugin for multilingual routing

### Development Workflow

**Starting Development**:
1. Run `npm run dev` to start Next.js development server
2. Server runs on `http://localhost:3000` by default
3. Hot module replacement (HMR) enabled
4. Access multilingual routes: `/en` and `/es`

**Development Tools**:

| Tool | Version | Config File | Purpose |
|------|---------|-------------|---------|
| TypeScript | 5.x | `tsconfig.json` | Static type checking |
| ESLint | 9.x | `eslint.config.mjs` | Code quality |
| Prettier | 3.6.2 | `.prettierrc` | Code formatting |
| Tailwind CSS | 4.x | PostCSS only | Utility-first styling |

### TypeScript Configuration

**File**: `tsconfig.json`

**Key Settings**:
- **Target**: ES2017
- **Strict Mode**: `true` (all strict type-checking enabled)
- **Path Aliases**: `@/*` → `./src/*`
- **Module Resolution**: `bundler` (optimized for bundlers)
- **Incremental**: `true` (faster rebuilds)

### Linting & Code Quality

**ESLint**: `eslint.config.mjs`
- Uses flat config format (v9.x)
- Extends: `next/core-web-vitals`, `next/typescript`
- Validates React/Next.js best practices

**Ignored**: `node_modules/`, `.next/`, `out/`, `build/`

### Code Formatting

**Prettier**: `.prettierrc`

| Setting | Value |
|---------|-------|
| Semicolons | `true` |
| Quotes | Single (`'`) |
| Trailing Comma | `es5` |
| Print Width | 110 chars |
| Tab Width | 2 spaces |
| Arrow Parens | Avoid |

**Auto-configured Plugins**:
- `prettier-plugin-tailwindcss` - Sorts Tailwind classes
- `@trivago/prettier-plugin-sort-imports` - Organizes imports
- `prettier-plugin-organize-attributes` - Sorts JSX attributes

**Import Organization Order**:
1. React imports (`^react`)
2. Third-party packages (`^@?\\w`)
3. Relative imports (`^[./]`)

### CSS/Styling Setup

**Tailwind CSS 4** with PostCSS (`postcss.config.mjs`)
- Single plugin: `@tailwindcss/postcss`
- Native CSS variables support

### Environment Setup

**Required Variables** (`.env`):

| Variable | Purpose |
|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Telegram bot authentication |
| `TELEGRAM_CHAT_ID` | Chat ID for contact form |

**Setup Steps**:
1. Clone repository
2. Run `npm install`
3. Create `.env` file with Telegram credentials
4. Run `npm run dev`
5. Application available at `http://localhost:3000`

### Daily Development Workflow

```bash
# Start development
npm run dev

# Check code quality
npm run lint

# Build for production
npm run build

# Test production build
npm run build && npm start
```

## Requirements

**Performance**: 60fps animations, optimized fonts, minimal JS footprint

**Accessibility**: Keyboard navigation, semantic HTML, `prefers-reduced-motion` support, high contrast compliance, ARIA labels

**Domain**: diegopher.dev (Cloudflare)

## Cross-References

- [README.md](./README.md) - Project overview
- [docs/design_guidelines.md](./docs/design_guidelines.md) - Design specs (colors, typography, animations, brand)
- [docs/landing_page_sections.md](./docs/landing_page_sections.md) - Section specifications
- [docs/architecture.md](./docs/architecture.md) - Component hierarchy, state management, performance

---

**Maintainability Note**: This document describes patterns and principles. Update when introducing new architectural patterns or antipatterns.
