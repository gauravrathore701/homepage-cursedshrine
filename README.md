# Cursed Shrine — Homepage

The root landing page for `cursedshrine.com` — a hub that links to all projects hosted on the Pi under the Cursed Shrine domain.

**Live URL:** https://cursedshrine.com

---

## What It Links To

| Project | URL |
|---------|-----|
| Portfolio | https://gaurav.cursedshrine.com |
| Tic-Tac-Toe | https://tictactoe.cursedshrine.com |
| Minecraft Clone | https://minecraft.cursedshrine.com |
| Snakes & Ladders | https://snakeladder.cursedshrine.com |
| Shows App | https://shows.cursedshrine.com |

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
