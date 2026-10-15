"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
/** Adapted from React Bits' word reveal technique. Cleanup is scoped to this heading. */
export function TextReveal({
  lines,
  italicLast = false,
  effect = "slide",
}: {
  lines: string[];
  italicLast?: boolean;
  effect?: "slide" | "blur";
}) {
  const root = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".reveal-word",
          {
            yPercent: effect === "blur" ? 22 : 105,
            opacity: effect === "blur" ? 0 : 0.3,
            filter: effect === "blur" ? "blur(10px)" : "blur(0px)",
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: effect === "blur" ? 1.8 : 1.5,
            stagger: effect === "blur" ? 0.12 : 0.085,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [effect], revertOnUpdate: true },
  );
  return (
    <h2 ref={root} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span
          className={`reveal-line ${italicLast && i === lines.length - 1 ? "serif-italic" : ""}`}
          key={line}
          aria-hidden="true"
        >
          {line.split(" ").map((word, j) => (
            <span className="reveal-mask" key={j}>
              <span className="reveal-word">{word}&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
