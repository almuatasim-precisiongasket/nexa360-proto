"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** React Bits ClickSpark adaptation: bounded, event-driven DOM bursts. */
export function ClickSpark() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = layer.current;
    if (!host) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const bursts = new Set<HTMLSpanElement>();
    const remove = (burst: HTMLSpanElement) => {
      gsap.killTweensOf(burst.children);
      burst.remove();
      bursts.delete(burst);
    };
    const clear = () => bursts.forEach(remove);
    const click = (event: MouseEvent) => {
      if (media.matches || !(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(
        ".button,.header-contact,.chapter-tabs button,.chapter-arrow",
      );
      if (!target || target.closest("dialog,form,.brand-intro")) return;
      if (bursts.size >= 4) remove(bursts.values().next().value!);
      const rect = target.getBoundingClientRect();
      const burst = document.createElement("span");
      burst.className = "click-spark-burst";
      burst.style.left = `${event.detail ? event.clientX : rect.left + rect.width / 2}px`;
      burst.style.top = `${event.detail ? event.clientY : rect.top + rect.height / 2}px`;
      host.append(burst);
      bursts.add(burst);
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement("i");
        const angle = (i / 8) * Math.PI * 2;
        burst.append(spark);
        gsap.fromTo(
          spark,
          {
            x: Math.cos(angle) * 7,
            y: Math.sin(angle) * 7,
            rotation: (angle * 180) / Math.PI + 90,
            scaleY: 1,
            opacity: 1,
          },
          {
            x: Math.cos(angle) * 38,
            y: Math.sin(angle) * 38,
            scaleY: 0.1,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            onComplete: i === 7 ? () => remove(burst) : undefined,
          },
        );
      }
    };
    document.addEventListener("click", click);
    media.addEventListener("change", clear);
    window.addEventListener("blur", clear);
    return () => {
      document.removeEventListener("click", click);
      media.removeEventListener("change", clear);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, []);

  return <div ref={layer} className="click-spark-layer" aria-hidden="true" />;
}
