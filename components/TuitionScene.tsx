"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TuitionScene({ format }: { format: "london" | "online" }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
        () => {
          const scene = root.current!;
          const card = scene.closest("article")!;
          gsap.from(".scene-enter-layer", {
            y: 22,
            opacity: 0,
            duration: 1.6,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: { trigger: scene, start: "top 95%", once: true },
            clearProps: "transform,opacity",
          });
          const layers = gsap.utils
            .toArray<HTMLElement>(".scene-depth-layer")
            .map((layer) => ({
              depth: Number(layer.dataset.depth),
              x: gsap.quickTo(layer, "x", {
                duration: 1.2,
                ease: "power3.out",
              }),
              y: gsap.quickTo(layer, "y", {
                duration: 1.2,
                ease: "power3.out",
              }),
            }));
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const rect = card.getBoundingClientRect();
            const x = Math.max(
              -1,
              Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
            );
            const y = Math.max(
              -1,
              Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
            );
            layers.forEach((layer) => {
              layer.x(x * layer.depth * 12);
              layer.y(y * layer.depth * 8);
            });
          };
          const reset = () =>
            layers.forEach((layer) => {
              layer.x(0);
              layer.y(0);
            });
          card.addEventListener("pointermove", move, { passive: true });
          card.addEventListener("pointerleave", reset);
          window.addEventListener("blur", reset);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", reset);
            window.removeEventListener("blur", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`tuition-scene tuition-scene-${format}`}
      aria-hidden="true"
    >
      <svg className="scene-ground" viewBox="0 0 360 240">
        <ellipse cx="180" cy="211" rx="134" ry="12" />
      </svg>
      <div className="scene-enter-layer">
        <div className="scene-depth-layer" data-depth="0.25">
          <svg viewBox="0 0 360 240" fill="none">
            {format === "london" ? (
              <g stroke="currentColor" strokeWidth="1.2">
                <path
                  d="M70 144V48l80-30 80 30v96M150 18v126M75 67h150"
                  opacity=".35"
                />
                <rect
                  x="88"
                  y="75"
                  width="43"
                  height="53"
                  rx="2"
                  fill="var(--scene-window)"
                />
                <rect
                  x="166"
                  y="75"
                  width="43"
                  height="53"
                  rx="2"
                  fill="var(--scene-window)"
                />
                <path
                  d="M109 75v53m-21-27h43m56-26v53m-21-27h43M260 54h34m-17-17v34"
                  opacity=".55"
                />
              </g>
            ) : (
              <g stroke="currentColor" strokeWidth="1.1" opacity=".4">
                <circle cx="180" cy="106" r="90" />
                <path d="M53 106h254M180 15v182" />
                <path d="M290 29h27m-13-13v27M35 178h23m-11-11v23" />
              </g>
            )}
          </svg>
        </div>
      </div>
      <div className="scene-enter-layer">
        <div className="scene-depth-layer" data-depth="0.65">
          <svg
            viewBox="0 0 360 240"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {format === "london" ? (
              <g stroke="currentColor" strokeWidth="1.3">
                <path
                  d="M54 146l224-13 30 26-228 18Z"
                  fill="var(--scene-desk)"
                />
                <path d="M80 177v31m208-48v42M57 149v42m37-18v27" />
                <path d="M54 146v7l26 30 228-18v-6" opacity=".5" />
              </g>
            ) : (
              <g stroke="var(--scene-frame)" strokeWidth="1.5">
                <rect
                  x="69"
                  y="48"
                  width="222"
                  height="140"
                  rx="9"
                  fill="var(--scene-frame)"
                />
                <rect
                  x="78"
                  y="57"
                  width="204"
                  height="119"
                  rx="3"
                  fill="#e6eff1"
                />
                <path d="M69 188l-23 19h268l-23-19Z" fill="#b1c9da" />
                <path d="M153 194h54l8 6h-70Z" fill="#e6eff1" />
                <rect
                  x="90"
                  y="69"
                  width="69"
                  height="94"
                  rx="3"
                  fill="#c2d9e7"
                  stroke="none"
                />
                <circle cx="124" cy="95" r="13" fill="#175cdb" stroke="none" />
                <path
                  d="M104 143v-12a20 20 0 0 1 40 0v12"
                  fill="#175cdb"
                  stroke="none"
                />
                <path
                  d="M175 84h88m-88 10h59m-59 50h88M184 135l21-19 22 8 29-20"
                  stroke="#175cdb"
                />
                <circle cx="205" cy="116" r="3" fill="#175cdb" stroke="none" />
              </g>
            )}
          </svg>
        </div>
      </div>
      <div className="scene-enter-layer">
        <div className="scene-depth-layer" data-depth="1">
          <svg
            viewBox="0 0 360 240"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {format === "london" ? (
              <g stroke="#315678" strokeWidth="1.2">
                <path
                  d="M105 142l57-8 33 15 49-12 23 29-69 18-43-20-38 7Z"
                  fill="#b9cbd5"
                />
                <path
                  d="M105 136l58-10 34 15 49-12 19 30-67 17-42-20-40 8Z"
                  fill="#f3eddf"
                />
                <path d="M163 126l-7 30m41-15 1 35M125 140l26-5m-23 12 24-4m55 7 29-8m-25 15 28-8" />
                <path
                  d="M270 125l8-27 5 2-8 27-5 5Z"
                  fill="#d8b25a"
                  stroke="#d8b25a"
                />
                <path d="M270 132l2-7 3 2Z" fill="#102a48" />
              </g>
            ) : (
              <g stroke="#315678" strokeWidth="1.2">
                <path d="M26 138l70-12 15 72-70 12Z" fill="#f3eddf" />
                <path d="M42 151l41-7m-39 17 30-5m-27 17 39-7m-37 17 23-4" />
                <path d="M279 151l36 4-6 47-34-3Z" fill="#f3eddf" />
                <path d="M284 167l21 2m-23 9 17 2m-18 9 11 1" />
                <path
                  d="M117 194l35-28 4 5-35 28-9 3Z"
                  fill="#d8b25a"
                  stroke="#d8b25a"
                />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
