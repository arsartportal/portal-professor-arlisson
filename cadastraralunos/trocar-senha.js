import { auth, db } from "../js/firebase.js";

import {
  updatePassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ELEMENTOS */
const form = document.getElementById("formTroca");
const msg = document.getElementById("msg");
const btn = document.getElementById("btnTrocar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nova = document.getElementById("novaSenha").value;
  const confirmar = document.getElementById("confirmarSenha").value;

  if (nova !== confirmar) {
    return mostrarMsg("As senhas não coincidem", "erro");
  }

  if (nova.length < 6) {
    return mostrarMsg("Senha deve ter no mínimo 6 caracteres", "erro");
  }

  const user = auth.currentUser;

  if (!user) {
    return mostrarMsg("Sessão inválida. Faça login novamente.", "erro");
  }

  /* LOADING */
  btn.querySelector(".text").style.display = "none";
  btn.querySelector(".loader").style.display = "block";

  try {

    /* ATUALIZA SENHA */
    await updatePassword(user, nova);

    /* ATUALIZA FIRESTORE */
    await updateDoc(doc(db, "usuarios", user.uid), {
      senhaTemporaria: false
    });

    mostrarMsg("Senha atualizada com sucesso! ✔", "sucesso");

    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 1200);

  } catch (error) {
    console.error(error);

    if (error.code === "auth/requires-recent-login") {
      mostrarMsg("Faça login novamente para continuar", "erro");
    } else {
      mostrarMsg("Erro ao atualizar senha", "erro");
    }
  }

  btn.querySelector(".text").style.display = "block";
  btn.querySelector(".loader").style.display = "none";
});

/* MSG */
function mostrarMsg(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;
}