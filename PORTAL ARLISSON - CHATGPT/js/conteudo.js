document.addEventListener("DOMContentLoaded", () => {
  console.log("conteudos.js carregado");

  const turma = localStorage.getItem("turma");
  console.log("turma logada:", turma);

  document.querySelectorAll(".turma-conteudo").forEach(bloco => {
    console.log("bloco encontrado:", bloco.dataset.turma);

    if (bloco.dataset.turma !== turma) {
      bloco.style.display = "none";
    }
  });
});
