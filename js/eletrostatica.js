/* =====================================================
   ELETROSTÁTICA — PROGRESSO, XP E CHECKPOINTS
   Portal do Professor Arlisson
   (CLONE OFICIAL DA TERMOLOGIA — 3º ANO)
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
   TORNA FIREBASE GLOBAL (HTML INLINE)
===================================================== */

window.auth = auth;
window.db   = db;

/* =====================================================
   CONFIGURAÇÃO DA TRILHA
===================================================== */

const PROGRESS_ID  = "eletrostatica_3ano";
const XP_POR_NIVEL = 10;
const ULTIMO_NIVEL = "nivel_3_6";

/* =====================================================
   CONCLUIR NÍVEL
===================================================== */

window.concluirNivel = async function (nivelId) {

  const user = auth.currentUser;
  if (!user) {
    alert("Usuário não autenticado");
    return;
  }

  const uid = user.uid;
  const userRef     = doc(db, "usuarios", uid);
  const progressRef = doc(db, "usuarios", uid, "progress", PROGRESS_ID);

  let progressSnap = await getDoc(progressRef);

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

  const progress   = progressSnap.data();
  const concluidos = progress.concluidos || [];

  if (concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const nivelNumero = Number(nivelId.match(/\d+$/)[0]);

  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: nivelNumero + 1
  });

  await updateDoc(userRef, {
    xp: increment(XP_POR_NIVEL)
  });

  if (nivelId === ULTIMO_NIVEL) {
    await updateDoc(progressRef, { finalizado: true });
    window.location.href = "../3ano/eletrostatica-final.html";
    return;
  }

  mostrarConclusaoNivel(nivelId);
};

/* =====================================================
   MODAL
===================================================== */

function mostrarConclusaoNivel(nivelId) {
  window.nivelAtualConcluido = nivelId;
  document
    .getElementById("nivel-concluido-modal")
    ?.classList.remove("hidden");
}

window.irParaProximoNivel = function () {
  const numero = Number(window.nivelAtualConcluido.match(/\d+$/)[0]);
  window.location.href = `../3ano/eletrostatica-3-${numero + 1}.html`;
};

window.voltarParaFisica = function () {
  window.location.href = "../fisica.html";
};

/* =====================================================
   CHECKPOINT — FUNÇÃO GENÉRICA
===================================================== */

function avaliarCheckpoint(gabarito, ultimo = false) {
  let acertos = 0;

  Object.keys(gabarito).forEach(q => {
    const marcada = document.querySelector(`input[name="${q}"]:checked`);
    if (marcada && marcada.value === gabarito[q]) acertos++;
  });

  const resultado = document.getElementById("resultado-checkpoint");
  const botao     = document.querySelector(".btn-concluir");

  if (acertos >= 2) {
    resultado.textContent = ultimo
      ? "🎉 Você concluiu a Eletrostática!"
      : `✅ Você acertou ${acertos}/3. Pode concluir o nível.`;
    resultado.style.color = "green";
    botao.disabled = false;
    botao.style.opacity = "1";
  } else {
    resultado.textContent =
      `❌ Você acertou ${acertos}/3. Revise e tente novamente.`;
    resultado.style.color = "red";
  }
}

/* =====================================================
   GABARITOS — AJUSTE AQUI CONFORME O HTML
===================================================== */

/* ---------- NÍVEL 3.1 ---------- */
window.verificarCheckpoint = () =>
  avaliarCheckpoint({
    q1: "b", // Cargas elétricas em repouso
    q2: "b", // Elas se atraem (cargas opostas)
    q3: "c"  // Condução térmica (NÃO é eletrização)
  });

/* ---------- NÍVEL 3.2 ---------- */
window.verificarCheckpointNivel32 = () =>
  avaliarCheckpoint({
    q1: "b", // Propriedade física da matéria
    q2: "a", // Elas se repelem
    q3: "c"  // Coulomb
  });


/* ---------- NÍVEL 3.3 ---------- */
window.verificarCheckpointNivel33 = () =>
  avaliarCheckpoint({
    q1: "b", // Transferência de elétrons
    q2: "c", // Indução
    q3: "b"  // Conservação da carga elétrica
  });


/* ---------- NÍVEL 3.4 — CAMPO ELÉTRICO ---------- */
window.verificarCheckpointNivel34 = () =>
  avaliarCheckpoint({
    q1: "b", // Região de influência de uma carga
    q2: "b", // Intensidade do campo elétrico
    q3: "c"  // Sem contato direto
  });


/* ---------- NÍVEL 3.5 - Lei de Coulomb ---------- */
window.verificarCheckpointNivel35 = () =>
  avaliarCheckpoint({
    q1: "a", // A força elétrica entre cargas
    q2: "b", // Inversamente proporcional ao quadrado da distância
    q3: "c"  // Das cargas e da distância
  });

/* ---------- NÍVEL 3.6 (FINAL) ---------- */
window.verificarCheckpointNivel36 = () =>
  avaliarCheckpoint({
    q1: "b", // Energia potencial elétrica por carga
    q2: "b", // Variação do potencial elétrico
    q3: "c"  // Volt
  }, true);
