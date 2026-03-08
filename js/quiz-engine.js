import { registrarTentativaQuiz } from "./xp.js";

export function iniciarQuiz({
  atividade,
  respostas,
  totalQuestoes,
  botaoId = "botaoCorrigir",
  resultadoId = "resultado"
}) {

  const botao = document.getElementById(botaoId);
  const resultadoDiv = document.getElementById(resultadoId);

  /* carregar histórico ao abrir página */
  carregarResultadoAnterior();

  botao.onclick = async () => {

    let total = 0;

    for (let q in respostas) {

      let opcoes = document.querySelectorAll(`input[name="${q}"]`);
      let marcada = document.querySelector(`input[name="${q}"]:checked`);

      opcoes.forEach(opcao => {
        let label = opcao.parentElement;
        label.style.color = "#333";
        label.style.fontWeight = "normal";
      });

      if (marcada) {
        if (marcada.value === respostas[q]) {
          marcada.parentElement.style.color = "#1b5e20";
          marcada.parentElement.style.fontWeight = "bold";
          total++;
        } else {
          marcada.parentElement.style.color = "#c62828";
          marcada.parentElement.style.fontWeight = "bold";
        }
      }

    }

    try {

      const resultado = await registrarTentativaQuiz(
        atividade,
        total,
        totalQuestoes
      );

      if (resultado.bloqueado) {

        let html = "🚫 Você já utilizou as 3 tentativas permitidas.<br><br>";

        resultado.tentativas.forEach((nota, i) => {
          html += `Tentativa ${i+1}: ${nota}/${totalQuestoes}<br>`;
        });

        html += `<br>🏆 Melhor desempenho: ${resultado.melhor}/${totalQuestoes}`;
        html += `<br>⭐ XP total ganho: ${resultado.melhor * 10} XP`;

        resultadoDiv.innerHTML = html;

        botao.disabled = true;

        return;

      }

      let html = "<br><strong>📊 Desempenho:</strong><br>";

      resultado.tentativas.forEach((nota, i) => {
        html += `Tentativa ${i+1}: ${nota}/${totalQuestoes}<br>`;
      });

      html += `<br>🏆 Melhor desempenho: ${resultado.melhor}/${totalQuestoes}`;

      if (resultado.xpGanho > 0) {
        html += `<br>⭐ XP ganho nesta tentativa: ${resultado.xpGanho} XP`;
      }

      resultadoDiv.innerHTML = html;

    } catch (e) {
      console.error("Erro no quiz:", e);
    }

  };

  async function carregarResultadoAnterior() {

    try {

      const resultado = await registrarTentativaQuiz(
        atividade,
        null,
        totalQuestoes
      );

      if (!resultado || !resultado.tentativas || resultado.tentativas.length === 0) return;

      let html = "<strong>📊 Desempenho atual:</strong><br>";

      resultado.tentativas.forEach((nota, i) => {
        html += `Tentativa ${i+1}: ${nota}/${totalQuestoes}<br>`;
      });

      html += `<br>🏆 Melhor desempenho: ${resultado.melhor}/${totalQuestoes}`;
      html += `<br>⭐ XP total ganho: ${resultado.melhor * 10} XP`;

      if (resultado.tentativas.length >= 3) {
        html += "<br><br>🔒 Tentativas encerradas";
        botao.disabled = true;
      }

      resultadoDiv.innerHTML = html;

    } catch (e) {
      console.error("Erro ao carregar histórico:", e);
    }

  }

}