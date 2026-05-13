/* =====================================================
   AUTH-GUARD.JS (VERSÃO FINAL)
   -----------------------------------------------------
   ✔ Protege páginas privadas
   ✔ Evita loop de redirect
   ✔ Força troca de senha
   ✔ Migra usuários antigos
   ✔ Funciona em subpastas
   ✔ Firebase Auth + Firestore
===================================================== */

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  app,
  db
} from "./firebase.js";

/* =====================================================
AUTH
===================================================== */

const auth = getAuth(app);

/* =====================================================
PÁGINA ATUAL
===================================================== */

const paginaAtual =
  window.location.pathname
    .split("/")
    .pop();

/* =====================================================
ROTAS
===================================================== */

/* páginas públicas */

const paginasPublicas = [
  "",
  "/",
  "index.html",
  "login.html"
];

/* troca de senha */

const paginaTrocaSenha =
  "cadastraralunos/trocar-senha.html";

/* dashboard principal */

const paginaDashboard =
  "home.html";

/* =====================================================
DEBUG
===================================================== */

console.log(
  "Página atual:",
  paginaAtual
);

/* =====================================================
VERIFICA LOGIN
===================================================== */

onAuthStateChanged(
  auth,
  async (user) => {

  console.log(
    "Usuário auth:",
    user
  );

  /* =========================================
  NÃO LOGADO
  ========================================= */

  if (!user) {

    console.log(
      "Usuário não autenticado"
    );

    /* evita loop */

    if (
      !paginasPublicas.includes(
        paginaAtual
      )
    ) {

      window.location.href =
  "index.html";

    }

    return;

  }

  /* =========================================
  USUÁRIO LOGADO
  ========================================= */

  try {

    const ref = doc(
      db,
      "usuarios",
      user.uid
    );

    const snap =
      await getDoc(ref);

    /* =========================================
    USUÁRIO NÃO EXISTE
    ========================================= */

    if (!snap.exists()) {

  console.error(
    "Usuário não encontrado no Firestore"
  );

  try {

  await signOut(auth);

}
catch (e) {

  console.error(e);

}

localStorage.clear();
sessionStorage.clear();

/* força reload real */

window.location.href =
  "index.html";

return;

}

    let dados =
      snap.data();

    console.log(
      "Dados usuário:",
      dados
    );

    /* =========================================
    MIGRAÇÃO AUTOMÁTICA
    ========================================= */

    const updates = {};

    if (
      dados.senhaTemporaria === undefined
    ) {

      updates.senhaTemporaria = false;

    }

    if (
      dados.nivel === undefined
    ) {

      updates.nivel = 1;

    }

    if (
      dados.moedas === undefined
    ) {

      updates.moedas = 0;

    }

    if (
      dados.xp === undefined
    ) {

      updates.xp = 0;

    }

    if (
      dados.ativo === undefined
    ) {

      updates.ativo = true;

    }

    /* salva migração */

    if (
      Object.keys(updates).length > 0
    ) {

      await updateDoc(
        ref,
        updates
      );

      dados = {
        ...dados,
        ...updates
      };

      console.log(
        "Migração automática concluída ✔"
      );

    }

    /* =========================================
    CONTA DESATIVADA
    ========================================= */

    if (
      dados.ativo === false
    ) {

      alert(
        "Sua conta foi desativada."
      );

      await signOut(auth);

      window.location.href =
  "index.html";

      return;

    }

    /* =========================================
    SENHA TEMPORÁRIA
    ========================================= */

    if (
      dados.senhaTemporaria === true
    ) {

      console.log(
        "Usuário com senha temporária"
      );

      /* evita loop */

      if (
        paginaAtual ===
        "trocar-senha.html"
      ) {

        console.log(
          "Já está na página de troca"
        );

        return;

      }

      /* força troca */

      console.log(
        "Redirecionando..."
      );

      window.location.href =
  paginaTrocaSenha;

      return;

    }

    /* =========================================
    BLOQUEIA VOLTAR
    ========================================= */

    if (
      paginaAtual ===
      "trocar-senha.html"
    ) {

      window.location.href =
  paginaDashboard;

      return;

    }

    /* =========================================
    BLOQUEIA LOGIN
    ========================================= */

    if (
      paginasPublicas.includes(
        paginaAtual
      )
    ) {

      window.location.replace(
        paginaDashboard
      );

      return;

    }

    /* =========================================
    LIBERADO
    ========================================= */

    console.log(
      "Usuário autenticado ✔"
    );

  }

  catch (error) {

    console.error(
      "Erro no auth-guard:",
      error
    );

  }

});