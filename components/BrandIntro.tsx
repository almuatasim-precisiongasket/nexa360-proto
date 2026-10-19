"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
import { useMediaQuery } from "@/lib/use-media-query";
import { REDUCED_MOTION_QUERY } from "@/lib/media";
import { emitSiteEvent, onSiteEvent } from "@/lib/site-events";
gsap.registerPlugin(useGSAP);
const isHomeEntry = () => !location.hash || location.hash === "#home";
// The server cannot see a URL fragment. Defaulting to a home entry caused the
// full-screen intro to briefly block every deep link until hydration completed.
const serverHomeEntry = () => false;
function subscribeEntryChange(notify: () => void) {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
  };
}
function bookIsPrepared() {
  return Boolean(
    document.querySelector(
      '[data-book-status="ready"],[data-book-status="illustrated"]',
    ),
  );
}
export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [replayed, setReplayed] = useState(false);
  const homeEntry = useSyncExternalStore(
    subscribeEntryChange,
    isHomeEntry,
    serverHomeEntry,
  );
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY);
  const active = visible && (replayed || (homeEntry && !reduced));
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const dismiss = useCallback(() => setLeaving(true), []);
  useEffect(() => {
    const replay = () => {
      previous.current = document.activeElement as HTMLElement;
      setPrepared(bookIsPrepared());
      setReplayed(true);
      setLeaving(false);
      setVisible(true);
    };
    return onSiteEvent("nexa:replay-intro", replay);
  }, []);
  useEffect(() => {
    if (!active) return;
    let minimumElapsed = false;
    let ready = bookIsPrepared();
    const complete = () => {
      if (minimumElapsed && ready) dismiss();
    };
    const receive = () => {
      ready = true;
      setPrepared(true);
      complete();
    };
    const unsubscribe = onSiteEvent("nexa:book-ready", receive);
    const minimum = setTimeout(() => {
      minimumElapsed = true;
      if (ready) setPrepared(true);
      complete();
    }, 1920);
    const maximum = setTimeout(() => {
      if (!ready) emitSiteEvent("nexa:book-fallback");
      dismiss();
    }, 7800);
    return () => {
      clearTimeout(minimum);
      clearTimeout(maximum);
      unsubscribe();
    };
  }, [active, dismiss]);
  useEffect(() => {
    if (!leaving) return;
    const exit = setTimeout(() => setVisible(false), reduced ? 0 : 720);
    return () => clearTimeout(exit);
  }, [leaving, reduced]);
  useEffect(() => {
    if (!active) return;
    previous.current ??= document.activeElement as HTMLElement;
    const content = [
      ...document.querySelectorAll<HTMLElement>(
        'header,main,footer,.skip-link,nav[aria-label="Learning chapters"]',
      ),
    ].map((element) => ({ element, inert: element.inert }));
    content.forEach(({ element }) => (element.inert = true));
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
      content.forEach(({ element, inert }) => (element.inert = inert));
      document.documentElement.style.overflow = oldOverflow;
      const target =
        previous.current?.isConnected && previous.current !== document.body
          ? previous.current
          : document.querySelector<HTMLElement>("#open-future");
      target?.focus({ preventScroll: true });
      previous.current = null;
    };
  }, [active, dismiss]);
  useGSAP(
    () => {
      if (active && !reduced) {
        if (root.current) root.current.dataset.introState = "entering";
        gsap.from(".intro-mark", {
          y: 14,
          opacity: 0.25,
          duration: 1.8,
          ease: "power3.out",
        });
        gsap.from(".intro-words", {
          y: 8,
          autoAlpha: 0,
          duration: 1.2,
          delay: 0.24,
          ease: "power3.out",
          onComplete: () => {
            if (root.current) root.current.dataset.introState = "revealed";
          },
        });
      }
    },
    { scope: root, dependencies: [active, reduced], revertOnUpdate: true },
  );
  return active ? (
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
        <span className="kicker intro-words">UNFAIR ADVANTAGE</span>
        <div className="intro-mark">
          <Logo />
        </div>
        <p className="intro-words">
          <span>Leverage</span>
          <br />
          <strong>Your Unfair Advantage</strong>
        </p>
      </div>
      <div className="intro-loading" role="status" data-ready={prepared}>
        <span className="intro-status-light" aria-hidden="true" />
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
      onClick={() => emitSiteEvent("nexa:replay-intro")}
    >
      Replay introduction ↗
    </button>
  );
}
