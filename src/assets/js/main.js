/* PANDAI — nav + accessibility widget (vanilla JS, no dependencies) */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Accessibility widget ---------- */
  var STORAGE_KEY = "pandai-a11y";
  var body = document.body;
  var fab = document.getElementById("a11y-fab");
  var panel = document.getElementById("a11y-panel");
  var closeBtn = document.getElementById("a11y-close");
  var resetBtn = document.getElementById("a11y-reset");
  var ruler = document.getElementById("a11y-ruler");

  var state = {
    fontScale: 1,
    contrast: false,
    dyslexia: false,
    links: false,
    ruler: false,
    motion: false,
    spacing: false
  };

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === "object") {
        Object.keys(state).forEach(function (k) {
          if (k in saved) state[k] = saved[k];
        });
      }
    } catch (e) { /* ignore corrupt storage */ }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage unavailable */ }
  }

  function apply() {
    document.documentElement.style.setProperty("--font-scale", state.fontScale);
    body.classList.toggle("a11y-contrast", state.contrast);
    body.classList.toggle("a11y-dyslexia", state.dyslexia);
    body.classList.toggle("a11y-links", state.links);
    body.classList.toggle("a11y-ruler", state.ruler);
    body.classList.toggle("a11y-motion", state.motion);
    body.classList.toggle("a11y-spacing", state.spacing);

    document.querySelectorAll("[data-a11y-toggle]").forEach(function (btn) {
      var key = btn.getAttribute("data-a11y-toggle");
      btn.setAttribute("aria-pressed", state[key] ? "true" : "false");
    });

    var display = document.getElementById("a11y-font-display");
    if (display) display.textContent = Math.round(state.fontScale * 100) + "%";
  }

  load();
  apply();

  if (fab && panel) {
    fab.addEventListener("click", function () {
      var isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        fab.setAttribute("aria-expanded", "true");
        var first = panel.querySelector("button");
        if (first) first.focus();
      } else {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
        fab.focus();
      });
    }

    /* Esc closes the panel (WCAG 2.1.2 — no keyboard trap) */
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
        fab.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!panel.hasAttribute("hidden") && !panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
        panel.setAttribute("hidden", "");
        fab.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-a11y-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-a11y-toggle");
      state[key] = !state[key];
      apply();
      save();
    });
  });

  var incBtn = document.getElementById("a11y-font-inc");
  var decBtn = document.getElementById("a11y-font-dec");

  if (incBtn) {
    incBtn.addEventListener("click", function () {
      state.fontScale = Math.min(1.6, Math.round((state.fontScale + 0.1) * 10) / 10);
      apply();
      save();
    });
  }

  if (decBtn) {
    decBtn.addEventListener("click", function () {
      state.fontScale = Math.max(0.8, Math.round((state.fontScale - 0.1) * 10) / 10);
      apply();
      save();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      state = { fontScale: 1, contrast: false, dyslexia: false, links: false, ruler: false, motion: false, spacing: false };
      apply();
      save();
    });
  }

  /* Reading guide follows the pointer */
  if (ruler) {
    document.addEventListener("mousemove", function (e) {
      if (body.classList.contains("a11y-ruler")) {
        ruler.style.top = (e.clientY - ruler.offsetHeight / 2) + "px";
      }
    });
  }

  /* ---------- Copy account number (donate page) ---------- */
  var copyBtn = document.getElementById("copy-account");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var acc = copyBtn.getAttribute("data-account");
      navigator.clipboard.writeText(acc).then(function () {
        var status = document.getElementById("copy-status");
        if (status) {
          status.textContent = copyBtn.getAttribute("data-copied-label");
        }
      });
    });
  }
})();
