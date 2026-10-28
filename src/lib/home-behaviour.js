/* eslint-disable */
import { wireContactForm } from "@/lib/contact-form";
// Behaviour for the home page, ported from the approved prototype. Plain JS on purpose:
// it is DOM-driven animation code; the React layer only mounts it once.
export function run() {
  wireContactForm();

(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 720px), (pointer: coarse)').matches;
  var portrait = window.matchMedia('(orientation: portrait)').matches && isMobile;
  var vid = document.getElementById('vid'), film = document.getElementById('film'), loader = document.getElementById('loader');
  var src = portrait ? '/film/home-mobile.mp4' : '/film/home-desktop.mp4';
  if (portrait) {
    film.style.backgroundImage = 'url(film/home-mobile-poster.jpg)'; vid.setAttribute('poster', '/film/home-mobile-poster.jpg');
    document.getElementById('loopOpen').src = '/film/loop-open-mobile.mp4'; document.getElementById('loopWater').src = '/film/loop-water-mobile.mp4';
  }
  // ---------- Film: whole clip as a Blob; scroll through the opener is the playhead ----------
  var ready = false, duration = 30, pendingSeek = null, seeking = false, lastT = -1;
  function arm(url) {
    vid.src = url;
    vid.addEventListener('loadedmetadata', function () { duration = vid.duration || 30; }, { once: true });
    vid.addEventListener('canplaythrough', function onCan() { vid.removeEventListener('canplaythrough', onCan); ready = true; film.classList.add('ready'); loader.classList.add('hide'); });
    vid.addEventListener('seeked', function () { seeking = false; if (pendingSeek !== null) { var t = pendingSeek; pendingSeek = null; seekTo(t); } });
    vid.load();
  }
  function seekTo(t) { if (!ready) return; if (Math.abs(t - lastT) < 1 / 48) return; if (seeking) { pendingSeek = t; return; } seeking = true; lastT = t; try { vid.currentTime = t; } catch (e) { seeking = false; } }
  if (!reduced) fetch(src).then(function (r) { return r.blob(); }).then(function (b) { arm(URL.createObjectURL(b)); }).catch(function () { arm(src); }); else loader.classList.add('hide');
  function prime() { try { vid.play().then(function () { vid.pause(); }).catch(function () {}); } catch (e) {} window.removeEventListener('touchstart', prime); window.removeEventListener('pointerdown', prime); }
  window.addEventListener('touchstart', prime, { passive: true }); window.addEventListener('pointerdown', prime, { passive: true });

  // idle loops at the opening and the arrival
  var loops = [ { el: document.getElementById('loopOpen'), at: 0, span: 0.06 }, { el: document.getElementById('loopWater'), at: 1, span: 0.08 } ], activeLoop = null;
  function setLoop(L) {
    if (L === activeLoop) return;
    if (activeLoop) { activeLoop.el.classList.remove('show'); var old = activeLoop; setTimeout(function () { if (activeLoop !== old) old.el.pause(); }, 900); }
    activeLoop = L; if (L) { try { L.el.currentTime = 0; } catch (e) {} L.el.play().then(function () { L.el.classList.add('show'); }).catch(function () {}); }
  }

  // ---------- Scroll ----------
  var opener = document.getElementById('top'), stops = Array.prototype.slice.call(document.querySelectorAll('.stop'));
  var lines = stops.map(function (s) { return Array.prototype.slice.call(s.querySelectorAll('.ln')); });
  var rvs = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  var nav = document.getElementById('nav');
  var progress = 0, smooth = 0, dirty = true, lastScroll = performance.now();
  function update() {
    var vh = window.innerHeight, r = opener.getBoundingClientRect();
    var travel = Math.max(1, r.height - film.offsetHeight);
    progress = Math.min(1, Math.max(0, -r.top / travel));
    stops.forEach(function (s, i) {
      var sr = s.getBoundingClientRect(), t = (vh * 0.9 - sr.top) / (vh * 0.55), ls = lines[i], n = ls.length;
      for (var j = 0; j < n; j++) ls[j].classList.toggle('on', t > (j + 0.5) / n);
    });
    rvs.forEach(function (el) { var er = el.getBoundingClientRect(); if (er.top < vh * 0.88) el.classList.add('on'); });
    // nav ink: light over the film's bright frames, light again on the paper section, dark otherwise
    var paper = document.getElementById('people').getBoundingClientRect();
    var onPaper = paper.top < 60 && paper.bottom > 60;
    var inFilm = r.bottom > 60;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    nav.classList.toggle('on-light', onPaper || (inFilm && filmBright));
    nav.classList.toggle('on-dark', !(onPaper || (inFilm && filmBright)));
    dirty = false;
  }
  window.addEventListener('scroll', function () { dirty = true; lastScroll = performance.now(); }, { passive: true });
  window.addEventListener('resize', function () { dirty = true; });

  // ---------- Adaptive ink over the film ----------
  var probe = document.createElement('canvas'); probe.width = 48; probe.height = 27; var pctx = probe.getContext('2d', { willReadFrequently: true });
  var filmBright = false, lastProbe = 0;
  function luma(x0, y0, x1, y1) { var d = pctx.getImageData(x0, y0, x1 - x0, y1 - y0).data, s = 0; for (var i = 0; i < d.length; i += 4) s += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; return s / (d.length / 4) / 255; }
  function probeFrame(now) {
    if (now - lastProbe < 160) return; lastProbe = now;
    var el = (activeLoop && activeLoop.el.readyState >= 2) ? activeLoop.el : ((ready && vid.readyState >= 2) ? vid : null); if (!el) return;
    var sw = el.videoWidth, sh = el.videoHeight; if (!sw || !sh) return;
    var vw = window.innerWidth, vh = window.innerHeight, scale = Math.max(vw / sw, vh / sh), cw = vw / scale, ch = vh / scale;
    try { pctx.drawImage(el, (sw - cw) / 2, (sh - ch) / 2, cw, ch, 0, 0, probe.width, probe.height); } catch (e) { return; }
    var top = luma(0, 0, probe.width, 4); filmBright = filmBright ? top > 0.5 : top > 0.6;
    stops.forEach(function (s, i) {
      var b = s.querySelector('.block') || s.querySelector('.open'); if (!b) return; var br = b.getBoundingClientRect(); if (br.bottom < 0 || br.top > vh) return;
      var x0 = Math.max(0, Math.floor(br.left / vw * probe.width)), x1 = Math.min(probe.width, Math.ceil(br.right / vw * probe.width)), y0 = Math.max(0, Math.floor(br.top / vh * probe.height)), y1 = Math.min(probe.height, Math.ceil(br.bottom / vh * probe.height));
      if (x1 <= x0 || y1 <= y0) return; var L = luma(x0, y0, x1, y1), on = s.classList.contains('on-light');
      if (!on && L > 0.6) s.classList.add('on-light'); else if (on && L < 0.5) s.classList.remove('on-light');
    });
  }

  var last = performance.now();
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (dirty) update();
    probeFrame(now);
    smooth += (progress - smooth) * (1 - Math.pow(0.02, dt));
    if (ready && !document.hidden) seekTo(smooth * Math.max(0, duration - 0.05));
    var resting = (now - lastScroll) > 500 && !reduced && ready, want = null;
    if (resting) for (var i = 0; i < loops.length; i++) if (Math.abs(smooth - loops[i].at) < loops[i].span) want = loops[i];
    setLoop(want);
    requestAnimationFrame(frame);
  }
  update(); smooth = progress; requestAnimationFrame(frame);

})();

  setTimeout(function () { document.querySelectorAll('.open .ln').forEach(function (l) { l.classList.add('on'); }); }, 400);
  // ---------- dynamic layer ----------
  (function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var vhh = function () { return window.innerHeight; };
    var fine = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 900 && !reduced;
    // 1. statement: word-by-word fill
    var st = document.querySelector('.statement');
    if (st && !reduced) {
      var wrap = function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(t)); else { var sp = document.createElement('span'); sp.className = 'wd'; sp.textContent = t; frag.appendChild(sp); } });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1) Array.prototype.slice.call(node.childNodes).forEach(wrap);
      };
      wrap(st);
    }
    var words = st ? Array.prototype.slice.call(st.querySelectorAll('.wd')) : [];
    // 2. figures count-up
    var figs = Array.prototype.slice.call(document.querySelectorAll('.fig'));
    figs.forEach(function (f) {
      var n = f.querySelector('.n'), m = /^([^0-9]*)([0-9][0-9.,]*)(.*)$/.exec(n.textContent.trim());
      if (!m) return; f._pre = m[1]; f._suf = m[3]; f._val = parseFloat(m[2].replace(/,/g, '')); f._dec = (m[2].split('.')[1] || '').length; f._n = n; f._done = false;
      if (!reduced) n.textContent = f._pre + (0).toFixed(f._dec) + f._suf;
    });
    function count(f) {
      f._done = true; var t0 = performance.now(), D = 1600;
      (function tick(now) { var k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3); f._n.textContent = f._pre + (f._val * e).toFixed(f._dec) + f._suf; if (k < 1) requestAnimationFrame(tick); })(t0);
    }
    var caseRows = Array.prototype.slice.call(document.querySelectorAll('.case .row'));
    var steps = document.querySelector('.steps'), stepLis = steps ? Array.prototype.slice.call(steps.querySelectorAll('li')) : [];
    function dyn() {
      var vh = vhh();
      if (words.length) {
        var r = st.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.25)));
        for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i / words.length < p);
      }
      figs.forEach(function (f) { var r = f.getBoundingClientRect(); if (r.top < vh * 0.85) { f.classList.add('on'); if (!f._done && f._n) { if (reduced) f._done = true; else count(f); } } });
      caseRows.forEach(function (row, i) { var r = row.getBoundingClientRect(); row.classList.toggle('on', r.top < vh * (0.78 - i * 0.04)); });
      if (steps) {
        var r = steps.getBoundingClientRect(), fill = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / r.height));
        steps.style.setProperty('--fill', fill.toFixed(3));
        stepLis.forEach(function (li) { li.classList.toggle('on', fill * r.height >= li.offsetTop + 24); });
      }
    }
    var dynDirty = true;
    window.addEventListener('scroll', function () { dynDirty = true; }, { passive: true });
    window.addEventListener('resize', function () { dynDirty = true; });
    (function loop() { if (dynDirty) { dyn(); dynDirty = false; } requestAnimationFrame(loop); })();
    if (!fine) return;
    // 3. situations: a preview that follows the cursor
    var peek = document.getElementById('peek'), pimg = document.getElementById('peekimg'), pcap = document.getElementById('peekcap');
    var px = 0, py = 0, tx = 0, ty = 0, pshow = false;
    document.querySelectorAll('.sit li').forEach(function (li) {
      li.addEventListener('mouseenter', function () { pimg.src = li.getAttribute('data-src'); pimg.style.objectPosition = li.getAttribute('data-pos'); pcap.textContent = li.getAttribute('data-cap'); pshow = true; peek.classList.add('show'); });
      li.addEventListener('mouseleave', function () { pshow = false; peek.classList.remove('show'); });
    });
    // 4. cursor ring + magnetic buttons
    var cur = document.getElementById('cur'), cx = -100, cy = -100, mx = -100, my = -100;
    var mags = Array.prototype.slice.call(document.querySelectorAll('.mag'));
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY; tx = mx + 190; ty = my - 10; cur.classList.add('show');
      var over = e.target.closest && e.target.closest('a, button, input, textarea, label');
      cur.classList.toggle('big', !!over);
      mags.forEach(function (m) {
        var r = m.getBoundingClientRect(), dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2), d = Math.hypot(dx, dy);
        if (d < 90) m.style.transform = 'translate(' + (dx * 0.22) + 'px,' + (dy * 0.22) + 'px)'; else m.style.transform = '';
      });
    });
    document.addEventListener('mouseleave', function () { cur.classList.remove('show'); });
    (function follow() {
      cx += (mx - cx) * 0.35; cy += (my - cy) * 0.35; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      px += (tx - px) * 0.12; py += (ty - py) * 0.12; if (pshow || peek.classList.contains('show')) peek.style.transform = 'translate(' + px + 'px,' + py + 'px) translate(-50%,-50%)' + (pshow ? ' scale(1)' : ' scale(.94)');
      requestAnimationFrame(follow);
    })();
  })();

  // ---------- contact: the valley at blue hour, the cursor is a light ----------
  (function () {
    var sec = document.getElementById('contact'), img = document.getElementById('riverImg'), lamp = document.getElementById('lamp'), river = document.getElementById('river');
    if (!sec || !img) return;
    var mobile = window.matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    var reducedM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.matchMedia('(max-width: 720px) and (orientation: portrait)').matches) img.src = '/film/dusk-mobile.jpg';
    if (!reducedM) (function tick() {
      var r = sec.getBoundingClientRect(), vh = window.innerHeight;
      if (r.top < vh && r.bottom > 0) { var k = (vh - r.top) / (vh + r.height); img.style.transform = 'translate(-50%, calc(-50% + ' + ((k - 0.5) * 70).toFixed(1) + 'px)) scale(' + (1.04 + k * 0.04).toFixed(3) + ')'; }
      requestAnimationFrame(tick);
    })();
    if (mobile || reducedM) return;
    sec.addEventListener('mousemove', function (e) { var r = river.getBoundingClientRect(); lamp.style.setProperty('--lx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%'); lamp.style.setProperty('--ly', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%'); lamp.classList.add('on'); });
    sec.addEventListener('mouseleave', function () { lamp.classList.remove('on'); });
  })();

  // ---------- situations: slow topographic contours, drawn on a canvas ----------
  (function () {
    var sec = document.getElementById('situations'), cv = document.getElementById('topoCanvas');
    if (!sec || !cv || window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)').matches) return;
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = 1, cell = 14, cols = 0, rows = 0, field;
    var mx = -1e4, my = -1e4, tmx = -1e4, tmy = -1e4, hot = -1, hotY = 0, hotK = 0, t0 = performance.now();
    var fine = window.matchMedia('(pointer: fine)').matches;
    // value-noise with a fixed lattice
    var P = []; for (var i = 0; i < 512; i++) P[i] = Math.random();
    function lat(x, y) { return P[((x * 73856093) ^ (y * 19349663)) & 511]; }
    function sm(t) { return t * t * (3 - 2 * t); }
    function noise(x, y) { var xi = Math.floor(x), yi = Math.floor(y), fx = sm(x - xi), fy = sm(y - yi);
      var a = lat(xi, yi), b = lat(xi + 1, yi), c = lat(xi, yi + 1), d = lat(xi + 1, yi + 1);
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; }
    function size() {
      var r = sec.getBoundingClientRect(); dpr = Math.min(1.5, window.devicePixelRatio || 1);
      W = Math.round(r.width); H = Math.round(r.height); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cell = W < 720 ? 12 : 14; cols = Math.ceil(W / cell) + 1; rows = Math.ceil(H / cell) + 1; field = new Float32Array(cols * rows);
    }
    size(); window.addEventListener('resize', size);
    document.querySelectorAll('.sit li').forEach(function (li, i) {
      li.addEventListener('mouseenter', function () { hot = i; }); li.addEventListener('mouseleave', function () { if (hot === i) hot = -1; });
    });
    sec.addEventListener('mousemove', function (e) { var r = sec.getBoundingClientRect(); tmx = e.clientX - r.left; tmy = e.clientY - r.top; });
    sec.addEventListener('mouseleave', function () { tmx = -1e4; tmy = -1e4; });
    var levels = 14, visible = false;
    function frame(now) {
      requestAnimationFrame(frame);
      var r = sec.getBoundingClientRect(); visible = r.bottom > 0 && r.top < window.innerHeight; if (!visible) return;
      var t = (now - t0) / 1000;
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      // the hovered row: a soft peak under it
      var want = 0, wy = hotY;
      if (hot >= 0) { var li = document.querySelectorAll('.sit li')[hot].getBoundingClientRect(); wy = li.top - r.top + li.height / 2; want = 1; }
      hotK += (want - hotK) * 0.05; if (want) hotY += (wy - hotY) * 0.1;
      // scalar field
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) {
        var x = i * cell, y = j * cell;
        var v = noise(x * 0.0022 + t * 0.012, y * 0.0022 - t * 0.008) * 0.65 + noise(x * 0.006 - t * 0.006, y * 0.006 + t * 0.01) * 0.35;
        if (fine) { var dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy; v += 0.09 * Math.exp(-d2 / (2 * 180 * 180)); }
        if (hotK > 0.01) { var ddy = (y - hotY) / 160, ddx = (x - W * 0.55) / (W * 0.45); v += 0.14 * hotK * Math.exp(-(ddy * ddy + ddx * ddx)); }
        field[j * cols + i] = v;
      }
      // marching squares, one stroke per level
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 0.75; ctx.strokeStyle = 'rgba(244,240,232,0.11)'; ctx.lineCap = 'round';
      ctx.beginPath();
      for (var L = 1; L < levels; L++) {
        var iso = L / levels;
        for (var jj = 0; jj < rows - 1; jj++) for (var ii = 0; ii < cols - 1; ii++) {
          var a = field[jj * cols + ii], b = field[jj * cols + ii + 1], c = field[(jj + 1) * cols + ii + 1], d = field[(jj + 1) * cols + ii];
          var idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          var x0 = ii * cell, y0 = jj * cell;
          var top = [x0 + cell * (iso - a) / (b - a), y0], right = [x0 + cell, y0 + cell * (iso - b) / (c - b)], bottom = [x0 + cell * (iso - d) / (c - d), y0 + cell], left = [x0, y0 + cell * (iso - a) / (d - a)];
          var segs;
          switch (idx) { case 1: case 14: segs = [[left, bottom]]; break; case 2: case 13: segs = [[bottom, right]]; break; case 3: case 12: segs = [[left, right]]; break; case 4: case 11: segs = [[top, right]]; break; case 5: segs = [[top, left], [bottom, right]]; break; case 6: case 9: segs = [[top, bottom]]; break; case 7: case 8: segs = [[top, left]]; break; case 10: segs = [[top, right], [left, bottom]]; break; }
          for (var k = 0; k < segs.length; k++) { ctx.moveTo(segs[k][0][0], segs[k][0][1]); ctx.lineTo(segs[k][1][0], segs[k][1][1]); }
        }
      }
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  })();

}
