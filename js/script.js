/* ============================================================
   PORTFOLIO · Interacciones
   ============================================================ */
"use strict";

/* ---------- Modo claro / oscuro ---------- */
const THEME_KEY = "theme";
const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null; // almacenamiento no disponible (navegación privada)
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* sin persistencia: el tema solo dura la sesión */
  }
}

function applyTheme(theme) {
  rootEl.setAttribute("data-theme", theme);
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  );
}

(function initTheme() {
  // El tema ya fue aplicado por el script inline del <head> (anti-FOUC).
  // Solo se sincroniza el estado del botón.
  const current = rootEl.getAttribute("data-theme") === "light" ? "light" : "dark";
  applyTheme(current);

  themeToggle.addEventListener("click", () => {
    const next = rootEl.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    storeTheme(next);
  });

  // Si el usuario nunca eligió un tema, seguir los cambios del sistema en vivo
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? "light" : "dark");
    }
  };
  if (media.addEventListener) {
    media.addEventListener("change", onSystemChange);
  } else if (media.addListener) {
    media.addListener(onSystemChange); // Safari antiguo
  }
})();

/* ---------- Cursor personalizado ---------- */
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  (function follow() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll("a, button, .chip, .project, .card, input, textarea").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });
} else {
  dot.style.display = "none";
  ring.style.display = "none";
}

/* ---------- Efecto de escritura ---------- */
const phrases = [
  "Desarrollador Full-Stack",
  "Especialista en C# y .Net",
  "Creador de soluciones digitales",
  "Amante del código limpio",
];
const typedEl = document.getElementById("typed");
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  typedEl.textContent = current.slice(0, charIdx);

  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(type, 65);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(type, 32);
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(type, 1800); // pausa al terminar frase
    } else {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }
}
type();

/* ---------- Navbar: fondo al hacer scroll + progreso ---------- */
const navbar = document.getElementById("navbar");
const progress = document.querySelector(".scroll-progress");

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menú móvil ---------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Animaciones al hacer scroll (IntersectionObserver) ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Contadores del hero
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Las barras de habilidades también se animan al ser visibles */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".skill").forEach((el) => skillObserver.observe(el));

/* ---------- Contador animado ---------- */
function animateCount(el) {
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

/* ---------- Link activo según sección ---------- */
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---------- Formulario de contacto (demo, sin backend) ---------- */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const empty = !field.value.trim();
    const badEmail = field.type === "email" && !/^\S+@\S+\.\S+$/.test(field.value);
    field.classList.toggle("invalid", empty || badEmail);
    if (empty || badEmail) valid = false;
  });

  if (!valid) {
    status.textContent = "Por favor, completa todos los campos correctamente.";
    status.className = "form-status err";
    return;
  }

  // Simulación de envío (conecta aquí tu backend o servicio como Formspree)
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  setTimeout(() => {
    status.textContent = "¡Mensaje enviado! Te responderé en menos de 24 horas. ✨";
    status.className = "form-status ok";
    form.reset();
    btn.disabled = false;
    btn.innerHTML = 'Enviar mensaje <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  }, 1200);
});

/* ---------- Año actual en el footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
