/* =====================================================
   GAMIFICACAO.JS
   -----------------------------------------------------
   Responsável APENAS pela camada VISUAL da gamificação:
   - XP visual (cache)
   - HUD
   - Animação de LEVEL UP

   Fonte da verdade (XP real): Firestore (xp.js)
===================================================== */


/* =====================================================
   1. ESTADO VISUAL DO JOGADOR
===================================================== */

// XP visual (cache local, sincronizado com Firestore)
let xpAtual = parseInt(localStorage.getItem("xp")) || 0;


/* =====================================================
   2. SINCRONIZAÇÃO COM XP REAL
   (ESSENCIAL)
===================================================== */

/**
 * Sincroniza o XP visual com o XP real vindo do Firestore
 * Deve ser chamado ao entrar em páginas com gamificação
 */
function sincronizarXPVisual(xpReal) {
  xpAtual = xpReal;
  localStorage.setItem("xp", xpAtual);
  atualizarHUD();
}

// Exposição global
window.sincronizarXPVisual = sincronizarXPVisual;


/* =====================================================
   3. XP VISUAL + LEVEL UP
===================================================== */

/**
 * Adiciona XP apenas no visual (UI)
 * Dispara LEVEL UP se cruzar limite
 */
function adicionarXPVisual(valor) {

  const nivelAntes = calcularNivel(xpAtual);

  xpAtual += valor;
  localStorage.setItem("xp", xpAtual);

  const nivelDepois = calcularNivel(xpAtual);

  // 🔥 Animação só se realmente subir nível
  if (nivelDepois > nivelAntes) {
    mostrarLevelUp(nivelDepois);
  }

  atualizarHUD();
}

// Exposição global
window.adicionarXPVisual = adicionarXPVisual;


/* =====================================================
   4. CÁLCULO DE NÍVEL
===================================================== */

function calcularNivel(xp) {
  return Math.floor(xp / 100);
}


/* =====================================================
   5. HUD (SEGURANÇA TOTAL)
===================================================== */

function atualizarHUD() {

  const xpEl      = document.getElementById("xpValor");
  const nivelEl   = document.getElementById("nivelValor");
  const patenteEl = document.getElementById("patenteImg");

  if (xpEl) xpEl.innerText = xpAtual;
  if (nivelEl) nivelEl.innerText = calcularNivel(xpAtual);
  if (patenteEl) patenteEl.src = obterImagemPatente();
}


/* =====================================================
   6. PATENTES (PLACEHOLDER)
===================================================== */

function obterImagemPatente() {
  return "../assets/patentes/seasonalRank0-0.png";
}


/* =====================================================
   7. LEVEL UP OVERLAY
===================================================== */

function mostrarLevelUp(novoNivel) {

  const overlay = document.getElementById("levelup-overlay");
  const nivelEl = document.getElementById("levelup-nivel");

  if (!overlay || !nivelEl) return;

  nivelEl.innerText = novoNivel;

  overlay.classList.add("ativo");

  setTimeout(() => {
    overlay.classList.remove("ativo");
  }, 2000);
}


/* =====================================================
   8. INIT
===================================================== */

// Garante que o HUD não fique vazio ao carregar
document.addEventListener("DOMContentLoaded", atualizarHUD);
