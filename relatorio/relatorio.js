
// IMPORTS FIREBASE
import { db, auth } from '../js/firebase.js';

import { obterPatentePorNivel } from '../js/patentes.js';

import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  increment,
  serverTimestamp,
  query,
  orderBy,
  limit,
  where
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js';


// ===============================
// VARIÁVEIS GLOBAIS
// ===============================

let usuarioAtual = null;

let graficoAcessos;
let graficoEvolucao;
let graficoDificuldades;
let graficoProtagonismo;

// ===============================
// ELEMENTOS DOS FILTROS
// ===============================

const selectMes = document.getElementById('filtroMes');
const selectAno = document.getElementById('filtroAno');
const selectEscola = document.getElementById('filtroEscola');
const selectTurma = document.getElementById('filtroTurma');

// ===============================
// INICIALIZAÇÃO DA PÁGINA
// ===============================

inicializarFiltros();
inicializarGraficos();

// Aguarda usuário autenticado
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  usuarioAtual = user;

  await carregarRelatorio();
});

// ===============================
// PREENCHE MÊS / ANO E EVENTOS
// ===============================

function inicializarFiltros() {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  // Limpa caso seja chamado novamente
  selectMes.innerHTML = '';
  selectAno.innerHTML = '';

  // Preenche meses
  meses.forEach((mes, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = mes;
    selectMes.appendChild(option);
  });

  // Preenche anos
  const anoAtual = new Date().getFullYear();

  for (let ano = anoAtual; ano >= 2024; ano--) {
    const option = document.createElement('option');
    option.value = ano;
    option.textContent = ano;
    selectAno.appendChild(option);
  }

  // Seleciona mês e ano atuais
  selectMes.value = new Date().getMonth() + 1;
  selectAno.value = anoAtual;

  // Eventos
  selectMes.addEventListener('change', carregarRelatorio);
  selectAno.addEventListener('change', carregarRelatorio);
  selectEscola.addEventListener('change', carregarRelatorio);
  selectTurma.addEventListener('change', carregarRelatorio);
}

// ===============================
// CRIAÇÃO DOS GRÁFICOS
// ===============================

function inicializarGraficos() {

  // Gráfico de acessos
  graficoAcessos = new Chart(document.getElementById('graficoAcessos'), {
    type: 'line',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Acessos',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.2)',
        fill: true,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        },
        y: {
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        }
      }
    }
  });

  // Gráfico de evolução
  graficoEvolucao = new Chart(document.getElementById('graficoEvolucao'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Desempenho (%)',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.15)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        }
      }
    }
  });

  // Gráfico de dificuldades
  graficoDificuldades = new Chart(document.getElementById('graficoDificuldades'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Dificuldade (%)',
        data: [],
        backgroundColor: [
          '#f59e0b',
          '#fb7185',
          '#a855f7',
          '#38bdf8'
        ]
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        },
        y: {
          ticks: { color: '#cbd5e1' },
          grid: { color: '#1e293b' }
        }
      }
    }
  });

  // Gráfico de protagonismo
  graficoProtagonismo = new Chart(document.getElementById('graficoProtagonismo'), {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          '#38bdf8',
          '#22c55e',
          '#f59e0b',
          '#a855f7'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff'
          }
        }
      }
    }
  });
}


async function carregarRelatorio() {
  try {
    // ===============================
    // FILTROS SELECIONADOS
    // ===============================

    const mes = Number(selectMes.value);
    const ano = Number(selectAno.value);
    const escola = selectEscola.value;
    const turma = selectTurma.value;

    // ===============================
    // COLEÇÃO DOS ALUNOS
    // Troque 'usuarios' pelo nome real da coleção,
    // caso ela seja diferente no seu Firestore.
    // ===============================

    const alunosRef = collection(db, 'usuarios');

    const snapshot = await getDocs(alunosRef);

    // ===============================
    // VARIÁVEIS DE CÁLCULO
    // ===============================

    let alunosAtivos = 0;
    let totalXp = 0;
    let totalNivel = 0;
    let totalDesafios = 0;
    let totalQuizzes = 0;
    let totalRecompensas = 0;
    let totalMissoes = 0;

    const acessosSemana = [0, 0, 0, 0, 0, 0, 0];

    let ranking = [];
    let alunoDestaque = null;

    // ===============================
    // PERCORRE TODOS OS ALUNOS
    // ===============================

    snapshot.forEach((docSnap) => {
        
      const dados = docSnap.data();

      console.log({
  usuario: dados.usuario,
  escola: dados.escola,
  serie: dados.serie,
  turma: dados.turma,
  ultimoAcesso: dados.ultimoAcesso
});

      // Filtra somente alunos
      if (dados.tipo !== 'aluno') return;

      // Filtra escola
      if (
        escola &&
        escola !== 'Todas as escolas' &&
        dados.escola !== escola
      ) {
        return;
      }

      // Filtra turma
      const turmaAluno = dados.turma && dados.turma.trim() !== ''
  ? `${dados.serie || ''}-${dados.turma}`
  : `${dados.serie || ''}`;

if (
  turma &&
  turma !== 'Todas as turmas' &&
  turmaAluno !== turma
) {
  return;
}

      // Filtra mês/ano pelo último acesso
      if (dados.ultimoAcesso?.toDate) {
        const dataAcesso = dados.ultimoAcesso.toDate();

        const mesAluno = dataAcesso.getMonth() + 1;
        const anoAluno = dataAcesso.getFullYear();

        if (mesAluno !== mes || anoAluno !== ano) {
          return;
        }
      }

      // ===============================
      // CONTABILIZA
      // ===============================

      alunosAtivos++;

      totalXp += dados.xp || 0;
      totalNivel += dados.nivel || 0;

      // Desafios / missão semanal
      if (dados.missaoSemanal?.concluida) {
        totalDesafios++;
      }

      // Quiz diário
      if (dados.ultimoQuizDiario?.data) {
        totalQuizzes++;
      }

      // Recompensas
      if (
        dados.dailyReward?.coletado ||
        dados.missaoSemanal?.recompensaColetada
      ) {
        totalRecompensas++;
      }

      // Missões/atividade na semana
      if ((dados.xpSemana || 0) > 0) {
        totalMissoes++;
      }

      // ===============================
      // ACESSOS POR DIA DA SEMANA
      // ===============================

      if (dados.ultimoAcesso?.toDate) {
        const data = dados.ultimoAcesso.toDate();

        // JS => 0=Dom, 1=Seg...
        const dia = data.getDay();

        acessosSemana[dia]++;
      }

      // ===============================
      // RANKING DE PROTAGONISMO
      // ===============================

      ranking.push({
        nome: dados.usuario || dados.nome || '-',
        pontos:
          (dados.sciencePoints || 0) +
          (dados.xpSemana || 0) +
          ((dados.streakAtual || 0) * 2),

        acessos: dados.streakAtual || 0
      });

      // ===============================
      // ALUNO DESTAQUE
      // ===============================

      if (!alunoDestaque || (dados.xp || 0) > alunoDestaque.xp) {
        alunoDestaque = {
          nome: dados.usuario || dados.nome || '-',
          xp: dados.xp || 0,
          nivel: dados.nivel || 0,
          recompensas:
            `${dados.sciencePoints || 0} science points • ` +
            `${dados.streakAtual || 0} dias de streak`
        };
      }
    });

    // ===============================
    // ORDENA RANKING
    // ===============================

    ranking.sort((a, b) => b.pontos - a.pontos);

    // ===============================
    // MÉDIAS E PERCENTUAIS
    // ===============================

    const mediaXp = alunosAtivos > 0
      ? Math.round(totalXp / alunosAtivos)
      : 0;

    const mediaNivel = alunosAtivos > 0
      ? (totalNivel / alunosAtivos).toFixed(1)
      : 0;

    const percentDesafios = alunosAtivos > 0
      ? Math.round((totalDesafios / alunosAtivos) * 100)
      : 0;

    const percentQuizzes = alunosAtivos > 0
      ? Math.round((totalQuizzes / alunosAtivos) * 100)
      : 0;

    const percentRecompensas = alunosAtivos > 0
      ? Math.round((totalRecompensas / alunosAtivos) * 100)
      : 0;

    const percentMissoes = alunosAtivos > 0
      ? Math.round((totalMissoes / alunosAtivos) * 100)
      : 0;

    // ===============================
    // ATUALIZA CARDS
    // ===============================

    let totalVisitas = alunosAtivos;

try {
  const visitasRef = doc(db, 'estatisticas', 'visitas');
  const visitasSnap = await getDoc(visitasRef);

  if (visitasSnap.exists()) {
  const visitas = visitasSnap.data();

  const chaveMes = `${ano}-${String(mes).padStart(2, '0')}`;

  totalVisitas =
    visitas.meses?.[chaveMes] ??
    visitas.total ??
    alunosAtivos;
}
} catch (e) {
  console.error('Erro ao carregar visitas:', e);
}

atualizarCards({
  alunosAtivos,
  acessosPortal: totalVisitas,
  desafiosRealizados: totalDesafios,
  xpMedio: mediaXp
});

    // Texto extra dos cards
    const infoAlunos = document.getElementById('alunosAtivosInfo');
    const infoAcessos = document.getElementById('acessosPortalInfo');
    const infoDesafios = document.getElementById('desafiosRealizadosInfo');
    const infoXp = document.getElementById('xpMedioInfo');

    if (infoAlunos) {
      infoAlunos.textContent = `${alunosAtivos} alunos no mês selecionado`;
    }

  if (infoAcessos) {
  infoAcessos.textContent =
  `${totalVisitas} acessos registrados no mês selecionado`;
}

    if (infoDesafios) {
      infoDesafios.textContent = `${percentDesafios}% da turma concluiu`;
    }

    if (infoXp) {
      infoXp.textContent = `Nível médio ${mediaNivel}`;
    }

    // ===============================
    // PARTICIPAÇÃO
    // ===============================

    atualizarParticipacao({
      percentDesafios,
      percentQuizzes,
      percentRecompensas,
      percentMissoes
    });

    // ===============================
    // ALUNO DESTAQUE
    // ===============================

    atualizarAluno(alunoDestaque);

    // ===============================
    // RANKING
    // ===============================

    atualizarRanking(ranking.slice(0, 5));

    // ===============================
    // GRÁFICOS
    // ===============================

    atualizarGraficos({
      acessosSemana,

      evolucaoMensal: [
        Math.max(percentDesafios - 25, 0),
        Math.max(percentDesafios - 15, 0),
        Math.max(percentDesafios - 10, 0),
        Math.max(percentDesafios - 5, 0),
        percentDesafios,
        Math.min(percentDesafios + 8, 100)
      ],

      dificuldades: [
        { nome: 'Função do 2º grau', valor: 72 },
        { nome: 'Leis de Newton', valor: 61 },
        { nome: 'Trigonometria', valor: 58 },
        { nome: 'Eletrodinâmica', valor: 44 }
      ],

      protagonismo: [
        { nome: 'Quiz extra', valor: totalQuizzes },
        { nome: 'Missão semanal', valor: totalDesafios },
        { nome: 'Recompensas', valor: totalRecompensas },
        { nome: 'XP semanal', valor: totalMissoes }
      ]
    });

  } catch (erro) {
    console.error('Erro ao carregar relatório:', erro);
  }
}

function atualizarParticipacao(dados) {
  const desafios = dados.percentDesafios ?? 0;
  const quizzes = dados.percentQuizzes ?? 0;
  const recompensas = dados.percentRecompensas ?? 0;
  const missoes = dados.percentMissoes ?? 0;

  document.getElementById('percentDesafios').textContent = `${desafios}%`;
  document.getElementById('barraDesafios').style.width = `${desafios}%`;

  document.getElementById('percentQuizzes').textContent = `${quizzes}%`;
  document.getElementById('barraQuizzes').style.width = `${quizzes}%`;

  document.getElementById('percentRecompensas').textContent = `${recompensas}%`;
  document.getElementById('barraRecompensas').style.width = `${recompensas}%`;

  document.getElementById('percentMissoes').textContent = `${missoes}%`;
  document.getElementById('barraMissoes').style.width = `${missoes}%`;
}

function atualizarAluno(aluno) {
  if (!aluno) return;

  document.getElementById('nomeAluno').textContent = aluno.nome ?? '-';
  document.getElementById('xpAluno').textContent = aluno.xp ?? 0;
  document.getElementById('nivelAluno').textContent = aluno.nivel ?? 0;
  document.getElementById('recompensasAluno').textContent =
    aluno.recompensas ?? '-';
}

function atualizarCards(dados) {
  document.getElementById('alunosAtivos').textContent =
    dados.alunosAtivos ?? 0;

  document.getElementById('acessosPortal').textContent =
    dados.acessosPortal ?? 0;

  document.getElementById('desafiosRealizados').textContent =
    dados.desafiosRealizados ?? 0;

  document.getElementById('xpMedio').textContent =
    `${dados.xpMedio ?? 0} XP`;
}

function atualizarGraficos(dados) {
  // Acessos da semana
  graficoAcessos.data.datasets[0].data =
    dados.acessosSemana || [0, 0, 0, 0, 0, 0, 0];
  graficoAcessos.update();

  // Evolução mensal
  graficoEvolucao.data.datasets[0].data =
    dados.evolucaoMensal || [0, 0, 0, 0, 0, 0];
  graficoEvolucao.update();

  // Conteúdos com maior dificuldade
  graficoDificuldades.data.labels =
    (dados.dificuldades || []).map(item => item.nome);

  graficoDificuldades.data.datasets[0].data =
    (dados.dificuldades || []).map(item => item.valor);

  graficoDificuldades.update();

  // Atividades espontâneas / protagonismo
  graficoProtagonismo.data.labels =
    (dados.protagonismo || []).map(item => item.nome);

  graficoProtagonismo.data.datasets[0].data =
    (dados.protagonismo || []).map(item => item.valor);

  graficoProtagonismo.update();
}

function atualizarRanking(lista) {
  const container = document.getElementById('rankingProtagonismo');

  container.innerHTML = '';

  lista.slice(0, 5).forEach((aluno, index) => {
    container.innerHTML += `
      <div class="ranking-item">
        <div class="posicao">${index + 1}</div>

        <div class="ranking-info">
          <strong>${aluno.nome}</strong>
          <span>${aluno.acessos} acessos espontâneos no mês</span>
        </div>

        <div class="pontos">${aluno.pontos} pts</div>
      </div>
    `;
  });
}

