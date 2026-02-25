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

async function registrarVisita() {

  const jaContou = sessionStorage.getItem("visitaRegistrada");
  if (jaContou) return;

  const snap = await getDoc(ref);
  const hoje = dataHoje();

  if (!snap.exists()) {
    await setDoc(ref, {
      total: 1,
      hoje: 1,
      ultimaData: hoje
    });
  } else {

    const dados = snap.data();

    if (dados.ultimaData !== hoje) {
      await updateDoc(ref, {
        total: increment(1),
        hoje: 1,
        ultimaData: hoje
      });
    } else {
      await updateDoc(ref, {
        total: increment(1),
        hoje: increment(1)
      });
    }
  }

  sessionStorage.setItem("visitaRegistrada", "true");
}

async function carregarContador() {
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const dados = snap.data();
  animarNumero("contadorVisitas", dados.total, 6);
  animarNumero("visitasHoje", dados.hoje, 3);
}

function animarNumero(id, valorFinal, casas) {
  const elemento = document.getElementById(id);
  let atual = 0;

  const incremento = Math.ceil(valorFinal / 50);

  const intervalo = setInterval(() => {
    atual += incremento;

    if (atual >= valorFinal) {
      atual = valorFinal;
      clearInterval(intervalo);
    }

    elemento.textContent = atual
      .toString()
      .padStart(casas, "0");
  }, 20);
}

registrarVisita().then(() => {
  carregarContador();
});