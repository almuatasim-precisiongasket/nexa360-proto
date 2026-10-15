import { useId } from "react";

export function HoldingArt({ kind }: { kind: "products" | "events" }) {
  const id = useId();
  return (
    <div className={`holding-visual holding-visual-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 360 240" fill="none">
        <defs>
          <linearGradient
            id={id}
            x1="80"
            y1="30"
            x2="260"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6daaf4" />
            <stop offset="1" stopColor="#123b70" />
          </linearGradient>
        </defs>
        <ellipse
          cx="180"
          cy="211"
          rx="111"
          ry="12"
          fill={kind === "products" ? "#193d6812" : "#02081455"}
        />
        <g stroke="#79a8cf" strokeWidth=".7" opacity=".25">
          <circle cx="180" cy="121" r="101" />
          <path d="M42 121h276M180 14v212" />
        </g>
        {kind === "products" ? (
          <g strokeLinejoin="round">
            <path d="M74 170l113-32 99 34-113 35Z" fill="#123b70" />
            <path d="M74 162l113-32 99 34-113 35Z" fill="#d2e2eb" />
            <path d="M91 79l57-19v103l-57 18Z" fill={`url(#${id})`} />
            <path d="M148 60l40 23v102l-40-22Z" fill="#123b70" />
            <path
              d="M160 50l56-17v103l-56 18Z"
              fill="#f6f0e3"
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
          <g strokeLinejoin="round">
            <path d="M96 52l162 15v139l-162-14Z" fill="#071a31" />
            <path
              d="M85 44l162 15v139l-162-14Z"
              fill="#e9f0f1"
              stroke="#91b6d2"
            />
            <path d="M85 44l162 15v39L85 83Z" fill={`url(#${id})`} />
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
                  fill={row === 1 && col === 2 ? "#175cdb" : "#b8cedd"}
                />
              )),
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
