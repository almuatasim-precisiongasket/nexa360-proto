"use client";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createBookScene } from "@/lib/book-scene";
import { studioEnvironment } from "@/lib/book-textures";
import { useMediaQuery } from "@/lib/use-media-query";
import { MOBILE_BOOK_QUERY } from "@/lib/media";
import type { StoryBridge } from "@/lib/story";
class CanvasBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function BookScene({
  bridgeRef,
  onReady,
  onFailure,
}: {
  bridgeRef: RefObject<StoryBridge>;
  onReady: () => void;
  onFailure: () => void;
}) {
  const logo = useLoader(THREE.TextureLoader, "/assets/nexa-logo.png");
  const { size, invalidate, camera, gl, get } = useThree();
  const mobile = size.width < 650;
  const model = useRef<ReturnType<typeof createBookScene> | null>(null);
  const didRender = useRef(false);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const gaze = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, visible: true });
  useEffect(() => {
    const stage = gl.domElement.closest<HTMLElement>(".story-stage");
    if (!stage) return;
    const media = matchMedia(
      "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
    );
    const reset = () => {
      gaze.current.targetX = gaze.current.targetY = 0;
      if (gaze.current.visible && !document.hidden) invalidate();
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || document.hidden)
        return;
      const rect = stage.getBoundingClientRect();
      gaze.current.targetX = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      gaze.current.targetY = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
      if (gaze.current.visible) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      gaze.current.visible = entry.isIntersecting;
      if (entry.isIntersecting && !document.hidden) invalidate();
    });
    observer.observe(stage);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      observer.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
      media.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, [gl, invalidate]);
  useEffect(() => {
    const bridge = bridgeRef.current;
    bridge.invalidate = invalidate;
    invalidate();
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      bridge.invalidate = () => {};
      canvas.removeEventListener("webglcontextlost", lost);
    };
  }, [bridgeRef, invalidate, gl, onFailure]);
  useEffect(() => {
    // GPU resources belong to a committed scene, never to a speculative render.
    const { scene } = get();
    const ownedModel = createBookScene(mobile, logo);
    const environment = studioEnvironment();
    const previousEnvironment = scene.environment;
    model.current = ownedModel;
    didRender.current = false;
    scene.add(ownedModel.world);
    scene.environment = environment;
    invalidate();
    return () => {
      model.current = null;
      scene.remove(ownedModel.world);
      scene.environment = previousEnvironment;
      ownedModel.dispose();
      environment.dispose();
    };
  }, [mobile, logo, get, invalidate]);
  useFrame((_, delta) => {
    if (document.hidden || !gaze.current.visible || !model.current) return;
    const pointer = gaze.current;
    const smoothing = 1 - Math.exp(-Math.min(delta, 0.05) * 5);
    pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.targetX, smoothing);
    pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.targetY, smoothing);
    const { distance, transition, needsFrame } = model.current.update(
      bridgeRef.current.progress,
      delta,
    );
    // Use the resting canvas more fully, then make room for the upright leaf.
    const aspect = size.width / Math.max(1, size.height);
    // Keep the full spread inside a narrow canvas, including a raised turning leaf.
    const framing =
      (mobile ? Math.max(1, 1.12 / aspect) : aspect > 1.05 ? 0.92 : 1) *
      (1 + transition * 0.3);
    camera.position.set(
      transition * 0.35 + pointer.x * 0.12,
      4.2 * distance * framing - pointer.y * 0.08,
      8.4 * distance * framing,
    );
    camera.lookAt(0, 0.12 + transition * 0.38, 0);
    keyLight.current?.position.set(
      -3 + pointer.x * 0.7,
      7 - pointer.y * 0.4,
      6,
    );
    if (
      Math.abs(pointer.x - pointer.targetX) +
        Math.abs(pointer.y - pointer.targetY) >
        0.001 ||
      needsFrame
    )
      invalidate();
    if (!didRender.current) {
      didRender.current = true;
      onReady();
    }
  });
  return (
    <>
      <hemisphereLight args={["#e4f2ff", "#112643", 1.25]} />
      <directionalLight
        ref={keyLight}
        position={[-3, 7, 6]}
        intensity={2.1}
        color="#f5f3e9"
        castShadow
        shadow-mapSize={mobile ? [512, 512] : [1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
        shadow-normalBias={0.025}
        shadow-radius={3}
      />
      <directionalLight
        position={[4, 3, -3]}
        intensity={1.25}
        color="#70c8ff"
      />
    </>
  );
}
export default function BookCanvas({
  bridgeRef,
  onReady,
  onFailure,
}: {
  bridgeRef: RefObject<StoryBridge>;
  onReady: () => void;
  onFailure: () => void;
}) {
  const [fontsReady, setFontsReady] = useState(false);
  const mobile = useMediaQuery(MOBILE_BOOK_QUERY);
  useEffect(() => {
    let mounted = true;
    Promise.all([
      document.fonts.load('400 16px "Instrument Serif"'),
      document.fonts.load('400 16px "DM Sans"'),
      document.fonts.load('600 16px "DM Sans"'),
    ])
      .then(() => document.fonts.ready)
      .catch(() => undefined)
      .then(() => {
        if (mounted) setFontsReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return fontsReady ? (
    <CanvasBoundary onFailure={onFailure}>
      <Canvas
        frameloop="demand"
        dpr={[1, mobile ? 1.25 : 1.6]}
        shadows="percentage"
        camera={{ position: [0, 4.2, 8.4], fov: 34, near: 0.1, far: 100 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        fallback={null}
        aria-label="Unfair Advantage, a three-dimensional book"
        role="img"
      >
        <Suspense fallback={null}>
          <BookScene
            bridgeRef={bridgeRef}
            onReady={onReady}
            onFailure={onFailure}
          />
        </Suspense>
      </Canvas>
    </CanvasBoundary>
  ) : null;
}
