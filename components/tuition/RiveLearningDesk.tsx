"use client";

import { useEffect, useRef, useState } from "react";
import {
  Rive,
  RuntimeLoader,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import styles from "./learning-desk.module.css";

RuntimeLoader.setWasmUrl("/assets/rive/rive.wasm");
RuntimeLoader.setWasmFallbackUrl(null);

export default function RiveLearningDesk({
  programme,
  visible,
}: {
  programme: number;
  visible: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const instance = useRef<Rive | null>(null);
  const remaining = useRef(2.2);
  const loaded = useRef(false);
  const current = useRef({ programme, visible });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let disposed = false;
    let firstFrame = true;
    const resize = () =>
      instance.current?.resizeDrawingSurfaceToCanvas(
        Math.min(window.devicePixelRatio || 1, 1.5),
      );
    const playback = () => {
      const rive = instance.current;
      if (!rive || !loaded.current) return;
      if (current.current.visible && !document.hidden && remaining.current > 0)
        rive.play();
      else rive.pause();
    };
    const rive = new Rive({
      canvas: element,
      src: "/assets/rive/learning-desk.riv",
      artboard: "LearningDesk",
      stateMachine: "LearningJourney",
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      autoBind: true,
      autoplay: false,
      shouldDisableRiveListeners: true,
      isTouchScrollEnabled: true,
      enableRiveAssetCDN: false,
      onLoad: () => {
        if (disposed) return;
        const value = rive.viewModelInstance?.number("programme");
        if (!value) {
          setFailed(true);
          return;
        }
        loaded.current = true;
        value.value = current.current.programme;
        resize();
        playback();
      },
      onLoadError: () => {
        if (!disposed) setFailed(true);
      },
      onPlay: () => {
        if (!disposed) element.dataset.playback = "playing";
      },
      onPause: () => {
        if (!disposed) element.dataset.playback = "paused";
      },
      onAdvance: (event) => {
        if (disposed) return;
        if (firstFrame) {
          firstFrame = false;
          setReady(true);
        }
        if (typeof event.data === "number") remaining.current -= event.data;
        if (remaining.current <= 0) rive.pause();
      },
    });
    instance.current = rive;
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    document.addEventListener("visibilitychange", playback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", playback);
      instance.current = null;
      loaded.current = false;
      rive.cleanup();
    };
  }, []);

  useEffect(() => {
    const changed = current.current.programme !== programme;
    current.current = { programme, visible };
    const rive = instance.current;
    if (changed) {
      remaining.current = Math.max(remaining.current, 1.4);
      const value = rive?.viewModelInstance?.number("programme");
      if (value) value.value = programme;
    }
    if (!rive || !loaded.current) return;
    if (visible && !document.hidden && remaining.current > 0) rive.play();
    else rive.pause();
  }, [programme, visible]);

  return (
    <div className={styles.runtime} data-ready={ready && !failed}>
      <canvas ref={canvas} />
    </div>
  );
}
