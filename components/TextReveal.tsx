"use client";
import { useRef } from "react";
import { useInView } from "motion/react";
import { TextEffect } from "./motion-primitives/text-effect";
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
  const visible = useInView(root, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <h2 ref={root} aria-label={lines.join(" ")}>
      {lines.map((line, i) => {
        const delay =
          lines
            .slice(0, i)
            .reduce(
              (count, previous) => count + previous.trim().split(/\s+/).length,
              0,
            ) * 0.095;
        return (
          <span
            className={`reveal-line ${italicLast && i === lines.length - 1 ? "serif-italic" : ""}`}
            key={`${i}-${line}`}
            aria-hidden="true"
          >
            <TextEffect trigger={visible} delay={delay} preset={effect}>
              {line}
            </TextEffect>
          </span>
        );
      })}
    </h2>
  );
}
