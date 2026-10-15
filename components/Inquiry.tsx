"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { interests } from "@/lib/content";
import { Arrow } from "./Logo";
import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { TuitionFormat } from "./TuitionEnquiry";
export function Inquiry() {
  const reduced = useReducedMotion();
  const [interest, setInterest] = useState("");
  const [tuitionFormat, setTuitionFormat] = useState<TuitionFormat | "">("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (draft)
      result.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      });
  }, [draft]);
  useEffect(() => {
    const receive = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (interests.includes(value)) setInterest(value);
    };
    const tuition = (event: Event) => {
      const format = (event as CustomEvent<string>).detail;
      setInterest("Academic tuition");
      setTuitionFormat(
        format === "In person — Barking, London" || format === "Online tuition"
          ? format
          : "",
      );
    };
    window.addEventListener("nexa:interest", receive);
    window.addEventListener("nexa:tuition", tuition);
    return () => {
      window.removeEventListener("nexa:interest", receive);
      window.removeEventListener("nexa:tuition", tuition);
    };
  }, []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const text = form.elements.namedItem("message") as HTMLTextAreaElement;
    name.setCustomValidity(name.value.trim() ? "" : "Please enter your name.");
    text.setCustomValidity(
      text.value.trim() ? "" : "Please tell us a little about your inquiry.",
    );
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    setDraft(
      `NEXA360 — Inquiry\n\nName: ${String(values.get("name")).trim()}\nEmail: ${String(values.get("email")).trim()}\nArea of interest: ${interest}${interest === "Academic tuition" ? `\nPreferred lesson format: ${tuitionFormat || "Please advise me"}` : ""}\n\n${message.trim()}\n\nPlease share the current options, availability and next steps.`,
    );
    setStatus("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Copied. Ready to share.");
    } catch {
      setStatus(
        "Copy is unavailable here. You can download the draft instead.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "NEXA360-inquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setStatus("Draft downloaded. It has not been sent.");
  }
  return (
    <form className="inquiry" onSubmit={prepare}>
      <fieldset className="inquiry-fields" disabled={!interactive}>
        <legend className="sr-only">Prepare an inquiry draft</legend>
        <div className="inquiry-heading kicker">
          <span>A LITTLE ABOUT YOU</span>
          <span>YOUR NEXT STEP ↗</span>
        </div>
        <label htmlFor="inquiry-name">Your name</label>
        <input
          id="inquiry-name"
          name="name"
          autoComplete="name"
          placeholder="How should we address you?"
          maxLength={120}
          required
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
        <label htmlFor="inquiry-email">Email address</label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
        />
        <label htmlFor="inquiry-interest">Your area of interest</label>
        <select
          id="inquiry-interest"
          name="interest"
          value={interest}
          required
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="">Choose your next chapter</option>
          {interests.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        {interest === "Academic tuition" && (
          <>
            <label htmlFor="inquiry-format">Preferred lesson format</label>
            <select
              id="inquiry-format"
              name="tuition-format"
              value={tuitionFormat}
              onChange={(event) =>
                setTuitionFormat(event.target.value as TuitionFormat | "")
              }
            >
              <option value="">Please advise me</option>
              <option>In person — Barking, London</option>
              <option>Online tuition</option>
            </select>
          </>
        )}
        <div className="message-label">
          <label htmlFor="inquiry-message">A little about your ambition</label>
          <span aria-hidden="true">{message.length} / 4000</span>
        </div>
        <textarea
          id="inquiry-message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            e.target.setCustomValidity("");
          }}
          maxLength={4000}
          placeholder="What would you like to explore?"
          required
          aria-describedby="inquiry-note"
        />
        <p id="inquiry-note" className="form-note">
          This creates an inquiry draft. Review it, then copy or download it to
          share. Your message is not sent from this website.
        </p>
        <button type="submit" className="button magnetic">
          Prepare your inquiry <Arrow />
        </button>
        <LazyMotion features={domAnimation} strict>
          <m.div
            ref={result}
            className="draft-result"
            hidden={!draft}
            aria-live="polite"
            initial={false}
            animate={{ opacity: draft ? 1 : 0, y: reduced || draft ? 0 : 16 }}
            transition={{
              duration: reduced ? 0 : 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>Your inquiry is ready. It has not been sent.</p>
            <pre>{draft}</pre>
            <div className="draft-actions">
              <button type="button" onClick={copy}>
                Copy inquiry
              </button>
              <button type="button" onClick={download}>
                Download draft ↗
              </button>
            </div>
            <span role="status">{status}</span>
          </m.div>
        </LazyMotion>
      </fieldset>
      <noscript>
        <p>Enable JavaScript to prepare an inquiry draft on this device.</p>
      </noscript>
    </form>
  );
}
