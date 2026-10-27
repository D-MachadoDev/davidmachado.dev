# STATUS — Portfolio

Read this file first when opening a session. Do not re-ask what is already answered here.
Last updated: 2026-10-27.

## What this is

Personal portfolio. Frontend only — no backend, no database.
Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS 4 + Motion.
Scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `test`.

## Current work: human positioning pass

Branch: `feat/human-positioning` (from `origin/main` at `c7b560f`), commit `ee9a58a`.

- Hero leads with the outcome: "I turn messy business rules into software a team can
  trust, and leave tests, docs, and decisions behind so it stays that way." Four anchors
  only: .NET 10, TypeScript, PostgreSQL, Docker.
- New `HowIWork` section (`#how-i-work`): written communication, ownership, self-directed
  learning, collaboration.
- About heading is "I write code so other people can keep it"; the bio is first person and
  the seven competency groups are compact rows instead of cards.
- Section order: Hero -> Projects -> HowIWork -> About -> Experience -> Contact.
- Decorative layer removed: parallax, floating shapes, section dividers, gradient orbs,
  custom cursor, blinking badge caret, scroll indicator. Bundle 424.90 -> 412.29 kB JS.
- CV PDF regenerated with a `Working style` line (51,565 B, one page).

## Credibility pass (merged)

PR #1 (`feat: rebuild the portfolio around verifiable evidence`) was squash-merged into
`main` as `c7b560f`; production was deployed from the merge and verified live.

- Featured projects come from `src/app/data/projects.ts`: Zentric (open source, .NET 10,
  592 tests), LeaseFlow (open source, TypeScript/SQLite/Vitest), and Retail Analytics
  (private case study). Faro, Virtualized Explorer, Redis, and countdown claims were
  removed.
- Contact is a real `mailto:` composer (`src/app/lib/mailto.ts`); the page never claims a
  message was sent. The same link is used by the navbar and mobile menu. The dead X/Twitter
  profile link was removed from the UI and metadata.
- Mobile navigation is reachable at every scroll position; the back-to-top button hides
  while the contact section is visible so it cannot cover the footer.
- The About section uses David's GitHub headshot (`public/assets/david-machado.jpg`) and
  links it to his GitHub profile.
- Unused UI kit, Certifications, LoadingScreen, sonner, and ~30 dependencies removed.
- SEO uses `https://davidmachado-dev.vercel.app/` because `davidmachado.dev` does not
  resolve (NXDOMAIN).
- Tests: mailto builder, project data, and i18n key parity (15 passing).

## Verified facts (2026-10-26)

- `D-MachadoDev/Zentric`: .NET 10, Hexagonal + DDD + CQRS, PostgreSQL, Docker, README
  badge `Tests-592 Passing (100%)`. Returns HTTP 200.
- `D-MachadoDev/leaseflow`: TypeScript + Express + SQLite, Vitest. Returns HTTP 200.
- The CV source and PDF include the live portfolio URL.
- GitHub profile README (`D-MachadoDev/D-MachadoDev`) now links to the live portfolio,
  LinkedIn, and email (commit `82fce07`); the repo homepage points to the deployment.
- The GitHub profile bio/blog still show the old `davidmachado.github.io` URL because the
  current token lacks the `user` scope. Fix with `gh auth refresh -h github.com -s user`.
- Production is live at `https://davidmachado-dev.vercel.app/` (Vercel project
  `davidmachado-dev`; current deployment in the merge evidence below).
- `davidmachado.dev` has no DNS record. Do not restore it as canonical until it resolves.
- The former `https://x.com/Davidma13020061` profile returns 404; it was removed from the
  contact section, footer, Twitter metadata, and JSON-LD.
- `npm audit --omit=dev` reports 0 production vulnerabilities. Dev-only advisories remain
  in Vitest/Tinypool; the available fix requires Vitest 5, a breaking upgrade.

## Merge and deploy evidence (2026-10-27)

- PR #1 squash-merged into `main` as `c7b560f`; CI `verify` passed in 27s and Vercel
  preview/production checks passed.
- Production deployment `davidmachado-p3av8g82b` was built from the merge by the Vercel
  GitHub integration; it serves `index-5ywYEnZ5.js`.
- Live post-merge smoke: avatar 200 (13,027 B), CV 200 (51,063 B), mailto visible, 0
  console errors at 1280x800 and 390x844.

## Verification evidence (2026-10-27)

- `npm run typecheck`: pass.
- `npx biome check .`: pass (154 files).
- `npm test -- --run`: 15/15 passing.
- `npm run build`: pass. Bundle: 412.29 kB JS / 46.49 kB CSS.
- Headless Edge on the local preview (1280x800 and 390x844, EN and ES): four hero anchors
  in one row, stats 3/592/9/2, no horizontal overflow, 0 console errors; About,
  HowIWork, Experience, and Contact render correctly.
- Local preview LCP measured at ~2.0-2.2s (local preview, not field data).

## Known issues / blockers

1. `gh` CLI returns 401 Bad credentials while `GITHUB_TOKEN` is set. Unset it to use the
   valid keyring account; pushing and PR creation still need an explicit go-ahead.
2. GitHub profile fields (bio, blog, email) need the `user` scope that the keyring token
   does not have. Run `gh auth refresh -h github.com -s user` to fix the dead blog URL.
3. `og-image.png` and the CV PDF are generated assets; regenerate when copy changes.
4. Local `main` is still the pre-squash history (`39f5661`) while `origin/main` is
   `c7b560f`; cleaning it requires a destructive reset and explicit approval.

## Next steps

1. Push `feat/human-positioning` and open the PR once authorized.
2. Merge after review; verify the production deployment built from the merge commit.
3. Synchronize local `main` with `origin/main` and remove the merged branch, once approved.
