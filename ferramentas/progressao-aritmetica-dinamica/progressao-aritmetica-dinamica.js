/* =========================================================
   PROGRESSÃO ARITMÉTICA DINÂMICA
   Arquivo: progressao-aritmetica-dinamica.js
   ========================================================= */


/* =========================================================
   ELEMENTOS DA INTERFACE
   ========================================================= */

// Entradas principais
const inputA1 = document.getElementById('a1');
const inputR = document.getElementById('r');
const inputN = document.getElementById('n');

// Resultados
const ultimoTermo = document.getElementById('ultimo-termo');
const somaPA = document.getElementById('soma-pa');
const formulaPA = document.getElementById('formula-pa');

// Sequência
const sequencia = document.getElementById('sequencia');

// Controle de termos visíveis
const inputTermosVisiveis = document.getElementById('termos-visiveis');
const botaoAplicar = document.getElementById('aplicar-visiveis');

// Canvas do gráfico
const canvasGrafico = document.getElementById('graficoPA');


/* =========================================================
   VARIÁVEIS DE CONTROLE
   ========================================================= */

let termosVisiveis = [1];
let graficoPA = null;


/* =========================================================
   FUNÇÃO PRINCIPAL
   ========================================================= */

function atualizarPA(){

  // -------------------------------------------------------
  // Lê os valores digitados
  // -------------------------------------------------------

  let a1 = Number(inputA1.value);
  let r = Number(inputR.value);
  let n = Number(inputN.value);

  // -------------------------------------------------------
  // Corrige entradas inválidas
  // -------------------------------------------------------

  if(isNaN(a1)) a1 = 0;
  if(isNaN(r)) r = 0;

  if(isNaN(n) || n < 1){
    n = 1;
    inputN.value = 1;
  }

  if(n > 100){
    n = 100;
    inputN.value = 100;
  }

  // -------------------------------------------------------
  // Gera os termos da PA
  // -------------------------------------------------------

  const termos = [];

  for(let i = 0; i < n; i++){
    termos.push(a1 + (r * i));
  }

  // -------------------------------------------------------
  // Calcula último termo e soma
  // -------------------------------------------------------

  const an = termos[termos.length - 1];
  const soma = (n * (a1 + an)) / 2;

  // -------------------------------------------------------
  // Atualiza os valores da interface
  // -------------------------------------------------------

  ultimoTermo.textContent = an;
  somaPA.textContent = soma;

  if(r >= 0){
    formulaPA.textContent = `aₙ = ${a1} + (n - 1) · ${r}`;
  }else{
    formulaPA.textContent = `aₙ = ${a1} + (n - 1) · (${r})`;
  }

  // -------------------------------------------------------
  // Atualiza sequência e gráfico
  // -------------------------------------------------------

  gerarSequencia(termos);
  atualizarGrafico(termos);
}


/* =========================================================
   GERA A SEQUÊNCIA COM TERMOS OCULTOS
   ========================================================= */

function gerarSequencia(termos){

  // limpa a sequência antiga
  sequencia.innerHTML = '';

  termos.forEach((termo, indice) => {

    const posicao = indice + 1;

    const card = document.createElement('div');
    card.className = 'termo';

    card.innerHTML = `
      <span>${termo}</span>
    `;

    // -----------------------------------------------------
    // Decide se o termo começa visível ou oculto
    // -----------------------------------------------------

    if(!termosVisiveis.includes(posicao)){
      card.classList.add('oculto');
    }

    // -----------------------------------------------------
    // Clique no termo oculto
    // -----------------------------------------------------

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
   CONTROLE DOS TERMOS VISÍVEIS
   ========================================================= */

botaoAplicar.addEventListener('click', () => {

  const texto = inputTermosVisiveis.value.trim();

  // Campo vazio = apenas primeiro termo visível
  if(texto === ''){
    termosVisiveis = [1];

  }else{

    termosVisiveis = texto
      .split(',')
      .map(item => Number(item.trim()))
      .filter(item => !isNaN(item) && item > 0);

    // Se o professor digitou algo inválido
    if(termosVisiveis.length === 0){
      termosVisiveis = [1];
    }
  }

  atualizarPA();
});


/* =========================================================
   ENTER NO CAMPO DOS TERMOS VISÍVEIS
   ========================================================= */

inputTermosVisiveis.addEventListener('keydown', (event) => {

  if(event.key === 'Enter'){
    botaoAplicar.click();
  }

});


/* =========================================================
   REVELAÇÃO INDIVIDUAL DOS CAMPOS
   ========================================================= */

const camposRevelaveis = document.querySelectorAll('.campo-revelavel');

camposRevelaveis.forEach(campo => {

  campo.addEventListener('click', () => {

    // alterna entre oculto e revelado
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
   GRÁFICO DA PA
   ========================================================= */

function atualizarGrafico(termos){

  const labels = termos.map((_, indice) => `a${indice + 1}`);

  // Remove gráfico antigo antes de desenhar outro
  if(graficoPA){
    graficoPA.destroy();
  }

  graficoPA = new Chart(canvasGrafico, {
    type: 'line',

    data: {
      labels,

      datasets: [{
        label: 'Termos da PA',
        data: termos,

        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,.18)',

        borderWidth: 4,
        fill: true,
        tension: 0.25,

        pointRadius: 6,
        pointHoverRadius: 8,

        pointBackgroundColor: '#67e8f9',
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
          borderColor: 'rgba(56,189,248,.35)',
          borderWidth: 1,
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          displayColors: false,

          callbacks: {
            label: (context) => `Valor: ${context.raw}`
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
            color: 'rgba(255,255,255,.72)'
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

[inputA1, inputR, inputN].forEach(input => {
  input.addEventListener('input', atualizarPA);
});


/* =========================================================
   NAVEGAÇÃO COM ENTER
   ========================================================= */

inputA1.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    inputR.focus();
  }
});

inputR.addEventListener('keydown', (event) => {
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
atualizarPA();