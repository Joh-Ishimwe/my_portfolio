/*
  Shared header + footer for every page, so the menu is written once.
  Each page sets <body data-page="home|about|toolbox|impact"> to highlight its menu link.
*/
const PAGES = [
  { id: "home",    href: "index.html",   label: "Home" },
  { id: "about",   href: "about.html",   label: "About me" },
  { id: "toolbox", href: "toolbox.html", label: "Toolbox" },
  { id: "impact",  href: "impact.html",  label: "Impact" }
];
(function renderLayout() {
  const current = document.body.dataset.page;
  const nav = document.getElementById("siteNav");
  if (nav) nav.innerHTML = `
    <a class="logo" href="index.html">Joh.</a>
    <nav aria-label="Main">
      ${PAGES.map(p => `<a href="${p.href}"${p.id === current ? ' aria-current="page"' : ""}>${p.label}</a>`).join("")}
    </nav>
    <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode">◐</button>`;

  const foot = document.getElementById("siteFooter");
  const labels = { linkedin: "LinkedIn", github: "GitHub", medium: "Blog" };
  if (foot) foot.innerHTML = `
    <h2>Let's build something reliable.</h2>
    <a class="big-mail" href="mailto:${PROFILE.email}">${PROFILE.email}</a>
    <div class="socials">
      ${Object.entries(PROFILE.links).filter(([, url]) => url)
        .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener">${labels[k] || k}</a>`).join("")}
    </div>
    <p class="muted small">© ${new Date().getFullYear()} ${PROFILE.name} · ${PROFILE.location}</p>`;
})();
