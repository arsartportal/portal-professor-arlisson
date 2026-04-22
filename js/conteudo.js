let pos = 0;

function mover() {
  pos = 0;
  const carro = document.getElementById("carro");
  const intervalo = setInterval(() => {
    pos += 2;
    carro.style.left = pos + "px";
    if (pos > 800) clearInterval(intervalo);
  }, 30);
}

function responder(op) {
  const fb = document.getElementById("feedback1");

  if (op === 3) {
    fb.innerHTML = "✅ Correto! Depende do referencial.";
    fb.style.color = "lime";
  } else {
    fb.innerHTML = "❌ Pense no referencial.";
    fb.style.color = "red";
  }
}

function trajeto(tipo) {
  const box = document.getElementById("trajeto-box");
  box.innerHTML = "Trajetória " + tipo.toUpperCase();
}

function velocidade(v) {
  document.getElementById("velocidadeTxt").innerText =
    v + " m/s";
}

function acelerar() {
  document.getElementById("accTxt").innerText =
    "Velocidade aumentando → aceleração positiva";
}

function frear() {
  document.getElementById("accTxt").innerText =
    "Velocidade diminuindo → aceleração negativa";
}

function checkpoint(op) {
  const f = document.getElementById("final");

  if (op === 2) {
    f.innerHTML = "🏆 Checkpoint concluído! +100 XP";
    f.style.color = "gold";

    if (window.ganharXP) {
      ganharXP(100);
    }

    setTimeout(() => {
      window.location.href = "../fisica.html";
    }, 2500);

  } else {
    f.innerHTML = "❌ Tente novamente.";
    f.style.color = "red";
  }
}
