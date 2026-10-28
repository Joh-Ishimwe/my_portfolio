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

/* ---------- Projects ---------- */
const gradients = [
  "linear-gradient(135deg,#ff5a36,#ffb347)",
  "linear-gradient(135deg,#2f6bff,#7dd3fc)",
  "linear-gradient(135deg,#16161a,#6b4bff)",
  "linear-gradient(135deg,#0ea5a4,#a3e635)"
];
$("projectGrid").innerHTML = PROJECTS.map((p, i) => {
  const cover = p.image
    ? `<img class="cover" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">`
    : `<div class="cover generated" style="background:${gradients[i % gradients.length]}">source → transform → load ✓</div>`;
  const links = [
    p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Code ↗</a>`,
    p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live ↗</a>`
  ].filter(Boolean).join("");
  return `
    <article class="project reveal">
      ${cover}
      <div class="project-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="tags">${p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        <div class="project-links">${links}</div>
      </div>
    </article>`;
}).join("");

