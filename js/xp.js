/* =====================================================
   XP.JS — SISTEMA DE XP DO PORTAL DO PROFESSOR ARLISSON
===================================================== */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app, db } from "./firebase.js";
import { mostrarAnimacaoMudancaPatente } from "./patentes.js";

const auth = getAuth(app);

/* =====================================================
   CONFIGURAÇÃO DE NÍVEL
===================================================== */

export function limiteXP(nivel) {
  return 100 * Math.pow(2, nivel);
}

/* =====================================================
   VALIDAÇÃO AUTOMÁTICA
===================================================== */

export async function validarNivelUsuario(uid) {

  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  let { xp = 0, nivel = 0 } = snap.data();

  let limite = limiteXP(nivel);
  let subiuNivel = false;
  const nivelOriginal = nivel;

  while (xp >= limite) {
    xp -= limite;
    nivel++;
    limite = limiteXP(nivel);
    subiuNivel = true;
  }

  if (subiuNivel) {
    await updateDoc(ref, { xp, nivel });

    console.log("🔄 Nível corrigido automaticamente:", nivelOriginal, "→", nivel);
    mostrarAnimacaoMudancaPatente(nivelOriginal, nivel);
  }

  return { xp, nivel };
}

/* =====================================================
   FUNÇÃO INTERNA — PROCESSA XP
===================================================== */

async function processarXP(uid, ganhoXP) {

  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {

    let xp = ganhoXP;
    let nivel = 0;
    let limite = limiteXP(nivel);

    while (xp >= limite) {
      xp -= limite;
      nivel++;
      limite = limiteXP(nivel);
    }

    await setDoc(ref, {
      xp,
      nivel,
      criadoEm: new Date()
    });

    return { xp, nivel, limite, subiuNivel: nivel > 0, nivelOriginal: 0 };
  }

  let { xp = 0, nivel = 0 } = snap.data();

  xp += ganhoXP;

  let limite = limiteXP(nivel);
  let subiuNivel = false;
  const nivelOriginal = nivel;

  while (xp >= limite) {
    xp -= limite;
    nivel++;
    limite = limiteXP(nivel);
    subiuNivel = true;
  }

  await updateDoc(ref, { xp, nivel });

  return { xp, nivel, limite, subiuNivel, nivelOriginal };
}

/* =====================================================
   XP PARA USUÁRIO LOGADO
===================================================== */

export async function adicionarXPImediato(valor, motivo = "") {

  const user = auth.currentUser;

  if (!user) {
    console.warn("XP ignorado: usuário não autenticado.");
    return null;
  }

  try {

    const resultado = await processarXP(user.uid, valor);

    console.log(
      `[XP] +${valor} XP`,
      motivo ? `(${motivo})` : "",
      resultado
    );

    if (resultado.subiuNivel) {
      mostrarAnimacaoMudancaPatente(
        resultado.nivelOriginal,
        resultado.nivel
      );
    }

    return resultado;

  } catch (e) {
    console.error("Erro ao processar XP:", e);
    return null;
  }
}

/* =====================================================
   BONIFICAÇÃO MANUAL DO PROFESSOR
===================================================== */

export async function adicionarXPManualProfessor(uid, valor) {

  if (!uid || !valor || valor <= 0) return null;

  try {

    const resultado = await processarXP(uid, valor);

    console.log(`🎓 Professor adicionou ${valor} XP`, resultado);

    return resultado;

  } catch (e) {
    console.error("Erro ao adicionar XP manual:", e);
    return null;
  }
}

/* =====================================================
   DEV TOOL
===================================================== */

window.addXP = async (valor = 1000) => {
  return await adicionarXPImediato(valor, "Teste via console");
};