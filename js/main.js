// =========================================================
// Game Dex – JavaScript partilhado (Aluno 1)
// Comportamento comum a todas as páginas: menu mobile.
// Cada colega deve criar o seu próprio ficheiro (catalogo.js,
// filtros.js, ...) e não mexer neste, para evitar conflitos no Git.
// =========================================================

(function () {
  "use strict";

  // --- Menu hambúrguer (telemóvel) ---
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });

    // Fecha o menu ao clicar num link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  // --- Animação dos números da página inicial ---
  const counters = document.querySelectorAll("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.count);
        const duration = 900;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(end * progress);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    });
    counters.forEach((c) => observer.observe(c));
  }
})();
