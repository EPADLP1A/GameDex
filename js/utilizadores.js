/* =========================================================
   GameDex — js/utilizadores.js
   Contas de utilizador: registo (RF 10), login/logout (RF 11),
   perfil (RF 12), favoritos (RF 13) e validação (RNF 07).

   ⚠ AVISO DE SEGURANÇA — PROJETO ACADÉMICO ⚠
   Não existe servidor. Contas, sessão e favoritos ficam no
   localStorage do navegador, e qualquer pessoa com acesso a esse
   navegador consegue ler ou alterar estes dados. Isto serve APENAS
   para demonstração e NÃO é seguro para palavras-passe reais.
   As palavras-passe não são guardadas em texto simples (usa-se
   PBKDF2 + sal aleatório), mas isso não torna o sistema seguro: a
   proteção real de contas exige um serviço de autenticação num
   servidor.

   Chaves do localStorage:
   - gamedex_session   : email do utilizador com sessão iniciada
                         (é a chave que o js/app.js lê para mostrar
                         "Entrar" ou "Sair")
   - gamedex_users     : lista de contas {name, email, salt, hash, createdAt}
   - gamedex_favorites : { "email": [ids dos jogos] }  (por utilizador)

   Cada parte só corre se encontrar os elementos da sua página.
   ========================================================= */
(function () {
  "use strict";

  const SESSION_KEY = "gamedex_session";
  const USERS_KEY = "gamedex_users";
  const FAVS_KEY = "gamedex_favorites";
  const PBKDF2_ITERATIONS = 150000;

  /* ---------------------------------------------------------
     Utilitários
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  const ratingText = (n) => Number(n).toFixed(1).replace(".", ",");
  const shortPlatforms = (p, max = 3) => {
    const l = String(p).split(",").map((s) => s.trim()).filter(Boolean);
    return l.slice(0, max).join(" · ") + (l.length > max ? " +" + (l.length - max) : "");
  };
  const hasGames = () => typeof games !== "undefined" && Array.isArray(games) && games.length > 0;

  /* ---------------------------------------------------------
     localStorage (com proteção para quando está bloqueado)
     --------------------------------------------------------- */
  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const value = JSON.parse(raw);
      return value === null || value === undefined ? fallback : value;
    } catch (e) { return fallback; }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
  }

  function getUsers() {
    const list = readJson(USERS_KEY, []);
    return Array.isArray(list) ? list.filter((u) => u && typeof u.email === "string") : [];
  }

  function getFavMap() {
    const map = readJson(FAVS_KEY, {});
    return map && typeof map === "object" && !Array.isArray(map) ? map : {};
  }

  function getSessionEmail() {
    try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  // Utilizador com sessão iniciada (ou null). Se a chave existir mas a conta não,
  // não conta como sessão válida.
  function currentUser() {
    const email = getSessionEmail();
    if (!email) return null;
    return getUsers().find((u) => u.email === email) || null;
  }

  function startSession(email) {
    try { localStorage.setItem(SESSION_KEY, email); return true; } catch (e) { return false; }
  }

  function endSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignorar */ }
  }

  /* ---------------------------------------------------------
     Favoritos por utilizador (RF 13)
     --------------------------------------------------------- */
  // Devolve os ids (sem repetidos, pela ordem em que foram adicionados).
  // Se os dados dos jogos estiverem carregados, ignora ids que já não existem.
  function getFavIds(email) {
    const raw = getFavMap()[email];
    const list = Array.isArray(raw) ? raw : [];
    const known = hasGames() ? new Set(games.map((g) => g.id)) : null;
    const out = [];
    list.forEach((id) => {
      const n = Number(id);
      if (Number.isFinite(n) && !out.includes(n) && (!known || known.has(n))) out.push(n);
    });
    return out;
  }

  // Devolve "ok", "duplicado" ou "erro".
  function addFav(email, id) {
    const map = getFavMap();
    const list = Array.isArray(map[email]) ? map[email].map(Number) : [];
    if (list.includes(id)) return "duplicado"; // nunca adiciona o mesmo jogo duas vezes
    list.push(id);
    map[email] = list;
    return writeJson(FAVS_KEY, map) ? "ok" : "erro";
  }

  function removeFav(email, id) {
    const map = getFavMap();
    const list = Array.isArray(map[email]) ? map[email].map(Number) : [];
    map[email] = list.filter((x) => x !== id);
    return writeJson(FAVS_KEY, map) ? "ok" : "erro";
  }

  /* ---------------------------------------------------------
     Palavra-passe: PBKDF2 + sal (nunca em texto simples)
     --------------------------------------------------------- */
  const toHex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  const fromHex = (hex) => new Uint8Array((hex.match(/../g) || []).map((h) => parseInt(h, 16)));

  function newSalt() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return toHex(bytes);
  }

  async function hashPassword(password, saltHex) {
    if (!window.crypto || !crypto.subtle) throw new Error("sem-crypto");
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: fromHex(saltHex), iterations: PBKDF2_ITERATIONS, hash: "SHA-256" }, key, 256);
    return toHex(bits);
  }

  function sameText(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
  }

  /* ---------------------------------------------------------
     Validação (RNF 07): cada função devolve "" se estiver bem,
     ou a mensagem de erro em português.
     --------------------------------------------------------- */
  const cleanName = (v) => String(v).trim().replace(/\s+/g, " ");
  const cleanEmail = (v) => String(v).trim().toLowerCase();

  function validateName(v) {
    const s = cleanName(v);
    if (!s) return "Indica o teu nome.";
    if (s.length < 2) return "O nome deve ter pelo menos 2 caracteres.";
    if (s.length > 50) return "O nome não pode ter mais de 50 caracteres.";
    if (!/^\p{L}[\p{L}\p{M}'’ .-]*$/u.test(s)) return "O nome só pode ter letras, espaços, hífenes e apóstrofos.";
    return "";
  }

  function validateEmail(v) {
    const s = cleanEmail(v);
    if (!s) return "Indica o teu email.";
    if (s.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return "Indica um email válido, por exemplo nome@exemplo.pt.";
    return "";
  }

  function validatePassword(v) {
    const s = String(v);
    if (!s) return "Escolhe uma palavra-passe.";
    if (s.length < 8) return "A palavra-passe deve ter pelo menos 8 caracteres.";
    if (s.length > 128) return "A palavra-passe não pode ter mais de 128 caracteres.";
    if (!/\p{L}/u.test(s) || !/\d/.test(s)) return "A palavra-passe deve ter pelo menos uma letra e um número.";
    return "";
  }

  function validateConfirm(pass, confirm) {
    if (!confirm) return "Repete a palavra-passe.";
    if (pass !== confirm) return "As palavras-passe não coincidem.";
    return "";
  }

  /* ---------------------------------------------------------
     Ajudas de formulário
     --------------------------------------------------------- */
  function setError(input, message) {
    const box = document.getElementById(input.id + "-erro");
    const field = input.closest(".u-field");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (field) field.classList.toggle("has-error", !!message);
    if (box) box.textContent = message || "";
  }

  function showMsg(el, kind, text) {
    el.className = "u-msg " + (kind === "error" ? "is-error" : "is-ok");
    el.textContent = text;
    el.hidden = false;
  }

  function hideMsg(el) { el.hidden = true; el.textContent = ""; }

  // Botões "Mostrar/Esconder" da palavra-passe
  function initPasswordToggles() {
    document.querySelectorAll(".u-toggle").forEach((btn) => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      btn.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "Esconder" : "Mostrar";
        btn.setAttribute("aria-pressed", String(show));
      });
    });
  }

  // Se já houver sessão válida, esconde o formulário e mostra um aviso.
  function showAlreadyLoggedIn(form) {
    const user = currentUser();
    const box = $("#ja-logado");
    if (!user || !box) return false;
    const nameEl = $("#ja-logado-nome");
    if (nameEl) nameEl.textContent = user.name;
    form.hidden = true;
    const extras = document.querySelectorAll("[data-hide-when-logged]");
    extras.forEach((el) => { el.hidden = true; });
    box.hidden = false;
    return true;
  }

  const STORAGE_ERROR = "Não foi possível guardar os dados no navegador. Verifica se o armazenamento local não está bloqueado.";
  const CRYPTO_ERROR = "Este navegador não permite proteger a palavra-passe. Abre o site num navegador atualizado (por https ou localhost).";

  /* =========================================================
     REGISTO (RF 10 + RNF 07)
     ========================================================= */
  function initRegisto() {
    const form = $("#registo-form");
    if (!form) return;
    if (showAlreadyLoggedIn(form)) return;

    const f = {
      name: $("#nome"), email: $("#email"), pass: $("#palavra-passe"),
      confirm: $("#confirmar"), terms: $("#aviso")
    };
    const msg = $("#form-msg");
    const submit = $("#registo-submit");
    const order = ["name", "email", "pass", "confirm", "terms"];

    const checks = {
      name: () => validateName(f.name.value),
      email: () => validateEmail(f.email.value),
      pass: () => validatePassword(f.pass.value),
      confirm: () => validateConfirm(f.pass.value, f.confirm.value),
      terms: () => (f.terms.checked ? "" : "Tens de confirmar que leste o aviso.")
    };
    const run = (key) => { const err = checks[key](); setError(f[key], err); return err; };

    order.forEach((key) => {
      const input = f[key];
      if (key !== "terms") input.addEventListener("blur", () => { if (input.value) run(key); });
      input.addEventListener(key === "terms" ? "change" : "input", () => {
        if (input.closest(".u-field").classList.contains("has-error")) run(key);
        if (key === "pass" && f.confirm.value) run("confirm");
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideMsg(msg);

      // 1) Validar todos os campos (não aceita dados obrigatórios em falta)
      const errors = order.filter((key) => run(key));
      if (errors.length) {
        showMsg(msg, "error", "Não foi possível criar a conta. Corrige os campos assinalados e tenta novamente.");
        f[errors[0]].focus();
        return;
      }

      const name = cleanName(f.name.value);
      const email = cleanEmail(f.email.value);

      // 2) Não permitir duas contas com o mesmo email
      const users = getUsers();
      if (users.some((u) => u.email === email)) {
        setError(f.email, "Já existe uma conta com este email. Tenta entrar.");
        showMsg(msg, "error", "Não foi possível criar a conta: este email já está registado.");
        f.email.focus();
        return;
      }

      // 3) Guardar a conta (palavra-passe só como hash)
      submit.disabled = true;
      try {
        const salt = newSalt();
        const hash = await hashPassword(f.pass.value, salt);
        users.push({ name, email, salt, hash, createdAt: new Date().toISOString() });
        if (!writeJson(USERS_KEY, users)) {
          showMsg(msg, "error", STORAGE_ERROR);
          submit.disabled = false;
          return;
        }
      } catch (err) {
        showMsg(msg, "error", CRYPTO_ERROR);
        submit.disabled = false;
        return;
      }

      // 4) Confirmação
      form.reset();
      order.forEach((key) => setError(f[key], ""));
      showMsg(msg, "ok", "Conta criada com sucesso! A redirecionar para o login…");
      setTimeout(() => { location.href = "login.html?registado=1"; }, 1800);
    });
  }

  /* =========================================================
     LOGIN (RF 11)
     ========================================================= */
  function initLogin() {
    const form = $("#login-form");
    if (!form) return;

    const msg = $("#form-msg");
    if (/[?&]registado=1(&|$)/.test(location.search) && !currentUser()) {
      showMsg(msg, "ok", "Conta criada com sucesso! Já podes entrar.");
    }
    if (showAlreadyLoggedIn(form)) { hideMsg(msg); return; }

    const emailInput = $("#email");
    const passInput = $("#palavra-passe");
    const submit = $("#login-submit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideMsg(msg);

      const emailErr = emailInput.value.trim() ? validateEmail(emailInput.value) : "Indica o teu email.";
      const passErr = passInput.value ? "" : "Indica a tua palavra-passe.";
      setError(emailInput, emailErr);
      setError(passInput, passErr);
      if (emailErr || passErr) {
        showMsg(msg, "error", "Preenche os campos assinalados para entrares.");
        (emailErr ? emailInput : passInput).focus();
        return;
      }

      submit.disabled = true;
      const email = cleanEmail(emailInput.value);
      const user = getUsers().find((u) => u.email === email);
      let ok = false;
      try {
        if (user && user.salt && user.hash) ok = sameText(await hashPassword(passInput.value, user.salt), user.hash);
      } catch (err) {
        showMsg(msg, "error", CRYPTO_ERROR);
        submit.disabled = false;
        return;
      }

      if (!ok) {
        // Mensagem igual para email inexistente ou palavra-passe errada
        showMsg(msg, "error", "Email ou palavra-passe incorretos.");
        passInput.value = "";
        passInput.focus();
        submit.disabled = false;
        return;
      }
      if (!startSession(user.email)) {
        showMsg(msg, "error", STORAGE_ERROR);
        submit.disabled = false;
        return;
      }
      location.href = "perfil.html";
    });
  }

  /* =========================================================
     PERFIL (RF 12)
     ========================================================= */
  function initPerfil() {
    const root = $("#perfil-root");
    if (!root) return;
    const gate = $("#perfil-gate");
    const content = $("#perfil-conteudo");
    const user = currentUser();

    if (!user) { gate.hidden = false; content.hidden = true; return; }

    gate.hidden = true;
    content.hidden = false;
    const initials = user.name.split(" ").filter(Boolean).slice(0, 2).map((p) => Array.from(p)[0].toUpperCase()).join("");
    $("#perfil-avatar").textContent = initials || "?";
    $("#perfil-nome").textContent = "Olá, " + user.name.split(" ")[0] + "!";
    $("#perfil-nome-completo").textContent = user.name;
    $("#perfil-email").textContent = user.email;
    const created = new Date(user.createdAt);
    $("#perfil-desde").textContent = isNaN(created) ? "—" : created.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
    $("#perfil-favs").textContent = getFavIds(user.email).length;

    $("#btn-logout").addEventListener("click", () => {
      endSession();
      location.href = "index.html";
    });
  }

  /* =========================================================
     FAVORITOS (RF 13)
     ========================================================= */
  function initFavoritos() {
    const root = $("#fav-root");
    if (!root) return;
    const gate = $("#fav-gate");
    const app = $("#fav-app");
    const user = currentUser();

    if (!user) { gate.hidden = false; return; }
    if (!hasGames()) {
      gate.hidden = false;
      gate.innerHTML = '<p class="notice">Não foi possível carregar os jogos. Verifica se o ficheiro js/data.js está incluído.</p>';
      return;
    }
    app.hidden = false;

    const favGrid = $("#fav-grid");
    const favEmpty = $("#fav-empty");
    const favCount = $("#fav-count");
    const favTitle = $("#fav-title");
    const addGrid = $("#add-grid");
    const addEmpty = $("#add-empty");
    const addCount = $("#add-count");
    const search = $("#add-search");
    const status = $("#fav-status");
    const byId = new Map(games.map((g) => [g.id, g]));

    function cardHtml(g, buttonHtml) {
      return `
      <article class="game-card u-game" data-id="${g.id}">
        <div class="game-card-media">
          <img src="${esc(g.image)}" alt="Capa de ${esc(g.name)}" width="960" height="540" loading="lazy" decoding="async">
          <span class="rating" aria-label="Nota ${ratingText(g.rating)} em 10">${ratingText(g.rating)}</span>
        </div>
        <div class="game-card-body">
          <span class="chip">${esc(g.genre)}</span>
          <h3>${esc(g.name)}</h3>
          <p class="game-meta">${esc(g.releaseYear)} · ${esc(shortPlatforms(g.platform))}</p>
          ${buttonHtml}
        </div>
      </article>`;
    }

    function watchImages(root2) {
      root2.querySelectorAll("img").forEach((img) => {
        const fail = () => { const m = img.closest(".game-card-media"); if (m) m.classList.add("img-fail"); };
        img.addEventListener("error", fail, { once: true });
        if (img.complete && img.naturalWidth === 0) fail();
      });
    }

    function renderFavs() {
      const ids = getFavIds(user.email);
      favCount.textContent = "(" + ids.length + ")";
      favEmpty.hidden = ids.length > 0;
      favGrid.hidden = ids.length === 0;
      favGrid.innerHTML = ids.map((id) => byId.get(id)).filter(Boolean).map((g) =>
        cardHtml(g, `<button type="button" class="btn btn-ghost u-btn-sm" data-remove="${g.id}" aria-label="Remover ${esc(g.name)} dos favoritos">Remover</button>`)
      ).join("");
      watchImages(favGrid);
    }

    function addButtonHtml(g, isFav) {
      return isFav
        ? `<button type="button" class="btn btn-ghost u-btn-sm" disabled aria-label="${esc(g.name)} já está nos favoritos">✓ Nos favoritos</button>`
        : `<button type="button" class="btn btn-primary u-btn-sm" data-add="${g.id}" aria-label="Adicionar ${esc(g.name)} aos favoritos">Adicionar</button>`;
    }

    function renderAddList() {
      const favs = new Set(getFavIds(user.email));
      addGrid.innerHTML = games.map((g) => cardHtml(g, addButtonHtml(g, favs.has(g.id)))).join("");
      watchImages(addGrid);
      applySearch();
    }

    // Atualiza só o cartão afetado (assim a lista não "salta" nem perde o foco).
    function refreshAddCard(id) {
      const card = addGrid.querySelector(`.u-game[data-id="${id}"]`);
      const g = byId.get(id);
      if (!card || !g) return;
      const old = card.querySelector(".u-btn-sm");
      const t = document.createElement("template");
      t.innerHTML = addButtonHtml(g, getFavIds(user.email).includes(id));
      if (old) old.replaceWith(t.content.firstElementChild);
    }

    function applySearch() {
      const q = norm(search.value);
      let shown = 0;
      addGrid.querySelectorAll(".u-game").forEach((card) => {
        const g = byId.get(Number(card.dataset.id));
        const match = !q || (g && norm(g.name).includes(q));
        card.hidden = !match;
        if (match) shown++;
      });
      addEmpty.hidden = shown > 0;
      addGrid.hidden = shown === 0;
      addCount.textContent = shown === 1 ? "1 jogo" : shown + " jogos";
    }

    function say(kind, text) { showMsg(status, kind, text); }

    favGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove]");
      if (!btn) return;
      const id = Number(btn.dataset.remove);
      const g = byId.get(id);
      if (removeFav(user.email, id) === "erro") { say("error", STORAGE_ERROR); return; }
      renderFavs();
      refreshAddCard(id);
      say("ok", "“" + (g ? g.name : "Jogo") + "” foi removido dos favoritos.");
      favTitle.focus(); // o botão carregado desapareceu: devolve o foco ao título da lista
    });

    addGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const id = Number(btn.dataset.add);
      const g = byId.get(id);
      const result = addFav(user.email, id);
      if (result === "erro") { say("error", STORAGE_ERROR); return; }
      renderFavs();
      refreshAddCard(id);
      if (result === "duplicado") say("error", "“" + g.name + "” já está nos favoritos.");
      else say("ok", "“" + g.name + "” foi adicionado aos favoritos.");
      const newBtn = addGrid.querySelector(`.u-game[data-id="${id}"] .u-btn-sm`);
      if (newBtn) newBtn.focus();
    });

    search.addEventListener("input", applySearch);
    $("#add-search-form").addEventListener("submit", (e) => e.preventDefault());

    renderFavs();
    renderAddList();
  }

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  function init() {
    initPasswordToggles();
    initRegisto();
    initLogin();
    initPerfil();
    initFavoritos();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
