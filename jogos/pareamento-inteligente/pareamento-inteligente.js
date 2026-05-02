// ======================================================
// 🔥 IMPORTS (FIREBASE)
// ======================================================
import { auth, db } from "../../js/firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// ======================================================
// 🧠 DADOS DO JOGO
// ======================================================
const dados = [
  { id: 1, e: "Velocidade média", d: "ΔS/Δt" },
  { id: 2, e: "Força", d: "m·a" },
  { id: 3, e: "Energia cinética", d: "½mv²" },
  { id: 4, e: "Pressão", d: "F/A" },
  { id: 5, e: "Densidade", d: "m/V" }
];


// ======================================================
// 🎮 ESTADO DO JOGO
// ======================================================
let esquerdaSelecionada = null;
let direitaSelecionada = null;

let acertos = 0;
let combo = 0;
let tempo = 0;
let intervalo = null;


// ======================================================
// 🚀 INICIALIZAÇÃO
// ======================================================
window.onload = () => {
  iniciarJogo();
  carregarRanking(); // já carrega ranking ao abrir
};


// ======================================================
// 🎯 INICIAR JOGO
// ======================================================
function iniciarJogo() {
  resetEstado();
  renderizar();
  iniciarTempo();
}


// ======================================================
// 🔄 RESET
// ======================================================
function resetEstado() {
  esquerdaSelecionada = null;
  direitaSelecionada = null;

  acertos = 0;
  combo = 0;
  tempo = 0;

  atualizarHUD();
  mostrarMensagem("");

  clearInterval(intervalo);
}


// ======================================================
// ⏱️ TEMPO
// ======================================================
function iniciarTempo() {
  intervalo = setInterval(() => {
    tempo++;
    document.getElementById("tempo").innerText = tempo;
  }, 1000);
}


// ======================================================
// 🎨 RENDERIZAÇÃO
// ======================================================
function renderizar() {
  const esquerda = document.getElementById("lista-esquerda");
  const direita = document.getElementById("lista-direita");

  esquerda.innerHTML = "";
  direita.innerHTML = "";

  const direitaEmbaralhada = [...dados].sort(() => Math.random() - 0.5);

  dados.forEach(item => {
    esquerda.appendChild(criarItem(item.e, "esquerda", item));
  });

  direitaEmbaralhada.forEach(item => {
    direita.appendChild(criarItem(item.d, "direita", item));
  });
}


// ======================================================
// 🧩 CRIAR ITEM
// ======================================================
function criarItem(texto, lado, item) {
  const div = document.createElement("div");
  div.className = "item";
  div.innerText = texto;

  div.onclick = () => selecionar(div, lado, item);

  return div;
}


// ======================================================
// 🖱️ SELEÇÃO
// ======================================================
function selecionar(elemento, lado, item) {
  limparSelecao(lado);
  elemento.classList.add("selecionado");

  if (lado === "esquerda") {
    esquerdaSelecionada = { elemento, item };
  } else {
    direitaSelecionada = { elemento, item };
  }

  verificar();
}


// ======================================================
// 🧹 LIMPAR SELEÇÃO
// ======================================================
function limparSelecao(lado) {
  document.querySelectorAll(`#lista-${lado} .item`)
    .forEach(el => el.classList.remove("selecionado"));
}


// ======================================================
// ✅ VERIFICAR RESPOSTA
// ======================================================
function verificar() {
  if (!esquerdaSelecionada || !direitaSelecionada) return;

  const e = esquerdaSelecionada;
  const d = direitaSelecionada;

  if (e.item.id === d.item.id) {
    // ✔ ACERTO
    marcarCorreto(e, d);
  } else {
    // ❌ ERRO
    marcarErro(e, d);
  }

  esquerdaSelecionada = null;
  direitaSelecionada = null;
}


// ======================================================
// ✔ ACERTO
// ======================================================
function marcarCorreto(e, d) {
  e.elemento.classList.add("correto");
  d.elemento.classList.add("correto");

  e.elemento.style.pointerEvents = "none";
  d.elemento.style.pointerEvents = "none";

  acertos++;
  combo++;

  atualizarHUD();
  mostrarMensagem("✅ Acertou!", "green");

  verificarFim();
}


// ======================================================
// ❌ ERRO
// ======================================================
function marcarErro(e, d) {
  e.elemento.classList.add("errado");
  d.elemento.classList.add("errado");

  combo = 0;

  atualizarHUD();
  mostrarMensagem("❌ Errou!", "red");

  setTimeout(() => {
    e.elemento.classList.remove("errado");
    d.elemento.classList.remove("errado");
  }, 700);
}


// ======================================================
// 🎯 HUD
// ======================================================
function atualizarHUD() {
  document.getElementById("acertos").innerText = acertos;
  document.getElementById("combo").innerText = combo;
}


// ======================================================
// 💬 MENSAGEM
// ======================================================
function mostrarMensagem(texto, cor = "white") {
  const msg = document.getElementById("mensagem");
  msg.innerText = texto;
  msg.style.color = cor;
}


// ======================================================
// 🏁 FINAL DO JOGO
// ======================================================
async function verificarFim() {
  if (acertos === dados.length) {
    clearInterval(intervalo);

    mostrarMensagem(`🏆 Concluído em ${tempo}s!`, "cyan");

    await salvarResultado(tempo);
    carregarRanking(); // atualiza ranking na hora
  }
}


// ======================================================
// 🔥 SALVAR RESULTADO
// ======================================================
async function salvarResultado(tempoFinal) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    // salva tentativa
    await addDoc(collection(db, "pareamentoTentativas"), {
      uid: user.uid,
      nome: user.displayName || "Aluno",
      tempo: tempoFinal,
      data: serverTimestamp()
    });

    // atualiza recorde
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const melhorTempo = snap.data().tempoPareamento;

    if (!melhorTempo || tempoFinal < melhorTempo) {
      await updateDoc(ref, { tempoPareamento: tempoFinal });

      mostrarMensagem(`🏆 NOVO RECORDE: ${tempoFinal}s!`, "gold");
    }

  } catch (erro) {
    console.error("Erro ao salvar:", erro);
  }
}


// ======================================================
// 🏆 RANKING
// ======================================================
async function carregarRanking() {
  const container = document.getElementById("ranking-lista");
  if (!container) return;

  try {
    const q = query(
      collection(db, "usuarios"),
      orderBy("tempoPareamento", "asc"),
      limit(10)
    );

    const snap = await getDocs(q);

    container.innerHTML = "";

    let pos = 1;

    snap.forEach(doc => {
      const d = doc.data();
      if (!d.tempoPareamento) return;

      let medalha = pos === 1 ? "🥇" :
                    pos === 2 ? "🥈" :
                    pos === 3 ? "🥉" : `#${pos}`;

      const item = document.createElement("div");
      item.className = "ranking-item";

      item.innerHTML = `
        <span class="posicao">${medalha}</span>
        <span class="nome">${d.nome || "Aluno"}</span>
        <span class="tempo">${d.tempoPareamento}s</span>
      `;

      container.appendChild(item);
      pos++;
    });

  } catch (erro) {
    console.error("Erro ranking:", erro);
  }
}


// ======================================================
// 🔄 REINICIAR
// ======================================================
window.reiniciarJogo = () => iniciarJogo();