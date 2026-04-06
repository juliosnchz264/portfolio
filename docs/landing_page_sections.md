# Landing Page Sections - DieGopherLT Portfolio

## Section Architecture

### Hero Section

- Terminal welcome sequence
- Optional ASCII art or logo
- `diegopher@portfolio:~$ intro_message`
- Brief developer statement
- Typing effect for specialization

### About Section

- **Terminal Command**: `diegopher@portfolio:~$ whoami`
- Personal technical narrative style
- Focus on backend/frontend passion + Unix philosophy

### Experience Section

- **Terminal Command**: `diegopher@portfolio:~$ history | grep work`
- Chronological professional timeline
- Clean job entries with tech tags

### Skills Section

- **Terminal Command**: `diegopher@portfolio:~$ skills --list --verbose`
- Categorized technical skills
- Highlight languages: TypeScript, Go
- Categories: languages, frameworks, tools, concepts

### Projects Section

- **Terminal Command**: `diegopher@portfolio:~$ ls projects/ -la`
- Project cards terminal-inspired
- GitHub repo style with descriptions

### Contact Section

- **Terminal Command**: `diegopher@portfolio:~$ connect --help`
- **CRITICAL**: Split terminal design with macOS frames

#### Left Side - Contact Form

- TUI-styled contact form in terminal window
- macOS style with traffic lights
- Window title: "contact-form.sh"
- Terminal interface appearance
- Standard form UX functionality

#### Right Side - Social Links

- Social links terminal window
- macOS style with traffic lights
- Window title: "mis-redes.md"
- Command simulation: `diegopher@portfolio:~$ cat mis-redes.md`
- Markdown formatted social links
- Authentic terminal output style

## Content Structure & Internationalization

### Where to find content for sections?

The project uses **next-intl** for internationalization with the following structure:

#### Configuration Location

- **Config file**: `src/i18n/config.ts`
- **Current setup**: Static locale ('en' by default)
- **Messages location**: `src/i18n/messages/`

#### Content Files

- **English**: `src/i18n/messages/en.json`
- **Spanish**: `src/i18n/messages/es.json`

#### Content Structure

Each locale file contains:

**Section Content**:

- `sections.hero` - Hero section content with terminal welcome, name, title, description
- `sections.about` - About section with terminal command and detailed content structure
- `sections.experience` - Work experience with jobs array, achievements, and technologies
- `sections.skills` - Skills organized by categories (conceptual, backend, frontend, tooling)
- `sections.projects` - Projects section (currently coming_soon status)
- `sections.contact` - Contact form and social links with terminal window titles

**Navigation & Common**:

- `navigation` - Menu items for each section
- `common_phrases` - Reusable phrases like loading, scroll hints, etc.
- `personal_info` - Basic personal information used across sections

**Terminal Commands**:
Each section has a specific `terminal_command` that appears in the typing animation:

- Hero: `echo 'Hello world!'` / `echo 'Hola mundo!'`
- About: `whoami`
- Experience: `history | grep work`
- Skills: `skills --list --verbose`
- Projects: `ls projects/ -la`
- Contact: `connect --help`

**Key Implementation Notes**:

- All terminal window titles are defined in the content files
- Social links window uses "mis-redes.md" / "my-networks.md"
- Contact form window uses "contact-form.sh"
- Content is structured to support the terminal aesthetic with authentic command-line feel
