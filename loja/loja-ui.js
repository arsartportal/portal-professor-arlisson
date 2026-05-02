// ======================================================
// 🧠 IMPORTS
// ======================================================

import { recompensas, datasLiberacao } from "./loja-data.js";


// ======================================================
// 🧠 ESTADO
// ======================================================

let spAtual = 0;
let bonusAtual = 0;
let serverTimeOffset = 0;


// ======================================================
// 🔬 SP HUD
// ======================================================

export function atualizarSPNaTela(sp, bonus = 0) {
  spAtual = sp;
  bonusAtual = bonus;

  const el = document.getElementById("sp");
  if (!el) return;

  el.innerText = sp + (bonus > 0 ? ` • 🎯 +${bonus}` : "");
}

export function setServerTimeOffset(offset) {
  serverTimeOffset = offset;
}


// ======================================================
// 🧠 IDENTIFICAR TIPO
// ======================================================

function getTipoItem(item) {
  if (item.id.includes("caixa")) return "caixa";
  if (item.id === "roleta-cientifica") return "roleta";
  if (item.tipo === "ranking-fichas") return "ranking";
  if (item.tipo === "prova") return "prova";
  if (item.tipo === "prova-extra") return "revanche";
  if (item.tipo === "ferramenta") return "ferramenta";
  if (item.fichas) return "ficha";
  if (item.xp) return "xp";
  return "padrao";
}


// ======================================================
// 🎨 BADGE
// ======================================================

function badge(item) {
  if (item.id.includes("caixa")) return "🎁";
  if (item.id === "roleta-cientifica") return "🎡";
  if (item.tipo === "ranking-fichas") return "🏆";
  if (item.tipo === "prova") return "🎯";
  if (item.tipo === "prova-extra") return "🔁";
  if (item.tipo === "ferramenta") return "🧰";
  return "";
}


// ======================================================
// 🎨 DESCRIÇÃO INTELIGENTE
// ======================================================

function descricao(item) {

  if (item.id.includes("caixa")) return item.descricao;

  if (item.id === "roleta-cientifica")
    return "Gire a roleta e receba recompensas aleatórias.";

  if (item.tipo === "ranking-fichas")
    return `Acesso ao ranking (${item.quantidade} tentativa${item.quantidade > 1 ? "s" : ""})`;

  if (item.tipo === "prova")
    return `Adiciona +${item.valor} ponto na prova`;

  if (item.tipo === "prova-extra")
    return "Permite refazer uma prova.";

  if (item.fichas)
    return `${item.fichas} acesso(s) ao quiz`;

  return item.descricao || "";
}


// ======================================================
// 🎨 CARD VISUAL
// ======================================================

function criarCard(item, raridade, bloqueado, podeComprar, recomendado = false){

  const tipo = getTipoItem(item);

  return `
    <div class="card raridade-${raridade} tipo-${tipo} ${recomendado ? "recomendado" : ""}">

      <div class="card-header">
        <h3>
          ${badge(item)} ${item.nome || "Item"}
        </h3>

        ${recomendado ? `<span class="badge-top">⭐</span>` : ""}
      </div>

      <div class="desc">
        ${descricao(item)}
      </div>

      ${
        // ❗ ranking NÃO mostra texto, só destaque visual
        recomendado && tipo !== "ranking"
          ? `<div class="mini-tag">Melhor custo-benefício</div>`
          : ""
      }

      ${
        bloqueado
          ? `<div class="contador-loja" data-tipo="${tipo}">⏳ Em breve</div>`
          : ""
      }

      <div class="preco">🔬 ${item.preco} SP</div>

      <button
        ${!podeComprar ? "disabled" : ""}
        onclick="${bloqueado ? "" : `comprar('${item.id}')`}"
      >
        ${
          bloqueado
            ? "Em breve"
            : podeComprar
            ? "Resgatar"
            : "SP insuficiente"
        }
      </button>

    </div>
  `;
}


// ======================================================
// 🏪 RENDER LOJA
// ======================================================

export function renderLoja() {

  const loja = document.getElementById("loja");
  if (!loja) return;

  loja.innerHTML = "";

  const agora = new Date(Date.now() + serverTimeOffset);

  // ======================================================
  // 🧠 AGRUPAR POR TIPO
  // ======================================================

  const grupos = {};

  recompensas.forEach(item => {

    let tipo = getTipoItem(item);

    // 🔥 Unifica prova + revanche
    if (tipo === "prova" || tipo === "revanche") {
      tipo = "beneficios";
    }

    if (!grupos[tipo]) grupos[tipo] = [];
    grupos[tipo].push(item);
  });

  // ======================================================
  // 🎨 ORDEM E NOMES
  // ======================================================

  const ordemTipos = [
    "caixa",
    "xp",
    "ficha",
    "beneficios",
    "ranking",
    "roleta",
    "ferramenta",
    "padrao"
  ];

  const nomesTipos = {
    caixa: "📦 Caixas",
    xp: "⚡ Experiência",
    ficha: "🎟️ Ingressos",
    beneficios: "🎯 Benefícios",
    ranking: "🏆 Ranking",
    roleta: "🎡 Roleta",
    ferramenta: "🧰 Ferramentas",
    padrao: "📦 Outros"
  };

  // ======================================================
  // 🔥 LOOP PRINCIPAL
  // ======================================================

  ordemTipos.forEach(tipo => {

    const itensDoTipo = grupos[tipo];
    if (!itensDoTipo?.length) return;

    const secao = document.createElement("section");
    secao.className = `secao-${tipo}`;
    secao.id = `secao-${tipo}`;

    const titulo = document.createElement("h2");
    titulo.className = "titulo-tipo";
    titulo.innerText = nomesTipos[tipo];

    secao.appendChild(titulo);

    // ======================================================
    // 🎯 BENEFÍCIOS (COM SUBCATEGORIAS)
    // ======================================================

    if (tipo === "beneficios") {

      const subgrupos = {
        bonus: [],
        oportunidade: []
      };

      itensDoTipo.forEach(item => {
        if (item.subtipo === "bonus") subgrupos.bonus.push(item);
        else subgrupos.oportunidade.push(item);
      });

      const nomesSub = {
        bonus: "🎯 Bonificação na Prova",
        oportunidade: "🔁 Oportunidades Acadêmicas"
      };

      Object.keys(subgrupos).forEach(sub => {

        if (!subgrupos[sub].length) return;

        const subtitulo = document.createElement("h3");
        subtitulo.className = "subcategoria";
        subtitulo.innerText = nomesSub[sub];

        secao.appendChild(subtitulo);

        const grid = document.createElement("div");
        grid.className = "grid-raridade";

        const itensOrdenados = subgrupos[sub].sort(
          (a, b) => (a.ordem || 999) - (b.ordem || 999)
        );

        const melhorItem = encontrarMelhorItem(itensOrdenados, tipo);

        itensOrdenados.forEach(item => {

          const tipoItem = getTipoItem(item);
          const data = datasLiberacao[tipoItem];

          const bloqueado =
            data && agora < data && !item.id.startsWith("xp");

          const podeComprar =
            !bloqueado && spAtual >= item.preco;

          const recomendado = item.id === melhorItem?.id;

          grid.innerHTML += criarCard(
            item,
            item.raridade || "comum",
            bloqueado,
            podeComprar,
            recomendado
          );
        });

        secao.appendChild(grid);
      });

    }

    // ======================================================
    // 🎯 DEMAIS SEÇÕES
    // ======================================================

    else {

      const grid = document.createElement("div");
      grid.className = "grid-raridade";

      const itensOrdenados = itensDoTipo.sort(
        (a, b) => (a.ordem || 999) - (b.ordem || 999)
      );

      // 🚫 ranking não tem recomendado
      const melhorItem =
        tipo === "ranking"
          ? null
          : encontrarMelhorItem(itensOrdenados, spAtual, tipo);

      itensOrdenados.forEach(item => {

        const tipoItem = getTipoItem(item);
        const data = datasLiberacao[tipoItem];

        const bloqueado =
          data && agora < data && !item.id.startsWith("xp");

        const podeComprar =
          !bloqueado && spAtual >= item.preco;

        const recomendado =
          melhorItem && item.id === melhorItem.id;

        grid.innerHTML += criarCard(
          item,
          item.raridade || "comum",
          bloqueado,
          podeComprar,
          recomendado
        );
      });

      secao.appendChild(grid);
    }

    loja.appendChild(secao);
  });
}


// ======================================================
// 🎮 MENU ATIVO
// ======================================================

export function iniciarMenuAtivo() {

  const links = document.querySelectorAll(".menu-loja a[data-target]");
  if (!links.length) return;

  const secoes = Array.from(links)
    .map(link => document.getElementById(link.dataset.target))
    .filter(Boolean);

  function ativar(id) {
    links.forEach(link => {
      link.classList.toggle("ativo", link.dataset.target === id);
    });
  }

  function detectar() {
    let atual = secoes[0]?.id;

    secoes.forEach(secao => {
      const rect = secao.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.3) {
        atual = secao.id;
      }
    });

    ativar(atual);
  }

  window.addEventListener("scroll", detectar);
  detectar();
}

// ======================================================
// 🧠 SCORE INTELIGENTE (CUSTO-BENEFÍCIO REAL)
// ======================================================

function calcularScore(item) {

  let valor = 0;

  if (item.xp) valor += item.xp;
  if (item.fichas) valor += item.fichas * 50;

  if (item.tipo === "prova") valor += item.valor * 200;
  if (item.tipo === "prova-extra") valor += 500;
  if (item.tipo === "ferramenta") valor += 300;

  return valor / item.preco;
}




// ======================================================
// ⭐ MELHOR ITEM (REGRA SIMPLES)
// ======================================================

function encontrarMelhorItem(itens, tipo) {

  // 🎯 sempre o lendário (inclusive ranking)
  return itens.find(item => item.raridade === "lendario");
}