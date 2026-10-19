"use client";
import { useId, type ReactNode } from "react";
import {
  requestConsultation,
  type EnquiryContext,
} from "@/lib/business-content";
import s from "./v5.module.css";
export function OpticalTransition() {
  const id = useId();
  return (
    <div
      className={`${s.handoff} ${s.opticalSeam} v5-handoff`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={id}>
            <stop stopColor="#2d6baf" stopOpacity="0" />
            <stop offset=".45" stopColor="#a1d5ff" />
            <stop offset=".7" stopColor="#327bd0" />
            <stop offset="1" stopColor="#327bd0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-50 100C280 110 340 10 650 45S1100 115 1490 18"
          stroke={`url(#${id})`}
          strokeWidth="1.3"
          pathLength="1"
          className="v5-optical-stroke"
        />
        <path
          d="M-50 106C280 116 340 16 650 51S1100 121 1490 24"
          stroke={`url(#${id})`}
          opacity=".2"
          strokeWidth="8"
        />
      </svg>
      <i />
    </div>
  );
}
export function ConsultLink({
  children,
  context = {},
  light = false,
}: {
  children: ReactNode;
  context?: EnquiryContext;
  light?: boolean;
}) {
  return (
    <a
      data-nexa-magnetic
      data-nexa-support
      className={`${s.cta} ${light ? s.lightCta : ""}`}
      href="#contact"
      onClick={() => requestConsultation(context)}
    >
      {children}
      <span aria-hidden="true" data-nexa-magnet>
        ↗
      </span>
    </a>
  );
}
export function Label({
  number,
  children,
  note,
}: {
  number: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <div className={s.label}>
      <span>
        {number} / {children}
      </span>
      {note && <span>{note}</span>}
    </div>
  );
}
export function SectionHead({
  label,
  title,
  copy,
}: {
  label: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <div className={`${s.heading} v5-reveal`} data-nexa-scene>
      <span className={s.eyebrow} data-nexa-kicker>
        {label}
      </span>
      <h2 data-nexa-heading>{title}</h2>
      {copy && <p data-nexa-support>{copy}</p>}
    </div>
  );
}
