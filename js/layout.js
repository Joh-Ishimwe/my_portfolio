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
    </nav>`;

  const foot = document.getElementById("siteFooter");
  // Simple monochrome icons (24x24 paths) for the footer
  const ICONS = {
    email: '<path d="M2 5h20v14H2z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m2 6 10 8 10-8" fill="none" stroke="currentColor" stroke-width="2"/>',
    linkedin: '<path d="M3 3h18v18H3zM7 10v7M7 7v.01M11 17v-7M11 13c0-3 6-3 6 0v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.900-1.300 2.700-1 2.700-1 .5 1.400.2 2.400.1 2.700.6.700 1 1.600 1 2.700 0 3.900-2.400 4.700-4.600 5 .4.300.7.900.7 1.800v2.700c0 .3.200.6.700.5A10 10 0 0 0 12 2z" fill="currentColor"/>',
    medium: '<circle cx="8" cy="12" r="5" fill="currentColor"/><ellipse cx="17" cy="12" rx="2.200" ry="5" fill="currentColor"/><rect x="21" y="7" width="1.500" height="10" fill="currentColor"/>'
  };
  const labels = { linkedin: "LinkedIn", github: "GitHub", medium: "Blog" };
  const iconLink = (href, key, label, external) =>
    `<a href="${href}" aria-label="${label}" title="${label}"${external ? ' target="_blank" rel="noopener"' : ""}>
       <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">${ICONS[key]}</svg></a>`;
  if (foot) foot.innerHTML = `
    <div class="footer-contact">
      <p>Contact me</p>
      <div class="footer-icons">
        ${iconLink(`mailto:${PROFILE.email}`, "email", "Email", false)}
        ${Object.entries(PROFILE.links).filter(([k, url]) => url && ICONS[k])
          .map(([k, url]) => iconLink(url, k, labels[k] || k, true)).join("")}
      </div>
    </div>
    <p class="footer-copy">Copyright © ${new Date().getFullYear()} ${PROFILE.name}. All rights reserved</p>
    <p class="footer-place">${PROFILE.location}</p>`;
})();
