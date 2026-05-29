/* =====================================================
   BOLAO.JS — PORTAL DO PROFESSOR
   ✔ Firebase integrado
   ✔ Sistema de SP
   ✔ Odds dinâmicas
   ✔ Ranking em tempo real
   ✔ Estatísticas
   ✔ Modal
   ✔ Cache local
===================================================== */

import { db, auth } from "../js/firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  where,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

/* =====================================================
   VARIÁVEIS GLOBAIS
===================================================== */

let alunoUid = null;

let graficoPizza = null;

let cacheApostas = [];
let historicoPremio = [];
let cachePremio = 0;
let graficoLinha = null;

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
});

/* =====================================================
   LOGIN
===================================================== */

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    alert("Faça login para usar o bolão");
    return;
  }

  alunoUid = user.uid;

  await carregarResumo();
  await carregarMinhasApostas();
  await carregarEstatisticas();
  await carregarRanking();

  iniciarTempoReal();

});

/* =====================================================
   EVENTOS
===================================================== */

function configurarEventos() {

  // BOTÃO APOSTAR
  document
    .getElementById("btnApostar")
    .addEventListener("click", apostar);

  // FECHAR MODAL
  document
    .getElementById("fecharModal")
    .addEventListener("click", () => {

      document.getElementById("modalAposta")
        .style.display = "none";

    });

  // TABS
  document.querySelectorAll(".tab").forEach(btn => {

    btn.addEventListener("click", () => {

      const aba = btn.dataset.aba;

      trocarAba(aba, btn);

    });

  });

  // SIMULAÇÃO
  document
    .getElementById("selecao")
    .addEventListener("change", atualizarSimulacao);

  document
    .getElementById("pontos")
    .addEventListener("input", atualizarSimulacao);

}

/* =====================================================
   ABAS
===================================================== */

function trocarAba(nome, botao) {

  document.querySelectorAll(".aba")
    .forEach(a => a.classList.remove("ativa"));

  document.getElementById(nome)
    .classList.add("ativa");

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  botao.classList.add("active");

}

/* =====================================================
   APOSTAR
===================================================== */

async function apostar() {

  const btn = document.getElementById("btnApostar");

  const status = document.getElementById("statusAposta");

  btn.disabled = true;

  try {

    const selecao =
      document.getElementById("selecao").value;

    const pontos =
      Number(document.getElementById("pontos").value);

    /* ================= VALIDAÇÃO ================= */

    if (!pontos || pontos <= 0) {

      status.innerText = "⚠️ Valor inválido";

      return;
    }

    if (pontos > 500) {

      status.innerText =
        "⚠️ Máximo permitido: 500 SP";

      return;
    }

    /* ================= SALDO ================= */

    const saldo = await getSP(alunoUid);

    if (pontos > saldo) {

      status.innerText =
        "❌ SP insuficiente";

      return;
    }

    /* ================= SALVA APOSTA ================= */

    const usuarioSnap =
  await getDoc(doc(db, "usuarios", alunoUid));

const usuarioData =
  usuarioSnap.data();

await addDoc(collection(db, "apostasCopa"), {

  alunoUid,

  nome:
    usuarioData?.nome ||
    usuarioData?.nomeCompleto ||
    "Aluno",

  selecao,

  pontosInvestidos: pontos,

  data: serverTimestamp()

});

    /* ================= REMOVE SP ================= */

    await removerSP(alunoUid, pontos);

    /* ================= ATUALIZA PRÊMIO ================= */

    await updateDoc(
      doc(db, "bolaoCopa", "principal"),
      {
        premioTotal: increment(pontos),
        totalApostas: increment(1)
      }
    );

    /* ================= SUCESSO ================= */

    status.innerText =
      "✅ Aposta realizada!";

    /* ================= MODAL ================= */

    const modal =
      document.getElementById("modalAposta");

    const modalTexto =
      document.getElementById("modalTexto");

    modalTexto.innerText =
      `Você apostou ${pontos} SP em ${selecao}!`;

    modal.style.display = "flex";

    /* ================= ATUALIZAÇÕES ================= */

    await carregarResumo();
    await carregarMinhasApostas();
    await carregarEstatisticas();
    await carregarRanking();

    /* ================= LIMPA ================= */

    document.getElementById("pontos").value = "";

    atualizarSimulacao();

  } catch (e) {

    console.error(e);

    if (e.code === "permission-denied") {

      status.innerText =
        "❌ Aposta não permitida";

    } else {

      status.innerText =
        "❌ Erro ao apostar";

    }

  } finally {

    btn.disabled = false;

  }

}

/* =====================================================
   RESUMO
===================================================== */

async function carregarResumo() {

  const snap = await getDoc(
    doc(db, "bolaoCopa", "principal")
  );

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("premioTotal")
    .innerText =
    (data.premioTotal || 0) + " SP";

  document.getElementById("totalApostas")
    .innerText =
    data.totalApostas || 0;

}

/* =====================================================
   MINHAS APOSTAS
===================================================== */

async function carregarMinhasApostas() {

  const q = query(
    collection(db, "apostasCopa"),
    where("alunoUid", "==", alunoUid)
  );

  const snap = await getDocs(q);

  const lista =
    document.getElementById("listaApostas");

  lista.innerHTML = "";

  snap.forEach(docSnap => {

    const a = docSnap.data();

    const li = document.createElement("li");

    li.innerText =
      `${a.selecao} — ${a.pontosInvestidos} SP`;

    lista.appendChild(li);

  });

}

/* =====================================================
   ESTATÍSTICAS
===================================================== */

async function carregarEstatisticas() {

  const snap = await getDocs(
    collection(db, "apostasCopa")
  );

  let estatisticas = {};

  snap.forEach(docSnap => {

    const a = docSnap.data();

    if (!estatisticas[a.selecao]) {

      estatisticas[a.selecao] = 0;

    }

    estatisticas[a.selecao] +=
      a.pontosInvestidos;

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

function atualizarTopSelecao(est) {

  let top = null;

  let maior = 0;

  for (const sel in est) {

    if (est[sel] > maior) {

      maior = est[sel];

      top = sel;

    }

  }

  if (top) {

    document.getElementById("topSelecao")
      .innerText = top;

  }

}

/* =====================================================
   GRÁFICO
===================================================== */

function renderGrafico(labels, valores) {

  const ctx =
    document.getElementById("graficoPizza");

  if (graficoPizza) {

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

      responsive: true,

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

async function carregarRanking() {

  const snap = await getDocs(
    collection(db, "apostasCopa")
  );

  let ranking = {};

  snap.forEach(docSnap => {

    const a = docSnap.data();

    // cria usuário
    if (!ranking[a.alunoUid]) {

      ranking[a.alunoUid] = {

        nome:
          a.nome ||
          "Aluno",

        total: 0

      };

    }

    // soma SP
    ranking[a.alunoUid].total +=
      a.pontosInvestidos;

  });

  atualizarRankingTempoReal(ranking);

}

/* =====================================================
   RENDER RANKING
===================================================== */

function atualizarRankingTempoReal(ranking){

  const lista =
    document.getElementById("rankingLista");

  lista.innerHTML = "";

  Object.values(ranking)

    .sort((a,b)=> b.total - a.total)

    .slice(0,10)

    .forEach((user, i)=>{

      const li =
        document.createElement("li");

      let medalha = "";

      if(i === 0) medalha = "🥇";
      else if(i === 1) medalha = "🥈";
      else if(i === 2) medalha = "🥉";

      li.innerHTML = `
        <strong>${medalha} ${user.nome}</strong>
        <span>${user.total} SP</span>
      `;

      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";

      lista.appendChild(li);

    });

}

/* =====================================================
   SIMULAÇÃO
===================================================== */

async function atualizarSimulacao() {

  const selecao =
    document.getElementById("selecao")?.value;

  const pontos =
    Number(document.getElementById("pontos")?.value);

  const el =
    document.getElementById("simulacaoGanho");

  if (!el) return;

  if (!pontos || pontos <= 0) {

    el.innerText = "";

    return;

  }

  let totalSelecao = 0;

  let apostasAluno = 0;

  cacheApostas.forEach(a => {

    if (a.selecao === selecao) {

      totalSelecao +=
        a.pontosInvestidos;

    }

    if (a.alunoUid === alunoUid) {

      apostasAluno++;

    }

  });

  const novoTotal =
    totalSelecao + pontos;

  if (novoTotal === 0) return;

  const odds =
    (cachePremio + pontos) / novoTotal;

  let ganho =
    pontos * odds;

  const penalidade =
    calcularPenalidade(apostasAluno);

  ganho *= penalidade;

  el.innerText =
    `💰 ~${Math.floor(ganho)} SP | Odds: ${odds.toFixed(2)}x`;

  if (odds > 3) {

    el.style.color = "#22c55e";

  } else if (odds > 1.5) {

    el.style.color = "#facc15";

  } else {

    el.style.color = "#ef4444";

  }

  if (apostasAluno >= 3) {

    el.innerText +=
      " ⚠️ Penalidade alta!";

  }

}

/* =====================================================
   PENALIDADE
===================================================== */

function calcularPenalidade(qtd) {

  if (qtd <= 1) return 1;

  if (qtd === 2) return 0.9;

  if (qtd === 3) return 0.75;

  return 0.6;

}

/* =====================================================
   TEMPO REAL
===================================================== */

function iniciarTempoReal() {

  // APOSTAS
  onSnapshot(
    collection(db, "apostasCopa"),
    (snap) => {

      cacheApostas = [];

      let ranking = {};

      let estatisticas = {};

      snap.forEach(docSnap => {

        const a = docSnap.data();

        cacheApostas.push(a);

        // ranking
        if (!ranking[a.alunoUid]) {

  ranking[a.alunoUid] = {

    nome: a.nome || "Aluno",
    total: 0

  };

}

ranking[a.alunoUid].total +=
  a.pontosInvestidos;
        // estatísticas
        if (!estatisticas[a.selecao]) {

          estatisticas[a.selecao] = 0;

        }

        estatisticas[a.selecao] +=
          a.pontosInvestidos;

      });

      atualizarRankingTempoReal(ranking);

      renderGrafico(
        Object.keys(estatisticas),
        Object.values(estatisticas)
      );

      atualizarTopSelecao(estatisticas);

      atualizarSimulacao();

      carregarMinhasApostas();

    }
  );

  // PRÊMIO
  onSnapshot(
  doc(db, "bolaoCopa", "principal"),
  (snap) => {

    cachePremio =
      snap.data()?.premioTotal || 0;

    // 🔥 histórico do prêmio
    historicoPremio.push({

      valor: cachePremio,

      hora: new Date()
        .toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit"
        })

    });

    // evita crescimento infinito
    if(historicoPremio.length > 15){

      historicoPremio.shift();

    }

    // 💰 prêmio total
    document.getElementById("premioTotal")
      .innerText =
      cachePremio + " SP";

    // 👥 total apostas
    document.getElementById("totalApostas")
      .innerText =
      snap.data()?.totalApostas || 0;

    // 📈 atualiza gráfico
    renderGraficoLinha();

    // 🎯 recalcula odds
    atualizarSimulacao();

  }
);

}

function renderGraficoLinha(){

  const ctx =
    document.getElementById("graficoLinha");

  if(!ctx) return;

  if(graficoLinha){

    graficoLinha.destroy();

  }

  graficoLinha = new Chart(ctx, {

    type: "line",

    data: {

      labels:
        historicoPremio.map(h => h.hora),

      datasets: [{

        label: "Prêmio acumulado",

        data:
          historicoPremio.map(h => h.valor),

        tension: 0.35,

        fill: true

      }]

    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          labels: {

            color: "#e2e8f0"

          }

        }

      },

      scales: {

        x: {

          ticks: {

            color: "#94a3b8"

          }

        },

        y: {

          ticks: {

            color: "#94a3b8"

          }

        }

      }

    }

  });

}

/* =====================================================
   SP
===================================================== */

async function getSP(uid) {

  const snap =
    await getDoc(doc(db, "usuarios", uid));

  return snap.data()?.sciencePoints || 0;

}

async function removerSP(uid, valor) {

  await updateDoc(
    doc(db, "usuarios", uid),
    {
      sciencePoints: increment(-valor)
    }
  );

}

/* =====================================================
   TRAVAMENTO
===================================================== */

const dataLimite =
  new Date("2026-06-11");

if (new Date() > dataLimite) {

  const btn =
    document.getElementById("btnApostar");

  if (btn) {

    btn.disabled = true;

    btn.innerText =
      "⛔ Bolão encerrado";

  }

}