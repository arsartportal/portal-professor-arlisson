export function iniciarContador(idContainer, dataAlvo){

const container = document.getElementById(idContainer);

container.innerHTML = `
<div class="contador-premium">

<div class="tempo">
<span class="dias">00</span>
<p>Dias</p>
</div>

<div class="tempo">
<span class="horas">00</span>
<p>Horas</p>
</div>

<div class="tempo">
<span class="minutos">00</span>
<p>Min</p>
</div>

<div class="tempo">
<span class="segundos">00</span>
<p>Seg</p>
</div>

</div>
`;

const dias = container.querySelector(".dias");
const horas = container.querySelector(".horas");
const minutos = container.querySelector(".minutos");
const segundos = container.querySelector(".segundos");

function atualizar(){

const agora = new Date().getTime();
const alvo = new Date(dataAlvo).getTime();

const diff = alvo - agora;

if(diff <= 0){

container.innerHTML = "🎉 Evento liberado!";
return;

}

dias.innerText = Math.floor(diff / (1000*60*60*24));

horas.innerText =
Math.floor((diff%(1000*60*60*24))/(1000*60*60));

minutos.innerText =
Math.floor((diff%(1000*60*60))/(1000*60));

segundos.innerText =
Math.floor((diff%(1000*60))/1000);

}

setInterval(atualizar,1000);

atualizar();

}

const dataInicio = new Date("2026-03-01").getTime();
const dataLancamento = new Date("2026-04-01").getTime();

function atualizarBarra(){

const agora = new Date().getTime();

const progresso =
(agora - dataInicio) /
(dataLancamento - dataInicio);

const porcentagem =
Math.min(Math.max(progresso*100,0),100);

document.getElementById("barraLancamento")
.style.width = porcentagem + "%";

}

setInterval(atualizarBarra,1000);
atualizarBarra();