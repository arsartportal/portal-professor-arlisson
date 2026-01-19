/* =====================================================
   DASHBOARD.JS — ÁREA DO PROFESSOR
   -----------------------------------------------------
   Este arquivo é responsável por:

   ✔ Garantir que o usuário está logado
   ✔ Verificar se o usuário é PROFESSOR
   ✔ Buscar todos os alunos no Firestore
   ✔ Montar a tabela de acompanhamento

   IMPORTANTE:
   - Alunos NÃO podem acessar esta página
   - Toda decisão de segurança acontece aqui
===================================================== */

/* =========================================
   IMPORTA MÓDULOS DO FIRESTORE
   ========================================= */
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* =========================================
   IMPORTA MÓDULOS DE AUTENTICAÇÃO
   ========================================= */
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

/* =========================================
   IMPORTA A CONFIGURAÇÃO DO FIREBASE
   ========================================= */
import { app } from "./firebase.js";

/* Inicializa os serviços */
const db = getFirestore(app);
const auth = getAuth(app);

/* =========================================
   FLUXO PRINCIPAL DO DASHBOARD
   =========================================
   Espera o Firebase confirmar o usuário logado
========================================= */
onAuthStateChanged(auth, async (user) => {

  /* -----------------------------------------
     1️⃣ VERIFICA SE ESTÁ LOGADO
     -----------------------------------------
     Se não estiver logado, volta para o login
  ----------------------------------------- */
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  /* -----------------------------------------
     2️⃣ BUSCA O PERFIL DO USUÁRIO LOGADO
     -----------------------------------------
     Precisamos saber se ele é professor
  ----------------------------------------- */
  const perfilRef = doc(db, "usuarios", user.uid);
  const perfilSnap = await getDoc(perfilRef);

  if (!perfilSnap.exists()) return;

  const perfil = perfilSnap.data();

  /* -----------------------------------------
     3️⃣ BLOQUEIA ALUNO
     -----------------------------------------
     Somente professor pode continuar
  ----------------------------------------- */
  if (perfil.tipo !== "professor") {
    alert("Acesso restrito ao professor.");
    window.location.href = "../home.html";
    return;
  }

  /* -----------------------------------------
     4️⃣ BUSCA TODOS OS USUÁRIOS
     -----------------------------------------
     O professor pode visualizar os alunos
  ----------------------------------------- */
  const tabela = document.getElementById("lista-alunos");
  tabela.innerHTML = "";

  const usuariosRef = collection(db, "usuarios");
  const snapshot = await getDocs(usuariosRef);

  snapshot.forEach(docSnap => {

    const dados = docSnap.data();

    /* Ignora usuários que não são alunos */
    if (dados.tipo !== "aluno") return;

    /* Cria uma linha da tabela */
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${dados.nome || "-"}</td>
      <td>${dados.turma || "-"}</td>
      <td>${dados.xp ?? 0}</td>
      <td>${dados.nivel ?? 0}</td>
      <td>${formatarData(dados.ultimoLogin)}</td>
    `;

    /* Adiciona a linha na tabela */
    tabela.appendChild(tr);
  });
});
const snapshot = await getDocs(usuariosRef);
console.log("Total de documentos:", snapshot.size);
/* =========================================
   FUNÇÃO AUXILIAR — FORMATA DATA
   =========================================
   Recebe um timestamp do Firestore
   e converte para data legível
========================================= */
function formatarData(timestamp) {

  if (!timestamp) return "-";

  const data = timestamp.toDate();

  return (
    data.toLocaleDateString("pt-BR") +
    " " +
    data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );
}
