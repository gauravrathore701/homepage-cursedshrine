# Doodles kept inside the outer margins (2026-09-13 16:10)

## Correction
- Gaurav meant: doodles must stay BETWEEN the page edge and the fold creases and
  never cross them — not sit on the crease lines (15:20 / 15:55 misread).

## Changed (`public/doodles.js`, mirrored in `.claude/tools/doodles/gen.mjs`)
- Two margins per page:
  - left  = [8px, min(22% width, content-column left) − 8px]
  - right = [max(81.5% width, content-column right) + 8px, width − 8px]
  (content column = 52rem / 832px)
- Each doodle gets a random x inside its margin; size capped at margin/1.25 so the
  ±15° rotation (~12% growth per side) also stays inside. Under 56px → that doodle hides.
- Removed the fixed 1680px cut-off: doodles now show from ~1100px wide, fewer/none below.
- Still 5–7 per load, ≥3 cute, spread top→bottom, clamped above the page bottom.
- Cache-bust `?v=20260913c` in homepage, snake-ladder, TicTacToe (rebuilt).

## Backup
- `.claude/backups/doodles.js.bak-20260913-1605`

## Verified
- Local copy of the homepage with a bounds checker (getBoundingClientRect incl. rotation),
  viewport 1920/1440/1280/1100/900: every doodle inside its margin ("ok") at all
  widths; all hidden at 900. Snakes & Ladders 1440 screenshot: doodles between edge and creases.
