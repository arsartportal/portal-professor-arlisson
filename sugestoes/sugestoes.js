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
  orderBy
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js';

const botaoEnviar = document.getElementById('btnEnviarSugestao');
const campoTitulo = document.getElementById('tituloSugestao');
const campoCategoria = document.getElementById('categoriaSugestao');
const campoDescricao = document.getElementById('descricaoSugestao');
const listaSugestoes = document.getElementById('listaSugestoes');
const campoPesquisa = document.getElementById('campoPesquisa');
const botoesFiltro = document.querySelectorAll('.filtro');

let dadosUsuario = {};
let sugestoes = [];
let filtroAtual = 'todas';
let usuarioAtual = null;

onAuthStateChanged(auth, async (user) => {
  usuarioAtual = user;

  if (!user) {
    listaSugestoes.innerHTML = `
      <div class="sem-resultados">
        <h3>🔒 Faça login</h3>
        <p>Entre na sua conta para visualizar e enviar sugestões.</p>
      </div>
    `;
    return;
  }

const snap = await getDoc(doc(db, 'usuarios', user.uid));

if (snap.exists()) {
  dadosUsuario = snap.data();
}

  await carregarSugestoes();
});

function obterEmojiCategoria(categoria) {
  const emojis = {
    Gamificação: '🎮',
    Loja: '🛒',
    Desafios: '🏆',
    Avatar: '🧍',
    Ranking: '📈',
    Calculadora: '🧮',
    Quiz: '🧠',
    Outro: '💡'
  };

  return emojis[categoria] || '💡';
}

function obterClasseStatus(status) {
  if (status === 'Em desenvolvimento') return 'status-desenvolvimento';
  if (status === 'Em análise') return 'status-analise';
  if (status === 'Planejada') return 'status-planejada';
  if (status === 'Adicionada') return 'status-adicionada';
  return '';
}

async function carregarSugestoes() {
  try {
    const sugestoesRef = collection(db, 'sugestoes');
    const consulta = query(sugestoesRef, orderBy('votos', 'desc'));
    const snapshot = await getDocs(consulta);

    sugestoes = [];

    snapshot.forEach((docSnap) => {
      sugestoes.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    atualizarEstatisticas();
    renderizarSugestoes();
  } catch (erro) {
    console.error('Erro ao carregar sugestões:', erro);
  }
}

function atualizarEstatisticas() {
  document.getElementById('totalSugestoes').textContent = sugestoes.length;

  const aprovadas = sugestoes.filter(s =>
    s.status === 'Liberada para votação' ||
    s.status === 'Adicionada'
  ).length;

  document.getElementById('totalAprovadas').textContent = aprovadas;

  const desenvolvimento = sugestoes.filter(s =>
    s.status === 'Em desenvolvimento'
  ).length;

  document.getElementById('totalDesenvolvimento').textContent = desenvolvimento;

  // ======================
  // TOP INVENTORES
  // ======================

  const ranking = {};

  sugestoes.forEach((sugestao) => {
    if (!ranking[sugestao.uidAutor]) {
      ranking[sugestao.uidAutor] = {
        nome: sugestao.autor,
        pontos: 0
      };
    }

    // Enviou sugestão
    ranking[sugestao.uidAutor].pontos += 10;

    // Foi aprovada para votação
    if (sugestao.status === 'Liberada para votação') {
      ranking[sugestao.uidAutor].pontos += 20;
    }

    // Entrou em desenvolvimento
    if (sugestao.status === 'Em desenvolvimento') {
      ranking[sugestao.uidAutor].pontos += 100;
    }

    // Foi adicionada ao portal
    if (sugestao.status === 'Adicionada') {
      ranking[sugestao.uidAutor].pontos += 200;
    }
  });

  const rankingOrdenado = Object.values(ranking)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 3);

  const containerRanking = document.querySelector('.ranking');

  containerRanking.innerHTML = `
    <h3>🏆 Top Inventores</h3>

    ${rankingOrdenado.map((aluno, index) => `
      <div class="aluno">
        <div class="aluno-info">
          <div class="avatar">
            ${aluno.nome.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>${aluno.nome}</strong>
            <p>${aluno.pontos} XP</p>
          </div>
        </div>

        <span>${index + 1}º</span>
      </div>
    `).join('')}
  `;
}

function criarCard(sugestao) {
  const usuarioJaVotou = usuarioAtual && sugestao.votaram?.includes(usuarioAtual.uid);
  const ehAutor = usuarioAtual && sugestao.uidAutor === usuarioAtual.uid;
  const ehProfessor = usuarioAtual?.uid === 'DLAW0SxC7EfmpYWwIfElWubwuvp2';
  const patente = obterPatentePorNivel(sugestao.nivel || 0);

const hoje = new Date().toISOString().split('T')[0];

const usuarioJaVotouHoje =
  sugestao.ultimoVoto?.[usuarioAtual?.uid] === hoje;

  return `
    <article class="card">
      <div class="card-topo">
        <span class="categoria">
          ${obterEmojiCategoria(sugestao.categoria)} ${sugestao.categoria}
        </span>

        <span class="status ${obterClasseStatus(sugestao.status)}">
          ${sugestao.status}
        </span>
      </div>

      <h4>${sugestao.titulo}</h4>
      <p>${sugestao.descricao}</p>

      <div class="card-footer">
        <div class="autor-info">
  <div class="linha-autor">
    <img class="patente-img" src="${patente.imagem}" alt="Patente">

    <div>
      <span class="autor">👤 ${sugestao.autor}</span>

      <span class="detalhes-autor">
        🏫 ${sugestao.escola || '-'} •
        📚 ${sugestao.serie || '-'}${sugestao.turma ? ' - Turma ' + sugestao.turma : ''}
      </span>
    </div>
  </div>

  <span class="votos">
    👍 ${sugestao.votos || 0} votos
  </span>
</div>

        ${
  ehProfessor
    ? `
      <div class="acoes-professor">
        <button class="btn-aprovar" onclick="alterarStatus('${sugestao.id}', 'Liberada para votação')">
          ✅ Aprovar
        </button>

        <button class="btn-analise" onclick="alterarStatus('${sugestao.id}', 'Em análise')">
          ⏳ Em análise
        </button>

        <button class="btn-recusar" onclick="alterarStatus('${sugestao.id}', 'Recusada')">
          ❌ Recusar
        </button>
      </div>
    `
    : `
      <button
        class="btn-votar"
        onclick="votarSugestao('${sugestao.id}')"
        ${
          sugestao.status !== 'Liberada para votação' ||
          usuarioJaVotouHoje ||
          ehAutor
            ? 'disabled'
            : ''
        }
      >
        ${
          ehAutor
            ? '🚫 Sua sugestão'
            : sugestao.status !== 'Liberada para votação'
              ? '⏳ Em análise'
              : usuarioJaVotouHoje
                ? '🕒 Já votou hoje'
                : '⬆ Votar'
        }
      </button>
    `
}
      </div>
    </article>
  `;
}

function renderizarSugestoes() {
  const ehProfessor = usuarioAtual?.uid === 'DLAW0SxC7EfmpYWwIfElWubwuvp2';

let listaFiltrada = sugestoes.filter((sugestao) => {

  if (ehProfessor) return true;

  if (sugestao.uidAutor === usuarioAtual.uid) return true;

  return [
    'Liberada para votação',
    'Em desenvolvimento',
    'Adicionada'
  ].includes(sugestao.status);
});

  const pesquisa = campoPesquisa.value.toLowerCase();

  if (pesquisa) {
    listaFiltrada = listaFiltrada.filter((s) =>
      s.titulo.toLowerCase().includes(pesquisa) ||
      s.descricao.toLowerCase().includes(pesquisa) ||
      s.categoria.toLowerCase().includes(pesquisa)
    );
  }

  if (filtroAtual === 'recentes') {
    listaFiltrada.sort((a, b) => {
      const dataA = a.data?.seconds || 0;
      const dataB = b.data?.seconds || 0;
      return dataB - dataA;
    });
  }

  if (filtroAtual === 'aprovadas') {
    listaFiltrada = listaFiltrada.filter((s) =>
      s.status === 'Planejada' || s.status === 'Adicionada'
    );
  }

  if (filtroAtual === 'gamificacao') {
    listaFiltrada = listaFiltrada.filter((s) => s.categoria === 'Gamificação');
  }

  if (!listaFiltrada.length) {
    listaSugestoes.innerHTML = `
      <div class="sem-resultados">
        <h3>😕 Nenhuma sugestão encontrada</h3>
        <p>Tente outro filtro ou envie a primeira ideia!</p>
      </div>
    `;
    return;
  }

  listaSugestoes.innerHTML = listaFiltrada.map(criarCard).join('');
}

window.votarSugestao = async function (idSugestao) {
  if (!usuarioAtual) return;

  const sugestao = sugestoes.find((s) => s.id === idSugestao);

  if (!sugestao) return;

  if (sugestao.status !== 'Liberada para votação') {
    Swal.fire({
      icon: 'info',
      title: 'Ainda em análise',
      text: 'Essa sugestão ainda não foi aprovada pelo professor.'
    });
    return;
  }

  const hoje = new Date().toISOString().split('T')[0];
  const jaVotouHoje = sugestao.ultimoVoto?.[usuarioAtual.uid] === hoje;

  if (jaVotouHoje) {
    Swal.fire({
      icon: 'warning',
      title: 'Você já votou hoje!',
      text: 'Você poderá votar novamente amanhã.'
    });
    return;
  }

  try {
    const novosVotos = (sugestao.votos || 0) + 1;

    const novoUltimoVoto = {
      ...(sugestao.ultimoVoto || {}),
      [usuarioAtual.uid]: hoje
    };

    let novoStatus = sugestao.status;

    if (novosVotos >= 100) {
      novoStatus = 'Em desenvolvimento';
    }

    await updateDoc(doc(db, 'sugestoes', idSugestao), {
      votos: novosVotos,
      ultimoVoto: novoUltimoVoto,
      status: novoStatus
    });

    if (novosVotos >= 100) {
      Swal.fire({
        icon: 'success',
        title: '100 votos alcançados!',
        text: 'A sugestão foi enviada para desenvolvimento.'
      });
    }

    await carregarSugestoes();

  } catch (erro) {
    console.error('Erro ao votar:', erro);
  }
};

window.alterarStatus = async function (idSugestao, novoStatus) {
  if (usuarioAtual?.uid !== 'DLAW0SxC7EfmpYWwIfElWubwuvp2') return;

  try {
    await updateDoc(doc(db, 'sugestoes', idSugestao), {
      status: novoStatus
    });

    await carregarSugestoes();
  } catch (erro) {
    console.error('Erro ao alterar status:', erro);
  }
};

botaoEnviar.addEventListener('click', async () => {
  if (!usuarioAtual) {
    alert('Faça login para enviar uma sugestão.');
    return;
  }

  const titulo = campoTitulo.value.trim();
  const categoria = campoCategoria.value;
  const descricao = campoDescricao.value.trim();

  if (!titulo || !categoria || !descricao) {
    alert('Preencha todos os campos antes de enviar!');
    return;
  }

  try {
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando...';

    await addDoc(collection(db, 'sugestoes'), {
  titulo,
  categoria,
  descricao,

  autor: dadosUsuario.usuario || usuarioAtual.displayName || 'Aluno',
  nivel: dadosUsuario.nivel || 0,
  escola: dadosUsuario.escola || '',
  serie: dadosUsuario.serie || '',
  turma: dadosUsuario.turma || '',

  uidAutor: usuarioAtual.uid,
  votos: 0,
  ultimoVoto: {},
  status: 'Em análise',
  data: serverTimestamp()
});

    campoTitulo.value = '';
    campoCategoria.value = '';
    campoDescricao.value = '';

    await carregarSugestoes();

    Swal.fire({
  icon: 'success',
  title: 'Sugestão enviada!',
  text: 'Sua sugestão foi enviada para análise do professor.',
  confirmButtonText: 'Entendi'
});

botaoEnviar.textContent = '✅ Sugestão enviada!';

    setTimeout(() => {
      botaoEnviar.textContent = '🚀 Enviar Sugestão';
      botaoEnviar.disabled = false;
    }, 1800);
  } catch (erro) {
    console.error('Erro ao enviar sugestão:', erro);
    alert('Não foi possível enviar a sugestão.');

    botaoEnviar.textContent = '🚀 Enviar Sugestão';
    botaoEnviar.disabled = false;
  }
});

campoPesquisa.addEventListener('input', renderizarSugestoes);

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach((btn) => btn.classList.remove('ativo'));
    botao.classList.add('ativo');

    filtroAtual = botao.dataset.filtro;
    renderizarSugestoes();
  });
});