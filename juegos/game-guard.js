// Guardián de salida: muestra un modal de confirmación si el usuario intenta
// abandonar un juego que empezó pero no ha completado.
// Cada juego define window.isGameActive() -> true mientras esté en progreso.
(function () {
  function active() {
    return typeof window.isGameActive === "function" && window.isGameActive();
  }

  // Estilos del modal (inyectados para no depender de cada CSS)
  const style = document.createElement("style");
  style.textContent = `
    .exit-modal {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: rgba(9, 43, 29, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .exit-modal.show {
      opacity: 1;
      pointer-events: auto;
    }
    .exit-card {
      background: #fff;
      border-radius: 22px;
      padding: 2rem 1.8rem;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 30px 80px rgba(9, 43, 29, 0.35);
      transform: translateY(20px) scale(0.96);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .exit-modal.show .exit-card {
      transform: translateY(0) scale(1);
    }
    .exit-icon {
      font-size: 3rem;
      margin-bottom: 0.4rem;
      animation: exit-bounce 1.4s ease-in-out infinite;
    }
    @keyframes exit-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .exit-card h2 {
      margin: 0 0 0.5rem;
      color: #2a7d57;
      font-size: 1.4rem;
    }
    .exit-card p {
      margin: 0 0 1.5rem;
      color: #4d6b63;
      line-height: 1.6;
    }
    .exit-actions {
      display: flex;
      gap: 0.8rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .exit-actions button {
      padding: 0.85rem 1.5rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .exit-actions button:hover { transform: translateY(-2px); }
    .exit-stay {
      background: #2a7d57;
      color: #fff;
    }
    .exit-stay:hover { background: #1f5e3b; }
    .exit-leave {
      background: #f1f5f4;
      color: #b91c1c;
    }
    .exit-leave:hover { background: #fee2e2; }
  `;
  document.head.appendChild(style);

  // Estructura del modal
  const overlay = document.createElement("div");
  overlay.className = "exit-modal";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="exit-card">
      <div class="exit-icon">🚪</div>
      <h2>¿Salir del juego?</h2>
      <p>Aún no has terminado. Si sales ahora perderás tu progreso.</p>
      <div class="exit-actions">
        <button class="exit-stay" type="button">Seguir jugando</button>
        <button class="exit-leave" type="button">Salir de todos modos</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  let pendingHref = null;

  function openModal(href) {
    pendingHref = href;
    overlay.classList.add("show");
  }
  function closeModal() {
    overlay.classList.remove("show");
    pendingHref = null;
  }

  overlay.querySelector(".exit-stay").addEventListener("click", closeModal);
  overlay.querySelector(".exit-leave").addEventListener("click", () => {
    const href = pendingHref;
    closeModal();
    if (href) window.location.href = href;
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeModal();
  });

  // Interceptar cualquier enlace que salga de la página
  document.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (active()) {
        e.preventDefault();
        openModal(href);
      }
    });
  });
})();
