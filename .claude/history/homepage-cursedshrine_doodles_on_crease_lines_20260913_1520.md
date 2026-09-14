# Homepage — doodles pinned to the edge crease lines (2026-09-13 15:20)

## Asked
- Restrict the doodles (marginalia) to sit strictly on/under the two edge fold-crease lines.

## Changed (`public/index.html`)
- `.margin-sketch.left`  → `left: calc(22.35% - var(--size) / 2)` (centred on the 22.2–22.5% crease)
- `.margin-sketch.right` → `left: calc(81.35% - var(--size) / 2)` (centred on the 81.2–81.5% crease)
  (was: fixed offsets from the 52rem column, which drifted off the lines on wide screens)
- Breakpoint 1280px → 1680px: below ~1665px the 22% crease runs through the content
  column, so a doodle centred on it would sit on the cards/text; they hide instead.
- Only the homepage has doodles; TicTacToe and Snakes & Ladders never had them.

## Backup
- `.claude/backups/index.html.bak-20260913-1520`

## Verified
- Headless 1920x1080, contrast-boosted: quill + moon centred on the left crease,
  lantern on the right crease, all clear of the content. 1440px: hidden as intended.
