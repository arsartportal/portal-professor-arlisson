/* =========================================================
   SISTEMA DE PATENTES (RANKS – ESTILO DOTA 2)
   ---------------------------------------------------------
   ✔ Cada nível do aluno corresponde a UMA imagem
   ✔ Não exibimos nome do rank, apenas a imagem
   ✔ Total: 41 níveis (0 a 40)
   ✔ Compatível com Cloudflare Pages (Linux / case-sensitive)
   ========================================================= */


/* =========================================================
   LISTA DE IMAGENS DAS PATENTES
   ---------------------------------------------------------
   - A posição no array = nível do aluno
   - O nome do arquivo DEVE bater exatamente com o GitHub
   - Atenção a MAIÚSCULAS e minúsculas (case-sensitive)
   ========================================================= */

const ranks = [

  /* =========================
     NÍVEL 0 (INICIANTE)
     ========================= */
  "SeasonalRank0-0.png",


  /* =========================
     RANK 1 (níveis 1 a 5)
     ========================= */
  "SeasonalRank1-1.png", // nível 1
  "SeasonalRank1-2.png", // nível 2
  "SeasonalRank1-3.png", // nível 3
  "SeasonalRank1-4.png", // nível 4
  "SeasonalRank1-5.png", // nível 5


  /* =========================
     RANK 2 (níveis 6 a 10)
     ========================= */
  "SeasonalRank2-1.png", // nível 6
  "SeasonalRank2-2.png", // nível 7
  "SeasonalRank2-3.png", // nível 8
  "SeasonalRank2-4.png", // nível 9
  "SeasonalRank2-5.png", // nível 10


  /* =========================
     RANK 3 (níveis 11 a 15)
     ========================= */
  "SeasonalRank3-1.png", // nível 11
  "SeasonalRank3-2.png", // nível 12
  "SeasonalRank3-3.png", // nível 13
  "SeasonalRank3-4.png", // nível 14
  "SeasonalRank3-5.png", // nível 15


  /* =========================
     RANK 4 (níveis 16 a 20)
     ========================= */
  "SeasonalRank4-1.png", // nível 16
  "SeasonalRank4-2.png", // nível 17
  "SeasonalRank4-3.png", // nível 18
  "SeasonalRank4-4.png", // nível 19
  "SeasonalRank4-5.png", // nível 20


  /* =========================
     RANK 5 (níveis 21 a 25)
     ========================= */
  "SeasonalRank5-1.png", // nível 21
  "SeasonalRank5-2.png", // nível 22
  "SeasonalRank5-3.png", // nível 23
  "SeasonalRank5-4.png", // nível 24
  "SeasonalRank5-5.png", // nível 25


  /* =========================
     RANK 6 (níveis 26 a 30)
     ========================= */
  "SeasonalRank6-1.png", // nível 26
  "SeasonalRank6-2.png", // nível 27
  "SeasonalRank6-3.png", // nível 28
  "SeasonalRank6-4.png", // nível 29
  "SeasonalRank6-5.png", // nível 30


  /* =========================
     RANK 7 (níveis 31 a 35)
     ========================= */
  "SeasonalRank7-1.png", // nível 31
  "SeasonalRank7-2.png", // nível 32
  "SeasonalRank7-3.png", // nível 33
  "SeasonalRank7-4.png", // nível 34
  "SeasonalRank7-5.png", // nível 35


  /* =========================
     TOP RANK (níveis 36 a 40)
     ========================= */
  "SeasonalRankTop0.png", // nível 36
  "SeasonalRankTop1.png", // nível 37
  "SeasonalRankTop2.png", // nível 38
  "SeasonalRankTop3.png", // nível 39
  "SeasonalRankTop4.png"  // nível 40
];


/* =========================================================
   FUNÇÃO PRINCIPAL
   ---------------------------------------------------------
   Recebe o nível do usuário e devolve:
   ✔ Caminho ABSOLUTO da imagem da patente
   ✔ Sempre retorna um índice válido
   ✔ Nunca quebra o sistema
   ========================================================= */

export function obterPatentePorNivel(nivel) {

  /* -----------------------------------------
     Garante que o nível não seja negativo
     ----------------------------------------- */
  const nivelSeguro = Math.max(0, nivel);


  /* -----------------------------------------
     Impede ultrapassar o último rank
     ----------------------------------------- */
  const indice = Math.min(nivelSeguro, ranks.length - 1);


  /* -----------------------------------------
     Retorno padronizado
     - Caminho absoluto (começa com /)
     - Compatível com Cloudflare Pages
     ----------------------------------------- */
  return {
    imagem: `/assets/ranks/${ranks[indice]}`
  };
}
