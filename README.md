# David Machado — Portfolio

Personal portfolio of David Machado, a backend-focused software engineering student in
Medellín, Colombia. The site presents three projects with inspectable evidence: public
repositories, documented architecture decisions, and test suites.

Live: https://davidmachado-dev.vercel.app/

## Stack

- React 18 + TypeScript
- Vite 6 + Tailwind CSS 4
- Static HTML generation for route-specific SEO metadata
- Vitest for content, mailto, routing, language, SEO, and wheel-scroll logic
- Biome for linting

## Scripts

```bash
npm install
npm run dev        # local development server
npm run build      # production bundle + route-specific static HTML
npm run preview    # preview the production bundle
npm run typecheck  # tsc --noEmit
npm run lint       # biome check .
npm test           # vitest run
```

## Structure

```text
src/app/
  components/   page sections and interaction primitives
  data/         featured project data and its test
  lib/          mailto builder, wheel helpers, and their tests
  i18n.ts       English, Spanish, and Portuguese copy
  seo.ts        route metadata and static HTML transformation
public/         static assets, sitemap, robots, OG image
scripts/        prerender.mjs, plus the CV source used to generate the PDF
```

## Content policy

- Every project states where its evidence lives: a public repository or a private case
  study available on request.
- The contact form opens a prefilled email draft. It never claims a message was sent,
  because the static site cannot observe delivery.
- Stack and metric claims are limited to what the linked repository or the client can
  back up.

## Deploy

The site is a static Vite build deployed on Vercel as the `davidmachado-dev` project.
`npm run build` generates route-specific HTML files (`projects.html`,
`projects/zentric.html`, and so on), and `vercel.json` rewrites clean URLs to those
documents so crawlers receive page-specific titles, descriptions, and Open Graph tags.
Set `VITE_SITE_URL` when the public origin differs from
`https://davidmachado-dev.vercel.app`.
