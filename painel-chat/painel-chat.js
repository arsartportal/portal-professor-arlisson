/* =========================================
📌 IMPORTS FIREBASE
========================================= */
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { db, auth } from "../js/firebase.js";


/* =========================================
📌 ESTADO GLOBAL
========================================= */
let usuarioSelecionado = null;
let unsubscribeMensagens = null;


/* =========================================
📥 LISTAR TODOS OS CHATS (ALUNOS)
========================================= */
function carregarLista(){

  const lista = document.getElementById("listaChats");

  // 🔥 ordena por última mensagem (mais recente primeiro)
  const q = query(collection(db, "chats"), orderBy("ultimaMensagemData", "desc"));

  onSnapshot(q, (snapshot) => {

    lista.innerHTML = "<h2>💬 Alunos</h2>";

    if(snapshot.empty){
      const vazio = document.createElement("div");
      vazio.style.opacity = "0.6";
      vazio.style.padding = "10px";
      vazio.innerText = "Nenhum aluno iniciou conversa ainda.";
      lista.appendChild(vazio);
      return;
    }

    snapshot.forEach(docSnap => {

      const data = docSnap.data();
      const userId = docSnap.id;

      // 🔥 ignora docs vazios
      if(!data || Object.keys(data).length === 0) return;

      const div = document.createElement("div");
      div.className = "chat-user";

      // 📌 nome + última mensagem (estilo WhatsApp)
      div.innerHTML = `
        <strong>${data.nome || "Aluno"}</strong><br>
        <small style="opacity:0.7">${data.ultimaMensagem || ""}</small>
      `;

      div.onclick = () => selecionarChat(userId);

      lista.appendChild(div);
    });
  });
}


/* =========================================
💬 CARREGAR CONVERSA DO ALUNO
========================================= */
function selecionarChat(userId){

  usuarioSelecionado = userId;

  document.getElementById("chatHeader").innerText = "Aluno: " + userId;

  const chat = document.getElementById("chatMessages");

  // 🔥 remove listener anterior
  if(unsubscribeMensagens){
    unsubscribeMensagens();
  }

  const q = query(
    collection(db, "chats", userId, "mensagens"),
    orderBy("data")
  );

  unsubscribeMensagens = onSnapshot(q, (snapshot) => {

    chat.innerHTML = "";

    snapshot.forEach(doc => {

      const msg = doc.data();

      const div = document.createElement("div");
      div.className = msg.tipo;
      div.innerText = msg.texto;

      chat.appendChild(div);
    });

    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: "smooth"
    });
  });
}


/* =========================================
📤 RESPONDER ALUNO (PROFESSOR)
========================================= */
async function responder(){

  const input = document.getElementById("respostaInput");
  const msg = input.value.trim();

  if(!msg || !usuarioSelecionado) return;

  input.value = "";

  try{

    /* =========================================
    🔥 GARANTE DOC DO CHAT (IMPORTANTE)
    ========================================= */
    await setDoc(
      doc(db, "chats", usuarioSelecionado),
      {
        ultimaMensagem: msg,
        ultimaMensagemData: new Date()
      },
      { merge: true }
    );

    /* =========================================
    💬 SALVA RESPOSTA
    ========================================= */
    await addDoc(
      collection(db, "chats", usuarioSelecionado, "mensagens"),
      {
        texto: msg,
        tipo: "bot",
        data: serverTimestamp()
      }
    );

  }catch(e){
    console.error("Erro ao responder:", e);
  }
}


/* =========================================
⌨️ ENTER PARA ENVIAR
========================================= */
document.getElementById("respostaInput").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    responder();
  }
});


/* =========================================
🚀 INICIAR SISTEMA
========================================= */
carregarLista();


/* =========================================
🌐 EXPOR FUNÇÃO PARA HTML
========================================= */
window.responder = responder;