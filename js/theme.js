const THEME_KEY = "scopesprint.theme.v1";

export function resolveInitialTheme(saved, systemPrefersDark) {
  return saved === "light" || saved === "dark" ? saved : systemPrefersDark ? "dark" : "light";
}

function readChoice() {
  try { return localStorage.getItem(THEME_KEY); }
  catch { return null; }
}

function saveChoice(theme) {
  try { localStorage.setItem(THEME_KEY, theme); }
  catch { /* The current page still follows the selected theme for this visit. */ }
}

export function setupThemeToggle() {
  const root = document.documentElement;
  const button = document.querySelector("#theme-toggle");
  const saved = readChoice();
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  let theme = resolveInitialTheme(saved, systemPrefersDark);
  let manualChoice = Boolean(saved);

  const applyTheme = () => {
    root.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    button.innerHTML = `<span aria-hidden="true">${theme === "dark" ? "☼" : "☾"}</span><span>${theme === "dark" ? "Light mode" : "Dark mode"}</span>`;
  };

  applyTheme();
  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    manualChoice = true;
    saveChoice(theme);
    applyTheme();
  });

  if (!saved && window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", (event) => {
      if (manualChoice) return;
      theme = event.matches ? "dark" : "light";
      applyTheme();
    });
  }
}
