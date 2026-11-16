/* eslint-disable */
// A forward-only ambient loop with a hidden seam: two <video> elements carry the same clip,
// and the second one fades in over the last `fade` seconds of the first, then they swap.
// Returns { el, play, pause, show, hide } where `el` is the original element (kept for layout/classes).
export function makeXLoop(el, opts) {
  var fade = (opts && opts.fade) || 0.9;
  // wrapper takes the element's classes (so existing show/hide CSS keeps working); the two videos inside only handle the seam
  var wrap = document.createElement('div'); wrap.className = el.className + ' xwrap';
  el.parentNode.insertBefore(wrap, el); wrap.appendChild(el);
  var twin = el.cloneNode(false); twin.removeAttribute('id'); wrap.appendChild(twin);
  var vids = [el, twin], cur = 0, running = false, raf = 0, shown = true;
  vids.forEach(function (v) { v.className = 'xv'; v.loop = false; v.muted = true; v.playsInline = true; v.style.opacity = '0'; });
  function setSrc(u) { vids.forEach(function (v) { if (v.src !== u) { v.src = u; v.load(); } }); }
  if (el.src) setSrc(el.src);
  function tick() {
    if (!running) return;
    var a = vids[cur], b = vids[1 - cur], d = a.duration || 0;
    if (d && a.currentTime > d - fade) {
      var k = Math.min(1, (a.currentTime - (d - fade)) / fade);
      if (b.paused || b.ended) { try { b.currentTime = 0; } catch (e) {} b.play().catch(function () {}); }
      b.style.opacity = String(k);
      if (k >= 1 || a.ended) { a.pause(); a.style.opacity = '0'; cur = 1 - cur; b.style.opacity = '1'; }
    }
    raf = requestAnimationFrame(tick);
  }
  function play() { if (running) return; running = true; var a = vids[cur]; try { a.currentTime = 0; } catch (e) {} vids[1 - cur].style.opacity = '0'; a.style.opacity = '1'; a.play().catch(function () {}); raf = requestAnimationFrame(tick); }
  function pause() { running = false; cancelAnimationFrame(raf); vids.forEach(function (v) { v.pause(); }); }
  // visibility is driven by the host (it crossfades the whole loop against the film/still); we only expose a flag
  function show() { wrap.classList.add('show'); }
  function hide() { wrap.classList.remove('show'); }
  return { el: el, twin: twin, wrap: wrap, play: play, pause: pause, show: show, hide: hide, setSrc: setSrc };
}
