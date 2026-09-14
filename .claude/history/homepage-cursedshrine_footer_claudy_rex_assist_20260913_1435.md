# Homepage — "With the help of Claudy Rex" footer line (2026-09-13 14:35)

## Asked
- Below the "developed and managed by Gaurav Rathore" credit, in small letters:
  "With the help of Claudy Rex (AI Assistant)".

## Changed (`public/index.html`)
- New `<span class="assist">` right after the credit span in the footer.
- `footer .assist`: own full-width row, right-aligned, 0.7rem, italic, muted
  colour at 0.85 opacity, pulled 0.4rem up so it hugs the credit line.
- Plain text, no link.

## Backup
- `.claude/backups/index.html.bak-20260913-1435`

## Verified
- HTML parses; headless 1280px + 393px footer crops: line sits directly under
  the credit, bottom-right, smaller and lighter than the credit.
