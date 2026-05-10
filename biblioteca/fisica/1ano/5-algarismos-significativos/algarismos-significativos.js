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
  id: 5,

  /*
    Slug da aula
  */
  slug: "algarismos-significativos",

  /*
    Título exibido
  */
  titulo: "Algarismos Significativos",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 90

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Os algarismos significativos indicam:",

    a:[

      "A precisão de uma medida",

      "A cor de um objeto",

      "A velocidade da luz",

      "A massa da Terra"

    ],

    c:0
  },

  {
    p:"O número 12,30 possui quantos algarismos significativos?",

    a:[

      "4",

      "2",

      "3",

      "5"

    ],

    c:0
  },

  {
    p:"O número 0,0045 possui:",

    a:[

      "2 algarismos significativos",

      "4 algarismos significativos",

      "1 algarismo significativo",

      "5 algarismos significativos"

    ],

    c:0
  },

  {
    p:"Os zeros à esquerda normalmente:",

    a:[

      "Não são significativos",

      "São sempre significativos",

      "Representam erro",

      "Representam arredondamento"

    ],

    c:0
  },

  {
    p:"O número 100,0 possui:",

    a:[

      "4 algarismos significativos",

      "1 algarismo significativo",

      "2 algarismos significativos",

      "3 algarismos significativos"

    ],

    c:0
  },

  {
    p:"Algarismos significativos são muito usados em:",

    a:[

      "Medições científicas",

      "Literatura",

      "História",

      "Artes"

    ],

    c:0
  },

  {
    p:"O número 3,1415 possui:",

    a:[

      "5 algarismos significativos",

      "4 algarismos significativos",

      "3 algarismos significativos",

      "2 algarismos significativos"

    ],

    c:0
  },

  {
    p:"Os zeros entre números diferentes de zero:",

    a:[

      "São significativos",

      "Nunca são significativos",

      "São descartados",

      "Representam aproximação"

    ],

    c:0
  },

  {
    p:"A precisão de uma medida depende dos:",

    a:[

      "Algarismos significativos",

      "Parágrafos",

      "Mapas",

      "Gráficos"

    ],

    c:0
  },

  {
    p:"Qual destes possui 3 algarismos significativos?",

    a:[

      "0,0456",

      "0,00456",

      "45,6000",

      "4560"

    ],

    c:0
  },

  {
    p:"Algarismos significativos ajudam a:",

    a:[

      "Representar medidas corretamente",

      "Criar desenhos",

      "Fazer poemas",

      "Traduzir textos"

    ],

    c:0
  },

  {
    p:"Em Física, arredondamentos devem considerar:",

    a:[

      "Os algarismos significativos",

      "A cor do objeto",

      "A velocidade da internet",

      "O tamanho da página"

    ],

    c:0
  }

];

/* =====================================================
   INICIAR SISTEMA DA BIBLIOTECA
===================================================== */

iniciarBiblioteca(
  CONFIG,
  QUESTOES
);

/* =====================================================
   SIMULADOR
===================================================== */

function analisarNumero(tipo){

  const resultado =
    document.getElementById(
      "resultadoNumero"
    );

  /*
    Dados
  */
  const dados = {

    a:{

      titulo:
        "📏 Número 12,30",

      tipo:
        "Algarismos Significativos",

      texto:
        "O número 12,30 possui 4 algarismos significativos, pois o zero final após a vírgula é significativo."

    },

    b:{

      titulo:
        "🔬 Número 0,0045",

      tipo:
        "Algarismos Significativos",

      texto:
        "O número 0,0045 possui 2 algarismos significativos. Os zeros à esquerda não contam."

    },

    c:{

      titulo:
        "⚛️ Número 100,0",

      tipo:
        "Algarismos Significativos",

      texto:
        "O número 100,0 possui 4 algarismos significativos devido ao zero após a vírgula."

    }

  };

  /*
    Atualiza interface
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

window.analisarNumero =
  analisarNumero;