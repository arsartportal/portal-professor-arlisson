/* =====================================================
   PROFESSOR.JS — GUARDIÃO DA ÁREA DO PROFESSOR
   Portal do Professor Arlisson
===================================================== */

import { auth, db } from "../js/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   ELEMENTOS DA PÁGINA
===================================================== */

const acessoNegado = document.getElementById("acesso-negado");
const dashboard = document.getElementById("dashboard-professor");

/* =====================================================
   AUTENTICAÇÃO + AUTORIZAÇÃO
===================================================== */

onAuthStateChanged(auth, async (user) => {

  // 🔴 Não logado
  if (!user) {
    window.location.href = "/index.html";
    return;
  }

  try {
    // 🔍 Busca perfil do usuário
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      window.location.href = "/index.html";
      return;
    }

    const dados = userSnap.data();

    // 🚫 Não é professor
    if (dados.tipo !== "professor") {
      acessoNegado.style.display = "block";
      dashboard.style.display = "none";
      return;
    }

    // ✅ É professor
    acessoNegado.style.display = "none";
    dashboard.style.display = "grid";

    carregarCardsProfessor();

  } catch (erro) {
    console.error("Erro ao validar professor:", erro);
    acessoNegado.style.display = "block";
  }
});

/* =====================================================
   CARREGAR CARDS DO FIRESTORE
===================================================== */

async function carregarCardsProfessor() {

  dashboard.innerHTML = ""; // limpa antes de renderizar

  try {
    const q = query(
      collection(db, "professor_cards"),
      orderBy("ordem")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {
      const dados = docSnap.data();
      const card = criarCard(dados);
      dashboard.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar cards:", erro);
  }
}

/* =====================================================
   CRIAÇÃO DO CARD
===================================================== */

function criarCard(card) {

  const div = document.createElement("div");
  div.classList.add("card");

  if (!card.ativo) {
    div.classList.add("card-bloqueado");
  }

  div.innerHTML = `
    <div class="card-icone">
      ${card.icone || "📦"}
    </div>

    <div class="card-conteudo">
      <h3>${card.titulo}</h3>
      <p>${card.descricao || ""}</p>

      ${
        card.ativo
          ? ""
          : "<span class='badge-bloqueado'>🔒 Em breve</span>"
      }
    </div>
  `;

  if (card.ativo && card.rota) {
    div.addEventListener("click", () => {
      window.location.href = card.rota;
    });
  }

  return div;
}
