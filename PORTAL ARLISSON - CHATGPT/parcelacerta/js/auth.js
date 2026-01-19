/* =====================================================
   AUTH.JS — CONTROLE DE LOGIN
   ParcelaCerta
===================================================== */

// 🔐 Chave de sessão
const SESSION_KEY = 'parcelacerta_usuario';

/* ===============================
   LOGIN
================================ */
document.addEventListener('DOMContentLoaded', () => {

  const btnLogin = document.getElementById('btnLogin');

  if (btnLogin) {
    btnLogin.addEventListener('click', login);
  }

  protegerPagina();
});

/* ===============================
   FUNÇÃO LOGIN (SIMULADO)
================================ */
function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('Preencha e-mail e senha.');
    return;
  }

  // 👉 Login fake (por enquanto)
  const usuario = {
    email,
    loginEm: new Date().toISOString()
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));

  window.location.href = 'dashboard.html';
}

/* ===============================
   LOGOUT
================================ */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

/* ===============================
   PROTEÇÃO DE PÁGINA
================================ */
function protegerPagina() {
  const paginaPublica = window.location.pathname.endsWith('index.html');

  if (paginaPublica) return;

  const usuario = localStorage.getItem(SESSION_KEY);

  if (!usuario) {
    window.location.href = 'index.html';
  }
}

/* ===============================
   UTIL
================================ */
export function usuarioLogado() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}
