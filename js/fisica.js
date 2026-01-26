console.log("fisica.js carregado");

/* =====================================================
   FISICA.JS — PORTAL DO PROFESSOR ARLISSON
   Trilhas • Subníveis • Progresso • XP
===================================================== */

/* =====================================================
   IMPORTAÇÕES FIREBASE
===================================================== */

// 🔐 Auth
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔥 Firestore
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
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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
    console.error("ERRO CRÍTICO: #lista-trilhas não encontrado no HTML.");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    carregarPerfilETrilhas(user.uid);
  });

});

/* =====================================================
   PERFIL + TRILHAS
===================================================== */

async function carregarPerfilETrilhas(uid) {
  await contabilizarXPPendente(uid);
  await carregarTrilhas(uid);
}

/* =====================================================
   BUSCAR TRILHAS NO FIRESTORE
===================================================== */

async function carregarTrilhas(uid) {

  const userRef  = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const usuario = userSnap.data();
  console.log("USUÁRIO:", usuario);

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
        where("serie", "==", usuario.turma),
        orderBy("ordem")
      );

  const snap = await getDocs(consulta);
  console.log("TRILHAS ENCONTRADAS:", snap.size);

  listaTrilhas.innerHTML = "";

  snap.forEach(docSnap => {
    criarCardTrilha(uid, { id: docSnap.id, ...docSnap.data() });
  });
}

/* =====================================================
   CARD DE TRILHA
===================================================== */

function criarCardTrilha(uid, trilha) {

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

    // 🔹 Trilhas COM subníveis
    if (trilha.temSubniveis === true) {

      const sub = card.querySelector(".subniveis");

      // Toggle abrir/fechar
      if (!sub.classList.contains("hidden")) {
        sub.classList.add("hidden");
        return;
      }

      await carregarSubniveis(uid, card, trilha);
      return;
    }

    // 🔹 Trilhas SEM subníveis → navegação direta
    if (trilha.rota && typeof trilha.rota === "string") {
      window.location.href = trilha.rota;
    }
  });

  listaTrilhas.appendChild(card);
}

/* =====================================================
   SUBNÍVEIS + PROGRESSO
===================================================== */

async function carregarSubniveis(uid, card, trilha) {

  // 🔒 Proteção contra trilha mal configurada
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
    progress = {
      nivelAtual: 1,
      concluidos: [],
      finalizado: false
    };
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

    // ✔ Concluído
    if (progress.concluidos.includes(nivel.id)) {
      el.classList.add("concluido");
      el.textContent = `✔ ${nivel.titulo}`;
    }

    // ▶ Liberado
    else if (nivel.ordem <= progress.nivelAtual) {
      el.classList.add("liberado");
      el.textContent = `▶ ${nivel.titulo}`;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href =
          `/${trilha.baseRota}/${trilha.slug}-${nivel.ordem}.html`;
      });
    }

    // 🔒 Bloqueado
    else {
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
    await updateDoc(userRef, { xp: increment(total) });

    if (window.adicionarXPVisual) {
      window.adicionarXPVisual(total);
    }
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
