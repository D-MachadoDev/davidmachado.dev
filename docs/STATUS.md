# STATUS — davidmachado.dev

Read this file first when opening a session. Do not re-ask what is already answered here.
Last updated: 2026-09-29.

## What this is

Personal portfolio website. Frontend only — no backend.
Stack: React + TypeScript + Vite + TailwindCSS + Motion (`motion/react`) + lucide-react.
Scripts: `npm run dev` / `npm run build` / `npm run preview`. No test or lint script yet.

## Git state (evidence: `git log`, `git status` — 2026-09-29)

- Branch `main`, remote `origin` → `github.com/D-MachadoDev/davidmachado.dev.git`.
- Last product commit: `a965d1f` (2026-06-02) `fix hero spacing on mobile`.
- 2026-06-02: source added (`608627e`), MobileMenu + language switch (`659e9ae`), then 4 commits with the identical message `fix hero spacing on mobile` (`bf5af82`…`a965d1f`).
- 2026-09-29: rules template added (`702eac5`, merge `71f8d72`).

## Uncommitted work

- `README.md` (+16 lines): pasted quality checklist — real problem/audience, production demo, clear README, clean repo, error/loading/empty states, tests on critical logic, decisions & trade-offs section, later improvements. Candidate acceptance criteria; not approved nor committed yet. [PENDIENTE]
- `.agents/`, `skills-lock.json`: agent skill config, untracked.

## Known issues / debt

1. **Possible lost work**: `src/app/components/{Hero,MagneticButton,Projects}.tsx` and `i18n.ts` have mtime 2026-09-29 15:19 but content identical to HEAD; no stash exists. The Hero redesign shown in chat on 2026-09-29 is not in the worktree. [CONFIRMADO: `git status` clean for these files, `git stash list` empty; INFERIDO: the changes were discarded or never written to disk] — verify before building on top of it.
2. Four consecutive commits share one message (conventional-commit violation).
3. No tests (`*.test.*` / `*.spec.*` not found under `src/`), no lint, no CI.
4. `dist/` exists locally (build 2026-09-29 15:14); ignored by `.gitignore`.

## Next steps

1. Fase 0 intake (`grilling`) — answers go to the project note in Obsidian: real answers only, `[PENDIENTE]` for the rest, created only after the interview (AGENTS.md, Fase 0).
2. Decide: is the README checklist the definition of done? Commit it or remove it.
3. Confirm whether the Hero redesign must be redone.
