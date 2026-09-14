/*
 * Cursed Shrine doodle storage + placer.
 * One shared file, loaded by cursedshrine.com, tictactoe. and snakeladder.:
 *   <script src="https://cursedshrine.com/doodles.js?v=YYYYMMDD" defer></script>
 *
 * - STORAGE: 20 doodles. The first 12 are the blog's marginalia
 *   (bloging-app/src/sketches.js); the rest are cute pencil-style ones drawn after
 *   Gaurav's reference sketches. Add new ones to DOODLES — {name, box, w, d[], fill?[]}.
 *   d = stroked paths, fill = solid-ink paths (pupils etc).
 * - Each page load picks 5–7 at random and places them in the two outer paper
 *   margins: left of the 22% fold crease and right of the 81% crease. A doodle
 *   never crosses a crease, the page edge, or the 52rem content column; spread
 *   down the page height.
 * - A doodle that does not fit its margin at the current width is hidden
 *   (small screens show fewer or none).
 * - Opt-in options (script tag attributes, used by shows.cursedshrine.com):
 *     data-anchor=".page"  margins are measured from that element's left/right edges
 *                          instead of the 22%/81% creases + 52rem column; if the
 *                          element is not on the page (SPA route change) margin
 *                          doodles hide.
 *   and any element with  data-doodle-slot  gets a row of 3–5 small doodles laid out
 *   inside it (filled when it appears, re-laid out on resize).
 */
(function () {
  var DOODLES = [{"name":"quill","box":"0 0 64 64","d":["M12 54c6-3 10-7 14-12","M26 42c8-11 16-20 26-28-1 12-5 22-11 30-4 5-9 8-15 10","M30 40c5-6 10-11 16-16","M10 56l6-2"],"w":1.6},
    {"name":"inkpot","box":"0 0 64 64","d":["M20 30h24c1 0 2 1 2 2l-2 18c0 2-2 3-4 3H24c-2 0-4-1-4-3l-2-18c0-1 1-2 2-2z","M24 30c0-4 3-7 8-7s8 3 8 7","M28 22h8","M46 24c3-2 6-1 7 2"],"w":1.6},
    {"name":"moth","box":"0 0 64 64","d":["M32 22v22","M32 26c-6-8-16-10-20-4-3 5 2 13 10 17 4 2 8 3 10 3","M32 26c6-8 16-10 20-4 3 5-2 13-10 17-4 2-8 3-10 3","M32 22l-4-6M32 22l4-6"],"w":1.6},
    {"name":"key","box":"0 0 64 64","d":["M22 26a7 7 0 1 0 .1 0z","M28 30l20 12","M42 38l-3 5","M47 41l-3 5"],"w":1.6},
    {"name":"moon","box":"0 0 64 64","d":["M40 14c-11 3-18 12-17 22 1 11 11 18 22 16-9-3-15-11-15-20 0-8 4-15 10-18z","M48 22l2-4 2 4 4 2-4 2-2 4-2-4-4-2z"],"w":1.6},
    {"name":"bird","box":"0 0 64 64","d":["M12 34c6-6 12-8 18-6","M30 28c4-6 10-8 16-6-3 1-5 3-6 5","M30 28c-1 6 1 11 5 14","M35 42c5 1 9-1 12-5","M44 24l4-2"],"w":1.6},
    {"name":"spiral","box":"0 0 64 64","d":["M32 32c0-4 4-6 7-4 4 2 4 8 1 12-4 5-12 5-17 0-6-6-6-16 1-22 8-7 20-6 27 2"],"w":1.6},
    {"name":"anchor","box":"0 0 64 64","d":["M32 18a4 4 0 1 0 .1 0z","M32 24v26","M22 30h20","M14 40c0 10 8 16 18 16s18-6 18-16","M14 40l-4 4M50 40l4 4"],"w":1.6},
    {"name":"lantern","box":"0 0 64 64","d":["M26 24h12l3 22H23z","M28 18c0-3 2-5 4-5s4 2 4 5","M23 46h18","M32 28v12","M28 46l-2 6M36 46l2 6"],"w":1.6},
    {"name":"compass","box":"0 0 64 64","d":["M32 12a20 20 0 1 0 .1 0z","M24 40l6-14 10-6-6 14z","M32 12v4M32 48v4M12 32h4M48 32h4"],"w":1.6},
    {"name":"leaf","box":"0 0 64 64","d":["M18 46c0-16 10-28 28-30 2 16-8 30-24 32-2 0-4 0-4-2z","M20 48c8-10 16-18 24-24","M14 52l6-4"],"w":1.6},
    {"name":"eye","box":"0 0 64 64","d":["M10 32c8-10 16-14 22-14s14 4 22 14c-8 10-16 14-22 14s-14-4-22-14z","M32 26a6 6 0 1 0 .1 0z","M32 14v-4M18 20l-3-3M46 20l3-3"],"w":1.6},
    {"name":"cat-with-flower","box":"0 0 64 64","w":2,"d":["M10 50c-3-8-2-18 2-26l-2-12 10 8c6-3 14-3 20 0l9-9 1 13c4 8 3 18-2 25","M49 49c-10 5-28 5-39 1","M44 45c3-5 6-10 9-15","M50 31c1-3 5-3 6 0 1 3-2 5-4 5-2 0-3-2-2-5z","M55 29c0-6 0-11 1-15","M56 5c2-3 5-1 4 2 3 0 4 3 1 4 2 2 0 5-2 4-1 3-5 3-5 0-3 1-4-2-2-4-3-1-2-4 1-4-1-3 2-4 3-2z","M24 50l-1 6 4-3 3 4 1-6"],"fill":["M13 36a7 7 0 1 0 14 0a7 7 0 1 0-14 0","M29 35a7 7 0 1 0 14 0a7 7 0 1 0-14 0"]},
    {"name":"googly-hands","box":"0 0 64 64","w":2,"d":["M32 8c10-1 18 7 18 17s-8 17-18 17-18-7-18-17 8-17 18-17z","M30 10c10-1 17 6 17 15","M14 44c-4 2-5 8-1 11 3 2 7 1 9-1 1 3 5 3 6 0 1-3-2-5-5-5-2-3-6-6-9-5z","M36 46c-2 3-1 8 3 9 3 1 6-1 7-3 2 2 6 1 6-2 0-3-3-4-5-4-2-3-8-3-11 0z","M56 38l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z","M6 30c-2-2 0-5 2-3 2-2 4 1 2 3l-2 2z","M10 19l4 1M11 22l3 1"],"fill":["M22 25a5 7 0 1 0 10 0a5 7 0 1 0-10 0","M34 27a5 7 0 1 0 10 0a5 7 0 1 0-10 0"]},
    {"name":"sleepy-blob","box":"0 0 64 64","w":2,"d":["M8 50c0-16 10-26 24-26s24 10 24 26","M5 53c10 3 44 3 54 0","M21 38c2-1.5 5-1.5 7 0","M37 38c2-1.5 5-1.5 7 0","M32 42h.5","M17 51c0-5 3-8 7-8s7 3 7 8","M34 51c0-5 3-8 7-8s7 3 7 8","M44 30l-5 5M48 34l-7 7","M33 5h6l-6 7h6","M43 3h4l-4 5h4","M50 11h3l-3 4h3"]},
    {"name":"ring-eyes","box":"0 0 64 64","w":2,"d":["M32 8c14 0 24 10 24 24s-10 24-24 24S8 46 8 32 18 8 32 8z","M29 10c14-1 24 9 25 22","M21 25a9 9 0 1 0 .1 0z","M43 23a9 9 0 1 0 .1 0z","M20 50l6-4M27 52l6-4"],"fill":["M16.5 34a2.5 3.5 0 1 0 5 0a2.5 3.5 0 1 0-5 0","M42.5 33a2.5 3.5 0 1 0 5 0a2.5 3.5 0 1 0-5 0"]},
    {"name":"ghost","box":"0 0 64 64","w":2,"d":["M16 54V28c0-10 7-18 16-18s16 8 16 18v26l-5-4-5 4-6-4-6 4-5-4z","M19 38l3 1M42 39l3-1"],"fill":["M23 30a3 4 0 1 0 6 0a3 4 0 1 0-6 0","M35 30a3 4 0 1 0 6 0a3 4 0 1 0-6 0"]},
    {"name":"mushroom","box":"0 0 64 64","w":2,"d":["M10 30c0-12 10-20 22-20s22 8 22 20c-6 3-38 3-44 0z","M24 32c-1 8-1 15 0 20h16c1-5 1-12 0-20","M20 17a3 3 0 1 0 .1 0z","M40 13a3 3 0 1 0 .1 0z","M29 46c2 2 4 2 6 0"],"fill":["M26.5 40a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0","M34.5 40a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0"]},
    {"name":"star-buddy","box":"0 0 64 64","w":2,"d":["M32 6l7 16 17 2-13 11 4 17-15-9-15 9 4-17L8 24l17-2z","M28 36c2 2 6 2 8 0","M54 50l1-3 1 3 3 1-3 1-1 3-1-3-3-1z"],"fill":["M25.2 29a1.8 2.4 0 1 0 3.6 0a1.8 2.4 0 1 0-3.6 0","M35.2 29a1.8 2.4 0 1 0 3.6 0a1.8 2.4 0 1 0-3.6 0"]},
    {"name":"peeking-cat","box":"0 0 64 64","w":2,"d":["M6 46h52","M14 46c0-10 6-18 18-18s18 8 18 18","M17 33l-3-11 9 7","M47 33l3-11-9 7","M19 46c0-3 6-3 6 0","M39 46c0-3 6-3 6 0"],"fill":["M22.5 37a3.5 4.5 0 1 0 7 0a3.5 4.5 0 1 0-7 0","M34.5 37a3.5 4.5 0 1 0 7 0a3.5 4.5 0 1 0-7 0"]}];

  var SCRIPT = document.currentScript;
  var ANCHOR = SCRIPT ? SCRIPT.getAttribute('data-anchor') : null;
  var CLASSIC_COUNT = 12;
  var CREASES = [0.22, 0.815];   // fold-crease x positions (fraction of width), see body background
  var CONTENT = 832;             // 52rem content column
  var EDGE = 8;                  // px gap from page edge / crease / content
  var MIN_SIZE = 56;             // smaller than this and the doodle is hidden
  var NS = 'http://www.w3.org/2000/svg';

  var style = document.createElement('style');
  style.textContent =
    '.cs-doodles{position:absolute;inset:0;pointer-events:none;overflow:hidden}' +
    '.cs-doodle,.cs-slot-doodle{position:absolute;color:#2b2723;opacity:.2}' +
    '[data-doodle-slot]{position:relative;overflow:hidden}';
  document.head.appendChild(style);

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var count = 5 + Math.floor(Math.random() * 3);           // 5, 6 or 7
  var startLine = Math.floor(Math.random() * 2);
  // At least 3 (up to ~60%) of each page's doodles come from the cute pencil set.
  var CLASSIC = DOODLES.slice(0, CLASSIC_COUNT), CUTE = DOODLES.slice(CLASSIC_COUNT);
  var nCute = Math.min(CUTE.length, Math.max(3, Math.round(count * 0.6)));
  var chosen = shuffle(shuffle(CUTE.slice()).slice(0, nCute)
    .concat(shuffle(CLASSIC.slice()).slice(0, count - nCute)));
  var picked = chosen.map(function (s, i) {
    return {
      s: s,
      line: (startLine + i) % 2,
      size: 78 + Math.floor(Math.random() * 32),             // px
      rot: Math.floor(Math.random() * 30) - 15,              // deg
      jitter: Math.random(),
      xj: Math.random(),
    };
  });

  var box, svgs = [];

  function makeSvg(s, cls) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', cls);
    svg.setAttribute('viewBox', s.box);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', String(s.w || 1.6));
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('data-doodle', s.name);
    (s.d || []).forEach(function (d) {
      var path = document.createElementNS(NS, 'path'); path.setAttribute('d', d); svg.appendChild(path);
    });
    (s.fill || []).forEach(function (d) {
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d); path.setAttribute('fill', 'currentColor'); path.setAttribute('stroke', 'none');
      svg.appendChild(path);
    });
    return svg;
  }

  // ── slots: [data-doodle-slot] elements get a row of small doodles ──
  function fillSlots() {
    var slots = document.querySelectorAll('[data-doodle-slot]:not([data-doodle-filled])');
    Array.prototype.forEach.call(slots, function (el) {
      el.setAttribute('data-doodle-filled', '');
      var n = 3 + Math.floor(Math.random() * 3);             // 3–5, mostly cute
      var pool = shuffle(CUTE.slice()).slice(0, Math.min(CUTE.length, n - 1))
        .concat(shuffle(CLASSIC.slice()).slice(0, 1));
      el._doodles = shuffle(pool).map(function (s) {
        var svg = makeSvg(s, 'cs-slot-doodle');
        el.appendChild(svg);
        return { svg: svg, rot: Math.floor(Math.random() * 30) - 15, xj: Math.random() - .5, yj: Math.random() - .5 };
      });
    });
  }

  function layoutSlots() {
    var slots = document.querySelectorAll('[data-doodle-slot][data-doodle-filled]');
    Array.prototype.forEach.call(slots, function (el) {
      var items = el._doodles || [], W = el.clientWidth, H = el.clientHeight;
      var size = Math.min(72, Math.floor(H * 0.78));
      var fit = size < 36 ? 0 : Math.min(items.length, Math.floor(W / (size * 1.7)));
      var cell = fit ? W / fit : 0, x0 = 0;             // spread across the whole slot
      items.forEach(function (it, i) {
        if (i >= fit) { it.svg.style.display = 'none'; return; }
        var free = Math.max(0, cell - size * 1.25);             // room left after rotation growth
        var x = x0 + cell * i + (cell - size) / 2 + it.xj * free;
        var y = (H - size) / 2 + it.yj * Math.max(0, H - size * 1.25);
        it.svg.style.display = 'block';
        it.svg.style.width = it.svg.style.height = size + 'px';
        it.svg.style.left = Math.round(x) + 'px';
        it.svg.style.top = Math.round(y) + 'px';
        it.svg.style.transform = 'rotate(' + it.rot + 'deg)';
      });
    });
  }

  function build() {
    box = document.createElement('div');
    box.className = 'cs-doodles';
    box.setAttribute('aria-hidden', 'true');
    picked.forEach(function (p) {
      var svg = makeSvg(p.s, 'cs-doodle');
      box.appendChild(svg);
      svgs.push(svg);
    });
    var body = document.body;
    if (getComputedStyle(body).position === 'static') body.style.position = 'relative';
    body.insertBefore(box, body.firstChild);
  }

  function layout() {
    layoutSlots();
    var W = box.clientWidth, H = box.clientHeight, top = 90, bottom = 50;
    var strips;
    if (ANCHOR) {
      // Margins are whatever lies outside the anchor element (e.g. Shows' .page column).
      var el = document.querySelector(ANCHOR);
      if (!el) { box.style.display = 'none'; return; }
      var r = el.getBoundingClientRect();
      strips = [[EDGE, r.left + window.scrollX - EDGE], [r.right + window.scrollX + EDGE, W - EDGE]];
    } else {
      var colL = (W - CONTENT) / 2, colR = W - colL;
      // [start, end] of each outer margin, never past a crease or into the content column.
      strips = [
        [EDGE, Math.min(CREASES[0] * W, colL) - EDGE],
        [Math.max(CREASES[1] * W, colR) + EDGE, W - EDGE],
      ];
    }
    box.style.display = 'block';
    [0, 1].forEach(function (line) {
      var items = picked.filter(function (p) { return p.line === line; });
      var a = strips[line][0], room = strips[line][1] - a;
      var slot = (H - top - bottom) / Math.max(items.length, 1);
      items.forEach(function (p, i) {
        var svg = svgs[picked.indexOf(p)];
        // rotation (±15°) grows the box by ~12% per side; keep that inside the margin too
        var size = Math.min(p.size, Math.floor(room / 1.25));
        if (size < MIN_SIZE) { svg.style.display = 'none'; return; }
        var pad = Math.ceil(size * 0.125);
        var x = a + pad + p.xj * Math.max(0, room - size - 2 * pad);
        var y = top + slot * i + p.jitter * Math.max(0, slot - size);
        svg.style.display = 'block';
        svg.style.width = svg.style.height = size + 'px';
        svg.style.left = Math.round(x) + 'px';
        svg.style.top = Math.round(Math.min(y, H - bottom - size)) + 'px';
        svg.style.transform = 'rotate(' + p.rot + 'deg)';
      });
    });
  }

  function start() {
    build();
    fillSlots();
    layout();
    var t, schedule = function () { clearTimeout(t); t = setTimeout(function () { fillSlots(); layout(); }, 120); };
    window.addEventListener('resize', schedule);
    // SPA route changes (Next.js / React Router) add slots and swap the anchor element.
    if ('MutationObserver' in window) new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    // SPA pages (TicTacToe) change height between routes.
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
