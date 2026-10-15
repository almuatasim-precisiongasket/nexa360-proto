import { Logo, Arrow } from "./Logo";
import { TextReveal } from "./TextReveal";
import { Pathways } from "./Pathways";
import { Inquiry } from "./Inquiry";
import { ReplayIntro } from "./BrandIntro";
import { AmbientField } from "./AmbientField";
import { Team } from "./Team";
import { TuitionEnquiry } from "./TuitionEnquiry";
import { TuitionCommitments } from "./TuitionCommitments";
import { MovingBorder, TracingBeam } from "./AceternityEffects";
import { BackgroundBeams } from "./ui/background-beams";
import { TuitionQuestions } from "./TuitionQuestions";
function SectionLabel({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="section-label">
      <span>
        {number} / {title}
      </span>
      <span>{note}</span>
    </div>
  );
}
export function Information() {
  return (
    <>
      <section id="about" className="section about" tabIndex={-1}>
        <TracingBeam />
        <SectionLabel
          number="01"
          title="THE NEXA360 STORY"
          note="EDUCATION, WITH A HORIZON"
        />
        <div className="about-layout">
          <TextReveal
            lines={[
              "Learning is",
              "the beginning.",
              "Becoming is",
              "the journey.",
            ]}
            italicLast
          />
          <div className="about-copy editorial-reveal">
            <div className="delivery-labels">
              <span>
                <i /> LONDON TUITION
              </span>
              <span>
                <i /> ONLINE LEARNING
              </span>
            </div>
            <div className="bridge-visual" aria-hidden="true">
              <span>EDUCATION</span>
              <div>
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <span>PROFESSIONALISM</span>
            </div>
            <h3>
              A bridge between education
              <br />
              and professionalism.
            </h3>
            <p>
              NEXA360 connects academic foundations with practical skills and
              professional possibility. We provide in-person tuition in London
              and online learning.
            </p>
            <p>
              From a school subject that suddenly makes sense to a new curiosity
              about technology, every step creates room for what comes next.
            </p>
            <a href="#pathways" className="text-link">
              Find your next chapter <Arrow />
            </a>
          </div>
        </div>
        <div className="manifesto kicker">
          <span>LEARN WITH PURPOSE.</span>
          <span>GROW WITH DIRECTION.</span>
          <span>LOOK BEYOND.</span>
        </div>
      </section>
      <section id="pathways" className="section pathways-section">
        <SectionLabel
          number="02"
          title="YOUR PATHWAYS"
          note="YOUR CURIOSITY. YOUR DIRECTION."
        />
        <div className="section-head">
          <TextReveal
            lines={["What will your", "next chapter be?"]}
            italicLast
          />
          <p>
            Start where you are.
            <br />
            Build toward your ambition.
          </p>
        </div>
        <Pathways />
      </section>
      <section id="tuition" className="section tuition">
        <TracingBeam />
        <SectionLabel
          number="03"
          title="IGCSE & GCSE TUTORING"
          note="PERSONAL ATTENTION. STEADY PROGRESS."
        />
        <div className="tuition-heading">
          <TextReveal
            lines={["Understanding changes", "everything."]}
            italicLast
            effect="blur"
          />
          <p>
            One-to-one, concept-focused tutoring aligned with the syllabus.
            Guidance that meets your child where they are.
          </p>
        </div>
        <div className="delivery-grid">
          <article className="editorial-reveal delivery-card delivery-card-london">
            <MovingBorder />
            <span className="kicker">IN-PERSON TUITION</span>
            <h3>Barking, London.</h3>
            <p>
              Structured, supportive one-to-one sessions at our East London
              tuition centre.
            </p>
            <div className="format-drawing" aria-hidden="true">
              <svg viewBox="0 0 360 130" fill="none">
                <g stroke="currentColor">
                  <path d="M70 112V48l80-30 80 30v64M55 112h190M150 18v94M75 66h150M93 77h20v35m74-35h20v35M128 79h44v33M108 54V42m84 12V42" />
                  <path
                    d="M255 112V65h40v47m-30-37h20m-20 12h20"
                    opacity=".35"
                  />
                </g>
              </svg>
            </div>
            <TuitionEnquiry format="In person — Barking, London">
              Enquire about London tuition
            </TuitionEnquiry>
          </article>
          <article className="editorial-reveal delivery-card delivery-card-online">
            <MovingBorder />
            <span className="kicker">LEARN FROM HOME</span>
            <h3>Online tuition.</h3>
            <p>
              Interactive sessions with personalised lesson plans, real-time
              explanations and steady progress tracking.
            </p>
            <div className="format-drawing" aria-hidden="true">
              <svg viewBox="0 0 360 130" fill="none">
                <g stroke="currentColor">
                  <rect x="85" y="19" width="185" height="90" rx="4" />
                  <path d="M75 119h205M160 109v10m35-10v10M98 32h77v63H98zM190 45h60m-60 15h47m-47 15h60m-60 15h35" />
                  <circle cx="136" cy="53" r="10" />
                  <path d="M116 84c0-26 40-26 40 0" />
                </g>
              </svg>
            </div>
            <TuitionEnquiry format="Online tuition">
              Enquire about online tuition
            </TuitionEnquiry>
          </article>
        </div>
        <TuitionCommitments />
        <TuitionQuestions />
        <div className="tuition-next-step">
          <p>Tell us your preferred format, subjects and learning goals.</p>
          <TuitionEnquiry interactive className="tuition-enquiry-link">
            Discuss your child’s learning
          </TuitionEnquiry>
        </div>
      </section>
      <section id="team" className="section team-section">
        <BackgroundBeams className="team-background-beams" />
        <SectionLabel
          number="04"
          title="MEET OUR TEAM"
          note="THE PEOPLE AT NEXA360"
        />
        <div className="section-head">
          <TextReveal lines={["Meet our", "team."]} italicLast />
        </div>
        <Team />
      </section>
      <section id="initiatives" className="section initiatives ambient-section">
        <AmbientField />
        <SectionLabel
          number="05"
          title="IDEAS IN ACTION"
          note="LEARNING MADE MEANINGFUL"
        />
        <div className="section-head">
          <TextReveal
            lines={["Possibility.", "Put into practice."]}
            italicLast
          />
        </div>
        <div className="initiative-layout">
          <div
            className="initiative-art spotlight-surface editorial-reveal"
            aria-hidden="true"
          >
            <div className="blueprint-grid" />
            <div className="possibility-pixels">
              {Array.from({ length: 64 }, (_, i) => (
                <i
                  key={i}
                  style={{ opacity: (((i * 17 + 11) % 9) + 1) / 22 }}
                />
              ))}
            </div>
            <span className="kicker art-top">LONDON / ONLINE</span>
            <svg
              className="initiative-orbits"
              viewBox="0 0 500 500"
              fill="none"
            >
              <g stroke="currentColor">
                <circle cx="250" cy="250" r="170" />
                <circle cx="250" cy="250" r="210" />
                <path d="M20 250h460M250 20v460" />
              </g>
            </svg>
            <Logo />
            <span className="kicker art-bottom">EDUCATION × OPPORTUNITY</span>
            <span className="art-cross">+</span>
          </div>
          <div className="initiative-articles">
            <article className="editorial-reveal">
              <span className="kicker">01 / ACADEMIC</span>
              <h3>UK Tuition Centre</h3>
              <p>
                In-person tuition in London and online learning for school
                students, with IGCSE and GCSE support. Enquire about current
                A-Level pathways.
              </p>
              <a href="#tuition" className="text-link">
                Explore academic support <Arrow />
              </a>
            </article>
            <article className="editorial-reveal">
              <span className="kicker">02 / INDUSTRY SKILLS</span>
              <h3>Cybersecurity with Tutelr</h3>
              <p>
                A training collaboration connecting cybersecurity learning with
                practical, industry-oriented skill development.
              </p>
              <a href="#pathways" className="text-link">
                Discover the pathway <Arrow />
              </a>
            </article>
            <article className="editorial-reveal">
              <span className="kicker">03 / EDUCATIONAL INITIATIVE</span>
              <h3>Commun-E-quest</h3>
              <p>
                An educational initiative within the NEXA360 story. Get in touch
                to learn more about its focus and participation.
              </p>
              <a href="#contact" className="text-link">
                Ask about the initiative <Arrow />
              </a>
            </article>
          </div>
        </div>
      </section>
      <section
        id="collaboration"
        className="section collaboration ambient-section"
      >
        <AmbientField />
        <SectionLabel number="06" title="CONNECTIONS THAT COUNT" />
        <div className="collaboration-layout">
          <TextReveal
            lines={["Growth happens", "through connection."]}
            italicLast
            effect="blur"
          />
          <div className="collaborator editorial-reveal spotlight-surface react-border-glow">
            <span className="kicker">CYBERSECURITY TRAINING COLLABORATOR</span>
            <p className="partner-name">
              Tutelr <Arrow />
            </p>
            <p>
              Bringing practical cybersecurity learning into the NEXA360
              journey.
            </p>
            <a href="#contact" className="text-link">
              Start a conversation <Arrow />
            </a>
          </div>
        </div>
        <div className="journey">
          <i className="journey-rule" />
          {["Education", "Skills", "Exposure", "Opportunity"].map((item, i) => (
            <div key={item}>
              <span className="kicker">0{i + 1}</span>
              <p>{item}</p>
              {i < 3 && (
                <span className="journey-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="section contact ambient-section">
        <AmbientField />
        <SectionLabel
          number="07"
          title="THE NEXT CHAPTER"
          note="START WITH A CONVERSATION"
        />
        <div className="contact-layout">
          <div>
            <TextReveal
              lines={["Your next chapter", "starts here."]}
              italicLast
            />
            <p>
              Tell us what you’re curious about.
              <br />
              Let’s explore the possibilities ahead.
            </p>
            <div className="contact-flourish" aria-hidden="true">
              The future is an
              <br />
              <em className="shiny-text">open book.</em>
              <Arrow />
            </div>
          </div>
          <Inquiry />
        </div>
      </section>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <a href="#home" aria-label="NEXA360 home">
            <Logo />
          </a>
          <p>
            A bridge between education
            <br />
            and professionalism.
          </p>
          <span className="kicker">LONDON TUITION · ONLINE LEARNING</span>
        </div>
        <nav aria-label="Explore NEXA360">
          <span className="kicker">EXPLORE</span>
          <a href="#about">The NEXA360 story</a>
          <a href="#pathways">Learning pathways</a>
          <a href="#tuition">IGCSE & GCSE tutoring</a>
          <a href="#team">Meet our team</a>
          <a href="#initiatives">Our initiatives</a>
        </nav>
        <nav aria-label="Connect with NEXA360">
          <span className="kicker">CONNECT</span>
          <a href="#collaboration">Collaboration</a>
          <a href="#contact">Start a conversation ↗</a>
          <a href="#home">Back to the beginning ↑</a>
          <ReplayIntro />
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NEXA360</span>
        <span className="kicker">EVERY FUTURE BEGINS WITH A PAGE.</span>
        <a href="#contact">Your next chapter awaits ↗</a>
      </div>
    </footer>
  );
}
