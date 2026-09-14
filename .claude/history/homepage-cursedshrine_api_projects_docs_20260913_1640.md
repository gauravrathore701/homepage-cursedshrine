# Homepage — API projects + documentation pages (2026-09-13 16:40)

## Asked
- Add the running API projects to the homepage Projects section; each should
  lead to documentation of the project with GitHub links.

## Which APIs
- Mecca API (mecca-api-project, Spring Boot, :4181, public at api.cursedshrine.com/api)
- User Auth API (user-authentication-system, Rust/axum, :4183, internal, via Mecca)
- Mail Service (Mail-Service, Rust/axum, :7070, internal, via Mecca)
- Excluded: zh-ai-api (work project — never public).

## Added
- 3 cards in the Projects grid, blue `ribbon api` "API", linking to doc pages.
  Odd card count → last card centred at single-card width (full width on mobile).
  `#projects` anchor on the heading (used by doc breadcrumbs).
- `public/projects/{mecca-api,user-auth-api,mail-service}/index.html` — same paper
  design, header/footer/credit, shared doodles. Hero with stack chips, GitHub button,
  overview, endpoints (method/path, request/response examples, error statuses).
- `public/docs.css` shared doc styles.
- Generator: `.claude/tools/docs/build_docs.py` (edit data, re-run).
- `public/sitemap.xml`: 3 doc URLs added. README updated.

## Contracts documented from source (not READMEs)
- user-authentication-system README is stale (describes an old Node/Express app);
  docs follow src/ (axum routes, bcrypt, 24h JWT, FINISHED_RATIO fallback, CORS Any).
- Internal ports and env values kept out of the public pages.

## GitHub
- user-authentication-system and Mail-Service: public (200) → "View on GitHub".
- mecca-api-project: 404 publicly (private) → non-link "Private repository" badge.

## Issues found (reported to Gaurav, not fixed)
1. `POST /api/notification/send` is broken end-to-end: Mecca sends {to,from,subject,body}
   to Mail Service `/save/subscriber`, which expects {name,email} → 422.
2. Mecca error messages leak internal URLs, e.g.
   "downstream error: 400 Bad Request from POST http://localhost:4183/users/login".

## Backups
- `.claude/backups/index.html.bak-20260913-1630`, `.claude/backups/sitemap.xml.bak-20260913-1630`

## Verified
- /, 3 doc pages, docs.css, sitemap → 200; both public GitHub links 200.
- Screenshots: homepage grid (1280) with 3 API cards + centred last card;
  User Auth doc (1280); Mecca doc (393 mobile).
