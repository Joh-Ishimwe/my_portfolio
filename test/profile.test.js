// Checks the files the profile links to really exist, so the "Download CV" button
// and the photos can never silently point at a missing file.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path");
const { PROFILE, PROJECTS } = require("./load-data.js")();

const root = path.join(__dirname, "..");

test("the CV, photo and avatar files linked from PROFILE exist", () => {
  for (const key of ["cv", "photo", "avatar", "avatarVideo"]) {
    if (!PROFILE[key]) continue;
    assert.ok(fs.existsSync(path.join(root, PROFILE[key])), `PROFILE.${key} points to a missing file: ${PROFILE[key]}`);
  }
});

test("the CV is a real PDF, not an empty or renamed file", () => {
  const head = fs.readFileSync(path.join(root, PROFILE.cv)).subarray(0, 5).toString();
  assert.strictEqual(head, "%PDF-");
});

test("every project image exists and every project has a link or a note", () => {
  for (const p of PROJECTS) {
    if (p.image) assert.ok(fs.existsSync(path.join(root, p.image)), `${p.title}: missing image ${p.image}`);
    assert.ok(p.repo || p.demo, `${p.title}: no repo or demo link`);
  }
});
