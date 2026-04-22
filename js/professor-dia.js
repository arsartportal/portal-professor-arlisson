// ===============================
// 👥 DADOS (depois você pode puxar do Firebase)
// ===============================
let alunos = [
  "João", "Maria", "Pedro", "Ana",
  "Lucas", "Carla", "Bruno", "Julia"
];

// ===============================
// 👥 GERAR GRUPOS INTELIGENTES
// ===============================
function criarGrupos(tamanho = 3) {
  const lista = document.getElementById("listaGrupos");
  lista.innerHTML = "";

  // embaralhar alunos
  const embaralhados = [...alunos].sort(() => Math.random() - 0.5);

  for (let i = 0; i < embaralhados.length; i += tamanho) {
    const grupo = embaralhados.slice(i, i + tamanho);

    const li = document.createElement("li");
    li.className = "grupo-item";

    li.innerHTML = `
      <strong>Grupo ${Math.floor(i / tamanho) + 1}</strong><br>
      ${grupo.join(" • ")}
    `;

    lista.appendChild(li);
  }
}

// ===============================
// ⏱️ TIMER PREMIUM
// ===============================
let intervalo;
let tempoRestante = 0;

function iniciarTimer(minutos) {
  clearInterval(intervalo);
  tempoRestante = minutos * 60;

  atualizarTimer();

  intervalo = setInterval(() => {
    tempoRestante--;

    atualizarTimer();

    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      finalizarTimer();
    }
  }, 1000);
}

function atualizarTimer() {
  const m = Math.floor(tempoRestante / 60);
  const s = tempoRestante % 60;

  const display = document.getElementById("timer");

  display.textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // efeito visual quando está acabando
  if (tempoRestante <= 60) {
    display.style.color = "#eb3b5a";
    display.style.transform = "scale(1.1)";
  } else {
    display.style.color = "#000";
    display.style.transform = "scale(1)";
  }
}

function finalizarTimer() {
  const display = document.getElementById("timer");

  display.textContent = "⏰ Tempo encerrado!";
  display.style.color = "#eb3b5a";

  // alerta suave
  alert("Tempo encerrado! Hora de apresentar 🚀");
}

// ===============================
// 📝 AVALIAÇÃO INTELIGENTE
// ===============================
function calcularNota() {
  const exp = Number(document.getElementById("exp").value) || 0;
  const cla = Number(document.getElementById("cla").value) || 0;
  const cri = Number(document.getElementById("cri").value) || 0;
  const par = Number(document.getElementById("par").value) || 0;

  const total = exp + cla + cri + par;

  const notaEl = document.getElementById("nota");

  notaEl.innerHTML = `
    Nota final: <strong>${total}/10</strong>
  `;

  // feedback visual
  if (total >= 8) {
    notaEl.style.color = "#20bf6b";
  } else if (total >= 5) {
    notaEl.style.color = "#f7b731";
  } else {
    notaEl.style.color = "#eb3b5a";
  }
}

// ===============================
// 🎯 EXTRA (UX)
// ===============================

// Enter calcula nota
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calcularNota();
});