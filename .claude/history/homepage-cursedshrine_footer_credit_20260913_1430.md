# Homepage — footer credit line (2026-09-13 14:30)

## Asked
- Bottom right of the page: "developed and managed by Gaurav Rathore".

## Changed (`public/index.html`)
- Footer gets a third item `<span class="credit">` on its own full-width row
  (`flex-basis: 100%`), right-aligned, 0.8rem muted text.
- "Gaurav Rathore" links to https://gaurav.cursedshrine.com in sepia accent,
  bold, underline on hover — same wording/link as the shows-app footer credit.
- Existing © line and Portfolio / Blog / RSS links unchanged.

## Backup
- `.claude/backups/index.html.bak-20260913-1430`

## Verified
- HTML parses; headless 1280px + 393px footer crops: credit sits bottom-right,
  below the links, on both.
