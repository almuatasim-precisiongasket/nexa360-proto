"use client";
import { Arrow } from "./Logo";
import type { TuitionFormat } from "@/lib/content";
import { emitSiteEvent } from "@/lib/site-events";

export function TuitionEnquiry({
  format,
  children,
  className = "text-link",
  interactive = false,
}: {
  format?: TuitionFormat;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <a
      href="#contact"
      className={`${className}${interactive ? " magic-hover-button" : ""}`}
      data-focus-target="inquiry-name"
      onClick={() => {
        emitSiteEvent("nexa:tuition", format ?? "");
        if (matchMedia("(prefers-reduced-motion: reduce)").matches)
          requestAnimationFrame(() =>
            document
              .getElementById("inquiry-name")
              ?.focus({ preventScroll: true }),
          );
      }}
    >
      {interactive ? (
        <>
          <span className="magic-hover-dot" aria-hidden="true" />
          <span className="magic-button-rest">
            {children} <Arrow />
          </span>
          <span className="magic-button-active" aria-hidden="true">
            {children} <Arrow />
          </span>
        </>
      ) : (
        <>
          {children} <Arrow />
        </>
      )}
    </a>
  );
}
