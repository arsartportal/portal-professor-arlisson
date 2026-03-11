// =======================================
// HOME.JS — DESAFIO DIÁRIO + MISSÃO SEMANAL
// =======================================

// Firebase
import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Sistema de XP
import { adicionarXPImediato } from "./xp.js";

// Sistema de missões
import { atualizarMissao } from "./missoes.js";
//Science Points
import { carregarSP, adicionarSP } from "./science-points.js";


// =====================================================
// 🧠 BANCO DE PERGUNTAS
// Cada dia usa uma pergunta diferente baseada no dia do ano
// =====================================================

const perguntas = [

{ pergunta:"Qual é a unidade de força no Sistema Internacional?",
opcoes:["Joule","Newton","Watt","Pascal"],correta:1},

{ pergunta:"A velocidade é considerada uma grandeza:",
opcoes:["Fundamental","Derivada","Qualitativa","Escalar apenas"],correta:1},

{ pergunta:"A unidade padrão de massa no SI é:",
opcoes:["Grama","Quilograma","Tonelada","Newton"],correta:1},

{ pergunta:"Qual é a unidade de potência no SI?",
opcoes:["Watt","Joule","Newton","Volt"],correta:0},

{ pergunta:"Se um corpo não muda sua velocidade, ele está em:",
opcoes:["Movimento acelerado","Equilíbrio","Movimento uniforme","Repouso absoluto"],correta:2},

{ pergunta:"A aceleração é definida como:",
opcoes:["Variação da posição","Variação da velocidade","Velocidade constante","Força aplicada"],correta:1},

{ pergunta:"Qual grandeza mede a quantidade de matéria?",
opcoes:["Peso","Força","Massa","Volume"],correta:2},

{ pergunta:"A pressão é calculada por:",
opcoes:["Força × Área","Força ÷ Área","Massa × Gravidade","Volume ÷ Força"],correta:1},

{ pergunta:"O trabalho mecânico depende de:",
opcoes:["Força e deslocamento","Massa e tempo","Altura apenas","Velocidade apenas"],correta:0},

{ pergunta:"A combustão é classificada como uma reação:",
opcoes:["Endotérmica","Exotérmica","Física","Nuclear"],correta:1},

{ pergunta:"A água é composta por:",
opcoes:["H₂O","CO₂","O₂","NaCl"],correta:0},

{ pergunta:"3.000.000 em notação científica é:",
opcoes:["3 × 10³","3 × 10⁴","3 × 10⁵","3 × 10⁶"],correta:3},

{ pergunta:"Qual é o resultado de 2²?",
opcoes:["2","4","6","8"],correta:1},

{ pergunta:"A raiz quadrada de 81 é:",
opcoes:["7","8","9","10"],correta:2},

{ pergunta:"50% de 200 é:",
opcoes:["50","100","150","200"],correta:1},

{ pergunta:"Se x + 5 = 12, então x é:",
opcoes:["5","6","7","8"],correta:2}

];


// =====================================================
// UTILIDADES
// =====================================================

// converte data para formato YYYY-MM-DD
function formatarData(data){
return data.toISOString().split("T")[0];
}

// calcula o dia do ano
function diaDoAno(){

const hoje = new Date();
const inicio = new Date(hoje.getFullYear(),0,0);

return Math.floor((hoje-inicio)/86400000);
}


// =====================================================
// TOGGLE DO CARD (abrir/fechar desafio)
// =====================================================

function toggleDesafio(){

const card=document.getElementById("cardDesafio");
card.classList.toggle("expandido");

}

window.toggleDesafio=toggleDesafio;


// =====================================================
// CARREGAR PERGUNTA DO DIA
// =====================================================

function carregarPergunta(){

// define qual pergunta usar hoje
const indice=diaDoAno()%perguntas.length;
const p=perguntas[indice];

// mostra pergunta
document.getElementById("perguntaTexto").innerText=p.pergunta;

// cria as opções
const div=document.getElementById("opcoes");
div.innerHTML="";

p.opcoes.forEach((op,i)=>{

div.innerHTML+=`
<label>
<input type="radio" name="quiz" value="${i}">
${op}
</label>
`;

});

}


// =====================================================
// RESPONDER PERGUNTA
// =====================================================

async function responderPergunta(){

const botao=document.getElementById("btnResponder");
botao.disabled=true;

const user=auth.currentUser;

if(!user){
alert("Faça login.");
botao.disabled=false;
return;
}

// datas
const hoje=formatarData(new Date());
const ontem=formatarData(new Date(Date.now()-86400000));

// documento do usuário
const ref=doc(db,"usuarios",user.uid);
const snap=await getDoc(ref);

let ultimo=null;
let streak=0;
let maiorStreak=0;

if(snap.exists()){

const dados=snap.data();

ultimo=dados.ultimoQuizDiario||null;
streak=dados.streakAtual||0;
maiorStreak=dados.maiorStreak||0;

}

// impedir resposta duplicada
if(ultimo===hoje){

document.getElementById("statusXP").innerHTML=
"⏳ Você já respondeu hoje.";

return;

}

// verificar opção marcada
const marcada=document.querySelector('input[name="quiz"]:checked');

if(!marcada){
alert("Selecione uma alternativa.");
botao.disabled=false;
return;
}

// resposta correta
const indice=diaDoAno()%perguntas.length;
const correta=perguntas[indice].correta;


// =====================================================
// RESPOSTA ERRADA
// =====================================================

if(parseInt(marcada.value)!==correta){

document.getElementById("statusXP").innerHTML=
"❌ Resposta incorreta. Tente novamente amanhã.";

await setDoc(ref,{ultimoQuizDiario:hoje},{merge:true});

return;

}


// =====================================================
// RESPOSTA CORRETA
// =====================================================

// atualizar streak
if(ultimo===ontem){
streak+=1;
}else{
streak=1;
}

if(streak>maiorStreak){
maiorStreak=streak;
}


// =====================================================
// XP
// =====================================================

const XP_BASE=20;
const bonus=(streak-1)*5;
const xpTotal=XP_BASE+bonus;

// adiciona XP real
await adicionarXPImediato(xpTotal);

// recompensa SciencePoints
await adicionarSP(5);


// =====================================================
// MISSÃO SEMANAL
// =====================================================

await atualizarMissao(user.uid,"desafio");

// atualizar barra da missão
await carregarMissao(user.uid);


// =====================================================
// SALVAR PROGRESSO
// =====================================================

await setDoc(ref,{

ultimoQuizDiario:hoje,
streakAtual:streak,
maiorStreak:maiorStreak

},{merge:true});


// =====================================================
// FEEDBACK VISUAL
// =====================================================

document.getElementById("statusXP").innerHTML=
`🔥 +${xpTotal} XP! (Streak: ${streak} dias)`;

atualizarVisualStreak(streak);


// confetti
if(typeof confetti==="function"){

confetti({
particleCount:120,
spread:70,
origin:{y:0.6}
});

}

}


// =====================================================
// ATUALIZAÇÃO VISUAL DA STREAK
// =====================================================

function atualizarVisualStreak(streak){

document.getElementById("streakInfo").innerHTML=
`🔥 Streak atual: ${streak} dias`;

document.getElementById("miniStreak").innerText=
`🔥 ${streak}`;

const barra=document.getElementById("streakBarFill");

if(barra){
barra.style.width=Math.min(streak*10,100)+"%";
}

if(streak>=5){

document.getElementById("cardDesafio")
.classList.add("streak-alta");

}

}


// =====================================================
// CARREGAR MISSÃO SEMANAL
// =====================================================

async function carregarMissao(uid){

const ref = doc(db,"usuarios",uid);
const snap = await getDoc(ref);

if(!snap.exists()) return;

const dados = snap.data();

const desafios = dados?.missaoSemanal?.desafios || 0;

const barra = document.getElementById("barraMissao");
const texto = document.getElementById("textoMissao");

// atualizar barra
if(barra){
barra.style.width = Math.min((desafios/5)*100,100)+"%";
}

// atualizar texto
if(texto){
texto.innerText = desafios + " / 5";
}

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

auth.onAuthStateChanged(async(user)=>{

if(!user) return;

// carregar SciencePoints
carregarSP();

// carregar pergunta
carregarPergunta();

// carregar missão semanal
await carregarMissao(user.uid);

const hoje=formatarData(new Date());

const ref=doc(db,"usuarios",user.uid);
const snap=await getDoc(ref);

if(snap.exists()){

const dados=snap.data();

if(dados.ultimoQuizDiario===hoje){

document.getElementById("btnResponder").disabled=true;

document.getElementById("statusXP").innerHTML=
"⏳ Você já respondeu hoje.";

}

// atualizar streak
if(dados.streakAtual){
atualizarVisualStreak(dados.streakAtual);
}

}

});


// expõe função para HTML
window.responderPergunta=responderPergunta;