/* =========================================================
   GameDex — js/app.js
   Comportamento partilhado + página inicial.

   PARTE A (todas as páginas): menu móvel, link ativo,
            Entrar/Sair, cabeçalho ao fazer scroll, ano do rodapé.
   PARTE B (só index.html): estatísticas, jogos em destaque,
            faixa de capas, animações ao fazer scroll.

   Cada parte só corre se encontrar os elementos na página,
   por isso este ficheiro pode ser usado em todas as páginas.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Configuração (editar aqui)
     --------------------------------------------------------- */
  // Chave do localStorage onde o login (Zakaria) guarda o utilizador com sessão iniciada.
  // Se o login usar outro nome, basta alterar esta linha.
  const SESSION_KEY = "gamedex_session";

  // IDs dos jogos mostrados em "Jogos em destaque". O primeiro aparece em grande (GTA VI).
  // Usar 1 + 4 + múltiplos de 4 (5, 9, 13…) mantém a grelha sem espaços vazios.
  const FEATURED_IDS = [7, 18, 10, 8, 14, 3, 1, 2, 4];

  /* ---------------------------------------------------------
     Utilitários
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Evita que texto dos dados seja interpretado como HTML.
  function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gameUrl = (game) => "detalhes.html?id=" + encodeURIComponent(game.id);
  const formatRating = (n) => Number(n).toFixed(1).replace(".", ",");

  // "PC, PlayStation, Xbox, Nintendo Switch" -> "PC · PlayStation +2"
  function shortPlatforms(platform, max = 2) {
    const list = String(platform).split(",").map((p) => p.trim()).filter(Boolean);
    const shown = list.slice(0, max).join(" · ");
    return list.length > max ? shown + " +" + (list.length - max) : shown;
  }

  /* =========================================================
     PARTE A — Cabeçalho e menu (RF 03)
     ========================================================= */
  function initHeader() {
    const header = $(".site-header");
    const toggle = $(".nav-toggle");
    const menu = $("#menu");
    if (!header || !toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

    // Fundo mais sólido quando a página já não está no topo.
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Marca o link da página atual (funciona em todas as páginas que copiem o cabeçalho).
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$("a[href]", menu).forEach((a) => {
      const target = a.getAttribute("href").split(/[?#]/)[0].toLowerCase();
      if (target === current && !a.classList.contains("nav-cta")) a.setAttribute("aria-current", "page");
    });
  }

  /* ---------- Entrar / Sair ---------- */
  function readSession() {
    try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  function initAuthLink() {
    const link = $("#auth-link");
    if (!link) return;
    if (readSession()) {
      link.textContent = "Sair";
      link.setAttribute("href", "index.html");
      link.addEventListener("click", () => {
        try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignorar */ }
      });
    } else {
      link.textContent = "Entrar";
      link.setAttribute("href", "login.html");
    }
  }

  function initFooterYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* =========================================================
     PARTE B — Página inicial
     ========================================================= */
  const hasGames = typeof games !== "undefined" && Array.isArray(games) && games.length > 0;

  /* ---------- Estatísticas calculadas a partir dos dados ---------- */
  function countUp(el, target) {
    if (reduceMotion || target <= 0) { el.textContent = target; return; }
    const start = performance.now();
    const duration = 900;
    (function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  }

  function renderStats() {
    const elGames = $("#stat-games");
    if (!elGames || !hasGames) return;
    const genres = new Set(games.map((g) => g.genre));
    const platforms = new Set(games.flatMap((g) => String(g.platform).split(",").map((p) => p.trim()).filter(Boolean)));
    countUp(elGames, games.length);
    countUp($("#stat-genres"), genres.size);
    countUp($("#stat-platforms"), platforms.size);
  }

  /* ---------- Jogos em destaque (RF 02) ---------- */
  function gameCard(game, isLarge) {
    return `
      <a class="game-card${isLarge ? " is-large" : ""} reveal" href="${gameUrl(game)}" aria-label="Ver detalhes de ${esc(game.name)}">
        <div class="game-card-media">
          <img src="${esc(game.image)}" alt="Capa de ${esc(game.name)}" width="1280" height="720" loading="${isLarge ? "eager" : "lazy"}" decoding="async">
          <span class="rating" aria-label="Nota ${formatRating(game.rating)} em 10">${formatRating(game.rating)}</span>
        </div>
        <div class="game-card-body">
          <span class="chip">${esc(game.genre)}</span>
          <h3>${esc(game.name)}</h3>
          <p class="game-meta">${esc(game.releaseYear)} · ${esc(shortPlatforms(game.platform))}</p>
          <p class="game-desc">${esc(game.description)}</p>
          <span class="game-more">Ver detalhes <span aria-hidden="true">→</span></span>
        </div>
      </a>`;
  }

  function renderFeatured() {
    const grid = $("#featured-grid");
    if (!grid) return;
    if (!hasGames) {
      grid.innerHTML = '<p class="notice">Não foi possível carregar os jogos. Verifica se o ficheiro js/data.js está incluído.</p>';
      return;
    }
    // Ordem definida em FEATURED_IDS; se algum id não existir, é ignorado.
    let featured = FEATURED_IDS.map((id) => games.find((g) => g.id === id)).filter(Boolean);
    if (featured.length === 0) featured = games.slice().sort((a, b) => b.rating - a.rating).slice(0, 9);

    grid.innerHTML = featured.map((g, i) => gameCard(g, i === 0)).join("");
    $$(".game-card", grid).forEach((card, i) => card.style.setProperty("--d", i * 0.08 + "s"));
    watchImages(grid);
  }

  /* ---------- Faixa de capas ---------- */
  function renderMarquee() {
    const box = $("#marquee");
    if (!box || !hasGames) return;
    const items = games.map((g) => `
      <a class="marquee-item" href="${gameUrl(g)}" tabindex="-1" aria-label="${esc(g.name)}">
        <img src="${esc(g.image)}" alt="" width="1280" height="720" loading="lazy" decoding="async">
        <span>${esc(g.name)}</span>
      </a>`).join("");
    // Duas cópias para o ciclo ser contínuo; a segunda é escondida das tecnologias de apoio.
    box.innerHTML = `<div class="marquee-track"><div class="marquee-set" style="display:contents">${items}</div><div class="marquee-set" style="display:contents" aria-hidden="true">${items}</div></div>`;
    watchImages(box);
  }

  // Se uma imagem não carregar, o cartão mostra o fundo roxo em vez de um ícone partido.
  function watchImages(root) {
    $$("img", root).forEach((img) => {
      const fail = () => { const m = img.closest(".game-card-media, .marquee-item"); if (m) m.classList.add("img-fail"); };
      img.addEventListener("error", fail, { once: true });
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  /* ---------- Animação de entrada ao fazer scroll ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (items.length === 0) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  function init() {
    initHeader();
    initAuthLink();
    initFooterYear();
    renderStats();
    renderFeatured();
    renderMarquee();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
