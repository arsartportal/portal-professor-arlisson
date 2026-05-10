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
  id: 8,

  /*
    Slug da aula
  */
  slug: "posicao-deslocamento",

  /*
    Título exibido
  */
  titulo: "Posição e Deslocamento",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 140

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Posição é:",

    a:[

      "O local onde o corpo se encontra",

      "A velocidade do corpo",

      "O tempo do movimento",

      "A força aplicada"

    ],

    c:0
  },

  {
    p:"Deslocamento representa:",

    a:[

      "A variação da posição",

      "A massa do corpo",

      "A aceleração máxima",

      "A temperatura"

    ],

    c:0
  },

  {
    p:"A fórmula do deslocamento é:",

    a:[

      "ΔS = Sf - Si",

      "ΔS = Si - Sf",

      "V = ΔS/t",

      "A = V/t"

    ],

    c:0
  },

  {
    p:"Si representa:",

    a:[

      "Posição inicial",

      "Posição final",

      "Velocidade inicial",

      "Deslocamento"

    ],

    c:0
  },

  {
    p:"Sf representa:",

    a:[

      "Posição final",

      "Posição inicial",

      "Força final",

      "Velocidade média"

    ],

    c:0
  },

  {
    p:"Quando um corpo retorna ao ponto inicial, o deslocamento pode ser:",

    a:[

      "Nulo",

      "Máximo",

      "Infinito",

      "Positivo"

    ],

    c:0
  },

  {
    p:"O deslocamento depende:",

    a:[

      "Das posições inicial e final",

      "Da massa",

      "Da cor do veículo",

      "Da aceleração"

    ],

    c:0
  },

  {
    p:"A distância percorrida pode ser:",

    a:[

      "Maior que o deslocamento",

      "Sempre igual ao deslocamento",

      "Sempre zero",

      "Menor que zero"

    ],

    c:0
  },

  {
    p:"Um deslocamento positivo indica:",

    a:[

      "Movimento no sentido positivo da trajetória",

      "Movimento parado",

      "Movimento circular",

      "Ausência de movimento"

    ],

    c:0
  },

  {
    p:"Um deslocamento negativo indica:",

    a:[

      "Movimento no sentido contrário",

      "Repouso",

      "Movimento vertical",

      "Movimento circular"

    ],

    c:0
  },

  {
    p:"A unidade mais comum para posição no SI é:",

    a:[

      "Metro",

      "Segundo",

      "Quilograma",

      "Newton"

    ],

    c:0
  },

  {
    p:"A Cinemática estuda:",

    a:[

      "Os movimentos",

      "Somente calor",

      "Somente eletricidade",

      "Somente ondas"

    ],

    c:0
  },

  {
    p:"Quando a posição muda com o tempo, o corpo está:",

    a:[

      "Em movimento",

      "Em repouso absoluto",

      "Sem velocidade",

      "Parado"

    ],

    c:0
  },

  {
    p:"Deslocamento é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar apenas",

      "Sem unidade",

      "Adimensional"

    ],

    c:0
  },

  {
    p:"O estudo da posição depende de um:",

    a:[

      "Referencial",

      "Termômetro",

      "Circuito elétrico",

      "Microscópio"

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

function analisarDeslocamento(tipo){

  const resultado =
    document.getElementById(
      "resultadoDeslocamento"
    );

  /*
    Dados
  */
  const dados = {

    positivo:{

      titulo:
        "➡️ Deslocamento Positivo",

      tipo:
        "Movimento no sentido positivo",

      texto:
        "O corpo saiu da posição 2 m e chegou em 10 m. O deslocamento foi positivo: ΔS = 10 - 2 = 8 m."

    },

    negativo:{

      titulo:
        "⬅️ Deslocamento Negativo",

      tipo:
        "Movimento no sentido contrário",

      texto:
        "O corpo saiu da posição 12 m e chegou em 5 m. O deslocamento foi negativo: ΔS = 5 - 12 = -7 m."

    },

    nulo:{

      titulo:
        "🔄 Deslocamento Nulo",

      tipo:
        "Retorno ao ponto inicial",

      texto:
        "O corpo saiu da posição 0 m, percorreu um trajeto e voltou ao ponto inicial. O deslocamento total foi 0 m."

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

window.analisarDeslocamento =
  analisarDeslocamento;