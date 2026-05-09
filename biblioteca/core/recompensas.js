/* =====================================================
   RECOMPENSAS
   Sistema de XP e conclusão de listas
===================================================== */

import { db }
from "../../js/firebase.js";

import {

  updateDoc,
  increment

} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { estado }
from "./estado.js";

import {

  obterAlunoRef,
  salvarProgresso

} from "./progresso.js";

import {

  atualizarUIProgresso

} from "./progresso-ui.js";

/* =====================================================
   MOSTRAR EFEITO VISUAL
===================================================== */

export function mostrarEfeitoRecompensa(xp){

  const overlay =
    document.getElementById(
      "efeitoXp"
    );

  const card =
    document.getElementById(
      "efeitoXpCard"
    );

  const texto =
    document.getElementById(
      "efeitoXpTexto"
    );

  /*
    Segurança
  */
  if(
    !overlay ||
    !card ||
    !texto
  ){
    return;
  }

  /*
    Atualiza texto
  */
  texto.textContent =
    `+${xp} XP`;

  /*
    Mostra overlay
  */
  overlay.style.display =
    "flex";

  /*
    Pequena animação
  */
  requestAnimationFrame(() => {

    card.style.transform =
      "scale(1)";

    card.style.opacity =
      "1";

  });

  /*
    Fecha automaticamente
  */
  setTimeout(() => {

    card.style.transform =
      "scale(0.8)";

    card.style.opacity =
      "0";

    setTimeout(() => {

      overlay.style.display =
        "none";

    }, 300);

  }, 2200);

}

/* =====================================================
   ENTREGAR RECOMPENSA
===================================================== */

export async function receberRecompensa(){

  /*
    Segurança
  */
  if(
    !estado.alunoUid ||
    !estado.progressoAtual
  ){
    return;
  }

  /*
    Só permite lista concluída
  */
  if(
    estado.progressoAtual.status !==
    "concluida"
  ){
    return;
  }

  /*
    Evita duplicar XP
  */
  if(
    estado.progressoAtual
      .recompensaResgatada
  ){
    return;
  }

  try{

    /*
      Adiciona XP ao aluno
    */
    await updateDoc(

      obterAlunoRef(),

      {
        xp: increment(

          estado.progressoAtual
            .xpRecompensa

        )
      }

    );

    /*
      Marca recompensa como resgatada
    */
    estado.progressoAtual
      .recompensaResgatada =
        true;

    /*
      Salva data
    */
    estado.progressoAtual
      .dataRecompensa =
        new Date().toISOString();

    /*
      Salva progresso atualizado
    */
    await salvarProgresso();

    /*
      Atualiza painel visual
    */
    atualizarUIProgresso();

    /*
      Mostra animação
    */
    mostrarEfeitoRecompensa(

      estado.progressoAtual
        .xpRecompensa

    );

  }catch(error){

    console.error(

      "Erro ao entregar recompensa:",

      error

    );

    alert(
      "Não foi possível entregar a recompensa agora."
    );

  }

}

/* =====================================================
   BOTÃO FIXO DE RECOMPENSA
===================================================== */

const botaoXP =
  document.getElementById(
    "botao-xp"
  );

/*
  Liga botão ao sistema
*/
if(botaoXP){

  botaoXP.addEventListener(

    "click",

    receberRecompensa

  );

}