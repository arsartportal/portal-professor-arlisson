/* =====================================================
   PERFIL.JS
   -----------------------------------------------------
   Responsável por:
   - Buscar dados do usuário no Firestore
   - Descobrir se é professor ou aluno
   - Ajustar a interface conforme o perfil

   Auth diz QUEM É
   Firestore diz O QUE PODE
===================================================== */

import { getFirestore, doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

/* Executa quando o usuário estiver autenticado */
auth.onAuthStateChanged(async (user) => {

  if (!user) return;

  /* Busca o perfil do usuário no Firestore */
  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const dados = snap.data();

  /* =========================================
   HUD DE XP — ATUALIZA INTERFACE
  ========================================= */

// Elementos da HUD
const nivelEl = document.getElementById("hud-nivel-valor");
const xpAtualEl = document.getElementById("hud-xp-atual");
const xpProxEl = document.getElementById("hud-xp-proximo");
const barraEl = document.getElementById("hud-progresso-preenchido");

// Valores do usuário
const xp = dados.xp || 0;
const nivel = dados.nivel || 0;

// Cálculo do próximo nível
const xpInicioNivel = nivel * 100;
const xpFimNivel = (nivel + 1) * 100;
const progresso = ((xp - xpInicioNivel) / 100) * 100;

// Atualiza textos
if (nivelEl) nivelEl.innerText = nivel;
if (xpAtualEl) xpAtualEl.innerText = xp;
if (xpProxEl) xpProxEl.innerText = xpFimNivel;

// Atualiza barra visual
if (barraEl) {
  barraEl.style.width = `${Math.min(progresso, 100)}%`;
}





  /* Exibe informações básicas */
  const turmaEl = document.getElementById("turma");
  if (turmaEl) {
    turmaEl.innerText = `Perfil: ${dados.tipo}`;
  }

  /* Se for professor, libera cartões exclusivos */
  if (dados.tipo === "professor") {
    document.querySelectorAll(".card-prof")
      .forEach(card => card.style.display = "flex");
  }
});
