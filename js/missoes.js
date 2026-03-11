/* =====================================================
   MISSOES.JS
   -----------------------------------------------------
   Sistema de missões do Portal do Professor

   Responsável por:
   - Missão semanal
   - Progresso de desafios
   - Reset automático da semana
   - Recompensa de XP

   Fonte da verdade: Firestore
===================================================== */

import { db } from "./firebase.js";
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

    const hoje = new Date();
    const inicioAno = new Date(hoje.getFullYear(), 0, 1);

    const dias = Math.floor((hoje - inicioAno) / 86400000);

    return Math.ceil((dias + inicioAno.getDay() + 1) / 7);
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
        concluida: false
    };

    // 🔄 Reset se mudou a semana
    if(missao.semana !== semanaAtual){

        missao = {
            semana: semanaAtual,
            desafios: 0,
            concluida: false
        };
    }

    // 🎯 Contar progresso
    if(tipo === "desafio"){
        missao.desafios += 1;
    }

    // 🏆 Concluir missão
    if(!missao.concluida && missao.desafios >= MISSAO_DESAFIOS_SEMANA){

        missao.concluida = true;

        // recompensa XP
        await adicionarXPImediato(RECOMPENSA_XP);

        mostrarAvisoMissao();
    }

    // salvar
    await setDoc(ref,{
        missaoSemanal: missao
    },{ merge:true });

}


/* =====================================================
   AVISO VISUAL
===================================================== */

function mostrarAvisoMissao(){

    const el = document.getElementById("statusXP");

    if(!el) return;

    el.innerHTML =
    `🏆 Missão semanal concluída! +${RECOMPENSA_XP} XP`;

    el.classList.add("xp-sucesso");

    setTimeout(()=>{
        el.classList.remove("xp-sucesso");
    },1500);

}