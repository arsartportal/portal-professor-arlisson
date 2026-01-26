/* =====================================================
   MINHAS CONQUISTAS — PORTAL DO PROFESSOR
===================================================== */

// Firebase (PADRÃO DO PROJETO)
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Elementos da página
const listaBadges = document.getElementById("lista-badges");
const semConquistas = document.getElementById("sem-conquistas");

/* =====================================================
   AUTENTICAÇÃO + PROTEÇÃO
===================================================== */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  /* =====================================================
     BUSCA DOS PROGRESSOS DO USUÁRIO
     ===================================================== */
  const ref = doc(db, "progressos", user.uid);
  const snap = await getDoc(ref);

  // Nenhum documento ou nenhum badge
  if (!snap.exists() || !snap.data().badges) {
    semConquistas.classList.remove("hidden");
    return;
  }

  const badges = snap.data().badges;
  const valores = Object.values(badges);

  if (valores.length === 0) {
    semConquistas.classList.remove("hidden");
    return;
  }

  /* =====================================================
     RENDERIZAÇÃO DOS BADGES
     ===================================================== */
  valores
    // mais recente primeiro
    .sort((a, b) =>
      (b.concluidoEm?.seconds || 0) -
      (a.concluidoEm?.seconds || 0)
    )
    .forEach(badge => {

      const card = document.createElement("div");
      card.className = "badge-card";

      const data = badge.concluidoEm?.toDate
        ? badge.concluidoEm.toDate().toLocaleDateString("pt-BR")
        : "—";

      card.innerHTML = `
        <div class="badge-icon">🏅</div>
        <div class="badge-nome">${badge.nome}</div>
        <div class="badge-data">Concluído em ${data}</div>
      `;

      listaBadges.appendChild(card);
    });
});
