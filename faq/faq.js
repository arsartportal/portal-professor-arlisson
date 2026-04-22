/* =========================================
📌 IMPORTS FIREBASE (CDN CORRETO)
========================================= */
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { auth, db } from "../js/firebase.js";


/* =========================================
📌 FAQ INTERATIVO (abrir/fechar)
========================================= */
const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {

    // fecha todos os outros itens
    items.forEach(i => {
      if(i !== item) i.classList.remove("active");
    });

    // alterna o atual
    item.classList.toggle("active");
  });
});


/* =========================================
💬 CONTROLE DO CHAT
========================================= */

let chatListenerAtivo = false; // evita múltiplos listeners

function abrirChat(){
  document.getElementById("chatBox").style.display = "flex";

  // só carrega uma vez
  if(!chatListenerAtivo){
    carregarChat();
    chatListenerAtivo = true;
  }
}

function fecharChat(){
  document.getElementById("chatBox").style.display = "none";
}


/* =========================================
💾 SALVAR MENSAGEM (Firestore)
========================================= */
async function salvarMensagem(texto, tipo){

  const user = auth.currentUser;

  if(!user){
    console.warn("Usuário não logado");
    return;
  }

  try{
    await addDoc(
      collection(db, "chats", user.uid, "mensagens"),
      {
        texto: texto,
        tipo: tipo, // "user" ou "bot"
        data: serverTimestamp()
      }
    );
  }catch(e){
    console.error("Erro ao salvar mensagem:", e);
  }
}


/* =========================================
📥 CARREGAR HISTÓRICO EM TEMPO REAL
========================================= */
function carregarChat(){

  const user = auth.currentUser;
  if(!user) return;

  const chat = document.getElementById("chatMessages");

  const q = query(
    collection(db, "chats", user.uid, "mensagens"),
    orderBy("data")
  );

  onSnapshot(q, (snapshot) => {

    chat.innerHTML = "";

    snapshot.forEach(doc => {

      const msg = doc.data();

      const div = document.createElement("div");
      div.className = msg.tipo; // "user" ou "bot"
      div.innerText = msg.texto;

      chat.appendChild(div);
    });

    // scroll suave até o final
    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: "smooth"
    });
  });
}


/* =========================================
📤 ENVIAR MENSAGEM
========================================= */
async function enviarMensagem(){

  const input = document.getElementById("chatInput");
  const msg = input.value.trim();

  if(!msg) return;

  input.value = "";

  // salva mensagem do usuário
  await salvarMensagem(msg, "user");

  // resposta automática (simulação)
  setTimeout(async () => {

    const resposta = gerarResposta(msg);

    await salvarMensagem(resposta, "bot");

  }, 600);
}


/* =========================================
🧠 RESPOSTAS AUTOMÁTICAS (IA SIMPLES)
========================================= */
function gerarResposta(msg){

  msg = msg.toLowerCase();

  if(msg.includes("xp")){
    return "Você ganha XP participando das atividades, quizzes e desafios.";
  }

  if(msg.includes("sp")){
    return "Os Science Points são pontos virtuais do sistema e não possuem valor monetário.";
  }

  if(msg.includes("nível") || msg.includes("nivel")){
    return "Você sobe de nível acumulando XP ao longo do tempo.";
  }

  if(msg.includes("ranking")){
    return "O ranking mostra os alunos com maior desempenho no portal.";
  }

  if(msg.includes("erro") || msg.includes("bug")){
    return "Se algo não funcionou, tente atualizar a página. Se continuar, fale com o professor.";
  }

  return "Hmm... não tenho certeza 🤔\nTente reformular ou fale com o professor.";
}


/* =========================================
⌨️ EVENTOS (ENTER PARA ENVIAR)
========================================= */
document.getElementById("chatInput").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    enviarMensagem();
  }
});


/* =========================================
🌐 EXPOR FUNÇÕES PARA HTML
========================================= */
// necessário por causa do type="module"
window.abrirChat = abrirChat;
window.fecharChat = fecharChat;
window.enviarMensagem = enviarMensagem;