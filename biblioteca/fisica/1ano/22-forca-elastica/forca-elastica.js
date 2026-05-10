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
  id:22,

  /*
    SLUG
  */
  slug:
    "forca-elastica",

  /*
    TÍTULO
  */
  titulo:
    "Força Elástica",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:900

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A força elástica surge quando:",

    a:[

      "Um corpo elástico é deformado",

      "Há luz",

      "Há temperatura",

      "Há eletricidade"

    ],

    c:0
  },

  {
    p:"A força elástica tenta:",

    a:[

      "Restaurar a forma original",

      "Eliminar a massa",

      "Aumentar a gravidade",

      "Parar a luz"

    ],

    c:0
  },

  {
    p:"A Lei de Hooke é representada por:",

    a:[

      "F = k · x",

      "P = m · g",

      "V = d/t",

      "E = mc²"

    ],

    c:0
  },

  {
    p:"Na fórmula da Lei de Hooke, k representa:",

    a:[

      "Constante elástica",

      "Massa",

      "Velocidade",

      "Peso"

    ],

    c:0
  },

  {
    p:"Na fórmula da Lei de Hooke, x representa:",

    a:[

      "Deformação",

      "Tempo",

      "Gravidade",

      "Volume"

    ],

    c:0
  },

  {
    p:"Quanto maior a deformação:",

    a:[

      "Maior a força elástica",

      "Menor a força elástica",

      "Menor a gravidade",

      "Maior a temperatura"

    ],

    c:0
  },

  {
    p:"A constante elástica indica:",

    a:[

      "A rigidez da mola",

      "A velocidade da mola",

      "A massa da mola",

      "A temperatura da mola"

    ],

    c:0
  },

  {
    p:"Uma mola mais rígida possui:",

    a:[

      "Maior valor de k",

      "Menor valor de k",

      "Menor massa",

      "Maior temperatura"

    ],

    c:0
  },

  {
    p:"Uma mola mais flexível possui:",

    a:[

      "Menor valor de k",

      "Maior valor de k",

      "Maior massa",

      "Maior peso"

    ],

    c:0
  },

  {
    p:"A força elástica é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Numérica"

    ],

    c:0
  },

  {
    p:"A unidade da força elástica é:",

    a:[

      "Newton",

      "Quilograma",

      "Metro",

      "Segundo"

    ],

    c:0
  },

  {
    p:"A unidade da constante elástica é:",

    a:[

      "N/m",

      "kg",

      "m/s",

      "J"

    ],

    c:0
  },

  {
    p:"A mola pode sofrer:",

    a:[

      "Alongamento e compressão",

      "Somente aquecimento",

      "Somente dilatação",

      "Somente gravidade"

    ],

    c:0
  },

  {
    p:"Quando a mola é comprimida:",

    a:[

      "Surge força restauradora",

      "A gravidade desaparece",

      "A massa diminui",

      "A luz aumenta"

    ],

    c:0
  },

  {
    p:"Quando a mola é alongada:",

    a:[

      "Ela tenta voltar ao normal",

      "Ela perde massa",

      "Ela para de existir",

      "Ela elimina forças"

    ],

    c:0
  },

  {
    p:"A energia armazenada em molas é chamada de:",

    a:[

      "Energia potencial elástica",

      "Energia nuclear",

      "Energia térmica",

      "Energia química"

    ],

    c:0
  },

  {
    p:"A fórmula da energia potencial elástica é:",

    a:[

      "E = kx²/2",

      "P = m · g",

      "F = m · a",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Quanto maior a deformação:",

    a:[

      "Maior a energia armazenada",

      "Menor a energia",

      "Menor a gravidade",

      "Maior a massa"

    ],

    c:0
  },

  {
    p:"Suspensões de carros utilizam:",

    a:[

      "Molas",

      "Espelhos",

      "Lâmpadas",

      "Bússolas"

    ],

    c:0
  },

  {
    p:"Colchões usam princípios de:",

    a:[

      "Elasticidade",

      "Magnetismo",

      "Refração",

      "Radioatividade"

    ],

    c:0
  },

  {
    p:"Arcos e flechas utilizam:",

    a:[

      "Energia elástica",

      "Energia nuclear",

      "Energia elétrica",

      "Energia química"

    ],

    c:0
  },

  {
    p:"A Física utiliza molas para estudar:",

    a:[

      "Forças e movimentos",

      "Somente luz",

      "Somente calor",

      "Somente ondas"

    ],

    c:0
  },

  {
    p:"A força elástica depende da:",

    a:[

      "Deformação",

      "Temperatura do Sol",

      "Cor do objeto",

      "Velocidade da luz"

    ],

    c:0
  },

  {
    p:"A mola ideal obedece:",

    a:[

      "A Lei de Hooke",

      "A Lei de Ohm",

      "A Lei da Gravidade",

      "A Lei de Pascal"

    ],

    c:0
  },

  {
    p:"A elasticidade está presente em:",

    a:[

      "Diversos objetos do cotidiano",

      "Somente laboratórios",

      "Somente foguetes",

      "Somente planetas"

    ],

    c:0
  },

  {
    p:"A força elástica pode produzir:",

    a:[

      "Movimento",

      "Ausência de força",

      "Ausência de energia",

      "Ausência de massa"

    ],

    c:0
  },

  {
    p:"Ao soltar uma mola comprimida:",

    a:[

      "Ela retorna rapidamente",

      "Ela perde massa",

      "Ela para no espaço",

      "Ela elimina gravidade"

    ],

    c:0
  },

  {
    p:"A mola armazena energia quando:",

    a:[

      "É deformada",

      "É iluminada",

      "É aquecida",

      "É resfriada"

    ],

    c:0
  },

  {
    p:"A constante elástica varia conforme:",

    a:[

      "O material da mola",

      "A temperatura do Sol",

      "A cor da mola",

      "O formato da sala"

    ],

    c:0
  },

  {
    p:"A força elástica é importante para:",

    a:[

      "Diversas tecnologias modernas",

      "Eliminar movimentos",

      "Eliminar gravidade",

      "Eliminar energia"

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

function analisarElastica(tipo){

  const resultado =
    document.getElementById(
      "resultadoElastica"
    );

  /*
    DADOS
  */
  const dados = {

    mola:{

      titulo:
        "🌀 Mola Alongada",

      tipo:
        "Força restauradora",

      texto:
        "Ao alongar uma mola, surge uma força elástica que tenta fazê-la retornar ao comprimento original."

    },

    carro:{

      titulo:
        "🚗 Suspensão de Carro",

      tipo:
        "Aplicação prática",

      texto:
        "As molas da suspensão absorvem impactos e aumentam o conforto e estabilidade do veículo."

    },

    arco:{

      titulo:
        "🏹 Arco e Flecha",

      tipo:
        "Energia potencial elástica",

      texto:
        "Ao puxar o arco, energia elástica é armazenada e depois transferida para a flecha."

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

window.analisarElastica =
  analisarElastica;