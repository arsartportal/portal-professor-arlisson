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
   -----------------------------------------------------
   Retorna o timestamp da segunda-feira da semana atual
   às 00:00:00. Isso serve como identificador único
   da semana no sistema.
===================================================== */

function numeroSemana(){

    const base = new Date();
    const dia = base.getDay(); // 0=domingo, 1=segunda...
    const diff = base.getDate() - dia + (dia === 0 ? -6 : 1);

    const segunda = new Date(base);
    segunda.setDate(diff);
    segunda.setHours(0,0,0,0);

    return segunda.getTime();
}


/* =====================================================
   NORMALIZAR MISSÃO
   -----------------------------------------------------
   Garante que a estrutura da missão semanal exista
   sempre no formato esperado.
===================================================== */

function criarMissaoNova(semanaAtual){
    return {
        semana: semanaAtual,
        desafios: 0,
        concluida: false,
        recompensaColetada: false
    };
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

    let missao = dados.missaoSemanal || criarMissaoNova(semanaAtual);

    // reset se mudou a semana
    if(missao.semana !== semanaAtual){
        missao = criarMissaoNova(semanaAtual);
    }

    // contar progresso somente se a missão ainda não foi concluída
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

    // salvar no Firestore
    await setDoc(ref,{
        missaoSemanal: missao
    },{ merge:true });

    atualizarBotaoMissao(missao);
    return missao;
}


/* =====================================================
   GARANTIR MISSÃO SEMANAL ATUAL
   -----------------------------------------------------
   Útil para a HOME carregar a missão e já resetar
   automaticamente, mesmo antes do aluno responder
   um novo desafio.
===================================================== */

export async function garantirMissaoSemanalAtual(uid){

    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    let dados = {};

    if(snap.exists()){
        dados = snap.data();
    }

    const semanaAtual = numeroSemana();
    let missao = dados.missaoSemanal || null;

    if(!missao || missao.semana !== semanaAtual){
        missao = criarMissaoNova(semanaAtual);

        await setDoc(ref,{
            missaoSemanal: missao
        },{ merge:true });
    }

    return missao;
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

    // se a semana mudou, não permite coletar missão antiga
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