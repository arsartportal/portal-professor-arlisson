// =======================================
// 🔬 SCIENCE-POINTS.JS
// Sistema de moeda Science Points (SP)
// Responsável por:
// - Saldo do usuário
// - Histórico de SP gerados
// - Gastos na loja
// - Integração com eventos comunitários
// =======================================


// =======================================
// 🔥 IMPORTS
// =======================================

import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// =======================================
// 📥 CARREGAR SP DO USUÁRIO
// =======================================

export async function carregarSP(){

  const user = auth.currentUser;
  if(!user) return;

  try{

    const ref = doc(db,"usuarios",user.uid);
    const snap = await getDoc(ref);

    if(!snap.exists()) return;

    const dados = snap.data();
    const sp = dados.sciencePoints || 0;

    atualizarSPNaTela(sp);

  }catch(erro){
    console.error("❌ Erro ao carregar SciencePoints:", erro);
  }

}


// =======================================
// ➕ ADICIONAR SP
// (USAR SEMPRE ESSA FUNÇÃO)
// =======================================

export async function adicionarSP(valor){

  const user = auth.currentUser;
  if(!user) return;

  try{

    const refUser = doc(db,"usuarios",user.uid);

    // 🔥 Atualização atômica (evita bugs concorrentes)
    await updateDoc(refUser,{
      sciencePoints: increment(valor),

      // 🔬 HISTÓRICO INDIVIDUAL (engajamento)
      totalSPGerados: increment(valor)
    });

    // 🌍 (OPCIONAL) GLOBAL - para eventos comunitários
    const refGlobal = doc(db,"config","lojaStats");

    await updateDoc(refGlobal,{
      totalSPGeradoGlobal: increment(valor)
    });

    // 🔄 Atualiza UI
    carregarSP();

    console.log(`⚛️ +${valor} SP adicionados`);

  }catch(erro){
    console.error("❌ Erro ao adicionar SP:", erro);
  }

}


// =======================================
// ➖ GASTAR SP
// =======================================

export async function gastarSP(valor){

  const user = auth.currentUser;
  if(!user) return false;

  try{

    const refUser = doc(db,"usuarios",user.uid);
    const refGlobal = doc(db,"config","lojaStats");

    const snap = await getDoc(refUser);

    if(!snap.exists()) return false;

    const atual = snap.data().sciencePoints || 0;

    // 🚫 Bloqueia saldo negativo
    if(atual < valor){
      console.warn("⚠️ SP insuficiente");
      return false;
    }

    const novo = atual - valor;

    // 💰 Atualiza saldo
    await setDoc(refUser,{
      sciencePoints: novo
    },{merge:true});

    // 🌍 Atualiza gasto global (EVENTO)
    await updateDoc(refGlobal,{
      totalSPGasto: increment(valor)
    });

    atualizarSPNaTela(novo);

    console.log(`🛒 -${valor} SP gastos`);

    return true;

  }catch(erro){
    console.error("❌ Erro ao gastar SP:", erro);
    return false;
  }

}


// =======================================
// 🔄 ATUALIZAR SP NA INTERFACE
// =======================================

function atualizarSPNaTela(valor){

  const el = document.getElementById("spValor");

  if(el){
    el.textContent = valor;
  }

}