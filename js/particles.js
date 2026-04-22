console.log("particles carregado");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: null,
  y: null,
  radius: 120
};

/* ================================
   AJUSTE DE TELA
================================ */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ================================
   MOUSE INTERAÇÃO
================================ */
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

/* ================================
   CRIA PARTÍCULAS
================================ */
function initParticles() {
  particles = [];

  const quantidade = window.innerWidth < 768 ? 30 : 55;

  for (let i = 0; i < quantidade; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
  }
}

initParticles();
window.addEventListener("resize", initParticles);

/* ================================
   DESENHO
================================ */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* PARTÍCULAS */
  particles.forEach(p => {

    /* MOVIMENTO SUAVE */
    p.x += p.vx;
    p.y += p.vy;

    /* LOOP NAS BORDAS */
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    /* INTERAÇÃO COM MOUSE */
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        p.x += dx * 0.01;
        p.y += dy * 0.01;
      }
    }

    /* DESENHO */
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fill();
  });

  /* LINHAS ENTRE PARTÍCULAS (efeito premium) */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.15 - dist / 1200})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();