// ========================================
// MAPAS MENTAIS
// ========================================

const searchInput = document.querySelector(".search-box input");

const filters = document.querySelectorAll(".filter");

const mapCards = document.querySelectorAll(".map-card");

// ========================================
// FILTROS
// ========================================

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    // REMOVE ACTIVE
    filters.forEach(btn => {
      btn.classList.remove("active");
    });

    // ADICIONA ACTIVE
    filter.classList.add("active");

    const filterText =
      filter.textContent.toLowerCase();

    mapCards.forEach(card => {

      const cardText =
        card.textContent.toLowerCase();

      if (
        filterText === "todos" ||
        cardText.includes(filterText)
      ) {

        card.style.display = "flex";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);

      } else {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {
          card.style.display = "none";
        }, 200);

      }

    });

  });

});

// ========================================
// PESQUISA
// ========================================

searchInput.addEventListener("input", (e) => {

  const value =
    e.target.value.toLowerCase();

  mapCards.forEach(card => {

    const content =
      card.textContent.toLowerCase();

    if (content.includes(value)) {

      card.style.display = "flex";

    } else {

      card.style.display = "none";

    }

  });

});

// ========================================
// ANIMAÇÃO DE ENTRADA
// ========================================

window.addEventListener("load", () => {

  mapCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";

    setTimeout(() => {

      card.style.transition =
        "0.5s ease";

      card.style.opacity = "1";
      card.style.transform =
        "translateY(0)";

    }, index * 120);

  });

});

// ========================================
// BOTÕES ABRIR MAPA
// ========================================

const openButtons =
  document.querySelectorAll(".open-btn");

openButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".map-card");

    const title =
      card.querySelector("h3").textContent;

    console.log(
      `Abrindo mapa mental: ${title}`
    );

    // FUTURO:
    // window.location.href =
    // `/mapas/${slug}.html`;

  });

});

// ========================================
// EFEITO HOVER DINÂMICO
// ========================================

mapCards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    card.style.background =
      `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(79, 124, 255, 0.08),
        white 45%
      )
      `;

  });

  card.addEventListener("mouseleave", () => {

    card.style.background = "white";

  });

});

// ========================================
// CONTADOR ANIMADO HERO
// ========================================

const heroNumbers =
  document.querySelectorAll(".hero-stat h3");

heroNumbers.forEach(number => {

  const originalText =
    number.textContent;

  const finalValue =
    parseInt(originalText.replace(/\D/g, ""));

  if (isNaN(finalValue)) return;

  let start = 0;

  const duration = 1200;

  const increment =
    finalValue / (duration / 16);

  const counter = setInterval(() => {

    start += increment;

    if (start >= finalValue) {

      number.textContent = originalText;

      clearInterval(counter);

    } else {

      if (originalText.includes("k")) {

        number.textContent =
          `${(start / 1000).toFixed(1)}k`;

      } else {

        number.textContent =
          Math.floor(start);

      }

    }

  }, 16);

});

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll("a").forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const href =
      this.getAttribute("href");

    if (
      href &&
      href.startsWith("#")
    ) {

      e.preventDefault();

      const target =
        document.querySelector(href);

      if (target) {

        target.scrollIntoView({
          behavior: "smooth"
        });

      }

    }

  });

});

// ========================================
// CONSOLE
// ========================================

console.log(
  "%c🧠 Biblioteca de Mapas Mentais carregada!",
  "color:#4f7cff; font-size:14px; font-weight:bold;"
);