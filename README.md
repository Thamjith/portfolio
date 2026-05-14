# Portfolio — Thamjith Thaha

Personal portfolio site for **Thamjith Thaha**, Technical Lead at IBM Instana (Kochi, Kerala). The live site is at [https://www.thamjiththaha.com/](https://www.thamjiththaha.com/).

## About the site

Single-page portfolio with:

- **Hero** — Name, role, rotating typewriter titles, CTAs  
- **About** — Bio, dynamic years of experience (from Feb 2020), stats  
- **Skills** — Languages, frameworks, data, and tools  
- **Experience** — IBM, InApp, Vanilla Networks (timeline with role details)  
- **Education** — BCA, University of Kerala (2016–2019)  
- **Projects** — Featured work (e.g. [HangPlan](https://hangplan.in))  
- **Contact** — Email, LinkedIn, Instagram, resume PDF  

UX and polish include dark / light / system theme, skip link, scroll reveals, background particles, optional custom cursor (fine pointer only), mobile nav, and structured data (JSON-LD) plus Open Graph / Twitter meta for sharing.

## Tech stack

| Area        | Choice                                      |
| ----------- | ------------------------------------------- |
| Build       | [Vite](https://vitejs.dev/) 6               |
| Markup      | Static `index.html`                         |
| Scripts     | Vanilla ES modules (`src/main.js`, `src/modules/`) |
| Styles      | [Sass](https://sass-lang.com/) (`src/styles/`) |
| Analytics   | [@vercel/analytics](https://vercel.com/docs/analytics), [@vercel/speed-insights](https://vercel.com/docs/speed-insights) |

## Local development

Requirements: **Node.js** (LTS recommended).

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build and preview

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/`, suitable for any static host (e.g. Vercel, Netlify, GitHub Pages).

## Repository layout

- `index.html` — Page structure, SEO, and content sections  
- `src/main.js` — Entry: theme, effects, analytics, experience-year helper  
- `src/modules/` — Feature modules (theme, nav, typewriter, particles, etc.)  
- `src/styles/` — Global SCSS  
- `public/` — Static assets (images, resume PDF, favicon, verification files, etc.)

## License and reuse

This repository is a personal portfolio. If you fork or reuse layout or copy, adapt branding and content for your own use.
