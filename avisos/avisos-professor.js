/* =====================================================
   AVISOS — PAINEL DO PROFESSOR
   -----------------------------------------------------
   - Criação de avisos
   - Preview ao vivo
   - Listagem e exclusão
===================================================== */

import { auth, db } from "../js/firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   ELEMENTOS DA PÁGINA
===================================================== */

const form = document.getElementById("form-aviso");
const preview = document.getElementById("preview-aviso");
const lista = document.getElementById("lista-avisos-prof");

/* Inputs */
const tituloInput = document.getElementById("titulo");
const mensagemInput = document.getElementById("mensagem");
const tipoInput = document.getElementById("tipo");
const visibilidadeInput = document.getElementById("visibilidade");
const fixadoInput = document.getElementById("fixado");

/* =====================================================
   PREVIEW AO VIVO (REFLETE O MODELO REAL)
===================================================== */

[tituloInput, mensagemInput, tipoInput].forEach(el =>
  el.addEventListener("input", atualizarPreview)
);

function atualizarPreview() {
  preview.innerHTML = "";

  const div = document.createElement("div");
  div.className = `aviso ${tipoInput.value}`;
  if (fixadoInput.checked) div.classList.add("fixado");

  div.innerHTML = `
    <h3>${tituloInput.value || "Título do aviso"}</h3>
    <small>📅 Preview</small>
    <p>${mensagemInput.value || "Mensagem do aviso..."}</p>
  `;

  preview.appendChild(div);
}

/* =====================================================
   AUTENTICAÇÃO
===================================================== */

onAuthStateChanged(auth, user => {
  if (!user) {
  window.location.href = "/index.html";
  return;
}

  ativarCriacao();
  iniciarListenerAvisos();
});

/* =====================================================
   CRIAR AVISO (SÓ PROFESSOR)
===================================================== */

function ativarCriacao() {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    if (!tituloInput.value || !mensagemInput.value) {
      alert("Preencha título e mensagem.");
      return;
    }

    await addDoc(collection(db, "avisos"), {
      titulo: tituloInput.value.trim(),
      mensagem: mensagemInput.value.trim(),
      tipo: tipoInput.value,
      visibilidade: visibilidadeInput.value,
      ativo: true,
      fixado: fixadoInput.checked,
      criadoPorUid: auth.currentUser.uid,
      criadoPorNome: auth.currentUser.displayName || "Professor",
      dataCriacao: serverTimestamp()
    });

    form.reset();
    preview.innerHTML = "";
  });
}

/* =====================================================
   LISTAR AVISOS (ADMIN)
===================================================== */

function iniciarListenerAvisos() {
  const q = query(
    collection(db, "avisos"),
    orderBy("dataCriacao", "desc")
  );

  onSnapshot(q, snapshot => {
    lista.innerHTML = "";

    snapshot.forEach(docSnap => {
      const aviso = docSnap.data();
      const div = document.createElement("div");
      div.className = `aviso ${aviso.tipo}`;

      div.innerHTML = `
        <strong>${aviso.titulo}</strong>
        <small>${aviso.visibilidade.toUpperCase()}</small>
        <button data-id="${docSnap.id}">🗑️</button>
      `;

      div.querySelector("button").onclick = () =>
        deleteDoc(doc(db, "avisos", docSnap.id));

      lista.appendChild(div);
    });
  });
}
