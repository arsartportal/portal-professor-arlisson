console.log("fisica.js carregado");

/* =====================================================
   FISICA.JS
   -----------------------------------------------------
   Módulo: Física
   Responsabilidades:
   - Autenticar usuário
   - Ler perfil (professor x aluno)
   - Buscar trilhas no Firestore
   - Criar cards dinamicamente na página

   Regras:
   - Professor vê TODAS as trilhas
   - Aluno vê APENAS trilhas da sua turma

   Observação:
   - Segurança REAL está nas regras do Firestore
   - Este JS apenas consome os dados permitidos
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
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


/* =====================================================
   INICIALIZAÇÃO DOS SERVIÇOS
===================================================== */

const auth = getAuth();
const db   = getFirestore();

// Container dos cards (inicializado após DOM pronto)
let container = null;


/* =====================================================
   INICIALIZAÇÃO SEGURA (DOM + AUTH)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 🎯 Âncora onde os cards serão inseridos
  container = document.getElementById("lista-trilhas");

  if (!container) {
    console.warn("Container #lista-trilhas não encontrado no DOM.");
    return;
  }

  // 🔐 Observa estado de login
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
      console.warn("Documento do usuário não encontrado.");
      return;
    }

    const usuario = userSnap.data();

    // 🔽 Busca trilhas conforme perfil
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

  /* ---------------------------------------------------
     PROFESSOR
     - Vê TODAS as trilhas
     - Ordenadas por série e ordem pedagógica
  --------------------------------------------------- */
  if (usuario.tipo === "professor") {

    consulta = query(
      collection(db, "trilhas_fisica"),
      where("ativo", "==", true),
      orderBy("serie"),
      orderBy("ordem")
    );

  }
  /* ---------------------------------------------------
     ALUNO
     - Vê apenas trilhas da sua turma
     - Ordenadas por ordem pedagógica
  --------------------------------------------------- */
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

    // Limpa antes de renderizar
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = `
        <p style="opacity:.6">
          Nenhuma trilha disponível para sua turma.
        </p>
      `;
      return;
    }

    snapshot.forEach((doc) => {
      criarCardTrilha(doc.data());
    });

  } catch (erro) {
    console.error("Erro ao buscar trilhas:", erro);
  }
}


/* =====================================================
   CRIAÇÃO DO CARD DE TRILHA
===================================================== */

function criarCardTrilha(trilha) {

  // Card principal
  const card = document.createElement("div");
  card.className = "trilha-card";

  // Marca a série (usado no CSS para cores)
  card.dataset.serie = trilha.serie; // 1ano | 2ano | 3ano

  // Conteúdo interno
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
  `;

  /* ---------------------------------------------------
     EVENTO DE CLIQUE
     Futuro:
     - Abrir página da trilha
     - Registrar acesso
     - Conceder XP
  --------------------------------------------------- */
  card.addEventListener("click", () => {

  // Verificação de segurança
  if (!trilha.rota || typeof trilha.rota !== "string") {
    console.warn("Trilha sem rota válida:", trilha);
    return;
  }

  // Navegação para a página da trilha
  window.location.href = trilha.rota;

});

  // Insere no DOM
  container.appendChild(card);
}


/* =====================================================
   FUNÇÕES AUXILIARES
===================================================== */

/**
 * Converte o código da série em texto amigável
 */
function formatarSerie(serie) {

  switch (serie) {
    case "1ano":
      return "1º Ano do Ensino Médio";

    case "2ano":
      return "2º Ano do Ensino Médio";

    case "3ano":
      return "3º Ano do Ensino Médio";

    default:
      return "";
  }
}
