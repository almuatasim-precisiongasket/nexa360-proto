"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./tuition-experience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const planes = [
  {
    id: "tutor",
    index: "01",
    label: "Subject tutor",
    detail: "Explain · Question · Adapt",
    x: -118,
    y: -42,
    z: 82,
    rotate: -5,
  },
  {
    id: "cards",
    index: "02",
    label: "Flashcards",
    detail: "Recall · Review · Repeat",
    x: 126,
    y: -20,
    z: 112,
    rotate: 5,
  },
  {
    id: "plan",
    index: "03",
    label: "Study plan",
    detail: "Prioritise · Schedule · Act",
    x: -92,
    y: 64,
    z: 142,
    rotate: 4,
  },
  {
    id: "progress",
    index: "04",
    label: "Progress signal",
    detail: "Observe · Understand · Guide",
    x: 112,
    y: 72,
    z: 172,
    rotate: -4,
  },
] as const;

export function LearningSystemExploded() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop:
            "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isMobile = context.conditions?.mobile;
          const layerElements = gsap.utils.toArray<HTMLElement>(
            "[data-system-plane]",
          );
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: isMobile
              ? {
                  trigger: root.current,
                  start: "top 90%",
                  end: "top 48%",
                  scrub: 0.8,
                }
              : {
                  trigger: root.current,
                  start: "top 92%",
                  end: "bottom 52%",
                  scrub: 1.45,
                },
          });

          layerElements.forEach((element, index) => {
            const plane = planes[index];
            timeline.fromTo(
              element,
              isMobile
                ? {
                    y: 28 + index * 12,
                    x: index % 2 ? 18 : -18,
                    rotate: index % 2 ? 1.2 : -1.2,
                    opacity: 0.42,
                  }
                : {
                    x: plane.x,
                    y: plane.y,
                    z: plane.z,
                    rotateZ: plane.rotate,
                    rotateX: index % 2 ? -3 : 3,
                    opacity: 0.48,
                  },
              {
                x: 0,
                y: 0,
                z: 0,
                rotate: 0,
                rotateZ: 0,
                rotateX: 0,
                opacity: 1,
              },
              index * 0.035,
            );
          });

          timeline
            .fromTo(
              ".system-connector",
              { strokeDashoffset: 1, opacity: 0.16 },
              { strokeDashoffset: 0, opacity: 0.7 },
              0.08,
            )
            .fromTo(
              ".system-core",
              isMobile
                ? { scale: 0.96, opacity: 0.72 }
                : { scale: 0.9, rotateX: 4, opacity: 0.62 },
              { scale: 1, rotateX: 0, opacity: 1 },
              0,
            )
            .fromTo(
              ".system-light",
              { xPercent: -140, opacity: 0 },
              { xPercent: 150, opacity: 0.8 },
              0.05,
            )
            .fromTo(
              ".system-progress-fill",
              { scaleX: 0.08 },
              { scaleX: 1 },
              0.16,
            );
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <figure
      id="learning-system"
      ref={root}
      tabIndex={-1}
      className={`${styles.systemExploded} ${styles.chapterTarget}`}
      aria-labelledby="learning-system-title"
    >
      <figcaption className={styles.systemHeading}>
        <div>
          <span className="kicker">THE CONNECTED LEARNING SYSTEM</span>
          <h3 id="learning-system-title">
            Four signals.
            <br />
            <em>One clear direction.</em>
          </h3>
        </div>
        <p>
          Understanding, recall, planning and progress are designed to inform
          one another—so each study session has a purpose.
        </p>
      </figcaption>

      <div className={styles.systemStage}>
        <div className={`${styles.systemCore} system-core`} aria-hidden="true">
          <span className={styles.systemCoreMark}>N</span>
          <span>NEXA / Learning companion</span>
          <i />
          <small>CONNECTED STUDY INTERFACE</small>
        </div>

        <svg
          className={styles.systemConnections}
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="system-connector"
            pathLength="1"
            d="M500 250C420 186 344 147 241 120"
          />
          <path
            className="system-connector"
            pathLength="1"
            d="M500 250C594 176 673 150 770 128"
          />
          <path
            className="system-connector"
            pathLength="1"
            d="M500 250C406 315 335 352 245 384"
          />
          <path
            className="system-connector"
            pathLength="1"
            d="M500 250C592 314 674 351 768 382"
          />
          <circle cx="500" cy="250" r="6" />
        </svg>

        <div className={styles.systemPlanes}>
          {planes.map((plane) => (
            <div
              key={plane.id}
              data-system-plane={plane.id}
              className={`${styles.systemPlane} ${styles[`systemPlane${plane.id[0].toUpperCase()}${plane.id.slice(1)}`]}`}
            >
              <span>{plane.index}</span>
              <strong>{plane.label}</strong>
              <small>{plane.detail}</small>
              <div className={styles.systemPlaneGraphic} aria-hidden="true">
                {plane.id === "tutor" && (
                  <>
                    <i />
                    <i />
                    <i />
                  </>
                )}
                {plane.id === "cards" && (
                  <>
                    <b />
                    <b />
                    <b />
                  </>
                )}
                {plane.id === "plan" && (
                  <>
                    <i />
                    <i />
                    <i />
                  </>
                )}
                {plane.id === "progress" && (
                  <>
                    <span />
                    <span />
                    <span />
                    <span />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <span className={`${styles.systemLight} system-light`} aria-hidden="true" />
      </div>

      <div className={styles.systemFooter} aria-hidden="true">
        <span>EXPLODED VIEW / SCROLL TO ASSEMBLE</span>
        <i>
          <b className="system-progress-fill" />
        </i>
        <span>01—04 / CONNECTED</span>
      </div>
    </figure>
  );
}
