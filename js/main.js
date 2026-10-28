/* Renders the page from data.js. You shouldn't need to edit this file. */
const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Hero ---------- */
const [first, ...rest] = PROFILE.name.split(" ");
$("heroName").innerHTML = `${esc(first)}<br><span>${esc(rest.join(" "))}</span>`;
$("heroRole").textContent = `// ${PROFILE.role} · ${PROFILE.location}`;
$("heroTagline").textContent = PROFILE.tagline;

