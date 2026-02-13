/* =====================================================
   DASHBOARD.JS — ÁREA DO PROFESSOR
===================================================== */

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

/* =========================================
   FUNÇÃO AUXILIAR — STATUS
========================================= */
function calcularStatus(timestamp) {
  if (!timestamp) return { texto: "🔴 Inativo", classe: "status-inativo" };

  const agora = new Date();
  const ultimo = timestamp.toDate();
  const dias = (agora - ultimo) / (1000 * 60 * 60 * 24);

  if (dias <= 3)
    return { texto: "🟢 Ativo", classe: "status-ativo" };

  if (dias <= 10)
    return { texto: "🟡 Regular", classe: "status-regular" };

  return { texto: "🔴 Inativo", classe: "status-inativo" };
}

/* =========================================
   FUNÇÃO AUXILIAR — FORMATAR DATA
========================================= */
function formatarData(timestamp) {
  if (!timestamp) return "-";

  const data = timestamp.toDate();

  return (
    data.toLocaleDateString("pt-BR") +
    " " +
    data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );
}

/* =========================================
   FLUXO PRINCIPAL
========================================= */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  const perfilRef = doc(db, "usuarios", user.uid);
  const perfilSnap = await getDoc(perfilRef);

  if (!perfilSnap.exists()) return;

  const perfil = perfilSnap.data();

  if (perfil.tipo !== "professor") {
    alert("Acesso restrito ao professor.");
    window.location.href = "../home.html";
    return;
  }

  const tabela = document.getElementById("lista-alunos");
  tabela.innerHTML = "";

  const usuariosRef = collection(db, "usuarios");
  const snapshot = await getDocs(usuariosRef);

  let alunos = [];

  snapshot.forEach(docSnap => {
    const dados = docSnap.data();

    if (dados.tipo !== "aluno") return;

    alunos.push({
      nome: dados.nome || "-",
      turma: dados.turma || "-",
      xp: dados.xp ?? 0,
      nivel: dados.nivel ?? 0,
      ultimoLogin: dados.ultimoLogin || null
    });
  });

  /* 🔥 Ordena por XP (ranking automático) */
  alunos.sort((a, b) => b.xp - a.xp);

  /* 🔢 Atualiza contadores */
  document.getElementById("total-alunos") &&
    (document.getElementById("total-alunos").textContent = alunos.length);

  /* 🏆 Monta tabela */
  alunos.forEach((aluno, index) => {

    const status = calcularStatus(aluno.ultimoLogin);

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.xp}</td>
      <td>${aluno.nivel}</td>
      <td class="${status.classe}">${status.texto}</td>
      <td>${formatarData(aluno.ultimoLogin)}</td>
    `;

    tabela.appendChild(tr);
  });

  console.log("Total de alunos:", alunos.length);
});

/* =========================================
   BOTÃO VOLTAR
========================================= */
window.voltar = function () {
  window.location.href = "./professor/professor.html";
};