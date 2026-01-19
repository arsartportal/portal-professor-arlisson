/* =====================================================
   APP.JS — CONTROLADOR CENTRAL
   ParcelaCerta
===================================================== */

import { criarEmprestimo } from './emprestimos.js';
import {
  atualizarResumoDashboard,
  preencherTabelaParcelas,
  atualizarResumoParcelas
} from './ui.js';

import {
  criarGraficoSaldo,
  criarGraficoJuros
} from './graficos.js';

/* ===============================
   STORAGE (temporário)
================================ */

const STORAGE_KEY = 'parcelacerta_emprestimo';

/* ===============================
   INIT
================================ */

document.addEventListener('DOMContentLoaded', () => {

  const pagina = window.location.pathname;

  if (pagina.endsWith('dashboard.html')) {
    carregarDashboard();
  }

  if (pagina.endsWith('parcelas.html')) {
    carregarParcelas();
  }

  if (pagina.endsWith('novo-emprestimo.html')) {
    configurarFormulario();
  }
});

/* ===============================
   DASHBOARD
================================ */

function carregarDashboard() {
  const emprestimo = obterEmprestimo();

  if (!emprestimo) return;

  atualizarResumoDashboard(emprestimo);

  criarGraficoSaldo('graficoSaldo', emprestimo.tabela);
  criarGraficoJuros('graficoJuros', emprestimo.tabela);
}

/* ===============================
   PARCELAS
================================ */

function carregarParcelas() {
  const emprestimo = obterEmprestimo();

  if (!emprestimo) return;

  atualizarResumoParcelas(emprestimo);
  preencherTabelaParcelas(emprestimo.tabela);

  criarGraficoSaldo('graficoSaldo', emprestimo.tabela);
}

/* ===============================
   NOVO EMPRÉSTIMO
================================ */

function configurarFormulario() {
  const form = document.getElementById('formEmprestimo');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
      titulo: document.getElementById('titulo').value,
      valor: Number(document.getElementById('valor').value),
      taxa: Number(document.getElementById('taxa').value),
      parcelas: Number(document.getElementById('parcelas').value),
      tipo: document.getElementById('tipo').value,
      multa: Number(document.getElementById('multa').value),
      mora: Number(document.getElementById('mora').value)
    };

    const emprestimo = criarEmprestimo(dados);
    salvarEmprestimo(emprestimo);

    window.location.href = 'dashboard.html';
  });
}

/* ===============================
   STORAGE
================================ */

function salvarEmprestimo(emprestimo) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emprestimo));
}

function obterEmprestimo() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : null;
}
