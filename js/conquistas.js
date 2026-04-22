/* =====================================================
   🏆 SISTEMA DE CONQUISTAS — PORTAL DO PROFESSOR
   - Catálogo central de conquistas
   - Liberação segura no Firestore
   - Funções prontas para uso
===================================================== */

import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


/* =====================================================
   📦 CATÁLOGO DE CONQUISTAS
   👉 Aqui você define TODAS as conquistas do sistema
===================================================== */

export const CONQUISTAS = {
  primeira_compra: {
    nome: "Primeira Compra",
    descricao: "Você realizou sua primeira compra na loja 🛒",
    icone: "🛍️"
  },

  primeiro_login: {
    nome: "Primeiro Login",
    descricao: "Você acessou o portal pela primeira vez 🚀",
    icone: "🚀"
  },

  primeiro_acerto: {
    nome: "Primeiro Acerto",
    descricao: "Você acertou sua primeira questão 🎯",
    icone: "🎯"
  },

  cinco_acertos: {
    nome: "Mente Afiada",
    descricao: "Você acertou 5 questões 🧠",
    icone: "🧠"
  },

  dez_acertos: {
    nome: "Dominando o Jogo",
    descricao: "Você acertou 10 questões 🔥",
    icone: "🔥"
  },

  nivel_5: {
    nome: "Subindo de Nível",
    descricao: "Você alcançou o nível 5 ⭐",
    icone: "⭐"
  },

  nivel_10: {
    nome: "Aluno Destaque",
    descricao: "Você chegou ao nível 10 🏆",
    icone: "🏆"
  },

  sequencia_3_dias: {
    nome: "Consistência",
    descricao: "Você estudou por 3 dias seguidos 📅",
    icone: "📅"
  },

  primeiro_modulo: {
    nome: "Missão Cumprida",
    descricao: "Você concluiu seu primeiro módulo 📚",
    icone: "📚"
  },

  cem_xp: {
    nome: "Acumulador de XP",
    descricao: "Você alcançou 100 XP ⚡",
    icone: "⚡"
  }
};


/* =====================================================
   🧠 FUNÇÃO BASE — LIBERAR CONQUISTA
===================================================== */

export async function liberarConquista(uid, conquistaId) {
  try {
    const ref = doc(db, "progressos", uid);
    const snap = await getDoc(ref);

    const config = CONQUISTAS[conquistaId];

    // ⚠️ Validação
    if (!config) {
      console.warn("⚠️ Conquista não encontrada:", conquistaId);
      return;
    }

    const novaBadge = {
      id: conquistaId,
      nome: config.nome,
      descricao: config.descricao,
      icone: config.icone,
      concluidoEm: serverTimestamp()
    };

    /* =========================
       📄 DOCUMENTO NÃO EXISTE
    ========================= */
    if (!snap.exists()) {
      await setDoc(ref, {
        badges: {
          [conquistaId]: novaBadge
        }
      }, { merge: true });

      console.log("🏅 Conquista desbloqueada:", conquistaId);

        // 🎉 dispara popup
        if (conquistaId === "primeira_compra") {
        window.dispatchEvent(new Event("conquista-primeira-compra"));
        }
      return;
    }

    const data = snap.data();

    /* =========================
       🔒 EVITA DUPLICAÇÃO
    ========================= */
    if (data.badges?.[conquistaId]) {
      console.log("🔒 Já possui:", conquistaId);
      return;
    }

    /* =========================
       ✅ ATUALIZA BADGE
    ========================= */
    await updateDoc(ref, {
      [`badges.${conquistaId}`]: novaBadge
    });

    console.log("🏅 Conquista desbloqueada:", conquistaId);

  } catch (error) {
    console.error("❌ Erro ao liberar conquista:", error);
  }
}


/* =====================================================
   ⚡ FUNÇÕES PRONTAS (FACILITAR USO)
   👉 Use essas no sistema
===================================================== */

// 🛒 Compra
export const liberarPrimeiraCompra = (uid) =>
  liberarConquista(uid, "primeira_compra");

// 🚀 Login
export const liberarPrimeiroLogin = (uid) =>
  liberarConquista(uid, "primeiro_login");

// 🎯 Acertos
export const liberarPrimeiroAcerto = (uid) =>
  liberarConquista(uid, "primeiro_acerto");

export const liberarCincoAcertos = (uid) =>
  liberarConquista(uid, "cinco_acertos");

export const liberarDezAcertos = (uid) =>
  liberarConquista(uid, "dez_acertos");

// ⭐ Níveis
export const liberarNivel5 = (uid) =>
  liberarConquista(uid, "nivel_5");

export const liberarNivel10 = (uid) =>
  liberarConquista(uid, "nivel_10");

// 📅 Engajamento
export const liberarSequencia3Dias = (uid) =>
  liberarConquista(uid, "sequencia_3_dias");

// 📚 Conteúdo
export const liberarPrimeiroModulo = (uid) =>
  liberarConquista(uid, "primeiro_modulo");

// ⚡ XP
export const liberarCemXP = (uid) =>
  liberarConquista(uid, "cem_xp");

