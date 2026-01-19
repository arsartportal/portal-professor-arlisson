// =======================================
// HOME.JS — DADOS DO USUÁRIO + HUD + PATENTE
// =======================================

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
// AO CARREGAR A HOME
// =======================================
onAuthStateChanged(auth, (user) => {

  // ❌ Se não estiver logado, volta para login
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // 📄 Referência ao documento do usuário
  const userRef = doc(db, "usuarios", user.uid);

  // =======================================
  // 🔄 ESCUTA EM TEMPO REAL (AUTO UPDATE)
  // =======================================
  onSnapshot(userRef, (snap) => {

    if (!snap.exists()) return;

    // 🔹 Dados sempre atualizados
    const dados = snap.data();

    // =====================================
    // 👤 NOME DO USUÁRIO
    // =====================================
    const nomeSpan = document.getElementById("nome-usuario");
    if (nomeSpan) {
      nomeSpan.textContent = dados.nome || "Aluno";
    }

    // =====================================
    // 🎮 NÍVEL E XP
    // =====================================
    const nivel = dados.nivel ?? 0;
    const xpAtual = dados.xp ?? 0;

    // Regra de XP (exemplo simples)
    const xpParaProximoNivel = (nivel + 1) * 100;

    // Atualiza nível
    const nivelSpan = document.getElementById("nivel-usuario");
    if (nivelSpan) {
      nivelSpan.textContent = nivel;
    }

    // Atualiza texto de XP
    const xpTexto = document.getElementById("xp-texto");
    if (xpTexto) {
      xpTexto.textContent = `XP ${xpAtual} / ${xpParaProximoNivel}`;
    }

    // Atualiza barra de XP
    const barraXP = document.getElementById("xp-preenchimento");
    if (barraXP) {
      const porcentagem = Math.min(
        (xpAtual / xpParaProximoNivel) * 100,
        100
      );
      barraXP.style.width = `${porcentagem}%`;
    }

    // =====================================
    // 🏅 PATENTE POR NÍVEL
    // =====================================
    const patente = obterPatentePorNivel(nivel);
    
    // ==============================
// ATUALIZA IMAGEM DA PATENTE
// ==============================

// Patente pequena (mini HUD)
const imgPatente = document.getElementById("patente-img");
if (imgPatente) {
  imgPatente.src = patente.imagem;
}

// Patente grande (painel expandido no hover)
const imgPatenteDetalhe = document.getElementById("patente-img-detalhe");
if (imgPatenteDetalhe) {
  imgPatenteDetalhe.src = patente.imagem;
}
   

  }); // 🔚 onSnapshot
});
