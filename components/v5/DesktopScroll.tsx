"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { attachScrollDriver, cancelPageScroll } from "@/lib/scroll-controller";

gsap.registerPlugin(ScrollTrigger);

export function DesktopScroll() {
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: (() => void) | undefined;
    const configure = () => {
      dispose?.();
      dispose = undefined;
      if (!media.matches) return;
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        allowNestedScroll: true,
        prevent: (node) =>
          node.matches(
            "input, textarea, select, [contenteditable='true'], [data-lenis-prevent], .brand-intro",
          ),
      });
      const detach = attachScrollDriver((top, options) => {
        let pending = true;
        lenis.scrollTo(top, {
          ...options,
          easing: (t) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          onComplete: () => {
            if (pending) {
              pending = false;
              options.onComplete();
            }
          },
        });
        return () => {
          if (!pending) return;
          pending = false;
          lenis.stop();
          lenis.start();
        };
      });
      const unscroll = lenis.on("scroll", () => ScrollTrigger.update());
      const interrupt = lenis.on("virtual-scroll", () => cancelPageScroll());
      const tick = (time: number) => lenis.raf(time * 1000);
      const resize = () => lenis.resize();
      const key = () => cancelPageScroll();
      const visibility = () => {
        if (document.hidden) {
          cancelPageScroll();
          lenis.stop();
          lenis.start();
        }
      };
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(tick);
      ScrollTrigger.addEventListener("refresh", resize);
      window.addEventListener("keydown", key);
      document.addEventListener("visibilitychange", visibility);
      dispose = () => {
        detach();
        unscroll();
        interrupt();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        ScrollTrigger.removeEventListener("refresh", resize);
        window.removeEventListener("keydown", key);
        document.removeEventListener("visibilitychange", visibility);
        lenis.destroy();
      };
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      media.removeEventListener("change", configure);
      dispose?.();
    };
  }, []);
  return null;
}
