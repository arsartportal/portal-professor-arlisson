/* =====================================================
   HOME — AVISOS (ALUNO)
   -----------------------------------------------------
   - Mostra os 3 avisos mais recentes
   - Respeita visibilidade e rules
===================================================== */

import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const lista = document.getElementById("avisos-home-lista");

/* =====================================================
   AUTENTICAÇÃO
===================================================== */

onAuthStateChanged(auth, user => {
  if (!user || !lista) return;
  carregarAvisosHome();
});

/* =====================================================
   CARREGAR AVISOS (ALUNO)
===================================================== */

function carregarAvisosHome() {
  const q = query(
    collection(db, "avisos"),
    where("ativo", "==", true),
    where("visibilidade", "in", ["alunos", "todos"]),
    orderBy("fixado", "desc"),
    orderBy("dataCriacao", "desc"),
    limit(3)
  );

  onSnapshot(q, snapshot => {
    lista.innerHTML = "";

    if (snapshot.empty) {
      lista.innerHTML = "<small>Nenhum aviso no momento.</small>";
      return;
    }

    snapshot.forEach(docSnap => {
      const aviso = docSnap.data();

      const data = aviso.dataCriacao?.seconds
        ? new Date(aviso.dataCriacao.seconds * 1000)
        : null;

      const div = document.createElement("div");
      div.className = `aviso-home-item ${aviso.tipo || ""}`;

      div.innerHTML = `
        <strong>${aviso.titulo}</strong><br>
        <small>
          ${data ? data.toLocaleDateString("pt-BR") : ""}
        </small>
      `;

      lista.appendChild(div);
    });
  });
}

const cardAvisos = document.getElementById("cardAvisos");

cardAvisos.addEventListener("click", (e) => {

  if (e.target.closest("a")) return;

  cardAvisos.classList.toggle("ativo");
});