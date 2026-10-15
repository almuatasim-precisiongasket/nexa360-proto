"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SectionHandoff({
  previous,
  light = false,
}: {
  previous: string;
  light?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current?.closest("section");
        if (!section) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "top 20%",
              scrub: 1.4,
            },
          })
          .fromTo(
            ".handoff-trace",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: "none" },
            0,
          )
          .fromTo(
            ".handoff-glow",
            { opacity: 0, y: 28 },
            { opacity: 0.7, y: 0, ease: "power2.out" },
            0,
          );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div
      ref={root}
      className={`section-handoff ${light ? "handoff-on-light" : ""}`}
      style={{ "--previous-surface": previous } as CSSProperties}
      aria-hidden="true"
    >
      <div className="handoff-glow" />
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
        <path className="handoff-paper" d="M0 0H1440V12C1000 48 580 6 0 32Z" />
        <path
          className="handoff-trace"
          d="M0 32C580 6 1000 48 1440 12"
          pathLength="1"
        />
      </svg>
    </div>
  );
}
