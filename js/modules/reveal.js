/* ============================================================
   Módulo: animaciones al hacer scroll
   Factory de IntersectionObserver reutilizable: agrega la clase
   .visible al entrar en pantalla y deja de observar el elemento
   (animación de una sola vez). Desacoplada del comportamiento
   posterior mediante el callback onVisible.
   ============================================================ */

export function createRevealObserver({ selector, threshold = 0.15, rootMargin = "0px", onVisible } = {}) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (typeof onVisible === "function") onVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return observer;
}

export function initRevealAnimations() {
  // Elementos genéricos con animación de aparición (y contadores del hero)
  createRevealObserver({
    selector: ".reveal",
    threshold: 0.15,
    onVisible: (el) => el.querySelectorAll("[data-count]").forEach(animateCount),
  });

  // Barras de habilidades
  createRevealObserver({ selector: ".skill", threshold: 0.4 });
}

/* ---------- Contador animado ---------- */
export function animateCount(el) {
  const target = +el.dataset.count;
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = Math.round(target * eased) + "+";
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
