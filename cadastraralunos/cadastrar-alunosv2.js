import { auth, db, firebaseConfig } from "../js/firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  createUserWithEmailAndPassword,
  getAuth
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

/* ELEMENTOS */
const nomeInput = document.getElementById("nome");
const loginPreview = document.getElementById("loginPreview");
const loginStatus = document.getElementById("loginStatus");
const senhaInput = document.getElementById("senha");
const escolaInput = document.getElementById("escola");
const serieInput = document.getElementById("serie");
const turmaInput = document.getElementById("turma");
const msg = document.getElementById("msg");
const btn = document.getElementById("btnCadastrar");
const form = document.getElementById("formCadastrarAluno");
const toggleSenha = document.getElementById("toggleSenha");
const gerarSenhaBtn = document.getElementById("gerarSenha");
const badge = document.getElementById("senhaTipo");

/* SENHA */
let senhaTemporaria = false;

toggleSenha.onclick = () => {
  senhaInput.type = senhaInput.type === "password" ? "text" : "password";
};

/* GERAR SENHA */
gerarSenhaBtn.onclick = () => {
  const senha = Math.random().toString(36).slice(-8);

  senhaInput.value = senha;
  senhaTemporaria = true;

  badge.textContent = "Senha temporária";
  badge.className = "senha-badge temp";
};

/* DIGITOU → VOLTA PRA NORMAL */
senhaInput.addEventListener("input", () => {
  senhaTemporaria = false;

  badge.textContent = "Senha definida manualmente";
  badge.className = "senha-badge ok";
});

/* LOGIN INTELIGENTE */
function gerarBase(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

async function loginExiste(login) {
  const q = query(collection(db, "usuarios"), where("usuario", "==", login));
  const snap = await getDocs(q);
  return !snap.empty;
}

async function gerarLogin(nome) {
  const base = gerarBase(nome);
  let login = base;
  let i = 0;

  while (await loginExiste(login)) {
    i++;
    login = base + i;
  }

  return login;
}

let timeout;

nomeInput.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const nome = nomeInput.value.trim();
    if (!nome) return;

    loginStatus.textContent = "Verificando...";

    const login = await gerarLogin(nome);

    loginPreview.value = login;
    loginStatus.textContent = "Disponível ✔";
  }, 400);
});

/* SUBMIT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const senha = senhaInput.value;
  const escola = escolaInput.value;

  if (!nome || !senha || !escola) {
    return mostrarMsg("Preencha os campos obrigatórios", "erro");
  }

  btn.querySelector(".text").style.display = "none";
  btn.querySelector(".loader").style.display = "block";

  try {
    const login = loginPreview.value;
    const email = login + "@exatas.site";

    let secondaryApp;

    if (!getApps().some(app => app.name === "Secondary")) {
      secondaryApp = initializeApp(firebaseConfig, "Secondary");
    } else {
      secondaryApp = getApp("Secondary");
    }

    const secondaryAuth = getAuth(secondaryApp);

    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      senha
    );

    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nome,
      usuario: login,
      email,
      tipo: "aluno",
      escola,
      serie: serieInput.value,
      turma: turmaInput.value,

      xp: 0,
      nivel: 0,

      senhaTemporaria,
      criadoEm: serverTimestamp()
    });

    await secondaryAuth.signOut();

    await navigator.clipboard.writeText(
`Login: ${login}
Senha: ${senha}`
    );

    mostrarMsg("Aluno criado com sucesso ✔", "sucesso");

    form.reset();
    loginPreview.value = "";

  } catch (error) {
    console.error(error);
    mostrarMsg("Erro ao cadastrar", "erro");
  }

  btn.querySelector(".text").style.display = "block";
  btn.querySelector(".loader").style.display = "none";
});

/* MSG */
function mostrarMsg(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;
}