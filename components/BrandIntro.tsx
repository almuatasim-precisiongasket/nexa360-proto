"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
gsap.registerPlugin(useGSAP);
export function BrandIntro() {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem("nexa360-next-intro-v1", "1");
    } catch {}
  }, []);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("nexa360-next-intro-v1") === "1";
    } catch {}
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => {
      if (!seen && !location.hash && !reduced) setVisible(true);
    });
    const replay = () => {
      previous.current = document.activeElement as HTMLElement;
      setVisible(true);
    };
    window.addEventListener("nexa:replay-intro", replay);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("nexa:replay-intro", replay);
    };
  }, []);
  useEffect(() => {
    if (!visible) return;
    previous.current ??= document.activeElement as HTMLElement;
    const content = [
      ...document.querySelectorAll<HTMLElement>("header,main,footer"),
    ];
    content.forEach((el) => (el.inert = true));
    const oldOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    skip.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        skip.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    const timer = setTimeout(
      dismiss,
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 2800,
    );
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", key);
      content.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = oldOverflow;
      const target = previous.current?.isConnected
        ? previous.current
        : document.querySelector<HTMLElement>("#open-future");
      target?.focus({ preventScroll: true });
      previous.current = null;
    };
  }, [visible, dismiss]);
  useGSAP(
    () => {
      if (visible && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.from(".intro-mark", {
          y: 14,
          opacity: 0.25,
          duration: 1.5,
          ease: "power3.out",
        });
        gsap.from(".intro-words", {
          y: 8,
          autoAlpha: 0,
          duration: 1.3,
          delay: 0.4,
        });
      }
    },
    { scope: root, dependencies: [visible], revertOnUpdate: true },
  );
  return visible ? (
    <div
      ref={root}
      className="brand-intro"
      role="dialog"
      aria-modal="true"
      aria-label="NEXA360 introduction"
    >
      <button ref={skip} type="button" className="intro-skip" onClick={dismiss}>
        Skip intro ↗
      </button>
      <div className="intro-inner">
        <span className="kicker intro-words">THE BOOK OF BECOMING</span>
        <div className="intro-mark">
          <Logo />
        </div>
        <p className="intro-words">
          A bridge between education
          <br />
          and professionalism.
        </p>
      </div>
      <span className="intro-bottom kicker">
        LONDON TUITION · ONLINE LEARNING
      </span>
    </div>
  ) : null;
}
export function ReplayIntro() {
  return (
    <button
      type="button"
      className="footer-replay"
      onClick={() => window.dispatchEvent(new Event("nexa:replay-intro"))}
    >
      Replay introduction ↗
    </button>
  );
}
