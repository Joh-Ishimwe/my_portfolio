/*
  ============================================================
  ALL YOUR CONTENT LIVES HERE.
  Edit this file only — the page (index.html) reads from it.
  Anything marked TODO is a placeholder to replace from your CV.
  ============================================================
*/
const PROFILE = {
  name: "Josiane Ishimwe",
  shortName: "Joh",
  role: "Data Engineer",
  location: "Kigali, Rwanda",
  tagline: "I build pipelines that turn messy data into something people can trust.",
  about: [
    "Hi, I'm Josiane — a data engineer in training at AmaliTech, growing from zero to production-grade one pipeline at a time.", // TODO: confirm
    "I care about the boring-but-vital stuff: clean ingestion, retries that actually work, tests, logging, and data that arrives on time.",
    "When I'm not wrangling data, I'm learning in public and documenting what I build."
  ],
  photo: "assets/images/profile.jpg",   // TODO: add your photo (square works best)
  avatar: "assets/images/avatar.png",   // TODO: your AI cartoon twin — PNG with transparent background looks best
  cv: "assets/Josiane_Ishimwe_CV.pdf",   // TODO: drop your CV PDF here
  email: "josiane.ishimwe@amalitechtraining.org",
  links: {
    linkedin: "https://www.linkedin.com/in/josiane-ishimwe",
    github: "https://github.com/",        // TODO: your GitHub URL
    medium: ""                            // optional: blog / Medium / Hashnode
  }
};

const SKILLS = {
  "Languages": ["Python", "SQL", "Bash"],
  "Data & Processing": ["Pandas", "PySpark", "dbt"],                 // TODO: confirm
  "Storage": ["PostgreSQL", "Parquet", "AWS S3"],
  "Orchestration & Tools": ["Airflow", "Docker", "Git", "GitHub Actions"],
  "Analytics": ["Power BI"]
};

/* Achievements carousel — newest first */
const ACHIEVEMENTS = [
  { date: "2026", title: "AmaliTech Data Engineering Training", text: "Selected into AmaliTech's data engineering programme.", link: "" }, // TODO
  { date: "2026", title: "First production-style pipeline", text: "Shipped an ETL pipeline with retries, logging and tests.", link: "" },  // TODO
  { date: "2025", title: "Certification — TODO", text: "e.g. AWS Cloud Practitioner / Google Data Analytics.", link: "" },      // TODO
  { date: "2025", title: "Degree / Education — TODO", text: "e.g. BSc in Computer Science, University of Rwanda.", link: "" }   // TODO
];

/* Project cards. image: put files in assets/images/ — leave "" for a generated cover */
const PROJECTS = [
  {
    title: "Weather Data Pipeline",           // TODO: replace with real projects
    summary: "Daily ingestion from a public weather API into PostgreSQL, with retry/backoff, validation and incremental loads.",
    stack: ["Python", "PostgreSQL", "Airflow", "Docker"],
    image: "",
    repo: "",
    demo: ""
  },
  {
    title: "Sales Analytics Warehouse",
    summary: "Star-schema warehouse modelled with dbt, feeding a Power BI dashboard for regional sales.",
    stack: ["SQL", "dbt", "Power BI"],
    image: "",
    repo: "",
    demo: ""
  },
  {
    title: "Data Quality Checker",
    summary: "Reusable validation layer that quarantines bad records instead of crashing the whole run.",
    stack: ["Python", "Pandas", "pytest"],
    image: "",
    repo: "",
    demo: ""
  }
];

/*
  "Ask Joh" chat — scripted answers, no AI or server needed.
  keywords: words that trigger the answer (lowercase).
*/
const CHAT = {
  botName: "JOH-bot 1.0",
  intro: "Chat with my AI cartoon twin to learn more about me",
  greeting: "Hello! My name is JOH-bot 1.0. Let's chat!",
  suggestions: ["What do you do?", "Top skills?", "Show projects", "How to contact?"],
  answers: [
    { keywords: ["do", "who", "about", "yourself", "role"], reply: () => `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}. ${PROFILE.tagline}` },
    { keywords: ["skill", "stack", "tool", "tech", "language"], reply: () => "Main stack: " + Object.values(SKILLS).flat().slice(0, 8).join(", ") + "." },
    { keywords: ["project", "work", "built", "portfolio"], reply: () => "Recent projects: " + PROJECTS.map(p => p.title).join(" · ") + ". Scroll to Projects for details!" },
    { keywords: ["experience", "job", "amalitech", "intern", "training"], reply: () => ACHIEVEMENTS[0].title + " — " + ACHIEVEMENTS[0].text },
    { keywords: ["contact", "email", "hire", "reach", "linkedin"], reply: () => `Email ${PROFILE.email} or connect on LinkedIn — links are at the bottom of the page.` },
    { keywords: ["cv", "resume"], reply: () => "You can download the CV with the button in the About section." },
    { keywords: ["hi", "hello", "hey", "muraho"], reply: () => "Hello! What would you like to know?" }
  ],
  fallback: "Good question! I don't know that one yet — try asking about skills, projects or contact."
};
