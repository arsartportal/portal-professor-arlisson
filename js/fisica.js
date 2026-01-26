console.log("fisica.js carregado");

/* =====================================================
   FISICA.JS — PORTAL DO PROFESSOR ARLISSON
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

let container = null;

/* =====================================================
   INICIALIZAÇÃO SEGURA (DOM + AUTH)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  container = document.getElementById("lista-trilhas");

  if (!container) {
    console.warn("Container #lista-trilhas não encontrado.");
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
  try {
    await contabilizarXPPendente(uid);
    await carregarTrilhas(uid);
  } catch (e) {
    console.error("Erro ao carregar perfil:", e);
  }
}

/* =====================================================
   BUSCA TRILHAS
===================================================== */

async function carregarTrilhas(uid) {

  const userRef = doc(db, "usuarios", uid);
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
        where("serie", "==", usuario.turma),
        orderBy("ordem")
      );

  const snap = await getDocs(consulta);

  container.innerHTML = "";

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
  card.dataset.serie = trilha.serie;

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

  container.appendChild(card);
}

/* =====================================================
   SUBNÍVEIS (GENÉRICO)
===================================================== */

async function carregarSubniveis(uid, card, trilha) {

  const niveisRef = collection(db, "trilhas_fisica", trilha.id, "niveis");
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

  const container = card.querySelector(".subniveis");
  container.innerHTML = "";

  const niveis = niveisSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.ordem - b.ordem);

  niveis.forEach(nivel => {

    const el = document.createElement("div");
    el.className = "subcard-nivel";

    if (progress.concluidos.includes(nivel.id)) {
      el.classList.add("concluido");
      el.textContent = `✔ ${nivel.titulo}`;
    }
    else if (nivel.ordem <= progress.nivelAtual) {
      el.classList.add("liberado");
      el.textContent = `▶ ${nivel.titulo}`;

      el.onclick = () => {
        window.location.href =
          `/${trilha.baseRota}/${trilha.slug}-${nivel.ordem}.html`;
      };
    }
    else {
      el.classList.add("bloqueado");
      el.textContent = `🔒 ${nivel.titulo}`;
    }

    container.appendChild(el);
  });

  container.classList.remove("hidden");
}

/* =====================================================
   XP PENDENTE
===================================================== */

async function contabilizarXPPendente(uid) {

  const userRef = doc(db, "usuarios", uid);
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
   UTIL
===================================================== */

function formatarSerie(serie) {
  if (serie === "1ano") return "1º Ano do Ensino Médio";
  if (serie === "2ano") return "2º Ano do Ensino Médio";
  if (serie === "3ano") return "3º Ano do Ensino Médio";
  return "";
}

