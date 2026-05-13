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
  id:205,

  /*
    SLUG
  */
  slug:
    "mudancas-estado",

  /*
    TÍTULO
  */
  titulo:
    "Mudanças de Estado Físico",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1400

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A matéria pode existir nos estados:",

    a:[

      "Sólido, líquido e gasoso",

      "Somente sólido",

      "Somente líquido",

      "Somente gasoso"

    ],

    c:0
  },

  {
    p:"A fusão corresponde à passagem:",

    a:[

      "Do sólido para o líquido",

      "Do líquido para o sólido",

      "Do líquido para o gasoso",

      "Do gasoso para o líquido"

    ],

    c:0
  },

  {
    p:"O derretimento do gelo é um exemplo de:",

    a:[

      "Solidificação",

      "Condensação",

      "Fusão",

      "Sublimação"

    ],

    c:2
  },

  {
    p:"A vaporização corresponde:",

    a:[

      "Do sólido para o líquido",

      "Do líquido para o gasoso",

      "Do gasoso para o líquido",

      "Do sólido para o gasoso"

    ],

    c:1
  },

  {
    p:"Quando a água ferve ocorre:",

    a:[

      "Solidificação",

      "Condensação",

      "Vaporização",

      "Fusão"

    ],

    c:2
  },

  {
    p:"A condensação corresponde:",

    a:[

      "Do líquido para o sólido",

      "Do gasoso para o líquido",

      "Do sólido para o líquido",

      "Do líquido para o gasoso"

    ],

    c:1
  },

  {
    p:"O vapor formando gotas em um copo gelado é exemplo de:",

    a:[

      "Fusão",

      "Solidificação",

      "Condensação",

      "Sublimação"

    ],

    c:2
  },

  {
    p:"A solidificação corresponde:",

    a:[

      "Do líquido para o sólido",

      "Do sólido para o líquido",

      "Do líquido para o gasoso",

      "Do gasoso para o sólido"

    ],

    c:0
  },

  {
    p:"O congelamento da água é um exemplo de:",

    a:[

      "Fusão",

      "Solidificação",

      "Condensação",

      "Evaporação"

    ],

    c:1
  },

  {
    p:"A sublimação é a passagem:",

    a:[

      "Do sólido diretamente para o gasoso",

      "Do líquido para o sólido",

      "Do líquido para o gasoso",

      "Do gasoso para o líquido"

    ],

    c:0
  },

  {
    p:"O gelo seco sofre:",

    a:[

      "Fusão",

      "Solidificação",

      "Sublimação",

      "Condensação"

    ],

    c:2
  },

  {
    p:"As mudanças de estado acontecem devido:",

    a:[

      "À troca de calor",

      "À força gravitacional",

      "À energia elétrica",

      "À pressão sonora"

    ],

    c:0
  },

  {
    p:"Durante o calor latente a temperatura:",

    a:[

      "Aumenta",

      "Diminui",

      "Permanece constante",

      "Desaparece"

    ],

    c:2
  },

  {
    p:"A fórmula do calor latente é:",

    a:[

      "Q = m·L",

      "Q = m·c·ΔT",

      "F = m·a",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"Na fórmula Q = m·L, L representa:",

    a:[

      "Massa",

      "Temperatura",

      "Calor latente",

      "Pressão"

    ],

    c:2
  },

  {
    p:"A evaporação é um tipo de:",

    a:[

      "Solidificação",

      "Condensação",

      "Vaporização",

      "Fusão"

    ],

    c:2
  },

  {
    p:"A ebulição ocorre:",

    a:[

      "Lentamente",

      "Somente no frio",

      "Em toda a massa do líquido",

      "Sem calor"

    ],

    c:2
  },

  {
    p:"A calefação ocorre quando:",

    a:[

      "O líquido evapora lentamente",

      "O líquido entra em contato com superfície muito quente",

      "O sólido congela",

      "O gás vira sólido"

    ],

    c:1
  },

  {
    p:"A passagem do gás diretamente para sólido é chamada:",

    a:[

      "Ressublimação",

      "Fusão",

      "Evaporação",

      "Ebulição"

    ],

    c:0
  },

  {
    p:"A água líquida ao virar gelo sofre:",

    a:[

      "Fusão",

      "Solidificação",

      "Vaporização",

      "Condensação"

    ],

    c:1
  },

  {
    p:"A passagem do sólido para líquido necessita:",

    a:[

      "Perda de calor",

      "Ganho de calor",

      "Ausência de energia",

      "Vácuo"

    ],

    c:1
  },

  {
    p:"A condensação ocorre com:",

    a:[

      "Ganho de calor",

      "Perda de calor",

      "Aumento de massa",

      "Radiação nuclear"

    ],

    c:1
  },

  {
    p:"As partículas no estado gasoso possuem:",

    a:[

      "Menor agitação",

      "Maior agitação",

      "Nenhum movimento",

      "Temperatura zero"

    ],

    c:1
  },

  {
    p:"No estado sólido as partículas ficam:",

    a:[

      "Muito afastadas",

      "Próximas e organizadas",

      "Sem movimento",

      "Desaparecendo"

    ],

    c:1
  },

  {
    p:"A Física que estuda calor e temperatura é:",

    a:[

      "Óptica",

      "Termologia",

      "Mecânica",

      "Astronomia"

    ],

    c:1
  },

  {
    p:"A unidade de calor no SI é:",

    a:[

      "Newton",

      "Pascal",

      "Joule",

      "Metro"

    ],

    c:2
  },

  {
    p:"O vapor de água pertence ao estado:",

    a:[

      "Sólido",

      "Líquido",

      "Gasoso",

      "Plasma"

    ],

    c:2
  },

  {
    p:"A água líquida pertence ao estado:",

    a:[

      "Gasoso",

      "Líquido",

      "Sólido",

      "Plasma"

    ],

    c:1
  },

  {
    p:"O gelo pertence ao estado:",

    a:[

      "Gasoso",

      "Plasma",

      "Líquido",

      "Sólido"

    ],

    c:3
  },

  {
    p:"Mudanças de estado físico são transformações:",

    a:[

      "Químicas",

      "Nucleares",

      "Físicas",

      "Biológicas"

    ],

    c:2
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

function analisarEstado(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    fusao:{

      titulo:
        "🧊 Fusão",

      tipo:
        "Sólido → Líquido",

      texto:
        "A fusão acontece quando uma substância recebe calor e passa do estado sólido para o líquido."

    },

    vaporizacao:{

      titulo:
        "💨 Vaporização",

      tipo:
        "Líquido → Gasoso",

      texto:
        "A vaporização ocorre quando o líquido recebe energia suficiente para virar vapor."

    },

    condensacao:{

      titulo:
        "💧 Condensação",

      tipo:
        "Gasoso → Líquido",

      texto:
        "A condensação ocorre quando o gás perde calor e retorna ao estado líquido."

    }

  };

  /*
    INTERFACE
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

window.analisarEstado =
  analisarEstado;