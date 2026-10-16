"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Names, roles and images come only from slide 7, “Meet Our Team”.
const members = [
  {
    name: "Muhammed Yahya",
    role: "Founder/CEO",
    image: "image14.jpeg",
    position: "50% 43%",
  },
  {
    name: "Suleyman Said",
    role: "Managing Director (UK)",
    image: "image12.jpeg",
    position: "50% 25%",
  },
  {
    name: "Imran Haja Sherief",
    role: "Manager - Tuition (UK)",
    initials: "IH",
    illustrated: true,
  },
  { name: "Madan A", role: "Co-Founder/MD (India)", image: "image15.png" },
  {
    name: "Shifa Ussudoor",
    role: "HR Manager",
    initials: "SU",
    illustrated: true,
  },
];

export function Team() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".team-card-scene")
          .forEach((card, index) => {
            const timeline = gsap.timeline({
              delay: (index % 2) * 0.12,
              scrollTrigger: { trigger: card, start: "top 96%", once: true },
            });
            timeline
              .from(card, {
                y: 38,
                opacity: 0,
                duration: 1.55,
                ease: "power3.out",
                clearProps: "transform,opacity",
              })
              .from(
                card.querySelector(".team-portrait"),
                {
                  y: 22,
                  scale: 0.94,
                  rotateZ: index % 2 ? 1.4 : -1.4,
                  opacity: 0,
                  duration: 1.35,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
                0.16,
              )
              .from(
                card.querySelector(".team-card-index"),
                {
                  x: index % 2 ? 14 : -14,
                  opacity: 0,
                  duration: 1,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
                0.34,
              )
              .from(
                card.querySelector(".team-identity"),
                {
                  y: 16,
                  opacity: 0,
                  duration: 1.1,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
                0.42,
              );
          });
      });
      media.add(
        "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
        () => {
          const cleanup = gsap.utils
            .toArray<HTMLElement>(".team-card-scene")
            .map((card) => {
              const inner =
                card.querySelector<HTMLElement>(".team-card-inner")!;
              const portrait = card.querySelector<HTMLElement>(
                ".team-portrait-content",
              )!;
              gsap.set(inner, {
                transformPerspective: 1100,
                transformOrigin: "50% 50%",
              });
              const rotateX = gsap.quickTo(inner, "rotationX", {
                duration: 1,
                ease: "power3.out",
              });
              const rotateY = gsap.quickTo(inner, "rotationY", {
                duration: 1,
                ease: "power3.out",
              });
              const lift = gsap.quickTo(inner, "y", {
                duration: 1,
                ease: "power3.out",
              });
              const panX = gsap.quickTo(portrait, "x", {
                duration: 1.1,
                ease: "power3.out",
              });
              const panY = gsap.quickTo(portrait, "y", {
                duration: 1.1,
                ease: "power3.out",
              });
              const move = (event: PointerEvent) => {
                if (event.pointerType !== "mouse") return;
                const rect = card.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (event.clientX - rect.left) / rect.width),
                );
                const y = Math.max(
                  0,
                  Math.min(1, (event.clientY - rect.top) / rect.height),
                );
                inner.style.setProperty("--glare-x", `${x * 100}%`);
                inner.style.setProperty("--glare-y", `${y * 100}%`);
                inner.style.setProperty(
                  "--edge-angle",
                  `${(Math.atan2(y - 0.5, x - 0.5) * 180) / Math.PI + 90}deg`,
                );
                inner.dataset.active = "true";
                rotateX((0.5 - y) * 9);
                rotateY((x - 0.5) * 11);
                lift(-5);
                panX((x - 0.5) * 9);
                panY((y - 0.5) * 9);
              };
              const reset = () => {
                inner.dataset.active = "false";
                rotateX(0);
                rotateY(0);
                lift(0);
                panX(0);
                panY(0);
              };
              card.addEventListener("pointermove", move, { passive: true });
              card.addEventListener("pointerleave", reset);
              window.addEventListener("blur", reset);
              return () => {
                card.removeEventListener("pointermove", move);
                card.removeEventListener("pointerleave", reset);
                window.removeEventListener("blur", reset);
                delete inner.dataset.active;
                inner.style.removeProperty("--glare-x");
                inner.style.removeProperty("--glare-y");
                inner.style.removeProperty("--edge-angle");
              };
            });
          return () => cleanup.forEach((dispose) => dispose());
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div className="team-grid team-gallery" ref={root}>
      {members.map((member, index) => (
        <article
          key={member.name}
          className={`team-member team-card-scene ${index === 0 ? "team-founder" : ""}`}
        >
          <div className="team-card-inner">
            <span className="team-card-index" aria-hidden="true">
              0{index + 1}
            </span>
            <div
              className={`team-portrait ${member.illustrated ? "team-illustration" : ""} ${member.image === "image15.png" ? "team-source-circle" : ""}`}
            >
              <div className="team-portrait-content">
                {member.illustrated ? (
                  <div className="team-monogram" aria-hidden="true">
                    <span>{member.initials}</span>
                    <small>NEXA360</small>
                  </div>
                ) : (
                  <Image
                    src={`/assets/team/${member.image}`}
                    alt={member.name}
                    fill
                    sizes="(max-width: 600px) 88vw, (max-width: 900px) 42vw, 35vw"
                    style={{
                      objectFit:
                        member.image === "image15.png" ? "contain" : "cover",
                      objectPosition: member.position ?? "center",
                    }}
                  />
                )}
              </div>
              <span className="team-portrait-label" aria-hidden="true">
                NEXA360 / TEAM
              </span>
            </div>
            {index === 0 && (
              <span className="team-founder-mark" aria-hidden="true">
                NEXA360
              </span>
            )}
            <div className="team-identity">
              <span className="kicker team-role">{member.role}</span>
              <h3>{member.name}</h3>
            </div>
            <span className="team-card-glare" aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}
