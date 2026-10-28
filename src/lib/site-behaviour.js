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
    dirty = false;
  }
  window.addEventListener('scroll', function () { dirty = true; }, { passive: true });
  window.addEventListener('resize', function () { dirty = true; });
  (function loop() { if (dirty) update(); requestAnimationFrame(loop); })();
  setTimeout(function () { document.querySelectorAll('.phero .ln').forEach(function (l) { l.classList.add('on'); }); }, 350);
  wireContactForm();
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
