import { auth, db } from "../js/firebase.js";

import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =========================
ELEMENTOS
========================= */

const form = document.getElementById("formTroca");

const msg = document.getElementById("msg");

const btn = document.getElementById("btnTrocar");

const senhaAtualInput =
  document.getElementById("senhaAtual");

const novaSenhaInput =
  document.getElementById("novaSenha");

const confirmarSenhaInput =
  document.getElementById("confirmarSenha");

/* =========================
SUBMIT
========================= */

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  limparMsg();

  const senhaAtual =
    senhaAtualInput.value.trim();

  const novaSenha =
    novaSenhaInput.value.trim();

  const confirmarSenha =
    confirmarSenhaInput.value.trim();

  /* =========================
  VALIDAÇÕES
  ========================= */

  if (!senhaAtual) {
    return mostrarMsg(
      "Digite sua senha atual",
      "erro"
    );
  }

  if (!novaSenha) {
    return mostrarMsg(
      "Digite a nova senha",
      "erro"
    );
  }

  if (novaSenha !== confirmarSenha) {
    return mostrarMsg(
      "As senhas não coincidem",
      "erro"
    );
  }

  if (novaSenha.length < 6) {
    return mostrarMsg(
      "A senha deve ter no mínimo 6 caracteres",
      "erro"
    );
  }

  const user = auth.currentUser;

  if (!user) {
    return mostrarMsg(
      "Sessão inválida. Faça login novamente.",
      "erro"
    );
  }

  /* =========================
  LOADING
  ========================= */

  ativarLoading(true);

  try {

    /* =========================
    REAUTENTICAÇÃO
    ========================= */

    const credential =
      EmailAuthProvider.credential(
        user.email,
        senhaAtual
      );

    await reauthenticateWithCredential(
      user,
      credential
    );

    /* =========================
    ALTERA SENHA
    ========================= */

    await updatePassword(
      user,
      novaSenha
    );

    /* =========================
    FIRESTORE
    ========================= */

    await updateDoc(
      doc(db, "usuarios", user.uid),
      {
        senhaTemporaria: false
      }
    );

    mostrarMsg(
      "Senha atualizada com sucesso! ✔",
      "sucesso"
    );

    /* LIMPA CAMPOS */

    form.reset();

    /* REDIRECIONA */

    setTimeout(() => {

      window.location.href =
        "/dashboard.html";

    }, 1500);

  } catch (error) {

    console.error(error);

    tratarErro(error);

  } finally {

    ativarLoading(false);

  }

});

/* =========================
TRATAMENTO DE ERROS
========================= */

function tratarErro(error) {

  switch (error.code) {

    case "auth/wrong-password":

      mostrarMsg(
        "Senha atual incorreta",
        "erro"
      );

      break;

    case "auth/weak-password":

      mostrarMsg(
        "A nova senha é muito fraca",
        "erro"
      );

      break;

    case "auth/requires-recent-login":

      mostrarMsg(
        "Faça login novamente para continuar",
        "erro"
      );

      break;

    case "auth/too-many-requests":

      mostrarMsg(
        "Muitas tentativas. Tente novamente mais tarde.",
        "erro"
      );

      break;

    case "auth/network-request-failed":

      mostrarMsg(
        "Erro de conexão com a internet",
        "erro"
      );

      break;

    default:

      mostrarMsg(
        "Erro ao atualizar senha",
        "erro"
      );

  }

}

/* =========================
LOADING
========================= */

function ativarLoading(estado) {

  btn.disabled = estado;

  const texto =
    btn.querySelector(".text");

  const loader =
    btn.querySelector(".loader");

  if (estado) {

    texto.style.display = "none";
    loader.style.display = "block";

  } else {

    texto.style.display = "block";
    loader.style.display = "none";

  }

}

/* =========================
MENSAGEM
========================= */

function mostrarMsg(texto, tipo) {

  msg.textContent = texto;

  msg.className = "";

  msg.classList.add(tipo);

}

function limparMsg() {

  msg.textContent = "";

  msg.className = "";

}