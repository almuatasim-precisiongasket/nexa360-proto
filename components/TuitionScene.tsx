"use client";

import { useId, useRef } from "react";
import { useIllustrationMotion } from "@/lib/illustration-motion";
import { IllustrationMaterials } from "./illustrations/Materials";

export function TuitionScene({ format }: { format: "london" | "online" }) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const paper = `url(#${id}-paper)`;
  const enamel = `url(#${id}-enamel)`;
  const gold = `url(#${id}-gold)`;
  const london = format === "london";
  useIllustrationMotion(root);
  return (
    <div
      ref={root}
      className={`tuition-scene tuition-scene-${format} illustration-scene`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 280"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <IllustrationMaterials id={id} />
        <ellipse
          cx="210"
          cy="248"
          rx="164"
          ry="22"
          fill={`url(#${id}-ground)`}
        />
        <g data-art-enter="">
          <g
            data-art-depth="-0.25"
            className="scene-blueprint"
            stroke="currentColor"
            strokeWidth=".8"
          >
            <path
              d="M32 233H388M47 72H373M67 46V246M353 46V246"
              strokeDasharray="2 7"
              opacity=".3"
            />
            {london ? (
              <>
                <path
                  d="M77 184V66l98-33 98 33v99M175 33v140M77 90h196"
                  opacity=".55"
                />
                <path
                  d="M101 105h49v53h-49zM201 105h48v53h-48zM125 105v53m-24-27h49m75-26v53m-24-27h48"
                  opacity=".5"
                />
                <path
                  d="M305 61h32m-16-16v32M50 178h22m-11-11v22"
                  opacity=".6"
                />
              </>
            ) : (
              <>
                <circle cx="211" cy="128" r="101" opacity=".35" />
                <path
                  d="M99 128h224M211 25v205M323 49h28m-14-14v28"
                  opacity=".4"
                />
              </>
            )}
          </g>
        </g>
        <g data-art-enter="">
          <g data-art-depth="0.55">
            <path
              d="M47 196l209-42 119 55-209 43Z"
              fill="#102e4b"
              opacity=".22"
            />
            <path
              d="M47 185l209-42 119 55-209 43Z"
              fill={paper}
              stroke="#9ebaca"
              strokeWidth=".8"
            />
            <path d="M47 185v9l119 56 209-43v-9l-209 43Z" fill="#92afbf" />
            <path d="M166 241v9l209-43v-9Z" fill="#6e91ac" />
            {london ? (
              <>
                <path
                  d="M75 210v31m269-19v21"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".6"
                />
                <path
                  d="M83 190l165-33 91 42"
                  stroke="#fffef5"
                  strokeOpacity=".8"
                />
              </>
            ) : (
              <>
                <path
                  d="M104 174V66a6 6 0 0 1 6-6h197a6 6 0 0 1 6 6v108Z"
                  fill={enamel}
                  stroke="#7aabd1"
                />
                <path d="M113 69h191v96H113Z" fill="#eaf1f0" />
                <path
                  d="M104 174l-29 21h267l-29-21Z"
                  fill="#b3cedc"
                  stroke="#6e91ac"
                />
                <path d="M75 195v5h267v-5" fill="#527895" />
                <path
                  d="M101 181h214M93 187h231"
                  stroke="#6e91ac"
                  strokeWidth=".7"
                  opacity=".7"
                />
                <path d="M189 181h42l8 9h-57Z" fill="#eaf1f0" />
                <circle cx="209" cy="64" r="1.3" fill="#b9ddf3" />
                <rect
                  x="125"
                  y="81"
                  width="61"
                  height="71"
                  rx="2"
                  fill="#d3e2e5"
                />
                <path
                  d="M137 96h36m-36 9h27m-27 31h36m-36 7h22"
                  stroke="#5c7d94"
                  strokeWidth="1.4"
                />
                <path d="M210 143h78M214 143V89" stroke="#91abb7" />
                <path
                  d="M220 132l29-38 31 38Z"
                  stroke="#175cdb"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  data-art-draw=""
                />
                <path
                  d="M234 151h31"
                  stroke="#b38a39"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  data-art-draw=""
                />
                <circle cx="249" cy="94" r="3" fill="#d8b25a" />
              </>
            )}
          </g>
        </g>
        <g data-art-enter="">
          <g data-art-depth="1">
            {london ? (
              <>
                <path
                  d="M102 177l79-22 55 24 65-16 19 38-84 23-58-25-62 17Z"
                  fill="#123b70"
                />
                <path
                  d="M104 168l77-22 55 24 65-16 17 39-82 22-58-25-62 17Z"
                  fill="#b1c7d2"
                />
                <path
                  d="M103 161l78-22 55 24 65-16 17 39-82 22-58-25-62 17Z"
                  fill={paper}
                  stroke="#89a6b9"
                />
                <path
                  d="M181 139l-3 44m58-20v45"
                  stroke="#6b8ca5"
                  strokeWidth="1.3"
                />
                <path
                  d="M120 166l44-12m-41 20 38-10m88 1 39-10m-36 18 39-10"
                  stroke="#9bb2bd"
                  strokeWidth="1.4"
                />
                <path
                  d="M124 184l31-8"
                  stroke="#175cdb"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  data-art-draw=""
                />
                <path
                  d="M257 182l28-8"
                  stroke="#175cdb"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  data-art-draw=""
                />
                <path
                  d="M328 169l15-48 6 2-15 48-9 10Z"
                  fill={gold}
                  stroke="#b38a39"
                />
                <path d="M325 181l3-12 6 2Z" fill="#f3eddf" />
                <path d="M325 181l2-5 3 2Z" fill="#123b70" />
                <path d="M76 164l31-8 6 3-31 8Z" fill={gold} />
              </>
            ) : (
              <>
                <path d="M52 189l53-14 14 52-54 15Z" fill="#123b70" />
                <path
                  d="M49 183l54-14 14 52-54 15Z"
                  fill={paper}
                  stroke="#9cb4c2"
                />
                <path
                  d="M62 188l31-8m-28 17 31-8m-29 18 24-6m-22 15 29-8"
                  stroke="#6f8da2"
                />
                <path
                  d="M291 222l50-20 3 5-50 20-11 1Z"
                  fill={gold}
                  stroke="#b38a39"
                />
                <path d="M283 228l8-6 3 5Z" fill="#f3eddf" />
                <path
                  d="M344 140l23-6v36l-23 6Z"
                  fill={enamel}
                  stroke="#82b4db"
                />
                <path d="M350 151l10-3m-10 9 10-3" stroke="#d8e9f2" />
              </>
            )}
          </g>
        </g>
        <g
          className="scene-registration"
          stroke="currentColor"
          strokeWidth=".8"
          opacity=".5"
        >
          <path d="M25 49v-9h9M386 231h9v-9" />
          <path d="M28 254h27m312 0h27" />
        </g>
      </svg>
    </div>
  );
}
