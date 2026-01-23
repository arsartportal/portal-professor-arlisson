console.log("fisica.js carregado");

/* =====================================================
   FISICA.JS — PORTAL DO PROFESSOR ARLISSON
   -----------------------------------------------------
   Responsabilidades:
   - Autenticar usuário
   - Ler perfil (professor x aluno)
   - Buscar trilhas no Firestore
   - Criar cards dinamicamente
   - Renderizar subníveis (Introdução à Física)
   - Controlar XP pendente

   Arquitetura:
   Firestore → JS → DOM
===================================================== */

/* =====================================================
   IMPORTAÇÕES FIREBASE (ÚNICAS)
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
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   INICIALIZAÇÃO DOS SERVIÇOS
===================================================== */

const auth = getAuth();
const db   = getFirestore();

// Container onde os cards serão inseridos
let container = null;

/* =====================================================
   CONSTANTES DE MÓDULO
===================================================== */

const INTRO_TRILHA_ID = "G56QgC9ZBCN5rgF1ceZL";
const PROGRESS_INTRO  = "introducao_fisica_1ano";
const BASE_INTRO_ROTA = "1ano";

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
   CARREGA PERFIL DO USUÁRIO
===================================================== */

async function carregarPerfilETrilhas(uid) {
  try {
    const userRef  = doc(db, "usuarios", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn("Usuário não encontrado.");
      return;
    }

    const usuario = userSnap.data();

    // 🔥 Soma XP pendente antes de mostrar trilhas
    await contabilizarXPPendente(uid);

    // 🔽 Renderiza trilhas
    await carregarTrilhas(usuario);

  } catch (erro) {
    console.error("Erro ao carregar perfil:", erro);
  }
}

/* =====================================================
   BUSCA TRILHAS NO FIRESTORE
===================================================== */

async function carregarTrilhas(usuario) {

  let consulta;

  // 👨‍🏫 PROFESSOR
  if (usuario.tipo === "professor") {
    consulta = query(
      collection(db, "trilhas_fisica"),
      where("ativo", "==", true),
      orderBy("serie"),
      orderBy("ordem")
    );
  }
  // 🎓 ALUNO
  else {
    consulta = query(
      collection(db, "trilhas_fisica"),
      where("ativo", "==", true),
      where("serie", "==", usuario.turma),
      orderBy("ordem")
    );
  }

  try {
    const snapshot = await getDocs(consulta);

    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = `
        <p style="opacity:.6">
          Nenhuma trilha disponível para sua turma.
        </p>`;
      return;
    }

    snapshot.forEach((docSnap) => {
      criarCardTrilha({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

  } catch (erro) {
    console.error("Erro ao buscar trilhas:", erro);
  }
}

/* =====================================================
   CRIAÇÃO DO CARD DE TRILHA
===================================================== */

function criarCardTrilha(trilha) {

  const card = document.createElement("div");
  card.className = "trilha-card";
  card.dataset.serie = trilha.serie;

  card.innerHTML = `
    <div class="trilha-serie">
      ${formatarSerie(trilha.serie)}
    </div>

    <div class="trilha-titulo">
      ${trilha.titulo}
    </div>

    <div class="trilha-desc">
      ${trilha.descricao || ""}
    </div>

    <!-- SUBNÍVEIS (Introdução à Física) -->
    <div class="subniveis hidden"></div>
  `;

  // 🔥 EVENTO DE CLIQUE (ESSENCIAL)
  card.addEventListener("click", async (event) => {

    event.stopPropagation();

    // 👉 INTRODUÇÃO À FÍSICA = abre/fecha subníveis
    if (trilha.id === INTRO_TRILHA_ID) {

      const sub = card.querySelector(".subniveis");

      // Toggle
      if (!sub.classList.contains("hidden")) {
        sub.classList.add("hidden");
        return;
      }

      await carregarSubniveisIntroducao(card);
      return;
    }

    // 👉 OUTRAS TRILHAS = navegação normal
    if (!trilha.rota || typeof trilha.rota !== "string") {
      console.warn("Trilha sem rota válida:", trilha);
      return;
    }

    window.location.href = trilha.rota;
  });

  container.appendChild(card);
}

/* =====================================================
   RENDERIZA SUBNÍVEIS — INTRODUÇÃO À FÍSICA
===================================================== */

async function carregarSubniveisIntroducao(cardElement) {

  const user = auth.currentUser;
  if (!user) return;

  const niveisRef = collection(
    db,
    "trilhas_fisica",
    INTRO_TRILHA_ID,
    "niveis"
  );

  const progressRef = doc(
    db,
    "usuarios",
    user.uid,
    "progress",
    PROGRESS_INTRO
  );

  const [niveisSnap, progressSnap] = await Promise.all([
    getDocs(niveisRef),
    getDoc(progressRef)
  ]);

  if (!progressSnap.exists()) return;

  const progress = progressSnap.data();

  // ⚠️ AQUI É cardElement (não card)
  const container = cardElement.querySelector(".subniveis");
  if (!container) return;

  container.innerHTML = "";

  const niveis = niveisSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.ordem - b.ordem);

  niveis.forEach((nivel) => {

    const sub = document.createElement("div");
    sub.className = "subcard-nivel";

    // ✔ CONCLUÍDO
    if (progress.concluidos.includes(nivel.id)) {
      sub.classList.add("concluido");
      sub.textContent = `✔ ${nivel.titulo}`;
    }
    // ▶ LIBERADO
    else if (nivel.ordem <= progress.nivelAtual) {
  sub.classList.add("liberado");
  sub.textContent = `▶ ${nivel.titulo}`;

  const rota = `${BASE_INTRO_ROTA}/introducao-fisica-1-${nivel.ordem}.html`;

  sub.onclick = () => {
    window.location.href = rota;
  };
}
    // 🔒 BLOQUEADO
    else {
      sub.classList.add("bloqueado");
      sub.textContent = `🔒 ${nivel.titulo}`;
    }

    container.appendChild(sub);
  });

  container.classList.remove("hidden");
}

/* =====================================================
   FUNÇÕES AUXILIARES
===================================================== */

function formatarSerie(serie) {
  switch (serie) {
    case "1ano": return "1º Ano do Ensino Médio";
    case "2ano": return "2º Ano do Ensino Médio";
    case "3ano": return "3º Ano do Ensino Médio";
    default: return "";
  }
}

/* =====================================================
   SOMA XP DOS CHECKPOINTS CONCLUÍDOS
===================================================== */

async function contabilizarXPPendente(uid) {

  try {
    const userRef = doc(db, "usuarios", uid);
    const progressRef = collection(userRef, "progress");

    const snap = await getDocs(progressRef);
    let xpTotal = 0;

    for (const docSnap of snap.docs) {
      const data = docSnap.data();

      if (data.concluido === true && data.xpContabilizado !== true) {
        xpTotal += data.xp || 0;
        await updateDoc(docSnap.ref, { xpContabilizado: true });
      }
    }

    if (xpTotal > 0) {
      await updateDoc(userRef, { xp: increment(xpTotal) });

      if (window.adicionarXPVisual) {
        window.adicionarXPVisual(xpTotal);
      }
    }

  } catch (erro) {
    console.error("Erro ao contabilizar XP:", erro);
  }
}
