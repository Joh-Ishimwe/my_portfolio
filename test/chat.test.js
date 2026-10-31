// Run with:  node --test test/
const test = require("node:test");
const assert = require("node:assert");
const loadData = require("./load-data");
const ChatEngine = require("../js/chat-engine.js");

const data = loadData();
const ask = (...qs) => {                      // fresh bot per case; context carries across the questions in one case
  const bot = ChatEngine.create(data);
  let r;
  for (const q of qs) r = bot.reply(q);
  return r;
};
const ok = (name, qs, ...patterns) =>
  test(name, () => {
    const r = ask(...[].concat(qs));
    for (const p of patterns) assert.match(r.text, p, `reply was: ${r.text}`);
  });

/* ---- small talk ---- */
ok("greeting", "hi", /hello/i);
ok("greeting in Kinyarwanda", "muraho", /hello/i);
ok("thanks", "thanks a lot", /welcome/i);
ok("acknowledgement", "cool", /welcome|anything else/i);

/* ---- about / role ---- */
ok("what do you do", "what do you do?", /data engineer/i);
ok("introduce yourself", "tell me about yourself", /Josiane Ishimwe/);
ok("who are you", "who are you", /Josiane/);

/* ---- skills, typos, slang, synonyms ---- */
ok("skills", "what are your skills", /Python/);
ok("slang + typo", "wat tools do u use", /Python|toolkit|stack/i);
ok("programming languages means skills, not spoken languages", "which programming languages do you know?", /Python/, /SQL/);
ok("ML skills", "do you do machine learning?", /scikit|TensorFlow/);

/* ---- tools ---- */
ok("known tool", "Do you know Airflow?", /Yes!.*Airflow/);
ok("misspelt tool", "do you know airflw", /Airflow/);
ok("tool used in a job", "do you use Kafka?", /Kafka/);
ok("unknown tool is answered honestly", "do you know Rust?", /Rust/, /not|isn't|haven't/i);

/* ---- projects ---- */
ok("project list", "what projects have you built", /TractorCare/);
ok("named project", "tell me about tractorcare", /Predictive maintenance/);
ok("project name split in two words", "tell me about the tractor care app", /Predictive maintenance/);
ok("project by keyword", "elephant", /GPS-collar/);
ok("misspelt project", "tractorcre", /Predictive maintenance/);

/* ---- education, certifications, location, contact ---- */
ok("education", "where did you study", /African Leadership University/);
ok("gpa", "what is your gpa", /4\.30/);
ok("certifications", "do you have any certifications", /AWS Certified Cloud Practitioner/);
ok("specific certification", "are you aws certified", /AWS/);
ok("location", "where are you based", /Kigali/);
ok("availability", "are you open to work", /open to/i);
ok("contact", "how can I contact you", /@/);
ok("email keyword", "email", /@/);
ok("spoken languages", "what languages do you speak", /Kinyarwanda/);
ok("one spoken language", "do you speak french", /French/);
ok("business", "tell me about veginn", /VegInn/);
ok("why hire", "why should we hire you", /validation|trustworthy/i);
ok("cv", "can I get your cv", /CV/);

/* ---- two questions in one ---- */
ok("multi-intent", "where did you study and where do you work", /African Leadership University/, /AmaliTech/);

/* ---- conversation context ---- */
ok("follow-up: ordinal after project list", ["what projects have you built", "tell me more about the first one"], /PostgreSQL data pipelines/);
ok("follow-up: pronoun refers to last project", ["tell me about tractorcare", "what stack did it use?"], /TensorFlow/, /FastAPI/);
ok("follow-up: more after skills", ["what are your skills", "tell me more"], /GIS/, /Cloud/);
ok("follow-up: more after experience", ["tell me about your work experience", "tell me more"], /Cleaned, validated/);

/* ---- low confidence ---- */
test("gibberish gets suggestions, not a made-up answer", () => {
  const r = ask("asdfgh qwerty");
  assert.ok(Array.isArray(r.suggestions) && r.suggestions.length >= 2, `suggestions missing: ${JSON.stringify(r)}`);
});

/* ---- guard rails: things it should NOT answer confidently ---- */
const lowConfidence = (name, q) => test(name, () => {
  const r = ask(q);
  assert.strictEqual(r.confidence, "low", `expected a low-confidence fallback, got: ${r.text}`);
  assert.ok(r.suggestions.length >= 2);
});
lowConfidence("off-topic question", "what is the weather today");
lowConfidence("joke request", "tell me a joke");
lowConfidence("unrelated number", "how old are you");
test("'do you know my name' is not treated as an unknown skill", () => {
  assert.doesNotMatch(ask("do you know my name").text, /isn't on my skills list/);
});
test("a common word is not 'corrected' into a skill", () => {
  assert.doesNotMatch(ask("tell me something").text, /toolkit|stack/i);
});
test("tool answer is honest about skills still being practised", () => {
  assert.match(ask("do you know Kafka?").text, /practising/i);
});
test("context does not leak: a new topic clears the last project", () => {
  const bot = ChatEngine.create(data);
  bot.reply("tell me about tractorcare");
  bot.reply("where did you study");
  assert.doesNotMatch(bot.reply("what stack did it use?").text, /TensorFlow/);
});
test("stemmer and edit distance helpers", () => {
  const { stem, distance } = ChatEngine._internal;
  assert.strictEqual(stem("studied"), stem("study"));
  assert.strictEqual(stem("projects"), "project");
  assert.strictEqual(distance("airflw", "airflow", 2), 1);
  assert.ok(distance("kafka", "spark", 1) > 1);
});
