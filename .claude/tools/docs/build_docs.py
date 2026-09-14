#!/usr/bin/env python3
"""Generate the API documentation pages under public/projects/<slug>/index.html.
Edit the PAGES data below and re-run:  python3 .claude/tools/docs/build_docs.py
Source of truth for contracts: each service's controllers (checked 2026-09-13)."""
import html, os
ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "..", "public", "projects")
GH_ICON = ('<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>')
e = html.escape

def endpoint(method, path, desc, req=None, res=None, auth=False, extra=""):
    out = [f'<div class="endpoint"><div class="sig"><span class="method {method.lower()}">{method}</span>'
           f'<span class="path">{e(path)}</span>' + ('<span class="auth">Bearer token</span>' if auth else '') + '</div>',
           f'<p>{desc}</p>']
    if req: out.append(f'<div class="label-sm">Request</div><pre><code>{e(req)}</code></pre>')
    if res: out.append(f'<div class="label-sm">Response</div><pre><code>{e(res)}</code></pre>')
    out.append(extra + '</div>')
    return "\n".join(out)

def table(head, rows):
    th = "".join(f"<th>{h}</th>" for h in head)
    tr = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f'<div class="table-wrap"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'

def page(p):
    if p["github"]:
        gh = f'<a class="button" href="{p["github"]}" rel="noopener">{GH_ICON} View on GitHub</a>'
    else:
        gh = '<span class="button ghost" aria-disabled="true" style="cursor:default">' + GH_ICON + ' Private repository</span>'
    base = f'<a class="button ghost" href="{p["base_link"]}">{e(p["base_label"])}</a>' if p.get("base_link") else ""
    chips = "".join(f'<span class="chip">{e(c)}</span>' for c in p["stack"])
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(p["name"])} — docs · Cursed Shrine</title>
<meta name="description" content="{e(p["tagline"])}">
<link rel="canonical" href="https://cursedshrine.com/projects/{p["slug"]}/">
<link rel="icon" type="image/svg+xml" href="/favicon-mark.svg">
<link rel="stylesheet" href="/docs.css?v=20260913">
</head>
<body>
  <header>
    <nav class="column">
      <a href="/" class="wordmark">Cursed Shrine</a>
      <div class="nav-links">
        <a href="https://gaurav.cursedshrine.com">Portfolio</a>
        <a href="/blog/">Blog</a>
      </div>
    </nav>
  </header>

  <main class="column">
    <div class="crumbs"><a href="/">Home</a> &rsaquo; <a href="/#projects">Projects</a> &rsaquo; {e(p["name"])}</div>
    <section class="doc-hero">
      <span class="kind">API</span>
      <h1>{e(p["name"])}</h1>
      <p>{p["tagline"]}</p>
      <div class="chips">{chips}</div>
      <div class="actions">{gh}{base}</div>
    </section>

    <article class="doc">
{p["body"]}
    </article>
  </main>

  <footer>
    <div class="column">
      <span>&copy; <span id="year">2026</span> Cursed Shrine &middot; built on a Raspberry Pi</span>
      <span class="links">
        <a href="/">Home</a>
        <a href="https://gaurav.cursedshrine.com">Portfolio</a>
        <a href="/blog/">Blog</a>
      </span>
      <span class="credit">developed and managed by <a href="https://gaurav.cursedshrine.com">Gaurav Rathore</a></span>
      <span class="assist">With the help of Claudy Rex (AI Assistant)</span>
    </div>
  </footer>
  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
  <script src="/doodles.js?v=20260913c" defer></script>
</body>
</html>
"""

MECCA = dict(
  slug="mecca-api", name="Mecca API",
  tagline="A Spring Boot gateway that sits in front of the Pi's backend services. Every request passes one strict pipeline — Controller → Service → Manager → Adapter — so callers never talk to a downstream service directly.",
  stack=["Java 21", "Spring Boot 3.3", "Spring WebFlux (WebClient)", "Lombok", "Maven"],
  github=None, base_link=None, base_label="",
  body="""
<h2>Overview</h2>
<p>Mecca API is a pure connector: it owns no database. It validates what the caller sends, translates it
into an internal shape, and forwards it to the service that owns the data — the
<a href="/projects/user-auth-api/">User Auth API</a> for accounts and watch progress, and the
<a href="/projects/mail-service/">Mail Service</a> for notifications.</p>
<p><strong>Base URL:</strong> <code>https://api.cursedshrine.com/api</code> — every route below is relative to it.</p>

<h2>Architecture</h2>
<pre><code>caller
  │  *Dto      (request contract)
controller
  │
service      DTO → Entity
  │  *Entity   (internal contract)
manager      orchestration
  │
adapter      Entity → Proxy, HTTP call
  │  *Proxy    (downstream contract)
downstream service (Rust)</code></pre>
<p>Each domain (<code>auth</code>, <code>progress</code>, <code>notification</code>) is a self-contained package with its own
controller, dto, service, entity, manager, adapter and proxy classes, plus a named <code>WebClient</code> for its downstream.</p>

<h2>Endpoints</h2>
<h3>Auth</h3>
""" + endpoint("POST", "/auth/register",
  "Create an account. <code>username</code>, <code>email</code> and <code>password</code> are required; any extra JSON fields are captured and forwarded untouched.",
  req='{\n  "username": "gaurav",\n  "email": "you@example.com",\n  "password": "••••••••"\n}',
  res='{\n  "success": true,\n  "message": "...",\n  "data": { "message": "user created", "id": "..." }\n}') + \
  endpoint("POST", "/auth/login", "Exchange credentials for a JWT, valid for 24 hours.",
  req='{\n  "username": "gaurav",\n  "password": "••••••••"\n}',
  res='{\n  "success": true,\n  "message": "...",\n  "data": { "token": "eyJhbGciOi..." }\n}') + """
<h3>Watch progress</h3>
<p>Cross-device resume for <a href="https://shows.cursedshrine.com" rel="nofollow">Shows</a>. The token is forwarded as-is;
the User Auth API verifies it. A missing <code>Authorization</code> header is rejected with <code>401</code>.</p>
""" + endpoint("POST", "/progress", "Save or update the position in an episode.",
  req='{\n  "show": "One Piece",\n  "path": "Episode 01.mkv",\n  "position": 612.4,\n  "duration": 1420.0,\n  "finished": false\n}', auth=True) + \
  endpoint("GET", "/progress", "Latest episode per show for the signed-in user.", auth=True) + \
  endpoint("GET", "/progress?show={show}", "Every episode watched in one show, newest first. <code>show</code> is the watch key, e.g. <code>One Piece</code> or <code>GOT/Season 03</code>.", auth=True) + """
<h3>Notification</h3>
""" + endpoint("POST", "/notification/subscribe", "Add an email subscriber through the Mail Service. <code>name</code> must be non-empty and <code>email</code> must look like an address; otherwise <code>400</code>.",
  req='{\n  "name": "Ada",\n  "email": "ada@example.com"\n}',
  res='201 Created\n{\n  "success": true,\n  "message": "subscriber saved"\n}') + """
<h2>Errors</h2>
<p>All failures share one JSON shape, produced by a global exception handler. Downstream HTTP errors keep their status code and the
downstream's short reason; internal hosts and paths are never included.</p>
<pre><code>{
  "success": false,
  "status": 400,
  "message": "..."
}</code></pre>
""" + table(["Status", "When"], [
  ["<code>400</code>", "Missing or invalid fields"],
  ["<code>401</code>", "Missing bearer token, invalid credentials, or expired token"],
  ["<code>404</code> / <code>405</code>", "Unknown route / wrong method"],
  ["<code>409</code>", "Username already exists"],
  ["<code>502</code>", "A downstream service is unreachable"],
  ["<code>500</code>", "Unexpected gateway error"],
]) + """
<h2>Source</h2>
<p>The Mecca API repository is private. The two services it fronts are open source —
see <a href="/projects/user-auth-api/">User Auth API</a> and <a href="/projects/mail-service/">Mail Service</a>.</p>
""")

AUTH = dict(
  slug="user-auth-api", name="User Auth API",
  tagline="A small Rust service that owns user accounts and watch progress: bcrypt-hashed passwords, 24-hour JWTs, and a MongoDB store. Public traffic reaches it through the Mecca API.",
  stack=["Rust 2024", "axum 0.7", "Tokio", "MongoDB", "bcrypt", "jsonwebtoken"],
  github="https://github.com/gauravrathore701/user-authentication-system",
  base_link="/projects/mecca-api/", base_label="Called via Mecca API →",
  body="""
<h2>Overview</h2>
<p>This service is the owner of two collections: <strong>users</strong> and <strong>watch progress</strong>.
It is not exposed to the internet directly — the <a href="/projects/mecca-api/">Mecca API</a> gateway forwards
<code>/api/auth/*</code> and <code>/api/progress</code> to it.</p>
""" + table(["Gateway route", "Service route"], [
  ["<code>POST /api/auth/register</code>", "<code>POST /users/register</code>"],
  ["<code>POST /api/auth/login</code>", "<code>POST /users/login</code>"],
  ["<code>POST|GET /api/progress</code>", "<code>POST|GET /progress</code>"],
]) + """
<h2>Endpoints</h2>
<h3>Users</h3>
""" + endpoint("POST", "/users/register",
  "Create a user. The password is hashed with bcrypt before it is stored.",
  req='{\n  "username": "gaurav",\n  "email": "you@example.com",\n  "password": "••••••••"\n}',
  res='201 Created\n{ "message": "user created", "id": "..." }',
  extra=table(["Status", "Body"], [["<code>400</code>", "<code>{\"error\": \"username required\"}</code> (or email / password)"], ["<code>409</code>", "<code>{\"error\": \"username already exists\"}</code>"]])) + \
  endpoint("POST", "/users/login", "Verify credentials and issue a JWT. The token's <code>sub</code> is the username and it expires after 24 hours.",
  req='{\n  "username": "gaurav",\n  "password": "••••••••"\n}',
  res='200 OK\n{ "token": "eyJhbGciOi..." }',
  extra=table(["Status", "Body"], [["<code>401</code>", "<code>{\"error\": \"invalid credentials\"}</code>"]])) + """
<h3>Watch progress</h3>
<p>Every progress route needs <code>Authorization: Bearer &lt;token&gt;</code>; the user comes from the token, never from the body.</p>
""" + endpoint("POST", "/progress",
  "Upsert the position for one episode. If <code>finished</code> is sent it wins; otherwise the episode counts as finished once the position is close to the end.",
  req='{\n  "show": "One Piece",\n  "path": "Episode 01.mkv",\n  "position": 612.4,\n  "duration": 1420.0,\n  "finished": false\n}', auth=True,
  extra=table(["Status", "Body"], [["<code>400</code>", "<code>{\"error\": \"show and path required\"}</code>"], ["<code>401</code>", "<code>{\"error\": \"missing bearer token\"}</code> / <code>invalid or expired token</code>"]])) + \
  endpoint("GET", "/progress", "Latest watched episode per show.", auth=True) + \
  endpoint("GET", "/progress?show={show}", "All episodes watched in one show, newest first.", auth=True) + """
<h2>Running it</h2>
<pre><code>cargo build --release
PORT=... MONGODB_URI=... JWT_SECRET=... \\
  ./target/release/user_auth_api</code></pre>
<p><code>JWT_SECRET</code> is required — the service refuses to start without it. CORS allows any origin.</p>
""")

MAIL = dict(
  slug="mail-service", name="Mail Service",
  tagline="A lightweight Rust backend for email: it captures newsletter subscribers from the portfolio site into MongoDB. Reached through the Mecca API's notification route.",
  stack=["Rust 2024", "axum 0.7", "Tokio", "MongoDB", "Serde"],
  github="https://github.com/gauravrathore701/Mail-Service",
  base_link="/projects/mecca-api/", base_label="Called via Mecca API →",
  body="""
<h2>Overview</h2>
<p>Mail Service keeps the email side of the Pi out of the other apps. It has no public hostname;
the <a href="/projects/mecca-api/">Mecca API</a> forwards <code>POST /api/notification/subscribe</code> to it and
identifies itself with a <code>clientId</code> header.</p>

<h2>Endpoints</h2>
""" + endpoint("GET", "/", "Health check — returns a plain-text greeting.") + \
  endpoint("POST", "/save/subscriber",
  "Store a subscriber. The caller must send a <code>clientId</code> header, which is saved with the record so each app's subscribers stay separate.",
  req='clientId: portfolio\n\n{\n  "name": "Ada",\n  "email": "ada@example.com"\n}',
  res='201 Created   (empty body)',
  extra=table(["Status", "When"], [["<code>400</code>", "<code>clientId</code> header missing"], ["<code>422</code>", "Body is not <code>{name, email}</code>"], ["<code>500</code>", "Database write failed"]])) + """
<h2>Project layout</h2>
<pre><code>src/
├── main.rs                  server, routes, CORS
├── controllers/root.rs      route handlers
├── services/
│   ├── greeting.rs
│   └── database_service.rs  MongoDB access
└── models/subscriber.rs     { name, email, client_id }</code></pre>

<h2>Running it</h2>
<pre><code>cargo build --release
MONGODB_URI=... ./target/release/mail_service</code></pre>
""")

for p in (MECCA, AUTH, MAIL):
    d = os.path.join(ROOT, p["slug"]); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w").write(page(p))
    print("wrote", p["slug"])
