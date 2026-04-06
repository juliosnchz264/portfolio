# Design Guidelines - DieGopherLT Portfolio

## Design Philosophy

### Core Concept

- **Main Theme**: r/unixporn aesthetic meets professional portfolio
- **Visual Metaphor**: Terminal session showcasing developer skills
- **Inspiration**: jhey.dev + r/unixporn + terminal aesthetics
- **Elegant Touch**: Pure black color scheme for sophisticated, high-contrast aesthetics

### Main Principles

- Form follows terminal function (implemented via TerminalPrompt, TerminalWindow components)
- Minimalist Unix philosophy (clean component architecture, focused functionality)
- Typing animations create immersion (character-by-character rendering across all sections)
- Standard UX with terminal presentation (accessible forms with terminal aesthetics)
- Elegant sophistication through pure black foundations (Geist font pairing with #000000 background)

## Color Palette

### Primary Colors

```css
--color-primary: #000000;
--color-white: #ffffff;
--color-secondary: #8b949e;
--color-muted: #6e7681;
```

### Accent Colors

```css
--color-gopher-blue: #00add8;
--color-gopher-blue-hover: #00b4d6;
--color-gopher-blue-muted: #007d9c;
--color-terminal-green: #39d353;
--color-warning-yellow: #f1c40f;
--color-error-red: #e74c3c;
```

### Syntax Highlighting

```css
--color-ts-blue: #007acc;
--color-go-cyan: #00add8;
--color-string-green: #98c379;
--color-keyword-purple: #c678dd;
--color-comment-gray: #5c6370;
```

### Color Semantics

See [Color Semantics Guide](./color_semantics.md) for detailed usage guidelines on when and how to apply gopher-blue vs terminal-green colors in different contexts.

## Typography

### Font Stack

- **Primary**: Geist (Google Fonts) with fallback to system-ui, -apple-system, sans-serif
- **Monospace**: Geist_Mono (Google Fonts) with fallback to 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace
- **CSS Variables**: `--font-geist-sans` and `--font-geist-mono`

### Hierarchy

- **Section Titles**: 2.5rem, weight 300, white color, clean minimal style
- **Terminal Prompts**: 1.1rem monospace, gopher blue color
- **Body Text**: 1rem, line-height 1.6, secondary text color
- **Code Snippets**: monospace, background #0D1117, border 1px solid #21262D

## Layout Structure

### Page Type

Single-page scroll with navigation

### Navigation

- Fixed minimal nav bar
- Unix-inspired menu style
- Top position
- Smooth scroll to sections behavior

### Section Structure

**Pattern**: title → prompt → content flow

**Animation Sequence**:

1. Section title fade in
2. Slight scroll pause
3. Terminal prompt typing animation
4. Scroll lock during typing
5. Content reveal after prompt

### Content Guidelines

- Max 800px centered width
- Generous Unix-style whitespace
- Pure black background with white text mandatory

## Terminal Window Design

### Frame Style

macOS terminal window with:

### Title Bar

- Height: 28px
- Background: #2D2D2D
- **Traffic Lights**:
  - Close (red): #FF5F57, 12px from left, 12px diameter
  - Minimize (yellow): #FFBD2E, 32px from left, 12px diameter
  - Maximize (green): #28CA42, 52px from left, 12px diameter
  - Hover: subtle darken effect

### Window Title

- Text: "diegopher@portfolio: ~" (or appropriate)
- Font: SF Pro Display, system-ui
- Size: 13px
- Color: #FFFFFF
- Position: centered

### Terminal Content Area

- Background: #000000
- Padding: 16px 20px
- Border radius: 0 0 8px 8px
- Box shadow: 0 4px 20px rgba(0,0,0,0.3)

## Animations and Interactions

### Scroll Behavior

**Type**: Smooth controlled sections

**Terminal Window Appearance**:

- Entrance animation: fade in from top with slight bounce
- Timing: appears just before typing starts

**Typing Animations**:

- Speed: 50-80ms per character (50 + Math.random() * 30)
- Cursor: blinking Unix cursor (1.06s cycle)
- States: 'typing' and 'blinking' modes
- Implementation: Character-by-character rendering with variable speed
- See `src/constants/animations.ts` for all timing values

**Staggered Item Animations**:

- Stagger delay: 150ms between sequential items (ANIMATION_DELAYS.STAGGER_DELAY)
- Used for: badges, skills, social links, job experience items
- Provides rhythm to multi-item reveals while keeping interactions snappy

**Animation States** (implemented in sections):

- IDLE → CAT_COMMAND → CAT_OUTPUT → SECOND_COMMAND → SECOND_OUTPUT → COMPLETE
- Each state triggers specific typing sequences
- Real-time cursor state management

### Interactive Elements

- Nav hover: subtle gopher blue highlight
- Links: underline animation gopher blue
- Buttons: terminal button press effect
- Form fields: TUI style focus states

### Micro Interactions

- Terminal cursor blink: authentic timing
- Code syntax highlight: language appropriate colors
- Scroll indicators: minimalist Unix style

## Brand Personality

### Core Values

- Unix philosophy simplicity
- Technical excellence
- Clean code principles
- Open source mindset
- Continuous learning

### Brand Adjectives

- Technical, minimalist, authentic
- Unix-inspired, developer-focused
- Clean, efficient

### Community Alignment

r/unixporn aesthetic values

## Implementation Requirements

### Must Have

1. Pure black background with white text
2. Gopher blue (#00ADD8) as primary accent color
3. Authentic monospace typography for terminal elements
4. macOS terminal window frames with traffic lights
5. Realistic typing animation timing
6. Smooth scroll behavior with section pausing
7. Split terminal contact section (both with macOS frames)
8. TUI styled form elements
9. Markdown output for social links
10. Authentic terminal window title bars

### Avoid

- Bright colors outside accent palette
- Overly fast or fake looking typing animations
- Breaking terminal illusion with non-Unix elements
- Cluttered layouts against Unix philosophy
- Photos or personal imagery

### Performance Requirements

- Smooth 60fps animations
- Efficient scroll handling
- Fast Geist font loading from Google Fonts
- Minimal JavaScript for core functionality

## Accessibility

- Full keyboard navigation support
- Semantic markup with terminal context
- Respect reduced motion settings
- High contrast dark theme compliance

## Development Implementation Guidelines

### Code Style Priorities

1. **Terminal Authenticity**: Every UI element should reinforce the terminal/Unix aesthetic
2. **Performance**: Prioritize smooth 60fps animations and efficient scroll handling
3. **Accessibility**: Maintain high contrast and semantic markup while preserving terminal context
4. **Clean Code**: Follow Unix philosophy - do one thing and do it well

### Component Implementation Patterns

- All sections follow: title → terminal prompt → typing animation → content reveal
- Terminal windows must include authentic macOS-style title bars
- Contact section requires split terminal design (form + social links)
- Form elements should use TUI styling while maintaining standard UX

### Reusable Components

**SectionTitle** (`src/components/ui/SectionTitle.tsx`)
- Consistent h2 styling across all main sections (About, Experience, Skills, Contact)
- Handles AOS fade-up animation automatically
- Use instead of hardcoded h2 elements for consistency

**Badge** (`src/components/ui/Badge.tsx`)
- Three variants: `gopher` (category labels), `tech` (technology stack), `highlight` (featured items)
- Single source of truth for pill/badge styling across sections
- Prefer over inline span styling for consistent UI appearance

### Development Accessibility Requirements

- Respect `prefers-reduced-motion` for all animations
- Maintain semantic HTML structure
- Ensure keyboard navigation works throughout
- High contrast compliance for dark theme

### Performance Implementation Targets

- Character-by-character typing rendering must be efficient
- Smooth scroll behavior with section locking during animations
- Optimized Geist_Mono font loading for consistent ASCII art rendering
- Minimal JavaScript footprint

### Development Philosophy

When implementing features, prioritize terminal aesthetic specifications over generic solutions.

## Unique Selling Points

### Visual Differentiation

- Authentic terminal aesthetics in portfolio
- Innovative scroll-controlled typing animations
- Split terminal contact form design
- Seamless blend of UX standards with Unix presentation

### Technical Differentiation

- Demonstrates terminal fluency through design
- Shows attention to detail and authenticity
- Appeals to technical community values
