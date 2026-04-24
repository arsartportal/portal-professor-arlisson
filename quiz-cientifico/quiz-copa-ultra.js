/* ======================================================
🔥 IMPORTS
====================================================== */
import { auth, db } from "../js/firebase.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  setDoc,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ======================================================
⚽ PERGUNTAS (TEMA COPA)
====================================================== */
const perguntas = [

/* =========================
🏆 REGRAS DO FUTEBOL
========================= */

{ pergunta:"Quantos jogadores cada time tem em campo?", opcoes:["9","10","11","12"], correta:2 },
{ pergunta:"Duração oficial de uma partida?", opcoes:["80 min","90 min","100 min","120 min"], correta:1 },
{ pergunta:"Quem pode usar as mãos durante o jogo?", opcoes:["Todos","Só o goleiro","Defesa","Capitão"], correta:1 },
{ pergunta:"Cartão vermelho significa:", opcoes:["Advertência","Substituição","Expulsão","Falta leve"], correta:2 },
{ pergunta:"O impedimento ocorre quando:", opcoes:["Jogador está atrás","Está à frente do penúltimo defensor no passe","Bola sai","Falta dura"], correta:1 },
{ pergunta:"Quantos árbitros principais há em campo?", opcoes:["1","2","3","4"], correta:0 },
{ pergunta:"Escanteio ocorre quando:", opcoes:["Falta","Bola sai pela linha de fundo (defesa toca por último)","Gol","Impedimento"], correta:1 },
{ pergunta:"Pênalti é cobrado de qual distância?", opcoes:["10m","11m","12m","9m"], correta:1 },
{ pergunta:"Quantas substituições são permitidas atualmente?", opcoes:["3","4","5","6"], correta:2 },
{ pergunta:"Tempo total da prorrogação:", opcoes:["15 min","20 min","30 min","40 min"], correta:2 },

/* =========================
🌍 HISTÓRIA DAS COPAS
========================= */

{ pergunta:"Primeira Copa do Mundo foi em:", opcoes:["1930","1940","1920","1950"], correta:0 },
{ pergunta:"País sede da primeira Copa:", opcoes:["Brasil","Uruguai","França","Inglaterra"], correta:1 },
{ pergunta:"Brasil tem quantos títulos mundiais?", opcoes:["3","4","5","6"], correta:2 },
{ pergunta:"Quem ganhou a Copa de 2002?", opcoes:["Alemanha","Brasil","França","Argentina"], correta:1 },
{ pergunta:"Quem ganhou a Copa de 2014?", opcoes:["Brasil","Alemanha","Argentina","Espanha"], correta:1 },
{ pergunta:"Quem ganhou a Copa de 2018?", opcoes:["França","Croácia","Brasil","Alemanha"], correta:0 },
{ pergunta:"Quem ganhou a Copa de 2022?", opcoes:["França","Argentina","Brasil","Croácia"], correta:1 },
{ pergunta:"A Copa de 1950 ficou marcada por:", opcoes:["7x1","Maracanazo","Mão de Deus","Gol de ouro"], correta:1 },
{ pergunta:"Pelé ganhou quantas Copas do Mundo?", opcoes:["2","3","4","1"], correta:1 },
{ pergunta:"Maior campeão europeu em Copas:", opcoes:["França","Alemanha","Itália","Espanha"], correta:2 },

/* =========================
📍 SEDES DAS COPAS
========================= */

{ pergunta:"Onde foi a Copa de 2014?", opcoes:["Alemanha","Brasil","Rússia","África do Sul"], correta:1 },
{ pergunta:"Onde foi a Copa de 2010?", opcoes:["Brasil","África do Sul","Alemanha","Qatar"], correta:1 },
{ pergunta:"Onde foi a Copa de 2018?", opcoes:["França","Rússia","Alemanha","EUA"], correta:1 },
{ pergunta:"Onde foi a Copa de 2022?", opcoes:["Qatar","Japão","Brasil","México"], correta:0 },
{ pergunta:"Onde foi a Copa de 1994?", opcoes:["EUA","Brasil","França","Itália"], correta:0 },
{ pergunta:"Onde foi a Copa de 2006?", opcoes:["França","Alemanha","Brasil","Japão"], correta:1 },
{ pergunta:"Onde foi a Copa de 1998?", opcoes:["França","Itália","Brasil","Alemanha"], correta:0 },
{ pergunta:"Onde foi a Copa de 1966?", opcoes:["Inglaterra","Brasil","França","Uruguai"], correta:0 },
{ pergunta:"Onde foi a Copa de 1986?", opcoes:["México","Brasil","Argentina","Espanha"], correta:0 },
{ pergunta:"Quantos países sediarão a Copa de 2026?", opcoes:["1","2","3","4"], correta:2 },

/* =========================
⭐ JOGADORES HISTÓRICOS
========================= */

{ pergunta:"Quem fez o gol conhecido como 'Mão de Deus'?", opcoes:["Pelé","Messi","Maradona","Ronaldinho"], correta:2 },
{ pergunta:"Maior artilheiro da história das Copas:", opcoes:["Pelé","Klose","Ronaldo","Messi"], correta:1 },
{ pergunta:"Quantos gols Ronaldo Fenômeno fez em Copas?", opcoes:["15","10","8","12"], correta:0 },
{ pergunta:"Messi ganhou sua primeira Copa em:", opcoes:["2014","2018","2022","2010"], correta:2 },
{ pergunta:"Cristiano Ronaldo já ganhou Copa do Mundo?", opcoes:["Sim","Não"], correta:1 },
{ pergunta:"Zidane foi campeão em qual Copa?", opcoes:["1998","2002","2010","2018"], correta:0 },
{ pergunta:"Ronaldinho foi campeão em:", opcoes:["1998","2002","2006","2010"], correta:1 },
{ pergunta:"Neymar estreou em Copas em:", opcoes:["2010","2014","2018","2022"], correta:1 },
{ pergunta:"Mbappé brilhou em qual Copa?", opcoes:["2010","2014","2018","2006"], correta:2 },
{ pergunta:"Goleiro destaque da Alemanha em 2014:", opcoes:["Buffon","Neuer","Casillas","Alisson"], correta:1 },

/* =========================
🏆 CURIOSIDADES
========================= */

{ pergunta:"Maior goleada da história das Copas:", opcoes:["7x1","10x1","8x0","6x1"], correta:1 },
{ pergunta:"O 7x1 do Brasil foi contra:", opcoes:["Argentina","Alemanha","França","Holanda"], correta:1 },
{ pergunta:"Seleção com mais finais disputadas:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },
{ pergunta:"Primeiro campeão mundial:", opcoes:["Brasil","Uruguai","Itália","França"], correta:1 },
{ pergunta:"A Copa acontece a cada:", opcoes:["2 anos","3 anos","4 anos","5 anos"], correta:2 },
{ pergunta:"Quantas seleções terão na Copa 2026?", opcoes:["32","40","48","64"], correta:2 },
{ pergunta:"VAR significa:", opcoes:["Video Assistente","Árbitro assistente de vídeo","Replay","Sistema de gol"], correta:1 },
{ pergunta:"Final da Copa 2022 foi decidida em:", opcoes:["Tempo normal","Pênaltis","Gol de ouro","Replay"], correta:1 },
{ pergunta:"Copa 2010 ficou famosa por qual bola?", opcoes:["Jabulani","Telstar","Brazuca","Al Rihla"], correta:0 },
{ pergunta:"O mascote da Copa representa:", opcoes:["Jogador","Símbolo do torneio","Árbitro","Técnico"], correta:1 },

/* =========================
🇧🇷 BRASIL NAS COPAS
========================= */

{ pergunta:"Primeiro título do Brasil foi em:", opcoes:["1950","1958","1962","1970"], correta:1 },
{ pergunta:"Último título do Brasil:", opcoes:["2002","1994","2014","2010"], correta:0 },
{ pergunta:"Brasil sediou quantas Copas?", opcoes:["1","2","3","0"], correta:1 },
{ pergunta:"Técnico do Brasil em 2002:", opcoes:["Felipão","Tite","Dunga","Parreira"], correta:0 },
{ pergunta:"Capitão do Brasil em 2002:", opcoes:["Ronaldo","Cafu","Rivaldo","Ronaldinho"], correta:1 },
{ pergunta:"Final de 1994 foi contra:", opcoes:["França","Itália","Argentina","Alemanha"], correta:1 },
{ pergunta:"Brasil de 1970 ficou conhecido por:", opcoes:["Defesa","Ataque histórico","VAR","Cartões"], correta:1 },
{ pergunta:"Jogador com mais Copas pelo Brasil:", opcoes:["Pelé","Cafu","Ronaldo","Neymar"], correta:1 },
{ pergunta:"Brasil perdeu 2014 por:", opcoes:["7x1","5x0","6x1","4x0"], correta:0 },
{ pergunta:"Maior rival do Brasil:", opcoes:["EUA","Argentina","França","Japão"], correta:1 },

/* =========================
⚽ EXTRA
========================= */

{ pergunta:"Quantos tempos tem uma partida?", opcoes:["1","2","3","4"], correta:1 },
{ pergunta:"Cada tempo dura:", opcoes:["30 min","45 min","50 min","60 min"], correta:1 },
{ pergunta:"Formato da bola:", opcoes:["Quadrada","Redonda","Oval","Triangular"], correta:1 },
{ pergunta:"Um gol vale:", opcoes:["1 ponto","2 pontos","3 pontos","Depende"], correta:0 },
{ pergunta:"Formato do campo:", opcoes:["Quadrado","Circular","Retangular","Oval"], correta:2 },
{ pergunta:"Função do capitão:", opcoes:["Nada","Representar o time","Apitar","Marcar gol"], correta:1 },
{ pergunta:"FIFA organiza:", opcoes:["NBA","Copa do Mundo","Olimpíadas","Tênis"], correta:1 },
{ pergunta:"Cartão amarelo indica:", opcoes:["Expulsão","Advertência","Gol","Falta leve"], correta:1 },
{ pergunta:"Gol contra é:", opcoes:["Gol válido","Não vale","Anulado","Replay"], correta:0 },
{ pergunta:"A final da Copa 2026 será em quantos países?", opcoes:["1","2","3","4"], correta:0 }

];

const perguntasDificeis = [

/* =========================
🧠 REGRAS AVANÇADAS
========================= */

{ pergunta:"Em qual situação o impedimento NÃO é marcado?", opcoes:["Passe para frente","Recebimento de lateral","Passe em profundidade","Rebote do goleiro"], correta:1 },

{ pergunta:"Um jogador em posição de impedimento só é penalizado quando:", opcoes:["Está parado","Participa da jogada","Corre rápido","Recebe cartão"], correta:1 },

{ pergunta:"Se o goleiro segura a bola por mais de 6 segundos:", opcoes:["Nada acontece","Escanteio","Tiro livre indireto","Pênalti"], correta:2 },

{ pergunta:"Um gol direto de lateral é:", opcoes:["Válido","Anulado","Depende do árbitro","Só vale com desvio"], correta:1 },

{ pergunta:"Se um jogador comete falta dentro da própria área:", opcoes:["Escanteio","Tiro livre","Pênalti","Lateral"], correta:2 },

/* =========================
🌍 HISTÓRIA PROFUNDA
========================= */

{ pergunta:"Qual seleção foi vice-campeã da Copa de 1950?", opcoes:["Brasil","Uruguai","Espanha","Suécia"], correta:0 },

{ pergunta:"Quem marcou o gol do título da Alemanha em 2014?", opcoes:["Müller","Klose","Götze","Kroos"], correta:2 },

{ pergunta:"Qual seleção eliminou o Brasil na Copa de 2006?", opcoes:["França","Alemanha","Itália","Holanda"], correta:0 },

{ pergunta:"Quem foi o artilheiro da Copa de 2010?", opcoes:["Villa","Forlán","Sneijder","Müller"], correta:3 },

{ pergunta:"Qual país sediou a Copa de 1934?", opcoes:["França","Itália","Alemanha","Espanha"], correta:1 },

/* =========================
📊 RECORDES E ESTATÍSTICAS
========================= */

{ pergunta:"Qual seleção tem mais jogos em Copas do Mundo?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:0 },

{ pergunta:"Quem foi o jogador mais jovem a marcar em uma final de Copa?", opcoes:["Pelé","Mbappé","Messi","Ronaldo"], correta:0 },

{ pergunta:"Qual foi a única seleção a vencer todas as partidas de uma Copa (formato moderno)?", opcoes:["Brasil 1970","Alemanha 2014","França 1998","Argentina 2022"], correta:0 },

{ pergunta:"Maior número de gols em uma única Copa por um jogador:", opcoes:["10","11","12","13"], correta:3 },

{ pergunta:"Quem detém esse recorde?", opcoes:["Pelé","Klose","Just Fontaine","Ronaldo"], correta:2 },

/* =========================
⭐ JOGADORES (NÍVEL HARD)
========================= */

{ pergunta:"Qual jogador tem mais assistências na história das Copas?", opcoes:["Messi","Pelé","Maradona","Beckham"], correta:1 },

{ pergunta:"Quem perdeu pênalti na final de 1994?", opcoes:["Baggio","Romário","Bebeto","Maldini"], correta:0 },

{ pergunta:"Qual jogador ganhou Bola de Ouro em 2006 mesmo sendo expulso na final?", opcoes:["Zidane","Cannavaro","Pirlo","Henry"], correta:0 },

{ pergunta:"Quem foi o melhor jogador da Copa de 2014?", opcoes:["Messi","Neymar","Robben","Müller"], correta:0 },

{ pergunta:"Qual desses jogadores NUNCA jogou uma final de Copa?", opcoes:["Cristiano Ronaldo","Messi","Zidane","Ronaldo"], correta:0 },

/* =========================
🏟️ TÁTICA E JOGO
========================= */

{ pergunta:"O sistema 4-3-3 possui quantos atacantes?", opcoes:["2","3","4","1"], correta:1 },

{ pergunta:"Um 'falso 9' é:", opcoes:["Zagueiro","Meia defensivo","Atacante que recua","Goleiro"], correta:2 },

{ pergunta:"Linha alta significa:", opcoes:["Defesa recuada","Defesa avançada","Time lento","Jogo parado"], correta:1 },

{ pergunta:"Pressão alta é:", opcoes:["Marcação no campo de defesa","Marcação no campo adversário","Jogo defensivo","Contra-ataque"], correta:1 },

{ pergunta:"Posse de bola NÃO garante:", opcoes:["Controle do jogo","Vitória","Domínio territorial","Criação de chances"], correta:1 },

];

const perguntasInsanas = [

/* =========================
🧠 REGRAS ULTRA DETALHADAS
========================= */

{ pergunta:"Se a bola estoura durante uma jogada clara de gol, o árbitro deve:", opcoes:["Dar gol","Marcar escanteio","Parar o jogo e reiniciar com bola ao chão","Mandar repetir a jogada"], correta:2 },

{ pergunta:"Um jogador pode ser expulso ANTES do jogo começar?", opcoes:["Não","Sim, durante o aquecimento","Só após o apito inicial","Só no intervalo"], correta:1 },

{ pergunta:"Se um reserva invade o campo e impede um gol:", opcoes:["Nada acontece","Cartão amarelo","Pênalti e expulsão","Só tiro livre"], correta:2 },

{ pergunta:"Gol direto de tiro de meta:", opcoes:["Não vale","Vale","Depende do árbitro","Só com desvio"], correta:1 },

{ pergunta:"Se a bola bate no árbitro e muda a posse:", opcoes:["Segue o jogo","Interrompe e bola ao chão","Escanteio","Falta"], correta:1 },

/* =========================
📜 HISTÓRIA OCULTA DAS COPAS
========================= */

{ pergunta:"Qual seleção foi campeã invicta SEM sofrer gols em uma Copa?", opcoes:["Brasil 1970","Itália 1982","Suíça 2006","Nenhuma"], correta:3 },

{ pergunta:"Quem foi o técnico do Brasil na Copa de 1958?", opcoes:["Zagallo","Feola","Telê Santana","Parreira"], correta:1 },

{ pergunta:"Qual foi a primeira final decidida nos pênaltis?", opcoes:["1974","1982","1994","1978"], correta:2 },

{ pergunta:"Qual jogador participou de MAIS Copas como atleta?", opcoes:["Pelé","Maradona","Matthäus","Buffon"], correta:2 },

{ pergunta:"Qual país já sediou Copa e NÃO participou dela?", opcoes:["Qatar","Uruguai","Itália","Nenhum"], correta:3 },

/* =========================
📊 ESTATÍSTICAS ABSURDAS
========================= */

{ pergunta:"Maior tempo sem sofrer gols em Copas (seleção):", opcoes:["Brasil","Itália","Suíça","Alemanha"], correta:2 },

{ pergunta:"Qual seleção ficou MAIS TEMPO sem perder em Copas?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Jogador com MAIS minutos em Copas:", opcoes:["Messi","Maldini","Matthäus","Klose"], correta:2 },

{ pergunta:"Maior número de finais consecutivas disputadas:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Maior público já registrado em uma final de Copa:", opcoes:["Maracanã 1950","Wembley 1966","Azteca 1986","França 1998"], correta:0 },

/* =========================
🎯 JOGADORES (NÍVEL ABSURDO)
========================= */

{ pergunta:"Quem foi campeão do mundo como jogador e técnico?", opcoes:["Zidane","Beckenbauer","Maradona","Cruyff"], correta:1 },

{ pergunta:"Qual jogador fez gol em MAIS Copas diferentes?", opcoes:["Pelé","Ronaldo","Klose","Messi"], correta:0 },

{ pergunta:"Quem perdeu duas finais seguidas (2014 e 2018)?", opcoes:["Messi","Modrić","Mbappé","Nenhum"], correta:3 },

{ pergunta:"Qual goleiro ficou MAIS TEMPO sem sofrer gol em Copas?", opcoes:["Buffon","Neuer","Zenga","Casillas"], correta:2 },

{ pergunta:"Quem fez hat-trick em final de Copa?", opcoes:["Pelé","Mbappé","Ronaldo","Klose"], correta:1 },

/* =========================
🧩 TÁTICA PROFUNDA
========================= */

{ pergunta:"O 'gegenpressing' é:", opcoes:["Defesa baixa","Pressão imediata após perda da bola","Contra-ataque lento","Posse longa"], correta:1 },

{ pergunta:"Um 'terceiro homem' na jogada é:", opcoes:["Árbitro","Jogador que aparece para dar continuidade","Reserva","Zagueiro"], correta:1 },

{ pergunta:"Bloco médio significa:", opcoes:["Time recuado","Time avançado","Linha intermediária de marcação","Sem marcação"], correta:2 },

{ pergunta:"Amplitude no jogo ofensivo refere-se a:", opcoes:["Velocidade","Uso das laterais","Chutes de longe","Marcação"], correta:1 },

{ pergunta:"Transição defensiva ocorre quando:", opcoes:["Time ataca","Perde a bola","Faz gol","Bola parada"], correta:1 },

/* =========================
🤯 PEGADINHAS INSANAS
========================= */

{ pergunta:"Quantos jogadores um time pode ter em campo no MÍNIMO para o jogo continuar?", opcoes:["7","8","6","5"], correta:0 },

{ pergunta:"Se todos os jogadores forem expulsos:", opcoes:["Jogo continua","Vitória automática","Partida encerrada","Pênaltis"], correta:2 },

{ pergunta:"Um jogador pode tirar a camisa ao comemorar?", opcoes:["Sim","Não","Sim, sem punição","Só se fizer gol importante"], correta:1 },

{ pergunta:"Se o goleiro faz gol com a mão:", opcoes:["Vale","Não vale","Depende","Revisão VAR"], correta:1 },

{ pergunta:"Um jogador pode marcar gol diretamente do escanteio?", opcoes:["Não","Sim","Só com desvio","Só na prorrogação"], correta:1 },

];

/* ======================================================
🏆 SISTEMA DE FASES
====================================================== */

let faseAtual = 0;

const fases = [
  { nome: "Fase de Grupos", perguntas: 3, minimo: 2 },
  { nome: "Oitavas de Final", perguntas: 3, minimo: 2 },
  { nome: "Quartas de Final", perguntas: 3, minimo: 2 },
  { nome: "Semifinal", perguntas: 3, minimo: 2 },
  { nome: "Final", perguntas: 3, minimo: 2 }
];

/* ======================================================
🎮 ESTADO
====================================================== */

let atual = 0;
let acertos = 0;
let tempo = 5;
let intervalo;
let recompensaColetada = false;
let perguntasSelecionadas = [];

/* ======================================================
📌 ELEMENTOS
====================================================== */

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const tempoEl = document.getElementById("tempo");
const progresso = document.getElementById("progresso");
const numPergunta = document.getElementById("numPergunta");
const resultado = document.getElementById("resultado");
const btnIniciar = document.getElementById("btnIniciar");
const faseEl = document.getElementById("faseAtual");
const rankingEl = document.getElementById("ranking");
const tabs = document.querySelectorAll(".tab");

let abaAtual = "total";

tabs.forEach(btn=>{
  btn.onclick=()=>{
    tabs.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    abaAtual=btn.dataset.tab;
    carregarRanking();
  };
});

/* ======================================================
🚀 INICIAR
====================================================== */

btnIniciar.onclick = iniciar;

async function iniciar(){

  const user = auth.currentUser;
  if(!user) return alert("Faça login!");

  recompensaColetada = false;

  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);
  const dados = snap.data();

  if(!dados?.fichasLab || dados.fichasLab <= 0){
    alert("Sem ingressos!");
    return;
  }

  document.getElementById("instrucoes").classList.add("hidden");
  document.getElementById("quizArea").classList.remove("hidden");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

  await atualizarStatsGlobais();
  atualizarFichas();

  faseAtual = 0;

  carregarFase();

  btnIniciar.style.display = "none";
  resultado.classList.add("hidden");
}

/* ======================================================
🏆 CARREGAR FASE
====================================================== */

function carregarFase(){

  const fase = fases[faseAtual];

  atual = 0;
  acertos = 0;

  faseEl.innerText = `🏆 ${fase.nome}`;

  atualizarBarraFases();

  perguntasSelecionadas = gerarQuiz()
    .slice(0, fase.perguntas)
    .map(p => embaralharOpcoes(p));

  setTimeout(()=>{
    proximaPergunta();
  },600);
}

/* ======================================================
➡️ PERGUNTAS
====================================================== */

function proximaPergunta(){

  if(atual >= perguntasSelecionadas.length){
    finalizar();
    return;
  }

  const p = perguntasSelecionadas[atual];

  clearInterval(intervalo);

  perguntaEl.innerText = p.pergunta;
  opcoesEl.innerHTML = "";
  opcoesEl.classList.remove("respondido");

  numPergunta.innerText = atual + 1;

  p.opcoes.forEach((op,i)=>{
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = ()=>responder(i);
    opcoesEl.appendChild(btn);
  });

  iniciarTimer();
}

/* ======================================================
⏳ TIMER
====================================================== */

function iniciarTimer(){

  tempo = 5;
  tempoEl.innerText = tempo;
  progresso.style.width = "100%";

  clearInterval(intervalo);

  intervalo = setInterval(()=>{
    tempo--;
    tempoEl.innerText = tempo;
    progresso.style.width = (tempo/5)*100 + "%";

    if(tempo <= 0){
  clearInterval(intervalo);
  finalizar();
}
  },1000);
}

/* ======================================================
✅ RESPOSTA
====================================================== */

function responder(index){

  if(opcoesEl.classList.contains("respondido")) return;
  opcoesEl.classList.add("respondido");

  clearInterval(intervalo);

  const correta = perguntasSelecionadas[atual].correta;
  const botoes = opcoesEl.querySelectorAll("button");

  botoes.forEach((btn,i)=>{
    if(i === correta) btn.classList.add("correta");
    if(i === index && i !== correta) btn.classList.add("errada");
    btn.disabled = true;
  });

  if(index === correta){
    acertos++;
    setTimeout(()=>{
      atual++;
      proximaPergunta();
    },600);
  } else {
    finalizar();
  }
}

/* ======================================================
🏁 FINAL (FASES)
====================================================== */

async function finalizar(){

  const fase = fases[faseAtual];

  if(acertos >= fase.minimo){

    faseAtual++;

    if(faseAtual >= fases.length){
      finalizarCampeao();
      return;
    }

    resultado.innerHTML = `
      <h2>🔥 Classificado!</h2>
      <p>Você avançou para:</p>
      <strong>${fases[faseAtual].nome}</strong>
      <br><br>
      <button onclick="carregarFase()">➡️ Próxima fase</button>
    `;

  } else {

    resultado.innerHTML = `
      <h2>💀 Eliminado na ${fase.nome}</h2>
      <button onclick="reiniciar()">🔁 Jogar novamente</button>
    `;
  }

  resultado.classList.remove("hidden");
}

/* ======================================================
🏆 CAMPEÃO
====================================================== */

async function finalizarCampeao(){

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);

  const xp = 150;
  const sp = 50;

  await updateDoc(ref,{
    xp: increment(xp),
    sciencePoints: increment(sp),
    quizWins: increment(1),
    quizWinsSemana: increment(1)
  });

  resultado.innerHTML = `
    <div class="loot-box">
      <h2>🏆 CAMPEÃO DA COPA!</h2>
      <div>⚡ ${xp} XP<br>🏅 ${sp} SP</div>
      <button onclick="reiniciar()">🔁 Jogar novamente</button>
    </div>
  `;

  resultado.classList.remove("hidden");

  carregarRanking();
}

/* ======================================================
🔁 REINICIAR
====================================================== */

window.reiniciar = async function(){

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);

  if(!snap.data()?.fichasLab || snap.data().fichasLab <= 0) return alert("Sem ingressos!");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

  faseAtual = 0;
  resultado.classList.add("hidden");

  carregarFase();
};


function embaralhar(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* ======================================================
UTILITÁRIOS
====================================================== */

function embaralharOpcoes(pergunta){

  const opcoes = pergunta.opcoes.map((texto, index) => ({
    texto,
    correta: index === pergunta.correta
  }));

  const embaralhadas = embaralhar([...opcoes]);

  return {
    pergunta: pergunta.pergunta,
    opcoes: embaralhadas.map(o => o.texto),
    correta: embaralhadas.findIndex(o => o.correta)
  };
}

function atualizarBarraFases(){

  const spans = document.querySelectorAll(".fase-barra span");

  spans.forEach((el, i)=>{
    el.classList.remove("ativa","completa");

    if(i < faseAtual){
      el.classList.add("completa");
    } else if(i === faseAtual){
      el.classList.add("ativa");
    }
  });
}

async function atualizarFichas(){
  const user=auth.currentUser;
  if(!user) return;

  const snap=await getDoc(doc(db,"usuarios",user.uid));
  if(!snap.exists()) return;

  document.getElementById("fichas").innerText =
    snap.data().fichasLab || 0;
}

async function carregarRanking(){

  rankingEl.innerHTML="Carregando...";

  const campo=abaAtual==="semanal"
    ?"quizWinsSemana"
    :"quizWins";

  const snap=await getDocs(query(
    collection(db,"usuarios"),
    orderBy(campo,"desc"),
    limit(10)
  ));

  rankingEl.innerHTML="";
  let pos=1;

  snap.forEach(docSnap=>{
    const d=docSnap.data();

    rankingEl.innerHTML+=`
      <div class="ranking-item">
        <span>${pos}º ${d.nome||"Jogador"}</span>
        <span>${d[campo]||0}</span>
      </div>
    `;
    pos++;
  });
}

auth.onAuthStateChanged(async user=>{

  if(!user) return;

  atualizarFichas();
  carregarRanking();
});

function gerarQuiz(){

  const faceis = embaralhar([...perguntas]).slice(0,2);
  const dificeis = embaralhar([...perguntasDificeis]).slice(0,2);
  const insanas = embaralhar([...perguntasInsanas]).slice(0,1);

  return embaralhar([
    ...faceis,
    ...dificeis,
    ...insanas
  ]);
}




async function atualizarStatsGlobais(){

  const ref = doc(db,"estatisticas","comunidade");

  const hoje = new Date().toISOString().split("T")[0];

  const snap = await getDoc(ref);

  if(!snap.exists()){
    await setDoc(ref,{
      hoje: 1,
      total: 1,
      data: hoje
    });
    return;
  }

  const dados = snap.data();

  if(dados.data === hoje){
    await updateDoc(ref,{
      hoje: increment(1),
      total: increment(1)
    });
  }else{
    await updateDoc(ref,{
      hoje: 1,
      total: increment(1),
      data: hoje
    });
  }
}

window.carregarFase = carregarFase;