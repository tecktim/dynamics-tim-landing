# Development Guide

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

For content changes, run `npm run sync` to update Content Collections.

## 📦 Available Scripts

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Local dev server with HMR                               |
| `npm run build`   | Production build in `dist/`                             |
| `npm run preview` | Preview production build                                 |
| `npm run lint`    | ESLint (TypeScript + Astro) strict mode                 |
| `npm run format`  | Prettier formatting for entire project                  |
| `npm run sync`    | Synchronize Content Collections (`src/content/*`)       |

## 🗂️ Project Structure

```
├── docs/                   # Documentation
├── public/                 # Static assets (Favicon, OG-Image, Manifest)
├── scripts/                # Build and utility scripts
├── src/
│   ├── components/         # Reusable UI components
│   ├── content/            # MDX Content Collections (Timeline, Projects, Certs)
│   ├── data/               # Static data and configuration
│   ├── layouts/            # Base layouts & global includes
│   ├── pages/              # Astro page routes (SSG + API)
│   └── styles/             # Tailwind base styles
├── astro.config.mjs        # Astro config with integrations
├── tailwind.config.js      # Tailwind + plugins (Typography, Forms)
├── tsconfig.json           # TypeScript strict mode + aliases
└── package.json            # Scripts & dependencies
```

## 🔧 Configuration

- **Environment**: Copy `.env.example` to `.env` and configure
- **Legal Data**: Override defaults in `env/.env.json` if needed
- **Content**: Add content in `src/content/` (projects, timeline, certs)

## 🌐 Deployment

Automatic deployment to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## 📋 Development Notes

- Uses Astro v5+ with TypeScript strict mode
- Tailwind CSS with custom theme
- Content Collections for MDX content
- CSP headers and privacy-compliant analytics
- Environment-based configuration system
