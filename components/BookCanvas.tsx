"use client";
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createBookScene } from "@/lib/book-scene";
import { studioEnvironment } from "@/lib/book-textures";
export type StoryBridge = { progress: number; invalidate: () => void };
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
  const { size, invalidate, camera, gl } = useThree();
  const mobile = size.width < 650;
  const model = useMemo(() => createBookScene(mobile, logo), [mobile, logo]);
  const didRender = useRef(false);
  const environment = useMemo(() => studioEnvironment(), []);
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
      environment.dispose();
      canvas.removeEventListener("webglcontextlost", lost);
    };
  }, [bridgeRef, invalidate, gl, onFailure, environment]);
  useEffect(() => () => model.dispose(), [model]);
  useFrame(() => {
    const { distance, transition } = model.update(bridgeRef.current.progress);
    camera.position.set(transition * 0.35, 4.2 * distance, 8.4 * distance);
    camera.lookAt(0, 0.12, 0);
    if (!didRender.current) {
      didRender.current = true;
      onReady();
    }
  });
  return (
    <>
      <primitive object={environment} attach="environment" />
      <hemisphereLight args={["#e4f2ff", "#112643", 1.25]} />
      <directionalLight
        position={[-3, 7, 6]}
        intensity={2.5}
        color="#f5f3e9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      <directionalLight
        position={[4, 3, -3]}
        intensity={1.25}
        color="#70c8ff"
      />
      <primitive object={model.world} />
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
        dpr={[1, 1.6]}
        shadows="percentage"
        camera={{ position: [0, 4.2, 8.4], fov: 34, near: 0.1, far: 100 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        fallback={null}
        aria-label="The Book of Becoming, a three-dimensional book"
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
