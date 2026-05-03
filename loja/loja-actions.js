// ======================================================
// 🧠 IMPORTS
// ======================================================

import { auth, db } from "../js/firebase.js";
import { recompensas } from "./loja-data.js";

import {
  doc, getDoc, updateDoc, setDoc,
  collection, addDoc, query, orderBy, limit,
  onSnapshot, increment, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  atualizarSPNaTela,
  renderLoja,
  setServerTimeOffset
} from "./loja-ui.js";

import { obterPatentePorNivel } from "../js/patentes.js";


// ======================================================
// 🧠 ESTADO
// ======================================================

let userRef = null;
let spAtual = 0;
let bonusAtual = 0;
let serverOffset = 0;
let compraEmAndamento = false;


// ======================================================
// 🚀 INIT
// ======================================================

export function iniciarSistemaCompra(ref) {
  userRef = ref;
}

export function iniciarEventos() {
  window.comprar = comprar;
  window.fecharModal = fecharModal;
}


// ======================================================
// 🔥 SP REALTIME
// ======================================================

export function carregarSPTempoReal(ref, callback) {

  onSnapshot(ref, snap => {
    if (!snap.exists()) return;

    const d = snap.data();

    spAtual = d.sciencePoints || 0;
    bonusAtual = d.bonusProvaDisponivel || 0;

    callback?.(spAtual, bonusAtual);
  });
}


// ======================================================
// 🌍 META GLOBAL
// ======================================================

export function carregarSPGlobal() {

  const ref = doc(db, "config", "lojaStats");

  onSnapshot(ref, snap => {

    if (!snap.exists()) return;

    const total = snap.data().totalSPGasto || 0;
    const el = document.getElementById("sp-global");

    if (el) el.innerText = total.toLocaleString("pt-BR");
  });
}

export function carregarMetaGlobal() {

  const ref = doc(db, "config", "lojaStats");

  onSnapshot(ref, snap => {

    if (!snap.exists()) return;

    const d = snap.data();

    const total = d.totalSPGasto || 0;
    const meta = d.meta || 10000;

    const porcentagem = Math.min((total / meta) * 100, 100);

    document.getElementById("meta-valor").innerText = total.toLocaleString("pt-BR");
    document.getElementById("meta-max").innerText = meta.toLocaleString("pt-BR");

    document.getElementById("barra-meta-fill").style.width = porcentagem + "%";
  });
}


// ======================================================
// 🏆 RANKING (TOP 10 ORGANIZADO)
// ======================================================

export function carregarRankingGasto() {

  const q = query(
    collection(db, "rankingGasto"),
    orderBy("totalGasto", "desc"),
    limit(10)
  );

  const el = document.getElementById("ranking-sp");

  onSnapshot(q, snap => {

    el.innerHTML = "";

    const medalhas = ["🥇", "🥈", "🥉"];
    const bonus = [1000, 500, 300];

    snap.docs.forEach((docSnap, i) => {

      const d = docSnap.data();
      const pos = medalhas[i] || `#${i+1}`;

      el.innerHTML += `
        <div class="item-ranking top-${i+1}">

          <div class="left">
            <span class="pos">${pos}</span>
            <span class="nome">${d.nome}</span>

            ${
              i < 3
                ? `<span class="xp">+${bonus[i]} XP</span>`
                : ""
            }
          </div>

          <div class="right">
            ${(d.totalGasto || 0).toLocaleString("pt-BR")} SP
          </div>

        </div>
      `;
    });
  });
}


// ======================================================
// 📜 HISTÓRICO COMPLETO (COM PATENTE CORRETA)
// ======================================================


const cacheUsuarios = {};

export function carregarHistorico() {

  const q = query(
    collection(db, "lojaHistorico"),
    orderBy("data", "desc"),
    limit(20)
  );

  const el = document.getElementById("feedCompras");
  if (!el) return;

  onSnapshot(q, async (snap) => {

    el.innerHTML = "";

    for (const docSnap of snap.docs) {

      const d = docSnap.data();

      const data = d.data?.toDate();
      if (!data) continue;

      const dataFormatada = data.toLocaleString("pt-BR");

      // ==================================================
      // 🎖️ PATENTE (COM CACHE + XP REAL)
      // ==================================================

      let patenteImg = "../assets/ranks/SeasonalRank0-0.png";

if (d.uid) {

  if (!cacheUsuarios[d.uid]) {
    try {
      const userDoc = await getDoc(doc(db, "usuarios", d.uid));

      cacheUsuarios[d.uid] = userDoc.exists()
        ? userDoc.data()
        : {};
    } catch {
      cacheUsuarios[d.uid] = {};
    }
  }

  const userData = cacheUsuarios[d.uid] || {};

  // ✅ USA O NIVEL REAL DO FIREBASE
  const nivel = userData.nivel || 0;

  const patente = obterPatentePorNivel(nivel);

  patenteImg = patente.imagem.replace("/assets", "../assets");
}

      // ==================================================
      // 🎨 CLASSE DINÂMICA
      // ==================================================

      let classe = "feed-item";

      const itemTexto = typeof d.item === "string"
        ? d.item
        : d.item?.nome || "item";

      if (itemTexto.includes("Caixa")) classe += " feed-caixa";
      if (itemTexto.includes("Roleta")) classe += " feed-roleta";
      if (itemTexto.includes("Chaveiro")) classe += " feed-lendario";

      // ==================================================
      // 🚨 ALERTAS IMPORTANTES
      // ==================================================

      if (itemTexto.includes("Lendária")) {
        window.globalAlert?.(`🔥 ${d.aluno} abriu uma CAIXA LENDÁRIA!`);
      }

      // ==================================================
      // 🏫 INFO COMPLETA
      // ==================================================

      const escola = d.escola || "—";
      const serie = d.serie || "—";
      const turma = d.turma || "";

      // ==================================================
      // 🎨 RENDER
      // ==================================================

      el.innerHTML += `
        <div class="${classe}">

          <div class="feed-avatar">
            <img src="${patenteImg}">
          </div>

          <div class="feed-msg">
            <b>${d.aluno}</b> ${itemTexto}

            <div class="feed-info">
              🏫 ${escola} • ${serie} ${turma}
              <br>
              🕒 ${dataFormatada}
            </div>
          </div>

        </div>
      `;
    }

  });
}


// ======================================================
// 🧠 TEMPO
// ======================================================

export async function sincronizarTempo() {

  const ref = doc(db, "config", "tempo");

  await setDoc(ref, { now: serverTimestamp() }, { merge: true });

  const snap = await getDoc(ref);

  const server = snap.data().now.toDate();
  const local = new Date();

  serverOffset = server - local;

  setServerTimeOffset(serverOffset);
}

export function atualizarContadores() {}

export async function carregarEstoque() {}


// ======================================================
// 💬 POPUP
// ======================================================

function mostrarPopup(titulo, texto) {

  const el = document.getElementById("modal");

  el.innerHTML = `
    <div class="modal">
      <div class="modal-box">
        <h2>${titulo}</h2>
        <p>${texto}</p>
        <button onclick="fecharModal()">Continuar</button>
      </div>
    </div>
  `;
}

function fecharModal() {
  document.getElementById("modal").innerHTML = "";
}


// ======================================================
// 🎁 CAIXA
// ======================================================

function abrirCaixa(tipo) {

  const config = {
    "caixa-basica": [
      { xp: 100, chance: 40 },
      { xp: 150, chance: 35 },
      { xp: 200, chance: 20 },
      { xp: 250, chance: 5 }
    ],
    "caixa-cientifica": [
      { xp: 200, chance: 45 },
      { xp: 300, chance: 35 },
      { xp: 400, chance: 15 },
      { xp: 500, chance: 5 }
    ],
    "caixa-lendaria": [
      { xp: 600, chance: 60 },
      { xp: 800, chance: 30 },
      { xp: 1000, chance: 10 }
    ]
  };

  const lista = config[tipo];

  let r = Math.random() * 100;
  let premio = lista[0];

  for (const item of lista) {
    r -= item.chance;
    if (r <= 0) {
      premio = item;
      break;
    }
  }

  mostrarPopup("📦 Abrindo...", "Aguarde...");

  setTimeout(async () => {

    await updateDoc(userRef, {
      xp: increment(premio.xp)
    });

    mostrarPopup("🎉 Recompensa!", `⚡ ${premio.xp} XP`);

  }, 1500);
}


// ======================================================
// 🎡 ROLETA
// ======================================================

function abrirRoleta() {

  const premios = [100, 200, 300, 500, 800];

  const ganho = premios[Math.floor(Math.random() * premios.length)];

  mostrarPopup("🎡 Girando...", "Boa sorte!");

  setTimeout(async () => {

    await updateDoc(userRef, {
      xp: increment(ganho)
    });

    mostrarPopup("🎉 Resultado!", `⚡ ${ganho} XP`);

  }, 2000);
}


// ======================================================
// 💰 REGISTROS
// ======================================================

async function registrarCompra(itemTexto) {

  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const dados = snap.data();

  await addDoc(collection(db, "lojaHistorico"), {
    uid: user.uid,
    aluno: dados.nome || user.email,

    // 🔥 AQUI É O QUE TÁ FALTANDO
    escola: dados.escola || "Não informado",
    serie: dados.serie || "—",
    turma: dados.turma || "—",

    item: itemTexto,
    data: serverTimestamp()
  });
}

function gerarTextoHistorico(item) {

  if (item.xp) return `comprou ${item.nome}`;

  if (item.fichas) return `comprou ${item.nome}`;

  if (item.tipo === "prova") return `adquiriu bônus de prova (+${item.valor})`;

  if (item.tipo === "ranking-fichas") return `comprou fichas de ranking`;

  if (item.tipo === "prova-extra") return `ativou Revanche Acadêmica`;

  if (item.tipo === "ferramenta") return `desbloqueou ${item.nome}`;

  if (item.id.includes("caixa")) return `abriu ${item.nome}`;

  if (item.id === "roleta-cientifica") return `girou a Roleta Científica`;

  if (item.id === "chaveiro-univers3d") return `resgatou prêmio lendário`;

  return item.nome;
}


// ======================================================
// 🛒 COMPRA MASTER
// ======================================================

async function comprar(id) {

  if (compraEmAndamento) return;
  compraEmAndamento = true;

  try {

    const item = recompensas.find(r => r.id === id);
    if (!item) return;

    if (spAtual < item.preco) {
      mostrarPopup("❌", "SP insuficiente");
      return;
    }

    const snap = await getDoc(userRef);
    const d = snap.data();

    const spDepois = d.sciencePoints - item.preco;

    const texto = gerarTextoHistorico(item);
await registrarCompra(texto);

    // 🔀 SWITCH

    if (item.xp) {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        xp: increment(item.xp)
      });
      mostrarPopup("⚡ XP", `+${item.xp} XP`);
    }

    else if (item.fichas) {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        fichasLab: increment(item.fichas)
      });
      mostrarPopup("🎟️ Fichas", `+${item.fichas}`);
    }

    else if (item.tipo === "prova") {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        bonusProvaDisponivel: increment(item.valor)
      });
      mostrarPopup("🎯 Bônus", `+${item.valor}`);
    }

    else if (item.tipo === "ranking-fichas") {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        rankingFichas: increment(item.quantidade)
      });
      mostrarPopup("🏆 Ranking", `+${item.quantidade}`);
    }

    else if (item.tipo === "prova-extra") {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        provaExtraDisponivel: increment(1)
      });
      mostrarPopup("🔁 Revanche", "Liberada!");
    }

    else if (item.tipo === "ferramenta") {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        [`tools.${item.tool}`]: true
      });
      mostrarPopup("🧰 Ferramenta", "Desbloqueada!");
    }

    else if (id.includes("caixa")) {
      await updateDoc(userRef, { sciencePoints: spDepois });
      abrirCaixa(id);
    }

    else if (id === "roleta-cientifica") {
      await updateDoc(userRef, { sciencePoints: spDepois });
      abrirRoleta();
    }

    else if (id === "chaveiro-univers3d") {
      await updateDoc(userRef, {
        sciencePoints: spDepois,
        premioSolicitado: true
      });
      mostrarPopup("🔑", "Solicitação enviada!");
    }

    spAtual = spDepois;

    atualizarSPNaTela(spAtual, bonusAtual);
    renderLoja();

  } catch (e) {
    console.error(e);
  } finally {
    compraEmAndamento = false;
  }
}