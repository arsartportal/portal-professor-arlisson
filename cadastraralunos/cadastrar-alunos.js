/* =====================================================
🔥 CADASTRO DE ALUNOS — PORTAL DO PROFESSOR (VERSÃO FINAL)
===================================================== */

import { auth, db, firebaseConfig } from "../js/firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  createUserWithEmailAndPassword,
  getAuth
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";


/* =====================================================
📌 ELEMENTOS
===================================================== */

const form = document.getElementById("formCadastrarAluno");
const msg = document.getElementById("msg");
const selectProfessor = document.getElementById("professor");


/* =====================================================
🔐 SEGURANÇA — SOMENTE PROFESSOR
===================================================== */

auth.onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "usuarios", user.uid));

  if (!snap.exists() || snap.data().tipo !== "professor") {
    window.location.href = "home.html";
    return;
  }

  // 🔥 carrega professores depois da verificação
  carregarProfessores();
});


/* =====================================================
👨‍🏫 CARREGAR PROFESSORES (FIREBASE)
===================================================== */

async function carregarProfessores(){

  const snapshot = await getDocs(collection(db, "usuarios"));

  selectProfessor.innerHTML = '<option value="">Selecione o professor</option>';

  snapshot.forEach(docSnap => {

    const dados = docSnap.data();

    if(dados.tipo === "professor"){

      const option = document.createElement("option");

      option.value = docSnap.id; // 🔥 professorId
      option.textContent = dados.nome;

      selectProfessor.appendChild(option);
    }

  });

  // 🔥 auto seleciona o professor logado
  if(auth.currentUser){
    selectProfessor.value = auth.currentUser.uid;
  }
}


/* =====================================================
🎛 CUSTOM SELECTS (ESCOLA + SÉRIE)
===================================================== */

const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach(select => {

  const selected = select.querySelector(".select-selected");
  const items = select.querySelector(".select-items");

  selected.addEventListener("click", () => {
    closeAllSelects(select);
    select.classList.toggle("active");
  });

  items.querySelectorAll("div").forEach(option => {

    option.addEventListener("click", () => {

      selected.textContent = option.textContent;
      select.dataset.value = option.dataset.value;
      select.classList.remove("active");

    });

  });

});

function closeAllSelects(current) {
  customSelects.forEach(select => {
    if (select !== current) {
      select.classList.remove("active");
    }
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    closeAllSelects();
  }
});


/* =====================================================
🚀 SUBMIT (CADASTRO)
===================================================== */

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value;

  const escola = document.querySelector('[data-name="escola"]').dataset.value;
  const serie = document.querySelector('[data-name="serie"]').dataset.value || "";
  const turma = document.getElementById("turma").value.trim();

  const professorId = selectProfessor.value; // 🔥 NOVO

  if (!nome || !senha || !escola || !professorId) {
    mostrarMsg("Preencha todos os campos obrigatórios.", "erro");
    return;
  }

  /* =====================================================
  🔤 GERAR LOGIN
  ===================================================== */

  const login = nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  const email = login + "@exatas.site";


  try {

    /* =====================================================
    🔐 AUTH SECUNDÁRIO (NÃO DESLOGA PROFESSOR)
    ===================================================== */

    const secondaryApp = initializeApp(firebaseConfig, "Secondary");
    const secondaryAuth = getAuth(secondaryApp);

    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      senha
    );

    const alunoUID = cred.user.uid;


    /* =====================================================
    💾 SALVAR NO FIRESTORE
    ===================================================== */

    await setDoc(doc(db, "usuarios", alunoUID), {

      nome,
      usuario: login,
      email,

      tipo: "aluno",

      escola,
      turma,
      serie,

      nivel: 0,
      xp: 0,

      professorId: professorId, // 🔥 ESSENCIAL

      criadoEm: serverTimestamp(),
      ultimoAcesso: serverTimestamp()

    });


    /* =====================================================
    ✅ SUCESSO
    ===================================================== */

    mostrarMsg(`Aluno criado! Login: ${login}`, "sucesso");

    form.reset();

    // reset selects visuais
    document.querySelector('[data-name="escola"] .select-selected')
      .textContent = "Selecione a escola";

    document.querySelector('[data-name="serie"] .select-selected')
      .textContent = "Selecione";

    delete document.querySelector('[data-name="escola"]').dataset.value;
    delete document.querySelector('[data-name="serie"]').dataset.value;


  } catch (error) {

    if (error.code === "auth/email-already-in-use") {
      mostrarMsg("Já existe um aluno com esse nome.", "erro");
    } else {
      mostrarMsg("Erro ao cadastrar aluno.", "erro");
    }

    console.error(error);
  }

});


/* =====================================================
💬 MENSAGENS
===================================================== */

function mostrarMsg(texto, tipo){

  msg.textContent = texto;
  msg.className = tipo;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "";
  }, 4000);

}