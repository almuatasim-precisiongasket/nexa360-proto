"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./story-scenes.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ChapterTransition({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const gradient = useId();
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 92%",
            end: "bottom 25%",
            scrub: 1,
          },
        });
        timeline
          .fromTo(
            "[data-ribbon-front]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: "none" },
            0,
          )
          .fromTo(
            "[data-chapter-word]",
            { y: 26, opacity: 0.35 },
            { y: 0, opacity: 1, ease: "none", duration: 0.65 },
            0.1,
          )
          .fromTo(
            "[data-chapter-number]",
            { y: 22 },
            { y: -15, ease: "none" },
            0,
          );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div className={s.chapter} ref={root} data-nexa-owned>
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradient}>
            <stop stopColor="#164476" stopOpacity="0" />
            <stop offset=".45" stopColor="#3d7ccc" />
            <stop offset=".75" stopColor="#d5bd85" />
            <stop offset="1" stopColor="#164476" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-80 255C190 240 350 30 630 75S1010 290 1520 25"
          stroke={`url(#${gradient})`}
          strokeWidth="26"
          opacity=".055"
        />
        <path
          d="M-80 255C190 240 350 30 630 75S1010 290 1520 25"
          stroke={`url(#${gradient})`}
          strokeWidth="1.5"
          pathLength="1"
          strokeDasharray="1"
          data-ribbon-front
        />
      </svg>
      <span className={s.chapterNumber} data-chapter-number aria-hidden="true">
        {number}
      </span>
      <div className={s.chapterCopy} data-chapter-word>
        <span className={s.kicker}>THE NEXT CHAPTER / {number}</span>
        <p>{title}</p>
        <span>{note}</span>
      </div>
    </div>
  );
}
