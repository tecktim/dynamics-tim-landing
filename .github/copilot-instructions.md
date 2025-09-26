# Copilot Instructions - Tim Freelance Landing

This is an Astro + Tailwind CSS static site for Tim Friedrich's Dynamics 365 freelancing services, deployed on GitHub Pages.

## Project Architecture

### Core Framework
- **Astro 5** with SSG output for static deployment
- **Tailwind CSS** with custom design system (`brand`, `accent`, `surface` colors)
- **MDX** for content collections (timeline, projects, certs)
- **TypeScript** in strict mode throughout

### Key Integrations
- **GitHub Pages** deployment via `.github/workflows/deploy.yml`
- **Pushover** notifications for visitor tracking (optional, env-controlled)
- **Cal.com** integration for booking appointments
- **Content Security Policy** with dynamic sources based on feature flags

### Content Management
Content is managed through **Content Collections** in `src/content/`:
- `timeline/` - Career history as MDX files with company, dates, tags
- `projects/` - Project showcases with tech stack and links  
- `certs/` - Certifications with issuer and skills data

Schema validation enforced via `src/content/config.ts` using Zod.

## Development Patterns

### Component Structure
- `BaseLayout.astro` - Root layout with SEO, CSP, and script loading
- `SeoHead.astro` - Centralized SEO with JSON-LD structured data
- Components follow Astro's island architecture (minimal JS)

### Styling Conventions
- Custom Tailwind config with extended color palette and fonts
- Uses `font-heading` (Sora) and `font-sans` (Inter) loaded as WOFF2
- CSS utilities: `.card`, `.section-title` defined in `global.css`
- Shadow utility: `shadow-soft` for consistent elevation

### Asset Management
- OG image auto-generated via `scripts/generate-og.mjs` on postinstall
- Static assets in `public/` with base URL handling for GitHub Pages
- Font preloading and CSS inlining for performance

### Build & Deploy
- `npm run dev` - Local development with HMR on :4321
- `npm run build` - Production build with compression via `astro-compress`
- `npm run sync` - Update content collections after changes
- Auto-deployment on main branch pushes via GitHub Actions

## Critical Commands

```bash
npm run sync    # Run after adding/editing content collections
npm run lint    # ESLint for TypeScript + Astro (strict mode)
npm run format  # Prettier with astro plugin
```

## Environment Configuration

Optional Pushover integration via environment variables:
```bash
PUBLIC_PUSHOVER_TOKEN="app-token"
PUBLIC_PUSHOVER_USER="user-key"  
PUBLIC_PUSHOVER_TITLE="Custom title"     # Optional
PUBLIC_PUSHOVER_MESSAGE="Custom message" # Optional, supports {path}/{url}
```

When configured, adds Pushover API to CSP and loads notification scripts.

## Content Editing

All content files are MDX with frontmatter validation. Examples:

**Timeline entry**: Company, dates, location, tags, highlight flag
**Project entry**: Title, summary, tech array, optional links, featured flag  
**Cert entry**: Title, issuer, date, skills array, optional credential URL

After editing content, always run `npm run sync` to update TypeScript definitions.

## Deployment Notes

- Site deployed to `https://dynamics-tim.dev/` with CNAME in public/
- Base URL configured in `astro.config.mjs` with environment override support
- Sitemap excludes 404 page, includes robots.txt for SEO
- All builds compressed (HTML/CSS/JS/Images) for performance