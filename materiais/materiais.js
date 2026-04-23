// =====================================================
// 📦 COMPONENTES GLOBAIS (HEADER / FOOTER)
// =====================================================

/**
 * Carrega um componente HTML externo (header/footer)
 */
async function loadComponent(id, path) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error("Erro ao carregar componente:", path);
  }
}


// =====================================================
// 🚀 INICIALIZAÇÃO GLOBAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  // 🔷 Componentes reutilizáveis
  loadComponent("superheader", "/components/superheader.html");
  loadComponent("superfooter", "/components/superfooter.html");

  // 📑 Inicializações da página
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

      // remove estados ativos
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // ativa aba clicada
      tab.classList.add("active");

      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");

    });
  });

}


// =====================================================
// 📂 BASE DE DADOS (ESTRUTURA ESCALÁVEL)
// =====================================================

/**
 * Estrutura:
 * Disciplina → Série → Lista de arquivos
 */
const materiais = {

  fisica: {

    "1ano": [
      "Notação Científica.pdf",
      "Ordem de Grandeza.pdf",
      "Conceitos Básicos de Cinemática.pdf"
    ],

    "2ano": [
      "Escalas Termométricas - Parte 1.pdf",
      "Escalas Termométricas - Parte 2.pdf"
    ],

    "3ano": [
      "Cargas Elétricas e Processos de Eletrização.pdf",
      "Lei de Coulomb.pdf"
    ],

    "eja": []

  },

  matematica: {
    "1ano": [],
    "2ano": [],
    "3ano": [],
    "eja": []
  },

  quimica: {
    "1ano": [],
    "2ano": [],
    "3ano": [],
    "eja": []
  },

  interdisciplinar: {},
  letramento: {},
  recomposicao: {},
  revisoes: {}

};


// =====================================================
// 🔤 UTILIDADES
// =====================================================

/**
 * Formata nome da série para exibição
 */
function formatarSerie(serie) {
  switch (serie) {
    case "1ano": return "1º Ano";
    case "2ano": return "2º Ano";
    case "3ano": return "3º Ano";
    case "eja": return "EJA";
    default: return serie;
  }
}

/**
 * Remove extensão e melhora leitura do nome
 */
function formatarNomeArquivo(arquivo) {
  return arquivo
    .replace(".pdf", "")
    .replaceAll("-", " ");
}


// =====================================================
// 📄 RENDERIZAÇÃO DOS MATERIAIS
// =====================================================

/**
 * Inicializa renderização de todas as abas
 */
function iniciarMateriais() {
  Object.keys(materiais).forEach(area => {
    carregarMateriais(area);
  });
}


/**
 * Renderiza materiais por disciplina
 */
function carregarMateriais(area) {

  const container = document.getElementById(area);
  if (!container) return;

  container.innerHTML = "";

  const dados = materiais[area];

  // fallback caso não exista conteúdo
  if (!dados || Object.keys(dados).length === 0) {
    container.innerHTML = "<p>Nenhum material disponível ainda.</p>";
    return;
  }

  let temConteudo = false;

  // percorre séries
  Object.keys(dados).forEach(serie => {

    const lista = dados[serie];

    // ignora séries vazias
    if (!lista || lista.length === 0) return;

    temConteudo = true;

    // =====================================================
    // 🔷 BLOCO DA SÉRIE
    // =====================================================

    const bloco = document.createElement("div");
    bloco.className = "bloco-serie";

    const titulo = document.createElement("h2");
    titulo.className = "titulo-serie";
    titulo.textContent = formatarSerie(serie);

    bloco.appendChild(titulo);

    // =====================================================
    // 📦 GRID DE MATERIAIS
    // =====================================================

    const grid = document.createElement("div");
    grid.className = "grid-serie";

    lista.forEach(arquivo => {

      const nomeBonito = formatarNomeArquivo(arquivo);

      const card = document.createElement("div");
      card.className = "material-card";

      card.innerHTML = `
        <div class="material-type">PDF</div>

        <div class="material-info">
          <h3>${nomeBonito}</h3>
          <span>Material de estudo</span>
        </div>

        <a href="/materiais/${area}/${arquivo}" target="_blank">
          <button class="btn-download">Abrir</button>
        </a>
      `;

      grid.appendChild(card);

    });

    bloco.appendChild(grid);
    container.appendChild(bloco);

  });

  // se nenhuma série tiver conteúdo
  if (!temConteudo) {
    container.innerHTML = "<p>Nenhum material disponível ainda.</p>";
  }

}