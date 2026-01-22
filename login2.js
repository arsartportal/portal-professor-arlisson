/* =====================================================
   LOGIN2.JS — PORTAL DO PROFESSOR ARLISSON
===================================================== */

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

window.login = async function () {

  const usuario = document.getElementById("usuario").value.trim();
  const senha   = document.getElementById("senha").value;
  const erro    = document.getElementById("erro");

  erro.innerText = "";

  if (!usuario || !senha) {
    erro.innerText = "Informe usuário e senha.";
    return;
  }

  const email = `${usuario}@exatas.site`;

  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    // cria sessão local
    localStorage.setItem("uid", cred.user.uid);

    // redireciona
    window.location.href = "home.html";

  } catch (e) {
    console.error(e);

    if (e.code === "auth/wrong-password") {
      erro.innerText = "Senha incorreta.";
    } else if (e.code === "auth/user-not-found") {
      erro.innerText = "Usuário não encontrado.";
    } else if (e.code === "auth/too-many-requests") {
      erro.innerText = "Muitas tentativas. Aguarde alguns minutos.";
    } else {
      erro.innerText = "Erro ao acessar o portal.";
    }
  }
};
