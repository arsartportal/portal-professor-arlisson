/* =====================================================
   XP.JS — SISTEMA DE XP (LOGIN + DIÁRIO)
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
   1️⃣ XP IMEDIATO (LOGIN)
   Usado quando o usuário JÁ está autenticado
===================================================== */
export async function adicionarXPImediato(valor, acao) {

  const user = auth.currentUser;
  if (!user) return;

  const hoje = new Date().toISOString().slice(0, 10);
  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const dados = snap.data();
  const xpDiario = dados.xpDiario || {};

  // Já ganhou hoje?
  if (xpDiario[acao] === hoje) return;

  const novoXP = (dados.xp || 0) + valor;
  const novoNivel = Math.floor(novoXP / 100);

  await updateDoc(ref, {
    xp: increment(valor),
    nivel: novoNivel,
    [`xpDiario.${acao}`]: hoje
  });
}

/* =====================================================
   2️⃣ XP POR PÁGINA (AGUARDA AUTH)
===================================================== */
export function adicionarXP(valor, acao) {

  const hoje = new Date().toISOString().slice(0, 10);

  onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const dados = snap.data();
    const xpDiario = dados.xpDiario || {};

    if (xpDiario[acao] === hoje) return;

    const novoXP = (dados.xp || 0) + valor;
    const novoNivel = Math.floor(novoXP / 100);

    await updateDoc(ref, {
      xp: increment(valor),
      nivel: novoNivel,
      [`xpDiario.${acao}`]: hoje
    });
  });
}
