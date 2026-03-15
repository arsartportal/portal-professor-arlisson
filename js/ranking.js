/* =====================================================
   IMPORTA FIREBASE
===================================================== */

import { db, auth } from "./firebase.js"

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js"


/* =====================================================
   SISTEMA DE PATENTES
===================================================== */

import { obterPatentePorNivel } from "./patentes.js"



/* =====================================================
   LISTA GLOBAL
===================================================== */

let listaAlunos = []
let intervaloRanking = null



/* =====================================================
   STATUS DO ACESSO AO RANKING
===================================================== */

function formatarTempoRestante(timestamp){

if(!timestamp) return "🔒 Você não possui acesso ativo ao ranking."

const agora = new Date()
const expiracao = timestamp.toDate()
const diff = expiracao - agora

if(diff <= 0){
return "🔒 Seu acesso ao ranking expirou."
}

const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

if(dias > 0){
return `⏳ Seu acesso ao ranking termina em ${dias} dia(s) e ${horas} hora(s).`
}

if(horas > 0){
return `⏳ Seu acesso ao ranking termina em ${horas} hora(s) e ${minutos} minuto(s).`
}

return `⏳ Seu acesso ao ranking termina em ${minutos} minuto(s).`

}

function atualizarStatusRanking(texto, classe=""){

const status = document.getElementById("status-ranking")

if(!status) return

status.className = "status-ranking"

if(classe){
status.classList.add(classe)
}

status.innerHTML = texto

}

function bloquearRanking(mensagem){

atualizarStatusRanking(mensagem, "bloqueado")

const podio = document.querySelector(".podio")
const tabela = document.querySelector("table")
const minhaPosicao = document.getElementById("minha-posicao")

if(minhaPosicao){
minhaPosicao.style.display = "none"
}

if(podio){
podio.style.display = "none"
}

if(tabela){
tabela.style.display = "none"
}

}

function iniciarContadorRanking(timestamp){

if(intervaloRanking){
clearInterval(intervaloRanking)
}

function atualizar(){

const texto = formatarTempoRestante(timestamp)

if(texto.includes("expirou")){
clearInterval(intervaloRanking)
bloquearRanking("🔒 Seu acesso ao ranking expirou.")
return
}

atualizarStatusRanking(texto, "liberado")

}

atualizar()

intervaloRanking = setInterval(atualizar, 60000)

}



/* =====================================================
   VERIFICAR ACESSO DO ALUNO
===================================================== */

async function verificarAcessoRanking(user){

const userRef = doc(db, "usuarios", user.uid)
const snap = await getDoc(userRef)

if(!snap.exists()){
bloquearRanking("🔒 Usuário não encontrado.")
return false
}

const dados = snap.data()

if(!dados.rankingLiberadoAte){
bloquearRanking("🔒 Você não possui acesso ativo ao ranking.")
return false
}

const agora = new Date()
const expiracao = dados.rankingLiberadoAte.toDate()

if(expiracao <= agora){
bloquearRanking("🔒 Seu acesso ao ranking expirou.")
return false
}

iniciarContadorRanking(dados.rankingLiberadoAte)

return true

}



/* =====================================================
   CARREGAR RANKING
===================================================== */

async function carregarRanking(){

try{

const snapshot = await getDocs(collection(db,"usuarios"))

listaAlunos = []

snapshot.forEach(docItem=>{

const d = docItem.data()

/* =====================================================
   FILTRO DE USUÁRIOS QUE NÃO DEVEM APARECER
===================================================== */

if(!d.nome) return

const bloqueados = [
"Arlisson Ferreira",
"Erikinha CoisalindadeMeusDeus",
"professor",
"erica"
]

if(bloqueados.includes(d.nome)) return

listaAlunos.push({

id: docItem.id,
nome: d.nome,
serie: d.serie || "-",
xp: d.xp || 0,
nivel: d.nivel || 0,
streak: d.streakAtual || 0

})

})



/* =====================================================
   ORDENAÇÃO

   1️⃣ NIVEL (PATENTE)
   2️⃣ XP (DESEMPATE)
===================================================== */

listaAlunos.sort((a,b)=>{

if(b.nivel !== a.nivel){
return b.nivel - a.nivel
}

return b.xp - a.xp

})

const minhaPosicao = document.getElementById("minha-posicao")
const tabela = document.querySelector("table")
const podio = document.querySelector(".podio")

if(minhaPosicao){
minhaPosicao.style.display = "block"
}

if(tabela){
tabela.style.display = "table"
}

if(podio){
podio.style.display = "flex"
}

renderPodio()
renderTabela()
mostrarMinhaPosicao()

}catch(error){

console.error("Erro ao carregar ranking:", error)
atualizarStatusRanking("❌ Erro ao carregar o ranking.", "bloqueado")

}

}



/* =====================================================
   PODIO
===================================================== */

function renderPodio(){

const primeiro = document.getElementById("primeiro")
const segundo = document.getElementById("segundo")
const terceiro = document.getElementById("terceiro")

if(!primeiro || !segundo || !terceiro) return



/* =========================
   1º LUGAR
========================= */

if(listaAlunos[0]){

const patente = obterPatentePorNivel(listaAlunos[0].nivel)

primeiro.innerHTML = `

<div>🥇</div>

<img src="${patente.imagem}">

<div class="nome">${listaAlunos[0].nome}</div>

<div class="xp">${listaAlunos[0].xp} XP</div>

`

}



/* =========================
   2º LUGAR
========================= */

if(listaAlunos[1]){

const patente = obterPatentePorNivel(listaAlunos[1].nivel)

segundo.innerHTML = `

<div>🥈</div>

<img src="${patente.imagem}">

<div class="nome">${listaAlunos[1].nome}</div>

<div class="xp">${listaAlunos[1].xp} XP</div>

`

}



/* =========================
   3º LUGAR
========================= */

if(listaAlunos[2]){

const patente = obterPatentePorNivel(listaAlunos[2].nivel)

terceiro.innerHTML = `

<div>🥉</div>

<img src="${patente.imagem}">

<div class="nome">${listaAlunos[2].nome}</div>

<div class="xp">${listaAlunos[2].xp} XP</div>

`

}

}



/* =====================================================
   TABELA
===================================================== */

function renderTabela(){

const tabela = document.getElementById("ranking")

if(!tabela) return

tabela.innerHTML = ""

const user = auth.currentUser

listaAlunos.forEach((aluno,i)=>{

const patente = obterPatentePorNivel(aluno.nivel)

let medalha = i+1

if(i === 0) medalha = "🥇"
if(i === 1) medalha = "🥈"
if(i === 2) medalha = "🥉"

const destaque =
user && user.uid === aluno.id
? 'style="background:#1d4ed8;font-weight:bold"'
: ""

tabela.innerHTML += `

<tr ${destaque}>

<td>${medalha}</td>

<td>${aluno.nome}</td>

<td>${aluno.serie}</td>

<td>${aluno.xp}</td>

<td>
<img src="${patente.imagem}" width="40">
</td>

<td>${aluno.streak}</td>

</tr>

`

})

}



/* =====================================================
   POSIÇÃO DO ALUNO LOGADO
===================================================== */

function mostrarMinhaPosicao(){

const user = auth.currentUser

if(!user) return

const posicaoDiv = document.getElementById("minha-posicao")

if(!posicaoDiv) return

const index = listaAlunos.findIndex(a => a.id === user.uid)

if(index === -1) return

posicaoDiv.innerHTML =
`📍 Sua posição no ranking: <b>${index+1}º lugar</b>`

}



/* =====================================================
   ESPERA AUTH
===================================================== */

onAuthStateChanged(auth, async (user) => {

if(!user){
bloquearRanking("🔒 Faça login para acessar o ranking.")
return
}

const temAcesso = await verificarAcessoRanking(user)

if(!temAcesso){
return
}

carregarRanking()

})