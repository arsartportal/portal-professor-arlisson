/* =====================================================
   BOLAO.JS - VERSÃO FINAL PROFISSIONAL
   ✔ Firebase integrado
   ✔ Eventos 100% via JS
   ✔ Estatísticas + gráfico
   ✔ Ranking
   ✔ Simulação de ganho em tempo real
===================================================== */

import { db, auth } from "../js/firebase.js";

import {
  collection, addDoc, getDocs, doc, updateDoc,
  increment, query, onSnapshot, where, getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

/* =====================================================
   VARIÁVEIS GLOBAIS
===================================================== */

let alunoUid = null;
let graficoPizza = null;

/* =====================================================
   CACHE EM TEMPO REAL (🔥 PERFORMANCE)
   Guarda dados do Firestore localmente
===================================================== */

let cacheApostas = [];   // todas as apostas
let cachePremio = 0;     // prêmio acumulado
/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
});

onAuthStateChanged(auth, async (user)=>{
  if(!user){
    alert("Faça login para usar o bolão");
    return;
  }

  alunoUid = user.uid;

  await carregarResumo();
  await carregarMinhasApostas();
  await carregarRanking();

  iniciarTempoReal();
});

/* =====================================================
   EVENTOS
===================================================== */

function configurarEventos(){

  // BOTÃO APOSTAR
  document.querySelector(".btn")
    .addEventListener("click", apostar);

  // TABS
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const aba = btn.dataset.aba;
      trocarAba(aba, btn);
    });
  });

  // 🔥 SIMULAÇÃO EM TEMPO REAL
  document.getElementById("selecao")
    .addEventListener("change", atualizarSimulacao);

  document.getElementById("pontos")
    .addEventListener("input", atualizarSimulacao);
}

/* =====================================================
   ABAS
===================================================== */

function trocarAba(nome, botao){

  document.querySelectorAll(".aba")
    .forEach(a => a.classList.remove("ativa"));

  document.getElementById(nome).classList.add("ativa");

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  botao.classList.add("active");
}

/* =====================================================
   APOSTAR
===================================================== */

async function apostar(){

  const btn = document.querySelector(".btn");
  const status = document.getElementById("statusAposta");

  btn.disabled = true;

  try {

    const selecao = document.getElementById("selecao").value;
    const pontos = Number(document.getElementById("pontos").value);

    // 🧪 validação básica
    if(!pontos || pontos <= 0){
      status.innerText = "⚠️ Valor inválido";
      return;
    }

    // 🔒 LIMITE (igual à rule)
    if(pontos > 500){
      status.innerText = "⚠️ Máximo permitido: 500 SP";
      return;
    }

    const saldo = await getSP(alunoUid);

    // 💰 saldo suficiente?
    if(pontos > saldo){
      status.innerText = "❌ SP insuficiente";
      return;
    }

    // ✅ PASSO 1 — salva aposta primeiro
    await addDoc(collection(db, "apostasCopa"), {
      alunoUid,
      selecao,
      pontosInvestidos: pontos,
      data: new Date().toISOString()
    });

    // ✅ PASSO 2 — remove SP (só depois de garantir aposta)
    await removerSP(alunoUid, pontos);

    // ✅ PASSO 3 — atualiza prêmio
    await updateDoc(doc(db, "bolaoCopa", "principal"), {
      premioTotal: increment(pontos),
      totalApostas: increment(1)
    });

    // 🎉 sucesso
    status.innerText = "✅ Aposta realizada!";

    // 🔄 atualizações
    carregarResumo();
    carregarMinhasApostas();
    carregarEstatisticas();
    carregarRanking();

    // 🧹 limpa campo
    document.getElementById("pontos").value = "";
    atualizarSimulacao();

  } catch(e){

    console.error(e);

    // ⚠️ feedback melhorado
    if(e.code === "permission-denied"){
      status.innerText = "❌ Aposta não permitida (limite ou regra)";
    } else {
      status.innerText = "❌ Erro ao apostar";
    }

  } finally {
    btn.disabled = false;
  }
}

/* =====================================================
   RESUMO
===================================================== */

async function carregarResumo(){

  const snap = await getDoc(doc(db, "bolaoCopa", "principal"));

  if(!snap.exists()) return;

  const data = snap.data();

  document.getElementById("premioTotal").innerText =
    (data.premioTotal || 0) + " XP";

  document.getElementById("totalApostas").innerText =
    data.totalApostas || 0;
}

/* =====================================================
   MINHAS APOSTAS
===================================================== */

async function carregarMinhasApostas(){

  const q = query(
    collection(db, "apostasCopa"),
    where("alunoUid", "==", alunoUid)
  );

  const snap = await getDocs(q);

  const lista = document.getElementById("listaApostas");
  lista.innerHTML = "";

  snap.forEach(docSnap => {
    const a = docSnap.data();

    const li = document.createElement("li");
    li.innerText = `${a.selecao} — ${a.pontosInvestidos} XP`;

    lista.appendChild(li);
  });
}

/* =====================================================
   ESTATÍSTICAS
===================================================== */

async function carregarEstatisticas(){

  const snap = await getDocs(collection(db, "apostasCopa"));

  let estatisticas = {};

  snap.forEach(docSnap => {
    const a = docSnap.data();

    if(!estatisticas[a.selecao]){
      estatisticas[a.selecao] = 0;
    }

    estatisticas[a.selecao] += a.pontosInvestidos;
  });

  renderGrafico(
    Object.keys(estatisticas),
    Object.values(estatisticas)
  );

  atualizarTopSelecao(estatisticas);
}

/* =====================================================
   TOP SELEÇÃO
===================================================== */

function atualizarTopSelecao(est){

  let top = null;
  let maior = 0;

  for(const sel in est){
    if(est[sel] > maior){
      maior = est[sel];
      top = sel;
    }
  }

  if(top){
    document.getElementById("topSelecao").innerText = top;
  }
}

/* =====================================================
   GRÁFICO
===================================================== */

function renderGrafico(labels, valores){

  const ctx = document.getElementById("graficoPizza");

  if(graficoPizza){
    graficoPizza.destroy();
  }

  graficoPizza = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: valores
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0"
          }
        }
      }
    }
  });
}

/* =====================================================
   RANKING
===================================================== */

async function carregarRanking(){

  const snap = await getDocs(collection(db, "apostasCopa"));

  let ranking = {};

  snap.forEach(docSnap => {
    const a = docSnap.data();

    if(!ranking[a.alunoUid]){
      ranking[a.alunoUid] = 0;
    }

    ranking[a.alunoUid] += a.pontosInvestidos;
  });

  const lista = document.getElementById("rankingLista");
  lista.innerHTML = "";

  Object.entries(ranking)
    .sort((a,b) => b[1] - a[1])
    .slice(0,10)
    .forEach(([uid, total], i) => {

      const li = document.createElement("li");
      li.innerText = `#${i+1} — ${total} XP`;

      lista.appendChild(li);
    });
}

/* =====================================================
   SIMULAÇÃO DE GANHO (VERSÃO OTIMIZADA)
   Usa cache → rápido e escalável
===================================================== */

async function atualizarSimulacao(){

  const selecao = document.getElementById("selecao")?.value;
  const pontos = Number(document.getElementById("pontos")?.value);
  const el = document.getElementById("simulacaoGanho");

  // segurança
  if(!el) return;

  if(!pontos || pontos <= 0){
    el.innerText = "";
    return;
  }

  let totalSelecao = 0;
  let apostasAluno = 0;

  // 🔥 usa dados locais (rápido)
  cacheApostas.forEach(a => {

    if(a.selecao === selecao){
      totalSelecao += a.pontosInvestidos;
    }

    if(a.alunoUid === alunoUid){
      apostasAluno++;
    }

  });

  const novoTotal = totalSelecao + pontos;

  if(novoTotal === 0) return;

  // 🎯 cálculo de odds
  const odds = (cachePremio + pontos) / novoTotal;

  // 🎯 ganho base
  let ganho = pontos * odds;

  // ⚖️ penalidade
  const penalidade = calcularPenalidade(apostasAluno);
  ganho *= penalidade;

  el.innerText =
    `💰 ~${Math.floor(ganho)} XP | Odds: ${odds.toFixed(2)}x`;

  // 🎨 feedback visual
  if(odds > 3){
    el.style.color = "#22c55e"; // alto retorno
  } else if(odds > 1.5){
    el.style.color = "#facc15"; // médio
  } else {
    el.style.color = "#ef4444"; // baixo
  }

  // 🧠 aviso inteligente
  if(apostasAluno >= 3){
    el.innerText += " ⚠️ Penalidade alta!";
  }
}

function calcularPenalidade(qtd){

  if(qtd <= 1) return 1;
  if(qtd === 2) return 0.9;
  if(qtd === 3) return 0.75;
  return 0.6;
}



/* =====================================================
   TEMPO REAL (🔥 CORE DO SISTEMA)
   Atualiza dados automaticamente sem refresh
===================================================== */

function iniciarTempoReal(){

  // 📊 ouvir todas as apostas
  onSnapshot(collection(db, "apostasCopa"), (snap)=>{

    cacheApostas = [];

    snap.forEach(docSnap => {
      cacheApostas.push(docSnap.data());
    });

    atualizarSimulacao(); // 🔥 recalcula automaticamente
  });

  // 💰 ouvir prêmio total
  onSnapshot(doc(db, "bolaoCopa", "principal"), (snap)=>{

    cachePremio = snap.data()?.premioTotal || 0;

    atualizarSimulacao(); // 🔥 recalcula automaticamente
  });
}

function atualizarRankingTempoReal(ranking){

  const lista = document.getElementById("rankingLista");
  lista.innerHTML = "";

  Object.entries(ranking)
    .sort((a,b) => b[1] - a[1])
    .slice(0,10)
    .forEach(([uid, total], i) => {

      const li = document.createElement("li");
      li.innerText = `#${i+1} — ${total} XP`;

      lista.appendChild(li);
    });
}

/* =====================================================
   SP
===================================================== */

async function getSP(uid){
  const snap = await getDoc(doc(db, "usuarios", uid));
  return snap.data()?.sciencePoints || 0;
}

async function removerSP(uid, valor){
  await updateDoc(doc(db, "usuarios", uid), {
    sciencePoints: increment(-valor)
  });
}

/* =====================================================
   TRAVAMENTO
===================================================== */

const dataLimite = new Date("2026-06-11");

if(new Date() > dataLimite){
  const btn = document.querySelector(".btn");
  if(btn) btn.disabled = true;
}