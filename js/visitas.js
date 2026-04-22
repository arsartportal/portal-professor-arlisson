import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const ref = doc(db, "estatisticas", "visitas");

function dataHoje() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

function chaveMesAtual() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");

  return `${ano}-${mes}`;
}

async function registrarVisita() {

  // Evita contar várias vezes na mesma aba
  const jaContou = sessionStorage.getItem("visitaRegistrada");
  if (jaContou) return;

  const snap = await getDoc(ref);

  const hoje = dataHoje();
  const mesAtual = chaveMesAtual();

  // ===============================
  // PRIMEIRA VEZ
  // ===============================

  if (!snap.exists()) {
    await setDoc(ref, {
      total: 1,
      hoje: 1,
      ultimaData: hoje,

      // contador por mês
      meses: {
        [mesAtual]: 1
      }
    });
  }

  // ===============================
  // DOCUMENTO JÁ EXISTE
  // ===============================

  else {

    const dados = snap.data();

    const atualizacao = {
      total: increment(1),

      // incrementa contador do mês atual
      [`meses.${mesAtual}`]: increment(1)
    };

    // Se mudou o dia, reinicia "hoje"
    if (dados.ultimaData !== hoje) {
      atualizacao.hoje = 1;
      atualizacao.ultimaData = hoje;
    } else {
      atualizacao.hoje = increment(1);
    }

    await updateDoc(ref, atualizacao);
  }

  sessionStorage.setItem("visitaRegistrada", "true");
}

async function carregarContador() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const dados = snap.data();

  const mesAtual = chaveMesAtual();
  const visitasMes = dados.meses?.[mesAtual] || 0;

  animarNumero("contadorVisitas", dados.total || 0, 6);
  animarNumero("visitasHoje", dados.hoje || 0, 3);

  // opcional: se existir um elemento para visitas do mês
  const elementoMes = document.getElementById("visitasMes");
  if (elementoMes) {
    animarNumero("visitasMes", visitasMes, 4);
  }
}

function animarNumero(id, valorFinal, casas) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  let atual = 0;

  const incremento = Math.max(1, Math.ceil(valorFinal / 50));

  const intervalo = setInterval(() => {
    atual += incremento;

    if (atual >= valorFinal) {
      atual = valorFinal;
      clearInterval(intervalo);

      elemento.classList.add("atualizando");

      setTimeout(() => {
        elemento.classList.remove("atualizando");
      }, 300);
    }

    elemento.textContent = atual
      .toString()
      .padStart(casas, "0");

  }, 20);
}

registrarVisita().then(() => {
  carregarContador();
});