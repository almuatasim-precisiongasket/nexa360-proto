export function PathArt({ kind }: { kind: string }) {
  return (
    <svg
      className={`path-art art-${kind}`}
      viewBox="0 0 180 140"
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        {kind === "academic" && (
          <>
            <circle cx="90" cy="70" r="51" opacity=".3" />
            <path d="M28 100h125M45 35v75M55 80l13 10 18-50h49" />
            <text
              x="84"
              y="91"
              fill="currentColor"
              stroke="none"
              fontFamily="Georgia"
              fontSize="50"
              fontStyle="italic"
            >
              x
            </text>
          </>
        )}
        {kind === "competitive" && (
          <>
            <path d="M32 110V87h28V65h28V43h28V22h28" />
            <circle cx="139" cy="35" r="20" />
            <circle cx="139" cy="35" r="10" />
            <path d="m129 46 24-24M39 119h114" opacity=".4" />
          </>
        )}
        {kind === "cyber" && (
          <>
            <path d="m90 18 36 15v34c0 24-36 48-36 48S54 91 54 67V33Z" />
            <path d="m73 64 12 12 25-29M19 67h35m72 0h35" />
            <circle cx="18" cy="67" r="5" />
            <circle cx="162" cy="67" r="5" />
            <path
              d="M31 24 54 40m72 0 23-16M31 115l30-21m58 0 30 21"
              opacity=".4"
            />
          </>
        )}
        {kind === "ai" && (
          <>
            <path
              d="M35 38 90 26l55 17M35 38l55 32 55-27M35 96l55-26 55 28M35 96l55 22 55-20M90 26v92"
              opacity=".55"
            />
            {[
              [35, 38],
              [35, 96],
              [90, 26],
              [90, 70],
              [90, 118],
              [145, 43],
              [145, 98],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === 3 ? 11 : 6}
                fill={i === 3 ? "currentColor" : "none"}
              />
            ))}
          </>
        )}
        {kind === "robotics" && (
          <>
            <path d="M47 118h66M60 111v-17h41v17M70 92 50 51l13-9 25 44M63 42l48-21 8 15-49 27M116 23l24 18-7 12-25-16" />
            <circle cx="60" cy="52" r="10" />
            <circle cx="113" cy="30" r="9" />
            <circle cx="81" cy="91" r="10" />
            <path
              d="m138 46 14 8-3 17-10 4m-1-29-7 17-11 2M19 125h142M35 117h111"
              opacity=".5"
            />
          </>
        )}
        {kind === "career" && (
          <>
            <path
              d="M30 115h125M39 108V91h18v17m12 0V73h18v35m12 0V55h18v53"
              opacity=".5"
            />
            <path d="m40 65 43-20 18 12 46-40m-26 0h26v26" />
          </>
        )}
      </g>
    </svg>
  );
}
