/* =========================================================
   DADOS DOS FILMES
========================================================= */

const filmes = [
  {
    titulo: 'Interestelar',
    categoria: 'fisica',
    categoriaTexto: 'Física',
    descricao:
      'Excelente para discutir gravidade, tempo, buracos negros e relatividade.',

    tags: ['Relatividade', 'Espaço', 'Gravidade'],
    tempo: '2h49',
    atividade: '3º ano',

    imagem:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'
  },

  {
    titulo: 'O Jogo da Imitação',
    categoria: 'matematica',
    categoriaTexto: 'Matemática',
    descricao:
      'Perfeito para trabalhar lógica, criptografia e a história da computação.',

    tags: ['Lógica', 'Criptografia', 'Computação'],
    tempo: '1h54',
    atividade: '2º e 3º ano',

    imagem:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
  },

  {
    titulo: 'Cosmos',
    categoria: 'documentarios',
    categoriaTexto: 'Documentário',
    descricao:
      'Uma jornada incrível pelo universo, ciência, astronomia e evolução.',

    tags: ['Astronomia', 'Ciência', 'Universo'],
    tempo: '45 min',
    atividade: 'Ensino Médio',

    imagem:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop'
  },

  {
    titulo: 'Estrelas Além do Tempo',
    categoria: 'ciencias',
    categoriaTexto: 'Ciências',
    descricao:
      'Ótimo para falar sobre matemática, espaço e protagonismo feminino.',

    tags: ['Matemática', 'Espaço', 'História'],
    tempo: '2h07',
    atividade: '1º ao 3º ano',

    imagem:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'
  },

  {
  titulo: 'O estranho caso da vida confortável e sem sentido',
  categoria: 'palestras',
  categoriaTexto: 'Palestra',

  descricao:
    'Emanuel Aragão discute por que, mesmo em uma vida cada vez mais confortável, muitas pessoas se sentem cansadas, vazias e sem propósito.',

  tags: ['Sentido da vida', 'Conforto', 'Dopamina'],

  tempo: '15 min',
  atividade: 'Ensino Médio',

  imagem: 'https://img.youtube.com/vi/2igfLjjBuZw/maxresdefault.jpg',

  link:
    'https://www.youtube.com/watch?v=2igfLjjBuZw&list=PLsRNoUx8w3rOwHx4kVJL5ksS9vTxj5hXn&index=1'
},

{
  titulo: 'Como a IA vai mudar tudo (inclusive você)',
  categoria: 'palestras',
  categoriaTexto: 'Palestra',

  descricao:
    'Miguel Fernandes reflete sobre como a inteligência artificial está transformando o trabalho, a educação e a maneira como pensamos, destacando a importância do pensamento crítico diante dessas mudanças.',

  tags: ['Inteligência Artificial', 'Educação', 'Pensamento Crítico'],

  tempo: '18 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/C38xlWnkezQ/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=C38xlWnkezQ&list=PLsRNoUx8w3rOwHx4kVJL5ksS9vTxj5hXn&index=2'
},

{
  titulo: 'Sucesso ou realização: o caminho para a felicidade',
  categoria: 'palestras',
  categoriaTexto: 'Palestra',

  descricao:
    'Priscila Fantin reflete sobre a diferença entre buscar sucesso e encontrar realização, mostrando como autoconhecimento e propósito podem trazer uma vida mais feliz.',

  tags: ['Felicidade', 'Autoconhecimento', 'Propósito'],

  tempo: '16 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/IjAdrJi-1hA/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=IjAdrJi-1hA&list=PLsRNoUx8w3rOwHx4kVJL5ksS9vTxj5hXn&index=3'
},

{
  titulo: 'A engenharia escondida dos caminhões de lixo',
  categoria: 'fisica',
  categoriaTexto: 'Física',

  descricao:
    'O vídeo mostra como funcionam os caminhões de lixo e permite discutir força, pressão hidráulica, torque, energia e máquinas simples.',

  tags: ['Hidráulica', 'Força', 'Energia'],

  tempo: '12 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/qtjRWGG2UII/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=qtjRWGG2UII'
},

{
  titulo: 'A engenharia escondida dos caminhões betoneira',
  categoria: 'fisica',
  categoriaTexto: 'Física',

  descricao:
    'O vídeo mostra como os caminhões betoneira mantêm o concreto em movimento e permite discutir torque, rotação, energia, força e conservação do movimento.',

  tags: ['Torque', 'Rotação', 'Energia'],

  tempo: '11 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/qx6s9RbkRg0/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=qx6s9RbkRg0'
},

{
  titulo: 'A engenharia escondida dos caminhões de bombeiro',
  categoria: 'fisica',
  categoriaTexto: 'Física',

  descricao:
    'O vídeo mostra os sistemas dos caminhões de bombeiro e permite discutir pressão, vazão, energia, hidráulica e funcionamento de bombas.',

  tags: ['Pressão', 'Hidráulica', 'Energia'],

  tempo: '14 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/2n33Nbq5Zvk/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=2n33Nbq5Zvk'
},

{
  titulo: 'Como são feitas as moedas',
  categoria: 'fisica',
  categoriaTexto: 'Física',

  descricao:
    'O vídeo mostra o processo de fabricação das moedas e permite discutir pressão, força, deformação dos metais e transformação de energia.',

  tags: ['Pressão', 'Força', 'Metais'],

  tempo: '13 min',
  atividade: 'Ensino Médio',

  imagem:
    'https://img.youtube.com/vi/jdfC9ZaWCFM/sddefault.jpg',

  link:
    'https://www.youtube.com/watch?v=jdfC9ZaWCFM'
},

  {
    titulo: 'Uma Mente Brilhante',
    categoria: 'matematica',
    categoriaTexto: 'Matemática',
    descricao:
      'Ideal para trabalhar lógica, raciocínio e teoria dos jogos.',

    tags: ['Lógica', 'Teoria dos Jogos', 'Matemática'],
    tempo: '2h15',
    atividade: 'Ensino Médio',

    imagem:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
  }
];

/* =========================================================
   ELEMENTOS
========================================================= */

const grid = document.getElementById('gridFilmes');
const inputBusca = document.getElementById('buscarFilme');
const filtros = document.querySelectorAll('.filtro');

let filtroAtual = 'todos';

/* =========================================================
   RENDERIZA OS FILMES
========================================================= */

function renderizarFilmes(lista) {

  grid.innerHTML = '';

  // -------------------------------------------------------
  // SEM RESULTADOS
  // -------------------------------------------------------

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="sem-resultados">
        <h3>Nenhum conteúdo encontrado</h3>
        <p>Tente pesquisar outro termo ou selecionar outra categoria.</p>
      </div>
    `;
    return;
  }

  // -------------------------------------------------------
  // CRIA CADA CARD
  // -------------------------------------------------------

  lista.forEach(filme => {

    // Tags do filme
    const tagsHTML = filme.tags
      .map(tag => `<span>${tag}</span>`)
      .join('');

    // Texto do botão principal
    const textoBotao = filme.link
      ? 'Assistir'
      : 'Ver detalhes';

    // Ação do botão principal
const acaoBotao = filme.link
  ? `abrirVideo('${filme.link}')`
      : `alert('Detalhes de "${filme.titulo}" em breve!')`;

    // Badge extra para palestras
    const badgeCategoria = `
      <div class="badge-disciplina ${filme.categoria}">
        ${filme.categoriaTexto}
      </div>
    `;

    // Monta o card
    grid.innerHTML += `
      <article class="card-filme">

        <!-- =================================================
             IMAGEM
        ================================================== -->
        <div class="card-banner">

          <img
            src="${filme.imagem}"
            alt="${filme.titulo}"
            loading="lazy"
          >

          ${badgeCategoria}

          <div class="badge-tempo">
            ${filme.tempo}
          </div>

        </div>

        <!-- =================================================
             CONTEÚDO
        ================================================== -->
        <div class="card-conteudo">

          <h3>${filme.titulo}</h3>

          <p class="descricao-filme">
            ${filme.descricao}
          </p>

          <div class="tags-filme">
            ${tagsHTML}
          </div>

          <!-- =============================================
               BOTÕES
          ============================================== -->
          <div class="acoes-filme">

            <button
              class="btn-card"
              onclick="${acaoBotao}"
            >
              ${textoBotao}
            </button>

            <button class="btn-card secundario">
              ${filme.atividade}
            </button>

          </div>

        </div>

      </article>
    `;
  });
}

/* =========================================================
   FILTRA POR CATEGORIA E BUSCA
========================================================= */

function aplicarFiltros() {

  const termo = inputBusca.value.toLowerCase().trim();

  const resultado = filmes.filter(filme => {

    const correspondeCategoria =
      filtroAtual === 'todos' ||
      filme.categoria === filtroAtual;

    const correspondeBusca =
      filme.titulo.toLowerCase().includes(termo) ||
      filme.descricao.toLowerCase().includes(termo) ||
      filme.categoriaTexto.toLowerCase().includes(termo) ||
      filme.tags.some(tag => tag.toLowerCase().includes(termo));

    return correspondeCategoria && correspondeBusca;
  });

  renderizarFilmes(resultado);
}

/* =========================================================
   MODAL DE VÍDEO
========================================================= */

function abrirVideo(link) {

  // Remove modal anterior, se existir
  document.querySelector('.modal-video')?.remove();

  // Extrai o ID do vídeo do YouTube
  const videoId = link.match(/v=([^&]+)/)?.[1];

  if (!videoId) return;

  // Cria modal
  const modal = document.createElement('div');
  modal.className = 'modal-video';

  modal.innerHTML = `
    <div class="modal-video-overlay" onclick="fecharVideo()"></div>

    <div class="modal-video-box">

      <button class="fechar-video" onclick="fecharVideo()">
        ✕
      </button>

      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        title="Vídeo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

    </div>
  `;

  document.body.appendChild(modal);
}

/* =========================================================
   FECHA O MODAL
========================================================= */

function fecharVideo() {
  document.querySelector('.modal-video')?.remove();
}

/* =========================================================
   EVENTOS DOS FILTROS
========================================================= */

filtros.forEach(botao => {

  botao.addEventListener('click', () => {

    document
      .querySelector('.filtro.ativo')
      ?.classList.remove('ativo');

    botao.classList.add('ativo');

    filtroAtual = botao.dataset.filtro;

    aplicarFiltros();
  });
});

/* =========================================================
   EVENTO DA BUSCA
========================================================= */

inputBusca.addEventListener('input', aplicarFiltros);

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderizarFilmes(filmes);