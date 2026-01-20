// js/checkpoints.js

function corrigirCheckpoint(checkpoint, respostasAluno) {
  let acertos = 0;

  checkpoint.questoes.forEach((q, i) => {
    if (respostasAluno[i] === q.correta) {
      acertos++;
    }
  });

  return {
    aprovado: acertos >= checkpoint.minimoAcertos,
    acertos,
    xp: acertos >= checkpoint.minimoAcertos ? checkpoint.xpRecompensa : 0
  };
}
