# Game Dex – Catálogo de Videojogos

Projeto unificado em HTML, CSS e JavaScript.

## Como executar
1. Extrai o ZIP para uma pasta.
2. Abre `index.html` no navegador, ou abre a pasta no VS Code e inicia o Live Server.
3. Usa o menu para navegar entre Início, Catálogo, Favoritos e Sobre.

## Funcionalidades
- Catálogo com 25 videojogos e capas.
- Pesquisa por nome, descrição, género ou plataforma.
- Filtros por género e plataforma.
- Ordenação alfabética ou por ano.
- Janela de detalhes para cada jogo.
- Lista de favoritos guardada no `localStorage` do navegador.
- Layout responsivo e menu para telemóvel.

## Estrutura
- `index.html`: página inicial e destaques.
- `catalogo.html`: catálogo, pesquisa, filtros e detalhes.
- `favoritos.html`: jogos guardados.
- `sobre.html`: apresentação do projeto.
- `css/style.css`: estilos partilhados.
- `css/catalogo.css`: estilos do catálogo e favoritos.
- `js/main.js`: menu e comportamentos partilhados.
- `js/catalogo.js`: dados e funcionalidades do catálogo.
- `js/favoritos.js`: apresentação e remoção de favoritos.
- `img/`: capas e ícones.

Os favoritos ficam guardados localmente no navegador utilizado. Não são sincronizados entre dispositivos.
