"use client";

import { useId, useRef, type CSSProperties } from "react";
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
  const id = useId();
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
              end: "top 55%",
              scrub: 1.8,
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
        <defs>
          <linearGradient id={id} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop stopColor="var(--seam-ink)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--seam-ink)" stopOpacity=".6" />
            <stop offset="75%" stopColor="var(--seam-ink)" />
            <stop offset="100%" stopColor="var(--seam-ink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="handoff-paper" d="M0 0H1440V12C1000 48 580 6 0 32Z" />
        <path className="handoff-edge" d="M0 37C580 11 1000 53 1440 17" />
        <path
          className="handoff-trace"
          d="M0 32C580 6 1000 48 1440 12"
          pathLength="1"
          style={{ stroke: `url(#${id})` }}
        />
      </svg>
    </div>
  );
}
