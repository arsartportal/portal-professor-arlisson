/* =====================================================
   CINEMATICA-UI.JS
   -----------------------------------------------------
   Responsabilidade:
   - Validar checkpoint da Cinemática
   - Registrar conclusão local
   - Redirecionar para Física
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const botao = document.getElementById("finalizarCheckpoint");
  if (!botao) return;

  botao.addEventListener("click", () => {

    const respostasCorretas = ["1", "1", "2"];

    const respostasAluno = [
      document.querySelector('input[name="q0"]:checked')?.value,
      document.querySelector('input[name="q1"]:checked')?.value,
      document.querySelector('input[name="q2"]:checked')?.value
    ];

    if (respostasAluno.includes(undefined)) {
      alert("Responda todas as questões antes de finalizar.");
      return;
    }

    let acertos = 0;
    respostasAluno.forEach((r, i) => {
      if (r === respostasCorretas[i]) acertos++;
    });

    if (acertos < 2) {
      alert(`Você acertou ${acertos}/3. Revise o conteúdo.`);
      return;
    }

    alert("Checkpoint concluído! Você será redirecionado.");

    /* =====================================
       REGISTRA EVENTO PARA A PÁGINA FÍSICA
    ===================================== */
    localStorage.setItem(
      "checkpointConcluido",
      JSON.stringify({
        trilha: "cinematica",
        xp: 50,
        timestamp: Date.now()
      })
    );

    /* =====================================
       REDIRECIONA
    ===================================== */
    window.location.href = "../fisica.html";

  });

});
