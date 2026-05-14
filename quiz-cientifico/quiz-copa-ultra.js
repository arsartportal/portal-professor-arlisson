/* ======================================================
🔥 IMPORTS
====================================================== */
import { auth, db } from "../js/firebase.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  setDoc,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { adicionarSP } from "../js/science-points.js";

let respondendo = false;

/* ======================================================
⚽ PERGUNTAS (TEMA COPA)
====================================================== */
const perguntas = [

/* =========================
🏆 REGRAS DO FUTEBOL
========================= */

{ pergunta:"Quantos jogadores cada time tem em campo?", opcoes:["9","10","11","12"], correta:2 },
{ pergunta:"Duração oficial de uma partida?", opcoes:["80 min","90 min","100 min","120 min"], correta:1 },
{ pergunta:"Quem pode usar as mãos durante o jogo?", opcoes:["Todos","Só o goleiro","Defesa","Capitão"], correta:1 },
{ pergunta:"Cartão vermelho significa:", opcoes:["Advertência","Substituição","Expulsão","Falta leve"], correta:2 },
{ pergunta:"O impedimento ocorre quando:", opcoes:["Jogador está atrás","Está à frente do penúltimo defensor no passe","Bola sai","Falta dura"], correta:1 },
{ pergunta:"Quantos árbitros principais há em campo?", opcoes:["1","2","3","4"], correta:0 },
{ pergunta:"Escanteio ocorre quando:", opcoes:["Falta","Bola sai pela linha de fundo (defesa toca por último)","Gol","Impedimento"], correta:1 },
{ pergunta:"Pênalti é cobrado de qual distância?", opcoes:["10m","11m","12m","9m"], correta:1 },
{ pergunta:"Quantas substituições são permitidas atualmente?", opcoes:["3","4","5","6"], correta:2 },
{ pergunta:"Tempo total da prorrogação:", opcoes:["15 min","20 min","30 min","40 min"], correta:2 },
{ pergunta:"Se um jogador chuta e a bola desvia no adversário antes de entrar no gol:", opcoes:["Não vale","Vale normalmente","Depende do árbitro","É escanteio"], correta:1 },

{ pergunta:"Um jogador em impedimento pode participar da jogada quando:", opcoes:["Corre rápido","Recebe passe de lateral","Está parado","Está atrás do meio campo"], correta:1 },

{ pergunta:"Se o goleiro sai da área e toca a bola com a mão:", opcoes:["Nada acontece","Cartão amarelo","Falta","Pênalti"], correta:2 },

{ pergunta:"Um gol contra é validado quando:", opcoes:["Sempre","Nunca","Somente se não houver impedimento","Se o árbitro quiser"], correta:2 },

/* =========================
🌍 HISTÓRIA DAS COPAS
========================= */

{ pergunta:"Primeira Copa do Mundo foi em:", opcoes:["1930","1940","1920","1950"], correta:0 },
{ pergunta:"País sede da primeira Copa:", opcoes:["Brasil","Uruguai","França","Inglaterra"], correta:1 },
{ pergunta:"Brasil tem quantos títulos mundiais?", opcoes:["3","4","5","6"], correta:2 },
{ pergunta:"Quem ganhou a Copa de 2002?", opcoes:["Alemanha","Brasil","França","Argentina"], correta:1 },
{ pergunta:"Quem ganhou a Copa de 2014?", opcoes:["Brasil","Alemanha","Argentina","Espanha"], correta:1 },
{ pergunta:"Quem ganhou a Copa de 2018?", opcoes:["França","Croácia","Brasil","Alemanha"], correta:0 },
{ pergunta:"Quem ganhou a Copa de 2022?", opcoes:["França","Argentina","Brasil","Croácia"], correta:1 },
{ pergunta:"A Copa de 1950 ficou marcada por:", opcoes:["7x1","Maracanazo","Mão de Deus","Gol de ouro"], correta:1 },
{ pergunta:"Pelé ganhou quantas Copas do Mundo?", opcoes:["2","3","4","1"], correta:1 },
{ pergunta:"Maior campeão europeu em Copas:", opcoes:["França","Alemanha","Itália","Espanha"], correta:2 },
{ pergunta:"Qual seleção perdeu a final de 1998 para a França?", opcoes:["Brasil","Itália","Alemanha","Argentina"], correta:0 },

{ pergunta:"Qual jogador foi destaque na Copa de 1994 pelo Brasil?", opcoes:["Romário","Pelé","Neymar","Kaká"], correta:0 },

{ pergunta:"Qual seleção venceu a Copa de 2010 com estilo de posse de bola?", opcoes:["Alemanha","Brasil","Espanha","França"], correta:2 },

{ pergunta:"Quem foi o vice-campeão da Copa de 2018?", opcoes:["Croácia","França","Argentina","Alemanha"], correta:0 },


/* =========================
📍 SEDES DAS COPAS
========================= */

{ pergunta:"Onde foi a Copa de 2014?", opcoes:["Alemanha","Brasil","Rússia","África do Sul"], correta:1 },
{ pergunta:"Onde foi a Copa de 2010?", opcoes:["Brasil","África do Sul","Alemanha","Qatar"], correta:1 },
{ pergunta:"Onde foi a Copa de 2018?", opcoes:["França","Rússia","Alemanha","EUA"], correta:1 },
{ pergunta:"Onde foi a Copa de 2022?", opcoes:["Qatar","Japão","Brasil","México"], correta:0 },
{ pergunta:"Onde foi a Copa de 1994?", opcoes:["EUA","Brasil","França","Itália"], correta:0 },
{ pergunta:"Onde foi a Copa de 2006?", opcoes:["França","Alemanha","Brasil","Japão"], correta:1 },
{ pergunta:"Onde foi a Copa de 1998?", opcoes:["França","Itália","Brasil","Alemanha"], correta:0 },
{ pergunta:"Onde foi a Copa de 1966?", opcoes:["Inglaterra","Brasil","França","Uruguai"], correta:0 },
{ pergunta:"Onde foi a Copa de 1986?", opcoes:["México","Brasil","Argentina","Espanha"], correta:0 },
{ pergunta:"Quantos países sediarão a Copa de 2026?", opcoes:["1","2","3","4"], correta:2 },

/* =========================
⭐ JOGADORES HISTÓRICOS
========================= */

{ pergunta:"Quem fez o gol conhecido como 'Mão de Deus'?", opcoes:["Pelé","Messi","Maradona","Ronaldinho"], correta:2 },
{ pergunta:"Maior artilheiro da história das Copas:", opcoes:["Pelé","Klose","Ronaldo","Messi"], correta:1 },
{ pergunta:"Quantos gols Ronaldo Fenômeno fez em Copas?", opcoes:["15","10","8","12"], correta:0 },
{ pergunta:"Messi ganhou sua primeira Copa em:", opcoes:["2014","2018","2022","2010"], correta:2 },
{ pergunta:"Cristiano Ronaldo já ganhou Copa do Mundo?", opcoes:["Sim","Não"], correta:1 },
{ pergunta:"Zidane foi campeão em qual Copa?", opcoes:["1998","2002","2010","2018"], correta:0 },
{ pergunta:"Ronaldinho foi campeão em:", opcoes:["1998","2002","2006","2010"], correta:1 },
{ pergunta:"Neymar estreou em Copas em:", opcoes:["2010","2014","2018","2022"], correta:1 },
{ pergunta:"Mbappé brilhou em qual Copa?", opcoes:["2010","2014","2018","2006"], correta:2 },
{ pergunta:"Goleiro destaque da Alemanha em 2014:", opcoes:["Buffon","Neuer","Casillas","Alisson"], correta:1 },

/* =========================
🏆 CURIOSIDADES
========================= */

{ pergunta:"Maior goleada da história das Copas:", opcoes:["7x1","10x1","8x0","6x1"], correta:1 },
{ pergunta:"O 7x1 do Brasil foi contra:", opcoes:["Argentina","Alemanha","França","Holanda"], correta:1 },
{ pergunta:"Seleção com mais finais disputadas:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },
{ pergunta:"Primeiro campeão mundial:", opcoes:["Brasil","Uruguai","Itália","França"], correta:1 },
{ pergunta:"A Copa acontece a cada:", opcoes:["2 anos","3 anos","4 anos","5 anos"], correta:2 },
{ pergunta:"Quantas seleções terão na Copa 2026?", opcoes:["32","40","48","64"], correta:2 },
{ pergunta:"VAR significa:", opcoes:["Video Assistente","Árbitro assistente de vídeo","Replay","Sistema de gol"], correta:1 },
{ pergunta:"Final da Copa 2022 foi decidida em:", opcoes:["Tempo normal","Pênaltis","Gol de ouro","Replay"], correta:1 },
{ pergunta:"Copa 2010 ficou famosa por qual bola?", opcoes:["Jabulani","Telstar","Brazuca","Al Rihla"], correta:0 },
{ pergunta:"O mascote da Copa representa:", opcoes:["Jogador","Símbolo do torneio","Árbitro","Técnico"], correta:1 },

{ pergunta:"A seleção brasileira é conhecida por:", opcoes:["Defesa forte","Ataque técnico","Jogo lento","Poucos gols"], correta:1 },

{ pergunta:"A Alemanha é conhecida historicamente por:", opcoes:["Improviso","Disciplina tática","Jogo lento","Pouca força"], correta:1 },

{ pergunta:"A Argentina de 2022 se destacou por:", opcoes:["Defesa fraca","Jogo coletivo","Pouca posse","Sem estratégia"], correta:1 },

{ pergunta:"Copas do Mundo costumam ter jogos:", opcoes:["Previsíveis","Equilibrados","Sem emoção","Sempre iguais"], correta:1 },

/* =========================
🇧🇷 BRASIL NAS COPAS
========================= */

{ pergunta:"Primeiro título do Brasil foi em:", opcoes:["1950","1958","1962","1970"], correta:1 },
{ pergunta:"Último título do Brasil:", opcoes:["2002","1994","2014","2010"], correta:0 },
{ pergunta:"Brasil sediou quantas Copas?", opcoes:["1","2","3","0"], correta:1 },
{ pergunta:"Técnico do Brasil em 2002:", opcoes:["Felipão","Tite","Dunga","Parreira"], correta:0 },
{ pergunta:"Capitão do Brasil em 2002:", opcoes:["Ronaldo","Cafu","Rivaldo","Ronaldinho"], correta:1 },
{ pergunta:"Final de 1994 foi contra:", opcoes:["França","Itália","Argentina","Alemanha"], correta:1 },
{ pergunta:"Brasil de 1970 ficou conhecido por:", opcoes:["Defesa","Ataque histórico","VAR","Cartões"], correta:1 },
{ pergunta:"Jogador com mais Copas pelo Brasil:", opcoes:["Pelé","Cafu","Ronaldo","Neymar"], correta:1 },
{ pergunta:"Brasil perdeu 2014 por:", opcoes:["7x1","5x0","6x1","4x0"], correta:0 },
{ pergunta:"Maior rival do Brasil:", opcoes:["EUA","Argentina","França","Japão"], correta:1 },

/* =========================
⚽ EXTRA
========================= */

{ pergunta:"Quantos tempos tem uma partida?", opcoes:["1","2","3","4"], correta:1 },
{ pergunta:"Cada tempo dura:", opcoes:["30 min","45 min","50 min","60 min"], correta:1 },
{ pergunta:"Formato da bola:", opcoes:["Quadrada","Redonda","Oval","Triangular"], correta:1 },
{ pergunta:"Um gol vale:", opcoes:["1 ponto","2 pontos","3 pontos","Depende"], correta:0 },
{ pergunta:"Formato do campo:", opcoes:["Quadrado","Circular","Retangular","Oval"], correta:2 },
{ pergunta:"Função do capitão:", opcoes:["Nada","Representar o time","Apitar","Marcar gol"], correta:1 },
{ pergunta:"FIFA organiza:", opcoes:["NBA","Copa do Mundo","Olimpíadas","Tênis"], correta:1 },
{ pergunta:"Cartão amarelo indica:", opcoes:["Expulsão","Advertência","Gol","Falta leve"], correta:1 },
{ pergunta:"Gol contra é:", opcoes:["Gol válido","Não vale","Anulado","Replay"], correta:0 },
{ pergunta:"A final da Copa 2026 será em quantos países?", opcoes:["1","2","3","4"], correta:0 }

];

const perguntasDificeis = [

/* =========================
🧠 REGRAS AVANÇADAS
========================= */

{ pergunta:"Em qual situação o impedimento NÃO é marcado?", opcoes:["Passe para frente","Recebimento de lateral","Passe em profundidade","Rebote do goleiro"], correta:1 },

{ pergunta:"Um jogador em posição de impedimento só é penalizado quando:", opcoes:["Está parado","Participa da jogada","Corre rápido","Recebe cartão"], correta:1 },

{ pergunta:"Se o goleiro segura a bola por mais de 6 segundos:", opcoes:["Nada acontece","Escanteio","Tiro livre indireto","Pênalti"], correta:2 },

{ pergunta:"Um gol direto de lateral é:", opcoes:["Válido","Anulado","Depende do árbitro","Só vale com desvio"], correta:1 },

{ pergunta:"Se um jogador comete falta dentro da própria área:", opcoes:["Escanteio","Tiro livre","Pênalti","Lateral"], correta:2 },

{ pergunta:"Se a bola bate no árbitro e muda a posse de bola:", opcoes:["Segue o jogo","Bola ao chão","Escanteio","Falta"], correta:1 },

{ pergunta:"Um jogador pode estar impedido no próprio campo?", opcoes:["Sim","Não","Depende","Só em cobrança"], correta:1 },

{ pergunta:"Se o goleiro lança a bola com a mão direto para o gol adversário:", opcoes:["Vale","Não vale","Escanteio","Depende"], correta:1 },

{ pergunta:"Quantos segundos o goleiro pode segurar a bola com as mãos?", opcoes:["4","5","6","8"], correta:2 },

{ pergunta:"Se um jogador impede um gol com a mão de forma intencional:", opcoes:["Nada acontece","Cartão amarelo","Cartão vermelho","Escanteio"], correta:2 },

{ pergunta:"Um jogador pode ser expulso após o fim do jogo?", opcoes:["Não","Sim","Só com VAR","Depende"], correta:1 },

{ pergunta:"Se a bola entra no gol após bater na trave e no goleiro:", opcoes:["Não vale","Vale","Depende","Escanteio"], correta:1 },

{ pergunta:"Um gol marcado com a mão é:", opcoes:["Válido","Anulado","Depende do VAR","Só vale com desvio"], correta:1 },

{ pergunta:"Se um jogador comete falta violenta:", opcoes:["Nada","Cartão amarelo","Cartão vermelho","Lateral"], correta:2 },

{ pergunta:"Se o árbitro aplica vantagem e o time não aproveita:", opcoes:["Volta a falta","Segue o jogo","Escanteio","Pênalti"], correta:1 },

/* =========================
🌍 HISTÓRIA PROFUNDA
========================= */

{ pergunta:"Qual seleção foi vice-campeã da Copa de 1950?", opcoes:["Brasil","Uruguai","Espanha","Suécia"], correta:0 },

{ pergunta:"Quem marcou o gol do título da Alemanha em 2014?", opcoes:["Müller","Klose","Götze","Kroos"], correta:2 },

{ pergunta:"Qual seleção eliminou o Brasil na Copa de 2006?", opcoes:["França","Alemanha","Itália","Holanda"], correta:0 },

{ pergunta:"Quem foi o artilheiro da Copa de 2010?", opcoes:["Villa","Forlán","Sneijder","Müller"], correta:3 },

{ pergunta:"Qual país sediou a Copa de 1934?", opcoes:["França","Itália","Alemanha","Espanha"], correta:1 },

{ pergunta:"Quem foi o artilheiro da Copa de 2006?", opcoes:["Klose","Ronaldo","Henry","Zidane"], correta:0 },

{ pergunta:"Qual seleção foi campeã invicta na Copa de 2002?", opcoes:["Brasil","Alemanha","França","Argentina"], correta:0 },

{ pergunta:"Quem fez o gol do título da Espanha em 2010?", opcoes:["Xavi","Iniesta","Torres","Villa"], correta:1 },

{ pergunta:"Qual seleção eliminou a Alemanha na Copa de 2018 ainda na fase de grupos?", opcoes:["México","Coreia do Sul","Suécia","Japão"], correta:1 },

{ pergunta:"Quem foi o melhor jogador da Copa de 1998?", opcoes:["Zidane","Ronaldo","Baggio","Henry"], correta:1 },

{ pergunta:"Qual seleção venceu a Copa de 1994 nos pênaltis?", opcoes:["Brasil","Itália","Alemanha","Argentina"], correta:0 },

{ pergunta:"Qual seleção perdeu a final da Copa de 2014?", opcoes:["Argentina","Brasil","Holanda","Espanha"], correta:0 },

{ pergunta:"Quem foi o técnico do Brasil na Copa de 1970?", opcoes:["Zagallo","Telê Santana","Parreira","Felipão"], correta:0 },

{ pergunta:"Qual seleção foi campeã da Copa de 1986?", opcoes:["Brasil","Alemanha","Argentina","França"], correta:2 },

{ pergunta:"Quem marcou dois gols na final da Copa de 2002?", opcoes:["Rivaldo","Ronaldo","Ronaldinho","Klose"], correta:1 },

/* =========================
📊 RECORDES E ESTATÍSTICAS
========================= */

{ pergunta:"Qual seleção tem mais jogos em Copas do Mundo?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:0 },

{ pergunta:"Quem foi o jogador mais jovem a marcar em uma final de Copa?", opcoes:["Pelé","Mbappé","Messi","Ronaldo"], correta:0 },

{ pergunta:"Qual foi a única seleção a vencer todas as partidas de uma Copa (formato moderno)?", opcoes:["Brasil 1970","Alemanha 2014","França 1998","Argentina 2022"], correta:0 },

{ pergunta:"Maior número de gols em uma única Copa por um jogador:", opcoes:["10","11","12","13"], correta:3 },

{ pergunta:"Quem detém esse recorde?", opcoes:["Pelé","Klose","Just Fontaine","Ronaldo"], correta:2 },

{ pergunta:"Qual seleção tem mais títulos de Copa do Mundo?", opcoes:["Brasil","Alemanha","Itália","Argentina"], correta:0 },

{ pergunta:"Qual jogador tem mais gols na história das Copas?", opcoes:["Ronaldo","Messi","Klose","Pelé"], correta:2 },

{ pergunta:"Qual seleção tem mais finais disputadas?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Qual jogador brasileiro tem mais gols em Copas?", opcoes:["Pelé","Ronaldo","Romário","Neymar"], correta:1 },

{ pergunta:"Qual foi a maior goleada em uma Copa do Mundo?", opcoes:["7x1","8x0","10x1","6x0"], correta:2 },

{ pergunta:"Qual seleção marcou mais gols em uma única Copa?", opcoes:["Brasil 1970","Hungria 1954","Alemanha 2014","França 1998"], correta:1 },

{ pergunta:"Qual jogador tem mais partidas disputadas em Copas?", opcoes:["Messi","Maldini","Matthäus","Klose"], correta:2 },

{ pergunta:"Qual seleção ficou mais jogos invicta em Copas?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Qual jogador participou de mais edições de Copa como titular?", opcoes:["Messi","Cristiano Ronaldo","Matthäus","Buffon"], correta:2 },

{ pergunta:"Qual seleção sofreu menos gols em uma única Copa campeã?", opcoes:["Brasil 2002","França 1998","Itália 2006","Alemanha 2014"], correta:2 },

/* =========================
⭐ JOGADORES (NÍVEL HARD)
========================= */

{ pergunta:"Qual jogador tem mais assistências na história das Copas?", opcoes:["Messi","Pelé","Maradona","Beckham"], correta:1 },

{ pergunta:"Quem perdeu pênalti na final de 1994?", opcoes:["Baggio","Romário","Bebeto","Maldini"], correta:0 },

{ pergunta:"Qual jogador ganhou Bola de Ouro em 2006 mesmo sendo expulso na final?", opcoes:["Zidane","Cannavaro","Pirlo","Henry"], correta:0 },

{ pergunta:"Quem foi o melhor jogador da Copa de 2014?", opcoes:["Messi","Neymar","Robben","Müller"], correta:0 },

{ pergunta:"Qual desses jogadores NUNCA jogou uma final de Copa?", opcoes:["Cristiano Ronaldo","Messi","Zidane","Ronaldo"], correta:0 },

{ pergunta:"Qual jogador marcou gol em duas finais de Copa diferentes?", opcoes:["Pelé","Ronaldo","Zidane","Messi"], correta:0 },

{ pergunta:"Quem foi o artilheiro da Copa de 1998?", opcoes:["Ronaldo","Suker","Batistuta","Zidane"], correta:1 },

{ pergunta:"Qual jogador foi expulso na final de 2006 após dar uma cabeçada?", opcoes:["Zidane","Materazzi","Pirlo","Henry"], correta:0 },

{ pergunta:"Quem marcou o gol do título da Argentina em 1986 na final?", opcoes:["Maradona","Burruchaga","Valdano","Careca"], correta:1 },

{ pergunta:"Qual jogador foi destaque da Croácia na Copa de 2018?", opcoes:["Modrić","Mandžukić","Perišić","Rakitic"], correta:0 },

{ pergunta:"Quem foi o goleiro titular do Brasil na Copa de 2002?", opcoes:["Dida","Marcos","Taffarel","Cássio"], correta:1 },

{ pergunta:"Qual jogador fez gol na final da Copa de 2014 para a Alemanha?", opcoes:["Klose","Müller","Götze","Kroos"], correta:2 },

{ pergunta:"Quem foi o artilheiro da Copa de 2018?", opcoes:["Mbappé","Griezmann","Kane","Lukaku"], correta:2 },

{ pergunta:"Qual jogador brasileiro jogou as finais de 1994 e 1998?", opcoes:["Ronaldo","Romário","Bebeto","Rivaldo"], correta:2 },

{ pergunta:"Quem foi eleito melhor jogador da Copa de 2022?", opcoes:["Mbappé","Messi","Modrić","Griezmann"], correta:1 },

/* =========================
🏟️ TÁTICA E JOGO
========================= */

{ pergunta:"O sistema 4-3-3 possui quantos atacantes?", opcoes:["2","3","4","1"], correta:1 },

{ pergunta:"Um 'falso 9' é:", opcoes:["Zagueiro","Meia defensivo","Atacante que recua","Goleiro"], correta:2 },

{ pergunta:"Linha alta significa:", opcoes:["Defesa recuada","Defesa avançada","Time lento","Jogo parado"], correta:1 },

{ pergunta:"Pressão alta é:", opcoes:["Marcação no campo de defesa","Marcação no campo adversário","Jogo defensivo","Contra-ataque"], correta:1 },

{ pergunta:"Posse de bola NÃO garante:", opcoes:["Controle do jogo","Vitória","Domínio territorial","Criação de chances"], correta:1 },

{ pergunta:"Um contra-ataque acontece quando:", opcoes:["Time mantém posse","Recupera a bola e ataca rápido","Jogo está parado","Time recua"], correta:1 },

{ pergunta:"Um time com linhas compactas tende a:", opcoes:["Deixar espaços","Reduzir espaços","Atacar mais","Ficar lento"], correta:1 },

{ pergunta:"Amplitude ofensiva significa:", opcoes:["Jogo pelo meio","Uso das laterais","Chutes de longe","Defesa forte"], correta:1 },

{ pergunta:"Um volante tem como principal função:", opcoes:["Fazer gols","Defender e iniciar jogadas","Ser goleiro","Ficar parado"], correta:1 },

{ pergunta:"Um time que joga em bloco baixo:", opcoes:["Pressiona alto","Defende perto do gol","Ataca o tempo todo","Não marca"], correta:1 },

{ pergunta:"Troca rápida de passes curtos caracteriza:", opcoes:["Jogo direto","Posse de bola","Contra-ataque","Defesa baixa"], correta:1 },

{ pergunta:"Marcação individual significa:", opcoes:["Marcar espaço","Marcar um jogador específico","Não marcar","Só defender área"], correta:1 },

{ pergunta:"Um lateral ofensivo costuma:", opcoes:["Ficar parado","Subir ao ataque","Ser goleiro","Só defender"], correta:1 },

{ pergunta:"Transição ofensiva ocorre quando:", opcoes:["Time perde a bola","Time ganha a bola e ataca","Jogo para","Time recua"], correta:1 },

{ pergunta:"Jogo direto significa:", opcoes:["Muitos passes curtos","Bola longa para ataque","Defesa alta","Posse longa"], correta:1 },

];

const perguntasInsanas = [

/* =========================
🧠 REGRAS ULTRA DETALHADAS
========================= */

{ pergunta:"Se a bola estoura durante uma jogada clara de gol, o árbitro deve:", opcoes:["Dar gol","Marcar escanteio","Parar o jogo e reiniciar com bola ao chão","Mandar repetir a jogada"], correta:2 },

{ pergunta:"Um jogador pode ser expulso ANTES do jogo começar?", opcoes:["Não","Sim, durante o aquecimento","Só após o apito inicial","Só no intervalo"], correta:1 },

{ pergunta:"Se um reserva invade o campo e impede um gol:", opcoes:["Nada acontece","Cartão amarelo","Pênalti e expulsão","Só tiro livre"], correta:2 },

{ pergunta:"Gol direto de tiro de meta:", opcoes:["Não vale","Vale","Depende do árbitro","Só com desvio"], correta:1 },

{ pergunta:"Se a bola bate no árbitro e muda a posse:", opcoes:["Segue o jogo","Interrompe e bola ao chão","Escanteio","Falta"], correta:1 },

{ pergunta:"Se um jogador cobra lateral direto para o próprio gol e a bola entra:", opcoes:["Vale","Escanteio","Tiro de meta","Anulado"], correta:2 },

{ pergunta:"Se o goleiro toca a bola com a mão fora da área:", opcoes:["Nada","Falta","Pênalti","Escanteio"], correta:1 },

{ pergunta:"Se um jogador chuta e a bola explode antes de entrar no gol:", opcoes:["Gol válido","Anula e bola ao chão","Escanteio","Reinicia com tiro de meta"], correta:1 },

{ pergunta:"Se um jogador tira a camisa ao comemorar:", opcoes:["Nada acontece","Cartão amarelo","Cartão vermelho","Falta"], correta:1 },

{ pergunta:"Se um gol é marcado com desvio involuntário de mão:", opcoes:["Vale","Não vale","Depende do árbitro","VAR decide sempre"], correta:1 },

{ pergunta:"Se um jogador está impedido mas não participa da jogada:", opcoes:["Falta","Segue o jogo","Cartão","Escanteio"], correta:1 },

{ pergunta:"Se o árbitro encerra o jogo por falta de jogadores:", opcoes:["Empate","Vitória automática","Partida encerrada","Pênaltis"], correta:2 },

{ pergunta:"Se a bola entra no gol após bater no árbitro:", opcoes:["Gol válido","Anulado e bola ao chão","Escanteio","Falta"], correta:1 },

{ pergunta:"Se o goleiro solta a bola e pega novamente com a mão sem toque de outro jogador:", opcoes:["Nada","Falta indireta","Pênalti","Cartão"], correta:1 },

{ pergunta:"Se um jogador impede uma jogada clara sem tentar jogar a bola:", opcoes:["Nada","Cartão amarelo","Cartão vermelho","Escanteio"], correta:2 },

/* =========================
📜 HISTÓRIA OCULTA DAS COPAS
========================= */

{ pergunta:"Qual seleção foi campeã invicta SEM sofrer gols em uma Copa?", opcoes:["Brasil 1970","Itália 1982","Suíça 2006","Nenhuma"], correta:3 },

{ pergunta:"Quem foi o técnico do Brasil na Copa de 1958?", opcoes:["Zagallo","Feola","Telê Santana","Parreira"], correta:1 },

{ pergunta:"Qual foi a primeira final decidida nos pênaltis?", opcoes:["1974","1982","1994","1978"], correta:2 },

{ pergunta:"Qual jogador participou de MAIS Copas como atleta?", opcoes:["Pelé","Maradona","Matthäus","Buffon"], correta:2 },

{ pergunta:"Qual país já sediou Copa e NÃO participou dela?", opcoes:["Qatar","Uruguai","Itália","Nenhum"], correta:3 },

{ pergunta:"Qual seleção já foi campeã da Copa jogando em casa pela primeira vez?", opcoes:["Uruguai 1930","Brasil 1950","França 1998","Alemanha 2006"], correta:0 },

{ pergunta:"Qual foi a única Copa sem participação de seleções europeias?", opcoes:["1930","1950","1934","1962"], correta:0 },

{ pergunta:"Qual seleção já perdeu uma final de Copa em casa?", opcoes:["Brasil","Alemanha","França","Argentina"], correta:0 },

{ pergunta:"Qual país foi campeão e nunca mais chegou a outra final?", opcoes:["Inglaterra","Espanha","Uruguai","Todos"], correta:3 },

{ pergunta:"Qual seleção já foi campeã após perder o primeiro jogo?", opcoes:["Argentina 1990","Espanha 2010","Brasil 2002","Alemanha 2014"], correta:1 },

{ pergunta:"Qual jogador foi campeão do mundo como técnico e jogador?", opcoes:["Zidane","Beckenbauer","Cruyff","Maradona"], correta:1 },

{ pergunta:"Qual foi a primeira Copa com participação de seleções africanas?", opcoes:["1930","1934","1970","1982"], correta:1 },

{ pergunta:"Qual seleção já chegou à final sem vencer nenhum jogo no tempo normal?", opcoes:["Holanda","Itália","Argentina","Nenhuma"], correta:3 },

{ pergunta:"Qual país já foi campeão com 100% de aproveitamento?", opcoes:["Brasil 1970","Alemanha 2014","França 1998","Argentina 2022"], correta:0 },

{ pergunta:"Qual seleção foi eliminada na fase de grupos sendo campeã na Copa anterior?", opcoes:["França 2002","Brasil 2006","Alemanha 2018","Todas"], correta:3 },

/* =========================
📊 ESTATÍSTICAS ABSURDAS
========================= */

{ pergunta:"Maior tempo sem sofrer gols em Copas (seleção):", opcoes:["Brasil","Itália","Suíça","Alemanha"], correta:2 },

{ pergunta:"Qual seleção ficou MAIS TEMPO sem perder em Copas?", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Jogador com MAIS minutos em Copas:", opcoes:["Messi","Maldini","Matthäus","Klose"], correta:2 },

{ pergunta:"Maior número de finais consecutivas disputadas:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:1 },

{ pergunta:"Maior público já registrado em uma final de Copa:", opcoes:["Maracanã 1950","Wembley 1966","Azteca 1986","França 1998"], correta:0 },

{ pergunta:"Seleção com maior número de gols em uma única Copa:", opcoes:["Hungria 1954","Brasil 1970","Alemanha 2014","França 1998"], correta:0 },

{ pergunta:"Jogador com mais gols em finais de Copa:", opcoes:["Pelé","Mbappé","Zidane","Ronaldo"], correta:1 },

{ pergunta:"Seleção com mais participações em Copas do Mundo:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:0 },

{ pergunta:"Maior sequência de jogos sem derrota em Copas (seleção):", opcoes:["Brasil","Itália","Alemanha","Argentina"], correta:2 },

{ pergunta:"Jogador com mais gols em uma única edição de Copa:", opcoes:["Pelé","Ronaldo","Fontaine","Klose"], correta:2 },

{ pergunta:"Seleção com mais gols marcados na história das Copas:", opcoes:["Brasil","Alemanha","Argentina","França"], correta:0 },

{ pergunta:"Maior número de prorrogações disputadas por uma seleção:", opcoes:["Alemanha","Argentina","Itália","Brasil"], correta:0 },

{ pergunta:"Jogador com mais finais disputadas como titular:", opcoes:["Pelé","Beckenbauer","Cafu","Messi"], correta:2 },

{ pergunta:"Seleção com mais jogos disputados em Copas:", opcoes:["Brasil","Alemanha","Argentina","Itália"], correta:0 },

{ pergunta:"Maior número de gols em uma final de Copa (um jogador):", opcoes:["2","3","4","5"], correta:1 },

/* =========================
🎯 JOGADORES (NÍVEL ABSURDO)
========================= */

{ pergunta:"Quem foi campeão do mundo como jogador e técnico?", opcoes:["Zidane","Beckenbauer","Maradona","Cruyff"], correta:1 },

{ pergunta:"Qual jogador fez gol em MAIS Copas diferentes?", opcoes:["Pelé","Ronaldo","Klose","Messi"], correta:0 },

{ pergunta:"Quem perdeu duas finais seguidas (2014 e 2018)?", opcoes:["Messi","Modrić","Mbappé","Nenhum"], correta:3 },

{ pergunta:"Qual goleiro ficou MAIS TEMPO sem sofrer gol em Copas?", opcoes:["Buffon","Neuer","Zenga","Casillas"], correta:2 },

{ pergunta:"Quem fez hat-trick em final de Copa?", opcoes:["Pelé","Mbappé","Ronaldo","Klose"], correta:1 },

{ pergunta:"Qual jogador disputou mais finais de Copa como titular?", opcoes:["Pelé","Beckenbauer","Cafu","Messi"], correta:2 },

{ pergunta:"Quem foi campeão do mundo como jogador e também capitão da seleção?", opcoes:["Zidane","Maradona","Cafu","Todos"], correta:3 },

{ pergunta:"Qual jogador marcou gols em três Copas diferentes consecutivas?", opcoes:["Ronaldo","Pelé","Messi","Klose"], correta:1 },

{ pergunta:"Quem foi o jogador com mais assistências em uma única Copa?", opcoes:["Pelé","Maradona","Messi","Xavi"], correta:1 },

{ pergunta:"Qual jogador participou de mais jogos em Copas do Mundo?", opcoes:["Messi","Matthäus","Maldini","Klose"], correta:0 },

{ pergunta:"Quem foi o jogador mais jovem a ser campeão do mundo?", opcoes:["Pelé","Mbappé","Ronaldo","Maradona"], correta:0 },

{ pergunta:"Qual jogador foi campeão do mundo em três edições diferentes?", opcoes:["Pelé","Maradona","Messi","Zidane"], correta:0 },

{ pergunta:"Quem foi o jogador com mais gols somando todas as Copas?", opcoes:["Ronaldo","Klose","Pelé","Messi"], correta:1 },

{ pergunta:"Qual jogador foi eleito melhor do mundo após vencer a Copa de 1998?", opcoes:["Ronaldo","Zidane","Rivaldo","Beckham"], correta:0 },

{ pergunta:"Quem foi o jogador com mais finais de Copa disputadas como titular?", opcoes:["Messi","Cafu","Beckenbauer","Zidane"], correta:1 },

/* =========================
🧩 TÁTICA PROFUNDA
========================= */

{ pergunta:"O 'gegenpressing' é:", opcoes:["Defesa baixa","Pressão imediata após perda da bola","Contra-ataque lento","Posse longa"], correta:1 },

{ pergunta:"Um 'terceiro homem' na jogada é:", opcoes:["Árbitro","Jogador que aparece para dar continuidade","Reserva","Zagueiro"], correta:1 },

{ pergunta:"Bloco médio significa:", opcoes:["Time recuado","Time avançado","Linha intermediária de marcação","Sem marcação"], correta:2 },

{ pergunta:"Amplitude no jogo ofensivo refere-se a:", opcoes:["Velocidade","Uso das laterais","Chutes de longe","Marcação"], correta:1 },

{ pergunta:"Transição defensiva ocorre quando:", opcoes:["Time ataca","Perde a bola","Faz gol","Bola parada"], correta:1 },

{ pergunta:"Um time que pratica 'pressing alto' busca:", opcoes:["Defender recuado","Recuperar a bola no campo adversário","Manter posse longa","Evitar atacar"], correta:1 },

{ pergunta:"Cobertura defensiva significa:", opcoes:["Atacar mais","Apoiar o defensor que saiu na marcação","Ficar parado","Ir para o ataque"], correta:1 },

{ pergunta:"Superioridade numérica ocorre quando:", opcoes:["Time tem mais posse","Há mais jogadores em uma zona do campo","Time marca gols","Defesa recua"], correta:1 },

{ pergunta:"Um time que joga em bloco alto tende a:", opcoes:["Ficar perto do próprio gol","Marcar longe do gol adversário","Marcar próximo ao gol adversário","Não marcar"], correta:2 },

{ pergunta:"Transição ofensiva rápida busca:", opcoes:["Segurar o jogo","Aproveitar desorganização do adversário","Recuar","Trocar passes lentos"], correta:1 },

{ pergunta:"Um meia 'box-to-box' é:", opcoes:["Fica parado","Atua só na defesa","Participa da defesa e ataque","É goleiro"], correta:2 },

{ pergunta:"Compactação entre linhas significa:", opcoes:["Jogadores distantes","Linhas próximas e organizadas","Só ataque","Só defesa"], correta:1 },

{ pergunta:"Um time com posse estéril:", opcoes:["Cria muitas chances","Não cria perigo mesmo com posse","Sempre vence","Marca muitos gols"], correta:1 },

{ pergunta:"Inversão de jogo é:", opcoes:["Chute ao gol","Troca rápida de lado do campo","Falta","Recuo"], correta:1 },

{ pergunta:"Um pivô ofensivo tem função de:", opcoes:["Defender","Segurar a bola e distribuir","Finalizar sempre","Marcar lateral"], correta:1 },

/* =========================
🤯 PEGADINHAS INSANAS
========================= */

{ pergunta:"Quantos jogadores um time pode ter em campo no MÍNIMO para o jogo continuar?", opcoes:["7","8","6","5"], correta:0 },

{ pergunta:"Se todos os jogadores forem expulsos:", opcoes:["Jogo continua","Vitória automática","Partida encerrada","Pênaltis"], correta:2 },

{ pergunta:"Um jogador pode tirar a camisa ao comemorar?", opcoes:["Sim","Não","Sim, sem punição","Só se fizer gol importante"], correta:1 },

{ pergunta:"Se o goleiro faz gol com a mão:", opcoes:["Vale","Não vale","Depende","Revisão VAR"], correta:1 },

{ pergunta:"Um jogador pode marcar gol diretamente do escanteio?", opcoes:["Não","Sim","Só com desvio","Só na prorrogação"], correta:1 },

{ pergunta:"Um jogador pode ser impedido em cobrança de escanteio?", opcoes:["Sim","Não","Depende","Só com VAR"], correta:1 },

{ pergunta:"Se a bola entra direto no gol em cobrança de lateral:", opcoes:["Vale","Não vale","Escanteio","Depende"], correta:1 },

{ pergunta:"Se um jogador chuta e a bola bate nele mesmo duas vezes seguidas sem ninguém tocar:", opcoes:["Nada acontece","Falta","Segue o jogo","Escanteio"], correta:1 },

{ pergunta:"Um jogador pode estar impedido ao receber um tiro de meta?", opcoes:["Sim","Não","Depende","Só se correr"], correta:1 },

{ pergunta:"Se a bola entra no gol sem tocar em ninguém após cobrança de escanteio:", opcoes:["Não vale","Vale","Depende","Falta"], correta:1 },

{ pergunta:"Se um jogador comete falta fora do campo (fora das linhas):", opcoes:["Nada","Falta no local mais próximo","Cartão apenas","Escanteio"], correta:1 },

{ pergunta:"Um jogador pode receber cartão estando no banco?", opcoes:["Não","Sim","Só se entrar em campo","Depende"], correta:1 },

{ pergunta:"Se o árbitro apita antes da bola entrar no gol:", opcoes:["Gol vale","Gol não vale","Depende","VAR decide"], correta:1 },

{ pergunta:"Se um jogador marca gol contra sem querer:", opcoes:["Não vale","Vale","Depende","Escanteio"], correta:1 },

{ pergunta:"Um jogador pode fazer gol diretamente de um tiro de meta?", opcoes:["Não","Sim","Só com desvio","Depende"], correta:1 },

];

/* ======================================================
🏆 SISTEMA DE FASES
====================================================== */

let faseAtual = 0;

const fases = [
  { nome: "Fase de Grupos", perguntas: 10, minimo: 5 },
  { nome: "Oitavas de Final", perguntas: 8, minimo: 4 },
  { nome: "Quartas de Final", perguntas: 6, minimo: 3 },
  { nome: "Semifinal", perguntas: 4, minimo: 3 },
  { nome: "Final", perguntas: 3, minimo: 3 }
];

/* ======================================================
🎮 ESTADO
====================================================== */

let atual = 0;
let acertos = 0;
let tempo = 5;
let intervalo;
let recompensaColetada = false;
let perguntasSelecionadas = [];
let perguntasUsadas = new Set();

/* ======================================================
📌 ELEMENTOS
====================================================== */

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const tempoEl = document.getElementById("tempo");
const progresso = document.getElementById("progresso");
const numPergunta = document.getElementById("numPergunta");
const resultado = document.getElementById("resultado");
const btnIniciar = document.getElementById("btnIniciar");
const faseEl = document.getElementById("faseAtual");
const rankingEl = document.getElementById("ranking");
const tabs = document.querySelectorAll(".tab");

let abaAtual = "total";

tabs.forEach(btn=>{
  btn.onclick=()=>{
    tabs.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    abaAtual=btn.dataset.tab;
    carregarRanking();
  };
});

/* ======================================================
🚀 INICIAR
====================================================== */

btnIniciar.onclick = iniciar;

async function iniciar(){

  perguntasUsadas.clear();

  const user = auth.currentUser;
  if(!user) return alert("Faça login!");

  recompensaColetada = false;

  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);
  const dados = snap.data();

  if(!dados?.fichasLab || dados.fichasLab <= 0){
    alert("Sem ingressos!");
    return;
  }

  document.getElementById("instrucoes").classList.add("hidden");
  document.getElementById("quizArea").classList.remove("hidden");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

  await atualizarStatsGlobais();
  atualizarFichas();

  faseAtual = 0;

  carregarFase();

  btnIniciar.style.display = "none";
  resultado.classList.add("hidden");
}

/* ======================================================
🏆 CARREGAR FASE
====================================================== */

function carregarFase(){

  const fase = fases[faseAtual]; // ✅ PRIMEIRO

  atual = 0;
  acertos = 0;

  faseEl.innerText = `🏆 ${fase.nome}`;

  atualizarBarraFases();

  // 🟢 PLACAR (BOLINHAS)
  const placar = document.getElementById("placar");
  placar.innerHTML = "";

  for(let i=0;i<fase.perguntas;i++){
    const b = document.createElement("div");
    b.classList.add("bolinha");
    placar.appendChild(b);
  }

  // 🎯 PERGUNTAS
  perguntasSelecionadas = gerarQuiz(fase.perguntas)
    .map(p => embaralharOpcoes(p));

  setTimeout(()=>{
    proximaPergunta();
  },600);
}

/* ======================================================
➡️ PERGUNTAS
====================================================== */

function proximaPergunta(){

  if(atual >= perguntasSelecionadas.length){
    finalizar();
    return;
  }

  const p = perguntasSelecionadas[atual];

  clearInterval(intervalo);

  perguntaEl.innerText = p.pergunta;
  opcoesEl.innerHTML = "";
  opcoesEl.classList.remove("respondido");

  numPergunta.innerText = atual + 1;

  p.opcoes.forEach((op,i)=>{
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = ()=>responder(i);
    opcoesEl.appendChild(btn);
  });

  iniciarTimer();
}

/* ======================================================
⏳ TIMER
====================================================== */

function iniciarTimer(){

  tempo = 5;

  tempoEl.innerText = tempo;

  tempoEl.style.color = "#fff"; // 🔥 RESETA COR

  progresso.style.width = "100%";

  clearInterval(intervalo);

  intervalo = setInterval(()=>{

    tempo -= 0.1;

    tempoEl.innerText = Math.max(0, tempo.toFixed(1));
    progresso.style.width = (tempo/5)*100 + "%";

    if(tempo <= 1){
      tempoEl.style.color = "#ef4444";
    }

    if(tempo <= 0){

      clearInterval(intervalo);

      if(respondendo) return;

      respondendo = true;

      const bolinhas = document.querySelectorAll(".bolinha");
      bolinhas[atual].classList.add("erro");

      setTimeout(()=>{
        atual++;
        respondendo = false;
        proximaPergunta();
      },600);
    }

  },100);
}

/* ======================================================
✅ RESPOSTA
====================================================== */

function responder(index){

  if(respondendo) return;
  if(tempo <= 0) return; // 🚨 BLOQUEIO DO ÚLTIMO SEGUNDO

  respondendo = true;

  clearInterval(intervalo);

  const correta = perguntasSelecionadas[atual].correta;
  const bolinhas = document.querySelectorAll(".bolinha");
  const botoes = opcoesEl.querySelectorAll("button");

  botoes.forEach((btn,i)=>{
    if(i === correta) btn.classList.add("correta");
    if(i === index && i !== correta) btn.classList.add("errada");
    btn.disabled = true;
  });

  if(index === correta){
    acertos++;
    bolinhas[atual].classList.add("acerto");
  } else {
    bolinhas[atual].classList.add("erro");
  }

  setTimeout(()=>{
    atual++;
    respondendo = false;
    proximaPergunta();
  },600);
}

/* ======================================================
🏁 FINAL (FASES)
====================================================== */

async function finalizar(){

  const fase = fases[faseAtual];

  if(acertos >= fase.minimo){

    faseAtual++;

    if(faseAtual >= fases.length){
      finalizarCampeao();
      return;
    }

    resultado.innerHTML = `
      <h2>🔥 Classificado!</h2>
      <p>Você avançou para:</p>
      <strong>${fases[faseAtual].nome}</strong>
      <br><br>
      <button onclick="proximaFase()">➡️ Próxima fase</button>
    `;

  } else {

    const user = auth.currentUser;
    const ref = doc(db,"usuarios",user.uid);

    // 🏅 RECOMPENSA POR FASE
    const recompensas = [3, 5, 10, 20, 35];
    const sp = recompensas[faseAtual] || 0;

    await adicionarSP(sp);

    resultado.innerHTML = `
      <h2>💀 Eliminado na ${fase.nome}</h2>
      <p>🏅 Você ganhou <strong>${sp} SP</strong></p>
      <button onclick="reiniciar()">🔁 Jogar novamente</button>
      <button onclick="sairQuiz()">🚪 Sair</button>
    `;
  }

  resultado.classList.remove("hidden");
}

/* ======================================================
🏆 CAMPEÃO
====================================================== */

async function finalizarCampeao(){

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);

  // 🎯 RECOMPENSA FINAL
  const xp = 150;
  const sp = 50; // mantém fixo ou pode usar função depois

  await updateDoc(ref,{
  xp: increment(xp),
  quizWins: increment(1),
  quizWinsSemana: increment(1)
});

await adicionarSP(sp);

  resultado.innerHTML = `
    <div class="loot-box">
      <h2>🏆 CAMPEÃO DA COPA!</h2>

      <p style="margin:10px 0;">
        Você zerou todas as fases 🔥
      </p>

      <div style="font-size:1.2rem;">
        ⚡ <strong>${xp} XP</strong><br>
        🏅 <strong>${sp} SP</strong>
      </div>

      <button onclick="reiniciar()">🔁 Jogar novamente</button>
      <button onclick="sairQuiz()">🚪 Sair</button>
    </div>
  `;

  resultado.classList.remove("hidden");

  carregarRanking();
}

/* ======================================================
🔁 REINICIAR
====================================================== */

window.reiniciar = async function(){

  const user = auth.currentUser;
  const ref = doc(db,"usuarios",user.uid);
  const snap = await getDoc(ref);

  if(!snap.data()?.fichasLab || snap.data().fichasLab <= 0) return alert("Sem ingressos!");

  await updateDoc(ref,{
    fichasLab: increment(-1),
    quizJogos: increment(1)
  });

  faseAtual = 0;
  resultado.classList.add("hidden");

  carregarFase();
};


function embaralhar(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* ======================================================
UTILITÁRIOS
====================================================== */

function embaralharOpcoes(pergunta){

  const opcoes = pergunta.opcoes.map((texto, index) => ({
    texto,
    correta: index === pergunta.correta
  }));

  const embaralhadas = embaralhar([...opcoes]);

  return {
    pergunta: pergunta.pergunta,
    opcoes: embaralhadas.map(o => o.texto),
    correta: embaralhadas.findIndex(o => o.correta)
  };
}

function atualizarBarraFases(){

  const spans = document.querySelectorAll(".fase-barra span");

  spans.forEach((el, i)=>{
    el.classList.remove("ativa","completa");

    if(i < faseAtual){
      el.classList.add("completa");
    } else if(i === faseAtual){
      el.classList.add("ativa");
    }
  });
}

async function atualizarFichas(){
  const user=auth.currentUser;
  if(!user) return;

  const snap=await getDoc(doc(db,"usuarios",user.uid));
  if(!snap.exists()) return;

  document.getElementById("fichas").innerText =
    snap.data().fichasLab || 0;
}

async function carregarRanking(){

  rankingEl.innerHTML="Carregando...";

  const campo=abaAtual==="semanal"
    ?"quizWinsSemana"
    :"quizWins";

  const snap=await getDocs(query(
    collection(db,"usuarios"),
    orderBy(campo,"desc"),
    limit(10)
  ));

  rankingEl.innerHTML="";
  let pos=1;

  snap.forEach(docSnap=>{
    const d=docSnap.data();

    rankingEl.innerHTML+=`
      <div class="ranking-item">
        <span>${pos}º ${d.nome||"Jogador"}</span>
        <span>${d[campo]||0}</span>
      </div>
    `;
    pos++;
  });
}

auth.onAuthStateChanged(async user=>{

  if(!user) return;

  atualizarFichas();
  carregarRanking();
  carregarStatsComunidade();
});

function formatarNumero(n){
  return n.toLocaleString("pt-BR");
}



function gerarQuiz(qtd){

  const todas = [
    ...perguntas,
    ...perguntasDificeis,
    ...perguntasInsanas
  ];

  const filtradas = todas.filter(p => !perguntasUsadas.has(p.pergunta));

  const selecionadas = embaralhar(filtradas).slice(0, qtd);

  selecionadas.forEach(p => perguntasUsadas.add(p.pergunta));

  return selecionadas;
}

function calcularSP(faseIndex, venceuTudo){

  if(venceuTudo) return 50;

  const recompensas = [3, 6, 12, 20, 30];

  return recompensas[faseIndex] || 0;
}


async function atualizarStatsGlobais(){

  const ref = doc(db,"estatisticas","comunidade");

  const hoje = new Date().toISOString().split("T")[0];

  const snap = await getDoc(ref);

  if(!snap.exists()){
    await setDoc(ref,{
      jogosHoje: 1,
      jogosTotal: 1,

      ingressosHoje: 1,
      ingressosTotal: 1,

      data: hoje
    });
    return;
  }

  const dados = snap.data();

  if(dados.data === hoje){

    await updateDoc(ref,{
      jogosHoje: increment(1),
      jogosTotal: increment(1),

      ingressosHoje: increment(1),
      ingressosTotal: increment(1)
    });

  }else{

    await updateDoc(ref,{
      jogosHoje: 1,
      jogosTotal: increment(1),

      ingressosHoje: 1,
      ingressosTotal: increment(1),

      data: hoje
    });
  }
}

function carregarStatsComunidade(){

  const ref = doc(db,"estatisticas","comunidade");

  onSnapshot(ref, (snap)=>{

    if(!snap.exists()) return;

    const d = snap.data();

    document.getElementById("ingressosTotal").innerText =
      formatarNumero(d.ingressosTotal || 0);

    document.getElementById("jogosHoje").innerText =
      formatarNumero(d.jogosHoje || 0);

  });

}

function proximaFase(){
  resultado.classList.add("hidden");   // 👈 ESCONDE o resultado
  resultado.innerHTML = "";            // 👈 limpa conteúdo (opcional, mas recomendado)
  carregarFase();                      // 👈 carrega próxima fase
}

function sairQuiz(){

  resultado.classList.add("hidden");
  document.getElementById("quizArea").classList.add("hidden");
  document.getElementById("instrucoes").classList.remove("hidden");

  btnIniciar.style.display = "block";
}

window.carregarFase = carregarFase;
window.proximaFase = proximaFase;
window.sairQuiz = sairQuiz;