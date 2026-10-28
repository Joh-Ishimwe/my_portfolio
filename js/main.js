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

/* ---------- Impact: quote, story, stats ---------- */
$("impactQuote").textContent = IMPACT.quote;
$("impactQuoteBy").textContent = `— ${IMPACT.quoteBy}`;
$("impactStory").innerHTML = IMPACT.story.map(p => `<p>${esc(p)}</p>`).join("");
$("impactTagline").textContent = IMPACT.tagline;
$("impactStats").innerHTML = IMPACT.stats.map(st => `
  <div class="stat reveal"><strong>${esc(st.value)}</strong><span>${esc(st.label)}</span></div>`).join("");

/* ---------- Impact areas ---------- */
$("impactAreas").innerHTML = IMPACT.areas.map((a, i) => `
  <article class="impact-area reveal">
    <div class="impact-text">
      <span class="mono area-num">${String(i + 1).padStart(2, "0")}</span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.text)}</p>
      <ul>${a.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>
    </div>
    <div class="gallery-wrap" data-gallery></div>
  </article>`).join("");

/* ---------- Impact photo carousels (swipe, scroll, or use the arrow buttons) ---------- */
document.querySelectorAll("[data-gallery]").forEach((wrap, i) => {
  const area = IMPACT.areas[i];
  const slides = area.images.length
    ? area.images.map((src, n) => `<img class="slide" src="${esc(src)}" alt="${esc(area.title)} photo ${n + 1}" loading="lazy">`)
    : [1, 2, 3].map(n => `<div class="slide slide-placeholder" style="background:${gradients[(i + n) % gradients.length]}"><span>Photo ${n} — add to assets/images/impact/</span></div>`);
  wrap.innerHTML = `
    <div class="gallery" tabindex="0" aria-label="${esc(area.title)} photos">${slides.join("")}</div>
    <div class="gallery-nav">
      <button type="button" data-dir="-1" aria-label="Previous photo">‹</button>
      <button type="button" data-dir="1" aria-label="Next photo">›</button>
    </div>`;
  const gallery = wrap.querySelector(".gallery");
  wrap.querySelector(".gallery-nav").addEventListener("click", e => {
    const dir = Number(e.target.dataset.dir);
    if (!dir) return;
    const step = gallery.querySelector(".slide").offsetWidth + 12; // one slide + gap
    gallery.scrollBy({ left: dir * step, behavior: "smooth" });
  });
});

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

/* ---------- Chat assistant: cartoon twin + speech bubble (keyword matching, no AI) ---------- */
const avatarWrap = $("avatarWrap"), avatarImg = $("avatarImg");
const bubble = $("bubble"), bubbleText = $("bubbleText"), youAsked = $("youAsked");
$("chatIntro").textContent = CHAT.intro;

// No twin image yet? Show a circle with initials instead of a broken image.
avatarImg.src = PROFILE.avatar;
avatarImg.onerror = () => {
  const ph = document.createElement("div");
  ph.className = "avatar avatar-fallback";
  ph.textContent = PROFILE.name.split(" ").map(w => w[0]).join("");
  avatarImg.replaceWith(ph);
};

function answer(question) {
  const words = question.toLowerCase().match(/[a-z]+/g) || [];
  let best = null, bestScore = 0;
  for (const a of CHAT.answers) {
    const score = a.keywords.filter(k => words.some(w => w.startsWith(k))).length;
    if (score > bestScore) { best = a; bestScore = score; }
  }
  return best ? best.reply() : CHAT.fallback;
}
// Restart a CSS animation by removing the class, forcing a reflow, then adding it back
function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

function say(text) {
  bubbleText.textContent = text;
  bubble.classList.remove("thinking");
  replay(bubble, "pop");
  replay(avatarWrap, "talking");
}
function ask(q) {
  q = q.trim();
  if (!q) return;
  youAsked.textContent = `You: ${q}`;
  bubbleText.textContent = "";
  bubble.classList.add("thinking");                // shows animated dots
  setTimeout(() => say(answer(q)), 700);
}
say(CHAT.greeting);
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
