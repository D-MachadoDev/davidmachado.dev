# STATUS - Portfolio

Read this file first when opening a session. Do not re-ask what is already answered here.
Last updated: 2026-11-01.

## What this is

Personal portfolio. Frontend only - no backend, no database.
Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS 4; vendored `ascii-sharks`
MIT renderer; Geist Mono + Inter. Motion is no longer used.

Scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `test`.

## Current work: Tanda 1 hardening

Branch: `feat/human-positioning` (working tree is uncommitted).

- Dao-Ho-style shell: fixed lowercase mono nav, full-screen ASCII pond, compact
  footer, huge white headline, thin borders, and a horizontal project strip.
- Routes: `/`, `/projects`, `/projects/:id`, `/gallery`, `/about`, 404. The router is a
  small History API implementation with deep-link support. The production build now
  generates route-specific HTML files and `vercel.json` rewrites clean URLs to them.
- Home keeps the approved hero copy and rotates four subtitles (4200 ms, reduced-motion
  aware). The ocean is lazy-loaded after first paint and pauses off-screen.
- `/projects` has three case studies (Zentric, LeaseFlow, Retail Analytics) plus an
  "all repositories" end card. There are no real project screenshots; covers are
  deterministic generated SVG fields.
- `/gallery` lists three certifications that are **in progress**, not earned:
  AZ-900, Google Data Analytics, and OCI Foundations. No credential verification URLs
  exist yet.
- `/about` contains the bio, GitHub headshot, education, a compact Experience block
  (`Independent Software Developer`, 2024–present), working principles, and competencies.
  Education is neutral (`2022 — present`) until the current semester is confirmed.
- `/projects` has a single translated `sr-only` H1, and vertical wheel input over the
  project strip scrolls it horizontally on desktop without hijacking mobile page scroll.
- i18n covers en/es/pt with equal key sets and a claims guard that blocks Faro, Redis,
  distributed-systems, cloud-architect, and virtualized-explorer claims. The selected
  language is persisted in `localStorage` under `davidmachado.language`.
- SEO assets updated: `public/sitemap.xml`, `public/llms.txt`, and `/og-image-v2.png`.
  `src/app/seo.ts` + `scripts/prerender.mjs` generate route-specific titles,
  descriptions, canonicals, and Open Graph tags for seven indexable routes.
- A critical color-token bug was fixed: `text-muted` was resolving to `#27272A`
  (a surface color) and is now `#A1A1AA`; body copy and labels are readable.
- Project strip snap was removed, card height aligned to the Dao-Ho reference
  (`min(62vh,42rem)`), and the footer is hidden on `/projects` so the strip stays
  full-screen.
- Mobile: location is hidden from the home status line; a mobile-only scrim protects
  hero copy; the subtitle no longer clips; the mobile menu traps focus, locks body
  scroll, closes on Escape, and switches language.

## Verification evidence (2026-11-01)

- `npm run typecheck`: pass.
- `npx biome check .`: pass (165 files).
- `npm test -- --run`: 7 files / 41 tests passing.
- `npm run build`: 53 modules; generated 7 static SEO documents; `index-9bAdLxkx.js`
  221.32 kB (gzip 67.39 kB), lazy `react-*.js` 29.26 kB, CSS 31.70 kB.
- Static output verified: `/`, `/projects`, `/projects/zentric`, `/projects/leaseflow`,
  `/projects/retail-analytics`, `/gallery`, and `/about` each have a distinct title,
  canonical, description, `og:image-v2`, and `og:locale`.
- Playwright desktop 1280x900: `/projects` wheel moved the strip `scrollLeft` 0→800
  without moving the page; H1 count is 1; language selection persisted across reload;
  About renders the Experience block and no fifth-semester claim.
- Playwright mobile 390x844: every route has one H1, no horizontal page overflow, no
  console/page errors; mobile wheel still scrolls the page vertically (643 px);
  the menu focus trap, language switch, Escape close, and body-scroll restore work.
- CV PDF regenerated from `scripts/cv-template.html`: one page, 2,471 extracted
  characters, ATS text includes `Medellín` and the working LinkedIn URL, and no
  fifth-semester wording.
- Vercel preview: https://davidmachado-r66vqs4ai-davids-projects-3ead4750.vercel.app
  - Deployment protection is enabled (`ssoProtection: all_except_custom_domains`), so
    the preview asks for a Vercel login in a fresh browser. The owner account can view
    it; `vercel curl` verified the deployed HTML and hashed assets.
  - Automation-bypass smoke test before this build: `/`, `/projects`,
    `/projects/zentric`, `/gallery`, and `/about` returned 200 and rendered the app.
- Local preview: `http://127.0.0.1:4174/` (Vite preview, dist).

## Known issues / blockers

1. Real certifications, credential URLs, project screenshots, and demo captures are
   still missing. Gallery and covers remain honest placeholders.
2. PR #2 is still open and awaiting human review:
   https://github.com/D-MachadoDev/davidmachado.dev/pull/2
3. GitHub profile fields still need the `user` scope
   (`gh auth refresh -h github.com -s user`).
4. Local `main` divergence (`39f5661` vs `origin/main c7b560f`) still needs explicit
   authorization before destructive reset/branch deletion.
5. Preview link is SSO-protected. Make it public only with explicit authorization;
   production deploy (`vercel --prod`) remains a separate delivery decision.
6. The Zentric 592-test claim still lacks a public CI/test-report link on the site.
7. Tanda 2 (new fish/shark system and broader all-tab redesign) remains deferred.
8. `davidmachado.dev` is NXDOMAIN; canonical URLs still point at the Vercel staging
   origin until the custom domain is configured.

## Next steps

1. Run the static output through a Vercel preview/production build and confirm
   `/projects/:id` rewrites serve `projects/:id.html` without a 404.
2. Review the Vercel preview on desktop and mobile; decide whether to make it public.
3. Commit and open/update the PR only with explicit authorization; do not mix in
   Tanda 2.
4. Add real certification URLs, project screenshots/demo captures, and a CI report
   link when available.
5. Deploy to production only after explicit approval; update canonical/OG origin if
   the custom domain is configured.
