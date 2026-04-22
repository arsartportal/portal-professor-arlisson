import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBQ8EQ5ftRwCGWK3maT9Vj53fOI5PR-C2c",
  authDomain: "portal-professor-arlisson.firebaseapp.com",
  projectId: "portal-professor-arlisson"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// =============================
// 🔒 VERIFICA PROFESSOR
// =============================
onAuthStateChanged(auth, async (user) => {

  // ⏳ Enquanto carrega, não faz nada
  if (user === null) return;

  // 🔒 Agora sim valida
  if (!user) {
    alert("Você precisa estar logado!");
    window.location.href = "/login.html";
    return;
  }

  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists() || snap.data().tipo !== "professor") {
    alert("Acesso restrito!");
    window.location.href = "/";
    return;
  }

  // ✅ Só entra aqui se tudo estiver certo
  document.getElementById("semanaInput").value = getSemanaDoAno();
  carregarTermos();
});

// =============================
// 📅 SEMANA
// =============================
function getSemanaDoAno() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), 0, 1);
  const dias = Math.floor((hoje - primeiroDia) / (24 * 60 * 60 * 1000));
  return Math.ceil((dias + primeiroDia.getDay() + 1) / 7);
}


// =============================
// ➕ ADICIONAR TERMO
// =============================
async function adicionarTermo() {
  const semana = document.getElementById("semanaInput").value;
  const termo = document.getElementById("termoInput").value.trim();
  const fase = document.getElementById("faseInput").value;

  if (!termo) return alert("Digite um termo!");

  const ano = new Date().getFullYear();
  const ref = doc(db, "glossario_desafios", ano.toString());

  const chave = "semana_" + String(semana).padStart(2, "0");

  const snap = await getDoc(ref);

  let termos = [];

  if (snap.exists() && snap.data()[chave]?.termos) {
    termos = snap.data()[chave].termos;
  }

  termos.push({ termo, fase });

  await setDoc(ref, {
    [chave]: { termos }
  }, { merge: true });

  document.getElementById("termoInput").value = "";

  carregarTermos();
}


// =============================
// 📋 CARREGAR TERMOS
// =============================
async function carregarTermos() {
  const semana = document.getElementById("semanaInput").value;
  const lista = document.getElementById("listaTermos");

  lista.innerHTML = "";

  const ano = new Date().getFullYear();
  const ref = doc(db, "glossario_desafios", ano.toString());
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const chave = "semana_" + String(semana).padStart(2, "0");
  const termos = snap.data()[chave]?.termos || [];

  termos.forEach((t, index) => {
    const div = document.createElement("div");
    div.classList.add("termo-item");

    div.innerHTML = `
      <strong>${t.termo}</strong><br>
      <small>Fase: ${t.fase}</small>
      <button onclick="removerTermo(${index})">Remover</button>
    `;

    lista.appendChild(div);
  });
}


// =============================
// ❌ REMOVER TERMO
// =============================
async function removerTermo(index) {
  const semana = document.getElementById("semanaInput").value;

  const ano = new Date().getFullYear();
  const ref = doc(db, "glossario_desafios", ano.toString());
  const snap = await getDoc(ref);

  const chave = "semana_" + String(semana).padStart(2, "0");
  let termos = snap.data()[chave]?.termos || [];

  termos.splice(index, 1);

  await setDoc(ref, {
    [chave]: { termos }
  }, { merge: true });

  carregarTermos();
}


// =============================
// 🌍 GLOBAL
// =============================
window.adicionarTermo = adicionarTermo;
window.removerTermo = removerTermo;