// ======================================================
// 🧠 DADOS DA LOJA
// ======================================================

export const recompensas = [

  // ======================================================
  // ⚡ XP
  // ======================================================
  { id: "xp20", nome: "⚡ +20 XP", preco: 1, xp: 20, raridade: "comum", ordem: 1, descricao: "Pequeno ganho de experiência." },
  { id: "xp50", nome: "⚡ +50 XP", preco: 2, xp: 50, raridade: "raro", ordem: 2, descricao: "Bônus médio de experiência." },
  { id: "xp100", nome: "⚡ +100 XP", preco: 3, xp: 100, raridade: "epico", ordem: 3, descricao: "Grande avanço científico." },
  { id: "xp1000", nome: "⚡ +1000 XP", preco: 25, xp: 1000, raridade: "lendario", ordem: 4, descricao: "Salto massivo de experiência." },


  // ======================================================
  // 🎟️ FICHAS QUIZ
  // ======================================================
  { id: "ficha1", nome: "🎟️ 1 Ingresso", preco: 5, fichas: 1, raridade: "comum", ordem: 1, descricao: "Acesso a 1 partida do Quiz Científico." },
  { id: "ficha3", nome: "🎟️ Pacote 3 Ingressos", preco: 12, fichas: 3, raridade: "raro", ordem: 2, descricao: "Leve desconto para múltiplas tentativas." },
  { id: "ficha7", nome: "🎟️ Pacote 7 Ingressos", preco: 25, fichas: 7, raridade: "epico", ordem: 3, descricao: "Melhor custo-benefício." },
  { id: "ficha15", nome: "🎟️ Pacote 15 Ingressos", preco: 45, fichas: 15, raridade: "lendario", ordem: 4, descricao: "Pacote máximo para dominar o ranking." },


  // ======================================================
  // 🎯 BÔNUS PROVA
  // ======================================================
  { id: "bonus-05", nome: "⚪ +0,5 ponto", preco: 50, tipo: "prova", subtipo: "bonus", valor: 0.5, raridade: "comum", ordem: 10, descricao: "Adiciona +0,5 ponto na prova." },
  { id: "bonus-10", nome: "🔵 +1,0 ponto", preco: 90, tipo: "prova", subtipo: "bonus", valor: 1.0, raridade: "raro", ordem: 11, descricao: "Adiciona +1,0 ponto na prova." },
  { id: "bonus-15", nome: "🟣 +1,5 ponto", preco: 130, tipo: "prova", subtipo: "bonus", valor: 1.5, raridade: "epico", ordem: 12, descricao: "Grande vantagem na prova." },
  { id: "bonus-20", nome: "🟡 +2,0 pontos", preco: 170, tipo: "prova", subtipo: "bonus", valor: 2.0, raridade: "lendario", ordem: 13, descricao: "Bônus máximo permitido na prova." },


  // ======================================================
  // 📦 CAIXAS (COM PROBABILIDADES)
  // ======================================================
  {
    id: "caixa-basica",
    nome: "🧪 Caixa Básica",
    preco: 5,
    raridade: "comum",
    ordem: 20,
    descricao: `
      Ideal para quem está começando.

      <span class="titulo-prob">Possíveis recompensas</span>

      <div class="linha-prob comum"><span>⚡ 100 XP</span><strong>40%</strong></div>
      <div class="linha-prob comum"><span>⚡ 150 XP</span><strong>35%</strong></div>
      <div class="linha-prob raro"><span>⚡ 200 XP</span><strong>20%</strong></div>
      <div class="linha-prob raro"><span>⚡ 250 XP</span><strong>5%</strong></div>

      <div class="aviso-caixa">Recompensas aleatórias.</div>
    `
  },

  {
    id: "caixa-cientifica",
    nome: "⚛ Caixa Científica",
    preco: 10,
    raridade: "raro",
    ordem: 21,
    descricao: `
      Caixa intermediária com chance de itens épicos.

      <span class="titulo-prob">Possíveis recompensas</span>

      <div class="linha-prob raro"><span>⚡ 200 XP</span><strong>45%</strong></div>
      <div class="linha-prob raro"><span>⚡ 300 XP</span><strong>35%</strong></div>
      <div class="linha-prob epico"><span>⚡ 400 XP</span><strong>15%</strong></div>
      <div class="linha-prob epico"><span>⚡ 500 XP</span><strong>5%</strong></div>

      <div class="aviso-caixa">Chance de recompensas épicas.</div>
    `
  },

  {
  id: "caixa-epica",
  nome: "🧬 Caixa Épica",
  preco: 15,
  raridade: "epico",
  ordem: 21.5, // 🔥 ENTRE 21 e 22
  descricao: `
    Caixa avançada com alta chance de recompensas épicas.

    <span class="titulo-prob">Possíveis recompensas</span>

    <div class="linha-prob epico"><span>⚡ 400 XP</span><strong>50%</strong></div>
    <div class="linha-prob epico"><span>⚡ 500 XP</span><strong>30%</strong></div>
    <div class="linha-prob lendario"><span>⚡ 700 XP</span><strong>15%</strong></div>
    <div class="linha-prob lendario"><span>⚡ 900 XP</span><strong>5%</strong></div>

    <div class="aviso-caixa">Alta chance de recompensas épicas.</div>
  `
},

  {
    id: "caixa-lendaria",
    nome: "👑 Caixa Lendária",
    preco: 20,
    raridade: "lendario",
    ordem: 22,
    descricao: `
      A caixa mais poderosa da loja.

      <span class="titulo-prob">Possíveis recompensas</span>

      <div class="linha-prob epico"><span>⚡ 600 XP</span><strong>60%</strong></div>
      <div class="linha-prob lendario"><span>⚡ 800 XP</span><strong>30%</strong></div>
      <div class="linha-prob lendario"><span>⚡ 1000 XP</span><strong>10%</strong></div>

      <div class="aviso-caixa">Altíssima chance de recompensa lendária.</div>
    `
  },


  // ======================================================
  // 🔁 PROVA EXTRA
  // ======================================================
  {
    id: "revanche-academica",
    nome: "🔁 Revanche Acadêmica",
    preco: 120,
    tipo: "prova-extra",
    subtipo: "oportunidade",
    raridade: "epico",
    ordem: 15,
    descricao: "Permite refazer uma prova para melhorar sua nota."
  },


  // ======================================================
  // 🎡 ROLETA
  // ======================================================
  {
    id: "roleta-cientifica",
    nome: "🎡 Roleta Científica",
    preco: 100,
    raridade: "epico",
    ordem: 43,
    descricao: "Gire e receba XP aleatório."
  },


  // ======================================================
  // 🏆 RANKING
  // ======================================================
  { id: "ranking-1ficha", nome: "🎟️ 1 Ficha de Ranking", preco: 5, tipo: "ranking-fichas", quantidade: 1, raridade: "comum", ordem: 39, descricao: "Permite 1 acesso ao ranking." },
  { id: "ranking-5fichas", nome: "🏆 Pacote 5 Fichas", preco: 20, tipo: "ranking-fichas", quantidade: 5, raridade: "raro", ordem: 40, descricao: "Pacote econômico de acesso ao ranking." },
  { id: "ranking-15fichas", nome: "🥈 Pacote 15 Fichas", preco: 45, tipo: "ranking-fichas", quantidade: 15, raridade: "epico", ordem: 41, descricao: "Pacote avançado para múltiplas tentativas." },
  { id: "ranking-50fichas", nome: "👑 Pacote 50 Fichas", preco: 120, tipo: "ranking-fichas", quantidade: 50, raridade: "lendario", ordem: 42, descricao: "Pacote máximo para dominar o ranking." },


  // ======================================================
  // 🧰 FERRAMENTAS
  // ======================================================
  { id: "tool-pa", nome: "📈 Ferramenta PA", preco: 80, tipo: "ferramenta", tool: "pa", raridade: "comum", ordem: 90, descricao: "Desbloqueia Progressão Aritmética." },
  { id: "tool-pg", nome: "📉 Ferramenta PG", preco: 100, tipo: "ferramenta", tool: "pg", raridade: "raro", ordem: 91, descricao: "Desbloqueia Progressão Geométrica." },
  { id: "tool-paxpg", nome: "⚖️ Comparador PA x PG", preco: 130, tipo: "ferramenta", tool: "paxpg", raridade: "epico", ordem: 92, descricao: "Compare PA e PG lado a lado." },
  { id: "tool-estatistica", nome: "📊 Estatística", preco: 160, tipo: "ferramenta", tool: "estatistica", raridade: "lendario", ordem: 93, descricao: "Gráficos e análises estatísticas." },


  // ======================================================
  // 🔑 PRÊMIO
  // ======================================================
  {
    id: "chaveiro-univers3d",
    nome: "🔑 Chaveiro Univers3D",
    preco: 1500,
    lendario: true,
    raridade: "lendario",
    ordem: 50,
    descricao: "Prêmio físico exclusivo da plataforma."
  }

];


// ======================================================
// 🗓️ DATAS
// ======================================================

export const dataInauguracao = new Date("2026-04-15T00:00:00");

export const datasLiberacao = {
  caixas: new Date("2026-04-25T10:00:00"),
  ranking: new Date("2026-04-30T10:00:00"),
  roleta: new Date("2026-05-30T12:00:00"),
  chaveiro: new Date("2026-11-23T18:00:00"),
  prova: new Date("2026-04-10T08:00:00"),
  fichas: new Date("2026-06-15T13:30:00")
};