import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

async function carregarAluno() {
  const user = auth.currentUser;

  if (!user) {
    alert("Usuário não logado");
    return;
  }

  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("nome").innerText = data.nome;
  document.getElementById("escola").innerText = data.escola;
  document.getElementById("turma").innerText = data.turma;

  atualizarXP(data.xp || 0);
}

function atualizarXP(xp) {
  const nivel = Math.floor(xp / 100);
  const progresso = xp % 100;

  document.getElementById("nivel").innerText = nivel;
  document.getElementById("xp").innerText = xp;
  document.getElementById("barra-xp").style.width = progresso + "%";
}

/* 🎁 RECOMPENSA DIÁRIA */
document.getElementById("btn-recompensa").addEventListener("click", () => {
  alert("Recompensa coletada (placeholder)");
});

/* INIT */
carregarAluno();

// ✨ ANIMAÇÃO DE ENTRADA
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "all 0.5s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 120);
  });
});

function mockInventario() {
  const grid = document.getElementById("inventario-grid");

  for (let i = 0; i < 8; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerText = "🎁";

    item.addEventListener("click", () => {
      item.style.transform = "scale(0.9)";
      setTimeout(() => {
        item.style.transform = "scale(1)";
      }, 100);
    });

    grid.appendChild(item);
  }
}

mockInventario();

/* 🎮 ESTADO DO AVATAR */
let avatar = {
  corpo: "corpo_masc_tom1.png",
  roupa: null,
  cabelo: null,
  acessorio: null
};

/* 🧠 CAMINHO BASE */
const BASE = "assets/avatar/";

/* 🎨 RENDERIZA AVATAR */
function renderAvatar() {
  document.getElementById("avatar-corpo").src = BASE + "corpo/" + avatar.corpo;

  document.getElementById("avatar-roupa").src =
    avatar.roupa ? BASE + "roupas/" + avatar.roupa : "";

  document.getElementById("avatar-cabelo").src =
    avatar.cabelo ? BASE + "cabelos/" + avatar.cabelo : "";

  document.getElementById("avatar-acessorio").src =
    avatar.acessorio ? BASE + "acessorios/" + avatar.acessorio : "";
}

const itens = [
  { tipo: "roupa", nome: "camisa_azul.png" },
  { tipo: "cabelo", nome: "cabelo_curto.png" },
  { tipo: "acessorio", nome: "oculos.png" }
];

function carregarInventario() {
  const grid = document.getElementById("inventario-grid");

  itens.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerText = "🎁";

    div.addEventListener("click", () => {
      equiparItem(item);
    });

    grid.appendChild(div);
  });
}

function equiparItem(item) {
  avatar[item.tipo] = item.nome;

  renderAvatar();

  /* 💥 feedback visual */
  document.querySelector(".avatar-stack").style.transform = "scale(1.05)";
  setTimeout(() => {
    document.querySelector(".avatar-stack").style.transform = "scale(1)";
  }, 150);
}

let custom = {
  cor: "#22c55e",
  titulo: "",
  banner: "banner1.png"
};

function aplicarCustomizacao() {
  document.documentElement.style.setProperty("--cor-perfil", custom.cor);

  if (custom.titulo) {
    document.getElementById("nome").innerText += " • " + custom.titulo;
  }

  document.querySelector(".perfil-card").style.background =
    `linear-gradient(135deg, ${custom.cor}33, transparent)`;

  document.body.style.backgroundImage =
    `url('../assets/banners/${custom.banner}')`;
}

let preview = { ...custom };

function aplicarCustomizacao(data) {
  document.documentElement.style.setProperty("--cor-perfil", data.cor);

  const nomeBase = data.nome || document.getElementById("nome").innerText.split(" • ")[0];

  document.getElementById("nome").innerText =
    data.titulo ? nomeBase + " • " + data.titulo : nomeBase;

  document.querySelector(".perfil-card").style.background =
    `linear-gradient(135deg, ${data.cor}33, transparent)`;

  document.body.style.backgroundImage =
    `url('../assets/banners/${data.banner}')`;
}

/* 🎨 COR */
document.getElementById("cor-perfil").addEventListener("input", (e) => {
  preview.cor = e.target.value;
  aplicarCustomizacao(preview);
});

/* 🏷 TÍTULO */
document.getElementById("titulo").addEventListener("input", (e) => {
  preview.titulo = e.target.value;
  aplicarCustomizacao(preview);
});

/* 🖼 BANNER */
document.getElementById("banner").addEventListener("change", (e) => {
  preview.banner = e.target.value;
  aplicarCustomizacao(preview);
});