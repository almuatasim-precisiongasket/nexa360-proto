"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { createLearningStudio } from "@/lib/learning-studio";

export type StudioBridge = {
  progress: number;
  solved: boolean;
  redraw: () => void;
};

export default function StudioRenderer({
  bridge,
  onReady,
  onFailure,
  registerRedraw,
}: {
  bridge: RefObject<StudioBridge>;
  onReady: () => void;
  onFailure: () => void;
  registerRedraw: (callback: () => void) => () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer | undefined;
    let model: ReturnType<typeof createLearningStudio> | undefined;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      model = createLearningStudio();
    } catch {
      model?.dispose();
      renderer?.dispose();
      onFailure();
      return;
    }
    const gpu = renderer;
    const canvas = gpu.domElement;
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0,
      visible = false,
      failed = false,
      previous = 0,
      painted = false;
    let progress = bridge.current.progress,
      px = 0,
      py = 0,
      sx = 0,
      sy = 0;
    let mobile = false;
    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || failed) return;
      const dt = Math.min(0.05, (now - previous) / 1000 || 0.016);
      previous = now;
      const blend = reduced.matches ? 1 : 1 - Math.exp(-6 * dt);
      progress += (bridge.current.progress - progress) * blend;
      sx += (px - sx) * blend;
      sy += (py - sy) * blend;
      try {
        model!.update(progress, camera, bridge.current.solved, sx, sy, mobile);
        gpu.render(model!.scene, camera);
        if (!painted) {
          painted = true;
          onReady();
        }
      } catch {
        failed = true;
        onFailure();
        return;
      }
      const moving =
        Math.abs(progress - bridge.current.progress) > 0.0005 ||
        Math.abs(sx - px) + Math.abs(sy - py) > 0.0005;
      if (moving && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden && !failed) {
        previous = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const unregisterRedraw = registerRedraw(schedule);
    const resize = () => {
      const box = host.getBoundingClientRect();
      mobile = box.width < 600;
      gpu.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1 : 1.5));
      gpu.setSize(Math.max(1, box.width), Math.max(1, box.height));
      camera.aspect = Math.max(1, box.width) / Math.max(1, box.height);
      camera.fov = mobile ? 47 : 40;
      camera.updateProjectionMatrix();
      schedule();
    };
    const pointerHost = host.parentElement!;
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || event.pointerType !== "mouse")
        return;
      const box = pointerHost.getBoundingClientRect();
      px = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
      );
      py = Math.max(
        -1,
        Math.min(1, 1 - ((event.clientY - box.top) / box.height) * 2),
      );
      schedule();
    };
    const reset = () => {
      px = py = 0;
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    };
    const loss = (event: Event) => {
      event.preventDefault();
      failed = true;
      cancelAnimationFrame(frame);
      frame = 0;
      onFailure();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(host);
    const sizing = new ResizeObserver(resize);
    sizing.observe(host);
    resize();
    pointerHost.addEventListener("pointermove", pointer, { passive: true });
    pointerHost.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", reset);
    canvas.addEventListener("webglcontextlost", loss);
    return () => {
      unregisterRedraw();
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizing.disconnect();
      pointerHost.removeEventListener("pointermove", pointer);
      pointerHost.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", reset);
      canvas.removeEventListener("webglcontextlost", loss);
      model?.dispose();
      gpu.dispose();
      gpu.forceContextLoss();
      canvas.remove();
    };
  }, [bridge, onReady, onFailure, registerRedraw]);
  return <div ref={root} style={{ position: "absolute", inset: 0 }} />;
}
