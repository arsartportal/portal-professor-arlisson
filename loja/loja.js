// ======================================================
// 🧠 IMPORTS
// ======================================================

// Firebase
import { auth, db } from "../js/firebase.js";
import { doc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// UI
import {
  renderLoja,
  atualizarSPNaTela,
  iniciarMenuAtivo
} from "./loja-ui.js";

// Actions (lógica)
import {
  iniciarEventos,
  carregarSPTempoReal,
  carregarHistorico,
  carregarSPGlobal,
  carregarMetaGlobal,
  carregarRankingGasto,
  carregarEstoque,
  sincronizarTempo,
  atualizarContadores,
  iniciarSistemaCompra
} from "./loja-actions.js";

// Alertas globais
import {
  initGlobalAlert as iniciarAlertaGlobal
} from "../js/plugins/global-alert/globalAlert.js";


// ======================================================
// 🚀 INICIALIZAÇÃO PRINCIPAL
// ======================================================

auth.onAuthStateChanged(async (user) => {

  if (!user) return;

  try {

    // 🔷 SUPERHEADER GLOBAL
    if (window.iniciarSuperHeader) {
      window.iniciarSuperHeader();
    }

    // 🔥 alerta global
    iniciarAlertaGlobal();

    // 🔥 sincroniza tempo (ESSENCIAL pro contador)
    await sincronizarTempo();

    // 🔗 referência do usuário
    const userRef = doc(db, "usuarios", user.uid);

    // 🎯 sistema de compra (injeta userRef nas actions)
    iniciarSistemaCompra(userRef);

    // 🎯 eventos globais (ex: window.comprar)
    iniciarEventos();

    // ==================================================
    // 🔥 DADOS EM TEMPO REAL
    // ==================================================

    carregarSPTempoReal(userRef, (sp, bonus) => {
      atualizarSPNaTela(sp, bonus);
      renderLoja();
    });

    carregarHistorico();
    carregarSPGlobal();
    carregarMetaGlobal();
    carregarRankingGasto();

    // ==================================================
    // 📦 ESTOQUE
    // ==================================================

    await carregarEstoque();

    // ==================================================
    // 🎨 RENDER INICIAL
    // ==================================================

    renderLoja();

    // ==================================================
    // 🎮 MENU ATIVO
    // ==================================================

    setTimeout(() => {
      iniciarMenuAtivo();
    }, 300);

    // ==================================================
    // ⏳ ATUALIZAÇÕES CONTÍNUAS
    // ==================================================

    setInterval(sincronizarTempo, 5 * 60 * 1000); // a cada 5 min
    setInterval(atualizarContadores, 1000);       // contadores

    atualizarContadores();

  } catch (erro) {
    console.error("Erro ao iniciar loja:", erro);
  }

});