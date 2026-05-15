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
    renderLoja
  } from "./loja-ui.js";

  import { obterPatentePorNivel } from "../js/patentes.js";


  // ======================================================
  // 🧠 MODAL ENGINE
  // ======================================================

  import {
    modalConfirmacao,
    modalXP,
    modalRecompensa,
    modalCaixa,
    modalLendario,
    modalLoading,
    fecharModal
  } from "./loja-modal.js";




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

let meta10kLiberada = false;
let meta15kLiberada = false;

export function carregarMetaGlobal() {

  const ref = doc(db, "config", "lojaStats");

  onSnapshot(ref, snap => {

    if (!snap.exists()) return;

    const d = snap.data();

    const total = d.totalSPGasto || 0;
    // 🔥 TOTAL DA COMUNIDADE
const spGlobal =
  document.getElementById("sp-global");

if (spGlobal){
  spGlobal.innerText =
    total.toLocaleString("pt-BR");
}
    const meta = d.meta || 25000;

    const porcentagem =
      Math.min((total / meta) * 100, 100);

    // ==================================================
    // UI BASE
    // ==================================================

    document.getElementById("barra-meta-fill").style.width =
      porcentagem + "%";

    // ==================================================
    // 🎯 MARCOS
    // ==================================================

    const marco1 =
      document.querySelector(".marco-1");

    const marco2 =
      document.querySelector(".marco-2");

    const meta1 = 10000;
    const meta2 = 15000;

    // RESET

    marco1?.classList.remove(
      "locked",
      "unlocked"
    );

    marco2?.classList.remove(
      "locked",
      "unlocked"
    );

    // ==================================================
    // 🟢 META 10K
    // ==================================================

    if (total >= meta1){

      marco1?.classList.add("unlocked");

      if (!meta10kLiberada){

        meta10kLiberada = true;

        marco1?.classList.add(
          "unlock-animation"
        );

        ativarEventoGlobal();
        soltarConfete();

        setTimeout(() => {

          marco1?.classList.remove(
            "unlock-animation"
          );

        }, 1500);
      }

    } else {

      marco1?.classList.add("locked");
    }

    // ==================================================
    // 🟢 META 15K
    // ==================================================

    if (total >= meta2){

      marco2?.classList.add("unlocked");

      if (!meta15kLiberada){

        meta15kLiberada = true;

        marco2?.classList.add(
          "unlock-animation"
        );

        ativarEventoGlobal();
        soltarConfete();

        setTimeout(() => {

          marco2?.classList.remove(
            "unlock-animation"
          );

        }, 1500);
      }

    } else {

      marco2?.classList.add("locked");
    }

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
  // 📦 CAIXA (SUPORTE COMPLETO + SAFE)
  // ======================================================

  async function abrirCaixa(item) {

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

      // 🆕 NOVA CAIXA ÉPICA
      "caixa-epica": [
        { xp: 400, chance: 50 },
        { xp: 500, chance: 30 },
        { xp: 700, chance: 15 },
        { xp: 900, chance: 5 }
      ],

      "caixa-lendaria": [
        { xp: 600, chance: 60 },
        { xp: 800, chance: 30 },
        { xp: 1000, chance: 10 }
      ]
    };

    const lista = config[item.id];

    // 🛡️ proteção contra erro
    if (!lista) {
      console.error("Caixa não configurada:", item.id);

      modalRecompensa({
        titulo: "Erro",
        descricao: "Essa caixa não está disponível.",
        raridade: "comum"
      });

      return;
    }

    // 🎲 sorteio
    let r = Math.random() * 100;
    let premio = lista[0];

    for (const p of lista) {
      r -= p.chance;
      if (r <= 0) {
        premio = p;
        break;
      }
    }

    // 🎬 loading
    modalLoading(`Abrindo ${item.nome}...`);

    
setTimeout(async () => {

  await updateDoc(userRef, {
    xp: increment(premio.xp)
  });

  // 📝 HISTÓRICO COM RESULTADO REAL
  const texto = gerarTextoHistorico(item, {
    premio: premio.xp
  });

  await registrarCompra(texto);

  modalCaixa({
    nome: item.nome,
    premio: premio.xp,
    raridade: item.raridade
  });

}, 1500);

  }




  // ======================================================
  // 🎡 ROLETA (PADRÃO MODAL ENGINE)
  // ======================================================

  async function abrirRoleta() {

    const premios = [100, 200, 300, 500, 800];
    const ganho = premios[Math.floor(Math.random() * premios.length)];

    modalLoading("Girando roleta...");


setTimeout(async () => {

  await updateDoc(userRef, {
    xp: increment(ganho)
  });

  const texto = gerarTextoHistorico(
    { id: "roleta-cientifica", nome: "Roleta" },
    { ganho }
  );

  await registrarCompra(texto);

  modalXP(ganho);

}, 2000);

  }

  // ======================================================
  // 💰 REGISTROS (VERSÃO CORRETA E SEGURA)
  // ======================================================

  async function registrarCompra(itemTexto) {

    const user = auth.currentUser;
    if (!user) return;

    try {

      // 📄 referência do usuário (sem conflito com variável global)
      const userDocRef = doc(db, "usuarios", user.uid);
      const snap = await getDoc(userDocRef);

      if (!snap.exists()) return;

      const dados = snap.data();

      await addDoc(collection(db, "lojaHistorico"), {
        uid: user.uid,
        aluno: dados.nome || user.email,

        // 🏫 dados adicionais
        escola: dados.escola || "Não informado",
        serie: dados.serie || "—",
        turma: dados.turma || "—",

        item: itemTexto,
        data: serverTimestamp()
      });

    } catch (erro) {
      console.error("Erro ao registrar compra:", erro);
    }
  }

  // ======================================================
  // 📝 TEXTO DO HISTÓRICO (VERSÃO FINAL COMPLETA)
  // ======================================================

  function gerarTextoHistorico(item, extra = {}) {

    // ==================================================
    // 📦 CAIXAS (COM RESULTADO)
    // ==================================================
    if (item.id?.includes("caixa")) {

      if (extra.premio) {
        return `Abriu ${item.nome} e recebeu +${extra.premio} XP`;
      }

      return `Abriu ${item.nome}`;
    }

    // ==================================================
    // 🎡 ROLETA (COM RESULTADO)
    // ==================================================
    if (item.id === "roleta-cientifica") {

      if (extra.ganho) {
        return `Girou a roleta científica e ganhou +${extra.ganho} XP`;
      }

      return `Girou a roleta científica`;
    }

    // ==================================================
    // ⚡ XP
    // ==================================================
    if (item.xp) {
      return `Resgatou +${item.xp} XP`;
    }

    // ==================================================
    // 🎟️ FICHAS
    // ==================================================
    if (item.fichas) {
      return `Resgatou ${item.fichas} fichas`;
    }

    // ==================================================
    // 🎯 BÔNUS PROVA
    // ==================================================
    
if (item.tipo === "prova") {
  return `Resgatou +${item.valor} ponto${item.valor > 1 ? "s" : ""} para a prova`;
}


    // ==================================================
    // 🏆 RANKING
    // ==================================================
    if (item.tipo === "ranking-fichas") {
      return `Resgatou ${item.quantidade} acessos ao ranking`;
    }

    // ==================================================
    // 🔁 REVANCHE
    // ==================================================
    if (item.tipo === "prova-extra") {
      return `Resgatou uma revanche acadêmica`;
    }

    // ==================================================
    // 🧰 FERRAMENTA
    // ==================================================
    if (item.tipo === "ferramenta") {
      return `Desbloqueou ferramenta: ${item.nome}`;
    }

    // ==================================================
    // 🔑 PRÊMIO FÍSICO
    // ==================================================
    if (item.id === "chaveiro-univers3d") {
      return `Solicitou prêmio físico`;
    }

    // ==================================================
    // ⚠️ FALLBACK
    // ==================================================
    return `Interagiu com ${item.nome || "item desconhecido"}`;
  }



  // ======================================================
  // 🛒 COMPRA (APENAS CONFIRMAÇÃO)
  // ======================================================

  async function comprar(id) {

    if (compraEmAndamento) return;

    const item = recompensas.find(r => r.id === id);
    if (!item) return;

    // ❌ SP insuficiente
    if (spAtual < item.preco) {
      modalRecompensa({
        titulo: "❌ SP insuficiente",
        descricao: "Você não possui pontos suficientes.",
        raridade: "comum"
      });
      return;
    }


  modalConfirmacao(item, async () => {

    if (compraEmAndamento) return; // 🛡️ proteção extra

    await executarCompra(item);
  });


  }

  // ======================================================
  // 🚀 EXECUTAR COMPRA (LÓGICA COMPLETA + FAILSAFE)
  // ======================================================

  async function executarCompra(item) {

    if (compraEmAndamento) return;
    compraEmAndamento = true;

    try {

      // 🔄 busca dados atualizados
      const snap = await getDoc(userRef);
      const d = snap.data();

      // 🛡️ validação extra de saldo (evita inconsistência)
      if ((d.sciencePoints || 0) < item.preco) {

        modalRecompensa({
          titulo: "❌ SP insuficiente",
          descricao: "Seu saldo foi atualizado. Tente novamente.",
          raridade: "comum"
        });

        return;
      }

      const spDepois = d.sciencePoints - item.preco;

      // 📝 HISTÓRICO
      
      // ==================================================
      // ⚡ XP
      // ==================================================
      if (item.xp) {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          xp: increment(item.xp)
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalXP(item.xp);
      }

      // ==================================================
      // 🎟️ FICHAS
      // ==================================================
      else if (item.fichas) {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          fichasLab: increment(item.fichas)
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalRecompensa({
          titulo: "🎟️ Fichas recebidas",
          descricao: `+${item.fichas} fichas`,
          raridade: item.raridade
        });
      }

      // ==================================================
      // 🎯 BÔNUS PROVA
      // ==================================================
      else if (item.tipo === "prova") {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          bonusProvaDisponivel: increment(item.valor)
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalRecompensa({
          titulo: "🎯 Bônus de prova",
          descricao: `+${item.valor} ponto`,
          raridade: item.raridade
        });
      }

      // ==================================================
      // 🏆 RANKING
      // ==================================================
      else if (item.tipo === "ranking-fichas") {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          rankingFichas: increment(item.quantidade)
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalRecompensa({
          titulo: "🏆 Fichas de ranking",
          descricao: `+${item.quantidade} acessos`,
          raridade: item.raridade
        });
      }

      // ==================================================
      // 🔁 REVANCHE
      // ==================================================
      else if (item.tipo === "prova-extra") {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          provaExtraDisponivel: increment(1)
        });

          await atualizarSPGlobal(item.preco);
          await atualizarRankingUsuario(item.preco);

        modalLendario({
          titulo: "🔁 Revanche Acadêmica",
          descricao: "Você pode refazer uma prova!"
        });
      }

      // ==================================================
      // 🧰 FERRAMENTA
      // ==================================================
      else if (item.tipo === "ferramenta") {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          [`tools.${item.tool}`]: true
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalLendario({
          titulo: "🧰 Ferramenta desbloqueada",
          descricao: item.nome
        });
      }

      // ==================================================
      // 📦 CAIXA
      // ==================================================
      else if (item.id.includes("caixa")) {

        await updateDoc(userRef, {
          sciencePoints: spDepois
        });

        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        await abrirCaixa(item);
      }

      // ==================================================
      // 🎡 ROLETA
      // ==================================================
      else if (item.id === "roleta-cientifica") {

        await updateDoc(userRef, {
          sciencePoints: spDepois
        });

          await atualizarSPGlobal(item.preco);
          await atualizarRankingUsuario(item.preco);

        await abrirRoleta();
      }

      // ==================================================
      // 🔑 PRÊMIO FÍSICO
      // ==================================================
      else if (item.id === "chaveiro-univers3d") {

        await updateDoc(userRef, {
          sciencePoints: spDepois,
          premioSolicitado: true
        });
        
        await atualizarSPGlobal(item.preco);
        await atualizarRankingUsuario(item.preco);

        modalLendario({
          titulo: "🔑 Prêmio solicitado",
          descricao: "Seu pedido foi enviado com sucesso!"
        });
      }

      // ==================================================
      // ⚠️ FAILSAFE (ITEM NÃO TRATADO)
      // ==================================================
      else {

        console.warn("Item não tratado:", item);

        modalRecompensa({
          titulo: "Erro",
          descricao: "Esse item ainda não está configurado.",
          raridade: "comum"
        });
      }


      
// ==================================================
// 📝 REGISTRA HISTÓRICO (EXCETO CAIXA/ROLETA)
// ==================================================

if (
  !item.id.includes("caixa") &&
  item.id !== "roleta-cientifica"
) {
  const texto = gerarTextoHistorico(item);
  await registrarCompra(texto);
}


      // ==================================================
      // 🔄 ATUALIZA UI
      // ==================================================
      spAtual = spDepois;

      atualizarSPNaTela(spAtual, bonusAtual);
      renderLoja();

    } catch (erro) {
      console.error("Erro na compra:", erro);
    } finally {
      compraEmAndamento = false;
    }
  }

  async function atualizarSPGlobal(valor) {
    const statsRef = doc(db, "config", "lojaStats");

    await updateDoc(statsRef, {
      totalSPGasto: increment(valor)
    });
  }


// ======================================================
// 📦 ESTOQUE
// ======================================================

let estoqueChaveiro = 0;

export function getEstoqueChaveiro() {
  return estoqueChaveiro;
}

export function carregarEstoque() {
  const ref = doc(db, "loja", "chaveiro-univers3d");

  onSnapshot(ref, (snap) => {
    if (!snap.exists()) return;

    estoqueChaveiro = snap.data().estoque || 0;

    renderLoja(); // 🔥 re-render automático
  });
}



// ======================================================
// ⏳ TEMPO GLOBAL (VERSÃO FINAL)
// ======================================================

let serverTimeOffset = 0;

export function getAgora() {
  return new Date(Date.now() + serverTimeOffset);
}

export async function sincronizarTempo() {
  try {
    const ref = doc(db, "config", "tempo");

    await setDoc(ref, { now: serverTimestamp() }, { merge: true });

    const snap = await getDoc(ref);
    const serverNow = snap.data().now.toDate();

    const localNow = new Date();

    serverTimeOffset = serverNow - localNow;

  } catch {
    serverTimeOffset = 0;
  }
}


// ======================================================
// ⏳ CONTADORES
// ======================================================

import { datasLiberacao } from "./loja-data.js";

export function atualizarContadores() {

  const agora = getAgora();

  document.querySelectorAll(".contador-loja").forEach(el => {

    const tipo = el.dataset.tipo;
    const data = datasLiberacao[tipo];

    if (!data) return;

    const diff = data - agora;

    if (diff <= 0) {
      el.innerText = "✅ Liberado!";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.innerText = `⏳ ${d}d ${h}h ${m}m ${s}s`;
  });
}


// ======================================================
// 🏆 ATUALIZAR RANKING DE GASTO
// ======================================================

async function atualizarRankingUsuario(valor) {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "rankingGasto", user.uid);

  try {

    await setDoc(ref, {
      nome: user.displayName || user.email,
      totalGasto: increment(valor)
    }, { merge: true });

  } catch (erro) {
    console.error("Erro ao atualizar ranking:", erro);
  }
}

// ======================================================
// 🎉 CONFETE
// ======================================================

function soltarConfete(){

  const cores = [
    "#22c55e",
    "#38bdf8",
    "#facc15",
    "#ec4899",
    "#ffffff"
  ];

  for(let i = 0; i < 120; i++){

    const confete =
      document.createElement("div");

    confete.className = "confete";

    confete.style.left =
      Math.random() * 100 + "vw";

    confete.style.background =
      cores[
        Math.floor(
          Math.random() * cores.length
        )
      ];

    confete.style.animationDuration =
      (Math.random() * 3 + 2) + "s";

    confete.style.opacity =
      Math.random();

    document.body.appendChild(confete);

    setTimeout(() => {
      confete.remove();
    }, 5000);
  }
}

// ======================================================
// 🌍 EVENTO GLOBAL
// ======================================================

function ativarEventoGlobal(){

  const card =
    document.querySelector(".card-sp-global");

  card?.classList.add("evento-ativo");
}
