/* =====================================================
   HEADER.JS
   Comportamentos globais do header
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. SISTEMA DE TEMA (DARK / LIGHT)
     =================================================== */

  const btnTema = document.getElementById("toggle-tema");
  const body = document.body;

  // Tema salvo (se existir)
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo) {
    body.setAttribute("data-theme", temaSalvo);
    atualizarIconeTema(temaSalvo);
  }

  // Clique no botão de tema
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const temaAtual =
        body.getAttribute("data-theme") || "light";

      const novoTema =
        temaAtual === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", novoTema);
      localStorage.setItem("tema", novoTema);

      atualizarIconeTema(novoTema);
    });
  }

  function atualizarIconeTema(tema) {
    if (!btnTema) return;
    btnTema.textContent = tema === "dark" ? "☀️" : "🌙";
  }

  /* ===================================================
     2. LOGOUT
     =================================================== */

  window.sair = function () {

    // Limpa dados locais
    localStorage.clear();

    // Logout Firebase (se existir)
    if (window.firebase && firebase.auth) {
      firebase.auth().signOut().finally(() => {
        window.location.href = "index.html";
      });
    } else {
      window.location.href = "index.html";
    }
  };

});
