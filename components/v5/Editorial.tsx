import Image from "next/image";
import { markets } from "@/lib/business-content";
import { Label, SectionHead, ConsultLink } from "./Shared";
import { Sculpture } from "./Sculpture";
import { AmbientField } from "../AmbientField";
import s from "./v5.module.css";
export function Opening() {
  return (
    <section id="welcome" className={s.opening}>
      <AmbientField />
      <div className={s.openingGrid}>
        <div className={s.openingCopy}>
          <span className={s.eyebrow}>
            <i /> EDUCATION, CONNECTED. POSSIBILITY, EXPANDED.
          </span>
          <h1>
            Education
            <br />
            without
            <br />
            <em>boundaries.</em>
          </h1>
          <p>
            Skills for the Future. Expert tuition, practical technology and
            programmes that move people forward.
          </p>
          <div className={s.openingActions}>
            <a href="#pathways" className={`${s.cta} ${s.lightCta}`}>
              For institutions <span aria-hidden="true">↗</span>
            </a>
            <a href="#tuition" className={s.textLink}>
              For students & parents ↗
            </a>
          </div>
        </div>
        <Sculpture />
      </div>
      <div className={s.openingMeta}>
        <span>01 / DISCOVER YOUR NEXT CHAPTER</span>
        <a href="#home">Explore the book ↓</a>
        <a href="#about">Discover NEXA360 ↗</a>
      </div>
    </section>
  );
}
export function About({ sectionId = "about" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className={`section ${s.section} ${s.about}`}
      tabIndex={-1}
    >
      <div className={s.inner}>
        <Label number="05" note="ONE AMBITION. A WIDER HORIZON.">
          ABOUT NEXA360
        </Label>
        <div className={`${s.aboutGrid} v5-reveal`}>
          <div>
            <span className={s.eyebrow}>A CONNECTED EDUCATION COMPANY</span>
            <h2>
              About
              <br />
              <em>NEXA360.</em>
            </h2>
          </div>
          <div className={s.aboutCopy}>
            <p>
              NEXA360 is a UK-registered international education and educational
              technology company. We bring educators, industry professionals and
              technology specialists together to make learning practical and
              meaningful.
            </p>
            <p>
              Our primary focus is institutional training: programmes for
              schools, universities, businesses and communities. Alongside this,
              we offer GCSE tuition in Barking Riverside, London, and online.
            </p>
            <details className={s.values}>
              <summary>Our purpose and principles +</summary>
              <p>
                Our vision is an internationally connected learning ecosystem.
                Our mission is to deliver practical, future-oriented programmes
                through expert instruction, collaboration and responsible
                technology.
              </p>
              <p>
                Accessible opportunity. Quality instruction. Innovation.
                Practical learning. Collaboration. Responsibility.
              </p>
            </details>
            <a href="#team" className={s.textLink}>
              Meet the people behind NEXA360 ↗
            </a>
          </div>
        </div>
        <div className={`${s.markets} v5-reveal`}>
          <svg
            className={s.map}
            viewBox="0 0 500 250"
            fill="none"
            role="img"
            aria-label="Schematic international outlook: UK centre and four target online expansion markets"
          >
            <path
              d="M30 69L55 40l52-7 25 19 39 9-15 26-34 10-13 26-35-6-15-24-29-7ZM112 130l35 7 22 36-15 49-17-8-10-42ZM220 56l23-19 26 9 8 22-22 17-25-8ZM237 95l35-4 31 31-9 53-27 31-14-24-9-44-17-18ZM280 52l46-19 48 12 38 22 44 8 8 29-42 16-25-9-22 22-26-10-18 30-19-12-2-31-26-15ZM388 183l31-16 31 11 8 24-30 12-32-10Z"
              fill="#e7eef5"
              stroke="#b6cbdc"
            />
            <g className="v5-draw" stroke="#175cdb" strokeOpacity=".45">
              <path d="M241 69Q165 12 96 85M241 69Q280 30 325 122M241 69Q308 43 301 108M241 69Q295 58 297 100" />
            </g>
            {[
              [241, 69],
              [96, 85],
              [325, 122],
              [301, 108],
              [297, 100],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={i === 0 ? 7 : 4}
                  fill={i === 0 ? "#175cdb" : "#6d9ac2"}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={i === 0 ? 14 : 8}
                  stroke="#175cdb"
                  strokeOpacity=".25"
                />
              </g>
            ))}
            <text
              x="22"
              y="241"
              fontSize="8"
              fill="#6a849b"
              letterSpacing="1.5"
            >
              INTERNATIONAL OUTLOOK / SCHEMATIC
            </text>
          </svg>
          <div className={s.marketList}>
            {markets.map((market, i) => (
              <div key={market}>
                <strong>{market}</strong>
                <small>
                  {i === 0
                    ? "Operating centre · Barking Riverside"
                    : "Target market · online expansion"}
                </small>
              </div>
            ))}
            <div>
              <strong>One connected ambition.</strong>
              <small>Local collaborators as programmes develop.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Projects({
  sectionId = "initiatives",
}: {
  sectionId?: string;
}) {
  return (
    <section
      id={sectionId}
      className={`section ${s.section} ${s.projects}`}
      tabIndex={-1}
    >
      <div className={s.inner}>
        <Label number="06" note="BEYOND THE CLASSROOM">
          OUR PROJECTS
        </Label>
        <SectionHead
          label="EDUCATION IN ACTION"
          title={
            <>
              Opportunity means more
              <br />
              <em>when it reaches people.</em>
            </>
          }
        />
        <div className={`${s.projectGrid} v5-reveal`}>
          <article className={s.projectFeature}>
            <div className={s.projectPoster}>
              <span>
                India.<small>RURAL SCHOOL / EDUCATIONAL CSR</small>
              </span>
            </div>
            <div className={s.projectMeta}>
              <span>COMMUNITY EDUCATION</span>
              <span>APPROX. THREE MONTHS</span>
            </div>
            <h3>A learning initiative with a local purpose.</h3>
            <p>
              NEXA360 participated in a rural school educational initiative in
              India, supported by Dr Peer Mohammed, a senior professor at Jubail
              Industrial College in Saudi Arabia.
            </p>
            <p className={s.projectNote}>
              A fuller project account, school details, activities and
              photographs will be published as documentation becomes available.
            </p>
          </article>
          <article className={s.projectAside}>
            <span className={s.eyebrow}>INSTITUTIONAL ENGAGEMENT</span>
            <h3>
              An educational event
              <br />
              <em>at Crescent College.</em>
            </h3>
            <p>
              NEXA360 participated in an educational event at Crescent College
              in collaboration with another company. Programme details and
              supporting materials will follow.
            </p>
            <p className={s.footnote}>
              Partner, event date, participants and outcomes are being
              documented.
            </p>
            <ConsultLink
              context={{
                audience: "Institution",
                category: "Institutional programme",
                programme: "Educational outreach / CSR",
              }}
            >
              Discuss a collaboration
            </ConsultLink>
          </article>
        </div>
      </div>
    </section>
  );
}
const people = [
  { name: "Muhammed Yahya", role: "Founder/CEO", image: "image14.jpeg" },
  {
    name: "Suleyman Said",
    role: "Managing Director (UK)",
    image: "image12.jpeg",
  },
  {
    name: "Imran Haja Sherief",
    role: "Manager – Tuition (UK)",
    initials: "IH",
  },
  { name: "Madan A", role: "Co-Founder/MD (India)", image: "image15.png" },
  { name: "Shifa Ussudoor", role: "HR Manager", initials: "SU" },
];
export function People({ sectionId = "team" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className={`section ${s.section} ${s.people}`}
      tabIndex={-1}
    >
      <div className={s.inner}>
        <Label number="07" note="EDUCATION × INDUSTRY × POSSIBILITY">
          OUR PEOPLE
        </Label>
        <SectionHead
          label="MEET THE TEAM"
          title={
            <>
              Different perspectives.
              <br />
              <em>A shared ambition.</em>
            </>
          }
        />
        <div className={`${s.peopleGrid} v5-reveal`}>
          {people.map((person, i) => (
            <article className={s.person} key={person.name} data-v5-tilt>
              <span className={s.personNumber}>0{i + 1}</span>
              <div className={s.portrait}>
                {person.image ? (
                  <Image
                    src={`/assets/team/${person.image}`}
                    width={600}
                    height={700}
                    alt={person.name}
                    sizes={
                      i === 0
                        ? "(max-width: 760px) 45vw, 35vw"
                        : "(max-width: 760px) 45vw, 25vw"
                    }
                  />
                ) : (
                  <span aria-hidden="true">{person.initials}</span>
                )}
              </div>
              <div className={s.personText}>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={s.technicalLeads}>
          <div>
            <span className={s.eyebrow}>TECHNICAL PROGRAMMES</span>
            <h4>Mr Saleh / Cybersecurity & AI</h4>
            <p>
              Bringing more than 18 years of corporate experience to technical
              learning. Detailed instructor profiles will follow.
            </p>
          </div>
          <div>
            <span className={s.eyebrow}>YOUNG INNOVATION</span>
            <h4>Mr Mahib / Robotics</h4>
            <p>
              A student-led perspective on starting to build, experiment and
              explore engineering early.
            </p>
          </div>
        </div>
        <div id="collaboration" className={s.collab}>
          <span>Game programming / planned collaboration with OFGA</span>
          <span>
            Cybersecurity / existing training collaboration with Tutelr
          </span>
        </div>
      </div>
    </section>
  );
}
export function Events({ sectionId = "events" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className={`section ${s.section} ${s.events}`}
      tabIndex={-1}
    >
      <div className={s.inner}>
        <div className={`${s.eventsGrid} v5-reveal`}>
          <div>
            <span className={s.eyebrow}>08 / EVENTS & WEBINARS</span>
            <h2>
              Keep learning.
              <br />
              <em>Meet new perspectives.</em>
            </h2>
          </div>
          <div>
            <p>
              Expert conversations, practical workshops and technical
              introductions. We’re planning webinars, seminars and institutional
              events for curious minds.
            </p>
            <ConsultLink
              light
              context={{ audience: "Individual", category: "Events" }}
            >
              Ask about upcoming events
            </ConsultLink>
            <p className={s.footnote}>
              Dates, speakers and registration details will be published when
              confirmed.
            </p>
          </div>
        </div>
        <div className={s.eventTopics}>
          {[
            "Artificial intelligence",
            "Cybersecurity",
            "Robotics",
            "Machine learning",
            "Game programming",
            "Education & careers",
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
