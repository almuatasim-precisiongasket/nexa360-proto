export type PathwayId =
  | "academic"
  | "competitive"
  | "cyber"
  | "ai"
  | "robotics"
  | "career";
export type Pathway = {
  id: PathwayId;
  title: string;
  tag: string;
  description: string;
  detail: string;
  points: string[];
  note: string;
  interest: Interest;
  symbol: PathwayId;
};
export const pathways: Pathway[] = [
  {
    id: "academic",
    title: "A stronger foundation.",
    tag: "IGCSE & GCSE · LONDON + ONLINE",
    symbol: "academic",
    description:
      "One-to-one support. Real understanding. A little more confidence with every lesson.",
    detail:
      "Concept-focused IGCSE and GCSE tutoring aligned with the syllabus, in Barking, London and online.",
    points: [
      "Personalised lesson plans aligned to the national curriculum.",
      "Regular performance checks against targets agreed at the start.",
      "Weekly progress reports and a face-to-face parent meeting every month.",
      "Experienced, DBS-checked tutors.",
    ],
    note: "Ask about current subjects, availability and A-Level pathways. Results depend on each learner’s circumstances and effort.",
    interest: "Academic tuition",
  },
  {
    id: "competitive",
    title: "Ambition, with direction.",
    tag: "COMPETITIVE EXAM PREPARATION",
    symbol: "competitive",
    description:
      "Bring your exam goals. Build your understanding through purposeful practice.",
    detail:
      "Discuss your competitive-exam goals and the academic support currently available through NEXA360.",
    points: [
      "Identify the exam and subjects you are preparing for.",
      "Discuss learning gaps and study goals.",
      "Ask about current support and availability.",
    ],
    note: "Exam-specific programmes must be confirmed. Rankings and results are not guaranteed.",
    interest: "Competitive exam preparation",
  },
  {
    id: "cyber",
    title: "Defend what matters.",
    tag: "CYBERSECURITY · WITH TUTELR",
    symbol: "cyber",
    description:
      "Practical digital skills for a connected world. Learn to think about protection.",
    detail:
      "Cybersecurity training in collaboration with Tutelr, connecting learning with practical, industry-oriented skills.",
    points: [
      "Discover practical cybersecurity learning.",
      "Connect digital skills with professional awareness.",
      "Ask about current training options and prerequisites.",
    ],
    note: "Enquire for confirmed training details, fees and availability.",
    interest: "Cybersecurity training",
  },
  {
    id: "ai",
    title: "Intelligent possibilities.",
    tag: "ARTIFICIAL INTELLIGENCE",
    symbol: "ai",
    description:
      "Explore how intelligent systems might help us understand, create and solve.",
    detail:
      "An educational vision for connecting artificial intelligence with curiosity and creative problem-solving.",
    points: [
      "Explore intelligent systems and their possibilities.",
      "Connect technology with purposeful questions.",
      "Express interest in future educational initiatives.",
    ],
    note: "Future educational vision. An active AI course is not confirmed.",
    interest: "AI + robotics vision",
  },
  {
    id: "robotics",
    title: "Ideas into motion.",
    tag: "ROBOTICS & AUTOMATION",
    symbol: "robotics",
    description:
      "Imagine the moment an idea becomes something that moves in the real world.",
    detail:
      "A future-facing educational vision exploring engineering, robotics and automation.",
    points: [
      "Discover the relationship between design and engineering.",
      "Explore intelligent machines and automation.",
      "Express interest in future initiatives.",
    ],
    note: "Future educational vision. An active robotics course is not confirmed.",
    interest: "AI + robotics vision",
  },
  {
    id: "career",
    title: "Beyond the classroom.",
    tag: "PROFESSIONAL GROWTH",
    symbol: "career",
    description:
      "Connect what you learn with practical skills, professional awareness and possibility.",
    detail:
      "A bridge between education and professionalism, connecting learning, practical skills and industry awareness.",
    points: [
      "Build awareness of the world beyond academic study.",
      "Explore the relationship between learning and practical skills.",
      "Discuss education or industry collaboration.",
    ],
    note: "Available opportunities must be confirmed directly. Employment or placement is not guaranteed.",
    interest: "Career development",
  },
];
export const chapters = [
  {
    label: "Cover",
    tag: "UNFAIR ADVANTAGE",
    title: "Every future begins with",
    accent: "a page.",
    copy: "Academic tuition, practical technology programmes and educational innovation for learners and institutions.",
    note: "Education Without Boundaries. Skills for the Future.",
    cta: "Open your future",
    pageTitle: ["Unfair", "Advantage"],
    pageCopy: ["Your journey begins."],
    path: "",
  },
  {
    label: "Academic",
    tag: "01 / JOIN. LEARN. GROW.",
    title: "A stronger",
    accent: "beginning.",
    copy: "GCSE tuition in Barking Riverside, London and online. Discuss tutor categories, session formats and the support that fits your child.",
    note: "Start with a free tuition consultation.",
    cta: "Explore academic support",
    pageTitle: ["GCSE", "Tuition"],
    pageCopy: ["Join. Learn. Grow."],
    path: "academic",
  },
  {
    label: "Institutions",
    tag: "02 / LEARNING TOGETHER",
    title: "Shared ambition.",
    accent: "Practical learning.",
    copy: "Custom technical programmes for schools, universities, businesses and communities. Build a proposal around your learners and your goals.",
    note: "Consultation. Customisation. Delivery.",
    cta: "Explore institutional programmes",
    pageTitle: ["Learn", "Together"],
    pageCopy: ["Programmes for", "your institution."],
    path: "competitive",
  },
  {
    label: "Cyber",
    tag: "03 / CONNECTED. PROTECTED.",
    title: "Defend what",
    accent: "matters.",
    copy: "Explore security principles, modern threats and practical defence. Discuss cybersecurity programmes for students, institutions and professionals.",
    note: "A new chapter in a connected world.",
    cta: "Explore cybersecurity",
    pageTitle: ["Cybersecurity"],
    pageCopy: ["Learn to defend", "what matters."],
    path: "cyber",
  },
  {
    label: "AI",
    tag: "04 / INTELLIGENT POSSIBILITIES",
    title: "Learn to ask",
    accent: "what if.",
    copy: "Explore artificial intelligence and agentic systems through guided practical learning. Work towards developing an agentic application.",
    note: "Programme scope and availability confirmed during consultation.",
    cta: "Explore AI & Agentic AI",
    pageTitle: ["Artificial", "Intelligence"],
    pageCopy: ["Explore intelligent", "possibilities."],
    path: "ai",
  },
  {
    label: "Robotics",
    tag: "05 / IDEAS INTO MOTION",
    title: "Engineer",
    accent: "what’s next.",
    copy: "Connect engineering, electronics and programming. Work towards two guided projects, with robotics kits included in the applicable package.",
    note: "Projects, kit contents and scheduling confirmed in your proposal.",
    cta: "Explore robotics",
    pageTitle: ["Robotics"],
    pageCopy: ["Ideas into motion."],
    path: "robotics",
  },
  {
    label: "Your moment",
    tag: "06 / YOUR EFFORT. YOUR GROWTH.",
    title: "Your next chapter",
    accent: "starts here.",
    copy: "Celebrate the ambition to learn and the determination to grow. The possibilities ahead begin with your next step.",
    note: "The trophy is a symbolic celebration of growth.",
    cta: "Start your journey",
    pageTitle: ["Your", "Moment"],
    pageCopy: ["Your effort. Your growth."],
    path: "",
  },
] as const;
export const interests = [
  "Academic tuition",
  "Competitive exam preparation",
  "Cybersecurity training",
  "AI + robotics vision",
  "Career development",
  "Commun-E-quest",
  "Collaboration",
] as const;
export type Interest = (typeof interests)[number];
export function isInterest(value: unknown): value is Interest {
  return interests.some((interest) => interest === value);
}
export const tuitionFormats = [
  "In person — Barking, London",
  "Online tuition",
] as const;
export type TuitionFormat = (typeof tuitionFormats)[number];
export function isTuitionFormat(value: unknown): value is TuitionFormat {
  return tuitionFormats.some((format) => format === value);
}
