/* =====================================================
   TERMOLOGIA — PROGRESSO, XP E CHECKPOINTS
   Portal do Professor Arlisson
===================================================== */

import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   TORNA FIREBASE GLOBAL (OBRIGATÓRIO P/ HTML INLINE)
===================================================== */

window.auth = auth;
window.db = db;

/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const PROGRESS_ID = "termologia_2ano";
const XP_POR_NIVEL = 10;
const ULTIMO_NIVEL = "nivel_2_6";

/* =====================================================
   CONCLUIR NÍVEL (CHAMADO PELO HTML)
===================================================== */

window.concluirNivel = async function (nivelId) {
  console.log("➡️ concluirNivel:", nivelId);

  const user = window.auth.currentUser;
  if (!user) {
    alert("Usuário não autenticado");
    return;
  }

  const uid = user.uid;
  const userRef = doc(window.db, "usuarios", uid);
  const progressRef = doc(window.db, "usuarios", uid, "progress", PROGRESS_ID);

  let progressSnap = await getDoc(progressRef);

  // 🆕 cria progresso se não existir
  if (!progressSnap.exists()) {
    await setDoc(progressRef, {
      trilha: PROGRESS_ID,
      concluidos: [],
      nivelAtual: 1,
      finalizado: false,
      criadoEm: new Date()
    });
    progressSnap = await getDoc(progressRef);
  }

  const progress = progressSnap.data();
  const concluidos = progress.concluidos || [];

  // 🚫 evita duplicação
  if (concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const nivelNumero = Number(nivelId.match(/\d+$/)[0]);

  // Atualiza progresso
  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: nivelNumero + 1
  });

  // Soma XP
  await updateDoc(userRef, {
    xp: increment(XP_POR_NIVEL)
  });

  // 🔚 último nível
  if (nivelId === ULTIMO_NIVEL) {
    await updateDoc(progressRef, { finalizado: true });
    window.location.href = "../2ano/termologia-final.html";
    return;
  }

  mostrarConclusaoNivel(nivelId);
};

/* =====================================================
   MODAL
===================================================== */

function mostrarConclusaoNivel(nivelId) {
  window.nivelAtualConcluido = nivelId;
  const modal = document.getElementById("nivel-concluido-modal");
  if (modal) modal.classList.remove("hidden");
}

window.irParaProximoNivel = function () {
  const numero = Number(window.nivelAtualConcluido.match(/\d+$/)[0]);
  window.location.href = `../2ano/termologia-2-${numero + 1}.html`;
};

window.voltarParaFisica = function () {
  window.location.href = "../fisica.html";
};

/* =====================================================
   CHECKPOINTS — FUNÇÃO GENÉRICA
===================================================== */

function avaliarCheckpoint(gabarito, ultimo = false) {
  let acertos = 0;

  Object.keys(gabarito).forEach(q => {
    const marcada = document.querySelector(`input[name="${q}"]:checked`);
    if (marcada && marcada.value === gabarito[q]) acertos++;
  });

  const resultado = document.getElementById("resultado-checkpoint");
  const botao = document.querySelector(".btn-concluir");

  if (acertos >= 2) {
    resultado.textContent = ultimo
      ? "🎉 Você concluiu a Termologia!"
      : `✅ Você acertou ${acertos}/3. Pode concluir o nível.`;
    resultado.style.color = "green";
    botao.disabled = false;
    botao.style.opacity = "1";
  } else {
    resultado.textContent = `❌ Você acertou ${acertos}/3. Revise e tente novamente.`;
    resultado.style.color = "red";
  }
}

/* =====================================================
   CHECKPOINTS — EXPOSTOS AO HTML
===================================================== */

window.verificarCheckpoint = () =>
  avaliarCheckpoint({ q1: "b", q2: "b", q3: "a" });

window.verificarCheckpointNivel22 = () =>
  avaliarCheckpoint({ q1: "c", q2: "a", q3: "b" });

window.verificarCheckpointNivel23 = () =>
  avaliarCheckpoint({ q1: "b", q2: "b", q3: "c" });

window.verificarCheckpointNivel24 = () =>
  avaliarCheckpoint({ q1: "a", q2: "b", q3: "c" });

window.verificarCheckpointNivel25 = () =>
  avaliarCheckpoint({ q1: "b", q2: "b", q3: "c" });

window.verificarCheckpointNivel26 = () =>
  avaliarCheckpoint({ q1: "b", q2: "b", q3: "c" }, true);
