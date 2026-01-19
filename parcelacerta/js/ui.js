/* =====================================================
   UI.JS — INTERFACE DO USUÁRIO
   ParcelaCerta
   - Manipula DOM
   - Formata dados
   - Exibe informações
===================================================== */

/* ===============================
   UTILIDADES VISUAIS
================================ */

/**
 * Formata número para moeda brasileira
 */
export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Limpa conteúdo de um elemento
 */
function limparElemento(el) {
  if (el) el.innerHTML = '';
}

/* ===============================
   DASHBOARD
================================ */

/**
 * Atualiza os cards de resumo do dashboard
 */
export function atualizarResumoDashboard(emprestimo) {

  const totalEmprestado = document.getElementById('totalEmprestado');
  const totalPago = document.getElementById('totalPago');
  const saldoDevedor = document.getElementById('saldoDevedor');
  const parcelasQuitadas = document.getElementById('parcelasQuitadas');
  const tituloEmprestimo = document.getElementById('tituloEmprestimo');
  const detalhesEmprestimo = document.getElementById('detalhesEmprestimo');

  if (!emprestimo) return;

  totalEmprestado.innerText = formatarMoeda(emprestimo.valor);
  totalPago.innerText = formatarMoeda(emprestimo.resumo.totalPago);

  const saldo =
    emprestimo.valor -
    (emprestimo.resumo.totalPago - emprestimo.resumo.totalJuros);

  saldoDevedor.innerText = formatarMoeda(saldo);

  parcelasQuitadas.innerText =
    `${emprestimo.parcelasPagas} / ${emprestimo.parcelas}`;

  tituloEmprestimo.innerText = emprestimo.titulo;

  detalhesEmprestimo.innerText =
    `Valor ${formatarMoeda(emprestimo.valor)} • ` +
    `${emprestimo.taxa}% a.m • ` +
    `${emprestimo.parcelas} parcelas • ` +
    emprestimo.tipo.toUpperCase();
}

/* ===============================
   PARCELAS.HTML
================================ */

/**
 * Preenche a tabela de parcelas
 */
export function preencherTabelaParcelas(tabela) {

  const tbody = document.querySelector('#tabelaParcelas tbody');
  limparElemento(tbody);

  if (!tabela || tabela.length === 0) return;

  tabela.forEach((p) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${p.parcela}</td>
      <td>${formatarMoeda(p.valorParcela)}</td>
      <td>${formatarMoeda(p.juros)}</td>
      <td>${formatarMoeda(p.amortizacao)}</td>
      <td>${formatarMoeda(p.saldo)}</td>
      <td>
        <button class="btn btn-pagar" data-parcela="${p.parcela}">
          Pagar
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

/**
 * Atualiza o resumo do empréstimo em parcelas.html
 */
export function atualizarResumoParcelas(emprestimo) {

  const valorEmprestado = document.getElementById('valorEmprestado');
  const totalJuros = document.getElementById('totalJuros');
  const totalPagar = document.getElementById('totalPagar');

  if (!emprestimo) return;

  valorEmprestado.innerText =
    formatarMoeda(emprestimo.valor);

  totalJuros.innerText =
    formatarMoeda(emprestimo.resumo.totalJuros);

  totalPagar.innerText =
    formatarMoeda(emprestimo.resumo.totalPago);
}

/* ===============================
   FEEDBACK VISUAL
================================ */

/**
 * Exibe alerta simples
 */
export function alerta(msg) {
  alert(msg);
}
