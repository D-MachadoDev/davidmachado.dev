# STATUS — Portfolio

Read this file first when opening a session. Do not re-ask what is already answered here.
Last updated: 2026-10-26.

## What this is

Personal portfolio. Frontend only — no backend, no database.
Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS 4 + Motion.
Scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `test`.

## Current work: credibility pass

Branch: `fix/credibility-and-deploy` (from `main`).

- Featured projects come from `src/app/data/projects.ts`: Zentric (open source, .NET 10,
  592 tests), LeaseFlow (open source, TypeScript/SQLite/Vitest), and Retail Analytics
  (private case study). Faro, Virtualized Explorer, Redis, and countdown claims were
  removed.
- Contact is a real `mailto:` composer (`src/app/lib/mailto.ts`); the page never claims a
  message was sent. The same link is used by the navbar and mobile menu. The dead X/Twitter
  profile link was removed from the UI and metadata.
- Mobile navigation is reachable at every scroll position; the back-to-top button hides
  while the contact section is visible so it cannot cover the footer.
- Unused UI kit, Certifications, LoadingScreen, sonner, and ~30 dependencies removed.
- SEO uses `https://davidmachado-dev.vercel.app/` because `davidmachado.dev` does not
  resolve (NXDOMAIN).
- Tests: mailto builder, project data, and i18n key parity (15 passing).

## Verified facts (2026-10-26)

- `D-MachadoDev/Zentric`: .NET 10, Hexagonal + DDD + CQRS, PostgreSQL, Docker, README
  badge `Tests-592 Passing (100%)`. Returns HTTP 200.
- `D-MachadoDev/leaseflow`: TypeScript + Express + SQLite, Vitest. Returns HTTP 200.
- Production deployment is live at `https://davidmachado-dev.vercel.app/` (deployment
  `davidmachado-n4pb2hczk`, Vercel project `davidmachado-dev`).
- `davidmachado.dev` has no DNS record. Do not restore it as canonical until it resolves.
- The former `https://x.com/Davidma13020061` profile returns 404; it was removed from the
  contact section, footer, Twitter metadata, and JSON-LD.
- `npm audit --omit=dev` reports 0 production vulnerabilities. Dev-only advisories remain
  in Vitest/Tinypool; the available fix requires Vitest 5, a breaking upgrade.

## Verification evidence (2026-10-26)

- `npm run typecheck`: pass.
- `npx biome check .`: pass.
- `npm test -- --run`: 15/15 passing.
- `npm run build`: pass. Bundle: 418.86 kB JS / 50.71 kB CSS.
- Headless Edge smoke test on 1440x900 and 390x844: no console errors; About, Experience,
  and Contact visible after scroll; mobile menu opens, switches to Spanish, closes on
  Escape, and restores body scroll. Contact email renders without breaking the domain.
- Live site: `/`, CV PDF, OG image, sitemap, robots, and llms.txt return 200. HTML has the
  Vercel canonical and OG URL, loads `index-Bhab5Ojs.js`, and contains no X/Twitter handle.
- Live headless Edge smoke test on 1440x900 and 390x844: no console errors, no horizontal
  overflow, contact email intact, CV link present, mobile menu reachable after scrolling
  and closes on Escape.

## Known issues / blockers

1. `gh` CLI returns 401 Bad credentials. Pushing and PR creation need `gh auth login` or
   an equivalent authenticated path.
2. `og-image.png` and the CV PDF are generated assets; regenerate when copy changes.

## Next steps

1. Push `fix/credibility-and-deploy` and open the PR once `gh` is authenticated.
2. Merge after review; the production alias already serves this branch's build.
