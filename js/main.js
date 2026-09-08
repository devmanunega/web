/* ============================================================
   PORTFOLIO · Punto de entrada
   Orquesta la inicialización de los módulos de la aplicación.
   Los módulos ES son deferred por defecto: el DOM ya está
   disponible cuando este script se ejecuta.
   ============================================================ */

import { initTheme } from "./modules/theme.js";
import { initCursor } from "./modules/cursor.js";
import { initTypewriter } from "./modules/typewriter.js";
import { initNavbar } from "./modules/navbar.js";
import { initRevealAnimations } from "./modules/reveal.js";
import { initScrollSpy } from "./modules/scrollspy.js";
import { initContactForm } from "./modules/contactForm.js";

/* Frases del efecto de escritura (contenido editable en un solo lugar) */
const TYPED_PHRASES = [
  "Desarrollador Full-Stack",
  "Especialista en C# y .Net",
  "Creador de soluciones digitales",
  "Amante del código limpio",
];

function init() {
  // Cada módulo verifica la existencia de sus elementos del DOM
  // y termina temprano si no existen: un módulo ausente nunca
  // rompe la inicialización de los demás.
  initTheme();
  initCursor();
  initTypewriter(TYPED_PHRASES);
  initNavbar();
  initRevealAnimations();
  initScrollSpy();
  initContactForm();

  /* ---------- Año actual en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Marca de "aplicación cargada": la usa el guardián de carga
  // en index.html para detectar fallos de módulos (p. ej. file://).
  document.documentElement.classList.add("js-ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
