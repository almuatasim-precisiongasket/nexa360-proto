"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation, useAnimationControls } from "motion/react";
import * as m from "motion/react-m";
import { useMediaQuery } from "@/lib/use-media-query";
import { REDUCED_MOTION_QUERY } from "@/lib/media";

/** Motion Primitives TextEffect: word segmentation + container/item variants.
 * Adapted to preserve server-rendered text and use NEXA360's lazy Motion bundle.
 * Source: github.com/ibelick/motion-primitives (MIT).
 */
export function TextEffect({
  children,
  trigger,
  delay = 0,
  preset = "slide",
}: {
  children: string;
  trigger: boolean;
  delay?: number;
  preset?: "slide" | "blur";
}) {
  const controls = useAnimationControls();
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY);
  useEffect(() => {
    if (reduced) controls.set("visible");
    else if (trigger) void controls.start("visible");
    else controls.set("hidden");
    return () => controls.stop();
  }, [controls, reduced, trigger]);
  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        className="motion-text-effect"
        initial={false}
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.095, delayChildren: delay },
          },
        }}
      >
        {children.split(/\s+/).map((word, index) => (
          <span className="reveal-mask" key={`${index}-${word}`}>
            <m.span
              className="reveal-word whitespace-pre"
              variants={{
                hidden: {
                  opacity: preset === "blur" ? 0 : 0.2,
                  y: preset === "blur" ? "0.3em" : "0.9em",
                  filter: preset === "blur" ? "blur(4px)" : "blur(0px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: reduced ? 0 : 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {word}
              {"\u00a0"}
            </m.span>
          </span>
        ))}
      </m.span>
    </LazyMotion>
  );
}
