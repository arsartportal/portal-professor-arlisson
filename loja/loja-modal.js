// ======================================================
// 🧠 MODAL ENGINE - UNIVERSAL (LOJA) FINAL
// ======================================================

// ======================================================
// 📦 ESTADO GLOBAL
// ======================================================

let filaModais = [];
let modalAberto = false;

// ======================================================
// 📦 CONTAINER GLOBAL
// ======================================================

function getModalContainer() {
  let container = document.getElementById("modal");

  if (!container) {
    container = document.createElement("div");
    container.id = "modal";
    document.body.appendChild(container);
  }

  return container;
}

// ======================================================
// 🎨 TEMPLATE BASE
// ======================================================

function criarTemplate({
  icon = "✨",
  titulo = "",
  descricao = "",
  acoes = [],
  raridade = "comum",
  htmlExtra = ""
}) {
  return `
    <div class="modal-overlay fade-in">
      <div class="modal-card ${raridade} scale-in">

        <div class="modal-icon">${icon}</div>

        <h2>${titulo}</h2>

        <p>${descricao}</p>

        ${htmlExtra}

        ${
          acoes.length > 0
            ? `<div class="modal-botoes">
                ${acoes.map((btn, i) => `
                  <button 
                    class="${btn.tipo || ""}" 
                    data-acao="${i}"
                  >
                    ${btn.texto}
                  </button>
                `).join("")}
              </div>`
            : ""
        }

      </div>
    </div>
  `;
}

// ======================================================
// 🚀 ABRIR MODAL (COM FILA + REPLACE)
// ======================================================

export function abrirModal(config) {

  const modal = getModalContainer();

  // 🧠 REPLACE: substitui o modal atual (sem fila)
  if (config.replace) {
    filaModais = [];        // limpa fila
    modal.innerHTML = "";   // remove atual
    modalAberto = false;
  }

  // 🔁 fila normal
  if (modalAberto) {
    filaModais.push(config);
    return;
  }

  modalAberto = true;

  modal.innerHTML = criarTemplate(config);

  // 🔘 botões
  modal.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      const index = btn.dataset.acao;
      const acao = config.acoes[index]?.onClick;

      fecharModal();

      if (acao) acao();
    };
  });

  // ❌ clicar fora
  const overlay = modal.querySelector(".modal-overlay");
  overlay.onclick = (e) => {
    if (e.target === overlay) fecharModal();
  };

  // ⌨️ ESC
  document.onkeydown = (e) => {
    if (e.key === "Escape") fecharModal();
  };
}

// ======================================================
// ❌ FECHAR MODAL + FILA
// ======================================================

export function fecharModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;

  modal.innerHTML = "";
  modalAberto = false;

  // 🔁 abre próximo
  if (filaModais.length > 0) {
    const proximo = filaModais.shift();
    setTimeout(() => abrirModal(proximo), 150);
  }
}

// ======================================================
// 🛒 CONFIRMAÇÃO
// ======================================================

export function modalConfirmacao(item, onConfirmar) {
  abrirModal({
    icon: "🛒",
    titulo: "Confirmar resgate",
    descricao: `Deseja resgatar <strong>${item.nome}</strong>?`,
    htmlExtra: `<span class="modal-preco">Custo: ${item.preco} SP</span>`,
    acoes: [
      {
        texto: "Confirmar",
        tipo: "confirmar",
        onClick: onConfirmar
      },
      {
        texto: "Cancelar",
        tipo: "cancelar"
      }
    ]
  });
}

// ======================================================
// 🎁 RECOMPENSA
// ======================================================

export function modalRecompensa({ titulo, descricao, raridade = "comum" }) {
  abrirModal({
    icon: "🎁",
    titulo,
    descricao,
    raridade,
    acoes: [{ texto: "Continuar" }]
  });
}

// ======================================================
// ⚡ XP
// ======================================================

export function modalXP(valor) {

  let raridade = "comum";
  if (valor >= 1000) raridade = "lendario";
  else if (valor >= 100) raridade = "epico";

  abrirModal({
    icon: "⚡",
    titulo: `+${valor} XP`,
    descricao: "Seu conhecimento evoluiu!",
    raridade,
    htmlExtra: `<div class="xp-destaque">+${valor}</div>`,
    acoes: [{ texto: "Continuar" }],
    replace: true
  });
}

// ======================================================
// 📦 CAIXA
// ======================================================

export function modalCaixa({ nome, premio, raridade }) {
  abrirModal({
    icon: "📦",
    titulo: nome,
    descricao: `Você recebeu:`,
    raridade,
    htmlExtra: `
      <div class="loot-resultado">
        ⚡ +${premio} XP
      </div>
    `,
    acoes: [{ texto: "Continuar" }],
    replace: true
  });
}

// ======================================================
// 🏆 LENDÁRIO
// ======================================================

export function modalLendario({ titulo, descricao }) {
  abrirModal({
    icon: "👑",
    titulo,
    descricao,
    raridade: "lendario",
    acoes: [{ texto: "Continuar" }],
    replace: true
  });
}

// ======================================================
// 🔄 LOADING (INTELIGENTE)
// ======================================================

export function modalLoading(texto = "Processando...") {
  abrirModal({
    icon: "⏳",
    titulo: texto,
    descricao: "",
    htmlExtra: `<div class="spinner"></div>`,
    acoes: [],
    replace: true // 🔥 resolve o travamento
  });
}

// ======================================================
// 🌍 GLOBAL
// ======================================================

window.fecharModal = fecharModal;