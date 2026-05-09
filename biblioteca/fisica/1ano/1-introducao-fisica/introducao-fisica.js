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
  id: 1,

  /*
    Slug da aula
  */
  slug: "introducao-fisica",

  /*
    Título exibido
  */
  titulo: "Introdução à Física",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 50

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"A Física estuda principalmente:",

    a:[

      "Fenômenos naturais",

      "Somente plantas",

      "Somente animais",

      "Somente mapas"

    ],

    c:0
  },

  {
    p:"Qual destas áreas pertence à Física?",

    a:[

      "Mecânica",

      "Botânica",

      "Zoologia",

      "Ecologia"

    ],

    c:0
  },

  {
    p:"A Física ajuda a explicar:",

    a:[

      "Movimentos",

      "Somente receitas",

      "Somente poemas",

      "Somente textos"

    ],

    c:0
  },

  {
    p:"O método científico começa geralmente com:",

    a:[

      "Observação",

      "Conclusão",

      "Resposta final",

      "Correção"

    ],

    c:0
  },

  {
    p:"A Termologia estuda:",

    a:[

      "Calor",

      "Plantas",

      "Animais",

      "Letras"

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

function analisarFenomeno(tipo){

  const resultado =
    document.getElementById(
      "resultadoFenomeno"
    );

  /*
    Dados dos fenômenos
  */
  const dados = {

    gelo:{

      titulo:
        "🧊 Gelo derretendo",

      tipo:
        "Fenômeno físico",

      texto:
        "A substância continua sendo água. Apenas o estado físico muda."

    },

    fogos:{

      titulo:
        "🎆 Fogos explodindo",

      tipo:
        "Fenômeno químico",

      texto:
        "Há reação química com liberação de energia, luz e calor."

    },

    carro:{

      titulo:
        "🚗 Carro acelerando",

      tipo:
        "Fenômeno físico",

      texto:
        "Envolve velocidade, movimento e forças mecânicas."

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

window.analisarFenomeno =
  analisarFenomeno;