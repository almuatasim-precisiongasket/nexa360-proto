import { useId } from "react";
import type { PathwayId } from "@/lib/content";
import { IllustrationMaterials } from "./illustrations/Materials";

/** Original objects in the book's paper, blue enamel and brass palette. */
export function PathArt({ kind }: { kind: PathwayId }) {
  const id = useId();
  const blue = `url(#${id}-enamel)`,
    paper = `url(#${id}-paper)`;
  return (
    <svg
      className={`path-art art-${kind}`}
      viewBox="0 0 180 140"
      aria-hidden="true"
      fill="none"
    >
      <IllustrationMaterials id={id} />
      <ellipse
        data-art-piece="shadow"
        data-piece-x="-10"
        data-piece-y="9"
        cx="91"
        cy="123"
        rx="65"
        ry="12"
        fill={`url(#${id}-ground)`}
      />
      <g
        data-art-piece="frame"
        data-piece-x="12"
        data-piece-y="-8"
        stroke="#486f8c"
        strokeWidth=".55"
        opacity=".32"
      >
        <path d="M12 30V18h12M156 120h12v-12M12 124h16M152 18h16" />
      </g>
      {kind === "academic" && (
        <g data-art-piece="subject" data-piece-x="-18" data-piece-y="-12" strokeLinejoin="round">
          <path d="M35 91l48-13 64 20-48 17-64-18Z" fill="#123b70" />
          <path
            d="M37 86l47-13 61 20-47 16-61-18Z"
            fill={paper}
            stroke="#9fb9cd"
          />
          <path d="M34 79l50-14 65 21-51 17-64-19Z" fill={blue} />
          <path d="M42 48l47-9 45 11 4 35-48-13-46 11Z" fill="#b7cad6" />
          <path
            d="M40 42l48-10 45 12 4 35-48-13-46 12Z"
            fill={paper}
            stroke="#829fb8"
          />
          <path
            d="M88 32l1 34M51 47l25-5m-24 12 24-5m25-2 22 6m-21 2 22 6"
            stroke="#698ca9"
            strokeWidth="1.3"
          />
          <path d="M116 31l17-13 4 5-18 13-7 2Z" fill={`url(#${id}-gold)`} />
          <path d="M112 38l4-7 3 5Z" fill="#173b61" />
        </g>
      )}
      {kind === "competitive" && (
        <g data-art-piece="subject" data-piece-x="16" data-piece-y="-14" strokeLinejoin="round">
          <path d="M35 104l54-17 60 20-54 17Z" fill="#123b70" />
          <path d="M35 95l54-17 60 20-54 17Z" fill="#d5e4ec" />
          <path d="M45 87l23-7v18l-23 7Z" fill="#163e79" />
          <path d="M45 79l23-7 13 4-23 8Z" fill="#5b9ef2" />
          <path d="M75 68l24-7v34l-24 8Z" fill="#175cdb" />
          <path d="M75 60l24-7 14 4-24 8Z" fill="#70b5f7" />
          <path d="M107 49l24-7v50l-24 8Z" fill={blue} />
          <path d="M107 41l24-7 14 4-24 8Z" fill="#9bd0ff" />
          <circle
            cx="112"
            cy="38"
            r="23"
            fill={paper}
            stroke="#d8b25a"
            strokeWidth="3"
          />
          <circle cx="112" cy="38" r="14" stroke="#b2914a" />
          <circle cx="112" cy="38" r="5" fill="#175cdb" />
          <path d="M111 39l26-20m-5 0h5v5" stroke="#123b70" strokeWidth="2" />
        </g>
      )}
      {kind === "cyber" && (
        <g data-art-piece="subject" data-piece-x="-16" data-piece-y="-10" strokeLinejoin="round">
          <path
            d="M95 18l41 16v36c0 25-40 48-40 48L54 97l-8-53Z"
            fill="#123b70"
          />
          <path
            d="M87 15l41 16v36c0 25-41 48-41 48S46 92 46 67V31Z"
            fill={blue}
            stroke="#7fb8ef"
          />
          <path
            d="M87 28l29 12v26c0 16-29 35-29 35S58 82 58 66V40Z"
            stroke="#a6d8ff"
            strokeOpacity=".65"
          />
          <rect x="72" y="56" width="30" height="27" rx="4" fill={paper} />
          <path
            d="M79 56v-8a8 8 0 0 1 16 0v8"
            stroke="#f3eddf"
            strokeWidth="4"
          />
          <circle cx="87" cy="67" r="3" fill="#175cdb" />
          <path d="M87 68v6" stroke="#175cdb" strokeWidth="2" />
          <path
            d="M24 54h14m103 25h18M34 102l12-7m88-65 12-8"
            stroke="#759dbb"
          />
          <circle cx="22" cy="54" r="4" fill={`url(#${id}-gold)`} />
          <circle cx="161" cy="79" r="4" fill={`url(#${id}-gold)`} />
        </g>
      )}
      {kind === "ai" && (
        <g data-art-piece="subject" data-piece-x="18" data-piece-y="-12" strokeLinejoin="round">
          <path d="M38 68l52-28 52 28v24l-52 29-52-29Z" fill="#123b70" />
          <path d="M38 62l52-28 52 28-52 29Z" fill={blue} stroke="#8fc5fa" />
          <path d="M58 62l32-17 32 17-32 18Z" fill={paper} stroke="#9bb9cf" />
          <path
            d="M38 78l-13-7m13 19-13-7m117-5 13-7m-13 19 13-7M65 47l-11-6m25-1-11-6m33 6 11-6m3 13 11-6"
            stroke="#819db2"
            strokeWidth="3"
          />
          <path d="M73 62l17-9 17 9-17 10Z" fill="#175cdb" />
          <circle cx="90" cy="22" r="7" fill={`url(#${id}-gold)`} />
          <path
            d="M90 29v15m-29-25 15 16m43-16-15 16"
            stroke="#d8b25a"
            strokeWidth="1.5"
          />
          <circle cx="58" cy="16" r="4" fill="#82bdf0" />
          <circle cx="122" cy="16" r="4" fill="#82bdf0" />
        </g>
      )}
      {kind === "robotics" && (
        <g data-art-piece="subject" data-piece-x="-18" data-piece-y="-13" strokeLinejoin="round">
          <path d="M45 111l43-13 44 13-43 15Z" fill="#123b70" />
          <path d="M45 103l43-13 44 13-43 15Z" fill="#c4dae7" />
          <path d="M72 78h29v27H72Z" fill={blue} />
          <ellipse cx="87" cy="79" rx="14" ry="6" fill="#82bdf0" />
          <path d="M76 78 51 51l12-11 27 29Z" fill={paper} stroke="#8faec7" />
          <path d="M59 40l46-23 10 17-46 25Z" fill={blue} stroke="#78b6f0" />
          <circle
            cx="59"
            cy="49"
            r="11"
            fill="#123b70"
            stroke="#9cd1f5"
            strokeWidth="2"
          />
          <circle cx="59" cy="49" r="4" fill={`url(#${id}-gold)`} />
          <circle
            cx="109"
            cy="27"
            r="10"
            fill="#123b70"
            stroke="#9cd1f5"
            strokeWidth="2"
          />
          <circle cx="109" cy="27" r="4" fill={`url(#${id}-gold)`} />
          <path d="M116 29l25 18-8 12-25-18Z" fill={paper} stroke="#8faec7" />
          <path
            d="M136 53l12 8-3 14-9 5m0-27-7 14-10 2"
            stroke="#123b70"
            strokeWidth="4"
          />
        </g>
      )}
      {kind === "career" && (
        <g data-art-piece="subject" data-piece-x="16" data-piece-y="-11" strokeLinejoin="round">
          <path d="M42 52l61-13 33 17v47l-61 16-33-17Z" fill="#123b70" />
          <path d="M42 49l61-13 33 17-61 15Z" fill="#5a9df1" />
          <path d="M42 49l33 19v48l-33-17Z" fill="#164ba1" />
          <path d="M75 68l61-15v47l-61 16Z" fill={blue} />
          <path d="M75 80l61-15" stroke="#91c8f6" />
          <path d="M68 43V32l21-5 13 6v7" stroke="#123b70" strokeWidth="6" />
          <path d="M69 32l20-5 13 6" stroke="#6ca7e8" strokeWidth="2" />
          <path d="M99 76l12-3v12l-12 3Z" fill={`url(#${id}-gold)`} />
          <path d="M28 90l-8 4m123-65 11-4m-2 62 10 3" stroke="#8faec7" />
        </g>
      )}
    </svg>
  );
}
