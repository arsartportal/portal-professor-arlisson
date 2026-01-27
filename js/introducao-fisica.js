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

/* =====================================================
   CONCLUIR NÍVEL
===================================================== */

async function concluirNivel(nivelId) {
  const user = auth.currentUser;
  if (!user) {
    alert("Usuário não autenticado");
    return;
  }

  const uid = user.uid;
  const userRef = doc(db, "usuarios", uid);
  const progressRef = doc(db, "usuarios", uid, "progress", PROGRESS_ID);

  const progressSnap = await getDoc(progressRef);
  if (!progressSnap.exists()) return;

  const progress = progressSnap.data();

  // 🚫 evita duplicação
  if (progress.concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const nivelNumero = parseInt(nivelId.split("_")[2]);

  // Atualiza progresso
  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: nivelNumero + 1
  });
// ⚠️ PROIBIDO atualizar XP aqui
// XP só pode ser alterado via xp.js
  // Soma XP
  await adicionarXPImediato(
  XP_POR_NIVEL,
  "Conclusão de nível — Introdução à Física"
);

  // 🔚 ÚLTIMO NÍVEL → tela final
  if (nivelId === "nivel_1_5") {
    await updateDoc(progressRef, { finalizado: true });
    window.location.href = "../1ano/introducao-fisica-final.html";
    return;
  }

  // 🔹 DEMAIS NÍVEIS → modal
  mostrarConclusaoNivel(nivelId);
}

/* =====================================================
   MODAL DE CONCLUSÃO DE NÍVEL
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
   CHECKPOINTS (TODOS PRESERVADOS)
===================================================== */

function liberarConclusao(msg) {
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

/* ---------- NÍVEL 1.1 ---------- */
window.verificarCheckpoint = () => {
  const r = { q1: "b", q2: "b", q3: "c" };
  let a = 0;
  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });
  a >= 2
    ? liberarConclusao(`✅ Você acertou ${a}/3. Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
};

/* ---------- NÍVEL 1.2 ---------- */
window.verificarCheckpointNivel12 = () => {
  const r = { q1: "b", q2: "c", q3: "a" };
  let a = 0;
  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });
  a >= 2
    ? liberarConclusao(`✅ Você acertou ${a}/3. Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
};

/* ---------- NÍVEL 1.3 ---------- */
window.verificarCheckpointNivel13 = () => {
  const r = { q1: "b", q2: "c", q3: "b" };
  let a = 0;
  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });
  a >= 2
    ? liberarConclusao(`✅ Você acertou ${a}/3. Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
};

/* ---------- NÍVEL 1.4 ---------- */
window.verificarCheckpointNivel14 = () => {
  const r = { q1: "b", q2: "b", q3: "c" };
  let a = 0;
  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });
  a >= 2
    ? liberarConclusao(`✅ Excelente! Pode concluir o nível.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
};

/* ---------- NÍVEL 1.5 ---------- */
window.verificarCheckpointNivel15 = () => {
  const r = { q1: "b", q2: "c", q3: "b" };
  let a = 0;
  Object.keys(r).forEach(q => {
    const m = document.querySelector(`input[name="${q}"]:checked`);
    if (m && m.value === r[q]) a++;
  });
  a >= 2
    ? liberarConclusao(`🎉 Você concluiu a Introdução à Física.`)
    : erroConclusao(`❌ Você acertou ${a}/3. Revise e tente novamente.`);
};

/* =====================================================
   EXPORTA PARA O HTML
===================================================== */

window.concluirNivel = concluirNivel;
window.irParaProximoNivel = irParaProximoNivel;
window.voltarParaFisica = voltarParaFisica;
