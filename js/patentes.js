/* =========================================================
   SISTEMA DE PATENTES (RANKS – ESTILO DOTA 2)
========================================================= */

const ranks = [
  "SeasonalRank0-0.png",

  "SeasonalRank1-1.png",
  "SeasonalRank1-2.png",
  "SeasonalRank1-3.png",
  "SeasonalRank1-4.png",
  "SeasonalRank1-5.png",

  "SeasonalRank2-1.png",
  "SeasonalRank2-2.png",
  "SeasonalRank2-3.png",
  "SeasonalRank2-4.png",
  "SeasonalRank2-5.png",

  "SeasonalRank3-1.png",
  "SeasonalRank3-2.png",
  "SeasonalRank3-3.png",
  "SeasonalRank3-4.png",
  "SeasonalRank3-5.png",

  "SeasonalRank4-1.png",
  "SeasonalRank4-2.png",
  "SeasonalRank4-3.png",
  "SeasonalRank4-4.png",
  "SeasonalRank4-5.png",

  "SeasonalRank5-1.png",
  "SeasonalRank5-2.png",
  "SeasonalRank5-3.png",
  "SeasonalRank5-4.png",
  "SeasonalRank5-5.png",

  "SeasonalRank6-1.png",
  "SeasonalRank6-2.png",
  "SeasonalRank6-3.png",
  "SeasonalRank6-4.png",
  "SeasonalRank6-5.png",

  "SeasonalRank7-1.png",
  "SeasonalRank7-2.png",
  "SeasonalRank7-3.png",
  "SeasonalRank7-4.png",
  "SeasonalRank7-5.png",

  "SeasonalRankTop0.png",
  "SeasonalRankTop1.png",
  "SeasonalRankTop2.png",
  "SeasonalRankTop3.png",
  "SeasonalRankTop4.png"
];

/* =========================================================
   OBTÉM IMAGEM SEGURA
========================================================= */

export function obterPatentePorNivel(nivel) {

  const nivelSeguro = Math.max(0, nivel);
  const indice = Math.min(nivelSeguro, ranks.length - 1);

  return {
    imagem: `/assets/ranks/${ranks[indice]}`
  };
}

/* =========================================================
   CONFETTI SEGURO
========================================================= */

function soltarConfetes() {
  if (typeof confetti !== "function") return;

  confetti({
    particleCount: 160,
    spread: 90,
    origin: { y: 0.6 }
  });
}

/* =========================================================
   ANIMAÇÃO DE MUDANÇA DE PATENTE
========================================================= */

export function mostrarAnimacaoMudancaPatente(nivelAntigo, nivelNovo) {

  if (nivelNovo <= nivelAntigo) return;

  const overlay = document.getElementById("patente-overlay");
  const card = document.querySelector(".patente-card");
  const imgAntiga = document.getElementById("patente-antiga");
  const imgNova = document.getElementById("patente-nova");

  if (!overlay || !card || !imgAntiga || !imgNova) return;

  const patenteAntiga = obterPatentePorNivel(nivelAntigo);
  const patenteNova = obterPatentePorNivel(nivelNovo);

  // reset estado
  card.classList.remove("animar");
  overlay.classList.remove("hidden");

  imgAntiga.src = patenteAntiga.imagem;
  imgNova.src = patenteNova.imagem;

  // Se a imagem já estiver em cache, onload pode não disparar
  const iniciarAnimacao = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add("animar");
        soltarConfetes();
      });
    });
  };

  if (imgNova.complete) {
    iniciarAnimacao();
  } else {
    imgNova.onload = iniciarAnimacao;
    imgNova.onerror = iniciarAnimacao; // mesmo se falhar, não trava
  }
}

/* =========================================================
   FECHAR OVERLAY
========================================================= */

export function fecharPatente(destino = null) {

  const overlay = document.getElementById("patente-overlay");
  if (overlay) overlay.classList.add("hidden");

  if (destino) {
    window.location.href = destino;
  }
}

// disponível para onclick HTML
window.fecharPatente = fecharPatente;