// =======================================
// HOME.JS — DESAFIO DIÁRIO EXPANSÍVEL FINAL
// =======================================

import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from 
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { adicionarXPImediato } from "./xp.js";


// ================================
// 🧠 BANCO DE PERGUNTAS EXPANDIDO
// ================================

const perguntas = [

    // ---------------- FÍSICA ----------------

    { pergunta: "Qual é a unidade de força no Sistema Internacional?",
      opcoes: ["Joule", "Newton", "Watt", "Pascal"], correta: 1 },

    { pergunta: "A velocidade é considerada uma grandeza:",
      opcoes: ["Fundamental", "Derivada", "Qualitativa", "Escalar apenas"], correta: 1 },

    { pergunta: "A unidade padrão de massa no SI é:",
      opcoes: ["Grama", "Quilograma", "Tonelada", "Newton"], correta: 1 },

    { pergunta: "A energia é classificada como grandeza:",
      opcoes: ["Fundamental", "Derivada", "Qualitativa", "Abstrata"], correta: 1 },

    { pergunta: "Qual é a unidade de potência no SI?",
      opcoes: ["Watt", "Joule", "Newton", "Volt"], correta: 0 },

    { pergunta: "Se um corpo não muda sua velocidade, ele está em:",
      opcoes: ["Movimento acelerado", "Equilíbrio", "Movimento uniforme", "Repouso absoluto"], correta: 2 },

    { pergunta: "A aceleração é definida como:",
      opcoes: [
        "Variação da posição",
        "Variação da velocidade",
        "Velocidade constante",
        "Força aplicada"
      ], correta: 1 },

    { pergunta: "Qual grandeza mede a quantidade de matéria?",
      opcoes: ["Peso", "Força", "Massa", "Volume"], correta: 2 },

    { pergunta: "A pressão é calculada por:",
      opcoes: [
        "Força × Área",
        "Força ÷ Área",
        "Massa × Gravidade",
        "Volume ÷ Força"
      ], correta: 1 },

    { pergunta: "O trabalho mecânico depende de:",
      opcoes: [
        "Força e deslocamento",
        "Massa e tempo",
        "Altura apenas",
        "Velocidade apenas"
      ], correta: 0 },

    // ---------------- QUÍMICA ----------------

    { pergunta: "A combustão é classificada como uma reação:",
      opcoes: ["Endotérmica", "Exotérmica", "Física", "Nuclear"], correta: 1 },

    { pergunta: "Qual evidência indica que ocorreu uma reação química?",
      opcoes: [
        "Mudança de estado físico apenas",
        "Formação de nova substância",
        "Mudança de tamanho",
        "Fragmentação do material"
      ], correta: 1 },

    { pergunta: "O modelo atômico que introduziu níveis de energia foi proposto por:",
      opcoes: ["Dalton", "Thomson", "Rutherford", "Bohr"], correta: 3 },

    { pergunta: "A ferrugem do ferro é exemplo de:",
      opcoes: ["Transformação física", "Oxidação", "Fusão", "Sublimação"], correta: 1 },

    { pergunta: "Quando um elétron retorna a nível mais baixo, ele:",
      opcoes: ["Absorve energia", "Emite energia", "Desaparece", "Aumenta massa"], correta: 1 },

    { pergunta: "A água é composta por:",
      opcoes: ["H₂O", "CO₂", "O₂", "NaCl"], correta: 0 },

    { pergunta: "O número atômico representa:",
      opcoes: [
        "Número de nêutrons",
        "Número de elétrons e prótons",
        "Número de prótons",
        "Massa total"
      ], correta: 2 },

    { pergunta: "Uma reação endotérmica:",
      opcoes: [
        "Libera calor",
        "Absorve calor",
        "Não envolve energia",
        "É sempre física"
      ], correta: 1 },

    { pergunta: "Mudança do estado sólido para o líquido é:",
      opcoes: ["Fusão", "Sublimação", "Evaporação", "Condensação"], correta: 0 },

    { pergunta: "O pH mede:",
      opcoes: [
        "Temperatura",
        "Pressão",
        "Acidez ou basicidade",
        "Massa molecular"
      ], correta: 2 },

    // ---------------- MATEMÁTICA ----------------

    { pergunta: "3.000.000 em notação científica é:",
      opcoes: ["3 × 10³", "3 × 10⁴", "3 × 10⁵", "3 × 10⁶"], correta: 3 },

    { pergunta: "Qual é o resultado de 2²?",
      opcoes: ["2", "4", "6", "8"], correta: 1 },

    { pergunta: "A raiz quadrada de 81 é:",
      opcoes: ["7", "8", "9", "10"], correta: 2 },

    { pergunta: "50% de 200 é:",
      opcoes: ["50", "100", "150", "200"], correta: 1 },

    { pergunta: "Se x + 5 = 12, então x é:",
      opcoes: ["5", "6", "7", "8"], correta: 2 },

    { pergunta: "A fração 1/2 corresponde a:",
      opcoes: ["0,2", "0,25", "0,5", "2"], correta: 2 },

    { pergunta: "10³ é igual a:",
      opcoes: ["100", "1000", "10000", "10"], correta: 1 },

    { pergunta: "A soma dos ângulos internos de um triângulo é:",
      opcoes: ["90°", "180°", "270°", "360°"], correta: 1 },

    { pergunta: "Um número primo é:",
      opcoes: [
        "Divisível por qualquer número",
        "Divisível apenas por 1 e por ele mesmo",
        "Sempre par",
        "Sempre maior que 10"
      ], correta: 1 },

    { pergunta: "A média de 4, 6 e 8 é:",
      opcoes: ["5", "6", "7", "8"], correta: 1 }

];


// ================================
// UTILIDADES
// ================================

function formatarData(date){
    return date.toISOString().split("T")[0];
}

function diaDoAno(){
    const hoje = new Date();
    const inicio = new Date(hoje.getFullYear(), 0, 0);
    return Math.floor((hoje - inicio) / 86400000);
}


// ================================
// TOGGLE EXPANSÃO
// ================================

function toggleDesafio(){
    const card = document.getElementById("cardDesafio");
    card.classList.toggle("expandido");
}

window.toggleDesafio = toggleDesafio;


// ================================
// CARREGAR PERGUNTA DO DIA
// ================================

function carregarPergunta(){

    const indice = diaDoAno() % perguntas.length;
    const p = perguntas[indice];

    document.getElementById("perguntaTexto").innerText = p.pergunta;

    const div = document.getElementById("opcoes");
    div.innerHTML = "";

    p.opcoes.forEach((op, i)=>{
        div.innerHTML += `
            <label>
                <input type="radio" name="quiz" value="${i}">
                ${op}
            </label>
        `;
    });
}


// ================================
// RESPONDER PERGUNTA
// ================================

async function responderPergunta(){

    const botao = document.getElementById("btnResponder");
    botao.disabled = true;

    const user = auth.currentUser;
    if(!user){
        alert("Faça login.");
        botao.disabled = false;
        return;
    }

    const hoje = formatarData(new Date());
    const ontem = formatarData(new Date(Date.now() - 86400000));

    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    let ultimo = null;
    let streak = 0;
    let maiorStreak = 0;

    if(snap.exists()){
        const dados = snap.data();
        ultimo = dados.ultimoQuizDiario || null;
        streak = dados.streakAtual || 0;
        maiorStreak = dados.maiorStreak || 0;
    }

    if(ultimo === hoje){
        document.getElementById("statusXP").innerHTML =
        "⏳ Você já respondeu hoje.";
        return;
    }

    const marcada = document.querySelector('input[name="quiz"]:checked');
    if(!marcada){
        alert("Selecione uma alternativa.");
        botao.disabled = false;
        return;
    }

    const indice = diaDoAno() % perguntas.length;
    const correta = perguntas[indice].correta;

    // ❌ ERRO
    if(parseInt(marcada.value) !== correta){

        document.getElementById("statusXP").innerHTML =
        "❌ Resposta incorreta. Tente novamente amanhã.";

        document.getElementById("statusXP").classList.add("xp-erro");
        setTimeout(()=> {
            document.getElementById("statusXP").classList.remove("xp-erro");
        }, 800);

        await setDoc(ref, { ultimoQuizDiario: hoje }, { merge:true });
        return;
    }

    // 🔥 ACERTO
    if(ultimo === ontem){
        streak += 1;
    } else {
        streak = 1;
    }

    if(streak > maiorStreak){
        maiorStreak = streak;
    }

    const XP_BASE = 20;
    const bonus = (streak - 1) * 5;
    const xpTotal = XP_BASE + bonus;

    await adicionarXPImediato(xpTotal);

    await setDoc(ref,{
        ultimoQuizDiario: hoje,
        streakAtual: streak,
        maiorStreak: maiorStreak
    },{ merge:true });

    document.getElementById("statusXP").innerHTML =
        `🔥 +${xpTotal} XP! (Streak: ${streak} dias)`;

    document.getElementById("statusXP").classList.add("xp-sucesso");
    setTimeout(()=>{
        document.getElementById("statusXP").classList.remove("xp-sucesso");
    },1000);

    atualizarVisualStreak(streak);

    // Confetti
    if(typeof confetti === "function"){
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}


// ================================
// ATUALIZAÇÃO VISUAL DA STREAK
// ================================

function atualizarVisualStreak(streak){

    document.getElementById("streakInfo").innerHTML =
        `🔥 Streak atual: ${streak} dias`;

    document.getElementById("miniStreak").innerText =
        `🔥 ${streak}`;

    const barra = document.getElementById("streakBarFill");
    if(barra){
        barra.style.width = Math.min(streak * 10,100)+"%";
    }

    if(streak >= 5){
        document.getElementById("cardDesafio")
            .classList.add("streak-alta");
    }
}


// ================================
// INICIALIZAÇÃO
// ================================

auth.onAuthStateChanged(async(user)=>{
    if(!user) return;

    carregarPergunta();

    const hoje = formatarData(new Date());
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if(snap.exists()){
        const dados = snap.data();

        if(dados.ultimoQuizDiario === hoje){
            document.getElementById("btnResponder").disabled = true;
            document.getElementById("statusXP").innerHTML =
            "⏳ Você já respondeu hoje.";
        }

        if(dados.streakAtual){
            atualizarVisualStreak(dados.streakAtual);
        }
    }
});

window.responderPergunta = responderPergunta;