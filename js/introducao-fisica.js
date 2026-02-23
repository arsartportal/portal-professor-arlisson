/* =====================================================
   INTRODUÇÃO À FÍSICA — PROGRESSO, XP E FLUXO
   Portal do Professor Arlisson
===================================================== */

import { adicionarXPImediato } from "./xp.js";
import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const PROGRESS_ID = "introducao_fisica_1ano";
const XP_POR_NIVEL = 10;

let MODO_REVISAO = false;
let PROGRESSO_ATUAL = null;

/* =====================================================
   DETECTAR MODO REVISÃO
===================================================== */

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const progressRef = doc(db, "usuarios", user.uid, "progress", PROGRESS_ID);
  const snap = await getDoc(progressRef);

  if (!snap.exists()) return;

  PROGRESSO_ATUAL = snap.data();

  if (PROGRESSO_ATUAL.finalizado === true) {
    ativarModoRevisao();
  }
});

/* =====================================================
   ATIVAR MODO REVISÃO
===================================================== */

function ativarModoRevisao() {
  MODO_REVISAO = true;

  // Bloqueia alternativas
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.disabled = true;
  });

  // Bloqueia botão concluir
  const botao = document.querySelector(".btn-concluir");
  if (botao) {
    botao.disabled = true;
    botao.style.opacity = "0.5";
    botao.textContent = "Modo Revisão";
  }

  // Aviso visual
  const aviso = document.createElement("div");
  aviso.innerHTML = "📘 Você está em modo revisão. Respostas bloqueadas.";
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
    "nivel_1_2": { q1: "b", q2: "c", q3: "a" },
    "nivel_1_3": { q1: "b", q2: "c", q3: "b" },
    "nivel_1_4": { q1: "b", q2: "b", q3: "c" },
    "nivel_1_5": { q1: "b", q2: "c", q3: "b" }
  };

  const pagina = window.location.pathname;
  const match = pagina.match(/introducao-fisica-1-(\d)/);
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
        label.style.background = "#d4edda"; // verde
      }

      if (input.checked && input.value !== correta) {
        label.style.background = "#f8d7da"; // vermelho
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
    alert("Usuário não autenticado");
    return;
  }

  const uid = user.uid;
  const progressRef = doc(db, "usuarios", uid, "progress", PROGRESS_ID);

  const progressSnap = await getDoc(progressRef);
  if (!progressSnap.exists()) return;

  const progress = progressSnap.data();

  if (progress.concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const nivelNumero = parseInt(nivelId.split("_")[2]);

  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: nivelNumero + 1
  });

  await adicionarXPImediato(
    XP_POR_NIVEL,
    "Conclusão de nível — Introdução à Física"
  );

  if (nivelId === "nivel_1_5") {
    await updateDoc(progressRef, { finalizado: true });
    window.location.href = "../1ano/introducao-fisica-final.html";
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
  window.location.href = `../1ano/introducao-fisica-1-${numero + 1}.html`;
}

function voltarParaFisica() {
  window.location.href = "../fisica.html";
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
window.verificarCheckpointNivel12 = () => verificarNivel({ q1: "b", q2: "c", q3: "a" });
window.verificarCheckpointNivel13 = () => verificarNivel({ q1: "b", q2: "c", q3: "b" });
window.verificarCheckpointNivel14 = () => verificarNivel({ q1: "b", q2: "b", q3: "c" });
window.verificarCheckpointNivel15 = () => verificarNivel({ q1: "b", q2: "c", q3: "b" });

function verificarNivel(r) {

  if (MODO_REVISAO) return;

  let a = 0;

  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });

  a >= 2
    ? liberarConclusao(`✅ Você acertou ${a}/3. Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
}

/* =====================================================
   EXPORTA
===================================================== */

window.concluirNivel = concluirNivel;
window.irParaProximoNivel = irParaProximoNivel;
window.voltarParaFisica = voltarParaFisica;