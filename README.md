# David Machado — Portfolio

Personal portfolio of David Machado, a backend-focused software engineering student in
Medellín, Colombia. The site presents three projects with inspectable evidence: public
repositories, documented architecture decisions, and test suites.

Live: https://davidmachado-dev.vercel.app/

## Stack

- React 18 + TypeScript
- Vite 6 + Tailwind CSS 4
- Motion for interaction and reduced-motion-aware animation
- Vitest for the content and mailto logic
- Biome for linting

## Scripts

```bash
npm install
npm run dev        # local development server
npm run build      # production bundle
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
  lib/          mailto builder and its test
  i18n.ts       English, Spanish, and Portuguese copy
public/         static assets, sitemap, robots, OG image
scripts/        CV source used to generate public/assets/cv/david-machado-cv.pdf
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
