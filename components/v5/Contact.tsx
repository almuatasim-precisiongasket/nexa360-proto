"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  courses,
  enquiryEvent,
  markets,
  type EnquiryContext,
} from "@/lib/business-content";
import { onSiteEvent } from "@/lib/site-events";
import { AmbientField } from "../AmbientField";
import { Label } from "./Shared";
import s from "./v5.module.css";
const categories = [
  "Institutional programme",
  "GCSE tuition",
  "Technical courses",
  "Product partnership",
  "Events",
  "General enquiry",
];
export function Contact() {
  const [audience, setAudience] = useState<"Institution" | "Individual">(
    "Institution",
  );
  const [values, setValues] = useState<Record<string, string>>({
    category: "Institutional programme",
    country: "United Kingdom",
  });
  const [draft, setDraft] = useState(""),
    [copyStatus, setCopyStatus] = useState("");
  const [download, setDownload] = useState("");
  const set = (key: string, value: string) => {
    setValues((old) => ({ ...old, [key]: value }));
    setDraft("");
    setCopyStatus("");
  };
  useEffect(() => {
    const receive = (context: EnquiryContext) => {
      if (context.audience) setAudience(context.audience);
      setValues((old) => ({
        ...old,
        ...Object.fromEntries(
          Object.entries(context).filter(
            ([key, value]) => key !== "audience" && typeof value === "string",
          ),
        ),
      }));
      setDraft("");
      setCopyStatus("");
    };
    const event = (e: Event) =>
      receive((e as CustomEvent<EnquiryContext>).detail || {});
    window.addEventListener(enquiryEvent, event);
    const oldInterest = onSiteEvent("nexa:interest", (interest) =>
      receive({
        audience:
          interest === "Academic tuition" ? "Individual" : "Institution",
        category:
          interest === "Academic tuition"
            ? "GCSE tuition"
            : interest.includes("Cyber")
              ? "Technical courses"
              : "General enquiry",
        programme: interest.includes("Cyber") ? "Cybersecurity" : "",
      }),
    );
    const oldFormat = onSiteEvent("nexa:tuition", (delivery) =>
      receive({
        audience: "Individual",
        category: "GCSE tuition",
        delivery: delivery.includes("Online")
          ? "Online"
          : delivery
            ? "Barking Riverside"
            : "",
      }),
    );
    const oldProgramme = onSiteEvent("nexa:programme", (p) => {
      receive({
        audience: "Individual",
        category: "GCSE tuition",
        programme: "GCSE",
        delivery: p.format.includes("Online") ? "Online" : "Barking Riverside",
      });
      setValues((old) => ({ ...old, subject: p.subject }));
    });
    return () => {
      window.removeEventListener(enquiryEvent, event);
      oldInterest();
      oldFormat();
      oldProgramme();
    };
  }, []);
  useEffect(() => {
    if (!draft) {
      setDownload("");
      return;
    }
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    setDownload(url);
    return () => URL.revokeObjectURL(url);
  }, [draft]);
  const category = values.category || "General enquiry";
  const short = ["Product partnership", "Events", "General enquiry"].includes(
    category,
  );
  const tuition = category === "GCSE tuition";
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = [
      "NEXA360 — Consultation enquiry",
      `Enquiry from: ${audience}`,
      ...Array.from(fields.entries())
        .filter(([, value]) => String(value).trim())
        .map(([key, value]) => `${key}: ${String(value).trim()}`),
    ];
    setDraft(body.join("\n"));
    setCopyStatus("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyStatus("Copied. Your enquiry has not been sent.");
    } catch {
      setCopyStatus("Copy is unavailable here. Download the enquiry instead.");
    }
  }
  function input(
    name: string,
    label: string,
    type = "text",
    required = false,
    wide = false,
  ) {
    return (
      <div className={`${s.field} ${wide ? s.wide : ""}`}>
        <label htmlFor={`v5-${name}`}>
          {label}
          {required ? " *" : ""}
        </label>
        <input
          id={`v5-${name}`}
          name={label}
          type={type}
          required={required}
          value={values[name] || ""}
          onChange={(e) => set(name, e.target.value)}
          maxLength={type === "number" ? undefined : 200}
          min={type === "number" ? 1 : undefined}
          autoComplete={
            name === "name"
              ? "name"
              : name === "email"
                ? "email"
                : name === "phone"
                  ? "tel"
                  : name === "organisation"
                    ? "organization"
                    : "off"
          }
        />
      </div>
    );
  }
  function select(
    name: string,
    label: string,
    options: readonly string[],
    required = false,
    wide = false,
  ) {
    return (
      <div className={`${s.field} ${wide ? s.wide : ""}`}>
        <label htmlFor={`v5-${name}`}>
          {label}
          {required ? " *" : ""}
        </label>
        <select
          id={`v5-${name}`}
          name={label}
          required={required}
          value={values[name] || ""}
          onChange={(e) => set(name, e.target.value)}
        >
          <option value="">Please advise me</option>
          {Array.from(
            new Set([
              ...(values[name] && !options.includes(values[name])
                ? [values[name]]
                : []),
              ...options,
            ]),
          ).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <section
      id="contact"
      className={`section ${s.section} ${s.contact}`}
      tabIndex={-1}
    >
      <AmbientField />
      <div className={s.inner}>
        <Label number="09" note="LET’S START WITH A CONVERSATION">
          CONTACT NEXA360
        </Label>
        <div className={s.contactGrid}>
          <div className="v5-reveal">
            <span className={s.eyebrow}>YOUR NEXT STEP</span>
            <h2>
              What would you
              <br />
              like to make
              <br />
              <em>possible?</em>
            </h2>
            <p>
              A school exploring robotics. A parent looking for GCSE support. An
              organisation ready to build new skills. Tell us what you have in
              mind.
            </p>
            <div className={s.contactNote}>
              <strong>Start with a free consultation.</strong>
              <p>
                Introductory sessions of up to one hour may be available for
                applicable programmes, subject to availability and scheduling.
              </p>
              <strong>Barking Riverside, London · Online</strong>
              <p>
                Programme availability, delivery and quotations are discussed
                individually.
              </p>
            </div>
          </div>
          <form className={s.form} onSubmit={prepare}>
            <div
              className={s.formTabs}
              role="group"
              aria-label="Who is enquiring?"
            >
              {(["Institution", "Individual"] as const).map((x) => (
                <button
                  key={x}
                  type="button"
                  aria-pressed={audience === x}
                  onClick={() => {
                    setAudience(x);
                    setDraft("");
                  }}
                >
                  {x === "Institution"
                    ? "An organisation"
                    : "A student or parent"}
                </button>
              ))}
            </div>
            <div className={s.fields}>
              {select("category", "Enquiry category", categories, true, true)}
              {input("name", "Contact name", "text", true)}
              {input("email", "Email", "email", true)}
              {select("country", "Country", [...markets, "Other"], true)}
              {input("phone", "Phone (optional)", "tel")}
              {audience === "Institution" &&
                input("organisation", "Organisation name", "text", true, true)}
              {!short && (
                <>
                  {audience === "Institution" &&
                    select("organisationType", "Organisation type", [
                      "School",
                      "University or college",
                      "Business",
                      "CSR or community organisation",
                      "Other",
                    ])}
                  {tuition
                    ? input(
                        "subject",
                        "Subject requirements",
                        "text",
                        false,
                        audience === "Individual",
                      )
                    : select(
                        "programme",
                        "Programme of interest",
                        courses.map((x) => x.name),
                      )}
                  {input("level", "Participant / student education level")}
                  {audience === "Institution" &&
                    input("participants", "Expected participants", "number")}
                  {select(
                    "delivery",
                    "Preferred delivery",
                    tuition
                      ? ["Barking Riverside", "Online"]
                      : [
                          "Online",
                          "In person — discuss location",
                          "Hybrid — discuss availability",
                        ],
                  )}
                  {tuition && (
                    <>
                      {select("tutor", "Preferred tutor category", [
                        "International",
                        "UK-based",
                        "Premium",
                      ])}
                      {select("format", "Preferred session format", [
                        "1:1",
                        "Small group · 1:5",
                        "Larger group · 1:20",
                      ])}
                    </>
                  )}
                  {input(
                    "schedule",
                    audience === "Institution"
                      ? "Proposed dates / schedule"
                      : "Preferred schedule",
                    "text",
                    false,
                    true,
                  )}
                </>
              )}
              {short &&
                input(
                  "programme",
                  category === "Product partnership"
                    ? "Product / partnership interest"
                    : "Topic of interest",
                  "text",
                  false,
                  true,
                )}
              <div className={`${s.field} ${s.wide}`}>
                <label htmlFor="v5-message">
                  Tell us about your requirements *
                </label>
                <textarea
                  id="v5-message"
                  name="Requirements"
                  value={values.message || ""}
                  onChange={(e) => set("message", e.target.value)}
                  required
                  maxLength={4000}
                  rows={4}
                  placeholder="Your goals, questions or anything we should know."
                />
              </div>
            </div>
            <div className={s.formSummary} aria-live="polite">
              <span>YOUR CONVERSATION</span>
              <p>
                {audience} · {category}
                {values.programme ? ` · ${values.programme}` : ""}
                {!short && values.delivery ? ` · ${values.delivery}` : ""}
              </p>
            </div>
            <p className={s.formNotice}>
              This prepares an enquiry on your device. It is not sent or stored
              by this website. You can copy or download it to share with
              NEXA360.
            </p>
            <button type="submit" className={s.cta}>
              Prepare consultation enquiry <span aria-hidden="true">↗</span>
            </button>
            {draft && (
              <div className={s.draft} aria-live="polite">
                <strong>Your enquiry is ready. It has not been sent.</strong>
                <pre>{draft}</pre>
                <div className={s.draftActions}>
                  <button type="button" onClick={copy}>
                    Copy enquiry
                  </button>
                  {download && (
                    <a href={download} download="NEXA360-consultation.txt">
                      Download enquiry ↗
                    </a>
                  )}
                </div>
                <span className={s.copyStatus} role="status">
                  {copyStatus}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
