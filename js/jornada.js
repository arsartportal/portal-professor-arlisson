// ================= CONFIG =================
const map = document.getElementById("map");
const player = document.getElementById("player");
const diceBtn = document.getElementById("diceBtn");
const log = document.getElementById("log");
const progressFill = document.getElementById("progressFill");

const largura = 900;
const altura = 550;
const margem = 30;
const casaSize = 42;

const casas = [];
let posicao = 0;
// ================= DESENHAR TRILHA =================
function desenharTrilha() {
  const canvas = document.getElementById("trilha");
  const ctx = canvas.getContext("2d");

  canvas.width = largura;
  canvas.height = altura;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  // trilha completa (apagada)
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();

  casas.forEach((casa, index) => {
    const x = casa.x + casaSize / 2;
    const y = casa.y + casaSize / 2;

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  // trilha ativa (até o player)
  const grad = ctx.createLinearGradient(0, 0, largura, altura);
  grad.addColorStop(0, "#fff6a3");
  grad.addColorStop(1, "#ffd700");

  ctx.strokeStyle = grad;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "gold";

  ctx.beginPath();

  casas.slice(0, posicao + 1).forEach((casa, index) => {
    const x = casa.x + casaSize / 2;
    const y = casa.y + casaSize / 2;

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

// ================= TIPOS =================
function definirTipoCasa(numero) {
  const total = 30; // 🔥 importante

  if (numero === 1) return "inicio";
  if (numero === total) return "fim";

  if (numero % 7 === 0) return "voltar";
  if (numero % 5 === 0) return "recompensa";
  if (numero % 3 === 0) return "pergunta";

  return "normal";
}

// ================= CRIAR CASA =================
function criarCasa(x, y, numero) {
  const casa = document.createElement("div");
  casa.classList.add("casa");

  const tipo = definirTipoCasa(numero);

  casa.dataset.tipo = tipo;
  casa.dataset.numero = numero;

  const emojis = {
    inicio: "🚀",
    fim: "🏁",
    recompensa: "⭐",
    voltar: "⏪",
    pergunta: "❓",
    normal: ""
  };

  casa.innerText = emojis[tipo] || "";
  casa.classList.add(tipo);

  casa.style.left = `${x}px`;
  casa.style.top = `${y}px`;

  map.appendChild(casa);

  casas.push({ x, y, numero, tipo });
}

// ================= TABULEIRO =================
function gerarTabuleiro() {
  const totalCasas = 100;

  const colunas = 15; // largura
  const linhas = Math.ceil(totalCasas / colunas);

  const espacamentoX = (largura - 2 * margem) / colunas;
  const espacamentoY = (altura - 2 * margem) / linhas;

  let numero = 1;

  for (let y = 0; y < linhas; y++) {
    for (let x = 0; x < colunas; x++) {

      if (numero > totalCasas) break;

      // efeito zigue-zague (fica mais jogo)
      let posX = (y % 2 === 0)
        ? x
        : (colunas - 1 - x);

      criarCasa(
        margem + posX * espacamentoX,
        margem + y * espacamentoY,
        numero
      );

      numero++;
    }
  }
}

// ================= PLAYER =================
function atualizarPlayer() {
  if (!casas.length || !casas[posicao]) return;

  const casa = casas[posicao];

const rect = player.getBoundingClientRect();
const playerSize = rect.width;

player.style.left = `${casa.x + casaSize / 2 - playerSize / 2}px`;
player.style.top = `${casa.y + casaSize / 2 - playerSize / 2}px`;

  progressFill.style.width =
    (posicao / (casas.length - 1)) * 100 + "%";
}

// ================= DADO =================
diceBtn.onclick = () => {
  diceBtn.disabled = true;

  const dice = document.getElementById("dice");
  dice.classList.add("rolling");

  let animFrames = 0;

  const intervaloAnim = setInterval(() => {
    const temp = Math.floor(Math.random() * 6) + 1;
    dice.innerText = ["⚀","⚁","⚂","⚃","⚄","⚅"][temp - 1];

    animFrames++;

    if (animFrames > 10) {
      clearInterval(intervaloAnim);

      const valor = Math.floor(Math.random() * 6) + 1;
      dice.innerText = ["⚀","⚁","⚂","⚃","⚄","⚅"][valor - 1];

      log.innerText = `🎲 Você tirou ${valor}`;

      setTimeout(() => {
        mover(valor);
        dice.classList.remove("rolling");
        diceBtn.disabled = false;
      }, 200);
    }
  }, 80);
};

// ================= MOVIMENTO =================
function mover(passos) {
  let destino = posicao + passos;

  if (destino >= casas.length) destino = casas.length - 1;
  if (destino < 0) destino = 0;

  let intervalo = setInterval(() => {
    if (posicao < destino) {
      posicao++;
      atualizarPlayer();
      efeitoImpactoCasa(posicao);
    }
    else if (posicao > destino) {
      posicao--;
      atualizarPlayer();
      efeitoImpactoCasa(posicao);
    }
    else {
      clearInterval(intervalo);
      eventoCasa();
    }
  }, 250);
}

// ================= EVENTOS =================
function eventoCasa() {
  const casaAtual = casas[posicao];

  if (casaAtual.tipo === "fim") {
    log.innerText = "🏁 Final da jornada!";
    return;
  }

  if (casaAtual.tipo === "recompensa") {
    log.innerText = "⭐ +10 XP";

    let xp = document.getElementById("xp");
    xp.innerText = parseInt(xp.innerText) + 10;
  }

  else if (casaAtual.tipo === "voltar") {
    log.innerText = "⏪ Voltou 3 casas!";
    setTimeout(() => mover(-3), 500);
  }

  else if (casaAtual.tipo === "pergunta") {
    log.innerText = "❓ Pergunta chegando...";
  }

  else {
    log.innerText = "⬜ Casa neutra";
  }
}

// ================= EFEITO =================
function efeitoImpactoCasa(index) {
  const todasCasas = document.querySelectorAll(".casa");

  todasCasas.forEach(c => c.classList.remove("ativa"));

  const casa = todasCasas[index];
  if (!casa) return;

  casa.classList.add("ativa");

  player.classList.add("player-bounce");

  setTimeout(() => {
    player.classList.remove("player-bounce");
  }, 500);
}

// ================= START =================
gerarTabuleiro();
atualizarPlayer();
desenharTrilha();