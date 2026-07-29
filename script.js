/* script.js — theme toggle + gentle reveal-on-scroll.
   Shared across all pages. Kept dependency-free. */

(function () {
  "use strict";

  /* ---- Theme toggle ---- */
  var root = document.documentElement;
  var btn = document.querySelector(".toggle");

  function store(theme) {
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      btn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
      store(next);
    });
  }

  /* ---- Reveal on scroll ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 60, 240) + "ms";
    io.observe(el);
  });
})();
