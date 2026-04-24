import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { auth, db } from "../js/firebase.js";
import { obterPatentePorNivel } from "../js/patentes.js";
import { limiteXP } from "../js/xp.js";


// =====================================================
// 🎯 SUPER HEADER — HUD GLOBAL
// =====================================================

export function iniciarSuperHeader() {
  console.log("🚀 SuperHeader iniciado");

  configurarLogout();
  configurarVoltar();
  carregarHUD();
}


// =====================================================
// 🔐 LOGOUT GLOBAL
// =====================================================

function configurarLogout() {
  window.sair = function () {
    localStorage.clear();
    window.location.href = "/index.html";
  };
}

// =====================================================
// 🔙 VOLTAR PÁGINA
// =====================================================

function configurarVoltar() {
  window.voltarPagina = function () {

    // se tiver histórico → volta
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // fallback (caso abriu direto)
      window.location.href = "/index.html";
    }

  };
}


// =====================================================
// 📊 HUD (XP, NÍVEL, PATENTE)
// =====================================================

function carregarHUD() {

  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      console.warn("Usuário não logado");
      return;
    }

    try {
      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        console.warn("Usuário não encontrado no Firestore");
        return;
      }

      const dados = snap.data();

      // 🔥 USA EXATAMENTE IGUAL AO SISTEMA PRINCIPAL
      const nivel = dados.nivel ?? 0;
      const xp = dados.xp ?? 0;

      // 👉 fallback inteligente (caso xpNecessario não exista)
      const xpMax = dados.xpNecessario ?? limiteXP(nivel);

      const usuario = {
        nivel,
        xp,
        xpMax
      };

      atualizarHUD(usuario);

    } catch (erro) {
      console.error("Erro ao carregar HUD:", erro);
    }

  });

}


// =====================================================
// 🧩 ATUALIZAÇÃO VISUAL
// =====================================================

function atualizarHUD(user) {

  const nivelEl = document.getElementById("nivel-usuario");
  const xpTexto = document.getElementById("xp-texto");
  const barra = document.getElementById("xp-preenchimento");
  const patenteImg = document.getElementById("patente-img");
  const patenteImgDetalhe = document.getElementById("patente-img-detalhe");

  if (!nivelEl) {
    console.warn("HUD não encontrado na página");
    return;
  }

  // ⚠️ proteção extra (evita bug visual)
  if (!user.xpMax || user.xpMax <= 0) {
    console.warn("xpMax inválido:", user.xpMax);
    return;
  }

  // 🎯 Nível
  nivelEl.textContent = user.nivel;

  // 🎯 XP
  xpTexto.textContent = `XP ${user.xp} / ${user.xpMax}`;

  // 🔥 barra segura (nunca passa de 100%)
  const porcentagem = Math.min((user.xp / user.xpMax) * 100, 100);
  barra.style.width = `${porcentagem}%`;

  // 🎯 Patente
  const patente = obterPatentePorNivel(user.nivel);
  const patenteSrc = patente.imagem;

  if (patenteImg) patenteImg.src = patenteSrc;
  if (patenteImgDetalhe) patenteImgDetalhe.src = patenteSrc;
}