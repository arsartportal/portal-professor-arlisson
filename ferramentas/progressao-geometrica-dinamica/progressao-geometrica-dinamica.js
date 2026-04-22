/* =========================================================
   PROGRESSÃO GEOMÉTRICA DINÂMICA
   Arquivo: progressao-geometrica-dinamica.js
   ========================================================= */


/* =========================================================
   ELEMENTOS DA INTERFACE
   ========================================================= */

// Entradas principais
const inputA1 = document.getElementById('a1');
const inputQ = document.getElementById('q');
const inputN = document.getElementById('n');

// Resultados
const ultimoTermo = document.getElementById('ultimo-termo');
const somaPG = document.getElementById('soma-pg');
const formulaPG = document.getElementById('formula-pg');

// Sequência
const sequencia = document.getElementById('sequencia');

// Controle de termos visíveis
const inputTermosVisiveis = document.getElementById('termos-visiveis');
const botaoAplicar = document.getElementById('aplicar-visiveis');

// Canvas do gráfico
const canvasGrafico = document.getElementById('graficoPG');


/* =========================================================
   VARIÁVEIS DE CONTROLE
   ========================================================= */

let termosVisiveis = [1];
let graficoPG = null;


/* =========================================================
   FUNÇÃO PRINCIPAL
   ========================================================= */

function atualizarPG(){

  let a1 = Number(inputA1.value);
  let q = Number(inputQ.value);
  let n = Number(inputN.value);

  if(isNaN(a1)) a1 = 0;
  if(isNaN(q)) q = 1;

  if(isNaN(n) || n < 1){
    n = 1;
    inputN.value = 1;
  }

  if(n > 100){
    n = 100;
    inputN.value = 100;
  }

  const termos = [];

  for(let i = 0; i < n; i++){
    termos.push(a1 * Math.pow(q, i));
  }

  const an = termos[termos.length - 1];

  let soma;

  if(q === 1){
    soma = a1 * n;
  }else{
    soma = a1 * ((Math.pow(q, n) - 1) / (q - 1));
  }

  ultimoTermo.textContent = formatarNumero(an);
  somaPG.textContent = formatarNumero(soma);

  if(q >= 0){
    formulaPG.textContent = `aₙ = ${a1} · ${q}^(n - 1)`;
  }else{
    formulaPG.textContent = `aₙ = ${a1} · (${q})^(n - 1)`;
  }

  gerarSequencia(termos);
  atualizarGrafico(termos);
}


/* =========================================================
   FORMATA NÚMEROS
   ========================================================= */

function formatarNumero(valor){

  if(Math.abs(valor) >= 1000000){
    return valor.toExponential(2).replace('.', ',');
  }

  if(Number.isInteger(valor)){
    return valor.toLocaleString('pt-BR');
  }

  return Number(valor.toFixed(4)).toLocaleString('pt-BR');
}


/* =========================================================
   GERA A SEQUÊNCIA
   ========================================================= */

function gerarSequencia(termos){

  sequencia.innerHTML = '';

  termos.forEach((termo, indice) => {

    const posicao = indice + 1;

    const card = document.createElement('div');
    card.className = 'termo';

    card.innerHTML = `
      <span>${formatarNumero(termo)}</span>
    `;

    if(!termosVisiveis.includes(posicao)){
      card.classList.add('oculto');
    }

    card.addEventListener('click', () => {

      if(card.classList.contains('oculto')){
        card.classList.remove('oculto');
        card.classList.add('revelado');
      }

    });

    sequencia.appendChild(card);
  });
}


/* =========================================================
   TERMOS VISÍVEIS
   ========================================================= */

botaoAplicar.addEventListener('click', () => {

  const texto = inputTermosVisiveis.value.trim();

  if(texto === ''){
    termosVisiveis = [1];

  }else{

    termosVisiveis = texto
      .split(',')
      .map(item => Number(item.trim()))
      .filter(item => !isNaN(item) && item > 0);

    if(termosVisiveis.length === 0){
      termosVisiveis = [1];
    }
  }

  atualizarPG();
});


/* =========================================================
   ENTER NOS TERMOS VISÍVEIS
   ========================================================= */

inputTermosVisiveis.addEventListener('keydown', (event) => {

  if(event.key === 'Enter'){
    botaoAplicar.click();
  }

});


/* =========================================================
   REVELAÇÃO DOS CAMPOS
   ========================================================= */

const camposRevelaveis = document.querySelectorAll('.campo-revelavel');

camposRevelaveis.forEach(campo => {

  campo.addEventListener('click', () => {

    if(campo.classList.contains('oculto')){
      campo.classList.remove('oculto');
      campo.classList.add('revelado');

    }else{
      campo.classList.remove('revelado');
      campo.classList.add('oculto');
    }

  });

});


/* =========================================================
   GRÁFICO DA PG
   ========================================================= */

function atualizarGrafico(termos){

  const labels = termos.map((_, indice) => `a${indice + 1}`);

  if(graficoPG){
    graficoPG.destroy();
  }

  graficoPG = new Chart(canvasGrafico, {
    type: 'line',

    data: {
      labels,

      datasets: [{
        label: 'Termos da PG',
        data: termos,

        borderColor: '#a855f7',
        backgroundColor: 'rgba(168,85,247,.18)',

        borderWidth: 4,
        fill: true,
        tension: 0.25,

        pointRadius: 6,
        pointHoverRadius: 8,

        pointBackgroundColor: '#d8b4fe',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 700
      },

      plugins: {
        legend: {
          labels: {
            color: '#f8fafc',
            font: {
              size: 14,
              weight: '700'
            }
          }
        },

        tooltip: {
          backgroundColor: '#0f172a',
          borderColor: 'rgba(168,85,247,.35)',
          borderWidth: 1,
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          displayColors: false,

          callbacks: {
            label: (context) => `Valor: ${formatarNumero(context.raw)}`
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: 'rgba(255,255,255,.72)'
          },
          grid: {
            color: 'rgba(255,255,255,.05)'
          }
        },

        y: {
          ticks: {
            color: 'rgba(255,255,255,.72)',
            callback: (value) => formatarNumero(value)
          },
          grid: {
            color: 'rgba(255,255,255,.05)'
          }
        }
      }
    }
  });
}


/* =========================================================
   ATUALIZAÇÃO AUTOMÁTICA
   ========================================================= */

[inputA1, inputQ, inputN].forEach(input => {
  input.addEventListener('input', atualizarPG);
});


/* =========================================================
   NAVEGAÇÃO COM ENTER
   ========================================================= */

inputA1.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    inputQ.focus();
  }
});

inputQ.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    inputN.focus();
  }
});

inputN.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    inputTermosVisiveis.focus();
  }
});


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

inputTermosVisiveis.value = '1';
atualizarPG();