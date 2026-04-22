// =======================================
// HUD.JS — HUD GLOBAL (NOME, XP, PATENTE)
// =======================================

import { limiteXP } from "./xp.js";

// 🔐 Firebase Auth
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔥 Firestore
import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// 🏅 Sistema de Patentes
import { obterPatentePorNivel } from "./patentes.js";

// =======================================
// INICIALIZA SERVIÇOS
// =======================================
const auth = getAuth();
const db = getFirestore();

// =======================================
// HUD GLOBAL (FUNCIONA EM TODAS AS PÁGINAS)
// =======================================
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userRef = doc(db, "usuarios", user.uid);

  // 🔄 Atualização em tempo real
  onSnapshot(userRef, (snap) => {

    if (!snap.exists()) return;

    const dados = snap.data();

    // 👤 Nome do usuário
    const nomeSpan = document.getElementById("nome-usuario");
    if (nomeSpan) {
      nomeSpan.textContent = dados.nome || "Aluno";
    }

    // 🎮 Nível e XP
    const nivel = dados.nivel ?? 0;
    const xpAtual = dados.xp ?? 0;
    const xpParaProximoNivel = limiteXP(nivel);

    const nivelSpan = document.getElementById("nivel-usuario");
    if (nivelSpan) {
      nivelSpan.textContent = nivel;
    }

    const xpTexto = document.getElementById("xp-texto");
    if (xpTexto) {
      xpTexto.textContent = `XP ${xpAtual} / ${xpParaProximoNivel}`;
    }

    const barraXP = document.getElementById("xp-preenchimento");
    if (barraXP) {
      const porcentagem = Math.min(
        (xpAtual / xpParaProximoNivel) * 100,
        100
      );
      barraXP.style.width = `${porcentagem}%`;
    }

    // 🏅 Patente
    const patente = obterPatentePorNivel(nivel);

    const imgPatente = document.getElementById("patente-img");
    if (imgPatente) {
      imgPatente.src = patente.imagem;
    }

    const imgPatenteDetalhe = document.getElementById("patente-img-detalhe");
    if (imgPatenteDetalhe) {
      imgPatenteDetalhe.src = patente.imagem;
    }

  });
});
