/* =================================================
   TEMA.JS — TOGGLE DARK / LIGHT
   ================================================= */

const btnTema = document.getElementById("toggle-tema");

/*
  Só adiciona o evento SE o botão existir.
  Isso permite usar o mesmo tema.js
  em TODAS as páginas do portal.
*/
if (btnTema) {
  btnTema.addEventListener("click", () => {

    const temaAtual =
      document.body.getAttribute("data-theme") || "light";

    const novoTema =
      temaAtual === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", novoTema);
  });
}
