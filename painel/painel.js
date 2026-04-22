import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore, collection, getDocs, query, where,
  doc, updateDoc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


// 🔥 CONFIG (mesma do glossário)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const lista = document.getElementById("listaValidacao");


// 📋 CARREGAR DEFINIÇÕES
async function carregarValidacao() {

  lista.innerHTML = "";

  const q = query(
    collection(db, "definicoes"),
    where("status", "==", "em_validacao")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap) => {
    const d = docSnap.data();

    const div = document.createElement("div");

    div.innerHTML = `
      <hr>
      <h3>${d.termo}</h3>
      <p>${d.definicao}</p>
      <small>👤 ${d.autorNome}</small><br>
      <small>👍 ${d.votos}</small><br><br>

      <button onclick="aprovar('${docSnap.id}')">✅ Aprovar</button>
      <button onclick="rejeitar('${docSnap.id}')">❌ Rejeitar</button>
    `;

    lista.appendChild(div);
  });
}


// ✅ APROVAR
async function aprovar(id) {

  const ref = doc(db, "definicoes", id);

  const snap = await getDoc(ref);
  const d = snap.data();

  // envia pro glossário oficial
  await setDoc(doc(db, "glossario_oficial", id), {
    termo: d.termo,
    definicao: d.definicao,
    autorNome: d.autorNome,
    autorId: d.autorId,
    dataValidacao: serverTimestamp()
  });

  // atualiza status
  await updateDoc(ref, {
    status: "aprovado"
  });

  carregarValidacao();
}


// ❌ REJEITAR
async function rejeitar(id) {
  await updateDoc(doc(db, "definicoes", id), {
    status: "rejeitado"
  });

  carregarValidacao();
}


// 🔥 liberar pro HTML
window.aprovar = aprovar;
window.rejeitar = rejeitar;


// INIT
carregarValidacao();