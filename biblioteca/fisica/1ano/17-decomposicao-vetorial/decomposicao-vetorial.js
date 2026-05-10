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
  id: 17,

  /*
    Slug da aula
  */
  slug: "decomposicao-vetorial",

  /*
    Título exibido
  */
  titulo: "Decomposição Vetorial",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 650

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Decompor um vetor significa:",

    a:[

      "Dividir em componentes",

      "Eliminar o vetor",

      "Somar vetores",

      "Multiplicar vetores"

    ],

    c:0
  },

  {
    p:"As componentes mais comuns são:",

    a:[

      "Horizontal e vertical",

      "Circular e linear",

      "Química e física",

      "Positiva e negativa"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial usa:",

    a:[

      "Trigonometria",

      "Logaritmos",

      "Probabilidade",

      "Estatística"

    ],

    c:0
  },

  {
    p:"A componente horizontal é calculada por:",

    a:[

      "Vx = V · cosθ",

      "Vx = V · senθ",

      "Vx = gt",

      "Vx = V²"

    ],

    c:0
  },

  {
    p:"A componente vertical é calculada por:",

    a:[

      "Vy = V · senθ",

      "Vy = V · cosθ",

      "Vy = V/t",

      "Vy = gt²"

    ],

    c:0
  },

  {
    p:"O seno normalmente está ligado à componente:",

    a:[

      "Vertical",

      "Horizontal",

      "Circular",

      "Nula"

    ],

    c:0
  },

  {
    p:"O cosseno normalmente está ligado à componente:",

    a:[

      "Horizontal",

      "Vertical",

      "Circular",

      "Nula"

    ],

    c:0
  },

  {
    p:"O vetor original corresponde geralmente à:",

    a:[

      "Hipotenusa",

      "Base",

      "Altura",

      "Diagonal secundária"

    ],

    c:0
  },

  {
    p:"As componentes formam:",

    a:[

      "Um triângulo retângulo",

      "Um círculo",

      "Uma parábola",

      "Uma reta"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial facilita:",

    a:[

      "Os cálculos",

      "A gravidade",

      "A temperatura",

      "A massa"

    ],

    c:0
  },

  {
    p:"Vetores são usados em:",

    a:[

      "Física",

      "Somente literatura",

      "Somente música",

      "Somente biologia"

    ],

    c:0
  },

  {
    p:"A velocidade é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Numérica",

      "Constante"

    ],

    c:0
  },

  {
    p:"A força é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Abstrata"

    ],

    c:0
  },

  {
    p:"A decomposição é muito usada em:",

    a:[

      "Lançamentos oblíquos",

      "Somente calor",

      "Somente ótica",

      "Somente ondas"

    ],

    c:0
  },

  {
    p:"O ângulo do vetor influencia:",

    a:[

      "As componentes",

      "A massa",

      "O tempo",

      "A temperatura"

    ],

    c:0
  },

  {
    p:"A componente horizontal representa:",

    a:[

      "A parte horizontal do vetor",

      "A gravidade",

      "A massa",

      "A densidade"

    ],

    c:0
  },

  {
    p:"A componente vertical representa:",

    a:[

      "A parte vertical do vetor",

      "A massa",

      "A velocidade escalar",

      "A pressão"

    ],

    c:0
  },

  {
    p:"A reconstrução do vetor usa:",

    a:[

      "Pitágoras",

      "Bhaskara",

      "Logaritmos",

      "Média"

    ],

    c:0
  },

  {
    p:"A fórmula de reconstrução é:",

    a:[

      "V = √(Vx² + Vy²)",

      "V = Vx + Vy²",

      "V = Vx/Vy",

      "V = Vy²"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial ajuda em:",

    a:[

      "Movimentos bidimensionais",

      "Somente movimentos lineares",

      "Somente temperatura",

      "Somente pressão"

    ],

    c:0
  },

  {
    p:"Um avião sofre influência de:",

    a:[

      "Vetores",

      "Somente massa",

      "Somente temperatura",

      "Somente tempo"

    ],

    c:0
  },

  {
    p:"Foguetes utilizam:",

    a:[

      "Decomposição vetorial",

      "Somente massa",

      "Somente escalas",

      "Somente pressão"

    ],

    c:0
  },

  {
    p:"A componente vertical é importante em:",

    a:[

      "Gravidade",

      "Cor dos objetos",

      "Temperatura ambiente",

      "Massa molecular"

    ],

    c:0
  },

  {
    p:"A componente horizontal é importante em:",

    a:[

      "Deslocamentos",

      "Massa",

      "Temperatura",

      "Densidade"

    ],

    c:0
  },

  {
    p:"A decomposição transforma um vetor em:",

    a:[

      "Dois vetores menores",

      "Um escalar",

      "Uma temperatura",

      "Uma pressão"

    ],

    c:0
  },

  {
    p:"As componentes dependem do:",

    a:[

      "Ângulo",

      "Peso",

      "Volume",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Vetores ajudam a representar:",

    a:[

      "Grandezas direcionais",

      "Somente massa",

      "Somente temperatura",

      "Somente volume"

    ],

    c:0
  },

  {
    p:"A Física utiliza vetores para:",

    a:[

      "Modelar movimentos",

      "Eliminar cálculos",

      "Remover forças",

      "Eliminar velocidade"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial é importante para:",

    a:[

      "Engenharia e Física",

      "Somente literatura",

      "Somente artes",

      "Somente química"

    ],

    c:0
  },

  {
    p:"A trigonometria é essencial para:",

    a:[

      "Decomposição vetorial",

      "Temperatura",

      "Densidade",

      "Calor"

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

function analisarDecomposicao(tipo){

  const resultado =
    document.getElementById(
      "resultadoDecomposicao"
    );

  /*
    DADOS
  */
  const dados = {

    futebol:{

      titulo:
        "⚽ Chute de Futebol",

      tipo:
        "Lançamento oblíquo",

      texto:
        "O chute possui componente horizontal responsável pelo alcance e componente vertical responsável pela altura."

    },

    aviao:{

      titulo:
        "✈️ Avião",

      tipo:
        "Velocidade vetorial",

      texto:
        "A velocidade do avião pode ser decomposta em direções horizontal e vertical para facilitar cálculos."

    },

    foguete:{

      titulo:
        "🚀 Foguete",

      tipo:
        "Movimento espacial",

      texto:
        "Foguetes utilizam decomposição vetorial para controlar trajetória, velocidade e direção."

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

window.analisarDecomposicao =
  analisarDecomposicao;