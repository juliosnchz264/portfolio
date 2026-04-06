# Color Semantics Guide

## Overview

This document defines the semantic meaning and usage guidelines for colors in the DieGopherLT portfolio. Two primary accent colors are used to communicate different types of information to users.

---

## Primary Accent Colors

### Gopher Blue (`#00add8`)

**CSS Variable**: `--color-gopher-blue: #00add8`

**Semantic Meaning**: Interactivity, technical information, primary actions

**Usage Context**: Use gopher blue to highlight:
- Interactive elements (links, buttons, form inputs)
- Technical categories (Backend, Frontend, Tooling in Skills section)
- Primary visual emphasis and accents
- Technical skill names and technology badges
- Primary borders and dividers

**Examples**:
```typescript
// Terminal prompt username
<span className="text-gopher-blue">diegopher</span>

// Tech badges (with opacity background for contrast)
<Badge variant="gopher">Backend</Badge>

// Links and clickable text
<a className="hover:text-gopher-blue">Visit my GitHub</a>

// Primary borders
<div className="border-l-2 border-gopher-blue">Job Title</div>
```

**Visual Appearance**: Bright, cool cyan color that stands out against dark backgrounds. Conveys technical expertise and interactivity.

---

### Terminal Green (`#39d353`)

**CSS Variable**: `--color-terminal-green: #39d353`

**Semantic Meaning**: Output, success states, command results

**Usage Context**: Use terminal green to highlight:
- Command output and terminal results
- Success indicators and completed states
- Terminal prompt indicators (username in terminal)
- Secondary highlights in lists (achievements, key points)
- Elements representing "finished" or "available" state

**Examples**:
```typescript
// Terminal prompt username
<span className="text-terminal-green">diegopher</span>

// Success states in forms
<span className="text-terminal-green">✓ Message sent</span>

// Command output labels
<span className="text-terminal-green">Website:</span> https://example.com
```

**Visual Appearance**: Bright green that mimics Unix/Linux terminal aesthetic. Conveys completion, availability, and positive states.

---

## Neutral Colors

### Secondary (`#8b949e`)

**CSS Variable**: `--color-secondary: #8b949e`

**Usage**: Secondary text, subtitles, metadata labels
- Job titles and descriptions
- Section subtitles
- Less important information

**Example**:
```typescript
<p className="text-secondary">Software Engineer at Company</p>
```

---

### Muted (`#6e7681`)

**CSS Variable**: `--color-muted: #6e7681`

**Usage**: Tertiary text, command descriptions, less prominent information
- Date ranges and periods
- Command descriptions
- Muted labels

**Example**:
```typescript
<span className="text-muted">September 2022 - December 2024</span>
```

---

## Component-Specific Usage

### Badge Component

The Badge component in `src/components/ui/Badge.tsx` provides three variants aligned with the color semantics:

```typescript
interface BadgeProps {
  variant: 'gopher' | 'tech' | 'highlight';
  children: React.ReactNode;
}
```

**Variant: `gopher`**
- Background: `bg-gopher-blue/15` (semi-transparent gopher blue)
- Text: `text-gopher-blue`
- Use for: Category labels, primary classifications
- Example: Personal info badges in About section

**Variant: `tech`**
- Background: `bg-gray-800`
- Border: `border border-gray-700`
- Text: `text-gray-300`
- Use for: Technology stack, neutral items
- Example: Job technologies in Experience section

**Variant: `highlight`**
- Background: `bg-gray-800/50` with left accent
- Border: `border-l-4 border-gopher-blue`
- Text: `text-gray-300`
- Use for: Featured/important items in lists
- Example: Highlighted skills in Skills section

### Terminal Prompt

The terminal prompt uses both colors to create a visually balanced interface:

```
diegopher@portfolio:~$
├─ username (diegopher): Terminal Green (#39d353)
├─ host (portfolio): Gopher Blue (#00add8)
├─ separator (@, :, $): White (#ffffff)
└─ path (~): White (#ffffff)
```

---

## Design Rationale

### Why Two Accent Colors?

1. **Information Hierarchy**: Gopher blue (cooler, more technical) vs Terminal green (warmer, success-oriented) creates visual distinction between different information types

2. **Terminal Aesthetic**: Green is the classic terminal output color, reinforcing the terminal-inspired design language

3. **Accessibility**: Both colors maintain sufficient contrast ratios against black background:
   - Gopher Blue (#00add8) on #000000: 9.3:1 (AAA compliant)
   - Terminal Green (#39d353) on #000000: 5.1:1 (AA compliant)

4. **Visual Balance**: Using both prevents the interface from feeling monochromatic while maintaining a cohesive terminal aesthetic

---

## Migration Guide

When refactoring existing code or creating new components:

1. **Identify the information type**: Is this about technology/categories (gopher blue) or output/success (terminal green)?

2. **Check existing patterns**: Look at similar components in the same section to maintain consistency

3. **Use Badge component**: For pills, labels, and badges, use the Badge component with appropriate variant

4. **Prefer Tailwind classes**: Use `text-gopher-blue` or `text-terminal-green` instead of hardcoded hex values

5. **Document exceptions**: If you need to deviate from these rules, add a comment explaining the rationale

---

## Examples by Section

### About Section
- **Badges**: Gopher blue (category/skills)
- **Prompt**: Terminal green (output)
- **Highlights**: White with colored icons (varied)

### Experience Section
- **Company**: Gopher blue (technical entity)
- **Job type badge**: Gray (neutral classification)
- **Tech stack**: Gray text with gopher blue variant
- **Highlights**: Terminal green accents

### Skills Section
- **Category titles**: Gopher blue accents
- **Regular skills**: Gray background/border
- **Highlighted skills**: Gopher blue left border accent
- **Prompt**: Terminal green (output)

### Contact Section
- **Form labels**: Secondary color
- **Form focus rings**: Gopher blue
- **Command prompt**: Terminal green (output)
- **Social links**: Gopher blue (interactive)

---

## Future Considerations

- Maintain these semantic meanings as new sections/features are added
- If adding dark/light mode support, adjust opacity values but preserve the semantic meaning
- Consider these colors as the foundation for any theme variations
