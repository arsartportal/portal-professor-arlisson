/* =====================================================
   INDEX.JS — PORTAL DO PROFESSOR ARLISSON
   Login com Firebase + UX PREMIUM (VERSÃO FINAL)
===================================================== */

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { app } from "./firebase.js";

// =============================
// 🔥 INIT FIREBASE
// =============================
const auth = getAuth(app);
const db = getFirestore(app);

// =============================
// 🎯 ELEMENTOS
// =============================
const form = document.getElementById("formLogin");
const erro = document.getElementById("erro");
const btn  = document.getElementById("btnLogin");

// =============================
// ✨ ESTADO INICIAL
// =============================
erro.innerText = "";

// =============================
// 🚀 EVENTO DE LOGIN
// =============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim().toLowerCase();
  const senha   = document.getElementById("senha").value;

  erro.innerText = "";

  if (!usuario || !senha) {
    mostrarErro("Informe usuário e senha.");
    return;
  }

  // 🔥 monta email padrão do sistema
  const email = `${usuario}@exatas.site`;

  try {
    setLoading(true);

    const cred = await signInWithEmailAndPassword(auth, email, senha);

    // 🔥 atualiza último acesso
    await updateDoc(doc(db, "usuarios", cred.user.uid), {
      ultimoAcesso: serverTimestamp()
    });

    // 💾 salva sessão local
    localStorage.setItem("uid", cred.user.uid);
    localStorage.setItem("usuario", usuario);

    sucessoLogin();

    // delay suave estilo app
    setTimeout(() => {
      window.location.href = "home.html";
    }, 600);

  } catch (e) {
    tratarErro(e);
    setLoading(false);
  }
});

/* =====================================================
   UX FUNCTIONS (NÍVEL APP)
===================================================== */

// 🔴 erro elegante
function mostrarErro(msg) {
  erro.innerText = msg;
  erro.style.opacity = 0;

  setTimeout(() => {
    erro.style.opacity = 1;
  }, 50);
}

// ⏳ loading bonito
function setLoading(estado) {
  if (estado) {
    btn.innerHTML = "Entrando...";
    btn.disabled = true;
    btn.style.opacity = 0.7;
  } else {
    btn.innerHTML = "<span>Entrar no Portal</span>";
    btn.disabled = false;
    btn.style.opacity = 1;
  }
}

// ✅ sucesso visual
function sucessoLogin() {
  btn.innerHTML = "✓ Acesso liberado";
  btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
}

// ❌ tratamento profissional (ATUALIZADO FIREBASE v12)
function tratarErro(e) {
  console.error("Erro no login:", e);

  // 🔐 erros agrupados (segurança + padrão moderno)
  const errosLogin = [
    "auth/invalid-credential",
    "auth/wrong-password",
    "auth/user-not-found"
  ];

  if (errosLogin.includes(e.code)) {
    mostrarErro("Usuário ou senha incorretos.");
    return;
  }

  const erros = {
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos.",
    "auth/invalid-email": "Usuário inválido.",
    "auth/network-request-failed": "Sem conexão com a internet."
  };

  mostrarErro(erros[e.code] || "Erro ao acessar o portal.");
}