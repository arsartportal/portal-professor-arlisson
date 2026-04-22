

import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

if(!user) return;

try{

const ref = doc(db, "usuarios", user.uid);
const snap = await getDoc(ref);

if(!snap.exists()) return;

const dados = snap.data();
const btn = document.getElementById("btnTesteLoja");

// 👨‍🏫 PROFESSOR → mostra botão
if(dados.tipo === "professor"){
if(btn) btn.style.display = "block";
}

// 👨‍🎓 ALUNO → remove botão
else{
btn?.remove();
}

}catch(e){
console.error("Erro ao verificar tipo de usuário:", e);
}

});


// =====================================================
// 🚀 FUNÇÃO CENTRAL - LIBERAR LOJA
// =====================================================

function liberarLoja(){

let jaLiberou = false;

function liberarLoja(){

if(jaLiberou) return;
jaLiberou = true;}

const card = document.getElementById("cardLoja");
const ribbon = card?.querySelector(".ribbon-pro");
const contador = document.getElementById("contador");

// ❌ remove ribbon
if(ribbon) ribbon.remove();

// 🔁 troca link
if(card){
card.href = "/loja.html";
card.classList.remove("card-breve");
}

// 🎉 mensagem
if(contador){
contador.innerHTML = "🎉 Disponível!";
}

// 🎊 confete
if(typeof confetti === "function"){
confetti({
particleCount: 120,
spread: 70,
origin: { y: 0.6 }
});
}

}


// =====================================================
// 📦 FUNÇÃO PRINCIPAL DE CONTADOR
// =====================================================

export function iniciarContador(idContainer, dataAlvo, modo="completo"){

const container = document.getElementById(idContainer);
if(!container) return;

const alvo = new Date(dataAlvo).getTime();

// =====================================================
// 🟦 MODO COMPLETO
// =====================================================
if(modo === "completo"){

container.innerHTML = `
<div class="contador-premium">
<div class="tempo"><span class="dias">00</span><p>Dias</p></div>
<div class="tempo"><span class="horas">00</span><p>Horas</p></div>
<div class="tempo"><span class="minutos">00</span><p>Min</p></div>
<div class="tempo"><span class="segundos">00</span><p>Seg</p></div>
</div>
`;

const dias = container.querySelector(".dias");
const horas = container.querySelector(".horas");
const minutos = container.querySelector(".minutos");
const segundos = container.querySelector(".segundos");

function atualizar(){

const agora = new Date().getTime();
const diff = alvo - agora;

if(diff <= 0){
clearInterval(intervalo);
liberarLoja();
return;
}

dias.innerText = Math.floor(diff / (1000*60*60*24));
horas.innerText = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
minutos.innerText = Math.floor((diff%(1000*60*60))/(1000*60));
segundos.innerText = Math.floor((diff%(1000*60))/1000);

}

const intervalo = setInterval(atualizar,1000);
atualizar();

}


// =====================================================
// ⬛ MODO COMPACTO
// =====================================================
else if(modo === "compacto"){

function atualizar(){

const agora = new Date().getTime();
const diff = alvo - agora;

if(diff <= 0){
clearInterval(intervalo);
liberarLoja();
return;
}

const dias = Math.floor(diff/(1000*60*60*24));
const horas = Math.floor((diff%(1000*60*60*24))/(1000*60*60));

container.innerHTML = `${dias}d ${horas}h`;

}

const intervalo = setInterval(atualizar,1000);
atualizar();

}


// =====================================================
// 🧾 MODO INLINE (USADO NA LOJA)
// =====================================================
else if(modo === "inline"){

function atualizar(){

const agora = new Date().getTime();
const diff = alvo - agora;

if(diff <= 0){
clearInterval(intervalo); // 🛑 PARA o loop
liberarLoja();
return;
}


const d = Math.floor(diff/(1000*60*60*24));
const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
const m = Math.floor((diff%(1000*60*60))/(1000*60));
const s = Math.floor((diff%(1000*60))/1000);

const hh = h.toString().padStart(2,"0");
const mm = m.toString().padStart(2,"0");
const ss = s.toString().padStart(2,"0");

container.innerHTML =
`<strong>${d}</strong> dias | <strong>${hh}</strong> horas | <strong>${mm}</strong> min | <strong>${ss}</strong> seg`;

}

const intervalo = setInterval(atualizar,1000);
atualizar();

}

}


// =====================================================
// 🔧 BOTÃO DE TESTE (MODO DEV)
// =====================================================

document.getElementById("btnTesteLoja")?.addEventListener("click", ()=>{
liberarLoja();
});


// =====================================================
// 📊 BARRA DE PROGRESSO
// =====================================================

const dataInicio = new Date("2026-04-01").getTime();
const dataLancamento = new Date("2026-04-15").getTime();

function atualizarBarra(){

const agora = new Date().getTime();

const progresso =
(agora - dataInicio) /
(dataLancamento - dataInicio);

const porcentagem =
Math.min(Math.max(progresso*100,0),100);

const barra = document.getElementById("barraLancamento");
if(barra){
barra.style.width = porcentagem + "%";
}

}

setInterval(atualizarBarra,1000);
atualizarBarra();