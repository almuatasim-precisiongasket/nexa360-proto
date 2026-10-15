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

export function BackgroundBeams() {
  const root = useRef<SVGSVGElement>(null);
  useVisibleAnimation(root);
  const paths = [
    "M-160 20C240 20 160 300 650 250S1050 40 1600 40",
    "M-160 60C260 60 180 340 670 290S1070 80 1600 80",
    "M-160 100C280 100 200 380 690 330S1090 120 1600 120",
    "M-160 140C300 140 220 420 710 370S1110 160 1600 160",
  ];
  return (
    <svg
      ref={root}
      className="aceternity-beams"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((path, index) => (
        <g key={path}>
          <path d={path} className="beam-track" />
          <path
            d={path}
            className="beam-light"
            style={{ animationDelay: `${index * -4}s` }}
          />
        </g>
      ))}
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
