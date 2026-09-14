# Homepage — blog section removed, project cards back (2026-09-13 14:15)

## Asked
- Remove the "From the blog" section.
- Center the Projects heading.
- Projects as cards, like the earlier design.

## Changed (`public/index.html`)
- Removed "From the blog" section and the RSS fetch script (only the footer
  year script remains). Blog still linked in header + footer.
- `.section-head` now centered; "All posts" link style dropped.
- `.row` list styles replaced by `.grid` (2 cols, 1 col ≤640px) of `a.card`:
  paper bg-sec, hairline border, 0.75rem radius, centered emoji icon, label,
  one-line blurb, small URL (0.7rem, overflow-wrap:anywhere). Hover: sepia
  border, soft shadow, 2px lift, label turns accent.
- Shows card keeps `rel="nofollow"`.

## Backup
- `.claude/backups/index.html.bak-20260913-1410` (rows + blog section version)

## Verified
- HTML parses; headless 1280px + 393px: heading centered, 2x2 cards desktop,
  stacked on mobile, URLs inside cards (emoji tofu = headless font only).
