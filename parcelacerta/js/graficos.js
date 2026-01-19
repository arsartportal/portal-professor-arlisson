/* =====================================================
   GRAFICOS.JS — VISUALIZAÇÃO DE DADOS
   ParcelaCerta
   - Usa Chart.js
   - Não calcula
===================================================== */

let graficoSaldo = null;
let graficoJuros = null;

/* ===============================
   GRÁFICO SALDO DEVEDOR
================================ */

export function criarGraficoSaldo(canvasId, tabela) {

  const ctx = document.getElementById(canvasId);
  if (!ctx || !tabela) return;

  const labels = tabela.map(p => `Parcela ${p.parcela}`);
  const dadosSaldo = tabela.map(p => p.saldo);

  if (graficoSaldo) {
    graficoSaldo.destroy();
  }

  graficoSaldo = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Saldo Devedor',
        data: dadosSaldo,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          ticks: {
            callback: value =>
              value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
          }
        }
      }
    }
  });
}

/* ===============================
   GRÁFICO JUROS x AMORTIZAÇÃO
================================ */

export function criarGraficoJuros(canvasId, tabela) {

  const ctx = document.getElementById(canvasId);
  if (!ctx || !tabela) return;

  const labels = tabela.map(p => `Parcela ${p.parcela}`);
  const juros = tabela.map(p => p.juros);
  const amortizacao = tabela.map(p => p.amortizacao);

  if (graficoJuros) {
    graficoJuros.destroy();
  }

  graficoJuros = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Juros',
          data: juros,
          stack: 'financeiro'
        },
        {
          label: 'Amortização',
          data: amortizacao,
          stack: 'financeiro'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          stacked: true,
          ticks: {
            callback: value =>
              value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
          }
        },
        x: {
          stacked: true
        }
      }
    }
  });
}
