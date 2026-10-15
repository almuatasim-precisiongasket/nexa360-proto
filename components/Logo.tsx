"use client";
import { useId } from "react";
export function Logo({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`brand-logo ${className}`}
      viewBox="127 410 757 332"
      role="img"
      aria-label="NEXA360"
    >
      <defs>
        <filter id={`${id}-ink`}>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.299 -.587 -.114 0 1"
          />
        </filter>
        <mask
          id={`${id}-mask`}
          x="127"
          y="410"
          width="757"
          height="332"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href="/assets/nexa-logo.png"
            width="1080"
            height="1080"
            filter={`url(#${id}-ink)`}
          />
        </mask>
      </defs>
      <rect
        x="127"
        y="410"
        width="757"
        height="332"
        fill="currentColor"
        mask={`url(#${id}-mask)`}
      />
    </svg>
  );
}
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}
