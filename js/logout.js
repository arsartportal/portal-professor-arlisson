/* =================================================
   LOGOUT.JS
   -------------------------------------------------
   Função global de logout do usuário
   Usada por TODAS as páginas do portal
================================================= */

export function sair() {

  // Limpa dados locais
  localStorage.clear();

  // Se houver Firebase Auth
  if (window.firebase && firebase.auth) {
    firebase.auth().signOut().finally(() => {
      window.location.href = "index.html";
    });
  } else {
    // Fallback simples
    window.location.href = "index.html";
  }
}
