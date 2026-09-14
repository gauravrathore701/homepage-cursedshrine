# Homepage — tagline + glyph logo removed (2026-09-13 13:40)

## Changed (`public/index.html`)
- Removed the 𓂀 glyph logo above the title (`<div class="glyph">`).
- Removed the tagline "a small altar of projects, lovingly cursed" (`<div class="tagline">`).
- Removed their now-unused `.glyph` / `.tagline` CSS rules.
- Kept: CURSED SHRINE title, favicon/app icons (browser tab), footer, all cards.

## Backup
- `.claude/backups/index.html.bak-20260913-1340`

## Verified
- HTML parses; live page no longer contains the tagline or glyph;
  headless screenshot: title sits directly above the featured row.
