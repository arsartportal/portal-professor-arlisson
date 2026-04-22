/* =========================================
🔥 IMPORTS FIREBASE
========================================= */
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { db, auth } from "../js/firebase.js";
import { obterPatentePorNivel } from "../js/patentes.js";


/* =========================================
📌 ELEMENTOS DOM
========================================= */
const lista = document.getElementById("ranking-lista");
const tabs = document.querySelectorAll(".tab");


/* =========================================
📊 ESTADO GLOBAL
========================================= */
let tipoRanking = "geral";
let usuario = null;
let professoresMap = {};
let rankingAnterior = {};
let rankingSemanal = {};


/* =========================================
🎯 EVENTO DAS TABS
========================================= */
tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    tipoRanking = tab.dataset.tab;

    carregarRanking();
  });

});


/* =========================================
👤 CARREGAR USUÁRIO LOGADO
========================================= */
async function carregarUsuario(){

  if(!auth.currentUser){
    console.warn("Usuário não logado");
    return;
  }

  const ref = doc(db, "usuarios", auth.currentUser.uid);
  const snap = await getDoc(ref);

  if(snap.exists()){
    usuario = snap.data();
  }

}


/* =========================================
👨‍🏫 CARREGAR PROFESSORES
========================================= */
async function carregarProfessores(){

  professoresMap = {};

  const snapshot = await getDocs(
    query(
      collection(db, "usuarios"),
      where("tipo", "==", "professor")
    )
  );

  snapshot.forEach(docSnap => {
    professoresMap[docSnap.id] = docSnap.data().nome;
  });

}


/* =========================================
🧹 LIMPAR TOP 3
========================================= */
function limparTop3(){
  document.getElementById("top1-nome").textContent = "---";
  document.getElementById("top1-xp").textContent = "";

  document.getElementById("top2-nome").textContent = "---";
  document.getElementById("top2-xp").textContent = "";

  document.getElementById("top3-nome").textContent = "---";
  document.getElementById("top3-xp").textContent = "";
}


function obterMovimento(posAtual, posAnterior){

  if(posAnterior == null){
    return `<span class="movimento neutro">🆕</span>`;
  }

  const diferenca = posAnterior - posAtual;

  if(diferenca > 0){
    return `
      <span class="movimento subiu">
        ▲ +${diferenca}
      </span>
    `;
  }

  if(diferenca < 0){
    return `
      <span class="movimento desceu">
        ▼ ${Math.abs(diferenca)}
      </span>
    `;
  }

  return `<span class="movimento neutro">▬ 0</span>`;
}

async function carregarHistoricoRanking(){

  const ref = doc(db, "config", "rankingSnapshots");
  const snap = await getDoc(ref);

  if(snap.exists()){
    rankingAnterior = snap.data().ultimo || {};
    rankingSemanal = snap.data().semanal || {};
  }

}

async function salvarSnapshotRanking(listaOrdenada){

  const agora = new Date();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();

  const horariosPermitidos = [0, 6, 12, 18];

  if(!horariosPermitidos.includes(hora) || minuto > 10){
    return;
  }

  const snapshotAtual = {};

  listaOrdenada.forEach((aluno, index) => {
    snapshotAtual[aluno.id] = index + 1;
  });

  const ref = doc(db, "config", "rankingSnapshots");

  await setDoc(ref, {
    ultimo: snapshotAtual,
    atualizadoEm: new Date().toISOString(),
    semanal: rankingSemanal
  }, { merge: true });
}

async function validarAcessoRanking(){

  if(!auth.currentUser) return false;

  const ref = doc(db, "usuarios", auth.currentUser.uid);
  const snap = await getDoc(ref);

  if(!snap.exists()) return false;

  const dados = snap.data();

  const fichas = dados.rankingFichas || 0;

  const liberadoAte = dados.rankingLiberadoAte
    ? new Date(dados.rankingLiberadoAte)
    : null;

  const agora = new Date();

  // ainda está dentro dos 10 minutos
  if(liberadoAte && liberadoAte > agora){

    mostrarStatusFichas(fichas);
    return true;
  }

  // sem fichas
  if(fichas <= 0){

    document.querySelector(".ranking-container").innerHTML = `
      <div class="sem-fichas-card">
        <div class="sem-fichas-icone">🎟️</div>

        <h2>Você não possui fichas de ranking</h2>

        <p>
          Compre fichas na loja para acessar novamente o ranking.
        </p>

        <a href="/loja.html" class="btn-comprar-fichas">
          Ir para a Central de Recompensas
        </a>
      </div>
    `;

    return false;
  }

  return await abrirConfirmacaoFicha(fichas, ref);
}

function mostrarStatusFichas(fichas){

  if(document.querySelector(".ranking-fichas-status")){
    return;
  }

  const ref = doc(db, "usuarios", auth.currentUser.uid);

  const div = document.createElement("div");
  div.className = "ranking-fichas-status";

  div.innerHTML = `
    <div class="ranking-fichas-chip">
      🎟️ ${fichas} ficha${fichas === 1 ? "" : "s"} restante${fichas === 1 ? "" : "s"}
    </div>

    <div class="ranking-fichas-chip ranking-fichas-tempo">
      🔓 Nova ficha será necessária em
      <span id="contador-ficha">03:00</span>
    </div>
  `;

  const header = document.querySelector(".ranking-header");
  header.insertAdjacentElement("afterend", div);

  async function atualizarContadorFicha(){

    const snap = await getDoc(ref);

    if(!snap.exists()) return;

    const dados = snap.data();

    if(!dados.rankingLiberadoAte) return;

    const fim = new Date(dados.rankingLiberadoAte);
    const agora = new Date();

    const diff = fim - agora;

    if(diff <= 0){

  clearInterval(intervaloFicha);

  document.querySelector(".ranking-container").innerHTML = `
    <div class="confirmacao-ficha-card expirada">

      <div class="confirmacao-ficha-topo">
        <div class="confirmacao-ficha-icone">⌛</div>

        <div>
          <h1>Acesso ao ranking expirou</h1>

          <p>
            Seu tempo de acesso terminou.
            Deseja utilizar outra ficha para continuar?
          </p>
        </div>
      </div>

      <div class="confirmacao-ficha-botoes">

        <button id="btn-usar-outra-ficha" class="btn-usar-ficha">
          Usar outra ficha
        </button>

        <button id="btn-sair-ranking" class="btn-voltar-ranking">
          Sair
        </button>

      </div>

    </div>
  `;

  document.getElementById("btn-usar-outra-ficha")
    .addEventListener("click", async () => {

      const snapNovo = await getDoc(ref);

      if(!snapNovo.exists()){
        location.reload();
        return;
      }

      const dados = snapNovo.data();
      const fichasRestantes = dados.rankingFichas || 0;

      if(fichasRestantes <= 0){

        document.querySelector(".confirmacao-ficha-card").innerHTML = `
          <div class="sem-fichas-icone">🎟️</div>

          <h2>Você ficou sem fichas</h2>

          <p>
            Compre novas fichas para continuar acessando o ranking.
          </p>

          <a href="/loja.html" class="btn-comprar-fichas">
            Ir para a Central de Recompensas
          </a>
        `;

        return;
      }

      const novoLiberadoAte = new Date(
        Date.now() + 3 * 60 * 1000
      );

      await updateDoc(ref, {
        rankingFichas: fichasRestantes - 1,
        rankingLiberadoAte: novoLiberadoAte.toISOString()
      });

      location.reload();
    });

  document.getElementById("btn-sair-ranking")
    .addEventListener("click", () => {
      window.history.back();
    });

  return;
}

    const minutos = Math.floor(diff / 1000 / 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("contador-ficha").textContent =
      `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;
  }

  atualizarContadorFicha();
const intervaloFicha = setInterval(atualizarContadorFicha, 1000);
}

async function abrirConfirmacaoFicha(fichas, refUsuario){

  return new Promise((resolve) => {

    document.querySelector(".ranking-container").innerHTML = `
      <div class="confirmacao-ficha-card">

        <div class="confirmacao-ficha-topo">
          <div class="confirmacao-ficha-icone">🏆</div>

          <div>
            <h1>Entrar no Ranking</h1>

            <p>
              Você possui <strong>${fichas}</strong>
              ficha${fichas === 1 ? "" : "s"} disponível${fichas === 1 ? "" : "is"}.
            </p>
          </div>
        </div>

        <div class="confirmacao-ficha-regras">

          <div class="regra-item">
            <span>🎟️</span>
            <p>Cada acesso ao ranking consome 1 ficha.</p>
          </div>

          <div class="regra-item">
            <span>⏱️</span>
            <p>O usuário permanece com acesso liberado por 3 minutos.</p>
          </div>

          <div class="regra-item">
            <span>🔄</span>
            <p>Dentro desses 3 minutos você pode trocar abas e atualizar a página sem gastar outra ficha.</p>
          </div>

          <div class="regra-item">
            <span>⌛</span>
            <p>Após 3 minutos, ao abrir novamente o ranking, será consumida mais 1 ficha.</p>
          </div>

        </div>

        <div class="confirmacao-ficha-botoes">

          <button id="btn-usar-ficha" class="btn-usar-ficha">
            Usar 1 ficha
          </button>

          <button id="btn-voltar-ranking" class="btn-voltar-ranking">
            Voltar
          </button>

        </div>

      </div>
    `;

    document.getElementById("btn-usar-ficha")
      .addEventListener("click", async () => {

        const agora = new Date();

        const liberadoAte = new Date(
          agora.getTime() + 3 * 60 * 1000
        );

        await updateDoc(refUsuario, {
          rankingFichas: fichas - 1,
          rankingLiberadoAte: liberadoAte.toISOString()
        });

        location.reload();
      });

    document.getElementById("btn-voltar-ranking")
      .addEventListener("click", () => {
        window.history.back();
        resolve(false);
      });

  });
}



function carregarRanking(){

  
  limparTop3();

  const listaProfessores = document.getElementById("lista-professores");
  const listaEscolas = document.getElementById("lista-escolas");
  const listaSeries = document.getElementById("lista-series");

  // 🔥 esconde tudo por padrão
listaProfessores.style.display = "none";
listaProfessores.innerHTML = "";

listaEscolas.style.display = "none";
listaEscolas.innerHTML = "";

listaSeries.style.display = "none";
listaSeries.innerHTML = "";

const listaTurmas = document.getElementById("lista-turmas");
listaTurmas.style.display = "none";
listaTurmas.innerHTML = "";

// remove a flag do body para esconder a aba de turma
document.body.classList.remove("mostrando-turmas");

  let q;

  /* =========================================
  🏆 RANKING GERAL
  ========================================= */
  if(tipoRanking === "geral"){

q = query(
  collection(db,"usuarios"),
  where("tipo","==","aluno"),
  orderBy("nivel","desc"),
  orderBy("xp","desc"),
  limit(50)
);

  }

  /* =========================================
  👨‍🏫 RANKING POR PROFESSOR
  ========================================= */
  if(tipoRanking === "professor"){

    listaProfessores.style.display = "flex";

    carregarRankingPorProfessor();
    return;
  }

  
  /* =========================================
🧑‍🤝‍🧑 ABA TURMA (FUNIL DE 3 NÍVEIS)
Escola → Série → Turma
========================================= */
if(tipoRanking === "turma"){

  document.getElementById("lista-escolas").style.display = "flex";
  document.getElementById("lista-series").style.display = "flex";
  document.getElementById("lista-turmas").style.display = "flex";

  carregarRankingPorTurma();
  return;
}

  /* =========================================
  🔄 LISTENER EM TEMPO REAL
  ========================================= */
  
(async () => {

  await carregarHistoricoRanking();

  const snapshot = await getDocs(q);

  lista.innerHTML = "";

  const alunosOrdenados = [];

  snapshot.forEach(docSnap => {

    alunosOrdenados.push({
      id: docSnap.id,
      ...docSnap.data()
    });

  });

  alunosOrdenados.forEach((aluno, index) => {

    const posicaoAtual = index + 1;
    const patente = obterPatentePorNivel(aluno.nivel);

    const nomeProfessor =
      professoresMap[aluno.professorId] || "Sem professor";

    if(posicaoAtual === 1) top1(aluno);
    if(posicaoAtual === 2) top2(aluno);
    if(posicaoAtual === 3) top3(aluno);

    const movimento = obterMovimento(
      posicaoAtual,
      rankingAnterior[aluno.id]
    );

    const div = document.createElement("div");
    div.className = "ranking-item";

    if(posicaoAtual <= 10){
      div.classList.add("top10");
    }

    if(aluno.id === auth.currentUser?.uid){
      div.style.border = "2px solid #22c55e";
    }

    div.innerHTML = `
      <span class="ranking-pos">#${posicaoAtual}</span>

      <div class="ranking-posicao-wrapper">
        ${movimento}
      </div>

      <img src="${patente.imagem}" class="ranking-patente">

      <span class="ranking-nome">
        <strong>${aluno.nome}</strong>

        <small class="info-linha">
          ⭐ Lv ${aluno.nivel}
        </small>

        <small class="professor">
          👨‍🏫 ${nomeProfessor}
        </small>

        <small class="aluno-info">
          🏫 ${formatarEscola(aluno.escola)}
          • 📚 ${formatarSerie(aluno.serie)}
          • 👥 ${aluno.turma || "-"}
        </small>
      </span>

      <span class="ranking-xp">${aluno.xp} XP</span>
    `;

    lista.appendChild(div);

  });

  atualizarPainelMinhaPosicao(alunosOrdenados);

  await salvarSnapshotRanking(alunosOrdenados);

})();
}

async function carregarRankingPorProfessor(){

  limparTop3();

  const listaProfessores = document.getElementById("lista-professores");

  lista.innerHTML = "";
  listaProfessores.innerHTML = "";

  const snapshotProfessores = await getDocs(
    query(
      collection(db, "usuarios"),
      where("tipo", "==", "professor")
    )
  );

  const professores = [];

  snapshotProfessores.forEach(docSnap => {

    professores.push({
      id: docSnap.id,
      nome: docSnap.data().nome
    });

  });

  professores.forEach((professor, index) => {

    const botao = document.createElement("button");
    botao.className = "tab-prof";
    botao.textContent = professor.nome;

    if(index === 0){
      botao.classList.add("active");
      carregarAlunosDoProfessor(professor.id, professor.nome);
    }

    botao.addEventListener("click", () => {

      document.querySelectorAll(".tab-prof")
        .forEach(btn => btn.classList.remove("active"));

      botao.classList.add("active");

      carregarAlunosDoProfessor(professor.id, professor.nome);

    });

    listaProfessores.appendChild(botao);

  });

}

async function carregarAlunosDoProfessor(professorId, nomeProfessor){

  lista.innerHTML = "";
  limparTop3();

  const snapshot = await getDocs(
    query(
      collection(db, "usuarios"),
      where("tipo", "==", "aluno"),
      where("professorId", "==", professorId),
      orderBy("nivel", "desc"),
      orderBy("xp", "desc"),
      limit(50)
    )
  );

  const alunos = [];

  snapshot.forEach(docSnap => {
    alunos.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  renderAlunosDoProfessor(professorId, nomeProfessor, alunos);
}

/* =========================================
🏫📚👥 CARREGAR FUNIL DA ABA TURMA
========================================= */
async function carregarRankingPorTurma(){

  limparTop3();
  lista.innerHTML = "";

  const listaEscolas = document.getElementById("lista-escolas");
  const listaSeries = document.getElementById("lista-series");
  const listaTurmas = document.getElementById("lista-turmas");

  listaEscolas.innerHTML = "";
  listaSeries.innerHTML = "";
  listaTurmas.innerHTML = "";

  const snapshot = await getDocs(collection(db, "usuarios"));

  const alunos = [];

  snapshot.forEach(docSnap => {

    const dados = docSnap.data();

    if(dados.tipo !== "aluno") return;

    alunos.push({
      id: docSnap.id,
      ...dados
    });

  });

  // escolas únicas
  const escolas = [
    ...new Set(
      alunos
        .map(a => a.escola)
        .filter(Boolean)
    )
  ];

  escolas.forEach((escola, index) => {

    const btn = document.createElement("button");
    btn.className = "tab-escola";
    btn.textContent = formatarEscola(escola);

    btn.addEventListener("click", () => {

      document.querySelectorAll("#lista-escolas .tab-escola")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      // 🔥 ao clicar na escola, mostra ranking da escola inteira
      renderRankingFiltrado(
        alunos.filter(a => a.escola === escola)
      );

      carregarSeriesDaEscola(escola, alunos);

    });

    listaEscolas.appendChild(btn);

    // primeira escola já abre automaticamente
    if(index === 0){
      btn.click();
    }

  });

}

/* =========================================
📚 CARREGAR SÉRIES DA ESCOLA
========================================= */
function carregarSeriesDaEscola(escola, alunos){

  const listaSeries = document.getElementById("lista-series");
  const listaTurmas = document.getElementById("lista-turmas");

  listaSeries.innerHTML = "";
  listaTurmas.innerHTML = "";

  const series = [
  ...new Set(
    alunos
      .filter(a => a.escola === escola)
      .map(a => a.serie)
      .filter(Boolean)
  )
];

const ordemSeries = ["1ano", "2ano", "3ano", "eja"];

series.sort((a, b) => {
  return ordemSeries.indexOf(a) - ordemSeries.indexOf(b);
});

series.forEach((serie, index) => {

    const btn = document.createElement("button");
    btn.className = "tab-serie";
    btn.textContent = formatarSerie(serie);

    btn.addEventListener("click", () => {

      document.querySelectorAll(".tab-serie")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      // 🔥 ao clicar na série, mostra ranking da série
      renderRankingFiltrado(
        alunos.filter(a =>
          a.escola === escola &&
          a.serie === serie
        )
      );

      carregarTurmasDaSerie(escola, serie, alunos);

    });

    listaSeries.appendChild(btn);

    // primeira série abre automaticamente
    if(index === 0){
      btn.click();
    }

  });

}

/* =========================================
👥 CARREGAR TURMAS DA SÉRIE
========================================= */
function carregarTurmasDaSerie(escola, serie, alunos){

  const listaTurmas = document.getElementById("lista-turmas");
  listaTurmas.innerHTML = "";

  const turmas = [
    ...new Set(
      alunos
        .filter(a =>
          a.escola === escola &&
          a.serie === serie
        )
        .map(a => a.turma)
        .filter(Boolean)
    )
  ];

  turmas.sort().forEach(turma => {

    const btn = document.createElement("button");
    btn.className = "tab-turma";
    btn.textContent = `Turma ${turma}`;

    btn.addEventListener("click", () => {

      document.querySelectorAll(".tab-turma")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      // 🔥 ao clicar na turma, mostra ranking da turma
      renderRankingFiltrado(
        alunos.filter(a =>
          a.escola === escola &&
          a.serie === serie &&
          a.turma === turma
        )
      );

    });

    listaTurmas.appendChild(btn);

  });

}

/* =========================================
📊 RENDERIZA QUALQUER LISTA FILTRADA
Serve para escola, série ou turma
========================================= */
function renderRankingFiltrado(alunosFiltrados){

  lista.innerHTML = "";
  limparTop3();

  alunosFiltrados
    .sort((a, b) => {

      if(b.nivel !== a.nivel){
        return b.nivel - a.nivel;
      }

      return b.xp - a.xp;
    })
    .slice(0, 50)
    .forEach((aluno, index) => {

      const pos = index + 1;

      const patente = obterPatentePorNivel(aluno.nivel);
      const nomeProfessor =
        professoresMap[aluno.professorId] || "Sem professor";

      const movimento = obterMovimento(
        pos,
        rankingAnterior[aluno.id]
      );

      if(pos === 1) top1(aluno);
      if(pos === 2) top2(aluno);
      if(pos === 3) top3(aluno);

      const div = document.createElement("div");
      div.className = "ranking-item";

      if(pos <= 10){
        div.classList.add("top10");
      }

      if(aluno.id === auth.currentUser?.uid){
        div.style.border = "2px solid #22c55e";
      }

      div.innerHTML = `
        <span class="ranking-pos">#${pos}</span>

        <div class="ranking-posicao-wrapper">
          ${movimento}
        </div>

        <img src="${patente.imagem}" class="ranking-patente">

        <span class="ranking-nome">
          <strong>${aluno.nome}</strong>

          <small class="info-linha">
            ⭐ Lv ${aluno.nivel}
          </small>

          <small class="professor">
            👨‍🏫 ${nomeProfessor}
          </small>

          <small class="aluno-info">
            🏫 ${formatarEscola(aluno.escola)}
            • 📚 ${formatarSerie(aluno.serie)}
            • 👥 ${aluno.turma || "-"}
          </small>
        </span>

        <span class="ranking-xp">${aluno.xp} XP</span>
      `;

      lista.appendChild(div);

    });

}


function renderAlunosDoProfessor(professorId, nomeProfessor, alunos){

  lista.innerHTML = "";
  limparTop3();

  const filtrados = alunos;

  filtrados.forEach((aluno, index) => {

    const pos = index + 1;
    const patente = obterPatentePorNivel(aluno.nivel);

    const movimento = obterMovimento(
      pos,
      rankingAnterior[aluno.id]
    );

    if(pos === 1) top1(aluno);
    if(pos === 2) top2(aluno);
    if(pos === 3) top3(aluno);

    const div = document.createElement("div");
    div.className = "ranking-item";

    if(pos <= 10){
      div.classList.add("top10");
    }

    if(aluno.id === auth.currentUser?.uid){
      div.style.border = "2px solid #22c55e";
    }

    div.innerHTML = `
      <span class="ranking-pos">#${pos}</span>

      <div class="ranking-posicao-wrapper">
        ${movimento}
      </div>

      <img src="${patente.imagem}" class="ranking-patente">

      <span class="ranking-nome">
        <strong>${aluno.nome}</strong>

        <small class="info-linha">
          ⭐ Lv ${aluno.nivel}
        </small>

        <small class="professor">
          👨‍🏫 ${nomeProfessor}
        </small>

        <small class="aluno-info">
          🏫 ${formatarEscola(aluno.escola)}
          • 📚 ${formatarSerie(aluno.serie)}
          • 👥 ${aluno.turma || "-"}
        </small>
      </span>

      <span class="ranking-xp">${aluno.xp} XP</span>
    `;

    lista.appendChild(div);

  });

}

/* =========================================
🥇 TOP 3
========================================= */
function top1(a){
  const patente = obterPatentePorNivel(a.nivel);

  document.getElementById("top1-nome").innerHTML = `
    <img src="${patente.imagem}" class="ranking-patente">
    ${a.nome}
  `;

  document.getElementById("top1-xp").textContent =
    `Lv ${a.nivel} • ${a.xp} XP`;
}

function top2(a){
  const patente = obterPatentePorNivel(a.nivel);

  document.getElementById("top2-nome").innerHTML = `
    <img src="${patente.imagem}" class="ranking-patente">
    ${a.nome}
  `;

  document.getElementById("top2-xp").textContent =
    `Lv ${a.nivel} • ${a.xp} XP`;
}

function top3(a){
  const patente = obterPatentePorNivel(a.nivel);

  document.getElementById("top3-nome").innerHTML = `
    <img src="${patente.imagem}" class="ranking-patente">
    ${a.nome}
  `;

  document.getElementById("top3-xp").textContent =
    `Lv ${a.nivel} • ${a.xp} XP`;
}


function atualizarPainelMinhaPosicao(alunos){

  if(!usuario || !auth.currentUser) return;

  const uid = auth.currentUser.uid;

  const geral = [...alunos];

  const todosEscola = geral.filter(a => a.escola === usuario.escola);
  const todosSerie = geral.filter(a => a.serie === usuario.serie);
  const todosTurma = geral.filter(a =>
    a.escola === usuario.escola &&
    a.serie === usuario.serie &&
    a.turma === usuario.turma
  );

  const posGeral = geral.findIndex(a => a.id === uid) + 1;
  const posEscola = todosEscola.findIndex(a => a.id === uid) + 1;
  const posSerie = todosSerie.findIndex(a => a.id === uid) + 1;
  const posTurma = todosTurma.findIndex(a => a.id === uid) + 1;

  const posSemanaAnterior = rankingSemanal[uid] || posGeral;
  const diferencaSemana = posSemanaAnterior - posGeral;

  let textoSemana = "permaneceu na mesma posição";

  if(diferencaSemana > 0){
    textoSemana = `subiu ${diferencaSemana} posições`;
  }

  if(diferencaSemana < 0){
    textoSemana = `desceu ${Math.abs(diferencaSemana)} posições`;
  }

  document.getElementById("minha-posicao").innerHTML = `
    <div class="card-minha-posicao">
      <h3>📊 Sua posição</h3>

      <p>Sua posição no ranking geral é: <strong>${posGeral}</strong></p>
      <p>Sua posição no ranking da sua escola é: <strong>${posEscola}</strong></p>
      <p>Sua posição no ranking da sua série é: <strong>${posSerie}</strong></p>
      <p>Sua posição na sua turma é: <strong>${posTurma}</strong></p>

      <p class="ultima-semana">
        Na última semana você ${textoSemana}.
      </p>
    </div>
  `;
}

function iniciarContadorRanking(){

  const horarios = [0, 6, 12, 18];

  function atualizar(){

    const agora = new Date();

    let proximo = new Date();

    for(const hora of horarios){

      proximo = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate(),
        hora,
        0,
        0
      );

      if(proximo > agora){
        break;
      }
    }

    // se já passou das 18h, próxima é 00h do outro dia
    if(proximo <= agora){
      proximo = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate() + 1,
        0,
        0,
        0
      );
    }

    const diff = proximo - agora;

    const horas = Math.floor(diff / 1000 / 60 / 60);
    const minutos = Math.floor((diff / 1000 / 60) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("contador-ranking").textContent =
      `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  }

  atualizar();
  setInterval(atualizar, 1000);
}

/* =========================================
🚀 INIT
========================================= */
auth.onAuthStateChanged(async (user) => {

  if(!user){
    console.warn("Usuário não logado");
    return;
  }

  const podeEntrar = await validarAcessoRanking();

  if(!podeEntrar){
    return;
  }

  await carregarUsuario();
  await carregarProfessores();

  carregarRanking();
  iniciarContadorRanking();

});

function formatarEscola(escola){

  const escolas = {
    "maria-geny": "Maria Geny",
    "boto-de-menezes": "Boto de Menezes",
    "audiocomunicacao": "Audiocomunicação"
  };

  return escolas[escola] || escola || "Sem escola";
}

function formatarSerie(serie){

  const series = {
    "1ano": "1ª Série",
    "2ano": "2ª Série",
    "3ano": "3ª Série",
    "eja": "EJA",
    "reforco": "Reforço"
  };

  return series[serie] || serie || "-";
}
