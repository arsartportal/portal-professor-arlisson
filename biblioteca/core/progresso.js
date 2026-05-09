import { db } from "../../js/firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {

  atualizarUIProgresso,
  animarBarra

} from "./progresso-ui.js";

import { estado } from "./estado.js";

import {
  calcularPorcentagem,
  gerarChaveQuestao
} from "./utilidades.js";



/* =====================================================
   REFERÊNCIA DO DOCUMENTO DA LISTA
===================================================== */
export function obterDocRef(){

  return doc(
    db,
    "usuarios",
    estado.alunoUid,
    "progresso_listas",
    `lista_${estado.config.id}`
  );

}

/* =====================================================
   REFERÊNCIA DO ALUNO
===================================================== */
export function obterAlunoRef(){

  return doc(
    db,
    "usuarios",
    estado.alunoUid
  );

}

/* =====================================================
   MODELO INICIAL
===================================================== */
export function criarProgressoInicial(){

  return {

    listaId: estado.config.id,

    listaSlug: estado.config.slug,

    titulo: estado.config.titulo,

    disciplina: estado.config.disciplina,

    totalQuestoes: estado.questoes.length,

    respondidas: 0,

    acertos: 0,

    erros: 0,

    progresso: 0,

    status: "nao-iniciada",

    respostas: {},

    xpRecompensa: estado.config.xp,

    recompensaResgatada: false,

    dataRecompensa: null,

    ultimaAtualizacao: null

  };

}

/* =====================================================
   RECALCULAR RESUMO
===================================================== */
export function recalcularResumo(){

  const respostas =
    estado.progressoAtual.respostas || {};

  let respondidas = 0;
  let acertos = 0;
  let erros = 0;

  for(let i = 0; i < estado.questoes.length; i++){

    const chave = gerarChaveQuestao(i);

    const item = respostas[chave];

    if(!item){
      continue;
    }

    const acertou =
      item.correta === true;

    const esgotouTentativas =
      item.tentativas >= 3 &&
      item.correta === false;

    if(acertou || esgotouTentativas){
      respondidas++;
    }

    if(acertou){
      acertos++;
    }

    if(esgotouTentativas){
      erros++;
    }

  }

  const progresso =
    calcularPorcentagem(
      respondidas,
      estado.questoes.length
    );

  let status = "nao-iniciada";

  if(progresso > 0 && progresso < 100){
    status = "em-andamento";
  }

  if(progresso === 100){
    status = "concluida";
  }

  estado.progressoAtual.respondidas =
    respondidas;

  estado.progressoAtual.acertos =
    acertos;

  estado.progressoAtual.erros =
    erros;

  estado.progressoAtual.progresso =
    progresso;

  estado.progressoAtual.status =
    status;

  estado.progressoAtual.totalQuestoes =
    estado.questoes.length;

}

/* =====================================================
   SALVAR PROGRESSO
===================================================== */
export async function salvarProgresso(){

  if(
    !estado.alunoUid ||
    !estado.progressoAtual
  ){
    return;
  }

  recalcularResumo();

  /*
    Atualiza interface visual
  */
  atualizarUIProgresso();

  animarBarra();

  const payload = {

    ...estado.progressoAtual,

    ultimaAtualizacao: serverTimestamp()

  };

  await setDoc(
    obterDocRef(),
    payload,
    { merge: true }
  );

}

/* =====================================================
   CARREGAR PROGRESSO
===================================================== */
export async function carregarProgresso(){

  const snap =
    await getDoc(obterDocRef());

  if(snap.exists()){

    estado.progressoAtual = {

      ...criarProgressoInicial(),

      ...snap.data()

    };

  }else{

    estado.progressoAtual =
      criarProgressoInicial();

    await salvarProgresso();

  }

  /*
    Atualiza interface
  */
  atualizarUIProgresso();

}