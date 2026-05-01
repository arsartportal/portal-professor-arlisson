/* =========================================================
📄 REFERÊNCIA
========================================================= */
const paginasContainer = document.getElementById("paginas");


/* =========================================================
📄 CRIAR PÁGINA
========================================================= */
function criarPagina(ehPrimeira = false) {

  const folha = document.createElement("div");
  folha.className = "folha";
  folha.style.backgroundImage = "url('bg1.png')";

  folha.innerHTML = `
    
    ${ehPrimeira ? `
    <div class="cabecalho">

      <div contenteditable="true" class="campo">
        <strong>Nome da escola aqui</strong>
      </div>

      <div class="linha-info">
        <span class="campo-label">Professor(a):</span>
        <span class="campo-valor" contenteditable="true">Arlisson Ferreira</span>

        <span class="campo-label">Disciplina:</span>
        <span class="campo-valor" contenteditable="true">Física</span>
      </div>

      <div class="linha-info aluno">
        <span class="campo-label">Aluno(a):</span>
        <span class="campo-valor" contenteditable="true"></span>

        <span class="campo-label">Série/Turma:</span>
        <span class="campo-valor" contenteditable="true"></span>

        <span class="campo-label">Data:</span>
        <span class="campo-valor" contenteditable="true"></span>
      </div>

      <h2 contenteditable="true" class="titulo">
        Lista de Exercícios
      </h2>

    </div>

    <hr>
    ` : ""}

    <div class="conteudo">
      ${ehPrimeira ? criarBlocoQuestao(1) : ""}
    </div>

    <div class="numero-pagina"></div>
  `;

  return folha;
}


/* =========================================================
🧱 TEMPLATE DE QUESTÃO (AGORA COM PLACEHOLDER)
========================================================= */
function criarBlocoQuestao(numero) {
  return `
    <div class="bloco">

      <div class="topo-questao">
        <strong class="titulo-questao">Questão ${numero} </strong>

        <button class="btn-remover" onclick="removerQuestao(this)">
          🗑
        </button>
      </div>

      <div class="enunciado" contenteditable="true" data-placeholder="Digite sua questão aqui..."></div>

    </div>
  `;
}


function removerQuestao(btn) {

  if (!confirm("Excluir essa questão?")) return;

  const bloco = btn.closest(".bloco");
  bloco.remove();

  renumerarQuestoes();
}

function renumerarQuestoes() {

  const questoes = document.querySelectorAll(".bloco");

  questoes.forEach((q, i) => {
    const titulo = q.querySelector(".titulo-questao");
    titulo.innerHTML = `Questão ${i + 1} `;
  });
}

/* =========================================================
🧹 COLAR SEM FORMATAÇÃO (ANTI-WORD BUG)
========================================================= */

document.addEventListener("paste", function (e) {

  const enunciado = e.target.closest(".enunciado");
  if (!enunciado) return;

  e.preventDefault();

  // 🔥 pega só texto puro
  const texto = (e.clipboardData || window.clipboardData).getData("text");

  // 🔥 insere como texto, sem HTML
  document.execCommand("insertText", false, texto);
});

/* =========================================================
✏️ FORMATAÇÃO + ATUALIZA BOTÕES
========================================================= */
function formatar(comando) {
  document.execCommand(comando, false, null);
  atualizarBotoes();
}


/* =========================================================
🎯 ATUALIZA TODOS OS BOTÕES
========================================================= */
function atualizarBotoes() {

  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const el = sel.anchorNode?.parentElement;
  if (!el || !el.closest(".enunciado")) return;

  const ids = [
    "btnLeft", "btnCenter", "btnRight", "btnJustify",
    "btnBold", "btnItalic", "btnUnderline"
  ];

  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove("ativo");
  });

  // alinhamento
  if (document.queryCommandState("justifyLeft"))
    document.getElementById("btnLeft")?.classList.add("ativo");

  if (document.queryCommandState("justifyCenter"))
    document.getElementById("btnCenter")?.classList.add("ativo");

  if (document.queryCommandState("justifyRight"))
    document.getElementById("btnRight")?.classList.add("ativo");

  if (document.queryCommandState("justifyFull"))
    document.getElementById("btnJustify")?.classList.add("ativo");

  // texto
  if (document.queryCommandState("bold"))
    document.getElementById("btnBold")?.classList.add("ativo");

  if (document.queryCommandState("italic"))
    document.getElementById("btnItalic")?.classList.add("ativo");

  if (document.queryCommandState("underline"))
    document.getElementById("btnUnderline")?.classList.add("ativo");
}

/* =========================================================
🚀 EVENTO GLOBAL (COLOCA AQUI)
========================================================= */
let debounceTimer;

document.addEventListener("selectionchange", () => {

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    atualizarBotoes();
  }, 80);

});

/* =========================================================
📊 INSERIR TABELA
========================================================= */
function inserirTabela() {

  const linhas = prompt("Quantas linhas?");
  const colunas = prompt("Quantas colunas?");

  if (!linhas || !colunas) return;

  let tabela = "<table>";

  for (let i = 0; i < linhas; i++) {
    tabela += "<tr>";

    for (let j = 0; j < colunas; j++) {
      tabela += "<td contenteditable='true'> </td>";
    }

    tabela += "</tr>";
  }

  tabela += "</table>";

  document.execCommand("insertHTML", false, tabela);
}




/* =========================================================
🎨 BACKGROUND
========================================================= */
function trocarBg(bg) {
  document.querySelectorAll(".folha").forEach(f => {
    f.style.backgroundImage = `url('${bg}')`;
  });
}


/* =========================================================
📄 PDF
========================================================= */
function gerarPDF() {

  document.body.classList.add("preview-mode");

  setTimeout(() => {
    html2pdf()
      .from(paginasContainer)
      .set({
        margin: 0,
        filename: 'lista-exercicios.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .save()
      .then(() => {
        document.body.classList.remove("preview-mode");
      });
  }, 300);
}


/* =========================================================
🖨️ IMPRIMIR
========================================================= */
function imprimir() {

  document.body.classList.add("preview-mode");

  setTimeout(() => {
    window.print();
    document.body.classList.remove("preview-mode");
  }, 300);
}


function salvar() {

  const nome = prompt("Nome da lista:");
  if (!nome) return;

  const paginas = document.querySelectorAll(".folha");
  const dados = [];

  paginas.forEach(p => {
    const html = p.innerHTML?.trim();
    if (!html) return;

    dados.push({
      html: html,
      bg: p.style.backgroundImage || "url('bg1.png')"
    });
  });

  let historico = JSON.parse(localStorage.getItem("listas") || "[]");

  historico.unshift({
    id: Date.now(),
    nome,
    paginas: dados,
    data: new Date().toLocaleString(),
    versao: "v7"
  });

  localStorage.setItem("listas", JSON.stringify(historico));

  alert("Salvo com sucesso!");
}

function abrirModalSalvar() {
  document.getElementById("modalSalvar").style.display = "block";
  document.getElementById("nomeListaInput").focus();
}

function confirmarSalvar() {

  const nome = document.getElementById("nomeListaInput").value.trim();

  if (!nome) {
    alert("Digite um nome!");
    return;
  }

  const paginas = document.querySelectorAll(".folha");
  const dados = [];

  paginas.forEach(p => {
    const html = p.innerHTML?.trim();
    if (!html) return;

    dados.push({
      html: html,
      bg: p.style.backgroundImage || "url('bg1.png')"
    });
  });

  let historico = JSON.parse(localStorage.getItem("listas") || "[]");

  historico.unshift({
    id: Date.now(),
    nome,
    paginas: dados,
    data: new Date().toLocaleString(),
    versao: "v7"
  });

  localStorage.setItem("listas", JSON.stringify(historico));

  fecharModalSalvar();

  alert("Salvo com sucesso!");
}

function fecharModalSalvar() {
  document.getElementById("modalSalvar").style.display = "none";
  document.getElementById("nomeListaInput").value = "";
}

function abrirHistorico() {

  const listas = JSON.parse(localStorage.getItem("listas") || "[]");
  const container = document.getElementById("listaHistorico");

  container.innerHTML = "";

  if (listas.length === 0) {
    container.innerHTML = "<p>Nenhuma lista salva.</p>";
  }

  listas.forEach(l => {

    container.innerHTML += `
      <div class="item-historico">
        <strong>${l.nome}</strong><br>
        <small>${l.data}</small><br>

        <button onclick="carregarLista(${l.id})">Abrir</button>
        <button onclick="excluirLista(${l.id})">Excluir</button>
      </div>
      <hr>
    `;
  });

  document.getElementById("modalHistorico").style.display = "block";
}

function carregarLista(id) {

  const listas = JSON.parse(localStorage.getItem("listas") || "[]");
  const lista = listas.find(l => l.id === id);

  if (!lista) return;

  const paginasContainer = document.getElementById("paginas");
  paginasContainer.innerHTML = "";

  lista.paginas.forEach(p => {

    const folha = document.createElement("div");
    folha.className = "folha";

    folha.style.backgroundImage = p.bg;
    folha.innerHTML = p.html;

    paginasContainer.appendChild(folha);
  });

  fecharHistorico();

  // 🔥 importante
  atualizarNumeracao?.();
  renumerarQuestoes?.();
}

function excluirLista(id) {

  let listas = JSON.parse(localStorage.getItem("listas") || "[]");

  if (!confirm("Excluir essa lista?")) return;

  listas = listas.filter(l => l.id !== id);

  localStorage.setItem("listas", JSON.stringify(listas));

  abrirHistorico();
}

function fecharHistorico() {
  document.getElementById("modalHistorico").style.display = "none";
}


/* =========================================================
👁️ PREVIEW
========================================================= */
let modoPreview = false;

function visualizar() {

  modoPreview = !modoPreview;

  const editaveis = document.querySelectorAll("[contenteditable='true']");
  const btn = document.getElementById("btnVisualizar");

  if (modoPreview) {

    document.body.classList.add("preview-mode");

    editaveis.forEach(el => {
      el.setAttribute("data-editavel", "true");
      el.setAttribute("contenteditable", "false");
    });

    btn.innerText = "✏️ Editar";

  } else {
    sairPreview();
  }
}

function sairPreview() {

  modoPreview = false;

  document.body.classList.remove("preview-mode");

  document.querySelectorAll("[data-editavel='true']").forEach(el => {
    el.setAttribute("contenteditable", "true");
    el.removeAttribute("data-editavel");
  });

  document.getElementById("btnVisualizar").innerText = "👁️ Visualizar";
}


/* =========================================================
🆕 NOVA LISTA
========================================================= */
function novaLista() {
  if (!confirm("Deseja criar nova lista?")) return;

  paginasContainer.innerHTML = "";
  paginasContainer.appendChild(criarPagina(true));

  atualizarNumeracao();
}


/* =========================================================
📂 CARREGAR
========================================================= */
function carregarUltima() {

  const historico = JSON.parse(localStorage.getItem("listas") || "[]");

  paginasContainer.innerHTML = "";

  if (!historico.length) {
    paginasContainer.appendChild(criarPagina(true));
    atualizarNumeracao();
    return;
  }

  historico[0].paginas.forEach(p => {

    const folha = document.createElement("div");
    folha.className = "folha";
    folha.innerHTML = p.html;
    folha.style.backgroundImage = p.bg;

    paginasContainer.appendChild(folha);
  });

  atualizarNumeracao();
}


/* =========================================================
➕ ADICIONAR QUESTÃO
========================================================= */
function adicionarQuestao() {

  const folhas = document.querySelectorAll(".folha");
  const ultima = folhas[folhas.length - 1];

  if (!ultima) return;

  const conteudo = ultima.querySelector(".conteudo");
  const total = document.querySelectorAll(".bloco").length + 1;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = criarBlocoQuestao(total);

  const bloco = wrapper.firstElementChild;

  conteudo.appendChild(bloco);

  setTimeout(() => {
    verificarOverflowInteligente();
  }, 50);

  posicionarCursor(bloco.querySelector(".enunciado"));
}


/* =========================================================
🎯 CURSOR
========================================================= */
function posicionarCursor(elemento) {

  const range = document.createRange();
  const sel = window.getSelection();

  range.selectNodeContents(elemento);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

function quebrarPagina() {

  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const range = sel.getRangeAt(0);

  // cria marcador
  const quebra = document.createElement("div");
  quebra.className = "quebra-manual";

  range.insertNode(quebra);

  // encontra a folha atual
  const folhaAtual = quebra.closest(".folha");

  // cria nova página
  const novaPagina = criarPagina(false);

  const conteudoAtual = folhaAtual.querySelector(".conteudo");
  const conteudoNovo = novaPagina.querySelector(".conteudo");

  // 🔥 move tudo depois da quebra
  let el = quebra.nextSibling;

  while (el) {
    const prox = el.nextSibling;
    conteudoNovo.appendChild(el);
    el = prox;
  }

  // remove a quebra
  quebra.remove();

  // adiciona nova página
  document.getElementById("paginas").appendChild(novaPagina);

  atualizarNumeracao(); // se você já tiver isso
}

/* =========================================================
🔥 QUEBRA INTELIGENTE
========================================================= */
function verificarOverflowInteligente() {

  const folhas = document.querySelectorAll(".folha");
  const ultima = folhas[folhas.length - 1];

  if (!ultima) return;

  const conteudo = ultima.querySelector(".conteudo");
  const blocos = conteudo.querySelectorAll(".bloco");

  if (ultima.scrollHeight <= ultima.clientHeight + 5) return;

  const ultimoBloco = blocos[blocos.length - 1];

  if (!ultimoBloco) return;

  const nova = criarPagina(false);
  paginasContainer.appendChild(nova);

  nova.querySelector(".conteudo").appendChild(ultimoBloco);

  atualizarNumeracao();
}


/* =========================================================
🔢 NUMERAÇÃO
========================================================= */
function atualizarNumeracao() {

  const folhas = document.querySelectorAll(".folha");
  const total = folhas.length;

  folhas.forEach((folha, index) => {
    folha.querySelector(".numero-pagina").innerText =
      `Página ${index + 1} de ${total}`;
  });
}


/* =========================================================
🧠 PLACEHOLDER REAL (VERSÃO FINAL PROFISSIONAL)
========================================================= */

const PLACEHOLDER = "Digite sua questão aqui...";

/* 🔍 VERIFICA VAZIO REAL */
function estaVazio(el) {
  return (
    el.innerText
      .replace(/\u200B/g, "")
      .replace(/\n/g, "")
      .trim() === ""
  );
}

/* 🔥 ATIVAR PLACEHOLDER */
function ativarPlaceholder(el) {
  el.dataset.placeholder = "true";
  el.innerText = PLACEHOLDER;
}

/* 🔥 FOCO */
document.addEventListener("focusin", (e) => {
  const el = e.target.closest(".enunciado");
  if (!el) return;

  if (el.dataset.placeholder === "true") {
    el.innerText = "";
    el.dataset.placeholder = "false";
  }
});

/* 🔥 DIGITAÇÃO (CORRIGIDO MESMO) */
document.addEventListener("input", (e) => {
  const el = e.target.closest(".enunciado");
  if (!el) return;

  // ⚠️ remove placeholder se ainda existir
  if (el.dataset.placeholder === "true") {
    el.innerText = "";
    el.dataset.placeholder = "false";
  }

  if (estaVazio(el)) {
    ativarPlaceholder(el);
    colocarCursorNoInicio(el);
  }
});

/* 🔥 SAIR */
document.addEventListener("focusout", (e) => {
  const el = e.target.closest(".enunciado");
  if (!el) return;

  if (estaVazio(el)) {
    ativarPlaceholder(el);
  }
});

/* =========================================================
🎯 POSICIONAR CURSOR (UX TOP)
========================================================= */
function colocarCursorNoInicio(el) {
  const range = document.createRange();
  const sel = window.getSelection();

  range.selectNodeContents(el);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}


/* =========================================================
🎯 EVENTO
========================================================= */
paginasContainer.addEventListener("input", () => {
  verificarOverflowInteligente();
});


/* =========================================================
🚀 INIT
========================================================= */
window.onload = () => {
  carregarUltima();
};