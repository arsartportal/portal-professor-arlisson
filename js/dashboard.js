/* =====================================================
   DASHBOARD.JS — PORTAL DO PROFESSOR 3.3
   Ranking por PATENTE (nível)
   XP apenas como desempate
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
   ORDENAÇÃO POR PATENTE (OFICIAL)
===================================================== */

function ordenarPorPatente(lista) {
  return lista.sort((a, b) => {

    // 1️⃣ Primeiro critério: nível (patente)
    if (b.nivel === a.nivel) {

      // 2️⃣ Segundo critério: XP
      return b.xp - a.xp;
    }

    return b.nivel - a.nivel;
  });
}

/* =====================================================
   RENDERIZAÇÃO PRINCIPAL
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
      <td class="coluna-patente">
        <img src="${patente.imagem}" 
             alt="Patente"
             class="icone-patente"
             title="Nível ${aluno.nivel} • ${aluno.xp} XP">
      </td>
      <td class="${status.classe}">${status.texto}</td>
      <td>${formatarData(aluno.ultimoLogin)}</td>
      <td>
        <button class="btn-bonus" data-uid="${aluno.id}">
          ➕ XP
        </button>
      </td>
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

  lista.forEach(aluno => {
    if (!escolas[aluno.escola]) {
      escolas[aluno.escola] = [];
    }
    escolas[aluno.escola].push(aluno);
  });

  Object.keys(escolas).forEach(nomeEscola => {

    const alunosDaEscola = ordenarPorPatente(
      [...escolas[nomeEscola]]
    );

    const bloco = document.createElement("div");
    bloco.classList.add("bloco-escola");

    let html = `
      <h3>🏫 ${nomeEscola}</h3>
      <table class="tabela-ranking-escola">
        <tr>
          <th>#</th>
          <th>Aluno</th>
          <th>XP</th>
          <th>🎖️ Patente</th>
        </tr>
    `;

    alunosDaEscola.forEach((aluno, index) => {

      const patente = obterPatentePorNivel(aluno.nivel ?? 0);

      html += `
        <tr>
          <td>${medalha(index + 1)}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.xp}</td>
          <td class="coluna-patente">
            <img src="${patente.imagem}" 
                 class="icone-patente"
                 title="Nível ${aluno.nivel} • ${aluno.xp} XP">
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

  ordenarPorPatente(alunosFiltrados);
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
   EVENTO BONIFICAÇÃO
===================================================== */

document.addEventListener("click", async (e) => {

  if (!e.target.classList.contains("btn-bonus")) return;

  const uid = e.target.dataset.uid;

  const valor = parseInt(prompt("Quantos XP deseja adicionar?"));

  if (!valor || valor <= 0) return;

  await adicionarXPManualProfessor(uid, valor);

  alert("XP adicionado com sucesso!");

  await carregarAlunos();
});

/* =====================================================
   CARREGAR ALUNOS
===================================================== */

async function carregarAlunos() {

  const snapshot = await getDocs(collection(db, "usuarios"));

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
      nivel: Number.isInteger(dados.nivel) ? dados.nivel : 0,
      ultimoLogin: dados.ultimoAcesso || null
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

  await carregarAlunos();

  document.getElementById("filtro-escola")?.addEventListener("change", aplicarFiltros);
  document.getElementById("filtro-serie")?.addEventListener("change", aplicarFiltros);
  document.getElementById("filtro-turma")?.addEventListener("change", aplicarFiltros);
  document.getElementById("exportar-csv")?.addEventListener("click", exportarCSV);

  console.log("Dashboard 3.3 carregado com ranking por patente.");
});

/* =====================================================
   BOTÃO VOLTAR
===================================================== */

window.voltar = function () {
  window.location.href = "./professor/professor.html";
};