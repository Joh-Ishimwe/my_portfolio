/* Renders the page from data.js. You shouldn't need to edit this file. */
const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Hero ---------- */
const [first, ...rest] = PROFILE.name.split(" ");
$("heroName").innerHTML = `${esc(first)}<br><span>${esc(rest.join(" "))}</span>`;
$("heroRole").textContent = `// ${PROFILE.role} · ${PROFILE.location}`;
$("heroTagline").textContent = PROFILE.tagline;

/* ---------- Achievements (duplicated once so the loop is seamless) ---------- */
const achHTML = ACHIEVEMENTS.map(a => `
  <article class="ach">
    <span class="mono">${esc(a.date)}</span>
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.text)}</p>
    ${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Learn more →</a>` : ""}
  </article>`).join("");
$("achTrack").innerHTML = achHTML + achHTML.replace(/<article/g, '<article aria-hidden="true"');

