/* =========================================================
   HEADER-INTERNO.JS — PORTAL DO PROFESSOR
   ---------------------------------------------------------
   Responsável por:
   - atualizar o título da página
   - atualizar patente do aluno no header
   - atualizar XP atual
   - atualizar barrinha de progresso
   - evitar conflitos com os IDs da home

   Compatível com:
   - componentes/header-interno.html
   - css/header-interno.css
   - style.css
   - patentes.js
========================================================= */

import { obterPatentePorNivel } from "./patentes.js";

/* =========================================================
   FUNÇÃO AUXILIAR
   Retorna um elemento pelo ID de forma segura
========================================================= */
function el(id) {
  return document.getElementById(id);
}

/* =========================================================
   NORMALIZA NÚMEROS
========================================================= */
function numeroSeguro(valor, fallback = 0) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : fallback;
}

/* =========================================================
   ATUALIZA HEADER INTERNO
   ---------------------------------------------------------
   Parâmetros:
   - titulo: nome da página
   - nivel: nível atual do aluno
   - xpAtual: XP atual dentro do nível
   - xpMax: XP máximo do nível atual

   Exemplo:
   atualizarHeaderInterno({
     titulo: "Loja de Recompensas",
     nivel: 12,
     xpAtual: 45,
     xpMax: 100
   });
========================================================= */
export function atualizarHeaderInterno({
  titulo = "Página Interna",
  nivel = 0,
  xpAtual = 0,
  xpMax = 100
} = {}) {
  const tituloEl = el("header-titulo-pagina");
  const patenteImgEl = el("header-patente-img");
  const patenteImgTooltipEl = el("header-patente-img-tooltip");
  const patenteNivelTextoEl = el("header-patente-nivel-texto");
  const xpTextoEl = el("header-xp-texto");
  const xpPreenchimentoEl = el("header-xp-preenchimento");

  const nivelSeguro = Math.max(0, numeroSeguro(nivel, 0));
  const xpAtualSeguro = Math.max(0, numeroSeguro(xpAtual, 0));
  const xpMaxSeguro = Math.max(1, numeroSeguro(xpMax, 100));

  const porcentagem = Math.max(
    0,
    Math.min(100, (xpAtualSeguro / xpMaxSeguro) * 100)
  );

  const patente = obterPatentePorNivel(nivelSeguro);

  /* título */
  if (tituloEl) {
    tituloEl.textContent = titulo;
  }

  /* imagem da patente */
  if (patenteImgEl && patente?.imagem) {
    patenteImgEl.src = patente.imagem;
  }

  if (patenteImgTooltipEl && patente?.imagem) {
    patenteImgTooltipEl.src = patente.imagem;
  }

  /* texto do nível */
  if (patenteNivelTextoEl) {
    patenteNivelTextoEl.textContent = `Nível ${nivelSeguro}`;
  }

  /* texto do XP */
  if (xpTextoEl) {
    xpTextoEl.textContent = `${xpAtualSeguro} / ${xpMaxSeguro} XP`;
  }

  /* barra de XP */
  if (xpPreenchimentoEl) {
    xpPreenchimentoEl.style.width = `${porcentagem}%`;
  }
}

/* =========================================================
   DEFINE SOMENTE O TÍTULO
   ---------------------------------------------------------
   Útil quando tu quiser mudar só o nome da página
========================================================= */
export function definirTituloHeaderInterno(titulo = "Página Interna") {
  const tituloEl = el("header-titulo-pagina");
  if (tituloEl) {
    tituloEl.textContent = titulo;
  }
}

/* =========================================================
   DEFINE SOMENTE A PATENTE / XP
   ---------------------------------------------------------
   Útil quando os dados do aluno chegarem depois
========================================================= */
export function atualizarHudHeaderInterno({
  nivel = 0,
  xpAtual = 0,
  xpMax = 100
} = {}) {
  atualizarHeaderInterno({
    titulo: el("header-titulo-pagina")?.textContent || "Página Interna",
    nivel,
    xpAtual,
    xpMax
  });
}