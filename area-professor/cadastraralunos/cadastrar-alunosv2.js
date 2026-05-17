import {
  auth,
  db,
  firebaseConfig
} from "../../js/firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

/* =========================
ELEMENTOS
========================= */

const nomeInput =
  document.getElementById("nome");

const loginPreview =
  document.getElementById("loginPreview");

const loginStatus =
  document.getElementById("loginStatus");

const senhaInput =
  document.getElementById("senha");

const escolaInput =
  document.getElementById("escola");

const serieInput =
  document.getElementById("serie");

const turmaInput =
  document.getElementById("turma");

const trocarSenhaInput =
  document.getElementById("trocarSenha");

const form =
  document.getElementById(
    "formCadastrarAluno"
  );

const btn =
  document.getElementById(
    "btnCadastrar"
  );

const msg =
  document.getElementById("msg");

const toggleSenha =
  document.getElementById(
    "toggleSenha"
  );

const gerarSenhaBtn =
  document.getElementById(
    "gerarSenha"
  );

const badge =
  document.getElementById(
    "senhaTipo"
  );

/* =========================
PROFESSOR
========================= */

const professorAvatar =
  document.getElementById(
    "professorAvatar"
  );

const professorNome =
  document.getElementById(
    "professorNome"
  );

const professorEmail =
  document.getElementById(
    "professorEmail"
  );

const professorIdInput =
  document.getElementById(
    "professorId"
  );

const professorNomeHidden =
  document.getElementById(
    "professorNomeHidden"
  );

/* =========================
PREVIEW
========================= */

const avatarPreview =
  document.getElementById(
    "avatarPreview"
  );

const previewNome =
  document.getElementById(
    "previewNome"
  );

const previewEscola =
  document.getElementById(
    "previewEscola"
  );

const previewSerie =
  document.getElementById(
    "previewSerie"
  );

/* =========================
FORÇA SENHA
========================= */

const barraForca =
  document.getElementById(
    "barraForca"
  );

const textoForca =
  document.getElementById(
    "textoForca"
  );

/* =========================
ESTADOS
========================= */

let senhaTemporaria = false;

let gerandoSenha = false;

let professorAtual = null;

/* =========================
CARREGAR PROFESSOR
========================= */

onAuthStateChanged(
  auth,
  async (user) => {

  /* =====================================
  NÃO LOGADO
  ===================================== */

  if (!user) {

    mostrarMsg(
      "Professor não autenticado",
      "erro"
    );

    setTimeout(() => {

      window.location.href =
        "../index.html";

    }, 1200);

    return;

  }

  try {

    const professorDoc =
      await getDoc(
        doc(
          db,
          "usuarios",
          user.uid
        )
      );

    /* =====================================
    PROFESSOR NÃO EXISTE
    ===================================== */

    if (!professorDoc.exists()) {

      mostrarMsg(
        "Professor não encontrado",
        "erro"
      );

      setTimeout(() => {

        window.location.href =
          "../home.html";

      }, 1200);

      return;

    }

    professorAtual =
      professorDoc.data();

    /* =====================================
    VALIDA TIPO
    ===================================== */

    if (
      professorAtual.tipo !==
      "professor"
    ) {

      form.style.display =
        "none";

      mostrarMsg(
        "Acesso permitido apenas para professores",
        "erro"
      );

      setTimeout(() => {

        window.location.href =
          "../home.html";

      }, 1500);

      return;

    }

    /* =====================================
    DADOS
    ===================================== */

    const nome =
      professorAtual.nome ||
      "Professor";

    /* INPUTS HIDDEN */

    professorIdInput.value =
      user.uid;

    professorNomeHidden.value =
      nome;

    /* =====================================
    UI
    ===================================== */

    professorNome.textContent =
      nome;

    professorEmail.textContent =
      user.email;

    /* =====================================
    AVATAR
    ===================================== */

    const partes =
      nome.split(" ");

    let iniciais = "PR";

    if (partes.length >= 2) {

      iniciais =
        partes[0][0] +
        partes[1][0];

    }

    else if (partes[0]) {

      iniciais =
        partes[0][0];

    }

    professorAvatar.textContent =
      iniciais.toUpperCase();

  }

  catch (error) {

    console.error(error);

    mostrarMsg(
      "Erro ao carregar professor",
      "erro"
    );

  }

});

/* =========================
MOSTRAR SENHA
========================= */

toggleSenha.onclick = () => {

  senhaInput.type =
    senhaInput.type === "password"
    ? "text"
    : "password";

};

/* =========================
GERAR SENHA
========================= */

function gerarSenhaForte() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%";

  let senha = "";

  for (let i = 0; i < 10; i++) {

    senha += chars.charAt(
      Math.floor(
        Math.random() * chars.length
      )
    );

  }

  return senha;

}

gerarSenhaBtn.onclick = () => {

  gerandoSenha = true;

  const senha =
    gerarSenhaForte();

  senhaInput.value = senha;

  senhaTemporaria = true;

  badge.textContent =
    "Senha temporária gerada";

  badge.className =
    "senha-badge temp";

  atualizarForcaSenha();

  setTimeout(() => {

    gerandoSenha = false;

  }, 100);

};

/* =========================
INPUT SENHA
========================= */

senhaInput.addEventListener(
  "input",
  () => {

    atualizarForcaSenha();

    if (gerandoSenha) return;

    senhaTemporaria = false;

    badge.textContent =
      "Senha definida manualmente";

    badge.className =
      "senha-badge ok";

});

/* =========================
FORÇA SENHA
========================= */

function atualizarForcaSenha() {

  const senha =
    senhaInput.value;

  let forca = 0;

  if (senha.length >= 6)
    forca++;

  if (/[A-Z]/.test(senha))
    forca++;

  if (/[0-9]/.test(senha))
    forca++;

  if (/[^A-Za-z0-9]/.test(senha))
    forca++;

  if (forca <= 1) {

    barraForca.style.width =
      "25%";

    barraForca.style.background =
      "#ff4d4f";

    textoForca.textContent =
      "Senha fraca";

  }

  else if (forca <= 3) {

    barraForca.style.width =
      "70%";

    barraForca.style.background =
      "#f5a623";

    textoForca.textContent =
      "Senha média";

  }

  else {

    barraForca.style.width =
      "100%";

    barraForca.style.background =
      "#34c759";

    textoForca.textContent =
      "Senha forte";

  }

}

/* =========================
LOGIN INTELIGENTE
========================= */

function gerarBase(nome) {

  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ".");

}

async function loginExiste(login) {

  const q = query(
    collection(db, "usuarios"),
    where("usuario", "==", login)
  );

  const snap =
    await getDocs(q);

  return !snap.empty;

}

async function gerarLogin(nome) {

  const base =
    gerarBase(nome);

  let login = base;

  let i = 0;

  while (
    await loginExiste(login)
  ) {

    i++;

    login = `${base}${i}`;

  }

  return login;

}

let timeout;

nomeInput.addEventListener(
  "input",
  () => {

    atualizarPreview();

    clearTimeout(timeout);

    timeout = setTimeout(
      async () => {

      const nome =
        nomeInput.value.trim();

      if (!nome) {

        loginPreview.value = "";

        loginStatus.textContent = "";

        return;

      }

      loginStatus.textContent =
        "Verificando login...";

      const login =
        await gerarLogin(nome);

      loginPreview.value =
        login;

      loginStatus.textContent =
        "Disponível ✔";

    }, 400);

});

/* =========================
PREVIEW
========================= */

function atualizarPreview() {

  const nome =
    nomeInput.value.trim();

  const partes =
    nome.split(" ");

  let iniciais = "AL";

  if (partes.length >= 2) {

    iniciais =
      partes[0][0] +
      partes[1][0];

  }

  else if (partes[0]) {

    iniciais =
      partes[0][0];

  }

  avatarPreview.textContent =
    iniciais.toUpperCase();

  previewNome.textContent =
    nome || "Nome do aluno";

  previewEscola.textContent =
    escolaInput.options[
      escolaInput.selectedIndex
    ]?.text || "Escola";

  previewSerie.textContent =
    `${serieInput.options[
      serieInput.selectedIndex
    ]?.text || ""}
    ${turmaInput.value}`.trim()
    || "Série/Turma";

}

[
  escolaInput,
  serieInput,
  turmaInput
].forEach((el) => {

  el.addEventListener(
    "input",
    atualizarPreview
  );

});

/* =========================
SUBMIT
========================= */

form.addEventListener(
  "submit",
  async (e) => {

  e.preventDefault();

  limparMsg();

  const nome =
    nomeInput.value.trim();

  const senha =
    senhaInput.value;

  const escola =
    escolaInput.value;

  const serie =
    serieInput.value;

  const turma =
    turmaInput.value;

  const login =
    loginPreview.value;

  const obrigarTroca =
    trocarSenhaInput.checked;

  if (
    !nome ||
    !senha ||
    !escola
  ) {

    return mostrarMsg(
      "Preencha os campos obrigatórios",
      "erro"
    );

  }

  if (senha.length < 6) {

    return mostrarMsg(
      "A senha precisa ter no mínimo 6 caracteres",
      "erro"
    );

  }

  ativarLoading(true);

  try {

    const email =
      `${login}@exatas.site`;

    /* APP SECUNDÁRIO */

    let secondaryApp;

    if (
      !getApps().some(
        app =>
        app.name === "Secondary"
      )
    ) {

      secondaryApp =
        initializeApp(
          firebaseConfig,
          "Secondary"
        );

    }

    else {

      secondaryApp =
        getApp("Secondary");

    }

    const secondaryAuth =
      getAuth(secondaryApp);

    /* CRIA USUÁRIO */

    const cred =
      await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        senha
      );

    const uid =
      cred.user.uid;

    /* FIRESTORE */

    await setDoc(
      doc(db, "usuarios", uid),
      {

      nome,

      usuario: login,

      email,

      tipo: "aluno",

      escola,

      serie,

      turma,

      xp: 0,

      nivel: 1,

      moedas: 0,

      ativo: true,

      senhaTemporaria:
        obrigarTroca,

      senhaInicial:
        obrigarTroca
        ? senha
        : null,

      professorId:
        auth.currentUser.uid,

      professorNome:
        professorAtual.nome,

      criadoPor:
        auth.currentUser.uid,

      criadoEm:
        serverTimestamp(),

      ultimoResetSenha:
        serverTimestamp()

    });

    /* DESLOGA */

    await secondaryAuth.signOut();

    /* COPIAR */

    await navigator.clipboard.writeText(
`Login: ${login}
Senha: ${senha}`
    );

    mostrarMsg(
      "Aluno criado com sucesso ✔",
      "sucesso"
    );

    /* RESET */

    resetFormulario();

  }

  catch (error) {

    console.error(error);

    tratarErro(error);

  }

  finally {

    ativarLoading(false);

  }

});

/* =========================
RESET
========================= */

function resetFormulario() {

  form.reset();

  loginPreview.value = "";

  loginStatus.textContent = "";

  senhaTemporaria = false;

  badge.textContent =
    "Senha definida manualmente";

  badge.className =
    "senha-badge ok";

  barraForca.style.width =
    "0%";

  textoForca.textContent =
    "Segurança da senha";

  avatarPreview.textContent =
    "AL";

  previewNome.textContent =
    "Nome do aluno";

  previewEscola.textContent =
    "Escola";

  previewSerie.textContent =
    "Série/Turma";

}

/* =========================
LOADING
========================= */

function ativarLoading(
  estado
) {

  btn.disabled = estado;

  const text =
    btn.querySelector(".text");

  const loader =
    btn.querySelector(".loader");

  if (estado) {

    text.style.display =
      "none";

    loader.style.display =
      "block";

  }

  else {

    text.style.display =
      "block";

    loader.style.display =
      "none";

  }

}

/* =========================
TRATAR ERROS
========================= */

function tratarErro(error) {

  switch (error.code) {

    case "auth/email-already-in-use":

      mostrarMsg(
        "Login já está em uso",
        "erro"
      );

      break;

    case "auth/weak-password":

      mostrarMsg(
        "Senha muito fraca",
        "erro"
      );

      break;

    case "auth/network-request-failed":

      mostrarMsg(
        "Erro de conexão",
        "erro"
      );

      break;

    default:

      mostrarMsg(
        "Erro ao cadastrar aluno",
        "erro"
      );

  }

}

/* =========================
MSG
========================= */

function mostrarMsg(
  texto,
  tipo
) {

  msg.textContent = texto;

  msg.className = "";

  msg.classList.add(tipo);

}

function limparMsg() {

  msg.textContent = "";

  msg.className = "";

}