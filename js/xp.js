/* =====================================================
   XP.JS — SISTEMA DE XP DO PORTAL DO PROFESSOR ARLISSON
   -----------------------------------------------------
   Responsável por:
   ✔ controlar XP do usuário
   ✔ controlar nível
   ✔ fornecer funções reutilizáveis (login, ações, etc)

   Este arquivo NÃO:
   ✖ faz login
   ✖ mexe em UI
===================================================== */

/* -----------------------------------------------------
   IMPORTS DO FIREBASE
----------------------------------------------------- */

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

/* -----------------------------------------------------
   INSTÂNCIAS
----------------------------------------------------- */

const auth = getAuth(app);

/* -----------------------------------------------------
   CONFIGURAÇÃO DE NÍVEL / XP
----------------------------------------------------- */

/**
 * Retorna o limite de XP necessário para subir de nível
 * @param {number} nivel
 */
export function limiteXP(nivel) {
  return 100 + nivel * 100;
}

/* -----------------------------------------------------
   FUNÇÃO INTERNA — PROCESSA XP
----------------------------------------------------- */

async function processarXP(uid, ganhoXP) {

  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  // Se o usuário ainda não existe no Firestore, cria
  if (!snap.exists()) {
    await setDoc(ref, {
      xp: ganhoXP,
      nivel: 0,
      criadoEm: new Date()
    });

    return {
      xp: ganhoXP,
      nivel: 0,
      limite: limiteXP(0),
      subiuNivel: false
    };
  }

  let { xp = 0, nivel = 0 } = snap.data();

  xp += ganhoXP;

  let limite = limiteXP(nivel);
  let subiuNivel = false;

  while (xp >= limite) {
    xp -= limite;
    nivel++;
    limite = limiteXP(nivel);
    subiuNivel = true;
  }

  await updateDoc(ref, { xp, nivel });

  return { xp, nivel, limite, subiuNivel };
}

/* -----------------------------------------------------
   API PÚBLICA — USADA PELO LOGIN E OUTRAS AÇÕES
----------------------------------------------------- */

/**
 * Adiciona XP imediatamente ao usuário logado
 * Exemplo: login diário, concluir atividade, etc
 *
 * @param {number} valor - quantidade de XP
 * @param {string} motivo - motivo do ganho (opcional)
 */
export async function adicionarXPImediato(valor, motivo = "") {

  const user = auth.currentUser;

  // Segurança: se não estiver logado, não faz nada
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

    return resultado;

  } catch (e) {
    console.error("Erro ao processar XP:", e);
    return null;
  }
}
