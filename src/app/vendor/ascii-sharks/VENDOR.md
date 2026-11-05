# ascii-sharks (vendored)

Source: https://github.com/stackedlol/ascii-sharks
License: MIT (see `LICENSE` in this folder)
Vendored: 2026-10-30

Files copied as-is except for the notes below:

- `engine.ts`, `world.ts`, `renderer.ts`, `math.ts`, `species.ts`, `react.tsx`

Local modifications:

- Removed the `"use client"` directive from `react.tsx` (Vite/React, no server components).
- `renderer.ts`: background fill changed from `#000` to `#050505` so the canvas blends
  with the site background, and the grid alpha lowered from `0.055` to `0.04`.

The canvas inherits its glyph font from the computed `font-family` of the canvas element,
which the site sets to Geist Mono through `.ascii-ocean`.
