"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The Operational AI world: a field of points, scattered when you arrive, that gathers into an
 * ordered lattice as you scroll. On desktop the cursor is a warm lamp that pulls nearby points
 * into order. Rendered on a fixed canvas behind the page so it continues faintly under the document.
 */
export default function Lattice() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" }); }
    catch { canvas.hidden = true; return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x16293b, 0.045);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    // The relief: a depth map of the valley sampled on a grid. Points reconstruct the view in 3D.
    type Relief = { w: number; h: number; depth: number[]; lum: number[]; river: number[] };
    let built = false; let points: THREE.Points | null = null; let geo: THREE.BufferGeometry | null = null;
    const build = (R: Relief) => {
      const stepU = mobile ? 2 : 1, stepV = mobile ? 2 : 1;
      const idx: number[] = [];
      for (let v = 0; v < R.h; v += stepV) for (let u = 0; u < R.w; u += stepU) idx.push(v * R.w + u);
      const N = idx.length;
      const pos = new Float32Array(N * 3), lat = new Float32Array(N * 3), seed = new Float32Array(N), tint = new Float32Array(N), lum = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const k = idx[i], u = (k % R.w) / (R.w - 1), v = Math.floor(k / R.w) / (R.h - 1);
        const d = R.depth[k];                               // 1 near, 0 far
        const dist = 7 + (1 - d) * 46;                      // distance from the original camera
        lat[i * 3] = (u - 0.5) * dist * 1.5;               // unproject with the still's field of view
        lat[i * 3 + 1] = (0.5 - v) * dist * 0.84 - 2.0;
        lat[i * 3 + 2] = -dist + 14;
        const g = () => (Math.random() + Math.random() + Math.random()) / 1.5 - 1;   // soft bell, -1..1
        pos[i * 3] = g() * 16 + 3; pos[i * 3 + 1] = -4 + Math.abs(g()) * 7; pos[i * 3 + 2] = g() * 9 - 4;
        seed[i] = Math.random();
        tint[i] = R.river[k] ? 2 : (Math.random() < 0.01 ? 1 : 0);
        lum[i] = R.lum[k];
      }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aLat", new THREE.BufferAttribute(lat, 3));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      geo.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));
      geo.setAttribute("aLum", new THREE.BufferAttribute(lum, 1));
      points = new THREE.Points(geo, mat); scene.add(points); built = true;
    };
    fetch("/film/valley-relief.json").then((r) => r.json()).then(build).catch(() => { canvas.hidden = true; });
    const uniforms = {
      uTime: { value: 0 }, uOrder: { value: 0 }, uMouse: { value: new THREE.Vector3() }, uLamp: { value: 0 },
      uPix: { value: renderer.getPixelRatio() },
      uFg: { value: new THREE.Color(0xf4f0e8) }, uDim: { value: new THREE.Color(0x4a5f7e) },
      uRed: { value: new THREE.Color(0xd9654c) }, uBlue: { value: new THREE.Color(0x7fa0d8) }, uWarm: { value: new THREE.Color(0xffe2c0) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aLat; attribute float aSeed; attribute float aTint; attribute float aLum;
        uniform float uTime, uOrder, uLamp, uPix; uniform vec3 uMouse;
        varying float vLit, vOrd, vTint, vFade, vLum;
        void main(){
          vLum = aLum;
          float o = smoothstep(aSeed * 0.5, aSeed * 0.5 + 0.5, uOrder);
          vec3 p = mix(position, aLat, o);
          float wob = (1.0 - o) * 0.9 + 0.04;
          p += vec3(sin(uTime * 0.6 + aSeed * 31.0), cos(uTime * 0.5 + aSeed * 17.0), sin(uTime * 0.4 + aSeed * 7.0)) * wob;
          float d = distance(p.xy, uMouse.xy);
          float lamp = uLamp * exp(-d * d * 0.05);
          p = mix(p, aLat, lamp * 0.85 * (1.0 - o));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float depth = -mv.z;
          vFade = (0.35 + 0.65 * smoothstep(70.0, 16.0, depth)) * smoothstep(1.0, 4.0, depth);
          vLit = lamp; vOrd = o; vTint = aTint;
          gl_PointSize = min(30.0 * uPix, (1.6 + 2.2 * o + 3.0 * lamp + 0.8 * aSeed) * uPix * (22.0 / max(depth, 2.0)) + uPix * (0.6 + 1.2 * o));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uFg, uDim, uRed, uBlue, uWarm;
        varying float vLit, vOrd, vTint, vFade, vLum;
        void main(){
          vec2 c = gl_PointCoord - 0.5; float r = dot(c, c); if (r > 0.25) discard;
          float soft = 1.0 - smoothstep(0.04, 0.25, r);
          float lm = pow(vLum, 1.6);
          vec3 col = mix(uDim, uFg, (0.25 + 0.7 * vOrd) * (0.3 + 1.1 * lm));
          if (vTint > 1.5) col = mix(col, uBlue, 0.55 + 0.45 * vOrd); else if (vTint > 0.5) col = mix(col, uRed, 0.7 + 0.3 * vOrd);
          col = mix(col, uWarm, vLit * 0.8);
          float a = (0.07 * (1.0 - vOrd) + vOrd * (0.22 + 1.1 * lm) + 0.9 * vLit) * soft * vFade;
          gl_FragColor = vec4(col, a);
        }`,
    });

    const mouse = { nx: 0, ny: 0, on: false }, mouseS = { nx: 0, ny: 0 };
    const onMove = (e: PointerEvent) => { mouse.nx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ny = -((e.clientY / window.innerHeight) * 2 - 1); mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    if (!mobile) { window.addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("mouseleave", onLeave); }

    const ray = new THREE.Raycaster(); const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 6), hit = new THREE.Vector3();
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < 720 ? 62 : 50; camera.updateProjectionMatrix();
      uniforms.uPix.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", resize); resize();

    const clock = new THREE.Clock(); let smooth = 0, lampS = 0, raf = 0, alive = true; void built;
    const frame = () => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, clock.getDelta());
      const vh = window.innerHeight; const hero = document.querySelector(".phero.live");
      const travel = hero ? Math.max(1, hero.getBoundingClientRect().height - vh) : vh * 2;
      const progress = Math.min(1, Math.max(0, window.scrollY / travel));
      const ease = 1 - Math.pow(0.004, dt);
      smooth += (progress - smooth) * ease;
      mouseS.nx += (mouse.nx - mouseS.nx) * ease * 0.6; mouseS.ny += (mouse.ny - mouseS.ny) * ease * 0.6;
      lampS += ((mouse.on ? 1 : 0) - lampS) * ease * 0.5;
      // order: nothing for the first screen, assembling through the second, complete on the third
      const ord = Math.min(1, Math.max(0, (smooth - 0.12) / 0.6));
      uniforms.uOrder.value = ord;
      uniforms.uTime.value += reduced ? 0 : dt;
      uniforms.uLamp.value = lampS;
      ray.setFromCamera(new THREE.Vector2(mouseS.nx, mouseS.ny), camera);
      if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit);
      // camera: high and looking down over the noise, settling to the still's own viewpoint as the valley forms
      const t = ord;
      camera.position.x = mouseS.nx * 1.2;
      camera.position.y = 14 - t * 13.5 + mouseS.ny * 0.6;
      camera.position.z = 22 - t * 6;
      camera.lookAt(0, -2 + t * 1.5, -14);
      if (points) { points.rotation.y = Math.sin(uniforms.uTime.value * 0.05) * 0.05 * (1 - t); }
      if (!document.hidden) renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false; cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); document.removeEventListener("mouseleave", onLeave);
      if (geo) geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className="lattice" aria-hidden="true" />;
}
