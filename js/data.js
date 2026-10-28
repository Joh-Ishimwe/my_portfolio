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

/* Where I've worked — keep it short: newest first, one line each */
const EXPERIENCE = [
  { role: "Data Engineering Trainee", org: "AmaliTech", place: "Kigali, Rwanda", dates: "2026 – Present",   // TODO: confirm
    line: "Building production-style pipelines with Python, SQL, Airflow and Docker." },
  { role: "TODO: previous role", org: "TODO: company", place: "", dates: "20XX – 20XX",                       // TODO
    line: "One sentence on what you did and the result." }
];

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
    { keywords: ["project", "work", "built", "portfolio"], reply: () => "Recent projects: " + PROJECTS.map(p => p.title).join(" · ") + ". Scroll down to Projects for details!" },
    { keywords: ["experience", "job", "amalitech", "intern", "training"], reply: () => ACHIEVEMENTS[0].title + " — " + ACHIEVEMENTS[0].text },
    { keywords: ["contact", "email", "hire", "reach", "linkedin"], reply: () => `Email ${PROFILE.email} or connect on LinkedIn — links are at the bottom of every page.` },
    { keywords: ["cv", "resume"], reply: () => "You can download the CV on the About me page." },
    { keywords: ["hi", "hello", "hey", "muraho"], reply: () => "Hello! What would you like to know?" }
  ],
  fallback: "Good question! I don't know that one yet — try asking about skills, projects or contact."
};

/*
  IMPACT section — what you do for others.
  Every TODO is a draft written for you: change the words so they're 100% true.
  images: put photos in assets/images/impact/ e.g. "assets/images/impact/mentoring-1.jpg"
  (empty list = placeholder tiles).
*/
const IMPACT = {
  quote: "Life's most persistent and urgent question is: What are you doing for others?",
  quoteBy: "Martin Luther King Jr.",
  story: [
    // TODO: make this your real story
    "I started data engineering from zero. No shortcuts, just a lot of questions, broken pipelines and patient people who explained things to me in plain English.",
    "That's why I share what I learn. Every concept I finally understand becomes a post, a notebook or a study session for someone one step behind me.",
    "For me, good data work isn't just moving tables around. It's making information reliable enough that people can make better decisions with it."
  ],
  tagline: "Data only matters when it helps someone decide better.",
  stats: [
    // TODO: replace with your real numbers — or delete any you don't have yet
    { value: "10+", label: "peers supported in study sessions" },
    { value: "5+",  label: "tutorials & write-ups shared" },
    { value: "3",   label: "community data projects" }
  ],
  areas: [
    {
      title: "Learning in public",                       // TODO
      text: "I document everything I learn, from SQL basics to retry logic in pipelines, so beginners have a friendlier starting point than I did.",
      highlights: ["Beginner-friendly write-ups on GitHub", "Plain-English explanations of data engineering terms"],
      images: []
    },
    {
      title: "Peer mentoring at AmaliTech",              // TODO
      text: "I run and join study sessions where we debug each other's pipelines, review code and prepare for real-world tasks together.",
      highlights: ["Weekly study group", "Code reviews for fellow trainees"],
      images: []
    },
    {
      title: "Women in data & tech",                     // TODO
      text: "I want more girls in Rwanda to see data engineering as a career they can own. I share my journey and encourage others to start, even from zero.",
      highlights: ["Speaking with students about tech careers", "Encouraging women to join data communities"],
      images: []
    },
    {
      title: "Data for community good",                  // TODO
      text: "I use my skills on small projects that help local organisations organise and understand their data.",
      highlights: ["Cleaning and structuring data for local initiatives", "Simple dashboards non-technical teams can use"],
      images: []
    }
  ]
};
