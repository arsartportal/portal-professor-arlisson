document.addEventListener("DOMContentLoaded", () => {

  const perfil = localStorage.getItem("perfil");
  const logado = localStorage.getItem("logado");

  const negado = document.getElementById("acesso-negado");
  const painel = document.getElementById("painel-professor");

  if (logado !== "true") {
    window.location.href = "index.html";
    return;
  }

  if (perfil === "prof") {
    if (negado) negado.style.display = "none";
    if (painel) painel.style.display = "block";
  } else {
    if (negado) negado.style.display = "block";
    if (painel) painel.style.display = "none";
  }

});
