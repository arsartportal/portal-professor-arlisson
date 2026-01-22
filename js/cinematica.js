/* =====================================================
   CINEMÁTICA — SIMULADOR FINAL
===================================================== */

import { app } from "./firebase.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
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

onAuthStateChanged(auth, user => {
  usuarioAtual = user;
});

/* =====================================================
   ELEMENTOS
===================================================== */

const carro = document.getElementById("carro");

const canvasPos = document.getElementById("grafPos");
const canvasVel = document.getElementById("grafVel");

const ctxPos = canvasPos.getContext("2d");
const ctxVel = canvasVel.getContext("2d");

/* =====================================================
   VARIÁVEIS FÍSICAS
===================================================== */

let tempo = 0;
let posicao = 0;
let velocidade = 2;
let aceleracao = 0;

const dt = 0.1;

const TEMPO_MAX = 20;
const POS_MAX = 120;
const VEL_GRAF_MAX = 25; // apenas escala visual

/* =====================================================
   VARIÁVEIS FÍSICAS - PAINEL
===================================================== */
const tempoTxt = document.getElementById("tempoTxt");
const velAtualTxt = document.getElementById("velAtualTxt");
const accTxt = document.getElementById("accTxt");

let pausado = false;

/* dados */
let dadosTempo = [];
let dadosPosicao = [];
let dadosVelocidade = [];

/* =====================================================
   CONVERSÃO
===================================================== */

function xTempo(t) {
  return (t / TEMPO_MAX) * (canvasPos.width - 60) + 40;
}

function yPosicao(p) {
  return canvasPos.height - 30 -
    (p / POS_MAX) * (canvasPos.height - 60);
}

function yVelocidade(v) {
  return canvasVel.height - 30 -
    (v / VEL_GRAF_MAX) * (canvasVel.height - 60);
}

/* =====================================================
   EIXOS
===================================================== */

function desenharEixos(ctx, w, h, yLabel) {

  ctx.strokeStyle = "#777";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, h - 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(40, h - 30);
  ctx.lineTo(w - 10, h - 30);
  ctx.stroke();

  ctx.fillStyle = "#aaa";
  ctx.font = "12px Arial";

  ctx.fillText("tempo (s)", w / 2 - 30, h - 10);

  ctx.save();
  ctx.translate(15, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(yLabel, 0, 0);
  ctx.restore();
}

/* =====================================================
   GRÁFICOS
===================================================== */

function graficoPosicao() {

  ctxPos.clearRect(0, 0, canvasPos.width, canvasPos.height);
  desenharEixos(ctxPos, canvasPos.width, canvasPos.height, "posição (m)");

  ctxPos.beginPath();

  dadosTempo.forEach((t, i) => {
    const x = xTempo(t);
    const y = yPosicao(dadosPosicao[i]);

    if (i === 0) ctxPos.moveTo(x, y);
    else ctxPos.lineTo(x, y);
  });

  ctxPos.strokeStyle = "#00eaff";
  ctxPos.lineWidth = 2;
  ctxPos.stroke();
}

function graficoVelocidade() {

  ctxVel.clearRect(0, 0, canvasVel.width, canvasVel.height);
  desenharEixos(ctxVel, canvasVel.width, canvasVel.height, "velocidade (m/s)");

  ctxVel.beginPath();

  dadosTempo.forEach((t, i) => {
    const x = xTempo(t);
    const y = yVelocidade(dadosVelocidade[i]);

    if (i === 0) ctxVel.moveTo(x, y);
    else ctxVel.lineTo(x, y);
  });

  ctxVel.strokeStyle = "#00ff88";
  ctxVel.lineWidth = 2;
  ctxVel.stroke();
}

/* =====================================================
   LOOP FÍSICO
===================================================== */

setInterval(() => {

  if (pausado) return;
  if (tempo >= TEMPO_MAX) return;

  tempo += dt;

  velocidade = velocidade + aceleracao * dt;
  posicao = posicao + velocidade * dt;

  dadosTempo.push(tempo);
  dadosPosicao.push(posicao);
  dadosVelocidade.push(velocidade);

  graficoPosicao();
  graficoVelocidade();

  tempoTxt.innerText = tempo.toFixed(1);
  velAtualTxt.innerText = velocidade.toFixed(1);
  accTxt.innerText = aceleracao.toFixed(1);

}, dt * 1000);


/* =====================================================
   ANIMAÇÃO DO CARRO
===================================================== */

function animarCarro() {

  // deslocamento real do carrinho
  carro.style.left =
    (posicao / POS_MAX) * 900 + "px";

  requestAnimationFrame(animarCarro);
}

animarCarro();

/* =====================================================
   CONTROLES
===================================================== */

window.ajustarVelocidade = v => {
  velocidade = Number(v);
  document.getElementById("velTxt").innerText = v + " m/s";
};

window.acelerar = () => {
  aceleracao += 1.0;
};

window.frear = () => {
  aceleracao -= 1.0;
};

window.pausar = () => {
  pausado = !pausado;
};

window.resetar = () => {

  tempo = 0;
  posicao = 0;
  velocidade = 2;
  aceleracao = 0;

  dadosTempo = [];
  dadosPosicao = [];
  dadosVelocidade = [];

  ctxPos.clearRect(0, 0, canvasPos.width, canvasPos.height);
  ctxVel.clearRect(0, 0, canvasVel.width, canvasVel.height);

  graficoPosicao();
  graficoVelocidade();
};

window.checkpoint = async resposta => {

  const msg = document.getElementById("msgFinal");

  if (resposta !== 2) {
    msg.innerText = "❌ Tente novamente.";
    msg.style.color = "red";
    return;
  }

  if (!usuarioAtual) {
    msg.innerText = "⏳ Aguarde o login...";
    return;
  }

  // documento fixo do checkpoint
  const checkpointRef = doc(
    db,
    "usuarios",
    usuarioAtual.uid,
    "progress",
    "cinematica_1ano"
  );

  const snap = await getDoc(checkpointRef);

  // já concluído
  if (snap.exists()) {
    msg.innerText = "✅ Missão já concluída.";
    msg.style.color = "#00eaff";
    return;
  }

  // salva progresso
  await setDoc(checkpointRef, {
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