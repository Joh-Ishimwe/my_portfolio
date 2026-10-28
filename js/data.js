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
  tagline: "I build reliable, data-driven systems that help organisations make informed decisions.",
  about: [
    "I'm a Software Engineering graduate from African Leadership University, specialising in Machine Learning, and a Data Engineering Apprentice at AmaliTech.",
    "I build Python and SQL pipelines that ingest, validate and load data into PostgreSQL, with data-quality checks, tests and structured logging, so the data can be trusted.",
    "My path has taken me through mechanical engineering, conservation data in Kenya and co-founding an agribusiness. Each one taught me the same thing: reliable data helps people make better decisions."
  ],
  languages: ["Kinyarwanda (native)", "English (fluent)", "French (conversational)"],
  photo: "assets/images/avatar.webp",   // swap for a real photo any time (square works best)
  avatar: "assets/images/avatar.webp",  // your AI cartoon twin (transparent background)
  cv: "assets/Josiane_Ishimwe_CV.pdf",   // TODO: export your CV as PDF and save it here
  email: "jishimwe24@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/josiane-ishimwe",
    github: "https://github.com/Joh-Ishimwe",
    medium: ""                            // optional: blog / Medium / Hashnode
  }
};

const SKILLS = {
  "Programming": ["Python", "SQL", "JavaScript", "Dart", "HTML", "CSS"],
  "Data Engineering": ["ETL/ELT", "Data modelling", "Data validation", "Airflow", "Spark/PySpark", "Kafka"],
  "Databases & Storage": ["PostgreSQL", "MySQL", "MongoDB", "MinIO"],
  "ML & Analytics": ["Pandas", "NumPy", "scikit-learn", "TensorFlow/TFLite", "Tableau", "Power BI", "Excel"],
  "Software & Tools": ["FastAPI", "REST APIs", "Docker", "Git", "GitHub Actions", "Metabase"],
  "GIS": ["ArcGIS Online", "Survey123", "EarthRanger"],
  "Cloud": ["AWS", "Google Cloud"]
};

/* Where I've worked — keep it short: newest first, one line each */
const EXPERIENCE = [
  { role: "Data Engineering Apprentice", org: "AmaliTech", place: "Kigali, Rwanda", dates: "Jun 2026 – Present",
    line: "Python & SQL pipelines into PostgreSQL with data-quality checks, testing and GitHub Actions CI/CD; practising Airflow, Spark/PySpark and Kafka." },
  { role: "Data Analyst", org: "Suyian Conservancy", place: "Rumuruti, Kenya", dates: "May 2026",
    line: "Cleaned, validated and analysed SAPA survey data to support community engagement and protected-area management." },
  { role: "Data & GIS Intern", org: "Space for Giants", place: "Nanyuki, Kenya", dates: "Jan – Apr 2026",
    line: "Analysed elephant GPS-collar data in EarthRanger; built maps and dashboards with ArcGIS Online and Tableau." },
  { role: "Co-Founder", org: "VegInn", place: "Kigali, Rwanda", dates: "Mar 2025 – Present",
    line: "Agribusiness supplying ready-to-cook vegetable packs and connecting smallholder farmers with urban markets." }
];

/* Education — short, newest first */
const EDUCATION = [
  { role: "BSc (Hons) Software Engineering, Machine Learning", org: "African Leadership University", place: "Kigali, Rwanda", dates: "2023 – 2025",
    line: "CGPA 4.30 / 5.00 · Data Engineering Foundations, Databases, Machine Learning, Systems Programming." },
  { role: "Mechanical Engineering studies (Plant Engineering)", org: "University of Rwanda, CST", place: "Kigali, Rwanda", dates: "2020 – 2023",
    line: "Engineering Mathematics, Thermodynamics, Fluid Mechanics, Machine Design (CAD), Heat Transfer." }
];

/* Achievements carousel — newest first.
   image: optional photo for the card, e.g. "assets/images/achievements/amalitech.jpg"
   (landscape works best; leave "" for a plain placeholder) */
const ACHIEVEMENTS = [
  { date: "2026", title: "AmaliTech Data Engineering Training", text: "Selected into AmaliTech's data engineering programme.", image: "", link: "" }, // TODO
  { date: "2026", title: "First production-style pipeline", text: "Shipped an ETL pipeline with retries, logging and tests.", image: "", link: "" },  // TODO
  { date: "2025", title: "Certification — TODO", text: "e.g. AWS Cloud Practitioner / Google Data Analytics.", image: "", link: "" },      // TODO
  { date: "2025", title: "Degree / Education — TODO", text: "e.g. BSc in Computer Science, University of Rwanda.", image: "", link: "" }   // TODO
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
