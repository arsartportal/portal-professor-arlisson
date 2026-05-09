/* =====================================================
   PROGRESSO UI
   Controla toda a aparência visual do progresso
===================================================== */

import { estado } from "./estado.js";

/* =====================================================
   ELEMENTOS
===================================================== */

const elRespondidas =
  document.getElementById("respondidas");

const elAcertos =
  document.getElementById("acertos");

const elErros =
  document.getElementById("erros");

const elStatus =
  document.getElementById("status");

const elPorcentagem =
  document.getElementById("porcentagem");

const elBarra =
  document.querySelector(".progress-fill");

const elBotaoXP =
  document.getElementById("botao-xp");

/* =====================================================
   FORMATAR STATUS
===================================================== */

function formatarStatus(status){

  const mapa = {

    "nao-iniciada":
      "Não iniciada",

    "em-andamento":
      "Em andamento",

    "concluida":
      "Concluída"

  };

  return mapa[status] || status;

}

/* =====================================================
   ATUALIZAR TEXTO DO STATUS
===================================================== */

function atualizarClasseStatus(status){

  if(!elStatus){
    return;
  }

  /*
    Remove classes antigas
  */
  elStatus.classList.remove(
    "status-nao-iniciada",
    "status-em-andamento",
    "status-concluida"
  );

  /*
    Adiciona nova classe
  */
  elStatus.classList.add(
    `status-${status}`
  );

}

/* =====================================================
   ATUALIZAR BARRA DE PROGRESSO
===================================================== */

function atualizarBarra(progresso){

  if(!elBarra){
    return;
  }

  /*
    Atualiza largura da barra
  */
  elBarra.style.width =
    `${progresso}%`;

  /*
    Troca cor dependendo do progresso
  */

  elBarra.classList.remove(
    "barra-inicial",
    "barra-media",
    "barra-completa"
  );

  if(progresso <= 30){

    elBarra.classList.add(
      "barra-inicial"
    );

  }else if(progresso < 100){

    elBarra.classList.add(
      "barra-media"
    );

  }else{

    elBarra.classList.add(
      "barra-completa"
    );

  }

}

/* =====================================================
   CONTROLAR BOTÃO DE XP
===================================================== */

function atualizarBotaoXP(){

  if(!elBotaoXP){
    return;
  }

  const progresso =
    estado.progressoAtual.progresso;

  const recompensaResgatada =
    estado.progressoAtual
      .recompensaResgatada;

  /*
    Liberar botão apenas quando concluir
  */

  if(
    progresso === 100 &&
    !recompensaResgatada
  ){

    elBotaoXP.disabled = false;

    elBotaoXP.innerText =
      "Resgatar XP";

    elBotaoXP.classList.add(
      "xp-disponivel"
    );

  }else if(recompensaResgatada){

    elBotaoXP.disabled = true;

    elBotaoXP.innerText =
      "XP Resgatado";

  }else{

    elBotaoXP.disabled = true;

    elBotaoXP.innerText =
      "Complete a Lista";

  }

}

/* =====================================================
   ATUALIZAR TODOS OS CARDS
===================================================== */

export function atualizarUIProgresso(){

  if(!estado.progressoAtual){
    return;
  }

  const progresso =
    estado.progressoAtual;

  /*
    Respondidas
  */
  if(elRespondidas){

    elRespondidas.innerText =
      `${progresso.respondidas}/${progresso.totalQuestoes}`;

  }

  /*
    Acertos
  */
  if(elAcertos){

    elAcertos.innerText =
      progresso.acertos;

  }

  /*
    Erros
  */
  if(elErros){

    elErros.innerText =
      progresso.erros;

  }

  /*
    Status
  */
  if(elStatus){

    elStatus.innerText =
      formatarStatus(
        progresso.status
      );

  }

  /*
    Porcentagem
  */
  if(elPorcentagem){

    elPorcentagem.innerText =
      `Progresso: ${progresso.progresso}%`;

  }

  /*
    Atualiza barra
  */
  atualizarBarra(
    progresso.progresso
  );

  /*
    Atualiza classe do status
  */
  atualizarClasseStatus(
    progresso.status
  );

  /*
    Atualiza botão XP
  */
  atualizarBotaoXP();

}

/* =====================================================
   RESET VISUAL
===================================================== */

export function resetarUIProgresso(){

  if(elRespondidas){
    elRespondidas.innerText = "0/0";
  }

  if(elAcertos){
    elAcertos.innerText = "0";
  }

  if(elErros){
    elErros.innerText = "0";
  }

  if(elStatus){
    elStatus.innerText = "Não iniciada";
  }

  if(elPorcentagem){
    elPorcentagem.innerText =
      "Progresso: 0%";
  }

  if(elBarra){
    elBarra.style.width = "0%";
  }

}

/* =====================================================
   ANIMAÇÃO SUAVE DA BARRA
===================================================== */

export function animarBarra(){

  if(!elBarra){
    return;
  }

  elBarra.animate(

    [
      {
        opacity: 0.5
      },

      {
        opacity: 1
      }
    ],

    {
      duration: 400
    }

  );

}