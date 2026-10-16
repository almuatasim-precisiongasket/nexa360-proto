"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  interests,
  isInterest,
  isTuitionFormat,
  tuitionFormats,
  type Interest,
  type TuitionFormat,
} from "@/lib/content";
import { onSiteEvent, type ProgrammeEnquiry } from "@/lib/site-events";
import { Arrow } from "./Logo";
import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
export function Inquiry() {
  const reduced = useReducedMotion();
  const [interest, setInterest] = useState<Interest | "">("");
  const [tuitionFormat, setTuitionFormat] = useState<TuitionFormat | "">("");
  const [programme, setProgramme] = useState<ProgrammeEnquiry | null>(null);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setInteractive(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const result = useRef<HTMLDivElement>(null);
  const downloads = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  function clearDraft() {
    setDraft("");
    setStatus("");
  }
  useEffect(() => {
    const pending = downloads.current;
    return () => {
      pending.forEach((timer, url) => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
      });
      pending.clear();
    };
  }, []);
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
    const unsubscribeInterest = onSiteEvent("nexa:interest", (value) => {
      if (isInterest(value)) {
        setInterest(value);
        if (value !== "Academic tuition") setProgramme(null);
        clearDraft();
      }
    });
    const unsubscribeTuition = onSiteEvent("nexa:tuition", (format) => {
      setInterest("Academic tuition");
      setTuitionFormat(isTuitionFormat(format) ? format : "");
      clearDraft();
    });
    const unsubscribeProgramme = onSiteEvent("nexa:programme", (selection) => {
      setInterest("Academic tuition");
      setTuitionFormat(selection.format);
      setProgramme(selection);
      clearDraft();
    });
    return () => {
      unsubscribeInterest();
      unsubscribeTuition();
      unsubscribeProgramme();
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
    const learningDetails =
      interest === "Academic tuition"
        ? [
            `Preferred lesson format: ${tuitionFormat || "Please advise me"}`,
            ...(programme
              ? [
                  `Programme: ${programme.programme}`,
                  `Subject: ${programme.subject || "Please advise me"}`,
                  `Exam board / school: ${programme.examBoard || "Please advise me"}`,
                ]
              : []),
          ].join("\n")
        : "";
    setDraft(
      `NEXA360 — Inquiry\n\nName: ${String(values.get("name")).trim()}\nEmail: ${String(values.get("email")).trim()}\nArea of interest: ${interest}${learningDetails ? `\n${learningDetails}` : ""}\n\n${message.trim()}\n\nPlease share the current options, availability and next steps.`,
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
    document.body.append(link);
    try {
      link.click();
    } finally {
      link.remove();
    }
    const timer = setTimeout(() => {
      URL.revokeObjectURL(url);
      downloads.current.delete(url);
    }, 2000);
    downloads.current.set(url, timer);
    setStatus("Draft downloaded. It has not been sent.");
  }
  return (
    <form className="inquiry" onSubmit={prepare} onChange={clearDraft}>
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
          onChange={(e) => {
            setInterest(isInterest(e.target.value) ? e.target.value : "");
            if (e.target.value !== "Academic tuition") setProgramme(null);
          }}
        >
          <option value="">Choose your next chapter</option>
          {interests.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        {interest === "Academic tuition" && (
          <>
            {programme && (
              <div className="inquiry-programme-summary">
                <span className="kicker">YOUR PROGRAMME ENQUIRY</span>
                <p>
                  {[programme.programme, programme.subject, programme.examBoard]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setProgramme(null);
                    clearDraft();
                    requestAnimationFrame(() =>
                      document
                        .getElementById("inquiry-format")
                        ?.focus({ preventScroll: true }),
                    );
                  }}
                >
                  Remove programme selection
                </button>
              </div>
            )}
            <label htmlFor="inquiry-format">Preferred lesson format</label>
            <select
              id="inquiry-format"
              name="tuition-format"
              value={tuitionFormat}
              onChange={(event) =>
                setTuitionFormat(
                  isTuitionFormat(event.target.value) ? event.target.value : "",
                )
              }
            >
              <option value="">Please advise me</option>
              {tuitionFormats.map((format) => (
                <option key={format}>{format}</option>
              ))}
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
