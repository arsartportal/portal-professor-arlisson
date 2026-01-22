/* =====================================================
   XP.JS — SISTEMA DEFINITIVO DE XP
   - Suporta excesso de XP
   - Level up infinito
   - Compatível com HUD e animações
===================================================== */

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

/* =====================================================
   CONFIGURAÇÃO DE XP
===================================================== */

function limiteXP(nivel) {
  return 100 + nivel * 100;
}

/* =====================================================
   PROCESSA XP
===================================================== */

async function processarXP(uid, ganhoXP) {

  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const dados = snap.data();

let xp = typeof dados.xp === "number" ? dados.xp : 0;
let nivel = typeof dados.nivel === "number" ? dados.nivel : 0;

  xp += ganhoXP;

  let limite = limiteXP(nivel);
  let subiuNivel = false;

  while (xp >= limite) {
    xp -= limite;
    nivel++;
    limite = limiteXP(nivel);
    subiuNivel = true;
  }

  await updateDoc(ref, {
    xp,
    nivel
  });

  return {
    xp,
    nivel,
    limite,
    subiuNivel
  };
}

/* =====================================================
   XP IMEDIATO
===================================================== */

export async function adicionarXPImediato(valor) {

  const user = auth.currentUser;
  if (!user) return;

  return processarXP(user.uid, valor);
}

/* =====================================================
   XP COM AUTH (páginas)
===================================================== */

export function adicionarXP(valor) {

  onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    await processarXP(user.uid, valor);
  });
}
