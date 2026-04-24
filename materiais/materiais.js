// =====================================================
// 📦 COMPONENTES GLOBAIS (HEADER / FOOTER)
// =====================================================

async function loadComponent(id, path, callback) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    const html = await res.text();
    el.innerHTML = html;

    if (callback) callback();

  } catch (err) {
    console.error("Erro ao carregar componente:", path);
  }
}


// =====================================================
// 🚀 INICIALIZAÇÃO GLOBAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  loadComponent("superheader", "../components/superheader.html", () => {
    window.iniciarSuperHeader();
  });

  loadComponent("superfooter", "../components/superfooter.html");

  iniciarTabs();
  iniciarMateriais();
});


// =====================================================
// 📑 CONTROLE DAS ABAS
// =====================================================

function iniciarTabs() {

  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });

      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}


// =====================================================
// 📂 BASE DE DADOS (ESCALÁVEL)
// =====================================================

const materiais = {

  // =====================================================
  // ⚛️ FÍSICA
  // =====================================================
  fisica: {
    tipo: "serie",
    pasta: "Física",
    dados: {
      "1ano": [
        "Notação Científica.pdf",
        "Ordem de Grandeza.pdf",
        "Conceitos Básicos de Cinemática.pdf"
      ],
      "2ano": [
        "Escalas Termométricas - Parte 01.pdf",
        "Escalas Termométricas - Parte 02.pdf"
      ],
      "3ano": [
        "Cargas Elétricas e Processos de Eletrização.pdf",
        "Lei de Coulomb.pdf"
      ]
    }
  },

  // =====================================================
  // 📐 MATEMÁTICA
  // =====================================================
  matematica: {
    tipo: "serie",
    pasta: "Matemática",
    dados: {
      "1ano": [
        "Função do 1º Grau.pdf"
      ],
      "2ano": [],
      "3ano": []
    }
  },

  // =====================================================
  // 🧪 QUÍMICA
  // =====================================================
  quimica: {
    tipo: "serie",
    pasta: "Química",
    dados: {
      "1ano": [
        "Tabela Periódica - Parte 01.pdf",
        "Tabela Periódica - Parte 02.pdf",
        "Tabela Periódica - Parte 03.pdf",
        "Tabela Periódica - Parte 04.pdf",
        "Tabela Periódica - Parte 05.pdf",
        "Tabela Periódica - Parte 06.pdf",
        "Tabela Periódica - Parte 07.pdf",
        "Tabela Periódica - Parte 08.pdf",
        "Tabela Periódica - Parte 09.pdf",
        "Tabela Periódica - Parte 10.pdf"
      ],
      "2ano": [],
      "3ano": []
    }
  },

  // =====================================================
  // 🧠 APROFUNDAMENTO (GERAL)
  // =====================================================
  interdisciplinar: {
    tipo: "direto",
    pasta: "Aprofundamento Interdisciplinar",
    arquivos: [
      "Obsolescência programada.pdf"
    ]
  },

  // =====================================================
  // 📖 LETRAMENTO
  // =====================================================
  letramento: {
    tipo: "serie",
    pasta: "Clube de Letramento - Matemática",
    dados: {
      "6ano": [
        "Atividade 01.pdf",
        "Atividade 02.pdf",
        "Atividade 03.pdf",
        "Atividade 04.pdf",
        "Atividade 05.pdf",
        "Atividade 06.pdf",
        "Atividade 07.pdf",
        "Atividade 08.pdf",
        "Atividade 09.pdf",
        "Atividade 10.pdf"
      ]
    }
  },

  // =====================================================
  // 🔄 RECOMPOSIÇÃO
  // =====================================================
  recomposicao: {
    tipo: "direto",
    pasta: "Recomposição da Aprendizagem - Matemática",
    arquivos: [
      "Atividade 01 - Recomposição da Aprendizagem - Matemática.pdf",
      "Atividade 02 - Recomposição da Aprendizagem - Matemática.pdf"
    ]
  },

  // =====================================================
  // 📝 REVISÕES
  // =====================================================
  revisoes: {
    tipo: "direto",
    pasta: "Revisões Matemáticas",
    arquivos: [
      "Operações com Potências de Base 10.pdf"
    ]
  }

};


// =====================================================
// 🗺️ MAPEAMENTO DE PASTAS REAIS
// =====================================================

const mapaPastas = {
  fisica: "Física",
  matematica: "Matemática",
  quimica: "Química"
};


// =====================================================
// 🔤 UTILIDADES
// =====================================================

function formatarSerie(serie) {
  switch (serie) {
    case "1ano": return "1º Ano";
    case "2ano": return "2º Ano";
    case "3ano": return "3º Ano";
    case "eja": return "EJA";
    default: return serie;
  }
}

function formatarNomeArquivo(arquivo) {
  return arquivo
    .replace(".pdf", "")
    .replaceAll("-", " ");
}


// =====================================================
// 📄 INICIALIZA MATERIAIS
// =====================================================

function iniciarMateriais() {
  Object.keys(materiais).forEach(area => {
    carregarMateriais(area);
  });
}


// =====================================================
// 📄 RENDERIZAÇÃO PRINCIPAL
// =====================================================

function carregarMateriais(area) {

  const container = document.getElementById(area);
  if (!container) return;

  container.innerHTML = "";

  const config = materiais[area];
  if (!config) {
    renderEmpty(container);
    return;
  }

  let temConteudo = false;

  // =====================================================
  // 🔹 CASO 1: COM SÉRIE (1ano, 2ano, 6ano...)
  // =====================================================

  if (config.tipo === "serie") {

    const pastaBase = config.pasta || mapaPastas[area] || area;

    Object.keys(config.dados).forEach(serie => {

      const lista = config.dados[serie];
      if (!lista || lista.length === 0) return;

      temConteudo = true;

      const bloco = document.createElement("div");
      bloco.className = "bloco-serie";

      const titulo = document.createElement("h2");
      titulo.className = "titulo-serie";
      titulo.textContent = formatarSerie(serie);

      bloco.appendChild(titulo);

      const grid = document.createElement("div");
      grid.className = "grid-serie";

      lista.forEach(arquivo => {

        const card = criarCard(
          arquivo,
          `/materiais/atividades-site/${pastaBase}/${serie}/${encodeURIComponent(arquivo)}`
        );

        grid.appendChild(card);
      });

      bloco.appendChild(grid);
      container.appendChild(bloco);
    });
  }


  // =====================================================
  // 🔹 CASO 2: DIRETO (SEM SÉRIE)
  // =====================================================

  if (config.tipo === "direto") {

    const grid = document.createElement("div");
    grid.className = "grid-serie";

    config.arquivos.forEach(arquivo => {

      temConteudo = true;

      const card = criarCard(
        arquivo,
        `/materiais/atividades-site/${config.pasta}/${encodeURIComponent(arquivo)}`
      );

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  if (!temConteudo) {
    renderEmpty(container);
  }
}


// =====================================================
// 📭 ESTADO VAZIO
// =====================================================

function renderEmpty(container) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📂</div>
      <h3>Nenhum material disponível</h3>
      <p>Estamos preparando novos conteúdos para você.</p>
      <span>Volte em breve 🚀</span>
    </div>
  `;
}


function criarCard(arquivo, url) {

  const nomeBonito = formatarNomeArquivo(arquivo);

  const card = document.createElement("div");
  card.className = "material-card";

  const tipo = document.createElement("div");
  tipo.className = "material-type";
  tipo.textContent = "PDF";

  const info = document.createElement("div");
  info.className = "material-info";

  const titulo = document.createElement("h3");
  titulo.textContent = nomeBonito;

  const span = document.createElement("span");
  span.textContent = "Material de estudo";

  info.appendChild(titulo);
  info.appendChild(span);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";

  const botao = document.createElement("button");
  botao.className = "btn-download";
  botao.textContent = "Abrir";

  botao.addEventListener("click", () => {
    botao.textContent = "Abrindo...";
    setTimeout(() => botao.textContent = "Abrir", 1200);
  });

  link.appendChild(botao);

  card.appendChild(tipo);
  card.appendChild(info);
  card.appendChild(link);

  return card;
}

