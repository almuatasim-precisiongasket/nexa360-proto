"use client";
import type { ReactNode } from "react";
import {
  requestConsultation,
  type EnquiryContext,
} from "@/lib/business-content";
import s from "./v5.module.css";
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
      className={`${s.cta} ${light ? s.lightCta : ""}`}
      href="#contact"
      onClick={() => requestConsultation(context)}
    >
      {children}
      <span aria-hidden="true">↗</span>
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
    <div className={`${s.heading} v5-reveal`}>
      <span className={s.eyebrow}>{label}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
