/* =====================================================
   AUTH-GUARD.JS (VERSÃO CORRETA)
   -----------------------------------------------------
   Protege páginas internas SEM causar loop de redirect
===================================================== */

import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

/*
  IMPORTANTE:
  - onAuthStateChanged é ASSÍNCRONO
  - o Firebase precisa de alguns ms para restaurar a sessão
  - só decidimos depois que ele responder
*/

onAuthStateChanged(auth, (user) => {

  // 🔓 Usuário autenticado → fica na página
  if (user) {
    return;
  }

  // 🔒 Usuário NÃO autenticado → volta para login
  window.location.replace("index.html");

});
