# devManu · Portafolio Web

Portafolio personal de **devManu**, desarrollador full-stack. Sitio estático construido con **HTML5, CSS3 y JavaScript vanilla** (módulos ES nativos), con diseño *dark glassmorphism*, animaciones y soporte de modo claro/oscuro.

## ✨ Características

- **Modo claro / oscuro** con detección automática de la preferencia del sistema (`prefers-color-scheme`), persistencia en `localStorage` (segura, sin romper en navegación privada) y script anti-FOUC en el `<head>`.
- **Diseño responsive** (desktop, tablet, móvil) con menú hamburguesa a pantalla completa y bloqueo de scroll al abrirse.
- **Animaciones al hacer scroll** basadas en `IntersectionObserver` (aparición de secciones, barras de habilidades, contadores animados).
- **Efecto de escritura** (typewriter) en el hero.
- **Cursor personalizado** con seguimiento suavizado (se desactiva en dispositivos táctiles).
- **Scrollspy**: el enlace de navegación se marca activo según la sección visible.
- **Formulario de contacto** con validación client-side y envío simulado (punto de integración documentado para backend/Formspree).
- **Accesibilidad**: `aria-label`/`aria-expanded` en controles, `prefers-reduced-motion` respetado.

## 🗂 Estructura del proyecto

```
web/
├── index.html            # Página única (one-page) con script anti-FOUC y guardián de carga
├── css/
│   └── styles.css        # Variables de tema (claro/oscuro), glassmorphism, responsive
├── js/
│   ├── main.js           # Punto de entrada: importa e inicializa los módulos
│   └── modules/          # Un módulo ES por responsabilidad
│       ├── theme.js      # Modo claro/oscuro + persistencia
│       ├── cursor.js     # Cursor personalizado
│       ├── typewriter.js # Efecto de escritura
│       ├── navbar.js     # Scroll, progreso de lectura y menú móvil
│       ├── reveal.js     # Factory de IntersectionObserver + contadores
│       ├── scrollspy.js  # Link activo por sección
│       └── contactForm.js# Validación y envío del formulario
└── images/
```

## 🚀 Puesta en marcha

> ⚠️ **Importante**: el proyecto usa **módulos ES nativos** (`<script type="module">`), que los navegadores bloquean al abrir el sitio directamente con `file://` (doble clic en `index.html`). Sirve el sitio con cualquier servidor estático:

```bash
# Opción 1 (Node.js)
npx serve .

# Opción 2 (Python)
python -m http.server 8080
```

Luego abre `http://localhost:8080` (o el puerto que indique tu herramienta).

Si los módulos no llegan a cargar, la consola del navegador mostrará una advertencia con estas instrucciones.

## 🔧 Personalización

| Qué | Dónde |
|---|---|
| Frases del typewriter | `TYPED_PHRASES` en `js/main.js` |
| Temas de color | Bloques `:root` (oscuro) y `html[data-theme="light"]` en `css/styles.css` |
| Backend del formulario | Sustituir la simulación en `js/modules/contactForm.js` |
| Contadores del hero | Atributos `data-count` en `index.html` |

## 🧹 Caché de assets

Los archivos estáticos se versionan por query string (`styles.css?v=4`, `main.js?v=5`). **Al modificar CSS o JS, incrementa la versión** en `index.html` para forzar a los navegadores a descargar la nueva versión.

## 🌿 Flujo de trabajo (Git)

- **`master`**: rama estable de producción.
- **`Develop`**: rama de integración.
- Ramas de trabajo por cambio: `feat/*`, `fix/*`, `refactor/*`, `docs/*`.
- Los commits siguen la convención [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `refactor:`, `docs:`) y las integraciones se hacen con `--no-ff` para preservar el historial.

```
feat/fix/refactor/docs/*  →  Develop  →  master
```

## 🛠 Tecnologías

- HTML5 semántico
- CSS3 (variables, grid, glassmorphism, `color-scheme`)
- JavaScript vanilla · módulos ES nativos (sin frameworks ni build step)
