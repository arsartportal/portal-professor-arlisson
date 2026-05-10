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
  id: 4,

  /*
    Slug da aula
  */
  slug: "notacao-cientifica",

  /*
    Título exibido
  */
  titulo: "Notação Científica",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 80

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"A notação científica utiliza potências de:",

    a:[

      "10",

      "2",

      "5",

      "100"

    ],

    c:0
  },

  {
    p:"Qual destas representa uma notação científica correta?",

    a:[

      "3,2 × 10⁵",

      "32 × 10⁵",

      "0,0032 × 10⁵",

      "320 × 10⁵"

    ],

    c:0
  },

  {
    p:"O número 1500000 em notação científica é:",

    a:[

      "1,5 × 10⁶",

      "15 × 10⁶",

      "1,5 × 10⁵",

      "150 × 10³"

    ],

    c:0
  },

  {
    p:"A notação científica é usada principalmente para:",

    a:[

      "Representar números muito grandes ou pequenos",

      "Escrever textos",

      "Resolver equações do 2º grau",

      "Medir temperatura"

    ],

    c:0
  },

  {
    p:"O número 0,000001 pode ser escrito como:",

    a:[

      "1 × 10⁻⁶",

      "1 × 10⁶",

      "10 × 10⁻⁶",

      "0,1 × 10⁻⁶"

    ],

    c:0
  },

  {
    p:"Em 5 × 10³, o expoente indica:",

    a:[

      "Quantas casas a vírgula se desloca",

      "A soma do número",

      "A divisão do número",

      "A raiz quadrada"

    ],

    c:0
  },

  {
    p:"Qual destas áreas utiliza muito notação científica?",

    a:[

      "Astronomia",

      "Educação física",

      "Literatura",

      "Artes"

    ],

    c:0
  },

  {
    p:"O número 0,00045 em notação científica é:",

    a:[

      "4,5 × 10⁻⁴",

      "45 × 10⁻⁴",

      "4,5 × 10⁴",

      "0,45 × 10⁻⁴"

    ],

    c:0
  },

  {
    p:"A distância entre galáxias costuma ser medida usando:",

    a:[

      "Notação científica",

      "Frações simples",

      "Números romanos",

      "Porcentagem"

    ],

    c:0
  },

  {
    p:"Em notação científica, o primeiro número deve ser:",

    a:[

      "Maior ou igual a 1 e menor que 10",

      "Maior que 100",

      "Sempre negativo",

      "Sempre inteiro"

    ],

    c:0
  },

  {
    p:"O número 7,2 × 10² corresponde a:",

    a:[

      "720",

      "72",

      "7,2",

      "7200"

    ],

    c:0
  },

  {
    p:"O expoente negativo indica:",

    a:[

      "Número pequeno",

      "Número negativo",

      "Número inteiro",

      "Número positivo"

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

    terra:{

      titulo:
        "🌍 Distância Terra-Sol",

      tipo:
        "Notação Científica",

      texto:
        "150000000 pode ser representado como 1,5 × 10⁸."

    },

    atomo:{

      titulo:
        "⚛️ Tamanho do átomo",

      tipo:
        "Notação Científica",

      texto:
        "0,0000000001 pode ser representado como 1 × 10⁻¹⁰."

    },

    eletron:{

      titulo:
        "🔬 Massa do elétron",

      tipo:
        "Notação Científica",

      texto:
        "0,00000000000000000000000000000091 pode ser representado como 9,1 × 10⁻³¹."

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