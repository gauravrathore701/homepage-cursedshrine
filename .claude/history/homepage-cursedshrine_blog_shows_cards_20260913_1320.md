# Homepage — Blog + Shows cards (2026-09-13 13:20)

## What changed
- `public/index.html`: two cards added at the top of the grid:
  1. The Blog → `/blog/` (relative; cloudflared routes ^/blog on apex + www to :4182)
  2. Shows → https://shows.cursedshrine.com, `rel="nofollow"`
- Grid order now: Blog, Shows, Tic Tac Toe, CursedCraft, Snakes & Ladders.
- `public/sitemap.xml`: lastmod 2026-08-29 → 2026-09-13.
- README link table refreshed (it still listed the removed Portfolio card).
- Backup: `.claude/backups/index.html.bak-20260913` (kept OUT of public/ so it is not served).

## Deliberately not linked
- gaurav.cursedshrine.com — removed on purpose 2026-06-14.
- jenkins / api / dev hostnames — infra, not projects.
- zh-ai-support — work-related; never public.
- share-over-the-internet (:4185) — LAN only.

## Verified
- apex + www serve 5 cards; /blog/ → 200; HTML parses; backup URL → 404.
- Headless Chromium desktop 1280 + mobile 393 screenshots: layout OK
  (emoji render as tofu only because headless has no emoji font — pre-existing).

## Open
- Shows library page (titles list) and streams are publicly reachable without
  login; homepage link raises discoverability. Flagged to Gaurav.
- No service restart needed (python http.server serves files directly).
