# Cursed Shrine — Homepage

The root landing page for `cursedshrine.com` — a hub that links to all projects hosted on the Pi under the Cursed Shrine domain.

**Live URL:** https://cursedshrine.com

---

## What It Links To

Design mirrors the blog (`bloging-app/src/styles/global.css`): old-novel paper
palette, matte ink, hairline rows, 52rem column, marginalia doodles. Keep the
CSS tokens at the top of `index.html` in sync if the blog palette changes.

**Page order**

| Section | Content |
|---------|---------|
| Hero (main attraction) | Portfolio → https://gaurav.cursedshrine.com |
| Projects (centered heading, 2x2 cards, genre corner ribbon: Personal / Game) | Shows (`rel="nofollow"`), Tic-Tac-Toe, CursedCraft, Snakes & Ladders |

Blog is linked from the header and footer (no blog section on the page).

**API projects (ribbon: API, 2026-09-13)** — each card opens a doc page on this site:

| Card | Doc page | GitHub |
|------|----------|--------|
| Mecca API | /projects/mecca-api/ | private repo (no link) |
| User Auth API | /projects/user-auth-api/ | gauravrathore701/user-authentication-system |
| Mail Service | /projects/mail-service/ | gauravrathore701/Mail-Service |

Doc pages are generated: edit `.claude/tools/docs/build_docs.py`, re-run it. Shared styles in `public/docs.css`.

## Tech Stack

Static HTML/CSS/JS — no framework, no build step.

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS |
| Server | Python `http.server` |
| Hosting | Raspberry Pi → Cloudflare Tunnel |

## Project Structure

```
homepage-cursedshrine/
└── public/
    └── index.html     # Hub page with links to all subdomains
```

## Running Locally

```bash
cd public && python3 -m http.server 4176
```

## Deployment

```bash
sudo systemctl status homepage-cursedshrine
sudo systemctl restart homepage-cursedshrine
```

Port `4176` → Cloudflare Tunnel → `cursedshrine.com` + `www.cursedshrine.com`.
