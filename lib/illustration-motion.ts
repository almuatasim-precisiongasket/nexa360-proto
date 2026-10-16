"use client";

import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const illustrationMotion = {
  entrance: 1.8,
  stagger: 0.12,
  drawing: 2.1,
  depth: 1.1,
  travel: 6,
  ease: "power3.out",
} as const;

/** Entrance and depth target separate wrappers. Final SVG markup is visible. */
export function useIllustrationMotion(root: RefObject<HTMLElement | null>) {
  const entered = useRef(false);
  useGSAP(
    () => {
      const scene = root.current;
      if (!scene) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (entered.current) return;
        const layers = scene.querySelectorAll("[data-art-enter]");
        const drawing = scene.querySelectorAll("[data-art-draw]");
        const pieces = scene.querySelectorAll<SVGGraphicsElement>(
          "[data-art-piece]",
        );
        const timeline = gsap.timeline({
          onStart: () => {
            entered.current = true;
          },
          scrollTrigger: { trigger: scene, start: "top 93%", once: true },
        });
        timeline.fromTo(
          layers,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: illustrationMotion.entrance,
            stagger: illustrationMotion.stagger,
            ease: illustrationMotion.ease,
            clearProps: "transform,opacity",
          },
        );
        if (pieces.length)
          timeline.fromTo(
            pieces,
            {
              x: (_, element) =>
                Number((element as SVGGraphicsElement).dataset.pieceX) || 0,
              y: (_, element) =>
                Number((element as SVGGraphicsElement).dataset.pieceY) || 0,
              rotation: (_, element) =>
                (element as SVGGraphicsElement).dataset.artPiece === "subject"
                  ? 2.4
                  : -1.2,
              transformOrigin: "50% 50%",
              opacity: 0.35,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 1.65,
              stagger: 0.11,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0.12,
          );
        if (drawing.length)
          timeline.fromTo(
            drawing,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: illustrationMotion.drawing,
              stagger: 0.18,
              ease: "power2.inOut",
              clearProps: "strokeDashoffset",
            },
            0.55,
          );
        const finish = () => {
          if (entered.current && timeline.progress() < 1) timeline.progress(1);
        };
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) finish();
        });
        observer.observe(scene);
        const visibility = () => {
          if (document.hidden) finish();
        };
        document.addEventListener("visibilitychange", visibility);
        return () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", visibility);
        };
      });
      media.add(
        "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
        () => {
          const target =
            scene.closest<HTMLElement>("[data-art-interaction], article") ??
            scene;
          let visible = false;
          const layers = [
            ...scene.querySelectorAll<SVGElement | HTMLElement>(
              "[data-art-depth]",
            ),
          ].map((element) => ({
            element,
            depth: Number(element.dataset.artDepth) || 0,
            x: gsap.quickTo(element, "x", {
              duration: illustrationMotion.depth,
              ease: illustrationMotion.ease,
            }),
            y: gsap.quickTo(element, "y", {
              duration: illustrationMotion.depth,
              ease: illustrationMotion.ease,
            }),
          }));
          if (!layers.length) return;
          const reset = (immediate = false) =>
            layers.forEach((layer) => {
              if (immediate) {
                layer.x.tween.pause();
                layer.y.tween.pause();
                gsap.set(layer.element, { x: 0, y: 0 });
              } else {
                layer.x(0);
                layer.y(0);
              }
            });
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || !visible || document.hidden)
              return;
            const bounds = target.getBoundingClientRect();
            const x = gsap.utils.clamp(
              -1,
              1,
              ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 -
                1,
            );
            const y = gsap.utils.clamp(
              -1,
              1,
              ((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 -
                1,
            );
            layers.forEach((layer) => {
              layer.x(x * layer.depth * illustrationMotion.travel);
              layer.y(y * layer.depth * illustrationMotion.travel);
            });
          };
          const leave = () => reset();
          const blur = () => reset(true);
          const visibility = () => {
            if (document.hidden) reset(true);
          };
          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (!visible) reset(true);
          });
          observer.observe(scene);
          target.addEventListener("pointermove", move, { passive: true });
          target.addEventListener("pointerleave", leave);
          target.addEventListener("focusout", leave);
          window.addEventListener("blur", blur);
          document.addEventListener("visibilitychange", visibility);
          return () => {
            observer.disconnect();
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
            target.removeEventListener("focusout", leave);
            window.removeEventListener("blur", blur);
            document.removeEventListener("visibilitychange", visibility);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
}
