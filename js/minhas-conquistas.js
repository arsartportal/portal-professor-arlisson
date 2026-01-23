// Autenticação Firebase
import { auth } from "./firebase-auth.js";

// Firestore
import { db } from "./firebase-db.js";
import { doc, getDoc } from "firebase/firestore";

// Elementos da página
const listaBadges = document.getElementById("lista-badges");
const semConquistas = document.getElementById("sem-conquistas");

// Observa o estado de login
auth.onAuthStateChanged(async (user) => {

  /* =====================================================
     PROTEÇÃO DA PÁGINA
     ===================================================== */
  if (!user) {
    // Usuário não logado → redireciona
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
    // ordena do mais recente para o mais antigo
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
