/* =========================================================
   GameDex — js/data.js
   Lista central de videojogos (responsável: Adreson).
   Todas as páginas lêem os jogos a partir deste array.

   Campos obrigatórios de cada jogo:
   id, name, image, description, genre, platform, releaseYear, rating

   Notas:
   - "platform" é um texto com as plataformas separadas por vírgula.
   - "rating" é uma nota de 0 a 10 (valores de demonstração).
   ========================================================= */
const games = [
  {
    id: 1,
    name: "Elden Ring",
    image: "imgs/1.jpg",
    description: "Explora as Terras Intermédias num RPG de ação de mundo aberto da FromSoftware, com combates exigentes e uma história criada com George R. R. Martin.",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2022,
    rating: 9.6
  },
  {
    id: 2,
    name: "The Witcher 3: Wild Hunt",
    image: "imgs/2.jpg",
    description: "Controla Geralt de Rívia numa aventura épica de mundo aberto, repleta de monstros, escolhas difíceis e missões inesquecíveis.",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2015,
    rating: 9.8
  },
  {
    id: 3,
    name: "Red Dead Redemption 2",
    image: "imgs/3.jpg",
    description: "Vive a história de Arthur Morgan e do bando de Dutch van der Linde no fim do Oeste selvagem, num mundo aberto cheio de detalhe.",
    genre: "Aventura",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2018,
    rating: 9.7
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    image: "imgs/4.jpg",
    description: "Mergulha em Night City como V, um mercenário numa metrópole futurista dominada por corporações, implantes e decisões que mudam a história.",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2020,
    rating: 8.6
  },
  {
    id: 5,
    name: "Hogwarts Legacy",
    image: "imgs/5.jpg",
    description: "Vive a vida de estudante em Hogwarts no século XIX, aprende feitiços, explora o castelo e descobre um antigo segredo do mundo mágico.",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2023,
    rating: 8.6
  },
  {
    id: 6,
    name: "Resident Evil Requiem",
    image: "imgs/6.jpg",
    description: "Novo capítulo da saga de terror e sobrevivência da Capcom, com Leon S. Kennedy e Grace Ashcroft, tensão constante e recursos escassos.",
    genre: "Terror",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2026,
    rating: 8.8
  },
  {
    id: 7,
    name: "Grand Theft Auto VI",
    image: "imgs/7.jpg",
    description: "Regressa a Vice City, no estado fictício de Leonida, com Lucia Caminos e Jason Duval numa aventura de mundo aberto da Rockstar Games.",
    genre: "Ação",
    platform: "PlayStation, Xbox",
    releaseYear: 2026,
    rating: 9.5
  },
  {
    id: 8,
    name: "Minecraft",
    image: "imgs/8.jpg",
    description: "Constrói, explora e sobrevive num mundo infinito feito de blocos, sozinho ou com amigos. O único limite é a imaginação.",
    genre: "Sandbox",
    platform: "PC, PlayStation, Xbox, Nintendo Switch, Mobile",
    releaseYear: 2011,
    rating: 9.3
  },
  {
    id: 9,
    name: "Terraria",
    image: "imgs/9.jpg",
    description: "Escava, constrói e combate numa aventura 2D cheia de segredos, bosses e equipamento para descobrir, a solo ou em cooperação.",
    genre: "Sandbox",
    platform: "PC, PlayStation, Xbox, Nintendo Switch, Mobile",
    releaseYear: 2011,
    rating: 9.0
  },
  {
    id: 10,
    name: "Counter-Strike 2",
    image: "imgs/10.jpg",
    description: "Shooter tático competitivo 5 contra 5 da Valve, onde cada ronda depende de pontaria, economia e trabalho de equipa.",
    genre: "Tiro",
    platform: "PC",
    releaseYear: 2023,
    rating: 8.7
  },
  {
    id: 11,
    name: "Valorant",
    image: "imgs/11.jpg",
    description: "Shooter tático 5 contra 5 que combina tiroteio preciso com as habilidades únicas de cada agente.",
    genre: "Tiro",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2020,
    rating: 8.4
  },
  {
    id: 12,
    name: "Apex Legends",
    image: "imgs/12.jpg",
    description: "Battle royale em equipas de três, com lendas de habilidades próprias, movimento rápido e combates intensos.",
    genre: "Tiro",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2019,
    rating: 8.5
  },
  {
    id: 13,
    name: "Overwatch 2",
    image: "imgs/13.jpg",
    description: "Shooter de heróis por equipas, com combates rápidos 5 contra 5 e um elenco variado de personagens.",
    genre: "Tiro",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2022,
    rating: 8.0
  },
  {
    id: 14,
    name: "Fortnite",
    image: "imgs/14.jpg",
    description: "Battle royale gratuito e em constante mudança, com construção, eventos ao vivo e modos criativos para jogar com amigos.",
    genre: "Tiro",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2017,
    rating: 8.2
  },
  {
    id: 15,
    name: "Call of Duty: Warzone",
    image: "imgs/15.jpg",
    description: "Battle royale gratuito da série Call of Duty, com grandes mapas, esquadrões e combates de ritmo acelerado.",
    genre: "Tiro",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2020,
    rating: 7.9
  },
  {
    id: 16,
    name: "Far Cry 6",
    image: "imgs/16.jpg",
    description: "Junta-te à revolução em Yara, uma ilha tropical sob o regime de Antón Castillo, num shooter de mundo aberto cheio de caos.",
    genre: "Ação",
    platform: "PC, PlayStation, Xbox",
    releaseYear: 2021,
    rating: 7.7
  },
  {
    id: 17,
    name: "Rocket League",
    image: "imgs/17.jpg",
    description: "Futebol com carros movidos a foguetes: golos acrobáticos, partidas curtas e muita competição.",
    genre: "Desporto",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2015,
    rating: 8.7
  },
  {
    id: 18,
    name: "EA SPORTS FC 27",
    image: "imgs/18.jpg",
    description: "O futebol da EA SPORTS, com equipas, ligas e modos online para viveres a competição ao mais alto nível.",
    genre: "Desporto",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    releaseYear: 2026,
    rating: 7.5
  },
  {
    id: 19,
    name: "League of Legends",
    image: "imgs/19.jpg",
    description: "MOBA 5 contra 5 em que escolhes um campeão e trabalhas em equipa para destruir o nexus inimigo.",
    genre: "Estratégia",
    platform: "PC",
    releaseYear: 2009,
    rating: 8.3
  },
  {
    id: 20,
    name: "Dota 2",
    image: "imgs/20.jpg",
    description: "MOBA estratégico da Valve, com heróis únicos, um mapa profundo e partidas onde cada decisão conta.",
    genre: "Estratégia",
    platform: "PC",
    releaseYear: 2013,
    rating: 8.4
  }
];
