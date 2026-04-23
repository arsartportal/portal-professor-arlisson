/* =====================================================
   INDEX.JS — PORTAL DO PROFESSOR ARLISSON
   Login com Firebase + UX PREMIUM + LGPD + FEEDBACK VISUAL
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
const checkbox = document.getElementById("aceite-termos");
const termosBox = document.querySelector(".termos");

// =============================
// ✨ ESTADO INICIAL
// =============================
erro.innerText = "";

// =============================
// 🎯 EVENTO CHECKBOX (UX)
// =============================
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    termosBox.classList.remove("invalido");
    termosBox.classList.add("valido");
  } else {
    termosBox.classList.remove("valido");
  }
});

// =============================
// 🚀 EVENTO DE LOGIN
// =============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim().toLowerCase();
  const senha   = document.getElementById("senha").value;

  erro.innerText = "";

  // =====================================================
  // 🔒 VALIDAÇÃO LGPD (COM HIGHLIGHT)
  // =====================================================
  if (!checkbox.checked) {
    mostrarErro("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");

    termosBox.classList.add("invalido");
    termosBox.classList.remove("valido");

    return;
  }

  // =====================================================
  // 🔐 VALIDAÇÃO BÁSICA
  // =====================================================
  if (!usuario || !senha) {
    mostrarErro("Informe usuário e senha.");
    return;
  }

  const email = `${usuario}@exatas.site`;

  try {
    setLoading(true);

    const cred = await signInWithEmailAndPassword(auth, email, senha);

    // =====================================================
    // 🧠 ATUALIZA DADOS DO USUÁRIO
    // =====================================================
    await updateDoc(doc(db, "usuarios", cred.user.uid), {
      ultimoAcesso: serverTimestamp(),

      // 🔥 LGPD
      aceitouTermos: true,
      dataAceiteTermos: serverTimestamp()
    });

    // =====================================================
    // 💾 SESSÃO LOCAL
    // =====================================================
    localStorage.setItem("uid", cred.user.uid);
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("aceitouTermos", "true");

    sucessoLogin();

    setTimeout(() => {
      window.location.href = "home.html";
    }, 600);

  } catch (e) {
    tratarErro(e);
    setLoading(false);
  }
});

/* =====================================================
   UX FUNCTIONS
===================================================== */

// 🔴 erro elegante
function mostrarErro(msg) {
  erro.innerText = msg;
  erro.style.opacity = 0;

  setTimeout(() => {
    erro.style.opacity = 1;
  }, 50);
}

// ⏳ loading
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

// ✅ sucesso
function sucessoLogin() {
  btn.innerHTML = "✓ Acesso liberado";
  btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
}

// ❌ tratamento erro
function tratarErro(e) {
  console.error("Erro no login:", e);

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