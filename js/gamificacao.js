let xpAtual = parseInt(localStorage.getItem("xp")) || 0;

function adicionarXP(valor) {
  xpAtual += valor;
  localStorage.setItem("xp", xpAtual);
  atualizarHUD();
}

function atualizarHUD() {
  const xpEl = document.getElementById("xpValor");
  const nivelEl = document.getElementById("nivelValor");
  const patenteEl = document.getElementById("patenteImg");

  // Só atualiza se o HUD existir na página
  if (xpEl) xpEl.innerText = xpAtual;
  if (nivelEl) nivelEl.innerText = calcularNivel(xpAtual);
  if (patenteEl) patenteEl.src = obterImagemPatente();
}

function calcularNivel(xp) {
  return Math.floor(xp / 100);
}

function obterImagemPatente() {
  return "../assets/patentes/seasonalRank0-0.png"; // depois ajusta
}

function mostrarFeedback(msg) {
  alert(msg);
}

function liberarProximoCard() {
  console.log("Próximo card liberado");
}
