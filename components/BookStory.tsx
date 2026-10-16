"use client";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/lib/content";
import { readingPosition, storyFrame, clamp } from "@/lib/story";
import { useMediaQuery } from "@/lib/use-media-query";
import { Logo, Arrow } from "./Logo";
import { PathArt } from "./PathArt";
import type { StoryBridge } from "@/lib/story";
import { MOBILE_BOOK_QUERY } from "@/lib/media";
import { emitSiteEvent, onSiteEvent } from "@/lib/site-events";
const BookCanvas = dynamic(() => import("./BookCanvas"), { ssr: false });
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
export function BookStory() {
  const root = useRef<HTMLElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const bridge = useRef<StoryBridge>({ progress: 0, invalidate: () => {} });
  const navigate = useRef<(chapter: number) => void>(() => {});
  const [chapter, setChapter] = useState(0),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false),
    [illustrated, setIllustrated] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobileBook = useMediaQuery(MOBILE_BOOK_QUERY);
  useEffect(() => {
    if (!mobileBook) return;
    const tab = root.current?.querySelector<HTMLButtonElement>(
      `[data-chapter-button="${chapter}"]`,
    );
    const strip = tab?.parentElement;
    if (tab && strip)
      strip.scrollTo({
        left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
        behavior: reduced ? "instant" : "smooth",
      });
  }, [chapter, mobileBook, reduced]);
  const drag = useRef<{
    x: number;
    y: number;
    pointerId: number;
    horizontal: boolean;
  } | null>(null);
  useEffect(() => {
    return onSiteEvent("nexa:book-fallback", () => setIllustrated(true));
  }, []);
  const onReady = useCallback(() => {
      setReady(true);
      emitSiteEvent("nexa:book-ready");
    }, []),
    onFailure = useCallback(() => {
      setFailed(true);
      setReady(false);
      emitSiteEvent("nexa:book-ready");
    }, []);
  useGSAP(
    (_, contextSafe) => {
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
          mobile: MOBILE_BOOK_QUERY,
        },
        (context) => {
          const isReduced = context.conditions?.reduced;
          let current = -1;
          let navigation: gsap.core.Tween | undefined;
          const update = () => {
            const frame = storyFrame(bridge.current.progress);
            if (current !== frame.chapter) {
              current = frame.chapter;
              setChapter(current);
            }
            stage.current?.style.setProperty(
              "--story-progress",
              String(frame.progress / 7),
            );
            stage.current?.setAttribute(
              "data-turning",
              String(
                frame.turn > 0 ||
                  (frame.opening > 0 && frame.opening < 1) ||
                  frame.closing > 0,
              ),
            );
            bridge.current.invalidate();
          };
          if (isReduced) {
            bridge.current.progress = readingPosition(
              Math.max(0, storyFrame(bridge.current.progress).chapter),
            );
            update();
            navigate.current = contextSafe!((n: number) => {
              navigation?.kill();
              bridge.current.progress = readingPosition(clamp(n, 0, 6));
              update();
            });
            return () => {
              navigation?.kill();
            };
          }
          bridge.current.progress = 0;
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "nexa-book",
              trigger: root.current,
              pin: stage.current,
              start: "top top",
              // Give every spread a generous reading pause before its page turn.
              end: () =>
                `+=${(stage.current?.clientHeight ?? window.innerHeight) * (context.conditions?.mobile ? 9 : window.innerWidth < 900 ? 14 : 16)}`,
              scrub: context.conditions?.mobile ? 0.65 : 1.25,
              snap: context.conditions?.mobile
                ? {
                    snapTo: [
                      0,
                      ...chapters
                        .slice(1)
                        .map((_, i) => readingPosition(i + 1) / 7),
                      1,
                    ],
                    duration: { min: 0.35, max: 0.75 },
                    delay: 0.2,
                    inertia: false,
                    ease: "power2.inOut",
                  }
                : undefined,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          timeline.fromTo(
            bridge.current,
            { progress: 0 },
            { progress: 7, duration: 7, ease: "none", onUpdate: update },
          );
          navigate.current = contextSafe!((n: number) => {
            const trigger = timeline.scrollTrigger!;
            const target =
              trigger.start +
              (readingPosition(clamp(n, 0, 6)) / 7) *
                (trigger.end - trigger.start);
            navigation?.kill();
            navigation = gsap.to(window, {
              scrollTo: { y: target, autoKill: true },
              duration: 1.9,
              ease: "power3.inOut",
            });
          });
          let mounted = true;
          document.fonts.ready.then(() => {
            if (mounted) ScrollTrigger.refresh();
          });
          update();
          return () => {
            mounted = false;
            navigation?.kill();
          };
        },
      );
      return () => {
        media.revert();
        navigate.current = () => {};
      };
    },
    { scope: root },
  );
  useGSAP(
    () => {
      if (!reduced)
        gsap.from(
          ".story-title-line,.story-description,.story-note,.story-actions",
          {
            y: 22,
            autoAlpha: 0,
            duration: 1.4,
            stagger: 0.14,
            ease: "power3.out",
          },
        );
    },
    { scope: root, dependencies: [chapter, reduced], revertOnUpdate: true },
  );
  function skip() {
    const about = document.getElementById("about");
    about?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    about?.focus({ preventScroll: true });
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (
      start?.pointerId === event.pointerId &&
      start.horizontal &&
      Math.abs(event.clientX - start.x) > 32
    )
      navigate.current(chapter + (event.clientX < start.x ? 1 : -1));
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
  }
  const data = chapters[chapter];
  const kind = (
    [
      "academic",
      "academic",
      "competitive",
      "cyber",
      "ai",
      "robotics",
      "career",
    ] as const
  )[chapter];
  return (
    <section
      id="home"
      ref={root}
      className={`book-story ${reduced ? "reduced-story" : ""}`}
      aria-label="The Book of Becoming"
    >
      <div
        ref={stage}
        className={`story-stage chapter-${chapter}`}
        data-chapter={chapter}
      >
        <div className="stage-atmosphere" aria-hidden="true" />
        <div className="story-topline">
          <span className="kicker">
            <i /> LONDON TUITION + ONLINE LEARNING
          </span>
          <div className="story-tools">
            {!reduced && (
              <button
                type="button"
                className="illustration-toggle"
                aria-pressed={illustrated || failed}
                onClick={() => {
                  setReady(false);
                  if (failed) {
                    setFailed(false);
                    setIllustrated(false);
                  } else setIllustrated(!illustrated);
                }}
              >
                {illustrated || failed ? "3D view" : "Illustrated view"}
              </button>
            )}
            <button type="button" className="skip-story" onClick={skip}>
              Skip story <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div className="story-copy" aria-live="polite" aria-atomic="true">
          <span className="kicker chapter-kicker">{data.tag}</span>
          <h1>
            <span className="story-title-mask">
              <span className="story-title-line">{data.title}</span>
            </span>{" "}
            <span className="story-title-mask">
              <em className="story-title-line">{data.accent}</em>
            </span>
          </h1>
          <p className="story-description">{data.copy}</p>
          <p
            className={`story-note ${chapter === 4 || chapter === 5 ? "future-note" : ""}`}
          >
            {data.note}
          </p>
          <div className="story-actions">
            <a
              id="open-future"
              href={chapter === 6 ? "#contact" : "#pathways"}
              className="button magnetic"
              onClick={(event) => {
                if (chapter === 0) {
                  event.preventDefault();
                  navigate.current(1);
                } else if (data.path) {
                  event.preventDefault();
                  emitSiteEvent("nexa:open-path", data.path);
                }
              }}
            >
              {data.cta}
              <Arrow />
            </a>
            {chapter === 0 && (
              <a className="story-secondary" href="#tuition">
                Tuition & learning tools <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <div
          className={`book-visual ${ready && !failed && !reduced && !illustrated ? "book-ready" : ""}`}
          data-book-status={
            failed || reduced || illustrated
              ? "illustrated"
              : ready
                ? "ready"
                : "loading"
          }
          onPointerDownCapture={(event) => {
            if (
              !event.isPrimary ||
              event.button !== 0 ||
              (event.target as Element).closest("button,a")
            )
              return;
            drag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              y: event.clientY,
              horizontal: false,
            };
          }}
          onPointerMoveCapture={(event) => {
            if (!drag.current || drag.current.pointerId !== event.pointerId)
              return;
            const dx = event.clientX - drag.current.x,
              dy = event.clientY - drag.current.y;
            if (
              !drag.current.horizontal &&
              Math.abs(dy) > 18 &&
              Math.abs(dy) > Math.abs(dx) * 1.25
            ) {
              drag.current = null;
              return;
            }
            if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.1) {
              drag.current.horizontal = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUpCapture={release}
          onPointerCancelCapture={() => {
            drag.current = null;
          }}
          onLostPointerCapture={(event) => {
            // A child losing implicit touch capture must not cancel our swipe.
            if (event.target === event.currentTarget) drag.current = null;
          }}
        >
          <div
            className={`book-fallback ${chapter === 0 ? "fallback-cover" : ""}`}
            aria-hidden="true"
          >
            {chapter === 0 ? (
              <div className="fallback-cover-face">
                <span>NEXA360</span>
                <p>
                  The Book of
                  <br />
                  <em>Becoming</em>
                </p>
                <small>A WORLD OF POSSIBILITIES</small>
              </div>
            ) : (
              <div className="fallback-spread">
                <div>
                  <span className="kicker">NEXA360 / 0{chapter}</span>
                  <h3>
                    {data.pageTitle.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <p>{data.pageCopy.join(" ")}</p>
                </div>
                <div>
                  {chapter === 1 ? (
                    <Logo />
                  ) : chapter === 6 ? (
                    <div className="fallback-trophy">
                      <span>✦</span>
                      <strong>NEXA360</strong>
                      <small>A symbolic celebration</small>
                    </div>
                  ) : (
                    <PathArt kind={kind} />
                  )}
                </div>
              </div>
            )}
          </div>
          {!reduced && !failed && !illustrated && (
            <BookCanvas
              bridgeRef={bridge}
              onReady={onReady}
              onFailure={onFailure}
            />
          )}
          {failed && (
            <span className="book-error-note">Illustrated chapter view</span>
          )}
          {chapter > 0 && chapter < 6 && (
            <button
              type="button"
              className="page-corner"
              aria-label="Turn to next chapter"
              onClick={() => navigate.current(chapter + 1)}
            >
              ↗
            </button>
          )}
        </div>
        <div className="story-edition kicker">
          VOL. 01 <span>YOUR POSSIBILITIES</span>
        </div>
        <div className="story-reading kicker">
          <span>
            {chapter === 0
              ? "A FUTURE, WAITING TO UNFOLD."
              : "TAKE A MOMENT. MAKE IT YOURS."}
          </span>
          <span className="story-meter">
            <i />
          </span>
        </div>
        <div className="story-bottom">
          <span className="scroll-instruction kicker">
            <i />
            {reduced
              ? "CHOOSE YOUR CHAPTER"
              : mobileBook
                ? "SCROLL TO TURN · SWIPE OR TAP ARROWS"
                : "SCROLL TO TURN THE PAGE"}
          </span>
          <div
            className="chapter-navigation"
            role="group"
            aria-label="Choose a chapter"
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const n =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 6
                      : clamp(
                          chapter + (event.key === "ArrowRight" ? 1 : -1),
                          0,
                          6,
                        );
                navigate.current(n);
                root.current
                  ?.querySelector<HTMLButtonElement>(
                    `[data-chapter-button="${n}"]`,
                  )
                  ?.focus();
              }
            }}
          >
            <button
              type="button"
              className="chapter-arrow"
              aria-label="Previous chapter"
              disabled={chapter === 0}
              onClick={() => navigate.current(chapter - 1)}
            >
              ←
            </button>
            <div className="chapter-tabs">
              {chapters.map((item, i) => (
                <button
                  type="button"
                  key={item.label}
                  data-chapter-button={i}
                  className={i === chapter ? "active" : ""}
                  aria-label={`Chapter ${i}: ${item.label}`}
                  aria-pressed={i === chapter}
                  onClick={() => navigate.current(i)}
                >
                  <span>{String(i).padStart(2, "0")}</span>
                  <small>{item.label}</small>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="chapter-arrow"
              aria-label="Next chapter"
              disabled={chapter === 6}
              onClick={() => navigate.current(chapter + 1)}
            >
              →
            </button>
          </div>
          <span className="story-number">
            {String(chapter).padStart(2, "0")} <span>/ 06</span>
          </span>
        </div>
        <noscript>
          <p className="no-script-story">
            Explore all learning pathways and tuition details below.
          </p>
        </noscript>
      </div>
    </section>
  );
}
