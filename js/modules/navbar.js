/* ============================================================
   Módulo: navbar
   - Fondo con blur al hacer scroll
   - Barra de progreso de lectura
   - Menú móvil (hamburguesa)
   ============================================================ */

const SCROLLED_THRESHOLD = 40;

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const progress = document.querySelector(".scroll-progress");
  if (!navbar) return;

  /* ---------- Fondo al hacer scroll + progreso ---------- */
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > SCROLLED_THRESHOLD);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  if (!hamburger || !navLinks) return;

  function setMobileMenu(open) {
    navLinks.classList.toggle("open", open);
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    // El navbar no debe tener backdrop-filter mientras el menú esté abierto:
    // un filtro convierte al navbar en el containing block de los elementos
    // position:fixed y confina el menú al alto del navbar.
    navbar.classList.toggle("menu-open", open);
    // Bloquear el scroll del fondo mientras el menú esté abierto
    document.body.style.overflow = open ? "hidden" : "";
  }

  hamburger.addEventListener("click", () => {
    setMobileMenu(!navLinks.classList.contains("open"));
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMobileMenu(false))
  );
}
