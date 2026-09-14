# Homepage — genre corner ribbons on project cards (2026-09-13 14:25)

## Asked
- Ribbon in the top-left of each project card showing its genre:
  Shows = Personal, the rest = Game.

## Changed (`public/index.html`)
- `a.card` gets `position: relative; overflow: hidden` so the band is clipped to the card.
- New `a.card .ribbon`: absolute, top 24px / left -36px, 140px wide, rotate(-45deg),
  0.625rem bold uppercase, letter-spacing 0.12em, paper-coloured text, soft shadow,
  pointer-events none.
  - Game → sepia accent `#6b4a2f`
  - Personal (`.ribbon.personal`) → ink `#2b2723`, so it reads apart from the games
- Markup: `<span class="ribbon">Game</span>` / `<span class="ribbon personal">Personal</span>`
  as first child of each card.
- First pass (top 16 / left -32 / 120px) clipped "PERSONAL"; moved further from
  the corner and widened, re-verified at 2x zoom.

## Backup
- `.claude/backups/index.html.bak-20260913-1420`

## Verified
- HTML parses; headless 1280px + 393px, 2x crop: full "PERSONAL" / "GAME" text
  visible, clear of the icon and title.
