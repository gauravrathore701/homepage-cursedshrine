# Shared doodle storage — 20 doodles, 5–7 per page (2026-09-13 15:55)

## Asked
- Add doodles in the style of 4 reference pencil sketches (cat holding a flower,
  googly-eyed blob with mitten hands, sleeping blob with Zzz, big round face with
  ring eyes) to the doodle storage; every page should show 5–7 doodles.

## Built
- `public/doodles.js` (served at https://cursedshrine.com/doodles.js) = storage + placer.
  - 20 doodles: 12 classic from bloging-app/src/sketches.js + 8 new:
    cat-with-flower, googly-hands, sleepy-blob, ring-eyes (from the refs) and
    ghost, mushroom, star-buddy, peeking-cat (same style). New ones use stroke 2
    and solid-ink `fill` paths for pupils.
  - Per page load: random 5, 6 or 7; at least 3 (≈60%) from the cute set.
  - Centred on the edge fold creases (22.35% / 81.35%), alternating lines,
    spread down the page with jitter, size 78–109px, rotation ±15°, opacity .2.
  - Hidden below 1680px (creases cross the content column there).
  - Re-lays out on resize and via ResizeObserver (TicTacToe route changes).
- Generator + preview sheet: `.claude/tools/doodles/gen.mjs`, `preview.html`
  (regenerating overwrites public/doodles.js logic — the cute-bias patch is in both).

## Wired in
- Homepage: removed inline 3-doodle SVG markup + CSS; `<script src="/doodles.js?v=20260913b" defer>`.
- snake-ladder public/index.html and TicTacToe-React index.html (rebuilt):
  `<script src="https://cursedshrine.com/doodles.js?v=20260913b" defer>`.
- Bump the `?v=` in all three when doodles.js changes (Cloudflare caches .js).

## Backups
- homepage `.claude/backups/index.html.bak-20260913-1550`
- snake-ladder `.claude/backups/index.html.bak-20260913-1550`
- TicTacToe `.claude/backups/src-20260913/index.html.bak-1550`

## Verified
- doodles.js 200 text/javascript; headless 1920x1080 dump-dom, 2 loads per site:
  5–7 doodles each, ≥3 cute every time; contrast-boosted screenshots show them on the creases.

## Not changed
- Blog (bloging-app) still uses its own sketches.js with 3 per page.
