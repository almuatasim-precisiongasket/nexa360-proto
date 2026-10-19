"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollPageTo } from "@/lib/scroll-controller";
import { onSiteEvent } from "@/lib/site-events";
gsap.registerPlugin(ScrollTrigger);
export function Effects() {
  useEffect(() => {
    const media = gsap.matchMedia();
    let navigation: (() => void) | undefined;
    let anchorFrame = 0;
    let anchorPending = true;
    const initialHash = location.hash;
    const stopInitialAnchor = () => {
      anchorPending = false;
    };
    const navigate = (hash: string, push = true, immediate = false) => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      navigation?.();
      const done = () => {
        if (push && location.hash !== hash) history.pushState(null, "", hash);
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
      };
      const offset = ["#home", "#welcome"].includes(hash)
        ? 0
        : innerWidth <= 900
          ? 82
          : 96;
      navigation = scrollPageTo(el, {
        offset,
        duration: 1.35,
        immediate,
        onComplete: done,
      });
    };
    const click = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        !(e.target instanceof Element)
      )
        return;
      const link = e.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2 || !document.getElementById(hash.slice(1)))
        return;
      e.preventDefault();
      navigate(hash);
    };
    document.addEventListener("click", click);
    const restoreAnchor = () => {
      stopInitialAnchor();
      cancelAnimationFrame(anchorFrame);
      if (location.hash)
        anchorFrame = requestAnimationFrame(() =>
          navigate(location.hash, false, true),
        );
    };
    window.addEventListener("popstate", restoreAnchor);
    window.addEventListener("pointerdown", stopInitialAnchor, {
      passive: true,
    });
    window.addEventListener("wheel", stopInitialAnchor, { passive: true });
    window.addEventListener("keydown", stopInitialAnchor);
    const open = onSiteEvent("nexa:open-path", (path) =>
      navigate(
        path === "academic"
          ? "#tuition"
          : ["cyber", "ai", "robotics"].includes(path)
            ? "#technical"
            : "#pathways",
      ),
    );
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".v5-reveal").forEach((el) => {
        if (el.closest("[data-v5-dynamic]")) return;
        if (el.closest("[data-nexa-owned], [data-nexa-scene]")) return;
        gsap.from(el, {
          opacity: 0.35,
          y: 22,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
          clearProps: "transform,opacity",
        });
      });
      gsap.utils.toArray<SVGPathElement>(".v5-draw path").forEach((path) => {
        if (path.closest("[data-v5-dynamic]")) return;
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 90%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".v5-handoff").forEach((seam) => {
        if (seam.closest("[data-v5-dynamic]")) return;
        const beam = seam.querySelector("i"),
          svg = seam.querySelector("svg"),
          stroke = seam.querySelector(".v5-optical-stroke");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: seam,
            start: "top 98%",
            end: "top 45%",
            scrub: 1.3,
          },
        });
        if (beam)
          timeline.fromTo(
            beam,
            { scaleX: 0.1, opacity: 0 },
            {
              scaleX: 1,
              opacity: 0.8,
              ease: "none",
              duration: 1,
            },
            0,
          );
        if (svg)
          timeline.fromTo(
            svg,
            { yPercent: 18, opacity: 0.25 },
            { yPercent: -6, opacity: 1, duration: 1, ease: "none" },
            0,
          );
        if (stroke)
          timeline.fromTo(
            stroke,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1, ease: "none" },
            0,
          );
      });
    });
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const clean = gsap.utils
          .toArray<HTMLElement>("[data-v5-tilt]")
          .filter((el) => !el.closest("[data-v5-dynamic]"))
          .map((el) => {
            gsap.set(el, { transformPerspective: 1000 });
            const x = gsap.quickTo(el, "rotationX", {
                duration: 0.9,
                ease: "power3.out",
              }),
              y = gsap.quickTo(el, "rotationY", {
                duration: 0.9,
                ease: "power3.out",
              });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              x(-((e.clientY - r.top) / r.height - 0.5) * 3);
              y(((e.clientX - r.left) / r.width - 0.5) * 4);
            };
            const leave = () => {
              x(0);
              y(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            return () => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            };
          });
        return () => clean.forEach((fn) => fn());
      },
    );
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ScrollTrigger.refresh();
      if (initialHash && anchorPending && location.hash === initialHash)
        anchorFrame = requestAnimationFrame(() => {
          if (alive && anchorPending) navigate(initialHash, false, true);
        });
    });
    return () => {
      alive = false;
      clearTimeout(timer);
      observer.disconnect();
      navigation?.();
      cancelAnimationFrame(anchorFrame);
      window.removeEventListener("popstate", restoreAnchor);
      window.removeEventListener("pointerdown", stopInitialAnchor);
      window.removeEventListener("wheel", stopInitialAnchor);
      window.removeEventListener("keydown", stopInitialAnchor);
      document.removeEventListener("click", click);
      open();
      media.revert();
    };
  }, []);
  return null;
}
