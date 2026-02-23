/* =====================================================
   INTRODUÇÃO À QUÍMICA — PROGRESSO, XP E FLUXO
   Portal do Professor Arlisson
   Versão Profissional 3.0
===================================================== */

import { adicionarXPImediato } from "./xp.js";
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const PROGRESS_ID = "introducao_quimica_1ano";
const XP_POR_NIVEL = 10;

/* =====================================================
   GARANTE QUE O DOCUMENTO DE PROGRESSO EXISTA
===================================================== */

async function garantirDocumentoProgresso(uid) {
  const progressRef = doc(db, "usuarios", uid, "progress", PROGRESS_ID);
  const snap = await getDoc(progressRef);

  if (!snap.exists()) {
    await setDoc(progressRef, {
      concluidos: [],
      nivelAtual: 1,
      finalizado: false,
      criadoEm: new Date()
    });
  }

  return progressRef;
}

/* =====================================================
   CONCLUIR NÍVEL
===================================================== */

async function concluirNivel(nivelId) {
  const user = auth.currentUser;

  if (!user) {
    alert("Usuário não autenticado.");
    return;
  }

  const uid = user.uid;

  // Garante que o documento exista
  const progressRef = await garantirDocumentoProgresso(uid);
  const snap = await getDoc(progressRef);
  const progress = snap.data();

  const concluidos = progress.concluidos || [];

  // 🚫 Evita duplicação
  if (concluidos.includes(nivelId)) {
    alert("Este nível já foi concluído.");
    return;
  }

  const partes = nivelId.split("_"); // ["nivel", "1", "1"]
  const numeroNivel = parseInt(partes[2]);

  // Atualiza progresso
  await updateDoc(progressRef, {
    concluidos: arrayUnion(nivelId),
    nivelAtual: numeroNivel + 1
  });

  // Adiciona XP
  await adicionarXPImediato(
    XP_POR_NIVEL,
    "Conclusão de nível — Introdução à Química"
  );

  // 🔚 Se for último nível
  if (nivelId === "nivel_1_5") {
    await updateDoc(progressRef, { finalizado: true });
    window.location.href = "../1ano/introducao-quimica-final.html";
    return;
  }

  // 🔹 Caso contrário, mostra modal
  mostrarConclusaoNivel(nivelId);
}

/* =====================================================
   MODAL DE CONCLUSÃO
===================================================== */

function mostrarConclusaoNivel(nivelId) {
  window.nivelAtualConcluido = nivelId;
  const modal = document.getElementById("nivel-concluido-modal");
  if (modal) modal.classList.remove("hidden");
}

function irParaProximoNivel() {
  const numero = parseInt(
    window.nivelAtualConcluido.split("_")[2]
  );

  window.location.href =
    `../1ano/introducao-quimica-1-${numero + 1}.html`;
}

function voltarParaQuimica() {
  window.location.href = "../quimica.html";
}

/* =====================================================
   SISTEMA DE CHECKPOINT
===================================================== */

function liberarConclusao(msg) {
  const resultado = document.getElementById("resultado-checkpoint");
  const botao = document.querySelector(".btn-concluir");

  if (!resultado || !botao) return;

  resultado.textContent = msg;
  resultado.style.color = "green";

  botao.disabled = false;
  botao.style.opacity = "1";
}

function erroConclusao(msg) {
  const resultado = document.getElementById("resultado-checkpoint");
  if (!resultado) return;

  resultado.textContent = msg;
  resultado.style.color = "red";
}

/* =====================================================
   CHECKPOINTS POR NÍVEL
===================================================== */

// 🔹 NÍVEL 1.1
window.verificarCheckpoint = () => {
  verificarRespostas(
    { q1: "b", q2: "b", q3: "c" }
  );
};

// 🔹 NÍVEL 1.2
window.verificarCheckpointNivel12 = () => {
  verificarRespostas(
    { q1: "a", q2: "b", q3: "c" }
  );
};

// 🔹 NÍVEL 1.3
window.verificarCheckpointNivel13 = () => {
  verificarRespostas(
    { q1: "c", q2: "b", q3: "a" }
  );
};

// 🔹 NÍVEL 1.4
window.verificarCheckpointNivel14 = () => {
  verificarRespostas(
    { q1: "b", q2: "a", q3: "c" }
  );
};

// 🔹 NÍVEL 1.5
window.verificarCheckpointNivel15 = () => {
  verificarRespostas(
    { q1: "b", q2: "c", q3: "a" },
    true
  );
};

/* =====================================================
   FUNÇÃO GENÉRICA DE VERIFICAÇÃO
===================================================== */

function verificarRespostas(respostasCorretas, final = false) {
  let acertos = 0;

  Object.keys(respostasCorretas).forEach(q => {
    const marcada = document.querySelector(
      `input[name="${q}"]:checked`
    );

    if (marcada && marcada.value === respostasCorretas[q]) {
      acertos++;
    }
  });

  if (acertos >= 2) {
    liberarConclusao(
      final
        ? "🎉 Você concluiu a Introdução à Química!"
        : `✅ Você acertou ${acertos}/3. Pode concluir o nível.`
    );
  } else {
    erroConclusao(
      `❌ Você acertou ${acertos}/3. Revise e tente novamente.`
    );
  }
}

/* =====================================================
   EXPORTA FUNÇÕES PARA HTML
===================================================== */

window.concluirNivel = concluirNivel;
window.irParaProximoNivel = irParaProximoNivel;
window.voltarParaQuimica = voltarParaQuimica;