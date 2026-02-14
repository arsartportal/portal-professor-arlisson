/* =====================================================
   DASHBOARD.JS — PORTAL DO PROFESSOR 3.0
   Ranking Geral + Ranking por Escola
   Filtros • Gamificação • Multi-escola
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

/* =====================================================
   VARIÁVEIS GLOBAIS
===================================================== */

let alunosOriginais = [];
let alunosFiltrados = [];

/* =====================================================
   UTILITÁRIOS
===================================================== */

function calcularStatus(timestamp) {
  if (!timestamp)
    return { texto: "🔴 Inativo", classe: "status-inativo", tipo: "inativo" };

  const agora = new Date();
  const ultimo = timestamp.toDate();
  const dias = (agora - ultimo) / (1000 * 60 * 60 * 24);

  if (dias <= 3)
    return { texto: "🟢 Ativo", classe: "status-ativo", tipo: "ativo" };

  if (dias <= 10)
    return { texto: "🟡 Regular", classe: "status-regular", tipo: "regular" };

  return { texto: "🔴 Inativo", classe: "status-inativo", tipo: "inativo" };
}

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

function medalha(posicao) {
  if (posicao === 1) return "🥇";
  if (posicao === 2) return "🥈";
  if (posicao === 3) return "🥉";
  return posicao;
}

/* =====================================================
   RENDERIZAÇÃO PRINCIPAL
===================================================== */

function renderizarTabela(lista) {

  const tabela = document.getElementById("lista-alunos");
  tabela.innerHTML = "";

  lista.forEach((aluno, index) => {

    const status = calcularStatus(aluno.ultimoLogin);

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${medalha(index + 1)}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.escola}</td>
      <td>${aluno.serie}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.xp}</td>
      <td>${aluno.nivel}</td>
      <td class="${status.classe}">${status.texto}</td>
      <td>${formatarData(aluno.ultimoLogin)}</td>
    `;

    tabela.appendChild(tr);
  });

  atualizarCards(lista);
  renderizarRankingPorEscola(lista);
}

/* =====================================================
   RANKING POR ESCOLA
===================================================== */

function renderizarRankingPorEscola(lista) {

  const container = document.getElementById("ranking-escolas-container");
  if (!container) return;

  container.innerHTML = "";

  const escolas = {};

  // Agrupar alunos por escola
  lista.forEach(aluno => {
    if (!escolas[aluno.escola]) {
      escolas[aluno.escola] = [];
    }
    escolas[aluno.escola].push(aluno);
  });

  Object.keys(escolas).forEach(nomeEscola => {

    const alunosDaEscola = escolas[nomeEscola]
      .sort((a, b) => b.xp - a.xp);

    const bloco = document.createElement("div");
    bloco.classList.add("bloco-escola");

    let html = `
      <h3>🏫 ${nomeEscola}</h3>
      <table class="tabela-ranking-escola">
        <tr>
          <th>#</th>
          <th>Aluno</th>
          <th>XP</th>
          <th>Nível</th>
        </tr>
    `;

    alunosDaEscola.forEach((aluno, index) => {
      html += `
        <tr>
          <td>${medalha(index + 1)}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.xp}</td>
          <td>${aluno.nivel}</td>
        </tr>
      `;
    });

    html += `</table>`;

    bloco.innerHTML = html;
    container.appendChild(bloco);
  });
}

/* =====================================================
   CARDS RESUMO
===================================================== */

function atualizarCards(lista) {

  let ativos = 0;
  let regulares = 0;
  let totalXP = 0;

  lista.forEach(aluno => {

    const status = calcularStatus(aluno.ultimoLogin);

    if (status.tipo === "ativo") ativos++;
    if (status.tipo === "regular") regulares++;

    totalXP += aluno.xp;
  });

  const media = lista.length > 0
    ? Math.round(totalXP / lista.length)
    : 0;

  document.getElementById("total-alunos").textContent = lista.length;
  document.getElementById("ativos").textContent = ativos;
  document.getElementById("regulares").textContent = regulares;
  document.getElementById("media-xp").textContent = media;

  if (lista.length > 0) {
    document.getElementById("maior-xp-nome").textContent = lista[0].nome;
    document.getElementById("maior-xp-valor").textContent = lista[0].xp;
  }
}

/* =====================================================
   FILTROS
===================================================== */

function aplicarFiltros() {

  const escola = document.getElementById("filtro-escola").value;
  const serie = document.getElementById("filtro-serie").value;
  const turma = document.getElementById("filtro-turma").value;

  alunosFiltrados = alunosOriginais.filter(a => {

    if (escola !== "todas" && a.escola !== escola) return false;
    if (serie !== "todas" && a.serie !== serie) return false;
    if (turma !== "todas" && a.turma !== turma) return false;

    return true;
  });

  renderizarTabela(alunosFiltrados);
}

/* =====================================================
   EXPORTAR CSV
===================================================== */

function exportarCSV() {

  let csv = "Aluno,Escola,Série,Turma,XP,Nível\n";

  alunosFiltrados.forEach(a => {
    csv += `${a.nome},${a.escola},${a.serie},${a.turma},${a.xp},${a.nivel}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio_alunos.csv";
  link.click();
}

/* =====================================================
   FLUXO PRINCIPAL
===================================================== */

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

  const snapshot = await getDocs(collection(db, "usuarios"));

  alunosOriginais = [];

  snapshot.forEach(docSnap => {

    const dados = docSnap.data();
    if (dados.tipo !== "aluno") return;

    alunosOriginais.push({
      nome: dados.nome || "-",
      escola: dados.escola || "-",
      serie: dados.serie || "-",
      turma: dados.turma || "-",
      xp: dados.xp ?? 0,
      nivel: dados.nivel ?? 0,
      ultimoLogin: dados.ultimoAcesso || null
    });
  });

  // Ordena ranking geral
  alunosOriginais.sort((a, b) => b.xp - a.xp);

  alunosFiltrados = [...alunosOriginais];

  renderizarTabela(alunosFiltrados);

  // Eventos
  document.getElementById("filtro-escola")?.addEventListener("change", aplicarFiltros);
  document.getElementById("filtro-serie")?.addEventListener("change", aplicarFiltros);
  document.getElementById("filtro-turma")?.addEventListener("change", aplicarFiltros);
  document.getElementById("exportar-csv")?.addEventListener("click", exportarCSV);

  console.log("Dashboard 3.0 carregado com sucesso.");
});

/* =====================================================
   BOTÃO VOLTAR
===================================================== */

window.voltar = function () {
  window.location.href = "./professor/professor.html";
};
