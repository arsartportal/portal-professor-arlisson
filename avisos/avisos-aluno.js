/* =====================================================
   AVISOS — ALUNO (LEITURA)
   -----------------------------------------------------
   - Apenas leitura
   - Respeita visibilidade definida pelo professor
===================================================== */

import { db } from "../js/firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   ELEMENTOS
===================================================== */

const lista = document.getElementById("lista-avisos");

/* =====================================================
   QUERY DE AVISOS (ALUNO)
===================================================== */

const q = query(
  collection(db, "avisos"),
  where("ativo", "==", true),
  where("visibilidade", "in", ["alunos", "todos"]),
  orderBy("fixado", "desc"),
  orderBy("dataCriacao", "desc")
);

/* =====================================================
   LISTENER EM TEMPO REAL
===================================================== */

onSnapshot(q, snapshot => {
  lista.innerHTML = "";

  if (snapshot.empty) {
    lista.innerHTML = "<p>📢 Nenhum aviso no momento.</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const aviso = docSnap.data();
    const div = document.createElement("div");

    div.className = `aviso ${aviso.tipo}`;
    if (aviso.fixado) div.classList.add("fixado");

    const data = aviso.dataCriacao?.seconds
      ? new Date(aviso.dataCriacao.seconds * 1000)
      : null;

    div.innerHTML = `
      <h3>${aviso.titulo}</h3>
      <small>
        📅 ${data ? data.toLocaleDateString("pt-BR") : ""}
      </small>
      <p>${aviso.mensagem}</p>
    `;

    lista.appendChild(div);
  });
});
