// Checks the milestone cards in js/data.js: every image file exists and every card is filled in correctly.
// (The page hides broken images silently, so a typo in a path would otherwise go unnoticed.)
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path");
const { ACHIEVEMENTS } = require("./load-data.js")();

const KINDS = ["certification", "programme", "event", "milestone"];
const root = path.join(__dirname, "..");
const files = a => [a.image, ...(a.images || []), a.cert].filter(Boolean);

test("every milestone has a date, title, text and a known kind", () => {
  for (const a of ACHIEVEMENTS) {
    assert.ok(a.date && a.title && a.text, `incomplete card: ${a.title || a.date}`);
    assert.ok(KINDS.includes(a.kind), `"${a.title}" has kind "${a.kind}", expected one of ${KINDS.join(", ")}`);
  }
});

test("every image or certificate path exists on disk", () => {
  for (const a of ACHIEVEMENTS)
    for (const f of files(a)) assert.ok(fs.existsSync(path.join(root, f)), `"${a.title}": missing file ${f}`);
});

test("every card photo has a small copy in thumbs/ (the card loads that one)", () => {
  for (const a of ACHIEVEMENTS.filter(x => x.image)) {
    const t = a.image.replace("achievements/", "achievements/thumbs/");
    assert.ok(fs.existsSync(path.join(root, t)), `"${a.title}": missing thumbnail ${t}`);
  }
});

test("photos have alt text and a valid focus point", () => {
  for (const a of ACHIEVEMENTS.filter(x => x.image)) {
    assert.ok(a.alt, `"${a.title}" has a photo but no alt text`);
    if (a.focus) assert.match(a.focus, /^\d{1,3}% \d{1,3}%$/, `"${a.title}": focus should look like "50% 30%"`);
  }
});

test("no image is used on two different cards", () => {
  const seen = new Map();
  for (const a of ACHIEVEMENTS)
    for (const f of files(a)) {
      assert.ok(!seen.has(f) || seen.get(f) === a.title, `${f} is used by "${seen.get(f)}" and "${a.title}"`);
      seen.set(f, a.title);
    }
});
