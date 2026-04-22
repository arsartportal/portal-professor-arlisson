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
🧠 PERGUNTAS
====================================================== */
const perguntas = [
  { pergunta:"Qual a unidade de força?", opcoes:["Newton","Joule","Watt","Pascal"], correta:0 },
  { pergunta:"Velocidade é:", opcoes:["d/t","t/d","m*v","f*a"], correta:0 },
  { pergunta:"Gravidade da Terra?", opcoes:["10 m/s²","9,8 m/s²","8 m/s²","12 m/s²"], correta:1 },
  { pergunta:"Energia cinética depende de:", opcoes:["massa e velocidade","tempo","força","altura"], correta:0 },
  { pergunta:"Unidade de energia?", opcoes:["Newton","Joule","Watt","Pascal"], correta:1 }
];

/* ======================================================
🎮 ESTADO
====================================================== */
let atual = 0;
let acertos = 0;
let tempo = 5;
let intervalo;
let recompensaColetada = false;
let gastasHoje = 0;
let gastasTotal = 0;
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

  // 🔥 VALIDA PRIMEIRO
  if(!dados?.fichasLab || dados.fichasLab <= 0){
    alert("Sem fichas!");
    return;
  }

  // 🔥 SÓ MUDA A TELA DEPOIS
  document.getElementById("instrucoes").classList.add("hidden");
  document.getElementById("quizArea").classList.remove("hidden");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

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

  if(atual >= perguntas.length){
    finalizar();
    return;
  }

  const p = perguntasSelecionadas[atual];

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

  const correta = perguntas[atual].correta;
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

  perguntaEl.innerText = "Resultado final";
  opcoesEl.innerHTML = "";

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);

  let xp=0, sp=0, venceu=false;

  if(acertos===3){xp=30;sp=5;venceu=true;}
  if(acertos===4){xp=50;sp=10;venceu=true;}
  if(acertos===5){xp=100;sp=20;venceu=true;}

  if(venceu && Math.random()<0.1) sp+=10;

  const snap = await getDoc(ref);
  const fichas = snap.data().fichasLab || 0;

  let conteudo = venceu ? `
    <div class="loot-box">
      <div class="loot-anim">✨</div>
      <h2>RECOMPENSA!</h2>
      <div>⚡ ${xp} XP<br>🔬 ${sp} SP</div>
      <button onclick="coletarRecompensa(${xp},${sp})">🎁 Coletar</button>
    </div>
  ` : `<h2>😈 Não foi dessa vez!</h2>`;

  resultado.innerHTML = `
    Você acertou ${acertos}/5<br><br>
    ${conteudo}
    <br><br>
    🎟️ ${fichas}
    <br><br>
    <div class="resultado-botoes">
  ${
    fichas > 0
      ? `<button class="btn-replay" onclick="reiniciar()">🔁 Jogar novamente</button>`
      : `<button class="btn-loja" onclick="irLoja()">🛒 Resgatar fichas</button>`
  }
</div>
  `;

  resultado.classList.remove("hidden");
}

/* ======================================================
🎁 COLETAR RECOMPENSA
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
🎆 ANIMAÇÃO NUMÉRICA
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

  if(!snap.data().fichasLab) return alert("Sem fichas!");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

  gastasHoje++;
  gastasTotal++;

  await salvarStats();
  atualizarStatsUI();

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
🎟️ FICHAS
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
        <span>${pos}º ${d.nome||"Aluno"}</span>
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

    console.log("🔄 Reset semanal");
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
  escutarFichas();
  carregarRanking();

  await verificarResetSemanal();
  await carregarStats(); // 🔥 NOVO
});

async function carregarStats(){

  const user = auth.currentUser;
  if(!user) return;

  const ref = doc(db,"usuarios",user.uid,"quizStats","stats");
  const snap = await getDoc(ref);

  const hoje = new Date().toISOString().split("T")[0];

  if(snap.exists()){
    const d = snap.data();

    if(d.data === hoje){
      gastasHoje = d.hoje || 0;
    }else{
      gastasHoje = 0;
    }

    gastasTotal = d.total || 0;

  }else{
    await setDoc(ref,{
      hoje:0,
      total:0,
      data:hoje
    });
  }

  atualizarStatsUI();
}

function atualizarStatsUI(){
  document.getElementById("gastasHoje").innerText = gastasHoje;
  document.getElementById("gastasTotal").innerText = gastasTotal;
}

async function salvarStats(){

  const user = auth.currentUser;
  if(!user) return;

  const ref = doc(db,"usuarios",user.uid,"quizStats","stats");

  const hoje = new Date().toISOString().split("T")[0];

  await setDoc(ref,{
    hoje: gastasHoje,
    total: gastasTotal,
    data: hoje
  });
}