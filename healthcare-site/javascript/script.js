const toggleButton = document.getElementById("accessibilityToggle");
const panel = document.getElementById("accessibilityPanel");

if (toggleButton && panel) {
  toggleButton.addEventListener("click", () => {
    panel.classList.toggle("open");
    const expanded = panel.classList.contains("open");
    toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

const body = document.body;

function clearModes() {
  body.classList.remove("dark-mode", "warm-mode", "high-contrast");
}

function clearFonts() {
  body.classList.remove("font-large", "font-xl");
}

function setTheme(theme) {
  clearModes();

  if (theme !== "default") {
    body.classList.add(theme);
  }

  localStorage.setItem("siteTheme", theme);
  updateActiveButtons();
}

function setFont(font) {
  clearFonts();

  if (font === "large") {
    body.classList.add("font-large");
  } else if (font === "xl") {
    body.classList.add("font-xl");
  }

  localStorage.setItem("siteFont", font);
  updateActiveButtons();
}

function updateActiveButtons() {
  const savedTheme = localStorage.getItem("siteTheme") || "default";
  const savedFont = localStorage.getItem("siteFont") || "normal";

  document.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === savedTheme);
  });

  document.querySelectorAll("[data-font]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.font === savedFont);
  });
}

document.querySelectorAll("[data-theme]").forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

document.querySelectorAll("[data-font]").forEach((btn) => {
  btn.addEventListener("click", () => setFont(btn.dataset.font));
});

const resetButton = document.getElementById("resetAccessibility");

if (resetButton) {
  resetButton.addEventListener("click", () => {
    clearModes();
    clearFonts();
    localStorage.setItem("siteTheme", "default");
    localStorage.setItem("siteFont", "normal");
    updateActiveButtons();
  });
}

(function loadSavedAccessibility() {
  const savedTheme = localStorage.getItem("siteTheme") || "default";
  const savedFont = localStorage.getItem("siteFont") || "normal";

  if (savedTheme !== "default") {
    body.classList.add(savedTheme);
  }

  if (savedFont === "large") {
    body.classList.add("font-large");
  } else if (savedFont === "xl") {
    body.classList.add("font-xl");
  }

  updateActiveButtons();
})();