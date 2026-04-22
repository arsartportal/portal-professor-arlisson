// =============================
// 🔥 IMPORTS FIREBASE
// =============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
  getFirestore, collection, addDoc, getDocs,
  query, where, doc, getDoc, updateDoc,
  increment, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


// =============================
// 🔥 CONFIG FIREBASE
// =============================
const firebaseConfig = {
  apiKey: "AIzaSyBQ8EQ5ftRwCGWK3maT9Vj53fOI5PR-C2c",
  authDomain: "portal-professor-arlisson.firebaseapp.com",
  projectId: "portal-professor-arlisson"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// =============================
// 🎯 ELEMENTOS HTML
// =============================
const termoTitulo = document.getElementById("termoTitulo");
const faseInfo = document.getElementById("faseInfo");
const descricao = document.getElementById("descricaoDesafio");
const areaCriacao = document.getElementById("areaCriacao");
const lista = document.getElementById("listaDefinicoes");

let termoAtual = "";
let faseAtual = "";


// =============================
// 👤 GARANTE USUÁRIO NO FIREBASE
// =============================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "usuarios", user.uid);
    const snap = await getDoc(userRef);

    // 🔥 cria usuário se não existir
    if (!snap.exists()) {
      await setDoc(userRef, {
        xp: 0,
        votosHoje: 0,
        ultimoReset: "",
        tipo: "aluno",
        escola: "",
        serie: "",
        turma: ""
      });
    }

    carregarTermo();
  }
});


// =============================
// 📅 SEMANA DO ANO
// =============================
function getSemanaDoAno() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), 0, 1);
  const dias = Math.floor((hoje - primeiroDia) / (24 * 60 * 60 * 1000));
  return Math.ceil((dias + primeiroDia.getDay() + 1) / 7);
}


// =============================
// 🔄 FASE DO SISTEMA
// =============================
function getFaseAtual() {
  const dia = new Date().getDay();

  if (dia >= 1 && dia <= 3) return "criacao";
  if (dia >= 4 && dia <= 5) return "votacao";
  return "validacao";
}


// =============================
// 🎨 TEXTO BONITO DAS FASES
// =============================
function nomeBonitoFase(fase) {
  if (fase === "criacao") return "✍️ Envio de definições";
  if (fase === "votacao") return "🗳️ Votação aberta";
  return "📌 Em validação";
}


// =============================
// 📚 CARREGAR TERMO
// =============================
async function carregarTermo() {
  const semana = getSemanaDoAno();
  const ano = new Date().getFullYear();

  const ref = doc(db, "glossario_desafios", ano.toString());
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    termoTitulo.innerText = "📌 Sem termos definidos";
    return;
  }

  const data = snap.data();
  const chave = "semana_" + String(semana).padStart(2, "0");
  const dataSemana = data[chave];

  if (!dataSemana) {
    termoTitulo.innerText = "📌 Sem termos definidos";
    return;
  }

  let termoPrincipal;

  if (dataSemana.termo) {
    termoPrincipal = dataSemana;
  } else if (dataSemana.termos?.length > 0) {
    termoPrincipal = dataSemana.termos[0];
  }

  if (!termoPrincipal) return;

  termoAtual = termoPrincipal.termo;
  if (!termoPrincipal.fase || termoPrincipal.fase === "auto") {
  faseAtual = getFaseAtual();
} else {
  faseAtual = termoPrincipal.fase;
}

  termoTitulo.innerText = "📌 " + termoAtual;
  faseInfo.innerText = nomeBonitoFase(faseAtual);

  descricao.innerText =
    `Defina "${termoAtual}" com suas palavras e dê um exemplo.`;

  areaCriacao.style.display = faseAtual === "criacao" ? "block" : "none";

  carregarDefinicoes();
}


// =============================
// ✍️ ENVIAR DEFINIÇÃO (CORRIGIDO)
// =============================
async function enviarDefinicao() {
  try {
    const user = auth.currentUser;

    if (!user) return alert("Você precisa estar logado!");

    const texto = document.getElementById("inputDefinicao").value;
    if (!texto) return alert("Escreva algo!");

    const semana = getSemanaDoAno();
    const ano = new Date().getFullYear();

    // 🔒 VERIFICA DUPLICADO
    const q = query(
      collection(db, "definicoes"),
      where("autorId", "==", user.uid),
      where("termo", "==", termoAtual),
      where("semana", "==", semana),
      where("ano", "==", ano)
    );

    const existente = await getDocs(q);

    if (!existente.empty) {
      alert("Você já enviou uma definição!");
      return;
    }

    console.log("🔥 Tentando salvar...");

    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
    const aluno = userSnap.data();

    await addDoc(collection(db, "definicoes"), {
      termo: termoAtual,
      definicao: texto,
      votos: 0,
      status: "pendente",
      semana,
      ano,
      autorId: user.uid,
      autorNome: user.displayName || "Aluno",
      escola: aluno?.escola || "",
      serie: aluno?.serie || "",
      turma: aluno?.turma || "",
      criadoEm: serverTimestamp()
    });

    console.log("✅ Salvou!");

    await setDoc(userRef, {
      xp: increment(10)
    }, { merge: true });

    document.getElementById("inputDefinicao").value = "";

    carregarDefinicoes();

  } catch (e) {
    console.error("💥 ERRO REAL:", e);
    alert("Erro ao salvar. Veja o console.");
  }
}


// =============================
// 📋 LISTAR DEFINIÇÕES
// =============================
async function carregarDefinicoes() {
  lista.innerHTML = "";

  const q = query(
    collection(db, "definicoes"),
    where("termo", "==", termoAtual),
    where("semana", "==", getSemanaDoAno()),
    where("ano", "==", new Date().getFullYear())
  );

  const snapshot = await getDocs(q);

  const docs = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => b.votos - a.votos);

  docs.forEach((d, index) => {
    const div = document.createElement("div");
    div.classList.add("definicao");

    if (index === 0) div.classList.add("ouro");
    if (index === 1) div.classList.add("prata");
    if (index === 2) div.classList.add("bronze");

    div.innerHTML = `
      <p>${d.definicao}</p>

      <small>👤 ${d.autorNome}</small><br>
      <small>🏫 ${d.escola}</small><br>
      <small>📚 ${d.serie} ${d.turma}</small><br>
      <small>🕒 ${formatarData(d.criadoEm)}</small><br>

      <small>👍 ${d.votos}</small><br>
      <small>📌 ${d.status}</small>

      ${
        faseAtual === "votacao"
          ? `<br><button onclick="votar('${d.id}', '${d.autorId}')">Votar</button>`
          : ""
      }
    `;

    lista.appendChild(div);
  });
}


// =============================
// 🗳️ VOTAR (MANTIDO + AJUSTE)
// =============================
async function votar(definicaoId, autorId) {
  const user = auth.currentUser;

  if (!user) return alert("Você precisa estar logado!");
  if (autorId === user.uid) return alert("Você não pode votar em si mesmo!");

  const hoje = new Date().toISOString().split("T")[0];

  const userRef = doc(db, "usuarios", user.uid);
  const userSnap = await getDoc(userRef);

  let votosHoje = 0;

  if (userSnap.exists()) {
    const data = userSnap.data();
    votosHoje = data.ultimoReset === hoje ? data.votosHoje || 0 : 0;
  }

  if (votosHoje >= 5) return alert("Limite diário atingido!");

  // 🔒 evita voto duplicado
  const q = query(
    collection(db, "votos"),
    where("usuarioId", "==", user.uid),
    where("definicaoId", "==", definicaoId),
    where("data", "==", hoje)
  );

  const votoExistente = await getDocs(q);
  if (!votoExistente.empty) return alert("Você já votou!");

  await addDoc(collection(db, "votos"), {
    usuarioId: user.uid,
    definicaoId,
    data: hoje
  });

  const definicaoRef = doc(db, "definicoes", definicaoId);
  const snap = await getDoc(definicaoRef);
  const dados = snap.data();

  let updateData = {
    votos: increment(1)
  };

  // 🔥 VALIDAÇÃO AUTOMÁTICA
  if ((dados.votos || 0) + 1 >= 50 && dados.status === "pendente") {
    updateData.status = "em_validacao";
  }

  await updateDoc(definicaoRef, updateData);

  await setDoc(doc(db, "usuarios", autorId), {
    xp: increment(2)
  }, { merge: true });

  await setDoc(userRef, {
    votosHoje: votosHoje + 1,
    ultimoReset: hoje
  }, { merge: true });

  carregarDefinicoes();
}


// =============================
// 🕒 FORMATAR DATA
// =============================
function formatarData(timestamp) {
  if (!timestamp) return "agora mesmo";

  return timestamp.toDate().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}


// =============================
// 🌍 EXPORT GLOBAL
// =============================
window.enviarDefinicao = enviarDefinicao;
window.votar = votar;
window.auth = auth;

console.log("Dia atual:", new Date().getDay());