/* =====================================================
   FORMATAR NÚMEROS
===================================================== */
export function formatarNumero(n){

  if(Number.isInteger(n)){
    return n.toString();
  }

  return n.toFixed(2).replace(".", ",");

}

/* =====================================================
   TRADUZIR STATUS
===================================================== */
export function traduzirStatus(status){

  const mapa = {

    "nao-iniciada": "Não iniciada",

    "em-andamento": "Em andamento",

    "concluida": "Concluída"

  };

  return mapa[status] || status;

}

/* =====================================================
   CALCULAR PORCENTAGEM
===================================================== */
export function calcularPorcentagem(atual, total){

  if(total === 0){
    return 0;
  }

  return Math.round((atual / total) * 100);

}

/* =====================================================
   GERAR CHAVE DA QUESTÃO
===================================================== */
export function gerarChaveQuestao(indice){

  return `q${indice}`;

}

/* =====================================================
   VERIFICAR SE QUESTÃO FOI CONCLUÍDA
===================================================== */
export function questaoConcluida(resposta){

  if(!resposta){
    return false;
  }

  return (
    resposta.correta === true ||
    (
      resposta.tentativas >= 3 &&
      resposta.correta === false
    )
  );

}

/* =====================================================
   VERIFICAR SE ACERTOU
===================================================== */
export function respostaCorreta(escolha, correta){

  return escolha === correta;

}

/* =====================================================
   ATRASO / DELAY
===================================================== */
export function delay(ms){

  return new Promise(resolve => {

    setTimeout(resolve, ms);

  });

}

/* =====================================================
   MOSTRAR ELEMENTO
===================================================== */
export function mostrarElemento(id){

  const el = document.getElementById(id);

  if(el){
    el.style.display = "";
  }

}

/* =====================================================
   ESCONDER ELEMENTO
===================================================== */
export function esconderElemento(id){

  const el = document.getElementById(id);

  if(el){
    el.style.display = "none";
  }

}

/* =====================================================
   DEFINIR TEXTO
===================================================== */
export function definirTexto(id, texto){

  const el = document.getElementById(id);

  if(el){
    el.textContent = texto;
  }

}

/* =====================================================
   DEFINIR HTML
===================================================== */
export function definirHTML(id, html){

  const el = document.getElementById(id);

  if(el){
    el.innerHTML = html;
  }

}

/* =====================================================
   DEFINIR LARGURA %
===================================================== */
export function definirLargura(id, valor){

  const el = document.getElementById(id);

  if(el){
    el.style.width = `${valor}%`;
  }

}