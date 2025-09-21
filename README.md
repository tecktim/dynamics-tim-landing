# Tim Freelance Landing

Landingpage-Projekt für Tim Friedrich – Dynamics 365 Freelancer. Gebaut mit [Astro](https://astro.build) & Tailwind CSS, optimiert für GitHub Pages Deployments.

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Anschließend ist die Seite unter [http://localhost:4321](http://localhost:4321) erreichbar. Für Content-Änderungen bitte `npm run sync` ausführen, damit Content Collections aktualisiert werden.

> Hinweis: Während der Installation erzeugt `npm` automatisch `public/og-image.png` über `scripts/generate-og.mjs`. Falls das Bild fehlt (z. B. bei einer manuellen Dateibereinigung), kann es mit `node scripts/generate-og.mjs` erneut erstellt werden.

## 📦 Nützliche Skripte

| Befehl            | Beschreibung                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Lokaler Dev-Server mit HMR                                |
| `npm run build`   | Produktionsbuild in `dist/`                               |
| `npm run preview` | Vorschau des Produktionsbuilds                            |
| `npm run lint`    | ESLint (TypeScript + Astro) in Strict-Mode                |
| `npm run format`  | Prettier Formatting für das gesamte Projekt               |
| `npm run sync`    | Content Collections synchronisieren (`src/content/*`)     |

## 📚 Content Collections

Die Seiten `Profil` und `Home` verwenden Content Collections:

- `src/content/timeline` – Berufliche Stationen als MDX, inkl. Metadaten (Firmenname, Zeitraum, Tags)
- `src/content/projects` – Projekt-Highlights mit Links, Tech-Stack und Beschreibung
- `src/content/certs` – Zertifizierungen (Issuer, Datum, Skills)

Neue Einträge können als `.mdx`-Dateien im jeweiligen Ordner angelegt werden. Frontmatter wird durch `src/content/config.ts` validiert.

## 🌐 Deployment auf GitHub Pages

Das Repository enthält ein Workflow (`.github/workflows/deploy.yml`), der bei jedem Push auf `main` automatisch:

1. Node LTS installiert & Dependencies cached
2. `npm ci && npm run build` ausführt
3. das Build als Pages-Artefakt hochlädt
4. via `actions/deploy-pages` auf die `gh-pages` Branch deployed

Die Seite ist unter `https://dynamics-tim.dev/` erreichbar. Domain & Basis-Pfad sind in `astro.config.mjs` hinterlegt.

## 🗂️ Projektstruktur

```
├── public/                 # Statische Assets (Favicon, OG-Image, Manifest)
├── src/
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   ├── content/            # MDX Content Collections (Timeline, Projekte, Certs)
│   ├── layouts/            # Basislayouts & globale Includes
│   ├── pages/              # Astro Seitenrouten (SSG)
│   └── styles/             # Tailwind Basestyles
├── astro.config.mjs        # Astro Config mit Integrationen
├── tailwind.config.js      # Tailwind + Plugins (Typography, Forms)
├── tsconfig.json           # TypeScript Strict Mode + Aliase
└── package.json            # Skripte & Dependencies
```

## 🔍 SEO & Performance

- `SeoHead` Component setzt konsistente Meta-, OpenGraph- & Twitter-Tags
- JSON-LD Schema für Person & Software Developer inkludiert Social Links & Skills
- Sitemap & Robots via Integrationen (GitHub Pages ready)
- `astro-compress` reduziert HTML/CSS/JS & Bilder beim Build

Viel Erfolg beim Ausbau der Landingpage! 💼
