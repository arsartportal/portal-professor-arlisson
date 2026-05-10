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
    ID ÚNICO
  */
  id:30,

  /*
    SLUG
  */
  slug:
    "leis-kepler",

  /*
    TÍTULO
  */
  titulo:
    "Leis de Kepler",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1300

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Quem formulou as Leis de Kepler?",

    a:[

      "Johannes Kepler",

      "Isaac Newton",

      "Galileu Galilei",

      "Albert Einstein"

    ],

    c:0
  },

  {
    p:"As Leis de Kepler descrevem:",

    a:[

      "O movimento planetário",

      "Somente eletricidade",

      "Somente calor",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"Segundo a Primeira Lei de Kepler, as órbitas são:",

    a:[

      "Elípticas",

      "Quadradas",

      "Triangulares",

      "Retangulares"

    ],

    c:0
  },

  {
    p:"O Sol ocupa:",

    a:[

      "Um dos focos da elipse",

      "O centro exato sempre",

      "A borda da órbita",

      "Qualquer posição aleatória"

    ],

    c:0
  },

  {
    p:"A Primeira Lei é chamada de:",

    a:[

      "Lei das Órbitas",

      "Lei das Áreas",

      "Lei dos Períodos",

      "Lei da Gravidade"

    ],

    c:0
  },

  {
    p:"A Segunda Lei de Kepler é conhecida como:",

    a:[

      "Lei das Áreas",

      "Lei das Órbitas",

      "Lei dos Períodos",

      "Lei da Inércia"

    ],

    c:0
  },

  {
    p:"Segundo a Segunda Lei:",

    a:[

      "Áreas iguais em tempos iguais",

      "Velocidades iguais sempre",

      "Distâncias iguais sempre",

      "Forças iguais sempre"

    ],

    c:0
  },

  {
    p:"Quando o planeta está mais próximo do Sol:",

    a:[

      "Move-se mais rápido",

      "Move-se mais devagar",

      "Fica parado",

      "Perde gravidade"

    ],

    c:0
  },

  {
    p:"Quando o planeta está mais distante do Sol:",

    a:[

      "Move-se mais devagar",

      "Move-se mais rápido",

      "Para completamente",

      "Explode"

    ],

    c:0
  },

  {
    p:"A Terceira Lei relaciona:",

    a:[

      "Período e raio orbital",

      "Temperatura e pressão",

      "Massa e volume",

      "Força e aceleração"

    ],

    c:0
  },

  {
    p:"A fórmula da Terceira Lei é:",

    a:[

      "T²/R³ = k",

      "F = m·a",

      "P = m·g",

      "Ec = mv²/2"

    ],

    c:0
  },

  {
    p:"Na Terceira Lei, T representa:",

    a:[

      "Período orbital",

      "Temperatura",

      "Tempo de queda",

      "Trajetória"

    ],

    c:0
  },

  {
    p:"Na Terceira Lei, R representa:",

    a:[

      "Raio médio da órbita",

      "Resistência",

      "Rotação",

      "Reflexão"

    ],

    c:0
  },

  {
    p:"Planetas mais distantes do Sol:",

    a:[

      "Demoram mais para orbitar",

      "Movem-se mais rápido",

      "Não possuem gravidade",

      "Não se movimentam"

    ],

    c:0
  },

  {
    p:"As Leis de Kepler ajudaram Newton a formular:",

    a:[

      "A Gravitação Universal",

      "A Relatividade",

      "A Mecânica Quântica",

      "A Termodinâmica"

    ],

    c:0
  },

  {
    p:"As órbitas planetárias são:",

    a:[

      "Elipses",

      "Linhas retas",

      "Quadrados",

      "Triângulos"

    ],

    c:0
  },

  {
    p:"A velocidade orbital varia devido:",

    a:[

      "À distância do Sol",

      "À cor do planeta",

      "À temperatura do espaço",

      "À luz das estrelas"

    ],

    c:0
  },

  {
    p:"A Astronomia moderna utiliza:",

    a:[

      "As Leis de Kepler",

      "Somente óptica",

      "Somente eletricidade",

      "Somente termologia"

    ],

    c:0
  },

  {
    p:"Satélites artificiais obedecem:",

    a:[

      "Leis orbitais",

      "Somente magnetismo",

      "Somente pressão",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"Kepler estudou principalmente:",

    a:[

      "O movimento dos planetas",

      "Somente eletricidade",

      "Somente ondas",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"As Leis de Kepler pertencem ao estudo da:",

    a:[

      "Astronomia",

      "Química",

      "Biologia",

      "Geografia"

    ],

    c:0
  },

  {
    p:"Órbitas elípticas diferem de círculos porque:",

    a:[

      "Possuem focos",

      "Não possuem movimento",

      "São linhas retas",

      "Não possuem gravidade"

    ],

    c:0
  },

  {
    p:"A Segunda Lei indica que a velocidade orbital:",

    a:[

      "Não é constante",

      "É sempre constante",

      "É nula",

      "É infinita"

    ],

    c:0
  },

  {
    p:"A Terceira Lei compara:",

    a:[

      "Períodos de diferentes planetas",

      "Somente massas",

      "Somente temperaturas",

      "Somente velocidades"

    ],

    c:0
  },

  {
    p:"O Sistema Solar pode ser explicado usando:",

    a:[

      "As Leis de Kepler",

      "Somente óptica",

      "Somente acústica",

      "Somente termologia"

    ],

    c:0
  },

  {
    p:"As áreas varridas pelo raio vetor são:",

    a:[

      "Iguais em tempos iguais",

      "Sempre diferentes",

      "Nulas",

      "Aleatórias"

    ],

    c:0
  },

  {
    p:"Planetas próximos do Sol possuem:",

    a:[

      "Maior velocidade orbital",

      "Menor velocidade orbital",

      "Ausência de movimento",

      "Ausência de gravidade"

    ],

    c:0
  },

  {
    p:"A órbita da Terra ao redor do Sol é:",

    a:[

      "Elíptica",

      "Quadrada",

      "Retangular",

      "Triangular"

    ],

    c:0
  },

  {
    p:"As Leis de Kepler revolucionaram:",

    a:[

      "A Astronomia",

      "Somente a Química",

      "Somente a Biologia",

      "Somente a Medicina"

    ],

    c:0
  },

  {
    p:"As Leis de Kepler são fundamentais para entender:",

    a:[

      "Movimentos orbitais",

      "Somente eletricidade",

      "Somente calor",

      "Somente som"

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

function analisarKepler(tipo){

  const resultado =
    document.getElementById(
      "resultadoKepler"
    );

  /*
    DADOS
  */
  const dados = {

    proximo:{

      titulo:
        "☀️ Próximo do Sol",

      tipo:
        "Maior velocidade orbital",

      texto:
        "Quando um planeta aproxima-se do Sol, sua velocidade orbital aumenta devido à interação gravitacional mais intensa."

    },

    distante:{

      titulo:
        "🌌 Distante do Sol",

      tipo:
        "Menor velocidade orbital",

      texto:
        "Planetas mais afastados do Sol movem-se mais lentamente e possuem períodos orbitais maiores."

    },

    orbita:{

      titulo:
        "🛰️ Órbita Elíptica",

      tipo:
        "Movimento orbital",

      texto:
        "As órbitas dos planetas possuem formato elíptico, com o Sol ocupando um dos focos da elipse."

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

window.analisarKepler =
  analisarKepler;