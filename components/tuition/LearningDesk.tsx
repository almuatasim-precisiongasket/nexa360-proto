"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/lib/use-media-query";
import styles from "./learning-desk.module.css";

const AnimatedDesk = dynamic(() => import("./RiveLearningDesk"), {
  ssr: false,
});
const labels = ["GCSE & IGCSE", "A Level", "Entrance exams"];
const captions = [
  "Build your foundation.",
  "Go deeper.",
  "Prepare for what’s next.",
];

class ArtworkBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function LearningDesk({
  programme,
  onSelect,
}: {
  programme: number;
  onSelect: (value: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    const visibility = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    preload.observe(element);
    visibility.observe(element);
    return () => {
      preload.disconnect();
      visibility.disconnect();
    };
  }, []);
  return (
    <div>
      <div ref={container} className={styles.art} aria-hidden="true">
        <div
          className={styles.poster}
          style={{
            backgroundImage: `url(/assets/rive/learning-desk-${programme}.svg)`,
          }}
        />
        {near && !reduced && (
          <ArtworkBoundary>
            <AnimatedDesk programme={programme} visible={visible} />
          </ArtworkBoundary>
        )}
      </div>
      <div
        className={styles.choices}
        role="group"
        aria-label="Explore learning pathways"
      >
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={programme === index}
            onClick={() => onSelect(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={styles.caption}>{captions[programme]}</p>
    </div>
  );
}
