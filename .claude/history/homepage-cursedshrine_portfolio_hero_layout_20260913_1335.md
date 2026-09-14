# Homepage — Portfolio hero + URL overflow fix (2026-09-13 13:35)

## Asked
- Tic Tac Toe / CursedCraft / Snakes & Ladders URLs overflowed their cards; shrink them.
- Bring back Portfolio as the main attraction, with the Blog alongside.

## Changed (`public/index.html`)
- `.wrap` max-width 720 → 820px.
- New `.featured` row (1.6fr / 1fr): Portfolio hero card (glow, gradient,
  larger label, blurb, "ENTER →" pill) + Blog side card with blurb.
- `— other relics —` section title, then a fixed 2x2 grid: Shows, Tic Tac Toe,
  CursedCraft, Snakes & Ladders (no orphan card).
- URL text (`.desc`) 0.8rem → 0.68rem, `overflow-wrap: anywhere`,
  cards `min-width: 0` so text can never spill out.
- ≤600px: featured + grid collapse to one column.
- Portfolio card reverses the 2026-06-14 removal, on Gaurav's request.

## Backups
- `.claude/backups/index.html.bak-20260913-1330` (pre-change)
- `.claude/backups/index.html.bak-20260913` (before the earlier Blog/Shows edit)

## Verified
- HTML parses; headless Chromium at 1280px and 393px: URLs inside cards,
  hero dominant, no overflow. README updated.
