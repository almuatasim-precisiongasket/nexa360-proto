"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
export function SiteEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let sectionNavigation: gsap.core.Tween | undefined;
      const followSection = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        if (!(event.target instanceof Element)) return;
        const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = link?.getAttribute("href");
        if (!hash || hash.length < 2) return;
        const section = document.getElementById(hash.slice(1));
        if (!section) return;
        event.preventDefault();
        sectionNavigation?.kill();
        sectionNavigation = gsap.to(window, {
          scrollTo: {
            y: section,
            offsetY: hash === "#home" ? 0 : 74,
            autoKill: true,
          },
          duration: 1.8,
          ease: "power3.inOut",
          onComplete: () => {
            if (location.hash !== hash) history.pushState(null, "", hash);
            const focusTarget = link?.dataset.focusTarget
              ? document.getElementById(link.dataset.focusTarget)
              : section;
            if (focusTarget === section) section.tabIndex = -1;
            focusTarget?.focus({ preventScroll: true });
          },
        });
      };
      document.addEventListener("click", followSection);
      gsap.fromTo(
        ".shiny-text,.contact-layout h2 .serif-italic .reveal-word",
        { backgroundPosition: "200% center" },
        {
          backgroundPosition: "-200% center",
          duration: 4.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#contact h2",
            start: "top 85%",
            once: true,
          },
        },
      );
      gsap.from(".possibility-pixels i", {
        scale: 0,
        duration: 2.2,
        stagger: { amount: 1.8, from: "center", grid: [8, 8] },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".initiative-art",
          start: "top 85%",
          once: true,
        },
      });
      gsap.to(".initiative-orbits", {
        rotation: 28,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".initiative-art",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      // React Bits AnimatedContent adaptation: reveal each row near the viewport.
      gsap.utils.toArray<HTMLElement>(".pathway").forEach((row) => {
        gsap.from(row, {
          y: 38,
          autoAlpha: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 94%", once: true },
          clearProps: "transform,opacity,visibility",
        });
        gsap.from(
          row.querySelectorAll(".path-number,.pathway-copy,.pathway-arrow"),
          {
            y: 14,
            opacity: 0,
            duration: 1.3,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 94%", once: true },
            clearProps: "transform,opacity",
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".editorial-reveal").forEach((el) =>
        gsap.from(el, {
          y: 25,
          autoAlpha: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        }),
      );
      gsap.from(".journey-rule", {
        scaleX: 0,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: ".journey",
          start: "top 90%",
          end: "top 55%",
          scrub: true,
        },
      });
      return () => {
        sectionNavigation?.kill();
        document.removeEventListener("click", followSection);
      };
    });
    media.add(
      "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
      () => {
        const el = cursor.current!;
        const x = gsap.quickTo(el, "x", { duration: 0.16, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.16, ease: "power3" });
        const hide = () => {
          el.classList.remove("visible");
          document.body.classList.remove("custom-pointer");
        };
        const move = (event: PointerEvent) => {
          const target = event.target as HTMLElement;
          if (
            event.pointerType !== "mouse" ||
            target.closest("input,textarea,select,dialog,.brand-intro") ||
            document.querySelector("dialog[open],.brand-intro")
          ) {
            hide();
            return;
          }
          x(event.clientX);
          y(event.clientY);
          el.classList.add("visible");
          document.body.classList.add("custom-pointer");
          const mode = target.closest(".pathway")
            ? "Explore"
            : target.closest(".book-visual")
              ? "Drag"
              : target.closest("a,button")
                ? "↗"
                : "";
          el.dataset.mode = mode;
          el.textContent = mode;
          const surface = target.closest<HTMLElement>(".spotlight-surface");
          if (surface) {
            const r = surface.getBoundingClientRect();
            surface.style.setProperty(
              "--light-x",
              `${event.clientX - r.left}px`,
            );
            surface.style.setProperty(
              "--light-y",
              `${event.clientY - r.top}px`,
            );
          }
        };
        const keyboard = (e: KeyboardEvent) => {
          if (e.key === "Tab") hide();
        };
        document.addEventListener("pointermove", move, { passive: true });
        document.documentElement.addEventListener("pointerleave", hide);
        window.addEventListener("blur", hide);
        document.addEventListener("keydown", keyboard);
        const magnetCleanup = gsap.utils
          .toArray<HTMLElement>(".magnetic")
          .map((button) => {
            const inner = button.querySelector<HTMLElement>(".arrow");
            if (!inner) return () => {};
            const toX = gsap.quickTo(inner, "x", { duration: 0.3 });
            const toY = gsap.quickTo(inner, "y", { duration: 0.3 });
            const hover = (e: PointerEvent) => {
              const r = button.getBoundingClientRect();
              toX(
                Math.max(
                  -5,
                  Math.min(5, (e.clientX - r.left - r.width / 2) * 0.08),
                ),
              );
              toY(
                Math.max(
                  -4,
                  Math.min(4, (e.clientY - r.top - r.height / 2) * 0.12),
                ),
              );
            };
            const leave = () => {
              toX(0);
              toY(0);
            };
            button.addEventListener("pointermove", hover);
            button.addEventListener("pointerleave", leave);
            return () => {
              button.removeEventListener("pointermove", hover);
              button.removeEventListener("pointerleave", leave);
            };
          });
        // React Bits TiltedCard mapping, applied only to decorative art so
        // the text and clickable row stay steady. GSAP supplies eased motion.
        const tiltCleanup = gsap.utils
          .toArray<HTMLElement>(".pathway")
          .map((row) => {
            const art = row.querySelector<SVGElement>(".path-art");
            if (!art) return () => {};
            const tiltX = gsap.quickTo(art, "rotationX", {
              duration: 0.65,
              ease: "power3.out",
            });
            const tiltY = gsap.quickTo(art, "rotationY", {
              duration: 0.65,
              ease: "power3.out",
            });
            const rise = gsap.quickTo(art, "y", {
              duration: 0.65,
              ease: "power3.out",
            });
            gsap.set(art, {
              transformPerspective: 650,
              transformOrigin: "50% 50%",
            });
            const tilt = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const rect = row.getBoundingClientRect();
              const x = Math.max(
                -1,
                Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
              );
              const y = Math.max(
                -1,
                Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
              );
              tiltX(-y * 8);
              tiltY(x * 10);
              rise(-5);
            };
            const reset = () => {
              tiltX(0);
              tiltY(0);
              rise(0);
            };
            row.addEventListener("pointermove", tilt);
            row.addEventListener("pointerleave", reset);
            row.addEventListener("focusout", reset);
            return () => {
              row.removeEventListener("pointermove", tilt);
              row.removeEventListener("pointerleave", reset);
              row.removeEventListener("focusout", reset);
            };
          });
        // Aceternity WobbleCard-inspired counter-motion on decorative layers.
        const wobbleCleanup = gsap.utils
          .toArray<HTMLElement>(".initiative-art")
          .map((card) => {
            const logo = card.querySelector<SVGElement>(".brand-logo");
            const pixels = card.querySelector<HTMLElement>(
              ".possibility-pixels",
            );
            if (!logo || !pixels) return () => {};
            const logoX = gsap.quickTo(logo, "x", {
              duration: 1.2,
              ease: "power3.out",
            });
            const logoY = gsap.quickTo(logo, "y", {
              duration: 1.2,
              ease: "power3.out",
            });
            const fieldX = gsap.quickTo(pixels, "x", {
              duration: 1.4,
              ease: "power3.out",
            });
            const fieldY = gsap.quickTo(pixels, "y", {
              duration: 1.4,
              ease: "power3.out",
            });
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
              logoX(x * 8);
              logoY(y * 8);
              fieldX(-x * 12);
              fieldY(-y * 12);
            };
            const reset = () => {
              logoX(0);
              logoY(0);
              fieldX(0);
              fieldY(0);
            };
            card.addEventListener("pointermove", move, { passive: true });
            card.addEventListener("pointerleave", reset);
            window.addEventListener("blur", reset);
            return () => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", reset);
              window.removeEventListener("blur", reset);
            };
          });
        const observer = new MutationObserver(() => {
          if (document.querySelector("dialog[open],.brand-intro")) hide();
        });
        observer.observe(document.body, {
          subtree: true,
          attributes: true,
          attributeFilter: ["open"],
          childList: true,
        });
        return () => {
          hide();
          observer.disconnect();
          document.removeEventListener("pointermove", move);
          document.documentElement.removeEventListener("pointerleave", hide);
          window.removeEventListener("blur", hide);
          document.removeEventListener("keydown", keyboard);
          magnetCleanup.forEach((cleanup) => cleanup());
          tiltCleanup.forEach((cleanup) => cleanup());
          wobbleCleanup.forEach((cleanup) => cleanup());
        };
      },
    );
    return () => media.revert();
  });
  return <div ref={cursor} className="context-cursor" aria-hidden="true" />;
}
