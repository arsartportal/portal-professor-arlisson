/* =====================================================
📢 AVISOS — SISTEMA UNIFICADO (HOME + PÁGINA)
===================================================== */

import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
DETECÇÃO DE CONTEXTO
===================================================== */

const preview = document.getElementById("previewAvisos");
const lista = document.getElementById("listaAvisos");
const badge = document.getElementById("badgeAvisos");

const isHome = !!preview;

/* =====================================================
ESTADO LOCAL (performance)
===================================================== */

let lidos = JSON.parse(localStorage.getItem("avisosLidos") || "[]");

/* =====================================================
QUERY
===================================================== */

const q = query(
  collection(db, "avisos"),
  where("ativo", "==", true),
  where("visibilidade", "in", ["alunos", "todos"]),
  orderBy("fixado", "desc"),
  orderBy("dataCriacao", "desc"),
  ...(isHome ? [limit(3)] : [])
);

/* =====================================================
RENDER
===================================================== */

onSnapshot(q, snapshot => {

  if (preview) preview.innerHTML = "";
  if (lista) lista.innerHTML = "";

  if (snapshot.empty) {
    if (preview) preview.innerHTML = "📭 Nenhum aviso";
    if (lista) lista.innerHTML = "📭 Nenhum aviso";
    if (badge) badge.innerText = "0";
    return;
  }

  let naoLidos = 0;

  snapshot.forEach(docSnap => {

    const aviso = docSnap.data();
    const id = docSnap.id;

    const lido = lidos.includes(id);

    if (!lido) naoLidos++;

    const el = document.createElement("div");

    /* classes limpas */
    el.className = [
      "aviso-card",
      lido ? "lido" : "",
      aviso.fixado ? "fixado" : "",
      `aviso-${aviso.tipo || "info"}`
    ].join(" ").trim();

    el.innerHTML = `
      <div class="aviso-header">
        <span class="badge-tipo">${aviso.tipo || "info"}</span>
        ${aviso.fixado ? '<span class="fixado-badge">📌</span>' : ''}
      </div>

      <div class="aviso-titulo">${aviso.titulo}</div>

      <div class="aviso-texto">
        ${aviso.mensagem || ""}
      </div>

      <div class="aviso-footer">
        <span>${formatarData(aviso.dataCriacao)}</span>
        <span class="status-lido">
          ${lido ? "Lido" : "Novo"}
        </span>
      </div>
    `;

    /* marcar como lido (somente na página completa) */
    if (lista) {
      el.addEventListener("click", () => {

        if (!lidos.includes(id)) {
          lidos.push(id);
          localStorage.setItem("avisosLidos", JSON.stringify(lidos));
        }

        el.classList.add("lido");

        /* atualiza badge na hora */
        if (badge) {
          const atual = parseInt(badge.innerText) || 0;
          badge.innerText = Math.max(0, atual - 1);
        }
      });
    }

    if (preview) preview.appendChild(el);
    if (lista) lista.appendChild(el);

  });

  if (badge) badge.innerText = naoLidos;

});

/* =====================================================
FORMATAR DATA
===================================================== */

function formatarData(ts){
  if (!ts?.seconds) return "";

  const data = new Date(ts.seconds * 1000);

  /* formato mais amigável */
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}