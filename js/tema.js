/*
  CONTROLE DE TEMA
  ----------------
  Troca entre light e dark
  sem quebrar absolutamente nada,
  pois todo o CSS usa variáveis.
*/

const btnTheme = document.getElementById("toggleTheme");

btnTheme.addEventListener("click", () => {
  const atual = document.body.getAttribute("data-theme");
  document.body.setAttribute(
    "data-theme",
    atual === "dark" ? "light" : "dark"
  );
});
