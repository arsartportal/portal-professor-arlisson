/* =====================================================
   DASHBOARD.JS — PORTAL DO PROFESSOR 4.0
   Ranking por patente
   XP como desempate
   Ranking por escola
   Ranking por turma
===================================================== */

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";
import { obterPatentePorNivel } from "./patentes.js";
import { adicionarXPManualProfessor } from "./xp.js";

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
   ORDENAÇÃO POR PATENTE
===================================================== */

function ordenarPorPatente(lista) {

  return lista.sort((a, b) => {

    if (b.nivel === a.nivel)
      return b.xp - a.xp;

    return b.nivel - a.nivel;

  });

}


/* =====================================================
   RENDERIZAÇÃO TABELA PRINCIPAL
===================================================== */

function renderizarTabela(lista) {

  const tabela = document.getElementById("lista-alunos");
  tabela.innerHTML = "";

  lista.forEach((aluno, index) => {

    const status = calcularStatus(aluno.ultimoLogin);
    const patente = obterPatentePorNivel(aluno.nivel ?? 0);

    const tr = document.createElement("tr");

    tr.innerHTML = `

      <td>${medalha(index + 1)}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.escola}</td>
      <td>${aluno.serie}</td>
      <td>${aluno.turma}</td>

      <td>${aluno.xp}</td>
      <td>🔥 ${aluno.streakAtual}</td>
      <td>🏆 ${aluno.maiorStreak}</td>
      <td>${aluno.sciencePoints}</td>

      <td class="coluna-patente">
        <img src="${patente.imagem}"
             class="icone-patente"
             title="Nível ${aluno.nivel} • ${aluno.xp} XP">
      </td>

      <td class="${status.classe}">
        ${status.texto}
      </td>

      <td>
        ${formatarData(aluno.ultimoLogin)}
      </td>

      <td>

        <button class="btn-bonus"
                data-uid="${aluno.id}">
          ➕ XP
        </button>

        <button class="btn-science"
                data-uid="${aluno.id}">
          🔬 SP
        </button>

      </td>

    `;

    tabela.appendChild(tr);

  });

  atualizarCards(lista);

  renderizarRankingPorEscola(lista);

  renderizarRankingPorTurma(lista);

}


/* =====================================================
   RANKING POR ESCOLA
===================================================== */

function renderizarRankingPorEscola(lista) {

  const container =
    document.getElementById("ranking-escolas-container");

  if (!container) return;

  container.innerHTML = "";

  const escolas = {};

  lista.forEach(aluno => {

    if (!escolas[aluno.escola])
      escolas[aluno.escola] = [];

    escolas[aluno.escola].push(aluno);

  });

  Object.keys(escolas)
  .sort()
  .forEach(nomeEscola => {

    const alunosDaEscola =
      ordenarPorPatente([...escolas[nomeEscola]]);

    const bloco = document.createElement("div");
    bloco.classList.add("bloco-escola");

    let html = `
      <h3>🏫 ${nomeEscola}</h3>

      <table class="tabela-ranking-escola">

      <tr>
        <th>#</th>
        <th>Aluno</th>
        <th>XP</th>
        <th>🎖️</th>
      </tr>
    `;

    alunosDaEscola.forEach((aluno, index) => {

      const patente = obterPatentePorNivel(aluno.nivel ?? 0);

      html += `
        <tr>
          <td>${medalha(index + 1)}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.xp}</td>

          <td>
            <img src="${patente.imagem}"
                 class="icone-patente">
          </td>
        </tr>
      `;

    });

    html += `</table>`;

    bloco.innerHTML = html;

    container.appendChild(bloco);

  });

}


/* =====================================================
   RANKING POR TURMA
===================================================== */

function renderizarRankingPorTurma(lista) {

  const container =
    document.getElementById("ranking-turmas-container");

  if (!container) return;

  container.innerHTML = "";

  const turmas = {};

  lista.forEach(aluno => {

    const chave =
      aluno.escola +
      "|" +
      aluno.serie +
      "|" +
      aluno.turma;

    if (!turmas[chave])
      turmas[chave] = [];

    turmas[chave].push(aluno);

  });

  Object.keys(turmas).forEach(chave => {

    const alunosDaTurma =
      ordenarPorPatente([...turmas[chave]]);

    const [escola, serie, turma] = chave.split("|");

    const bloco = document.createElement("div");

    bloco.classList.add("bloco-turma");

    let html = `

      <h3>
      🏫 ${escola} • ${serie} • Turma ${turma}
      </h3>

      <table class="tabela-ranking-turma">

      <tr>
        <th>#</th>
        <th>Aluno</th>
        <th>XP</th>
        <th>🎖️</th>
      </tr>
    `;

    alunosDaTurma.forEach((aluno, index) => {

      const patente = obterPatentePorNivel(aluno.nivel ?? 0);

      html += `

        <tr>

          <td>${medalha(index + 1)}</td>

          <td>${aluno.nome}</td>

          <td>${aluno.xp}</td>

          <td>
            <img src="${patente.imagem}"
                 class="icone-patente">
          </td>

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

    const status =
      calcularStatus(aluno.ultimoLogin);

    if (status.tipo === "ativo")
      ativos++;

    if (status.tipo === "regular")
      regulares++;

    totalXP += Number(aluno.xp) || 0;

  });

  const media =
    lista.length > 0
      ? Math.round(totalXP / lista.length)
      : 0;

  document.getElementById("total-alunos")
    .textContent = lista.length;

  document.getElementById("ativos")
    .textContent = ativos;

  document.getElementById("regulares")
    .textContent = regulares;

  document.getElementById("media-xp")
    .textContent = media;

  if (lista.length > 0) {

    const maiorXP =
      [...lista].sort((a,b)=>b.xp-a.xp)[0];

    document.getElementById("maior-xp-nome")
      .textContent = maiorXP.nome;

    document.getElementById("maior-xp-valor")
      .textContent = maiorXP.xp;

  }

}


/* =====================================================
   FILTROS
===================================================== */

function aplicarFiltros() {

  const escola =
    document.getElementById("filtro-escola").value;

  const serie =
    document.getElementById("filtro-serie").value;

  const turma =
    document.getElementById("filtro-turma").value;

  alunosFiltrados = alunosOriginais.filter(a => {

    if (escola !== "todas" && a.escola !== escola)
      return false;

    if (serie !== "todas" && a.serie !== serie)
      return false;

    if (turma !== "todas" && a.turma !== turma)
      return false;

    return true;

  });

  ordenarPorPatente(alunosFiltrados);

  renderizarTabela(alunosFiltrados);

}


/* =====================================================
   EXPORTAR CSV
===================================================== */

function exportarCSV() {

  let csv =
  "Aluno,Escola,Série,Turma,XP,XP Total,SciencePoints,Nível\n";

  alunosFiltrados.forEach(a => {

    csv += `${a.nome},${a.escola},${a.serie},${a.turma},${a.xp},${a.xpTotal},${a.sciencePoints},${a.nivel}\n`;

  });

  const blob =
    new Blob([csv], { type: "text/csv" });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = "relatorio_alunos.csv";

  link.click();

}


/* =====================================================
   BOTÕES XP E SCIENCE POINTS
===================================================== */

document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("btn-bonus")) {

    const uid =
      e.target.dataset.uid;

    const valor =
      parseInt(prompt("Quantos XP deseja adicionar?"));

    if (!valor || valor <= 0) return;

    await adicionarXPManualProfessor(uid, valor);

    alert("XP adicionado!");

    await carregarAlunos();

  }


  if (e.target.classList.contains("btn-science")) {

    const uid =
      e.target.dataset.uid;

    const valor =
      parseInt(prompt("Quantos SciencePoints deseja adicionar?"));

    if (!valor || valor <= 0) return;

    const ref =
      doc(db, "usuarios", uid);

    await updateDoc(ref, {
      sciencePoints: increment(valor)
    });

    alert("SciencePoints adicionados!");

    await carregarAlunos();

  }

});


/* =====================================================
   CARREGAR ALUNOS
===================================================== */

async function carregarAlunos() {

  const snapshot =
    await getDocs(collection(db, "usuarios"));

  alunosOriginais = [];

  snapshot.forEach(docSnap => {

    const dados = docSnap.data();

    if (dados.tipo !== "aluno") return;

    alunosOriginais.push({

      id: docSnap.id,

      nome: dados.nome || "-",

      escola: dados.escola || "-",

      serie: dados.serie || "-",

      turma: dados.turma || "-",

      xp: Number.isFinite(dados.xp) ? dados.xp : 0,

      streakAtual: Number.isFinite(dados.streakAtual)
        ? dados.streakAtual
        : 0,

      maiorStreak: Number.isFinite(dados.maiorStreak)
        ? dados.maiorStreak
      : 0,

      sciencePoints: Number.isFinite(dados.sciencePoints)
        ? dados.sciencePoints
      : 0,

      nivel:
        Number.isInteger(dados.nivel)
        ? dados.nivel
        : 0,

      ultimoLogin:
        dados.ultimoAcesso || null

    });

  });

  ordenarPorPatente(alunosOriginais);

  alunosFiltrados = [...alunosOriginais];

  renderizarTabela(alunosFiltrados);

}


/* =====================================================
   FLUXO PRINCIPAL
===================================================== */

onAuthStateChanged(auth, async (user) => {

  if (!user) {

    window.location.href =
      "../index.html";

    return;

  }

  const perfilRef =
    doc(db, "usuarios", user.uid);

  const perfilSnap =
    await getDoc(perfilRef);

  if (!perfilSnap.exists())
    return;

  const perfil =
    perfilSnap.data();

  if (perfil.tipo !== "professor") {

    alert("Acesso restrito ao professor.");

    window.location.href =
      "../home.html";

    return;

  }

  await carregarAlunos();

  document.getElementById("filtro-escola")
  ?.addEventListener("change", aplicarFiltros);

  document.getElementById("filtro-serie")
  ?.addEventListener("change", aplicarFiltros);

  document.getElementById("filtro-turma")
  ?.addEventListener("change", aplicarFiltros);

  document.getElementById("exportar-csv")
  ?.addEventListener("click", exportarCSV);

  console.log("Dashboard 4.0 carregado.");

});


/* =====================================================
   BOTÃO VOLTAR
===================================================== */

window.voltar = function () {

  window.location.href =
    "./professor/professor.html";

};