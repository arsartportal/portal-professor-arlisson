/* =====================================================
   LEIS DE NEWTON — PROPORCIONALIDADE VISUAL
===================================================== */

import { app } from "./firebase.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =====================================================
   FIREBASE
===================================================== */

const auth = getAuth(app);
const db = getFirestore(app);

let usuarioAtual = null;
onAuthStateChanged(auth, user => usuarioAtual = user);

/* =====================================================
   VARIÁVEIS
===================================================== */

let forca = 10;
let massa = 2;
let aceleracao = forca / massa;

/* =====================================================
   ATUALIZA VISUAL
===================================================== */

function atualizarVisual() {

  aceleracao = forca / massa;

  const escalaForca = 0.6 + forca / 20;
  const escalaMassa = 0.6 + massa / 10;
  const escalaAcc = 0.6 + aceleracao / 10;

  document.getElementById("iconeForca").style.transform =
    `scale(${escalaForca})`;

  document.getElementById("iconeMassa").style.transform =
    `scale(${escalaMassa})`;

  document.getElementById("iconeAcc").style.transform =
    `scale(${escalaAcc})`;

  document.getElementById("accTxt").innerText =
    aceleracao.toFixed(1) + " m/s²";
}

/* =====================================================
   CONTROLES
===================================================== */

window.ajustarForca = v => {
  forca = Number(v);
  document.getElementById("forcaTxt").innerText = v + " N";
  atualizarVisual();
};

window.ajustarMassa = v => {
  massa = Number(v);
  document.getElementById("massaTxt").innerText = v + " kg";
  atualizarVisual();
};

window.ajustarAceleracao = v => {
  aceleracao = Number(v);

  // força se ajusta automaticamente
  forca = massa * aceleracao;

  document.getElementById("forcaTxt").innerText =
    forca.toFixed(1) + " N";

  atualizarVisual();
};

// inicializa
atualizarVisual();

/* =====================================================
   CHECKPOINT
===================================================== */

window.checkpoint = async resposta => {

  const msg = document.getElementById("msgFinal");

  // resposta correta: se F dobra, a dobra
  if (resposta !== 3) {
    msg.innerText = "❌ Tente novamente.";
    msg.style.color = "red";
    return;
  }

  if (!usuarioAtual) {
    msg.innerText = "⏳ Aguarde o login...";
    return;
  }

  const ref = doc(
    db,
    "usuarios",
    usuarioAtual.uid,
    "progress",
    "leis_newton_1ano"
  );

  const snap = await getDoc(ref);

  if (snap.exists()) {
    msg.innerText = "✅ Missão já concluída.";
    msg.style.color = "#7dd3fc";
    return;
  }

  await setDoc(ref, {
    concluido: true,
    xp: 100,
    xpContabilizado: false,
    createdAt: new Date()
  });

  msg.innerText = "🏆 Checkpoint concluído! +100 XP";
  msg.style.color = "gold";

  setTimeout(() => {
    window.location.href = "../fisica.html";
  }, 2500);
};
