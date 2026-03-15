/* =====================================================
   MISSOES.JS
   -----------------------------------------------------
   Sistema de missões do Portal do Professor

   Responsável por:
   - Missão semanal
   - Progresso de desafios
   - Reset automático da semana
   - Coleta manual da recompensa

   Fonte da verdade: Firestore
===================================================== */

import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { adicionarXPImediato } from "./xp.js";


/* =====================================================
   CONFIGURAÇÃO DAS MISSÕES
===================================================== */

const MISSAO_DESAFIOS_SEMANA = 5;
const RECOMPENSA_XP = 100;


/* =====================================================
   CALCULAR NÚMERO DA SEMANA
===================================================== */

function numeroSemana(){

    const base = new Date();
    const dia = base.getDay();
    const diff = base.getDate() - dia + (dia === 0 ? -6 : 1);

    const segunda = new Date(base);
    segunda.setDate(diff);
    segunda.setHours(0,0,0,0);

    return segunda.getTime();
}


/* =====================================================
   ATUALIZAR MISSÃO
===================================================== */

export async function atualizarMissao(uid, tipo){

    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    let dados = {};

    if(snap.exists()){
        dados = snap.data();
    }

    const semanaAtual = numeroSemana();

    let missao = dados.missaoSemanal || {
        semana: semanaAtual,
        desafios: 0,
        concluida: false,
        recompensaColetada: false
    };

    // reset se mudou a semana
    if(missao.semana !== semanaAtual){
        missao = {
            semana: semanaAtual,
            desafios: 0,
            concluida: false,
            recompensaColetada: false
        };
    }

    // contar progresso
    if(tipo === "desafio" && !missao.concluida){
        missao.desafios += 1;
        missao.desafios = Math.min(missao.desafios, MISSAO_DESAFIOS_SEMANA);
    }

    // concluir missão sem entregar XP automático
    if(!missao.concluida && missao.desafios >= MISSAO_DESAFIOS_SEMANA){
        missao.concluida = true;
        missao.recompensaColetada = false;
        mostrarAvisoMissaoPronta();
    }

    // salvar
    await setDoc(ref,{
        missaoSemanal: missao
    },{ merge:true });

    atualizarBotaoMissao(missao);
}


/* =====================================================
   COLETAR RECOMPENSA
===================================================== */

export async function coletarRecompensaMissao(){

    const user = auth.currentUser;

    if(!user) return;

    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if(!snap.exists()) return;

    const dados = snap.data();
    const semanaAtual = numeroSemana();

    let missao = dados.missaoSemanal;

    if(!missao) return;

    if(missao.semana !== semanaAtual) return;
    if(!missao.concluida) return;
    if(missao.recompensaColetada) return;

    await adicionarXPImediato(RECOMPENSA_XP);

    missao.recompensaColetada = true;

    await setDoc(ref,{
        missaoSemanal: missao
    },{ merge:true });

    mostrarAvisoRecompensaColetada();
    atualizarBotaoMissao(missao);
}


/* =====================================================
   ATUALIZAR BOTÃO VISUAL
===================================================== */

export function atualizarBotaoMissao(missao){

    const btn = document.getElementById("btnColetarMissao");

    if(!btn) return;

    if(missao?.concluida && !missao?.recompensaColetada){
        btn.style.display = "inline-block";
        btn.disabled = false;
        btn.innerHTML = "🎁 Coletar recompensa";
    }else if(missao?.concluida && missao?.recompensaColetada){
        btn.style.display = "inline-block";
        btn.disabled = true;
        btn.innerHTML = "✅ Recompensa coletada";
    }else{
        btn.style.display = "none";
    }
}


/* =====================================================
   AVISOS VISUAIS
===================================================== */

function mostrarAvisoMissaoPronta(){

    const el = document.getElementById("statusXP");

    if(!el) return;

    el.innerHTML = `🏆 Missão semanal concluída! Sua recompensa está pronta para coletar.`;
    el.classList.add("xp-sucesso");

    setTimeout(()=>{
        el.classList.remove("xp-sucesso");
    },2000);
}

function mostrarAvisoRecompensaColetada(){

    const el = document.getElementById("statusXP");

    if(!el) return;

    el.innerHTML = `🎁 Recompensa coletada! +${RECOMPENSA_XP} XP`;
    el.classList.add("xp-sucesso");

    setTimeout(()=>{
        el.classList.remove("xp-sucesso");
    },2000);
}


/* =====================================================
   EXPOR FUNÇÃO PARA O HTML
===================================================== */

window.coletarRecompensaMissao = coletarRecompensaMissao;