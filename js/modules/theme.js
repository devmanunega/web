/* ============================================================
   Módulo: tema claro / oscuro
   Estado + persistencia (localStorage seguro) + sincronización
   con la preferencia del sistema.
   ============================================================ */

const THEME_KEY = "theme";
const rootEl = document.documentElement;

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null; // almacenamiento no disponible (navegación privada)
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* sin persistencia: el tema solo dura la sesión */
  }
}

export function applyTheme(theme, themeToggle) {
  rootEl.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
  }
}

export function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // El tema ya fue aplicado por el script inline del <head> (anti-FOUC).
  // Solo se sincroniza el estado del botón.
  applyTheme(rootEl.getAttribute("data-theme") === "light" ? "light" : "dark", themeToggle);

  themeToggle.addEventListener("click", () => {
    const next = rootEl.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next, themeToggle);
    storeTheme(next);
  });

  // Si el usuario nunca eligió un tema, seguir los cambios del sistema en vivo
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? "light" : "dark", themeToggle);
    }
  };
  if (media.addEventListener) {
    media.addEventListener("change", onSystemChange);
  } else if (media.addListener) {
    media.addListener(onSystemChange); // Safari antiguo
  }
}
