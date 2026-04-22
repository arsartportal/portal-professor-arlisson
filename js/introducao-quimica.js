/* =====================================================
   INTRODUÇÃO À QUÍMICA — PROGRESSO, XP E FLUXO
   Portal do Professor Arlisson
===================================================== */

import { adicionarXPImediato } from "./xp.js";
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const PROGRESS_ID = "introducao_quimica_1ano";
const XP_POR_NIVEL = 10;

let MODO_REVISAO = false;
let PROGRESSO_ATUAL = null;

/* =====================================================
   DETECTAR REVISÃO AUTOMÁTICA
===================================================== */

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const progressRef = doc(db, "usuarios", user.uid, "progress", PROGRESS_ID);
  const snap = await getDoc(progressRef);

  if (!snap.exists()) return;

  PROGRESSO_ATUAL = snap.data();

  const pagina = window.location.pathname;
  const match = pagina.match(/introducao-quimica-1-(\d)/);
  if (!match) return;

  const numeroNivel = match[1];
  const nivelId = `nivel_1_${numeroNivel}`;

  if (PROGRESSO_ATUAL.concluidos?.includes(nivelId)) {
    ativarModoRevisao();
  }
});

/* =====================================================
   ATIVAR MODO REVISÃO
===================================================== */

function ativarModoRevisao() {
  MODO_REVISAO = true;

  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.disabled = true;
  });

  const botao = document.querySelector(".btn-concluir");
  if (botao) {
    botao.disabled = true;
    botao.style.opacity = "0.5";
    botao.textContent = "Modo Revisão";
  }

  const aviso = document.createElement("div");
  aviso.innerHTML = "🧪 Você está em modo revisão. Respostas bloqueadas.";
  aviso.style.background = "#eef3ff";
  aviso.style.padding = "10px";
  aviso.style.marginBottom = "15px";
  aviso.style.borderRadius = "8px";
  aviso.style.fontWeight = "bold";

  const container = document.querySelector(".container");
  if (container) container.prepend(aviso);

  mostrarCorrecoes();
}

/* =====================================================
   MOSTRAR CORREÇÕES
===================================================== */

function mostrarCorrecoes() {

  const gabaritos = {
    "nivel_1_1": { q1: "b", q2: "b", q3: "c" },
    "nivel_1_2": { q1: "a", q2: "b", q3: "c" },
    "nivel_1_3": { q1: "c", q2: "b", q3: "c" },
    "nivel_1_4": { q1: "b", q2: "a", q3: "b" },
    "nivel_1_5": { q1: "b", q2: "c", q3: "a" }
  };

  const pagina = window.location.pathname;
  const match = pagina.match(/introducao-quimica-1-(\d)/);
  if (!match) return;

  const numeroNivel = match[1];
  const nivelId = `nivel_1_${numeroNivel}`;
  const gabarito = gabaritos[nivelId];
  if (!gabarito) return;

  Object.keys(gabarito).forEach(q => {

    const correta = gabarito[q];
    const alternativas = document.querySelectorAll(`input[name="${q}"]`);

    alternativas.forEach(input => {

      const label = input.closest("label");

      if (input.value === correta) {
        label.style.background = "#d4edda";
      }

      if (input.checked && input.value !== correta) {
        label.style.background = "#f8d7da";
      }

    });
  });
}

/* =====================================================
   CONCLUIR NÍVEL
===================================================== */

async function concluirNivel(nivelId) {

  if (MODO_REVISAO) {
    alert("Modo revisão ativo. Não é possível concluir novamente.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("Usuário não autenticado.");
    return;
  }

  const progressRef = doc(db, "usuarios", user.uid, "progress", PROGRESS_ID);
  const snap = await getDoc(progressRef);
  if (!snap.exists()) return;

  const progress = snap.data();

  if (progress.concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const numeroNivel = parseInt(nivelId.split("_")[2]);

  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: numeroNivel + 1
  });

  await adicionarXPImediato(
    XP_POR_NIVEL,
    "Conclusão de nível — Introdução à Química"
  );

  if (nivelId === "nivel_1_5") {
    window.location.href = "../1ano/introducao-quimica-final.html";
    return;
  }

  mostrarConclusaoNivel(nivelId);
}

/* =====================================================
   MODAL
===================================================== */

function mostrarConclusaoNivel(nivelId) {
  window.nivelAtualConcluido = nivelId;
  const modal = document.getElementById("nivel-concluido-modal");
  if (modal) modal.classList.remove("hidden");
}

function irParaProximoNivel() {
  const numero = parseInt(window.nivelAtualConcluido.split("_")[2]);
  window.location.href = `../1ano/introducao-quimica-1-${numero + 1}.html`;
}

function voltarParaQuimica() {
  window.location.href = "../quimica.html";
}

/* =====================================================
   CHECKPOINTS
===================================================== */

function liberarConclusao(msg) {

  if (MODO_REVISAO) return;

  const resultado = document.getElementById("resultado-checkpoint");
  const botao = document.querySelector(".btn-concluir");

  resultado.textContent = msg;
  resultado.style.color = "green";

  botao.disabled = false;
  botao.style.opacity = "1";
}

function erroConclusao(msg) {
  const resultado = document.getElementById("resultado-checkpoint");
  resultado.textContent = msg;
  resultado.style.color = "red";
}

/* ---------- NÍVEIS ---------- */

window.verificarCheckpoint = () => verificarNivel({ q1: "b", q2: "b", q3: "c" });
window.verificarCheckpointNivel12 = () => verificarNivel({ q1: "a", q2: "b", q3: "c" });
window.verificarCheckpointNivel13 = () => verificarNivel({ q1: "c", q2: "b", q3: "c" });
window.verificarCheckpointNivel14 = () => verificarNivel({ q1: "b", q2: "a", q3: "b" });
window.verificarCheckpointNivel15 = () => verificarNivel({ q1: "b", q2: "c", q3: "a" });

function verificarNivel(respostas) {

  if (MODO_REVISAO) return;

  let acertos = 0;

  Object.keys(respostas).forEach(q => {
    const marcada = document.querySelector(`input[name="${q}"]:checked`);
    if (marcada && marcada.value === respostas[q]) acertos++;
  });

  acertos >= 2
    ? liberarConclusao(`✅ Você acertou ${acertos}/3. Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${acertos}/3. Revise e tente novamente.`);
}

/* =====================================================
   EXPORTA
===================================================== */

window.concluirNivel = concluirNivel;
window.irParaProximoNivel = irParaProximoNivel;
window.voltarParaQuimica = voltarParaQuimica;