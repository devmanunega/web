/* ============================================================
   Módulo: formulario de contacto
   Validación client-side + envío simulado.
   Para conectar un backend real, define window.FORM_ENDPOINT
   (ej. Formspree) o sustituye la simulación en submitForm().
   ============================================================ */

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const FAKE_SEND_DELAY_MS = 1200;
const SUBMIT_LABEL = 'Enviar mensaje <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';

export function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  function setStatus(message, type) {
    status.textContent = message;
    status.className = `form-status ${type}`;
  }

  function validate() {
    let valid = true;
    form.querySelectorAll("input, textarea").forEach((field) => {
      const empty = !field.value.trim();
      const badEmail = field.type === "email" && !EMAIL_RE.test(field.value);
      field.classList.toggle("invalid", empty || badEmail);
      if (empty || badEmail) valid = false;
    });
    return valid;
  }

  // Simulación de envío (conecta aquí tu backend o servicio como Formspree)
  function submitForm(btn) {
    btn.disabled = true;
    btn.textContent = "Enviando...";

    setTimeout(() => {
      setStatus("¡Mensaje enviado! Te responderé en menos de 24 horas. ✨", "ok");
      form.reset();
      btn.disabled = false;
      btn.innerHTML = SUBMIT_LABEL;
    }, FAKE_SEND_DELAY_MS);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("Por favor, completa todos los campos correctamente.", "err");
      return;
    }
    submitForm(form.querySelector("button[type=submit]"));
  });
}
