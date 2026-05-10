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
  id: 13,

  /*
    Slug da aula
  */
  slug: "lancamento-vertical",

  /*
    Título exibido
  */
  titulo: "Lançamento Vertical",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 450

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"No lançamento vertical atua principalmente:",

    a:[

      "A gravidade",

      "O atrito",

      "A força elétrica",

      "A força magnética"

    ],

    c:0
  },

  {
    p:"Durante a subida do corpo:",

    a:[

      "A velocidade diminui",

      "A velocidade aumenta",

      "A gravidade desaparece",

      "A aceleração é zero"

    ],

    c:0
  },

  {
    p:"No ponto mais alto da trajetória:",

    a:[

      "A velocidade é zero",

      "A gravidade é zero",

      "O tempo é zero",

      "A posição é zero"

    ],

    c:0
  },

  {
    p:"Após atingir o ponto mais alto:",

    a:[

      "O corpo começa a cair",

      "O corpo para definitivamente",

      "A gravidade desaparece",

      "O movimento termina"

    ],

    c:0
  },

  {
    p:"O lançamento vertical é um exemplo de:",

    a:[

      "MUV",

      "MU",

      "Movimento circular",

      "Repouso"

    ],

    c:0
  },

  {
    p:"A aceleração da gravidade vale aproximadamente:",

    a:[

      "9,8 m/s²",

      "98 m/s²",

      "0,98 m/s²",

      "1 m/s²"

    ],

    c:0
  },

  {
    p:"A equação da velocidade no lançamento vertical é:",

    a:[

      "V = V₀ - gt",

      "V = S/t",

      "V = gt²",

      "V = V₀ + S"

    ],

    c:0
  },

  {
    p:"A gravidade atua:",

    a:[

      "Contra a subida",

      "A favor da subida",

      "Na horizontal",

      "Somente na descida"

    ],

    c:0
  },

  {
    p:"A função horária da posição é:",

    a:[

      "S = S₀ + V₀t - gt²/2",

      "S = V/t",

      "S = gt",

      "S = V²"

    ],

    c:0
  },

  {
    p:"No lançamento vertical a trajetória é:",

    a:[

      "Vertical",

      "Circular",

      "Parabólica",

      "Helicoidal"

    ],

    c:0
  },

  {
    p:"A altura máxima ocorre quando:",

    a:[

      "V = 0",

      "g = 0",

      "t = 0",

      "S = 0"

    ],

    c:0
  },

  {
    p:"A fórmula da altura máxima é:",

    a:[

      "H = V₀² / 2g",

      "H = gt",

      "H = V/t",

      "H = g²"

    ],

    c:0
  },

  {
    p:"A fórmula do tempo de subida é:",

    a:[

      "t = V₀/g",

      "t = g/V₀",

      "t = V²",

      "t = S/V"

    ],

    c:0
  },

  {
    p:"Quanto maior a velocidade inicial:",

    a:[

      "Maior será a altura",

      "Menor será a altura",

      "Menor será o tempo",

      "A gravidade muda"

    ],

    c:0
  },

  {
    p:"Durante a descida:",

    a:[

      "A velocidade aumenta",

      "A velocidade diminui",

      "A velocidade é zero",

      "A gravidade desaparece"

    ],

    c:0
  },

  {
    p:"A aceleração da gravidade é considerada:",

    a:[

      "Constante",

      "Variável",

      "Nula",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"A equação de Torricelli no lançamento vertical é:",

    a:[

      "V² = V₀² - 2gΔS",

      "V = gt",

      "S = Vt",

      "g = V/t"

    ],

    c:0
  },

  {
    p:"O gráfico velocidade × tempo é:",

    a:[

      "Uma reta inclinada",

      "Uma parábola",

      "Uma reta horizontal",

      "Um círculo"

    ],

    c:0
  },

  {
    p:"A inclinação negativa do gráfico indica:",

    a:[

      "Ação da gravidade",

      "Ausência de aceleração",

      "Velocidade constante",

      "Repouso"

    ],

    c:0
  },

  {
    p:"No topo da trajetória o corpo:",

    a:[

      "Para momentaneamente",

      "Perde massa",

      "Perde gravidade",

      "Desaparece"

    ],

    c:0
  },

  {
    p:"A subida é um movimento:",

    a:[

      "Retardado",

      "Acelerado",

      "Uniforme",

      "Circular"

    ],

    c:0
  },

  {
    p:"A descida é um movimento:",

    a:[

      "Acelerado",

      "Retardado",

      "Uniforme",

      "Circular"

    ],

    c:0
  },

  {
    p:"A Física que estuda o lançamento vertical é:",

    a:[

      "Cinemática",

      "Óptica",

      "Ondulatória",

      "Termologia"

    ],

    c:0
  },

  {
    p:"Sem gravidade:",

    a:[

      "Não haveria lançamento vertical",

      "Os corpos subiriam infinitamente",

      "Os corpos cairiam mais rápido",

      "A massa aumentaria"

    ],

    c:0
  },

  {
    p:"A gravidade aponta para:",

    a:[

      "O centro da Terra",

      "O espaço",

      "O norte",

      "O leste"

    ],

    c:0
  },

  {
    p:"Quando a velocidade inicial aumenta:",

    a:[

      "A altura máxima aumenta",

      "A altura diminui",

      "A gravidade muda",

      "O tempo diminui"

    ],

    c:0
  },

  {
    p:"No lançamento vertical a velocidade depende:",

    a:[

      "Do tempo",

      "Da massa",

      "Da cor",

      "Da temperatura"

    ],

    c:0
  },

  {
    p:"A velocidade inicial é:",

    a:[

      "A velocidade do lançamento",

      "A velocidade final",

      "A gravidade",

      "O deslocamento"

    ],

    c:0
  },

  {
    p:"A área sob o gráfico velocidade × tempo representa:",

    a:[

      "Deslocamento",

      "Massa",

      "Temperatura",

      "Força"

    ],

    c:0
  },

  {
    p:"Um exemplo de lançamento vertical é:",

    a:[

      "Uma bola lançada para cima",

      "Um carro em curva",

      "Um ventilador",

      "Uma lâmpada"

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

function analisarLancamento(tipo){

  const resultado =
    document.getElementById(
      "resultadoLancamento"
    );

  /*
    DADOS
  */
  const dados = {

    bola:{

      titulo:
        "🏀 Bola lançada",

      tipo:
        "Lançamento vertical",

      texto:
        "A bola sobe reduzindo sua velocidade até parar momentaneamente no ponto mais alto."

    },

    foguete:{

      titulo:
        "🚀 Foguete",

      tipo:
        "Grande velocidade inicial",

      texto:
        "Foguetes precisam vencer a ação gravitacional para atingir grandes altitudes."

    },

    tenis:{

      titulo:
        "🎾 Bola de tênis",

      tipo:
        "Subida e descida",

      texto:
        "A bola desacelera durante a subida e acelera novamente na descida."

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

window.analisarLancamento =
  analisarLancamento;