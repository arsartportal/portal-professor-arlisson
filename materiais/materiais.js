// 📑 CONTROLE DAS ABAS
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");

    const target = document.getElementById(tab.dataset.tab);
    target.classList.add("active");

  });
});


// 📂 LISTA DE MATERIAIS
const materiais = {
  fisica: [
    "Cargas Elétricas e Processos de Eletrização.pdf",
    "Conceitos Básicos de Cinemática.pdf",
    "Escalas Termométricas.pdf",
    "Lei de Coulomb.pdf",
    "Notação Científica.pdf",
    "Ordem de Grandeza.pdf"
  ],
  matematica: [],
  quimica: [],
  interdisciplinar: [],
  letramento: [],
  recomposicao: [],
  revisoes: []
};


// 🚀 FUNÇÃO DE CARREGAMENTO
function carregarMateriais(area) {

  const container = document.getElementById(area);

  if (!container) return;

  container.innerHTML = "";

  if (materiais[area].length === 0) {
    container.innerHTML = "<p>Nenhum material disponível ainda.</p>";
    return;
  }

  materiais[area].forEach(arquivo => {

    const nomeBonito = arquivo
      .replace(".pdf", "")
      .replaceAll("-", " ");

    const card = document.createElement("div");
    card.className = "material-card";

    card.innerHTML = `
      <div class="material-info">
        <h3>${nomeBonito}</h3>
        <span>PDF • Material</span>
      </div>
      <a href="/materiais/${area}/${arquivo}" target="_blank">
        <button class="btn-download">Abrir</button>
      </a>
    `;

    container.appendChild(card);

  });
}


// 🔥 INICIALIZAÇÃO
Object.keys(materiais).forEach(area => {
  carregarMateriais(area);
});