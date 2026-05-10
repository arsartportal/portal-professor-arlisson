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
    ID único da aula
  */
  id:20,

  /*
    SLUG
  */
  slug:
    "forca-peso",

  /*
    Título
  */
  titulo:
    "Força Peso",

  /*
    Disciplina
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:800

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A força peso é causada pela:",

    a:[

      "Gravidade",

      "Eletricidade",

      "Luz",

      "Temperatura"

    ],

    c:0
  },

  {
    p:"A fórmula da força peso é:",

    a:[

      "P = m · g",

      "F = m · a",

      "V = d/t",

      "E = mc²"

    ],

    c:0
  },

  {
    p:"A unidade da força peso é:",

    a:[

      "Newton",

      "Quilograma",

      "Metro",

      "Segundo"

    ],

    c:0
  },

  {
    p:"A massa é medida em:",

    a:[

      "Quilograma",

      "Newton",

      "Pascal",

      "Joule"

    ],

    c:0
  },

  {
    p:"A gravidade terrestre vale aproximadamente:",

    a:[

      "9,8m/s²",

      "98m/s²",

      "0,98m/s²",

      "980m/s²"

    ],

    c:0
  },

  {
    p:"O peso aponta para:",

    a:[

      "O centro da Terra",

      "O céu",

      "A direita",

      "A esquerda"

    ],

    c:0
  },

  {
    p:"A direção da força peso é:",

    a:[

      "Vertical",

      "Horizontal",

      "Diagonal",

      "Circular"

    ],

    c:0
  },

  {
    p:"O sentido da força peso é:",

    a:[

      "Para baixo",

      "Para cima",

      "Para direita",

      "Para esquerda"

    ],

    c:0
  },

  {
    p:"A massa de um corpo:",

    a:[

      "Não muda facilmente",

      "Desaparece",

      "Sempre aumenta",

      "Sempre diminui"

    ],

    c:0
  },

  {
    p:"O peso de um corpo:",

    a:[

      "Pode mudar conforme a gravidade",

      "Nunca muda",

      "É sempre igual à massa",

      "Desaparece no espaço"

    ],

    c:0
  },

  {
    p:"Na Lua, o peso:",

    a:[

      "É menor",

      "É maior",

      "É igual",

      "Desaparece"

    ],

    c:0
  },

  {
    p:"Na Lua, a massa:",

    a:[

      "Permanece igual",

      "Desaparece",

      "Aumenta",

      "Diminui"

    ],

    c:0
  },

  {
    p:"Peso é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Abstrata"

    ],

    c:0
  },

  {
    p:"O peso depende da:",

    a:[

      "Massa e gravidade",

      "Temperatura",

      "Velocidade da luz",

      "Pressão"

    ],

    c:0
  },

  {
    p:"Quanto maior a massa:",

    a:[

      "Maior o peso",

      "Menor o peso",

      "Menor a gravidade",

      "Maior a temperatura"

    ],

    c:0
  },

  {
    p:"A gravidade é uma força de:",

    a:[

      "Atração",

      "Repulsão",

      "Dilatação",

      "Refração"

    ],

    c:0
  },

  {
    p:"A Terra atrai os corpos devido à:",

    a:[

      "Gravidade",

      "Eletricidade",

      "Magnetismo",

      "Temperatura"

    ],

    c:0
  },

  {
    p:"O símbolo da força peso é:",

    a:[

      "P",

      "M",

      "V",

      "T"

    ],

    c:0
  },

  {
    p:"A gravidade é representada pela letra:",

    a:[

      "g",

      "p",

      "v",

      "m"

    ],

    c:0
  },

  {
    p:"A massa é representada pela letra:",

    a:[

      "m",

      "g",

      "p",

      "v"

    ],

    c:0
  },

  {
    p:"A força peso é estudada em:",

    a:[

      "Dinâmica",

      "Óptica",

      "Termologia",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"A força peso atua:",

    a:[

      "Em todos os corpos com massa",

      "Somente em metais",

      "Somente em líquidos",

      "Somente em planetas"

    ],

    c:0
  },

  {
    p:"Astronautas na Lua possuem:",

    a:[

      "Mesmo massa e menor peso",

      "Menor massa",

      "Maior massa",

      "Peso zero absoluto"

    ],

    c:0
  },

  {
    p:"A força peso pode causar:",

    a:[

      "Queda dos corpos",

      "Mudança de cor",

      "Luz",

      "Refração"

    ],

    c:0
  },

  {
    p:"Quando um objeto cai, a força principal é:",

    a:[

      "Peso",

      "Elétrica",

      "Magnética",

      "Nuclear"

    ],

    c:0
  },

  {
    p:"A gravidade terrestre mantém:",

    a:[

      "Os corpos presos ao planeta",

      "Os corpos flutuando",

      "A luz parada",

      "A temperatura constante"

    ],

    c:0
  },

  {
    p:"O peso pode ser medido com:",

    a:[

      "Dinamômetro",

      "Termômetro",

      "Bússola",

      "Voltímetro"

    ],

    c:0
  },

  {
    p:"O peso é proporcional à:",

    a:[

      "Massa",

      "Temperatura",

      "Velocidade da luz",

      "Pressão"

    ],

    c:0
  },

  {
    p:"Um corpo de maior massa sofre:",

    a:[

      "Maior força peso",

      "Menor força peso",

      "Menor gravidade",

      "Maior temperatura"

    ],

    c:0
  },

  {
    p:"A força peso é importante para:",

    a:[

      "Explicar quedas e movimentos",

      "Explicar cores",

      "Explicar luz",

      "Explicar ondas"

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

function analisarPeso(tipo){

  const resultado =
    document.getElementById(
      "resultadoPeso"
    );

  /*
    DADOS
  */
  const dados = {

    terra:{

      titulo:
        "🌍 Terra",

      tipo:
        "Gravidade terrestre",

      texto:
        "Na Terra, a gravidade é aproximadamente 9,8m/s², produzindo o peso que sentimos normalmente."

    },

    lua:{

      titulo:
        "🌕 Lua",

      tipo:
        "Gravidade lunar",

      texto:
        "Na Lua, a gravidade é muito menor. Por isso os astronautas conseguem dar saltos mais altos."

    },

    jupiter:{

      titulo:
        "🪐 Júpiter",

      tipo:
        "Gravidade intensa",

      texto:
        "Júpiter possui gravidade muito maior que a Terra, aumentando bastante o peso dos corpos."

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

window.analisarPeso =
  analisarPeso;