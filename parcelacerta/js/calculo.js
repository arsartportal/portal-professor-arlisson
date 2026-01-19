/* =====================================================
   CALCULOS.JS — MATEMÁTICA FINANCEIRA
   ParcelaCerta
   - Arquivo PURO (sem DOM, sem storage)
===================================================== */

/* ===============================
   UTILIDADES
================================ */

/**
 * Arredonda valores para 2 casas decimais
 */
function round(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/* ===============================
   JUROS SIMPLES
================================ */

/**
 * Juros simples
 */
export function jurosSimples(valor, taxaMensal, parcelas) {
  const jurosTotal = valor * (taxaMensal / 100) * parcelas;
  const total = valor + jurosTotal;
  const parcela = total / parcelas;

  return {
    valor: round(valor),
    taxaMensal,
    parcelas,
    jurosTotal: round(jurosTotal),
    total: round(total),
    valorParcela: round(parcela)
  };
}

/* ===============================
   TABELA PRICE
================================ */

/**
 * Sistema PRICE (parcela fixa)
 */
export function tabelaPrice(valor, taxaMensal, parcelas) {
  const i = taxaMensal / 100;
  const pmt = valor * (i / (1 - Math.pow(1 + i, -parcelas)));

  let saldo = valor;
  let tabela = [];

  for (let n = 1; n <= parcelas; n++) {
    const juros = saldo * i;
    const amortizacao = pmt - juros;
    saldo -= amortizacao;

    tabela.push({
      parcela: n,
      valorParcela: round(pmt),
      juros: round(juros),
      amortizacao: round(amortizacao),
      saldo: round(saldo > 0 ? saldo : 0)
    });
  }

  return tabela;
}

/* ===============================
   SISTEMA SAC
================================ */

/**
 * Sistema SAC (amortização constante)
 */
export function tabelaSAC(valor, taxaMensal, parcelas) {
  const i = taxaMensal / 100;
  const amortizacaoConstante = valor / parcelas;

  let saldo = valor;
  let tabela = [];

  for (let n = 1; n <= parcelas; n++) {
    const juros = saldo * i;
    const parcela = amortizacaoConstante + juros;
    saldo -= amortizacaoConstante;

    tabela.push({
      parcela: n,
      valorParcela: round(parcela),
      juros: round(juros),
      amortizacao: round(amortizacaoConstante),
      saldo: round(saldo > 0 ? saldo : 0)
    });
  }

  return tabela;
}

/* ===============================
   MULTA E MORA
================================ */

/**
 * Calcula multa e mora por atraso
 */
export function calcularAtraso(valorParcela, multaPercentual, moraDiaria, diasAtraso) {
  const multa = valorParcela * (multaPercentual / 100);
  const mora = valorParcela * (moraDiaria / 100) * diasAtraso;

  return {
    multa: round(multa),
    mora: round(mora),
    total: round(valorParcela + multa + mora)
  };
}

/* ===============================
   AMORTIZAÇÃO ANTECIPADA
================================ */

/**
 * Aplica amortização no saldo
 */
export function amortizarSaldo(saldoAtual, valorAmortizado) {
  const novoSaldo = saldoAtual - valorAmortizado;
  return round(novoSaldo > 0 ? novoSaldo : 0);
}

/* ===============================
   RESUMOS
================================ */

/**
 * Calcula totais a partir de uma tabela
 */
export function resumoTabela(tabela) {
  const totalJuros = tabela.reduce((s, p) => s + p.juros, 0);
  const totalPago = tabela.reduce((s, p) => s + p.valorParcela, 0);

  return {
    totalJuros: round(totalJuros),
    totalPago: round(totalPago)
  };
}
