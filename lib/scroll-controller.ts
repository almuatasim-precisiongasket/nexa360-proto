import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
type Options = { duration: number; immediate: boolean; onComplete: () => void };
type Driver = (top: number, options: Options) => () => void;
let driver: Driver | undefined;
let active: (() => void) | undefined;

export function cancelPageScroll() {
  active?.();
}

export function attachScrollDriver(next: Driver) {
  cancelPageScroll();
  driver = next;
  return () => {
    if (driver !== next) return;
    cancelPageScroll();
    driver = undefined;
  };
}

/** One owner for chapter buttons, anchors and contextual navigation. */
export function scrollPageTo(
  target: number | HTMLElement,
  options: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    onComplete?: () => void;
  } = {},
) {
  cancelPageScroll();
  let pending = true;
  let stop = () => {};
  const cancel = () => {
    if (!pending) return;
    pending = false;
    if (active === cancel) active = undefined;
    stop();
  };
  active = cancel;
  const done = () => {
    if (!pending) return;
    pending = false;
    if (active === cancel) active = undefined;
    options.onComplete?.();
  };
  const top = Math.max(
    0,
    (typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY) -
      (options.offset ?? 0),
  );
  const immediate = Boolean(
    options.immediate || matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  if (driver) {
    stop = driver(top, {
      duration: options.duration ?? 1.35,
      immediate,
      onComplete: done,
    });
  } else if (immediate) {
    window.scrollTo({ top, behavior: "instant" });
    done();
  } else {
    const tween = gsap.to(window, {
      scrollTo: { y: top, autoKill: true, onAutoKill: cancel },
      duration: options.duration ?? 1.35,
      ease: "power3.inOut",
      onComplete: done,
    });
    stop = () => {
      tween.kill();
    };
  }
  return cancel;
}
