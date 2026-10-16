"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import styles from "./support-artwork.module.css";

/** Additive decorative artwork. All text and actions stay in the surrounding HTML. */
export function SupportArtwork({ kind }: { kind: "practice" | "classroom" }) {
  const root = useRef<HTMLDivElement>(null);
  const entered = useInView(root, { once: true, margin: "0px 0px -24px 0px" });
  return (
    <div
      ref={root}
      className={styles.art}
      data-entered={entered}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 180" fill="none" focusable="false">
        <ellipse
          cx="120"
          cy="157"
          rx="95"
          ry="9"
          fill="currentColor"
          opacity=".07"
        />
        <ellipse
          cx="120"
          cy="90"
          rx="98"
          ry="69"
          stroke="currentColor"
          opacity=".12"
        />
        <path d="M12 90h216M120 12v156" stroke="currentColor" opacity=".07" />
        {kind === "practice" ? (
          <>
            <g className={styles.layer}>
              <path d="m43 65 118-25 28 104-118 25z" fill="#cddedc" />
              <path d="m53 51 118-25 28 104-118 25z" fill="#163c60" />
              <path
                d="m57 45 118-25 28 104-118 25z"
                fill="#fffdf6"
                stroke="#b8cdc9"
              />
              <path
                d="m75 63 67-14m-63 27 84-18m-80 31 59-13m-55 26 82-18"
                stroke="#819eac"
                strokeWidth="1.5"
              />
              <path
                d="m95 118 14 8 22-31"
                stroke="#175cdb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m143 109 27-6m-24 16 27-6"
                stroke="#819eac"
                strokeWidth="1.5"
              />
            </g>
            <g className={styles.detail}>
              <path d="m183 55 8-3 24 78-8 3z" fill="#d8b25a" />
              <path d="m207 133 8-3-1 18z" fill="#163c60" />
              <path d="m183 55 8-3-2-7-8 3z" fill="#175cdb" />
              <circle cx="42" cy="42" r="19" fill="#175cdb" />
              <path
                d="m34 42 5 5 11-12"
                stroke="#fffdf6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        ) : (
          <>
            <g className={styles.layer}>
              <path d="m54 53 122-17v85L54 138z" fill="#163c60" />
              <path d="m59 48 122-17v85L59 133z" fill="#175cdb" />
              <path d="m69 59 102-14v60L69 119z" fill="#fffdf6" />
              <path
                d="m80 72 43-6m-42 16 64-9m-62 19 33-5"
                stroke="#819eac"
                strokeWidth="1.5"
              />
              <path d="m139 59 17-2v25l-8-4-9 6z" fill="#d8b25a" />
              <path d="m101 133 15-2v16l19 7-51 7 17-12z" fill="#163c60" />
            </g>
            <g className={styles.detail}>
              <path
                d="M42 97 24 124m174-47 18 25"
                stroke="#819eac"
                strokeDasharray="3 5"
              />
              <circle cx="40" cy="83" r="15" fill="#d8b25a" />
              <circle cx="201" cy="65" r="15" fill="#175cdb" />
              <circle cx="25" cy="137" r="13" fill="#175cdb" />
              <circle cx="217" cy="115" r="13" fill="#cddedc" />
              <path
                d="M34 83h12m-6-6v12m155-24 4 4 8-9M20 137h10m182-22h10"
                stroke="#fffdf6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
