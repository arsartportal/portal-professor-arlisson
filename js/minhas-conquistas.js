/* =====================================================
   🏅 MINHAS CONQUISTAS — PORTAL DO PROFESSOR
===================================================== */

// Firebase
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Catálogo
import { CONQUISTAS } from "./conquistas.js";

/* =====================================================
   ELEMENTOS
===================================================== */
const listaBadges = document.getElementById("lista-badges");
const contador = document.getElementById("contador-conquistas");
const barra = document.getElementById("barra-progresso");

let carregou = false;

/* =====================================================
   AUTENTICAÇÃO
===================================================== */
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  if (carregou) return;
  carregou = true;

  carregarConquistas(user.uid);
});

/* =====================================================
   CARREGAR DADOS
===================================================== */
async function carregarConquistas(uid) {
  if (!uid) return;

  try {
    const ref = doc(db, "progressos", uid);
    const snap = await getDoc(ref);

    const badgesUsuario = snap.exists()
      ? (snap.data().badges || {})
      : {};

    render(badgesUsuario);

  } catch (error) {
    console.error("❌ Erro ao carregar:", error);
    mostrarErro("Não foi possível carregar suas conquistas.");
  }
}

/* =====================================================
   RENDER
===================================================== */
function render(badgesUsuario) {

  if (!listaBadges) return;

  listaBadges.innerHTML = "";

  const todas = Object.entries(CONQUISTAS);
  let desbloqueadas = 0;

  todas.forEach(([id, config]) => {

    const badgeUser = badgesUsuario[id];
    const conquistada = !!badgeUser;

    if (conquistada) desbloqueadas++;

    const card = document.createElement("div");
    card.className = `badge-card ${conquistada ? "ativa" : "bloqueada"}`;

    const data = badgeUser?.concluidoEm?.toDate
      ? badgeUser.concluidoEm.toDate().toLocaleDateString("pt-BR")
      : "";

    card.innerHTML = `
      ${!conquistada ? "<div class='badge-lock'>🔒</div>" : ""}
      <div class="badge-icon">${config.icone}</div>
      <div class="badge-nome">${config.nome}</div>
      <div class="badge-descricao">${config.descricao}</div>
      <div class="badge-data">
        ${conquistada ? `Concluído em ${data}` : "Não desbloqueada"}
      </div>
    `;

    listaBadges.appendChild(card);
  });

  atualizarProgresso(desbloqueadas, todas.length);
}

/* =====================================================
   PROGRESSO
===================================================== */
function atualizarProgresso(feitas, total) {

  if (!contador || !barra) return;

  contador.textContent = `${feitas}/${total} conquistas`;

  const porcentagem = total > 0 ? (feitas / total) * 100 : 0;
  barra.style.width = `${porcentagem}%`;
}

/* =====================================================
   ERRO VISUAL
===================================================== */
function mostrarErro(msg) {

  if (!listaBadges) return;

  listaBadges.innerHTML = `
    <div style="text-align:center; padding:2rem; opacity:0.7;">
      ⚠️ ${msg}
    </div>
  `;
}