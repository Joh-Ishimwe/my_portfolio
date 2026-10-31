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
  avatar: "assets/images/avatar.webp",  // still image: shown until the video loads, or if it can't play
  avatarVideo: "assets/avatar.mp4",     // looping video of your cartoon twin
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
  { date: "Oct 2026", title: "AWS Certified Cloud Practitioner", text: "Certified in AWS cloud fundamentals: core services, security, pricing and architecture.", image: "", link: "" },
  { date: "Jun 2026", title: "Data Engineering Apprentice, AmaliTech", text: "Joined AmaliTech to build production-style data pipelines.", image: "", link: "" },
  { date: "Apr 2026", title: "Protected Area Technician, WILDLABS", text: "Protected Area Technician certification from WILDLABS.", image: "", link: "" },
  { date: "Dec 2025", title: "BSc Software Engineering, ALU", text: "Graduated with a Machine Learning specialisation, CGPA 4.30 / 5.00.", image: "", link: "" },
  { date: "Nov 2025", title: "TractorCare capstone", text: "Predictive maintenance app that listens to tractor engine sounds to flag problems.", image: "", link: "" },
  { date: "Nov 2024", title: "Professional Scrum Master I", text: "Scrum.org certification in agile delivery and Scrum.", image: "", link: "" },
  { date: "Jun 2024", title: "SheCanCode, Igire Rwanda", text: "Completed the SheCanCode programme for women in tech.", image: "", link: "" },
  { date: "Mar 2023", title: "Aspire Leaders Programme", text: "Completed the Aspire Leaders Programme with Aspire Institute.", image: "", link: "" }
];

/* Project cards. image: put files in assets/images/ — leave "" for a generated cover */
const PROJECTS = [
  {
    title: "PostgreSQL data pipelines",
    summary: "Python and SQL pipelines that ingest, transform, validate and load data into PostgreSQL, with schema checks, row-level rules, structured logging and CI tests. Built during my AmaliTech apprenticeship.",
    stack: ["Python", "SQL", "PostgreSQL", "Airflow", "GitHub Actions"],
    image: "",
    repo: "",   // TODO: link a public repo if you have one
    demo: ""
  },
  {
    title: "TractorCare",
    summary: "Predictive maintenance system that classifies tractor engine sounds to spot problems early. MFCC audio features + TensorFlow model, FastAPI backend, MongoDB, and a Flutter app with offline sync. Tested on 50 recordings from Kayonza.",
    stack: ["Python", "TensorFlow", "librosa", "FastAPI", "MongoDB", "Flutter"],
    image: "",
    repo: "",   // TODO
    demo: ""
  },
  {
    title: "Elephant movement analysis",
    summary: "Cleaned conservation datasets and analysed GPS-collar data to understand elephant movement, then shared it through maps, dashboards and reports for Space for Giants.",
    stack: ["EarthRanger", "ArcGIS Online", "Tableau"],
    image: "",
    repo: "",
    demo: ""
  },
  {
    title: "SAPA survey analysis",
    summary: "Prepared, cleaned and validated Social Assessment for Protected Areas survey data, then produced analyses and visuals to support Suyian Conservancy's community work.",
    stack: ["Data cleaning", "Validation", "Exploratory analysis"],
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
  greeting: "Hello! I'm Josiane's cartoon twin. Ask me anything about my work!",
  suggestions: ["What do you do?", "Do you know Airflow?", "Your projects?", "Where did you study?", "How can I contact you?"],
  /*
    How matching works (see answer() in main.js):
    - The question is split into whole words ("projects" also matches "project").
    - Each topic lists words with a weight: strong words count 3, normal 2, weak 1.
    - The topic with the highest total wins.
    - If you name a project ("TractorCare") it describes that project.
    - If you name a tool ("Spark", "GIS"), it looks it up in your skills, projects,
      jobs and certifications — this beats "generic" topics like experience.
  */
  topics: [
    { words: { hi: 2, hello: 2, hey: 2, muraho: 3, bonjour: 3, morning: 1 },
      reply: () => "Hello! What would you like to know? You can ask about my skills, projects, experience or education." },
    { words: { thanks: 3, thank: 3, cool: 1, great: 1, nice: 1 },
      reply: () => "You're welcome! Anything else you'd like to know?" },
    { words: { who: 2, yourself: 3, introduce: 3, about: 1, background: 2, summary: 2, do: 1, role: 2, currently: 2, position: 2 },
      reply: () => `I'm ${PROFILE.name}, a ${PROFILE.role} in ${PROFILE.location}. ${PROFILE.about[0]}` },
    { generic: true, words: { skill: 3, stack: 3, tools: 2, tool: 2, technologies: 3, tech: 2, programming: 3, good: 1, strongest: 2 },
      reply: () => `My core stack: ${SKILLS["Programming"].slice(0, 2).join(" and ")} for code, ${SKILLS["Data Engineering"].slice(3).join(", ")} for pipelines, and ${SKILLS["Databases & Storage"].slice(0, 2).join(", ")} for storage. The full list is on the Toolbox page.` },
    { generic: true, words: { project: 3, built: 2, build: 2, portfolio: 2, tractorcare: 3, capstone: 3, made: 1 },
      reply: () => `My projects: ${PROJECTS.map(p => p.title).join(" · ")}. You can see them on the Home page.` },
    { generic: true, words: { experience: 3, worked: 3, work: 1, job: 2, jobs: 2, internship: 3, intern: 3, amalitech: 3, career: 2, company: 2, companies: 2 },
      reply: () => "Right now I'm a " + EXPERIENCE[0].role + " at " + EXPERIENCE[0].org + ". Before that: " + EXPERIENCE.slice(1).map(x => `${x.role} at ${x.org}`).join(", ") + ". Details are on the Toolbox page." },
    { words: { education: 3, study: 3, studied: 3, degree: 3, university: 3, school: 2, alu: 3, gpa: 3, cgpa: 3, graduate: 3, graduated: 3 },
      reply: () => `I graduated from ${EDUCATION[0].org} with a ${EDUCATION[0].role} (CGPA 4.30 / 5.00). Before that, I studied Mechanical Engineering at the University of Rwanda.` },
    { words: { certification: 3, certifications: 3, certified: 3, certificate: 3, certificates: 3, scrum: 3, courses: 2 },
      reply: () => "My certifications: AWS Certified Cloud Practitioner, Professional Scrum Master I, Protected Area Technician (WILDLABS), plus the SheCanCode and Aspire Leaders programmes." },
    { words: { where: 1, based: 3, live: 3, location: 3, located: 3, country: 2, city: 2 },
      reply: () => `I'm based in ${PROFILE.location}. I've also worked in Kenya, with Space for Giants and Suyian Conservancy.` },
    { words: { remote: 4, relocate: 4, relocation: 4, available: 4, availability: 4, open: 2, opportunity: 3, opportunities: 3, freelance: 3, hiring: 2 },
      reply: () => `I'm open to data engineering opportunities. The best way to discuss one is by email: ${PROFILE.email}.` },
    { words: { why: 2, hire: 3, strengths: 3, strength: 3, unique: 2, stand: 2 },
      reply: () => "I care about the parts that make data trustworthy: validation, testing, logging and clear documentation. I also bring a mix of software engineering, machine learning and real field experience in conservation and agribusiness." },
    { words: { contact: 3, email: 3, reach: 3, linkedin: 3, github: 3, touch: 2, message: 2 },
      reply: () => `Email me at ${PROFILE.email}, or find me on LinkedIn and GitHub. The links are at the bottom of every page.` },
    { words: { cv: 3, resume: 3 },
      reply: () => "You can download my CV on the About me page." },
    { words: { languages: 2, speak: 3, french: 3, kinyarwanda: 3, english: 2 },
      reply: () => `I speak ${PROFILE.languages.join(", ")}.` },
    { words: { fun: 3, hobby: 3, hobbies: 3, free: 2, outside: 2, interests: 3, veginn: 3, business: 2, founder: 3, volunteer: 3, volunteering: 3, impact: 3, community: 2 },
      reply: () => "Outside work, I co-founded VegInn, an agribusiness connecting farmers to city markets, and I volunteer at tech events and on data projects. See the Impact page!" }
  ],
  fallback: () => `I'm not sure about that one yet. Try asking about my skills, projects, experience or education, or email me at ${PROFILE.email}.`
};

/*
  IMPACT section — what you do for others.
  Written from the CV — keep it true.
  images: put photos in assets/images/impact/ e.g. "assets/images/impact/mentoring-1.jpg"
  (empty list = placeholder tiles).
*/
const IMPACT = {
  quote: "Life's most persistent and urgent question is: What are you doing for others?",
  quoteBy: "Martin Luther King Jr.",
  story: [
    "My journey started in mechanical engineering, moved into software engineering and machine learning, and led me to data engineering.",
    "Along the way, I've used data where it matters: tracking elephant movements in Kenya, helping a conservancy understand its communities, and making sure monitoring records reflect what really happened.",
    "Outside tech, I co-founded VegInn to connect smallholder farmers with urban markets. For me, impact means building reliable systems that help organisations, and the people they serve, make better decisions across Africa."
  ],
  tagline: "Reliable data helps people make better decisions.",
  stats: [
    { value: "4", label: "volunteer roles in data & events" },
    { value: "2", label: "countries worked in: Rwanda & Kenya" },
    { value: "1", label: "agribusiness co-founded" }
  ],
  areas: [
    {
      title: "Connecting farmers to city markets",
      text: "As Co-Founder of VegInn, I work with local farmers to improve harvesting practices, reduce post-harvest waste and bring smallholder produce to urban households and supermarkets.",
      highlights: ["Fresh, ready-to-cook vegetable packs", "Less post-harvest waste for smallholder farmers"],
      images: []
    },
    {
      title: "Data for conservation",
      text: "At Space for Giants and Suyian Conservancy, I turned field data into insight for wildlife monitoring, community engagement and protected-area management.",
      highlights: ["Elephant GPS-collar analysis with EarthRanger", "Social Assessment for Protected Areas (SAPA) survey analysis"],
      images: []
    },
    {
      title: "Data volunteering for monitoring & evaluation",
      text: "With AFS Forum and SOMA Rwanda, I checked and reconciled records so evaluation teams could trust the numbers they reported.",
      highlights: ["Matched participant records with session attendance (AFS Forum, 2024)", "Verified datasets before reporting (SOMA Rwanda, 2025)"],
      images: []
    },
    {
      title: "Supporting tech communities",
      text: "I volunteer behind the scenes at tech events in Kigali, helping with setup, logistics and delegate coordination.",
      highlights: ["Deep Learning Indaba (Aug 2025)", "Silver Gara (Nov 2025)"],
      images: []
    }
  ]
};
