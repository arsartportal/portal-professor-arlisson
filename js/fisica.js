/* =====================================================
   FISICA.JS — PORTAL DO PROFESSOR ARLISSON
   Trilhas • Subníveis • Progresso • XP
   (VERSÃO DEFINITIVA ESTÁVEL)
===================================================== */

/* =====================================================
   IMPORTAÇÕES FIREBASE
===================================================== */

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* 🔥 SISTEMA DE XP */
import { adicionarXPImediato, validarNivelUsuario } from "./xp.js";

/* =====================================================
   INICIALIZAÇÃO
===================================================== */

const auth = getAuth();
const db   = getFirestore();

let listaTrilhas = null;

/* =====================================================
   DOM + AUTENTICAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  listaTrilhas = document.getElementById("lista-trilhas");

  if (!listaTrilhas) {
    console.error("ERRO CRÍTICO: #lista-trilhas não encontrado.");
    return;
  }

  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      window.location.href = "index.html";
      return;
    }

    /* =====================================================
       🔥 FLUXO CORRETO DE CONSISTÊNCIA
    ===================================================== */

    // 1️⃣ Corrige inconsistências antigas
    await validarNivelUsuario(user.uid);

    // 2️⃣ Processa XP pendente corretamente
    await contabilizarXPPendente(user.uid);

    // 3️⃣ Revalida após possível ganho de XP
    await validarNivelUsuario(user.uid);

    // 4️⃣ Só então carrega a UI
    await carregarTrilhas(user.uid);
  });

});

/* =====================================================
   PERFIL + TRILHAS
===================================================== */

async function carregarTrilhas(uid) {

  const userRef  = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const usuario = userSnap.data();

  const consulta = usuario.tipo === "professor"
    ? query(
        collection(db, "trilhas_fisica"),
        where("ativo", "==", true),
        orderBy("serie"),
        orderBy("ordem")
      )
    : query(
        collection(db, "trilhas_fisica"),
        where("ativo", "==", true),
        where("serie", "==", usuario.serie),
        orderBy("ordem")
      );

  const snap = await getDocs(consulta);

  listaTrilhas.innerHTML = "";

  if (usuario.tipo === "professor") {

    const grupos = {
      "1ano": criarGrupoSerie("1ano", "📘 1º Ano do Ensino Médio"),
      "2ano": criarGrupoSerie("2ano", "📗 2º Ano do Ensino Médio"),
      "3ano": criarGrupoSerie("3ano", "📕 3º Ano do Ensino Médio")
    };

    Object.values(grupos).forEach(grupo => {
      listaTrilhas.appendChild(grupo);
    });

    snap.forEach(docSnap => {
      const trilha = { id: docSnap.id, ...docSnap.data() };
      if (grupos[trilha.serie]) {
        const destino = grupos[trilha.serie].querySelector(".cards-trilhas");
        criarCardTrilha(uid, trilha, destino);
      }
    });

  } else {

    snap.forEach(docSnap => {
      criarCardTrilha(uid, { id: docSnap.id, ...docSnap.data() });
    });
  }
}

/* =====================================================
   GRUPO DE SÉRIE
===================================================== */

function criarGrupoSerie(serie, titulo) {

  const section = document.createElement("section");
  section.className = "grupo-serie";

  section.innerHTML = `
    <h4 class="titulo-serie">${titulo}</h4>
    <div class="cards-trilhas"></div>
  `;

  return section;
}

/* =====================================================
   CARD DE TRILHA
===================================================== */

function criarCardTrilha(uid, trilha, destino = listaTrilhas) {

  const card = document.createElement("div");
  card.className = "trilha-card";

  card.innerHTML = `
    <div class="trilha-serie">${formatarSerie(trilha.serie)}</div>
    <div class="trilha-titulo">${trilha.titulo}</div>
    <div class="trilha-desc">${trilha.descricao || ""}</div>
    <div class="subniveis hidden"></div>
  `;

  card.addEventListener("click", async (e) => {

    e.stopPropagation();

    if (trilha.temSubniveis === true) {

      const sub = card.querySelector(".subniveis");

      if (!sub.classList.contains("hidden")) {
        sub.classList.add("hidden");
        return;
      }

      await carregarSubniveis(uid, card, trilha);
      return;
    }

    if (trilha.rota) {
      window.location.href = trilha.rota;
    }
  });

  destino.appendChild(card);
}

/* =====================================================
   SUBNÍVEIS
===================================================== */

async function carregarSubniveis(uid, card, trilha) {

  if (!trilha.progressId || !trilha.baseRota || !trilha.slug) {
    console.error("Trilha mal configurada:", trilha);
    return;
  }

  const niveisRef   = collection(db, "trilhas_fisica", trilha.id, "niveis");
  const progressRef = doc(db, "usuarios", uid, "progress", trilha.progressId);

  const [niveisSnap, progressSnap] = await Promise.all([
    getDocs(niveisRef),
    getDoc(progressRef)
  ]);

  let progress;

  if (!progressSnap.exists()) {
    progress = { nivelAtual: 1, concluidos: [], finalizado: false };
    await setDoc(progressRef, progress);
  } else {
    progress = progressSnap.data();
  }

  const subContainer = card.querySelector(".subniveis");
  subContainer.innerHTML = "";

  const niveis = niveisSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.ordem - b.ordem);

  niveis.forEach(nivel => {

    const el = document.createElement("div");
    el.className = "subcard-nivel";

    const rota =
      `/${trilha.baseRota}/${trilha.slug}-${nivel.ordem}.html`;

    if (progress.concluidos.includes(nivel.id)) {

      el.classList.add("concluido");
      el.textContent = `✔ ${nivel.titulo}`;

      el.onclick = () => window.location.href = rota;

    } else if (nivel.ordem <= progress.nivelAtual) {

      el.classList.add("liberado");
      el.textContent = `▶ ${nivel.titulo}`;

      el.onclick = () => window.location.href = rota;

    } else {

      el.classList.add("bloqueado");
      el.textContent = `🔒 ${nivel.titulo}`;
    }

    subContainer.appendChild(el);
  });

  subContainer.classList.remove("hidden");
}

/* =====================================================
   XP PENDENTE
===================================================== */

async function contabilizarXPPendente(uid) {

  const userRef     = doc(db, "usuarios", uid);
  const progressRef = collection(userRef, "progress");

  const snap = await getDocs(progressRef);
  let total = 0;

  for (const d of snap.docs) {

    const data = d.data();

    if (data.concluido === true && data.xpContabilizado !== true) {

      total += data.xp || 0;
      await updateDoc(d.ref, { xpContabilizado: true });
    }
  }

  if (total > 0) {
    await adicionarXPImediato(total, "Conclusão de trilha");
  }
}

/* =====================================================
   UTILIDADES
===================================================== */

function formatarSerie(serie) {
  if (serie === "1ano") return "1º Ano do Ensino Médio";
  if (serie === "2ano") return "2º Ano do Ensino Médio";
  if (serie === "3ano") return "3º Ano do Ensino Médio";
  return "";
}