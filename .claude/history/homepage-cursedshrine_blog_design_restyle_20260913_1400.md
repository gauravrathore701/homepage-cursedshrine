# Homepage — restyled to match the blog design (2026-09-13 14:00)

## Asked
- Homepage should follow the design pattern of dev.cursedshrine.com/blog.

## Source of the pattern
- `bloging-app/src/styles/global.css` (paper palette tokens + CSS texture),
  `Header.astro`, `Footer.astro`, `PostCard.astro`, `MarginSketches.astro`,
  `sketches.js`. Dev site read locally on 127.0.0.1:4184 (Cloudflare Access on public dev).

## New `public/index.html` (full rewrite, still static, no build step)
- Same tokens: bg #e8dfc9, bg-sec #ddd2b7, ink #2b2723, accent #6b4a2f,
  line #cbbd9e, system sans; same fold/grain/vignette background.
- Header: "Cursed Shrine" wordmark left, Portfolio / Blog links right, hairline.
- Hero (main attraction): inset bg-sec sheet — PORTFOLIO tag, "Gaurav — developer
  & designer", portfolio's own meta description, solid sepia "Visit the portfolio →".
- "From the blog": latest 3 posts from same-origin `/blog/rss.xml`, rendered as
  PostCard-style rows (date en-IN, category, title, description) via DOM APIs
  (textContent, no innerHTML). Static fallback row if fetch fails.
- "Projects": hairline rows with meta (kind · subdomain): Shows (nofollow),
  Tic Tac Toe, CursedCraft, Snakes & Ladders.
- Footer: © year · built on a Raspberry Pi; Portfolio / Blog / RSS.
- Marginalia: quill, lantern, moon (paths from sketches.js), ≥1280px only, 0.14 opacity.
- Old purple neon theme, title glow, cards removed (earlier tagline/glyph already gone).

## Bug caught during verify
- `.column { padding: 0 1rem }` (class specificity) overrode `header nav` / `main`
  vertical padding → header cramped. Switched to padding-left/right only.

## Backups
- `.claude/backups/index.html.bak-20260913-1350` (purple card version, pre-restyle)

## Verified
- Headless Chromium 1280px + 393px after fix; RSS rows render; /, www, /blog/,
  /blog/rss.xml, favicon all 200. README updated.
