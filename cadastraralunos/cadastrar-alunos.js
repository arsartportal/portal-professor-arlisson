/* =====================================================
   CADASTRO DE ALUNOS — PORTAL DO PROFESSOR
   -----------------------------------------------------
   - Verifica login
   - Verifica se é professor
   - Cadastra aluno na coleção "usuarios"
   ===================================================== */

import { auth, db } from "../js/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Elementos da página
const form = document.getElementById("formCadastrarAluno");
const msg = document.getElementById("msg");

/* =====================================================
   SEGURANÇA — SOMENTE PROFESSOR
===================================================== */
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "/login";
    return;
  }

  // 🔥 CORREÇÃO: coleção e campo certos
  const snap = await getDoc(doc(db, "usuarios", user.uid));

  if (!snap.exists() || snap.data().tipo !== "professor") {
    window.location.href = "/home";
  }
});

/* =====================================================
   SUBMIT DO FORMULÁRIO
===================================================== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Captura dos dados
  const nome = document.getElementById("nome").value.trim();
  const escola = document.getElementById("escola").value;
  const serie = document.getElementById("serie").value; // opcional
  const turma = document.getElementById("turma").value.trim();

  // Validação básica
  if (!nome || !escola) {
    mostrarMsg("Preencha os campos obrigatórios.", "erro");
    return;
  }

  // Gera o campo "usuario" (login textual)
  const usuario = nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  try {
    // 🔥 Criação compatível com as regras
    await addDoc(collection(db, "usuarios"), {
      nome,
      usuario,
      tipo: "aluno",
      escola,
      turma,
      serie,               // pode manter
      nivel: 0,
      xp: 0,
      criadoEm: serverTimestamp(),
      ultimoAcesso: serverTimestamp()
    });

    mostrarMsg("Aluno cadastrado com sucesso ✅", "sucesso");
    form.reset();

  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    mostrarMsg("Erro ao cadastrar aluno.", "erro");
  }
});

/* =====================================================
   FUNÇÃO DE MENSAGEM
===================================================== */
function mostrarMsg(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "";
  }, 3000);
}
