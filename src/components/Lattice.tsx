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
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" }); }
    catch { canvas.hidden = true; return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setClearColor(0x16293b, 1);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x16293b, 0.045);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    const N = mobile ? 8000 : 24000;
    const pos = new Float32Array(N * 3), lat = new Float32Array(N * 3), seed = new Float32Array(N), tint = new Float32Array(N);
    const G = Math.ceil(Math.cbrt(N)), step = 1.35;
    let i = 0;
    for (let gx = 0; gx < G && i < N; gx++) for (let gy = 0; gy < G && i < N; gy++) for (let gz = 0; gz < G && i < N; gz++) {
      lat[i * 3] = (gx - (G - 1) / 2) * step; lat[i * 3 + 1] = (gy - (G - 1) / 2) * step; lat[i * 3 + 2] = (gz - (G - 1) / 2) * step - 6;
      const r = 14 + Math.random() * 10, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.2; pos[i * 3 + 1] = r * Math.cos(ph) * 0.7; pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) * 0.8 - 8;
      seed[i] = Math.random();
      const t = Math.random(); tint[i] = t < 0.012 ? 1 : (t < 0.024 ? 2 : 0);
      i++;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aLat", new THREE.BufferAttribute(lat, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geo.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));
    const uniforms = {
      uTime: { value: 0 }, uOrder: { value: 0 }, uMouse: { value: new THREE.Vector3() }, uLamp: { value: 0 },
      uPix: { value: renderer.getPixelRatio() },
      uFg: { value: new THREE.Color(0xf4f0e8) }, uDim: { value: new THREE.Color(0x4a5f7e) },
      uRed: { value: new THREE.Color(0xd9654c) }, uBlue: { value: new THREE.Color(0x7fa0d8) }, uWarm: { value: new THREE.Color(0xffe2c0) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aLat; attribute float aSeed; attribute float aTint;
        uniform float uTime, uOrder, uLamp, uPix; uniform vec3 uMouse;
        varying float vLit, vOrd, vTint, vFade;
        void main(){
          float o = smoothstep(aSeed * 0.5, aSeed * 0.5 + 0.5, uOrder);
          vec3 p = mix(position, aLat, o);
          float wob = (1.0 - o) * 0.6 + 0.05;
          p += vec3(sin(uTime * 0.6 + aSeed * 31.0), cos(uTime * 0.5 + aSeed * 17.0), sin(uTime * 0.4 + aSeed * 7.0)) * wob;
          float d = distance(p.xy, uMouse.xy);
          float lamp = uLamp * exp(-d * d * 0.09);
          p = mix(p, aLat, lamp * 0.85 * (1.0 - o));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float depth = -mv.z;
          vFade = smoothstep(42.0, 10.0, depth) * smoothstep(1.5, 5.0, depth);
          vLit = lamp; vOrd = o; vTint = aTint;
          gl_PointSize = min(26.0 * uPix, (1.3 + 1.6 * o + 2.4 * lamp + 0.6 * aSeed) * uPix * (18.0 / max(depth, 2.0)));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uFg, uDim, uRed, uBlue, uWarm;
        varying float vLit, vOrd, vTint, vFade;
        void main(){
          vec2 c = gl_PointCoord - 0.5; float r = dot(c, c); if (r > 0.25) discard;
          float soft = 1.0 - smoothstep(0.04, 0.25, r);
          vec3 col = mix(uDim, uFg, 0.25 + 0.55 * vOrd);
          if (vTint > 1.5) col = mix(col, uBlue, 0.7 + 0.3 * vOrd); else if (vTint > 0.5) col = mix(col, uRed, 0.7 + 0.3 * vOrd);
          col = mix(col, uWarm, vLit * 0.8);
          float a = (0.16 + 0.34 * vOrd + 0.9 * vLit) * soft * vFade;
          gl_FragColor = vec4(col, a);
        }`,
    });
    const points = new THREE.Points(geo, mat); scene.add(points);
    const grid = new THREE.GridHelper(120, 60, 0x24364d, 0x24364d);
    grid.position.y = -9; grid.position.z = -10; (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.3; scene.add(grid);

    const mouse = { nx: 0, ny: 0, on: false }, mouseS = { nx: 0, ny: 0 };
    const onMove = (e: PointerEvent) => { mouse.nx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ny = -((e.clientY / window.innerHeight) * 2 - 1); mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    if (!mobile) { window.addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("mouseleave", onLeave); }

    const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 6), hit = new THREE.Vector3();
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < 720 ? 62 : 50; camera.updateProjectionMatrix();
      uniforms.uPix.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", resize); resize();

    const clock = new THREE.Clock(); let smooth = 0, lampS = 0, raf = 0, alive = true;
    const frame = () => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, clock.getDelta());
      const vh = window.innerHeight; const progress = Math.min(1, Math.max(0, window.scrollY / (vh * 2.2)));
      const ease = 1 - Math.pow(0.004, dt);
      smooth += (progress - smooth) * ease;
      mouseS.nx += (mouse.nx - mouseS.nx) * ease * 0.6; mouseS.ny += (mouse.ny - mouseS.ny) * ease * 0.6;
      lampS += ((mouse.on ? 1 : 0) - lampS) * ease * 0.5;
      uniforms.uOrder.value = Math.min(1, smooth * 1.25);
      uniforms.uTime.value += reduced ? 0 : dt;
      uniforms.uLamp.value = lampS;
      ray.setFromCamera(new THREE.Vector2(mouseS.nx, mouseS.ny), camera);
      if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit);
      camera.position.x = mouseS.nx * 0.9; camera.position.y = mouseS.ny * 0.5; camera.position.z = 16 - smooth * 7;
      camera.lookAt(0, 0, -6);
      points.rotation.y = Math.sin(uniforms.uTime.value * 0.05) * 0.08 + smooth * 0.35;
      points.rotation.x = smooth * 0.12;
      // only draw while something of the page that shows it is on screen (the fixed canvas is always "visible")
      if (!document.hidden) renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false; cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); document.removeEventListener("mouseleave", onLeave);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className="lattice" aria-hidden="true" />;
}
