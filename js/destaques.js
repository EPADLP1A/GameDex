// =========================================================
// Game Dex – Carrossel infinito de destaques (Aluno 1)
// - Mostra 4 jogos de cada vez (2 em tablet, 1 em telemóvel)
// - Setas, teclado e swipe; o ciclo nunca acaba.
// Nota para o Aluno 2: esta lista pode ser substituída pelo JSON
// do catálogo; basta manter os campos usados em criarCartao().
// =========================================================

(function () {
  "use strict";

  const JOGOS = [
    { nome: "Grand Theft Auto V", genero: "Ação", ano: 2013, plataformas: "PC · PS · Xbox", emoji: "🚗", c1: "#f59e0b", c2: "#ef4444" },
    { nome: "Counter-Strike 2", genero: "Tiro", ano: 2023, plataformas: "PC", emoji: "🔫", c1: "#f97316", c2: "#334155" },
    { nome: "Valorant", genero: "Tiro", ano: 2020, plataformas: "PC", emoji: "🎯", c1: "#ef4444", c2: "#be185d", foco: "85% center" },
    { nome: "Minecraft", genero: "Sandbox", ano: 2011, plataformas: "PC · PS · Xbox · Switch", emoji: "⛏️", c1: "#10b981", c2: "#0ea5e9" },
    { nome: "Fortnite", genero: "Battle Royale", ano: 2017, plataformas: "PC · PS · Xbox · Switch", emoji: "🪂", c1: "#8b5cf6", c2: "#38bdf8" },
    { nome: "League of Legends", genero: "MOBA", ano: 2009, plataformas: "PC", emoji: "🏰", c1: "#0ea5e9", c2: "#1e3a8a" },
    { nome: "The Witcher 3", genero: "RPG", ano: 2015, plataformas: "PC · PS · Xbox · Switch", emoji: "🐺", c1: "#64748b", c2: "#7c3aed" },
    { nome: "Elden Ring", genero: "RPG", ano: 2022, plataformas: "PC · PS · Xbox", emoji: "⚔️", c1: "#a855f7", c2: "#ec4899" },
    { nome: "Red Dead Redemption 2", genero: "Aventura", ano: 2018, plataformas: "PC · PS · Xbox", emoji: "🤠", c1: "#b45309", c2: "#7f1d1d" },
    { nome: "EA Sports FC 25", genero: "Desporto", ano: 2024, plataformas: "PC · PS · Xbox · Switch", emoji: "⚽", c1: "#16a34a", c2: "#0ea5e9" },
    { nome: "Rocket League", genero: "Desporto", ano: 2015, plataformas: "PC · PS · Xbox · Switch", emoji: "🚀", c1: "#2563eb", c2: "#f97316" },
    { nome: "Overwatch 2", genero: "Tiro", ano: 2022, plataformas: "PC · PS · Xbox · Switch", emoji: "🛡️", c1: "#f59e0b", c2: "#3b82f6" },
    { nome: "Apex Legends", genero: "Battle Royale", ano: 2019, plataformas: "PC · PS · Xbox · Switch", emoji: "🔥", c1: "#dc2626", c2: "#7f1d1d" },
    { nome: "Call of Duty: Warzone", genero: "Battle Royale", ano: 2020, plataformas: "PC · PS · Xbox", emoji: "🪖", c1: "#4b5563", c2: "#16a34a" },
    { nome: "Zelda: Breath of the Wild", genero: "Aventura", ano: 2017, plataformas: "Switch", emoji: "🗡️", c1: "#22c55e", c2: "#38bdf8" },
    { nome: "God of War", genero: "Ação", ano: 2018, plataformas: "PC · PS", emoji: "🪓", c1: "#b91c1c", c2: "#1e293b" },
    { nome: "Cyberpunk 2077", genero: "RPG", ano: 2020, plataformas: "PC · PS · Xbox", emoji: "🤖", c1: "#eab308", c2: "#db2777" },
    { nome: "Among Us", genero: "Social", ano: 2018, plataformas: "PC · Mobile · Switch", emoji: "👨‍🚀", c1: "#ef4444", c2: "#6366f1" },
    { nome: "Albion Online", genero: "MMORPG", ano: 2017, plataformas: "PC · Mobile", emoji: "🐉", c1: "#b91c1c", c2: "#7c2d12" },
    { nome: "Forza Horizon 5", genero: "Corrida", ano: 2021, plataformas: "PC · Xbox", emoji: "🏎️", c1: "#f43f5e", c2: "#f59e0b" }
  ];

  const track = document.getElementById("carousel-track");
  const btnPrev = document.getElementById("carousel-prev");
  const btnNext = document.getElementById("carousel-next");
  const viewport = document.getElementById("carousel-viewport");
  if (!track || !btnPrev || !btnNext || !viewport) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION = reduceMotion ? 0 : 450;

  // "Grand Theft Auto V" -> "grand-theft-auto-v" (nome do ficheiro em img/)
  function slug(texto) {
    return texto
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function criarCartao(j) {
    const art = document.createElement("article");
    art.className = "game-card";
    art.innerHTML =
      '<div class="game-cover" style="--c1:' + j.c1 + ";--c2:" + j.c2 + '" aria-hidden="true">' + j.emoji + "</div>" +
      '<div class="game-body">' +
      "<h3></h3>" +
      '<p class="platforms"></p>' +
      '<div class="game-meta"><span class="tag"></span><span class="year"></span></div>' +
      "</div>";
    // Se existir img/<slug>.jpg usa-a; se não existir, fica o fundo colorido com emoji.
    const capa = art.querySelector(".game-cover");
    const img = new Image();
    img.alt = "Capa de " + j.nome;
    if (j.foco) img.style.objectPosition = j.foco; // parte da imagem que fica visível
    img.onload = () => { capa.textContent = ""; capa.appendChild(img); capa.classList.add("has-image"); };
    img.src = "img/" + slug(j.nome) + ".jpg";
    art.querySelector("h3").textContent = j.nome;
    art.querySelector(".platforms").textContent = j.plataformas;
    art.querySelector(".tag").textContent = j.genero;
    art.querySelector(".year").textContent = j.ano;
    return art;
  }

  JOGOS.forEach((j) => track.appendChild(criarCartao(j)));

  let busy = false;

  function passo() {
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function mover(x, animar) {
    track.style.transition = animar ? "transform " + DURATION + "ms ease" : "none";
    track.style.transform = "translateX(" + x + "px)";
  }

  // Avança 1 jogo: o primeiro vai para o fim, por isso nunca acaba.
  function seguinte() {
    if (busy) return;
    busy = true;
    mover(-passo(), true);
    setTimeout(() => {
      track.appendChild(track.firstElementChild);
      mover(0, false);
      busy = false;
    }, DURATION);
  }

  // Recua 1 jogo: o último passa para o início.
  function anterior() {
    if (busy) return;
    busy = true;
    const p = passo();
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    mover(-p, false);
    void track.offsetWidth; // força o browser a aplicar a posição antes de animar
    mover(0, true);
    setTimeout(() => { busy = false; }, DURATION);
  }

  btnNext.addEventListener("click", seguinte);
  btnPrev.addEventListener("click", anterior);

  // Teclado (setas) quando o carrossel tem foco
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); seguinte(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); anterior(); }
  });

  // Swipe no telemóvel
  let startX = null;
  viewport.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? seguinte : anterior)();
    startX = null;
  });

  // Se o ecrã mudar de tamanho, repõe a posição
  window.addEventListener("resize", () => mover(0, false));
})();
