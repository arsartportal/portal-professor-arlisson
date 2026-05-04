// =======================================
// HOME.JS — DESAFIO DIÁRIO + MISSÃO SEMANAL
// =======================================

// =====================================================
// FIREBASE
// =====================================================

import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


// =====================================================
// 👨‍🏫 CONTROLE DE ACESSO (PAINEL ADMIN)
// =====================================================

document.addEventListener("DOMContentLoaded", ()=>{

  // =====================================================
// ⚽ HERO COPA (INTERAÇÃO MOBILE)
// =====================================================

const heroCopa = document.querySelector(".hero-copa-duplo");

if (heroCopa) {

  let timeout;

  heroCopa.addEventListener("touchstart", () => {

    heroCopa.classList.add("touch-ativo");

    // vibração leve (se suportado)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      heroCopa.classList.remove("touch-ativo");
    }, 1500);

  });

}

heroCopa.addEventListener("touchmove", () => {
  heroCopa.classList.add("touch-ativo");
});

  
  // =====================================================
  // 👇 RESTO DO SEU CÓDIGO (NÃO ALTERA)
  // =====================================================

  onAuthStateChanged(auth, async (user)=>{

    if(!user) return;

    try{

      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if(!snap.exists()) return;

      const dados = snap.data();

      if(dados.tipo === "professor"){

  const painel = document.getElementById("painelEventos");

  if(painel){
    painel.style.display = "block";
  }

  // 🔥 MOSTRA BOTÃO
  const btnTeste = document.getElementById("btnTesteLoja");

  if(btnTeste){
    btnTeste.style.display = "block";
  }

}

    }catch(e){
      console.error("Erro ao verificar tipo:", e);
    }

  });

});

// =====================================================
// SISTEMA DE XP / MISSÕES / SCIENCE POINTS
// =====================================================

import { garantirMissaoSemanalAtual } from "./missoes.js";
import { carregarSP,} from "./science-points.js";



// =====================================================
// CARREGAR MISSÃO SEMANAL
// =====================================================

async function carregarMissao(uid){

    const texto = document.getElementById("textoMissao");
    const barra = document.getElementById("barraMissao");

    const missao = await garantirMissaoSemanalAtual(uid);

    const desafios = Number(missao?.desafios || 0);

    if(barra){
        barra.style.width = `${Math.min((desafios / 5) * 100, 100)}%`;
    }

    if(texto){
        texto.innerText = `${desafios} de 5 desafios concluídos`;
    }

    atualizarBotaoMissao(missao);
}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

auth.onAuthStateChanged(async(user)=>{

if(!user) return;

// carregar Science Points
carregarSP();

// iniciar card de desafios da home
iniciarCardDesafiosHome(user);

// carregar missão semanal
await carregarMissao(user.uid);

});


window.toggleEvento = async function(nome){

  try{

    const ref = doc(db, "eventos", "global");
    const snap = await getDoc(ref);

    // 🔥 se não existir → cria e tenta de novo
    if(!snap.exists()){

      await setDoc(ref, {
        xp_dobro: false,
        loja_liberada: false,
        ranking_ativo: false,
        desafio_relampago: false
      });

      return toggleEvento(nome);
    }

    const dados = snap.data();
    const novoValor = !dados[nome];

    await updateDoc(ref, {
      [nome]: novoValor
    });

    console.log(`Evento ${nome}:`, novoValor);

  }catch(e){
    console.error("Erro evento:", e);
  }

}

const refEventos = doc(db, "eventos", "global");

onSnapshot(refEventos, (snap)=>{

  if(!snap.exists()) return;

  const eventos = snap.data();

  // =========================
  // 🔥 ATUALIZA BOTÕES (UI)
  // =========================
  Object.keys(eventos).forEach(nome => {

    const btn = document.getElementById(nome);

    if(!btn) return;

    if(eventos[nome]){

      btn.classList.remove("off");
      btn.classList.add("on");
      btn.innerText = "ON";

    }else{

      btn.classList.remove("on");
      btn.classList.add("off");
      btn.innerText = "OFF";

    }

  });

  // =========================
  // 🎮 LÓGICA DO SISTEMA
  // =========================

  console.log("Evento xp_dobro:", eventos.xp_dobro);

  if(eventos.loja_liberada){
    liberarLoja();
  }else{
    bloquearLoja();
  }

  if(eventos.ranking_ativo){
    console.log("Ranking liberado");
  }

  if(eventos.desafio_relampago){
    console.log("Desafio relâmpago ativo");
  }

});

// ================================
// 🎛️ TOGGLE ADMIN (VERSÃO LIMPA)
// ================================

document.addEventListener("DOMContentLoaded", ()=>{

  document.querySelectorAll(".toggle-btn").forEach(btn => {

    btn.addEventListener("click", ()=>{
      toggleEvento(btn.id);
    });

  });

});

function liberarLoja(){

  console.log("🟢 Loja liberada");

  const cardLoja = document.querySelector(".card-loja");

  if(cardLoja){
    cardLoja.style.opacity = "1";
    cardLoja.style.pointerEvents = "auto";
  }

}


// ================================
// 🎯 CARD DESAFIOS HOME (REALTIME)
// ================================

// ================================
// 🎯 CARD DESAFIOS HOME COMPLETO
// ================================

async function iniciarCardDesafiosHome(user){

  const status = document.getElementById("statusDesafiosHome");
  const xp = document.getElementById("xpDesafioHome");
  const progresso = document.getElementById("progressoSemanalHome");
  const streakEl = document.getElementById("streakHome");
  const rewardEl = document.getElementById("rewardStatusHome");
  const btn = document.getElementById("btnIrDesafio");
  const barraMini = document.getElementById("barraMiniFill");
  const card = document.getElementById("cardDesafiosHome");

  if(!user || !status) return;

  // 🔗 botão
  btn.onclick = ()=>{
    window.location.href = "desafios.html";
  };

  // 🔥 busca dados do usuário
  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);

  if(!snap.exists()) return;

  const dados = snap.data();

  const hoje = new Date().toISOString().split("T")[0];

  card.onclick = ()=>{
  window.location.href = "desafios.html";
};
  // =========================
  // 🔥 STREAK
  // =========================
  const streak = dados.streakAtual || 0;
  if(streak >= 5){
  streakEl.innerHTML = `<span class="fogo-animado">🔥</span> ${streak} dias`;
}else{
  streakEl.innerText = `🔥 ${streak} dias`;
}

  
  // =========================
  // 🎯 DESAFIO DIÁRIO
  // =========================

  const respondeuHoje =
    dados.ultimoQuizDiario === hoje;

  const XP_BASE = 20;
  const bonus = Math.max((streak - 1) * 5, 0);
  const xpTotal = XP_BASE + bonus;

  if(respondeuHoje){

    status.innerText = "✅ Concluído hoje";
    status.style.background = "#22c55e";

    xp.innerText = "+0 XP";

    card.classList.remove("pulse-desafio");

  }else{

    status.innerText = "🔥 Disponível";
    status.style.background = "#f59e0b";

    xp.innerText = `+${xpTotal} XP`;

    // 🔥 animação pulse
    card.classList.add("pulse-desafio");
  }

  // =========================
  // 🏆 MISSÃO SEMANAL
  // =========================

  const missao = await garantirMissaoSemanalAtual(user.uid);
  const feitos = Number(missao?.desafios || 0);

  if(feitos >= 5){

    progresso.innerText = "🏆 Completa!";
    progresso.classList.add("missao-completa");

    // glow dourado no card
    card.style.boxShadow = "0 0 35px rgba(250,204,21,0.7)";

  }else{

    progresso.innerText = `${feitos}/5`;
    progresso.classList.remove("missao-completa");

  }

  // =========================
  // 📊 BARRA ANIMADA
  // =========================

  if(barraMini){
    const porcentagem = (feitos / 5) * 100;
    barraMini.style.width = porcentagem + "%";
  }

  // =========================
  // 🎁 RECOMPENSA DIÁRIA
  // =========================

  const reward = dados.dailyReward || {};

  if(reward.coletado){

    rewardEl.innerText = "✅ Coletada";
    rewardEl.style.color = "#22c55e";

    rewardEl.classList.remove("reward-disponivel");

  }else{

    rewardEl.innerText = "🎁 Disponível";
    rewardEl.style.color = "#facc15";

    // ✨ brilho animado
    rewardEl.classList.add("reward-disponivel");
  }

}
