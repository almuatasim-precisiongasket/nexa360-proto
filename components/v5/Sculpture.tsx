"use client";
import { useEffect, useId, useRef } from "react";
import type {
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import s from "./v5.module.css";

/** Original cobalt sculpture. The vector poster remains the first and fallback frame. */
export function Sculpture() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const id = useId();
  useEffect(() => {
    const host = root.current,
      surface = canvas.current;
    if (!host || !surface) return;
    let renderer: WebGLRenderer | undefined,
      scene: Scene,
      camera: PerspectiveCamera,
      mesh: Mesh<TorusKnotGeometry, MeshPhysicalMaterial>;
    let disposed = false,
      visible = false,
      initializing = false,
      lost = false,
      elapsed = 0,
      last = 0,
      painted = 0,
      px = 0,
      py = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (now: number) => {
      if (!renderer || lost) return;
      if (now - painted < 32 && !reduced.matches) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      painted = now;
      if (!reduced.matches) elapsed += dt;
      mesh.rotation.y = elapsed * 0.065 + 0.28 + px * 0.13;
      mesh.rotation.x = 0.22 + py * 0.1;
      mesh.rotation.z = -0.3 + Math.sin(elapsed * 0.12) * 0.04;
      renderer.render(scene, camera);
      host.dataset.ready = "true";
    };
    const sync = () => {
      if (!renderer || lost) return;
      renderer.setAnimationLoop(null);
      last = performance.now();
      if (visible && !document.hidden) {
        if (reduced.matches) draw(performance.now());
        else renderer.setAnimationLoop(draw);
      }
    };
    const resize = () => {
      if (!renderer) return;
      const b = host.getBoundingClientRect();
      camera.aspect = b.width / Math.max(1, b.height);
      camera.updateProjectionMatrix();
      renderer.setSize(b.width, b.height, false);
      draw(performance.now());
    };
    const initialize = async () => {
      if (initializing || disposed) return;
      initializing = true;
      try {
        const t = await import("three");
        if (disposed) return;
        renderer = new t.WebGLRenderer({
          canvas: surface,
          alpha: true,
          antialias: true,
          failIfMajorPerformanceCaveat: true,
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0, 0);
        renderer.outputColorSpace = t.SRGBColorSpace;
        renderer.toneMapping = t.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        scene = new t.Scene();
        camera = new t.PerspectiveCamera(36, 1, 0.1, 30);
        camera.position.set(0, 0, 7.2);
        mesh = new t.Mesh(
          new t.TorusKnotGeometry(1, 0.24, 180, 24, 2, 3),
          new t.MeshPhysicalMaterial({
            color: 0x1765e5,
            metalness: 0.56,
            roughness: 0.23,
            clearcoat: 1,
            clearcoatRoughness: 0.16,
          }),
        );
        scene.add(mesh, new t.HemisphereLight(0xc5e9ff, 0x0b1c57, 2.2));
        const key = new t.DirectionalLight(0xd8edff, 5);
        key.position.set(-3, 4, 5);
        scene.add(key);
        const rim = new t.DirectionalLight(0x287cff, 7);
        rim.position.set(4, -1, -2);
        scene.add(rim);
        const fill = new t.DirectionalLight(0xffffff, 1.8);
        fill.position.set(3, 0, 3);
        scene.add(fill);
        resize();
        sync();
      } catch {
        renderer?.dispose();
        renderer = undefined;
        host.dataset.ready = "false";
      }
    };
    const visibility = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) void initialize();
        sync();
      },
      { rootMargin: "80px" },
    );
    visibility.observe(host);
    const size = new ResizeObserver(resize);
    size.observe(host);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced.matches) return;
      const b = host.getBoundingClientRect();
      px = (e.clientX - b.left) / b.width - 0.5;
      py = (e.clientY - b.top) / b.height - 0.5;
    };
    const leave = () => {
      px = 0;
      py = 0;
    };
    const loss = (e: Event) => {
      e.preventDefault();
      lost = true;
      host.dataset.ready = "false";
      renderer?.setAnimationLoop(null);
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    surface.addEventListener("webglcontextlost", loss);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      disposed = true;
      visibility.disconnect();
      size.disconnect();
      renderer?.setAnimationLoop(null);
      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
      renderer?.dispose();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      surface.removeEventListener("webglcontextlost", loss);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className={s.sculpture} ref={root} aria-hidden="true">
      <div className={s.sculptureGrid} />
      <svg className={s.sculpturePoster} viewBox="0 0 500 500" fill="none">
        <defs>
          <linearGradient
            id={id}
            x1="80"
            y1="50"
            x2="400"
            y2="450"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b5deff" />
            <stop offset=".3" stopColor="#498ef2" />
            <stop offset=".65" stopColor="#164fb9" />
            <stop offset="1" stopColor="#09225b" />
          </linearGradient>
        </defs>
        <g
          transform="rotate(-20 250 250)"
          stroke={`url(#${id})`}
          strokeWidth="42"
        >
          <ellipse
            cx="250"
            cy="250"
            rx="165"
            ry="77"
            transform="rotate(55 250 250)"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="165"
            ry="77"
            transform="rotate(-55 250 250)"
          />
        </g>
      </svg>
      <canvas ref={canvas} />
      <span className={s.sculptureCaption}>
        CONNECTED CURIOSITY / CONTINUOUS POSSIBILITY
      </span>
      <span className={s.sculptureMark}>N° 360</span>
    </div>
  );
}
