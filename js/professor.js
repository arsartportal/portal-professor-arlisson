/* =========================================================
   ÁREA DO PROFESSOR – CONTROLE DE ACESSO
   ---------------------------------------------------------
   ✔ Verifica se o usuário está autenticado
   ✔ Verifica se o usuário é PROFESSOR
   ✔ Mostra ou bloqueia o painel corretamente
   ✔ Evita redirecionamentos indevidos
   ✔ Arquitetura limpa (login ≠ autorização)
   ========================================================= */


/* =========================================================
   IMPORTAÇÕES DO FIREBASE
   ---------------------------------------------------------
   - auth → autenticação
   - db   → Firestore
   ========================================================= */

import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


/* =========================================================
   ELEMENTOS DA INTERFACE
   ---------------------------------------------------------
   - painelProfessor → conteúdo real do professor
   - acessoNegado    → aviso de acesso restrito
   ========================================================= */

const painelProfessor = document.getElementById("painel-professor");
const acessoNegado = document.getElementById("acesso-negado");


/* =========================================================
   FUNÇÃO PRINCIPAL DE PROTEÇÃO DA PÁGINA
   ---------------------------------------------------------
   Esta função roda automaticamente ao carregar a página
   ========================================================= */

onAuthStateChanged(auth, async (user) => {

  /* -----------------------------------------
     1️⃣ Usuário NÃO está logado
     ----------------------------------------- */
  if (!user) {
    console.warn("Usuário não autenticado. Redirecionando...");
    window.location.href = "index.html";
    return;
  }


  /* -----------------------------------------
     2️⃣ Busca dados do usuário no Firestore
     ----------------------------------------- */
  try {

    // Referência do documento do usuário
    const refUsuario = doc(db, "usuarios", user.uid);

    // Busca os dados
    const snapUsuario = await getDoc(refUsuario);


    /* -----------------------------------------
       Documento não existe
       ----------------------------------------- */
    if (!snapUsuario.exists()) {
      console.error("Documento do usuário não encontrado.");
      window.location.href = "index.html";
      return;
    }


    /* -----------------------------------------
       3️⃣ Verificação de papel (role)
       ----------------------------------------- */
    const dadosUsuario = snapUsuario.data();

    /*
      ⚠️ IMPORTANTE:
      O valor deve ser EXATAMENTE:
      role: "professor"
      (case-sensitive)
    */
    if (dadosUsuario.role !== "professor") {
      console.warn("Usuário não é professor.");
      window.location.href = "index.html";
      return;
    }


    /* -----------------------------------------
       4️⃣ Acesso autorizado
       ----------------------------------------- */
    console.log("Professor autenticado:", user.email);

    // Mostra o painel do professor
    painelProfessor.style.display = "block";

    // Esconde aviso de acesso restrito
    acessoNegado.style.display = "none";


  } catch (erro) {

    /* -----------------------------------------
       Erro inesperado
       ----------------------------------------- */
    console.error("Erro ao verificar acesso do professor:", erro);
    window.location.href = "index.html";

  }

});
