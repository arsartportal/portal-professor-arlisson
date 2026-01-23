/* =====================================================
   XP.JS — SISTEMA DEFINITIVO DE XP (ESTÁVEL)
===================================================== */

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app, db } from "./firebase.js";

const auth = getAuth(app);

/* =====================================================
   CONFIGURAÇÃO DE XP
===================================================== */

export function limiteXP(nivel) {
  return 100 + nivel * 100;
}

/* =====================================================
   PROCESSA XP
===================================================== */

async function processarXP(uid, ganhoXP) {

  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

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

/* =====================================================
   API PÚBLICA
===================================================== */

export async function ganharXP(valor) {
  const user = auth.currentUser;
  if (!user) return;

  return processarXP(user.uid, valor);
}
