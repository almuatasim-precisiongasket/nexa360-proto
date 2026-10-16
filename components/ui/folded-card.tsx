"use client";

import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Adapted from Cult UI's FoldedCard / FoldedCardBorder / FoldedCardFold (MIT).
// The clipping is decorative so a keyboard focus outline remains visible.
const clipPath =
  "polygon(0 8px,8px 0,calc(100% - 56px) 0,100% 56px,100% calc(100% - 8px),calc(100% - 8px) 100%,8px 100%,0 calc(100% - 8px))";

export function FoldedCard({
  className,
  children,
  ...props
}: ComponentProps<"article">) {
  const gradient = useId();
  return (
    <article
      className={cn("cult-folded-card group relative isolate", className)}
      data-slot="folded-card"
      {...props}
    >
      <span
        className="paper-underlay"
        style={{ clipPath }}
        aria-hidden="true"
      />
      <span className="paper-surface" style={{ clipPath }} aria-hidden="true" />
      <span
        className="paper-border"
        style={{
          clipPath,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />
      <svg
        className="paper-fold pointer-events-none absolute right-0 top-0 h-14 w-14"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradient}
            x1="0"
            y1="56"
            x2="40"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d1dfe7" />
            <stop offset="0.5" stopColor="#f6fafb" />
            <stop offset="1" stopColor="#aac3d5" />
          </linearGradient>
        </defs>
        <path d="M0 0V56H56L0 0Z" fill={`url(#${gradient})`} />
        <path d="M0 0V56H56" stroke="#193d6826" />
      </svg>
      {children}
    </article>
  );
}
