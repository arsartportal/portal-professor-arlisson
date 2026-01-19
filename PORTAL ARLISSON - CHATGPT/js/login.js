const usuarios = {
  "1ano": "fisica1",
  "2ano": "fisica2",
  "3ano": "fisica3",
  "eja": "eja2026",
  "gakinha": "gakinha",
  "professor": "dota2"
};

/* ================= LOGIN ================= */
function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  if (usuarios[user] && usuarios[user] === pass) {

    const ultimo = localStorage.getItem("loginAtual");
    if (ultimo) localStorage.setItem("ultimoAcesso", ultimo);

    localStorage.setItem("loginAtual", new Date().toLocaleString("pt-BR"));
    localStorage.setItem("logado", "true");
    localStorage.setItem("turma", user);

    if (user === "professor") {
      localStorage.setItem("perfil", "prof");

      // 👇👇👇 ADICIONADO AQUI — CONTROLE EXCLUSIVO DO PROFESSOR (Calc 3D)
      localStorage.setItem("tipoUsuario", "professor");

    } else {
      localStorage.setItem("perfil", "aluno");

      // 👇👇👇 ADICIONADO AQUI — GARANTE QUE ALUNO NÃO VEJA A CALC 3D
      localStorage.setItem("tipoUsuario", "aluno");
    }

    window.location.href = "home.html";
  } else {
    if (erro) erro.innerText = "Usuário ou senha incorretos";
  }
}

/* ================= PROTEÇÃO HOME ================= */
if (window.location.pathname.includes("home")) {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
  }
}

/* ================= SAIR ================= */
function sair() {
  localStorage.removeItem("logado");
  localStorage.removeItem("turma");
  localStorage.removeItem("perfil");
  localStorage.removeItem("tipoUsuario"); // 👈 limpeza correta
  window.location.href = "index.html";
}

/* ================= PÓS-CARREGAMENTO ================= */
document.addEventListener("DOMContentLoaded", async () => {

  /* TURMA NO TOPO */
  const turma = localStorage.getItem("turma");
  const elTurma = document.getElementById("turma");

  if (elTurma && turma) {
    const nomes = {
      "1ano": "1º ano",
      "2ano": "2º ano",
      "3ano": "3º ano",
      "eja": "EJA",
      "professor": "Professor"
    };
    elTurma.innerText = `Turma logada: ${nomes[turma] || turma}`;
  }

  /* LOGIN / ÚLTIMO ACESSO */
  const ultimo = localStorage.getItem("ultimoAcesso");
  const atual = localStorage.getItem("loginAtual");

  if (document.getElementById("ultimo-acesso") && ultimo) {
    document.getElementById("ultimo-acesso").innerText =
      `🕒 Último acesso: ${ultimo}`;
  }

  if (document.getElementById("login-atual") && atual) {
    document.getElementById("login-atual").innerText =
      `🕒 Login atual: ${atual}`;
  }

  /* IP */
  if (document.getElementById("info-login")) {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      document.getElementById("info-login").innerText =
        `🌐 IP: ${data.ip}`;
    } catch {
      document.getElementById("info-login").innerText =
        "🌐 IP indisponível";
    }
  }

  /* GABARITOS (somente se estiver na página) */
  if (window.location.pathname.includes("gabaritos")) {
    const perfil = localStorage.getItem("perfil");
    const negado = document.getElementById("acesso-negado");
    const prof = document.getElementById("conteudo-prof");

    if (perfil === "prof") {
      if (negado) negado.style.display = "none";
      if (prof) prof.style.display = "block";
    } else {
      if (negado) negado.style.display = "block";
      if (prof) prof.style.display = "none";
    }
  }

});
