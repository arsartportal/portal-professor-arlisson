function abrirMaterial(pagina) {
  window.location.href = pagina;
}

function abrirLink(url) {
  window.open(url, "_blank");
}

function abrirPDF(caminho) {
  window.open(caminho, "_blank");
}

/* =========================
   LISTA DE PDFs
========================= */

const materiais = {
  "📘 Física": [
    "Cargas Elétricas e Processos de Eletrização",
    "Escalas Termométricas",
    "Escalas Termométricas - Parte 02",
    "Notação Científica",
    "Ordem de Grandeza"
  ],

  "📗 Matemática": [
    "Função do 1º Grau"
  ],

  "📙 Química": [
    "Tabela Periódica - Parte 01",
    "Tabela Periódica - Parte 02",
    "Tabela Periódica - Parte 03",
    "Tabela Periódica - Parte 04",
    "Tabela Periódica - Parte 05",
    "Tabela Periódica - Parte 06",
    "Tabela Periódica - Parte 07",
    "Tabela Periódica - Parte 08",
    "Tabela Periódica - Parte 09",
    "Tabela Periódica - Parte 10"
  ],

  "📕 Clube de Letramento - Matemática": [
    "Atividade 01",
    "Atividade 02",
    "Atividade 03",
    "Atividade 04",
    "Atividade 05",
    "Atividade 06",
    "Atividade 07",
    "Atividade 08",
    "Atividade 09",
    "Atividade 10"
  ],

  "📓 Recomposição da Aprendizagem - Matemática": [
    "Atividade 01 - Recomposição da Aprendizagem - Matemática"
  ],

  "📒 Revisões Matemáticas": [
    "Operações com Potências de Base 10"
  ]
};

/* =========================
   CAMINHOS DAS PASTAS
========================= */

const caminhos = {
  "📘 Física": "atividades-site/Física/",
  "📗 Matemática": "atividades-site/Matemática/",
  "📙 Química": "atividades-site/Química/",
  "📕 Clube de Letramento - Matemática": "atividades-site/Clube de Letramento - Matemática/",
  "📓 Recomposição da Aprendizagem - Matemática": "atividades-site/Recomposição da Aprendizagem - Matemática/",
  "📒 Revisões Matemáticas": "atividades-site/Revisões Matemáticas/"
};

/* =========================
   GERAR NA TELA
========================= */

function carregarMateriais() {
  const container = document.getElementById("conteudo");

  Object.keys(materiais).forEach(categoria => {

    const section = document.createElement("section");
    section.className = "categoria";

    const titulo = document.createElement("h2");
    titulo.textContent = categoria;

    const grid = document.createElement("div");
    grid.className = "grid";

    materiais[categoria].forEach(nome => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${nome}</h3>
        <p>Material em PDF</p>
      `;

      const caminhoCompleto = caminhos[categoria] + nome + ".pdf";

      card.onclick = () => abrirPDF(caminhoCompleto);

      grid.appendChild(card);
    });

    section.appendChild(titulo);
    section.appendChild(grid);

    container.appendChild(section);
  });
}

carregarMateriais();