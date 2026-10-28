/* Renders the page from data.js. You shouldn't need to edit this file. */
const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Hero ---------- */
const [first, ...rest] = PROFILE.name.split(" ");
$("heroName").innerHTML = `${esc(first)}<br><span>${esc(rest.join(" "))}</span>`;
$("heroRole").textContent = `// ${PROFILE.role} · ${PROFILE.location}`;
$("heroTagline").textContent = PROFILE.tagline;

/* ---------- Achievements carousel ----------
   How the endless loop works: the track holds the cards twice (A + A).
   CSS slides it left by exactly 50% (one copy), then snaps back to 0 —
   which looks identical, so the loop seems endless.
   Each copy must be at least as wide as the screen, or a gap appears,
   so on wide screens we repeat the cards more times inside each copy. */
const achCard = a => `
  <article class="ach">
    <span class="mono">${esc(a.date)}</span>
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.text)}</p>
    ${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Learn more →</a>` : ""}
  </article>`;
const marquee = $("marquee"), track = $("achTrack");
const SPEED = 40; // pixels per second — same speed no matter how many cards
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function buildMarquee() {
  const set = ACHIEVEMENTS.map(achCard).join("");
  track.innerHTML = set;
  if (reduceMotion) return;                      // static list, no copies needed
  const card = track.firstElementChild;
  const cardW = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
  const setW = cardW * ACHIEVEMENTS.length;
  const reps = Math.max(1, Math.ceil(marquee.clientWidth / setW));
  const half = set.repeat(reps);
  track.innerHTML = half + half;
  // Only the first set is "real": hide the copies from screen readers and the Tab key
  [...track.children].slice(ACHIEVEMENTS.length).forEach(el => {
    el.setAttribute("aria-hidden", "true");
    el.inert = true;
  });
  track.style.animationDuration = `${(setW * reps) / SPEED}s`;
}
buildMarquee();
// Pause/Play button — works for mouse, keyboard and touch users
const marqueeToggle = $("marqueeToggle");
marqueeToggle.addEventListener("click", () => {
  const paused = marquee.classList.toggle("paused");
  marqueeToggle.setAttribute("aria-pressed", String(paused));
  marqueeToggle.textContent = paused ? "▶ Play" : "❚❚ Pause";
});
let lastW = marquee.clientWidth, resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (marquee.clientWidth !== lastW) { lastW = marquee.clientWidth; buildMarquee(); }
  }, 200);
});

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

/* ---------- Skills ---------- */
$("skillGrid").innerHTML = Object.entries(SKILLS).map(([group, items]) => `
  <div class="skill-group reveal">
    <h3>${esc(group)}</h3>
    <div class="tags">${items.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
  </div>`).join("");

/* ---------- About ---------- */
$("aboutText").innerHTML = PROFILE.about.map(p => `<p>${esc(p)}</p>`).join("");
const photo = $("aboutPhoto");
photo.src = PROFILE.photo;
// No photo yet? Swap in a gradient square with your initials.
photo.onerror = () => {
  const ph = document.createElement("div");
  ph.className = "photo-fallback";
  ph.textContent = PROFILE.name.split(" ").map(w => w[0]).join("");
  photo.replaceWith(ph);
};
$("cvBtn").href = PROFILE.cv;

/* ---------- Footer ---------- */
$("mailLink").href = `mailto:${PROFILE.email}`;
$("mailLink").textContent = PROFILE.email;
const labels = { linkedin: "LinkedIn", github: "GitHub", medium: "Blog" };
$("socials").innerHTML = Object.entries(PROFILE.links)
  .filter(([, url]) => url)
  .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${labels[k] || k}</a>`).join("");
$("copyright").textContent = `© ${new Date().getFullYear()} ${PROFILE.name} · ${PROFILE.location}`;

/* ---------- Chat assistant (keyword matching, no AI) ---------- */
const body = $("chatBody");
function addMsg(text, who) {
  const el = document.createElement("div");
  el.className = `msg ${who}`;
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}
function answer(question) {
  const words = question.toLowerCase().match(/[a-z]+/g) || [];
  let best = null, bestScore = 0;
  for (const a of CHAT.answers) {
    const score = a.keywords.filter(k => words.some(w => w.startsWith(k))).length;
    if (score > bestScore) { best = a; bestScore = score; }
  }
  return best ? best.reply() : CHAT.fallback;
}
function ask(q) {
  if (!q.trim()) return;
  addMsg(q, "me");
  const typing = addMsg("•••", "bot typing");
  setTimeout(() => { typing.remove(); addMsg(answer(q), "bot"); }, 600);
}
addMsg(CHAT.greeting, "bot");
$("chatSuggest").innerHTML = CHAT.suggestions.map(s => `<button type="button">${esc(s)}</button>`).join("");
$("chatSuggest").addEventListener("click", e => { if (e.target.tagName === "BUTTON") ask(e.target.textContent); });
$("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  ask($("chatInput").value);
  $("chatInput").value = "";
});

/* ---------- Dark mode (remembered per browser) ---------- */
const root = document.documentElement;
try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (_) {}
$("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
});

/* ---------- Reveal-on-scroll animation ---------- */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
