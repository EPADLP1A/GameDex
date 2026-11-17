(() => {
"use strict";
const GAMES = [
  {
    "name": "Apex Legends",
    "genre": "Battle Royale",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2019,
    "image": "apex-legends",
    "description": "Forma um esquadrão e compete num battle royale com personagens que têm habilidades únicas."
  },
  {
    "name": "Among Us",
    "genre": "Dedução social",
    "platforms": "PC, Mobile, Consolas",
    "year": 2018,
    "image": "among-us",
    "description": "Trabalha em equipa para completar tarefas e tenta descobrir quem é o impostor."
  },
  {
    "name": "Call of Duty: Warzone",
    "genre": "Battle Royale",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2020,
    "image": "call-of-duty-warzone",
    "description": "Entra num combate de grande escala, procura equipamento e tenta ser a última equipa em jogo."
  },
  {
    "name": "Counter-Strike 2",
    "genre": "FPS tático",
    "platforms": "PC",
    "year": 2023,
    "image": "counter-strike-2",
    "description": "Duas equipas enfrentam-se em rondas onde a estratégia, a comunicação e a precisão são essenciais."
  },
  {
    "name": "Cyberpunk 2077",
    "genre": "RPG de ação",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2020,
    "image": "cyberpunk-2077",
    "description": "Explora Night City como V, num mundo futurista marcado por tecnologia, escolhas e histórias pessoais."
  },
  {
    "name": "EA Sports FC 25",
    "genre": "Desporto",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2024,
    "image": "ea-sports-fc-25",
    "description": "Joga futebol com clubes e seleções, em modos para um jogador e experiências online."
  },
  {
    "name": "Elden Ring",
    "genre": "RPG de ação",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2022,
    "image": "elden-ring",
    "description": "Explora as Terras Intermédias num mundo aberto de fantasia, cheio de mistérios e desafios."
  },
  {
    "name": "Fortnite",
    "genre": "Battle Royale",
    "platforms": "PC, PlayStation, Xbox, Switch, Mobile",
    "year": 2017,
    "image": "fortnite",
    "description": "Compete para seres o último a ficar em jogo, constrói estruturas e participa em modos variados."
  },
  {
    "name": "Forza Horizon 5",
    "genre": "Corridas",
    "platforms": "PC, Xbox, PlayStation",
    "year": 2021,
    "image": "forza-horizon-5",
    "description": "Conduz uma grande variedade de carros num mundo aberto inspirado nas paisagens do México."
  },
  {
    "name": "God of War",
    "genre": "Ação-aventura",
    "platforms": "PC, PlayStation",
    "year": 2018,
    "image": "god-of-war",
    "description": "Acompanha Kratos e Atreus numa viagem pela mitologia nórdica."
  },
  {
    "name": "Grand Theft Auto V",
    "genre": "Ação-aventura",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2013,
    "image": "grand-theft-auto-v",
    "description": "Explora Los Santos através das histórias de três protagonistas, em missões e atividades num mundo aberto."
  },
  {
    "name": "League of Legends",
    "genre": "MOBA",
    "platforms": "PC",
    "year": 2009,
    "image": "league-of-legends",
    "description": "Duas equipas de cinco jogadores escolhem campeões e trabalham em conjunto para destruir a base adversária."
  },
  {
    "name": "Minecraft",
    "genre": "Sandbox",
    "platforms": "PC, Consolas, Mobile",
    "year": 2011,
    "image": "minecraft",
    "description": "Constrói, explora e sobrevive num mundo gerado por blocos, com liberdade para criar os teus próprios objetivos."
  },
  {
    "name": "Overwatch 2",
    "genre": "FPS de heróis",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2022,
    "image": "overwatch-2",
    "description": "Escolhe um herói com habilidades próprias e coopera com a equipa para cumprir objetivos."
  },
  {
    "name": "Red Dead Redemption 2",
    "genre": "Ação-aventura",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2018,
    "image": "red-dead-redemption-2",
    "description": "Vive a história de Arthur Morgan e do seu grupo no fim da era do Velho Oeste."
  },
  {
    "name": "Rocket League",
    "genre": "Desporto",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2015,
    "image": "rocket-league",
    "description": "Joga futebol com carros movidos a foguetes, em partidas rápidas e cheias de acrobacias."
  },
  {
    "name": "Stardew Valley",
    "genre": "Simulação",
    "platforms": "PC, Consolas, Mobile",
    "year": 2016,
    "image": "stardew-valley",
    "description": "Cuida de uma quinta, cultiva, pesca, explora minas e cria relações com os habitantes da vila."
  },
  {
    "name": "The Elder Scrolls V: Skyrim",
    "genre": "RPG",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2011,
    "image": "skyrim",
    "description": "Explora a província de Skyrim, completa missões e enfrenta dragões num vasto mundo de fantasia."
  },
  {
    "name": "The Legend of Zelda: Breath of the Wild",
    "genre": "Aventura",
    "platforms": "Nintendo Switch, Wii U",
    "year": 2017,
    "image": "zelda-breath-of-the-wild",
    "description": "Explora Hyrule com liberdade, resolve desafios e descobre formas diferentes de atravessar o mundo."
  },
  {
    "name": "The Witcher 3: Wild Hunt",
    "genre": "RPG",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2015,
    "image": "the-witcher-3",
    "description": "Segue Geralt de Rívia numa aventura de fantasia com monstros, decisões difíceis e personagens marcantes."
  },
  {
    "name": "Valorant",
    "genre": "FPS tático",
    "platforms": "PC",
    "year": 2020,
    "image": "valorant",
    "description": "Um jogo competitivo 5 contra 5 em que cada agente combina precisão de tiro com habilidades próprias."
  },
  {
    "name": "Genshin Impact",
    "genre": "RPG de ação",
    "platforms": "PC, PlayStation, Mobile",
    "year": 2020,
    "image": "genshin-impact",
    "description": "Explora Teyvat, forma uma equipa de personagens e combina diferentes elementos em combate."
  },
  {
    "name": "NBA 2K25",
    "genre": "Desporto",
    "platforms": "PC, PlayStation, Xbox, Switch",
    "year": 2024,
    "image": "nba-2k25",
    "description": "Simulador de basquetebol com equipas, jogadores e vários modos de jogo."
  },
  {
    "name": "Assassin's Creed Valhalla",
    "genre": "RPG de ação",
    "platforms": "PC, PlayStation, Xbox",
    "year": 2020,
    "image": "assassins-creed-valhalla",
    "description": "Acompanha Eivor numa aventura viking, entre exploração, alianças e conflitos na Inglaterra medieval."
  },
  {
    "name": "Albion Online",
    "genre": "MMORPG",
    "platforms": "PC, Mobile",
    "year": 2017,
    "image": "albion-online",
    "description": "Explora um mundo online de fantasia com economia conduzida pelos jogadores, criação de itens e combates."
  }
];
const grid = document.getElementById("games-grid");
const search = document.getElementById("search");
const genre = document.getElementById("genre");
const platform = document.getElementById("platform");
const sort = document.getElementById("sort");
const count = document.getElementById("results-count");
const modal = document.getElementById("game-modal");
const modalContent = document.getElementById("modal-content");
const FAVORITES_KEY = "gamedex-favorites-v1";
let lastFocus = null;
function readFavorites() {
  try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"); }
  catch { return []; }
}
function saveFavorites(ids) {
  try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids)); }
  catch { /* O catálogo continua utilizável se o browser bloquear armazenamento. */ }
}
const key = game => game.name;
function isFavorite(game) { return readFavorites().includes(key(game)); }
function imagePath(game) { return `img/${game.image}.jpg`; }
function makeImage(game) {
  const img = document.createElement("img");
  img.src = imagePath(game);
  img.alt = `Capa de ${game.name}`;
  img.loading = "lazy";
  img.onerror = () => { img.onerror = null; img.src = "img/valorant.jpg"; };
  return img;
}
function toggleFavorite(game, button) {
  const ids = readFavorites();
  const next = ids.includes(key(game)) ? ids.filter(id => id !== key(game)) : [...ids, key(game)];
  saveFavorites(next);
  button.setAttribute("aria-pressed", String(next.includes(key(game))));
  button.textContent = next.includes(key(game)) ? "★" : "☆";
  button.setAttribute("aria-label", next.includes(key(game)) ? `Remover ${game.name} dos favoritos` : `Adicionar ${game.name} aos favoritos`);
  document.dispatchEvent(new CustomEvent("gamedex:favorites-changed"));
}
function card(game) {
  const article = document.createElement("article");
  article.className = "catalog-card";
  const open = document.createElement("button");
  open.type = "button"; open.className = "catalog-card-open";
  open.style.cssText = "display:block;width:100%;padding:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer";
  open.append(makeImage(game));
  const body = document.createElement("div"); body.className = "catalog-card-body";
  const title = document.createElement("h2"); title.textContent = game.name;
  const meta = document.createElement("div"); meta.className = "catalog-card-meta";
  const g = document.createElement("span"); g.textContent = game.genre;
  const y = document.createElement("span"); y.textContent = game.year;
  meta.append(g,y); body.append(title,meta); open.append(body);
  open.addEventListener("click", () => showDetails(game));
  const fav = document.createElement("button"); fav.type="button"; fav.className="favorite-toggle";
  fav.textContent = isFavorite(game) ? "★" : "☆";
  fav.setAttribute("aria-pressed",String(isFavorite(game)));
  fav.setAttribute("aria-label",isFavorite(game) ? `Remover ${game.name} dos favoritos` : `Adicionar ${game.name} aos favoritos`);
  fav.addEventListener("click", e => { e.stopPropagation(); toggleFavorite(game,fav); });
  article.append(open,fav); return article;
}
function visibleGames() {
  const term=search.value.trim().toLocaleLowerCase("pt-PT");
  let list=GAMES.filter(g => {
    const matchesText = `${g.name} ${g.description} ${g.genre} ${g.platforms}`.toLocaleLowerCase("pt-PT").includes(term);
    const matchesGenre = !genre.value || g.genre===genre.value;
    const matchesPlatform = !platform.value || g.platforms.split(", ").includes(platform.value);
    return matchesText && matchesGenre && matchesPlatform;
  });
  if(sort.value==="newest") list.sort((a,b)=>b.year-a.year || a.name.localeCompare(b.name));
  else if(sort.value==="oldest") list.sort((a,b)=>a.year-b.year || a.name.localeCompare(b.name));
  else list.sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));
  return list;
}
function render() {
  const list=visibleGames(); grid.replaceChildren();
  count.textContent=`${list.length} ${list.length===1?"jogo encontrado":"jogos encontrados"}`;
  if(!list.length) { const p=document.createElement("p"); p.className="no-results"; p.textContent="Não foram encontrados jogos. Experimenta alterar a pesquisa ou os filtros."; grid.append(p); return; }
  list.forEach(game=>grid.append(card(game)));
}
function showDetails(game) {
  lastFocus=document.activeElement; modalContent.replaceChildren();
  const layout=document.createElement("div"); layout.className="modal-game-layout";
  const img=makeImage(game); img.loading="eager";
  const info=document.createElement("div");
  const h=document.createElement("h2"); h.id="modal-title"; h.textContent=game.name;
  const desc=document.createElement("p"); desc.textContent=game.description;
  const ul=document.createElement("ul");
  [`Género: ${game.genre}`,`Plataformas: ${game.platforms}`,`Ano de lançamento: ${game.year}`].forEach(t=>{const li=document.createElement("li");li.textContent=t;ul.append(li);});
  const actions=document.createElement("div"); actions.className="modal-actions";
  const fav=document.createElement("button"); fav.className="btn btn-primary"; fav.type="button";
  const refreshFav=()=>fav.textContent=isFavorite(game)?"★ Nos favoritos":"☆ Adicionar aos favoritos";
  refreshFav(); fav.addEventListener("click",()=>{const ids=readFavorites();saveFavorites(ids.includes(key(game))?ids.filter(x=>x!==key(game)):[...ids,key(game)]);refreshFav();render();document.dispatchEvent(new CustomEvent("gamedex:favorites-changed"));});
  actions.append(fav); info.append(h,desc,ul,actions); layout.append(img,info); modalContent.append(layout);
  modal.hidden=false; document.getElementById("modal-close").focus();
}
function closeModal(){modal.hidden=true;if(lastFocus&&lastFocus.focus)lastFocus.focus();}
function fillFilters(){
  [...new Set(GAMES.map(g=>g.genre))].sort((a,b)=>a.localeCompare(b,"pt-PT")).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;genre.append(o);});
  [...new Set(GAMES.flatMap(g=>g.platforms.split(", ")))].sort((a,b)=>a.localeCompare(b,"pt-PT")).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;platform.append(o);});
}
[search,genre,platform,sort].forEach(el=>el.addEventListener(el===search?"input":"change",render));
document.getElementById("clear-filters").addEventListener("click",()=>{search.value="";genre.value="";platform.value="";sort.value="name";render();});
document.getElementById("modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)closeModal();});
document.addEventListener("gamedex:favorites-changed",render);
fillFilters();render();
})();