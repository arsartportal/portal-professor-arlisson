/* =====================================================
   UI PRINCIPAL DA BIBLIOTECA
   Responsável por:
   - painel de progresso
   - renderização das questões
   - correção
===================================================== */

import { estado }
from "./estado.js";

import {

  traduzirStatus,
  definirTexto,
  definirHTML,
  definirLargura,
  gerarChaveQuestao,
  questaoConcluida

} from "./utilidades.js";

import {

  recalcularResumo,
  salvarProgresso

} from "./progresso.js";

import {

  atualizarUIProgresso

} from "./progresso-ui.js";

/* =====================================================
   ATUALIZAR PAINEL DE PROGRESSO
===================================================== */

export function atualizarPainelProgresso(){

  /*
    Recalcula estatísticas
  */
  recalcularResumo();

  /*
    Atualiza sistema visual moderno
  */
  atualizarUIProgresso();

}

/* =====================================================
   RENDERIZAR QUESTÕES
===================================================== */

export function carregarQuestoes(){

  const div =
    document.getElementById(
      "exercicios"
    );

  /*
    Segurança
  */
  if(!div){
    return;
  }

  let html = "";

  /*
    Percorre questões
  */
  estado.questoes.forEach((q, i) => {

    const chave =
      gerarChaveQuestao(i);

    const salvo =
      estado.progressoAtual
        ?.respostas?.[chave] || null;

    const tentativas =
      salvo?.tentativas || 0;

    const concluida =
      questaoConcluida(salvo);

    const respostaMarcada =

      Number.isInteger(
        salvo?.respostaMarcada
      )

        ? salvo.respostaMarcada

        : null;

    /* =================================================
       CARD DA QUESTÃO
    ================================================= */

    html += `

      <div class="questao">

        <p class="pergunta">

          ${i + 1}) ${q.p}

        </p>

    `;

    /* =================================================
       GRID DAS ALTERNATIVAS
    ================================================= */

    html += `

      <div class="alternativas">

    `;

    /*
      Alternativas
    */
    q.a.forEach((alt, j) => {

      const checked =

        respostaMarcada === j

          ? "checked"

          : "";

      const disabled =

        concluida

          ? "disabled"

          : "";

      html += `

        <label class="alt">

          <input
            type="radio"
            name="q${i}"
            value="${j}"
            ${checked}
            ${disabled}
          >

          <span>
            ${alt}
          </span>

        </label>

      `;

    });

    /* =================================================
       FECHA GRID DAS ALTERNATIVAS
    ================================================= */

    html += `

      </div>

    `;

    /* =================================================
       BOTÃO RESPONDER
    ================================================= */

    html += `

      <button
        type="button"
        class="btn-responder"
        onclick="corrigir(${i})"
        ${concluida ? "disabled" : ""}
      >

        Responder

      </button>

    `;

    /* =================================================
       RESULTADO
    ================================================= */

    html += `

      <div
        class="resultado"
        id="r${i}"
      >

    `;

    /*
      Resultado salvo
    */
    if(salvo){

      /*
        Acertou
      */
      if(salvo.correta === true){

        html += `

          <span class="resultado-correto">

            ✅ Correto!

          </span>

        `;

      }

      /*
        Errou todas
      */
      else if(
        salvo.tentativas >= 3
      ){

        html += `

          <span class="resultado-erro">

            ❌ Resposta correta:
            ${q.a[q.c]}

          </span>

        `;

      }

      /*
        Tentativa parcial
      */
      else if(tentativas > 0){

        html += `

          <span class="resultado-tentativa">

            ❌ Tente novamente
            (${3 - tentativas}
            tentativas restantes)

          </span>

        `;

      }

    }

    /* =================================================
       FECHA QUESTÃO
    ================================================= */

    html += `

      </div>

      </div>

    `;

  });

  /* =====================================================
     INJETA HTML
  ===================================================== */

  div.innerHTML = html;

}

/* =====================================================
   CORRIGIR QUESTÃO
===================================================== */

export async function corrigirQuestao(i){

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
    Radios da questão
  */
  const radios =
    document.getElementsByName(
      `q${i}`
    );

  let escolha;

  /*
    Descobrir alternativa marcada
  */
  for(const r of radios){

    if(r.checked){

      escolha =
        parseInt(r.value);

      break;

    }

  }

  /*
    Nada marcado
  */
  if(escolha === undefined){

    alert(
      "Selecione uma alternativa."
    );

    return;

  }

  const chave =
    gerarChaveQuestao(i);

  const atual =

    estado.progressoAtual
      .respostas[chave] || {

        respostaMarcada:null,

        correta:false,

        tentativas:0,

        concluida:false

      };

  /*
    Bloqueio
  */
  const bloqueada =

    atual.correta === true ||

    (
      atual.tentativas >= 3 &&
      atual.correta === false
    );

  if(bloqueada){
    return;
  }

  /*
    Verifica acerto
  */
  const acertou =

    escolha ===
    estado.questoes[i].c;

  const novasTentativas =

    atual.tentativas + 1;

  /*
    Salva resposta
  */
  estado.progressoAtual
    .respostas[chave] = {

      respostaMarcada:
        escolha,

      correta:
        acertou,

      tentativas:
        novasTentativas,

      concluida:

        acertou ||

        novasTentativas >= 3

    };

  /*
    Resultado visual
  */
  const resultadoEl =
    document.getElementById(
      `r${i}`
    );

  if(acertou){

    resultadoEl.innerHTML = `

      <span class="resultado-correto">

        ✅ Correto!

      </span>

    `;

  }else if(
    novasTentativas >= 3
  ){

    resultadoEl.innerHTML = `

      <span class="resultado-erro">

        ❌ Resposta correta:
        ${estado.questoes[i].a[
          estado.questoes[i].c
        ]}

      </span>

    `;

  }else{

    resultadoEl.innerHTML = `

      <span class="resultado-tentativa">

        ❌ Tente novamente
        (${3 - novasTentativas}
        tentativas restantes)

      </span>

    `;

  }

  /*
    Salva Firestore
  */
  await salvarProgresso();

  /*
    Atualiza progresso
  */
  atualizarPainelProgresso();

  /*
    Re-renderiza questões
  */
  carregarQuestoes();

}

/* =====================================================
   FUNÇÃO GLOBAL
===================================================== */

window.corrigir =
  corrigirQuestao;