(() => {
"use strict";
const KEY="gamedex-favorites-v1";
const GAMES=[
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
const grid=document.getElementById("favorites-grid"),count=document.getElementById("favorite-count");
function read(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function render(){
 const ids=read(),list=GAMES.filter(g=>ids.includes(g.name));grid.replaceChildren();
 count.textContent=`${list.length} ${list.length===1?"jogo guardado":"jogos guardados"}`;
 if(!list.length){const p=document.createElement("p");p.className="no-results";p.textContent="Ainda não tens favoritos. Vai ao catálogo e seleciona ☆ nos jogos que queres guardar.";grid.append(p);return;}
 list.forEach(g=>{
  const article=document.createElement("article");article.className="catalog-card";
  const link=document.createElement("a");link.href="catalogo.html";link.style.cssText="display:block;color:inherit";
  const img=document.createElement("img");img.src=`img/${g.image}.jpg`;img.alt=`Capa de ${g.name}`;img.loading="lazy";img.onerror=()=>{img.onerror=null;img.src="img/valorant.jpg"};
  const body=document.createElement("div");body.className="catalog-card-body";
  const h=document.createElement("h2");h.textContent=g.name;const meta=document.createElement("div");meta.className="catalog-card-meta";meta.textContent=`${g.genre} · ${g.year}`;
  body.append(h,meta);link.append(img,body);
  const remove=document.createElement("button");remove.type="button";remove.className="favorite-toggle";remove.textContent="★";remove.setAttribute("aria-label",`Remover ${g.name} dos favoritos`);
  remove.addEventListener("click",()=>{localStorage.setItem(KEY,JSON.stringify(read().filter(x=>x!==g.name)));render();});
  article.append(link,remove);grid.append(article);
 });
}
render();window.addEventListener("storage",render);
})();