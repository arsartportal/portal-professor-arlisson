// ===============================
// UI do Checkpoint – Cinemática
// ===============================

// Botão de finalizar
const btnFinalizar = document.getElementById("finalizarCheckpoint");

// Função que coleta as respostas do aluno
function coletarRespostas() {
  const respostas = [];

  checkpointCinematica.questoes.forEach((_, index) => {
    const marcada = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    // Se não marcou nada, salva -1
    respostas.push(marcada ? parseInt(marcada.value) : -1);
  });

  return respostas;
}

// Evento do botão
btnFinalizar.addEventListener("click", () => {
  const respostasAluno = coletarRespostas();

  // Corrige usando a função global
  const resultado = corrigirCheckpoint(
    checkpointCinematica,
    respostasAluno
  );

  // Feedback ao aluno
  if (resultado.aprovado) {
    adicionarXP(resultado.xp); // função da gamificação
    liberarProximoCard();      // função do seu fluxo
    mostrarFeedback(
      `✅ Checkpoint concluído! +${resultado.xp} XP`
    );
  } else {
    mostrarFeedback(
      "❌ Você não atingiu o mínimo de acertos. Revise o conteúdo e tente novamente."
    );
  }
});
