// =======================================
// SCIENCE-POINTS.JS
// Sistema de moeda SciencePoints (SP)
// Usado para loja, roleta e recompensas
// =======================================

// Firebase
import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// =======================================
// CARREGAR SCIENCE POINTS DO USUÁRIO
// =======================================

export async function carregarSP(){

  const user = auth.currentUser;

  // se não estiver logado, sai
  if(!user) return;

  try{

    const ref = doc(db,"usuarios",user.uid);

    const snap = await getDoc(ref);

    if(!snap.exists()) return;

    const dados = snap.data();

    // se não existir, assume 0
    const sp = dados.sciencePoints || 0;

    // elemento da interface
    const el = document.getElementById("spValor");

    if(el){
      el.textContent = sp;
    }

  }catch(erro){

    console.error("Erro ao carregar SciencePoints:",erro);

  }

}



// =======================================
// ADICIONAR SCIENCE POINTS
// =======================================

export async function adicionarSP(valor){

  const user = auth.currentUser;

  if(!user) return;

  try{

    const ref = doc(db,"usuarios",user.uid);

    const snap = await getDoc(ref);

    let atual = 0;

    // pega SP atual
    if(snap.exists()){
      atual = snap.data().sciencePoints || 0;
    }

    const novo = atual + valor;

    // salva usando merge (não sobrescreve outros campos)
    await setDoc(ref,{
      sciencePoints: novo
    },{merge:true});

    // atualiza interface
    atualizarSPNaTela(novo);

    console.log(`⚛️ +${valor} SciencePoints`);

  }catch(erro){

    console.error("Erro ao adicionar SciencePoints:",erro);

  }

}



// =======================================
// GASTAR SCIENCE POINTS
// (usado na loja futuramente)
// =======================================

export async function gastarSP(valor){

  const user = auth.currentUser;

  if(!user) return false;

  try{

    const ref = doc(db,"usuarios",user.uid);

    const snap = await getDoc(ref);

    if(!snap.exists()) return false;

    const atual = snap.data().sciencePoints || 0;

    // impedir saldo negativo
    if(atual < valor){

      console.warn("SP insuficiente");

      return false;

    }

    const novo = atual - valor;

    await setDoc(ref,{
      sciencePoints: novo
    },{merge:true});

    atualizarSPNaTela(novo);

    return true;

  }catch(erro){

    console.error("Erro ao gastar SciencePoints:",erro);

    return false;

  }

}



// =======================================
// ATUALIZAR SP NA INTERFACE
// =======================================

function atualizarSPNaTela(valor){

  const el = document.getElementById("spValor");

  if(el){
    el.textContent = valor;
  }

}