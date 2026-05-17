// ========================================
// FIREBASE
// ========================================

import {
  auth,
  db
} from "../js/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ========================================
// VERIFICAÇÃO DE ACESSO
// ========================================

onAuthStateChanged(auth, async(user)=>{

  // NÃO LOGADO

  if(!user){

    window.location.href =
    "../index.html";

    return;
  }

  try{

    // BUSCA DADOS

    const ref =
    doc(db,"usuarios",user.uid);

    const snap =
    await getDoc(ref);

    // USUÁRIO NÃO EXISTE

    if(!snap.exists()){

      alert("Usuário não encontrado.");

      window.location.href =
      "../index.html";

      return;
    }

    const dados =
    snap.data();

    // NÃO É PROFESSOR

    // NÃO É PROFESSOR

if(dados.tipo !== "professor"){

  document.body.innerHTML = `

    <div class="acesso-negado">

      <div class="acesso-card">

        <div class="acesso-icon">
          🎓
        </div>

        <h1>
          Área exclusiva para professores
        </h1>

        <p>
          Você não possui permissão para acessar esta página.
        </p>

        <button class="btn-voltar">

          ⬅ Voltar

        </button>

      </div>

    </div>

  `;

  // ========================================
  // CSS DINÂMICO
  // ========================================

  const style =
  document.createElement("style");

  style.innerHTML = `

    body{

      margin:0;

      font-family:'Inter',sans-serif;

      background:#f8fafc;

      display:flex;
      justify-content:center;
      align-items:center;

      min-height:100vh;
    }

    .acesso-negado{

      width:100%;

      padding:20px;

      display:flex;
      justify-content:center;
      align-items:center;
    }

    .acesso-card{

      width:min(420px,100%);

      background:white;

      border-radius:28px;

      padding:40px 30px;

      text-align:center;

      border:1px solid #e2e8f0;

      box-shadow:
        0 10px 40px rgba(15,23,42,.08);
    }

    .acesso-icon{

      width:90px;
      height:90px;

      margin:auto auto 24px;

      border-radius:24px;

      background:#eff6ff;

      display:flex;
      align-items:center;
      justify-content:center;

      font-size:42px;
    }

    .acesso-card h1{

      font-size:28px;

      color:#0f172a;

      margin-bottom:14px;
    }

    .acesso-card p{

      color:#64748b;

      line-height:1.7;

      margin-bottom:28px;
    }

    .btn-voltar{

      border:none;

      background:#2563eb;

      color:white;

      padding:16px 24px;

      border-radius:18px;

      cursor:pointer;

      font-size:15px;
      font-weight:700;

      transition:.2s ease;
    }

    .btn-voltar:hover{

      transform:translateY(-2px);

      opacity:.92;
    }

  `;

  document.head.appendChild(style);

  // ========================================
  // BOTÃO
  // ========================================

  document
  .querySelector(".btn-voltar")
  .addEventListener("click",()=>{

    history.back();

  });

  return;

}

    // ========================================
    // ACESSO LIBERADO
    // ========================================

    iniciarSistema(dados);

  }catch(erro){

  console.error(
    "Erro ao validar acesso:",
    erro
  );

  document.body.innerHTML = `

    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:Inter,sans-serif;
      background:#f8fafc;
      padding:20px;
    ">

      <div style="
        background:white;
        padding:40px;
        border-radius:24px;
        border:1px solid #e2e8f0;
        max-width:500px;
        width:100%;
        text-align:center;
        box-shadow:0 10px 40px rgba(0,0,0,.08);
      ">

        <h1 style="
          margin-bottom:20px;
          color:#dc2626;
        ">
          Erro de autenticação
        </h1>

        <p style="
          color:#64748b;
          margin-bottom:24px;
          line-height:1.7;
        ">
          ${erro.message}
        </p>

        <button onclick="history.back()"
          style="
            border:none;
            background:#2563eb;
            color:white;
            padding:14px 22px;
            border-radius:16px;
            cursor:pointer;
            font-weight:700;
          "
        >

          ⬅ Voltar

        </button>

      </div>

    </div>

  `;

}

});

// ========================================
// SISTEMA PRINCIPAL
// ========================================

function iniciarSistema(dados){

  console.log(
    "Área do Professor carregada com sucesso!"
  );

  // ========================================
  // NOME DO PROFESSOR
  // ========================================

  const nomeProfessor =
  document.querySelector(".profile-card h4");

  if(nomeProfessor && dados.nome){

    nomeProfessor.innerText =
    dados.nome;

  }

  // ========================================
  // CARDS
  // ========================================

  const cards =
  document.querySelectorAll(".card");

  cards.forEach((card)=>{

    card.addEventListener("click",()=>{

      const titulo =
      card.querySelector("h3").textContent;

      console.log(`Abrindo: ${titulo}`);

      switch(titulo){

        case "Cadastrar Alunos":

          window.location.href =
          "./cadastraralunos/cadastrar-alunosv2.html";

        break;

        case "Ranking":

          window.location.href =
          "./ranking-professor/ranking-professor.html";

        break;

        case "Patch Notes":

          window.location.href =
          "./patch-notes/patch-notes.html";

        break;

        case "Avisos":

          alert(
            "Abrir painel de avisos"
          );

        break;

        case "Controle de Aulas":

          alert(
            "Abrir controle de aulas"
          );

        break;

        case "Pesquisas":

          window.location.href =
          "./pesquisas/banco-pesquisas.html";

        break;

        default:

          alert(
            "Página em desenvolvimento"
          );

      }

    });

  });

  // ========================================
  // ANIMAÇÃO CARDS
  // ========================================

  window.addEventListener("load",()=>{

    cards.forEach((card,index)=>{

      card.style.opacity = "0";

      card.style.transform =
      "translateY(20px)";

      setTimeout(()=>{

        card.style.transition =
        "0.5s ease";

        card.style.opacity = "1";

        card.style.transform =
        "translateY(0)";

      },index * 100);

    });

  });

  // ========================================
  // BUSCA
  // ========================================

  const searchInput =
  document.querySelector(
    ".search-box input"
  );

  searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    cards.forEach((card)=>{

      const titulo =
      card.querySelector("h3")
      .textContent
      .toLowerCase();

      if(titulo.includes(value)){

        card.style.display = "flex";

      }else{

        card.style.display = "none";

      }

    });

  });

  // ========================================
  // MENU SIDEBAR
  // ========================================

  const menuItems =
  document.querySelectorAll(".menu-item");

  menuItems.forEach((item)=>{

    item.addEventListener("click",()=>{

      menuItems.forEach((menu)=>{

        menu.classList.remove("active");

      });

      item.classList.add("active");

    });

  });

  // ========================================
  // BOTÃO NOVIDADES
  // ========================================

  const novidadesBtn =
  document.querySelector(
    ".bottom-tip button"
  );

  novidadesBtn.addEventListener("click",()=>{

    alert(
      "Em breve: painel de novidades do portal!"
    );

  });

  // ========================================
  // SAUDAÇÃO
  // ========================================

  saudacaoDinamica();

}

// ========================================
// SAUDAÇÃO DINÂMICA
// ========================================

function saudacaoDinamica(){

  const titulo =
  document.querySelector(".topbar h1");

  const hora =
  new Date().getHours();

  let saudacao = "Olá";

  if(hora >= 5 && hora < 12){

    saudacao = "Bom dia";

  }

  else if(hora >= 12 && hora < 18){

    saudacao = "Boa tarde";

  }

  else{

    saudacao = "Boa noite";

  }

  titulo.innerHTML =
  `${saudacao}, Professor! 👋`;

}