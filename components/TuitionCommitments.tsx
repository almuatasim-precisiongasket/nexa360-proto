"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";

const commitments = [
  {
    title: "A plan for every student",
    copy: "Personalised lesson plans aligned to the national curriculum.",
    drawing: "M12 7h20v27H12zM18 14h9m-9 6h9m-9 6h5M8 12H5v27h22v-3",
  },
  {
    title: "Regular performance checks",
    copy: "Progress tracked against targets agreed at the start.",
    drawing: "M6 33h31M10 28v-7m9 7V15m9 13V8M8 15l10-7 9 3 10-8",
  },
  {
    title: "Feedback parents can use",
    copy: "Weekly progress reports and a face-to-face parent meeting every month.",
    drawing: "M7 6h30v23H20l-8 8v-8H7zM14 13h16m-16 7h11",
  },
  {
    title: "Qualified teachers",
    copy: "Experienced, DBS-checked tutors.",
    drawing: "M22 4l15 6v12c0 8-15 17-15 17S7 30 7 22V10zM15 21l5 5 10-12",
  },
];

export function TuitionCommitments() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domMax} strict>
      <div className="tuition-bento" onPointerLeave={() => setActive(null)}>
        {commitments.map((item, index) => (
          <article
            key={item.title}
            className="tuition-bento-card editorial-reveal"
            onPointerEnter={(event) => {
              if (
                event.pointerType === "mouse" &&
                matchMedia("(hover:hover) and (pointer:fine)").matches
              )
                setActive(index);
            }}
          >
            <AnimatePresence initial={false}>
              {active === index && (
                <m.span
                  key="highlight"
                  layoutId="tuition-bento-highlight"
                  className="bento-hover-highlight"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
            </AnimatePresence>
            <div className="bento-card-top">
              <span className="kicker">0{index + 1}</span>
              <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <path
                  d={item.drawing}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <span className="bento-grid-texture" aria-hidden="true" />
          </article>
        ))}
      </div>
    </LazyMotion>
  );
}
