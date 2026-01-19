/* =========================================================
   SISTEMA DE PATENTES (RANKS ESTILO DOTA 2)
   ---------------------------------------------------------
   - Cada nível do aluno corresponde a UMA imagem
   - NÃO exibimos nome do rank, apenas a imagem
   - Total: 41 níveis (0 a 40)
   ========================================================= */

// Lista ordenada de imagens por nível
// A posição no array = nível do aluno
const ranks = [
  "seasonalRank0-0.png", // nível 0

  // Rank 1 (níveis 1 a 5)
  "seasonalRank1-1.png",
  "seasonalRank1-2.png",
  "seasonalRank1-3.png",
  "seasonalRank1-4.png",
  "seasonalRank1-5.png",

  // Rank 2 (6 a 10)
  "seasonalRank2-1.png",
  "seasonalRank2-2.png",
  "seasonalRank2-3.png",
  "seasonalRank2-4.png",
  "seasonalRank2-5.png",

  // Rank 3 (11 a 15)
  "seasonalRank3-1.png",
  "seasonalRank3-2.png",
  "seasonalRank3-3.png",
  "seasonalRank3-4.png",
  "seasonalRank3-5.png",

  // Rank 4 (16 a 20)
  "seasonalRank4-1.png",
  "seasonalRank4-2.png",
  "seasonalRank4-3.png",
  "seasonalRank4-4.png",
  "seasonalRank4-5.png",

  // Rank 5 (21 a 25)
  "seasonalRank5-1.png",
  "seasonalRank5-2.png",
  "seasonalRank5-3.png",
  "seasonalRank5-4.png",
  "seasonalRank5-5.png",

  // Rank 6 (26 a 30)
  "seasonalRank6-1.png",
  "seasonalRank6-2.png",
  "seasonalRank6-3.png",
  "seasonalRank6-4.png",
  "seasonalRank6-5.png",

  // Rank 7 (31 a 35)
  "seasonalRank7-1.png",
  "seasonalRank7-2.png",
  "seasonalRank7-3.png",
  "seasonalRank7-4.png",
  "seasonalRank7-5.png",

  // TOP (36 a 40)
  "seasonalRankTop0.png",
  "seasonalRankTop1.png",
  "seasonalRankTop2.png",
  "seasonalRankTop3.png",
  "seasonalRankTop4.png"
];

/* =========================================================
   FUNÇÃO PRINCIPAL
   ---------------------------------------------------------
   Recebe o nível do usuário e devolve:
   - o caminho correto da imagem da patente
   ========================================================= */
export function obterPatentePorNivel(nivel) {

  // Garante que o nível não seja negativo
  const nivelSeguro = Math.max(0, nivel);

  // Se passar do último nível, fixa no último rank
  const indice = Math.min(nivelSeguro, ranks.length - 1);

  return {
    imagem: `/assets/ranks/${ranks[indice]}`
  };
}
