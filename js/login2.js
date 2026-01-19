/* =====================================================
   LOGIN2.JS — PORTAL DO PROFESSOR ARLISSON
   -----------------------------------------------------
   Este arquivo é responsável APENAS por:
   ✔ autenticar o usuário no Firebase
   ✔ criar a sessão
   ✔ redirecionar para a área interna

   Ele NÃO decide:
   ✖ se é aluno ou professor
   ✖ o que aparece no portal
===================================================== */

/* -----------------------------------------------------
   IMPORTA OS MÓDULOS NECESSÁRIOS DO FIREBASE
----------------------------------------------------- */

// Módulos de autenticação
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Importa a configuração do Firebase (app)
import { app } from "./firebase.js";
// 🔥 IMPORT DO XP Imediato
import { adicionarXPImediato } from "./xp.js";


/* -----------------------------------------------------
   INICIALIZA O AUTH
----------------------------------------------------- */
const auth = getAuth(app);

/* -----------------------------------------------------
   FUNÇÃO DE LOGIN
   ----------------------------------------------------
   Esta função é chamada pelo botão:
   <button onclick="login()">
----------------------------------------------------- */
window.login = async function () {

  /* Captura os valores digitados no HTML */
  const usuario = document.getElementById("usuario").value.trim();
  const senha   = document.getElementById("senha").value;
  const erro    = document.getElementById("erro");

  // Limpa mensagem de erro anterior
  erro.innerText = "";

  /* Validação básica */
  if (!usuario || !senha) {
    erro.innerText = "Informe usuário e senha.";
    return;
  }

  /* ---------------------------------------------------
     CONVERSÃO DIDÁTICA:
     O aluno digita:   joao
     O sistema usa:    joao@exatas.site

     Firebase só aceita login com e-mail + senha
  --------------------------------------------------- */
  const email = `${usuario}@exatas.site`;

  try {
    /* -------------------------------------------------
       AUTENTICA NO FIREBASE
       Se usuário e senha estiverem corretos:
       ✔ retorna o usuário
       ✔ retorna o UID (identidade única)
    ------------------------------------------------- */
    
        const cred = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    // XP diário por login (modo imediato)
    await adicionarXPImediato(10, "login"); 

    
    /* -------------------------------------------------
       CRIA A SESSÃO LOCAL
       O UID identifica o usuário logado
    ------------------------------------------------- */
    localStorage.setItem("uid", cred.user.uid);

    /* -------------------------------------------------
       REDIRECIONA PARA O PORTAL
       A partir daqui, auth-guard.js assume o controle
    ------------------------------------------------- */
    window.location.href = "home.html";

  } catch (e) {
    /* -------------------------------------------------
       TRATAMENTO DE ERROS MAIS COMUNS
    ------------------------------------------------- */
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
