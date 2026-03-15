async function carregarHeader() {
  const container = document.getElementById("header-container");
  if (!container) return;

  try {
    const resposta = await fetch("./components/header.html");
    const html = await resposta.text();
    container.innerHTML = html;

    inicializarHeader();
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

function inicializarHeader() {
  const btnTema = document.getElementById("toggle-tema");
  const btnSair = document.getElementById("btn-sair");

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const temaAtual = document.body.getAttribute("data-theme") || "light";
      const novoTema = temaAtual === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", novoTema);
    });
  }

  if (btnSair) {
    btnSair.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
}

carregarHeader();