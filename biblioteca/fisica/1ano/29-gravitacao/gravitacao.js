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
  id:29,

  /*
    SLUG
  */
  slug:
    "gravitacao",

  /*
    TÍTULO
  */
  titulo:
    "Gravitação Universal",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1250

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A gravitação é uma interação de:",

    a:[

      "Atração entre massas",

      "Repulsão elétrica",

      "Somente magnetismo",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"Quem formulou a Lei da Gravitação Universal?",

    a:[

      "Isaac Newton",

      "Albert Einstein",

      "Galileu Galilei",

      "Nikola Tesla"

    ],

    c:0
  },

  {
    p:"A força gravitacional depende da:",

    a:[

      "Massa e distância",

      "Temperatura e pressão",

      "Cor e formato",

      "Volume e luz"

    ],

    c:0
  },

  {
    p:"A fórmula da gravitação universal é:",

    a:[

      "F = G(m₁m₂)/d²",

      "F = m·a",

      "P = m·g",

      "Ec = mv²/2"

    ],

    c:0
  },

  {
    p:"Na fórmula gravitacional, G representa:",

    a:[

      "Constante gravitacional",

      "Gravidade local",

      "Grandeza geométrica",

      "Grau térmico"

    ],

    c:0
  },

  {
    p:"Quanto maior a massa dos corpos:",

    a:[

      "Maior a força gravitacional",

      "Menor a força",

      "Maior a temperatura",

      "Menor a gravidade"

    ],

    c:0
  },

  {
    p:"Quanto maior a distância:",

    a:[

      "Menor a força gravitacional",

      "Maior a força",

      "Maior a massa",

      "Maior a temperatura"

    ],

    c:0
  },

  {
    p:"Se a distância dobra:",

    a:[

      "A força fica 4 vezes menor",

      "A força dobra",

      "A força quadruplica",

      "Nada muda"

    ],

    c:0
  },

  {
    p:"A gravidade mantém os planetas em:",

    a:[

      "Órbita",

      "Repouso",

      "Linha reta infinita",

      "Explosão"

    ],

    c:0
  },

  {
    p:"A Lua permanece próxima da Terra devido à:",

    a:[

      "Gravidade",

      "Luz solar",

      "Temperatura",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"Satélites artificiais utilizam:",

    a:[

      "Órbitas gravitacionais",

      "Somente magnetismo",

      "Somente calor",

      "Somente eletricidade"

    ],

    c:0
  },

  {
    p:"O peso é causado pela:",

    a:[

      "Gravidade",

      "Velocidade",

      "Temperatura",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A fórmula do peso é:",

    a:[

      "P = m·g",

      "F = m·a",

      "V = d/t",

      "Ec = mv²/2"

    ],

    c:0
  },

  {
    p:"A gravidade da Terra atrai:",

    a:[

      "Todos os corpos com massa",

      "Somente metais",

      "Somente líquidos",

      "Somente gases"

    ],

    c:0
  },

  {
    p:"A gravitação atua:",

    a:[

      "À distância",

      "Somente em contato",

      "Somente no espaço",

      "Somente na Terra"

    ],

    c:0
  },

  {
    p:"A força gravitacional é sempre:",

    a:[

      "Atrativa",

      "Repulsiva",

      "Nula",

      "Aleatória"

    ],

    c:0
  },

  {
    p:"As marés são influenciadas principalmente pela:",

    a:[

      "Lua",

      "Temperatura",

      "Pressão",

      "Velocidade do vento"

    ],

    c:0
  },

  {
    p:"O Sol mantém os planetas do Sistema Solar em órbita por causa da:",

    a:[

      "Gravidade",

      "Luz",

      "Temperatura",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A gravidade influencia:",

    a:[

      "O movimento dos astros",

      "Somente a luz",

      "Somente o calor",

      "Somente os líquidos"

    ],

    c:0
  },

  {
    p:"A força gravitacional diminui com o:",

    a:[

      "Quadrado da distância",

      "Quadrado da massa",

      "Tempo",

      "Volume"

    ],

    c:0
  },

  {
    p:"Corpos mais massivos exercem:",

    a:[

      "Maior atração gravitacional",

      "Menor atração",

      "Ausência de gravidade",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"A gravitação universal pertence ao estudo da:",

    a:[

      "Mecânica",

      "Óptica",

      "Termologia",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"Planetas em órbita possuem:",

    a:[

      "Movimento contínuo ao redor do Sol",

      "Repouso absoluto",

      "Ausência de gravidade",

      "Somente energia térmica"

    ],

    c:0
  },

  {
    p:"A constante gravitacional é simbolizada por:",

    a:[

      "G",

      "g",

      "P",

      "F"

    ],

    c:0
  },

  {
    p:"A gravidade é mais intensa quando:",

    a:[

      "As massas são grandes",

      "As massas desaparecem",

      "A distância aumenta muito",

      "Não existe movimento"

    ],

    c:0
  },

  {
    p:"A Terra exerce gravidade sobre:",

    a:[

      "Todos os objetos próximos",

      "Somente humanos",

      "Somente metais",

      "Somente líquidos"

    ],

    c:0
  },

  {
    p:"Sem gravidade, os planetas:",

    a:[

      "Seguiriam em linha reta",

      "Parariam imediatamente",

      "Desapareceriam",

      "Ficariam imóveis"

    ],

    c:0
  },

  {
    p:"A gravidade ajuda a explicar:",

    a:[

      "Órbitas e movimentos celestes",

      "Somente calor",

      "Somente eletricidade",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"A interação gravitacional existe entre:",

    a:[

      "Quaisquer corpos com massa",

      "Somente planetas",

      "Somente estrelas",

      "Somente satélites"

    ],

    c:0
  },

  {
    p:"A gravitação universal é considerada:",

    a:[

      "Uma das leis fundamentais da Física",

      "Uma curiosidade histórica",

      "Uma hipótese sem aplicação",

      "Uma teoria abandonada"

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

function analisarGravidade(tipo){

  const resultado =
    document.getElementById(
      "resultadoGravidade"
    );

  /*
    DADOS
  */
  const dados = {

    massa:{

      titulo:
        "🌍 Grande Massa",

      tipo:
        "Maior atração gravitacional",

      texto:
        "Corpos muito massivos exercem forças gravitacionais mais intensas, como estrelas e planetas gigantes."

    },

    distancia:{

      titulo:
        "🌌 Grande Distância",

      tipo:
        "Menor força gravitacional",

      texto:
        "Quanto maior a distância entre os corpos, menor será a intensidade da força gravitacional."

    },

    orbita:{

      titulo:
        "🛰️ Órbita Gravitacional",

      tipo:
        "Movimento orbital",

      texto:
        "Satélites e planetas permanecem em órbita devido à interação gravitacional com corpos massivos."

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

window.analisarGravidade =
  analisarGravidade;