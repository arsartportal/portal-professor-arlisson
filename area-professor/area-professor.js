// ===============================
// ÁREA DO PROFESSOR
// ===============================

console.log("Área do Professor carregada com sucesso!");

// -------------------------------
// EFEITO DE CLIQUE NOS CARDS
// -------------------------------

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

  card.addEventListener("click", () => {

    const titulo = card.querySelector("h3").textContent;

    console.log(`Abrindo: ${titulo}`);

    // EXEMPLOS FUTUROS
    // Você pode trocar por:
    // window.location.href = "pagina.html";

    switch (titulo) {

      case "Cadastrar Alunos":
    window.location.href = "/cadastraralunos/cadastrar-alunosv2.html";
    break;

      case "Patch Notes":
        alert("Abrir Patch Notes");
        break;

      case "Avisos":
        alert("Abrir painel de avisos");
        break;

      case "Ranking":
      window.location.href = "./ranking-professor/ranking-professor.html";
        break;

      case "Controle de Aulas":
        alert("Abrir controle de aulas");
        break;

      case "Pesquisas":
        alert("Abrir pesquisas & curiosidades");
        break;

      default:
        alert("Página em desenvolvimento");
    }

  });

});

// -------------------------------
// ANIMAÇÃO SUAVE DOS CARDS
// -------------------------------

window.addEventListener("load", () => {

  cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {

      card.style.transition = "0.5s ease";

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

    }, index * 100);

  });

});

// -------------------------------
// BUSCA
// -------------------------------

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", () => {

  const value = searchInput.value.toLowerCase();

  cards.forEach((card) => {

    const titulo = card.querySelector("h3")
      .textContent
      .toLowerCase();

    if (titulo.includes(value)) {

      card.style.display = "flex";

    } else {

      card.style.display = "none";

    }

  });

});

// -------------------------------
// MENU SIDEBAR
// -------------------------------

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {

  item.addEventListener("click", () => {

    menuItems.forEach((menu) => {
      menu.classList.remove("active");
    });

    item.classList.add("active");

  });

});

// -------------------------------
// BOTÃO VER NOVIDADES
// -------------------------------

const novidadesBtn = document.querySelector(".bottom-tip button");

novidadesBtn.addEventListener("click", () => {

  alert("Em breve: painel de novidades do portal!");

});

// -------------------------------
// RELÓGIO DINÂMICO (OPCIONAL)
// -------------------------------

function saudacaoDinamica() {

  const titulo = document.querySelector(".topbar h1");

  const hora = new Date().getHours();

  let saudacao = "Olá";

  if (hora >= 5 && hora < 12) {
    saudacao = "Bom dia";
  }

  else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde";
  }

  else {
    saudacao = "Boa noite";
  }

  titulo.innerHTML = `${saudacao}, Professor! 👋`;

}

saudacaoDinamica();