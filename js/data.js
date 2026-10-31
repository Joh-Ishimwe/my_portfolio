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
  avatar: "assets/images/avatar-idle.webp",  // still image: shown before and after the twin answers
  avatarVideo: "assets/avatar.mp4",          // muted video: plays only while the twin is answering
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
  { date: "Oct 2026", title: "AWS Certified Cloud Practitioner", kind: "certification", text: "Certified in AWS cloud fundamentals: core services, security, pricing and architecture.", image: "", link: "" },
  { date: "Jun 2026", title: "Data Engineering Apprentice, AmaliTech", text: "Joined AmaliTech to build production-style data pipelines.", image: "", link: "" },
  { date: "Apr 2026", title: "Protected Area Technician, WILDLABS", kind: "certification", text: "Protected Area Technician certification from WILDLABS.", image: "", link: "" },
  { date: "Dec 2025", title: "BSc Software Engineering, ALU", text: "Graduated with a Machine Learning specialisation, CGPA 4.30 / 5.00.", image: "", link: "" },
  { date: "Nov 2025", title: "TractorCare capstone", text: "Predictive maintenance app that listens to tractor engine sounds to flag problems.", image: "", link: "" },
  { date: "Nov 2024", title: "Professional Scrum Master I", kind: "certification", text: "Scrum.org certification in agile delivery and Scrum.", image: "", link: "" },
  { date: "Jun 2024", title: "SheCanCode, Igire Rwanda", kind: "programme", text: "Completed the SheCanCode programme for women in tech.", image: "", link: "" },
  { date: "Mar 2023", title: "Aspire Leaders Programme", kind: "programme", text: "Completed the Aspire Leaders Programme with Aspire Institute.", image: "", link: "" }
];

/* Project cards. image: put files in assets/images/ — leave "" for a generated cover */
const PROJECTS = [
  {
    title: "PostgreSQL data pipelines",
    aliases: ["pipeline", "etl", "postgres", "postgresql"],
    summary: "Python and SQL pipelines that ingest, transform, validate and load data into PostgreSQL, with schema checks, row-level rules, structured logging and CI tests. Built during my AmaliTech apprenticeship.",
    stack: ["Python", "SQL", "PostgreSQL", "Airflow", "GitHub Actions"],
    image: "",
    repo: "",   // TODO: link a public repo if you have one
    demo: ""
  },
  {
    title: "TractorCare",
    aliases: ["tractorcare", "tractor", "engine sound", "audio", "flutter", "capstone"],
    summary: "Predictive maintenance system that classifies tractor engine sounds to spot problems early. MFCC audio features + TensorFlow model, FastAPI backend, MongoDB, and a Flutter app with offline sync. Tested on 50 recordings from Kayonza.",
    stack: ["Python", "TensorFlow", "librosa", "FastAPI", "MongoDB", "Flutter"],
    image: "",
    repo: "",   // TODO
    demo: ""
  },
  {
    title: "Elephant movement analysis",
    aliases: ["elephant", "earthranger", "gps", "collar"],
    summary: "Cleaned conservation datasets and analysed GPS-collar data to understand elephant movement, then shared it through maps, dashboards and reports for Space for Giants.",
    stack: ["EarthRanger", "ArcGIS Online", "Tableau"],
    image: "",
    repo: "",
    demo: ""
  },
  {
    title: "SAPA survey analysis",
    aliases: ["sapa", "survey", "suyian"],
    summary: "Prepared, cleaned and validated Social Assessment for Protected Areas survey data, then produced analyses and visuals to support Suyian Conservancy's community work.",
    stack: ["Data cleaning", "Validation", "Exploratory analysis"],
    image: "",
    repo: "",
    demo: ""
  }
];

/*
  "Ask Joh" chat. Scripted answers, no AI or server needed.
  The matching logic lives in js/chat-engine.js (tests: node --test test/chat.test.js).
  Each topic:
    id, ask   an id, and the question shown as a suggestion when the bot isn't sure
    words     trigger words with weights (strong 3, normal 2, weak 1)
    phrases   multi-word triggers, e.g. "programming language"
    generic   true = a named tool or project beats this topic
    reply()   the answer, built from the data above so it never goes out of date
    more()    optional: the answer to a follow-up like "tell me more"
*/
const certNames = kind => ACHIEVEMENTS.filter(a => a.kind === kind).map(a => a.title);
const CHAT = {
  botName: "JOH-bot 2.0",
  intro: "Chat with my portfolio assistant to learn more about me",
  greeting: "Hello! Welcome to my portfolio chatbot. How can I assist you today? Feel free to ask about my projects or experience.",
  suggestions: ["What do you do?", "Do you know Airflow?", "Your projects?", "Where did you study?", "How can I contact you?"],
  topics: [
    { id: "greeting", ask: "Say hello", words: { hi: 2, hello: 2, hey: 2, muraho: 3, bonjour: 3, morning: 1 },
      reply: () => "Hello! What would you like to know? You can ask about my skills, projects, experience or education." },
    { id: "thanks", ask: "Say thanks", words: { thanks: 3, thank: 3, cool: 2, great: 2, nice: 2, ok: 2, okay: 2, awesome: 2 },
      reply: () => "You're welcome! Anything else you'd like to know?" },
    { id: "about", ask: "Who are you?", words: { who: 2, yourself: 3, introduce: 3, about: 1, background: 2, summary: 2, role: 2, currently: 2, position: 2 },
      phrases: { "what do you do": 4, "who are you": 4, "what are you": 3, "what is your job": 3 },
      reply: () => `I'm ${PROFILE.name}, a ${PROFILE.role} in ${PROFILE.location}. ${PROFILE.about[0]}` },
    { id: "skills", ask: "What are your skills?", generic: true,
      words: { skill: 3, stack: 3, tools: 2, tool: 2, technologies: 3, tech: 2, programming: 3, good: 1, strongest: 2, code: 1, coding: 2, software: 1 },
      phrases: { "programming language": 4, "code in": 3, "tech stack": 4, "what tools": 3, "technical skill": 4, "what can you do": 3 },
      reply: () => `My core stack: ${SKILLS["Programming"].slice(0, 2).join(" and ")} for code, ${SKILLS["Data Engineering"].slice(3).join(", ")} for pipelines, and ${SKILLS["Databases & Storage"].slice(0, 2).join(", ")} for storage. The full list is on the Toolbox page.`,
      more: () => "The full list: " + Object.entries(SKILLS).map(([g, items]) => `${g}: ${items.join(", ")}`).join(". ") + "." },
    { id: "ml", ask: "Do you do machine learning?", words: { ml: 3, scikit: 3, tensorflow: 3, pandas: 2, numpy: 2, analytics: 2, model: 1 },
      phrases: { "machine learning": 5, "data science": 4, "deep learning": 4, "artificial intelligence": 3 },
      reply: () => `Yes. I specialised in Machine Learning at ${EDUCATION[0].org}. My ML and analytics tools: ${SKILLS["ML & Analytics"].join(", ")}. I used it in ${PROJECTS.filter(p => p.stack.some(s => /tensorflow/i.test(s))).map(p => p.title).join(" and ")}.` },
    { id: "projects", ask: "What projects have you built?", generic: true,
      words: { project: 3, built: 2, build: 2, portfolio: 2, capstone: 3, made: 1 },
      reply: () => `My projects: ${PROJECTS.map((p, i) => `${i + 1}. ${p.title}`).join(" · ")}. Ask about any of them, for example "tell me about the first one".`,
      more: () => PROJECTS.map(p => `${p.title}: ${p.summary}`).join(" ") },
    { id: "experience", ask: "Where have you worked?", generic: true,
      words: { experience: 3, worked: 3, work: 1, job: 2, jobs: 2, internship: 3, intern: 3, amalitech: 3, career: 2, company: 2, companies: 2, employer: 2 },
      phrases: { "where do you work": 5, "where did you work": 5, "work at": 3, "currently work": 4, "work experience": 4, "work history": 4 },
      reply: () => "Right now I'm a " + EXPERIENCE[0].role + " at " + EXPERIENCE[0].org + ". Before that: " + EXPERIENCE.slice(1).map(x => `${x.role} at ${x.org}`).join(", ") + ". Details are on the Toolbox page.",
      more: () => EXPERIENCE.map(x => `${x.role} at ${x.org} (${x.dates}): ${x.line}`).join(" ") },
    { id: "education", ask: "Where did you study?", words: { education: 3, study: 3, studied: 3, degree: 3, university: 3, school: 2, alu: 3, gpa: 3, cgpa: 3, graduate: 3, graduated: 3, college: 2 },
      reply: () => {
        const cgpa = (EDUCATION[0].line.match(/CGPA [\d.]+ \/ [\d.]+/) || [""])[0];
        return `I graduated from ${EDUCATION[0].org} with a ${EDUCATION[0].role}${cgpa ? ` (${cgpa})` : ""}. Before that, I studied ${EDUCATION[1].role.replace(/ studies.*/, "")} at ${EDUCATION[1].org}.`;
      },
      more: () => EDUCATION.map(x => `${x.role}, ${x.org} (${x.dates}): ${x.line}`).join(" ") },
    { id: "certifications", ask: "What certifications do you have?", words: { certification: 3, certifications: 3, certified: 3, certificate: 3, certificates: 3, scrum: 3, courses: 2, aws: 2 },
      reply: () => `My certifications: ${certNames("certification").join(", ")}, plus the ${certNames("programme").join(" and ")} programmes.`,
      more: () => ACHIEVEMENTS.map(a => `${a.date}: ${a.title}`).join(". ") + "." },
    { id: "location", ask: "Where are you based?", words: { where: 1, based: 3, live: 3, location: 3, located: 3, country: 2, city: 2 },
      reply: () => `I'm based in ${PROFILE.location}. I've also worked in Kenya, with ${EXPERIENCE.filter(x => /Kenya/.test(x.place)).map(x => x.org).join(" and ")}.` },
    { id: "availability", ask: "Are you open to work?", words: { remote: 4, relocate: 4, relocation: 4, available: 4, availability: 4, open: 2, opportunity: 3, opportunities: 3, freelance: 3, hiring: 2 },
      reply: () => `I'm open to data engineering opportunities. The best way to discuss one is by email: ${PROFILE.email}.` },
    { id: "whyhire", ask: "Why should I hire you?", words: { why: 2, hire: 3, strengths: 3, strength: 3, unique: 2, stand: 2 },
      reply: () => "I care about the parts that make data trustworthy: validation, testing, logging and clear documentation. I also bring a mix of software engineering, machine learning and real field experience in conservation and agribusiness." },
    { id: "contact", ask: "How can I contact you?", words: { contact: 3, email: 3, reach: 3, linkedin: 3, github: 3, touch: 2, message: 2 },
      reply: () => `Email me at ${PROFILE.email}, or find me on LinkedIn and GitHub. The links are at the bottom of every page, and there is a contact form on the About me page.` },
    { id: "cv", ask: "Can I see your CV?", words: { cv: 3, resume: 3 },
      reply: () => "You can download my CV on the About me page." },
    { id: "languages", ask: "Which languages do you speak?", words: { languages: 2, speak: 3, french: 3, kinyarwanda: 3, english: 2 },
      reply: () => `I speak ${PROFILE.languages.join(", ")}.` },
    { id: "personal", ask: "What do you do outside work?", words: { fun: 3, hobby: 3, hobbies: 3, free: 2, outside: 2, interests: 3, veginn: 3, business: 2, founder: 3, volunteer: 3, volunteering: 3, impact: 3, community: 2 },
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
