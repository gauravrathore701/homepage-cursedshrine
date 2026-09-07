# Apex robots.txt + sitemap.xml added — 2026-09-06 12:40

## Why
Origin logs showed 7 days of crawler requests 404ing:
    84  GET /robots.txt   -> 404
    56  GET /sitemap.xml  -> 404
Apex root is served by homepage-cursedshrine.service
(python -m http.server 4176, --directory .../public).

## Correction to an earlier claim
The blog already had both files and they were already
live — no change was needed there:
    /srv/blog/blog/robots.txt          200
    /srv/blog/blog/sitemap-index.xml   200
Astro's @astrojs/sitemap (3.7.4) is already wired in
astro.config.mjs. Only the APEX was missing.

Also: https://cursedshrine.com/robots.txt was already
returning 200 at the edge — Cloudflare Managed robots.txt
(AI content-signals) was synthesising one. The origin 404s
were real, but visitors never saw them. That managed file
carried no Sitemap: line, so discovery was still broken.

## Change (2 new files, nothing overwritten)
  .../homepage-cursedshrine/public/robots.txt
  .../homepage-cursedshrine/public/sitemap.xml

robots.txt: allow all, Disallow /cdn-cgi/, and two
Sitemap: lines (apex + blog sitemap-index).
sitemap.xml: single urlset entry for the apex root.
Nested sitemap-index files are not supported by Google,
so the blog index is referenced from robots.txt instead
of being nested inside the apex sitemap.

## Verified
  origin   127.0.0.1:4176/robots.txt   200
  origin   127.0.0.1:4176/sitemap.xml  200
  edge     cursedshrine.com/sitemap.xml  200
  edge     cursedshrine.com/robots.txt   200 (MISS)
  XML parses clean (xml.dom.minidom)

Cloudflare merges its managed block above the origin file;
both Sitemap: lines survive in the served output.

## Not done
No service restarted (http.server reads from disk, static).
No Cloudflare WAF rule created. No dev-site change —
/srv/blog-dev keeps its Disallow: / robots.
