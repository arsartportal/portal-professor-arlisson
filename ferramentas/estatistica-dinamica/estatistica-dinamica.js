/* =========================================================
   ESTATÍSTICA DINÂMICA
   Arquivo: estatistica-dinamica.js
========================================================= */


/* =========================================================
   ELEMENTOS DA INTERFACE
========================================================= */

const inputDados = document.getElementById('dados');
const botaoAnalisar = document.getElementById('analisar');

const mediaEl = document.getElementById('media');
const medianaEl = document.getElementById('mediana');
const modaEl = document.getElementById('moda');
const amplitudeEl = document.getElementById('amplitude');

const listaDados = document.getElementById('lista-dados');
const corpoTabela = document.getElementById('corpo-tabela-frequencia');

const campoGrafico = document.getElementById('campo-grafico');
const canvasGrafico = document.getElementById('graficoEstatistica');

const seletorGrafico = document.getElementById('tipo-grafico');
const botaoAleatorio = document.getElementById('gerar-aleatorio');


/* =========================================================
   CONTROLE
========================================================= */

let grafico = null;


/* =========================================================
   FUNÇÃO PRINCIPAL
========================================================= */

function analisarDados() {

  // -------------------------------------------------------
  // Converte os valores digitados em números
  // -------------------------------------------------------

  let valores = inputDados.value
    .split(',')
    .map(valor => Number(valor.trim()))
    .filter(valor => !isNaN(valor));

  // Se não houver valores válidos
  if (valores.length === 0) {
    valores = [0];
  }

  // -------------------------------------------------------
  // Ordena os dados
  // -------------------------------------------------------

  valores.sort((a, b) => a - b);

  // -------------------------------------------------------
  // MÉDIA
  // -------------------------------------------------------

  const soma = valores.reduce((total, valor) => total + valor, 0);
  const media = soma / valores.length;

  // -------------------------------------------------------
  // MEDIANA
  // -------------------------------------------------------

  let mediana;

  if (valores.length % 2 === 0) {
    const meio1 = valores[(valores.length / 2) - 1];
    const meio2 = valores[valores.length / 2];
    mediana = (meio1 + meio2) / 2;
  } else {
    mediana = valores[Math.floor(valores.length / 2)];
  }

  // -------------------------------------------------------
  // MODA
  // -------------------------------------------------------

  const frequencias = {};

  valores.forEach(valor => {
    frequencias[valor] = (frequencias[valor] || 0) + 1;
  });

  const maiorFrequencia = Math.max(...Object.values(frequencias));

  let moda;

  if (maiorFrequencia === 1) {
    moda = 'Não existe';
  } else {
    const modas = Object.keys(frequencias)
      .filter(valor => frequencias[valor] === maiorFrequencia);

    moda = modas.join(', ');
  }

  // -------------------------------------------------------
  // AMPLITUDE
  // -------------------------------------------------------

  const amplitude = valores[valores.length - 1] - valores[0];

  // -------------------------------------------------------
  // ATUALIZA RESULTADOS
  // -------------------------------------------------------

  mediaEl.textContent = media.toFixed(2).replace('.', ',');
  medianaEl.textContent = mediana.toString().replace('.', ',');
  modaEl.textContent = moda;
  amplitudeEl.textContent = amplitude.toString().replace('.', ',');

  // -------------------------------------------------------
  // DADOS ORGANIZADOS
  // -------------------------------------------------------

  listaDados.innerHTML = '';

  valores.forEach(valor => {

    const item = document.createElement('div');
    item.className = 'dado-item oculto';
    item.textContent = valor;

    item.addEventListener('click', () => {
      item.classList.remove('oculto');
      item.classList.add('revelado');
    });

    listaDados.appendChild(item);
  });

  // -------------------------------------------------------
  // TABELA DE FREQUÊNCIA
  // -------------------------------------------------------

  corpoTabela.innerHTML = '';

  Object.entries(frequencias).forEach(([valor, frequencia]) => {

    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${valor}</td>
      <td>${frequencia}</td>
    `;

    corpoTabela.appendChild(linha);
  });

  // -------------------------------------------------------
  // GRÁFICO
  // -------------------------------------------------------

  atualizarGrafico(frequencias, valores);
}

function gerarHistograma(valores) {

  const min = Math.min(...valores);
  const max = Math.max(...valores);

  const k = Math.ceil(Math.sqrt(valores.length)); // regra simples
  const largura = Math.ceil((max - min) / k);

  const classes = [];
  const frequencias = [];

  for (let i = 0; i < k; i++) {
    const inicio = min + i * largura;
    const fim = inicio + largura;

    classes.push(`${inicio}–${fim}`);

    const freq = valores.filter(v => v >= inicio && v < fim).length;
    frequencias.push(freq);
  }

  return { classes, frequencias };
}

/* =========================================================
   ATUALIZA O GRÁFICO
========================================================= */

function atualizarGrafico(frequencias, valores = []) {

  // Tipo selecionado
  const tipo = seletorGrafico.value;

  let labels;
  let dados;

  const containerGrafico = canvasGrafico.parentElement;

if (tipo === 'histogram') {
  containerGrafico.classList.add('modo-histograma');
} else {
  containerGrafico.classList.remove('modo-histograma');
}

  // =====================================================
  // 📊 HISTOGRAMA (NOVO)
  // =====================================================

  if (tipo === 'histogram') {

    const min = Math.min(...valores);
    const max = Math.max(...valores);

    const k = Math.ceil(Math.sqrt(valores.length)); // nº de classes
    const largura = Math.ceil((max - min) / k) || 1;

    labels = [];
    dados = [];

    for (let i = 0; i < k; i++) {

      const inicio = min + i * largura;
      const fim = inicio + largura;

      labels.push(`${inicio}–${fim}`);

      const freq = valores.filter(v => v >= inicio && v < fim).length;
      dados.push(freq);
    }

  } else {

    // =====================================================
    // 📊 PADRÃO (já existente)
    // =====================================================

    labels = Object.keys(frequencias);
    dados = Object.values(frequencias);
  }

  // -------------------------------------------------------
  // CORES
  // -------------------------------------------------------

  const cores = [
    '#38bdf8',
    '#818cf8',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#a855f7',
    '#14b8a6',
    '#ec4899'
  ];

  // -------------------------------------------------------
  // REMOVE GRÁFICO ANTERIOR
  // -------------------------------------------------------

  if (grafico) {
    grafico.destroy();
  }

  // -------------------------------------------------------
  // CONFIGURAÇÕES
  // -------------------------------------------------------

  let backgroundColor;
  let borderColor;
  let borderWidth = 2;
  let borderRadius = 0;
  let fill = false;
  let tension = 0;
  let pointRadius = 0;
  let pointHoverRadius = 0;
  let pointBackgroundColor;
  let pointBorderColor;
  let pointBorderWidth = 0;

  // ----------------------------
  // BARRAS
  // ----------------------------

  if (tipo === 'bar') {
    backgroundColor = cores;
    borderColor = cores;
    borderRadius = 12;
  }

  // ----------------------------
  // LINHAS
  // ----------------------------

  if (tipo === 'line') {
    backgroundColor = 'rgba(56,189,248,.18)';
    borderColor = '#38bdf8';
    borderWidth = 4;

    fill = true;
    tension = 0.35;

    pointRadius = 6;
    pointHoverRadius = 8;
    pointBackgroundColor = '#67e8f9';
    pointBorderColor = '#ffffff';
    pointBorderWidth = 2;
  }

  // ----------------------------
  // PIZZA
  // ----------------------------

  if (tipo === 'pie') {
    backgroundColor = cores;
    borderColor = '#ffffff';
  }

  // ----------------------------
  // HISTOGRAMA
  // ----------------------------

  if (tipo === 'histogram') {
    backgroundColor = '#38bdf8';
    borderColor = '#0ea5e9';
    borderWidth = 1;
    borderRadius = 0;
  }

  // =====================================================
  // CRIA GRÁFICO
  // =====================================================

  grafico = new Chart(canvasGrafico, {
    type: tipo === 'histogram' ? 'bar' : tipo,

    data: {
      labels,
     datasets: [{
  label: 'Frequência',
  data: dados,

  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius,

  // 👉 ESSENCIAL PRO HISTOGRAMA
  barPercentage: tipo === 'histogram' ? 1.0 : 0.8,
  categoryPercentage: tipo === 'histogram' ? 1.0 : 0.8,

  fill,
  tension,

  pointRadius,
  pointHoverRadius,
  pointBackgroundColor,
  pointBorderColor,
  pointBorderWidth
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
          display: tipo === 'pie',
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
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(56,189,248,.25)',
          borderWidth: 1
        }
      },

      scales: tipo !== 'pie' ? {
        x: {
          ticks: {
            color: 'rgba(255,255,255,.75)',
            font: { weight: '600' }
          },
          grid: {
            color: 'rgba(255,255,255,.05)'
          }
        },

        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(255,255,255,.75)',
            stepSize: 1,
            font: { weight: '600' }
          },
          grid: {
            color: 'rgba(255,255,255,.05)'
          }
        }

      } : {}
    }
  });
}


/* =========================================================
   GERA CONJUNTO ALEATÓRIO
========================================================= */

function gerarConjuntoAleatorio() {

  const quantidade = Math.floor(Math.random() * 8) + 5;
  const valores = [];

  for (let i = 0; i < quantidade; i++) {
    valores.push(Math.floor(Math.random() * 20) + 1);
  }

  inputDados.value = valores.join(', ');
  analisarDados();
}


/* =========================================================
   REVELAÇÃO DOS CAMPOS
========================================================= */

const camposRevelaveis = document.querySelectorAll('.campo-revelavel');

camposRevelaveis.forEach(campo => {

  campo.addEventListener('click', () => {

    if (campo.classList.contains('oculto')) {
      campo.classList.remove('oculto');
      campo.classList.add('revelado');

    } else {
      campo.classList.remove('revelado');
      campo.classList.add('oculto');
    }

  });

});


/* =========================================================
   EVENTOS
========================================================= */

botaoAnalisar.addEventListener('click', analisarDados);

inputDados.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    analisarDados();
  }
});

seletorGrafico.addEventListener('change', analisarDados);

botaoAleatorio.addEventListener('click', gerarConjuntoAleatorio);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

analisarDados();