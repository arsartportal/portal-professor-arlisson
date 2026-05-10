/* =====================================================
   IMPORTS
===================================================== */

import {

  iniciarBiblioteca

} from "../../../biblioteca.js";

/* =====================================================
   CONFIGURAÇÕES DA AULA
===================================================== */

const CONFIG = {

  /*
    ID único da lista
  */
  id: 14,

  /*
    Slug da aula
  */
  slug: "lancamento-obliquo",

  /*
    Título exibido
  */
  titulo: "Lançamento Oblíquo",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 500

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"O lançamento oblíquo ocorre quando:",

    a:[

      "Um corpo é lançado formando um ângulo",

      "Um corpo cai verticalmente",

      "O movimento é circular",

      "O corpo permanece em repouso"

    ],

    c:0
  },

  {
    p:"A trajetória do lançamento oblíquo é:",

    a:[

      "Parabólica",

      "Circular",

      "Vertical",

      "Retilínea"

    ],

    c:0
  },

  {
    p:"No lançamento oblíquo existem simultaneamente:",

    a:[

      "MU e MUV",

      "Dois MU",

      "Dois MUV",

      "Repouso e MU"

    ],

    c:0
  },

  {
    p:"O movimento horizontal é:",

    a:[

      "Uniforme",

      "Uniformemente variado",

      "Circular",

      "Nulo"

    ],

    c:0
  },

  {
    p:"O movimento vertical é:",

    a:[

      "Uniformemente variado",

      "Uniforme",

      "Circular",

      "Nulo"

    ],

    c:0
  },

  {
    p:"A componente horizontal da velocidade é:",

    a:[

      "Vx = V₀ · cosθ",

      "Vx = V₀ · senθ",

      "Vx = gt",

      "Vx = V²"

    ],

    c:0
  },

  {
    p:"A componente vertical da velocidade é:",

    a:[

      "Vy = V₀ · senθ",

      "Vy = V₀ · cosθ",

      "Vy = gt²",

      "Vy = V/t"

    ],

    c:0
  },

  {
    p:"No movimento horizontal a velocidade:",

    a:[

      "Permanece constante",

      "Diminui",

      "Aumenta",

      "Fica zero"

    ],

    c:0
  },

  {
    p:"No movimento vertical atua:",

    a:[

      "A gravidade",

      "A força magnética",

      "A força elétrica",

      "Nenhuma força"

    ],

    c:0
  },

  {
    p:"A gravidade atua na direção:",

    a:[

      "Vertical",

      "Horizontal",

      "Diagonal",

      "Circular"

    ],

    c:0
  },

  {
    p:"A altura máxima ocorre quando:",

    a:[

      "A velocidade vertical é zero",

      "A velocidade horizontal é zero",

      "A gravidade desaparece",

      "O tempo é zero"

    ],

    c:0
  },

  {
    p:"A fórmula da altura máxima é:",

    a:[

      "H = Vy² / 2g",

      "H = V/t",

      "H = gt",

      "H = V²"

    ],

    c:0
  },

  {
    p:"O alcance horizontal depende:",

    a:[

      "Da velocidade e do ângulo",

      "Somente da massa",

      "Somente da gravidade",

      "Somente do tempo"

    ],

    c:0
  },

  {
    p:"O alcance máximo ocorre aproximadamente em:",

    a:[

      "45°",

      "90°",

      "10°",

      "0°"

    ],

    c:0
  },

  {
    p:"A fórmula do alcance é:",

    a:[

      "A = V₀² · sen(2θ)/g",

      "A = gt²",

      "A = V/t",

      "A = V²"

    ],

    c:0
  },

  {
    p:"Durante a subida do projétil:",

    a:[

      "A velocidade vertical diminui",

      "A velocidade horizontal diminui",

      "A gravidade desaparece",

      "O movimento para"

    ],

    c:0
  },

  {
    p:"Durante a descida:",

    a:[

      "A velocidade vertical aumenta",

      "A velocidade horizontal desaparece",

      "A gravidade para",

      "A massa muda"

    ],

    c:0
  },

  {
    p:"O lançamento oblíquo é estudado em:",

    a:[

      "Cinemática",

      "Óptica",

      "Termologia",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"A componente horizontal não sofre:",

    a:[

      "Aceleração",

      "Velocidade",

      "Deslocamento",

      "Tempo"

    ],

    c:0
  },

  {
    p:"A velocidade horizontal depende do:",

    a:[

      "Cosseno do ângulo",

      "Seno do ângulo",

      "Tempo",

      "Peso"

    ],

    c:0
  },

  {
    p:"A velocidade vertical depende do:",

    a:[

      "Seno do ângulo",

      "Cosseno do ângulo",

      "Peso",

      "Massa"

    ],

    c:0
  },

  {
    p:"No ponto mais alto o projétil:",

    a:[

      "Continua se movendo horizontalmente",

      "Para completamente",

      "Perde massa",

      "Perde velocidade horizontal"

    ],

    c:0
  },

  {
    p:"Sem gravidade o lançamento oblíquo seria:",

    a:[

      "Retilíneo",

      "Circular",

      "Parabólico",

      "Vertical"

    ],

    c:0
  },

  {
    p:"A gravidade é considerada:",

    a:[

      "Constante",

      "Variável",

      "Nula",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"O gráfico da trajetória é:",

    a:[

      "Uma parábola",

      "Uma reta",

      "Um círculo",

      "Uma reta horizontal"

    ],

    c:0
  },

  {
    p:"Um exemplo de lançamento oblíquo é:",

    a:[

      "Um chute de futebol",

      "Uma queda livre",

      "Um carro em linha reta",

      "Um elevador"

    ],

    c:0
  },

  {
    p:"No lançamento oblíquo a velocidade total:",

    a:[

      "Possui componentes horizontal e vertical",

      "É apenas horizontal",

      "É apenas vertical",

      "É nula"

    ],

    c:0
  },

  {
    p:"A subida do projétil é um movimento:",

    a:[

      "Retardado verticalmente",

      "Uniforme",

      "Circular",

      "Nulo"

    ],

    c:0
  },

  {
    p:"A descida do projétil é um movimento:",

    a:[

      "Acelerado verticalmente",

      "Uniforme",

      "Circular",

      "Nulo"

    ],

    c:0
  },

  {
    p:"O tempo de voo depende principalmente:",

    a:[

      "Da componente vertical",

      "Da componente horizontal",

      "Da massa",

      "Da cor do objeto"

    ],

    c:0
  }

];

/* =====================================================
   INICIAR SISTEMA
===================================================== */

iniciarBiblioteca(
  CONFIG,
  QUESTOES
);

/* =====================================================
   SIMULADOR
===================================================== */

function analisarObliquo(tipo){

  const resultado =
    document.getElementById(
      "resultadoObliquo"
    );

  /*
    DADOS
  */
  const dados = {

    futebol:{

      titulo:
        "⚽ Chute de Futebol",

      tipo:
        "Trajetória parabólica",

      texto:
        "A bola descreve uma parábola devido à combinação do movimento horizontal com a ação da gravidade."

    },

    basquete:{

      titulo:
        "🏀 Arremesso de Basquete",

      tipo:
        "Controle de ângulo",

      texto:
        "O jogador precisa escolher velocidade e ângulo corretos para acertar a cesta."

    },

    foguete:{

      titulo:
        "🚀 Projétil",

      tipo:
        "Grande alcance",

      texto:
        "O lançamento oblíquo é usado para estudar projéteis, foguetes e trajetórias balísticas."

    }

  };

  /*
    ATUALIZA INTERFACE
  */
  resultado.innerHTML = `

    <div class="resultado-box">

      <h3>
        ${dados[tipo].titulo}
      </h3>

      <p>

        <strong>
          ${dados[tipo].tipo}
        </strong>

      </p>

      <p>
        ${dados[tipo].texto}
      </p>

    </div>

  `;

}

/* =====================================================
   DISPONIBILIZA GLOBALMENTE
===================================================== */

window.analisarObliquo =
  analisarObliquo;