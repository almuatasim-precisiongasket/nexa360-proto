"use client";
import { useEffect, useRef, useState } from "react";
import { pathways, type Pathway } from "@/lib/content";
import { Arrow } from "./Logo";
import { ServiceIllustration } from "./illustrations/ServiceIllustration";
import { FoldedCard } from "./ui/folded-card";
import { emitSiteEvent, onSiteEvent } from "@/lib/site-events";
import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
export function Pathways() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Pathway>(pathways[0]);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  function show(path: Pathway) {
    setSelected(path);
    setOpen(true);
    dialog.current?.showModal();
  }
  useEffect(() => {
    return onSiteEvent("nexa:open-path", (id) => {
      const path = pathways.find((item) => item.id === id);
      if (path) {
        setSelected(path);
        setOpen(true);
        dialog.current?.showModal();
      }
    });
  }, []);
  function inquire() {
    dialog.current?.close();
    emitSiteEvent("nexa:interest", selected.interest);
    document.getElementById("contact")?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    document.getElementById("inquiry-name")?.focus({ preventScroll: true });
  }
  return (
    <>
      <div className="pathways-list shared-pathways">
        {pathways.map((path, i) => (
          <FoldedCard key={path.id} className="pathway spotlight-surface">
            <span className="path-number">0{i + 1}</span>
            <div className="pathway-copy">
              <span className="kicker">{path.tag}</span>
              <h3>
                <button
                  type="button"
                  className="pathway-trigger"
                  aria-haspopup="dialog"
                  aria-describedby={`path-description-${path.id}`}
                  onClick={() => show(path)}
                >
                  {path.title}
                </button>
              </h3>
              <p id={`path-description-${path.id}`}>{path.description}</p>
              {["ai", "robotics"].includes(path.id) && (
                <span className="vision-label">Future educational vision</span>
              )}
              <button
                type="button"
                className="pathway-invitation"
                aria-haspopup="dialog"
                aria-label={`Explore ${path.title}`}
                onClick={() => show(path)}
              >
                Explore this pathway <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div
              className={`pathway-artwork pathway-artwork-${path.id}`}
              aria-hidden="true"
            >
              <span className="artwork-orbit" />
              <ServiceIllustration kind={path.symbol} />
              <span className="artwork-caption">NEXA360 / 0{i + 1}</span>
            </div>
            <span className="pathway-arrow">
              <Arrow />
            </span>
          </FoldedCard>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="path-dialog"
        aria-labelledby="path-title"
        aria-describedby="path-copy path-note"
        data-state={open ? "open" : "closing"}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) {
            const r = dialog.current.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              setOpen(false);
          }
        }}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Close pathway details"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <LazyMotion features={domAnimation} strict>
          <m.div
            initial={false}
            animate={{ opacity: open ? 1 : 0, y: reduced || open ? 0 : 18 }}
            transition={{
              duration: reduced ? 0 : open ? 1.35 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (!open) dialog.current?.close();
            }}
          >
            <span className="kicker">{selected.tag}</span>
            <h2 id="path-title">{selected.title}</h2>
            <p id="path-copy">{selected.detail}</p>
            <ul>
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p id="path-note" className="dialog-note">
              {selected.note}
            </p>
            <button type="button" className="button" onClick={inquire}>
              Discuss this possibility <Arrow />
            </button>
          </m.div>
        </LazyMotion>
      </dialog>
    </>
  );
}
