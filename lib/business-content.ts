export const markets = [
  "United Kingdom",
  "Saudi Arabia",
  "India",
  "United States",
  "Kuwait",
] as const;
export type EnquiryContext = {
  audience?: "Institution" | "Individual";
  category?: string;
  programme?: string;
  organisationType?: string;
  delivery?: string;
  tutor?: string;
  format?: string;
};
export const enquiryEvent = "nexa:v5-enquiry";
export function requestConsultation(context: EnquiryContext) {
  window.dispatchEvent(new CustomEvent(enquiryEvent, { detail: context }));
}
export const audiences = [
  {
    name: "Schools",
    title: "Make room for discovery.",
    description:
      "Introduce your students to the technologies shaping their world. Build a programme around their age, curiosity and learning goals.",
    examples: [
      "AI & robotics introductions",
      "Guided practical projects",
      "Year-group workshops",
    ],
    code: "SCH",
  },
  {
    name: "Universities & colleges",
    title: "Connect theory with practice.",
    description:
      "Bring industry perspectives into academic learning through technical workshops, expert seminars and guided project programmes.",
    examples: [
      "Technical workshops",
      "Industry expert seminars",
      "Project-led programmes",
    ],
    code: "UNI",
  },
  {
    name: "Businesses",
    title: "Build capability together.",
    description:
      "Discuss technical development and awareness programmes shaped around your people, their experience and your organisation’s objectives.",
    examples: [
      "Cybersecurity awareness",
      "AI & agentic applications",
      "Technical development",
    ],
    code: "BIZ",
  },
  {
    name: "CSR & community",
    title: "Take opportunity further.",
    description:
      "Collaborate on educational outreach that gives learners and communities a practical introduction to technology.",
    examples: [
      "Educational outreach",
      "Community workshops",
      "School collaborations",
    ],
    code: "CSR",
  },
] as const;
export const courses = [
  {
    id: "cyber",
    name: "Cybersecurity",
    eyebrow: "Think critically. Protect confidently.",
    description:
      "Understand modern threats, security principles and the practices that help protect a connected world.",
    outcome: "Explore threats, defence and security practice.",
    leader: "Led by Mr Saleh",
    detail:
      "For school students, university learners and professionals, subject to programme level. Curriculum, practical activities and duration are confirmed during consultation.",
    art: "cyber",
    tags: ["Security principles", "Threat awareness", "Practical thinking"],
  },
  {
    id: "ai",
    name: "AI & Agentic AI",
    eyebrow: "From understanding to application.",
    description:
      "Explore intelligent systems and work towards developing an agentic AI application through a guided practical project.",
    outcome: "Work towards your own guided agentic application.",
    leader: "Led by Mr Saleh",
    detail:
      "Levels, prerequisites, project scope and duration are agreed for the selected programme. Available for individual and institutional enquiries.",
    art: "ai",
    tags: ["AI foundations", "Agentic systems", "Guided project"],
  },
  {
    id: "robotics",
    name: "Robotics",
    eyebrow: "Curiosity, made tangible.",
    description:
      "Connect engineering, electronics and programming as you work towards two guided robotics projects.",
    outcome: "Build, experiment and work towards two projects.",
    leader: "Programme lead: Mr Mahib",
    detail:
      "Core robotics kits are included in the applicable package. Kit contents, project specifications, levels and scheduling are confirmed with your proposal.",
    art: "robotics",
    tags: ["Engineering", "Programming", "Hands-on learning"],
  },
  {
    id: "game",
    name: "Game Programming",
    eyebrow: "Make something worth playing.",
    description:
      "Turn an idea into a small playable world, combining creativity, logic and the fundamentals of programming.",
    outcome: "Work towards creating your first playable game.",
    leader: "Planned collaboration with OFGA",
    detail:
      "The programme is adapted to educational level and prior programming experience. Syllabus, instructors, duration and collaboration details are being finalised.",
    art: null,
    tags: ["Creative coding", "Game logic", "Playable project"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    eyebrow: "Find the patterns. Ask better questions.",
    description:
      "Discover how machines learn from data, recognise patterns and make predictions through structured instruction and practical activities.",
    outcome: "Explore how data becomes a useful prediction.",
    leader: "Instructor to be announced",
    detail:
      "The curriculum and practical project will be shaped for the participant level. Enquire to discuss programme scope, instructor availability and delivery.",
    art: null,
    tags: ["Data patterns", "Prediction", "Applied concepts"],
  },
] as const;
export const processSteps = [
  "Consultation",
  "Proposal",
  "Customisation",
  "Delivery",
  "Review",
];
export const processCopy = [
  "Start with your goals.",
  "Shape the right programme.",
  "Agree the detail together.",
  "Learn in the agreed format.",
  "Reflect on the outcomes.",
];
