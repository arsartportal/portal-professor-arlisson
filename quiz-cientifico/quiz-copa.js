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

  atual = 0;
  acertos = 0;

  perguntasSelecionadas = embaralhar([...perguntas]).slice(0,5);

  btnIniciar.style.display = "none";
  resultado.classList.add("hidden");

  proximaPergunta();
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
if(!p){
  finalizar();
  return;
}

  perguntaEl.innerText = p.pergunta;
  opcoesEl.innerHTML = "";
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
      atual++;
      proximaPergunta();
    }
  },1000);
}

/* ======================================================
✅ RESPOSTA
====================================================== */
function responder(index){

  clearInterval(intervalo);

  const correta = perguntasSelecionadas[atual].correta;
  const botoes = opcoesEl.querySelectorAll("button");

  botoes.forEach((btn,i)=>{
    if(i===correta) btn.classList.add("correta");
    else if(i===index) btn.classList.add("errada");
    btn.disabled = true;
  });

  if(index===correta) acertos++;

  setTimeout(()=>{
    atual++;
    proximaPergunta();
  },800);
}

/* ======================================================
🏁 FINAL
====================================================== */
async function finalizar(){

  perguntaEl.innerText = "Fim de jogo";
  opcoesEl.innerHTML = "";

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);

  let xp=0, sp=0, venceu=false;

  if(acertos===3){xp=30;sp=5;venceu=true;}
  if(acertos===4){xp=50;sp=10;venceu=true;}
  if(acertos===5){xp=100;sp=20;venceu=true;}

  if(venceu && Math.random()<0.1) sp+=10;

  if(!venceu){
  await updateDoc(ref,{
    quizLosses: increment(1)
  });
}

  const snap = await getDoc(ref);
  const fichas = snap.data().fichasLab || 0;

  const dadosUser = snap.data();

const wins = dadosUser.quizWins || 0;
const losses = dadosUser.quizLosses || 0;

const aproveitamento = calcularAproveitamento(wins, losses);

  let conteudo = venceu ? `
    <div class="loot-box">
      <div class="loot-anim">🏆</div>
      <h2>VITÓRIA!</h2>
      <div>⚡ ${xp} XP<br>🏅 ${sp} SP</div>
      <button onclick="coletarRecompensa(${xp},${sp})">🎁 Resgatar prêmio</button>
    </div>
  ` : `<h2>😢 Eliminado!</h2>`;

  resultado.innerHTML = `
    Você acertou ${acertos}/5<br>
📊 Aproveitamento: <b>${aproveitamento}%</b><br><br>
    ${conteudo}
    <br><br>
    🎟️ ${fichas}
    <br><br>
    <div class="resultado-botoes">
  ${
    fichas > 0
      ? `<button class="btn-replay" onclick="reiniciar()">🔁 Jogar novamente</button>`
      : `<button class="btn-loja" onclick="irLoja()">🛒 Resgatar ingressos</button>`
  }

  <button class="btn-voltar" onclick="voltarInicio()">🏠 Voltar ao início</button>
</div>
  `;

  resultado.classList.remove("hidden");
}

/* ======================================================
🎁 RECOMPENSA
====================================================== */
window.coletarRecompensa = async function(xp,sp){

  if(recompensaColetada) return;
  recompensaColetada = true;

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);

  await updateDoc(ref,{
    xp: increment(xp),
    sciencePoints: increment(sp),
    quizAcertos: increment(acertos),
    quizWins: increment(1),
    quizWinsSemana: increment(1)
  });

  const loot = document.querySelector(".loot-box");

  if(loot){
    loot.innerHTML = `
      <div class="loot-explosao">💥</div>
      <div id="xpAnim">+0 XP</div>
      <div id="spAnim">+0 SP</div>
    `;
    animarNumero("xpAnim",xp,"XP");
    animarNumero("spAnim",sp,"SP");
  }

  atualizarFichas();
  carregarRanking();
};

/* ======================================================
🎆 ANIMAÇÃO
====================================================== */
function animarNumero(id,valor,label){

  let atual=0;
  const el=document.getElementById(id);

  const i=setInterval(()=>{
    atual+=Math.ceil(valor/20);
    if(atual>=valor){atual=valor;clearInterval(i);}
    el.innerText=`+${atual} ${label}`;
  },30);
}

/* ======================================================
🔁 REINICIAR
====================================================== */
window.reiniciar = async function(){

  recompensaColetada = false;

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);

  if(!snap.data().fichasLab) return alert("Sem ingressos!");

  await updateDoc(ref,{
  fichasLab: increment(-1),
  quizJogos: increment(1)
});

await atualizarStatsGlobais();

  atualizarFichas();

  atual=0;
  acertos=0;

  resultado.classList.add("hidden");
  proximaPergunta();
};

/* ======================================================
🛒 LOJA
====================================================== */
window.irLoja = ()=> location.href="/loja.html";

/* ======================================================
🎟️ INGRESSOS
====================================================== */
async function atualizarFichas(){

  const user=auth.currentUser;
  if(!user) return;

  const snap=await getDoc(doc(db,"usuarios",user.uid));
  if(!snap.exists()) return;

  document.getElementById("fichas").innerText =
    snap.data().fichasLab || 0;
}

function escutarFichas(){

  const user=auth.currentUser;
  if(!user) return;

  onSnapshot(doc(db,"usuarios",user.uid),(snap)=>{
    if(!snap.exists()) return;
    document.getElementById("fichas").innerText =
      snap.data().fichasLab || 0;
  });
}

/* ======================================================
🏆 RANKING
====================================================== */
const rankingEl=document.getElementById("ranking");
const tabs=document.querySelectorAll(".tab");

let abaAtual="total";

tabs.forEach(btn=>{
  btn.onclick=()=>{
    tabs.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    abaAtual=btn.dataset.tab;
    carregarRanking();
  };
});

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

/* ======================================================
🔄 RESET SEMANAL
====================================================== */
async function verificarResetSemanal(){

  const user=auth.currentUser;
  if(!user) return;

  const ref=doc(db,"usuarios",user.uid);
  const snap=await getDoc(ref);
  const dados=snap.data();

  const semanaAtual=getSemana(new Date());

  if(dados.ultimaSemanaReset!==semanaAtual){

    await updateDoc(ref,{
      quizWinsSemana:0,
      ultimaSemanaReset:semanaAtual
    });
  }
}

function getSemana(data){

  const d=new Date(Date.UTC(data.getFullYear(),data.getMonth(),data.getDate()));
  const dia=d.getUTCDay()||7;

  d.setUTCDate(d.getUTCDate()+4-dia);

  const inicioAno=new Date(Date.UTC(d.getUTCFullYear(),0,1));

  const semana=Math.ceil((((d-inicioAno)/86400000)+1)/7);

  return `${d.getUTCFullYear()}-S${semana}`;
}

function embaralhar(array){
  return array.sort(() => Math.random() - 0.5);
}

/* ======================================================
🚀 INIT
====================================================== */
auth.onAuthStateChanged(async user=>{

  if(!user) return;

  atualizarFichas();
  carregarRanking();

  await verificarResetSemanal();
  await carregarStatsGlobais();
});

window.voltarInicio = function(){

  document.getElementById("quizArea").classList.add("hidden");
  document.getElementById("instrucoes").classList.remove("hidden");

  resultado.classList.add("hidden");

  atual = 0;
  acertos = 0;
};

function calcularAproveitamento(wins, losses){

  const total = wins + losses;

  if(total === 0) return 0;

  return Math.round((wins / total) * 100);
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

async function carregarStatsGlobais(){

  const ref = doc(db,"estatisticas","comunidade");
  const snap = await getDoc(ref);

  if(!snap.exists()) return;

  const d = snap.data();

  document.getElementById("gastasHoje").innerText = d.hoje || 0;
  document.getElementById("gastasTotal").innerText = d.total || 0;
}