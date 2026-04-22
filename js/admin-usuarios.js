// =====================================================
// ADMIN-USUARIOS.JS
// Painel administrativo da coleção usuarios
// Portal do Professor
// =====================================================

// =====================================================
// FIREBASE
// Ajuste o caminho do firebase.js conforme sua estrutura
// =====================================================
import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// =====================================================
// ELEMENTOS DA INTERFACE
// =====================================================
const statusBox = document.getElementById("status-box");
const statusText = document.getElementById("status-text");

const totalUsuariosEl = document.getElementById("total-usuarios");
const usuariosAtivosEl = document.getElementById("usuarios-ativos");
const maiorXpEl = document.getElementById("maior-xp");
const mediaXpEl = document.getElementById("media-xp");

const buscaEl = document.getElementById("busca");
const filtroEscolaEl = document.getElementById("filtro-escola");
const filtroSerieEl = document.getElementById("filtro-serie");
const filtroTurmaEl = document.getElementById("filtro-turma");
const filtroStatusEl = document.getElementById("filtro-status");
const ordenacaoEl = document.getElementById("ordenacao");
const contadorFiltradosEl = document.getElementById("contador-filtrados");

const btnLimparFiltros = document.getElementById("btn-limpar-filtros");
const btnRecarregar = document.getElementById("btn-recarregar");
const btnExportar = document.getElementById("btn-exportar");

const tabelaBody = document.getElementById("tabela-body");

const modalOverlay = document.getElementById("modal-overlay");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnCancelar = document.getElementById("btn-cancelar");
const formEdicao = document.getElementById("form-edicao");

// =====================================================
// ESTADO DA APLICAÇÃO
// =====================================================
let usuarios = [];
let usuariosFiltrados = [];
let usuarioAdminLogado = null;

// =====================================================
// FUNÇÕES UTILITÁRIAS
// =====================================================
function normalizarTexto(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatarData(valor) {
  if (!valor) return "—";

  try {
    if (typeof valor?.toDate === "function") {
      return valor.toDate().toLocaleString("pt-BR");
    }

    if (valor instanceof Date) {
      return valor.toLocaleString("pt-BR");
    }

    if (typeof valor === "string" || typeof valor === "number") {
      const data = new Date(valor);
      if (!isNaN(data.getTime())) {
        return data.toLocaleString("pt-BR");
      }
    }

    if (valor?.seconds) {
      return new Date(valor.seconds * 1000).toLocaleString("pt-BR");
    }

    return "—";
  } catch {
    return "—";
  }
}

function numeroSeguro(valor) {
  const num = Number(valor);
  return Number.isFinite(num) ? num : 0;
}

function mostrarStatus(texto, tipo = "normal") {
  statusText.textContent = texto;
  statusBox.classList.remove("success", "error");

  if (tipo === "success") statusBox.classList.add("success");
  if (tipo === "error") statusBox.classList.add("error");
}

function obterStatusUsuario(user) {
  const statusBruto = normalizarTexto(user.status);

  if (statusBruto === "inativo") return "inativo";
  if (statusBruto === "ativo") return "ativo";

  // fallback simples
  if (user.ativo === false) return "inativo";

  return "ativo";
}

function obterNomeUsuario(user) {
  return (
    user.nome ||
    user.name ||
    user.displayName ||
    "Sem nome"
  );
}

function obterEmailUsuario(user) {
  return user.email || "—";
}

function obterEscolaUsuario(user) {
  return user.escola || user.school || "—";
}

function obterSerieUsuario(user) {
  return user.serie || user.series || "—";
}

function obterTurmaUsuario(user) {
  return user.turma || "—";
}

function obterPatenteUsuario(user) {
  return user.patente || "—";
}

function obterUltimoLoginUsuario(user) {
  return user.ultimoLogin || user.lastLogin || user.ultimo_acesso || null;
}

// =====================================================
// VERIFICAÇÃO DE ADMIN
// Ajuste conforme a estrutura real do seu projeto
// =====================================================
async function verificarPermissaoAdmin(uid) {
  try {
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    const dados = snap.data();

    // Campos aceitos para liberar acesso
    return (
      dados.admin === true ||
      dados.isAdmin === true ||
      dados.tipo === "admin" ||
      dados.role === "admin" ||
      dados.perfil === "admin"
    );
  } catch (error) {
    console.error("Erro ao verificar permissão admin:", error);
    return false;
  }
}

// =====================================================
// CARREGAR USUÁRIOS
// =====================================================
async function carregarUsuarios() {
  try {
    mostrarStatus("Carregando usuários do Firebase...");

    const snap = await getDocs(collection(db, "usuarios"));

    usuarios = snap.docs.map((docSnap) => {
      const dados = docSnap.data();

      return {
        id: docSnap.id,
        ...dados
      };
    });

    preencherFiltros();
    atualizarResumo();
    aplicarFiltros();

    mostrarStatus("Painel carregado com sucesso.", "success");
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    mostrarStatus("Erro ao carregar a coleção de usuários.", "error");
    tabelaBody.innerHTML = `
      <tr>
        <td colspan="11" class="linha-vazia">Erro ao carregar usuários.</td>
      </tr>
    `;
  }
}

// =====================================================
// PREENCHER SELECTS DE FILTRO
// =====================================================
function preencherFiltros() {
  const escolas = [...new Set(usuarios.map(u => obterEscolaUsuario(u)).filter(v => v && v !== "—"))].sort();
  const series = [...new Set(usuarios.map(u => obterSerieUsuario(u)).filter(v => v && v !== "—"))].sort();
  const turmas = [...new Set(usuarios.map(u => obterTurmaUsuario(u)).filter(v => v && v !== "—"))].sort();

  preencherSelect(filtroEscolaEl, escolas, "Todas");
  preencherSelect(filtroSerieEl, series, "Todas");
  preencherSelect(filtroTurmaEl, turmas, "Todas");
}

function preencherSelect(select, itens, textoPadrao) {
  const valorAtual = select.value;

  select.innerHTML = `<option value="">${textoPadrao}</option>`;

  itens.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });

  select.value = valorAtual;
}

// =====================================================
// RESUMO
// =====================================================
function atualizarResumo() {
  const total = usuarios.length;
  const ativos = usuarios.filter(u => obterStatusUsuario(u) === "ativo").length;
  const maiorXp = usuarios.length ? Math.max(...usuarios.map(u => numeroSeguro(u.xp))) : 0;
  const somaXp = usuarios.reduce((acc, u) => acc + numeroSeguro(u.xp), 0);
  const mediaXp = total ? Math.round(somaXp / total) : 0;

  totalUsuariosEl.textContent = total;
  usuariosAtivosEl.textContent = ativos;
  maiorXpEl.textContent = maiorXp.toLocaleString("pt-BR");
  mediaXpEl.textContent = mediaXp.toLocaleString("pt-BR");
}

// =====================================================
// FILTRAR E ORDENAR
// =====================================================
function aplicarFiltros() {
  const busca = normalizarTexto(buscaEl.value);
  const escola = filtroEscolaEl.value;
  const serie = filtroSerieEl.value;
  const turma = filtroTurmaEl.value;
  const status = filtroStatusEl.value;
  const ordenacao = ordenacaoEl.value;

  usuariosFiltrados = usuarios.filter(user => {
    const nome = obterNomeUsuario(user);
    const email = obterEmailUsuario(user);
    const escolaUser = obterEscolaUsuario(user);
    const serieUser = obterSerieUsuario(user);
    const turmaUser = obterTurmaUsuario(user);
    const statusUser = obterStatusUsuario(user);

    const campoBusca = normalizarTexto(
      `${nome} ${email} ${escolaUser} ${serieUser} ${turmaUser} ${statusUser}`
    );

    const passouBusca = !busca || campoBusca.includes(busca);
    const passouEscola = !escola || escolaUser === escola;
    const passouSerie = !serie || serieUser === serie;
    const passouTurma = !turma || turmaUser === turma;
    const passouStatus = !status || statusUser === status;

    return (
      passouBusca &&
      passouEscola &&
      passouSerie &&
      passouTurma &&
      passouStatus
    );
  });

  ordenarUsuarios(usuariosFiltrados, ordenacao);
  renderizarTabela();
}

function ordenarUsuarios(lista, criterio) {
  switch (criterio) {
    case "nome-asc":
      lista.sort((a, b) => obterNomeUsuario(a).localeCompare(obterNomeUsuario(b), "pt-BR"));
      break;

    case "xp-desc":
      lista.sort((a, b) => numeroSeguro(b.xp) - numeroSeguro(a.xp));
      break;

    case "xp-asc":
      lista.sort((a, b) => numeroSeguro(a.xp) - numeroSeguro(b.xp));
      break;

    case "nivel-desc":
      lista.sort((a, b) => numeroSeguro(b.nivel) - numeroSeguro(a.nivel));
      break;

    case "ultimoLogin-desc":
      lista.sort((a, b) => {
        const dataA = converterParaTimestamp(obterUltimoLoginUsuario(a));
        const dataB = converterParaTimestamp(obterUltimoLoginUsuario(b));
        return dataB - dataA;
      });
      break;

    case "escola-asc":
      lista.sort((a, b) => obterEscolaUsuario(a).localeCompare(obterEscolaUsuario(b), "pt-BR"));
      break;

    default:
      break;
  }
}

function converterParaTimestamp(valor) {
  if (!valor) return 0;

  try {
    if (typeof valor?.toDate === "function") return valor.toDate().getTime();
    if (valor instanceof Date) return valor.getTime();
    if (valor?.seconds) return valor.seconds * 1000;

    const data = new Date(valor);
    return isNaN(data.getTime()) ? 0 : data.getTime();
  } catch {
    return 0;
  }
}

// =====================================================
// RENDER DA TABELA
// =====================================================
function renderizarTabela() {
  contadorFiltradosEl.textContent = `${usuariosFiltrados.length} usuário(s) encontrado(s)`;

  if (!usuariosFiltrados.length) {
    tabelaBody.innerHTML = `
      <tr>
        <td colspan="11" class="linha-vazia">Nenhum usuário encontrado com os filtros atuais.</td>
      </tr>
    `;
    return;
  }

  tabelaBody.innerHTML = usuariosFiltrados.map(user => {
    const nome = obterNomeUsuario(user);
    const email = obterEmailUsuario(user);
    const escola = obterEscolaUsuario(user);
    const serie = obterSerieUsuario(user);
    const turma = obterTurmaUsuario(user);
    const xp = numeroSeguro(user.xp);
    const nivel = numeroSeguro(user.nivel);
    const patente = obterPatenteUsuario(user);
    const status = obterStatusUsuario(user);
    const ultimoLogin = formatarData(obterUltimoLoginUsuario(user));

    return `
      <tr>
        <td>
          <div class="nome-cell">
            <strong>${escapeHtml(nome)}</strong>
            <span>ID: ${escapeHtml(user.id)}</span>
          </div>
        </td>
        <td>${escapeHtml(email)}</td>
        <td><span class="badge badge-escola">${escapeHtml(escola)}</span></td>
        <td><span class="badge badge-serie">${escapeHtml(serie)}</span></td>
        <td><span class="badge badge-turma">${escapeHtml(turma)}</span></td>
        <td>${xp.toLocaleString("pt-BR")}</td>
        <td>${nivel}</td>
        <td>${escapeHtml(patente)}</td>
        <td><span class="badge badge-status ${status}">${status}</span></td>
        <td>${escapeHtml(ultimoLogin)}</td>
        <td>
          <div class="acoes">
            <button class="btn-acao btn-editar" data-id="${user.id}">Editar</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  ativarEventosTabela();
}

function escapeHtml(texto) {
  return String(texto ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function ativarEventosTabela() {
  const botoesEditar = document.querySelectorAll(".btn-editar");

  botoesEditar.forEach(botao => {
    botao.addEventListener("click", () => {
      const id = botao.dataset.id;
      abrirModalEdicao(id);
    });
  });
}

// =====================================================
// MODAL
// =====================================================
function abrirModalEdicao(id) {
  const user = usuarios.find(u => u.id === id);
  if (!user) return;

  document.getElementById("edit-id").value = user.id;
  document.getElementById("edit-nome").value = obterNomeUsuario(user);
  document.getElementById("edit-email").value = obterEmailUsuario(user) === "—" ? "" : obterEmailUsuario(user);
  document.getElementById("edit-escola").value = obterEscolaUsuario(user) === "—" ? "" : obterEscolaUsuario(user);
  document.getElementById("edit-serie").value = obterSerieUsuario(user) === "—" ? "" : obterSerieUsuario(user);
  document.getElementById("edit-turma").value = obterTurmaUsuario(user) === "—" ? "" : obterTurmaUsuario(user);
  document.getElementById("edit-status").value = obterStatusUsuario(user);
  document.getElementById("edit-xp").value = numeroSeguro(user.xp);
  document.getElementById("edit-nivel").value = numeroSeguro(user.nivel);
  document.getElementById("edit-patente").value = obterPatenteUsuario(user) === "—" ? "" : obterPatenteUsuario(user);
  document.getElementById("edit-ultimo-login").value = formatarData(obterUltimoLoginUsuario(user));

  modalOverlay.classList.remove("hidden");
}

function fecharModal() {
  modalOverlay.classList.add("hidden");
}

// =====================================================
// SALVAR EDIÇÃO
// =====================================================
async function salvarEdicao(event) {
  event.preventDefault();

  const id = document.getElementById("edit-id").value;

  if (!id) return;

  const dadosAtualizados = {
    nome: document.getElementById("edit-nome").value.trim(),
    email: document.getElementById("edit-email").value.trim(),
    escola: document.getElementById("edit-escola").value.trim(),
    serie: document.getElementById("edit-serie").value.trim(),
    turma: document.getElementById("edit-turma").value.trim(),
    status: document.getElementById("edit-status").value,
    xp: numeroSeguro(document.getElementById("edit-xp").value),
    nivel: numeroSeguro(document.getElementById("edit-nivel").value),
    patente: document.getElementById("edit-patente").value.trim()
  };

  try {
    mostrarStatus("Salvando alterações do usuário...");

    await updateDoc(doc(db, "usuarios", id), dadosAtualizados);

    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      usuarios[index] = {
        ...usuarios[index],
        ...dadosAtualizados
      };
    }

    atualizarResumo();
    preencherFiltros();
    aplicarFiltros();
    fecharModal();

    mostrarStatus("Usuário atualizado com sucesso.", "success");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    mostrarStatus("Erro ao salvar alterações do usuário.", "error");
    alert("Não foi possível salvar as alterações.");
  }
}

// =====================================================
// EXPORTAR CSV
// =====================================================
function exportarCSV() {
  if (!usuariosFiltrados.length) {
    alert("Não há usuários filtrados para exportar.");
    return;
  }

  const cabecalho = [
    "id",
    "nome",
    "email",
    "escola",
    "serie",
    "turma",
    "xp",
    "nivel",
    "patente",
    "status",
    "ultimoLogin"
  ];

  const linhas = usuariosFiltrados.map(user => [
    user.id,
    obterNomeUsuario(user),
    obterEmailUsuario(user),
    obterEscolaUsuario(user),
    obterSerieUsuario(user),
    obterTurmaUsuario(user),
    numeroSeguro(user.xp),
    numeroSeguro(user.nivel),
    obterPatenteUsuario(user),
    obterStatusUsuario(user),
    formatarData(obterUltimoLoginUsuario(user))
  ]);

  const csv = [cabecalho, ...linhas]
    .map(linha => linha.map(valor => `"${String(valor).replaceAll("\"", "\"\"")}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "usuarios-filtrados.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

// =====================================================
// LIMPAR FILTROS
// =====================================================
function limparFiltros() {
  buscaEl.value = "";
  filtroEscolaEl.value = "";
  filtroSerieEl.value = "";
  filtroTurmaEl.value = "";
  filtroStatusEl.value = "";
  ordenacaoEl.value = "nome-asc";

  aplicarFiltros();
}

// =====================================================
// EVENTOS
// =====================================================
function registrarEventos() {
  buscaEl.addEventListener("input", aplicarFiltros);
  filtroEscolaEl.addEventListener("change", aplicarFiltros);
  filtroSerieEl.addEventListener("change", aplicarFiltros);
  filtroTurmaEl.addEventListener("change", aplicarFiltros);
  filtroStatusEl.addEventListener("change", aplicarFiltros);
  ordenacaoEl.addEventListener("change", aplicarFiltros);

  btnLimparFiltros.addEventListener("click", limparFiltros);
  btnRecarregar.addEventListener("click", carregarUsuarios);
  btnExportar.addEventListener("click", exportarCSV);

  btnFecharModal.addEventListener("click", fecharModal);
  btnCancelar.addEventListener("click", fecharModal);

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      fecharModal();
    }
  });

  formEdicao.addEventListener("submit", salvarEdicao);
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================
function iniciarPainel() {
  registrarEventos();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      mostrarStatus("Usuário não autenticado. Faça login para acessar o painel.", "error");
      tabelaBody.innerHTML = `
        <tr>
          <td colspan="11" class="linha-vazia">Acesso negado. Faça login.</td>
        </tr>
      `;
      return;
    }

    usuarioAdminLogado = user;

    const ehAdmin = await verificarPermissaoAdmin(user.uid);

    if (!ehAdmin) {
      mostrarStatus("Acesso negado. Este usuário não possui permissão administrativa.", "error");
      tabelaBody.innerHTML = `
        <tr>
          <td colspan="11" class="linha-vazia">Você não tem permissão para acessar este painel.</td>
        </tr>
      `;
      return;
    }

    await carregarUsuarios();
  });
}

iniciarPainel();