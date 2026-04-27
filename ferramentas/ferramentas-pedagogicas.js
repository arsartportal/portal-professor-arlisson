// =====================================================
// 🔥 IMPORTS FIREBASE
// =====================================================

import { db, auth } from "../js/firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


// =====================================================
// 🎯 ROTAS DAS FERRAMENTAS
// =====================================================

const rotas = {
  pa: './progressao-aritmetica-dinamica/progressao-aritmetica-dinamica.html',
  pg: './progressao-geometrica-dinamica/progressao-geometrica-dinamica.html',
  paxpg: './paxpg/paxpg.html',
  estatistica: './estatistica-dinamica/estatistica-dinamica.html'
};


// =====================================================
// 🔐 VERIFICA LOGIN
// =====================================================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  carregarFerramentas(user.uid);
});


// =====================================================
// 🔓 CARREGA FERRAMENTAS
// =====================================================

async function carregarFerramentas(uid) {

  const cards = document.querySelectorAll("[data-tool]");

  for (const card of cards) {

    const tool = card.dataset.tool;
    const botao = card.querySelector("button");

    try {

      const ref = doc(db, "usuarios", uid, "ferramentas", tool);
      const snap = await getDoc(ref);

      const liberado = snap.exists() && snap.data().liberado;

      // =================================================
      // 🔒 BLOQUEADO
      // =================================================

      if (!liberado) {

        card.classList.add("bloqueado");

        botao.textContent = "🔒 Bloqueado";

        botao.onclick = () => {
          alert("🔒 Você precisa desbloquear na loja!");
          window.location.href = "../loja.html";
        };

      }

      // =================================================
      // 🔓 LIBERADO
      // =================================================

      else {

        botao.textContent = "Abrir";

        botao.onclick = () => {
          window.location.href = rotas[tool];
        };

      }

    } catch (erro) {
      console.error("Erro:", erro);
    }

  }

}