"use client";

import { useRef } from "react";
import type { PathwayId } from "@/lib/content";
import { useIllustrationMotion } from "@/lib/illustration-motion";
import { PathArt } from "../PathArt";

export function ServiceIllustration({ kind }: { kind: PathwayId }) {
  const root = useRef<HTMLDivElement>(null);
  useIllustrationMotion(root);
  return (
    <div ref={root} className="service-illustration" aria-hidden="true">
      <div data-art-enter="">
        <div data-art-depth="0.8">
          <PathArt kind={kind} />
        </div>
      </div>
    </div>
  );
}
