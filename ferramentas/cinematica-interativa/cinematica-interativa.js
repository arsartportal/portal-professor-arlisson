/* =========================================================
   CINEMÁTICA INTERATIVA - VERSÃO PROFISSIONAL
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const inputS0 = document.getElementById('s0');
const inputV = document.getElementById('v');
const inputT = document.getElementById('t');

const posicaoFinal = document.getElementById('posicao');
const velocidadeMedia = document.getElementById('velocidade');
const tipoMovimento = document.getElementById('movimento');

const sequencia = document.getElementById('linha-movimento');
const canvasGrafico = document.getElementById('grafico');

const btnAluno = document.getElementById('modo-aluno');
const btnProfessor = document.getElementById('modo-professor');

const opcoesQuiz = document.querySelectorAll('.opcao');
const feedbackQuiz = document.getElementById('feedback-quiz');


/* =========================================================
   ESTADO
========================================================= */

let grafico = null;
let timeoutAtualizacao = null;


/* =========================================================
   UTILIDADES
========================================================= */

function formatarNumero(valor){
  if(Number.isInteger(valor)){
    return valor.toLocaleString('pt-BR');
  }
  return Number(valor.toFixed(2)).toLocaleString('pt-BR');
}


/* =========================================================
   FUNÇÃO PRINCIPAL
========================================================= */

function atualizarCinematica(){

  clearTimeout(timeoutAtualizacao);

  timeoutAtualizacao = setTimeout(() => {

    let s0 = Number(inputS0.value) || 0;
    let v = Number(inputV.value) || 0;
    let t = Number(inputT.value) || 0;

    if(t < 0){
      t = 0;
      inputT.value = 0;
    }

    if(t > 100){
      t = 100;
      inputT.value = 100;
    }

    const s = s0 + v * t;

    // RESULTADOS
    posicaoFinal.textContent = formatarNumero(s);
    velocidadeMedia.textContent = formatarNumero(v) + " m/s";

    if(v > 0) tipoMovimento.textContent = "Progressivo";
    else if(v < 0) tipoMovimento.textContent = "Retrógrado";
    else tipoMovimento.textContent = "Em repouso";

    gerarSequencia(s0, v, t);
    atualizarGrafico(s0, v, t);

  }, 100);
}


/* =========================================================
   SEQUÊNCIA
========================================================= */

function gerarSequencia(s0, v, t){

  sequencia.innerHTML = '';

  for(let i = 0; i <= t; i++){

    const pos = s0 + v * i;

    const card = document.createElement('div');
    card.className = 'termo oculto';

    card.innerHTML = `<span>t=${i}s → S=${formatarNumero(pos)}</span>`;

    // clique único
    card.onclick = () => {
      card.classList.remove('oculto');
      card.classList.add('revelado');
    };

    sequencia.appendChild(card);
  }
}


/* =========================================================
   REVELAÇÃO GLOBAL
========================================================= */

function configurarRevelacao(){

  document.querySelectorAll('.campo-revelavel').forEach(campo => {

    campo.onclick = () => {
      campo.classList.toggle('oculto');
      campo.classList.toggle('revelado');
    };

  });
}


/* =========================================================
   MODO PROFESSOR / ALUNO
========================================================= */

btnProfessor?.addEventListener('click', () => {
  document.querySelectorAll('.campo-revelavel').forEach(el => {
    el.classList.remove('oculto');
    el.classList.add('revelado');
  });
});

btnAluno?.addEventListener('click', () => {
  document.querySelectorAll('.campo-revelavel').forEach(el => {
    el.classList.add('oculto');
    el.classList.remove('revelado');
  });
});


/* =========================================================
   QUIZ
========================================================= */

const opcoes = document.querySelectorAll('.opcao');
const feedback = document.getElementById('feedback-quiz');
const mensagem = feedback.querySelector('.mensagem');
const btnTentar = document.getElementById('btn-tentar');

let respondido = false;

opcoes.forEach(opcao => {

  opcao.addEventListener('click', () => {

    if(respondido) return;

    respondido = true;

    const correta = opcao.dataset.correta === "true";

    opcoes.forEach(btn => {

      if(btn.dataset.correta === "true"){
        btn.classList.add("correta");
      }else{
        btn.classList.add("errada");
      }

    });

    if(correta){
      feedback.classList.add("correto");
      mensagem.textContent = "✅ Muito bem! Movimento retrógrado.";
    }else{
      feedback.classList.add("errado");
      mensagem.textContent = "❌ Não foi dessa vez.";
    }

  });

});


btnTentar.addEventListener('click', () => {

  respondido = false;

  feedback.classList.remove("correto","errado");
  mensagem.textContent = "";

  opcoes.forEach(btn => {
    btn.classList.remove("correta","errada");
  });

});


/* =========================================================
   GRÁFICO (OTIMIZADO)
========================================================= */

function atualizarGrafico(s0, v, t){

  const tempos = [];
  const posicoes = [];

  for(let i = 0; i <= t; i++){
    tempos.push(i);
    posicoes.push(s0 + v * i);
  }

  if(!grafico){

    grafico = new Chart(canvasGrafico, {
      type: 'line',
      data: {
        labels: tempos,
        datasets: [{
          label: 'Posição (m)',
          data: posicoes,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 600 }
      }
    });

  } else {

    grafico.data.labels = tempos;
    grafico.data.datasets[0].data = posicoes;
    grafico.update();

  }
}


/* =========================================================
   EVENTOS
========================================================= */

[inputS0, inputV, inputT].forEach(input => {
  input.addEventListener('input', atualizarCinematica);
});


/* =========================================================
   INIT
========================================================= */

configurarRevelacao();
atualizarCinematica();