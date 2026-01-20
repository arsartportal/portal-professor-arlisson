/* =========================================================
   EFEITO DE LEVEL UP – PORTAL DO PROFESSOR ARLISSON
   ---------------------------------------------------------
   Fluxo:
   1) Vibração por 1 segundo
   2) Próxima patente cai de cima
   3) Patente antiga é empurrada para baixo
   4) Nova patente assume o lugar
   ========================================================= */

function efeitoLevelUp(nivelAtual, nivelNovo) {

  const container = document.querySelector(".rank-container");
  const rankAtual = document.getElementById("rankAtual");

  if (!container || !rankAtual) return;

  // 1️⃣ Vibração
  rankAtual.classList.add("vibrando");

  setTimeout(() => {

    rankAtual.classList.remove("vibrando");
    rankAtual.classList.add("rank-caindo");

    // 2️⃣ Cria a nova patente
    const novoRank = document.createElement("img");
    novoRank.src = `img/ranks/${ranks[nivelNovo]}`;
    novoRank.classList.add("rank-next");

    container.appendChild(novoRank);

    // 3️⃣ Finaliza animação
    setTimeout(() => {
      container.innerHTML = "";
      novoRank.id = "rankAtual";
      novoRank.classList.remove("rank-next");
      container.appendChild(novoRank);
    }, 600);

  }, 1000);
}
