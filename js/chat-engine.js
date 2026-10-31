/*
  Chat engine: answers questions about the portfolio from the data in data.js. No DOM, no network,
  so it runs in the browser (window.ChatEngine) and in Node (tests: node --test test/chat.test.js).

  Pipeline for each question:
    1. normalise   lowercase, expand slang ("wat" -> "what"), split into words
    2. correct     fix typos by matching against the bot's own vocabulary (edit distance)
    3. follow-up   "tell me more", "the first one", "what stack did it use?" use the last topic or project
    4. score       weighted keywords + phrases per topic (stemmed, so "studied" matches "study")
    5. decide      named project > named tool > best topic; two strong topics are answered together
    6. fall back   unknown tool: say so honestly; no idea: suggest what to ask instead of guessing
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ChatEngine = factory();
})(typeof self !== "undefined" ? self : this, function () {

  /* ---------- text helpers ---------- */
  const SLANG = { u: "you", ur: "your", r: "are", y: "why", wat: "what", wht: "what", abt: "about", pls: "please", plz: "please",
    thx: "thanks", ty: "thanks", hv: "have", cud: "could", ppl: "people", info: "information", pic: "picture", whats: "what is",
    "what's": "what is", "who's": "who is", "where's": "where is", "how's": "how is", "i'm": "i am", "you're": "you are", "don't": "do not" };
  const STOP = new Set(("a an the is are was were am be been do does did you your yours i me my we our what which who whom where when why how can could would should will " +
    "have has had about tell of in on at to for and or with any some this that it its they them there so if then than also just please more know " +
    "use used using get give show make made me us not no yes or but from as by into like want need").split(" "));

  const normalise = q => q.toLowerCase().replace(/[^a-z0-9+#' ]+/g, " ").split(/\s+/).filter(Boolean)
    .flatMap(w => (SLANG[w] || w).split(" "));

  // Light stemmer: studied/studies -> study, working/worked -> work, tools -> tool
  function stem(w) {
    if (w.length <= 3) return w;
    if (/ies$/.test(w)) return w.slice(0, -3) + "y";
    if (/ied$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 5 && /(ing|ed|ly)$/.test(w)) return w.replace(/(ing|ed|ly)$/, "");
    if (/[^su]s$/.test(w)) return w.slice(0, -1);
    return w;
  }

  // Edit distance, giving up early once it is bigger than `max`
  function distance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        rowMin = Math.min(rowMin, cur[j]);
      }
      if (rowMin > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  const ORDINALS = { first: 0, "1st": 0, one: 0, second: 1, "2nd": 1, third: 2, "3rd": 2, fourth: 3, "4th": 3, last: -1 };
  const MORE = new Set(["more", "details", "detail", "elaborate", "expand", "further", "continue", "else"]);
  const PRONOUN = new Set(["it", "its", "that", "this", "there"]);
  const FILLER = new Set(["about", "with", "in", "how", "to", "of", "a", "an"]);
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1);

  function create(data) {
    const { PROFILE, SKILLS, PROJECTS, EXPERIENCE, ACHIEVEMENTS, CHAT } = data;
    const topics = CHAT.topics;
    const state = { topic: null, project: null };       // short-term memory for follow-ups

    /* ---------- knowledge built once from the data ---------- */
    // Tools: every way a skill can be written ("Spark/PySpark" -> spark, pyspark), plus skill groups and project stacks
    const TOOLS = [];
    for (const [group, items] of Object.entries(SKILLS))
      for (const name of items)
        for (const alias of name.toLowerCase().split(/[\/ ]/).filter(a => a.length > 1 && !["online", "and", "apis", "rest"].includes(a)))
          TOOLS.push({ alias, name, group });
    for (const group of Object.keys(SKILLS))
      if (!group.includes(" ")) TOOLS.push({ alias: group.toLowerCase(), name: group, group, isGroup: true });
    for (const p of PROJECTS) for (const name of p.stack)
      if (!TOOLS.some(t => t.alias === name.toLowerCase())) TOOLS.push({ alias: name.toLowerCase(), name, group: "project" });

    // Project aliases are compared with spaces removed, so "tractor care" finds "tractorcare"
    const projectAliases = PROJECTS.map(p => (p.aliases || []).map(a => stem(a.replace(/\s+/g, ""))));

    // Vocabulary the bot can correct typos towards: topic words, tool names, project aliases
    const vocab = new Map();                             // stem -> display word
    const addVocab = w => { if (w.length >= 5) vocab.set(stem(w), w); };
    topics.forEach(t => Object.keys(t.words).forEach(addVocab));
    TOOLS.forEach(t => addVocab(t.alias));
    PROJECTS.forEach((p, i) => (p.aliases || []).forEach(a => addVocab(a.replace(/\s+/g, ""))));
    const known = w => vocab.has(stem(w)) || topics.some(t => stem(w) in stemmedWords(t));

    const stemCache = new Map();
    function stemmedWords(t) {
      if (!stemCache.has(t)) stemCache.set(t, Object.fromEntries(Object.entries(t.words).map(([k, v]) => [stem(k), v])));
      return stemCache.get(t);
    }

    // Replace a misspelt word with the closest word the bot knows ("airflw" -> "airflow")
    function correct(w) {
      if (w.length < 5 || STOP.has(w) || known(w)) return w;
      const max = w.length <= 7 ? 1 : 2;
      let best = null, bestD = max + 1;
      for (const word of vocab.values()) {
        if (word[0] !== w[0]) continue;
        const d = distance(w, word, max);
        if (d < bestD) { best = word; bestD = d; }
      }
      return best || w;
    }

    /* ---------- understanding a question ---------- */
    function analyse(question) {
      const raw = normalise(question);
      const tokens = raw.map(correct);
      const stems = tokens.map(stem);
      const text = " " + tokens.join(" ") + " ";
      const stemText = " " + stems.join(" ") + " ";          // phrases are compared stemmed too ("programming languages")
      // Single words and joined pairs, so "tractor care" can match "tractorcare"
      const candidates = new Set(stems);
      for (let i = 0; i < tokens.length - 1; i++) candidates.add(stem(tokens[i] + tokens[i + 1]));
      return { raw, tokens, stems, text, stemText, candidates };
    }

    function scoreTopics(q) {
      return topics.map(topic => {
        const words = stemmedWords(topic);
        let score = 0;
        for (const s of new Set(q.stems)) if (words[s]) score += words[s];
        for (const [phrase, weight] of Object.entries(topic.phrases || {}))
          if (q.stemText.includes(" " + normalise(phrase).map(stem).join(" ") + " ")) score += weight;
        return { topic, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
    }

    const findProject = q => PROJECTS.findIndex((_, i) => projectAliases[i].some(a => q.candidates.has(a)));
    const findTool = q => TOOLS.find(t => q.candidates.has(stem(t.alias)));

    /* ---------- building answers ---------- */
    function toolAnswer(tool, q) {
      const yes = ["do", "have", "can", "are", "is", "did"].includes(q.raw[0]) ? "Yes! " : "";
      const a = tool.alias;
      const inProjects = PROJECTS.filter(p => p.stack.some(s => s.toLowerCase().includes(a))).map(p => p.title);
      const jobs = EXPERIENCE.filter(x => x.line.toLowerCase().includes(a));
      const learning = jobs.filter(x => new RegExp("practis\\w*[^.;]*" + a.replace(/[+#]/g, "\\$&"), "i").test(x.line));
      const certs = ACHIEVEMENTS.filter(x => x.title.toLowerCase().includes(a)).map(x => x.title);
      let reply = tool.isGroup ? `${yes}My ${tool.name} toolkit: ${SKILLS[tool.group].join(", ")}.`
        : tool.group === "project" ? `${yes}I've used ${tool.name}.`
        : `${yes}${tool.name} is part of my ${tool.group} toolkit.`;
      const used = jobs.filter(j => !learning.includes(j)).map(j => j.org);
      if (used.length) reply += ` I use it at ${used.join(" and ")}.`;
      if (learning.length) reply += ` I'm still practising it at ${learning.map(j => j.org).join(" and ")}.`;
      if (inProjects.length) reply += ` I used it in ${inProjects.join(" and ")}.`;
      if (certs.length) reply += ` I'm also an ${certs.join(", ")}.`;
      return reply;
    }

    const projectAnswer = p => `${p.title}: ${p.summary}`;
    const suggest = scored => {
      const picked = scored.filter(x => !["greeting", "thanks"].includes(x.topic.id)).slice(0, 3).map(x => x.topic);
      for (const id of ["skills", "projects", "contact"]) {
        const t = topics.find(t => t.id === id);
        if (picked.length < 3 && t && !picked.includes(t)) picked.push(t);
      }
      return picked.map(t => t.ask);
    };
    const done = (text, extra = {}) => ({ text, confidence: "high", ...extra });

    // "tell me more", "the first one", "what stack did it use?"
    function followUp(q) {
      const wants = w => q.tokens.some(t => w.includes(t));
      if (state.topic === "projects" && !state.project) {
        const ordinal = q.tokens.map(t => ORDINALS[t]).find(i => i !== undefined);
        if (ordinal !== undefined) {
          state.project = PROJECTS[ordinal < 0 ? PROJECTS.length - 1 : ordinal];
          if (state.project) return projectAnswer(state.project);
        }
      }
      if (state.project && q.tokens.some(t => PRONOUN.has(t))) {
        if (wants(["stack", "tech", "technology", "technologies", "tools", "tool", "built", "use", "used", "language", "languages"]))
          return `${state.project.title} uses ${state.project.stack.join(", ")}.`;
        if (wants(["link", "repo", "github", "code", "demo", "live", "source"]))
          return state.project.repo || state.project.demo
            ? [state.project.repo && `Code: ${state.project.repo}`, state.project.demo && `Demo: ${state.project.demo}`].filter(Boolean).join(" ")
            : `${state.project.title} isn't public yet. Email me at ${PROFILE.email} and I can walk you through it.`;
      }
      if (q.tokens.some(t => MORE.has(t))) {
        if (state.project) return `${projectAnswer(state.project)} Stack: ${state.project.stack.join(", ")}.`;
        const t = topics.find(t => t.id === state.topic);
        if (t && t.more) return t.more();
      }
      return null;
    }

    /* ---------- the public method ---------- */
    function reply(question) {
      const q = analyse(question);
      const scored = scoreTopics(q);
      const best = scored[0];
      const strongTopic = best && best.score >= 3 && !best.topic.generic;

      // 1. follow-ups, unless the question clearly names something new
      const projectIndex = findProject(q);
      if (projectIndex < 0 && !strongTopic) {
        const text = followUp(q);
        if (text) return done(text, { topic: state.project ? "project" : state.topic });
      }

      // 2. a named project or tool beats a generic topic
      const weak = !best || best.topic.generic || best.score < 3;
      if (projectIndex >= 0 && weak) {
        state.project = PROJECTS[projectIndex]; state.topic = "project";
        return done(projectAnswer(state.project), { topic: "project" });
      }
      const tool = findTool(q);
      if (tool && weak) { state.topic = "tool"; return done(toolAnswer(tool, q), { topic: "tool" }); }

      // 3. the best topic (two strong topics in one question are answered together)
      if (best && best.score >= 2) {
        const chosen = [best, ...scored.slice(1).filter(x => x.score >= Math.max(3, best.score * 0.4))].slice(0, 2);
        state.topic = chosen[0].topic.id;
        state.project = null;
        return done(chosen.map(x => x.topic.reply()).join(" "), { topic: chosen.map(x => x.topic.id).join("+") });
      }

      // 4. "do you know Rust?": a skill that isn't on the list gets an honest answer
      const probe = q.raw.findIndex(w => ["know", "use", "used", "using", "with", "familiar", "tried", "try", "learn", "learning"].includes(w));
      // Only the word right after the verb counts ("know Rust"), so "know my name" is not mistaken for a skill
      let at = probe + 1;
      while (probe >= 0 && FILLER.has(q.raw[at])) at++;
      const word = probe >= 0 ? q.raw[at] : null;
      const term = word && word.length >= 3 && !STOP.has(word) && !known(word) ? word : null;
      if (term) {
        const original = question.match(new RegExp("\\b" + term.replace(/[+#]/g, "\\$&") + "\\b", "i"));
        return done(`${original ? original[0] : cap(term)} isn't on my skills list yet. My core stack is ${SKILLS["Programming"].slice(0, 2).join(" and ")} with ${SKILLS["Databases & Storage"][0]}. Ask me about any of those, or email ${PROFILE.email}.`,
          { topic: "unknown-skill" });
      }

      // 5. no idea: suggest instead of guessing
      return { text: CHAT.fallback(), topic: null, confidence: "low", suggestions: suggest(scored) };
    }

    return { reply, reset: () => { state.topic = null; state.project = null; } };
  }

  return { create, _internal: { normalise, stem, distance } };
});
