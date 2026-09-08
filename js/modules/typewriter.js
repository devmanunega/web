/* ============================================================
   Módulo: efecto de escritura
   Máquina de estados escribir/borrar alimentada por setTimeout.
   ============================================================ */

const TYPE_SPEED_MS = 65;
const DELETE_SPEED_MS = 32;
const PAUSE_END_PHRASE_MS = 1800;
const PAUSE_NEXT_PHRASE_MS = 400;

export function initTypewriter(phrases) {
  const typedEl = document.getElementById("typed");
  if (!typedEl || !Array.isArray(phrases) || phrases.length === 0) return;

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    typedEl.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx < current.length) {
      charIdx++;
      setTimeout(type, TYPE_SPEED_MS);
    } else if (deleting && charIdx > 0) {
      charIdx--;
      setTimeout(type, DELETE_SPEED_MS);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, PAUSE_END_PHRASE_MS); // pausa al terminar frase
    } else {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, PAUSE_NEXT_PHRASE_MS);
    }
  }
  type();
}
