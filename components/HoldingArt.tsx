"use client";

import { useId, useRef } from "react";
import { useIllustrationMotion } from "@/lib/illustration-motion";
import { IllustrationMaterials } from "./illustrations/Materials";

export function HoldingArt({ kind }: { kind: "products" | "events" }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  useIllustrationMotion(root);
  return (
    <div
      ref={root}
      className={`holding-visual holding-visual-${kind}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 240" fill="none" focusable="false">
        <IllustrationMaterials id={id} />
        <ellipse
          cx="180"
          cy="211"
          rx="111"
          ry="20"
          fill={`url(#${id}-ground)`}
        />
        <g data-art-enter="" stroke="#79a8cf" strokeWidth=".7" opacity=".25">
          <circle cx="180" cy="121" r="101" />
          <path d="M42 121h276M180 14v212" />
          <path d="M47 44V32h12M301 204h12v-12" />
        </g>
        {kind === "products" ? (
          <g data-art-enter="" strokeLinejoin="round">
            <path d="M74 170l113-32 99 34-113 35Z" fill="#123b70" />
            <path d="M74 162l113-32 99 34-113 35Z" fill="#d2e2eb" />
            <path d="M91 79l57-19v103l-57 18Z" fill={`url(#${id}-enamel)`} />
            <path d="M148 60l40 23v102l-40-22Z" fill="#123b70" />
            <path
              d="M160 50l56-17v103l-56 18Z"
              fill={`url(#${id}-paper)`}
              stroke="#9cb7cb"
            />
            <path d="M216 33l42 23v103l-42-23Z" fill="#c2d6e4" />
            <path
              d="M173 71l28-8m-28 19 28-8m-28 19 19-5M106 111l28-9m-28 20 28-9"
              stroke="#8ba9c0"
              strokeWidth="2"
            />
            <path d="M160 50l56-17" stroke="#d8b25a" strokeWidth="3" />
          </g>
        ) : (
          <g data-art-enter="" strokeLinejoin="round">
            <path d="M96 52l162 15v139l-162-14Z" fill="#071a31" />
            <path
              d="M85 44l162 15v139l-162-14Z"
              fill={`url(#${id}-paper)`}
              stroke="#91b6d2"
            />
            <path d="M85 44l162 15v39L85 83Z" fill={`url(#${id}-enamel)`} />
            <path
              d="M116 38v28m100-18v28"
              stroke="#d8b25a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <path
                  key={`${row}-${col}`}
                  d={`M${105 + col * 33} ${105 + row * 25}l18 2v13l-18-2Z`}
                  fill="#b8cedd"
                />
              )),
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
