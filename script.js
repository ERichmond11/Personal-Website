/* Global interactions for the static site:
 * - dropdown toggles (Projects/LeetCode)
 * - reveal-on-scroll animation
 * - active nav highlighting
 * - brand/apparel image sliders (no duplicate IDs required)
 */

function getCurrentPageFilename() {
  const path = window.location.pathname || "";
  const last = path.split("/").filter(Boolean).pop() || "";
  // When hosted with SPA rewrites, pathname may be "/" or "", treat as index.html
  return last === "" ? "index.html" : last;
}

function initActiveNav() {
  const current = getCurrentPageFilename();
  const links = document.querySelectorAll("header nav a[href]");
  links.forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === current) a.classList.add("active");
  });
}

// ---------------- Dropdown interactions ----------------
// Keep this as a global for existing inline onclick="toggleDropdown(...)"
function toggleDropdown(id, button) {
  const list = document.getElementById(id);
  if (!list) return;

  const allLists = document.querySelectorAll(".dropdown-content");
  const allButtons = document.querySelectorAll(".dropbtn");

  // close other dropdowns
  allLists.forEach(l => {
    if (l !== list) l.classList.remove("show");
  });

  allButtons.forEach(b => {
    if (b !== button) b.innerHTML = b.innerHTML.replace("▴", "▾");
    if (b !== button) b.setAttribute("aria-expanded", "false");
  });

  // toggle current dropdown
  const willShow = !list.classList.contains("show");
  list.classList.toggle("show", willShow);
  if (button) {
    button.setAttribute("aria-expanded", willShow ? "true" : "false");
    button.innerHTML = willShow
      ? button.innerHTML.replace("▾", "▴")
      : button.innerHTML.replace("▴", "▾");
  }
}

// ---------------- Reveal on scroll ----------------
function initReveal() {
  const items = Array.from(document.querySelectorAll(".fade-in"));
  if (items.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );

  items.forEach(el => io.observe(el));
}

// ---------------- Brand sliders ----------------
function parseImagesAttr(raw) {
  return (raw || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function setSliderIndex(slider, idx) {
  const images = parseImagesAttr(slider.getAttribute("data-images"));
  const img = slider.querySelector("img");
  if (!img || images.length === 0) return;

  const clamped = ((idx % images.length) + images.length) % images.length;
  slider.setAttribute("data-index", String(clamped));
  img.src = images[clamped];

  const prevBtn = slider.querySelector('[data-dir="prev"]');
  const nextBtn = slider.querySelector('[data-dir="next"]');
  const disabled = images.length < 2;
  if (prevBtn) prevBtn.disabled = disabled;
  if (nextBtn) nextBtn.disabled = disabled;
}

function initSliders() {
  const sliders = document.querySelectorAll("[data-slider][data-images]");
  sliders.forEach(slider => {
    const images = parseImagesAttr(slider.getAttribute("data-images"));
    if (images.length === 0) return;

    // Ensure initial state matches markup
    setSliderIndex(slider, 0);

    slider.addEventListener("click", e => {
      const btn = e.target && e.target.closest && e.target.closest("[data-dir]");
      if (!btn) return;
      const dir = btn.getAttribute("data-dir");
      const current = Number(slider.getAttribute("data-index") || "0");
      setSliderIndex(slider, dir === "prev" ? current - 1 : current + 1);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initActiveNav();
  initReveal();
  initSliders();
});

// Expose only what existing HTML expects
window.toggleDropdown = toggleDropdown;


