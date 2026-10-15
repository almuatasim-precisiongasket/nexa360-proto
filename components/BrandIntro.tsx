"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
gsap.registerPlugin(useGSAP);
export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const dismiss = useCallback(() => setLeaving(true), []);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((location.hash && location.hash !== "#home") || reduced)
      setVisible(false);
    const replay = () => {
      previous.current = document.activeElement as HTMLElement;
      setLeaving(false);
      setVisible(true);
    };
    window.addEventListener("nexa:replay-intro", replay);
    return () => window.removeEventListener("nexa:replay-intro", replay);
  }, []);
  useEffect(() => {
    if (!visible) return;
    let minimumElapsed = false;
    let ready = Boolean(
      document.querySelector(
        '[data-book-status="ready"],[data-book-status="illustrated"]',
      ),
    );
    setPrepared(ready);
    const complete = () => {
      if (minimumElapsed && ready) dismiss();
    };
    const receive = () => {
      ready = true;
      setPrepared(true);
      complete();
    };
    window.addEventListener("nexa:book-ready", receive);
    const minimum = setTimeout(() => {
      minimumElapsed = true;
      complete();
    }, 1600);
    const maximum = setTimeout(() => {
      if (!ready) window.dispatchEvent(new Event("nexa:book-fallback"));
      dismiss();
    }, 6500);
    return () => {
      clearTimeout(minimum);
      clearTimeout(maximum);
      window.removeEventListener("nexa:book-ready", receive);
    };
  }, [visible, dismiss]);
  useEffect(() => {
    if (!leaving) return;
    const exit = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(exit);
  }, [leaving]);
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
    return () => {
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
      className={`brand-intro ${leaving ? "intro-leaving" : ""}`}
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
      <div className="intro-loading" role="status">
        <span>
          {prepared
            ? "Your next chapter is ready"
            : "Preparing your next chapter"}
        </span>
        <i aria-hidden="true" />
      </div>
      <noscript>
        <style>{`.brand-intro { display: none; }`}</style>
      </noscript>
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
