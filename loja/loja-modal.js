// ======================================================
// 🧠 SISTEMA DE MODAIS DA LOJA
// ======================================================


// ======================================================
// 📦 CRIAR CONTAINER GLOBAL (1x só)
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
// 🛒 MODAL DE CONFIRMAÇÃO DE COMPRA
// ======================================================

export function abrirConfirmacaoCompra(item, onConfirmar) {

  const modal = getModalContainer();

  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card">

        <div class="modal-icon">🛒</div>

        <h2>Confirmar resgate</h2>

        <p>
          Deseja resgatar <strong>${item.nome}</strong>?
        </p>

        <span class="modal-preco">
          Custo: ${item.preco} SP
        </span>

        <div class="modal-botoes">
          <button id="confirmarBtn">Confirmar</button>
          <button id="cancelarBtn" class="cancelar">Cancelar</button>
        </div>

      </div>
    </div>
  `;

  // 🔘 eventos
  modal.querySelector("#confirmarBtn").onclick = () => {
    fecharModal();
    onConfirmar();
  };

  modal.querySelector("#cancelarBtn").onclick = fecharModal;
}


// ======================================================
// 🎁 MODAL DE RECOMPENSA (opcional)
// ======================================================

export function abrirRecompensa(titulo, descricao) {

  const modal = getModalContainer();

  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card">

        <div class="modal-icon">🎁</div>

        <h2>${titulo}</h2>

        <p>${descricao}</p>

        <button onclick="fecharModal()">Continuar</button>

      </div>
    </div>
  `;
}


// ======================================================
// ❌ FECHAR MODAL
// ======================================================

export function fecharModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.innerHTML = "";
}


// ======================================================
// 🌍 GLOBAL (pra onclick funcionar se precisar)
// ======================================================

window.fecharModal = fecharModal;