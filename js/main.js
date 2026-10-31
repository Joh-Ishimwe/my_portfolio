/* Renders the page from data.js. You shouldn't need to edit this file. */
const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Each page only has some sections: run a block only if its element is on this page
const onPage = (id, fn) => { if ($(id)) fn(); };
// Placeholder covers use the neutral panel colour (no loud gradients)
const gradients = ["var(--panel)"];

/* ---------- Hero ---------- */
onPage("heroName", () => {
  const [first, ...rest] = PROFILE.name.split(" ");
  $("heroName").innerHTML = `${esc(first)} <span>${esc(rest.join(" "))}</span>`;
  $("heroRole").textContent = "Hello, I'm";
  $("heroTagline").innerHTML = PROFILE.heroIntro.map(p => `<p>${esc(p)}</p>`).join("");
  $("heroTags").innerHTML = PROFILE.heroTags.map(t => `<li>${esc(t)}</li>`).join("");
});

/* ---------- Achievements carousel ----------
   How the endless loop works: the track holds the cards twice (A + A).
   CSS slides it left by exactly 50% (one copy), then snaps back to 0 —
   which looks identical, so the loop seems endless.
   Each copy must be at least as wide as the screen, or a gap appears,
   so on wide screens we repeat the cards more times inside each copy. */
onPage("marquee", () => {
  // Photo on top if you added one; otherwise a calm placeholder showing the year
  const achCard = a => `
    <article class="ach">
      <div class="ach-media" data-year="${esc(a.date)}">
        ${a.image ? `<img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy">` : ""}
      </div>
      <div class="ach-body">
        <span class="mono">${esc(a.date)}</span>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.text)}</p>
        ${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Learn more →</a>` : ""}
      </div>
    </article>`;
  // If an image path is wrong, drop the broken image so the placeholder shows instead
  const fixBrokenImages = () => track.querySelectorAll(".ach-media img").forEach(img =>
    img.addEventListener("error", () => img.remove(), { once: true }));
  const marquee = $("marquee"), track = $("achTrack");
  const SPEED = 40; // pixels per second — same speed no matter how many cards
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function buildMarquee() {
    const set = ACHIEVEMENTS.map(achCard).join("");
    track.innerHTML = set;
    fixBrokenImages();
    if (reduceMotion) return;                      // static list, no copies needed
    const card = track.firstElementChild;
    const cardW = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const setW = cardW * ACHIEVEMENTS.length;
    const reps = Math.max(1, Math.ceil(marquee.clientWidth / setW));
    const half = set.repeat(reps);
    track.innerHTML = half + half;
    fixBrokenImages();
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
});

/* ---------- Projects ---------- */
onPage("projectGrid", () => {
  $("projectGrid").innerHTML = PROJECTS.map((p, i) => {
    const cover = p.image
      ? `<img class="cover" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">`
      : `<div class="cover generated" style="background:${gradients[i % gradients.length]}">${p.stack.slice(0, 3).map(esc).join(" · ")}</div>`;
    const links = [
      p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Learn more →</a>`,
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
  // Arrow buttons scroll the row by one card
  const row = $("projectGrid");
  const step = dir => row.scrollBy({ left: dir * (row.firstElementChild.offsetWidth + 24), behavior: "smooth" });
  $("projPrev").addEventListener("click", () => step(-1));
  $("projNext").addEventListener("click", () => step(1));
});

/* ---------- Skills ---------- */
onPage("skillGrid", () => {
  $("skillGrid").innerHTML = Object.entries(SKILLS).map(([group, items]) => `
    <div class="skill-group reveal">
      <h3>${esc(group)}</h3>
      <div class="tags">${items.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
    </div>`).join("");
});

/* ---------- Experience (Toolbox page) ---------- */
// Same compact row layout is used for jobs and for education
const timelineRows = list => list.map(x => `
    <li class="job reveal">
      <span class="job-dates">${esc(x.dates)}</span>
      <div>
        <h3>${esc(x.role)} <span class="muted">· ${esc(x.org)}</span></h3>
        <p>${esc(x.line)}${x.place ? ` <span class="muted small">— ${esc(x.place)}</span>` : ""}</p>
      </div>
    </li>`).join("");
onPage("experienceList", () => { $("experienceList").innerHTML = timelineRows(EXPERIENCE); });
onPage("educationList", () => { $("educationList").innerHTML = timelineRows(EDUCATION); });

/* ---------- Impact: quote, story, stats ---------- */
onPage("impactQuote", () => {
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
      // Find the photo currently at the left edge, then scroll exactly to its neighbour
      const slides = [...gallery.children];
      const current = slides.findIndex(sl => sl.offsetLeft - gallery.offsetLeft >= gallery.scrollLeft - 5);
      const target = slides[Math.min(slides.length - 1, Math.max(0, current + dir))];
      gallery.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
    });
  });
});

/* ---------- About ---------- */
onPage("aboutText", () => {
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
});

/* ---------- Contact form (no server: opens the visitor's email app with the message filled in) ---------- */
onPage("contactForm", () => {
  $("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Portfolio message from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

/* ---------- Chat assistant: cartoon twin + speech bubble (keyword matching, no AI) ---------- */
onPage("chat", () => {
  const avatarWrap = $("avatarWrap"), avatarStack = $("avatarStack"), avatarStill = $("avatarStill"), avatarVideo = $("avatarVideo");
  const bubble = $("bubble"), bubbleText = $("bubbleText"), youAsked = $("youAsked");
  $("chatIntro").textContent = CHAT.intro;

  // Still portrait before and after answering; the muted video plays only while the twin is answering
  avatarStill.src = PROFILE.avatar;
  avatarVideo.src = PROFILE.avatarVideo;
  const startVideo = () => {
    avatarVideo.currentTime = 0;
    avatarVideo.play().then(() => avatarStack.classList.add("playing")).catch(() => {});
  };
  const stopVideo = () => { avatarStack.classList.remove("playing"); avatarVideo.pause(); };
  // No portrait yet? Show a circle with initials instead of a broken image.
  avatarStill.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "avatar avatar-fallback";
    ph.textContent = PROFILE.name.split(" ").map(w => w[0]).join("");
    avatarStack.replaceWith(ph);
  };

  // The answers come from js/chat-engine.js (keyword scoring, typo tolerance, follow-up memory)
  const bot = ChatEngine.create({ PROFILE, SKILLS, PROJECTS, EXPERIENCE, VOLUNTEERING, ACHIEVEMENTS, CHAT });

  // Restart a CSS animation by removing the class, forcing a reflow, then adding it back
  function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  /* Speaking: words appear one by one while the twin nods along.
     Screen readers get the full answer at once (word-by-word would be noisy). */
  const reduceMotionChat = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let speakTimer;
  function say(text, playVideo = true) {
    clearInterval(speakTimer);
    bubble.classList.remove("thinking");
    replay(bubble, "pop");
    $("srAnswer").textContent = text;
    if (reduceMotionChat) { bubbleText.textContent = text; return; }
    const words = text.split(" ");
    let i = 0;
    bubbleText.textContent = "";
    avatarWrap.classList.add("talking");
    if (playVideo) startVideo();
    speakTimer = setInterval(() => {
      bubbleText.textContent += (i ? " " : "") + words[i++];
      if (i >= words.length) { clearInterval(speakTimer); avatarWrap.classList.remove("talking"); stopVideo(); }
    }, 70);   // ~14 words per second feels like quick speech
  }

  function ask(q) {
    q = q.trim();
    if (!q) return;
    youAsked.textContent = `You: ${q}`;
    bubbleText.textContent = "";
    bubble.classList.add("thinking");                // shows animated dots
    setTimeout(() => {
      const r = bot.reply(q);
      say(r.text);
      showSuggestions(r.suggestions);
    }, 700);
  }
  say(CHAT.greeting);   // the intro plays the video too, then the still portrait returns
  // Default suggestions; when the bot is unsure it swaps in "did you mean" questions
  const showSuggestions = list => {
    $("chatSuggest").innerHTML = (list && list.length ? list : CHAT.suggestions)
      .map(s => `<button type="button">${esc(s)}</button>`).join("");
  };
  showSuggestions();
  $("chatSuggest").addEventListener("click", e => { if (e.target.tagName === "BUTTON") ask(e.target.textContent); });
  $("chatForm").addEventListener("submit", e => {
    e.preventDefault();
    ask($("chatInput").value);
    $("chatInput").value = "";
  });
});

/* ---------- Reveal-on-scroll animation ---------- */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
