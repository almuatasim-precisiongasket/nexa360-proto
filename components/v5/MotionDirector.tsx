"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Authored chapter motion. Controls and the book retain their own animation owners. */
export function MotionDirector() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    const seen = new WeakSet<Element>();
    const stable = (element: Element) =>
      !element.closest("[data-v5-dynamic], [data-nexa-volatile]");

    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 901px)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const desktop = Boolean(context.conditions.desktop);
        const splits: SplitText[] = [];

        gsap.utils
          .toArray<HTMLElement>("[data-nexa-scene]")
          .filter(stable)
          .forEach((scene) => {
            const heading = scene.querySelector<HTMLElement>(
              "[data-nexa-heading]",
            );
            if (!heading || seen.has(scene)) return;
            const kicker = scene.querySelectorAll("[data-nexa-kicker]");
            const support = scene.querySelectorAll("[data-nexa-support]");
            splits.push(
              SplitText.create(heading, {
                type: "lines",
                mask: "lines",
                linesClass: "nexa-motion-line",
                autoSplit: true,
                aria: "auto",
                onSplit(self) {
                  if (seen.has(scene)) {
                    gsap.set([...self.lines, ...kicker, ...support], {
                      clearProps: "transform,opacity",
                    });
                    return gsap.timeline();
                  }
                  const timeline = gsap.timeline({
                    scrollTrigger: {
                      trigger: scene,
                      start: "top 86%",
                      once: true,
                      onEnter: () => {
                        seen.add(scene);
                      },
                    },
                  });
                  if (kicker.length)
                    timeline.from(
                      kicker,
                      {
                        y: 8,
                        opacity: 0.35,
                        duration: 0.65,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                      },
                      0,
                    );
                  timeline.from(
                    self.lines,
                    {
                      yPercent: 108,
                      rotation: desktop ? 1.1 : 0,
                      transformOrigin: "0% 100%",
                      duration: desktop ? 1.15 : 0.85,
                      stagger: 0.12,
                      ease: "power4.out",
                      clearProps: "transform",
                    },
                    0.08,
                  );
                  if (support.length)
                    timeline.from(
                      support,
                      {
                        y: desktop ? 16 : 10,
                        opacity: 0.4,
                        duration: 0.95,
                        stagger: 0.08,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                      },
                      0.38,
                    );
                  return timeline;
                },
              }),
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-nexa-reveal]")
          .filter(stable)
          .forEach((element) => {
            if (seen.has(element) || !element.getBoundingClientRect().height)
              return;
            const ink = element.dataset.nexaReveal === "ink";
            gsap.from(element, {
              ...(ink
                ? desktop
                  ? { clipPath: "inset(0% 0% 12% 0%)" }
                  : {}
                : { y: desktop ? 24 : 12, scale: desktop ? 0.987 : 1 }),
              opacity: 0.5,
              duration: desktop ? 1.15 : 0.85,
              ease: "power3.out",
              delay: Number(element.dataset.nexaDelay || 0),
              clearProps: ink ? "opacity,clipPath" : "transform,opacity",
              scrollTrigger: {
                trigger: element,
                start: "top 91%",
                once: true,
                onEnter: () => {
                  seen.add(element);
                },
              },
            });
          });

        gsap.utils.toArray<HTMLElement>("[data-nexa-gate]").forEach((gate) => {
          const paths = gate.querySelectorAll("[data-nexa-gate-path]");
          const nodes = gate.querySelectorAll("[data-nexa-gate-node]");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: gate,
              start: "top 96%",
              end: "bottom 50%",
              scrub: 1.15,
            },
          });
          timeline.fromTo(
            paths,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, stagger: 0.14, duration: 1, ease: "none" },
            0,
          );
          timeline.fromTo(
            nodes,
            { opacity: 0.15 },
            { opacity: 1, duration: 0.55, stagger: 0.12, ease: "none" },
            0.5,
          );
        });

        gsap.utils
          .toArray<SVGSVGElement>("[data-nexa-trace]")
          .forEach((svg) => {
            const timeline = gsap.timeline({
              scrollTrigger: { trigger: svg, start: "top 85%", once: true },
            });
            svg.querySelectorAll("path").forEach((path) => {
              const length = path.getTotalLength();
              timeline.fromTo(
                path,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  duration: 1.9,
                  ease: "power2.inOut",
                  clearProps: "strokeDasharray,strokeDashoffset",
                },
                0,
              );
            });
          });

        gsap.utils
          .toArray<HTMLElement>("[data-nexa-process]")
          .forEach((process) => {
            const steps = process.querySelectorAll("[data-nexa-step]");
            gsap.fromTo(
              process,
              { "--nexa-progress": 0 },
              {
                "--nexa-progress": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: process,
                  start: "top 88%",
                  end: "bottom 62%",
                  scrub: 1.2,
                },
              },
            );
            if (!seen.has(process))
              gsap.from(steps, {
                y: 14,
                opacity: 0.4,
                duration: 0.85,
                stagger: desktop ? 0.12 : 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: process,
                  start: "top 88%",
                  once: true,
                  onEnter: () => {
                    seen.add(process);
                  },
                },
              });
          });

        if (desktop) {
          gsap.utils
            .toArray<HTMLElement>("[data-nexa-parallax]")
            .forEach((layer) => {
              const distance = Number(layer.dataset.nexaParallax || 20);
              gsap.fromTo(
                layer,
                { y: -distance * 0.5 },
                {
                  y: distance * 0.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: layer.closest("[data-nexa-depth-scene]") || layer,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.25,
                  },
                },
              );
            });
          const footer =
            document.querySelector<HTMLElement>("[data-nexa-footer]");
          if (footer)
            gsap.fromTo(
              footer,
              { y: 26, opacity: 0.7 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: footer.parentElement,
                  start: "top bottom",
                  end: "top 62%",
                  scrub: 1.1,
                },
              },
            );
        }
        return () => {
          splits.forEach((split) => split.revert());
        };
      },
    );

    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanup = gsap.utils
          .toArray<HTMLElement>("[data-nexa-magnetic]")
          .filter(stable)
          .map((button) => {
            const arrow =
              button.querySelector<HTMLElement>("[data-nexa-magnet]");
            if (!arrow) return () => {};
            const x = gsap.quickTo(arrow, "x", {
              duration: 0.45,
              ease: "power3.out",
            });
            const y = gsap.quickTo(arrow, "y", {
              duration: 0.45,
              ease: "power3.out",
            });
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const bounds = button.getBoundingClientRect();
              x(
                Math.max(
                  -5,
                  Math.min(
                    5,
                    (event.clientX - bounds.left - bounds.width / 2) * 0.065,
                  ),
                ),
              );
              y(
                Math.max(
                  -3,
                  Math.min(
                    3,
                    (event.clientY - bounds.top - bounds.height / 2) * 0.12,
                  ),
                ),
              );
            };
            const reset = () => {
              x(0);
              y(0);
            };
            button.addEventListener("pointermove", move);
            button.addEventListener("pointerleave", reset);
            button.addEventListener("pointercancel", reset);
            return () => {
              button.removeEventListener("pointermove", move);
              button.removeEventListener("pointerleave", reset);
              button.removeEventListener("pointercancel", reset);
            };
          });
        return () => {
          cleanup.forEach((dispose) => dispose());
        };
      },
    );

    ScrollTrigger.refresh();
    return () => media.revert();
  });
  return null;
}
