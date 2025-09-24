# Tim Freelance Landing# Tim Freelance Landing



> **Professional landing page for Dynamics 365 freelancer Tim Friedrich**> **Professional landing page for Dynamics 365 freelancer Tim Friedrich**

> > 

> Built with Astro, TypeScript, Tailwind CSS, and full GDPR compliance.> Built with Astro, TypeScript, Tailwind CSS, and full GDPR compliance.



🌐 **Live Site:** [https://dynamics-tim.dev](https://dynamics-tim.dev)🌐 **Live Site:** [https://dynamics-tim.dev](https://dynamics-tim.dev)



## ✨ Features## ✨ Features



- 🚀 **Lightning Fast** - Astro SSG with optimized assets- 🚀 **Lightning Fast** - Astro SSG with optimized assets

- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS

- 🛡️ **Privacy Compliant** - GDPR-compliant consent management- 🛡️ **Privacy Compliant** - GDPR-compliant consent management

- 🔒 **Secure** - CSP headers, no client-side secrets- 🔒 **Secure** - CSP headers, no client-side secrets

- 📊 **Analytics Ready** - Optional Pushover notifications- 📊 **Analytics Ready** - Optional Pushover notifications

- ⚡ **TypeScript** - Full type safety with strict mode- ⚡ **TypeScript** - Full type safety with strict mode

- 📝 **Content Collections** - MDX-based content management- 📝 **Content Collections** - MDX-based content management



## 🚀 Quick Start## 🚀 Quick StartLanding



```bashLandingpage-Projekt für Tim Friedrich – Dynamics 365 Freelancer. Gebaut mit [Astro](https://astro.build) & Tailwind CSS, optimiert für GitHub Pages Deployments und mit optionalem SSR-Pushover-Endpoint.

git clone https://github.com/tecktim/tim-freelance-landing.git

cd tim-freelance-landing## 🚀 Quickstart

npm install

npm run dev```bash

```npm install

npm run dev

Visit [http://localhost:4321](http://localhost:4321) to see the site.```



## 📚 DocumentationAnschließend ist die Seite unter [http://localhost:4321](http://localhost:4321) erreichbar. Für Content-Änderungen bitte `npm run sync` ausführen, damit Content Collections aktualisiert werden.



- **[Development Guide](docs/DEVELOPMENT.md)** - Setup, scripts, and project structure> Hinweis: Während der Installation erzeugt `npm` automatisch `public/og-image.png` über `scripts/generate-og.mjs`. Falls das Bild fehlt (z. B. bei einer manuellen Dateibereinigung), kann es mit `node scripts/generate-og.mjs` erneut erstellt werden.

- **[Legal Implementation](docs/LEGAL_README.md)** - GDPR compliance and privacy setup

## 📦 Nützliche Skripte

## 🛠️ Tech Stack

```bash

- **Framework:** [Astro](https://astro.build) v5+git clone https://github.com/tecktim/tim-freelance-landing.git

- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4cd tim-freelance-landing

- **Language:** [TypeScript](https://typescriptlang.org) (strict mode)npm install

- **Content:** MDX with Content Collectionsnpm run dev

- **Deployment:** GitHub Pages```

- **Privacy:** Custom consent management system

Visit [http://localhost:4321](http://localhost:4321) to see the site.

## 🔧 Configuration

## 📚 Documentation

### Environment Setup

- **[Development Guide](docs/DEVELOPMENT.md)** - Setup, scripts, and project structure

1. Copy `.env.example` to `.env`- **[Legal Implementation](docs/LEGAL_README.md)** - GDPR compliance and privacy setup

2. Configure Pushover credentials (optional)

3. Run `npm run sync` after content changes## 🛠️ Tech Stack



### Content Management- **Framework:** [Astro](https://astro.build) v5+

- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4

The site uses Astro Content Collections for dynamic content:- **Language:** [TypeScript](https://typescriptlang.org) (strict mode)

- **Content:** MDX with Content Collections

- **Timeline:** `src/content/timeline/*.mdx` - Career history- **Deployment:** GitHub Pages

- **Projects:** `src/content/projects/*.mdx` - Portfolio projects  - **Privacy:** Custom consent management system

- **Certifications:** `src/content/certs/*.mdx` - Professional certifications

## 🔔 Echtzeit-Besuchsbenachrichtigungen

## 🚀 Deployment

Die Pushover-Integration läuft jetzt über einen serverseitigen Astro-Endpoint (`/api/pushover`). Dadurch bleiben Token und User-Key im Backend und werden nicht mehr mit dem Client gebundlet. Für lokale Tests eine `.env` mit folgenden Werten anlegen:

Automatic deployment to GitHub Pages via GitHub Actions on push to `main` branch.

```bash

**Live URL:** [https://dynamics-tim.dev](https://dynamics-tim.dev)PUSHOVER_TOKEN="<dein-app-token>"

PUSHOVER_USER="<dein-user-key>"

## 📋 Project Status```



- ✅ **Production Ready**Optional lassen sich Betreff, Nachricht und Server-Limits konfigurieren:

- ✅ **GDPR Compliant** 

- ✅ **Mobile Optimized**```bash

- ✅ **SEO Optimized**PUSHOVER_TITLE="Neuer Besuch"

- ✅ **Performance Optimized**PUSHOVER_MESSAGE="Besuch auf {path}"

- ✅ **TypeScript Strict**PUSHOVER_DEBOUNCE_MS="45000"      # Mindestabstand zwischen Client-Calls

- ✅ **Zero Client-Side Secrets**PUSHOVER_RATE_LIMIT_MS="60000"    # Rate-Limit pro IP auf dem Endpoint

PUSHOVER_TIMEOUT_MS="8000"        # Timeout für den Upstream-Request

## 🤝 Contributing```



This is a personal portfolio project. If you find bugs or have suggestions, feel free to open an issue.`{path}`, `{url}` und `{referrer}` werden serverseitig ersetzt. Bei Bedarf lässt sich der Client-Lader mit `PUSHOVER_ENABLED="false"` komplett ausschalten. Der Client sendet nur den aktuellen Pfad/URL und bekommt bei Fehlern eine klare Antwort (429/503). Da GitHub Pages keine SSR-Funktionen unterstützt, muss das Deployment für aktive Benachrichtigungen auf eine Plattform mit Node/Serverless-Runtime (z. B. Vercel, Netlify, Cloudflare, eigener Node-Server) wechseln. Das bestehende Pages-Workflow bleibt für das statische Marketing-Site-Build erhalten – ohne die o. g. Umstellung bleibt der Endpoint jedoch deaktiviert (503 `not_configured`).



## 📄 License## 📚 Content Collections



**All Rights Reserved** - This is proprietary software. See [LICENSE](LICENSE) for details.

For licensing inquiries, contact: hello@dynamics-tim.devDie Seiten `Profil` und `Home` verwenden Content Collections:

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
