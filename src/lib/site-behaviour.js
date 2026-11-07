/* eslint-disable */
import { wireContactForm } from "@/lib/contact-form";
// Behaviour shared by the inner pages: header state, reveals, the dynamic document layer
// (word fill, counters, case rows, step line, cursor ring, magnetic buttons) and the hero drift.
export function run() {
  var nav = document.getElementById('nav');
  var rvs = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  var hero = document.querySelector('.phero'), heroImg = document.querySelector('.phero img'), heroText = document.querySelector('.phero .ptext');
  var heroInk = hero ? hero.getAttribute('data-ink') : 'paper';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dirty = true;
  function update() {
    var vh = window.innerHeight;
    rvs.forEach(function (el) { var er = el.getBoundingClientRect(); if (er.top < vh * 0.88) el.classList.add('on'); });
    var paper = document.querySelector('.paper'); var onPaper = false;
    if (paper) { var pr = paper.getBoundingClientRect(); onPaper = pr.top < 60 && pr.bottom > 60; }
    var inHero = hero ? hero.getBoundingClientRect().bottom > 60 : false;
    var light = onPaper || (inHero && heroInk === 'ink') || (!inHero && false);
    nav.classList.toggle('scrolled', window.scrollY > 40);
    nav.classList.toggle('on-light', light);
    nav.classList.toggle('on-dark', !light);
    if (hero && heroImg && !reduced) {
      var hr = hero.getBoundingClientRect(); var k = Math.min(1, Math.max(0, -hr.top / Math.max(1, hr.height)));
      heroImg.style.transform = 'translate3d(0,' + (k * 80).toFixed(1) + 'px,0) scale(' + (1.06 + k * 0.05).toFixed(3) + ')';
      if (heroText) { heroText.style.opacity = String(Math.max(0, 1 - Math.max(0, k - 0.1) / 0.5)); heroText.style.transform = 'translate3d(0,' + (k * 30).toFixed(1) + 'px,0)'; }
    }
    // live hero: each stop's lines come on as that screen reaches the viewport, and fade as it leaves
    if (hero && hero.classList.contains('live')) {
      var stops = hero.querySelectorAll('.pstop'); var vh = window.innerHeight;
      stops.forEach(function (st) {
        var r = st.getBoundingClientRect(); var vis = r.top < vh * 0.55;
        st.querySelectorAll('.ln').forEach(function (l) { l.classList.toggle('on', vis); });
        var out = Math.min(1, Math.max(0, -r.top / (vh * 0.5)));
        st.style.opacity = String(1 - out);
      });
      hero.classList.toggle('gone', window.scrollY > vh * 0.3);
      // frame one holds the first screen, then crossfades to the horizon plane, which stays under the document
      var im1 = hero.querySelector('.pimg img'), im2 = hero.querySelector('.pplane img');
      if (im1 && im2) {
        var tr = Math.max(1, hero.getBoundingClientRect().height - vh); var pg = Math.min(1, Math.max(0, window.scrollY / tr));
        var x = Math.min(1, Math.max(0, (pg - 0.25) / 0.4));
        im1.style.opacity = String(1 - x);
        im1.style.transform = 'scale(' + (1 + pg * 0.12).toFixed(3) + ')';
        im2.style.opacity = String(x);
        im2.style.transform = 'scale(' + (1.12 - x * 0.12).toFixed(3) + ') translate3d(0,' + ((1 - x) * 30).toFixed(1) + 'px,0)';
      }
      // past the third screen the hero's last frame gives way to the document's own plate, which drifts with the scroll
      var plate = hero.querySelector('.pplate'), pimg = plate && plate.querySelector('img'), film = hero.querySelector('.pfilm');
      if (plate && pimg && film) {
        var hb = hero.getBoundingClientRect().bottom;                      // where the document begins
        var y = Math.min(1, Math.max(0, (vh * 0.9 - hb) / (vh * 0.7)));     // 0 on the third screen, 1 once the document owns the viewport
        plate.style.opacity = String(y);
        film.style.opacity = String(1 - y * 0.85);
        var drift = (window.scrollY - (hero.getBoundingClientRect().height - vh)) * 0.06;
        pimg.style.transform = 'translate3d(0,' + (-Math.max(0, drift) * 0.5).toFixed(1) + 'px,0) scale(' + (1 + Math.min(0.08, Math.max(0, drift) / 6000)).toFixed(3) + ')';
      }
    }
    dirty = false;
  }
  window.addEventListener('scroll', function () { dirty = true; }, { passive: true });
  window.addEventListener('resize', function () { dirty = true; });
  (function loop() { if (dirty) update(); requestAnimationFrame(loop); })();
  setTimeout(function () { document.querySelectorAll('.phero:not(.live) .ln, .wh1 .ln').forEach(function (l) { l.classList.add('on'); }); }, 350);
  wireContactForm();
  // ---------- live hero film: the whole clip as a Blob, scrubbed by the three-screen progress ----------
  (function () {
    var lh = document.querySelector('.phero.live'), pv = document.getElementById('pvid');
    if (!lh || !pv || reduced) return;
    var portrait = window.matchMedia('(orientation: portrait)').matches && window.matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    // large, sharp screens get the 2K encode when one exists; the HEAD check below falls back to 1080p
    var big = !portrait && (window.innerWidth * (window.devicePixelRatio || 1)) >= 2200 && pv.getAttribute('data-hd');
    var src = portrait ? pv.getAttribute('data-mobile') : (big || pv.getAttribute('data-desktop'));
    var fallback = pv.getAttribute('data-desktop');
    var ready = false, duration = 15, seeking = false, pending = null, lastT = -1, smooth = 0, last = performance.now();
    function seekTo(t) { if (!ready) return; if (Math.abs(t - lastT) < 1 / 48) return; if (seeking) { pending = t; return; } seeking = true; lastT = t; try { pv.currentTime = t; } catch (e) { seeking = false; } }
    function arm(url) {
      pv.src = url;
      pv.addEventListener('loadedmetadata', function () { duration = pv.duration || 15; }, { once: true });
      pv.addEventListener('canplaythrough', function onCan() { pv.removeEventListener('canplaythrough', onCan); ready = true; lh.classList.add('filmed'); }, { once: false });
      pv.addEventListener('seeked', function () { seeking = false; if (pending !== null) { var t = pending; pending = null; seekTo(t); } });
      pv.load();
    }
    function load(u) { return fetch(u, { method: 'HEAD' }).then(function (r) { if (!r.ok) throw 0; return fetch(u); }).then(function (r) { return r.blob(); }).then(function (b) { arm(URL.createObjectURL(b)); }); }
    load(src).catch(function () { if (src !== fallback) return load(fallback).catch(function () {}); /* no film yet: the stills carry the page */ });
    function prime() { try { pv.play().then(function () { pv.pause(); }).catch(function () {}); } catch (e) {} window.removeEventListener('touchstart', prime); window.removeEventListener('pointerdown', prime); }
    window.addEventListener('touchstart', prime, { passive: true }); window.addEventListener('pointerdown', prime, { passive: true });
    // idle loops: when the scroll rests at the opening or the arrival, a short ambient loop takes over from the still frame
    var loopEls = [document.getElementById('loopStart'), document.getElementById('loopEnd')];
    var loops = [], lastScroll = performance.now(), active = null;
    loopEls.forEach(function (el, i) {
      if (!el) return; var u = portrait ? el.getAttribute('data-mobile') : el.getAttribute('data-desktop');
      fetch(u, { method: 'HEAD' }).then(function (r) { if (r.ok) { el.src = u; el.load(); loops.push({ el: el, at: i, span: 0.06 }); } }).catch(function () {});
    });
    var plateLoop = document.getElementById('loopPlate');
    if (plateLoop) { var pu = portrait ? plateLoop.getAttribute('data-mobile') : plateLoop.getAttribute('data-desktop'); fetch(pu, { method: 'HEAD' }).then(function (r) { if (r.ok) { plateLoop.src = pu; plateLoop.load(); plateLoop.addEventListener('canplay', function () { plateLoop.play().then(function () { plateLoop.classList.add('show'); }).catch(function () {}); }, { once: true }); } }).catch(function () {}); }
    function setLoop(L) {
      if (L === active) return;
      if (active) { active.el.classList.remove('show'); var old = active; setTimeout(function () { if (active !== old) old.el.pause(); }, 1000); }
      active = L; if (L) { try { L.el.currentTime = 0; } catch (e) {} L.el.play().then(function () { L.el.classList.add('show'); }).catch(function () {}); }
    }
    window.addEventListener('scroll', function () { lastScroll = performance.now(); }, { passive: true });
    (function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var vh = window.innerHeight, tr = Math.max(1, lh.getBoundingClientRect().height - vh);
      var progress = Math.min(1, Math.max(0, window.scrollY / tr));
      smooth += (progress - smooth) * (1 - Math.pow(0.02, dt));
      if (ready && !document.hidden) seekTo(smooth * Math.max(0, duration - 0.05));
      var resting = now - lastScroll > 350 && Math.abs(progress - smooth) < 0.004, want = null;
      if (resting) for (var i = 0; i < loops.length; i++) if (Math.abs(smooth - loops[i].at) < loops[i].span) want = loops[i];
      setLoop(want);
      requestAnimationFrame(frame);
    })(performance.now());
  })();
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
    var hasPeek = !!(peek && pimg && pcap);
    var px = 0, py = 0, tx = 0, ty = 0, pshow = false;
    if (hasPeek) document.querySelectorAll('.sit li').forEach(function (li) {
      li.addEventListener('mouseenter', function () { pimg.src = li.getAttribute('data-src'); pimg.style.objectPosition = li.getAttribute('data-pos'); pcap.textContent = li.getAttribute('data-cap'); pshow = true; peek.classList.add('show'); });
      li.addEventListener('mouseleave', function () { pshow = false; peek.classList.remove('show'); });
    });
    // 4. cursor ring + magnetic buttons
    var cur = document.getElementById('cur'); if (!cur) return; var cx = -100, cy = -100, mx = -100, my = -100;
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
      px += (tx - px) * 0.12; py += (ty - py) * 0.12; if (hasPeek && (pshow || peek.classList.contains('show'))) peek.style.transform = 'translate(' + px + 'px,' + py + 'px) translate(-50%,-50%)' + (pshow ? ' scale(1)' : ' scale(.94)');
      requestAnimationFrame(follow);
    })();
  })();

}
