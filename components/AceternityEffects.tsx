"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Aceternity UI effect adaptations. CSS animation sleeps offscreen/hidden.
export function useVisibleAnimation(ref: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      element.dataset.active = String(
        visible && !document.hidden && !media.matches,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [ref]);
}

export function MovingBorder() {
  const root = useRef<SVGSVGElement>(null);
  useVisibleAnimation(root);
  return (
    <svg
      ref={root}
      className="aceternity-moving-border"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="1"
        pathLength="1"
        className="moving-border-track"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="1"
        pathLength="1"
        className="moving-border-light"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function TracingBeam() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current?.closest("section");
        if (!section) return;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 1.4,
          },
        });
        timeline.fromTo(
          ".tracing-beam-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none" },
          0,
        );
        timeline.fromTo(
          ".tracing-beam-dot",
          { top: "0%" },
          { top: "100%", ease: "none" },
          0,
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className="aceternity-tracing-beam" aria-hidden="true">
      <span className="tracing-beam-fill" />
      <i className="tracing-beam-dot" />
    </div>
  );
}
