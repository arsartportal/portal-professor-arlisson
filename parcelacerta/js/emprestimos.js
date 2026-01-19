/* =====================================================
   EMPRESTIMOS.JS — REGRAS DE NEGÓCIO
   ParcelaCerta
===================================================== */

import {
  tabelaPrice,
  tabelaSAC,
  jurosSimples,
  resumoTabela
} from './calculos.js';

/* ===============================
   MODELO DE EMPRÉSTIMO
================================ */

/**
 * Cria um empréstimo completo
 */
export function criarEmprestimo(dados) {

  let tabela = [];
  let resumo = {};

  if (dados.tipo === 'price') {
    tabela = tabelaPrice(dados.valor, dados.taxa, dados.parcelas);
    resumo = resumoTabela(tabela);
  }

  if (dados.tipo === 'sac') {
    tabela = tabelaSAC(dados.valor, dados.taxa, dados.parcelas);
    resumo = resumoTabela(tabela);
  }

  if (dados.tipo === 'simples') {
    const simples = jurosSimples(dados.valor, dados.taxa, dados.parcelas);
    resumo = {
      totalJuros: simples.jurosTotal,
      totalPago: simples.total
    };
  }

  return {
    id: crypto.randomUUID(),
    titulo: dados.titulo,
    valor: dados.valor,
    taxa: dados.taxa,
    parcelas: dados.parcelas,
    tipo: dados.tipo,
    multa: dados.multa,
    mora: dados.mora,
    criadoEm: new Date().toISOString(),
    tabela,
    resumo,
    parcelasPagas: 0
  };
}
