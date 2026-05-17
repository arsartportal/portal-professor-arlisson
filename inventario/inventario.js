import { auth, db } from "../js/firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  updateDoc,
  query,
  orderBy,
  increment,
  limit
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// =============================
// 🧮 CALCULAR SCIENCEBANK
// =============================
function calcularDepositoScienceBank(dados){
  const nivel = dados.nivel || 0;
  return Math.max(nivel * 5, 5);
}


// =============================
// 🧠 FORMATAR DATA
// =============================
function formatarData(valor){

  if(!valor) return "-";

  if(typeof valor.toDate === "function"){
    const data = valor.toDate();
    return data.toLocaleDateString("pt-BR") + " • " + data.toLocaleTimeString("pt-BR");
  }

  if(valor instanceof Date){
    return valor.toLocaleDateString("pt-BR") + " • " + valor.toLocaleTimeString("pt-BR");
  }

  return "-";
}


// =============================
// 📊 TOPO
// =============================
function renderInfoTopo(dados){

  const topo = document.getElementById("infoTopo");

  topo.innerHTML = `
    <div class="card-topo">
      <span>SciencePoints</span>
      <b>${dados.sciencePoints || 0}</b>
    </div>

    <div class="card-topo">
      <span>XP Atual</span>
      <b>${dados.xp || 0}</b>
    </div>

    <div class="card-topo">
      <span>Nível Atual</span>
      <b>${dados.nivel || 0}</b>
    </div>
  `;
}


// =============================
// 📦 INVENTÁRIO
// =============================
async function carregarInventario(uid){

  const lista = document.getElementById("inventarioLista");

  const q = query(
    collection(db,"usuarios",uid,"inventario"),
    orderBy("atualizadoEm","desc")
  );

  const snapshot = await getDocs(q);

  if(snapshot.empty){
    lista.innerHTML = `<div class="vazio">Nenhum item no inventário.</div>`;
    return;
  }

  let html = "";

  snapshot.forEach(docItem=>{
    const item = docItem.data();

    const statusClasse = (item.status || "ativo").toLowerCase();
    const dataAdicao = item.adicionadoEm || item.ativadoEm || null;

    html += `
      <div class="item">
        <h3>${item.nome || "Item sem nome"}</h3>
        <p><strong>Tipo:</strong> ${item.tipo || "-"}</p>
        <p><strong>Origem:</strong> ${item.origem || "-"}</p>
        <p><strong>Descrição:</strong> ${item.descricao || "-"}</p>
        <p><strong>Adicionado em:</strong> ${formatarData(dataAdicao)}</p>
        ${item.expiraEm ? `<p><strong>Expira em:</strong> ${formatarData(item.expiraEm)}</p>` : ""}
        <div class="status ${statusClasse}">${item.status || "ativo"}</div>
      </div>
    `;
  });

  lista.innerHTML = html;
}


// =============================
// 📝 LOGS
// =============================
async function carregarLogs(uid){

  const lista = document.getElementById("logsLista");

  const q = query(
    collection(db,"usuarios",uid,"logs"),
    orderBy("data","desc"),
    limit(30)
  );

  const snapshot = await getDocs(q);

  if(snapshot.empty){
    lista.innerHTML = `<div class="vazio">Nenhum log encontrado.</div>`;
    return;
  }

  let html = "";

  snapshot.forEach(docItem=>{
    const log = docItem.data();

    html += `
      <div class="log">
        <div><strong>${log.itemNome || "Ação do sistema"}</strong></div>
        <div>${log.descricao || "-"}</div>
        <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">
          SP: ${log.sciencePointsAntes ?? "-"} → ${log.sciencePointsDepois ?? "-"}<br>
          XP: ${log.xpAntes ?? "-"} → ${log.xpDepois ?? "-"}<br>
          Nível: ${log.nivelAntes ?? "-"} → ${log.nivelDepois ?? "-"}
        </div>
        <div class="data">${formatarData(log.data)}</div>
      </div>
    `;
  });

  lista.innerHTML = html;
}


// =============================
// 📅 PRÓXIMO DOMINGO 13:00 (BR)
// =============================
function getProximoDomingo13(){

  const agora = new Date();

  const agoraBR = new Date(
    agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const proximo = new Date(agoraBR);

  let diasAteDomingo = (7 - agoraBR.getDay()) % 7;

  const dia = agoraBR.getDay();

  const dentroDaJanela =
    (dia === 0 && agoraBR.getHours() >= 13) ||
    dia === 1 ||
    dia === 2 ||
    (dia === 3 && agoraBR.getHours() < 13);

  // se já está na janela atual, aponta para o próximo domingo
  if(dentroDaJanela){
    diasAteDomingo += 7;
  }

  proximo.setDate(agoraBR.getDate() + diasAteDomingo);
  proximo.setHours(13,0,0,0);

  return proximo;
}

function podeSacarScienceBank(ultimaColeta){

  const agora = new Date();

  const agoraBR = new Date(
    agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const dia = agoraBR.getDay();

  let dentroDaJanela = false;

  // domingo após 13h
  if(dia === 0 && agoraBR.getHours() >= 13){
    dentroDaJanela = true;
  }

  // segunda e terça
  if(dia === 1 || dia === 2){
    dentroDaJanela = true;
  }

  // quarta até 13h
  if(dia === 3 && agoraBR.getHours() < 13){
    dentroDaJanela = true;
  }

  if(!dentroDaJanela) return false;

  if(!ultimaColeta) return true;

  const ultimaBR = new Date(
    ultimaColeta.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const inicioJanela = new Date(agoraBR);

// volta até o domingo desta janela
let diasDesdeDomingo = dia;

if(dia === 1) diasDesdeDomingo = 1; // segunda -> domingo ontem
if(dia === 2) diasDesdeDomingo = 2; // terça -> domingo há 2 dias
if(dia === 3) diasDesdeDomingo = 3; // quarta -> domingo há 3 dias

inicioJanela.setDate(agoraBR.getDate() - diasDesdeDomingo);
inicioJanela.setHours(13,0,0,0);

  return ultimaBR < inicioJanela;
}


// =============================
// ⏳ CONTADOR REGRESSIVO
// =============================
let intervaloSB = null;

function iniciarContador(podeColetar){

  const el = document.getElementById("contadorSB");

  if(intervaloSB){
    clearInterval(intervaloSB);
  }

  function atualizar(){

    if(podeColetar){
      el.textContent = "🎉 Disponível para saque!";
      return;
    }

    const agora = new Date();
    const proximo = getProximoDomingo13();
    const diff = proximo - agora;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    el.textContent = `⏳ Próximo saque em: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  atualizar();
  intervaloSB = setInterval(atualizar, 1000);
}


// =============================
// 🏦 SCIENCE BANK
// =============================
function verificarScienceBank(user){

  const refUser = doc(db,"usuarios",user.uid);
  const refGlobal = doc(db,"config","sciencebank");

  const texto = document.getElementById("textoScienceBank");
  const valorEl = document.getElementById("valorSP");
  const btn = document.getElementById("btnColetarSP");
  const totalUserEl = document.getElementById("spUsuarioTotal");
  const totalGlobalEl = document.getElementById("spGlobalTotal");

  onSnapshot(refUser, (snap)=>{

  if(!snap.exists()) return;

  const dados = snap.data();

  const ultimaColeta = dados.scienceBankUltimoResgate
    ? dados.scienceBankUltimoResgate?.toDate?.() || new Date(dados.scienceBankUltimoResgate)
    : null;

  // usa a nova janela: domingo 13h até quarta 13h
  const podeColetar = podeSacarScienceBank(ultimaColeta);

  const valor = calcularDepositoScienceBank(dados);

  iniciarContador(podeColetar);

  if(podeColetar){
    valorEl.textContent = valor;
    btn.style.display = "inline-block";
    texto.textContent = "💰 Seu ScienceBank está disponível para saque!";
  } else {
    valorEl.textContent = 0;
    btn.style.display = "none";
    texto.textContent = "⏳ Disponível de domingo 13:00 até quarta 13:00.";
  }

  totalUserEl.textContent = dados.scienceBankTotalRecebido || 0;

  btn.onclick = async ()=>{

  if(!podeColetar) return;

  const popup = document.getElementById("popupScienceBank");
  const popupValor = document.getElementById("popupValorSP");
  const btnCancelarPopup = document.getElementById("btnCancelarPopup");
  const btnConfirmarPopup = document.getElementById("btnConfirmarPopup");

  popupValor.textContent = valor;
  popup.classList.remove("hidden");

  const confirmar = await new Promise((resolve)=>{

    btnCancelarPopup.onclick = ()=>{
      popup.classList.add("hidden");
      resolve(false);
    };

    btnConfirmarPopup.onclick = ()=>{
      popup.classList.add("hidden");
      resolve(true);
    };

  });

  if(!confirmar) return;

  try{

    const scienceAntes = dados.sciencePoints || 0;
    const scienceDepois = scienceAntes + valor;

    await updateDoc(refUser,{
      sciencePoints: scienceDepois,
      scienceBankUltimoResgate: new Date(),
      scienceBankTotalRecebido: (dados.scienceBankTotalRecebido || 0) + valor
    });

    await setDoc(refGlobal,{
      totalDistribuido: increment(valor)
    },{ merge: true });

    // log do saque
    const logRef = doc(
      collection(db,"usuarios",user.uid,"logs")
    );

    await setDoc(logRef,{
      tipo: "sciencebank",
      itemNome: "🏦 ScienceBank",
      descricao: `Sacou ${valor} SP do ScienceBank semanal.`,
      sciencePointsAntes: scienceAntes,
      sciencePointsDepois: scienceDepois,
      xpAntes: dados.xp || 0,
      xpDepois: dados.xp || 0,
      nivelAntes: dados.nivel || 0,
      nivelDepois: dados.nivel || 0,
      data: new Date()
    });

    texto.textContent = "✅ Recompensa coletada!";
    valorEl.textContent = 0;
    btn.style.display = "none";

    const popupRecebido = document.getElementById("popupRecebido");
const popupRecebidoValor = document.getElementById("popupRecebidoValor");
const btnFecharPopupRecebido = document.getElementById("btnFecharPopupRecebido");

popupRecebidoValor.textContent = valor;
popupRecebido.classList.remove("hidden");

btnFecharPopupRecebido.onclick = ()=>{
  popupRecebido.classList.add("hidden");
};

  }catch(e){
    console.error("Erro ao sacar ScienceBank:", e);
    alert("Erro ao sacar o ScienceBank.");
  }
};

});

onSnapshot(refGlobal, (snap)=>{
    if(snap.exists()){
      totalGlobalEl.textContent = snap.data().totalDistribuido || 0;
    }
  });

}


// =============================
// 🔐 AUTH INIT
// =============================
auth.onAuthStateChanged(async user=>{

  if(!user){
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
        🔒 Faça login para acessar seu inventário.
      </div>
    `;
    return;
  }

  verificarScienceBank(user);

  const snap = await getDoc(doc(db,"usuarios",user.uid));

  if(!snap.exists()){
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
        ❌ Usuário não encontrado.
      </div>
    `;
    return;
  }

  const dados = snap.data();

  renderInfoTopo(dados);
  await carregarInventario(user.uid);
  await carregarLogs(user.uid);

});
