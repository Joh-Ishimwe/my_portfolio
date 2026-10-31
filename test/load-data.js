// Loads js/data.js (plain browser globals) into a Node vm sandbox and returns its constants.
const fs = require("fs"), path = require("path"), vm = require("vm");
module.exports = function loadData() {
  const src = fs.readFileSync(path.join(__dirname, "..", "js", "data.js"), "utf8");
  return vm.runInNewContext(src + "\n;({ PROFILE, SKILLS, EXPERIENCE, EDUCATION, ACHIEVEMENTS, PROJECTS, VOLUNTEERING, CHAT, IMPACT })");
};
