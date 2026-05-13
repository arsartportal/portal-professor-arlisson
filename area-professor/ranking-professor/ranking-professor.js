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

import { app } from "../../js/firebase.js";
import { obterPatentePorNivel } from "../../js/patentes.js";
import { adicionarXPManualProfessor } from "../../js/xp.js";

const db = getFirestore(app);
const auth = getAuth(app);


/* =====================================================
   VARIÁVEIS GLOBAIS
===================================================== */

let alunosOriginais = [];
let alunosFiltrados = [];

let ordemAtual = {
  campo: null,
  asc: true
};


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
   ORDENAÇÃO POR CAMPO (CRESCENTE/DECRESCENTE)
===================================================== */

function ordenarPorCampo(campo){

  if(campo === "posicao"){
  ordenarPorPatente(alunosFiltrados);
  renderizarTabela(alunosFiltrados);
  return;
}

  if(ordemAtual.campo === campo){
    ordemAtual.asc = !ordemAtual.asc;
  } else {
    ordemAtual.campo = campo;
    ordemAtual.asc = true;
  }

  alunosFiltrados.sort((a,b)=>{

    let A = a[campo];
    let B = b[campo];

    // texto
    if(typeof A === "string"){
      return ordemAtual.asc
        ? A.localeCompare(B)
        : B.localeCompare(A);
    }

    // número
    return ordemAtual.asc
      ? (A||0) - (B||0)
      : (B||0) - (A||0);

  });

  renderizarTabela(alunosFiltrados);
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

  <!-- XP -->
  <td>${aluno.xp}</td>

  <!-- XP TOTAL (melhor visual) -->
  <td>
    <div class="xp-total-box">
      ${aluno.xpTotal}
    </div>
  </td>

  <!-- XP SEMANA -->
  <td style="color:#4ade80; font-weight:bold;">
    ${aluno.xpSemana}
  </td>

  <!-- STREAK -->
  <td>🔥 ${aluno.streakAtual}</td>
  <td>🏆 ${aluno.maiorStreak}</td>

  <!-- SP -->
  <td>${aluno.sciencePoints}</td>

  <!-- SP GERADOS -->
  <td style="color:#38bdf8; font-weight:bold;">
    ${aluno.totalSPGerados}
  </td>

  <!-- BONUS -->
  <td style="font-weight:bold; color:${aluno.bonusProvaDisponivel > 0 ? '#00ff88' : '#999'}">
    🎯 ${aluno.bonusProvaDisponivel}
  </td>

  <!-- PATENTE -->
  <td class="coluna-patente">
    <img src="${patente.imagem}"
         class="icone-patente"
         title="Nível ${aluno.nivel} • ${aluno.xp} XP">
  </td>

  <!-- STATUS -->
  <td class="${status.classe}">
    ${status.texto}
  </td>

  <!-- LOGIN -->
  <td>
    ${formatarData(aluno.ultimoLogin)}
  </td>

  <!-- AÇÕES -->
  <td>

    <button class="btn-bonus" data-uid="${aluno.id}">
      ➕ XP
    </button>

    <button class="btn-science" data-uid="${aluno.id}">
      🔬 SP
    </button>

    <button class="btn-reset-bonus" data-uid="${aluno.id}">
      🎯 Reset
    </button>

  </td>

`;

    tabela.appendChild(tr);

  });

  atualizarCards(lista);



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

try {

  const resultado = await adicionarXPManualProfessor(uid, valor);

  if (!resultado) {
    alert("❌ Falha ao adicionar XP.");
    return;
  }

  alert("✅ XP adicionado!");

  await carregarAlunos();

} catch (erro) {

  console.error(erro);
  alert("❌ Erro real no sistema (Firebase bloqueou).");

}

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

  if (e.target.classList.contains("btn-reset-bonus")) {

  const uid = e.target.dataset.uid;

  if (!confirm("Resetar bônus de prova deste aluno?")) return;

  const ref = doc(db, "usuarios", uid);

  await updateDoc(ref, {
    bonusProvaDisponivel: 0
  });

  alert("✅ Bônus resetado!");

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

    const nivel =
      Number.isInteger(dados.nivel) ? dados.nivel : 0;

    const xpAtual =
      Number.isFinite(dados.xp) ? dados.xp : 0;

    alunosOriginais.push({

      id: docSnap.id,

      nome: dados.nome || "-",
      escola: dados.escola || "-",
      serie: dados.serie || "-",
      turma: dados.turma || "-",

      // 🎯 XP
      xp: xpAtual,

      xpTotal: calcularXpTotal(nivel, xpAtual),

      xpSemana:
        Number.isFinite(dados.xpSemana)
        ? dados.xpSemana
        : 0,

      // 🔥 STREAK
      streakAtual:
        Number.isFinite(dados.streakAtual)
        ? dados.streakAtual
        : 0,

      maiorStreak:
        Number.isFinite(dados.maiorStreak)
        ? dados.maiorStreak
        : 0,

      // 🔬 SCIENCE POINTS
      sciencePoints:
        Number.isFinite(dados.sciencePoints)
        ? dados.sciencePoints
        : 0,

      totalSPGerados:
        Number.isFinite(dados.totalSPGerados)
        ? dados.totalSPGerados
        : 0,

      // 🎯 BONUS
      bonusProvaDisponivel:
        Number(dados.bonusProvaDisponivel) || 0,

      // 📊 PROGRESSÃO
      nivel: nivel,

      // 🕒 ATIVIDADE
      ultimoLogin:
        dados.ultimoAcesso || null

    });

  });

  ordenarPorPatente(alunosOriginais);

  alunosFiltrados = [...alunosOriginais];

  renderizarTabela(alunosFiltrados);
}


/* =====================================================
   CALCULAR XP TOTAL (NÍVEL + ATUAL)
===================================================== */
function calcularXpTotal(nivel, xpAtual){

  let total = 0;

  for(let i = 0; i < nivel; i++){
    total += 100 * Math.pow(2, i);
  }

  return total + xpAtual;
}


/* =====================================================
   FLUXO PRINCIPAL
===================================================== */

onAuthStateChanged(auth, async (user) => {

  if (!user) {

window.location.href = "../../index.html";

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

window.location.href = "../../home.html";

    return;

  }

await carregarAlunos();

// 🔥 ATIVA ORDENAÇÃO NAS COLUNAS
document.querySelectorAll("th[data-sort]")
.forEach(th => {

  th.style.cursor = "pointer";

  th.addEventListener("click", () => {
    ordenarPorCampo(th.dataset.sort);
  });

});

document.getElementById("filtro-escola")
?.addEventListener("change", aplicarFiltros);

document.getElementById("filtro-serie")
?.addEventListener("change", aplicarFiltros);

document.getElementById("filtro-turma")
?.addEventListener("change", aplicarFiltros);

document.getElementById("exportar-csv")
?.addEventListener("click", exportarCSV);

console.log("Dashboard 6.0 carregado.");
});


/* =====================================================
   BOTÃO VOLTAR
===================================================== */

window.voltar = function () {

window.location.href =
  "../area-professor.html";

};