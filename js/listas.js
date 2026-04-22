import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   DADOS DAS LISTAS
===================================================== */
const listas = [
  {
    id: 1,
    titulo: "Função Afim",
    descricao: "Lista introdutória sobre função do 1º grau, coeficientes, raiz e interpretação gráfica.",
    disciplina: "matematica",
    status: "nao-iniciada",
    dificuldade: "facil",
    serie: "1ano",
    questoes: 10,
    xp: 20,
    progresso: 0
  },
  {
    id: 2,
    titulo: "Função Quadrática",
    descricao: "Pratique concavidade, vértice, raízes e leitura do gráfico da parábola.",
    disciplina: "matematica",
    status: "nao-iniciada",
    dificuldade: "media",
    serie: "1ano",
    questoes: 10,
    xp: 25,
    progresso: 0
  },
  {
    id: 3,
    titulo: "Função Exponencial",
    descricao: "Exercícios sobre crescimento, decrescimento e propriedades da função exponencial.",
    disciplina: "matematica",
    status: "nao-iniciada",
    dificuldade: "media",
    serie: "1ano",
    questoes: 10,
    xp: 25,
    progresso: 0
  },
  {
    id: 4,
    titulo: "Função Logarítmica",
    descricao: "Revisão de definição, propriedades dos logaritmos e resolução de problemas.",
    disciplina: "matematica",
    status: "nao-iniciada",
    dificuldade: "dificil",
    serie: "1ano",
    questoes: 10,
    xp: 30,
    progresso: 0
  },
  {
    id: 5,
    titulo: "Grandezas Físicas",
    descricao: "Conceitos fundamentais de física: grandezas escalares, vetoriais e unidades.",
    disciplina: "fisica",
    status: "nao-iniciada",
    dificuldade: "facil",
    serie: "1ano",
    questoes: 10,
    xp: 20,
    progresso: 0
  },
  {
    id: 6,
    titulo: "Notação Científica e Ordem de Grandeza",
    descricao: "Treino com escrita científica, operações e análise de ordem de grandeza.",
    disciplina: "fisica",
    status: "nao-iniciada",
    dificuldade: "media",
    serie: "1ano",
    questoes: 10,
    xp: 25,
    progresso: 0
  }
];

/* =====================================================
   ROTAS DAS LISTAS
===================================================== */
const rotasListas = {
  1: "./lista-de-exercicios-funcao-afim.html",
  2: "./lista-de-exercicios-funcao-quadratica.html",
  3: "./lista-de-exercicios-funcao-exponencial.html",
  4: "./lista-de-exercicios-funcao-logaritmica.html",
  5: "./lista-de-exercicios-grandezas-fisicas.html",
  6: "./lista-de-exercicios-notacao-cientifica-ordem-grandeza.html"
};

/* =====================================================
   ESTADO
===================================================== */
const filtros = {
  busca: "",
  disciplina: "",
  status: "",
  dificuldade: "",
  serie: ""
};

let listasComProgresso = [...listas];

/* =====================================================
   HELPERS
===================================================== */
function capitalizar(texto = "") {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function traduzirDisciplina(valor) {
  const mapa = {
    matematica: "Matemática",
    fisica: "Física"
  };
  return mapa[valor] || valor;
}

function traduzirDificuldade(valor) {
  const mapa = {
    facil: "Fácil",
    media: "Média",
    dificil: "Difícil"
  };
  return mapa[valor] || valor;
}

function traduzirSerie(valor) {
  const mapa = {
    "1ano": "1º ano",
    "2ano": "2º ano",
    "3ano": "3º ano",
    "eja": "EJA"
  };
  return mapa[valor] || valor;
}

function traduzirStatus(valor) {
  const mapa = {
    "nao-iniciada": "Não iniciada",
    "em-andamento": "Em andamento",
    "concluida": "Concluída"
  };
  return mapa[valor] || valor;
}

function obterClasseStatus(status) {
  const mapa = {
    "nao-iniciada": "status-nao-iniciada",
    "em-andamento": "status-em-andamento",
    "concluida": "status-concluida"
  };
  return mapa[status] || "";
}

/* =====================================================
   FIRESTORE
===================================================== */
async function carregarProgressosDoAluno(uid) {
  const ref = collection(db, "usuarios", uid, "progresso_listas");
  const snap = await getDocs(ref);

  const mapa = {};

  snap.forEach((docSnap) => {
    const dados = docSnap.data();
    mapa[dados.listaId] = dados;
  });

  return mapa;
}

function aplicarProgressos(progressosMap) {
  listasComProgresso = listas.map((lista) => {
    const progressoSalvo = progressosMap[lista.id];

    if (!progressoSalvo) {
      return {
        ...lista,
        progresso: 0,
        status: "nao-iniciada",
        respondidas: 0,
        acertos: 0,
        erros: 0
      };
    }

    return {
      ...lista,
      progresso: progressoSalvo.progresso ?? 0,
      status: progressoSalvo.status || "nao-iniciada",
      respondidas: progressoSalvo.respondidas ?? 0,
      acertos: progressoSalvo.acertos ?? 0,
      erros: progressoSalvo.erros ?? 0
    };
  });
}

/* =====================================================
   FILTRO
===================================================== */
function filtrarListas() {
  return listasComProgresso.filter((lista) => {
    const textoBusca = `${lista.titulo} ${lista.descricao} ${lista.disciplina}`.toLowerCase();

    const passouBusca = !filtros.busca || textoBusca.includes(filtros.busca);
    const passouDisciplina = !filtros.disciplina || lista.disciplina === filtros.disciplina;
    const passouStatus = !filtros.status || lista.status === filtros.status;
    const passouDificuldade = !filtros.dificuldade || lista.dificuldade === filtros.dificuldade;
    const passouSerie = !filtros.serie || lista.serie === filtros.serie;

    return (
      passouBusca &&
      passouDisciplina &&
      passouStatus &&
      passouDificuldade &&
      passouSerie
    );
  });
}

/* =====================================================
   TOPO / RESUMO
===================================================== */
function atualizarResumoGeral() {
  const totalListas = listasComProgresso.length;
  const totalConcluidas = listasComProgresso.filter(lista => lista.status === "concluida").length;
  const totalAndamento = listasComProgresso.filter(lista => lista.status === "em-andamento").length;
  const totalNaoIniciadas = listasComProgresso.filter(lista => lista.status === "nao-iniciada").length;
  const totalQuestoes = listasComProgresso.reduce((acc, lista) => acc + (lista.questoes || 0), 0);
  const totalXpDisponivel = listasComProgresso.reduce((acc, lista) => acc + (lista.xp || 0), 0);
  const xpTotal = listasComProgresso
    .filter(lista => lista.status === "concluida")
    .reduce((acc, lista) => acc + (lista.xp || 0), 0);

  document.getElementById("totalListas").textContent = totalListas;
  document.getElementById("totalConcluidas").textContent = totalConcluidas;
  document.getElementById("xpTotal").textContent = xpTotal;
  document.getElementById("totalAndamento").textContent = totalAndamento;
  document.getElementById("totalNaoIniciadas").textContent = totalNaoIniciadas;
  document.getElementById("totalQuestoes").textContent = totalQuestoes;
  document.getElementById("totalXpDisponivel").textContent = totalXpDisponivel;
}

function atualizarDestaque() {
  const listaDestaque =
    listasComProgresso.find(lista => lista.status === "em-andamento") ||
    listasComProgresso.find(lista => lista.status === "nao-iniciada") ||
    listasComProgresso[0];

  if (!listaDestaque) return;

  document.getElementById("tituloDestaque").textContent = listaDestaque.titulo;
  document.getElementById("descricaoDestaque").textContent = listaDestaque.descricao;
  document.getElementById("questoesDestaque").textContent = `${listaDestaque.questoes} questões`;
  document.getElementById("xpDestaque").textContent = `${listaDestaque.xp} XP`;
}

/* =====================================================
   RENDER
===================================================== */
function criarCard(lista) {
  return `
    <article class="card-lista">
      <div class="card-topo">
        <div>
          <span class="badge-disciplina">${traduzirDisciplina(lista.disciplina)}</span>
          <h3>${lista.titulo}</h3>
        </div>
        <span class="badge-status ${obterClasseStatus(lista.status)}">${traduzirStatus(lista.status)}</span>
      </div>

      <p class="card-descricao">${lista.descricao}</p>

      <div class="card-meta">
        <span>🎯 ${traduzirDificuldade(lista.dificuldade)}</span>
        <span>🏫 ${traduzirSerie(lista.serie)}</span>
        <span>📝 ${lista.questoes} questões</span>
        <span>⭐ ${lista.xp} XP</span>
      </div>

      <div class="card-progresso">
        <div class="card-progresso-topo">
          <span>Progresso</span>
          <strong>${lista.progresso || 0}%</strong>
        </div>

        <div class="progresso-barra">
          <div class="progresso-barra-fill" style="width: ${lista.progresso || 0}%"></div>
        </div>

        <div class="card-progresso-info">
          <span>Respondidas: ${lista.respondidas ?? 0}/${lista.questoes}</span>
          <span>Acertos: ${lista.acertos ?? 0}</span>
          <span>Erros finais: ${lista.erros ?? 0}</span>
        </div>
      </div>

      <div class="card-acoes">
        <button class="btn-abrir-lista" data-id="${lista.id}" type="button">
          Abrir lista
        </button>
      </div>
    </article>
  `;
}

function renderizarListas() {
  const grid = document.getElementById("gridListas");
  const estadoVazio = document.getElementById("estadoVazio");
  const contadorResultados = document.getElementById("contadorResultados");

  const listasFiltradas = filtrarListas();

  contadorResultados.textContent = `${listasFiltradas.length} lista${listasFiltradas.length !== 1 ? "s" : ""} encontrada${listasFiltradas.length !== 1 ? "s" : ""}`;

  if (!listasFiltradas.length) {
    grid.innerHTML = "";
    estadoVazio.classList.remove("oculto");
    return;
  }

  estadoVazio.classList.add("oculto");
  grid.innerHTML = listasFiltradas.map(criarCard).join("");
  ativarBotoesAbrir();
}

/* =====================================================
   AÇÕES
===================================================== */
function ativarBotoesAbrir() {
  const botoes = document.querySelectorAll(".btn-abrir-lista");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.id);
      const rota = rotasListas[id];

      if (rota) {
        window.location.href = rota;
      }
    });
  });
}

/* =====================================================
   FILTROS UI
===================================================== */
function configurarBusca() {
  const inputBusca = document.getElementById("buscaLista");

  inputBusca.addEventListener("input", (event) => {
    filtros.busca = event.target.value.trim().toLowerCase();
    renderizarListas();
  });
}

function configurarCustomSelects() {
  const selects = document.querySelectorAll(".custom-select");

  selects.forEach((select) => {
    const trigger = select.querySelector(".custom-select-trigger");
    const valueEl = select.querySelector(".custom-select-value");
    const opcoes = select.querySelectorAll(".custom-option");
    const filterKey = select.dataset.filter;

    trigger.addEventListener("click", () => {
      document.querySelectorAll(".custom-select").forEach((outro) => {
        if (outro !== select) outro.classList.remove("open");
      });

      select.classList.toggle("open");
    });

    opcoes.forEach((opcao) => {
      opcao.addEventListener("click", () => {
        opcoes.forEach((item) => item.classList.remove("selected"));
        opcao.classList.add("selected");

        const valor = opcao.dataset.value;
        valueEl.textContent = opcao.textContent;

        filtros[filterKey] = valor;
        select.classList.remove("open");
        renderizarListas();
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select")) {
      document.querySelectorAll(".custom-select").forEach((select) => {
        select.classList.remove("open");
      });
    }
  });
}

function configurarBotaoLimpar() {
  const btnLimpar = document.getElementById("btnLimparFiltros");
  const inputBusca = document.getElementById("buscaLista");

  btnLimpar.addEventListener("click", () => {
    filtros.busca = "";
    filtros.disciplina = "";
    filtros.status = "";
    filtros.dificuldade = "";
    filtros.serie = "";

    inputBusca.value = "";

    document.querySelectorAll(".custom-select").forEach((select) => {
      const opcoes = select.querySelectorAll(".custom-option");
      const valueEl = select.querySelector(".custom-select-value");
      const primeira = opcoes[0];

      opcoes.forEach((opcao) => opcao.classList.remove("selected"));
      primeira.classList.add("selected");
      valueEl.textContent = primeira.textContent;
      select.classList.remove("open");
    });

    renderizarListas();
  });
}

/* =====================================================
   INICIALIZAÇÃO
===================================================== */
async function iniciarPagina(uid) {
  const progressosMap = await carregarProgressosDoAluno(uid);
  aplicarProgressos(progressosMap);
  atualizarResumoGeral();
  atualizarDestaque();
  renderizarListas();
}

function iniciarSemProgresso() {
  listasComProgresso = [...listas];
  atualizarResumoGeral();
  atualizarDestaque();
  renderizarListas();
}

document.addEventListener("DOMContentLoaded", () => {
  configurarBusca();
  configurarCustomSelects();
  configurarBotaoLimpar();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      iniciarSemProgresso();
      return;
    }

    try {
      await iniciarPagina(user.uid);
    } catch (error) {
      console.error("Erro ao carregar progresso das listas:", error);
      iniciarSemProgresso();
    }
  });
});