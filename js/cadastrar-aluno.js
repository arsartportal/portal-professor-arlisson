/* =====================================================
   CADASTRAR-ALUNO.JS
   -----------------------------------------------------
   Responsável por:
   ✔ criar aluno no Firebase Authentication
   ✔ criar perfil do aluno no Firestore
   ✔ definir tipo = "aluno"

   IMPORTANTE:
   ✔ Só professor deve acessar essa tela
===================================================== */

import { getAuth, createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { app } from "./firebase.js";

/* Inicializa serviços */
const auth = getAuth(app);
const db = getFirestore(app);

/* -----------------------------------------------------
   FUNÇÃO PRINCIPAL
----------------------------------------------------- */
window.cadastrarAluno = async function () {

  // Captura os valores do formulário
  const nome    = document.getElementById("nome").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const turma   = document.getElementById("turma").value.trim();
  const senha   = document.getElementById("senha").value;
  const msg     = document.getElementById("mensagem");

  msg.innerText = "";

  /* Validação básica */
  if (!nome || !usuario || !turma || !senha) {
    msg.innerText = "Preencha todos os campos.";
    return;
  }

  /* ---------------------------------------------------
     CONVERSÃO DE LOGIN DIDÁTICA
     aluno digita: joao.silva
     sistema cria: joao.silva@exatas.site
  --------------------------------------------------- */
  const email = `${usuario}@exatas.site`;

  try {

    /* -------------------------------------------------
       1️⃣ CRIA USUÁRIO NO AUTH
       Esse usuário poderá fazer login
    ------------------------------------------------- */
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    const uid = cred.user.uid;

    /* -------------------------------------------------
       2️⃣ CRIA PERFIL NO FIRESTORE
       Documento ID = UID
    ------------------------------------------------- */
    await setDoc(doc(db, "usuarios", uid), {
      nome: nome,
      usuario: usuario,
      tipo: "aluno",
      turma: turma,
      xp: 0,
      nivel: 0,
      conquistas: [],
      criadoEm: serverTimestamp()
    });

    msg.innerText = "Aluno cadastrado com sucesso!";

    // Limpa formulário
    document.querySelector("form").reset();

  } catch (e) {
    console.error(e);

    if (e.code === "auth/email-already-in-use") {
      msg.innerText = "Usuário já existe.";
    } else {
      msg.innerText = "Erro ao cadastrar aluno.";
    }
  }
};
