/* =====================================================
   CADASTRO DE ALUNOS — PORTAL DO PROFESSOR
===================================================== */

import { auth, db, firebaseConfig } from "../js/firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  createUserWithEmailAndPassword,
  getAuth
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

/* =====================================================
   ELEMENTOS
===================================================== */

const form = document.getElementById("formCadastrarAluno");
const msg = document.getElementById("msg");

/* =====================================================
   SEGURANÇA — SOMENTE PROFESSOR
===================================================== */

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "usuarios", user.uid));

  if (!snap.exists() || snap.data().tipo !== "professor") {
    window.location.href = "home.html";
  }
});

/* =====================================================
   CUSTOM SELECTS (ESCOLA + SÉRIE)
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
   SUBMIT
===================================================== */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value;

  const escola = document.querySelector('[data-name="escola"]').dataset.value;
  const serie = document.querySelector('[data-name="serie"]').dataset.value || "";
  const turma = document.getElementById("turma").value.trim();

  if (!nome || !senha || !escola) {
    mostrarMsg("Preencha os campos obrigatórios.", "erro");
    return;
  }

  // Converte nome em login
  const login = nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  const email = login + "@exatas.site";

  try {

    /* ===== Secondary Auth ===== */

    const secondaryApp = initializeApp(firebaseConfig, "Secondary");
    const secondaryAuth = getAuth(secondaryApp);

    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      senha
    );

    const alunoUID = cred.user.uid;

    /* ===== Firestore ===== */

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
      criadoEm: serverTimestamp(),
      ultimoAcesso: serverTimestamp()
    });

    mostrarMsg(`Aluno criado! Login: ${login}`, "sucesso");

    form.reset();

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
   MENSAGEM
===================================================== */

function mostrarMsg(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "";
  }, 4000);
}
